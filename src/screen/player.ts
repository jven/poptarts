import { ControllerState } from './controllerstate';

export class Player {
  private sprite: Phaser.GameObjects.Sprite;

  constructor(sprite: Phaser.GameObjects.Sprite) {
    this.sprite = sprite;
    this.sprite.displayWidth = 50;
    this.sprite.displayHeight = 50;
  }

  update(controllerState: ControllerState): void {
    if (controllerState.isUpPressed()) {
      this.sprite.y -= 1;
    } else if (controllerState.isDownPressed()) {
      this.sprite.y += 1;
    }

    if (controllerState.isLeftPressed()) {
      this.sprite.x -= 1;
    } else if (controllerState.isRightPressed()) {
      this.sprite.x += 1;
    }
  }
}
