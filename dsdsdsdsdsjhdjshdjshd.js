function() {
            define(["../declare", "../typescript", "../JSONSupport", "dojo/_base/lang"], function(a, h, m, n) {
                function g(a, f) {
                    if (!a) return f;
                    if (!f) return a;
                    for (var e in f) {
                        var d = a[e],
                            c = f[e];
                        Array.isArray(c) && Array.isArray(d) ? a[e] = d.concat(c) :
                            a[e] = "object" === typeof c && "object" === typeof d ? g(d, c) : c
                    }
                    return a
                }
                return {
                    subclass: function(k, f) {
                        return function(e) {
                            e = h.declareDefinition(e, k);
                            d && (e.instanceMembers.properties = g(d, e.instanceMembers.properties));
                            var d = e.instanceMembers.properties;
                            if (d)
                                for (var c in d) {
                                    var b = d[c];
                                    b && (!b.reader && b.type) && (b.type === Date ? b.reader = function(a) {
                                        return null != a ? new Date(a) : null
                                    } : -1 !== b.type._meta.bases.indexOf(m) && (b.reader = function(a) {
                                        return function(b) {
                                            return a.fromJSON(b)
                                        }
                                    }(b.type)))
                                }
                            return n.mixin(a(e.bases,
                                e.instanceMembers), e.classMembers)
                        }
                    },
                    shared: h.shared,
                    property: function(a) {
                        return function(f, e) {
                            var d = Object.getPrototypeOf(f),
                                d = d && d.properties;
                            if (!f.properties || f.properties === d) f.properties = {};
                            f.properties = f.properties || {};
                            f.properties[e] = a || {}
                        }
                    }
                }
            })
        }
