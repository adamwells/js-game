(function () {
  if (typeof Relativity === 'undefined') {
    window.Relativity = {};
  }

  var Game = Relativity.Game = function () {
    this.ship = {};
    this.bullets = [];
    this.asteroids = [];

    this.addShip();
    this.addAsteroids();
  }

  Game.WIDTH = 600;
  Game.HEIGHT = 400;
  Game.NUM_ASTEROIDS = 10;
  Game.MAX_SPEED_SQUARED = 5;

  Game.prototype.addShip = function () {
    this.ship = new Relativity.Ship({ pos: [Game.WIDTH/2, Game.HEIGHT/2], vel: [0, 0], game: this, rot: 0 });
  }

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.addAsteroid();
    }
  }

  Game.prototype.addAsteroid = function () {
    var asteroidArgs = { pos: [Math.random() * Game.WIDTH, Math.random() * Game.HEIGHT],
                         vel: [(Math.random() - .5) * Game.MAX_SPEED_SQUARED, (Math.random() - .5) * Game.MAX_SPEED_SQUARED],
                         rad: Relativity.Asteroid.RADIUS,
                         game: this }
    this.asteroids.push(new Relativity.Asteroid(asteroidArgs));
  }

  Game.prototype.handleOutOfBounds = function (moveable) {
    if (movable.pos[0] > this.WIDTH) {
      moveable.pos[0] -= this.WIDTH;
    }

    if (movable.pos[1] > this.WIDTH) {
      moveable.pos[1] -= this.WIDTH;
    }    
  }

  Game.prototype.step = function () {
    this.ship.update(Relativity.currentlyPressed);

    this.asteroids.forEach(function (asteroid) {
      asteroid.update();
    })

    this.bullets.forEach(function (bullet) {
      bullet.update();
    })

    this.asteroids.forEach(function (asteroid) {
      asteroid.update();
    })

    this.checkCollisions();
  }

  Game.prototype.checkCollisions = function () {
    this.asteroids.forEach(function (asteroid) {
      this.bullets.forEach(function (bullet) {
        asteroid.checkBulletCollision(bullet);
      })
    }.bind(this))
  }

  Game.prototype.render = function (ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, Game.WIDTH, Game.HEIGHT);

    this.ship.draw(ctx);

    this.bullets.forEach(function (bullet) {
      bullet.draw(ctx);
    });

    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
  }
})();