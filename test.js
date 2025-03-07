function test1(){
for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values

		if ( (options = arguments[ i ]) != null ) {

			// Extend the base object

			for ( name in options ) {

				src = target[ name ];

				copy = options[ name ];
 
				// Prevent never-ending loop

				if ( target === copy ) {

					continue;

				}
 
				// Recurse if we're merging plain objects or arrays

				if ( deep && copy && ( isObject(copy) || (copyIsArray = isArray(copy)) ) ) {

					if ( copyIsArray ) {

						copyIsArray = false;

						clone = src && isArray(src) ? src : [];
 
					} else {

						clone = src && isObject(src) ? src : {};

					}
 
					// Never move original objects, clone them

					target[ name ] = extend( deep, clone, copy );
 
				// Don't bring in undefined values

				} else if ( copy !== undefined ) {

					target[ name ] = copy;

				}

			}

		}

	}
 
}
