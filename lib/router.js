Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    // signInTemplate: 'signinPage',
    waitOn: function() {
        return [Meteor.subscribe('posts'), Meteor.subscribe('images'), Meteor.subscribe("rooms"), Meteor.subscribe("messages"), Meteor.subscribe("users"), Meteor.subscribe('tags')];
    }
});

Router.route('/', {
    name: 'homePage',
});

_resetScroll = function() {
    var scrollTo = window.currentScroll || 0;
    $('body').scrollTop(scrollTo);
    $('body').css("min-height", 0);
}

Router.route('/profile-edit', {
    name: 'profileInfo',
});

Router.route('/sign-in', {
    name: 'signinPage'
});

Router.route('/posts/:_id', {
    name: 'postPage',
    waitOn: function() {
        return Meteor.subscribe('comments', this.params._id);
    },
    data: function() {
        return Posts.findOne(this.params._id);
    },
    onAfterAction: function() {
        _resetScroll();
    }
});

Router.route('/profile/:_id', {
    name: 'profileView',
    data: function() {
        return Meteor.users.findOne(this.params._id);
    }
});

_requireLogin = function() {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('signinPage');
        }
    } else this.next();
}

Router.onBeforeAction('dataNotFound', {
    only: ['postPage', 'profileView']
});

Router.onBeforeAction(_requireLogin, {
    only: ['profileInfo','homePage']
});

// _onLoggedIn = function() {
//     // if (!Meteor.user()) return;
//     if (!Meteor.user().returning) {
//         Meteor.users.update(Meteor.userId(), {
//             $set: {
//                 returning: true
//             }
//         });
//         this.next();
//     } else this.render('homePage');
// }
