(function () {
	if (typeof Relativity === 'undefined') {
		window.Relativity = {};
	}

	var Ship = Relativity.Ship = function () {
	}

	Relativity.Helpers.inherits(Ship, Relativity.Moveable);

	Ship.prototype.draw = function (ctx) {
		ctx.arc(this.pos[0],this.pos[1],50,0,Math.PI*2,true)
	}
})();
