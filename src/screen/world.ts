import { Dimensions } from './dimensions';
import { Location } from './location';

const TOP_LEFT_HOUSE_X = 100;
const TOP_LEFT_HOUSE_Y = 100;
const HOUSE_WIDTH = 900;
const HOUSE_HEIGHT = 600;
const DOORWAY_WIDTH = 60;

export class World {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
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
    this.renderExteriorWalls();
    this.renderKidsRoomWalls();
  }

  spawnLocations(): Location[] {
    return [
      {x: 300, y: 300},
      {x: 700, y: 300},
      {x: 400, y: 500},
      {x: 800, y: 500}
    ];
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

  private renderExteriorWalls(): void {
    this.scene.add.tileSprite(
        TOP_LEFT_HOUSE_X,
        TOP_LEFT_HOUSE_Y,
        HOUSE_WIDTH,
      this.spriteSize('insidewalltop').height,
        'insidewalltop').setOrigin(0, 0);

    this.scene.add.tileSprite(
        TOP_LEFT_HOUSE_X,
        TOP_LEFT_HOUSE_Y,
        this.spriteSize('insidewallleft').width,
        HOUSE_HEIGHT,
        'insidewallleft').setOrigin(0, 0);

    this.scene.add.tileSprite(
        TOP_LEFT_HOUSE_X + HOUSE_WIDTH,
        TOP_LEFT_HOUSE_Y,
        this.spriteSize('insidewallleft').width,
        HOUSE_HEIGHT,
        'insidewallleft').setOrigin(1, 0).setFlipX(true);
  }

  private renderKidsRoomWalls(): void {
    const kidsRoomWidth = 300;
    const kidsRoomHeight = 300;
    const doorwayCenterY = TOP_LEFT_HOUSE_Y + (
        this.spriteSize('insidewalltop').height + kidsRoomHeight) / 2;
    this.scene.add.tileSprite(
        TOP_LEFT_HOUSE_X + kidsRoomWidth,
        TOP_LEFT_HOUSE_Y,
        this.spriteSize('insidewallleft').width,
        (doorwayCenterY - DOORWAY_WIDTH / 2 - TOP_LEFT_HOUSE_Y),
        'insidewallleft').setOrigin(1, 0).setFlipX(true);
    this.scene.add.tileSprite(
        TOP_LEFT_HOUSE_X + kidsRoomWidth,
        TOP_LEFT_HOUSE_Y + kidsRoomHeight,
        this.spriteSize('insidewallleft').width,
        (TOP_LEFT_HOUSE_Y + kidsRoomHeight - doorwayCenterY -
            DOORWAY_WIDTH / 2),
        'insidewallleft').setOrigin(1, 1).setFlipX(true);
    this.scene.add.tileSprite(
        TOP_LEFT_HOUSE_X,
        TOP_LEFT_HOUSE_Y + kidsRoomHeight,
        kidsRoomWidth / 2 - DOORWAY_WIDTH / 2,
        this.spriteSize('insidewalltop').height,
        'insidewalltop').setOrigin(0, 0);
    this.scene.add.tileSprite(
        TOP_LEFT_HOUSE_X + kidsRoomWidth,
        TOP_LEFT_HOUSE_Y + kidsRoomHeight,
        kidsRoomWidth / 2 - DOORWAY_WIDTH / 2,
        this.spriteSize('insidewalltop').height,
        'insidewalltop').setOrigin(1, 0);

    this.scene.add.sprite(
        TOP_LEFT_HOUSE_X + kidsRoomWidth,
        doorwayCenterY - DOORWAY_WIDTH / 2,
        'insidedoorway').setOrigin(1, 1);
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
}
