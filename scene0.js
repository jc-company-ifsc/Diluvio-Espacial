class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");

    this.threshold = 0.1;
    this.speed = 100;
    this.direction = undefined;
  }

  preload() {
    this.load.spritesheet("nv", "assets/personagens/nv.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.plugin(
      "rexvirtualjoystickplugin",
      "./rexvirtualjoystickplugin.min.js",
      true,
    );
  }

  create() {
    this.anims.create({
      key: "walk-up",
      frames: this.anims.generateFrameNumbers("nv", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNumbers("nv", { start: 8, end: 15 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("nv", { start: 24, end: 31 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-down",
      frames: this.anims.generateFrameNumbers("nv", { start: 16, end: 23 }),
      frameRate: 10,
      repeat: -1,
    });

    this.nv = this.physics.add.sprite(200, 100, "nv", 20);

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
          this.direction.y * this.speed
        );

        switch (true) {
          case this.joystick.angle >= -135 && this.joystick.angle < -45:
            this.nv.anims.play("walk-up", true);
            break;
          case this.joystick.angle >= -45 && this.joystick.angle < 45:
            this.nv.anims.play("walk-right", true);
            break;
          case this.joystick.angle >= 45 && this.joystick.angle < 135:
            this.nv.anims.play("walk-down", true);
            break;
          case this.joystick.angle >= 135 || this.joystick.angle < -135:
            this.nv.anims.play("walk-left", true);
            break;
        }
      } else {
        this.nv.setVelocity(0, 0);
        this.nv.anims.stop();
      }
    });

    setInterval(() => {
      this.timer -= 1;
      this.textTime.setText('Time: ${this.timer}'); 

      if (this.timer <= 0) {
        this.scene.stop("game-over");
        this.scene.start("scene1");
      }
    }, 1000);
  }
}

export default scene0;