/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	binomcoef = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number binomcoef', function tests() {

	it( 'should export a function', function test() {
		expect( binomcoef ).to.be.a( 'function' );
	});

	it( 'should evaluate the function', function test() {
		assert.strictEqual( binomcoef( 100, 20 ), 535983370403809656832 );
		assert.strictEqual( binomcoef( -2, 0 ), 1 );
		assert.strictEqual( binomcoef( 2, 3 ), 0 );
		assert.strictEqual( binomcoef( 17, 4 ), 2380 );
		assert.strictEqual( binomcoef( 0, 0 ), 1 );
		assert.strictEqual( binomcoef( 0, -1 ), 0 );
		assert.closeTo( binomcoef( 2.5, 2 ), 1.875, 1e-12 );
	});

});
