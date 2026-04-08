class scene1 extends Phaser.Scene {
  constructor() {
    super("scene1");
  }

  preload() {
    this.load.image("mapBg", "assets/fase 2/Tiled3.png");
    this.load.spritesheet("vd", "assets/personagens/Astronaut_Idle (1).png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    const mapWidth = 2820;
    const mapHeight = 1539;

    this.add.image(0, 0, "mapBg").setOrigin(0, 0);

    this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);

    this.player = this.physics.add.sprite(160, 160, "vd", 0);
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(24, 28).setOffset(20, 20);

    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("vd", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.add
      .text(10, 10, "Voltar", {
        fontSize: "12px",
        fill: "#ffffff",
        backgroundColor: "#000000",
        padding: { x: 5, y: 5 },
      })
      .setScrollFactor(0)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("scene0");
      });
  }

  update() {
    const speed = 140;
    let vx = 0;
    let vy = 0;

    if (this.cursors.left.isDown) {
      vx = -speed;
      this.player.setFlipX(true);
    }
    if (this.cursors.right.isDown) {
      vx = speed;
      this.player.setFlipX(false);
    }
    if (this.cursors.up.isDown) {
      vy = -speed;
    }
    if (this.cursors.down.isDown) {
      vy = speed;
    }

    this.player.setVelocity(vx, vy);

    if (vx !== 0 || vy !== 0) {
      this.player.anims.play("walk", true);
    } else {
      this.player.anims.stop();
    }
  }
}

export default scene1;
