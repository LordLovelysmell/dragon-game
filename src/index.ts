import { Game } from "phaser";

import { PreloadScene } from "./scenes/PreloadScene";
import { BootScene } from "./scenes/BootScene";
import { StartScene } from "./scenes/StartScene";
import { GameScene } from "./scenes/GameScene";

import "./index.scss";

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [BootScene, PreloadScene, StartScene, GameScene],
};

const game = new Game(config);
