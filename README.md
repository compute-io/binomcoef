binomcoef
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the [binomial coefficient](https://en.wikipedia.org/wiki/Binomial_coefficient).

The [binomial coefficient](https://en.wikipedia.org/wiki/Binomial_coefficient) of two non-negative integers `n` and `k` is defined as

<div class="equation" align="center" data-raw-text="
    \binom nk = \frac{n!}{k!\,(n-k)!} \quad \text{for }\ 0\leq k\leq n" data-equation="eq:binomial_coefficient">
	<img src="https://cdn.rawgit.com/compute-io/binomcoef/381304df00ac0cb05857c6108bd51046d984080b/docs/img/eqn1.svg" alt="Factorial formula for the Binomial coefficient.">
	<br>
</div>

It can be generalized for any two real numbers `n` and `k` as follows

<div class="equation" align="center" data-raw-text="{n \choose k}= \frac{\Gamma(n+1)}{\Gamma(k+1) \Gamma(n-k+1)}= \frac{1}{(n+1) \operatorname{Beta}(n-k+1,k+1)}" data-equation="eq:generalized_binomial_coefficient">
	<img src="https://cdn.rawgit.com/compute-io/binomcoef/381304df00ac0cb05857c6108bd51046d984080b/docs/img/eqn2.svg" alt="Generalized version of the Binomial coefficient for real numbers.">
	<br>
</div>

## Installation

``` bash
$ npm install compute-binomcoef
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var binomcoef = require( 'compute-binomcoef' );
```

#### binomcoef( n, k[, options] )

Computes the [Binomial function](https://en.wikipedia.org/wiki/Binomial_coefficient) (element-wise). `n` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).  `k` has to be either an `array` or `matrix` of equal dimensions as `n` or a single number. Correspondingly, the function returns either an `array` with the same length as the input `array(s)`, a `matrix` with the same dimensions as the input `matrix/matrices` or a single number.

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = binomcoef( 8, 2 );
// returns 28

out = binomcoef( 0, 0 );
// returns 1

out = binomcoef( -4, 2 );
// returns 10

out = binomcoef( 2, -1 );
// returns 0

out = binomcoef( 3, 1.5 );
// returns ~3.395

data = [ 0, 1, 2, 3, 4 ];
out = binomcoef( data, 2 );
// returns [ 0, 0, 1, 3, 6 ]

out = binomcoef( 6, data );
// returns [ 1, 6, 15, 20, 15 ]

data = new Int8Array( data );
out = binomcoef( data, 2 );
// returns Float64Array( [ 0, 0, 1, 3, 6 ] )

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[ 0  1
	  2  3
	  4  5 ]
*/

out = binomcoef( mat, 3 );
/*
	[ 0  0
	  0  1
	  4 10 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', 5 ],
	['boop', 10 ],
	['bip', 15 ],
	['bap', 20 ],
	['baz', 25 ]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = binomcoef( data, 2, {
	'accessor': getValue
});
// returns [ 10, 45, 105, 190, 300 ]
```
When computing the [binomial coefficient](https://en.wikipedia.org/wiki/Binomial_coefficient) for values of two object `arrays`, provide an accessor `function` which accepts `3` arguments.

``` javascript
var data = [
	['beep', 1],
	['boop', 2],
	['bip', 3],
	['bap', 4],
	['baz', 5]
];

var y = [
	{'x': 1},
	{'x': 2},
	{'x': 3},
	{'x': 4},
	{'x': 5}
];

function getValue( d, i, j ) {
	if ( j === 0 ) {
		return d[ 1 ];
	}
	return d.x;
}

var out = beta( data, y, {
	'accessor': getValue
});
// returns [ 1, 1, 1, 1, 1 ]
```

__Note__: `j` corresponds to the input `array` index, where `j=0` is the index for the first input `array` and `j=1` is the index for the second input `array`.

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,0]},
	{'x':[1,1]},
	{'x':[2,2]},
	{'x':[3,3]},
	{'x':[4,4]}
];

var out = binomcoef( data, 'x|1', '|' );
/*
	[
		{'x':[0,0]},
		{'x':[1,0]},
		{'x':[2,1]},
		{'x':[3,3]},
		{'x':[4,6]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var data, out;

data = new Int8Array( [0, 1, 2] );

out = binomcoef( data, 1, {
	'dtype': 'int32'
});
// returns Int32Array( [0,1,2] )

// Works for plain arrays, as well...
out = binomcoef( [0, 1, 2], 1, {
	'dtype': 'uint8'
});
// returns Uint8Array( [0,1,2] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

var data = [ 0, 1, 2, 3, 4 ];

var out = binomcoef( data, 2, {
	'copy': false
});
// returns [ 0, 0, 1, 3, 6 ]

bool = ( data === out );
// returns true

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[ 0  1
	  2  3
	  4  5 ]
*/

out = binomcoef( mat, 3, {
	'copy': false
});
/*
	[ 0  0
	  0  1
	  4 10 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated [error function](http://en.wikipedia.org/wiki/Error_function) is `NaN`.

	``` javascript
	var data, out;

	out = binomcoef( null, 1 );
	// returns NaN

	out = binomcoef( true, 1 );
	// returns NaN

	out = binomcoef( {'a':'b'}, 1 );
	// returns NaN

	out = binomcoef( [ true, null, [] ], 1 );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = binomcoef( data, 1, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = binomcoef( data, 1, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = binomcoef( [ true, null, [] ], 1 {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```

*	When calling the function with a numeric value as the first argument and a `matrix` or `array` as the second argument, only the `dtype` option is applicable.

	``` javascript
		// Valid:
		var out = binomcoef( 2, [ 1, 2, 3 ], {
			'dtype': 'int8'
		});
		// returns Int8Array( [2, 1, 0] )

		// Not valid:
		var out = binomcoef( 2, [ 1, 2, 3 ], {
			'copy': false
		});
		// throws an error
	```


## Implementation

Instead of evaluating the factorial form, which is inefficient and prone to overflow for large inputs arguments, this module computes the following multiplicative representation of the binomial coefficient for integer arguments

<div class="equation" align="center" data-raw-text="\binom nk = \prod_{i=1}^k \frac{n+1-i}{i}" data-equation="eq:multiplicative_representation">
	<img src="https://cdn.rawgit.com/compute-io/binomcoef/381304df00ac0cb05857c6108bd51046d984080b/docs/img/eqn3.svg" alt="Multiplicative definition of the Binomial coefficient.">
	<br>
</div>

For non-integer inputs, the function computes `- ln( n + 1 ) - ln( Beta( n - k + 1, k + 1 ) )` and returns the power this value to base [e](https://en.wikipedia.org/wiki/E_%28mathematical_constant%29).

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	 binomcoef = require( 'compute-binomcoef' );

var data,
	mat,
	out,
	tmp,
	i;

// ----
// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*20 );
}
out = binomcoef( data, 3 );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = binomcoef( data, 3, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = binomcoef( data, 3, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*20 );
}
tmp = binomcoef( data, 3 );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = binomcoef( mat, 3 );

// Matrices (custom output data type)...
out = binomcoef( mat, 3, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-binomcoef.svg
[npm-url]: https://npmjs.org/package/compute-binomcoef

[travis-image]: http://img.shields.io/travis/compute-io/binomcoef/master.svg
[travis-url]: https://travis-ci.org/compute-io/binomcoef

[coveralls-image]: https://img.shields.io/coveralls/compute-io/binomcoef/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/binomcoef?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/binomcoef.svg
[dependencies-url]: https://david-dm.org/compute-io/binomcoef

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/binomcoef.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/binomcoef

[github-issues-image]: http://img.shields.io/github/issues/compute-io/binomcoef.svg
[github-issues-url]: https://github.com/compute-io/binomcoef/issues
