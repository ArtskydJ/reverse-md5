reverse-md5
===========

[![Build Status](https://travis-ci.org/ArtskydJ/reverse-md5.svg?branch=master)](https://travis-ci.org/ArtskydJ/reverse-md5)
[![Dependency Status](https://david-dm.org/artskydj/reverse-md5.svg)](https://david-dm.org/artskydj/reverse-md5)
[![devDependency Status](https://david-dm.org/artskydj/reverse-md5/dev-status.svg)](https://david-dm.org/artskydj/reverse-md5#info=devDependencies)

# [demo][demo]

[![demo-md5](https://cloud.githubusercontent.com/assets/1833684/9291111/277e4e1c-4375-11e5-936c-b1c7062d4ad1.PNG)][demo]

# api

```js
var ReverseMd5 = require('reverse-md5')
```

# `var rev = ReverseMd5(opts)`

`ReverseMd5` is a constructor that returns a function.

- `opts` is an object, and it has these properties:
	- `lettersUpper` - Enables reverseMd5 to look for uppercase letters, A-Z. Defaults to `true`.
	- `lettersLower` - Enables reverseMd5 to look for lowercase letters, a-z. Defaults to `true`.
	- `numbers` - Enables reverseMd5 to look for numbers, 0-9. Defaults to `true`.
	- `special` - Enables reverseMd5 to look for special characters, I.E. punctuation, symbols, brackets. Defaults to `false`.
	- `whitespace` - Enables reverseMd5 to look for whitespace, I.E. spaces, tabs, newlines. Defaults to `true`.
	- `maxLen` - The maximum length of string that the module searches for. Defaults to `8`.
- Returns `rev()`.

# `var obj = rev(hash, [opts])`

- `hash` is an md5 hash string.
- `opts` is the same as the constructor's opts.
- Returns an object with the following properties:
	- `str` - The string that was hashed. E.g. 'hi', 'wat'
	- `elapsed` - The amount of time that elapsed, in seconds. (Floating point.) E.g. 0.309135532, 2.912352039

# example

```js
var rev = ReverseMd5({
	lettersUpper: false,
	lettersLower: true,
	numbers: true,
	special: false,
	whitespace: true,
	maxLen: 12
})

rev('49f68a5c8493ec2c0bf489821c21fc3b') //returns something like: {str:'hi', elapsed: 0.309135532}
```

# install

Install with [NPM](http://nodejs.org)

	npm install reverse-md5


# license

[MIT](http://opensource.org/licenses/MIT)

[demo]: http://artskydj.github.io/reverse-md5/?md5=8ff32489f92f33416694be8fdc2d4c22&lettersLower=on&maxLen=3
