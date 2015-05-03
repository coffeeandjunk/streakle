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
    waitOn: function() {
        return Meteor.subscribe('comments', this.params._id);
    },
    data: function() {
        return Posts.findOne(this.params._id);
    }
});

var requireLogin = function() {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
}

Router.onBeforeAction('dataNotFound', {
    only: 'postPage'
});

Router.onBeforeAction(requireLogin, {
    only: 'postSubmit'
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
