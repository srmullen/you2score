define(["text!svg/treble.svg",
	"text!svg/sharp.svg",
	"text!svg/flat.svg",
	"text!svg/bass.svg",
	"text!svg/8th_flag.svg"
	// "text!svg/gonville/svg/emmentaler-11.svg"
	],
function (treble, sharp, flat, bass, eigthFlag, gonville) {

	var svgLoader = function () {
		$('#svgContainer').append(treble);
		$('#svgContainer').append(sharp);
		$("#svgContainer").append(flat);
		$("#svgContainer").append(bass);
		$("#svgContainer").append(eigthFlag);
		// $("#svgContainer").append(gonville);
	}

	return svgLoader;
});