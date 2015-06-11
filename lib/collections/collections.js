smallImages = function(fileObj, readStream, writeStream) {
    var width = 0,
        height = 0;
    // console.log('storing resized image: ', fileObj._id);
    gm(readStream, fileObj.name()).resize(500).stream().pipe(writeStream); //resize the image to a width of 800 keeping the aspect ratio same
}

midImages = function(fileObj, readStream, writeStream) {
    var width = 0,
        height = 0;
    // console.log('storing resized image: ', fileObj._id);
    gm(readStream, fileObj.name()).resize(900).stream().pipe(writeStream); //resize the image to a width of 800 keeping the aspect ratio same
}

postImages = new FS.Collection("images", {
    stores: [
        new FS.Store.GridFS("images", {
            transformWrite: smallImages
        }),
        new FS.Store.GridFS("midImages", {
            transformWrite: midImages
        }),
        new FS.Store.GridFS("bigImages")
    ],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});


Posts = new Mongo.Collection('posts');

Tags = new Meteor.Collection('tags');

Meteor.users.allow({
    update: function(userId) {
        return true;
    }
});

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
//         return (_.without(fieldNames, 'content',).length > 0);
//     }
// });

Comments = new Meteor.Collection('comments');

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
            submitted: new Date()
        });
        var postId = Posts.insert(post);
        Posts.update(postId, {
            $set: image
        });
        return {
            _id: postId
        };
    },
    commentInsert: function(commentAttributes) {
        check(this.userId, String);
        check(commentAttributes, {
            postId: String,
            body: String
        });

        var user = Meteor.user();
        var post = Posts.findOne(commentAttributes.postId);

        if (!post)
            throw new Meteor.Error('invalid-comment', 'You must comment on a post');

        comment = _.extend(commentAttributes, {
            userId: user._id,
            author: user.profile.name,
            submitted: new Date()
        });

        // update the post with the number of comments
        Posts.update(comment.postId, {
            $inc: {
                commentsCount: 1
            }
        });

        // create the comment, save the id
        comment._id = Comments.insert(comment);

        // now create a notification, informing the user that there's been a comment
        createCommentNotification(comment);

        return comment._id;
    },
    deletePost: function(postId) {

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


Notifications = new Mongo.Collection('notifications');

Notifications.allow({
    update: function(userId, doc, fieldNames) {
        return ownsDocument(userId, doc) &&
            fieldNames.length === 1 && fieldNames[0] === 'read';
    }
});

createCommentNotification = function(comment) {
    var post = Posts.findOne(comment.postId);
    if (comment.userId !== post.userId) {
        Notifications.insert({
            userId: post.userId,
            postId: post._id,
            commentId: comment._id,
            commenterName: comment.author,
            read: false
        });
    }
};
