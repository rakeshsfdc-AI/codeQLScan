(function(c) {
    c.ui = c.ui || {};
    var m = /left|center|right/,
        n = /top|center|bottom/,
        p = c.fn.position,
        q = c.fn.offset;
    c.fn.position = function(a) {
        if (!a || !a.of) return p.apply(this, arguments);
        a = c.extend({}, a);
        var b = c(a.of),
            d = (a.collision || "flip").split(" "),
            e = a.offset ? a.offset.split(" ") : [0, 0],
            g, h, i;
        if (a.of.nodeType === 9) {
            g = b.width();
            h = b.height();
            i = {
                top: 0,
                left: 0
            }
        } else if (a.of.scrollTo && a.of.document) {
            g = b.width();
            h = b.height();
            i = {
                top: b.scrollTop(),
                left: b.scrollLeft()
            }
        } else if (a.of.preventDefault) {
            a.at = "left top";
            g = h =
                0;
            i = {
                top: a.of.pageY,
                left: a.of.pageX
            }
        } else {
            g = b.outerWidth();
            h = b.outerHeight();
            i = b.offset()
        }
        c.each(["my", "at"], function() {
            var f = (a[this] || "").split(" ");
            if (f.length === 1) f = m.test(f[0]) ? f.concat(["center"]) : n.test(f[0]) ? ["center"].concat(f) : ["center", "center"];
            f[0] = m.test(f[0]) ? f[0] : "center";
            f[1] = n.test(f[1]) ? f[1] : "center";
            a[this] = f
        });
        if (d.length === 1) d[1] = d[0];
        e[0] = parseInt(e[0], 10) || 0;
        if (e.length === 1) e[1] = e[0];
        e[1] = parseInt(e[1], 10) || 0;
        if (a.at[0] === "right") i.left += g;
        else if (a.at[0] === "center") i.left +=
            g / 2;
        if (a.at[1] === "bottom") i.top += h;
        else if (a.at[1] === "center") i.top += h / 2;
        i.left += e[0];
        i.top += e[1];
        return this.each(function() {
            var f = c(this),
                k = f.outerWidth(),
                l = f.outerHeight(),
                j = c.extend({}, i);
            if (a.my[0] === "right") j.left -= k;
            else if (a.my[0] === "center") j.left -= k / 2;
            if (a.my[1] === "bottom") j.top -= l;
            else if (a.my[1] === "center") j.top -= l / 2;
            j.left = parseInt(j.left);
            j.top = parseInt(j.top);
            c.each(["left", "top"], function(o, r) {
                c.ui.position[d[o]] && c.ui.position[d[o]][r](j, {
                    targetWidth: g,
                    targetHeight: h,
                    elemWidth: k,
                    elemHeight: l,
                    offset: e,
                    my: a.my,
                    at: a.at
                })
            });
            c.fn.bgiframe && f.bgiframe();
            f.offset(c.extend(j, {
                using: a.using
            }))
        })
    };
   })(jQuery);
