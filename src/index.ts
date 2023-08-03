import { Game, Types } from "phaser";

import { PreloadScene } from "./scenes/PreloadScene";
import { BootScene } from "./scenes/BootScene";
import { StartScene } from "./scenes/StartScene";
import { GameScene } from "./scenes/GameScene";

import "./index.scss";

const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [BootScene, PreloadScene, StartScene, GameScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
};

const game = new Game(config);
