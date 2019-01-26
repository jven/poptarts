import { Intent } from '../../protocol/intent';

export class IntentSender {
  private airConsole: AirConsole;

  constructor(airConsole: AirConsole) {
    this.airConsole = airConsole;
  }

  send(intent: Intent) {
    this.airConsole.message(AirConsole.SCREEN, intent);
  }
}
