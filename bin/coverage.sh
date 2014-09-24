#!/bin/sh
istanbul cover ./node_modules/mocha/bin/_mocha --report lcov -- -R spec && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage