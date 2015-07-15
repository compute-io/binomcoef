'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isObject = require( 'validate.io-object' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' );


// FUNCTIONS //

var BINOMCOEF = require( './number.js' );


// BINOMCOEF FUNCTION //


/**
* FUNCTION: binomcoef( out, n, k, accessor )
*	Computes the binomial coefficient for each array element using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Number} k - either an array of equal length or a scalar
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function binomcoef( out, arr, k, clbk ) {
	var len = arr.length,
		i,
		arrVal, yVal;

	if ( isMatrixLike( k ) ) {
			throw new Error( 'binomcoef()::invalid input argument. `k` has to be an array or scalar.' );
	} else if ( isTypedArrayLike( k ) ) {
		if ( len !== k.length ) {
			throw new Error( 'binomcoef()::invalid input argument. Input arrays must have the same length.' );
		}
		for ( i = 0; i < len; i++ ) {
			arrVal = clbk( arr[ i ], i, 0 );
			if ( typeof arrVal === 'number' ) {
				out[ i ] = BINOMCOEF( arrVal, k[ i ] );
			} else {
				out[ i ] = NaN;
			}
		}
	} else if ( isArrayLike( k ) ) {
		if ( len !== k.length ) {
			throw new Error( 'binomcoef()::invalid input argument. Inputs arrays must have the same length.' );
		}
		if ( !isObject( k[ 0 ] ) ) {
			// Guess that k is a primitive array -> callback does not have to be applied
			for ( i = 0; i < len; i++ ) {
				arrVal = clbk( arr[ i ], i, 0 );
				if ( typeof k[ i ] === 'number' && typeof arrVal === 'number' ) {
					out[ i ] = BINOMCOEF( arrVal, k[ i ] );
				} else {
					out[ i ] = NaN;
				}
			}
		} else {
			// k is an object array, too -> callback is applied
			for ( i = 0; i < len; i++ ) {
				arrVal = clbk( arr[ i ], i, 0 );
				yVal = clbk( k[ i ], i, 1 );
				if ( typeof arrVal === 'number' && typeof yVal  === 'number' ) {
					out[ i ] = BINOMCOEF( arrVal, yVal );
				} else {
					out[ i ] = NaN;
				}
			}
		}
	} else {
		if ( typeof k === 'number' ) {
			for ( i = 0; i < len; i++ ) {
				arrVal = clbk( arr[ i ], i );
				if ( typeof arrVal === 'number' ) {
					out[ i ] = BINOMCOEF( arrVal, k );
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
