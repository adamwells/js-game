(function () {
	if (typeof Relativity === 'undefined') {
		window.Relativity = {};
	}

	var Moveable = Relativity.Moveable = function (options) {
		this.pos = options.pos;
		this.vel = options.vel;
		this.game = options.game;
	}

	Moveable.prototype.update = function () {
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];

		this.game.handleOutOfBounds(this);
	}
})();