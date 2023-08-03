import { Scene } from "phaser";

import type { Types } from "phaser";

class MainScene extends Scene {
  private _backgroundKey = "bg";

  constructor(config: Types.Core.GameConfig) {
    super(config);
  }

  preload() {
    this.load.image(this._backgroundKey, "assets/images/background.png");
  }

  create() {
    this._createBackground();
  }

  private _createBackground() {
    this.add.sprite(0, 0, this._backgroundKey).setOrigin(0, 0);
  }
}

export { MainScene };
