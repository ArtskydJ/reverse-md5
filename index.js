process.hrtime = function () { return 0 }
var qs = require('querystring')
var ReverseMd5 = require('reverse-md5')

var query = window.location.search.slice(1)
var parsed = qs.parse(query)
var md5 = parsed.md5 || ''

var reverse = ReverseMd5({
	lettersUpper: false,
	lettersLower: false,
	numbers: false,
	special: false,
	whitespace: false
})

Object.keys(parsed).forEach(function (key) {
	var ele = document.querySelector('[name=' + key + ']')
	var value = parsed[key]
	if (ele && value === 'on') {
		ele.checked = true
	} else if (ele) {
		ele.value = value
	}
})

if (md5.length === 32) {
	var result = reverse(md5, parsed)
	document.getElementById('result').value = result.str
} else if (query) {
	throw new Error('Expected longer md5 string')
}
