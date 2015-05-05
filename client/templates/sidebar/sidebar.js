Session.setDefault("roomname", "#General");

Template.rooms.events({
    'click li': function(e) {
        Session.set("roomname", e.target.innerText);
    }
});

Template.rooms.helpers({
    rooms: function() {
        return Rooms.find();
    }
});

Template.room.helpers({
    roomstyle: function() {
        return Session.equals("roomname", this.roomname) ? "font-weight: bold" : "";
    }
});