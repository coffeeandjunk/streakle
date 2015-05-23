Template.profileInfo.events({
    'submit form': function() {
        event.preventDefault();
        // var form = $('#profile-data');
        // var formdata = form.serializeArray();
        // console.log(formdata);
        school = $("#school").val();
        about = $("#about").val();
        Meteor.users.update(Meteor.userId(), {
            $set: {"profile.school": school, "profile.about": about}
        });
        Router.go ("homePage");
    }
});

Template.profileInfo.rendered = function() {
    $('nav').find('nav.navbar').addClass('hide');
};

Template.profileInfo.helpers({
    firstName: function() {
        // ...
    },
    lastName: function() {

    },
    profilePic: function() {

    }
});
