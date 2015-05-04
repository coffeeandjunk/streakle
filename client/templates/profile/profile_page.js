// Template.profilePic.helpers({
//     userPic: function() {
//         var userProfile = Meteor.user().profile;
//         if (userProfile) {
//             return userProfile.picture;
//         }
//     }
// });

Template.profilePage.helpers({

    username: function() {
        return this.username;
    },

    firstName: function() {
        var userProfile = this.profile;
        return userProfile.firstName;
    },

    lastName: function() {
        var userProfile = this.profile;
        return userProfile.lastName;
    },

    about: function() {
        var userProfile = this.profile;
        return userProfile.about;
    },

    school: function() {
        var userProfile = this.profile;
        return userProfile.school;
    },

    posts: function() {
        return Posts.find({
            userId: this._id
        },{
            sort: {
                submitted: -1
            }
        });
    },

    postsCount: function() {
        return Posts.find({
            userId: this._id
        }).count();
    }
});

Template.profilePic.events({
    'click #img-upload': function(e) {
        document.getElementById('file-upload').click();
    },

    'change #file-upload': FS.EventHandlers.insertFiles(postImages, {
        metadata: function(fileObj) {
            return {
                owner: Meteor.userId(),
                submitted: new Date()
            };
        },
        after: function(error, fileObj) {
            console.log("Inserted", fileObj.name);
            var userId = Meteor.userId();
            imageUrl = {
                "profile.image": "/cfs/files/images/" + fileObj._id
            };
            Meteor.users.update(userId, {
                $set: imageUrl
            });
        }
    })

});


Template.profilePic.helpers({
    profilePic: function() {
        var userProfile = this.profile;
        return userProfile.image;
    }
})
