import { ControllerState } from './controllerstate/controllerstate';
import { World } from './world';

const SPEED = 5;

export class Player {
  private world: World;
  private sprite: Phaser.Physics.Arcade.Sprite;

  constructor(world: World, sprite: Phaser.Physics.Arcade.Sprite) {
    this.world = world;
    this.sprite = sprite;
    this.sprite.displayWidth = 50;
    this.sprite.displayHeight = 50;
  }

  update(controllerState: ControllerState): void {
    let dx = 0;
    let dy = 0;
    if (controllerState.isUpPressed()) {
      dy = -SPEED;
    } else if (controllerState.isDownPressed()) {
      dy = SPEED;
    } else if (controllerState.isLeftPressed()) {
      dx = -SPEED;
    } else if (controllerState.isRightPressed()) {
      dx = SPEED;
    } else {
      return;
    }

    const newTopLeft = {
      x: this.sprite.x + dx - this.sprite.displayWidth / 2,
      y: this.sprite.y + dy - this.sprite.displayHeight / 2
    };
    const dimensions = {
      width: this.sprite.displayWidth,
      height: this.sprite.displayHeight
    };
    if (!this.world.doesAnyObstacleIntersectRectangle(newTopLeft, dimensions)) {
      this.sprite.x += dx;
      this.sprite.y += dy;
    }
  }
}
