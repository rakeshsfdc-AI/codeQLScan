(function(a, c) {
  var b = 0; // Define the missing variable b
  var d = a.offsetHeight;
  var f = a.nodeName.toLowerCase() === "tr"; 
  return b === 0 && d === 0 && !f ? true : b > 0 && d > 0 && !f ? false : c.curCSS(a, "display") === "none";
});

c.expr.filters.visible = function(a) {
  return !c.expr.filters.hidden(a);
};

var sb = J(),
  tb = /<script(.|\s)*?<\/script>/gi,
  ub = /select|textarea/i,
  vb = /color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,
  N = /=\?(&|$)/,
  ka = /\?/,
  wb = /(\?|&)_=.*?(&|$)/,
  xb = /^(\w+:)?\/\/([^\/?#]+)/,
  yb = /%20/g;

var zb = c.fn.load;

c.fn.extend({
  load: function(a, b, d) {
    if (typeof a !== "string") return zb.call(this, a);
    else if (!this.length) return this;

    var f = a.indexOf(" ");
    if (f >= 0) {
      var e = a.slice(f, a.length);
      a = a.slice(0, f);
    }
    f = "GET";
    if (b) {
      if (c.isFunction(b)) {
        d = b;
        b = null;
      } else if (typeof b === "object") {
        b = c.param(b, c.ajaxSettings.traditional);
        f = "POST";
      }
    }

    var j = this;
    c.ajax({
      url: a,
      type: f,
      dataType: "html",
      data: b,
      complete: function(i, o) {
        if (o === "success" || o === "notmodified")
          j.html(e ? c("<div />").append(i.responseText.replace(tb, "")).find(e) : i.responseText);
        d && j.each(d, [i.responseText, o, i]);
      }
    });
    return this;
  }
});
