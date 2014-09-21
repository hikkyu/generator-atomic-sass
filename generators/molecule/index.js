var yeoman = require('yeoman-generator');
var path = require('path');
var util = require('util');
var _ = require('lodash');
var Components = require('../app/components.js');

var Molecule = module.exports = function Molecule(args, options) {
    try {
        yeoman.generators.NamedBase.apply(this, arguments);
    }
    catch(e) {
        console.error('ERROR >>> You need to provide an molecule name');
    }

    this.sourceRoot(path.join(__dirname, '../../templates/'));
};

util.inherits(Molecule, Components);

Molecule.prototype.generateMolecule = function generateMolecule(name) {
    if(!_.isEmpty(name) && _.isString(name)) {
        this.createComponent('molecule', name);
        this.linkComponent('molecule', name);
    }
};

// file.exists