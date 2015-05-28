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
              roomname: r
          });
      });
  }


    if (Tags.find().count() === 0) {
      [
          "Typography",
          "Animation",
          "Illustration",
          "GraphicDesign",
          "ConceptArt",
          "UIDesign",
          "IndustrialDesign",
          "CharacterDesign"
      ].forEach(function(e) {
          Tags.insert({
              tagName: e
          });
      });
  }