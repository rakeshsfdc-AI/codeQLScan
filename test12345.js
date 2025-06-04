function(e) {
            var n = /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,
                i = /^mailto:/i,
                o = t.$$minErr("linky"),
                a = t.isString;
            return function(s, u, l) {
                function c(e) {
                    e && v.push(r(e))
                }

                function f(e, n) {
                    var r, i = g(e);
                    v.push("<a ");
                    for (r in i) v.push(r + '="' + i[r] + '" ');
                    !t.isDefined(u) || "target" in i || v.push('target="', u, '" '), v.push('href="', e.replace(/\\/g, "").replace(/"/g, "\""), '">'), c(n), v.push("</a>")
                }
                if (null == s || "" === s) return s;
                if (!a(s)) throw o("notstring", "Expected string but received: {0}", s);
                for (var p, d, h, g = t.isFunction(l) ? l : t.isObject(l) ? function() {
                        return l
                    } : function() {
                        return {}
                    }, m = s, v = []; p = m.match(n);) d = p[0], p[2] || p[4] || (d = (p[3] ? "http://" : "mailto:") + d), h = p.index, c(m.substr(0, h)), f(d, p[0].replace(i, "")), m = m.substring(h + p[0].length);
                return c(m), e(v.join(""))
            }
        }
