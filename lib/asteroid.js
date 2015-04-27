(function () {
	if (typeof Relativity === 'undefined') {
		window.Relativity = {};
	}

	var Asteroid = Relativity.Asteroid = function (options) {
		Relativity.Moveable.call(this, options);
		this.rad = options.rad;
		this.level = options.level;
	}

	Relativity.Helpers.inherits(Asteroid, Relativity.Moveable);

	Asteroid.RADIUS = 35;
	Asteroid.SPLIT_NUMBER = 2;

	Asteroid.prototype.update = function () {
		this.move();
	}

	Asteroid.prototype.draw = function (ctx) {
		ctx.save();
		this.drawAt(ctx, this.pos)
		this.drawAt(ctx, [this.pos[0], this.pos[1] - Relativity.Game.HEIGHT])
		this.drawAt(ctx, [this.pos[0], this.pos[1] + Relativity.Game.HEIGHT])
		this.drawAt(ctx, [this.pos[0] - Relativity.Game.WIDTH, this.pos[1]])
		this.drawAt(ctx, [this.pos[0] + Relativity.Game.WIDTH, this.pos[1]])
		ctx.restore();
	}

	Asteroid.prototype.drawAt = function (ctx, pos) {
		ctx.save();
		ctx.strokeStyle = 'white';
		ctx.translate(pos[0], pos[1]);
		ctx.beginPath();
		ctx.arc(0, 0, this.rad, 0, Math.PI*2);
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
	}

	Asteroid.prototype.checkBulletCollision = function (bullet) {
		var xDist = this.pos[0] - bullet.pos[0];
		var yDist = this.pos[1] - bullet.pos[1];
		var dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
		if (dist < this.rad + bullet.rad) {
			this.getHit(bullet);
		}
	}

	Asteroid.prototype.getHit = function (bullet) {
		var bulletIndex = this.game.bullets.indexOf(bullet);
		this.game.bullets.splice(bulletIndex, 1);

		var asteroidIndex = this.game.asteroids.indexOf(this);
		this.game.asteroids.splice(asteroidIndex, 1);

		if (this.level > 0) {
			this.multiply();
		}
	}

	Asteroid.prototype.multiply = function () {
		var asteroidArgs = {};
		for (var i = 0; i < Asteroid.SPLIT_NUMBER; i++) {
			asteroidArgs = { pos: this.pos.slice(0),
											 vel: [Math.random() - .5, Math.random() - .5],
											 rad: this.rad * .5,
											 game:  this.game,
											 level: this.level - 1 }
			var asteroid = new Relativity.Asteroid(asteroidArgs);
			this.game.asteroids.push(asteroid);
		}
	}

	Asteroid.prototype.checkShipCollision = function (ship) {
		var xDist = this.pos[0] - ship.pos[0];
		var yDist = this.pos[1] - ship.pos[1];
		var dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
		if (dist < this.rad) {
			ship.collide();
		}
	}
})();