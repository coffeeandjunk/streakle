Template.imagePreview.helpers({
    previewImages: function() {
        return postImages.find();
    },
});

Template.postSubmit.helpers({
    profilePic: function() {
        var userProfile = Meteor.user().profile;
        return userProfile.image;
    }
});

Template.postSubmit.rendered = function() {
    $('textarea').autosize();
};

// _messagePost = function() {
//     var el = document.getElementById("postContent");
//     var user = Meteor.user();
//     Messages.insert({
//         userId: user._id,
//         author: user.profile.firstName + " " + user.profile.lastName,
//         authorImage: user.profile.image,
//         authorSchool: user.profile.school,
//         submitted: new Date(),
//         msg: el.value,
//         room: Session.get("roomname")
//     });
//     el.value = "";
//     el.focus();
// };


var image = {};
_messagePost = function() {
    var el = document.getElementById("postContent");
    var user = Meteor.user();
    Messages.insert({
        userId: user._id,
        author: user.profile.firstName + " " + user.profile.lastName,
        authorImage: user.profile.image,
        authorSchool: user.profile.school,
        submitted: new Date(),
        msg: el.value,
        room: Session.get("roomname")
    });
    el.value = "";
    el.focus();
};

_resetSubmitForm = function(){
    $('#postContent').val("");
    _resetImageUploader();
    _clearPreview();
    _toggleClosePreviw('hide');
    submit = false;
};

_clearPreview = function(){
    $('#preview-container img').remove();
}

_resetImageUploader = function(){
    $("#post-img-upload").val('');
}

_toggleClosePreviw = function(className){
    if(className === 'hide'){
        $('form').find('button.close').addClass('hide');
    }else{
        $('form').find('button.close').removeClass('hide');
    }
}

_readURL = function(input) {
    console.log('readurl called');
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            var img = $('<img />', {
                'class': 'upload-preview img-thumbnail',
                'src': ''
            });

            img.attr('src', e.target.result);
            var previewContainer = $('#preview-container');
            if(previewContainer.find('img').length < 1){
                img.appendTo(previewContainer);
                _toggleClosePreviw('show');
            }
            
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

_isFormEmpty = function(form){
    var content = $('#postContent').val();
    if(!content && $('#post-file-upload').val() === '' ){
        return true;
    }
}

_showFormerror = function(form){
    $(form.target).parent('.post-form-container').addClass('has-error');
}



var _insertFile = FS.EventHandlers.insertFiles(postImages, {
        metadata: function(fileObj) {
            fileObject = fileObj;
            console.log('change is trigggered, fileobj: ', fileObj)
            return {
                owner: Meteor.userId(),
                submitted: new Date()
            };
        },after: function(error, fileObj) {
            console.log('after is called');
            console.log("Inserted", fileObj.name);
            imageId: fileObj._id;
            if (fileObj._id) {
                image = {
                    imageUrl: "/cfs/files/images/" + fileObj._id,
                    imageId: fileObj._id
                };
            _postMessage();
                // _toggleClosePreviw('show');
            };
           
        }
    });


var submit = false;

var _postMessage = function(){
    var user = Meteor.user();
    var content = $('#postContent').val();
    post = {
        content: content,
        userId: user._id,
        author: user.profile.firstName + " " + user.profile.lastName,
        authorImage: user.profile.image,
        authorSchool: user.profile.school,
        submitted: new Date(),
        commentsCount: 0
    };

    post._id = Posts.insert(post);
    console.log('image obj: ', image);
    if(image.imageUrl){
        Posts.update(post._id, {
            $set: image
        });
    }
    
    var user = Meteor.user();
    message = {
        userId: user._id,
        author: user.profile.firstName + " " + user.profile.lastName,
        authorImage: user.profile.image,
        authorSchool: user.profile.school,
        submitted: new Date(),
        // msg: el.value,
        // room: Session.get("roomname")

        // username: Meteor.user().profile.name,
        msg: content,
        // ts: new Date(),
        room: Session.get("roomname")
    };
    messages._id = Messages.insert(message);
    if(image.imageUrl){
        Messages.update(messages._id, {
            $set: image
        });
    }
    $('[name=postContent]').val("")
        .css("height","52px");
    $('#messages').scrollTo('max',80);
    
}

// Meteor.startup(function () {

Template.postSubmit.events({

    'click #post-img-upload': function(e) {
        // $('#post-img-upload').trigger('change');
    },
    'change #post-img-upload': function(e){
        console.log('change triggered');
        if(!submit){
            _readURL(document.getElementById('post-file-upload'));     
        }else{
            console.log('inside else');
            _insertFile(e, this);
        }
    },
    'click form button.close': function(){
        // _removeIma;
        _resetImageUploader();
        _clearPreview();
        _toggleClosePreviw('hide');
    },
    'submit form': function(e) {
        e.preventDefault();
        if(_isFormEmpty(e)){
            _showFormerror(e);
            return false;
        }else if(!$('#post-file-upload').val()){
            image = {};
            _postMessage();
        }else{
            submit=true;
            $('#post-file-upload').trigger('change');
        }
        _resetSubmitForm();
        // postImages.remove({_id:fileObj._id});
    }
});


// });
