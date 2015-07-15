/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),
	
	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	binomcoef = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset binomcoef', function tests() {

	it( 'should export a function', function test() {
		expect( binomcoef ).to.be.a( 'function' );
	});

	it( 'should evaluate the binomcoef function when y is a scalar and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':4},
			{'x':6},
			{'x':8},
			{'x':10}
		];

		actual = binomcoef( data, 2, 'x' );

		expected = [
			{'x':6},
			{'x':15},
			{'x':28},
			{'x':45}
		];

		assert.strictEqual( data, actual );
		assert.deepEqual( data, expected );

		// Custom separator...
		data = [
			{'x':[9,4]},
			{'x':[9,6]},
			{'x':[9,8]},
			{'x':[9,10]}
		];

		data = binomcoef( data, 2, 'x/1', '/' );
		expected = [
			{'x':[9,6]},
			{'x':[9,15]},
			{'x':[9,28]},
			{'x':[9,45]}
		];

		assert.deepEqual( data, expected );

	});

	it( 'should evaluate the binomcoef function when y is an array and deep set', function test() {
		var data, actual, expected, y;

		data = [
			{'x':2},
			{'x':4},
			{'x':6},
			{'x':8}
		];

		y = [ 8, 6, 4, 2 ];

		actual = binomcoef( data, y, 'x' );

		expected = [
			{'x':0},
			{'x':0},
			{'x':15},
			{'x':28}
		];

		assert.strictEqual( data, actual );
		assert.deepEqual( data, expected );

		// Custom separator...
		data = [
			{'x':[9,2]},
			{'x':[9,4]},
			{'x':[9,6]},
			{'x':[9,8]}
		];

		data = binomcoef( data, y, 'x/1', '/' );
		expected = [
			{'x':[9,0]},
			{'x':[9,0]},
			{'x':[9,15]},
			{'x':[9,28]}
		];

		assert.deepEqual( data, expected );

	});

	it( 'should return an empty array if provided an empty array', function test() {
		var arr = [];
		assert.deepEqual( binomcoef( arr, 1, 'x' ), [] );
		assert.deepEqual( binomcoef( arr, 1, 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected, y;

		// raising to a non-numeric value
		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		actual = binomcoef( data, null, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,NaN]},
			{'x':[9,NaN]},
			{'x':[9,NaN]}
		];
		assert.deepEqual( data, expected );

		// raising to a scalar
		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		actual = binomcoef( data, 1, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,1]},
			{'x':[9,NaN]},
			{'x':[9,3]}
		];
		assert.deepEqual( data, expected );

		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		y = [ 0, 1, 2, 3];
		actual = binomcoef( data, y, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,1]},
			{'x':[9,NaN]},
			{'x':[9,1]}
		];
		assert.deepEqual( data, expected );

		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		y = new Int32Array( [0,1,2,3] );
		actual = binomcoef( data, y, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,1]},
			{'x':[9,NaN]},
			{'x':[9,1]}
		];
		assert.deepEqual( data, expected );
	});

	it( 'should throw an error if provided a matrix as y argument', function test() {
		var data, y;

		data = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]}
		];
		y = matrix( new Int32Array( [1,2,3,4] ), [2,2] );

		expect( foo ).to.throw( Error );
		function foo() {
			binomcoef(data, y, 'x.1' );
		}
	});


});
