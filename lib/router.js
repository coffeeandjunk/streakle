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


if (Meteor.isClient) {
    ITEMS_INCREMENT = 5;
    Session.setDefault('postsLimit', ITEMS_INCREMENT);
}

_resetScroll = function() {
    var scrollTo = window.currentScroll || 0;
    $('body').scrollTop(scrollTo);
    $('body').css("min-height", 0);
}

_requireLogin = function() {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('signinPage');
        }
    } else this.next();
}

PostsListController = RouteController.extend({
    template: 'homePage',
    increment: 5,
    postsLimit: function() {
        return Session.get('postsLimit');
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
            postsLimit: this.postsLimit() + ITEMS_INCREMENT
        });
        return {
            posts: this.posts(),
            ready: this.postsSub.ready,
            nextPath: hasMore ? nextPath : null
        };
    }
});

ProfilePostsController = RouteController.extend({
    template: 'profileView',
    increment: 5,
    postsLimit: function() {
        return Session.get('postsLimit');
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
        this.postsSub = Meteor.subscribe('profilePosts', this.params._id, this.findOptions());
    },
    profilePosts: function() {
        return Posts.find({
            userId: this.params._id
        }, this.findOptions());
    },
    data: function() {
        var hasMore = this.profilePosts().count() === this.postsLimit();
        var nextPath = this.route.path({
            postsLimit: this.postsLimit() + ITEMS_INCREMENT
        });
        return {
            posts: this.profilePosts(),
            ready: this.postsSub.ready,
            nextPath: hasMore ? nextPath : null,
            user: Meteor.users.findOne(this.params._id)
        };
    }
});

Router.route('/', {
    name: 'homePage',
    controller: PostsListController
});

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
        if (Meteor.user()) Router.go('homePage')
        else this.next();
    }
});

Router.route('/posts/:_id', {
    name: 'postPage',
    waitOn: function() {
        return [
            Meteor.subscribe('comments', this.params._id),
            Meteor.subscribe('singlePost', this.params._id)
        ];
    },
    data: function() {
        return Posts.findOne(this.params._id);
    },
    onAfterAction: function() {
        _resetScroll();
    }
});

Router.route('/profile/:_id/', {
    name: 'profileView',
    controller: ProfilePostsController
});


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
