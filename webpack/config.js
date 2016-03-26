'use strict';

var toString = Object.prototype.toString;

function mergeObject(destination, source) {
    var name;
    for (name in source) {
        if (source.hasOwnProperty(name)) {
            destination[name] = source[name];
        }
    }
    return destination;
}

function mergeConfig(config, custom) {
    
    var objMerge = mergeObject,
        ts = toString;
    
    var name, value, cvalue, fvalue, valid;
    
    if (ts.call(config) !== '[object Object]') {
        config = {};
    }
    
    if (ts.call(custom) !== '[object Object]') {
        custom = {};
    }
    
    for (name in custom) {
        fvalue = cvalue = custom[name];
        value = config.hasOwnProperty(name) ?
                    config[name] : void(0);
        switch (name) {
        case 'devServer':
            valid = ts.call(cvalue) === '[object Object]';
            if (ts.call(value) === '[object Object]') {
                fvalue = valid ?
                            objMerge(value, cvalue) : value;
            }
            else if (!valid) {
                fvalue = void(0);
            }
            break;
        case 'plugins':
            if (!(value instanceof Array)) {
                value = [];
            }
            if (!(fvalue instanceof Array)) {
                fvalue = [];
            }
            value.push.apply(value, fvalue);
            fvalue = value;
            if (!fvalue.length) {
                fvalue = void(0);
            }
            break;
        case 'resolve':
            valid = ts.call(cvalue) === '[object Object]';
            if (ts.call(value) === '[object Object]') {
                fvalue = valid ?
                            objMerge(value, cvalue) : value;
            }
            else if (!valid) {
                fvalue = void(0);
            }
            break;
        }
        // apply
        if (typeof fvalue === 'undefined') {
            if (name in config) {
                delete config[name];
            }
        }
        else {
            config[name] = fvalue;
        }
    }
    
    return config;
}

function fetchConfig(config) {
    var ENV = process.env;
    var custom;
    switch (ENV && ENV.NODE_ENV) {
    case 'production':
        custom = require('./config/production.js');
        console.log('* using PRODUCTION config')
        break;
    case 'development':
    default:
        custom = require('./config/development.js');
        console.log('* using DEVELOPMENT config')
        break;
    }
    console.log(mergeConfig(config, custom));
    return mergeConfig(config, custom);
}


module.exports = fetchConfig;