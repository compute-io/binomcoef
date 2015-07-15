'use strict';

// MODULES //

var betaln = require( 'compute-betaln/lib/number.js' ),
	isInteger = require( 'validate.io-integer' ),
	isodd = require( 'compute-isodd/lib/number.js');


// FUNCTIONS //

var exp = Math.exp,
	round = Math.round,
	log = Math.log;

// BINOMCOEF //

/**
* FUNCTION: binomcoef( n, k )
*	Computes the binomial coefficient of two numeric values.
*
* @param {Number} n - input value
* @param {Number} k - second input value
* @returns {Number} function value
*/

function binomcoef( n, k ) {
	var res, j;

	if ( isInteger( n ) && isInteger( k ) ) {
		if ( n < 0 ) {
			res = binomcoef( -n + k - 1, k );
			if ( isodd( k ) ) {
				res = -res;
			}
			return res;
		}
		if( n < k ) {
			return 0;
		}
		if ( n - k < k ) {
			k = n - k;
		}
		if (k <	 0) {
			return 0;
		} else if (k === 0) {
			return 1;
		} else {
			// use recursive definition
			res = n;
			for( j = 2; j <= k; j++ ) {
				res *= ( n - j + 1 ) / j;
			}
			// correct for rounding errors
			return !isInteger( res ) ? round( res ) : res;
		}
	} else {
		// generalized version for real numbers
		res = - log( n + 1 ) - betaln( n - k + 1, k + 1 );
		return exp( res );
	}
} // end FUNCTION binomcoef()


// EXPORTS //

module.exports = binomcoef;
