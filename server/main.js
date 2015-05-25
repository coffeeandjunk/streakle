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



// // bonus: get some additional profile info from facebook and cache on the user document
// Accounts.onCreateUser(function(options,user) {
//   check(options, Object);
//   check(user, Object);

//   options.profile.email = user.services.facebook.email;
//   options.profile.facebookId = user.services.facebook.id;

//   user.profile = options.profile;

//   return user;
// });


Accounts.onCreateUser(function(options, user) {
    // Router.go('/signupForm');
     if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        user.profile = options.profile;
    }
    return user;
});


Accounts.onLogin(function(options, user) {
    // Router.go('/signupForm');
    // console.log('onlogin called');
    if (options.profile) {
        options.profile.picture = getFbPicture(user.services.facebook.accessToken);
        user.profile = options.profile;
    }
    return user;
});

Meteor.methods({
    insertTagEntry: function(tag, postId){
        tag = tag.replace('#','');
        var insertCode = Tags.update({tagName: tag },{$addToSet: {postIds: postId}});
        return insertCode;
    }
})


// Accounts.onCreateUser(function(options, user) {
//     if (options.profile) {
//         options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
//         user.profile = options.profile;
//     }
//     return user;
// });
