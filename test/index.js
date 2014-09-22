'use strict';

var helpers = require('yeoman-generator').test;
var path = require('path');
var should = require('should');
var asUtils = require('../as-utils/');

describe('Atomic SASS', function() {
    var atomicsass;
    var deps = [
        '../../generators/app',
        '../../generators/quark',
        '../../generators/atom',
        '../../generators/molecule',
        '../../generators/template',
        '../../generators/page'
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

            done();
        });

        atomicsass = helpers.createGenerator('atomic-sass:app', deps, false, {
            skipMessages: true
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

    describe(':quark, :atom, :moelcule, :organism, :template, :page', function() {
        var subGenTest = function(subGenTyp, targetDirectory) {
            var name = 'foo';
            var genTester = helpers.createGenerator('atomic-sass:' + subGenTyp, deps, [name], {
                skipMessages: true
            });

            atomicsass.run([], function () {
                genTester.run([], function () {
                    helpers.assertFile([
                        path.join('style/', targetDirectory, '_' + name + '.scss')
                    ]);

                    /*helpers.assertFileContent([
                        [
                            path.join('style/', targetDirectory, '_' + name + '.scss'),
                            new RegExp(
                                generatorType + '\\(\'' + scriptNameFn(name) + suffix + '\'',
                                'g'
                            )
                        ],
                        [
                            path.join('test/spec', targetDirectory, name + '.js'),
                            new RegExp(
                                'describe\\(\'' + _.classify(specType) + ': ' + specNameFn(name) + suffix + '\'',
                                'g'
                            )
                        ]
                    ]);*/
                    done();
                });
            });
        };

        beforeEach(function(done) {
            helpers.mockPrompt(atomicsass, {
                initial: 'scaffold',
                sassPath: 'style/',
                createInExistentSassPath: undefined
            });

            done();
        });

        it('should create a quark and link to importer', function() {
            subGenTest('quark', '1_quarks/');
        });
    });

});
