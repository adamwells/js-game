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
})();