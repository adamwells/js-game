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
		this.wrap();
	}

	Moveable.prototype.wrap = function () {
		if (this.pos[0] > this.game.width) {
			this.pos[0] -= this.game.width;
		} else if (this.pos[0] < 0) {
			this.pos[0] += this.game.width;
		}

		if (this.pos[1] > this.game.height) {
			this.pos[1] -= this.game.height;
		} else if (this.pos[1] < 0) {
			this.pos[1] += this.game.height;
		}
	}
})();