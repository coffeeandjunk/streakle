  if (Rooms.find().count() === 0) {
      [
          "#InteractionDesign",
          "#Cartooning",
          "#Illustration",
          "#GraphicDesign",
          "#Sketching",
          "#DigitalArt",
          "#UIDesign",
          "#Typography",
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
          "InteractionDesign",
          "Cartooning",
          "Illustration",
          "GraphicDesign",
          "Sketching",
          "DigitalArt",
          "UIDesign",
          "Typography",
          "Painting",
          "IndustrialDesign",
          "CharacterDesign",
          "Advertising",
          "Animation",
          "Architecture",
          "AutomotiveDesign",
          "Branding",
          "Calligraphy",
          "Cinematography",
          "CostumeDesign",
          "Crafts",
          "Fashion",
          "GameDesign",
          "Graffiti",
          "IconDesign",
          "MotionGraphics",
          "Photography",
          "PrintDesign",
          "ProductDesign",
          "Storyboarding",
          "StreetArt",
          "ToyDesign",
          "Typesetting",
          "VisualEffects",
          "VFX",
          "WebDesign"
      ].forEach(function(e) {
          Tags.insert({
              tagName: e
          });
      });
  }
