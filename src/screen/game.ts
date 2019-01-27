import Phaser = require('phaser');
import { ControllerStateMap } from './controllerstatemap';
import { Player } from './player';

export class Game {
  private controllerStateMap: ControllerStateMap;
  private player: Player | null;

  private constructor(controllerStateMap: ControllerStateMap) {
    this.controllerStateMap = controllerStateMap;
    this.player = null;
  }

  preload(scene: Phaser.Scene): void {
    // scene.load.image('poptart', 'screen/img/poptart.png');
    // const preloadElem = document.getElementById('preload') as HTMLImageElement;
    // preloadElem.src = 'screen/img/poptart.png';
    // scene.load.image('poptart', 'screen/img/poptart.png');
    // scene.load.image('smiley', 'screen/img/smiley.png');
  }

  create(scene: Phaser.Scene): void {
    scene.add.image(50, 50, 'poptart');
    this.player = new Player(scene.add.sprite(200, 200, 'smiley'));
  }

  update(scene: Phaser.Scene): void {
    if (!this.controllerStateMap.size) {
      return;
    }
    const playerId = this.controllerStateMap.keys().next().value;
    const controllerState = this.controllerStateMap.get(playerId)!;
    this.player!.update(controllerState);
  }

  static createAndInitializePhaser(controllerStateMap: ControllerStateMap) {
    const game = new Game(controllerStateMap);
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
