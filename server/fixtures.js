  // Meteor.startup(function() {
  //     AccountsEntry.config({
  //         signupCode: 's3cr3t', // only restricts username+password users, not OAuth
  //         defaultProfile: someDefault: 'default'
  //     });
  // });

  //     Messages.remove({});
  //     Rooms.remove({});
  if (Rooms.find().count() === 0) {
      [
          "#General",
          "#Typography",
          "#Animation",
          "#Illustration",
          "#GraphicDesign",
          "#UIDesign",
          "#IndustrialDesign",
          "#CharacterDesign"
      ].forEach(function(r) {
          Rooms.insert({
              roomname: r
          });
      });
  }

  // Rooms.deny({
  //     insert: function(userId, doc) {
  //         return true;
  //     },
  //     update: function(userId, doc, fieldNames, modifier) {
  //         return true;
  //     },
  //     remove: function(userId, doc) {
  //         return true;
  //     }
  // });

  // Messages.deny({
  //     insert: function(userId, doc) {
  //         return (userId === null);
  //     },
  //     update: function(userId, doc, fieldNames, modifier) {
  //         return true;
  //     },
  //     remove: function(userId, doc) {
  //         return true;
  //     }
  // });

  // Messages.allow({
  //     insert: function(userId, doc) {
  //         return (userId !== null);
  //     }
  // });
