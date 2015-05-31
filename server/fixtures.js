  if (Rooms.find().count() === 0) {
      [
          "#Typography",
          "#Calligraphy",
          "#Cartoon",
          "#Illustration",
          "#GraphicDesign",
          "#DigitalArt",
          "#UIDesign",
          "#InteractionDesign",
          "#Painting",
          "#IndustrialDesign",
          "#CharacterDesign",
          "#Streakle"
      ].forEach(function(r) {
          Rooms.insert({
              roomName: r,
              messages: []
          });
      });
  }


    if (Tags.find().count() === 0) {
      [
          "Typography",
          "Calligraphy",
          "Cartoon",
          "Illustration",
          "GraphicDesign",
          "DigitalArt",
          "UIDesign",
          "InteractionDesign",
          "Painting",
          "IndustrialDesign",
          "CharacterDesign"
      ].forEach(function(e) {
          Tags.insert({
              tagName: e
          });
      });
  }