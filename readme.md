STB SDK localization
====================

[![Build Status](https://img.shields.io/travis/spasdk/gettext.svg?style=flat-square)](https://travis-ci.org/spasdk/gettext)
[![NPM version](https://img.shields.io/npm/v/spa-gettext.svg?style=flat-square)](https://www.npmjs.com/package/spa-gettext)
[![Dependencies Status](https://img.shields.io/david/spasdk/gettext.svg?style=flat-square)](https://david-dm.org/spasdk/gettext)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/spasdk)


This localization module is an instance of [Emitter](https://github.com/cjssdk/emitter) module.
Contains localization messages data used by other modules and provides methods to requests these messages.


## Installation ##

```bash
npm install spa-gettext
```


## Usage ##

Add to the scope:

```js
var gettext = require('spa-gettext');
```

Load localization messages file (`./lang/ru.json`):

```js
gettext.load({name: 'ru'}, function ( error ) {
    console.log(error);
});
```

Then it's possible to make direct calls to make simple replacement:

```js
console.log(gettext('some line to be localized'));
```

Fetch a particular translation of the textual message:

```js
console.log(pgettext('some context', 'some text'));
```

Native language translation of a textual message whose grammatical form depends on a number:

```js
console.log(ngettext('{0} cat', '{0} cats', 1));
```

It's also possible to listen to instance events (`load` and `error`):

```js
gettext.addListener('load', function () {
    // handle localization loading
});

gettext.addListener('error', function () {
    // handle localization loading
});
```

On localization loading for `en` language real AJAX request is not executed.
There is `loader.defaultLanguage` option to control this behaviour.


## Development mode ##

> There is a global var `DEVELOP` which activates additional consistency checks and protection logic not available in release mode.


## Contribution ##

If you have any problem or suggestion please open an issue [here](https://github.com/spasdk/gettext/issues).
Pull requests are welcomed with respect to the [JavaScript Code Style](https://github.com/DarkPark/jscs).


## License ##

`spa-gettext` is released under the [MIT License](license.md).
