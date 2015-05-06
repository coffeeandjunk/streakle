Template.post.onRendered(function () {
  var img = document.getElementById('post-image');
  if(img){
    //prevent the image from being draggable from annoting
    // this.ondragstart = function() { return false; };
    // $(img).on('dragstart', function(event) { event.preventDefault(); });
    console.log('post rendered');
    anno.makeAnnotatable(img);
    // $('.annotorious-annotationlayer').on('dragstart', function(event) { event.preventDefault(); });
  }
});

Template.post.events({
  // 'ondragstart #post-image': function(event){
  //   console.log('event: ', event);
  //   event.preventDefault();
  //   return false;
  // }
});


  Template.post.onDestroyed(function () {
    console.log('destroyed called');
  });
