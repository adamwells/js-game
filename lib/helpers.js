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

	var distanceBetweenPoints = Helpers.distanceBetweenPoints = function (point1, point2) {
		xDist = point1[0] - point2[0];
		yDist = point1[1] - point2[1];
		return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
	}

	// find angle of a triangle at vertex1 given coordinates of the points
	var angleAtVertex = Helpers.angleAtVertex = function (vertex1, vertex2, vertex3) {
		side1 = distanceBetweenPoints(vertex2, vertex3);
		side2 = distanceBetweenPoints(vertex1, vertex3);
		side3 = distanceBetweenPoints(vertex1, vertex2);

		// formula derived from rule of cosines
		return 1/Math.cos((Math.pow(side2, 2) + Math.pow(side3, 2) - Math.pow(side1, 2)) / 2 * side2 * side3);
	}

	var pointInsidePoly = Helpers.pointInsidePoly = function (point, polyVertices) {
		var sumAngles = 0;	
		for (var i = 0; i < polyVertices.length - 2; i++) {
			sumAngles += angleAtVertex(point, polyVertices[i], polyVertices[i+1]);
		}

		if (sumAngles > Math.PI) {
			return true;
		}
		return false;
	}

	// checks if a vertex is contained within the other polygon - only works for convex polys
	var checkPolygonCollision = Helpers.checkPolygonCollision = function (poly1, poly2) {
		poly1.vertices.forEach(function (vertex) {
			if (pointInsidePoly(vertex, poly2)) {
				return true;
			}
		});
		return false;
	}
})();