Template.postItem.helpers({
    authorProfile: function() {
        return "/profile/" + this.userId;
    },
    FSimages: function() {
        return postImages.find();
    }

});


Template.postItem.onRendered(function () {
  var img = document.getElementById('post-image');
  console.log('postitem rendered');
  // anno.makeAnnotatable(img);
});
