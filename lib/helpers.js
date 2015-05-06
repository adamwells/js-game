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
		return Math.sqrt(Math.pow(object1.pos[0] - object2.pos[0], 2) + Math.pow(object1.pos[1], object2.pos[1], 2));
	}
})();