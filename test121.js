;(function() {
/*jshint eqeqeq:false curly:false latedef:false */
"use strict";
 
	function setup($) {
		$.fn._fadeIn = $.fn.fadeIn;
 
		var noOp = $.noop || function() {};
 
		// this bit is to ensure we don't call setExpression when we shouldn't (with extra muscle to handle
		// retarded userAgent strings on Vista)
		var msie = /MSIE/.test(navigator.userAgent);
		var ie6  = /MSIE 6.0/.test(navigator.userAgent) && ! /MSIE 8.0/.test(navigator.userAgent);
		var mode = document.documentMode || 0;
		// var setExpr = msie && (($.browser.version < 8 && !mode) || mode < 8);
		var setExpr = $.isFunction( document.createElement('div').style.setExpression );
 
		// global $ methods for blocking/unblocking the entire page
		$.blockUI   = function(opts) { install(window, opts); };
		$.unblockUI = function(opts) { remove(window, opts); };
 
		// convenience method for quick growl-like notifications  (http://www.google.com/search?q=growl)
		$.growlUI = function(title, message, timeout, onClose) {
			var $m = $('<div class="growlUI"></div>');
			if (title) $m.append('<h1>'+title+'</h1>');
			if (message) $m.append('<h2>'+message+'</h2>');
			if (timeout === undefined) timeout = 3000;
			$.blockUI({
				message: $m, fadeIn: 700, fadeOut: 1000, centerY: false,
				timeout: timeout, showOverlay: false,
				onUnblock: onClose,
				css: $.blockUI.defaults.growlCSS
			});
		};
 
		// plugin method for blocking element content
		$.fn.block = function(opts) {
			var fullOpts = $.extend({}, $.blockUI.defaults, opts || {});
			this.each(function() {
				var $el = $(this);
				if (fullOpts.ignoreIfBlocked && $el.data('blockUI.isBlocked'))
					return;
				$el.unblock({ fadeOut: 0 });
			});
 
			return this.each(function() {
				if ($.css(this,'position') == 'static') {
					this.style.position = 'relative';
					$(this).data('blockUI.static', true);
				}
				this.style.zoom = 1; // force 'hasLayout' in ie
				install(this, opts);
			});
		};
 
		// plugin method for unblocking element content
		$.fn.unblock = function(opts) {
			return this.each(function() {
				remove(this, opts);
			});
		};
 
		$.blockUI.version = 2.57; // 2nd generation blocking at no extra cost!
 
		// override these in your code to change the default behavior and style
		$.blockUI.defaults = {
			// message displayed when blocking (use null for no message)
			message:  '<h1>Please wait...</h1>',
 
			title: null,		// title string; only used when theme == true
			draggable: true,	// only used when theme == true (requires jquery-ui.js to be loaded)
 
			theme: false, // set to true to use with jQuery UI themes
 
			// styles for the message when blocking; if you wish to disable
			// these and use an external stylesheet then do this in your code:
			// $.blockUI.defaults.css = {};
			css: {
				padding:	0,
				margin:		0,
				width:		'30%',
				top:		'40%',
				left:		'35%',
				textAlign:	'center',
				color:		'#000',
				border:		'3px solid #aaa',
				backgroundColor:'#fff',
				cursor:		'wait'
			},
 
			// minimal style set used when themes are used
			themedCSS: {
				width:	'30%',
				top:	'40%',
				left:	'35%'
			},
 
			// styles for the overlay
			overlayCSS:  {
				backgroundColor:	'#000',
				opacity:			0.6,
				cursor:				'wait'
			},
 
			// style to replace wait cursor before unblocking to correct issue
			// of lingering wait cursor
			cursorReset: 'default',
 
			// styles applied when using $.growlUI
			growlCSS: {
				width:		'350px',
				top:		'10px',
				left:		'',
				right:		'10px',
				border:		'none',
				padding:	'5px',
				opacity:	0.6,
				cursor:		'default',
				color:		'#fff',
				backgroundColor: '#000',
				'-webkit-border-radius':'10px',
				'-moz-border-radius':	'10px',
				'border-radius':		'10px'
			},
 
			// IE issues: 'about:blank' fails on HTTPS and javascript:false is s-l-o-w
			// (hat tip to Jorge H. N. de Vasconcelos)
			/*jshint scripturl:true */
			iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank',
 
			// force usage of iframe in non-IE browsers (handy for blocking applets)
			forceIframe: false,
 
			// z-index for the blocking overlay
			baseZ: 1000,
 
			// set these to true to have the message automatically centered
			centerX: true, // <-- only effects element blocking (page block controlled via css above)
			centerY: true,
 
			// allow body element to be stetched in ie6; this makes blocking look better
			// on "short" pages.  disable if you wish to prevent changes to the body height
			allowBodyStretch: true,
 
			// enable if you want key and mouse events to be disabled for content that is blocked
			bindEvents: true,
 
			// be default blockUI will supress tab navigation from leaving blocking content
			// (if bindEvents is true)
			constrainTabKey: true,
 
			// fadeIn time in millis; set to 0 to disable fadeIn on block
			fadeIn:  200,
 
			// fadeOut time in millis; set to 0 to disable fadeOut on unblock
			fadeOut:  400,
 
			// time in millis to wait before auto-unblocking; set to 0 to disable auto-unblock
			timeout: 0,
 
			// disable if you don't want to show the overlay
			showOverlay: true,
 
			// if true, focus will be placed in the first available input field when
			// page blocking
			focusInput: true,
 
			// suppresses the use of overlay styles on FF/Linux (due to performance issues with opacity)
			// no longer needed in 2012
			// applyPlatformOpacityRules: true,
 
			// callback method invoked when fadeIn has completed and blocking message is visible
			onBlock: null,
 
			// callback method invoked when unblocking has completed; the callback is
			// passed the element that has been unblocked (which is the window object for page
			// blocks) and the options that were passed to the unblock call:
			//	onUnblock(element, options)
			onUnblock: null,
 
			// callback method invoked when the overlay area is clicked.
			// setting this will turn the cursor to a pointer, otherwise cursor defined in overlayCss will be used.
			onOverlayClick: null,
 
			// don't ask; if you really must know: http://groups.google.com/group/jquery-en/browse_thread/thread/36640a8730503595/2f6a79a77a78e493#2f6a79a77a78e493
			quirksmodeOffsetHack: 4,
 
			// class name of the message block
			blockMsgClass: 'blockMsg',
 
			// if it is already blocked, then ignore it (don't unblock and reblock)
			ignoreIfBlocked: false
		};
 
		// private data and functions follow...
 
		var pageBlock = null;
		var pageBlockEls = [];
        function sanitizeClassName(className){
			return className.replace(/[^a-zA-Z0-9-_]/g,'');
		}
		function escapeHtml(str){
			return String(str).replace(/[&<>"'`=\/]/g,function(s){
				return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','`':'&#x60','=':'&#x30;','/':'&#x2f;'})[s];
			});
		}
		function install(el, opts) {
			var css, themedCSS;
			var full = (el == window);
			var msg = (opts && opts.message !== undefined ? opts.message : undefined);
			opts = $.extend({}, $.blockUI.defaults, opts || {});
 
			if (opts.ignoreIfBlocked && $(el).data('blockUI.isBlocked'))
				return;
 
			opts.overlayCSS = $.extend({}, $.blockUI.defaults.overlayCSS, opts.overlayCSS || {});
			css = $.extend({}, $.blockUI.defaults.css, opts.css || {});
			if (opts.onOverlayClick)
				opts.overlayCSS.cursor = 'pointer';
 
			themedCSS = $.extend({}, $.blockUI.defaults.themedCSS, opts.themedCSS || {});
			msg = msg === undefined ? opts.message : msg;
 
			// remove the current block (if there is one)
			if (full && pageBlock)
				remove(window, {fadeOut:0});
 
			// if an existing element is being used as the blocking content then we capture
			// its current place in the DOM (and current display style) so we can restore
			// it when we unblock
			if (msg && typeof msg != 'string' && (msg.parentNode || msg.jquery)) {
				var node = msg.jquery ? msg[0] : msg;
				var data = {};
				$(el).data('blockUI.history', data);
				data.el = node;
				data.parent = node.parentNode;
				data.display = node.style.display;
				data.position = node.style.position;
				if (data.parent)
					data.parent.removeChild(node);
			}
 
			$(el).data('blockUI.onUnblock', opts.onUnblock);
			var z = opts.baseZ;
 
			// blockUI uses 3 layers for blocking, for simplicity they are all used on every platform;
			// layer1 is the iframe layer which is used to supress bleed through of underlying content
			// layer2 is the overlay layer which has opacity and a wait cursor (by default)
			// layer3 is the message content that is displayed while blocking
			var lyr1, lyr2, lyr3, s;
			if (msie || opts.forceIframe)
				lyr1 = $('<iframe class="blockUI" style="z-index:'+ (z++) +';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+opts.iframeSrc+'"></iframe>');
			else
				lyr1 = $('<div class="blockUI" style="display:none"></div>');
 
