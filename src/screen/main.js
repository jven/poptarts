function main() {
  const airConsole = new AirConsole();

  airConsole.onMessage = (from, data) => {
    airConsole.message(from, 'Not much!');
    const info = document.getElementById('info');
    info.innerText = data;
  };
}

window.onload = main;