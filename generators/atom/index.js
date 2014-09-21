var yeoman = require('yeoman-generator');
var path = require('path');
var util = require('util');
var _ = require('lodash');
var Components = require('../app/components.js');

var Atom = module.exports = function Atom(args, options) {
    try {
        yeoman.generators.NamedBase.apply(this, arguments);
    }
    catch(e) {
        console.error('ERROR >>> You need to provide an atom name');
    }

    this.sourceRoot(path.join(__dirname, '../../templates/'));
};

util.inherits(Atom, Components);

Atom.prototype.generateAtom = function generateAtom(name) {
    if(!_.isEmpty(name) && _.isString(name)) {
        this.createComponent('atom', name);
        this.linkComponent('atom', name);
    }
};

// file.exists