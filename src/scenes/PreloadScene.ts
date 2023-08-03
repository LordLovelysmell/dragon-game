import { Scene } from "phaser";

import type { Types } from "phaser";

class PreloadScene extends Scene {
  constructor() {
    super("Preload");

    this._preloadFonts();
  }

  preload() {
    console.log("PreloadScene.preload");
  }

  create() {
    console.log("PreloadScene.created");
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
