Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    // signInTemplate: 'signinPage',
    waitOn: function() {
        return [Meteor.subscribe('images'), Meteor.subscribe('posts'), Meteor.subscribe("rooms"), Meteor.subscribe("messages"), Meteor.subscribe("users"), Meteor.subscribe('tags')];
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

Router.route('/profile-info', {
    name: 'profileInfo',
    onBeforeAction: function(pause) {
        if (Meteor.user().profile.returning) Router.go('homePage')
            else  this.next();
    }
});

Router.route('/sign-in', {
    name: 'signinPage',
    onBeforeAction: function(pause) {
        if (Meteor.user()) {
            // render the login template but keep the url in the browser the same
            Router.go('homePage');
        }
    }
});

// Router.route('/backdoor-login', {
//     name: 'backdoor'
// });

// searchTags = Session.get("searchTags");

// Router.route('/posts/:searchTags', {
//     name: 'postsList',
//     data: function() {
// Meteor.subscribe('posts', this.params.searchTags);
//         return result;
//     }
// });

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
    only: ['profileInfo', 'homePage']
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
