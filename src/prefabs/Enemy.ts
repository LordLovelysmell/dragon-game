import { Math } from "phaser";

import { MovableSprite, MovableSpriteProps } from "./MovableSprite";
import { Fires } from "./Fires";

import type { GameScene } from "../scenes/GameScene";

export interface BulletConfig {
  delay: number;
  velocity: number;
  textureName: string;
  origin: {
    x: number;
    y: number;
  };
}

interface EnemyProps extends MovableSpriteProps {
  bulletConfig: BulletConfig;
  fires?: Fires;
}

class Enemy extends MovableSprite {
  private _fires: Fires;
  private _timer: Phaser.Time.TimerEvent;
  private _bulletConfig: BulletConfig;

  constructor({ bulletConfig, fires, ...rest }: EnemyProps) {
    super(rest);

    this._bulletConfig = bulletConfig;

    this._fires = fires || new Fires(bulletConfig, this.scene);

    this.setOrigin(this._bulletConfig.origin.x, this._bulletConfig.origin.y);

    this._timer = this.scene.time.addEvent({
      loop: true,
      delay: this._bulletConfig.delay,
      callback: this._onTimerTick,
      callbackScope: this,
    });
  }

  public get fires() {
    return this._fires;
  }

  private static _generateAttributes(scene: GameScene) {
    const x = scene.sys.canvas.width + 100;
    const y = Math.Between(100, scene.sys.canvas.height - 100);
    const id = Math.Between(1, 4);

    return { x, y, id };
  }

  private _onTimerTick() {
    this._fires.createFire(this);
  }

  public static generate(fires: Fires, scene: GameScene) {
    const { x, y, id } = Enemy._generateAttributes(scene);

    return new Enemy({
      x,
      y,
      velocity: -300,
      textureName: "enemy",
      frame: `enemy${id}`,
      bulletConfig: {
        delay: 1000,
        velocity: -500,
        textureName: "bullet",
        origin: { x: 0, y: 0.5 },
      },
      fires,
      scene,
    });
  }

  public reuse() {
    const x = this.scene.sys.canvas.width + 200;
    const y = Math.Between(100, this.scene.sys.canvas.height - 100);

    super.reuse(x, y);
  }

  protected _isDead(): boolean {
    return this.x < -this.width;
  }

  public override setAlive(value: boolean) {
    super.setAlive(value);
    this._timer.paused = !value;

    if (!value) {
      this.emit("killed");
    }
  }
}

export { Enemy };
