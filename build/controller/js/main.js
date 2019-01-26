"use strict";
function main() {
    var airConsole = new AirConsole();
    var button = document.getElementById('button');
    button.onclick = function () {
        airConsole.message(AirConsole.SCREEN, 'Hallo!');
    };
    airConsole.onMessage = function (from, data) {
        var info = document.getElementById('info');
        info.innerText += "Got message from " + from + ": " + data + "\n";
    };
}
window.onload = main;
