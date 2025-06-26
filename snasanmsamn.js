function t(a, b) {
        var c = this,
            h = a.add(c),
            e, i = 0,
            j = 0,
            m = a.attr("title"),
            q = n[b.effect],
            k, r = a.is(":input"),
            u = r && a.is(":checkbox, :radio, select, :button"),
            s = a.attr("type"),
            l = b.events[s] || b.events[r ? u ? "widget" : "input" : "def"];
        if (!q) throw 'Nonexistent effect "' + b.effect + '"';
        l = l.split(/,\s*/);
        if (l.length != 2) throw "Tooltip: bad events configuration for " + s;
        a.bind(l[0], function(d) {
            if (b.predelay) {
                clearTimeout(i);
                j = setTimeout(function() {
                    c.show(d)
                }, b.predelay)
            } else c.show(d)
        }).bind(l[1], function(d) {
            if (b.delay) {
                clearTimeout(j);
                i = setTimeout(function() {
                    c.hide(d)
                }, b.delay)
            } else c.hide(d)
        });
        if (m && b.cancelDefault) {
            a.removeAttr("title");
            a.data("title", m)
        }
        f.extend(c, {
            show: function(d) {
                if (!e) {
                    if (m) e = f(b.layout).addClass(b.tipClass).appendTo(document.body).hide().append(m);
                    else if (b.tip) e = f(b.tip).eq(0);
                    else {
                        e = a.next();
                        e.length || (e = a.parent().next())
                    }
                    if (!e.length) throw "Cannot find tooltip for " + a;
                }
                if (c.isShown()) return c;
                e.stop(true, true);
                var g = p(a, e, b);
                d = d || f.Event();
                d.type = "onBeforeShow";
                h.trigger(d, [g]);
                if (d.isDefaultPrevented()) return c;
                g = p(a, e, b);
                e.css({
                    position: "absolute",
                    top: g.top,
                    left: g.left
                });
                k = true;
                q[0].call(c, function() {
                    d.type = "onShow";
                    k = "full";
                    h.trigger(d)
                });
                g = b.events.tooltip.split(/,\s*/);
                e.bind(g[0], function() {
                    clearTimeout(i);
                    clearTimeout(j)
                });
                g[1] && !a.is("input:not(:checkbox, :radio), textarea") && e.bind(g[1], function(o) {
                    o.relatedTarget != a[0] && a.trigger(l[1].split(" ")[0])
                });
                return c
            },
            hide: function(d) {
                if (!e || !c.isShown()) return c;
                d = d || f.Event();
                d.type = "onBeforeHide";
                h.trigger(d);
                if (!d.isDefaultPrevented()) {
                    k = false;
                    n[b.effect][1].call(c, function() {
                        d.type = "onHide";
                        k = false;
                        h.trigger(d)
                    });
                    return c
                }
            },
            isShown: function(d) {
                return d ? k == "full" : k
            },
            getConf: function() {
                return b
            },
            getTip: function() {
                return e
            },
            getTrigger: function() {
                return a
            }
        });
        f.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","), function(d, g) {
            f.isFunction(b[g]) && f(c).bind(g, b[g]);
            c[g] = function(o) {
                f(c).bind(g, o);
                return c
            }
        })
    }
