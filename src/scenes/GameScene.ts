import { Scene } from "phaser";

import type { Types } from "phaser";

class GameScene extends Scene {
  constructor(config: Types.Core.GameConfig) {
    super("Game");
  }

  create() {
    console.log("GameScene.create");

    this._createBackground();
  }

  private _createBackground() {
    this.add.sprite(0, 0, "bg").setOrigin(0);
  }
}

export { GameScene };
