const path = require('path');

module.exports = {
  entry: {
    controller: './build/controller/js/main.js',
    screen: './build/screen/js/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    alias: {
      airconsole: path.resolve(__dirname, 'build')
    }
  }
}
