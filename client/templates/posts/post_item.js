Template.postItem.helpers({
    liked: function() {
        var like = Posts.findOne({
            _id: this._id,
            likes: Meteor.userId()
        });
        if (like) {
            return "color: #0079FF;";
        }
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
        if (!user.services.facebook) {
            return user.profile.image;
        } else return user.profile.picture;
    },
    absoluteImageUrl: function() {
        var post = Posts.findOne({
            userId: this.userId
        });
        // console.log('post.imageUrl::', post)
        return window.location.host + post.imageUrl;
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

            Session.set("roomName", "Message");

            $('#messages').scrollTo('max', 80);

            _post(this._id);


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
                console.log(Meteor.userId());
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
        // var userLikes = Posts.find(this._id, {
        //     likes: 1,
        //     _id: 0
        // });
        messages.remove(this.postId);
        // Meteor.users.update({
        //     _id: {
        //         $in: userLikes
        //     }
        // }, {
        //     $pull: {
        //         'profile.likes': this._id
        //     }
        // });
        Posts.remove(this._id);

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
                imageUrl: post.imageUrl,
                imageId: post.imageId,
                postUserId: post.userId,
            }
        }
    });
    $('#messages').scrollTo('max', 80);
    $('#msg').focus();
}
