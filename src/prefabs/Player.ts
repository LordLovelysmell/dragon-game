import { Physics } from "phaser";
import type { GameScene } from "../scenes/GameScene";
import { Enemy } from "./Enemy";
import { Fires } from "./Fires";

class Player extends Enemy {
  constructor(scene: GameScene) {
    super({
      x: 300,
      y: scene.sys.canvas.height / 2,
      velocity: 500,
      textureName: "dragon",
      frame: "dragon1",
      bulletConfig: {
        delay: 500,
        velocity: 750,
        textureName: "fire",
        origin: { x: 1, y: 0.5 },
      },
      scene,
    });

    const frames = this.scene.anims.generateFrameNames("dragon", {
      prefix: "dragon",
      start: 1,
      end: 6,
    });

    this.scene.anims.create({
      key: "dragonFly",
      frames,
      frameRate: 10,
      repeat: -1,
    });

    this.play("dragonFly");
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
