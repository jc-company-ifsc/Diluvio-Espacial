class creditos extends Phaser.Scene {
  constructor() {
    super("creditos");
  }

  create() {
    this.add.image(160, 120, "creditos").setScrollFactor(0);
    this.cameras.main.fadeIn(250);

    this.input.keyboard.once("keydown-SPACE", () => this.restartGame());
    this.input.keyboard.once("keydown-ENTER", () => this.restartGame());
    this.input.once("pointerdown", () => this.restartGame());
  }

  restartGame() {
    this.scene.stop("creditos");
    this.scene.start("start");
  }
}

export default creditos;