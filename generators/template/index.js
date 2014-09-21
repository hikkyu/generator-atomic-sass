var yeoman = require('yeoman-generator');
var path = require('path');
var util = require('util');
var _ = require('lodash');
var Components = require('../app/components.js');

var Template = module.exports = function Template(args, options) {
    try {
        yeoman.generators.NamedBase.apply(this, arguments);
    }
    catch(e) {
        console.error('ERROR >>> You need to provide an template name');
    }

    this.sourceRoot(path.join(__dirname, '../../templates/'));
};

util.inherits(Template, Components);

Template.prototype.generateTemplate = function generateTemplate(name) {
    if(!_.isEmpty(name) && _.isString(name)) {
        this.createComponent('template', name);
        this.linkComponent('template', name);
    }
};

// file.exists