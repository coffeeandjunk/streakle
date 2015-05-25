// Template.imagePreview.helpers({
//     previewImages: function() {
//         return postImages.find();
//     },
// });

Template.postSubmit.helpers({
    // profilePic: function() {
    //     var userProfile = Meteor.user().profile;
    //     return userProfile.image;
    // }

    settings: function() {
        return {
            position: "bottom",
            limit: 5,
            rules: [{
                token: '#',
                collection: Tags,
                field: "tagName",
                // filter: { userId: Meteor.user()._id },
                template: Template.dataPiece
            }]
        };
    }
});

Template.postSubmit.rendered = function() {
    $('textarea').autosize();
};

var image = {};

_resetSubmitForm = function() {
    $('#postContent').val("");
    _resetImageUploader();
    _clearPreview();
    _toggleClosePreviw('hide');
    submit = false;
};

_clearPreview = function() {
    $('#preview-container img').remove();
}

_resetImageUploader = function() {
    $("#post-file-upload").val('');
}

_toggleClosePreviw = function(className) {
    if (className === 'hide') {
        $('form').find('button.close').addClass('hide');
    } else {
        $('form').find('button.close').removeClass('hide');
    }
}

_toggleUploadIcon = function(className) {
    if (className === 'hide') {
        $('form').find('div#post-img-upload').addClass('hide');
    } else {
        $('form').find('div#post-img-upload').removeClass('hide');
    }
}

_readURL = function(input) {
    console.log('readurl called');
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var img = $('<img />', {
                'class': 'upload-preview img-thumbnail',
                'src': ''
            });

            img.attr('src', e.target.result);
            var previewContainer = $('#preview-container');
            if (previewContainer.find('img').length < 1) {
                img.appendTo(previewContainer);
                _toggleClosePreviw('show');
            }

        }

        reader.readAsDataURL(input.files[0]);
    }
}

_isFormEmpty = function(form) {
    var content = $('#postContent').val();
    if (!content || $('#post-file-upload').val() === '') {
        return true;
    }
}

_showFormError = function(form) {
    $(form.target).parent('.post-form-container').addClass('has-error');
}

_clearFormError = function(form) {
    $(form.target).parent('.post-form-container').removeClass('has-error');
}


var _insertFile = FS.EventHandlers.insertFiles(postImages, {
    metadata: function(fileObj) {
        fileObject = fileObj;
        // console.log('change is trigggered, fileobj: ', fileObj)
        return {
            owner: Meteor.userId(),
            submitted: new Date()
        };
    },
    after: function(error, fileObj) {
        // console.log('after is called');
        // console.log("Inserted", fileObj.name);
        imageId: fileObj._id;
        if (fileObj._id) {
            image = {
                imageUrl: "/cfs/files/images/" + fileObj._id,
                imageId: fileObj._id
            };
            // _post();
            // _toggleClosePreviw('show');
        };

    }
});



var submit = false;

var _post = function() {
    var user = Meteor.user();
    var content = $('#postContent').val();
    post = {
        content: content,
        userId: user._id,
        submitted: new Date(),
        commentsCount: 0
    };

    post._id = Posts.insert(post);
    console.log('image obj: ', image);
    if (image.imageUrl) {
        Posts.update(post._id, {
            $set: image
        });
    }

    var user = Meteor.user();
    message = {
        userId: user._id,
        submitted: new Date(),
        msg: content,
        room: Session.get("roomname")
            // room: category
    };
    messages._id = Messages.insert(message);
    if (image.imageUrl) {
        Messages.update(messages._id, {
            $set: image
        });
    }
    $('[name=postContent]').val("")
        .css("height", "52px");
    $('#messages').scrollTo('max', 80);
    // $('#messages').scrollTop($('#messages').prop("scrollHeight"));
    _resetImageUploader();
    _clearPreview();
    _toggleClosePreviw('hide');
    _toggleUploadIcon('show');
    _resetSubmitForm();
    return post._id;
}

// Meteor.startup(function () {

Template.postSubmit.events({
    'change #post-img-upload': function(e) {
        console.log('change triggered');
        // if (!submit) {
        _readURL(document.getElementById('post-file-upload'));
        _toggleUploadIcon('hide');
        // } else if (submit) {
        // console.log('inside else');
        _insertFile(e, this);
        // }
    },
    'click form button.close': function(e) {
        // _removeIma;
        _resetImageUploader();
        _clearPreview();
        _toggleClosePreviw('hide');
        postImages.remove(fileObject._id);
        _toggleUploadIcon('show');
    },

    'submit form': function(e) {
        e.preventDefault();
        if (_isFormEmpty(e)) {
            _showFormError(e);
            return false;
        } else {
            //split the sentence into words and remove trailing comma
            var words = _.map($('#postContent').val().split(/\s+/), function(word){
                return word.replace(',', '');
            })
            var keywords = [
                '#Typography',
                '#Animation',
                '#Illustration',
                '#GraphicDesign',
                '#ConceptArt',
                '#UIDesign',
                '#IndustrialDesign',
                '#CharacterDesign'
            ];
            var category = $.grep(keywords, function(keyword, index) {
                return $.inArray(keyword, words) > -1;
            });
            if (category.length === 0) {
                console.log("No category specified");
            } else if (category.length > 1) {
                console.log("More than one category");
            } else {
                Session.set("roomname", category[0]);
                var postId = _post();
                Meteor.call('insertTagEntry', category[0], postId);
                submit = true;
                _clearFormError(e);
            }
        }
    }
});
