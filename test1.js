"string")return zb.call(this,a);else if(!this.length)return this;var f=a.indexOf(" ");if(f>=0){var e=a.slice(f,a.length);a=a.slice(0,f)}f="GET";if(b)if(c.isFunction(b)){d=b;b=null}else if(typeof b==="object"){b=c.param(b,c.ajaxSettings.traditional);f="POST"}
var j=this;c.ajax({
  url:a,type:f,dataType:"html",data:b,complete:function(i,o)
  {function removeScriptTags(input) {
    let previous;
    do {previous = input;input = input.replace(/<script[\s\S]*?\/script>/gi, "");
       } while (input !== previous);
    return input;
  }
   if(o==="success"||o==="notmodified")j.html(e?c("<div />")
                                              .append(removeScriptTags(i.responseText))
                                              .find(e):i.responseText);
   d&&j.each(d,[i.responseText,o,i])}});
return this},
