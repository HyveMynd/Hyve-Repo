/**
 * Created by Andres Monroy (HyveMynd) on 3/9/15.
 */
"use strict";

var _ = require('underscore');
var Repository = require('./repository');
var Promise = require('bluebird');
var util = require('util');

var types = [{ name: 'orientdb', strategy: 'OrientDbStrategy'}];

/**
 * Allows for the creation of repositories and default strategies.
 * @returns {HyveRepo}
 * @constructor
 */
var HyveRepo = function(){

    var repo = {};

    /**
     * Create a repository for the tableName and uses the strategy given.
     * @param tableName string representing the table/document name
     * @param strategy A strategy following the repository api
     * @returns {bluebird} A bluebird promise containing the created repository.
     */
    repo.createRepository = function (tableName, strategy) {
        return new Promise(function (resolve, reject) {
            if (!tableName){
                return reject(new Error('Table name is invalid'));
            }
            if (!strategy){
                return reject(new Error('Strategy must be defined'));
            }
            return resolve(new Repository(tableName, strategy));
        });
    };

    /**
     * Get a default strategy of the given type
     * @param type a string representing the name of the strategy.
     * @returns {bluebird} A bluebird promise containing the resolved strategy.
     */
    repo.getStrategy = function (type) {
        return new Promise(function (resolve, reject) {
            if (!type){
                return reject(new Error('Type must be a valid string'));
            }

            var foundType = _.find(types, function (type) {
                return type.name === type.name;
            });

            if (!foundType){
                return reject(new Error(util.format('Default strategy of type %s not found.', type)));
            }

            return resolve(require('./strategies/' + foundType.strategy));
        });
    };

    return repo;
};

module.exports = new HyveRepo();