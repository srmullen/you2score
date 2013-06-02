define(["base/BaseView"], function (BaseView) {
	
	"use strict"

	var AbstractNoteView = BaseView.extend({

		midi: null,

		dynamic: null,

		dotted: false,

		construct: function () {
			this.midi = this.options.midi;
			this.dynamic = this.options.dynamic;
		}
	});
	return AbstractNoteView;
})