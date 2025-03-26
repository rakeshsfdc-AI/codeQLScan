function parseRoute(url) {
    var ret = {
      regexp: url
    },
    keys = ret.keys = [];
 
    if (!url || !angular.isString(url)) return ret;
 
    url = url
      .replace(/([().])/g, '\\$1')
      .replace(/(\/)?:(\w+)([\?\*])?/g, function(_, slash, key, option) {
        var optional = option === '?' ? option : null;
        var star = option === '*' ? option : null;
});
}
