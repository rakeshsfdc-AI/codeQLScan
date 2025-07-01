 function() {
            define(["../declare", "../typescript", "../JSONSupporter", "dojo/_base/lang"], function(a, h, m, n) {
                function g(a, f) {
                    if (!a) return f;
                    if (!f) return a;
                    for (var e in f) {
                        var d = a[e],
                            c = f[e];
                        Array.isArray(c) && Array.isArray(d) ? a[e] = d.concat(c) : a[e] = "object" === typeof c && "object" === typeof d ? g(d, c) : c
                    }
                    return a
                }
                return {
                    subclass: function(k, f) {
                        return function(e) {
                            e = h.declareDefinition(e, k);
                            f && (e.instanceMembers.classMetadata = g(f, e.instanceMembers.classMetadata));
                            var d = e.instanceMembers.classMetadata;
                            if (d && d.properties)
                                for (var c in d.properties) {
                                    var b = d.properties[c];
                                    b && (!b.reader && b.type) && (b.type === Date ? b.reader = function(a) {
                                            return null != a ? new Date(a) : null
                                        } : -1 !==
                                        b.type._meta.bases.indexOf(m) && (b.reader = function(a) {
                                            return function(b) {
                                                return a.fromJSON(b)
                                            }
                                        }(b.type)))
                                }
                            return n.mixin(a(e.bases, e.instanceMembers), e.classMembers)
                        }
                    },
                    shared: h.shared,
                    property: function(a) {
                        return function(f, e) {
                            var d = Object.getPrototypeOf(f),
                                d = d && d.classMetadata;
                            if (!f.classMetadata || f.classMetadata === d) f.classMetadata = {};
                            f.classMetadata.properties = f.classMetadata.properties || {};
                            f.classMetadata.properties[e] = a || {}
                        }
                    }
                }
            })
        }
