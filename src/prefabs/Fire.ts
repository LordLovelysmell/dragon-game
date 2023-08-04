import { GameObjects, Physics, Math } from "phaser";
import type { GameScene } from "../scenes/GameScene";
import type { Player } from "./Player";

class Fire extends GameObjects.Sprite {
  protected _scene: GameScene;
  protected _velocity = 600;

  constructor(x: number, y: number, scene: GameScene) {
    super(scene, x, y, "fire");

    this._scene = scene;

    this._init();
  }

  private static _generateAttributes(player: Player) {
    const x = player.x + player.width / 2;
    const y = player.y;

    return { x, y };
  }

  public static generate(player: Player, scene: GameScene) {
    const { x, y } = Fire._generateAttributes(player);

    return new Fire(x, y, scene);
  }

  protected _init() {
    this._scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.scene.events.on("update", this._onUpdate, this);
  }

  private _onUpdate() {
    if (this.active && this.x > this.width + this._scene.sys.canvas.width) {
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

  public move() {
    if (this.body instanceof Physics.Arcade.Body) {
      this.body.setVelocityX(this._velocity);
    }
  }

  public reset(player: Player) {
    const { x, y } = Fire._generateAttributes(player);

    this.x = x;
    this.y = y;

    this._setAlive(true);
  }
}

export { Fire };
