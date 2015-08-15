(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\Users\\Michael\\AppData\\Roaming\\npm\\node_modules\\watchify\\node_modules\\browserify\\node_modules\\process\\browser.js":[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],"C:\\Users\\Michael\\AppData\\Roaming\\npm\\node_modules\\watchify\\node_modules\\browserify\\node_modules\\querystring-es3\\decode.js":[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],"C:\\Users\\Michael\\AppData\\Roaming\\npm\\node_modules\\watchify\\node_modules\\browserify\\node_modules\\querystring-es3\\encode.js":[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],"C:\\Users\\Michael\\AppData\\Roaming\\npm\\node_modules\\watchify\\node_modules\\browserify\\node_modules\\querystring-es3\\index.js":[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":"C:\\Users\\Michael\\AppData\\Roaming\\npm\\node_modules\\watchify\\node_modules\\browserify\\node_modules\\querystring-es3\\decode.js","./encode":"C:\\Users\\Michael\\AppData\\Roaming\\npm\\node_modules\\watchify\\node_modules\\browserify\\node_modules\\querystring-es3\\encode.js"}],"C:\\Users\\Michael\\Github\\javascript\\reverse-md5\\index.js":[function(require,module,exports){
(function (process){
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

}).call(this,require('_process'))
},{"_process":"C:\\Users\\Michael\\AppData\\Roaming\\npm\\node_modules\\watchify\\node_modules\\browserify\\node_modules\\process\\browser.js","querystring":"C:\\Users\\Michael\\AppData\\Roaming\\npm\\node_modules\\watchify\\node_modules\\browserify\\node_modules\\querystring-es3\\index.js","reverse-md5":"C:\\Users\\Michael\\Github\\javascript\\reverse-md5\\node_modules\\reverse-md5\\index.js"}],"C:\\Users\\Michael\\Github\\javascript\\reverse-md5\\node_modules\\md5-jkmyers\\md5.min.js":[function(require,module,exports){
!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.md5=b()}(this,function(){function a(a,b){var g=a[0],h=a[1],i=a[2],j=a[3];g=c(g,h,i,j,b[0],7,-680876936),j=c(j,g,h,i,b[1],12,-389564586),i=c(i,j,g,h,b[2],17,606105819),h=c(h,i,j,g,b[3],22,-1044525330),g=c(g,h,i,j,b[4],7,-176418897),j=c(j,g,h,i,b[5],12,1200080426),i=c(i,j,g,h,b[6],17,-1473231341),h=c(h,i,j,g,b[7],22,-45705983),g=c(g,h,i,j,b[8],7,1770035416),j=c(j,g,h,i,b[9],12,-1958414417),i=c(i,j,g,h,b[10],17,-42063),h=c(h,i,j,g,b[11],22,-1990404162),g=c(g,h,i,j,b[12],7,1804603682),j=c(j,g,h,i,b[13],12,-40341101),i=c(i,j,g,h,b[14],17,-1502002290),h=c(h,i,j,g,b[15],22,1236535329),g=d(g,h,i,j,b[1],5,-165796510),j=d(j,g,h,i,b[6],9,-1069501632),i=d(i,j,g,h,b[11],14,643717713),h=d(h,i,j,g,b[0],20,-373897302),g=d(g,h,i,j,b[5],5,-701558691),j=d(j,g,h,i,b[10],9,38016083),i=d(i,j,g,h,b[15],14,-660478335),h=d(h,i,j,g,b[4],20,-405537848),g=d(g,h,i,j,b[9],5,568446438),j=d(j,g,h,i,b[14],9,-1019803690),i=d(i,j,g,h,b[3],14,-187363961),h=d(h,i,j,g,b[8],20,1163531501),g=d(g,h,i,j,b[13],5,-1444681467),j=d(j,g,h,i,b[2],9,-51403784),i=d(i,j,g,h,b[7],14,1735328473),h=d(h,i,j,g,b[12],20,-1926607734),g=e(g,h,i,j,b[5],4,-378558),j=e(j,g,h,i,b[8],11,-2022574463),i=e(i,j,g,h,b[11],16,1839030562),h=e(h,i,j,g,b[14],23,-35309556),g=e(g,h,i,j,b[1],4,-1530992060),j=e(j,g,h,i,b[4],11,1272893353),i=e(i,j,g,h,b[7],16,-155497632),h=e(h,i,j,g,b[10],23,-1094730640),g=e(g,h,i,j,b[13],4,681279174),j=e(j,g,h,i,b[0],11,-358537222),i=e(i,j,g,h,b[3],16,-722521979),h=e(h,i,j,g,b[6],23,76029189),g=e(g,h,i,j,b[9],4,-640364487),j=e(j,g,h,i,b[12],11,-421815835),i=e(i,j,g,h,b[15],16,530742520),h=e(h,i,j,g,b[2],23,-995338651),g=f(g,h,i,j,b[0],6,-198630844),j=f(j,g,h,i,b[7],10,1126891415),i=f(i,j,g,h,b[14],15,-1416354905),h=f(h,i,j,g,b[5],21,-57434055),g=f(g,h,i,j,b[12],6,1700485571),j=f(j,g,h,i,b[3],10,-1894986606),i=f(i,j,g,h,b[10],15,-1051523),h=f(h,i,j,g,b[1],21,-2054922799),g=f(g,h,i,j,b[8],6,1873313359),j=f(j,g,h,i,b[15],10,-30611744),i=f(i,j,g,h,b[6],15,-1560198380),h=f(h,i,j,g,b[13],21,1309151649),g=f(g,h,i,j,b[4],6,-145523070),j=f(j,g,h,i,b[11],10,-1120210379),i=f(i,j,g,h,b[2],15,718787259),h=f(h,i,j,g,b[9],21,-343485551),a[0]=l(g,a[0]),a[1]=l(h,a[1]),a[2]=l(i,a[2]),a[3]=l(j,a[3])}function b(a,b,c,d,e,f){return b=l(l(b,a),l(d,f)),l(b<<e|b>>>32-e,c)}function c(a,c,d,e,f,g,h){return b(c&d|~c&e,a,c,f,g,h)}function d(a,c,d,e,f,g,h){return b(c&e|d&~e,a,c,f,g,h)}function e(a,c,d,e,f,g,h){return b(c^d^e,a,c,f,g,h)}function f(a,c,d,e,f,g,h){return b(d^(c|~e),a,c,f,g,h)}function g(b){txt="";var c,d=b.length,e=[1732584193,-271733879,-1732584194,271733878];for(c=64;c<=b.length;c+=64)a(e,h(b.substring(c-64,c)));b=b.substring(c-64);var f=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(c=0;c<b.length;c++)f[c>>2]|=b.charCodeAt(c)<<(c%4<<3);if(f[c>>2]|=128<<(c%4<<3),c>55)for(a(e,f),c=0;16>c;c++)f[c]=0;return f[14]=8*d,a(e,f),e}function h(a){var b,c=[];for(b=0;64>b;b+=4)c[b>>2]=a.charCodeAt(b)+(a.charCodeAt(b+1)<<8)+(a.charCodeAt(b+2)<<16)+(a.charCodeAt(b+3)<<24);return c}function i(a){for(var b="",c=0;4>c;c++)b+=m[a>>8*c+4&15]+m[a>>8*c&15];return b}function j(a){for(var b=0;b<a.length;b++)a[b]=i(a[b]);return a.join("")}function k(a){return j(g(a))}function l(a,b){return a+b&4294967295}function l(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}var m="0123456789abcdef".split("");return"5d41402abc4b2a76b9719d911017c592"!=k("hello"),k});
},{}],"C:\\Users\\Michael\\Github\\javascript\\reverse-md5\\node_modules\\ns-elapsed\\index.js":[function(require,module,exports){
(function (process){
﻿var LeadingChars = require('leading-chars')
var leadingZeroes = LeadingChars({
	len: 9,
	character: '0',
	leading: true
})
var diffToTime = function(diff) {
	return parseFloat('' + diff[0] + '.' + leadingZeroes(diff[1]))
}

module.exports = function Elapsed() {
	var startTime = []
	function set() { startTime = process.hrtime() }
	function get() { return diffToTime( process.hrtime(startTime) ) }
	set()
	return {
		set: set,
		get: get
	}
}

}).call(this,require('_process'))
},{"_process":"C:\\Users\\Michael\\AppData\\Roaming\\npm\\node_modules\\watchify\\node_modules\\browserify\\node_modules\\process\\browser.js","leading-chars":"C:\\Users\\Michael\\Github\\javascript\\reverse-md5\\node_modules\\ns-elapsed\\node_modules\\leading-chars\\index.js"}],"C:\\Users\\Michael\\Github\\javascript\\reverse-md5\\node_modules\\ns-elapsed\\node_modules\\leading-chars\\index.js":[function(require,module,exports){
var xtend = require('xtend')
var defaultOpts = {
	len: 4,
	character: ' ',
	leading: true
}

module.exports = function LeadingChars(constructorOpts) {
	return function leadingChars(str, opts) {
		opts = xtend(defaultOpts, constructorOpts, opts)
		str = (str || '').toString()
		var result = ''
		for(var i=0; (opts.len>0)? i<opts.len-str.length : i<Math.abs(opts.len); i++)
			result += opts.character
		return opts.leading? result + str : str + result
	}
}

},{"xtend":"C:\\Users\\Michael\\Github\\javascript\\reverse-md5\\node_modules\\xtend\\index.js"}],"C:\\Users\\Michael\\Github\\javascript\\reverse-md5\\node_modules\\reverse-md5\\index.js":[function(require,module,exports){
var md5 = require('md5-jkmyers')
var elapsed = require('ns-elapsed')()
var xtend = require('xtend')
var chars = []

var defaultOpts = {
	lettersUpper: true,
	lettersLower: true,
	numbers: true,
	special: false,
	whitespace: true,
	maxLen: 8
}
var strs = {
	lettersUpper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	lettersLower: 'abcdefghijklmnopqrstuvwxyz',
	numbers: '0123456789',
	special: '`~!@#$%^&*()-_=+|\\;:\'",.<>[]{}/?',
	whitespace: ' \t\n'
}

function optsToArray(opts) {
	var result = ''
	if (opts.lettersUpper)	result += strs.lettersUpper
	if (opts.lettersLower)	result += strs.lettersLower
	if (opts.numbers)		result += strs.numbers
	if (opts.special)		result += strs.special
	if (opts.whitespace)	result += strs.whitespace
	return result.split('')
}

function generate(length) {
	var res = chars[0]
	for(var i=1; i<length; i++)
		res += chars[0]
	return res
}

function Rnc(str, charEnd, veryEnd) {
	return (typeof str === 'object') ? {
		str:		(typeof str.str !== 'undefined')? str.str : '',
		charEnd:	(typeof str.charEnd !== 'undefined')? str.charEnd : false,
		veryEnd:	(typeof str.veryEnd !== 'undefined')? str.veryEnd : false
	} : {
		str:		(typeof str !== 'undefined')? str : '',
		charEnd:	(typeof charEnd !== 'undefined')? charEnd : false,
		veryEnd:	(typeof veryEnd !== 'undefined')? veryEnd : false
	}
}

function nextChar(str, ind) {
	var charIndex = chars.indexOf(str.charAt(ind))
	return {
		chr: chars[(charIndex+1)%chars.length],
		end: (charIndex >= chars.length-1)
	}
}

function replaceChar(str, ind, newChar) {
	var t1 = str.slice(0, ind)
	var t2 = str.slice(ind+1)
	return t1 + newChar + t2
}

function replaceNextChar(str, ind) {
	var nc = nextChar(str, ind)
	var str = replaceChar(str, ind, nc.chr)
	if (nc.end)
		if (ind===0)	str = generate(str.length+1)
		else			str = replaceNextChar(str, ind-1, nc.chr).str
	return {
		str: str,
		charEnd: nc.end,
		veryEnd: nc.end && ind===0
	}
}

function iterate(hash, maxLen) {
	elapsed.set()
	var rnc = new Rnc(chars[0])
	var status = {running: true, foundHash: false}
	var ind = 0

	for(var x=0; status.running; x++) {
		rnc = replaceNextChar(rnc.str, ind)
		ind = rnc.str.length-1

		if (md5(rnc.str)===hash) {
			status.running = false
			status.foundHash = true
		} else if (rnc.veryEnd) {
			if (rnc.str.length>=maxLen)
				status.running = false
		}
	}
	if (status.foundHash)
		return {
			str: rnc.str,
			elapsed: elapsed.get()
		}
	else
		return Error("No string found for hash %s", hash)
}

module.exports = function Brute(constructorOpts) {
	return function brute(hash, opts) {
		opts = xtend(defaultOpts, constructorOpts, opts)
		chars = optsToArray( opts )
		return iterate(hash, opts.maxLen)
	}
}

},{"md5-jkmyers":"C:\\Users\\Michael\\Github\\javascript\\reverse-md5\\node_modules\\md5-jkmyers\\md5.min.js","ns-elapsed":"C:\\Users\\Michael\\Github\\javascript\\reverse-md5\\node_modules\\ns-elapsed\\index.js","xtend":"C:\\Users\\Michael\\Github\\javascript\\reverse-md5\\node_modules\\xtend\\index.js"}],"C:\\Users\\Michael\\Github\\javascript\\reverse-md5\\node_modules\\xtend\\index.js":[function(require,module,exports){
module.exports = extend

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}]},{},["C:\\Users\\Michael\\Github\\javascript\\reverse-md5\\index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcTWljaGFlbFxcQXBwRGF0YVxcUm9hbWluZ1xcbnBtXFxub2RlX21vZHVsZXNcXHdhdGNoaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6L1VzZXJzL01pY2hhZWwvQXBwRGF0YS9Sb2FtaW5nL25wbS9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIkM6L1VzZXJzL01pY2hhZWwvQXBwRGF0YS9Sb2FtaW5nL25wbS9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9kZWNvZGUuanMiLCJDOi9Vc2Vycy9NaWNoYWVsL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZW5jb2RlLmpzIiwiQzovVXNlcnMvTWljaGFlbC9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2luZGV4LmpzIiwiQzovVXNlcnMvTWljaGFlbC9HaXRodWIvamF2YXNjcmlwdC9yZXZlcnNlLW1kNS9pbmRleC5qcyIsIkM6L1VzZXJzL01pY2hhZWwvR2l0aHViL2phdmFzY3JpcHQvcmV2ZXJzZS1tZDUvbm9kZV9tb2R1bGVzL21kNS1qa215ZXJzL21kNS5taW4uanMiLCJDOi9Vc2Vycy9NaWNoYWVsL0dpdGh1Yi9qYXZhc2NyaXB0L3JldmVyc2UtbWQ1L25vZGVfbW9kdWxlcy9ucy1lbGFwc2VkL2luZGV4LmpzIiwiQzovVXNlcnMvTWljaGFlbC9HaXRodWIvamF2YXNjcmlwdC9yZXZlcnNlLW1kNS9ub2RlX21vZHVsZXMvbnMtZWxhcHNlZC9ub2RlX21vZHVsZXMvbGVhZGluZy1jaGFycy9pbmRleC5qcyIsIkM6L1VzZXJzL01pY2hhZWwvR2l0aHViL2phdmFzY3JpcHQvcmV2ZXJzZS1tZDUvbm9kZV9tb2R1bGVzL3JldmVyc2UtbWQ1L2luZGV4LmpzIiwiQzovVXNlcnMvTWljaGFlbC9HaXRodWIvamF2YXNjcmlwdC9yZXZlcnNlLW1kNS9ub2RlX21vZHVsZXMveHRlbmQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbnByb2Nlc3MubmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5TZXRJbW1lZGlhdGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIGNhblBvc3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5wb3N0TWVzc2FnZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lclxuICAgIDtcblxuICAgIGlmIChjYW5TZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7IHJldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGYpIH07XG4gICAgfVxuXG4gICAgaWYgKGNhblBvc3QpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gW107XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gZXYuc291cmNlO1xuICAgICAgICAgICAgaWYgKChzb3VyY2UgPT09IHdpbmRvdyB8fCBzb3VyY2UgPT09IG51bGwpICYmIGV2LmRhdGEgPT09ICdwcm9jZXNzLXRpY2snKSB7XG4gICAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoJ3Byb2Nlc3MtdGljaycsICcqJyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH07XG59KSgpO1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn1cblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gSWYgb2JqLmhhc093blByb3BlcnR5IGhhcyBiZWVuIG92ZXJyaWRkZW4sIHRoZW4gY2FsbGluZ1xuLy8gb2JqLmhhc093blByb3BlcnR5KHByb3ApIHdpbGwgYnJlYWsuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9qb3llbnQvbm9kZS9pc3N1ZXMvMTcwN1xuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihxcywgc2VwLCBlcSwgb3B0aW9ucykge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgdmFyIG9iaiA9IHt9O1xuXG4gIGlmICh0eXBlb2YgcXMgIT09ICdzdHJpbmcnIHx8IHFzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICB2YXIgcmVnZXhwID0gL1xcKy9nO1xuICBxcyA9IHFzLnNwbGl0KHNlcCk7XG5cbiAgdmFyIG1heEtleXMgPSAxMDAwO1xuICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5tYXhLZXlzID09PSAnbnVtYmVyJykge1xuICAgIG1heEtleXMgPSBvcHRpb25zLm1heEtleXM7XG4gIH1cblxuICB2YXIgbGVuID0gcXMubGVuZ3RoO1xuICAvLyBtYXhLZXlzIDw9IDAgbWVhbnMgdGhhdCB3ZSBzaG91bGQgbm90IGxpbWl0IGtleXMgY291bnRcbiAgaWYgKG1heEtleXMgPiAwICYmIGxlbiA+IG1heEtleXMpIHtcbiAgICBsZW4gPSBtYXhLZXlzO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIHZhciB4ID0gcXNbaV0ucmVwbGFjZShyZWdleHAsICclMjAnKSxcbiAgICAgICAgaWR4ID0geC5pbmRleE9mKGVxKSxcbiAgICAgICAga3N0ciwgdnN0ciwgaywgdjtcblxuICAgIGlmIChpZHggPj0gMCkge1xuICAgICAga3N0ciA9IHguc3Vic3RyKDAsIGlkeCk7XG4gICAgICB2c3RyID0geC5zdWJzdHIoaWR4ICsgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtzdHIgPSB4O1xuICAgICAgdnN0ciA9ICcnO1xuICAgIH1cblxuICAgIGsgPSBkZWNvZGVVUklDb21wb25lbnQoa3N0cik7XG4gICAgdiA9IGRlY29kZVVSSUNvbXBvbmVudCh2c3RyKTtcblxuICAgIGlmICghaGFzT3duUHJvcGVydHkob2JqLCBrKSkge1xuICAgICAgb2JqW2tdID0gdjtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgb2JqW2tdLnB1c2godik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtrXSA9IFtvYmpba10sIHZdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHhzKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnlQcmltaXRpdmUgPSBmdW5jdGlvbih2KSB7XG4gIHN3aXRjaCAodHlwZW9mIHYpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIHY7XG5cbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiB2ID8gJ3RydWUnIDogJ2ZhbHNlJztcblxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gaXNGaW5pdGUodikgPyB2IDogJyc7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgc2VwLCBlcSwgbmFtZSkge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgIG9iaiA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBtYXAob2JqZWN0S2V5cyhvYmopLCBmdW5jdGlvbihrKSB7XG4gICAgICB2YXIga3MgPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKGspKSArIGVxO1xuICAgICAgaWYgKGlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgICByZXR1cm4gbWFwKG9ialtrXSwgZnVuY3Rpb24odikge1xuICAgICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUodikpO1xuICAgICAgICB9KS5qb2luKHNlcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9ialtrXSkpO1xuICAgICAgfVxuICAgIH0pLmpvaW4oc2VwKTtcblxuICB9XG5cbiAgaWYgKCFuYW1lKSByZXR1cm4gJyc7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG5hbWUpKSArIGVxICtcbiAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqKSk7XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHhzKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuZnVuY3Rpb24gbWFwICh4cywgZikge1xuICBpZiAoeHMubWFwKSByZXR1cm4geHMubWFwKGYpO1xuICB2YXIgcmVzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICByZXMucHVzaChmKHhzW2ldLCBpKSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxudmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSByZXMucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmRlY29kZSA9IGV4cG9ydHMucGFyc2UgPSByZXF1aXJlKCcuL2RlY29kZScpO1xuZXhwb3J0cy5lbmNvZGUgPSBleHBvcnRzLnN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vZW5jb2RlJyk7XG4iLCIoZnVuY3Rpb24gKHByb2Nlc3Mpe1xucHJvY2Vzcy5ocnRpbWUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAwIH1cbnZhciBxcyA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5nJylcbnZhciBSZXZlcnNlTWQ1ID0gcmVxdWlyZSgncmV2ZXJzZS1tZDUnKVxuXG52YXIgcXVlcnkgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnNsaWNlKDEpXG52YXIgcGFyc2VkID0gcXMucGFyc2UocXVlcnkpXG52YXIgbWQ1ID0gcGFyc2VkLm1kNSB8fCAnJ1xuXG52YXIgcmV2ZXJzZSA9IFJldmVyc2VNZDUoe1xuXHRsZXR0ZXJzVXBwZXI6IGZhbHNlLFxuXHRsZXR0ZXJzTG93ZXI6IGZhbHNlLFxuXHRudW1iZXJzOiBmYWxzZSxcblx0c3BlY2lhbDogZmFsc2UsXG5cdHdoaXRlc3BhY2U6IGZhbHNlXG59KVxuXG5PYmplY3Qua2V5cyhwYXJzZWQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHR2YXIgZWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW25hbWU9JyArIGtleSArICddJylcblx0dmFyIHZhbHVlID0gcGFyc2VkW2tleV1cblx0aWYgKGVsZSAmJiB2YWx1ZSA9PT0gJ29uJykge1xuXHRcdGVsZS5jaGVja2VkID0gdHJ1ZVxuXHR9IGVsc2UgaWYgKGVsZSkge1xuXHRcdGVsZS52YWx1ZSA9IHZhbHVlXG5cdH1cbn0pXG5cbmlmIChtZDUubGVuZ3RoID09PSAzMikge1xuXHR2YXIgcmVzdWx0ID0gcmV2ZXJzZShtZDUsIHBhcnNlZClcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdCcpLnZhbHVlID0gcmVzdWx0LnN0clxufSBlbHNlIGlmIChxdWVyeSkge1xuXHR0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGxvbmdlciBtZDUgc3RyaW5nJylcbn1cblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoJ19wcm9jZXNzJykpIiwiIWZ1bmN0aW9uKGEsYil7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShiKTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1iKCk6YS5tZDU9YigpfSh0aGlzLGZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShhLGIpe3ZhciBnPWFbMF0saD1hWzFdLGk9YVsyXSxqPWFbM107Zz1jKGcsaCxpLGosYlswXSw3LC02ODA4NzY5MzYpLGo9YyhqLGcsaCxpLGJbMV0sMTIsLTM4OTU2NDU4NiksaT1jKGksaixnLGgsYlsyXSwxNyw2MDYxMDU4MTkpLGg9YyhoLGksaixnLGJbM10sMjIsLTEwNDQ1MjUzMzApLGc9YyhnLGgsaSxqLGJbNF0sNywtMTc2NDE4ODk3KSxqPWMoaixnLGgsaSxiWzVdLDEyLDEyMDAwODA0MjYpLGk9YyhpLGosZyxoLGJbNl0sMTcsLTE0NzMyMzEzNDEpLGg9YyhoLGksaixnLGJbN10sMjIsLTQ1NzA1OTgzKSxnPWMoZyxoLGksaixiWzhdLDcsMTc3MDAzNTQxNiksaj1jKGosZyxoLGksYls5XSwxMiwtMTk1ODQxNDQxNyksaT1jKGksaixnLGgsYlsxMF0sMTcsLTQyMDYzKSxoPWMoaCxpLGosZyxiWzExXSwyMiwtMTk5MDQwNDE2MiksZz1jKGcsaCxpLGosYlsxMl0sNywxODA0NjAzNjgyKSxqPWMoaixnLGgsaSxiWzEzXSwxMiwtNDAzNDExMDEpLGk9YyhpLGosZyxoLGJbMTRdLDE3LC0xNTAyMDAyMjkwKSxoPWMoaCxpLGosZyxiWzE1XSwyMiwxMjM2NTM1MzI5KSxnPWQoZyxoLGksaixiWzFdLDUsLTE2NTc5NjUxMCksaj1kKGosZyxoLGksYls2XSw5LC0xMDY5NTAxNjMyKSxpPWQoaSxqLGcsaCxiWzExXSwxNCw2NDM3MTc3MTMpLGg9ZChoLGksaixnLGJbMF0sMjAsLTM3Mzg5NzMwMiksZz1kKGcsaCxpLGosYls1XSw1LC03MDE1NTg2OTEpLGo9ZChqLGcsaCxpLGJbMTBdLDksMzgwMTYwODMpLGk9ZChpLGosZyxoLGJbMTVdLDE0LC02NjA0NzgzMzUpLGg9ZChoLGksaixnLGJbNF0sMjAsLTQwNTUzNzg0OCksZz1kKGcsaCxpLGosYls5XSw1LDU2ODQ0NjQzOCksaj1kKGosZyxoLGksYlsxNF0sOSwtMTAxOTgwMzY5MCksaT1kKGksaixnLGgsYlszXSwxNCwtMTg3MzYzOTYxKSxoPWQoaCxpLGosZyxiWzhdLDIwLDExNjM1MzE1MDEpLGc9ZChnLGgsaSxqLGJbMTNdLDUsLTE0NDQ2ODE0NjcpLGo9ZChqLGcsaCxpLGJbMl0sOSwtNTE0MDM3ODQpLGk9ZChpLGosZyxoLGJbN10sMTQsMTczNTMyODQ3MyksaD1kKGgsaSxqLGcsYlsxMl0sMjAsLTE5MjY2MDc3MzQpLGc9ZShnLGgsaSxqLGJbNV0sNCwtMzc4NTU4KSxqPWUoaixnLGgsaSxiWzhdLDExLC0yMDIyNTc0NDYzKSxpPWUoaSxqLGcsaCxiWzExXSwxNiwxODM5MDMwNTYyKSxoPWUoaCxpLGosZyxiWzE0XSwyMywtMzUzMDk1NTYpLGc9ZShnLGgsaSxqLGJbMV0sNCwtMTUzMDk5MjA2MCksaj1lKGosZyxoLGksYls0XSwxMSwxMjcyODkzMzUzKSxpPWUoaSxqLGcsaCxiWzddLDE2LC0xNTU0OTc2MzIpLGg9ZShoLGksaixnLGJbMTBdLDIzLC0xMDk0NzMwNjQwKSxnPWUoZyxoLGksaixiWzEzXSw0LDY4MTI3OTE3NCksaj1lKGosZyxoLGksYlswXSwxMSwtMzU4NTM3MjIyKSxpPWUoaSxqLGcsaCxiWzNdLDE2LC03MjI1MjE5NzkpLGg9ZShoLGksaixnLGJbNl0sMjMsNzYwMjkxODkpLGc9ZShnLGgsaSxqLGJbOV0sNCwtNjQwMzY0NDg3KSxqPWUoaixnLGgsaSxiWzEyXSwxMSwtNDIxODE1ODM1KSxpPWUoaSxqLGcsaCxiWzE1XSwxNiw1MzA3NDI1MjApLGg9ZShoLGksaixnLGJbMl0sMjMsLTk5NTMzODY1MSksZz1mKGcsaCxpLGosYlswXSw2LC0xOTg2MzA4NDQpLGo9ZihqLGcsaCxpLGJbN10sMTAsMTEyNjg5MTQxNSksaT1mKGksaixnLGgsYlsxNF0sMTUsLTE0MTYzNTQ5MDUpLGg9ZihoLGksaixnLGJbNV0sMjEsLTU3NDM0MDU1KSxnPWYoZyxoLGksaixiWzEyXSw2LDE3MDA0ODU1NzEpLGo9ZihqLGcsaCxpLGJbM10sMTAsLTE4OTQ5ODY2MDYpLGk9ZihpLGosZyxoLGJbMTBdLDE1LC0xMDUxNTIzKSxoPWYoaCxpLGosZyxiWzFdLDIxLC0yMDU0OTIyNzk5KSxnPWYoZyxoLGksaixiWzhdLDYsMTg3MzMxMzM1OSksaj1mKGosZyxoLGksYlsxNV0sMTAsLTMwNjExNzQ0KSxpPWYoaSxqLGcsaCxiWzZdLDE1LC0xNTYwMTk4MzgwKSxoPWYoaCxpLGosZyxiWzEzXSwyMSwxMzA5MTUxNjQ5KSxnPWYoZyxoLGksaixiWzRdLDYsLTE0NTUyMzA3MCksaj1mKGosZyxoLGksYlsxMV0sMTAsLTExMjAyMTAzNzkpLGk9ZihpLGosZyxoLGJbMl0sMTUsNzE4Nzg3MjU5KSxoPWYoaCxpLGosZyxiWzldLDIxLC0zNDM0ODU1NTEpLGFbMF09bChnLGFbMF0pLGFbMV09bChoLGFbMV0pLGFbMl09bChpLGFbMl0pLGFbM109bChqLGFbM10pfWZ1bmN0aW9uIGIoYSxiLGMsZCxlLGYpe3JldHVybiBiPWwobChiLGEpLGwoZCxmKSksbChiPDxlfGI+Pj4zMi1lLGMpfWZ1bmN0aW9uIGMoYSxjLGQsZSxmLGcsaCl7cmV0dXJuIGIoYyZkfH5jJmUsYSxjLGYsZyxoKX1mdW5jdGlvbiBkKGEsYyxkLGUsZixnLGgpe3JldHVybiBiKGMmZXxkJn5lLGEsYyxmLGcsaCl9ZnVuY3Rpb24gZShhLGMsZCxlLGYsZyxoKXtyZXR1cm4gYihjXmReZSxhLGMsZixnLGgpfWZ1bmN0aW9uIGYoYSxjLGQsZSxmLGcsaCl7cmV0dXJuIGIoZF4oY3x+ZSksYSxjLGYsZyxoKX1mdW5jdGlvbiBnKGIpe3R4dD1cIlwiO3ZhciBjLGQ9Yi5sZW5ndGgsZT1bMTczMjU4NDE5MywtMjcxNzMzODc5LC0xNzMyNTg0MTk0LDI3MTczMzg3OF07Zm9yKGM9NjQ7Yzw9Yi5sZW5ndGg7Yys9NjQpYShlLGgoYi5zdWJzdHJpbmcoYy02NCxjKSkpO2I9Yi5zdWJzdHJpbmcoYy02NCk7dmFyIGY9WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdO2ZvcihjPTA7YzxiLmxlbmd0aDtjKyspZltjPj4yXXw9Yi5jaGFyQ29kZUF0KGMpPDwoYyU0PDwzKTtpZihmW2M+PjJdfD0xMjg8PChjJTQ8PDMpLGM+NTUpZm9yKGEoZSxmKSxjPTA7MTY+YztjKyspZltjXT0wO3JldHVybiBmWzE0XT04KmQsYShlLGYpLGV9ZnVuY3Rpb24gaChhKXt2YXIgYixjPVtdO2ZvcihiPTA7NjQ+YjtiKz00KWNbYj4+Ml09YS5jaGFyQ29kZUF0KGIpKyhhLmNoYXJDb2RlQXQoYisxKTw8OCkrKGEuY2hhckNvZGVBdChiKzIpPDwxNikrKGEuY2hhckNvZGVBdChiKzMpPDwyNCk7cmV0dXJuIGN9ZnVuY3Rpb24gaShhKXtmb3IodmFyIGI9XCJcIixjPTA7ND5jO2MrKyliKz1tW2E+PjgqYys0JjE1XSttW2E+PjgqYyYxNV07cmV0dXJuIGJ9ZnVuY3Rpb24gaihhKXtmb3IodmFyIGI9MDtiPGEubGVuZ3RoO2IrKylhW2JdPWkoYVtiXSk7cmV0dXJuIGEuam9pbihcIlwiKX1mdW5jdGlvbiBrKGEpe3JldHVybiBqKGcoYSkpfWZ1bmN0aW9uIGwoYSxiKXtyZXR1cm4gYStiJjQyOTQ5NjcyOTV9ZnVuY3Rpb24gbChhLGIpe3ZhciBjPSg2NTUzNSZhKSsoNjU1MzUmYiksZD0oYT4+MTYpKyhiPj4xNikrKGM+PjE2KTtyZXR1cm4gZDw8MTZ8NjU1MzUmY312YXIgbT1cIjAxMjM0NTY3ODlhYmNkZWZcIi5zcGxpdChcIlwiKTtyZXR1cm5cIjVkNDE0MDJhYmM0YjJhNzZiOTcxOWQ5MTEwMTdjNTkyXCIhPWsoXCJoZWxsb1wiKSxrfSk7IiwiKGZ1bmN0aW9uIChwcm9jZXNzKXtcbu+7v3ZhciBMZWFkaW5nQ2hhcnMgPSByZXF1aXJlKCdsZWFkaW5nLWNoYXJzJylcclxudmFyIGxlYWRpbmdaZXJvZXMgPSBMZWFkaW5nQ2hhcnMoe1xyXG5cdGxlbjogOSxcclxuXHRjaGFyYWN0ZXI6ICcwJyxcclxuXHRsZWFkaW5nOiB0cnVlXHJcbn0pXHJcbnZhciBkaWZmVG9UaW1lID0gZnVuY3Rpb24oZGlmZikge1xyXG5cdHJldHVybiBwYXJzZUZsb2F0KCcnICsgZGlmZlswXSArICcuJyArIGxlYWRpbmdaZXJvZXMoZGlmZlsxXSkpXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gRWxhcHNlZCgpIHtcclxuXHR2YXIgc3RhcnRUaW1lID0gW11cclxuXHRmdW5jdGlvbiBzZXQoKSB7IHN0YXJ0VGltZSA9IHByb2Nlc3MuaHJ0aW1lKCkgfVxyXG5cdGZ1bmN0aW9uIGdldCgpIHsgcmV0dXJuIGRpZmZUb1RpbWUoIHByb2Nlc3MuaHJ0aW1lKHN0YXJ0VGltZSkgKSB9XHJcblx0c2V0KClcclxuXHRyZXR1cm4ge1xyXG5cdFx0c2V0OiBzZXQsXHJcblx0XHRnZXQ6IGdldFxyXG5cdH1cclxufVxyXG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKCdfcHJvY2VzcycpKSIsInZhciB4dGVuZCA9IHJlcXVpcmUoJ3h0ZW5kJylcclxudmFyIGRlZmF1bHRPcHRzID0ge1xyXG5cdGxlbjogNCxcclxuXHRjaGFyYWN0ZXI6ICcgJyxcclxuXHRsZWFkaW5nOiB0cnVlXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gTGVhZGluZ0NoYXJzKGNvbnN0cnVjdG9yT3B0cykge1xyXG5cdHJldHVybiBmdW5jdGlvbiBsZWFkaW5nQ2hhcnMoc3RyLCBvcHRzKSB7XHJcblx0XHRvcHRzID0geHRlbmQoZGVmYXVsdE9wdHMsIGNvbnN0cnVjdG9yT3B0cywgb3B0cylcclxuXHRcdHN0ciA9IChzdHIgfHwgJycpLnRvU3RyaW5nKClcclxuXHRcdHZhciByZXN1bHQgPSAnJ1xyXG5cdFx0Zm9yKHZhciBpPTA7IChvcHRzLmxlbj4wKT8gaTxvcHRzLmxlbi1zdHIubGVuZ3RoIDogaTxNYXRoLmFicyhvcHRzLmxlbik7IGkrKylcclxuXHRcdFx0cmVzdWx0ICs9IG9wdHMuY2hhcmFjdGVyXHJcblx0XHRyZXR1cm4gb3B0cy5sZWFkaW5nPyByZXN1bHQgKyBzdHIgOiBzdHIgKyByZXN1bHRcclxuXHR9XHJcbn1cclxuIiwidmFyIG1kNSA9IHJlcXVpcmUoJ21kNS1qa215ZXJzJylcclxudmFyIGVsYXBzZWQgPSByZXF1aXJlKCducy1lbGFwc2VkJykoKVxyXG52YXIgeHRlbmQgPSByZXF1aXJlKCd4dGVuZCcpXHJcbnZhciBjaGFycyA9IFtdXHJcblxyXG52YXIgZGVmYXVsdE9wdHMgPSB7XHJcblx0bGV0dGVyc1VwcGVyOiB0cnVlLFxyXG5cdGxldHRlcnNMb3dlcjogdHJ1ZSxcclxuXHRudW1iZXJzOiB0cnVlLFxyXG5cdHNwZWNpYWw6IGZhbHNlLFxyXG5cdHdoaXRlc3BhY2U6IHRydWUsXHJcblx0bWF4TGVuOiA4XHJcbn1cclxudmFyIHN0cnMgPSB7XHJcblx0bGV0dGVyc1VwcGVyOiAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonLFxyXG5cdGxldHRlcnNMb3dlcjogJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6JyxcclxuXHRudW1iZXJzOiAnMDEyMzQ1Njc4OScsXHJcblx0c3BlY2lhbDogJ2B+IUAjJCVeJiooKS1fPSt8XFxcXDs6XFwnXCIsLjw+W117fS8/JyxcclxuXHR3aGl0ZXNwYWNlOiAnIFxcdFxcbidcclxufVxyXG5cclxuZnVuY3Rpb24gb3B0c1RvQXJyYXkob3B0cykge1xyXG5cdHZhciByZXN1bHQgPSAnJ1xyXG5cdGlmIChvcHRzLmxldHRlcnNVcHBlcilcdHJlc3VsdCArPSBzdHJzLmxldHRlcnNVcHBlclxyXG5cdGlmIChvcHRzLmxldHRlcnNMb3dlcilcdHJlc3VsdCArPSBzdHJzLmxldHRlcnNMb3dlclxyXG5cdGlmIChvcHRzLm51bWJlcnMpXHRcdHJlc3VsdCArPSBzdHJzLm51bWJlcnNcclxuXHRpZiAob3B0cy5zcGVjaWFsKVx0XHRyZXN1bHQgKz0gc3Rycy5zcGVjaWFsXHJcblx0aWYgKG9wdHMud2hpdGVzcGFjZSlcdHJlc3VsdCArPSBzdHJzLndoaXRlc3BhY2VcclxuXHRyZXR1cm4gcmVzdWx0LnNwbGl0KCcnKVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZShsZW5ndGgpIHtcclxuXHR2YXIgcmVzID0gY2hhcnNbMF1cclxuXHRmb3IodmFyIGk9MTsgaTxsZW5ndGg7IGkrKylcclxuXHRcdHJlcyArPSBjaGFyc1swXVxyXG5cdHJldHVybiByZXNcclxufVxyXG5cclxuZnVuY3Rpb24gUm5jKHN0ciwgY2hhckVuZCwgdmVyeUVuZCkge1xyXG5cdHJldHVybiAodHlwZW9mIHN0ciA9PT0gJ29iamVjdCcpID8ge1xyXG5cdFx0c3RyOlx0XHQodHlwZW9mIHN0ci5zdHIgIT09ICd1bmRlZmluZWQnKT8gc3RyLnN0ciA6ICcnLFxyXG5cdFx0Y2hhckVuZDpcdCh0eXBlb2Ygc3RyLmNoYXJFbmQgIT09ICd1bmRlZmluZWQnKT8gc3RyLmNoYXJFbmQgOiBmYWxzZSxcclxuXHRcdHZlcnlFbmQ6XHQodHlwZW9mIHN0ci52ZXJ5RW5kICE9PSAndW5kZWZpbmVkJyk/IHN0ci52ZXJ5RW5kIDogZmFsc2VcclxuXHR9IDoge1xyXG5cdFx0c3RyOlx0XHQodHlwZW9mIHN0ciAhPT0gJ3VuZGVmaW5lZCcpPyBzdHIgOiAnJyxcclxuXHRcdGNoYXJFbmQ6XHQodHlwZW9mIGNoYXJFbmQgIT09ICd1bmRlZmluZWQnKT8gY2hhckVuZCA6IGZhbHNlLFxyXG5cdFx0dmVyeUVuZDpcdCh0eXBlb2YgdmVyeUVuZCAhPT0gJ3VuZGVmaW5lZCcpPyB2ZXJ5RW5kIDogZmFsc2VcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5leHRDaGFyKHN0ciwgaW5kKSB7XHJcblx0dmFyIGNoYXJJbmRleCA9IGNoYXJzLmluZGV4T2Yoc3RyLmNoYXJBdChpbmQpKVxyXG5cdHJldHVybiB7XHJcblx0XHRjaHI6IGNoYXJzWyhjaGFySW5kZXgrMSklY2hhcnMubGVuZ3RoXSxcclxuXHRcdGVuZDogKGNoYXJJbmRleCA+PSBjaGFycy5sZW5ndGgtMSlcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlcGxhY2VDaGFyKHN0ciwgaW5kLCBuZXdDaGFyKSB7XHJcblx0dmFyIHQxID0gc3RyLnNsaWNlKDAsIGluZClcclxuXHR2YXIgdDIgPSBzdHIuc2xpY2UoaW5kKzEpXHJcblx0cmV0dXJuIHQxICsgbmV3Q2hhciArIHQyXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlcGxhY2VOZXh0Q2hhcihzdHIsIGluZCkge1xyXG5cdHZhciBuYyA9IG5leHRDaGFyKHN0ciwgaW5kKVxyXG5cdHZhciBzdHIgPSByZXBsYWNlQ2hhcihzdHIsIGluZCwgbmMuY2hyKVxyXG5cdGlmIChuYy5lbmQpXHJcblx0XHRpZiAoaW5kPT09MClcdHN0ciA9IGdlbmVyYXRlKHN0ci5sZW5ndGgrMSlcclxuXHRcdGVsc2VcdFx0XHRzdHIgPSByZXBsYWNlTmV4dENoYXIoc3RyLCBpbmQtMSwgbmMuY2hyKS5zdHJcclxuXHRyZXR1cm4ge1xyXG5cdFx0c3RyOiBzdHIsXHJcblx0XHRjaGFyRW5kOiBuYy5lbmQsXHJcblx0XHR2ZXJ5RW5kOiBuYy5lbmQgJiYgaW5kPT09MFxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gaXRlcmF0ZShoYXNoLCBtYXhMZW4pIHtcclxuXHRlbGFwc2VkLnNldCgpXHJcblx0dmFyIHJuYyA9IG5ldyBSbmMoY2hhcnNbMF0pXHJcblx0dmFyIHN0YXR1cyA9IHtydW5uaW5nOiB0cnVlLCBmb3VuZEhhc2g6IGZhbHNlfVxyXG5cdHZhciBpbmQgPSAwXHJcblxyXG5cdGZvcih2YXIgeD0wOyBzdGF0dXMucnVubmluZzsgeCsrKSB7XHJcblx0XHRybmMgPSByZXBsYWNlTmV4dENoYXIocm5jLnN0ciwgaW5kKVxyXG5cdFx0aW5kID0gcm5jLnN0ci5sZW5ndGgtMVxyXG5cclxuXHRcdGlmIChtZDUocm5jLnN0cik9PT1oYXNoKSB7XHJcblx0XHRcdHN0YXR1cy5ydW5uaW5nID0gZmFsc2VcclxuXHRcdFx0c3RhdHVzLmZvdW5kSGFzaCA9IHRydWVcclxuXHRcdH0gZWxzZSBpZiAocm5jLnZlcnlFbmQpIHtcclxuXHRcdFx0aWYgKHJuYy5zdHIubGVuZ3RoPj1tYXhMZW4pXHJcblx0XHRcdFx0c3RhdHVzLnJ1bm5pbmcgPSBmYWxzZVxyXG5cdFx0fVxyXG5cdH1cclxuXHRpZiAoc3RhdHVzLmZvdW5kSGFzaClcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHN0cjogcm5jLnN0cixcclxuXHRcdFx0ZWxhcHNlZDogZWxhcHNlZC5nZXQoKVxyXG5cdFx0fVxyXG5cdGVsc2VcclxuXHRcdHJldHVybiBFcnJvcihcIk5vIHN0cmluZyBmb3VuZCBmb3IgaGFzaCAlc1wiLCBoYXNoKVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEJydXRlKGNvbnN0cnVjdG9yT3B0cykge1xyXG5cdHJldHVybiBmdW5jdGlvbiBicnV0ZShoYXNoLCBvcHRzKSB7XHJcblx0XHRvcHRzID0geHRlbmQoZGVmYXVsdE9wdHMsIGNvbnN0cnVjdG9yT3B0cywgb3B0cylcclxuXHRcdGNoYXJzID0gb3B0c1RvQXJyYXkoIG9wdHMgKVxyXG5cdFx0cmV0dXJuIGl0ZXJhdGUoaGFzaCwgb3B0cy5tYXhMZW4pXHJcblx0fVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kXG5cbmZ1bmN0aW9uIGV4dGVuZCgpIHtcbiAgICB2YXIgdGFyZ2V0ID0ge31cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV1cblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0XG59XG4iXX0=
