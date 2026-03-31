class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");

    this.threshold = 0.1;
    this.speed = 100;
    this.direction = undefined;
  }

  preload() {
    this.load.image("background", "assets/fundo4.png");

    this.load.spritesheet("nv", "assets/personagens/nv.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.plugin(
      "rexvirtualjoystickplugin",
      "./rexvirtualjoystickplugin.min.js",
      true,
    );
  }

  create() {
    this.background = this.add.tileSprite(160, 120, 320, 240, "background");

    this.anims.create({
      key: "flying",
      frames: this.anims.generateFrameNumbers("nv", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });

    this.nv = this.physics.add.sprite(160, 200, "nv");
    this.nv.play("flying");
    this.nv.setCollideWorldBounds(true);

    this.joystick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
      x: 50,
      y: 200,
      radius: 25,
      base: this.add.circle(0, 0, 25, 0xcccccc),
      thumb: this.add.circle(0, 0, 12, 0x666666),
    });

    this.joystick.on("update", () => {
      const angle = Phaser.Math.DegToRad(this.joystick.angle);
      const force = this.joystick.force;

      if (force > this.threshold) {
        this.direction = new Phaser.Math.Vector2(
          Math.cos(angle),
          Math.sin(angle),
        ).normalize();
      }

      if (this.joystick.force > 0) {
        this.nv.setVelocity(
          this.direction.x * this.speed,
          0 // this.direction.y * this.speed
        );
      } else {
        this.nv.setVelocity(0, 0);
      }
    });
  }

  update() {
    this.background.tilePositionY -= 1;
  }
}

export default scene0;