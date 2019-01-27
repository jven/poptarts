import Phaser = require('phaser');
import { ControllerStateMap } from './controllerstate/controllerstatemap';
import { Item } from './item/item';
import { Cookable, Cookware, ItemStateMachine, Shower } from './item/itemstate';
import { euclideanDistance } from './location';
import { Player } from './player';
import { World } from './world/world';

const interactionRadius = 40;

export class Game {
  private controllerStateMap: ControllerStateMap;
  private playerMap: Map<number, Player>;
  private phaserGame: Phaser.Game | null;
  private world: World | null;
  private items: ItemStateMachine[];

  private constructor(controllerStateMap: ControllerStateMap) {
    this.controllerStateMap = controllerStateMap;
    this.playerMap = new Map();
    this.phaserGame = null;
    this.world = null;
    this.items = [];
  }

  preload(scene: Phaser.Scene): void {
    scene.load.image('grass', 'img/grass.jpg');
    scene.load.image('grassfun1', 'img/grassfun1.jpg');
    scene.load.image('grassfun2', 'img/grassfun2.jpg');
    scene.load.image('grassfun3', 'img/grassfun3.jpg');
    scene.load.image('poptartbox', 'img/poptartbox.png');
    scene.load.image('shower', 'img/shower.png');
    scene.load.image('smiley', 'img/smiley.png');
    scene.load.image('toaster', 'img/toaster.png');

    scene.load.image('insidedoorway', 'img/house/insidedoorway.png');
    scene.load.image('insidefloor', 'img/house/insidefloor.png');
    scene.load.image('insidewallleft', 'img/house/insidewallleft.png');
    scene.load.image('insidewalltop', 'img/house/insidewalltop.png');
    scene.load.image('outsidewall', 'img/house/outsidewall.png');
    scene.load.image(
        'outsidewallstart', 'img/house/outsidewallstart.png');
  }

  create(scene: Phaser.Scene): void {
    this.world = new World(scene);
    this.world.render();

    const deviceIds = Array.from(this.controllerStateMap.keys());
    for (let i = 0; i < deviceIds.length; i++) {
      const spawnLocation = this.world.spawnLocations()[i];
      const sprite = scene.physics.add.sprite(
          spawnLocation.x, spawnLocation.y, 'smiley');
      this.playerMap.set(deviceIds[i], new Player(this.world, sprite));
    }

    this.items = [
      new Shower(
        new Item(
          scene.add.sprite(600, 300, 'shower'),
          {
            width: 80,
            height: 100
          })),
      new Cookable(2000, 15000,
        new Item(
          scene.add.sprite(900, 600, 'poptartbox'),
          {
            width: 50,
            height: 50
          })),
      new Cookware(
        new Item(
          scene.add.sprite(900, 400, 'toaster'),
          {
            width: 50,
            height: 50
          })
      )
    ];

    const houseTopLeft = this.world.topLeftLocation();
    scene.cameras.main
        .setScroll(
            houseTopLeft.x - 50,
            houseTopLeft.y - 50);
  }


  update(scene: Phaser.Scene): void {
    this.controllerStateMap.forEach((state, deviceId) => {
      const player = this.playerMap.get(deviceId)!;
      player.update(state);
      if (player.item !== null) {
        console.log('move item');
        player.item.move(player.getLocation());
      }

      if (state.isActionPressed()) {
        const closestItems = this.items.sort((item1, item2) =>
          euclideanDistance(
            item1.getLocation(),
            player.getLocation()) -
          euclideanDistance(item2.getLocation(),
            player.getLocation())
        )
          .filter((item) =>
            euclideanDistance(
              item.getLocation(),
              player.getLocation()) < interactionRadius);

        if (closestItems.length == 1) {
          closestItems[0].interact(player);
        } else if (closestItems.length == 2) {
          if (closestItems[0] === player.item) {
            closestItems[1].interact(player);

            if (player.item === closestItems[0]) {
              closestItems[0].interact(player);
            }
          } else {
            closestItems[0].interact(player);
          }
        }
      }
    });

    this.items.forEach((item) => {
      item.update(1 / 60 * 1000);
    });
  }

  setPhaserGame(phaserGame: Phaser.Game): void {
    this.phaserGame = phaserGame;
  }

  resize(): void {
    this.phaserGame!.resize(window.innerWidth, window.innerHeight);
  }

  static createWithPhaserGame(controllerStateMap: ControllerStateMap): Game {
    const game = new Game(controllerStateMap);
    const config = {
      parent: 'game',
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      physics: {
        default: 'arcade'
      },
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
