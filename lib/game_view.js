(function () {
	if (typeof Relativity === 'undefined') {
		window.Relativity = {};
	}

	var GameView = Relativity.GameView = function (game, ctx) {
		this.game = game;
		this.ctx = ctx;
	}

	GameView.FRAMERATE = 30;

	GameView.prototype.start = function () {
		setInterval(function () {
			this.game.step();
			this.game.render(this.ctx);
		}.bind(this), 1000/GameView.FRAMERATE)
	}
})();