import Phaser from "phaser";

class RacingGame extends Phaser.Scene {
  constructor() {
    super({ key: "RacingGame" });
  }

  preload() {
    this.load.image("road", "road.png");
    this.load.image("car", "car.png");
  }

  create() {
    this.road = this.add.tileSprite(400, 300, 800, 600, "road");
    this.car = this.physics.add.sprite(400, 500, "car");
    this.car.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.road.tilePositionY -= 5;

    if (this.cursors.left.isDown) {
      this.car.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.car.setVelocityX(200);
    } else {
      this.car.setVelocityX(0);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: { debug: false },
  },
  scene: RacingGame,
};

const game = new Phaser.Game(config);
