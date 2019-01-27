import { Dimensions } from './dimensions';
import { Location } from './location';
import { Player } from './player';
import { WorldBuilder } from './worldbuilder';

const TOP_LEFT_HOUSE_X = 100;
const TOP_LEFT_HOUSE_Y = 100;
const HOUSE_WIDTH = 900;
const HOUSE_HEIGHT = 600;
const DOORWAY_WIDTH = 60;

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
    return {
      width: HOUSE_WIDTH,
      height: HOUSE_HEIGHT
    };
  }

  topLeftLocation(): Location {
    return {
      x: TOP_LEFT_HOUSE_X,
      y: TOP_LEFT_HOUSE_Y
    };
  }

  render(): void {
    this.renderGrass();
    this.renderFloor();
    new WorldBuilder(this.scene)
        .interiorDoorwaySize(70)
        .topWall(TOP_LEFT_HOUSE_X, TOP_LEFT_HOUSE_Y, 300)
        .rightWallWithDoorway(
            TOP_LEFT_HOUSE_X + 300,
            TOP_LEFT_HOUSE_Y,
            300,
            TOP_LEFT_HOUSE_Y + 200)
        .topWallWithDoorway(
            TOP_LEFT_HOUSE_X,
            TOP_LEFT_HOUSE_Y + 300,
            300,
            TOP_LEFT_HOUSE_X + 150);
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

  private renderFloor(): void {
    this.scene.add.tileSprite(
        TOP_LEFT_HOUSE_X,
        TOP_LEFT_HOUSE_Y,
        HOUSE_WIDTH,
        HOUSE_HEIGHT,
        'insidefloor').setOrigin(0, 0);
  }
}
