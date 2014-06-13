reverse-md5
===========

[![Build Status](https://travis-ci.org/ArtskydJ/reverse-md5.svg?branch=master)](https://travis-ci.org/ArtskydJ/reverse-md5)

- [Install](https://github.com/ArtskydJ/reverse-md5#install)
- [Require](https://github.com/ArtskydJ/reverse-md5#require)
- [Use](https://github.com/ArtskydJ/reverse-md5#use)
- [License](https://github.com/ArtskydJ/reverse-md5#license)

##Install
	npm install reverse-md5
	
##Require
	var ReverseMd5 = require('reverse-md5')

##Use
	var reverseMd5 = ReverseMd5({
		lettersUpper: false,
		lettersLower: true,
		numbers: true,
		special: false,
		whitespace: true,
		maxLen: 12
	})
	
	reverseMd5('49f68a5c8493ec2c0bf489821c21fc3b') //returns 'hi'

##License

[MIT](http://opensource.org/licenses/MIT)
