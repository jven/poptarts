import { Dimensions } from '../dimensions';
import { Location } from '../location';

export class Item {
  private sprite: Phaser.GameObjects.Sprite;

  constructor(
      sprite: Phaser.GameObjects.Sprite,
      dimensions: Dimensions) {
    this.sprite = sprite;
    this.sprite.displayWidth = dimensions.width;
    this.sprite.displayHeight = dimensions.height;
  }

  destroy() {
    this.sprite.destroy();
  }

  move(location: Location) {
    this.sprite.x = location.x;
    this.sprite.y = location.y;
  }

  getLocation(): Location {
    return {
      x: this.sprite.x,
      y: this.sprite.y
    };
  }
}
