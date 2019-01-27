/// <reference path="../../node_modules/airconsole-typescript/airconsole-typescript.d.ts" />
/// <reference path="../definitions/phaser.d.ts" />

import { ControllerState } from './controllerstate/controllerstate';
import { ControllerStateUpdater } from './controllerstate/controllerstateupdater';
import { Game } from './game';

let game: Game | null = null;

function screenResize() {
  if (game) {
    game.resize();
  }
}

function screenMain() {
  const map = new Map<number, ControllerState>();

  if (window.location.href.includes('keyboard=true')) {
    const deviceIds = [111, 222];
    initializeMap(map, deviceIds);
    ControllerStateUpdater.updateFromArrowKeys(map, [111, 222]);
    game = Game.createWithPhaserGame(map);
    return;
  }

  const airConsole = new AirConsole();
  airConsole.onConnect = function(deviceId) {
    const deviceIds = airConsole.getControllerDeviceIds();

    // Temporary Hack to delay start until 2 players (like in the emulator)
    // TODO: Use a lobby instead
    if (deviceIds.length < 2) {
      return;
    }

    initializeMap(map, deviceIds);
    ControllerStateUpdater.updateFromAirConsole(map, airConsole);
    game = Game.createWithPhaserGame(map);
  };
}

function initializeMap(map: ControllerStateMap, deviceIds: number[]): void {
  deviceIds.forEach((deviceId: number) =>
      map.set(deviceId, new ControllerState()));
}

window.onload = screenMain;
window.onresize = screenResize;
