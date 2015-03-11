/**
 * Created by Andres Monroy (HyveMynd) on 3/9/15.
 */
"use strict";

var assert = require('assert');
var _ = require('underscore');
var Repository = require('./repository');

var types = [{ name: 'orientdb', strategy: 'OrientDbStrategy'}];

/**
 * Create a repository with the given arguments. If a type argument is passed, a new repository will be returned using a default strategy.
 * @param args {tableName: STRING, strategy: STRATEGY, type: STRING}
 * @returns {Repository}
 * @constructor
 */
var HyveRepo = function(args){

    assert.ok(!!args.tableName, 'Table name must be defined');

    if (!!args.type){
        var foundType = _.first(types, function (type) {
            return type.name === type
        });

        if (foundType !== null){
            var strategy = require('./strategies/' + foundType.strategy);
            return new Repository(args.tableName, strategy);
        }
    }

    assert.ok(args.strategy, 'A strategy must be defined');
    return new Repository(args.tableName, args.strategy);
};

module.exports = HyveRepo;