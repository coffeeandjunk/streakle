// Template._loginButtonsLoggedInDropdown.events({
//     'click #view-profile': function(event) {
//         event.stopPropagation();
//         Template._loginButtons.toggleDropdown();
//         // Router.go('profileView', Meteor.userId());
//     }
// });

Template.header.events({
    'keyup #search': function(e) {
        if (e.type == "keyup" && (e.which == 13)) {
            var  searchTags = $("#search").tagsinput('items');
            $('#search').on('itemAdded', function(event) {
                searchTags = [];
                searchTags = $("#search").tagsinput('items');
                Session.set("searchTags", searchTags);
                // console.log(searchTags);
            });
            $('#search').on('itemRemoved', function(event) {
                searchTags = [];
                searchTags = $("#search").tagsinput('items');
                Session.set("searchTags", searchTags);
                // console.log(searchTags);
            });
        }
    }
});
