/// <reference path="../../../node_modules/airconsole-typescript/airconsole-typescript.d.ts" />

function screenMain() {
  const airConsole = new AirConsole();

  airConsole.onMessage = (from, data) => {
    airConsole.message(from, 'Yo!');
    const info = document.getElementById('info')!;
    info.innerText += `Got message from ${from}: ${data}\n`;
  };
}

window.onload = screenMain;
