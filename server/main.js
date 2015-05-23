var getFbPicture = function(accessToken) {
    var result;
    result = Meteor.http.get("https://graph.facebook.com/me", {
        params: {
            access_token: accessToken,
            fields: 'picture'
        }
    });
    if (result.error) {
        throw result.error;
    }
    return result.data.picture.data.url;
};

// Accounts.onCreateUser(function(options,user) {
//   check(options, Object);
//   check(user, Object);

//   options.profile.email = user.services.facebook.email;
//   options.profile.facebookId = user.services.facebook.id;

//   user.profile = options.profile;

//   return user;
// });


Accounts.onCreateUser(function(options, user) {
    // console.log('onCreateUser called');
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        user.profile = options.profile;
    }
    Router.go('/Profile-Info');
    return user;
});


Accounts.onLogin(function(options, user) {
    // Router.go('/');
    // console.log('onLogin called');
    if (options.profile) {
        options.profile.picture = getFbPicture(user.services.facebook.accessToken);
        user.profile = options.profile;
    }
    return user;
});