import { Physics } from "phaser";
import type { GameScene } from "../scenes/GameScene";
import { Enemy } from "./Enemy";
import { Fires } from "./Fires";

class Player extends Enemy {
  private _fires: Fires;
  private _timer: Phaser.Time.TimerEvent;

  constructor(scene: GameScene) {
    super({
      x: 300,
      y: scene.sys.canvas.height / 2,
      velocity: 500,
      textureName: "dragon",
      frame: "dragon1",
      scene,
    });

    this._velocity = 450;

    this._init();
  }

  protected _init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this._velocity = 500;

    this._fires = new Fires(this.scene);

    this._timer = this.scene.time.addEvent({
      loop: true,
      delay: 500,
      callback: this._onTimerTick,
      callbackScope: this,
    });

    this._fires.createFire(this);
  }

  private _onTimerTick() {
    this._fires.createFire(this);
  }

  public move() {
    if (this.body instanceof Physics.Arcade.Body) {
      this.body.setVelocity(0);

      if ((this.scene as GameScene).cursors.right.isDown) {
        this.body.setVelocityX(this._velocity);
      } else if ((this.scene as GameScene).cursors.left.isDown) {
        this.body.setVelocityX(-this._velocity);
      }

      if ((this.scene as GameScene).cursors.up.isDown) {
        this.body.setVelocityY(-this._velocity);
      } else if ((this.scene as GameScene).cursors.down.isDown) {
        this.body.setVelocityY(this._velocity);
      }
    }
  }
}

export { Player };
