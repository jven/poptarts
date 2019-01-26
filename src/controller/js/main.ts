/// <reference path="../../../node_modules/airconsole-typescript/airconsole-typescript.d.ts" />

function controllerMain() {
  const airConsole = new AirConsole();

  const button = document.getElementById('button')!;
  button.onclick = () => {
    airConsole.message(AirConsole.SCREEN, 'Hallo!');
  };

  airConsole.onMessage = (from, data) => {
    const info = document.getElementById('info')!;
    info.innerText += `Got message from ${from}: ${data}\n`;
  };
}

window.onload = controllerMain;
