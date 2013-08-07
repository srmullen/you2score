/*global define */
define(["base/HandlebarsBaseView", 
  "base/Context",
  "paperViews/ScoreView",

  /* html model testing */
  // "handlebarViews/ScoreView",

  "models/ScoreModel",
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
          ScoreView, 

          // ScoreView,

          ScoreModel, 
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