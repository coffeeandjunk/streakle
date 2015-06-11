Template.profilePosts.helpers({
    // postsCount: function() {
    //     var user = Meteor.users.findOne({
    //        _id: this._id
    //    });
    //     return user.profile.postsCount;

    // },
    moreResults: function() {
        // If, once the subscription is ready, we have less rows than we
        // asked for, we've got all the rows in the collection.
        return !(Posts.find().count() < Session.get("postsLimit"));
    }
});


Template.profilePosts.rendered = function() {
    AnimatedEach.attachHooks(this.find(".profilePosts"));
    // console.log('profilePosts is rendered');
    // Session.set("postsLimit",
    //     Session.get("postsLimit") + ITEMS_INCREMENT);
    $(window).scroll(showMoreVisible);
};

Template.profilePosts.destroyed = function() {
    // $(window).off('scroll');
}

showMoreVisible = function() {
    var threshold, target = $(".load-more");
    if (!target.length) return;

    threshold = $(window).scrollTop() + $(window).height() - target.height() + 250;

    if (target.offset().top < threshold) {
        if (!target.data("visible")) {
            // console.log("target became visible (inside viewable area)");
            target.data("visible", true);
            Session.set("postsLimit",
                Session.get("postsLimit") + ITEMS_INCREMENT);
        }
    } else {
        if (target.data("visible")) {
            // console.log("target became invisible (below viewable area)");
            target.data("visible", false);
        }
    }
}
