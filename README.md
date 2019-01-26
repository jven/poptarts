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

```shell
poptarts/ $ python -m SimpleHTTPServer 5000
Serving HTTP on 0.0.0.0 port 5000 ...
```

4. Go to http://www.airconsole.com/simulator/#http://localhost:5000/build and click "load normal".
