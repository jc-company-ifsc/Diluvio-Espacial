var config = {
  type: Phaser.AUTO,
  width: 400,
  height: 225,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: true,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  }
};

export default config;

