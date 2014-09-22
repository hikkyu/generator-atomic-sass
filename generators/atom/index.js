var yeoman = require('yeoman-generator');
var path = require('path');
var util = require('util');
var _ = require('lodash');
var Components = require('../app/components.js');

var Atom = module.exports = function Atom(args, options) {
    try {
        yeoman.generators.NamedBase.apply(this, arguments);
        this.name = args[0];
    }
    catch(e) {
        console.error('ERROR >>> You need to provide an atom name');
    }

    this.sourceRoot(path.join(__dirname, '../../templates/'));
};

util.inherits(Atom, Components);

Atom.prototype.generateAtom = function generateAtom() {
    if(!_.isEmpty(this.name) && _.isString(this.name)) {
        this.createComponent('atom', this.name);
        this.linkComponent('atom', this.name);
    }
    else {
        console.log('>>> nothing was ceated');
    }
};

// file.exists