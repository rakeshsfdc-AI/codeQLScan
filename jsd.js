  function _e(e, t) {
        var n, i, o, a, s = t.createDocumentFragment(),
            u = [];
        if (xe(e)) u.push(t.createTextNode(e));
        else {
            for (n = n || s.appendChild(t.createElement("div")), i = (yi.exec(e) || ["", ""])[1].toLowerCase(), o = wi[i] || wi._default, n.innerHTML = o[1] + e.replace(bi, "<$1></$2>") + o[2], a = o[0]; a--;) n = n.lastChild;
            u = L(u, n.childNodes), n = s.firstChild, n.textContent = ""
        }
        return s.textContent = "", s.innerHTML = "", r(u, function(e) {
            s.appendChild(e)
        }), s
    }
