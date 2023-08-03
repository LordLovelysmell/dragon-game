import { Scene } from "phaser";

import type { Types } from "phaser";

class StartScene extends Scene {
  constructor(config: Types.Core.GameConfig) {
    super("Start");
  }

  create() {
    console.log("StartScene.create");

    this._createBackground();

    this._createText();

    this.input.on("pointerdown", () => {
      this.scene.start("Game");
    });
  }

  private _createBackground() {
    this.add.sprite(0, 0, "bg").setOrigin(0);
  }

  private _createText() {
    this.add
      .text(
        this.sys.canvas.width / 2,
        this.sys.canvas.height / 1.25,
        "Tap to start!",
        {
          fontFamily: "JingleStar",
          fontSize: "64px",
        }
      )
      .setOrigin(0.5);
  }
}

export { StartScene };
