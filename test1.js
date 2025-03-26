function f(e,n){
var r,i=g(e);
  v.push("<a ");
  for(r in i)
    v.push(r+'="'+i[r]+'" ');
  !t.isDefined(u)||"target"in i||v.push('target="',u,'" '),
    v.push('href="',e.replace(/"/g,"&quot;"),'">'),c(n),v.push("</a>")}
