(function () {
	if (typeof Relativity === 'undefined') {
		window.Relativity = {};
	}

	var Moveable = Relativity.Moveable = function (options) {
		this.pos = options.pos;
		this.vel = options.vel;
		this.game = options.game;
	}

	Moveable.prototype.move = function () {
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];
	}

	Moveable.prototype.wrap = function () {
		if (this.pos[0] > )
	}
})();