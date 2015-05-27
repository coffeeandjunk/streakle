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
        var user = Meteor.users.findOne({
            _id: this.userId
        });
        var author = user.profile.firstName;
        console.log(author);
        Session.set("roomname", author);
        // _post();
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
            console.log("like adding");
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
            console.log("like deleting")
        }
        $('.btn-heart').blur();
    },
    'click .del-post': function() {
        // console.log('deleting post');
        Posts.remove(this._id);
        messages.remove(this.postId);
    }
});

// var _post = function() {
//     post = Posts.findOne({
//         _id: this._id
//     });
//     message = {
//         userId: post.userId,
//         postId: post._id,
//         submitted: new Date(),
//         msg: post.content,
//         room: Session.get("roomname"),
//         imagrUrl: post.imagrUrl,
//         imageId: post.imageId
//     };
//     messages._id = Messages.insert(message);

// }
