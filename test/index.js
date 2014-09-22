'use strict';

var helpers = require('yeoman-generator').test;
var path = require('path');
var should = require('should');
var asUtils = require('../as-utils/');

describe('Atomic SASS', function() {
    var atomicsass;
    var deps = [
        '../../generators/app',
        '../../generators/atom'
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
    });

    describe(':app', function() {
        beforeEach(function(done) {
            atomicsass = helpers.createGenerator('atomic-sass:app', deps, false, {
                skipMessages: true
            });

            done();
        });

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

    describe(':atom', function() {
        beforeEach(function(done) {
            atomicsass = helpers.createGenerator('atomic-sass:atom', deps, false, {
                skipMessages: true
            });

            done();
        });
    });

});
