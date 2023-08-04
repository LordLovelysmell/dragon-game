import { Physics, Scene } from "phaser";

import { Fire } from "./Fire";
import { Player } from "./Player";

class Fires extends Physics.Arcade.Group {
  private _firesCreatedCount: number;

  constructor(scene: Scene) {
    super(scene.physics.world, scene);

    this._firesCreatedCount = 0;
  }

  public createFire(player: Player) {
    let fire = this.getFirstDead() as Fire;

    if (!fire) {
      fire = Fire.generate(player, this.scene);
      this.add(fire);
    } else {
      fire.reuse(player.x, player.y);
    }

    this._firesCreatedCount++;

    this.add(fire);
    fire.move();
  }
}

export { Fires };
