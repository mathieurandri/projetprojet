(function() {
    var k, p, m, q, n, h, t, u, v = [].indexOf || function(c) {
            for (var b = 0, a = this.length; b < a; b++)
                if (b in this && this[b] === c) return b;
            return -1
        },
        w = {}.hasOwnProperty;
    t = function(c, b) {
        var a, f, g, e, d, r, n, l, k, p, m;
        h({
            cls: "gw-clearer",
            prevSib: b
        });
        a = b.getAttribute("data-user");
        d = b.getAttribute("data-starred");
        d = "string" === typeof d ? JSON.parse(d) : {};
        p = [(a + ".github.com").toLowerCase(), (a + ".github.io").toLowerCase()];
        m = d.sortBy || "starred";
        g = parseInt(d.limit) || Infinity;
        e = 0;
        r = c.sort(function(a, b) {
            return b[m] - a[m]
        });
        k = [];
        a = 0;
        for (f = r.length; a < f; a++)
            if (l = r[a], !(!d.forks && l.fork || (n = l.name.toLowerCase(), 0 <= v.call(p, n))) && l.description) {
                if (e++ === g) break;
                k.push(h({
                    parent: b,
                    cls: "gw-repo-outer",
                    kids: [h({
                        cls: "gw-repo",
                        kids: [h({
                            cls: "gw-title",
                            kids: [h({
                                tag: "ul",
                                cls: "gw-stats",
                                kids: [h({
                                    tag: "li",
                                    text: l.watchers,
                                    cls: "gw-watchers"
                                }), h({
                                    tag: "li",
                                    text: l.forks,
                                    cls: "gw-forks"
                                })]
                            }), h({
                                tag: "a",
                                href: l.html_url,
                                text: l.name,
                                cls: "gw-name"
                            })]
                        }), null != l.language ? h({
                            cls: "gw-lang",
                            text: l.language
                        }) : void 0, h({
                            cls: "gw-repo-desc",
                            text: l.description
                        })]
                    })]
                }))
            }
        return k
    };
    k = [];
    q = function(c, b, a) {
        return n({
            url: c,
            success: function(c) {
                var f, e, d;
                k[a] = k[a].concat(c.data);
                if (d = c.meta.Link)
                    for (c = 0, f = d.length; c < f; c++)
                        if (e = d[c], "next" === e[1].rel) {
                            q(e[0], b, a);
                            return
                        }
                return t(k[a], b)
            }
        })
    };
    p = function(c, b) {
        var a, f, g, e, d, h;
        null == b && (b = {});
        f = {};
        g = c.className.match(p.re);
        if (null != g)
            for (e = 0, h = g.length; e < h; e++) a = g[e], f[a] = !0;
        g = null != (d = b.has) ? d.match(p.re) : void 0;
        if (null != g) {
            d = 0;
            for (e = g.length; d < e; d++)
                if (a = g[d], !f[a]) return !1;
            return !0
        }
        return null
    };
    p.re = /\S+/g;
    m = function(c) {
        var b, a, f, g,
            e;
        null == c && (c = {});
        a = null != (f = c.inside) ? f : document;
        f = null != (b = c.tag) ? b : "*";
        if (null != c.id) return a.getElementById(c.id);
        if ((b = null != c.cls) && "*" === f && null != a.getElementsByClassName) return a.getElementsByClassName(c.cls);
        a = a.getElementsByTagName(f);
        if (b) {
            var d, h, k;
            k = [];
            d = 0;
            for (h = a.length; d < h; d++) b = a[d], p(b, {
                has: c.cls
            }) && k.push(b);
            a = k
        }
        return null == c.multi && (g = f.toLowerCase(), 0 <= v.call(m.uniqueTags, g)) ? null != (e = a[0]) ? e : null : a
    };
    m.uniqueTags = "html body frameset head title base".split(" ");
    u = function(c) {
        return document.createTextNode("" +
            c)
    };
    h = function(c) {
        var b, a, f, g, e, d;
        null == c && (c = {});
        e = document.createElement(null != (b = c.tag) ? b : "div");
        for (f in c)
            if (w.call(c, f)) switch (d = c[f], f) {
                case "tag":
                    continue;
                case "parent":
                    d.appendChild(e);
                    break;
                case "kids":
                    a = 0;
                    for (g = d.length; a < g; a++) b = d[a], null != b && e.appendChild(b);
                    break;
                case "prevSib":
                    d.parentNode.insertBefore(e, d.nextSibling);
                    break;
                case "text":
                    e.appendChild(u(d));
                    break;
                case "cls":
                    e.className = d;
                    break;
                default:
                    e[f] = d
            }
            return e
    };
    n = function(c) {
        var b, a, f;
        b = null != (a = c.callback) ? a : "_JSONPCallback_" +
            n.callbackNum++;
        a = c.url.replace("<cb>", b);
        window[b] = null != (f = c.success) ? f : n.noop;
        return h({
            tag: "script",
            src: a,
            parent: m({
                tag: "head"
            })
        })
    };
    n.callbackNum = 0;
    n.noop = function() {};
    (function() {
        var c, b, a, f, g, e;
        g = m({
            tag: "div",
            cls: "github-widget"
        });
        e = [];
        b = a = 0;
        for (f = g.length; a < f; b = ++a) c = g[b], e.push(function(a, b) {
            k.push([]);
            return q("https://api.github.com/users/" + a.getAttribute("data-user") + "/starred?callback=<cb>", a, b)
            
        }(c, b));
        return e
    })()
}).call(this);
