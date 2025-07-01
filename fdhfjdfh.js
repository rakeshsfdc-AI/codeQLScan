function() {
            define("exports ../errors/RequestError ../errors/CancelError ../Deferred ../io-query ../_base/array ../_base/lang ../promise/Promise".split(" "),
                function(a, h, m, n, g, k, f, e) {
                    function d(a) {
                        return b(a)
                    }

                    function c(a) {
                        return a.data || a.text
                    }
                    a.deepCopy = function(b, c) {
                        for (var e in c) {
                            var d = b[e],
                                f = c[e];
                            d !== f && (d && "object" === typeof d && f && "object" === typeof f ? a.deepCopy(d, f) : b[e] = f)
                        }
                        return b
                    };
                    a.deepCreate = function(b, c) {
                        c = c || {};
                        var e = f.delegate(b),
                            d, g;
                        for (d in b)(g = b[d]) && "object" === typeof g && (e[d] = a.deepCreate(g, c[d]));
                        return a.deepCopy(e, c)
                    };
                    var b = Object.freeze || function(a) {
                        return a
                    };
                    a.deferred = function(p, q, g, k, r, s) {
                        var x = new n(function(a) {
                            q && q(x, p);
                            return !a ||
                                !(a instanceof h) && !(a instanceof m) ? new m("Request canceled", p) : a
                        });
                        x.response = p;
                        x.isValid = g;
                        x.isReady = k;
                        x.handleResponse = r;
                        g = x.then(d).otherwise(function(a) {
                            a.response = p;
                            throw a;
                        });
                        a.notify && g.then(f.hitch(a.notify, "emit", "load"), f.hitch(a.notify, "emit", "error"));
                        k = g.then(c);
                        r = new e;
                        for (var v in k) k.hasOwnProperty(v) && (r[v] = k[v]);
                        r.response = g;
                        b(r);
                        s && x.then(function(a) {
                            s.call(x, a)
                        }, function(a) {
                            s.call(x, p, a)
                        });
                        x.promise = r;
                        x.then = r.then;
                        return x
                    };
                    a.addCommonMethods = function(a, b) {
                        k.forEach(b || ["GET",
                            "POST", "PUT", "DELETE"
                        ], function(b) {
                            a[("DELETE" === b ? "DEL" : b).toLowerCase()] = function(c, e) {
                                e = f.delegate(e || {});
                                e.method = b;
                                return a(c, e)
                            }
                        })
                    };
                    a.parseArgs = function(a, b, c) {
                        var e = b.data,
                            d = b.query;
                        e && !c && "object" === typeof e && (b.data = g.objectToQuery(e));
                        d ? ("object" === typeof d && (d = g.objectToQuery(d)), b.preventCache && (d += (d ? "\x26" : "") + "request.preventCache\x3d" + +new Date)) : b.preventCache && (d = "request.preventCache\x3d" + +new Date);
                        a && d && (a += (~a.indexOf("?") ? "\x26" : "?") + d);
                        return {
                            url: a,
                            options: b,
                            getHeader: function(a) {
                                return null
                            }
                        }
                    };
                    a.checkStatus = function(a) {
                        a = a || 0;
                        return 200 <= a && 300 > a || 304 === a || 1223 === a || !a
                    }
                })
        }
