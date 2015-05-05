Template.navbarButtons.helpers({
    profilePic: function () {
        var userProfile = Meteor.user().profile;
        return userProfile.image;
    },

    profilePage: function () {
    	return "/profile/" + Meteor.userId();
    },

    firstName: function () {
        var userProfile = Meteor.user().profile;
        return userProfile.firstName;
    }
});