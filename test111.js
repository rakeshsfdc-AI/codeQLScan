var ka=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi;
function(a){
return a.replace(ka, "<$1></$2>")
}
