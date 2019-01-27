import { ControllerState } from './controllerstate';

const SPEED = 300;

export class Player {
  private scene: Phaser.Scene;
  private sprite: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene, sprite: Phaser.Physics.Arcade.Sprite) {
    this.scene = scene;
    this.sprite = sprite;
    this.sprite.displayWidth = 50;
    this.sprite.displayHeight = 50;
  }

  update(controllerState: ControllerState): void {
    if (controllerState.isUpPressed()) {
      this.sprite.setVelocityX(0);
      this.sprite.setVelocityY(-SPEED);
    } else if (controllerState.isDownPressed()) {
      this.sprite.setVelocityX(0);
      this.sprite.setVelocityY(SPEED);
    } else if (controllerState.isLeftPressed()) {
      this.sprite.setVelocityX(-SPEED);
      this.sprite.setVelocityY(0);
    } else if (controllerState.isRightPressed()) {
      this.sprite.setVelocityX(SPEED);
      this.sprite.setVelocityY(0);
    } else {
      this.sprite.setVelocityX(0);
      this.sprite.setVelocityY(0);
    }
  }

  collideWith(obstacles: ArcadeColliderType): void {
    this.scene.physics.collide(this.sprite, obstacles);
  }
}
