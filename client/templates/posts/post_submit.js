Template.postSubmit.helpers({
    // profilePic: function() {
    //     var userProfile = Meteor.user().profile;
    //     return userProfile.image;
    // }

    settings: function() {
        return {
            position: "bottom",
            limit: 8,
            rules: [{
                token: '#',
                collection: Tags,
                field: "tagName",
                // filter: { userId: Meteor.user()._id },
                template: Template.userPill
            }]
        };
    }
});

Template.postSubmit.rendered = function() {
    $('textarea').autosize();
    $('[data-toggle="tooltip"]').tooltip();
    $('.progress').hide();
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
    // console.log('readurl called');
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
    $("#no-content").show();
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
        commentsCount: 0,
        likes: []
    };

    post._id = Posts.insert(post);
    // console.log('image obj: ', image);
    if (image.imageUrl) {
        Posts.update(post._id, {
            $set: image
        });
    }

    var user = Meteor.user();
    var imageUrl = image.imageUrl;
    var imageId = image.imageId;
    var messagePush = Rooms.update({
        _id: Session.get("roomId")
    }, {
        $push: {
            messages: {
                userId: user._id,
                postId: post._id,
                submitted: new Date(),
                msg: content,
                imageUrl: imageUrl,
                imageId: imageId
            }
        }
    });
    $('[name=postContent]').val("")
        .css("height", "52px");
    // $('#messages').scrollTo('max', 80);
    $("#messages").animate({
        scrollTop: $(document).height() - $(window).height()
    });
    _resetImageUploader();
    _clearPreview();
    _toggleClosePreviw('hide');
    _toggleUploadIcon('show');
    _resetSubmitForm();
}

// Meteor.startup(function () {

Template.postSubmit.events({
    'change #post-img-upload': function(e) {
        // $("#post-file-upload").click();
        // console.log('change triggered');
        // if (!submit) {
        _readURL(document.getElementById('post-file-upload'));
        _toggleUploadIcon('hide');
        // } else if (submit) {
        // console.log('inside else');
        _insertFile(e, this);
        $(".progress").show();
        // }
    },
    'click form button.close': function(e) {
        // _removeIma;
        _resetImageUploader();
        _clearPreview();
        _toggleClosePreviw('hide');
        postImages.remove(fileObject._id);
        _toggleUploadIcon('show');
        $("#no-content").hide();
        $(".progress").hide();
    },

    'submit form': function(e) {
        e.preventDefault();
        if (_isFormEmpty(e)) {
            _showFormError(e);
            return false;
        } else {
            var words = $('#postContent').val().split(/\s+/);
            // console.log(words[0]);
            var keywords = [
                "#Typography",
                "#Calligraphy",
                "#Cartoon",
                "#Illustration",
                "#GraphicDesign",
                "#DigitalArt",
                "#UIDesign",
                "#InteractionDesign",
                "#Painting",
                "#IndustrialDesign",
                "#CharacterDesign"
            ];
            var category = $.grep(keywords, function(keyword, index) {
                return $.inArray(keyword, words) > -1;
            });
            if (category.length === 0) {
                $("#no-category").show();
                console.log("No category specified");
            } else if (category.length > 1) {
                $("#more-category").show();
                console.log("More than one category");
            } else {
                // console.log(category[0]);
                Session.set("roomName", category[0]);
                var currSession = Rooms.findOne({
                    roomName: Session.get("roomName")
                })
                console.log(Session.get("roomName"));
                Session.set("roomId", currSession._id);
                console.log(Session.get("roomId"));

                _post();
                submit = true;
                _clearFormError(e);
                $(".progress").hide();
                $('.btn-post').blur();
            }
        }
    }
});
