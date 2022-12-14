'use strict';
require('babel-core/register')();
const Mocha = require('mocha');
const glob = require('glob');
const path = require('path');

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const argv = process.argv.slice(2);

// Watch unless on CI or in coverage mode
if (!process.env.CI && argv.indexOf('--coverage') < 0) {
  // watch = true;
}

// Instantiate a Mocha instance.
var mocha = new Mocha();

function run() {
  mocha.run(function (failures) {
    process.on('exit', function () {
      process.exit(failures);
    });
  });
}

glob(path.join(__dirname, '..', 'src/**/*.test.js'), function (er, files) {
  mocha.files = files;
  run();
});
