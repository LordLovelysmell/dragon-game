import { Animations, GameObjects, Scene } from "phaser";

interface BoomProps {
  x: number;
  y: number;
  frame?: string | number;
  scene: Scene;
}

class Boom extends GameObjects.Sprite {
  constructor({ x, y, frame, scene }: BoomProps) {
    super(scene, x, y, "boom", "boom1");

    this.scene.add.existing(this);
    this.setOrigin(0);

    const frames = this.scene.anims.generateFrameNames("boom", {
      prefix: "boom",
      start: 1,
      end: 4,
    });

    this.scene.anims.create({
      key: "boom",
      frames,
      frameRate: 10,
    });

    this.play("boom");

    this.once(Animations.Events.ANIMATION_COMPLETE, () => {
      this.destroy();
    });
  }
}

export { Boom };
