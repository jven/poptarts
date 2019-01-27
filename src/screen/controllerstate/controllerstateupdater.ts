import { Intent } from '../../protocol/intent';
import { ControllerState } from './controllerstate';
import { ControllerStateMap } from './controllerstatemap';

export class ControllerStateUpdater {
  static updateFromAirConsole(
      map: ControllerStateMap,
      airConsole: AirConsole): void {
    airConsole.onMessage = (deviceId, data: Intent) =>
        ControllerStateUpdater.updateWithIntent(map, deviceId, data);
  }

  static updateFromArrowKeys(
      map: ControllerStateMap,
      deviceIds: number[]): void {
    document.body.onkeydown = e => ControllerStateUpdater.handleKeyEvent(
        map,
        deviceIds,
        {
          38: Intent.PRESS_UP,
          39: Intent.PRESS_RIGHT,
          40: Intent.PRESS_DOWN,
          37: Intent.PRESS_LEFT,
          32: Intent.PRESS_ACTION
        },
        e);
    document.body.onkeyup = e => ControllerStateUpdater.handleKeyEvent(
        map,
        deviceIds,
        {
          38: Intent.RELEASE_UP,
          39: Intent.RELEASE_RIGHT,
          40: Intent.RELEASE_DOWN,
          37: Intent.RELEASE_LEFT,
          32: Intent.RELEASE_ACTION
        },
        e);
  }

  private static updateWithIntent(
      map: ControllerStateMap,
      deviceId: number,
      intent: Intent): void {
    if (!map.has(deviceId)) {
      map.set(deviceId, new ControllerState());
    }
    map.get(deviceId)!.updateForIntent(intent);
  }

  private static handleKeyEvent(
      map: ControllerStateMap,
      deviceIds: number[],
      keyCodeMap: {[keyCode: number]: Intent},
      e: KeyboardEvent): void {
    const intent = keyCodeMap[e.keyCode];
    if (!intent) {
      return;
    }

    deviceIds.forEach(deviceId =>
      ControllerStateUpdater.updateWithIntent(map, deviceId, intent!));
  }
}
