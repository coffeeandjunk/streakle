 Template.profilePosts.helpers({
     posts: function() {
         return Posts.find({
             userId: this._id
         }, {
             sort: {
                 submitted: -1
             }
         });
     },
     postsCount: function() {
         return Posts.find({
             userId: this._id
         }).count();
     }
 });
