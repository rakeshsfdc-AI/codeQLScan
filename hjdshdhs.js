function() {
    var et = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        tt = /<([\w:]+)/,
        nt = /<|&#?\w+;/,
        rt = /<(?:script|style|link)/i,
        it = /^(?:checkbox|radio)$/i,
        ot = /checked\s*(?:[^=]|=\s*.checked.)/i,
        st = /^$|\/(?:java|ecma)script/i,
        at = /^true\/(.*)/,
        ut = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        lt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    lt.optgroup = lt.option, lt.tbody = lt.tfoot = lt.colgroup = lt.caption = lt.col = lt.thead, lt.th = lt.td, x.fn.extend({
        text: function(e) {
            return x.access(this, function(e) {
                return e === undefined ? x.text(this) : this.empty().append((this[0] && this[0].ownerDocument || o).createTextNode(e))
            }, null, e, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = ct(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = ct(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function(e, t) {
            var n, r = e ? x.filter(e, this) : this,
                i = 0;
            for (; null != (n = r[i]); i++) t || 1 !== n.nodeType || x.cleanData(gt(n)), n.parentNode && (t && x.contains(n.ownerDocument, n) && ht(gt(n, "script")), n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            var e, t = 0;
            for (; null != (e = this[t]); t++) 1 === e.nodeType && (x.cleanData(gt(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                return x.clone(this, e, t)
            })
        },
        html: function(e) {
            return x.access(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (e === undefined && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !rt.test(e) && !lt[(tt.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(/<(?!(?:area|br|col|embed|hr|img|input|link|meta|param)\b)([\w:-]+)([^>]*)\/>/gi, "<$1$2></$1>");
                    try {
                        for (; r > n; n++) t = this[n] || {}, 1 === t.nodeType && (x.cleanData(gt(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (i) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = x.map(this, function(e) {
                    return [e.nextSibling, e.parentNode]
                }),
                t = 0;
            return this.domManip(arguments, function(n) {
                var r = e[t++],
                    i = e[t++];
                i && (x(this).remove(), i.insertBefore(n, r))
            }, !0), t ? this : this.remove()
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, t, n) {
            e = p.apply([], e);
            var r, i, o, s, a, u, l = 0,
                c = this.length,
                f = this,
                h = c - 1,
                d = e[0],
                g = x.isFunction(d);
            if (g || !(1 >= c || "string" != typeof d || x.support.checkClone) && ot.test(d)) return this.each(function(r) {
                var i = f.eq(r);
                g && (e[0] = d.call(this, r, i.html())), i.domManip(e, t, n)
            });
            if (c && (r = x.buildFragment(e, this[0].ownerDocument, !1, !n && this), i = r.firstChild, 1 === r.childNodes.length && (r = i), i)) {
                for (o = x.map(gt(r, "script"), ft), s = o.length; c > l; l++) a = r, l !== h && (a = x.clone(a, !0, !0), s && x.merge(o, gt(a, "script"))), t.call(this[l], a, l);
                if (s)
                    for (u = o[o.length - 1].ownerDocument, x.map(o, pt), l = 0; s > l; l++) a = o[l], st.test(a.type || "") && !q.access(a, "globalEval") && x.contains(u, a) && (a.src ? x._evalUrl(a.src) : x.globalEval(a.textContent.replace(ut, "")))
            }
            return this
        }
    }), x.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        x.fn[e] = function(e) {
            var n, r = [],
                i = x(e),
                o = i.length - 1,
                s = 0;
            for (; o >= s; s++) n = s === o ? this : this.clone(!0), x(i[s])[t](n), h.apply(r, n.get());
            return this.pushStack(r)
        }
    }), x.extend({
        clone: function(e, t, n) {
            var r, i, o, s, a = e.cloneNode(!0),
                u = x.contains(e.ownerDocument, e);
            if (!(x.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || x.isXMLDoc(e)))
                for (s = gt(a), o = gt(e), r = 0, i = o.length; i > r; r++) mt(o[r], s[r]);
            if (t)
                if (n)
                    for (o = o || gt(e), s = s || gt(a), r = 0, i = o.length; i > r; r++) dt(o[r], s[r]);
                else dt(e, a);
            return s = gt(a, "script"), s.length > 0 && ht(s, !u && gt(e, "script")), a
        },
        buildFragment: function(e, t, n, r) {
            var i, o, s, a, u, l, c = 0,
                f = e.length,
                p = t.createDocumentFragment(),
                h = [];
            for (; f > c; c++)
                if (i = e[c], i || 0 === i)
                    if ("object" === x.type(i)) x.merge(h, i.nodeType ? [i] : i);
                    else if (nt.test(i)) {
                o = o || p.appendChild(t.createElement("div")), s = (tt.exec(i) || ["", ""])[1].toLowerCase(), a = lt[s] || lt._default, o.innerHTML = a[1] + i.replace((/<(?!(?:area|br|col|embed|hr|img|input|link|meta|param)\b)([\w:-]+)([^>]*)\/>/gi, "<$1$2></$1>")) + a[2], l = a[0];
                while (l--) o = o.firstChild;
                x.merge(h, o.childNodes), o = p.firstChild, o.textContent = ""
            } else h.push(t.createTextNode(i));
            p.textContent = "", c = 0;
            while (i = h[c++])
                if ((!r || -1 === x.inArray(i, r)) && (u = x.contains(i.ownerDocument, i), o = gt(p.appendChild(i), "script"), u && ht(o), n)) {
                    l = 0;
                    while (i = o[l++]) st.test(i.type || "") && n.push(i)
                } return p
        },
        cleanData: function(e) {
            var t, n, r, i = e.length,
                o = 0,
                s = x.event.special;
            for (; i > o; o++) {
                if (n = e[o], x.acceptData(n) && (t = q.access(n)))
                    for (r in t.events) s[r] ? x.event.remove(n, r) : x.removeEvent(n, r, t.handle);
                L.discard(n), q.discard(n)
            }
        },
        _evalUrl: function(e) {
            return x.ajax({
                url: e,
                type: "GET",
                dataType: "text",
                async: !1,
                global: !1,
                success: x.globalEval
            })
        }
    });
}
