'use strict';

var yeoman = require('yeoman-generator');
var util = require('util');

var componentsList = {
    quark: {
        path: '1_quarks/',
        importerFile: '__quarks.scss'
    },
    atom: {
        path: '2_atoms/',
        importerFile: '__atoms.scss'
    },
    molecule: {
        path: '3_atoms/',
        importerFile: '__atoms.scss'
    },
    organism: {
        path: '4_organisms/',
        importerFile: '__organisms.scss'
    },
    template: {
        path: '5_templates/',
        importerFile: '__templates.scss'
    },
    pages: {
        path: '6_pages/',
        importerFile: '__pages.scss'
    }
};

var Components = module.exports = function() {};
util.inherits(Components, yeoman.generators.Base);

Components.prototype.createComponent = function(type, name) {
    var template = 'component/component.scss';
    var outputFilePath = this.config.get('sassPath') + componentsList[type].path + '_' + name + '.scss';

    this.src.copy(template, outputFilePath);
};

Components.prototype.linkComponent = function(type, name) {
    var importerPath = this.config.get('sassPath') + componentsList[type].path + componentsList[type].importerFile;
    var importerContent = this.readFileAsString(importerPath);
    importerContent = importerContent +'@import \'_' + name + '\';\n';
    this.writeFileFromString(importerContent, importerPath);
    console.log('✓ Your ' + type + ': ' + name + ' was linked to ' + type + ' importer');
};
