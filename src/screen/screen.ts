/// <reference path="../../node_modules/airconsole-typescript/airconsole-typescript.d.ts" />
/// <reference path="../definitions/phaser.d.ts" />

import { ControllerState } from './controllerstate';
import { ControllerStateUpdater } from './controllerstateupdater';
import { Game } from './game';

let game: Game | null = null;

function screenResize() {
  if (game) {
    game.resize();
  }
}

function screenMain() {
  const airConsole = new AirConsole();

  airConsole.onConnect = function(deviceId) {
    const deviceIds = airConsole.getControllerDeviceIds();

    // Temporary Hack to delay start until 2 players (like in the emulator)
    // TODO: Use a lobby instead
    if (deviceIds.length < 2)  {
      return;
    }

    const controllerStateMap = new Map<number, ControllerState>();
    deviceIds.forEach((deviceId: number) => controllerStateMap
      .set(deviceId, new ControllerState()));

    new ControllerStateUpdater(controllerStateMap)
        .updateFromAirConsole(airConsole);

    game = Game.createWithPhaserGame(controllerStateMap);
  };
}

window.onload = screenMain;
window.onresize = screenResize;
