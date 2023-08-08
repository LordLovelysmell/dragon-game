import { Scene } from "phaser";

import type { Types } from "phaser";

interface CreatedData {
  score: number;
  isPlayerAlive: boolean;
}

class StartScene extends Scene {
  constructor(config: Types.Core.GameConfig) {
    super("Start");
  }

  create(data: CreatedData | Record<string, never>) {
    this._createBackground();

    if (data.score >= 0 || data.isPlayerAlive) {
      this._createStats(data as CreatedData);
    }

    this._createText();

    this.input.on("pointerdown", () => {
      this.scene.start("Game");
    });
  }

  private _createStats(data: CreatedData) {
    const graphics = this.add.graphics();

    graphics.fillStyle(0x000000, 0.5);
    graphics.fillRoundedRect(
      this.sys.canvas.width / 2 - 200,
      this.sys.canvas.height / 2 - 200,
      400,
      400
    );

    const textTitle = data.isPlayerAlive ? "Level completed!" : "Game Over";
    const textScore = `Score: ${data.score}`;
    const textStyle = {
      fontFamily: "JingleStar",
      fontSize: "32px",
    };

    this.add
      .text(this.sys.canvas.width / 2, 250, textTitle, textStyle)
      .setOrigin(0.5);
    this.add
      .text(this.sys.canvas.width / 2, 350, textScore, textStyle)
      .setOrigin(0.5);
  }

  private _createBackground() {
    this.add.sprite(0, 0, "bg").setOrigin(0);
  }

  private _createText() {
    this.add
      .text(
        this.sys.canvas.width / 2,
        this.sys.canvas.height / 1.5,
        "Tap to start!",
        {
          fontFamily: "JingleStar",
          fontSize: "48px",
        }
      )
      .setOrigin(0.5);
  }
}

export { StartScene };
