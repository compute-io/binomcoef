/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

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

		data = new Float64Array([
			0,
			1,
			2,
			3
		]);
		y = new Float64Array([
			0,
			1,
			2,
			3
		]);
		actual = new Float64Array( data.length );

		actual = binomcoef( actual, data, y );

		expected = new Float64Array( [1,1,4,27] );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

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

		expected = [ 1, 4, 27, NaN ];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( binomcoef( new Int8Array(), new Int8Array() ), new Int8Array() );
	});


});
