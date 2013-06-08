/*global define */
define(["base/HandlebarsBaseView", 
  "base/Context",
  "score/PaperScoreView", 
  "models/ScoreModel", 
  "models/NoteModel", 
  "views/NoteView",
  "views/MeasureView",
  "models/MeasureModel",
  "junk/Scribbles"], 
function (HandlebarsBaseView, Context, PaperScoreView, ScoreModel, NoteModel, NoteView, MeasureView, MeasureModel, Scribbles) {
    'use strict';

  	var App = HandlebarsBaseView.extend({

  		construct: function () {
  				console.log("app construct");
  				
          

          // A paper view must have a canvas as an 'el'
          // var noteView = new NoteView({el: "#scoreContainer"});

          var context = new Context(document.getElementById("scoreContainer"));

          // create a NoteModel and NoteView
          // Typing in the lines note will render the note on that line;
          var noteModel = new NoteModel({pitch: {name: "E", degree: 3, octave: 5}});
          var measureModel = new MeasureModel();
          measureModel.addNote(noteModel);
          
          // Add the MeasureView to the Context
          var measure = context.addChildView(MeasureView, measureModel);

  		}
  	});
  	return App;
});