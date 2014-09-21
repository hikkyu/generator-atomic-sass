var yeoman = require('yeoman-generator');
var path = require('path');
var util = require('util');
var fs = require('fs');
var _ = require('lodash');
var asUtils = require('../../as-utils/');

/**
 * Hello! What do you to do ?
 *   1 [] Scafold the atomic structure
 *      1.1 Specify you sass folder path
 *          1.1.1 you already have a sass folder, Would you like to create a core directory (usefull to refactoring) ? Y/n
 *          1.1.2 Your sass folder doesn't existe would you like to create it ? Y/n
 *
 *   3 [] Create a group of quark (color, base style...)
 *
 *   4 [] Create an atom
 *
 *   5 [] Create a molecule
 *
 *   6 [] Create an organisms
 *
 *   7 [] Create a template
 *
 *   8 [] Create a page
 *
 */

var initialPromptMessages = {
    scaffold  : 'Scaffold the atomic structure',
    quark     : 'Create a group of quark (color, base style...)',
    atom      : 'Create an atom',
    molecule  : 'Create a molecule',
    organisms : 'Create an organisms',
    template  : 'Create a template',
    page      : 'Crate a page',
    exit      : 'Please let me out!'
};

var isScaffold = function(answers) {
    var initial = _.result(answers, 'initial');
    return !_.isUndefined(initial) && initial === 'scaffold';
};

var isSassPathExist = function(answers) {
    var sassPath = _.result(answers, 'sassPath');
    return !_.isUndefined(sassPath) && fs.existsSync(sassPath);
};

var questions = [
    {
        type    : 'list',
        name    : 'initial',
        choices : [
            {
                value: 'scaffold',
                name: 'Scaffold the atomic structure'
            },
            {
                value: 'exit',
                name: 'Please let me out!'
            }
        ],
        message : 'What do you want to do ?',
        default : 'scaffold'
    },
    {
        when    : isScaffold,
        type    : 'input',
        name    : 'sassPath',
        message : 'Specify your sass folder path',
        default : 'sass/',
        filter  : asUtils.completeSassPath
    },
    {
        when : isSassPathExist,
        type : 'confirm',
        name : 'createInExistentSassPath',
        message : 'Your sass path already exist, do you want to scaffold inside ?',
        default : false
    }
];

var Generator = module.exports = function Generator(args, options) {
    yeoman.generators.Base.apply(this, arguments);

    this.sourceRoot(path.join(__dirname, '../../templates/'));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.welcome = function() {
    if(!this.options.skipMessages) {
        this.log('');
        this.log('');
        this.log('');
        this.log(' ____________                 _____           _____________________________    ');
        this.log(' ___    |_  /_____________ ______(_)______    __  ___/__    |_  ___/_  ___/    ');
        this.log(' __  /| |  __/  __ \\_  __ `__ \\_  /_  ___/    _____ \\__  /| |____ \\_____ \\');
        this.log(' _  ___ / /_ / /_/ /  / / / / /  / / /__      ____/ /_  ___ |___/ /____/ /     ');
        this.log(' /_/  |_\\__/ \\____//_/ /_/ /_//_/  \\___/      /____/ /_/  |_/____/ /____/   ');
        this.log('');
        this.log('');
        this.log('');
    }

    if(this.config.get('isScaffolded')) {
        questions[0].choices = _.rest(questions[0].choices);
    }
};

Generator.prototype.questions = function() {
    var done = this.async();
    this.prompt(questions, function (answers) {
        this.answers = answers;
        done();
    }.bind(this));
};

Generator.prototype.proced = function() {
    var answers = this.answers;

    if(isScaffold(answers)) {
        if(_.isUndefined(answers.createInExistentSassPath) || !!answers.createInExistentSassPath) {
            this.directory('atomic-scaffold', this.answers.sassPath);
            this.config.set('sassPath', this.answers.sassPath);
            this.config.set('isScaffolded', true);
        }
        else {
            this.log('>> Nothing was created');
        }
    }
};

Generator.prototype.end = function() {
    if(!this.options.skipMessages) {
        this.log('');
        this.log('     ===============');
        this.log('     =  Bye! Bye!  =');
        this.log('     ===============');
        this.log('');
    }
};
