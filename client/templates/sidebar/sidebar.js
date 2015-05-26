Template.sidebar.helpers({
    userProfile: function() {
        return "/profile/" + Meteor.user()._id;
    },

    name: function() {
        return Meteor.user().profile.name;
    },

    // posts: function() {
    //     return Posts.find({
    //         userId: this._id
    //     }, {
    //         sort: {
    //             submitted: -1
    //         }
    //     });
    // },

    postsCount: function() {
        return Posts.find({
            userId: Meteor.user()._id
        }).count();
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
                console.log('inside else')
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
