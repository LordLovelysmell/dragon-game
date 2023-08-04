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

  private static _generateAttributes(scene: GameScene) {
    const x = scene.sys.canvas.width + 200;
    const y = Math.Between(100, scene.sys.canvas.height - 100);
    const id = Math.Between(1, 4);

    return { x, y, id };
  }

  public static generate(scene: GameScene) {
    const { x, y, id } = Enemy._generateAttributes(scene);

    return new Enemy(x, y, "enemy", `enemy${id}`, scene);
  }

  private _onUpdate() {
    if (this.active && this.x < -this.width) {
      this._setAlive(false);
    }
  }

  private _setAlive(value: boolean) {
    if (this.body instanceof Physics.Arcade.Body) {
      this.body.enable = value;
      this.setVisible(value);
      this.setActive(value);
    }
  }

  protected _init() {
    this._scene.add.existing(this);
    this._scene.events.on("update", this._onUpdate, this);
  }

  public move() {
    if (this.body instanceof Physics.Arcade.Body) {
      this.body.setVelocity(0);

      this.body.setVelocityX(-this._velocity);
    }
  }

  public reset() {
    const { x, y, id } = Enemy._generateAttributes(this._scene);

    this.x = x;
    this.y = y;
    this.setFrame(`enemy${id}`);

    this._setAlive(true);
  }
}

export { Enemy };
