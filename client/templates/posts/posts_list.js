Template.postsList.helpers({
    posts: function() {
    	var result = Posts.find({}, {
                    sort: {
                        submitted: -1
                    }
                });
        // Tracker.autorun(function() {
        //     var searchTags = Session.get("searchTags");
        //     if (typeof searchTags === "undefined") {
        //         console.log("inside if");
        //         var result = Posts.find({}, {
        //             sort: {
        //                 submitted: -1
        //             }
        //         });
        //     } else {
        //         console.log("inside else");
        //         var result = Posts.find({
        //             tags: {
        //                 $in: searchTags
        //             }
        //         }, {
        //             sort: {
        //                 submitted: -1
        //             }
        //         });
        //     }
        // });
        return result;
    }
});

Template.postsList.rendered = function() {
    AnimatedEach.attachHooks(this.find(".posts"));
};
