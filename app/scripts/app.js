/*global define */
define(["base/HandlebarsBaseView", "score/PaperScoreView", "models/ScoreModel", "models/NoteModel", "views/NoteView"], 
function (HandlebarsBaseView, PaperScoreView, ScoreModel, NoteModel, NoteView) {
    'use strict';

  	var App = HandlebarsBaseView.extend({

  		construct: function () {
  				console.log("app construct");
  				// this.scoreModel = new ScoreModel();
  				// this.scoreModel.addStaves();

          // Test out NoteModel functionality
          var noteModel = new NoteModel({pitch: "C#3"});

          // A paper view must have a canvas as an 'el'
          var noteView = new NoteView({el: "#scoreContainer"});
  		}
  	});
  	return App;
});