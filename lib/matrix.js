'use strict';

// MODULES //

var isMatrixLike = require( 'validate.io-matrix-like' ),
	isArrayLike = require( 'validate.io-array-like' );


// FUNCTIONS //

var BINOMCOEF = require( './number.js' );


// BINOMCOEF FUNCTION //

/**
* FUNCTION: binomcoef( out, x, y )
*	Computes the binomial coefficient for each matrix element.
*
* @param {Matrix} out - output matirx
* @param {Matrix} x - input matrix
* @param {Matrix|Number} y - either a matrix of equal dimensions or a scalar
* @returns {Matrix} output matrix
*/
function binomcoef( out, x, y ) {
	var len = x.length,
		i, j,
		M, N;

	if ( out.length !== len ) {
		throw new Error( 'binomcoef()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	if ( isMatrixLike( y ) ) {
		M = x.shape[0];
		N = x.shape[1];
		if ( M !== x.shape[0] || N !== y.shape[1] ) {
			throw new Error( 'binomcoef()::invalid input arguments. Both matrices must have the same number of rows and columns.' );
		}
		for ( i = 0; i < M; i++ ) {
			for ( j = 0; j < N; j++ ) {
				out.set( i, j, BINOMCOEF( x.get( i, j ), y.get( i, j ) ) );
			}
		}
	} else if ( isArrayLike ( y ) ) {
		throw new Error( 'binomcoef()::invalid input arguments. When provided a matrix, the other input has to be either a matrix of the same dimensionality or a scalar value.' );
	} else {
		for ( i = 0; i < len; i++ ) {
			out.data[ i ] = BINOMCOEF( x.data[ i ], y );
		}
	}
	return out;
} // end FUNCTION binomcoef()


// EXPORTS //

module.exports = binomcoef;
