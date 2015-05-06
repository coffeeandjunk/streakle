Template.postItem.helpers({
    authorProfile: function() {
        return "/profile/" + this.userId;
    }

});


Template.postItem.onRendered(function () {
  var img = document.getElementById('post-image');
  console.log('postitem rendered');
  // anno.makeAnnotatable(img);
});
