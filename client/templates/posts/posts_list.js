Template.postsList.helpers({
    posts: function() {
        Tracker.autorun(function() {
            var searchTags = Session.get("searchTags");
            if (searchTags === []) {
                return Posts.find({}, {
                    sort: {
                        submitted: -1
                    }
                });
            } else {
                return Posts.find({
                	tags: searchTags
                }, {
                    sort: {
                        submitted: -1
                    }
                });
            }
        });
    }
});

Template.postsList.rendered = function() {
    AnimatedEach.attachHooks(this.find(".posts"));
};
