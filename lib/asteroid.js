(function () {
	if (typeof Relativity === 'undefined') {
		window.Relativity = {};
	}

	var Asteroid = Relativity.Asteroid = function (options) {
		Relativity.Moveable.call(this, options);
		this.rad = options.rad;
	}

	Relativity.Helpers.inherits(Asteroid, Relativity.Moveable);

	Asteroid.RADIUS = 15;

	Asteroid.prototype.update = function () {
		this.move();
	}

	Asteroid.prototype.draw = function (ctx) {
		ctx.save();
		ctx.fillStyle = 'white';
		ctx.translate(this.pos[0], this.pos[1]);
		ctx.beginPath();
		ctx.arc(0, 0, this.rad, 0, Math.PI*2);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}

	Asteroid.prototype.checkBulletCollision = function (bullet) {
		var xDist = this.pos[0] - bullet.pos[0];
		var yDist = this.pos[1] - bullet.pos[1];
		var dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
		if (dist < this.rad + bullet.rad) {
			var index = this.game.asteroids.indexOf(this);
			this.game.asteroids.splice(index, 1);
		}
	}
})();