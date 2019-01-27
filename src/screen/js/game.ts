import Phaser = require('phaser');
import { ControllerStateMap } from './controllerstatemap';
import { Item } from './item/item';
import { ItemType } from './item/itemtype';
import { Player } from './player';
import { World } from './world';

type PlayerMap = Map<number, Player>;

export class Game {
  private controllerStateMap: ControllerStateMap;
  private playerMap: PlayerMap;
  private phaserGame: Phaser.Game | null;

  private constructor(
      playerMap: PlayerMap,
      controllerStateMap: ControllerStateMap) {
    this.playerMap = playerMap;
    this.controllerStateMap = controllerStateMap;
    this.phaserGame = null;
  }

  preload(scene: Phaser.Scene): void {
    scene.load.image('grass', 'screen/img/grass.jpg');
    scene.load.image('grassfun1', 'screen/img/grassfun1.jpg');
    scene.load.image('grassfun2', 'screen/img/grassfun2.jpg');
    scene.load.image('grassfun3', 'screen/img/grassfun3.jpg');
    scene.load.image('poptart', 'screen/img/poptart.png');
    scene.load.image('poptartbox', 'screen/img/poptartbox.png');
    scene.load.image('shower', 'screen/img/shower.png');
    scene.load.image('smiley', 'screen/img/smiley.png');
    scene.load.image('toaster', 'screen/img/toaster.png');

    scene.load.image('insidefloor', 'screen/img/house/insidefloor.png');
    scene.load.image('insidewallleft', 'screen/img/house/insidewallleft.png');
    scene.load.image('insidewalltop', 'screen/img/house/insidewalltop.png');
    scene.load.image('outsidewall', 'screen/img/house/outsidewall.png');
    scene.load.image(
        'outsidewallstart', 'screen/img/house/outsidewallstart.png');
  }

  create(scene: Phaser.Scene): void {
    World.renderToScene(scene);

    this.controllerStateMap.forEach((_, deviceId) => {
      const sprite = scene.add.sprite(200, 200, 'smiley');
      this.playerMap.set(deviceId, new Player(sprite));
    });

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
    this.controllerStateMap.forEach((state, deviceId) => {
      this.playerMap.get(deviceId)!.update(state);
    });
  }

  setPhaserGame(phaserGame: Phaser.Game): void {
    this.phaserGame = phaserGame;
  }

  resize(): void {
    this.phaserGame!.resize(window.innerWidth, window.innerHeight);
  }

  static createWithPhaserGame(
      controllerStateMap: ControllerStateMap): Game {
    const game = new Game(new Map(), controllerStateMap);
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
    const phaserGame = new Phaser.Game(config);
    game.setPhaserGame(phaserGame);

    return game;
  }
}
