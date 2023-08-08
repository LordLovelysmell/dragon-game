import { Physics, Scene } from "phaser";

import { Fire } from "./Fire";

import type { BulletConfig, Enemy } from "./Enemy";

class Fires extends Physics.Arcade.Group {
  private _firesCreatedCount: number;
  private _bulletConfig: BulletConfig;

  constructor(bulletConfig: BulletConfig, scene: Scene) {
    super(scene.physics.world, scene);

    this._firesCreatedCount = 0;
    this._bulletConfig = bulletConfig;
  }

  public createFire(unit: Enemy) {
    let fire = this.getFirstDead() as Fire;

    if (!fire) {
      fire = Fire.generate(unit, this._bulletConfig, this.scene);
      this.add(fire);
    } else {
      fire.reuse(unit.x, unit.y);
    }

    this._firesCreatedCount++;

    this.add(fire);
    fire.move();
  }
}

export { Fires };
