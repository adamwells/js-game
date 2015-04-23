(function () {
	if (typeof Relativity === 'undefined') {
		window.Relativity = {};
	}

	var Ship = Relativity.Ship = function (options) {

	}

	Ship.prototype.draw = function (ctx) {
		ctx.fillStyle = this.color;

		ctx.beginPath();
		ctx.moveTo(this.pos[0], this.pos[1]);
	}
})();
