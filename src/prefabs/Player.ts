import { GameObjects, Physics, Scene } from "phaser";
import type { GameScene } from "../scenes/GameScene";

class Player extends GameObjects.Sprite {
  private _scene: GameScene;
  private _velocity = 500;

  constructor(scene: GameScene) {
    super(scene, 150, scene.sys.canvas.height / 2, "dragon", 0);

    this._scene = scene;

    this._init();
  }

  private _init() {
    this._scene.add.existing(this);
    this._scene.physics.add.existing(this);

    this._scene.update = () => {
      this._checkMovement();
    };
  }

  private _checkMovement() {
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
