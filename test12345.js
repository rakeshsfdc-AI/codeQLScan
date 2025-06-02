function(e) {
var Le = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi;
            return e.replace(Le, "<$1></$2>")
        }
