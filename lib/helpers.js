(function () {
	if (typeof Relativity === 'undefined') {
		window.Relativity = {};
	}

	var Helpers = Relativity.Helpers = {};

	var inherits = Helpers.inherits = function (child, parent) {
		function Surrogate () {};
		Surrogate.prototype = parent.prototype;
		child.prototype = new Surrogate();
	}

	var distance = Helpers.distance = function (object1, object2) {
		xDist = object1.pos[0] - object2.pos[0];
		yDist = object1.pos[1] - object2.pos[1];
		return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
	}

	// find angle of a triangle at vertex1 given coordinates of the points
	var angleAtVertex = Helpers.angleAtVertex = function (vertex1, vertex2, vertex3) {

	}

	var pointInsidePoly = Helpers.pointInsidePoly = function (point, poly) {

	}

	var checkPolygonCollision = Helpers.checkPolygonCollision = function (poly1, poly2) {
		poly1.vertices.forEach(function {

		})
	}
})();