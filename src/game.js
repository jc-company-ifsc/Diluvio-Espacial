import config from "./config/config.js";
import scene0 from "./scenes/scene0.js";
import scene1 from "./scenes/scene1.js";
import scene2 from "./scenes/scene2.js";
import start from "./scenes/start.js";


class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("start", start);
    this.scene.add("scene0", scene0);
    this.scene.add("scene1", scene1);
    this.scene.add("scene2", scene2);
    this.scene.start("start");
  }
}

window.onload = () => {
  window.game = new Game();
};
