import { Dimensions } from '../dimensions';
import { Direction } from '../direction';
import { Location } from '../location';

export type Obstacle = Phaser.GameObjects.Sprite |
    Phaser.GameObjects.TileSprite;

export class HouseBuilder {
  private scene: Phaser.Scene;
  private obstacles: Obstacle[];
  private houseTopLeft_: Location;
  private interiorDoorwaySize_: number;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.obstacles = [];
    this.houseTopLeft_ = {x: 0, y: 0};
    this.interiorDoorwaySize_ = 0;
  }

  getObstacles(): Obstacle[] {
    return this.obstacles;
  }

  houseTopLeft(houseTopLeft: Location): HouseBuilder {
    this.houseTopLeft_ = houseTopLeft;
    return this;
  }

  interiorDoorwaySize(interiorDoorwaySize: number): HouseBuilder {
    this.interiorDoorwaySize_ = interiorDoorwaySize;
    return this;
  }

  floor(dimensions: Dimensions): HouseBuilder {
    this.scene.add.tileSprite(
        this.houseTopLeft_.x,
        this.houseTopLeft_.y,
        dimensions.width,
        dimensions.height,
        'insidefloor').setOrigin(0, 0);
    return this;
  }

  roomWithDoorways(
      topLeft: Location,
      dimensions: Dimensions,
      doorwaySpec: Map<Direction, number>): HouseBuilder {
    if (doorwaySpec.has(Direction.UP)) {
      this.topWallWithDoorway(
          topLeft.x, topLeft.y, dimensions.width,
          doorwaySpec.get(Direction.UP)!);
    } else {
      this.topWall(topLeft.x, topLeft.y, dimensions.width);
    }

    if (doorwaySpec.has(Direction.LEFT)) {
      this.leftWallWithDoorway(
          topLeft.x, topLeft.y, dimensions.height,
          doorwaySpec.get(Direction.LEFT)!);
    } else {
      this.leftWall(topLeft.x, topLeft.y, dimensions.width);
    }

    if (doorwaySpec.get(Direction.RIGHT)) {
      this.rightWallWithDoorway(
          topLeft.x + dimensions.width, topLeft.y, dimensions.height,
          doorwaySpec.get(Direction.RIGHT)!);
    } else {
      this.rightWall(topLeft.x + dimensions.width, topLeft.y,
          dimensions.height);
    }

    if (doorwaySpec.get(Direction.DOWN)) {
      this.topWallWithDoorway(
          topLeft.x, topLeft.y + dimensions.height, dimensions.width,
          doorwaySpec.get(Direction.DOWN)!);
    } else {
      this.topWall(topLeft.x, topLeft.y + dimensions.height, dimensions.width);
    }

    return this;
  }

  topWall(
      leftX: number,
      topY: number,
      wallWidth: number): HouseBuilder {
    return this.topWallWithOrigin(0, leftX, topY, wallWidth);
  }

  topWallWithDoorway(
      leftX: number,
      topY: number,
      wallWidth: number,
      doorwayOffsetX: number): HouseBuilder {
    return this
        .topWallWithOrigin(
            0, leftX, topY, doorwayOffsetX - this.interiorDoorwaySize_ / 2)
        .topWallWithOrigin(
            1, leftX + wallWidth, topY,
            wallWidth - doorwayOffsetX - this.interiorDoorwaySize_ / 2);
  }

  leftWall(leftX: number, topY: number, wallHeight: number): HouseBuilder {
    return this.sideWallWithOrigin(0, 0, false, leftX, topY, wallHeight);
  }

  leftWallWithDoorway(
      leftX: number,
      topY: number,
      wallHeight: number,
      doorwayOffsetY: number): HouseBuilder {
    return this.sideWallWithDoorway(
        0,
        false,
        leftX,
        topY,
        wallHeight,
        doorwayOffsetY);
  }

  rightWall(rightX: number, topY: number, wallHeight: number): HouseBuilder {
    return this.sideWallWithOrigin(1, 0, true, rightX, topY, wallHeight);
  }

  rightWallWithDoorway(
      rightX: number,
      topY: number,
      wallHeight: number,
      doorwayOffsetY: number): HouseBuilder {
    return this.sideWallWithDoorway(
        1,
        true,
        rightX,
        topY,
        wallHeight,
        doorwayOffsetY);
  }

  private sideWallWithDoorway(
      originX: number,
      flipX: boolean,
      sideX: number,
      topY: number,
      wallHeight: number,
      doorwayOffsetY: number): HouseBuilder {
    this.sideWallWithOrigin(originX, 0, flipX, sideX, topY,
        (doorwayOffsetY - this.interiorDoorwaySize_ / 2));
    this.sideWallWithOrigin(originX, 1, flipX, sideX, topY + wallHeight,
        (wallHeight - doorwayOffsetY - this.interiorDoorwaySize_ / 2));

    const doorway = this.scene.add.sprite(
        this.houseTopLeft_.x + sideX,
        this.houseTopLeft_.y + topY + doorwayOffsetY -
            this.interiorDoorwaySize_ / 2,
        'insidedoorway').setOrigin(originX, 1);
    this.obstacles.push(this.wall(doorway));
    return this;
  }

  private topWallWithOrigin(
      originX: number,
      sideX: number,
      topY: number,
      wallWidth: number): HouseBuilder {
    const wall = this.scene.add.tileSprite(
        this.houseTopLeft_.x + sideX,
        this.houseTopLeft_.y + topY,
        wallWidth,
        this.spriteSize('insidewalltop').height,
        'insidewalltop').setOrigin(originX, 0);
    this.obstacles.push(this.wall(wall));
    return this;
  }

  private sideWallWithOrigin(
      originX: number,
      originY: number,
      flipX: boolean,
      sideX: number,
      wallY: number,
      wallHeight: number): HouseBuilder {
    const wall = this.scene.add.tileSprite(
        this.houseTopLeft_.x + sideX,
        this.houseTopLeft_.y + wallY,
        this.spriteSize('insidewallleft').width,
        wallHeight,
        'insidewallleft').setOrigin(originX, originY).setFlipX(flipX);
    this.obstacles.push(this.wall(wall));
    return this;
  }

  private spriteSize(key: string): Dimensions {
    const sprite = this.scene.add.sprite(-10000, -10000, 'insidewalltop');
    const dimensions = {
      width: sprite.displayWidth,
      height: sprite.displayHeight
    };
    sprite.destroy();
    return dimensions;
  }

  private wall(wall: Obstacle): Obstacle {
    this.scene.physics.add.existing(wall, true /* isStatic */);
    return wall;
  }
}
