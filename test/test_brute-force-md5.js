var test = require('tap').test
var Brute = require('../index.js')
var brute = Brute({
	lettersUpper: false,
	lettersLower: true,
	numbers: true,
	special: false,
	whitespace: true,
	maxLen: 12
})

test('Hashes match', function(t) {
	t.equal( brute('363b122c528f54df4a0446b6bab05515').str, 'j', 'Hash matches' )
	t.equal( brute('49f68a5c8493ec2c0bf489821c21fc3b').str, 'hi', 'Hash matches' )
	t.equal( brute('8ff32489f92f33416694be8fdc2d4c22').str, 'joe', 'Hash matches' )
	t.equal( brute('6351bf9dce654515bf1ddbd6426dfa97').str, '1996', 'Hash matches' )
	//t.equal( brute('05298fdb6c0c3d665cea702d1f85acda').str, '10124', 'Hash matches' )
	//t.equal( brute('cb07901c53218323c4ceacdea4b23c98').str, 'joseph', 'Hash matches' )
	//t.equal( brute('5eb63bbbe01eeed093cb22bb8f5acdc3').str, 'hello world', 'Hash matches' )
	t.end()
})
