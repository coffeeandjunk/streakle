Template.profileInfo.events({
    'submit form': function(event) {
        event.preventDefault();
        // var form = $('#profile-data');
        // var formdata = form.serializeArray();
        // console.log(formdata);
        // handle = $("#handle").val();
        school = $("#school").val();
        about = $("#about").val();
        if (!school || !about) console.log('blank form');
        else {
            Meteor.users.update(Meteor.userId(), {
                $set: {
                    // "profile.handle": handle,
                    "profile.school": school,
                    "profile.about": about
                }
            });
        }
        Router.go("homePage");
    }
});

Template.profileInfo.rendered = function() {
    $('nav').find('nav.navbar').addClass('hide');
};

Template.profileInfo.helpers({
    name: function() {
        var userProfile = Meteor.user().profile;
        return userProfile.name;
    },
    profilePic: function() {
        var userProfile = Meteor.user().profile;
        return userProfile.picture;
    }
});
