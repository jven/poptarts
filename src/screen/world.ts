import { Dimensions } from './dimensions';
import { Location } from './location';
import { Player } from './player';
import { WorldBuilder } from './worldbuilder';

const HOUSE_TOP_LEFT = {x: 100, y: 100};
const HOUSE_DIMENSIONS = {width: 900, height: 600};

export type Obstacle = Phaser.GameObjects.Sprite |
    Phaser.GameObjects.TileSprite;

export class World {
  private scene: Phaser.Scene;
  private obstacles: Obstacle[];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.obstacles = [];
  }

  dimensions(): Dimensions {
    return HOUSE_DIMENSIONS;
  }

  topLeftLocation(): Location {
    return HOUSE_TOP_LEFT;
  }

  render(): void {
    this.renderGrass();
    new WorldBuilder(this.scene)
        .houseTopLeft(HOUSE_TOP_LEFT)
        .interiorDoorwaySize(70)
        .floor(HOUSE_DIMENSIONS)
        .topWall(0, 0, 300)
        .rightWallWithDoorway(300, 0, 300, 200)
        .topWallWithDoorway(0, 300, 300, 150);
  }

  spawnLocations(): Location[] {
    return [
      {x: 300, y: 300},
      {x: 700, y: 300},
      {x: 400, y: 500},
      {x: 800, y: 500}
    ];
  }

  doesAnyObstacleIntersectRectangle(
      topLeft: Location, dimensions: Dimensions): boolean {
    return !!this.obstacles.find(o => {
      const oLeft = o.x - o.originX * o.displayWidth;
      const oRight = o.x + (1 - o.originX) * o.displayWidth;
      const oTop = o.y - o.originY * o.displayHeight;
      const oBottom = o.y + (1 - o.originY) * o.displayHeight;
      if (topLeft.x + dimensions.width < oLeft
          || topLeft.x > oRight
          || topLeft.y + dimensions.height < oTop
          || topLeft.y > oBottom) {
        return false;
      }

      return true;
    });
  }

  private renderGrass(): void {
    this.scene.add.tileSprite(
        -3200, -3200, 6400, 6400, 'grass').setOrigin(0, 0);
    for (let x = -100; x < 100; x++) {
      for (let y = -100; y < 100; y++) {
        const p = Math.random();
        if (p < 0.15) {
          this.scene.add.sprite(32 * x, 32 * y, 'grassfun1');
        } else if (p < 0.3) {
          this.scene.add.sprite(32 * x, 32 * y, 'grassfun2');
        } else if (p < 0.45) {
          this.scene.add.sprite(32 * x, 32 * y, 'grassfun3');
        }
      }
    }
  }
}
