import { GameObjects, Physics, Math } from "phaser";
import type { GameScene } from "../scenes/GameScene";

class Enemy extends GameObjects.Sprite {
  protected _scene: GameScene;
  protected _velocity = 350;

  constructor(
    x: number,
    y: number,
    name: string,
    frameId: string,
    scene: GameScene
  ) {
    super(scene, x - 150, y / 2, name, frameId);

    this._scene = scene;

    this._init();
  }

  public static generate(scene: GameScene) {
    const x = scene.sys.canvas.width + 200;
    const y = Math.Between(100, scene.sys.canvas.height - 100);
    const id = Math.Between(0, 4);

    return new Enemy(x, y, "enemy", `enemy${id}`, scene);
  }

  protected _init() {
    this._scene.add.existing(this);
    // this._scene.physics.add.existing(this);
  }

  public move() {
    if (this.body instanceof Physics.Arcade.Body) {
      this.body.setVelocity(0);

      this.body.setVelocityX(-this._velocity);
    }
  }
}

export { Enemy };
