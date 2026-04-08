class scene1 extends Phaser.Scene {
  constructor() {
    super("scene1");
  }

  preload() {
    this.load.tilemapTiledJSON("map1", "assets/fase 2/Tiled3.json");
    this.load.image("mapTiles", "assets/fase 2/az.png");
    this.load.spritesheet("vd", "assets/fase 2/vd.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    const map = this.make.tilemap({ key: "map1" });
    const tilesetNames = [
      "background3",
      "background4a",
      "background1",
      "mainlev_build",
      "props1",
      "background1",
      "CloudsBack",
      "BGFront",
      "CloudsFront",
      "Tileset",
      "TilesExamples",
      "Trees",
      "SuperMarioBrosMap5-3",
      "props2",
    ];

    const tilesets = tilesetNames
      .map((name) => map.addTilesetImage(name, "mapTiles"))
      .filter(Boolean);

    const layerNames = [
      "fundo 0",
      "fundo 1",
      "fundo 2",
      "terra",
      "Porta caverna",
      "mario",
      "Fundo 0 - Fase 1",
      "Fundo 1 - Fase 1",
      "Fundo 2 - Fase 1",
      "Teto - Fase 1",
      "Casa fim de fase",
      "Plataforma",
    ];

    this.mapLayers = {};
    layerNames.forEach((name) => {
      const layer = map.createLayer(name, tilesets, 0, 0);
      if (layer) {
        layer.setDepth(0);
        if (["terra", "Porta caverna", "Teto - Fase 1", "Casa fim de fase", "Plataforma"].includes(name)) {
          layer.setCollisionByExclusion([-1]);
        }
        this.mapLayers[name] = layer;
      }
    });

    const worldWidth = 2816;
    const worldHeight = 768;
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

    this.player = this.physics.add.sprite(160, 160, "vd", 0);
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(12, 14).setOffset(2, 2);

    Object.values(this.mapLayers).forEach((layer) => {
      if (layer.layer && ["terra", "Porta caverna", "Teto - Fase 1", "Casa fim de fase", "Plataforma"].includes(layer.layer.name)) {
        this.physics.add.collider(this.player, layer);
      }
    });

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
