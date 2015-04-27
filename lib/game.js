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
  Game.NUM_ASTEROIDS = 8;
  Game.MAX_SPEED_SQUARED = 3;
  Game.ASTEROID_SPLITS = 1;

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
                         game: this,
                         level: 1 }
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
      asteroid.checkShipCollision(this.ship);
    }.bind(this))
  }

  Game.prototype.render = function (ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, Game.WIDTH, Game.HEIGHT);

    ctx.save()
    ctx.translate(Game.WIDTH/2, Game.HEIGHT/2);
    this.ship.draw(ctx);
    ctx.rotate(-this.ship.rot);
    ctx.translate(-this.ship.pos[0], - this.ship.pos[1]);

    this.bullets.forEach(function (bullet) {
      bullet.draw(ctx);
    });

    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });

    ctx.restore();

    


  }
})();