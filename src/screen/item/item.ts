import { Dimensions } from '../dimensions';
import { ItemType } from './itemtype';

export class Item {
  private sprite: Phaser.GameObjects.Sprite;

  constructor(
      itemType: ItemType,
      sprite: Phaser.GameObjects.Sprite,
      dimensions: Dimensions) {
    this.sprite = sprite;
    this.sprite.displayWidth = dimensions.width;
    this.sprite.displayHeight = dimensions.height;
  }
}
