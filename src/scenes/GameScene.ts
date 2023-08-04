import { Scene } from "phaser";

import type { Types } from "phaser";
import { Player } from "../prefabs/Player";
import { Enemy } from "../prefabs/Enemy";
import { Enemies } from "../prefabs/Enemies";
import { Fire } from "../prefabs/Fire";

class GameScene extends Scene {
  private _player: Player;
  private _enemy: Enemy;
  private _cursors: Types.Input.Keyboard.CursorKeys;
  private _background: any;

  constructor(config: Types.Core.GameConfig) {
    super("Game");
  }

  init() {
    this._cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this._createBackground();
    this._player = new Player(this);
    const enemies = new Enemies(this);
    // const fire = Fire.generate(this._player, this);
    // fire.move();
  }

  update(time: number, deltaTime: number) {
    this._player.move();

    this._background.tilePositionX += 0.1 * deltaTime;
  }

  private _createBackground() {
    this._background = this.add
      .tileSprite(0, 0, this.sys.canvas.width, this.sys.canvas.height, "bg")
      .setOrigin(0);
  }

  get cursors() {
    return this._cursors;
  }
}

export { GameScene };
