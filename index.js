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
 * Wrap the given data with gettext instance
 * and export methods to the global scope.
 *
 * @param {Object} [data] localization data
 *
 * @return {Gettext} gettext instance
 */
function prepare ( data ) {
    var gettext = new Gettext(data);

    // make it global
    window.gettext  = window._ = gettext.gettext;
    window.pgettext = gettext.pgettext;
    window.ngettext = gettext.ngettext;

    return gettext;
}


/**
 * Main application language
 */
loader.defaultLanguage = 'en';


/**
 * Simple gettext implementation.
 *
 * @param {Object} config options
 * @param {string} [config.path=lang] relative path to project root
 * @param {string} config.name language name
 * @param {string} [config.ext=json] language file extension
 * @param {function} callback hook on ready
 *
 * @return {boolean} flag is ajax request was made
 */
loader.load = function ( config, callback ) {
    var xhr;

    if ( DEVELOP ) {
        if ( !config.name || typeof config.name !== 'string' ) {
            throw new Error(__filename + ': config.name must be a nonempty string');
        }
        if ( typeof callback !== 'function' ) {
            throw new Error(__filename + ': wrong callback type');
        }
    }

    // defaults
    config.ext  = config.ext  || 'json';
    config.path = config.path || 'lang';

    // is it necessary to request a localization file?
    if ( config.name === loader.defaultLanguage ) {
        // no
        prepare();
        callback(null);

        return false;
    }

    // yes
    xhr = new XMLHttpRequest();

    xhr.onload = function () {
        var json;

        try {
            json = JSON.parse(xhr.responseText);

            prepare(json);

            // there are some listeners
            if ( loader.events['load'] ) {
                // notify listeners
                loader.emit('load');
            }
        } catch ( error ) {
            xhr.onerror(error);
        }
        
        callback(null);
    };

    xhr.ontimeout = xhr.onerror = function ( error ) {
        prepare();
        callback(error);

        // there are some listeners
        if ( loader.events['error'] ) {
            // notify listeners
            loader.emit('error', error);
        }
    };

    xhr.open('GET', config.path + '/' + config.name + '.' + config.ext, true);
    xhr.send(null);

    return true;
};


// public
module.exports = loader;
