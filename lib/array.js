'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' );


// FUNCTIONS //

var BINOMCOEF = require( './number.js' );


// BINOMCOEF FUNCTION //


/**
* FUNCTION: binomcoef( out, arr, y )
*	Computes the binomial coefficient for each array element.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Number} y - either an array of equal length or a scalar
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function binomcoef( out, arr, y ) {
	var len = arr.length,
		i;

	if ( isMatrixLike( y ) ) {
			throw new Error( 'binomcoef()::invalid input argument. `y` has to be an array or scalar.' );
	} else if ( isTypedArrayLike( y ) ) {
		if ( len !== y.length ) {
			throw new Error( 'binomcoef()::invalid input arguments. Inputs arrays must have the same length.' );
		}
		for ( i = 0; i < len; i++ ) {
			if ( typeof arr[ i ] === 'number' ) {
				out[ i ] = BINOMCOEF( arr[ i ], y[ i ] );
			} else {
				out[ i ] = NaN;
			}
		}
	} else if ( isArrayLike( y ) ) {
		if ( len !== y.length ) {
			throw new Error( 'binomcoef()::invalid input arguments. Inputs arrays must have the same length.' );
		}
		for ( i = 0; i < len; i++ ) {
			if ( typeof y[ i ] === 'number' && typeof arr[ i ] === 'number' ) {
				out[ i ] = BINOMCOEF( arr[ i ], y[ i ] );
			} else {
				out[ i ] = NaN;
			}
		}
	} else {
		if ( typeof y === 'number' ) {
			for ( i = 0; i < len; i++ ) {
				if ( typeof arr[ i ] === 'number' ) {
					out[ i ] = BINOMCOEF( arr[ i ], y );
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
