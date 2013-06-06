/*global define */
define(["base/HandlebarsBaseView", 
  "base/Context",
  "score/PaperScoreView", 
  "models/ScoreModel", 
  "models/NoteModel", 
  "views/NoteView",
  "views/MeasureView",
  "junk/Scribbles"], 
function (HandlebarsBaseView, Context, PaperScoreView, ScoreModel, NoteModel, NoteView, MeasureView, Scribbles) {
    'use strict';

  	var App = HandlebarsBaseView.extend({

  		construct: function () {
  				console.log("app construct");
  				// this.scoreModel = new ScoreModel();
  				// this.scoreModel.addStaves();

          // Test out NoteModel functionality
          // var noteModel = new NoteModel({pitch: "C#3"});

          // A paper view must have a canvas as an 'el'
          // var noteView = new NoteView({el: "#scoreContainer"});

          var context = new Context(document.getElementById("scoreContainer"));

          context.addChildView(NoteView);

          context.addChildView(MeasureView);

          //Scribbling
          // var scribbles = new Scribbles({el: "#scoreContainer"});
  		}
  	});
  	return App;
});