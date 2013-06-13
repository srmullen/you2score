/*global define */
define(["base/HandlebarsBaseView", 
  "base/Context",
  "score/PaperScoreView", 
  "models/ScoreModel", 
  "models/NoteModel", 
  "views/NoteView",
  "views/MeasureView",
  "models/MeasureModel",
  "views/SheetView",
  "models/SheetModel"], 
function (HandlebarsBaseView, 
          Context, 
          PaperScoreView, 
          ScoreModel, 
          NoteModel, 
          NoteView, 
          MeasureView, 
          MeasureModel, 
          SheetView,
          SheetModel) {
    'use strict';

  	var App = HandlebarsBaseView.extend({

  		construct: function () {
  				console.log("app construct");
  				
          

          // A paper view must have a canvas as an 'el'
          // var noteView = new NoteView({el: "#scoreContainer"});

          var context = new Context(document.getElementById("scoreContainer"));

          // create a NoteModel and NoteView
          // Typing in the lines note will render the note on that line;
          
          
          
          // var measureModel = new MeasureModel();
          
          // var noteModel = new NoteModel({pitch: {name: "E", degree: 2, octave: 5}, type: 1/4});
          // measureModel.addNote(noteModel);
          
          // var noteModel2 = new NoteModel({pitch: {name: "C", degree: 0, octave: 5}, type: 1/4});
          // measureModel.addNote(noteModel2);

          // var noteModel3 = new NoteModel({pitch: {name: "G", degree: 4, octave: 4}, type: 1/4});
          // measureModel.addNote(noteModel3);

          // var noteModel4 = new NoteModel({pitch: {name: "C", degree: 0, octave: 5}, type: 1/4});
          // measureModel.addNote(noteModel4);
          
          // // Add the MeasureView to the Context
          // var measure = context.addChildView(MeasureView, measureModel);

          var sheetModel = new SheetModel();

          var sheet = context.addChildView(SheetView, sheetModel);

  		}
  	});
  	return App;
});