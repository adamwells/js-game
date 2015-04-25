(function () {
  if (typeof Relativity === 'undefined') {
    window.Relativity = {};
  }

  var Game = Relativity.Game = function () {
    this.ship = new Relativity.Ship({ pos: [Game.WIDTH/2, Game.HEIGHT/2] });
    this.bullets = [];
    this.asteroids = [];
  }

  Game.WIDTH = 600;
  Game.HEIGHT = 400;

  Game.prototype.handleOutOfBounds = function (moveable) {
    if (movable.pos[0] > this.WIDTH) {
      moveable.pos[0] -= this.WIDTH;
    }

    if (movable.pos[1] > this.WIDTH) {
      moveable.pos[1] -= this.WIDTH;
    }    
  }

  Game.prototype.addShip = function () {
    this.ship = new Relativity.Ship();
    return this.ship;
  }

  Game.prototype.step = function () {
    this.ship.update(Relativity.currentlyPressed);
    this.asteroids.forEach(function (asteroid) {
      asteroid.update();
    })

    this.bullets.forEach(function (bullet) {
      bullet.update();
    })
  }

  Game.prototype.render = function (ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, Game.WIDTH, Game.HEIGHT);
    this.ship.draw(ctx);
  }
})();