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
          "#ConceptArt",
          "#UIDesign",
          "#IndustrialDesign",
          "#CharacterDesign",
          '#Streakle'
      ].forEach(function(r) {
          Rooms.insert({
              roomname: r
          });
      });
  }


    if (Tags.find().count() === 0) {
      [
          "#Typography",
          "#Animation",
          "#Illustration",
          "#GraphicDesign",
          "#ConceptArt",
          "#UIDesign",
          "#IndustrialDesign",
          "#CharacterDesign"
      ].forEach(function(e) {
          Tags.insert({
              tagName: e
          });
      });
  }