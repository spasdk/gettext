/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

/* eslint no-path-concat: 0 */

'use strict';

var Emitter = require('cjs-emitter'),
    Gettext = require('cjs-gettext'),
    loader  = new Emitter();


/**
 * Simple gettext implementation.
 *
 * @param {Object} config options
 * @param {string} [config.path=lang] relative path to project root
 * @param {string} config.name language name
 * @param {string} [config.ext=json] language file extension
 * @param {function} callback hook on ready
 *
 * @example
 * gettext.load({name: 'ru'}, function ( error, data ) {
 *     debug.log(error);
 *     debug.inspect(data);
 * });
 */
loader.load = function ( config, callback ) {
    var xhr = new XMLHttpRequest(),
        gettext;

    if ( DEVELOP ) {
        if ( !config.name || typeof config.name !== 'string' ) { throw new Error(__filename + ': config.name must be a nonempty string'); }
        if ( typeof callback !== 'function' ) { throw new Error(__filename + ': wrong callback type'); }
    }

    // defaults
    config.ext  = config.ext  || 'json';
    config.path = config.path || 'lang';

    /* todo: get rid of JSON.parse in future
    xhr.overrideMimeType('application/json');
    xhr.responseType = 'json';/**/

    xhr.responseType = 'text';

    xhr.onload = function () {
        var json;

        try {
            json = JSON.parse(xhr.responseText);
            callback(null, json);
        } catch ( error ) {
            xhr.onerror(error);
        }

        gettext = new Gettext(json);

        // make it global
        window.gettext  = window._ = gettext.gettext;
        window.pgettext = gettext.pgettext;
        window.ngettext = gettext.ngettext;

        // there are some listeners
        if ( loader.events['load'] ) {
            // notify listeners
            loader.emit('load');
        }
    };

    xhr.ontimeout = xhr.onerror = function ( error ) {
        callback(error);

        // there are some listeners
        if ( loader.events['error'] ) {
            // notify listeners
            loader.emit('error', error);
        }
    };

    xhr.open('GET', config.path + '/' + config.name + '.' + config.ext, true);
    xhr.send(null);
};


// public
module.exports = loader;
