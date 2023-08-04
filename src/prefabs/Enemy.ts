import { Math } from "phaser";

import { MovableSprite, MovableSpriteProps } from "./MovableSprite";

import type { GameScene } from "../scenes/GameScene";

class Enemy extends MovableSprite {
  constructor(config: MovableSpriteProps) {
    super(config);
  }

  private static _generateAttributes(scene: GameScene) {
    const x = scene.sys.canvas.width + 100;
    const y = Math.Between(100, scene.sys.canvas.height - 100);
    const id = Math.Between(1, 4);

    return { x, y, id };
  }

  public static generate(scene: GameScene) {
    const { x, y, id } = Enemy._generateAttributes(scene);

    return new Enemy({
      x,
      y,
      velocity: -300,
      textureName: "enemy",
      frame: `enemy${id}`,
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
