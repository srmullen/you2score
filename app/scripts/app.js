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



          // // Switch to external json file for testing
          // var scoreModel = new ScoreModel();
          // // Create Staves and add them to the score model
          // var staff1 = new StaffModel({instrument: "Voice"});
          // var staff2 = new StaffModel({instrument: "Piano"});
          // scoreModel.addStaves([staff1, staff2]);

          // // create some notes and add them to the staff models
          // var note1 = new NoteModel({type: 1}),
          //     note2 = new NoteModel({type: 1/2}),
          //     note3 = new NoteModel({type: 1/4}),
          //     note4 = new NoteModel({type: 1/8});

          // staff1.addNote(note1);
          // staff1.addNote(note2);
          // staff2.addNote(note3);
          // staff2.addNote(note4);

          // // create some measures and add them to the staves
          // var measure1 = new MeasureModel(),
          //     measure2 = new MeasureModel();

          // staff1.addMeasure(measure1);
          // staff2.addMeasure(measure2);

          var cMaJson = JSON.parse(cmaj);
          var scoreModel = new ScoreModel(cMaJson.score, {parse: true});
          
          var scoreView = new ScoreView({model: scoreModel, el: "#score"}).render();

          // // Render as paper
          // var sheetModel = new SheetModel();
          // var sheet = context.addChildView(SheetView, sheetModel);

  		}
  	});
  	return App;
});