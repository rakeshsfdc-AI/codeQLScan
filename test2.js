function(){
var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	rnocache = /<(?:script|object|embed|option|style)/i,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rcheckableType = /^(?:checkbox|radio)$/,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /\/(java|ecma)script/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );
 
wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;
 
// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
// unless wrapped in a div with non-breaking characters in front of it.
if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "X<div>", "</div>" ];
}
 
jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},
 
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}
 
		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);
 
			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}
 
			wrap.map(function() {
				var elem = this;
 
				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}
 
				return elem;
			}).append( this );
		}
 
		return this;
	},
 
	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}
 
		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();
 
			if ( contents.length ) {
				contents.wrapAll( html );
 
			} else {
				self.append( html );
			}
		});
	},
 
	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );
 
		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},
 
	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},
 
	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 ) {
				this.appendChild( elem );
			}
		});
	},
 
	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},
 
	before: function() {
		if ( !isDisconnected( this[0] ) ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		}
 
		if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			return this.pushStack( jQuery.merge( set, this ), "before", this.selector );
		}
	},
 
	after: function() {
		if ( !isDisconnected( this[0] ) ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		}
 
		if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			return this.pushStack( jQuery.merge( this, set ), "after", this.selector );
		}
	},
 
	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			i = 0;
 
		for ( ; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}
 
				if ( elem.parentNode ) {
					elem.parentNode.removeChild( elem );
				}
			}
		}
 
		return this;
	},



	empty: function() {

		var elem,

			i = 0;
 
		for ( ; (elem = this[i]) != null; i++ ) {

			// Remove element nodes and prevent memory leaks

			if ( elem.nodeType === 1 ) {

				jQuery.cleanData( elem.getElementsByTagName("*") );

			}
 
			// Remove any remaining nodes

			while ( elem.firstChild ) {

				elem.removeChild( elem.firstChild );

			}

		}
 
		return this;

	},
 
	clone: function( dataAndEvents, deepDataAndEvents ) {

		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;

		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
 
		return this.map( function () {

			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );

		});

	},
 
	html: function( value ) {

		return jQuery.access( this, function( value ) {

			var elem = this[0] || {},

				i = 0,

				l = this.length;
 
			if ( value === undefined ) {

				return elem.nodeType === 1 ?

					elem.innerHTML.replace( rinlinejQuery, "" ) :

					undefined;

			}
 
			// See if we can take a shortcut and just use innerHTML

			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&

				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&

				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&

				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {
 
				//value = value.replace( rxhtmlTag, "<$1></$2>" );

				value = value.replace( rxhtmlTag, function(match, tagName) {

                // Only replace self-closing tags that are not void elements

                var voidElements = /^(?:area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i;

                return voidElements.test(tagName) ? match : "<" + tagName + "></" + tagName + ">";

                });

                value = DOMPurify.sanitize(value);

				try {

					for (; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks

						elem = this[i] || {};

						if ( elem.nodeType === 1 ) {

							jQuery.cleanData( elem.getElementsByTagName( "*" ) );

							elem.innerHTML = value;

						}

					}
 
					elem = 0;
 
				// If using innerHTML throws an exception, use the fallback method

				} catch(e) {}

			}
 
			if ( elem ) {

				this.empty().append( value );

			}

		}, null, value, arguments.length );

	},
 
	replaceWith: function( value ) {

		if ( !isDisconnected( this[0] ) ) {

			// Make sure that the elements are removed from the DOM before they are inserted

			// this can help fix replacing a parent with child elements

			if ( jQuery.isFunction( value ) ) {

				return this.each(function(i) {

					var self = jQuery(this), old = self.html();

					self.replaceWith( value.call( this, i, old ) );

				});

			}
 
			if ( typeof value !== "string" ) {

				value = jQuery( value ).detach();

			}
 
			return this.each(function() {

				var next = this.nextSibling,

					parent = this.parentNode;
 
				jQuery( this ).remove();
 
				if ( next ) {

					jQuery(next).before( value );

				} else {

					jQuery(parent).append( value );

				}

			});

		}
 
		return this.length ?

			this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :

			this;

	},
 
	detach: function( selector ) {

		return this.remove( selector, true );

	},
 
	domManip: function( args, table, callback ) {
 
		// Flatten any nested arrays

		args = [].concat.apply( [], args );
 
		var results, first, fragment, iNoClone,

			i = 0,

			value = args[0],

			scripts = [],

			l = this.length;
 
		// We can't cloneNode fragments that contain checked, in WebKit

		if ( !jQuery.support.checkClone && l > 1 && typeof value === "string" && rchecked.test( value ) ) {

			return this.each(function() {

				jQuery(this).domManip( args, table, callback );

			});

		}
 
		if ( jQuery.isFunction(value) ) {

			return this.each(function(i) {

				var self = jQuery(this);

				args[0] = value.call( this, i, table ? self.html() : undefined );

				self.domManip( args, table, callback );

			});

		}
 
		if ( this[0] ) {

			results = jQuery.buildFragment( args, this, scripts );

			fragment = results.fragment;

			first = fragment.firstChild;
 
			if ( fragment.childNodes.length === 1 ) {

				fragment = first;

			}
 
			if ( first ) {

				table = table && jQuery.nodeName( first, "tr" );
 
				// Use the original fragment for the last item instead of the first because it can end up

				// being emptied incorrectly in certain situations (#8070).

				// Fragments from the fragment cache must always be cloned and never used in place.

				for ( iNoClone = results.cacheable || l - 1; i < l; i++ ) {

					callback.call(

						table && jQuery.nodeName( this[i], "table" ) ?

							findOrAppend( this[i], "tbody" ) :

							this[i],

						i === iNoClone ?

							fragment :

							jQuery.clone( fragment, true, true )

					);

				}

			}
 
			// Fix #11809: Avoid leaking memory

			fragment = first = null;
 
			if ( scripts.length ) {

				jQuery.each( scripts, function( i, elem ) {

					if ( elem.src ) {

						if ( jQuery.ajax ) {

							jQuery.ajax({

								url: elem.src,

								type: "GET",

								dataType: "script",

								async: false,

								global: false,

								"throws": true

							});

						} else {

							jQuery.error("no ajax");

						}

					} else {

						jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "" ) );

					}
 
					if ( elem.parentNode ) {

						elem.parentNode.removeChild( elem );

					}

				});

			}

		}
 
		return this;

	}

});
 
}
