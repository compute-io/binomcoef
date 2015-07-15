/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	binomcoef = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor binomcoef', function tests() {

	it( 'should export a function', function test() {
		expect( binomcoef ).to.be.a( 'function' );
	});

	it( 'should evaluate the binomcoef function using an accessor when y is a scalar', function test() {
		var data, actual, expected;

		data = [
			{'x':10},
			{'x':20},
			{'x':30},
			{'x':40}
		];
		actual = new Array( data.length );
		actual = binomcoef( actual, data, 5, getValue );

		expected = [
 			252, 15504, 142506, 658008
		];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}

	});

	it( 'should evaluate the binomcoef function using an accessor when y is an array', function test() {
		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [
			0,
			1,
			2,
			3
		];

		actual = new Array( data.length );
		actual = binomcoef( actual, data, y, getValue );

		expected = [
			1, 1, 1, 1
		];

		assert.deepEqual( actual, expected );

		function getValue( d, i ) {
			return d.x;
		}

	});

	it( 'should evaluate the binomcoef function for two object arrays using an accessor', function test() {
		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [
			{'y':0},
			{'y':1},
			{'y':2},
			{'y':3}
		];

		actual = new Array( data.length );
		actual = binomcoef( actual, data, y, getValue );

		expected = [
			1, 1, 1, 1
		];

		assert.deepEqual( actual, expected );

		function getValue( d, i, j ) {
			if ( j === 0 ) {
				return d.x;
			} else {
				return d.y;
			}
		}

	});

	it( 'should return empty array if provided an empty array', function test() {
		assert.deepEqual( binomcoef( [], [], 1, getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected, y;

		// numeric value
		data = [
			{'x':1},
			{'x':null},
			{'x':3}
		];
		actual = new Array( data.length );
		actual = binomcoef( actual, data, 1, getValue );

		expected = [ 1, NaN, 3 ];
		assert.deepEqual( actual, expected );

		// single non-numeric value
		y = false;
		actual = new Array( data.length );
		actual = binomcoef( actual, data, y, getValue );
		expected = [ NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		// numeric array
		y = [ 1, 2, 3 ];
		actual = new Array( data.length );
		actual = binomcoef( actual, data, y, getValue );
		expected = [ 1, NaN, 1 ];

		assert.deepEqual( actual, expected );

		function getValue( d, i ) {
			return d.x;
		}

		// typed array
		y = new Int32Array( [1,2,3] );
		actual = new Array( data.length );
		actual = binomcoef( actual, data, y, getValue );
		expected = [ 1, NaN, 1 ];

		assert.deepEqual( actual, expected );

		// object array
		y = [
			{'y':1},
			{'y':2},
			{'y':3}
		];
		actual = new Array( data.length );
		actual = binomcoef( actual, data, y, getValue2 );
		expected = [ 1, NaN, 1 ];

		assert.deepEqual( actual, expected );

		function getValue2( d, i, j ) {
			if ( j === 0 ) {
				return d.x;
			} else {
				return d.y;
			}
		}

	});

	it( 'should throw an error if provided a y array which is not of equal length to the x array', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			binomcoef( [], [1,2], [1,2,3], getValue );
		}
		function getValue( d ) {
			return d;
		}
	});

	it( 'should throw an error if provided a typed array as y which is not of equal length to the x array', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			binomcoef( [], [1,2], new Int32Array( [1,2,3] ), getValue );
		}
		function getValue( d ) {
			return d;
		}
	});

	it( 'should throw an error if provided a matrix as y argument', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			binomcoef( [], [1,2,3,4], matrix( new Int32Array( [1,2,3,4] ), [2,2] ), getValue );
		}
		function getValue( d ) {
			return d;
		}
	});


});
