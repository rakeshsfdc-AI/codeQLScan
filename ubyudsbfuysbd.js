function(d) {
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
            }
