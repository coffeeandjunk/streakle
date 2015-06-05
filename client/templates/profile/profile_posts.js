 Template.profilePosts.helpers({
    postsCount: function() {
        return Meteor.user().profile.postsCount;
    },
 });
