/*global define */
define(["base/HandlebarsBaseView", 
        "base/Context",

        "score/ScoreView",
        "score/ScoreModel",

        "handlebarViews/PalateView",
        "text!../examples/cmajScale.json",
        "text!../examples/eigthsAndQuarters.json",

        "helpers/svgLoader",

        "./experiments/expandableMeasure"], 
function (HandlebarsBaseView, 
          Context, 

          ScoreView, 
          ScoreModel, 
         
          PalateView,
          cmaj,
          eigthsAndQuarters,

          svgLoader,

          expandableMeasure) {

  	var App = HandlebarsBaseView.extend({

  		construct: function () {
  				console.log("app construct");
  				
          // load the svgs
          svgLoader();

          var context = new Context(document.getElementById("score"));

          // var cMaJson = JSON.parse(cmaj);
          var eigthJson = JSON.parse(eigthsAndQuarters);
          var scoreModel = new ScoreModel(eigthJson.score, {parse: true});

          // Initialize a blank score.
          var position = new paper.Point(50, 150);
          var blankScore = context.addChildView(ScoreView, scoreModel);
          blankScore.render();

          // expandableMeasure(context);

          
  		}
  	});
  	return App;
});