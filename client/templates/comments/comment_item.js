Template.commentItem.helpers({
    submittedTime: function() {
        return this.submitted.toLocaleTimeString();
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
        return user.profile.firstName + " " + user.profile.lastName;
    },
    authorImage: function() {
        user = Meteor.users.findOne({
            _id: this.userId
        });
        return user.profile.picture;
    }
});
