"use strict";
function main() {
    var airConsole = new AirConsole();
    airConsole.onMessage = function (from, data) {
        airConsole.message(from, 'Yo!');
        var info = document.getElementById('info');
        info.innerText += "Got message from " + from + ": " + data + "\n";
    };
}
window.onload = main;
