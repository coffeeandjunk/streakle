imageStore = new FS.Store.GridFS("images");

postImages = new FS.Collection("images", {
    stores: [imageStore],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

Posts = new Mongo.Collection('posts');

// Posts.allow({
//     update: function(userId, post) {
//         return ownsDocument(userId, post);
//     },
//     remove: function(userId, post) {
//         return ownsDocument(userId, post);
//     },
// });

// Posts.deny({
//     update: function(userId, post, fieldNames) {
//         // may only edit the following two fields:
//         return (_.without(fieldNames, 'content', 'imageUrl').length > 0);
//     }
// });

Meteor.methods({
    postInsert: function(postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            content: String
        });

        var postWithSameLink = Posts.findOne({
            content: postAttributes.content
        });
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.profile.firstName + " " + user.profile.lastName,
            submitted: new Date()
        });
        var postId = Posts.insert(post);
        Posts.update(postId, {
            $set: image
        });
        return {
            _id: postId
        };
    }
});

Messages = new Mongo.Collection("messages");

Rooms = new Mongo.Collection("rooms");

// Rooms.deny({
//       insert: function(userId, doc) {
//           return true;
//       },
//       update: function(userId, doc, fieldNames, modifier) {
//           return true;
//       },
//       remove: function(userId, doc) {
//           return true;
//       }
//   });

//   Messages.deny({
//       insert: function(userId, doc) {
//           return (userId === null);
//       },
//       update: function(userId, doc, fieldNames, modifier) {
//           return true;
//       },
//       remove: function(userId, doc) {
//           return true;
//       }
//   });

//   Messages.allow({
//       insert: function(userId, doc) {
//           return (userId !== null);
//       }
//   });
