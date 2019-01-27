import { ControllerState } from './controllerstate';

const SPEED = 3;

export class Player {
  private sprite: Phaser.GameObjects.Sprite;

  constructor(sprite: Phaser.GameObjects.Sprite) {
    this.sprite = sprite;
    this.sprite.displayWidth = 50;
    this.sprite.displayHeight = 50;
  }

  update(controllerState: ControllerState): void {
    if (controllerState.isUpPressed()) {
      this.sprite.y -= SPEED;
    } else if (controllerState.isDownPressed()) {
      this.sprite.y += SPEED;
    }

    if (controllerState.isLeftPressed()) {
      this.sprite.x -= SPEED;
    } else if (controllerState.isRightPressed()) {
      this.sprite.x += SPEED;
    }
  }
}
