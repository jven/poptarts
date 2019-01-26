import Phaser = require('phaser');

export class Game {
  constructor() {
    const config = {
      parent: 'game',
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: {
        preload: this.preloadFn,
        create: this.createFn,
        update: this.updateFn
      }
    };
    new Phaser.Game(config);
  }

  private preloadFn(this: Phaser.Scene): void {
    this.load.image('poptart', 'screen/img/poptart.png');
  }

  private createFn(this: Phaser.Scene): void {
    this.add.image(50, 50, 'poptart');
  }

  private updateFn(this: Phaser.Scene): void {
  }
}
