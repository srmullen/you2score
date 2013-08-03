/*global define */
define(["base/HandlebarsBaseView", 
  "base/Context",
  // "score/PaperScoreView",

  /* html model testing */
  "models/ScoreModel",
  "handlebarViews/ScoreView",
  "models/NoteModel", 
  "models/MeasureModel",
  "models/StaffModel",
  "handlebarViews/PalateView",
  "text!../examples/cmajScale.json",

  "paperViews/NoteView",
  "paperViews/MeasureView",
  "paperViews/SheetView",
  "models/SheetModel"], 
function (HandlebarsBaseView, 
          Context, 
          // PaperScoreView, 
          
          ScoreModel, 
          ScoreView,
          NoteModel, 
          MeasureModel,
          StaffModel,
          PalateView,
          cmaj,

          NoteView, 
          MeasureView, 
          SheetView,
          SheetModel) {
    'use strict';

  	var App = HandlebarsBaseView.extend({

  		construct: function () {
  				console.log("app construct");
  				
          

          // A paper view must have a canvas as an 'el'
          // var noteView = new NoteView({el: "#scoreContainer"});

          var context = new Context(document.getElementById("scoreContainer"));

          var cMaJson = JSON.parse(cmaj);
          var scoreModel = new ScoreModel(cMaJson.score, {parse: true});
          
          // var scoreView = new ScoreView({model: scoreModel, el: "#score"}).render();
          var scoreView = this.addChildView(ScoreView, {model: scoreModel}, "#score");

          var palateView = this.addChildView(PalateView, {model: scoreModel}, "#palate-container");
          scoreModel.listenTo(palateView, "addNote", scoreModel.addNote);

          // // Render as paper
          // var sheetModel = new SheetModel();
          // var sheet = context.addChildView(SheetView, sheetModel);

  		}
  	});
  	return App;
});