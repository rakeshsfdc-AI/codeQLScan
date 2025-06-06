function( options ) {
	if ( !options || !options.of ) {
		return _position.apply( this, arguments );
	}

	// make a copy, we don't want to modify arguments
	options = $.extend( {}, options );
     var target;
	 if(options.of instanceof jQuery || options.of.nodeType){
		 //If options.of is a jQuery object or a DOM element, use it directly 
		 target = $(options.of);
	 }
}
