define(["base/HandlebarsBaseView", 
        "base/Context",
        "base/BaseModel",

        "Scored",

        "score/ScoreView",
        "score/ScoreModel",

        "handlebarViews/PalateView",
        "text!../json/cmajScale.json",
        "text!../json/eigthsAndQuarters.json",
        "text!../json/render/eigthsAndQuarters.json",
        "text!../json/eigthPatterns.json",

        "helpers/svgLoader",

        "./experiments/expandableMeasure"], 
function (HandlebarsBaseView, 
          Context, 
          BaseModel,

          Scored,

          ScoreView, 
          ScoreModel, 
         
          PalateView,
          cmaj,
          eigthsAndQuarters,
          eigthsAndQuartersRndr,
          eigthPatterns,

          svgLoader,

          expandableMeasure) {

  	var App = HandlebarsBaseView.extend({

  		construct: function () {
          var eigthJson;
  				console.log("app construct");
  				
          // load the svgs
          svgLoader();
          
          var cMaJson = JSON.parse(cmaj);
          var scoreModel = new ScoreModel(cMaJson.score, {parse: true});

          // eigthJson = JSON.parse(eigthsAndQuarters);
          // var scoreModel = new ScoreModel(eigthJson.score, {parse: true});

          // eigthJson = JSON.parse(eigthPatterns);
          // var scoreModel = new ScoreModel(eigthJson.score, {parse: true});


          // Render Models // FIXME: note currently used
          // var eigthRenderJson = JSON.parse(eigthsAndQuartersRndr);
          // var renderModel = new BaseModel(eigthRenderJson);

          // expandableMeasure(context);

          var scored = new Scored({
            canvas: document.getElementById("score"),
            data: cMaJson,
            config: {}
          });

          scored.render();
  		}
  	});
  	return App;
});