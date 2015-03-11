/**
 * Created by Andres Monroy (HyveMynd) on 3/11/15.
 */
"use strict";
var should = require('should');

describe("Api", function(){
    var HyveRepo = require('../index');
    var OrientStrategy = require('../strategies/OrientDbStrategy');

    describe("creates a repository", function(){
        var repo = {};

        before(function (done) {
            HyveRepo.createRepository('test-table', new OrientStrategy('localhost', '2424', 'root', 'password', 'GratefulDeadConcerts')).then(function (repository) {
                repo = repository;
                done();
            }).done();
        });

        it("is created", function () {
            repo.should.be.defined;
        });
    });

    describe("get the orientDb strategy", function(){
        var strat = {};

        before(function (done) {
            HyveRepo.getStrategy('orientdb').then(function (strategy) {
                strat = strategy;
                done();
            }).done();
        });

        it("is created", function () {
            strat.should.be.defined;
        });
    });

    describe("catches errors for invalid strategy type", function(){
        describe("catches null types", function(){
            it("has the correct error message");
            it("does not return a strategy");
        });

        describe("catches undefined types", function(){
            it("has the correct error message");
            it("does not return a strategy");

        });

        describe("catches non string types", function(){
            it("has the correct error message");
            it("does not return a strategy");

        });
    });

    describe("catches errors for invalid tableNames when creating repos", function(){
        describe("catches null names", function(){
            it("has the correct error message");
            it("does not return a repo");
        });

        describe("catches undefined names", function(){
            it("has the correct error message");
            it("does not return a repo");

        });

        describe("catches non string names", function(){
            it("has the correct error message");
            it("does not return a repo");

        });
    });

    describe("catches errors for invalid strategies when creating repos", function(){
        describe("catches null strategies", function(){
            it("has the correct error message");
            it("does not return a repo");

        });

        describe("catches undefined strategies", function(){
            it("has the correct error message");
            it("does not return a repo");

        });

        describe("catches invalid types for strategy", function(){
            it("has the correct error message");
            it("does not return a repo");

        });
    });


});