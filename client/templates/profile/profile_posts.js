 Template.profilePosts.helpers({
     posts: function() {
         return Posts.find({
             userId: this._id
         }, {
             sort: {
                 submitted: -1
             }
         });
     }
 });
