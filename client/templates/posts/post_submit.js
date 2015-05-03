Template.imagePreview.helpers({
    previewImages: function() {
        return postImages.find();
    },
});

Template.postSubmit.helpers({
    profilePic: function () {
        var userProfile = Meteor.user().profile;
        return userProfile.image;
    }

});

_messagePost = function() {
    var el = document.getElementById("postContent");
    Messages.insert({
        username: Meteor.user().profile.name,
        msg: el.value,
        ts: new Date(),
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
        post = {
            content: $(e.target).find('[name=postContent]').val()
        };
        post._id = Posts.insert(post);
        Posts.update(post._id, {
            $set: image
        });
        message = {
            username: Meteor.user().profile.name,
            msg: $(e.target).find('[name=postContent]').val(),
            ts: new Date(),
            room: Session.get("roomname")
        };
        messages._id = Messages.insert(message);
        Messages.update(messages._id, {
            $set: image
        });
        $('[name=postContent]').val("");
        // postImages.remove({_id:fileObj._id});
    }

});
