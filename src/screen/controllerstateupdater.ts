import { Intent } from '../protocol/intent';
import { ControllerState } from './controllerstate';
import { ControllerStateMap } from './controllerstatemap';

export class ControllerStateUpdater {
  private map: ControllerStateMap;

  constructor(controllerStateMap: ControllerStateMap) {
    this.map = controllerStateMap;
  }

  updateFromAirConsole(airConsole: AirConsole) {
    airConsole.onMessage = (playerId, data: Intent) => {
      if (!this.map.has(playerId)) {
        this.map.set(playerId, new ControllerState());
      }
      this.map.get(playerId)!.updateForIntent(data);
    };
  }
}
