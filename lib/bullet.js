(function () {
	if (typeof Relativity === 'undefined') {
		window.Relativity = {};
	}

	var Bullet = Relativity.Bullet = function (options) {
		Relativity.Moveable.call(this, options);
		this.relVel = options.relVel;
		this.rad = options.rad;
		this.relativeDistance = 0;
	}

	Relativity.Helpers.inherits(Bullet, Relativity.Moveable);
	Bullet.MAX_DISTANCE = 200;
	Bullet.RADIUS = 2;

	Bullet.prototype.update = function () {
		this.move();
		this.relativeDistance += Math.sqrt(Math.pow(this.relVel[0], 2) + Math.pow(this.relVel[1], 2));
		if (this.relativeDistance > Bullet.MAX_DISTANCE) {
			var index = this.game.bullets.indexOf(this);
			this.game.bullets.splice(index, 1)
		}
	}

	Bullet.prototype.draw = function (ctx) {
		ctx.save();
		ctx.fillStyle = 'white';
		ctx.translate(this.pos[0], this.pos[1]);
		ctx.beginPath();
		ctx.arc(0,0,this.rad,0,Math.PI*2);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}

})()