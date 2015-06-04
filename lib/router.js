// var ITEMS_INCREMENT = 5;
// Session.setDefault('postsLimit', ITEMS_INCREMENT);
// Tracker.autorun(function() {
//     Meteor.subscribe('posts', Session.get('postsLimit'));
// })


Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return [
            Meteor.subscribe('images'),
            Meteor.subscribe("rooms"),
            Meteor.subscribe("messages"),
            Meteor.subscribe("users"),
            Meteor.subscribe('tags')
        ];
    }
});

// Router.route('/', {
//     name: 'homePage',
// });

PostsListController = RouteController.extend({
    template: 'homePage',
    increment: 5,
    postsLimit: function() {
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function() {
        return {
            sort: {
                submitted: -1
            },
            limit: this.postsLimit()
        };
    },
    subscriptions: function() {
        this.postsSub = Meteor.subscribe('posts', this.findOptions());
    },
    posts: function() {
        return Posts.find({}, this.findOptions());
    },
    data: function() {
        var hasMore = this.posts().count() === this.postsLimit();
        var nextPath = this.route.path({
            postsLimit: this.postsLimit() + this.increment
        });
        return {
            posts: this.posts(),
            ready: this.postsSub.ready,
            nextPath: hasMore ? nextPath : null
        };
    }
});

Router.route('/:postsLimit?', {
  name: 'homePage',
  waitOn: function() {
    var limit = parseInt(this.params.postsLimit) || 5; 
    return Meteor.subscribe('posts', {sort: {submitted: -1}, limit: limit});
  },
  data: function() {
    var limit = parseInt(this.params.postsLimit) || 5; 
    return {
      posts: Posts.find({}, {sort: {submitted: -1}, limit: limit})
    };
  }
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
        else this.next();
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
        return [
            Meteor.subscribe('singlePost', this.params._id),
            Meteor.subscribe('comments', this.params._id)
        ];
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
