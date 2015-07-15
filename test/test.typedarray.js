/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	binomcoef = require( './../lib/typedarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'typed-array binomcoef', function tests() {

	it( 'should export a function', function test() {
		expect( binomcoef ).to.be.a( 'function' );
	});


	it( 'should evaluate the function when x and y are typed arrays', function test() {
		var data, actual, expected, y;

		data = new Int32Array([
			10,
			20,
			30,
			40
		]);
		y = new Int32Array([
			5,
			5,
			5,
			5
		]);
		actual = new Int32Array( data.length );

		actual = binomcoef( actual, data, y );

		expected = new Int32Array([
			252,
			15504,
			142506,
			658008
		]);

		assert.deepEqual( actual, expected );

	});

	it( 'should throw an error if provided two typed arrays of differing lengths', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			binomcoef( new Array(2), new Int8Array( [1,2] ), new Int8Array( [1,2,3] ) );
		}

		expect( foo2 ).to.throw( Error );
		function foo2() {
			binomcoef( new Array(2), new Int8Array( [1,2] ), [ 1, 2, 3 ] );
		}
	});

	it( 'should handle non-numeric y values by setting the respective element to NaN', function test() {
		var data, actual, expected, y;

		data = new Float64Array([
			1,
			2,
			3,
			4
		]);
		actual = new Array( data.length );
		actual = binomcoef( actual, data, null );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		actual = new Array( data.length );
		y = [ 1, 2, 3, null ];
		actual = binomcoef( actual, data, y );

		expected = [ 1, 1, 1, NaN ];

		assert.deepEqual( actual, expected );

	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( binomcoef( new Int8Array(), new Int8Array() ), new Int8Array() );
	});

	it( 'should throw an error if provided a matrix as y argument', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			binomcoef( [], new Int8Array( [1,2,3,4] ), matrix( new Int32Array( [1,2,3,4] ), [2,2] ) );
		}
	});

});
