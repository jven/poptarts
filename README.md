# Home is where the PopTarts are!

## What is this?
It's a game about getting ready in the morning, which includes eating lots of PopTarts.

## How do I run locally?

### Using the AirConsole simulator

1. Clone the repository.

2. Compile the code and copy static files to the build directory:

```shell
poptarts/ $ npm install
poptarts/ $ npm run build
```

3. Run a local web server:
#### For Python 2:
```shell
poptarts/ $ python -m SimpleHTTPServer 5000
Serving HTTP on 0.0.0.0 port 5000 ...
```

#### For Python 3:
```shell
python3 -m http.server 5000
Serving HTTP on 0.0.0.0 port 5000 ...
```

4. Go to http://www.airconsole.com/simulator/#http://localhost:5000/build and click "load normal".

### Using real devices as controllers

Follow steps 1-3 for running with the simulator.

4. Expose your local server publicly using [ngrok](https://ngrok.com/):

```shell
poptarts/ $ ngrok http 5000
[...]
Forwarding                    http://1aa61a5e.ngrok.io -> localhost:5000
```

5. Go to http://www.airconsole.com/#http://1aa61a5e.ngrok.io/build on the device to use as a screen.

6. Go to http://www.airconsole.com or use the AirConsole app to connect to the screen.
