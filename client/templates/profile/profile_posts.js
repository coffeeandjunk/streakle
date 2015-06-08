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
         return !(Posts.find().count() < Session.get("profilePostsLimit"));
     }
 });


 Template.profilePosts.rendered = function() {
     AnimatedEach.attachHooks(this.find(".posts"));
     // console.log('profilePosts is rendered');
     Session.set("profilePostsLimit", ITEMS_INCREMENT);
     $(window).scroll(showMoreVisible);
 };

 Template.profilePosts.destroyed = function() {
     $(window).off('scroll');
 }

 showMoreVisible = function() {
     var threshold, target = $(".load-more");
     if (!target.length) return;

     threshold = $(window).scrollTop() + $(window).height() - target.height();

     if (target.offset().top < threshold) {
         if (!target.data("visible")) {
             console.log("target became visible (inside viewable area)");
             target.data("visible", true);
             Session.set("profilePostsLimit",
                 Session.get("profilePostsLimit") + ITEMS_INCREMENT);
         }
     } else {
         if (target.data("visible")) {
             console.log("target became invisible (below viewable arae)");
             target.data("visible", false);
         }
     }
 }


 Tracker.autorun(function() {
     Meteor.subscribe('profilePosts', {
         sort: {
             submitted: -1
         },
         limit: Session.get('profilePostsLimit')
     });
     console.log('Tracker.autorun called:::: profilePostsLimit::: ', Session.get('profilePostsLimit'))
 });
