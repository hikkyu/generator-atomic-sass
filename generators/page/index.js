var yeoman = require('yeoman-generator');
var path = require('path');
var util = require('util');
var _ = require('lodash');
var Components = require('../app/components.js');

var Page = module.exports = function Page(args, options) {
    try {
        yeoman.generators.NamedBase.apply(this, arguments);
        this.name = args[0];
    }
    catch(e) {
        console.error('ERROR >>> You need to provide an page name');
    }

    this.sourceRoot(path.join(__dirname, '../../templates/'));
};

util.inherits(Page, Components);

Page.prototype.generatePage = function generatePage() {
    if(!_.isEmpty(this.name) && _.isString(this.name)) {
        this.createComponent('page', this.name);
        this.linkComponent('page', this.name);
    }
};

// file.exists