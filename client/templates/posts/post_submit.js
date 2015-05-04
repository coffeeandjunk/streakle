Template.imagePreview.helpers({
    previewImages: function() {
        return postImages.find();
    },
});

Template.postSubmit.helpers({
    profilePic: function() {
        var userProfile = Meteor.user().profile;
        return userProfile.image;
    }

});

_messagePost = function() {
    var el = document.getElementById("postContent");
    var user = Meteor.user();
    Messages.insert({
        userId: user._id,
        author: user.profile.firstName + " " + user.profile.lastName,
        authorImage: user.profile.image,
        authorSchool: user.profile.school,
        submitted: new Date(),
        msg: el.value,
        room: Session.get("roomname")
    });
    el.value = "";
    el.focus();
};

Template.postSubmit.events({
    'click #img-upload': function(e) {
        document.getElementById('file-upload').click();
    },

    'change #file-upload': FS.EventHandlers.insertFiles(postImages, {
        metadata: function(fileObj) {
            return {
                owner: Meteor.userId(),
                submitted: new Date()
            };
        },
        after: function(error, fileObj) {
            console.log("Inserted", fileObj.name);
            imageId: fileObj._id;
            image = {
                imageUrl: "/cfs/files/images/" + fileObj._id
            };
        }
    }),

    'submit form': function(e) {
        e.preventDefault();
        var user = Meteor.user();
        post = {
            content: $(e.target).find('[name=postContent]').val(),
            userId: user._id,
            author: user.profile.firstName + " " + user.profile.lastName,
            authorImage: user.profile.image,
            authorSchool: user.profile.school,
            submitted: new Date(),
            commentsCount: 0
        };

        // Meteor.call('postInsert', post, function(error, result) {
        //     // display the error to the user and abort
        //     if (error)
        //         return alert(error.reason);
        //     // show this result but route anyway
        //     if (result.postExists)
        //         alert('This link has already been posted');
        //     Router.go('postPage', {
        //         _id: result._id
        //     });
        // });

        post._id = Posts.insert(post);
        Posts.update(post._id, {
            $set: image
        });
        var user = Meteor.user();
        message = {
            userId: user._id,
            author: user.profile.firstName + " " + user.profile.lastName,
            authorImage: user.profile.image,
            authorSchool: user.profile.school,
            submitted: new Date(),
            // msg: el.value,
            // room: Session.get("roomname")

            // username: Meteor.user().profile.name,
            msg: $(e.target).find('[name=postContent]').val(),
            // ts: new Date(),
            room: Session.get("roomname")
        };
        messages._id = Messages.insert(message);
        Messages.update(messages._id, {
            $set: image
        });
        $('[name=postContent]').val("");
        // postImages.remove({_id:fileObj._id});
    },

    // settings: function() {
    //     return {
    //         position: "top",
    //         limit: 5,
    //         rules: [{
    //             token: '@',
    //             collection: Meteor.users,
    //             field: "username",
    //             template: Template.userPill
    //         }, {
    //             token: '#',
    //             collection: Rooms,
    //             field: "_id",
    //             options: '',
    //             matchAll: true,
    //             filter: {
    //                 type: "autocomplete"
    //             },
    //             template: Template.dataPiece
    //         }]
    //     };
    // }

});
