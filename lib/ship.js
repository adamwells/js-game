(function () {
	if (typeof Relativity === 'undefined') {
		window.Relativity = {};
	}

	var Ship = Relativity.Ship = function (options) {
		Relativity.Moveable.call(this, options);
		this.rot = options.rot;
	}

	Relativity.Helpers.inherits(Ship, Relativity.Moveable);

	Ship.prototype.update = function (pressedKeys) {
		if (pressedKeys[38]) {
			this.vel[0] += Math.sin(this.rot) * .1;
			this.vel[1] -= Math.cos(this.rot) * .1;
		}

		if (pressedKeys[37]) {
			this.rot -= Math.PI/30;
		}

		if (pressedKeys[39]) {
			this.rot += Math.PI/30;
		}

		if (pressedKeys[32]) {
			this.fireBullet();
		}

		this.move();
	}

	Ship.prototype.fireBullet = function () {
		var bullet = new Relativity.Bullet({ pos: this.pos.slice(0), vel: [1, 1], game: this.game });
		this.game.bullets.push(bullet);
	}

	Ship.prototype.draw = function (ctx) {
		ctx.save();
		ctx.fillStyle = 'white';
		ctx.translate(this.pos[0], this.pos[1]);
		ctx.rotate(this.rot);
		ctx.fillRect(-5, -10, 10, 20);
		ctx.restore();
	}
})();
