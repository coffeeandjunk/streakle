_sendMessage = function() {
    var el = document.getElementById("msg");
    Messages.insert({
        username: Meteor.user().profile.name,
        msg: el.value,
        ts: new Date(),
        room: Session.get("roomname")
    });
    el.value = "";
    el.focus();
};

Template.input.events({
    'click .sendMsg': function(e) {
        _sendMessage();
    },
    'keyup #msg': function(e) {
        if (e.type == "keyup" && e.which == 13) {
            _sendMessage();
        }
    }
});

Template.messages.helpers({
    messages: function() {
        return Messages.find({
            room: Session.get("roomname")
        }, {
            sort: {
                ts: 1
            }
        });
    },
    roomname: function() {
        return Session.get("roomname");
    }
});

Template.message.helpers({
    timestamp: function() {
        return this.ts.toLocaleTimeString();
    }
});

Template.chat.helpers({
    release: function() {
        return Meteor.release;
    }
});