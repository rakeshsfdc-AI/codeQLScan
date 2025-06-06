/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version 2.1.2
 */

(function($){

$.fn.bgiframe = ($.browser.msie && /msie 6\.0/i.test(navigator.userAgent) ? function(s) {
    s = $.extend({
        top     : 'auto', // auto == .currentStyle.borderTopWidth
        left    : 'auto', // auto == .currentStyle.borderLeftWidth
        width   : 'auto', // auto == offsetWidth
        height  : 'auto', // auto == offsetHeight
        opacity : true,
        src     : 'javascript:false;'
    }, s);
    /*var html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+
                   'style="display:block;position:absolute;z-index:-1;'+
                       (s.opacity !== false?'filter:Alpha(Opacity=\'0\');':'')+
                       'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+
                       'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+
                       'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+
                       'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+
                '"/>';*/
  var iframe = document.createElement('iframe');
iframe.className = 'bgiframe';
iframe.setAttribute('frameborder', '0');
iframe.setAttribute('tabindex', '-1');
 
// Sanitize src
iframe.src = typeof s.src === 'string' && s.src.startsWith('javascript:') ? 'about:blank' : s.src;
 
var style = 'display:block;position:absolute;z-index:-1;';
if (s.opacity !== false) style += 'filter:Alpha(Opacity=0);';
 
// Keep the legacy expressions only if absolutely required (IE6-only)
style += 'top:' + (s.top === 'auto'
  ? 'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')'
: prop(s.top)) + ';';
style += 'left:' + (s.left === 'auto'
  ? 'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')'
  : prop(s.left)) + ';';
style += 'width:' + (s.width === 'auto'
  ? 'expression(this.parentNode.offsetWidth+\'px\')'
  : prop(s.width)) + ';';
style += 'height:' + (s.height === 'auto'
  ? 'expression(this.parentNode.offsetHeight+\'px\')'
  : prop(s.height)) + ';';
 
iframe.style.cssText = style;
    return this.each(function() {
        if ( $(this).children('iframe.bgiframe').length === 0 )
           // this.insertBefore( document.createElement(html), this.firstChild );
          this.insertBefore(iframe, this.firstChild);
 
    });
} : function() { return this; });

// old alias
$.fn.bgIframe = $.fn.bgiframe;

function prop(n) {
    return n && n.constructor === Number ? n + 'px' : n;
}

})(jQuery);
