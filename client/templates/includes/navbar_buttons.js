Template.navbarButtons.helpers({
    profilePic: function () {
        // var userProfile = Meteor.user().profile;

        try{
        if(Meteor.user().services.facebook){
            // this is the line of interest
            return "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=large";
        }else if(Meteor.user().profile){
            return $.trim(Meteor.user().profile.avatar);
        }else{
            return Meteor.user().profile.image;
        }
    }
    catch(err){
        console.log(err);
    }
        // return userProfile.image;
    },

    profilePage: function () {
    	return "/profile/" + Meteor.userId();
    },

    firstName: function () {
        var userProfile = Meteor.user().profile;
        return userProfile.firstName;
    }
});