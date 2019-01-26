import Phaser = require('phaser');
import { ControllerStateMap } from './controllerstatemap';
import { Item } from './item/item';
import { ItemType } from './item/itemtype';
import { Player } from './player';

export class Game {
  private controllerStateMap: ControllerStateMap;
  private player: Player | null;

  private constructor(controllerStateMap: ControllerStateMap) {
    this.controllerStateMap = controllerStateMap;
    this.player = null;
  }

  preload(scene: Phaser.Scene): void {
    scene.load.image('poptart', 'screen/img/poptart.png');
    scene.load.image('poptartbox', 'screen/img/poptartbox.png');
    scene.load.image('shower', 'screen/img/shower.png');
    scene.load.image('smiley', 'screen/img/smiley.png');
    scene.load.image('toaster', 'screen/img/toaster.png');
  }

  create(scene: Phaser.Scene): void {
    this.player = new Player(scene.add.sprite(200, 200, 'smiley'));

    new Item(
        ItemType.POPTART_BOX,
        scene.add.sprite(600, 400, 'poptartbox'),
        {
          width: 50,
          height: 50
        });
    new Item(
        ItemType.SHOWER,
        scene.add.sprite(400, 100, 'shower'),
        {
          width: 80,
          height: 100
        });
    new Item(
        ItemType.TOASTER,
        scene.add.sprite(300, 300, 'toaster'),
        {
          width: 50,
          height: 50
        });
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
      width: window.innerWidth,
      height: window.innerHeight,
      scene: {
        preload: function(this: Phaser.Scene) { game.preload(this); },
        create: function(this: Phaser.Scene) { game.create(this); },
        update: function(this: Phaser.Scene) { game.update(this); }
      }
    };
    new Phaser.Game(config);
  }
}
