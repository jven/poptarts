import Phaser = require('phaser');
import { ControllerStateMap } from './controllerstatemap';
import { Player } from './player';

type PlayerMap = Map<number, Player>;

export class Game {
  private controllerStateMap: ControllerStateMap;
  private playerMap : PlayerMap;

  private constructor(playerMap: PlayerMap,
    controllerStateMap: ControllerStateMap) {
    this.playerMap = playerMap;
    this.controllerStateMap = controllerStateMap;
  }

  preload(scene: Phaser.Scene): void {
    scene.load.image('poptart', 'screen/img/poptart.png');
    scene.load.image('smiley', 'screen/img/smiley.png');
  }

  create(scene: Phaser.Scene): void {
    this.controllerStateMap.forEach((_, deviceId) => {
      this.playerMap.set(deviceId,
        new Player(scene.add.sprite(200, 200, 'smiley')));
    });
  }


  update(scene: Phaser.Scene): void {
    this.controllerStateMap.forEach((state, deviceId) => {
      this.playerMap.get(deviceId)!.update(state);
    });
  }

  static createAndInitializePhaser(controllerStateMap: ControllerStateMap) {
    const game = new Game(new Map(), controllerStateMap);
    const config = {
      parent: 'game',
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: {
        preload: function(this: Phaser.Scene) { game.preload(this); },
        create: function(this: Phaser.Scene) { game.create(this); },
        update: function(this: Phaser.Scene) { game.update(this); }
      }
    };
    new Phaser.Game(config);
  }
}
