Function test(){
  rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
  elem = elem.replace(rxhtmlTag, "<$1></$2>"); 
}
