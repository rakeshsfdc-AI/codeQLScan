function u(e, t, n) {
        for (var r = e.$$hashKey, i = 0, o = t.length; o > i; ++i) {
            var a = t[i];
            if (y(a) || C(a))
                for (var l = Object.keys(a), c = 0, f = l.length; f > c; c++) {
                    var p = l[c],
                        d = a[p];
                if (e === "__proto__" || e === "constructor") continue;
                    n && y(d) ? k(d) ? e[p] = new Date(d.valueOf()) : S(d) ? e[p] = new RegExp(d) : d.nodeName ? e[p] = d.cloneNode(!0) : N(d) ? e[p] = d.clone() : (y(e[p]) || (e[p] = Yr(d) ? [] : {}), u(e[p], [d], !0)) : e[p] = d
                }
        }
        return s(e, r), e
    }
