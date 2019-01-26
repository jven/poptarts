/// <reference path="../../../node_modules/airconsole-typescript/airconsole-typescript.d.ts" />

import { Intent } from '../../protocol/intent';
import { IntentSender } from './intentsender';

function controllerMain() {
  const airConsole = new AirConsole();
  const intentSender = new IntentSender(airConsole);

  const button = document.getElementById('button')!;
  button.onclick = () => {
    intentSender.send(Intent.PRESS_ACTION);
  };

  airConsole.onMessage = (from, data) => {
    const info = document.getElementById('info')!;
    info.innerText += `Got message from ${from}: ${data}\n`;
  };
}

window.onload = controllerMain;
