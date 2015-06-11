Session.setDefault("roomName", "#Streakle");

Template.messages.events({
    'click li': function(e) {
        sessionName = e.target.innerText || e.target.textContent;
        Session.setPersistent("roomName", sessionName);
        var currSession = Rooms.findOne({
            roomName: sessionName
        })
        Session.setPersistent("roomId", currSession._id);
        // console.log(Session.get("roomId"));
        $('#messages').scrollTo('9999px', 10);
    },
    'mouseover #messages': function() {
        $('#messages').scrollLock();
    }
});

Template.messages.helpers({
    rooms: function() {
        var category = [
            "#InteractionDesign",
            "#Illustration",
            "#GraphicDesign",
            "#DigitalArt",
            "#Art",
            "#Craft",
            "#Typography",
            "#IndustrialDesign",
            "#Photography",
            "#Streakle"
        ];
        return Rooms.find({
            roomName: {
                $in: category
            }
        });
    }
});

Template.messages.onCreated(function() {
    var currSession = Rooms.findOne({
            roomName: Session.get("roomName")
        })
        // console.log(Session.get("roomName"));
    Session.setDefault("roomId", currSession._id);
    // console.log(Session.get("roomId"));
});

Template.messages.rendered = function() {
    $('#messages').scrollTo('max', 80);
    // $("#messages").animate({
    //     scrollTop: $(document).height() - $(window).height()
    // });
    AnimatedEach.attachHooks(this.find(".message-block"));
    $('#messages').scrollLock();
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
        // $('#messages').scrollTo('max', 80);
    },
    'keyup #msg': function(e) {
        if (e.type == "keyup" && (e.which == 13 && !e.shiftKey)) {
            _sendMessage();
            // $('#messages').scrollTo('max', 80);
        }
    }
});

Template.messages.helpers({
    messages: function() {
        var selectedRoom = Rooms.findOne({
            _id: Session.get('roomId')
        }, {
            sort: {
                ts: 1
            }
        });
        return selectedRoom.messages
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
    },
    images: function() {
        return postImages.find({
            _id: this.imageId
        });
    }
});

Template.chat.helpers({
    release: function() {
        return Meteor.release;
    }
});

Tracker.autorun(function() {
    Rooms.find({
        _id: Session.get('roomId')
    }).observe({
        changed: function(newDocument, oldDocument) {
            $('#messages').scrollTo('9999px', 80);
            // $("#messages").animate({
            //     scrollTop: $(document).height() - $(window).height()
            // });
        }
    });
})
