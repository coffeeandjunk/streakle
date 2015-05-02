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

Messages = new Mongo.Collection("messages");

Rooms = new Mongo.Collection("rooms");
