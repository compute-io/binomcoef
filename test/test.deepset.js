/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

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
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		actual = binomcoef( data, 2, 'x' );

		expected = [
			{'x':0},
			{'x':1},
			{'x':4},
			{'x':9}
		];

		assert.strictEqual( data, actual );
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Custom separator...
		data = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]}
		];

		data = binomcoef( data, 2, 'x/1', '/' );
		expected = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,4]},
			{'x':[9,9]}
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should evaluate the binomcoef function when y is an array and deep set', function test() {
		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [ 0, 1, 2, 3 ];

		actual = binomcoef( data, y, 'x' );

		expected = [
			{'x':1},
			{'x':1},
			{'x':4},
			{'x':27}
		];

		assert.strictEqual( data, actual );
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		// Custom separator...
		data = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]}
		];

		data = binomcoef( data, y, 'x/1', '/' );
		expected = [
			{'x':[9,1]},
			{'x':[9,1]},
			{'x':[9,4]},
			{'x':[9,27]}
		];

		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

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
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

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
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

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
			{'x':[9,27]}
		];
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

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
			{'x':[9,27]}
		];
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );
	});


});
