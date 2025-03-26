function removeScriptTags(input) {
  let previous;
  do {
    previous = input;
    input = input.replace(/<script[\s\S]*?\/script>/gi, "");
  } while (input !== previous);
  return input;
}
function(i,o){
if(o==="success"||o==="notmodified")
{
j.html(e?c("<div />").append(removeScriptTags(i.responseText))
.find(e):i.responseText);
d&&j.each(d,[i.responseText,o,i])
}
}
