'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' );


// FUNCTIONS //

var BINOMCOEF = require( './number.js' );


// BINOMCOEF FUNCTION //


/**
* FUNCTION: binomcoef( out, arr, k )
*	Computes the binomial coefficient for each array element.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Number} k - either an array of equal length or a scalar
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function binomcoef( out, arr, k ) {
	var len = arr.length,
		i;

	if ( isMatrixLike( k ) ) {
			throw new Error( 'binomcoef()::invalid input argument. `k` has to be an array or scalar.' );
	} else if ( isTypedArrayLike( k ) ) {
		if ( len !== k.length ) {
			throw new Error( 'binomcoef()::invalid input arguments. Inputs arrays must have the same length.' );
		}
		for ( i = 0; i < len; i++ ) {
			if ( typeof arr[ i ] === 'number' ) {
				out[ i ] = BINOMCOEF( arr[ i ], k[ i ] );
			} else {
				out[ i ] = NaN;
			}
		}
	} else if ( isArrayLike( k ) ) {
		if ( len !== k.length ) {
			throw new Error( 'binomcoef()::invalid input arguments. Inputs arrays must have the same length.' );
		}
		for ( i = 0; i < len; i++ ) {
			if ( typeof k[ i ] === 'number' && typeof arr[ i ] === 'number' ) {
				out[ i ] = BINOMCOEF( arr[ i ], k[ i ] );
			} else {
				out[ i ] = NaN;
			}
		}
	} else {
		if ( typeof k === 'number' ) {
			for ( i = 0; i < len; i++ ) {
				if ( typeof arr[ i ] === 'number' ) {
					out[ i ] = BINOMCOEF( arr[ i ], k );
				} else {
					out[ i ] = NaN;
				}
			}
		} else {
			for ( i = 0; i < len; i++ ) {
				out[ i ] = NaN;
			}
		}
	}
	return out;
} // end FUNCTION binomcoef()


// EXPORTS //

module.exports = binomcoef;
