Template.commentSubmit.onCreated(function() {
    Session.set('commentSubmitErrors', {});
});

Template.commentSubmit.helpers({
    errorMessage: function(field) {
        return Session.get('commentSubmitErrors')[field];
    },
    errorClass: function(field) {
        return !!Session.get('commentSubmitErrors')[field] ? 'has-error' : '';
    }
});

Template.commentSubmit.rendered = function() {
    $('textarea').autosize();
};

Template.commentSubmit.events({
    'submit form': function(e, template) {
        e.preventDefault();
        var user = Meteor.user();
        // var post = Posts.findOne(commentAttributes.postId);
        var $body = $(e.target).find('[name=body]');
        comment = {
            body: $body.val(),
            postId: template.data._id,
            userId: user._id,
            submitted: new Date()
        };

        var errors = {};
        if (!comment.body) {
            errors.body = "Please write some content";
            return Session.set('commentSubmitErrors', errors);
        }

        comment._id = Comments.insert(comment);
        Posts.update(comment.postId, {
            $inc: {
                commentsCount: 1
            }
        });
        $body.val('');
        $('body').scrollTo('max', 80);
        $('.btn-comment').blur();

        // Meteor.call('commentInsert', comment, function(error, commentId) {
        //     if (error) {
        //         throwError(error.reason);
        //     } else {
        //         $body.val('');
        //     }
        // });
    }
});
