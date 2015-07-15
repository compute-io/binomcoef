/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),
	
	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	binomcoef = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array binomcoef', function tests() {

	it( 'should export a function', function test() {
		expect( binomcoef ).to.be.a( 'function' );
	});

	it( 'should evaluate the function when y is a scalar', function test() {
			var data, actual, expected;

			data = [
				50,
				100,
				150,
				200
			];
			actual = new Array( data.length );

			actual = binomcoef( actual, data, 25 );

			expected = [
				126410606437752,
				2.4251926972033712e+23,
				1.9564640595300226e+28,
				4.521713160615245e+31
			];

			assert.deepEqual( actual, expected );

			// Typed arrays...
			data = new Int32Array( data );
			actual = new Int32Array( data.length );

			actual = binomcoef( actual, data, 25 );
			expected = new Int32Array( expected );

			assert.deepEqual( actual, expected );

		});

		it( 'should evaluate the function when y is an array', function test() {
			var data, actual, expected, y;

			data = [
				2,
				4,
				6,
				8,
				10
			];

		 	y = [
				10,
				8,
				6,
				4,
				2
			];
			actual = new Array( data.length );

			actual = binomcoef( actual, data, y );

			expected = [
				0,
				0,
				1,
				70,
				45
			];

			assert.deepEqual( actual, expected );

			// Typed arrays...
			data = new Int32Array( data );
			actual = new Int32Array( data.length );

			actual = binomcoef( actual, data, y );
			expected = new Int32Array( expected );

			assert.deepEqual( actual, expected );
		});

		it( 'should return an empty array if provided an empty array', function test() {
			assert.deepEqual( binomcoef( [], [], 1 ), [] );
			assert.deepEqual( binomcoef( new Int8Array(), new Int8Array(), 1 ), new Int8Array() );
		});

		it( 'should handle non-numeric values by setting the element to NaN', function test() {
			var data, actual, expected, y;

			data = [ true, null, [], {} ];
			actual = new Array( data.length );
			actual = binomcoef( actual, data, 1 );

			expected = [ NaN, NaN, NaN, NaN ];

			assert.deepEqual( actual, expected );

			actual = new Array( data.length );
			y = [ 1, 2, 3, 4 ];
			actual = binomcoef( actual, data, y );

			expected = [ NaN, NaN, NaN, NaN ];

			assert.deepEqual( actual, expected );

			data = [ 1, 2, 3 ];
			y = null;
			actual = new Array( data.length );
			actual = binomcoef( actual, data, y );
			expected = [ NaN, NaN, NaN ];

			assert.deepEqual( actual, expected );

			data = [ 1, null, 3 ];
			y = new Int32Array( [1,2,3] );
			actual = new Array( data.length );
			actual = binomcoef( actual, data, y );
			expected = [ 1, NaN, 1 ];

			assert.deepEqual( actual, expected );

		});

		it( 'should throw an error if provided a y array which is not of equal length to the input x array', function test() {
			expect( foo ).to.throw( Error );
			function foo() {
				binomcoef( [], [1,2], [1,2,3] );
			}
			expect( foo2 ).to.throw( Error );
			function foo2() {
				binomcoef( [], [1,2], new Int32Array( [1,2,3] ) );
			}
		});

		it( 'should throw an error if provided a matrix as y argument', function test() {
			expect( foo ).to.throw( Error );
			function foo() {
				binomcoef( [], [1,2,3,4], matrix( new Int32Array( [1,2,3,4] ), [2,2] ) );
			}
		});


});
