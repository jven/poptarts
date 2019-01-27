import { Dimensions } from '../dimensions';
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
      doorwayCenterX: number): HouseBuilder {
    return this
        .topWallWithOrigin(
            0, leftX, topY,
            doorwayCenterX - this.interiorDoorwaySize_ / 2 - leftX)
        .topWallWithOrigin(
            1, leftX + wallWidth, topY,
            leftX + wallWidth - doorwayCenterX - this.interiorDoorwaySize_ / 2);
  }

  leftWallWithDoorway(
      rightX: number,
      topY: number,
      wallHeight: number,
      doorwayCenterY: number): HouseBuilder {
    return this.sideWallWithDoorway(
        0,
        false,
        rightX,
        topY,
        wallHeight,
        doorwayCenterY);
  }

  rightWallWithDoorway(
      rightX: number,
      topY: number,
      wallHeight: number,
      doorwayCenterY: number): HouseBuilder {
    return this.sideWallWithDoorway(
        1,
        true,
        rightX,
        topY,
        wallHeight,
        doorwayCenterY);
  }

  private sideWallWithDoorway(
      originX: number,
      flipX: boolean,
      sideX: number,
      topY: number,
      wallHeight: number,
      doorwayCenterY: number): HouseBuilder {
    this.sideWall(originX, 0, flipX, sideX, topY,
        (doorwayCenterY - this.interiorDoorwaySize_ / 2 - topY));
    this.sideWall(originX, 1, flipX, sideX, topY + wallHeight,
        (topY + wallHeight - doorwayCenterY - this.interiorDoorwaySize_ / 2));

    const doorway = this.scene.add.sprite(
        this.houseTopLeft_.x + sideX,
        this.houseTopLeft_.y + doorwayCenterY - this.interiorDoorwaySize_ / 2,
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

  private sideWall(
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
