Session.setDefault("roomname", "#General");

Template.messages.events({
    'click li': function(e) {
        Session.set("roomname", e.target.innerText);
    }
});

Template.messages.helpers({
    rooms: function() {
        return Rooms.find();
    }
});

Template.messages.rendered = function() {
    $('#messages').scrollTop($('#messages').prop("scrollHeight"));
    // $('#messages').scrollTo('max',80);
    AnimatedEach.attachHooks(this.find(".message-block"));
};

Template.room.helpers({
    roomstyle: function() {
        return Session.equals("roomname", this.roomname) ? "font-weight: bold" : "";
    }
});

_sendMessage = function() {
    var el = document.getElementById("msg");
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

Template.input.events({
    'click .sendMsg': function(e) {
        _sendMessage();
    },
    'keyup #msg': function(e) {
        if (e.type == "keyup" && e.which == 13) {
            _sendMessage();
            $('#messages').scrollTo('max', 80);
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
    authorProfile: function() {
        return "/profile/" + this.userId;
    },

    postLink: function() {
        return "/posts/" + this.postId;
    },

    timestamp: function() {
        return this.submitted.toLocaleTimeString();
    },
    authorSchool: function() {
        user = Meteor.users.findOne({
            _id: this.userId
        });
        return user.profile.school;
    },
    author: function() {
        user = Meteor.users.findOne({
            _id: this.userId
        });
        return user.profile.firstName + " " + user.profile.lastName;
    }
});

Template.chat.helpers({
    release: function() {
        return Meteor.release;
    }
});
