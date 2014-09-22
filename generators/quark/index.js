var yeoman = require('yeoman-generator');
var path = require('path');
var util = require('util');
var _ = require('lodash');
var Components = require('../app/components.js');

var Quark = module.exports = function Quark(args, options) {
    try {
        yeoman.generators.NamedBase.apply(this, arguments);
        this.name = args[0];
    }
    catch(e) {
        console.error('ERROR >>> You need to provide an quark name');
    }

    this.sourceRoot(path.join(__dirname, '../../templates/'));
};

util.inherits(Quark, Components);

Quark.prototype.generateQuark = function generateQuark() {
    if(!_.isEmpty(this.name) && _.isString(this.name)) {
        this.createComponent('quark', this.name);
        this.linkComponent('quark', this.name);
    }
    else {
        console.log('>>> nothing was ceated');
    }
};

// file.exists