Template.profileInfo.events({
  'click #update-profile': function() {
    event.preventDefault();
    var form = $('#profile-data');
    var formdata = form.serializeArray();
    console.log(formdata);
    users.update(user.profile, {
      $set: formdata
    });
  }
});

Template.profileInfo.rendered = function() {
  $('nav').find('nav.navbar').addClass('hide');
};
