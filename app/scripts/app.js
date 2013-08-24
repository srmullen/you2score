/*global define */
define(["base/HandlebarsBaseView", 
  "base/Context",
  "paperViews/ScoreView",

  "models/ScoreModel",

  "handlebarViews/PalateView",
  "text!../examples/cmajScale.json",

  "helpers/svgLoader"], 
function (HandlebarsBaseView, 
          Context, 
          ScoreView, 

          ScoreModel, 
         
          PalateView,
          cmaj,

          svgLoader) {
    'use strict';

  	var App = HandlebarsBaseView.extend({

  		construct: function () {
  				console.log("app construct");
  				
          // load the svgs
          svgLoader();

          // A paper view must have a canvas as an 'el'
          // var noteView = new NoteView({el: "#scoreContainer"});

          var context = new Context(document.getElementById("score"));

          var cMaJson = JSON.parse(cmaj);
          var scoreModel = new ScoreModel(cMaJson.score, {parse: true});
          
          // var scoreView = new ScoreView({model: scoreModel, el: "#score"}).render();
          // var scoreView = this.addChildView(ScoreView, {model: scoreModel}, "#score");

          var palateView = this.addChildView(PalateView, {model: scoreModel}, "#palate-container");
          scoreModel.listenTo(palateView, "addNote", scoreModel.addNote);

          // // Render as paper
          // var sheetModel = new SheetModel();
          // var sheet = context.addChildView(SheetView, sheetModel);

          var paperScore = context.addChildView(ScoreView, scoreModel);

  		}
  	});
  	return App;
});