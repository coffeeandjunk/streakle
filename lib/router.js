Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return [Meteor.subscribe('posts'), Meteor.subscribe('images'), Meteor.subscribe("rooms"), Meteor.subscribe("messages"), Meteor.subscribe("users")];
    }
});

Router.route('/', {
    name: 'homePage'
});

// Router.route('/signupForm', {
//     name: 'signupForm'
// });

Router.route('/posts/:_id', {
    name: 'postPage',
    data: function() {
        return Posts.findOne(this.params._id);
    }
});

Router.route('/profile/:_id', {
    name: 'profileView',
    data: function() {
        return Meteor.users.findOne(this.params._id);
    },
    onBeforeAction: function() {
        AccountsEntry.signInRequired(this);
    }
});

Router.onBeforeAction('dataNotFound', {
    only: 'postPage'
});

// Accounts.onCreateUser(function(options, user) {
//     Router.go('/signupForm');
// });


// Hooks.onLoggedIn = function() {
//     if (!Meteor.user()) return;
//     if (!Meteor.user().returning) {
//         Meteor.users.update(Meteor.userId(), {
//             $set: {
//                 returning: true
//             }
//         });
//         Router.go('/');
//     }
// }
