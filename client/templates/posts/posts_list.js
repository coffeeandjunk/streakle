Template.postsList.rendered = function() {
    AnimatedEach.attachHooks(this.find(".posts"));
    // console.log('postlist is rendered');
     Session.set("postsLimit", ITEMS_INCREMENT);
    $(window).scroll(showMoreVisible);
};

Template.postsList.destroyed = function(){
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
            Session.set("postsLimit",
                Session.get("postsLimit") + ITEMS_INCREMENT);
        }
    } else {
        if (target.data("visible")) {
            console.log("target became invisible (below viewable arae)");
            target.data("visible", false);
        }
    }        
}

Tracker.autorun(function() {
    Meteor.subscribe('posts', {
      sort: {
          submitted: -1
      },
      limit: Session.get('postsLimit')
    });
    console.log('deps.autorun called:::: postsLimit::: ', Session.get('postsLimit'))
  });