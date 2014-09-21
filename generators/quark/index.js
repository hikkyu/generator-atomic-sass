var yeoman = require('yeoman-generator');
var path = require('path');
var util = require('util');
var _ = require('lodash');
var Components = require('../app/components.js');

var Quark = module.exports = function Quark(args, options) {
    try {
        yeoman.generators.NamedBase.apply(this, arguments);
    }
    catch(e) {
        console.error('ERROR >>> You need to provide an quark name');
    }

    this.sourceRoot(path.join(__dirname, '../../templates/'));
};

util.inherits(Quark, Components);

Quark.prototype.generateQuark = function generateQuark(name) {
    if(!_.isEmpty(name) && _.isString(name)) {
        this.createComponent('quark', name);
        this.linkComponent('quark', name);
    }
};

// file.exists