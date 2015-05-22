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

Tags = new Meteor.Collection('tags');

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

Comments = new Meteor.Collection('comments');

Meteor.methods({
    comment: function(commentAttributes) {
        var user = Meteor.user();
        var post = Posts.findOne(commentAttributes.postId);
        // ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login to make comments");
        if (!commentAttributes.body)
            throw new Meteor.Error(422, 'Please write some content');
        if (!commentAttributes.postId)
            throw new Meteor.Error(422, 'You must comment on a post');
        comment = _.extend(_.pick(commentAttributes, 'postId', 'body'), {
            userId: user._id,
            author: user.username,
            submitted: new Date().getTime()
        });

        Posts.update(comment.postId, {$inc: {commentsCount: 1}});
        return Comments.insert(comment);
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
