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

Accounts.onCreateUser(function(options, user) {
    // console.log('onCreateUser called');
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        options.profile.email = user.services.facebook.email;
        options.profile.firstName = user.services.facebook.first_name;
        options.profile.lastName = user.services.facebook.last_name;
        options.profile.gender = user.services.facebook.gender;
        user.profile = options.profile;
    }
    return user;
    this.render('profileInfo');
});