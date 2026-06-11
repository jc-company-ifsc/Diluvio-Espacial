class cutscene extends Phaser.Scene {
  constructor() {
    super("cutscene");
    this.index = 0;
    this.frames = [];
    this.buttonTimeout = 0;
    this.cutsceneDelay = 12000;
    this.buttonPressed = false;
    this.timer = null;
    this.fadeDuration = 250;
    this.nextScene = null;
  }

  create(data) {
    this.data = data;
    this.nextScene = data.nextScene;
    this.index = 0;
    this.buttonTimeout = 500;
    this.cutsceneDelay = data.cutsceneDelay ?? 12000;
    this.buttonPressed = false;

    if (this.timer) {
      this.timer.remove();
      this.timer = null;
    }

    this.frames.forEach((frame) => frame.destroy());
    this.frames = [];

    data.list.forEach((num) => {
      const frame = this.add.image(160, 120, `cutscene-${num}`).setScale(0.95);
      frame.setVisible(false);
      this.frames.push(frame);
    });

    this.cameras.main.fadeIn(this.fadeDuration);
    if (this.frames[this.index]) {
      this.frames[this.index].setVisible(true);
    }

    this.scheduleNextFrame();
  }

  scheduleNextFrame() {
    if (this.timer) {
      this.timer.remove();
    }

    this.timer = this.time.addEvent({
      delay: this.cutsceneDelay,
      callback: () => {
        this.advance();
      },
    });
  }

  advance() {
    if (this.buttonPressed) {
      return;
    }

    this.buttonPressed = true;
    this.time.addEvent({
      delay: this.buttonTimeout,
      callback: () => {
        this.buttonPressed = false;
      },
    });

    if (this.index >= this.frames.length - 1) {
      this.endCutscene();
      return;
    }

    this.cameras.main.fadeOut(this.fadeDuration);
    this.cameras.main.once("camerafadeoutcomplete", () => {
      if (this.frames[this.index]) {
        this.frames[this.index].setVisible(false);
      }
      this.index += 1;
      if (this.frames[this.index]) {
        this.frames[this.index].setVisible(true);
      }
      this.cameras.main.fadeIn(this.fadeDuration);
      this.scheduleNextFrame();
    });
  }

  endCutscene() {
    if (this.timer) {
      this.timer.remove();
      this.timer = null;
    }
    this.scene.stop("cutscene");
    this.scene.start(this.nextScene);
  }
}

export default cutscene;
