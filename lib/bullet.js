(function () {
	if (typeof Relativity === 'undefined') {
		window.Relativity = {};
	}

	var Bullet = Relativity.Bullet = function (options) {
		Relativity.Moveable.call(this, options);
	}

	Relativity.Helpers.inherits(Bullet, Relativity.Moveable);

	Bullet.prototype.update = function () {
		this.move();
	}

	Bullet.prototype.draw = function (ctx) {
		ctx.save();
		ctx.fillStyle = 'white';
		ctx.translate(this.pos[0], this.pos[1]);
		ctx.arc(0,0,5,0,Math.PI*2);
		ctx.fill();
		ctx.restore();
	}

})()