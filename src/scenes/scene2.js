class scene2 extends Phaser.Scene {
  constructor() {
    super("scene2");
  }

  preload() {
    this.load.tilemapTiledJSON('map', 'assets/fase 2/tiled4.json');
    this.load.image('background3', 'assets/fase 2/jogo boi/Diluvio-Espacial-main/Assets/Caverna/background3.png');
    this.load.image('background4a', 'assets/fase 2/jogo boi/Diluvio-Espacial-main/Assets/Caverna/background4a.png');
    this.load.image('background1', 'assets/fase 2/jogo boi/Diluvio-Espacial-main/Assets/Caverna/background1.png');
    this.load.image('mainlev_build', 'assets/fase 2/jogo boi/Diluvio-Espacial-main/Assets/Caverna/mainlev_build.png');
    this.load.image('props1', 'assets/fase 2/jogo boi/Diluvio-Espacial-main/Assets/Caverna/props1.png');
    this.load.image('CloudsBack', 'assets/fase 2/jogo boi/FreePlatformerNA/Background/CloudsBack.png');
    this.load.image('BGFront', 'assets/fase 2/jogo boi/FreePlatformerNA/Background/BGFront.png');
    this.load.image('CloudsFront', 'assets/fase 2/jogo boi/FreePlatformerNA/Background/CloudsFront.png');
    this.load.image('Tileset', 'assets/fase 2/jogo boi/FreePlatformerNA/Foreground/Tileset.png');
    this.load.image('TilesExamples', 'assets/fase 2/jogo boi/FreePlatformerNA/Foreground/TilesExamples.png');
    this.load.image('Trees', 'assets/fase 2/jogo boi/FreePlatformerNA/Foreground/Trees.png');
    this.load.image('props2', 'assets/fase 2/jogo boi/Diluvio-Espacial-main/Assets/Caverna/props2.png');
    this.load.spritesheet("vd", "assets/personagens/az.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });

    const background3 = map.addTilesetImage('background3', 'background3');
    const background4a = map.addTilesetImage('background4a', 'background4a');
    const background1 = map.addTilesetImage('background1', 'background1');
    const mainlev_build = map.addTilesetImage('mainlev_build', 'mainlev_build');
    const props1 = map.addTilesetImage('props1', 'props1');
    const CloudsBack = map.addTilesetImage('CloudsBack', 'CloudsBack');
    const BGFront = map.addTilesetImage('BGFront', 'BGFront');
    const CloudsFront = map.addTilesetImage('CloudsFront', 'CloudsFront');
    const Tileset = map.addTilesetImage('Tileset', 'Tileset');
    const TilesExamples = map.addTilesetImage('TilesExamples', 'TilesExamples');
    const Trees = map.addTilesetImage('Trees', 'Trees');
    const props2 = map.addTilesetImage('props2', 'props2');

    map.createLayer('fundo 0', [background3, background4a, background1, mainlev_build, props1, CloudsBack, BGFront, CloudsFront, Tileset, TilesExamples, Trees, props2], 0, 0);
    map.createLayer('fundo 1', [background3, background4a, background1, mainlev_build, props1, CloudsBack, BGFront, CloudsFront, Tileset, TilesExamples, Trees, props2], 0, 0);
    map.createLayer('fundo 2', [background3, background4a, background1, mainlev_build, props1, CloudsBack, BGFront, CloudsFront, Tileset, TilesExamples, Trees, props2], 0, 0);
    const terra = map.createLayer('terra', [background3, background4a, background1, mainlev_build, props1, CloudsBack, BGFront, CloudsFront, Tileset, TilesExamples, Trees, props2], 0, 0);

    terra.setCollisionByExclusion([-1]);

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.player = this.physics.add.sprite(160, 100, "vd", 0);
    this.player.setCollideWorldBounds(false);
    this.player.body.setSize(24, 28).setOffset(20, 20);
    this.player.setGravityY(300);

    this.physics.add.collider(this.player, terra);

    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("vd", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.add
      .text(10, 10, "Cena 1", {
        fontSize: "12px",
        fill: "#ffffff",
        backgroundColor: "#000000",
        padding: { x: 5, y: 5 },
      })
      .setScrollFactor(0)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("scene1");
      });
  }

  update() {
    const speed = 140;
    let vx = 0;

    if (this.cursors.left.isDown) {
      vx = -speed;
      this.player.setFlipX(true);
    } else if (this.cursors.right.isDown) {
      vx = speed;
      this.player.setFlipX(false);
    }

    this.player.setVelocityX(vx);

    if (this.cursors.up.isDown && this.player.body.onFloor()) {
      this.player.setVelocityY(-200);
    }

    if (vx !== 0) {
      this.player.anims.play("walk", true);
    } else {
      this.player.anims.stop();
    }
  }
}

export default scene2;
