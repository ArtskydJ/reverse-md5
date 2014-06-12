reverse-md5
===========

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
