/**
 * Created by Andres Monroy (HyveMynd) on 12/21/14.
 */
var Oriento = require('oriento');
var assert = require('assert');

/**
 * A strategy for OrientDb using the oriento library.
 * @param host
 * @param port
 * @param username
 * @param password
 * @param databaseName
 * @returns {OrientoStrategy}
 * @constructor
 */
var OrientoStrategy = function(host, port, username, password, databaseName){
    assert.ok(!!host, 'Host must be defined.');
    assert.ok(!!port, 'Post must be defined.');
    assert.ok(!!username, 'Username must be defined.');
    assert.ok(!!password, 'Password must be defined.');
    assert.ok(!!databaseName, 'Database name must be defined.');

    var server = Oriento({
        host: host,
        port: port,
        username: username,
        password: password
    });
    var db = server.use(databaseName);
    var strategy = this;

    strategy.create = function (className, args) {
        return db.insert().into(className).set(args).one();
    };

    strategy.update = function (className, setArgs, whereArgs) {
        return db.update(className).set(setArgs).where(whereArgs).limit(1).scalar();
    };

    strategy.remove = function (className, args) {
        return db.delete().from(className).where(args).limit(1).scalar();
    };
    
    strategy.where = function (className, whereArgs) {
        return db.select().from(className).where(whereArgs).all();
    };

    strategy.all = function (className) {
        return db.select().from(className).all();
    };

    strategy.find = function (id) {
        return db.record.get(id);
    };

    strategy.first = function (className, whereArgs) {
        return db.select().from(className).where(whereArgs).one();
    };

    strategy.clear = function (className) {
        return db.query('delete from ' + className);
    };

    strategy.raw = function () {
        return db;
    };

    return strategy;
};

module.exports = OrientoStrategy;