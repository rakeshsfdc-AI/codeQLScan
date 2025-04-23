function(a){
var ka=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi;
 return a.replace(ka, "<$1></$2>")
}
