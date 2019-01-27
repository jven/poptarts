import { Intent } from '../../protocol/intent';

export class ControllerState {
  private isUpPressed_: boolean;
  private isRightPressed_: boolean;
  private isDownPressed_: boolean;
  private isLeftPressed_: boolean;
  private isActionPressed_: boolean;

  constructor() {
    this.isUpPressed_ = false;
    this.isRightPressed_ = false;
    this.isDownPressed_ = false;
    this.isLeftPressed_ = false;
    this.isActionPressed_ = false;
  }

  updateForIntent(intent: Intent): void {
    switch (intent) {
      case Intent.PRESS_UP:
        this.isUpPressed_ = true;
        this.isDownPressed_ = false;
        break;
      case Intent.PRESS_RIGHT:
        this.isRightPressed_ = true;
        this.isLeftPressed_ = false;
        break;
      case Intent.PRESS_DOWN:
        this.isDownPressed_ = true;
        this.isUpPressed_ = false;
        break;
      case Intent.PRESS_LEFT:
        this.isLeftPressed_ = true;
        this.isRightPressed_ = false;
        break;
      case Intent.PRESS_ACTION:
        this.isActionPressed_ = true;
        break;
      case Intent.RELEASE_UP:
        this.isUpPressed_ = false;
        break;
      case Intent.RELEASE_RIGHT:
        this.isRightPressed_ = false;
        break;
      case Intent.RELEASE_DOWN:
        this.isDownPressed_ = false;
        break;
      case Intent.RELEASE_LEFT:
        this.isLeftPressed_ = false;
        break;
      case Intent.RELEASE_ACTION:
        this.isActionPressed_ = false;
        break;
    }
  }

  isUpPressed(): boolean {
    return this.isUpPressed_;
  }

  isRightPressed(): boolean {
    return this.isRightPressed_;
  }

  isDownPressed(): boolean {
    return this.isDownPressed_;
  }

  isLeftPressed(): boolean {
    return this.isLeftPressed_;
  }

  isActionPressed(): boolean {
    return this.isActionPressed_;
  }
}
