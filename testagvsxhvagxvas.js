 function(e) {
            var t;
            if (!e.document || !e.document.implementation) throw f("noinert", "Can't create an inert html document");
            t = e.document.implementation.createHTMLDocument("inert");
            var n = t.documentElement || t.getDocumentElement(),
                r = n.getElementsByTagName("body");
            if (1 === r.length) c = r[0];
            else {
                var i = t.createElement("html");
                c = t.createElement("body"), i.appendChild(c), t.appendChild(i)
            }
        }
