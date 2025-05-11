function (options){
if ( !options || !options.of ) {
		return _position.apply( this, arguments );
	}
 
	// make a copy, we don't want to modify arguments
	options = $.extend( {}, options );
 
	var atOffset, targetWidth, targetHeight, targetOffset, basePosition,
		target = $( options.of ),
		within = $.position.getWithinInfo( options.within ),
		scrollInfo = $.position.getScrollInfo( within ),
		targetElem = target[0],
		collision = ( options.collision || "flip" ).split( " " ),
		offsets = {};
}
