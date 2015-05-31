Template.postPage.helpers({
    comments: function() {
        return Comments.find({
            postId: this._id
        });
    }
});

Template.postPage.events({
	'click .btn-close': function () {
		window.history.back();
	}
});