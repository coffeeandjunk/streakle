// Template._loginButtonsLoggedInDropdown.events({
//     'click #view-profile': function(event) {
//         event.stopPropagation();
//         Template._loginButtons.toggleDropdown();
//         // Router.go('profileView', Meteor.userId());
//     }
// });

Session.setDefault("searchTags", []);

Template.header.events({
    'keyup #search': function(e) {
        if (e.type == "keyup" && (e.which == 13)) {
            var searchTags = $("#search").tagsinput('items');
            Session.set("searchTags", searchTags);
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

Template.header.rendered = function() {
    // $('#search').selectize({
    //     delimiter: ' ',
    //     persist: false,
    //     create: function(input) {
    //         return {
    //             value: input,
    //             text: input
    //         }
    //     }
    // });

};
