Template.profileSidebar.helpers({
    username: function() {
        if (isUserFacebookAunthenticated()) {
            return Meteor.user().services.facebook.name;
        }
        return this.username;
    },

    firstName: function() {
        if (isUserFacebookAunthenticated()) {
            return Meteor.user().services.facebook.first_name;
        }
        return this.profile.firstName;
    },

    lastName: function() {
        if (isUserFacebookAunthenticated()) {
            return Meteor.user().services.facebook.last_name;
        }
        return this.profile.lastName;
    },

    about: function() {
        var userProfile = this.profile;
        return userProfile.about;
    },

    school: function() {
        var userProfile = this.profile;
        return userProfile.school;
    },

    postsCount: function() {
        return Posts.find({
            userId: this._id
        }).count();
    }
});

Template.profilePic.events({
    'click #profile-img-upload': function(e) {
        document.getElementById('profile-file-upload').click();
    },

    'change #profile-file-upload': FS.EventHandlers.insertFiles(postImages, {
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
    username: function() {
        if (isUserFacebookAunthenticated()) {
            return Meteor.user().services.facebook.name;
        }
        return this.username;
    },

    profilePic: function() {
        try {
            if (isUserFacebookAunthenticated()) {
                // this is the line of interest
                return "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=large";
            } else {
                console.log('inside else')
                return this.profile.image;
            }
        } catch (err) {
            console.log(err);
        }
    }
})



var isUserFacebookAunthenticated = function() {
    return !!Meteor.user().services.facebook;
}
