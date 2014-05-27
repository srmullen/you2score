define([
	// "text!svg/gonvilleSVG/treble_clef.svg",
	// "text!svg/sharp.svg",
	// "text!svg/flat.svg",
	// "text!svg/bass.svg",
	"text!svg/8th_flag.svg"
	],
function (
	// treble, 
	// sharp, 
	// flat, 
	// bass, 
	eigthFlag
	) {

	var svgLoader = function () {
		// $('#svgContainer').append(treble);
		// $('#svgContainer').append(sharp);
		// $("#svgContainer").append(flat);
		// $("#svgContainer").append(bass);
		$("#svgContainer").append(eigthFlag);
	}

	return svgLoader;
});