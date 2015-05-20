Template.profileInfo.events({
  'click #submit-profile': function(){
    event.preventDefault();
    var form = $('#profile-data');
    var formdata = form.serializeArray();
    console.log(formdata);
    users.update(user.profile_data, {
            $set: formdata
        });
  }
})