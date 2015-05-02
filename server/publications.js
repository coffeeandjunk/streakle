Meteor.publish('posts', function() {
    return Posts.find();
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

Meteor.publish("users", function() {
    return Meteor.users.find();
});
