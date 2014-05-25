/*global define */
define(["base/HandlebarsBaseView", 
        "base/Context",
        "base/BaseModel",

        "score/ScoreView",
        "score/ScoreModel",

        "handlebarViews/PalateView",
        "text!../examples/cmajScale.json",
        "text!../examples/eigthsAndQuarters.json",
        "text!../examples/render/eigthsAndQuarters.json",
        "text!../examples/eigthPatterns.json",

        "helpers/svgLoader",

        "./experiments/expandableMeasure"], 
function (HandlebarsBaseView, 
          Context, 
          BaseModel,

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
          // $("#fontTest").html(HandlebarsBaseView.constants.font.noteheads.whole);
          var eigthJson;
  				console.log("app construct");
  				
          // load the svgs
          svgLoader();

          var context = new Context(document.getElementById("score"));
          
          var cMaJson = JSON.parse(cmaj);
          var scoreModel = new ScoreModel(cMaJson.score, {parse: true});


          // eigthJson = JSON.parse(eigthsAndQuarters);
          // var scoreModel = new ScoreModel(eigthJson.score, {parse: true});

          // eigthJson = JSON.parse(eigthPatterns);
          // var scoreModel = new ScoreModel(eigthJson.score, {parse: true});


          // Render Models // FIXME: note currently used
          var eigthRenderJson = JSON.parse(eigthsAndQuartersRndr);
          var renderModel = new BaseModel(eigthRenderJson);

          // Initialize a blank score.
          var position = new paper.Point(50, 150);
          var blankScore = context.addChildView(ScoreView, scoreModel);
          blankScore.render();

          // expandableMeasure(context);


  		}
  	});
  	return App;
});