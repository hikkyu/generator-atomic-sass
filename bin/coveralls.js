#!/usr/bin/env node
var handleInput = require('../node_modules/coveralls/lib/handleInput');
var logger = require('../node_modules/coveralls/lib/logger');


process.stdin.resume();
process.stdin.setEncoding('utf8');

var input = 'istanbul cover ./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage';

process.stdin.on('data', function(chunk) {
    input += chunk;
});

process.stdin.on('end', function() {
    handleInput(input, function(err) {
      if (err) {
        throw err;
      }
    });
});

