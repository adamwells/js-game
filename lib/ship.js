(function () {
	if (typeof Relativity === 'undefined') {
		window.Relativity = {};
	}

	var Ship = Relativity.Ship = function (options) {
		Relativity.Moveable.call(this, options);
		this.rot = options.rot;
		this.bulletCountdown = 0;
	}

	Relativity.Helpers.inherits(Ship, Relativity.Moveable);

	Ship.FRAMES_BETWEEN_BULLETS = 10;

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
			if (this.bulletCountdown < 1) {
				this.fireBullet();
			}
		}

		this.bulletCountdown -= 1;
		this.move();
	}

	Ship.prototype.fireBullet = function () {
		var bulletVelocity = [this.vel[0]+  Math.sin(this.rot) * 5, this.vel[1] + Math.cos(this.rot) * -5];
		var relativeVelocity = [Math.sin(this.rot) * 5, Math.cos(this.rot) * -5];
		var bullet = new Relativity.Bullet({ pos: this.pos.slice(0), vel: bulletVelocity, relVel: relativeVelocity, rad: Relativity.Bullet.RADIUS, game: this.game });
		this.game.bullets.push(bullet);
		this.bulletCountdown = Ship.FRAMES_BETWEEN_BULLETS;
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
