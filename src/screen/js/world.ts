export class World {
  static renderToScene(scene: Phaser.Scene): void {
    World.renderGrass(scene);
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
}
