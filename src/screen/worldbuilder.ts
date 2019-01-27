import { Dimensions } from './dimensions';

export type Obstacle = Phaser.GameObjects.Sprite |
    Phaser.GameObjects.TileSprite;

export class WorldBuilder {
  private scene: Phaser.Scene;
  private interiorDoorwaySize_: number;
  private obstacles: Obstacle[];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.interiorDoorwaySize_ = 0;
    this.obstacles = [];
  }

  interiorDoorwaySize(interiorDoorwaySize: number): WorldBuilder {
    this.interiorDoorwaySize_ = interiorDoorwaySize;
    return this;
  }

  topWall(
      leftX: number,
      topY: number,
      wallWidth: number): WorldBuilder {
    return this.topWallWithOrigin(0, leftX, topY, wallWidth);
  }

  topWallWithDoorway(
      leftX: number,
      topY: number,
      wallWidth: number,
      doorwayCenterX: number): WorldBuilder {
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
      doorwayCenterY: number): WorldBuilder {
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
      doorwayCenterY: number): WorldBuilder {
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
      doorwayCenterY: number): WorldBuilder {
    this.sideWall(originX, 0, flipX, sideX, topY,
        (doorwayCenterY - this.interiorDoorwaySize_ / 2 - topY));
    this.sideWall(originX, 1, flipX, sideX, topY + wallHeight,
        (topY + wallHeight - doorwayCenterY - this.interiorDoorwaySize_ / 2));

    const doorway = this.scene.add.sprite(
        sideX,
        doorwayCenterY - this.interiorDoorwaySize_ / 2,
        'insidedoorway').setOrigin(originX, 1);
    this.obstacles.push(this.wall(doorway));
    return this;
  }

  private topWallWithOrigin(
      originX: number,
      sideX: number,
      topY: number,
      wallWidth: number): WorldBuilder {
    const wall = this.scene.add.tileSprite(
        sideX,
        topY,
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
      wallHeight: number): WorldBuilder {
    const wall = this.scene.add.tileSprite(
        sideX,
        wallY,
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
