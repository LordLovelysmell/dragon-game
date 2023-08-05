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
}

class Enemy extends MovableSprite {
  private _fires: Fires;
  private _timer: Phaser.Time.TimerEvent;
  private _bulletConfig: BulletConfig;

  constructor({ bulletConfig, ...rest }: EnemyProps) {
    super(rest);

    this._bulletConfig = bulletConfig;

    this._fires = new Fires(this._bulletConfig, this.scene);

    this.setOrigin(this._bulletConfig.origin.x, this._bulletConfig.origin.y);

    this._timer = this.scene.time.addEvent({
      loop: true,
      delay: this._bulletConfig.delay,
      callback: this._onTimerTick,
      callbackScope: this,
    });
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

  public static generate(scene: GameScene) {
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
      scene,
    });
  }

  public reuse() {
    const x = this.scene.sys.canvas.width + 200;
    const y = Math.Between(100, this.scene.sys.canvas.height - 100);

    super.reuse(x, y);
  }
}

export { Enemy };
