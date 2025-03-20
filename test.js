function(i,o){
if(o==="success"||o==="notmodified")j.html(e?c("<div />").append(i.responseText.replace(tb,"").replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "").replace(/<script[\s\S]*?>/gi, "")).find(e):i.responseText.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "").replace(/<script[\s\S]*?>/gi, ""));d&&j.each(d,[i.responseText,o,i])}
