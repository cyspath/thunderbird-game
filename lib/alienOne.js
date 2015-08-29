(function () {
  if (typeof Thunderbird === "undefined") {
    window.Thunderbird = {};
  }

  var AlienOne = window.Thunderbird.AlienOne = function (args) {

    this.pos = args.pos;
    this.radius = AlienOne.RADIUS;

    this.vel = args.vel;
    this.game = args.game;
    this.name = "enemy";

    this.reloaded = true;

  };

  AlienOne.RADIUS = 32;
  AlienOne.COLOR = "red";

  Thunderbird.Util.inherits(AlienOne, Thunderbird.MovingObject);

  AlienOne.prototype.collidedWith = function (otherObject) {
    if (otherObject.name === "enemy") { return false; }
    if (otherObject.name === "alienBullet") { return false; }
    if (otherObject.name === "explosion") { return false; }


    var rSum = this.radius + otherObject.radius;
    var distance = Math.sqrt( Math.pow(this.pos[0] - otherObject.pos[0], 2) + Math.pow(this.pos[1] - otherObject.pos[1], 2) )
    return (rSum >= distance) ? true : false;
  };


  AlienOne.prototype.draw = function (ctx) {
    // ctx.fillStyle = "#000000";
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   this.radius,
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    // ctx.strokeStyle="white";
    // ctx.lineWidth = 1;
    // ctx.stroke();
    // ctx.fill();

    //ship draw
    var image = new Image();
    image.src = "http://res.cloudinary.com/djdfz4a67/image/upload/c_scale,h_99,w_75/v1440831855/alien3_ktvpq3.png"
    ctx.drawImage(image, this.pos[0] - 38, this.pos[1] - 37);
  };


  AlienOne.prototype.move = function() {
    this.pos[0] = this.pos[0] + this.vel[0];
    this.pos[1] = this.pos[1] + this.vel[1];

    if (this.pos[1] >= 900) {
      this.pos[1] = -(Math.floor(Math.random() * 190) + 10);
    }

    if (this.pos[1] === -200) {
      this.pos[0] = Math.floor(Math.random() * (this.game.DIM_X))
    }

    this.fireBullet();
  };

  AlienOne.prototype.fireBullet = function() {

    if (this.reloaded === true && this.pos[0] > this.game.ship.pos[0] - 40 && this.pos[0] < this.game.ship.pos[0] + 40) {
      this.reloaded = false;
      if (this.game.array.indexOf(this) != -1) { this.shoot(); }
      setTimeout(function () {
        this.reloaded = true;
      }.bind(this), 1600)
    }


  };

  AlienOne.prototype.shoot = function () {

    //shoots three conseq bullets
    setTimeout(function () {
      var posX = this.pos[0]
      var posY = this.pos[1]
      var bullet = new Thunderbird.AlienBullet({pos: [posX, posY],
                                         game: this.game});
      this.game.array.push(bullet);

        setTimeout(function () {
          var posX = this.pos[0]
          var posY = this.pos[1]
          var bullet = new Thunderbird.AlienBullet({pos: [posX, posY],
                                              game: this.game});
          this.game.array.push(bullet);

          setTimeout(function () {
            var posX = this.pos[0]
            var posY = this.pos[1]
            var bullet = new Thunderbird.AlienBullet({pos: [posX, posY],
                                                game: this.game});
            this.game.array.push(bullet);

          }.bind(this), 280);


        }.bind(this), 280);

    }.bind(this), 280);

  };



})();