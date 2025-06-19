/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version 2.1.2
 */

(function($) {

    $.fn.bgiframe = ($.browser.msie && /msie 6\.0/i.test(navigator.userAgent) ? function(s) {
        s = $.extend({
            top: 'auto', // auto == .currentStyle.borderTopWidth
            left: 'auto', // auto == .currentStyle.borderLeftWidth
            width: 'auto', // auto == offsetWidth
            height: 'auto', // auto == offsetHeight
            opacity: true,
            src: 'javascript:false;'
        }, s);
       /* var html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' + s.src + '"' +
            'style="display:block;position:absolute;z-index:-1;' +
            (s.opacity !== false ? 'filter:Alpha(Opacity=\'0\');' : '') +
            'top:' + (s.top == 'auto' ? 'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')' : prop(s.top)) + ';' +
            'left:' + (s.left == 'auto' ? 'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')' : prop(s.left)) + ';' +
            'width:' + (s.width == 'auto' ? 'expression(this.parentNode.offsetWidth+\'px\')' : prop(s.width)) + ';' +
            'height:' + (s.height == 'auto' ? 'expression(this.parentNode.offsetHeight+\'px\')' : prop(s.height)) + ';' +
            '"/>';*/
       function safeCssValue(value, fallback = '0px') {
  // Only allow digits with optional px or % units
  return (typeof value === 'string' && /^[\d.]+(px|%)?$/.test(value)) ? value : fallback;
}
 
function createSafeIframe(s, parentElement) {
  var iframe = document.createElement('iframe');
  iframe.className = 'bgiframe';
  iframe.frameBorder = '0';
  iframe.tabIndex = -1;
 
  // Safely encode the src
  iframe.src = encodeURI(s.src || '');
 
  // Apply safe styles
  var style = iframe.style;
  style.display = 'block';
  style.position = 'absolute';
  style.zIndex = '-1';
 
  // Use modern opacity instead of IE's Alpha filter
  if (s.opacity !== false) {
    style.opacity = '0';
  }
 
  // Replace all expression(...) usage with defaults or safe values
  style.top = (s.top === 'auto') ? '0px' : safeCssValue(s.top);
  style.left = (s.left === 'auto') ? '0px' : safeCssValue(s.left);
  style.width = (s.width === 'auto') ? '100%' : safeCssValue(s.width);
  style.height = (s.height === 'auto') ? '100%' : safeCssValue(s.height);
 
  // Append to given parent
  parentElement.appendChild(iframe);
}
 
        return this.each(function() {
            if ($(this).children('iframe.bgiframe').length === 0)
                this.insertBefore(document.createElement(html), this.firstChild);
        });
    } : function() {
        return this;
    });

    // old alias
    $.fn.bgIframe = $.fn.bgiframe;

    function prop(n) {
        return n && n.constructor === Number ? n + 'px' : n;
    }

})(jQuery);
