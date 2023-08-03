import { Scene } from "phaser";

import type { Types } from "phaser";

class BootScene extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.image("bg", "assets/images/background.png");
  }

  create() {
    this.scene.start("Preload");
  }
}

export { BootScene };
