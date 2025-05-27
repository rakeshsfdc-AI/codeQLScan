function(){
var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;
value = value.replace( rxhtmlTag, "<$1></$2>" );
}
