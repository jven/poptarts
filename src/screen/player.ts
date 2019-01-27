import { ControllerState } from './controllerstate/controllerstate';
import { ItemStateMachine } from './item/itemstate';
import { Location } from './location';
import { World } from './world/world';

const ANIMATION_RATE = 15;
const SPEED = 5;

export class Player {
  private scene: Phaser.Scene;
  public deviceId: number;
  private world: World;
  private spriteKey: string;
  private sprite: Phaser.Physics.Arcade.Sprite;
  public item: ItemStateMachine | null;
  private currentSpeed: number;
  private standAnimation_: string;

  constructor(
      scene: Phaser.Scene,
      deviceId: number,
      world: World,
      spriteKey: string,
      sprite: Phaser.Physics.Arcade.Sprite) {
    this.scene = scene;
    this.deviceId = deviceId;
    this.world = world;
    this.spriteKey = spriteKey;
    this.sprite = sprite;
    this.sprite.displayWidth = 36;
    this.sprite.displayHeight = 48;
    this.item = null;
    this.currentSpeed = SPEED;

    this.createAnimations_();
    this.standAnimation_ = this.spriteKey + 'standDown';
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
      this.sprite.anims.play(this.spriteKey + 'moveUp', true);
      this.standAnimation_ = this.spriteKey + 'standUp';
    } else if (controllerState.isDownPressed()) {
      dy = this.currentSpeed;
      this.sprite.anims.play(this.spriteKey + 'moveDown', true);
      this.standAnimation_ = this.spriteKey + 'standDown';
    } else if (controllerState.isLeftPressed()) {
      dx = -this.currentSpeed;
      this.sprite.flipX = true;
      this.sprite.anims.play(this.spriteKey + 'moveRight', true);
      this.standAnimation_ = this.spriteKey + 'standRight';
    } else if (controllerState.isRightPressed()) {
      dx = this.currentSpeed;
      this.sprite.flipX = false;
      this.sprite.anims.play(this.spriteKey + 'moveRight', true);
      this.standAnimation_ = this.spriteKey + 'standRight';
    } else {
      this.sprite.anims.play(this.standAnimation_);
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

  private createAnimations_(): void {
    this.createStandAnimation_(this.spriteKey + 'standUp', 1);
    this.createStandAnimation_(this.spriteKey + 'standRight', 18);
    this.createStandAnimation_(this.spriteKey + 'standDown', 35);

    this.createMoveAnimation_(this.spriteKey + 'moveUp', 3, 5);
    this.createMoveAnimation_(this.spriteKey + 'moveRight', 20, 22);
    this.createMoveAnimation_(this.spriteKey + 'moveDown', 37, 39);
  }

  private createStandAnimation_(
      animationName: string, frameNumber: number): void {
    this.scene.anims.create({
      key: animationName,
      frames: [{ key: this.spriteKey, frame: frameNumber }],
      frameRate: ANIMATION_RATE
    });
  }

  private createMoveAnimation_(
      animationName: string,
      startFrameNumber: number,
      endFrameNumber: number): void {
    this.scene.anims.create({
      key: animationName,
      frames: this.scene.anims.generateFrameNumbers(this.spriteKey, {
        start: startFrameNumber,
        end: endFrameNumber
      }),
      frameRate: ANIMATION_RATE,
      repeat: -1,
      yoyo: true
    });
  }
}
