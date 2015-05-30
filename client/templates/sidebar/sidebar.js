Template.sidebar.helpers({
    userProfile: function() {
        return "/profile/" + Meteor.user()._id;
    },

    name: function() {
        return Meteor.user().profile.name;
    },

    postsCount: function() {
        return Posts.find({
            userId: Meteor.userId()
        }).count();
    },

    chatUsers: function() {
        var user = Meteor.users.findOne({
            _id: Meteor.userId()
        });
        var chatUsers = user.profile.chatUsers;
        return Meteor.users.find({
            _id: {
                $in: chatUsers
            }
        });
    },

    chatUser: function() {
        return this.profile.name;
    }
});

Template.sidebar.events({
    'click .chat-user': function() {
        chatUser = Meteor.users.findOne({
            _id: this._id
        })
        Session.set("roomName", chatUser.profile.firstName);
        Session.set("chatUser", chatUser.profile.name);
        var userId = this._id;
        // console.log(this._id);
        var chatRoom = Rooms.findOne({
            userAccess: {
                $all: [this._id, Meteor.userId()]
            }
        });
        Session.set("roomId", chatRoom._id);
        // var d = $('#messages');
        // d.scrollTop(d.prop("scrollHeight"));
        $('#messages').scrollTo('9999px', 10);
        $("#msg").focus();
    }
});

// Template.profilePic.events({
//   'click #profile-pic-upload': function(e) {
//     document.getElementById('file-upload').click();
//   },

//   'change #profile-pic-upload': FS.EventHandlers.insertFiles(postImages, {
//     metadata: function(fileObj) {
//       return {
//         owner: Meteor.userId(),
//         submitted: new Date()
//       };
//     },
//     after: function(error, fileObj) {
//       console.log("Inserted", fileObj.name);
//       var userId = Meteor.userId();
//       imageUrl = {
//         "profile.image": "/cfs/files/images/" + fileObj._id
//       };
//       Meteor.users.update(userId, {
//         $set: imageUrl
//       });
//     }
//   })

// });


Template.myProfilePic.helpers({
    profilePic: function() {
        try {
            if (isUserFacebookAunthenticated()) {
                // this is the line of interest
                return "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=large";
            } else {
                // console.log('inside else')
                return Meteor.user().profile.image;
            }
        } catch (err) {
            console.log(err);
        }
    },
    username: function() {
        if (isUserFacebookAunthenticated()) {
            return Meteor.user().services.facebook.name;
        }
        return Meteor.user().username;
    },
    userProfile: function() {
        return "/profile/" + Meteor.user()._id;
    }
})



var isUserFacebookAunthenticated = function() {
    return !!Meteor.user().services.facebook;
}
