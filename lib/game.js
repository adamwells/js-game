(function () {
  if (typeof Relativity === 'undefined') {
    window.Relativity = {};
  }

  var Game = Relativity.Game = function (options) {
    this.ship = {};
    this.bullets = [];
    this.asteroids = [];

    this.width = Math.sqrt(Math.pow(options.width, 2) + Math.pow(options.height, 2));
    this.height = Math.sqrt(Math.pow(options.width, 2) + Math.pow(options.height, 2));

    this.viewWidth = options.width;
    this.viewHeight = options.height;

    this.addShip();
    this.addAsteroids();
  }

  Game.NUM_ASTEROIDS = 1;
  Game.MAX_SPEED_SQUARED = 3;
  Game.ASTEROID_SPLITS = 1;

  Game.prototype.addShip = function () {
    this.ship = new Relativity.Ship({ pos: [this.width/2, this.height/2], vel: [0, 0], game: this, rot: 0 });
  }

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.addAsteroid();
    }
  }

  Game.prototype.addAsteroid = function () {
    var asteroidArgs = { pos: [Math.random() * this.width, Math.random() * this.height],
                         vel: [(Math.random() - .5) * Game.MAX_SPEED_SQUARED, (Math.random() - .5) * Game.MAX_SPEED_SQUARED],
                         rad: Relativity.Asteroid.RADIUS,
                         game: this,
                         level: 1 }
    this.asteroids.push(new Relativity.Asteroid(asteroidArgs));
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
    ctx.fillRect(0, 0, this.width, this.height);


    ctx.save()
    ctx.translate(this.viewWidth/2, this.viewHeight/2);

    this.ship.draw(ctx);
    
    ctx.rotate(-this.ship.rot);


    ctx.translate(-this.ship.pos[0], - this.ship.pos[1]);

    this.bullets.forEach(function (bullet) {
      bullet.draw(ctx);
    });

    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });

    this.drawGrid(ctx);
    ctx.restore();
  }

  Game.prototype.drawGrid = function (ctx) {
    this.heightBuffer = this.height/10;
    this.widthBuffer = this.width/10;
    ctx.save();

    ctx.strokeStyle = 'white';
    for (var i = 0; i < 10; i++) {
      ctx.moveTo(0, this.heightBuffer * i)
      ctx.lineTo(this.width, this.heightBuffer * i)
    }

    for (var i = 0; i < 10; i++) {
      ctx.moveTo(this.widthBuffer * i, 0)
      ctx.lineTo(this.widthBuffer * i, this.height)
    }
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
})();