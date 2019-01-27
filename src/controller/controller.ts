/// <reference path="../../node_modules/airconsole-typescript/airconsole-typescript.d.ts" />

import { Intent } from '../protocol/intent';
import { IntentSender } from './intentsender';

function controllerMain() {
  const airConsole = new AirConsole();
  const intentSender = new IntentSender(airConsole);

  type elemId = string;
  type eventName = string;
  const buttonMap = new Map<[elemId, eventName], Intent>();
  buttonMap.set(['up-btn', 'mousedown'], Intent.PRESS_UP);
  buttonMap.set(['right-btn', 'mousedown'], Intent.PRESS_RIGHT);
  buttonMap.set(['down-btn', 'mousedown'], Intent.PRESS_DOWN);
  buttonMap.set(['left-btn', 'mousedown'], Intent.PRESS_LEFT);
  buttonMap.set(['action-btn', 'mousedown'], Intent.PRESS_ACTION);
  buttonMap.set(['up-btn', 'mouseup'], Intent.RELEASE_UP);
  buttonMap.set(['right-btn', 'mouseup'], Intent.RELEASE_RIGHT);
  buttonMap.set(['down-btn', 'mouseup'], Intent.RELEASE_DOWN);
  buttonMap.set(['left-btn', 'mouseup'], Intent.RELEASE_LEFT);
  buttonMap.set(['action-btn', 'mouseup'], Intent.RELEASE_ACTION);
  buttonMap.forEach((intent, [buttonId, event]) => {
    const button = document.getElementById(buttonId)!;
    button.addEventListener(event, () => {
      intentSender.send(intent);
    });
  });
}

window.onload = controllerMain;
