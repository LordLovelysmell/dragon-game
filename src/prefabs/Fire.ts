import type { Scene } from "phaser";

import { MovableSprite, MovableSpriteProps } from "./MovableSprite";

import type { Player } from "./Player";

class Fire extends MovableSprite {
  protected _velocity: number;

  constructor(config: MovableSpriteProps) {
    super(config);

    this._velocity = config.velocity;
  }

  private static _generateAttributes(player: Player) {
    const x = player.x + player.width / 2;
    const y = player.y;

    return { x, y };
  }

  public static generate(player: Player, scene: Scene) {
    const { x, y } = Fire._generateAttributes(player);

    return new Fire({
      x,
      y,
      scene,
      velocity: 500,
      textureName: "fire",
    });
  }
}

export { Fire };
