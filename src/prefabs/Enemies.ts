import { Physics } from "phaser";
import { Time } from "phaser";

import { Enemy } from "./Enemy";
import type { GameScene } from "../scenes/GameScene";

class Enemies extends Physics.Arcade.Group {
  private _scene: GameScene;
  private _timer: Time.TimerEvent;
  private _enemiesMaxCount: number;
  private _enemiesCreatedCount: number;

  constructor(scene: GameScene) {
    super(scene.physics.world, scene);

    this._scene = scene;
    this._enemiesMaxCount = 10;
    this._enemiesCreatedCount = 0;
    this._timer = this._scene.time.addEvent({
      loop: true,
      delay: 1000,
      callback: this._onTimerTick,
      callbackScope: this,
    });
  }

  private _onTimerTick() {
    this.createEnemies();

    if (this._enemiesCreatedCount >= this._enemiesMaxCount) {
      this._timer.destroy();
    }
  }

  public createEnemies() {
    let enemy = this.getFirstDead();

    if (!enemy) {
      enemy = Enemy.generate(this._scene);
      this.add(enemy);
    } else {
      enemy.reset();
    }

    this._enemiesCreatedCount++;

    this.add(enemy);
    enemy.move();
  }
}

export { Enemies };
