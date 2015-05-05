// var getFbPicture = function(accessToken) {
//     var result;
//     result = Meteor.http.get("https://graph.facebook.com/me", {
//         params: {
//             access_token: accessToken,
//             fields: 'picture'
//         }
//     });
//     if (result.error) {
//         throw result.error;
//     }
//     return result.data.picture.data.url;
// };

// Accounts.onCreateUser(function(options, user) {
//     // Router.go('/signupForm');
//     if (options.profile) {
//         options.profile.picture = getFbPicture(user.services.facebook.accessToken);
//         user.profile = options.profile;
//     }
//     return user;
// });

// Accounts.onCreateUser(function(options, user) {
//     if (options.profile) {
//         options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
//         user.profile = options.profile;
//     }
//     return user;
// });
