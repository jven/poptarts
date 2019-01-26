function main() {
  const airConsole = new AirConsole();

  airConsole.onMessage = (from, data) => {
    airConsole.message(from, 'Yo!');
    const info = document.getElementById('info');
    info.innerText += `Got message from ${from}: ${data}\n`;
  };
}

window.onload = main;