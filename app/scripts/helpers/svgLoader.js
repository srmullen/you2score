define(["text!svg/treble.svg",
	"text!svg/sharp.svg",
	"text!svg/flat.svg",
	"text!svg/bass.svg"],
function (treble, sharp, flat, bass) {

	var svgLoader = function () {
		$('#svgContainer').append(treble);
		$('#svgContainer').append(sharp);
		$("#svgContainer").append(flat);
		$("#svgContainer").append(bass);
	}

	return svgLoader;
});