Template.imagePreview.helpers({
    images: function() {
        return postImages.find();
    }
});

Template.postSubmit.helpers({
    images: function() {
        return postImages.find();
    },

});

Template.postSubmit.events({
    'click #img-upload': function(e) {
        document.getElementById('file-upload').click();
    },

    // 'change #file-upload': function(event, template) {
    //     FS.Utility.eachFile(event, function(file) {
    //         var result = postImages.insert(file, function(err, fileObj) {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 image = {
    //                     imageID: fileObj._id
    //                 };

    //             }

    //         });
    //     });
    // },

    'change #file-upload': FS.EventHandlers.insertFiles(postImages, {
        metadata: function(fileObj) {
            return {
                owner: Meteor.userId(),
                submitted: new Date()
            };
        },
        after: function(error, fileObj) {
            console.log("Inserted", fileObj.name);
            image = {
                imageName: fileObj.name,
                imageID: fileObj._id
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
        $('[name=postContent]').val("");
    }

});
