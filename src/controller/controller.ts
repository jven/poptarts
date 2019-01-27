/// <reference path="../../node_modules/airconsole-typescript/airconsole-typescript.d.ts" />

import { Intent } from '../protocol/intent';
import { IntentSender } from './intentsender';

function controllerMain() {
  const airConsole = new AirConsole();
  const intentSender = new IntentSender(airConsole);

  const buttonMap = new Map<string, Intent>();
  buttonMap.set('pressUp', Intent.PRESS_UP);
  buttonMap.set('pressRight', Intent.PRESS_RIGHT);
  buttonMap.set('pressDown', Intent.PRESS_DOWN);
  buttonMap.set('pressLeft', Intent.PRESS_LEFT);
  buttonMap.set('pressAction', Intent.PRESS_ACTION);
  buttonMap.set('releaseUp', Intent.RELEASE_UP);
  buttonMap.set('releaseRight', Intent.RELEASE_RIGHT);
  buttonMap.set('releaseDown', Intent.RELEASE_DOWN);
  buttonMap.set('releaseLeft', Intent.RELEASE_LEFT);
  buttonMap.set('releaseAction', Intent.RELEASE_ACTION);
  buttonMap.forEach((intent, buttonId) => {
    const button = document.getElementById(buttonId)!;
    button.onclick = () => intentSender.send(intent);
  });
}

window.onload = controllerMain;
