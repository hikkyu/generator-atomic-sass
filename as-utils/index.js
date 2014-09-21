'use strict';

var _ = require('lodash');

module.exports = {
    completeSassPath: function(input) {
        return _.isArray(input.match(/\/$/)) ? input : input + '/';
    }
};