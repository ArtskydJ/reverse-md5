var Brute = require('./index.js')

var pw = new Brute({
	lettersUpper: true,
	lettersLower: true,
	numbers: true,
	special: false,
	whitespace: true,
	maxLen: 10
}) 

console.log("found: "+pw("dcc2630fea8d91fbc38ee0acc48001a6"))