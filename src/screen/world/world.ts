import { Dimensions } from '../dimensions';
import { Direction } from '../direction';
import { Location } from '../location';
import { HouseBuilder } from './housebuilder';

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
    this.obstacles = new HouseBuilder(this.scene)
        .houseTopLeft(HOUSE_TOP_LEFT)
        .interiorDoorwaySize(70)
        .floor(HOUSE_DIMENSIONS)
        .roomWithDoorways(
            {x: 0, y: 0},
            {width: 300, height: 300},
            new Map<Direction, number>()
                .set(Direction.RIGHT, 200)
                .set(Direction.DOWN, 150))
        .roomWithDoorways(
            {x: 300, y: 0},
            {width: 300, height: 300},
            new Map<Direction, number>()
                .set(Direction.LEFT, 200)
                .set(Direction.DOWN, 150))
        .roomWithDoorways(
            {x: 600, y: 0},
            {width: 300, height: 600},
            new Map<Direction, number>()
                .set(Direction.LEFT, 500))
        .leftWall(0, 300, 300)
        .topWall(0, HOUSE_DIMENSIONS.height, HOUSE_DIMENSIONS.width)
        .getObstacles();
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
