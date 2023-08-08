import { Scene } from "phaser";

import type { Types } from "phaser";
import { Player } from "../prefabs/Player";
import { Enemies } from "../prefabs/Enemies";
import { MovableSprite } from "../prefabs/MovableSprite";
import { Boom } from "../prefabs/Boom";

class GameScene extends Scene {
  private _player: Player;
  private _cursors: Types.Input.Keyboard.CursorKeys;
  private _background: any;
  private _enemies: Enemies;
  private _score = 0;
  private _scoreUIElement: Phaser.GameObjects.Text;

  constructor(config: Types.Core.GameConfig) {
    super("Game");
  }

  init() {
    this._cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this._createBackground();
    this._createBoomSound();
    this._score = 0;
    this._createScoreUI();
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

  private _createBoomSound() {
    if (this.sound.get("boom")) {
      return;
    }

    if (!this.sound.get("boom")) {
      this.sound.add("boom");
    }
  }

  private _createScoreUI() {
    this._scoreUIElement = this.add.text(50, 50, "Score: 0", {
      fontFamily: "JingleStar",
      fontSize: "32px",
    });

    this._scoreUIElement.setDepth(1);
  }

  private _createCompleteEvents() {
    this._player.once("killed", this._onGameFinished, this);
    this.events.once("enemies-killed", this._onGameFinished, this);
  }

  private _onGameFinished() {
    this.scene.start("Start", {
      score: this._score,
      isPlayerAlive: this._player.active,
    });
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
    if (
      source.body.x < this.sys.canvas.width - source.body.width ||
      target.body.x < this.sys.canvas.width - target.body.width
    ) {
      if (source !== this._player && target !== this._player) {
        this._scoreUIElement.text = `Score: ${++this._score}`;

        this.sound.play("boom");

        new Boom({
          x: target.body.x,
          y: target.body.y,
          scene: this,
        });
      }

      (source as MovableSprite).setAlive(false);
      (target as MovableSprite).setAlive(false);
    }
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
