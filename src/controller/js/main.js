function main() {
  const airConsole = new AirConsole();

  const button = document.getElementById('button');
  button.onclick = () => {
    airConsole.message(AirConsole.SCREEN, 'Sup?');
  }

  airConsole.onMessage = (from, data) => {
    const info = document.getElementById('info');
    info.innerText = data;
  };
}

window.onload = main;