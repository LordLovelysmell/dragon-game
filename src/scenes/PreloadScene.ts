import { Scene } from "phaser";

import type { Types } from "phaser";

class PreloadScene extends Scene {
  constructor() {
    super("Preload");

    this._preloadFonts();
  }

  preload() {
    this.load.atlas(
      "dragon",
      "assets/sprites/dragon.png",
      "assets/sprites/dragon.json"
    );
  }

  create() {
    this.scene.start("Start");
  }

  private _preloadFonts() {
    const div = document.createElement("div");
    div.innerText = ".";
    div.style.fontFamily = "JingleStar";
    div.style.position = "absolute";
    div.style.visibility = "hidden";
    document.body.insertAdjacentElement("afterbegin", div);
  }
}

export { PreloadScene };
