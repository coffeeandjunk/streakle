Template.postItem.helpers({
    liked: function() {
        var like = Posts.findOne({
            _id: this._id,
            likes: Meteor.userId()
        });
        if (like) {
            return "color: #57132E;";
        }
    },
    likes : function() {
        if (this.likes.length != 0) return this.likes.length;
            else return "";
    },
    ownPost: function() {
        return this.userId == Meteor.userId();
    },
    authorProfile: function() {
        return "/profile/" + this.userId;
    },
    authorSchool: function() {
        user = Meteor.users.findOne({
            _id: this.userId
        });
        return user.profile.school;
    },
    author: function() {
        user = Meteor.users.findOne({
            _id: this.userId
        });
        return user.profile.name;
    },
    authorImage: function() {
        user = Meteor.users.findOne({
            _id: this.userId
        });
        return user.profile.picture;
    },
    // absoluteImageUrl: function() {
    //     var post = Posts.findOne({
    //         userId: this.userId
    //     });
    //     // console.log('post.imageUrl::', post)
    //     return window.location.host + post.imageUrl;
    // },
    images: function() {
        return postImages.find({
            _id: this.imageId
        });
    }
});


Template.postItem.onRendered(function() {
    var img = document.getElementById('post-image');
    // console.log('postitem rendered', Template.instance().imageUrl);
    // anno.makeAnnotatable(img);
});

Template.postItem.events({
    'click .btn-say': function() {
        if (Meteor.userId() != this.userId) {
            var roomCheck = Rooms.findOne({
                userAccess: {
                    $all: [this.userId, Meteor.userId()]
                }
            });
            if (!roomCheck) {
                var newRoom = Rooms.insert({
                    userAccess: [this.userId, Meteor.userId()],
                    messages: []
                });
                // Session.set('roomName', 'Direct Message');
                Session.set('roomId', newRoom);
            } else {
                // Session.set("roomName", 'Direct Message');
                Session.set("roomId", roomCheck._id);
            }
            toUser = Meteor.users.findOne({
                _id: this.userId
            });
            userName = toUser.profile.firstName;
            Session.set("roomName", userName);
            _post(this._id);
            $('#messages').scrollTo('9999px', 80);

            // var chatUser = Meteor.users.findOne({
            //     _id: Meteor.userId(),
            //     'profile.chatUsers': this.userId
            // });
            //Below is the replacement of the above
            var chatUser = Meteor.users.findOne({
                _id: {
                    $in: [this.userId, Meteor.userId()]
                },
                'profile.chatUsers': this.userId
            });

            if (!chatUser && Meteor.userId() != this.userId) {
                // console.log(Meteor.userId());
                Meteor.users.update({
                    _id: this.userId
                }, {
                    $push: {
                        "profile.chatUsers": Meteor.userId()
                    }
                });

                Meteor.users.update({
                    _id: Meteor.userId()
                }, {
                    $push: {
                        "profile.chatUsers": this.userId
                    }
                });
            }
        } else console.log("Can't chat with yourself");

    },
    'click .btn-heart': function() {
        var like = Posts.findOne({
            _id: this._id,
            likes: Meteor.userId()
        });
        if (!like) {
            Posts.update({
                _id: this._id
            }, {
                $push: {
                    likes: Meteor.userId()
                }
            });
            Meteor.users.update(Meteor.userId(), {
                $push: {
                    'profile.likes': this._id
                }
            });
        } else {
            Posts.update({
                _id: this._id
            }, {
                $pull: {
                    likes: Meteor.userId()
                }
            });
            Meteor.users.update(Meteor.userId(), {
                $pull: {
                    'profile.likes': this._id
                }
            });
        }
        $('.btn-heart').blur();
    },
    'click .del-post': function() {
        // var users = Meteor.users.findOne({
        //     "profile.likes": this._id
        // });
        // console.log(this._id);
        // // $.each(users, function(key, value) {
        //     // console.log(value._id);
        //     Meteor.users.update({
        //         _id: users._id
        //     }, {
        //         $pull: {
        //             'profile.likes': this._id
        //         }
        //     });
        // // });


        Posts.remove(this._id);
        Meteor.users.update(Meteor.userId(), {
            $inc: {
                'profile.postsCount': -1
            }
        });
        var roomName = "#" + this.category;
        var room = Rooms.findOne({
            roomName: roomName
        });
        Rooms.update({
            _id: room._id
        }, {
            $pull: {
                messages: {
                    postId: this._id
                }
            }
        });
        postImages.remove(this.imageId);

    }
});

var _post = function(postId) {
    post = Posts.findOne({
        _id: postId
    });

    var messagePush = Rooms.update({
        _id: Session.get("roomId")
    }, {
        $push: {
            messages: {
                userId: Meteor.userId(),
                postId: post._id,
                submitted: new Date(),
                msg: post.content,
                imageId: post.imageId,
                postUserId: post.userId,
            }
        }
    });
    $('#messages').scrollTo('max', 80);
    $('#msg').focus();
}
