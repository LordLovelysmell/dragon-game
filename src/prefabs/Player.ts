import { GameObjects, Physics, Scene } from "phaser";
import type { GameScene } from "../scenes/GameScene";
import { Enemy } from "./Enemy";

class Player extends Enemy {
  constructor(scene: GameScene) {
    super(150, scene.sys.canvas.height / 2, "dragon", "dragon1", scene);

    this._init();
  }

  protected _init() {
    this._scene.add.existing(this);
    this._scene.physics.add.existing(this);
    this._velocity = 500;
  }

  public move() {
    if (this.body instanceof Physics.Arcade.Body) {
      this.body.setVelocity(0);

      if (this._scene.cursors.right.isDown) {
        this.body.setVelocityX(this._velocity);
      } else if (this._scene.cursors.left.isDown) {
        this.body.setVelocityX(-this._velocity);
      }

      if (this._scene.cursors.up.isDown) {
        this.body.setVelocityY(-this._velocity);
      } else if (this._scene.cursors.down.isDown) {
        this.body.setVelocityY(this._velocity);
      }
    }
  }
}

export { Player };
