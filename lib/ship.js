(function () {
	if (typeof Relativity === 'undefined') {
		window.Relativity = {};
	}

	var Ship = Relativity.Ship = function (options) {
		this.pos = options.pos;
	}

	Relativity.Helpers.inherits(Ship, Relativity.Moveable);

	Ship.prototype.draw = function (ctx) {
		ctx.arc(this.pos[0],this.pos[1],50,0,Math.PI*2,true)
	}

	Ship.prototype.update = function (pressedKeys) {
		if (pressedKeys[38]) {
			this.pos[1] += 1;
		}

		if (pressedKeys[40]) {
			this.pos[1] -= 1;
		}
	}

	Ship.prototype.draw = function (ctx) {
		ctx.fillStyle = 'white';
		ctx.fillRect(this.pos[0], this.pos[1], 10, 10)
	}
})();
