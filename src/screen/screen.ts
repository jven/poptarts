/// <reference path="../../../node_modules/airconsole-typescript/airconsole-typescript.d.ts" />
/// <reference path="../../lib/phaser.d.ts" />

import { ControllerState } from './controllerstate';
import { ControllerStateUpdater } from './controllerstateupdater';
import { Game } from './game';

function screenMain() {
  const airConsole = new AirConsole();
  const controllerStateMap = new Map<number, ControllerState>();

  new ControllerStateUpdater(controllerStateMap)
      .updateFromAirConsole(airConsole);

  Game.createAndInitializePhaser(controllerStateMap);
}

window.onload = screenMain;
