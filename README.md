reverse-md5
===========

[![Build Status](https://travis-ci.org/ArtskydJ/reverse-md5.svg?branch=master)](https://travis-ci.org/ArtskydJ/reverse-md5)

- [Install](#install)
- [Require](#require)
- [ReverseMd5(opts)](#reversemd5opts)
- [Example](#example)
- [License](#license)

#Install

Install with [NPM](http://nodejs.org)

	npm install reverse-md5
	
#Require
	var ReverseMd5 = require('reverse-md5')

#ReverseMd5(opts)

ReverseMd5 is a constructor that returns a function.

- `opts` is an object, and it has these properties:
	- `lettersUpper` - Enables reverseMd5 to look for uppercase letters, A-Z. Defaults to `true`.
	- `lettersLower` - Enables reverseMd5 to look for lowercase letters, a-z. Defaults to `true`.
	- `numbers` - Enables reverseMd5 to look for numbers, 0-9. Defaults to `true`.
	- `special` - Enables reverseMd5 to look for special characters, I.E. punctuation, symbols, brackets. Defaults to `false`.
	- `whitespace` - Enables reverseMd5 to look for whitespace, I.E. spaces, tabs, newlines. Defaults to `true`.
	- `maxLen` - The maximum length of string that the module searches for. Defaults to `8`.
- Returns a function that can be called to brute force an md5 with the options specified in `opts`.

#
- Returns an object with the following properties:
	- `str` - The string that was hashed. E.g. 'hi', 'wat'
	- `elapsed` - The amount of time that elapsed, in seconds. (Floating point.) E.g. 0.309135532, 2.912352039

#Example

```js
var reverseMd5 = ReverseMd5({
	lettersUpper: false,
	lettersLower: true,
	numbers: true,
	special: false,
	whitespace: true,
	maxLen: 12
})

reverseMd5('49f68a5c8493ec2c0bf489821c21fc3b') //returns something like: {str:'hi', elapsed: 0.309135532}
```

#License

[MIT](http://opensource.org/licenses/MIT)
