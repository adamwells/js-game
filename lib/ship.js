(function () {
	if (typeof Relativity === 'undefined') {
		window.Relativity = {};
	}

	var Ship = Relativity.Ship = function (options) {
		Relativity.Moveable.call(this, options);
	}

	Relativity.Helpers.inherits(Ship, Relativity.Moveable);

	Ship.prototype.update = function (pressedKeys) {
		if (pressedKeys[38]) {
			this.vel[1] -= 1;
		}

		if (pressedKeys[40]) {
			this.vel[1] += 1;
		}

		if (pressedKeys[37]) {
			this.vel[0] -= 1;
		}

		if (pressedKeys[39]) {
			this.vel[0] += 1;
		}

		this.move();
	}

	Ship.prototype.draw = function (ctx) {
		ctx.fillStyle = 'white';
		ctx.fillRect(this.pos[0], this.pos[1], 10, 10)
	}
})();
