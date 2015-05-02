// if (Posts.find().count() === 0) {
//     Posts.insert({
//     	image: '/images/fatboy.jpg',
//         content: 'Microscope is a simple social news app that lets you share links, comment, and vote on them'
//     });

//     Posts.insert({
//     	image: '/images/night-rod.jpg',
//         content: 'There are 2 branches in this repository which correspond to advanced code that is covered in sidebars of the book, and outside of the main code progression. They are tagged sidebarX-Y, corresponding to the sidebar number in the book.'
//     });

//     Posts.insert({
//     	image: '/images/forty-eight.jpg',
//         content: 'The commits to this repository are organized in a very linear fashion, corresponding to progress throughout the book. Commits are tagged in the format chapterX-Y, indicating the Yth commit of chapter X.'
//     });
// }

// Meteor.startup(function() {
//     Messages.remove({});
//     Rooms.remove({});
    if (Rooms.find().count() === 0) {
        [
        "#General",
        "#Typography",
        "#Animation",
        "#Illustration",
        "#GraphicDesign",
        "#UIDesign",
        "#IndustrialDesign",
        "#CharacterDesign"
        ].forEach(function(r) {
            Rooms.insert({
                roomname: r
            });
        });
    }
// });

Rooms.deny({
    insert: function(userId, doc) {
        return true;
    },
    update: function(userId, doc, fieldNames, modifier) {
        return true;
    },
    remove: function(userId, doc) {
        return true;
    }
});

Messages.deny({
    insert: function(userId, doc) {
        return (userId === null);
    },
    update: function(userId, doc, fieldNames, modifier) {
        return true;
    },
    remove: function(userId, doc) {
        return true;
    }
});

Messages.allow({
    insert: function(userId, doc) {
        return (userId !== null);
    }
});