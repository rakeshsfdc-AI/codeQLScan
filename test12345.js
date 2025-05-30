function l(e) {
                var n = {
                        regexp: e
                    },
                    r = n.keys = [];
                return e && t.isString(e) ? (e = e.replace(/\\/g, "").replace(/([().])/g, "\\\\").replace(/(\/)?:(\w+)([\?\*])?/g, function(e, t, n, i) {
                    var o = "?" === i ? i : null,
                        a = "*" === i ? i : null;
                    return r.push({
                        name: n,
                        optional: !!o
                    }), t = t || "", "" + (o ? "" : t) + "(?:" + (o ? t : "") + (a && "(.+?)" || "([^/]+)") + (o || "") + ")" + (o || "")
                }).replace(/\\/g, "").replace(/([\/$\*])/g, "\\$1"), n.regexp = new RegExp("^" + e, "i"), n) : n
            }
