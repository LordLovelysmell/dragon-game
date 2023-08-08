import type { Scene } from "phaser";

import { MovableSprite, MovableSpriteProps } from "./MovableSprite";

import type { Enemy, BulletConfig } from "./Enemy";

class Fire extends MovableSprite {
  protected _velocity: number;

  constructor(config: MovableSpriteProps) {
    super(config);

    this._velocity = config.velocity;
  }

  private static _generateAttributes(unit: Enemy) {
    const x = unit.x;
    const y = unit.y;

    return { x, y };
  }

  public static generate(
    unit: Enemy,
    { velocity, textureName }: BulletConfig,
    scene: Scene
  ) {
    const { x, y } = Fire._generateAttributes(unit);

    return new Fire({
      x,
      y,
      scene,
      velocity,
      textureName,
    });
  }

  protected _isDead(): boolean {
    return this.x > this.width * 2 + this.scene.sys.canvas.width;
  }
}

export { Fire };
