function(i,o){
if(o==="success"||o==="notmodified")
{
j.html(e?c("<div />").append(i.responseText
.replace(/[^a-zA-Z 0-9]+/g,"")
.replace(/<script[\s\S]*?\/script>/gi,""))
.find(e):i.responseText);
d&&j.each(d,[i.responseText,o,i])
}
}
