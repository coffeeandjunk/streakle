Template.navbarButtons.helpers({
    profilePic: function () {
        // var userProfile = Meteor.user().profile;

        try{
        if(Meteor.user().services.facebook){
            // this is the line of interest
            return "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=small";
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
        try{
        if(Meteor.user().services.facebook){
            return Meteor.user().services.facebook.first_name;
        }else{
            return Meteor.user().profile.firstName;
        }
        }catch(err){
            console.log(err);
        }   
        
    }
});