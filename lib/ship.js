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
	Ship.MAX_SPEED = 10;

	Ship.prototype.update = function (pressedKeys) {
		if (pressedKeys[38]) {
			var currentSpeed = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
			var currentVel = this.vel.slice(0);

			this.vel[0] += Math.sin(this.rot) * .1;
			this.vel[1] -= Math.cos(this.rot) * .1;
			var newSpeed = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));

			if (newSpeed > Ship.MAX_SPEED) {
				this.vel = currentVel;
			}
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
		ctx.strokeStyle = 'white';
		ctx.translate(this.pos[0], this.pos[1]);
		ctx.rotate(this.rot);
		ctx.beginPath();
		ctx.moveTo(0, -16);
		ctx.lineTo(8, 16);
		ctx.moveTo(-8, 16);
		ctx.lineTo(0, -16);
		ctx.moveTo(6, 8);
		ctx.lineTo(-6, 8);
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}

	Ship.prototype.collide = function () {
		console.log('Ship collision')
	}

	
})();
