import { Dimensions } from './dimensions';

const TOP_LEFT_HOUSE_X = 100;
const TOP_LEFT_HOUSE_Y = 100;
const HOUSE_WIDTH = 1000;
const HOUSE_HEIGHT = 800;

export class World {
  static renderToScene(scene: Phaser.Scene): void {
    World.renderGrass(scene);
    World.renderFloor(scene);
    World.renderWalls(scene);
  }

  private static renderGrass(scene: Phaser.Scene): void {
    scene.add.tileSprite(0, 0, 3200, 3200, 'grass');
    for (let x = 0; x < 100; x++) {
      for (let y = 0; y < 100; y++) {
        const p = Math.random();
        if (p < 0.15) {
          scene.add.sprite(32 * x, 32 * y, 'grassfun1');
        } else if (p < 0.3) {
          scene.add.sprite(32 * x, 32 * y, 'grassfun2');
        } else if (p < 0.45) {
          scene.add.sprite(32 * x, 32 * y, 'grassfun3');
        }
      }
    }
  }

  private static renderFloor(scene: Phaser.Scene): void {
    scene.add.tileSprite(
        TOP_LEFT_HOUSE_X,
        TOP_LEFT_HOUSE_Y,
        HOUSE_WIDTH,
        HOUSE_HEIGHT,
        'insidefloor').setOrigin(0, 0);
  }

  private static renderWalls(scene: Phaser.Scene): void {
    scene.add.tileSprite(
        TOP_LEFT_HOUSE_X,
        TOP_LEFT_HOUSE_Y,
        HOUSE_WIDTH,
        World.spriteSize(scene, 'insidewalltop').height,
        'insidewalltop').setOrigin(0, 0);

    scene.add.tileSprite(
        TOP_LEFT_HOUSE_X,
        TOP_LEFT_HOUSE_Y,
        World.spriteSize(scene, 'insidewallleft').width,
        HOUSE_HEIGHT,
        'insidewallleft').setOrigin(0, 0);

    scene.add.tileSprite(
        TOP_LEFT_HOUSE_X + HOUSE_WIDTH,
        TOP_LEFT_HOUSE_Y,
        World.spriteSize(scene, 'insidewallleft').width,
        HOUSE_HEIGHT,
        'insidewallleft').setOrigin(1, 0).setFlipX(true);
  }

  private static spriteSize(scene: Phaser.Scene, key: string): Dimensions {
    const sprite = scene.add.sprite(-10000, -10000, 'insidewalltop');
    const dimensions = {
      width: sprite.displayWidth,
      height: sprite.displayHeight
    };
    sprite.destroy();
    return dimensions;
  }
}
