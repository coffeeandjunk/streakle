// Meteor.publish('posts', function(searchTags) {
//     // console.log(searchTags.length);
//     if (typeof searchTags.length === "undefined") {
//         return Posts.find();
//     } else {
//         return Posts.find({
//             tags: searchTags
//         });
//     }
// });

Meteor.publish('posts', function() {
    return Posts.find();
});

Meteor.publish('comments', function(postId) {
    check(postId, String);
    return Comments.find({
        postId: postId
    });
});

Meteor.publish('images', function() {
    return postImages.find();
});

Meteor.publish('messages', function() {
    return Messages.find();
});

Meteor.publish('rooms', function() {
    return Rooms.find();
});

Meteor.publish("tags", function() {
    return Tags.find();
});

Meteor.publish("users", function() {
    return Meteor.users.find();
});

Meteor.publish('notifications', function() {
    return Notifications.find({
        userId: this.userId
    });
});
