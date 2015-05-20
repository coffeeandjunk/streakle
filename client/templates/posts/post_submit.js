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
    $("#img-uploader").val('');
}

_toggleClosePreviw = function(className){
    if(className === 'hide'){
        $('form').find('button.close').addClass('hide');
    }else{
        $('form').find('button.close').removeClass('hide');
    }
}

_readURL = function(input) {
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
    if(!content && $('#img-uploader').val() === '' ){
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
            
            //  image = {
            //     imageUrl: "/cfs/files/images/" + fileObj._id
            // }
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
                    imageUrl: "/cfs/files/images/" + fileObj._id
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
    
}

// Meteor.startup(function () {

Template.postSubmit.events({

    'click #img-upload': function(e) {
        $('#img-uploader').trigger('change');
    },

    'change #img-uploader': function(e){
        if(!submit){
            _readURL(document.getElementById('img-uploader'));     
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
        }else if(!$('#img-uploader').val()){
            image = {};
            _postMessage();
        }else{
            submit=true;
            $('#img-uploader').trigger('change');
        }
        

        _resetSubmitForm();
        // postImages.remove({_id:fileObj._id});
    }
});


// });
