define(["base/PaperBaseView"], function (PaperBaseView) {

	var NoteView = PaperBaseView.extend({

		// events: {
		// 	"mousemove": "updatePosition"
		// },

		initialize: function () {
			
			paper.setup(this.el);
			// var myCircle = new paper.Path.Circle(new paper.Point(70, 70), 50);
			// myCircle.fillColor = 'black';

			// var rectangle = new paper.Rectangle(new paper.Point(150, 150), new paper.Point(250, 200));
			// var path = new paper.Path.Rectangle(rectangle);
			// path.fillColor = '#e9e9ff';
			// path.selected = true;

			// var rectangle = new paper.Rectangle(new paper.Point(50, 250), new paper.Point(150, 300));
			// var cornerSize = new paper.Size(20, 20);
			// var path = new paper.Path.RoundRectangle(rectangle, cornerSize);
			// path.fillColor = 'black';

			// var triangle = new paper.Path.RegularPolygon(new paper.Point(80, 370), 3, 50);
			// triangle.fillColor = '#e9e9ff'
			// triangle.selected = true;

			// var decahedron = new paper.Path.RegularPolygon(new paper.Point(200, 420), 10, 50);
			// decahedron.fillColor = "#44aacc";

			// var center = new paper.Point(160, 80);
			// var circle = new paper.Path.Circle(center, 50);

			// circle.segments[1].selected = true;
			// circle.segments[2].selected = true;

			// var circle2 = new paper.Path.Circle(center.add([140, 0]), 50);
			// circle2.fillColor = 'red';
			// circle2.selected = true;

			// var circle = new paper.Path.Circle(new paper.Point(80, 50), 35);
			// circle.fillColor = 'red';

			// var circle2 = new paper.Path.Circle(new paper.Point(80, 50), 35);
			// circle2.style = {
			// 	fillColor: "blue",
			// 	strokeColor: "green",
			// 	strokeWidth: 10
			// }
			// circle2.opacity = 0.5;

			// var circlePath = new paper.Path.Circle(new paper.Point(50, 50), 25);
			// circlePath.strokeColor = 'black';

			// var copy = circlePath.clone();
			// copy.strokeColor = 'red';
			// copy.position += new paper.Point(100, 200);

			// var circle = new paper.Path.Circle(new paper.Point(50, 50), 25);
			// circle.fillColor = 'black';

			// paper.tool.onMouseDown = function (event) {
			// 	if (event.item) {
			// 		this.target = event.item;
			// 	}
			// }

			// paper.tool.onMouseUp = function (event) {
			// 	this.target = undefined;
			// }

			// paper.tool.onMouseDrag = function (event) {
			// 	if (this.target) {
			// 		this.target.position = event.point;
			// 	}
			// }

			/* Tutorial - Project Hierarchy */

			// var path = new paper.Path.Circle(new paper.Point(80, 50), 35);
			// path.name = 'example';
			// // var secondPath = new paper.Path.Circle(new paper.Point(120, 50), 35);
			// var children = paper.project.activeLayer.children;
			// // paper.project.activeLayer.children[0].fillColor = 'red';
			// // paper.project.activeLayer.children[1].fillColor = 'blue';
			// children['example'].fillColor = 'red';

			// Create 20 circle shaped paths spread in horizontal direction
			// for (var i = 0; i < 20; i++) {
			// 	var center = new paper.Point(70 + i * 20, 50);
			// 	var path = new paper.Path.Circle(center, 20);
			// 	path.fillColor = 'red';
			// 	path.strokeColor = 'black';
			// }
			// var children = paper.project.activeLayer.children;
			// for (var i = 0; i < children.length; i++) {
			// 	var child = children[i];
			// 	child.fillColor.hue = Math.random() * 360;
			// }

			// Create a circle shaped path which is automatically
			// // placed within the active layer of the project
			// var path = new paper.Path.Circle(new paper.Point(80, 50), 35);
			// path.fillColor = 'red';

			// // Create a second layer
			// var layer = new paper.Layer();

			// // The second path is added as the child of the second layer
			// var secondPath = new paper.Path.Circle(new paper.Point(120, 50), 35);
			// secondPath.fillColor = 'green';

			/* Adding Children to groups */
			// var path = new paper.Path.Circle(new paper.Point(80,50), 35);
			// var secondPath = new paper.Path.Circle(new paper.Point(180, 50), 35)
			// var group = new paper.Group([path, secondPath]);
			// group.style = {
			// 	fillColor: 'red',
			// 	strokeColor: 'black'
			// }

			// var group = new paper.Group();
			// group.addChild(path);
			// group.addChild(secondPath);
			// group.fillColor = 'green';

			var circlePath = new paper.Path.Circle(new paper.Point(50, 50), 25);
			circlePath.fillColor = 'black';
			circlePath.remove();

			paper.tool.onMouseDown = function (event) {
				paper.project.activeLayer.addChild(circlePath);
			}

			paper.view.draw();

		},

		updatePosition: function (event) {
			// console.log(event.point);

			this.circle.position = event.point;
		}
	});
	return NoteView;
});