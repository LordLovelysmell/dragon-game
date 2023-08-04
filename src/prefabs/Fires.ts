import { Physics } from "phaser";
import { Time } from "phaser";

import { Fire } from "./Fire";
import type { GameScene } from "../scenes/GameScene";
import { Player } from "./Player";

class Fires extends Physics.Arcade.Group {
  private _scene: GameScene;
  private _firesCreatedCount: number;

  constructor(scene: GameScene) {
    super(scene.physics.world, scene);

    this._scene = scene;
    this._firesCreatedCount = 0;
  }

  public createFire(player: Player) {
    let fire = this.getFirstDead();

    if (!fire) {
      fire = Fire.generate(player, this._scene);
      this.add(fire);
    } else {
      fire.reset(player);
    }

    this._firesCreatedCount++;

    this.add(fire);
    fire.move();
  }
}

export { Fires };
