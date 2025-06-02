function(e, t, n, r) {

var et = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;
            var i, o, s, a, u, l, c = 0,

                f = e.length,

                p = t.createDocumentFragment(),

                h = [];

            for (; f > c; c++)

                if (i = e[c], i || 0 === i)

                    if ("object" === x.type(i)) x.merge(h, i.nodeType ? [i] : i);

                    else if (nt.test(i)) {

                o = o || p.appendChild(t.createElement("div")), s = (tt.exec(i) || ["", ""])[1].toLowerCase(), a = lt[s] || lt._default, o.innerHTML = a[1] + i.replace(et, "<$1></$2>") + a[2], l = a[0];

                while (l--) o = o.firstChild;

                x.merge(h, o.childNodes), o = p.firstChild, o.textContent = ""

            } else h.push(t.createTextNode(i));

            p.textContent = "", c = 0;

            while (i = h[c++])

                if ((!r || -1 === x.inArray(i, r)) && (u = x.contains(i.ownerDocument, i), o = gt(p.appendChild(i), "script"), u && ht(o), n)) {

                    l = 0;

                    while (i = o[l++]) st.test(i.type || "") && n.push(i)

                } return p

        }
 
