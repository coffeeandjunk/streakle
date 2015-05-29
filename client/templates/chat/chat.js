Session.setDefault("roomName", "#Streakle");

Template.messages.events({
    'click li': function(e) {
        Session.setPersistent("roomName", e.target.innerText);
        var currSession = Rooms.findOne({
            roomName: e.target.innerText
        })
        Session.setPersistent("roomId", currSession._id);
        // console.log(Session.get("roomId"));
        $("#messages").animate({
            scrollTop: $("#messages").height()
        }, 'fast');

    }
});

Template.messages.helpers({
    rooms: function() {
        var category = [
            '#Typography',
            '#Calligraphy',
            '#Cartoon',
            '#Illustration',
            '#GraphicDesign',
            '#DigitalArt',
            '#UIDesign',
            '#InteractionDesign',
            '#Painting',
            '#IndustrialDesign',
            '#CharacterDesign',
            '#Streakle'
        ];
        return Rooms.find({
            roomName: {
                $in: category
            }
        });
    }
});

Template.messages.rendered = function() {
    if (!this.rendered) {
        var currSession = Rooms.findOne({
            roomName: Session.get("roomName")
        })
        // console.log(Session.get("roomName"));
        Session.setDefault("roomId", currSession._id);
        // console.log(Session.get("roomId"));
        this.rendered = true;
    }

    var chat = document.getElementById('messages');
    chat.scrollTop = chat.scrollHeight;
    AnimatedEach.attachHooks(this.find(".message-block"));
};

Template.room.helpers({
    roomstyle: function() {
        return Session.equals("roomName", this.roomName) ? "font-weight: bold" : "";
    }
});

_sendMessage = function() {
    var el = document.getElementById("msg");
    if (/\S/.test(el.value)) {
        var user = Meteor.user();
        var messagePush = Rooms.update({
            _id: Session.get("roomId")
        }, {
            $push: {
                messages: {
                    userId: user._id,
                    submitted: new Date(),
                    msg: el.value,
                }
            }
        });
        // Messages.insert({
        //     userId: user._id,
        //     submitted: new Date(),
        //     msg: el.value,
        //     room: Session.get("roomName")
        // });
        el.value = "";
        el.focus();
    } else {
        el.value = "";
        el.focus();
        console.log('blank message');
    }

};

Template.input.events({
    'submit #msg': function(e) {
        _sendMessage();
        $('#messages').scrollTo('max', 80);
    },
    'keyup #msg': function(e) {
        if (e.type == "keyup" && e.which == 13) {
            _sendMessage();
            $('#messages').scrollTo('max', 80);
            //     $("#messages").animate({
            //         scrollTop: $(document).height() - $(window).height()
            //     });
        }
    }
});

Template.messages.helpers({
    messages: function() {
        var selectedRoom = Rooms.findOne({
            _id: Session.get('roomId')
        });
        return selectedRoom.messages


        // return Messages.find({
        //     room: Session.get("roomName")
        // }, {
        //     sort: {
        //         ts: 1
        //     }
        // });
    },
    roomName: function() {
        return Session.get("roomName");
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
        return user.profile.name;
    }
});

Template.chat.helpers({
    release: function() {
        return Meteor.release;
    }
});
