(function () {
	if (typeof Relativity === 'undefined') {
		window.Relativity = {};
	}
  
  var Hud = Relativity.Hud = function (options) {
    this.game = options.game;
  }

  Hud.prototype.draw = function (ctx) {
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.font = '32px serif';
    ctx.fillText(this.game.score, 10, 30);
    ctx.restore();
    for (var i = 0; i < this.game.lives - 1; i++) {
      shipPos = [(i + .5) * 40, 55];
      ctx.save()
      ctx.translate(shipPos[0], shipPos[1])
      new Relativity.Ship({ pos: shipPos }).draw(ctx);
      ctx.restore();
    }
  }
	

})();