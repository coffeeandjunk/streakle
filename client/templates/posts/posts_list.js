Template.postsList.helpers({
    posts: function() {
        Tracker.autorun(function() {
            var searchTags = Session.get("searchTags");
            if (searchTags.length === 0) {
                console.log("inside if");
                result = Posts.find({}, {
                    sort: {
                        submitted: -1
                    }
                }).fetch();
            } else {
                console.log("inside else");
                console.log(searchTags);
                result = Posts.find({
                    tags: {
                        $all: searchTags
                    }
                }, {
                    sort: {
                        submitted: -1
                    }
                }).fetch();
            }
        });
        return result;
    }
});

Template.postsList.rendered = function() {
    AnimatedEach.attachHooks(this.find(".posts"));
};
