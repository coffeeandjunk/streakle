Template.post.onRendered(function() {
    var img = document.getElementById('post-image');
    if (img) {
        //prevent the image from being draggable from annoting
        // this.ondragstart = function() { return false; };
        // $(img).on('dragstart', function(event) { event.preventDefault(); });
        // console.log('post rendered');
        // anno.makeAnnotatable(img);
        // $('.annotorious-annotationlayer').on('dragstart', function(event) { event.preventDefault(); });
    }
});

Template.post.helpers({
    FSimages: function() {
        return postImages.find();
    },
    imageId: function() {
        return this.imageId;
    },
    authorProfile: function() {
        return "/profile/" + this.userId;
    },
    authorSchool: function() {
        user = Meteor.users.findOne({
            _id: this.userId
        });
        return user.profile.school;
    },
    author: function() {
        user = Meteor.users.findOne({
            _id: this.userId
        });
        return user.profile.name;
    },
    authorImage: function() {
        user = Meteor.users.findOne({
            _id: this.userId
        });
        if (!user.services.facebook) {
            return user.profile.image;
        } else return user.profile.picture;
    }
});

Template.post.onDestroyed(function() {
    // console.log('destroyed called');
});
