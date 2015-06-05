Template.signinPage.events({
    'click .btn-facebook': function() {
        return Meteor.loginWithFacebook(function(error) {
            if (error) {
                return console.log(error.reason);
            }
            if (!Meteor.user().profile.returning) {
                Meteor.users.update(Meteor.userId(), {
                    $set: {
                        "profile.likes": [],
                        "profile.tags": [],
                        "profile.postsCount": 0,
                        "profile.streak": 0,
                        "profile.chatUsers": []
                    }
                });
                $('.btn-facebook').blur();
                Router.go('profileInfo');
            }

        });
    }
});

Template.signinPage.rendered = function() {
    var x = 0;
    var y = 0;
    //cache a reference to the banner
    var banner = $(".banner");

    // set initial banner background position
    banner.css('background-position', x + 'px' + ' ' + y + 'px');

    // scroll up background position every 90 milliseconds
    window.setInterval(function() {
        banner.css("background-position", x + 'px' + ' ' + y + 'px');
        y--;
        //x--;

    }, 90);
};
