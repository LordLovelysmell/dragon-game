import { Scene } from "phaser";

import type { Types } from "phaser";
import { Player } from "../prefabs/Player";

class GameScene extends Scene {
  private _player: Player;
  private _cursors: Types.Input.Keyboard.CursorKeys;

  constructor(config: Types.Core.GameConfig) {
    super("Game");
  }

  init() {
    this._cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this._createBackground();
    this._player = new Player(this);
  }

  private _createBackground() {
    this.add.sprite(0, 0, "bg").setOrigin(0);
  }

  get cursors() {
    return this._cursors;
  }
}

export { GameScene };
