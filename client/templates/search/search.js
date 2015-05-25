Template.searchPage.helpers({
  posts: function() {
    getPosts
  },
  tagtest: function() {
    return Posts.find({}, {
      sort: {
        submitted: -1
      }
    });
  }
});


// this.tag;