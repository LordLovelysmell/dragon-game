import { GameObjects, Physics, Textures, Scene } from "phaser";

export interface MovableSpriteProps {
  x: number;
  y: number;
  velocity: number;
  textureName: string | Textures.Texture;
  frame?: string | number;
  scene: Scene;
}

class MovableSprite extends GameObjects.Sprite {
  protected _velocity: number;

  constructor({
    x,
    y,
    velocity,
    textureName,
    frame,
    scene,
  }: MovableSpriteProps) {
    super(scene, x, y, textureName, frame);

    this._velocity = velocity;

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.scene.events.on("update", this._onUpdate, this);
  }

  private _onUpdate() {
    if (this.active && this._isDead()) {
      this.setAlive(false);
    }
  }

  protected _isDead() {
    return false;
  }

  public setAlive(value: boolean) {
    if (this.body instanceof Physics.Arcade.Body) {
      this.body.enable = value;
      this.setVisible(value);
      this.setActive(value);
    }
  }

  public move() {
    if (this.body instanceof Physics.Arcade.Body) {
      this.body.setVelocityX(this._velocity);
    }
  }

  public reuse(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.setAlive(true);
  }
}

export { MovableSprite };
