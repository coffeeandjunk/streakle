  if (Rooms.find().count() === 0) {
      [
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
          "WebDesign",
          "UI",
          "UX",
          "GameDesign",
          "IconDesign",
          "ToyDesign",
          "Illustration",
          "Storyboarding",
          "Cartooning",
          "CharacterDesign",
          "StreetArt",
          "Graffiti",
          "GraphicDesign",
          "VisualDesign",
          "LogoDesign",
          "Branding",
          "Advertising",
          "PrintDesign",
          "Typography",
          "Typesetting",
          "TypefaceDesign",
          "FontDesign",
          "Calligraphy",
          "Devanagari",
          "Latin",
          "Letterform",
          "IndustrialDesign",
          "ProductDesign",
          "AutomotiveDesign",
          "Form",
          "ProductSketching",
          "DigitalArt",
          "ConceptArt",
          "VFX",
          "VisualEffects",
          "MotionGraphics",
          "Art",
          "Sketching",
          "Painting",
          "Craft",
          "Photography",
          "StreetPhotography",
          "ProductPhotography",
          "WeddingPhotography",
          "FashionPhotography",
          "PortraitPhotography"

      ].forEach(function(e) {
          Tags.insert({
              tagName: e
          });
      });
  }
