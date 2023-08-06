import { Physics } from "phaser";
import { Time } from "phaser";

import type { Scene } from "phaser";

import { BulletConfig, Enemy } from "./Enemy";

import type { GameScene } from "../scenes/GameScene";
import { Fires } from "./Fires";

class Enemies extends Physics.Arcade.Group {
  private _timer: Time.TimerEvent;
  private _enemiesMaxCount: number;
  private _enemiesCreatedCount: number;
  private _killedEnemiesCount = 0;
  private _fires: Fires;

  constructor(bulletConfig: BulletConfig, scene: Scene) {
    super(scene.physics.world, scene);

    this._enemiesMaxCount = 3;
    this._enemiesCreatedCount = 0;
    this._timer = this.scene.time.addEvent({
      loop: true,
      delay: 1000,
      callback: this._onTimerTick,
      callbackScope: this,
    });

    this._fires = new Fires(bulletConfig, this.scene);
  }

  public get fires() {
    return this._fires;
  }

  private _onTimerTick() {
    this.createEnemies();

    if (this._enemiesCreatedCount >= this._enemiesMaxCount) {
      this._timer.destroy();
    }
  }

  public createEnemies() {
    let enemy = this.getFirstDead() as Enemy;

    if (!enemy) {
      enemy = Enemy.generate(this._fires, this.scene as GameScene);
      enemy.on("killed", this._onEnemyKilled, this);
      this.add(enemy);
    } else {
      enemy.reuse();
    }

    this._enemiesCreatedCount++;

    this.add(enemy);
    enemy.move();
  }

  private _onEnemyKilled() {
    this._killedEnemiesCount++;

    if (this._killedEnemiesCount === this._enemiesMaxCount) {
      this.scene.events.emit("enemies-killed");
    }
  }
}

export { Enemies };
