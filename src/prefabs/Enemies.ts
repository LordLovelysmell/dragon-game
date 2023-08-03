import { Physics } from "phaser";
import { Time } from "phaser";

import { Enemy } from "./Enemy";
import type { GameScene } from "../scenes/GameScene";

class Enemies extends Physics.Arcade.Group {
  private _scene: GameScene;
  private _timer: Time.TimerEvent;
  private _enemiesMaxCount: number;

  constructor(scene: GameScene) {
    super(scene.physics.world, scene);

    this._scene = scene;
    this._enemiesMaxCount = 10;
    this._timer = this._scene.time.addEvent({
      loop: true,
      delay: 1000,
      callback: this._onTimerTick,
      callbackScope: this,
    });
  }

  private _onTimerTick() {
    this.createEnemies();

    if (this.getLength() >= this._enemiesMaxCount) {
      this._timer.destroy();
    }
  }

  public createEnemies() {
    const enemy = Enemy.generate(this._scene);
    this.add(enemy);
    enemy.move();
  }
}

export { Enemies };
