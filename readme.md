STB SDK localization
====================

[![NPM version](https://img.shields.io/npm/v/stb-gettext.svg?style=flat-square)](https://www.npmjs.com/package/stb-gettext)
[![Dependencies Status](https://img.shields.io/david/stbsdk/gettext.svg?style=flat-square)](https://david-dm.org/stbsdk/gettext)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/stb)


STB SDK localization module. It's an instance of [Model](https://github.com/stbsdk/emitter) component.
Contains localization messages data used by other modules and provides methods to requests these messages.


## Installation

```bash
npm install stb-gettext
```


## Usage

Add to the scope:

```js
var gettext = require('stb-gettext');
```

Load localization messages file (`./lang/ru.json`):

```js
gettext.load({name: 'ru'}, function ( error, data ) {
    debug.log(error);
    debug.inspect(data);
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
// subscribe to events
gettext.addListener('load', function () {
	...
});
```


## Debug mode

> There is a global var `DEBUG` which activates additional consistency checks and protection logic not available in release mode.


## Contribution

If you have any problem or suggestion please open an issue [here](https://github.com/stbsdk/gettext/issues).
Pull requests are welcomed with respect to the [JavaScript Code Style](https://github.com/DarkPark/jscs).


## License

`stb-gettext` is released under the [GPL-3.0 License](http://opensource.org/licenses/GPL-3.0).
