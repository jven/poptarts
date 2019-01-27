import { ControllerState } from './controllerstate/controllerstate';
import { ItemStateMachine } from './item/itemstate';
import { Location } from './location';
import { World } from './world/world';

const SPEED = 5;

export class Player {
  public deviceId: number;
  private world: World;
  private sprite: Phaser.Physics.Arcade.Sprite;
  public item: ItemStateMachine | null;
  private currentSpeed: number;

  constructor(
      deviceId: number,
      world: World,
      sprite: Phaser.Physics.Arcade.Sprite) {
    this.deviceId = deviceId;
    this.world = world;
    this.sprite = sprite;
    this.sprite.displayWidth = 50;
    this.sprite.displayHeight = 50;
    this.item = null;
    this.currentSpeed = SPEED;
  }

  immobilize() {
    this.currentSpeed = 0;
  }

  mobilize() {
    this.currentSpeed = SPEED;
  }

  update(controllerState: ControllerState): void {
    let dx = 0;
    let dy = 0;
    if (controllerState.isUpPressed()) {
      dy = -this.currentSpeed;
    } else if (controllerState.isDownPressed()) {
      dy = this.currentSpeed;
    } else if (controllerState.isLeftPressed()) {
      dx = -this.currentSpeed;
    } else if (controllerState.isRightPressed()) {
      dx = this.currentSpeed;
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

  getLocation(): Location {
    return {
      x: this.sprite.x,
      y: this.sprite.y
    };
  }
}
