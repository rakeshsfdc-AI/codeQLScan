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
  /*  var html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+
                   'style="display:block;position:absolute;z-index:-1;'+
                       (s.opacity !== false?'filter:Alpha(Opacity=\'0\');':'')+
                       'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+
                       'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+
                       'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+
                       'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+
                '"/>';
    return this.each(function() {
        if ( $(this).children('iframe.bgiframe').length === 0 )
            this.insertBefore( document.createElement(html), this.firstChild );
*/
 return this.each(function() {
            if ($(this).children('iframe.bgiframe').length === 0) {

                // Construct iframe using DOM API instead of unsafe HTML string
                var iframe = document.createElement('iframe');
                iframe.className = 'bgiframe';
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('tabindex', '-1');
                iframe.setAttribute('src', encodeURI(s.src));

                var styleStr = 'display:block;position:absolute;z-index:-1;';
                if (s.opacity !== false) {
                    styleStr += 'opacity:0;'; // modern replacement for Alpha filter
                }

                // Replace unsafe `expression(...)` with default safe values
                styleStr += 'top:' + (s.top == 'auto' ? '0px' : prop(s.top)) + ';';
                styleStr += 'left:' + (s.left == 'auto' ? '0px' : prop(s.left)) + ';';
                styleStr += 'width:' + (s.width == 'auto' ? '100%' : prop(s.width)) + ';';
                styleStr += 'height:' + (s.height == 'auto' ? '100%' : prop(s.height)) + ';';

                iframe.setAttribute('style', styleStr);

                this.insertBefore(iframe, this.firstChild);
            }
    });
} : function() { return this; });

// old alias
$.fn.bgIframe = $.fn.bgiframe;

function prop(n) {
    return n && n.constructor === Number ? n + 'px' : n;
}

})(jQuery);
