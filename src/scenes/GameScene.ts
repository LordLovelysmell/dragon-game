import { Scene } from "phaser";

import type { Types } from "phaser";
import { Player } from "../prefabs/Player";
import { Enemy } from "../prefabs/Enemy";
import { Enemies } from "../prefabs/Enemies";
import { Fire } from "../prefabs/Fire";
import { Fires } from "../prefabs/Fires";
import { MovableSprite } from "../prefabs/MovableSprite";

class GameScene extends Scene {
  private _player: Player;
  private _cursors: Types.Input.Keyboard.CursorKeys;
  private _background: any;
  private _enemies: Enemies;

  constructor(config: Types.Core.GameConfig) {
    super("Game");
  }

  init() {
    this._cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this._createBackground();
    this._player = new Player(this);
    this._enemies = new Enemies(
      {
        delay: 1000,
        velocity: -500,
        textureName: "bullet",
        origin: { x: 0, y: 0.5 },
      },
      this
    );
    this._addOverlap();
    this._createCompleteEvents();
  }

  private _createCompleteEvents() {
    this._player.once("killed", this._onGameFinished, this);
    this.events.once("enemies-killed", this._onGameFinished, this);
  }

  private _onGameFinished() {
    this.scene.start("Start");
  }

  private _addOverlap() {
    // if player's fire contacts with an enemy
    this.physics.add.overlap(
      this._player.fires,
      this._enemies,
      this._onOverlap,
      undefined,
      this
    );

    // if enemy's bullet contacts with the player
    this.physics.add.overlap(
      this._enemies.fires,
      this._player,
      this._onOverlap,
      undefined,
      this
    );

    // if player contacts with an enemy
    this.physics.add.overlap(
      this._player,
      this._enemies,
      this._onOverlap,
      undefined,
      this
    );
  }

  private _onOverlap(
    source: Types.Physics.Arcade.GameObjectWithBody,
    target: Types.Physics.Arcade.GameObjectWithBody
  ) {
    (source as MovableSprite).setAlive(false);
    (target as MovableSprite).setAlive(false);
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
