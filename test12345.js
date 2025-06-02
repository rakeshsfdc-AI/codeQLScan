function( html ) {
var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi
		return html.replace( rxhtmlTag, "<$1></$2>" );
	}
