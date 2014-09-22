'use strict';

var helpers = require('yeoman-generator').test;
var path = require('path');
var should = require('should');
var asUtils = require('../as-utils/');

describe('Atomic SASS', function() {
    var atomicsass;
    var deps = [
        '../../generators/app'
    ];

    var expected = [
        'style/0_utilities/__utilities.scss',
        'style/1_quarks/__quarks.scss',
        'style/2_atoms/__atoms.scss',
        'style/3_molecules/__molecules.scss',
        'style/4_organisms/__organisms.scss',
        'style/5_templates/__templates.scss',
        'style/6_pages/__pages.scss'
    ];

    beforeEach(function(done) {
        helpers.testDirectory(path.join(__dirname, 'tmp'), function (err) {
            if (err) {
                done(err);
            }

            atomicsass = helpers.createGenerator('atomic-sass:app', deps, [], {
                skipMessages: true
            });

            done();
        });
    });

    describe(':app', function() {
        it('should scaffold the right things', function(done) {
            helpers.mockPrompt(atomicsass, {
                initial: 'scaffold',
                sassPath: 'style/',
                createInExistentSassPath: undefined
            });

            atomicsass.run({}, function() {
                helpers.assertFile(expected);
                done();
            });
        });

        it('should complete sassPath with /', function(done) {
            helpers.mockPrompt(atomicsass, {
                initial: 'scaffold',
                sassPath: asUtils.completeSassPath('style'),
                createInExistentSassPath: undefined
            });

            atomicsass.run({}, function() {
                atomicsass.config.get('sassPath').should.be.exactly('style/');
                done();
            });
        });

        it('should\'nt complete sassPath with /', function(done) {
            helpers.mockPrompt(atomicsass, {
                initial: 'scaffold',
                sassPath: asUtils.completeSassPath('style/'),
                createInExistentSassPath: undefined
            });

            atomicsass.run({}, function() {
                atomicsass.config.get('sassPath').should.be.exactly('style/');
                done();
            });
        });
    });

    describe('Sub Generators', function() {
        var genTester;
        beforeEach(function(done) {
            helpers.mockPrompt(atomicsass, {
                initial: 'scaffold',
                sassPath: 'style/',
                createInExistentSassPath: undefined
            });

            genTester = null;
            atomicsass.run({}, function() {
                done();
            });

        });

        var subGenTest = function(subGenTyp, targetDirectory, done) {
            var name = 'foo';

            var subDeps = [
                '../../generators/' + subGenTyp
            ];

            var pathToExpect = path.join('style/', targetDirectory, '_' + name + '.scss');
            var importerFilePath = path.join('style/', targetDirectory, '__' + subGenTyp + 's.scss');

            genTester = helpers.createGenerator('atomic-sass:' + subGenTyp, subDeps, ['foo'], {
                skipMessages: true
            });

            genTester.config.set('sassPath', 'style/');

            genTester.run([], function () {
                helpers.assertFile(pathToExpect);

                helpers.assertFileContent([
                    [
                        importerFilePath,
                        new RegExp('@import \'_foo\';', 'g')
                    ]
                ]);

                done();
            });
        };

        it('should create a quark and link to importer', function(done) {
            subGenTest('quark', '1_quarks/', done);
        });

        it('should create an atom and link to importer', function(done) {
            subGenTest('atom', '2_atoms/', done);
        });

        it('should create a molecule and link to importer', function(done) {
            subGenTest('molecule', '3_molecules/', done);
        });

        it('should create a organism and link to importer', function(done) {
            subGenTest('organism', '4_organisms/', done);
        });

        it('should create a template and link to importer', function(done) {
            subGenTest('template', '5_templates/', done);
        });

        it('should create a page and link to importer', function(done) {
            subGenTest('page', '6_pages/', done);
        });

    });

});
