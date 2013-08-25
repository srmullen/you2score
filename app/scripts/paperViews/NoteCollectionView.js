define(["base/PaperBaseView"
	"./NoteView"], 
function (PaperBaseView, NoteView) {
	"use strict";

	var NoteCollectionView = PaperBaseView.extend({

		initialize: function () {
			console.log("Initializing NoteCollectionView");
			this.childViews = this.initChildViews(this.collection);
			this.group = new paper.Group();
		},

		initChildViews: function (collection) {
			var noteView;
			return collection.map(function (model) {
				noteView = new NoteView();
				return noteView;
			});
		},

		render: function () {

			return this;
		}
	});
	return NoteCollectionView;
});