Template.postItem.helpers({
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
        return user.profile.firstName + " " + user.profile.lastName;
    },
    authorImage: function() {
        user = Meteor.users.findOne({
            _id: this.userId
        });
        return user.profile.image;
    }
});


Template.postItem.onRendered(function() {
    var img = document.getElementById('post-image');
    console.log('postitem rendered');
    // anno.makeAnnotatable(img);
});
