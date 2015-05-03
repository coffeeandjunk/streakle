Template.postsList.helpers({
    posts: function() {
        return Posts.find({}, {sort: {submitted: -1}});
    }
});

Template.postsList.rendered = function() {
    AnimatedEach.attachHooks( this.find(".posts") );
};