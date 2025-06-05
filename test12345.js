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
