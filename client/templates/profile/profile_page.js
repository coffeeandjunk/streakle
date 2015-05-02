Template.profilePic.helpers({
    userPic: function() {
        var userProfile = Meteor.user().profile;
        if (userProfile) { // logic to handle logged out state
            return userProfile.picture;
        }
    }
});

Template.profilePage.helpers({
    name: function() {
        var userProfile = Meteor.user().profile;
        return userProfile.name;
    },

    firstName: function() {
        var userProfile = Meteor.user().services.facebook;
        return userProfile.first_name;
    },

    posts: function() {
        return Posts.find({}, {sort: {submitted: -1}});
    },

    postsCount: function() {
        return Posts.find().count();
    }
});
