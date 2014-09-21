var yeoman = require('yeoman-generator');
var path = require('path');
var util = require('util');
var _ = require('lodash');
var Components = require('../app/components.js');

var Page = module.exports = function Page(args, options) {
    try {
        yeoman.generators.NamedBase.apply(this, arguments);
    }
    catch(e) {
        console.error('ERROR >>> You need to provide an page name');
    }

    this.sourceRoot(path.join(__dirname, '../../templates/'));
};

util.inherits(Page, Components);

Page.prototype.generatePage = function generatePage(name) {
    if(!_.isEmpty(name) && _.isString(name)) {
        this.createComponent('page', name);
        this.linkComponent('page', name);
    }
};

// file.exists