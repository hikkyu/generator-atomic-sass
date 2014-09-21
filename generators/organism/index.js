var yeoman = require('yeoman-generator');
var path = require('path');
var util = require('util');
var _ = require('lodash');
var Components = require('../app/components.js');

var Organism = module.exports = function Organism(args, options) {
    try {
        yeoman.generators.NamedBase.apply(this, arguments);
    }
    catch(e) {
        console.error('ERROR >>> You need to provide an organism name');
    }

    this.sourceRoot(path.join(__dirname, '../../templates/'));
};

util.inherits(Organism, Components);

Organism.prototype.generateOrganism = function generateOrganism(name) {
    if(!_.isEmpty(name) && _.isString(name)) {
        this.createComponent('organism', name);
        this.linkComponent('organism', name);
    }
};

// file.exists