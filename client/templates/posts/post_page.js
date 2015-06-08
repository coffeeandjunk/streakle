Template.postPage.events({
	'click .btn-close': function () {
		window.history.back();
	}
});

Template.postPage.rendered = function () {
	AnimatedEach.attachHooks(this.find(".comments"));
};