import { Dimensions } from './dimensions';
import { Location } from './location';

const TOP_LEFT_HOUSE_X = 100;
const TOP_LEFT_HOUSE_Y = 100;
const HOUSE_WIDTH = 1000;
const HOUSE_HEIGHT = 800;

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
    this.renderWalls();
  }

  spawnLocations(): Location[] {
    return [
      {x: 300, y: 400},
      {x: 700, y: 400},
      {x: 400, y: 600},
      {x: 800, y: 600}
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

  private renderWalls(): void {
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
