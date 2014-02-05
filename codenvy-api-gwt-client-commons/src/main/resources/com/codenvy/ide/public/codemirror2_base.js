(function () { /*

 Copyright (c) 2012 Marijn Haverbeke

 Licensed under the MIT license:
 http://opensource.org/licenses/mit-license
 */
    var CodeMirror = function () {
        function d(a, b) {
            function f(m) {
                return 0 <= m && m < s.size
            }

            function i(m) {
                var a;
                for (a = s; !a.lines;)for (var j = 0; ; ++j) {
                    var b = a.children[j], i = b.chunkSize();
                    if (m < i) {
                        a = b;
                        break
                    }
                    m -= i
                }
                return a = a.lines[m]
            }

            function p(m, a) {
                Z = !0;
                for (var j = a - m.height, b = m; b; b = b.parent)b.height += j
            }

            function A(m) {
                var a = {line: 0, ch: 0};
                ja(a, {line: s.size - 1, ch: i(s.size - 1).text.length}, Ea(m), a, a);
                ka = !0
            }

            function o() {
                var m = [];
                s.iter(0, s.size, function (a) {
                    m.push(a.text)
                });
                return m.join("\n")
            }

            function t(m) {
                function a(m) {
                    var j =
                        Aa(m, !0);
                    if (j && !H(j, f)) {
                        U || Ba();
                        f = j;
                        la(i, j);
                        ka = !1;
                        var b = Nb();
                        if (j.line >= b.to || j.line < b.from)c = setTimeout(x(function () {
                            a(m)
                        }), 150)
                    }
                }

                function j(m) {
                    clearTimeout(c);
                    var a = Aa(m);
                    a && la(i, a);
                    I(m);
                    ea();
                    ka = !0;
                    d();
                    p()
                }

                Ob(R(m, "shiftKey"));
                for (var b = m.target || m.srcElement; b != D; b = b.parentNode)if (b.parentNode == O && b != Sa)return;
                for (b = m.target || m.srcElement; b != D; b = b.parentNode)if (b.parentNode == Fa) {
                    if (q.onGutterClick)q.onGutterClick(E, Ga(Fa.childNodes, b) + L, m);
                    return I(m)
                }
                var i = Aa(m);
                switch (Pb(m)) {
                    case 3:
                        Ta && !kb && Qb(m);
                        return;
                    case 2:
                        i && ma(i.line, i.ch, !0);
                        return
                }
                if (i) {
                    U || Ba();
                    b = +new Date;
                    if (Ha && Ha.time > b - 400 && H(Ha.pos, i))return I(m), setTimeout(ea, 20), wc(i.line);
                    if (Ua && Ua.time > b - 400 && H(Ua.pos, i))return Ha = {time: b, pos: i}, I(m), Rb(i);
                    Ua = {time: b, pos: i};
                    var f = i, c;
                    if (q.dragDrop && xc && !q.readOnly && !H(n.from, n.to) && !$(i, n.from) && !$(n.to, i)) {
                        lb && (z.draggable = !0);
                        var p = B(document, "mouseup", x(function (a) {
                            if (lb)z.draggable = false;
                            mb = false;
                            p();
                            if (Math.abs(m.clientX - a.clientX) + Math.abs(m.clientY - a.clientY) < 10) {
                                I(a);
                                ma(i.line, i.ch,
                                    true);
                                ea()
                            }
                        }), !0);
                        mb = !0;
                        z.dragDrop && z.dragDrop()
                    } else {
                        I(m);
                        ma(i.line, i.ch, !0);
                        var d = B(document, "mousemove", x(function (m) {
                            clearTimeout(c);
                            I(m);
                            !fa && !Pb(m) ? j(m) : a(m)
                        }), !0), p = B(document, "mouseup", x(j), !0)
                    }
                } else(m.target || m.srcElement) == u && I(m)
            }

            function yc(m) {
                for (var a = m.target || m.srcElement; a != D; a = a.parentNode)if (a.parentNode == Fa)return I(m);
                if (a = Aa(m))Ha = {time: +new Date, pos: a}, I(m), Rb(a)
            }

            function za(m) {
                m.preventDefault();
                var a = Aa(m, !0), j = m.dataTransfer.files;
                if (a && !q.readOnly)if (j && j.length && window.FileReader &&
                    window.File)for (var m = function (m, j) {
                    var c = new FileReader;
                    c.onload = function () {
                        i[j] = c.result;
                        ++f == b && (a = F(a), x(function () {
                            var m = aa(i.join(""), a, a);
                            la(a, m)
                        })())
                    };
                    c.readAsText(m)
                }, b = j.length, i = Array(b), f = 0, c = 0; c < b; ++c)m(j[c], c); else try {
                    if (i = m.dataTransfer.getData("Text")) {
                        var c = n.from, p = n.to;
                        la(a, a);
                        mb && aa("", c, p);
                        Ca(i);
                        ea()
                    }
                } catch (d) {
                }
            }

            function ib(m) {
                var a = ia();
                m.dataTransfer.setData("Text", a);
                if (Ta || zc)a = document.createElement("img"), a.scr = "data:image/gif;base64,R0lGODdhAgACAIAAAAAAAP///ywAAAAAAgACAAACAoRRADs=",
                    m.dataTransfer.setDragImage(a, 0, 0)
            }

            function Va(m, a) {
                if ("string" == typeof m && (m = Sb[m], !m))return!1;
                var j = V;
                try {
                    q.readOnly && (Wa = !0), a && (V = null), m(E)
                } catch (b) {
                    if (b != Tb)throw b;
                    return!1
                } finally {
                    V = j, Wa = !1
                }
                return!0
            }

            function Ub(m) {
                var a = l(q.keyMap), j = a.auto;
                clearTimeout(Vb);
                j && !c(m) && (Vb = setTimeout(function () {
                    l(q.keyMap) == a && (q.keyMap = j.call ? j.call(null, E) : j)
                }, 50));
                var b = ua[R(m, "keyCode")], i = !1;
                if (null == b || m.altGraphKey)return!1;
                R(m, "altKey") && (b = "Alt-" + b);
                R(m, "ctrlKey") && (b = "Ctrl-" + b);
                R(m, "metaKey") && (b =
                    "Cmd-" + b);
                if (i = R(m, "shiftKey") ? g("Shift-" + b, q.extraKeys, q.keyMap, function (m) {
                    return Va(m, !0)
                }) || g(b, q.extraKeys, q.keyMap, function (m) {
                    if ("string" == typeof m && /^go[A-Z]/.test(m))return Va(m)
                }) : g(b, q.extraKeys, q.keyMap, Va))I(m), fa && (m.oldKeyCode = m.keyCode, m.keyCode = 0);
                return i
            }

            function da(m, a) {
                var j = g("'" + a + "'", q.extraKeys, q.keyMap, Va);
                j && I(m);
                return j
            }

            function Wb(m) {
                U || Ba();
                fa && 27 == m.keyCode && (m.returnValue = !1);
                Da && Xa() && (Da = !1);
                if (!q.onKeyEvent || !q.onKeyEvent(E, nb(m))) {
                    var a = R(m, "keyCode");
                    Ob(16 == a ||
                        R(m, "shiftKey"));
                    var j = Ub(m);
                    window.opera && (ob = j ? a : null, !j && (88 == a && R(m, kb ? "metaKey" : "ctrlKey")) && Ca(""))
                }
            }

            function Ac(m) {
                Da && Xa();
                if (!q.onKeyEvent || !q.onKeyEvent(E, nb(m))) {
                    var a = R(m, "keyCode"), j = R(m, "charCode");
                    if (window.opera && a == ob)ob = null, I(m); else if (!(window.opera && !m.which || pb) || !Ub(m))a = String.fromCharCode(null == j ? a : j), q.electricChars && J.electricChars && q.smartIndent && !q.readOnly && -1 < J.electricChars.indexOf(a) && setTimeout(x(function () {
                        Ya(n.to.line, "smart")
                    }), 75), da(m, a) || Ia()
                }
            }

            function ha(m) {
                if (!q.onKeyEvent || !q.onKeyEvent(E, nb(m)))16 == R(m, "keyCode") && (V = null)
            }

            function Ba() {
                if ("nocursor" != q.readOnly) {
                    if (!U) {
                        if (q.onFocus)q.onFocus(E);
                        U = !0;
                        -1 == D.className.search(/\bCodeMirror-focused\b/) && (D.className += " CodeMirror-focused");
                        Ja || Za(!0)
                    }
                    $a();
                    Xb()
                }
            }

            function qb() {
                if (U) {
                    if (q.onBlur)q.onBlur(E);
                    U = !1;
                    na && x(function () {
                        na && (na(), na = null)
                    })();
                    D.className = D.className.replace(" CodeMirror-focused", "")
                }
                clearInterval(rb);
                setTimeout(function () {
                    U || (V = null)
                }, 150)
            }

            function ja(m, a, j, b, i) {
                if (!Wa) {
                    if (W) {
                        var f = [];
                        s.iter(m.line,
                            a.line + 1, function (a) {
                                f.push(a.text)
                            });
                        for (W.addChange(m.line, j.length, f); W.done.length > q.undoDepth;)W.done.shift()
                    }
                    Yb(m, a, j, b, i)
                }
            }

            function Zb(a, b) {
                if (a.length) {
                    for (var j = a.pop(), f = [], c = j.length - 1; 0 <= c; c -= 1) {
                        var N = j[c], p = [], d = N.start + N.added;
                        s.iter(N.start, d, function (a) {
                            p.push(a.text)
                        });
                        f.push({start: N.start, added: N.old.length, old: p});
                        var e = F({line: N.start + N.old.length - 1, ch: Bc(p[p.length - 1], N.old[N.old.length - 1])});
                        Yb({line: N.start, ch: 0}, {line: d - 1, ch: i(d - 1).text.length}, N.old, e, e)
                    }
                    ka = !0;
                    b.push(f)
                }
            }

            function Cc() {
                Zb(W.done, W.undone)
            }

            function Dc() {
                Zb(W.undone, W.done)
            }

            function Yb(a, b, j, f, c) {
                if (!Wa) {
                    var N = !1, d = oa.length;
                    q.lineWrapping || s.iter(a.line, b.line, function (a) {
                        if (a.text.length == d)return N = !0
                    });
                    if (a.line != b.line || 1 < j.length)Z = !0;
                    var e = b.line - a.line, h = i(a.line), g = i(b.line);
                    if (0 == a.ch && 0 == b.ch && "" == j[j.length - 1]) {
                        var A = [], h = null;
                        a.line ? (h = i(a.line - 1), h.fixMarkEnds(g)) : g.fixMarkStarts();
                        for (var k = 0, l = j.length - 1; k < l; ++k)A.push(v.inheritMarks(j[k], h));
                        e && s.remove(a.line, e, Ka);
                        A.length && s.insert(a.line,
                            A)
                    } else if (h == g)if (1 == j.length)h.replace(a.ch, b.ch, j[0]); else {
                        g = h.split(b.ch, j[j.length - 1]);
                        h.replace(a.ch, null, j[0]);
                        h.fixMarkEnds(g);
                        A = [];
                        k = 1;
                        for (l = j.length - 1; k < l; ++k)A.push(v.inheritMarks(j[k], h));
                        A.push(g);
                        s.insert(a.line + 1, A)
                    } else if (1 == j.length)h.replace(a.ch, null, j[0]), g.replace(null, b.ch, ""), h.append(g), s.remove(a.line + 1, e, Ka); else {
                        A = [];
                        h.replace(a.ch, null, j[0]);
                        g.replace(null, b.ch, j[j.length - 1]);
                        h.fixMarkEnds(g);
                        k = 1;
                        for (l = j.length - 1; k < l; ++k)A.push(v.inheritMarks(j[k], h));
                        1 < e && s.remove(a.line +
                            1, e - 1, Ka);
                        s.insert(a.line + 1, A)
                    }
                    if (q.lineWrapping) {
                        var r = Math.max(5, u.clientWidth / sb() - 3);
                        s.iter(a.line, a.line + j.length, function (a) {
                            if (!a.hidden) {
                                var m = Math.ceil(a.text.length / r) || 1;
                                m != a.height && p(a, m)
                            }
                        })
                    } else s.iter(a.line, k + j.length, function (a) {
                        a = a.text;
                        a.length > d && (oa = a, d = a.length, pa = null, N = !1)
                    }), N && (d = 0, oa = "", pa = null, s.iter(0, s.size, function (a) {
                        a = a.text;
                        a.length > d && (d = a.length, oa = a)
                    }));
                    g = [];
                    e = j.length - e - 1;
                    k = 0;
                    for (A = ba.length; k < A; ++k)l = ba[k], l < a.line ? g.push(l) : l > b.line && g.push(l + e);
                    k = a.line + Math.min(j.length,
                        500);
                    Ec(a.line, k);
                    g.push(k);
                    ba = g;
                    tb(100);
                    X.push({from: a.line, to: b.line + 1, diff: e});
                    a = {from: a, to: b, text: j};
                    if (La) {
                        for (j = La; j.next; j = j.next);
                        j.next = a
                    } else La = a;
                    Ma(f, c, n.from.line <= Math.min(b.line, b.line + e) ? n.from.line : n.from.line + e, n.to.line <= Math.min(b.line, b.line + e) ? n.to.line : n.to.line + e);
                    u.clientHeight && (O.style.height = s.height * qa() + 2 * z.offsetTop + "px")
                }
            }

            function aa(a, b, j) {
                function i(c) {
                    if ($(c, b))return c;
                    if (!$(j, c))return f;
                    var vc = c.line + a.length - (j.line - b.line) - 1, d = c.ch;
                    c.line == j.line && (d += a[a.length -
                        1].length - (j.ch - (j.line == b.line ? b.ch : 0)));
                    return{line: vc, ch: d}
                }

                var b = F(b), j = j ? F(j) : b, a = Ea(a), f;
                $b(a, b, j, function (a) {
                    f = a;
                    return{from: i(n.from), to: i(n.to)}
                });
                return f
            }

            function Ca(a, b) {
                $b(Ea(a), n.from, n.to, function (a) {
                    return"end" == b ? {from: a, to: a} : "start" == b ? {from: n.from, to: n.from} : {from: n.from, to: a}
                })
            }

            function $b(a, b, j, i) {
                var f = 1 == a.length ? a[0].length + b.ch : a[a.length - 1].length, i = i({line: b.line + a.length - 1, ch: f});
                ja(b, j, a, i.from, i.to)
            }

            function ac(a, b) {
                var j = a.line, f = b.line;
                if (j == f)return i(j).text.slice(a.ch,
                    b.ch);
                var c = [i(j).text.slice(a.ch)];
                s.iter(j + 1, f, function (a) {
                    c.push(a.text)
                });
                c.push(i(f).text.slice(0, b.ch));
                return c.join("\n")
            }

            function ia() {
                return ac(n.from, n.to)
            }

            function $a() {
                Da || ub.set(q.pollInterval, function () {
                    vb();
                    Xa();
                    U && $a();
                    wb()
                })
            }

            function Ia() {
                function a() {
                    vb();
                    var j = Xa();
                    !j && !b ? (b = !0, ub.set(60, a)) : (Da = !1, $a());
                    wb()
                }

                var b = !1;
                Da = !0;
                ub.set(20, a)
            }

            function Xa() {
                if (Ja || !U || Fc(C) || q.readOnly)return!1;
                var a = C.value;
                if (a == ra)return!1;
                V = null;
                for (var b = 0, j = Math.min(ra.length, a.length); b < j && ra[b] ==
                    a[b];)++b;
                b < ra.length ? n.from = {line: n.from.line, ch: n.from.ch - (ra.length - b)} : ab && H(n.from, n.to) && (n.to = {line: n.to.line, ch: Math.min(i(n.to.line).text.length, n.to.ch + (a.length - b))});
                Ca(a.slice(b), "end");
                ra = a;
                return!0
            }

            function Za(a) {
                H(n.from, n.to) ? a && (ra = C.value = "") : (ra = "", C.value = ia(), bc(C))
            }

            function ea() {
                "nocursor" != q.readOnly && C.focus()
            }

            function Ra() {
                if (Q.getBoundingClientRect) {
                    var a = Q.getBoundingClientRect();
                    if (!(fa && a.top == a.bottom)) {
                        var b = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
                        (0 > a.top || a.bottom > b) && Q.scrollIntoView()
                    }
                }
            }

            function cc() {
                var a = ga(n.inverted ? n.from : n.to), b = q.lineWrapping ? Math.min(a.x, z.offsetWidth) : a.x;
                return dc(b, a.y, b, a.yBot)
            }

            function dc(a, b, j, i) {
                var f = z.offsetLeft, c = z.offsetTop, b = b + c, i = i + c, a = a + f, j = j + f, d = u.clientHeight, p = u.scrollTop, f = !1, c = !0;
                b < p ? (u.scrollTop = Math.max(0, b), f = !0) : i > p + d && (u.scrollTop = i - d, f = !0);
                b = u.clientWidth;
                i = u.scrollLeft;
                d = q.fixedGutter ? P.clientWidth : 0;
                a < i + d ? (50 > a && (a = 0), u.scrollLeft = Math.max(0, a - 10 - d), f = !0) : j > b + i - 3 && (u.scrollLeft = j + 10 - b,
                    f = !0, j > O.clientWidth && (c = !1));
                if (f && q.onScroll)q.onScroll(E);
                return c
            }

            function Nb() {
                var a = qa(), b = u.scrollTop - z.offsetTop, j = Math.max(0, Math.floor(b / a)), a = Math.ceil((b + u.clientHeight) / a);
                return{from: K(s, j), to: K(s, a)}
            }

            function va(a, b) {
                function j() {
                    pa = u.clientWidth;
                    var a = S.firstChild, m = !1;
                    s.iter(L, T, function (b) {
                        if (!b.hidden) {
                            var j = Math.round(a.offsetHeight / g) || 1;
                            b.height != j && (p(b, j), Z = m = !0)
                        }
                        a = a.nextSibling
                    });
                    m && (O.style.height = s.height * g + 2 * z.offsetTop + "px");
                    return m
                }

                if (u.clientWidth) {
                    var i = Nb();
                    if (!(!0 !==
                        a && 0 == a.length && i.from > L && i.to < T)) {
                        var f = Math.max(i.from - 100, 0), i = Math.min(s.size, i.to + 100);
                        L < f && 20 > f - L && (f = L);
                        T > i && 20 > T - i && (i = Math.min(s.size, T));
                        for (var c = !0 === a ? [] : Gc([
                            {from: L, to: T, domStart: 0}
                        ], a), d = 0, e = 0; e < c.length; ++e) {
                            var h = c[e];
                            h.from < f && (h.domStart += f - h.from, h.from = f);
                            h.to > i && (h.to = i);
                            h.from >= h.to ? c.splice(e--, 1) : d += h.to - h.from
                        }
                        if (d != i - f) {
                            c.sort(function (a, m) {
                                return a.domStart - m.domStart
                            });
                            var g = qa(), d = P.style.display;
                            S.style.display = "none";
                            Hc(f, i, c);
                            S.style.display = P.style.display = "";
                            (e =
                                f != L || i != T || ec != u.clientHeight + g) && (ec = u.clientHeight + g);
                            L = f;
                            T = i;
                            Na = Y(s, f);
                            Sa.style.top = Na * g + "px";
                            u.clientHeight && (O.style.height = s.height * g + 2 * z.offsetTop + "px");
                            if (S.childNodes.length != T - L)throw Error("BAD PATCH! " + JSON.stringify(c) + " size=" + (T - L) + " nodes=" + S.childNodes.length);
                            q.lineWrapping ? j() : (null == pa && (pa = xb(oa)), pa > u.clientWidth ? (z.style.width = pa + "px", O.style.width = "", O.style.width = u.scrollWidth + "px") : z.style.width = O.style.width = "");
                            P.style.display = d;
                            (e || Z) && yb() && q.lineWrapping && j() && yb();
                            fc();
                            if (!b && q.onUpdate)q.onUpdate(E);
                            return!0
                        }
                    }
                } else L = T = Na = 0
            }

            function Gc(a, b) {
                for (var j = 0, i = b.length || 0; j < i; ++j) {
                    for (var f = b[j], c = [], d = f.diff || 0, p = 0, h = a.length; p < h; ++p) {
                        var e = a[p];
                        f.to <= e.from && f.diff ? c.push({from: e.from + d, to: e.to + d, domStart: e.domStart}) : f.to <= e.from || f.from >= e.to ? c.push(e) : (f.from > e.from && c.push({from: e.from, to: f.from, domStart: e.domStart}), f.to < e.to && c.push({from: f.to + d, to: e.to + d, domStart: e.domStart + (f.to - e.from)}))
                    }
                    a = c
                }
                return a
            }

            function Hc(a, b, j) {
                if (j.length) {
                    for (var i = function (a) {
                        var m =
                            a.nextSibling;
                        a.parentNode.removeChild(a);
                        return m
                    }, f = 0, c = S.firstChild, d = 0; d < j.length; ++d) {
                        for (var p = j[d]; p.domStart > f;)c = i(c), f++;
                        for (var e = 0, p = p.to - p.from; e < p; ++e)c = c.nextSibling, f++
                    }
                    for (; c;)c = i(c)
                } else S.innerHTML = "";
                var h = j.shift(), c = S.firstChild, e = a, g = document.createElement("div");
                s.iter(a, b, function (a) {
                    h && h.to == e && (h = j.shift());
                    if (!h || h.from > e) {
                        if (a.hidden)var m = g.innerHTML = "<pre></pre>"; else m = "<pre" + (a.className ? ' class="' + a.className + '"' : "") + ">" + a.getHTML(gc) + "</pre>", a.bgClassName && (m = '<div style="position: relative"><pre class="' +
                            a.bgClassName + '" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: -2">&#160;</pre>' + m + "</div>");
                        g.innerHTML = m;
                        S.insertBefore(g.firstChild, c)
                    } else c = c.nextSibling;
                    ++e
                })
            }

            function yb() {
                if (q.gutter || q.lineNumbers) {
                    var a = Sa.offsetHeight, b = u.clientHeight;
                    P.style.height = (2 > a - b ? b : a) + "px";
                    var j = [], i = L, f;
                    s.iter(L, Math.max(T, L + 1), function (a) {
                        if (a.hidden)j.push("<pre></pre>"); else {
                            var m = a.gutterMarker, b = q.lineNumbers ? i + q.firstLineNumber : null;
                            m && m.text ? b = m.text.replace("%N%", null != b ? b :
                                "") : null == b && (b = "\u00a0");
                            j.push(m && m.style ? '<pre class="' + m.style + '">' : "<pre>", b);
                            for (b = 1; b < a.height; ++b)j.push("<br/>&#160;");
                            j.push("</pre>");
                            m || (f = i)
                        }
                        ++i
                    });
                    P.style.display = "none";
                    Fa.innerHTML = j.join("");
                    if (null != f) {
                        for (var a = Fa.childNodes[f - L], b = ("" + s.size).length, c = a.textContent || a.innerText || a.nodeValue || "", d = ""; c.length + d.length < b;)d += "\u00a0";
                        d && a.insertBefore(document.createTextNode(d), a.firstChild)
                    }
                    P.style.display = "";
                    a = 2 < Math.abs((parseInt(z.style.marginLeft) || 0) - P.offsetWidth);
                    z.style.marginLeft =
                        P.offsetWidth + "px";
                    Z = !1;
                    return a
                }
            }

            function fc() {
                var a = H(n.from, n.to), b = ga(n.from, !0), j = a ? b : ga(n.to, !0), i = n.inverted ? b : j, f = qa(), c = wa(D), d = wa(S);
                xa.style.top = Math.max(0, Math.min(u.offsetHeight, i.y + d.top - c.top)) + "px";
                xa.style.left = Math.max(0, Math.min(u.offsetWidth, i.x + d.left - c.left)) + "px";
                if (a)Q.style.top = i.y + "px", Q.style.left = (q.lineWrapping ? Math.min(i.x, z.offsetWidth) : i.x) + "px", Q.style.display = "", bb.style.display = "none"; else {
                    var a = b.y == j.y, p = "", e = z.clientWidth || z.offsetWidth, i = z.clientHeight || z.offsetHeight,
                        c = function (a, m, b, j) {
                            b = Ic ? "width: " + (!b ? e : e - b - a) + "px" : "right: " + b + "px";
                            p += '<div class="CodeMirror-selected" style="position: absolute; left: ' + a + "px; top: " + m + "px; " + b + "; height: " + j + 'px"></div>'
                        };
                    n.from.ch && 0 <= b.y && (d = a ? e - j.x : 0, c(b.x, b.y, d, f));
                    b = Math.max(0, b.y + (n.from.ch ? f : 0));
                    d = Math.min(j.y, i) - b;
                    d > 0.2 * f && c(0, b, 0, d);
                    (!a || !n.from.ch) && j.y < i - 0.5 * f && c(0, j.y, e - j.x, f);
                    bb.innerHTML = p;
                    Q.style.display = "none";
                    bb.style.display = ""
                }
            }

            function Ob(a) {
                V = a ? V || (n.inverted ? n.to : n.from) : null
            }

            function la(a, b) {
                var j = V &&
                    F(V);
                j && ($(j, a) ? a = j : $(b, j) && (b = j));
                Ma(a, b);
                cb = !0
            }

            function Ma(a, b, j, f) {
                db = null;
                null == j && (j = n.from.line, f = n.to.line);
                if (!H(n.from, a) || !H(n.to, b)) {
                    if ($(b, a))var c = b, b = a, a = c;
                    a.line != j && ((j = eb(a, j, n.from.ch)) ? a = j : zb(a.line, !1));
                    b.line != f && (b = eb(b, f, n.to.ch));
                    H(a, b) ? n.inverted = !1 : H(a, n.to) ? n.inverted = !1 : H(b, n.from) && (n.inverted = !0);
                    if (q.autoClearEmptyLines && H(n.from, n.to) && (f = n.inverted ? a : b, f.line != n.from.line && n.from.line < s.size)) {
                        var d = i(n.from.line);
                        /^\s+$/.test(d.text) && setTimeout(x(function () {
                            if (d.parent &&
                                /^\s+$/.test(d.text)) {
                                var a = M(d);
                                aa("", {line: a, ch: 0}, {line: a, ch: d.text.length})
                            }
                        }, 10))
                    }
                    n.from = a;
                    n.to = b;
                    sa = !0
                }
            }

            function eb(a, b, j) {
                function f(b) {
                    for (var c = a.line + b, d = 1 == b ? s.size : -1; c != d;) {
                        var jb = i(c);
                        if (!jb.hidden) {
                            b = a.ch;
                            if (b > j || b > jb.text.length)b = jb.text.length;
                            return{line: c, ch: b}
                        }
                        c += b
                    }
                }

                var c = i(a.line);
                return!c.hidden ? a : a.line >= b ? f(1) || f(-1) : f(-1) || f(1)
            }

            function ma(a, b, j) {
                a = F({line: a, ch: b || 0});
                (j ? la : Ma)(a, a)
            }

            function fb(a) {
                return Math.max(0, Math.min(a, s.size - 1))
            }

            function F(a) {
                if (0 > a.line)return{line: 0,
                    ch: 0};
                if (a.line >= s.size)return{line: s.size - 1, ch: i(s.size - 1).text.length};
                var b = a.ch, j = i(a.line).text.length;
                return null == b || b > j ? {line: a.line, ch: j} : 0 > b ? {line: a.line, ch: 0} : a
            }

            function Ab(a, b) {
                function j(b) {
                    if (d == (0 > a ? 0 : p.text.length)) {
                        if (b = !b)a:{
                            for (var b = c + a, j = 0 > a ? -1 : s.size; b != j; b += a) {
                                var f = i(b);
                                if (!f.hidden) {
                                    c = b;
                                    p = f;
                                    b = !0;
                                    break a
                                }
                            }
                            b = void 0
                        }
                        if (b)d = 0 > a ? p.text.length : 0; else return!1
                    } else d += a;
                    return!0
                }

                var f = n.inverted ? n.from : n.to, c = f.line, d = f.ch, p = i(c);
                if ("char" == b)j(); else if ("column" == b)j(!0); else if ("word" ==
                    b)for (f = !1; !(0 > a) || j();) {
                    if (Bb(p.text.charAt(d)))f = !0; else if (f) {
                        0 > a && (a = 1, j());
                        break
                    }
                    if (0 < a && !j())break
                }
                return{line: c, ch: d}
            }

            function Jc(a, b) {
                var j = 0 > a ? n.from : n.to;
                if (V || H(n.from, n.to))j = Ab(a, b);
                ma(j.line, j.ch, !0)
            }

            function Kc(a, b) {
                H(n.from, n.to) ? 0 > a ? aa("", Ab(a, b), n.to) : aa("", n.from, Ab(a, b)) : aa("", n.from, n.to);
                cb = !0
            }

            function Lc(a, b) {
                var j = 0, i = ga(n.inverted ? n.from : n.to, !0);
                null != db && (i.x = db);
                "page" == b ? j = Math.min(u.clientHeight, window.innerHeight || document.documentElement.clientHeight) : "line" == b && (j =
                    qa());
                j = Cb(i.x, i.y + j * a + 2);
                "page" == b && (u.scrollTop += ga(j, !0).y - i.y);
                ma(j.line, j.ch, !0);
                db = i.x
            }

            function Rb(a) {
                for (var b = i(a.line).text, j = a.ch, f = a.ch; 0 < j && Bb(b.charAt(j - 1));)--j;
                for (; f < b.length && Bb(b.charAt(f));)++f;
                la({line: a.line, ch: j}, {line: a.line, ch: f})
            }

            function wc(a) {
                la({line: a, ch: 0}, F({line: a + 1, ch: 0}))
            }

            function Mc(a) {
                if (H(n.from, n.to))return Ya(n.from.line, a);
                for (var b = n.to.line - (n.to.ch ? 0 : 1), j = n.from.line; j <= b; ++j)Ya(j, a)
            }

            function Ya(a, b) {
                b || (b = "add");
                if ("smart" == b)if (J.indent)var j = gb(a); else b =
                    "prev";
                var f = i(a), c = f.indentation(q.tabSize), d = f.text.match(/^\s*/)[0], p;
                "prev" == b ? p = a ? i(a - 1).indentation(q.tabSize) : 0 : "smart" == b ? p = J.indent(j, f.text.slice(d.length), f.text) : "add" == b ? p = c + q.indentUnit : "subtract" == b && (p = c - q.indentUnit);
                p = Math.max(0, p);
                if (j = p - c) {
                    c = "";
                    j = 0;
                    if (q.indentWithTabs)for (f = Math.floor(p / q.tabSize); f; --f)j += q.tabSize, c += "\t";
                    for (; j < p;)++j, c += " "
                } else {
                    if (n.from.line != a && n.to.line != a)return;
                    c = d
                }
                aa(c, {line: a, ch: 0}, {line: a, ch: d.length})
            }

            function hc() {
                J = d.getMode(q, q.mode);
                s.iter(0,
                    s.size, function (a) {
                        a.stateAfter = null
                    });
                ba = [0];
                tb()
            }

            function Nc() {
                if (q.lineWrapping) {
                    D.className += " CodeMirror-wrap";
                    var a = u.clientWidth / sb() - 3;
                    s.iter(0, s.size, function (b) {
                        if (!b.hidden) {
                            var j = Math.ceil(b.text.length / a) || 1;
                            1 != j && p(b, j)
                        }
                    });
                    z.style.width = O.style.width = ""
                } else D.className = D.className.replace(" CodeMirror-wrap", ""), pa = null, oa = "", s.iter(0, s.size, function (a) {
                    1 != a.height && !a.hidden && p(a, 1);
                    a.text.length > oa.length && (oa = a.text)
                });
                X.push({from: 0, to: s.size})
            }

            function gc(a) {
                var a = q.tabSize - a % q.tabSize,
                    b = ic[a];
                if (b)return b;
                for (var b = '<span class="cm-tab">', j = 0; j < a; ++j)b += " ";
                return ic[a] = {html: b + "</span>", width: a}
            }

            function jc() {
                u.className = u.className.replace(/\s*cm-s-\w+/g, "") + q.theme.replace(/(^|\s)\s*/g, " cm-s-")
            }

            function Db() {
                this.set = []
            }

            function Eb(a, b, j) {
                function f(a, b, m, j) {
                    i(a).addMark(new k(b, m, j, c))
                }

                var a = F(a), b = F(b), c = new Db;
                if (!$(a, b))return c;
                if (a.line == b.line)f(a.line, a.ch, b.ch, j); else {
                    f(a.line, a.ch, null, j);
                    for (var d = a.line + 1, p = b.line; d < p; ++d)f(d, null, null, j);
                    f(b.line, null, b.ch, j)
                }
                X.push({from: a.line,
                    to: b.line + 1});
                return c
            }

            function Oc(a) {
                var a = F(a), b = new r(a.ch);
                i(a.line).addMark(b);
                return b
            }

            function Pc(a) {
                var a = F(a), b = [], j = i(a.line).marked;
                if (!j)return b;
                for (var f = 0, c = j.length; f < c; ++f) {
                    var d = j[f];
                    if ((null == d.from || d.from <= a.ch) && (null == d.to || d.to >= a.ch))b.push(d.marker || d)
                }
                return b
            }

            function Qc(a, b, j) {
                "number" == typeof a && (a = i(fb(a)));
                a.gutterMarker = {text: b, style: j};
                Z = !0;
                return a
            }

            function Rc(a) {
                "number" == typeof a && (a = i(fb(a)));
                a.gutterMarker = null;
                Z = !0
            }

            function kc(a, b) {
                var j = a, f = a;
                "number" == typeof a ?
                    f = i(fb(a)) : j = M(a);
                if (null != j && b(f, j))X.push({from: j, to: j + 1}); else return null;
                return f
            }

            function Sc(a, b, j) {
                return kc(a, function (a) {
                    if (a.className != b || a.bgClassName != j)return a.className = b, a.bgClassName = j, !0
                })
            }

            function zb(a, b) {
                return kc(a, function (a, m) {
                    if (a.hidden != b) {
                        a.hidden = b;
                        p(a, b ? 0 : 1);
                        var f = n.from.line, i = n.to.line;
                        if (b && (f == m || i == m)) {
                            f = f == m ? eb({line: f, ch: 0}, f, 0) : n.from;
                            i = i == m ? eb({line: i, ch: 0}, i, 0) : n.to;
                            if (!i)return;
                            Ma(f, i)
                        }
                        return Z = !0
                    }
                })
            }

            function Tc(a) {
                if ("number" == typeof a) {
                    if (!f(a))return null;
                    var b = a, a = i(a);
                    if (!a)return null
                } else if (b = M(a), null == b)return null;
                var j = a.gutterMarker;
                return{line: b, handle: a, text: a.text, markerText: j && j.text, markerClass: j && j.style, lineClass: a.className, bgClass: a.bgClassName}
            }

            function xb(a) {
                ta.innerHTML = "<pre><span>x</span></pre>";
                ta.firstChild.firstChild.firstChild.nodeValue = a;
                return ta.firstChild.firstChild.offsetWidth || 10
            }

            function lc(a, b) {
                if (0 == b)return{top: 0, left: 0};
                var f = "";
                q.lineWrapping && (f = a.text.indexOf(" ", b + 6), f = ca(a.text.slice(b + 1, 0 > f ? a.text.length :
                    f + (fa ? 5 : 0))));
                ta.innerHTML = "<pre>" + a.getHTML(gc, b) + '<span id="CodeMirror-temp-' + mc + '">' + ca(a.text.charAt(b) || " ") + "</span>" + f + "</pre>";
                var f = document.getElementById("CodeMirror-temp-" + mc), i = f.offsetTop, c = f.offsetLeft;
                fa && (0 == i && 0 == c) && (i = document.createElement("span"), i.innerHTML = "x", f.parentNode.insertBefore(i, f.nextSibling), i = i.offsetTop);
                return{top: i, left: c}
            }

            function ga(a, b) {
                var f, c = qa(), d = c * (Y(s, a.line) - (b ? Na : 0));
                if (0 == a.ch)f = 0; else {
                    var p = lc(i(a.line), a.ch);
                    f = p.left;
                    q.lineWrapping && (d += Math.max(0,
                        p.top))
                }
                return{x: f, y: d, yBot: d + c}
            }

            function Cb(a, b) {
                function f(a) {
                    a = lc(h, a);
                    if (k) {
                        var b = Math.round(a.top / c);
                        return Math.max(0, a.left + (b - A) * u.clientWidth)
                    }
                    return a.left
                }

                0 > b && (b = 0);
                var c = qa(), d = sb(), p = Na + Math.floor(b / c), e = K(s, p);
                if (e >= s.size)return{line: s.size - 1, ch: i(s.size - 1).text.length};
                var h = i(e), g = h.text, k = q.lineWrapping, A = k ? p - Y(s, e) : 0;
                if (0 >= a && 0 == A)return{line: e, ch: 0};
                for (var l = p = 0, g = g.length, n, d = Math.min(g, Math.ceil((a + 0.9 * A * u.clientWidth) / d)); ;) {
                    var r = f(d);
                    if (r <= a && d < g)d = Math.min(g, Math.ceil(1.2 *
                        d)); else {
                        n = r;
                        g = d;
                        break
                    }
                }
                if (a > n)return{line: e, ch: g};
                d = Math.floor(0.8 * g);
                r = f(d);
                r < a && (p = d, l = r);
                for (; ;) {
                    if (1 >= g - p)return{line: e, ch: n - a > a - l ? p : g};
                    d = Math.ceil((p + g) / 2);
                    r = f(d);
                    r > a ? (g = d, n = r) : (p = d, l = r)
                }
            }

            function qa() {
                if (null == ya) {
                    ya = "<pre>";
                    for (var a = 0; 49 > a; ++a)ya += "x<br/>";
                    ya += "x</pre>"
                }
                a = S.clientHeight;
                if (a == nc)return Fb;
                nc = a;
                ta.innerHTML = ya;
                Fb = ta.firstChild.offsetHeight / 50 || 1;
                ta.innerHTML = "";
                return Fb
            }

            function sb() {
                if (u.clientWidth == oc)return pc;
                oc = u.clientWidth;
                return pc = xb("x")
            }

            function Aa(a, b) {
                var f =
                    wa(u, !0), i, c;
                try {
                    i = a.clientX, c = a.clientY
                } catch (d) {
                    return null
                }
                if (!b && (i - f.left > u.clientWidth || c - f.top > u.clientHeight))return null;
                f = wa(z, !0);
                return Cb(i - f.left, c - f.top)
            }

            function Qb(a) {
                function b() {
                    var a = Ea(C.value).join("\n");
                    a != d && x(Ca)(a, "end");
                    xa.style.position = "relative";
                    C.style.cssText = c;
                    qc && (u.scrollTop = i);
                    Ja = !1;
                    Za(!0);
                    $a()
                }

                var f = Aa(a), i = u.scrollTop;
                if (f && !window.opera) {
                    (H(n.from, n.to) || $(f, n.from) || !$(f, n.to)) && x(ma)(f.line, f.ch);
                    var c = C.style.cssText;
                    xa.style.position = "absolute";
                    C.style.cssText =
                        "position: fixed; width: 30px; height: 30px; top: " + (a.clientY - 5) + "px; left: " + (a.clientX - 5) + "px; z-index: 1000; background: white; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
                    Ja = !0;
                    var d = C.value = ia();
                    ea();
                    bc(C);
                    if (Ta) {
                        Oa(a);
                        var p = B(window, "mouseup", function () {
                            p();
                            setTimeout(b, 20)
                        }, !0)
                    } else setTimeout(b, 50)
                }
            }

            function Xb() {
                clearInterval(rb);
                var a = !0;
                Q.style.visibility = "";
                rb = setInterval(function () {
                    Q.style.visibility = (a = !a) ? "" : "hidden"
                }, 650)
            }

            function rc(a) {
                function b(a, f, i) {
                    if (a.text)for (var m = a.styles, a = e ? 0 : a.text.length - 1, j, c = e ? 0 : m.length - 2, d = e ? m.length : -2; c != d; c += 2 * h) {
                        var p = m[c];
                        if (null != m[c + 1] && m[c + 1] != l)a += h * p.length; else for (var g = e ? 0 : p.length - 1, k = e ? p.length : -1; g != k; g += h, a += h)if (a >= f && a < i && q.test(j = p.charAt(g))) {
                            var A = Gb[j];
                            if (">" == A.charAt(1) == e)r.push(j); else {
                                if (r.pop() != A.charAt(0))return{pos: a, match: !1};
                                if (!r.length)return{pos: a, match: !0}
                            }
                        }
                    }
                }

                var f = n.inverted ? n.from : n.to, c = i(f.line), d = f.ch - 1, p = 0 <= d && Gb[c.text.charAt(d)] || Gb[c.text.charAt(++d)];
                if (p) {
                    p.charAt(0);
                    for (var e = ">" == p.charAt(1), h = e ? 1 : -1, g = c.styles, k = d + 1, p = 0, A = g.length; p < A; p += 2)if (0 >= (k -= g[p].length)) {
                        var l = g[p + 1];
                        break
                    }
                    for (var r = [c.text.charAt(d)], q = /[(){}[\]]/, p = f.line, A = e ? Math.min(p + 100, s.size) : Math.max(-1, p - 100); p != A; p += h) {
                        var c = i(p), y = p == f.line;
                        if (y = b(c, y && e ? d + 1 : 0, y && !e ? d : c.text.length))break
                    }
                    y || (y = {pos: null, match: !1});
                    var l = y.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket", o = Eb({line: f.line, ch: d}, {line: f.line, ch: d + 1}, l), Mb = null != y.pos && Eb({line: p, ch: y.pos}, {line: p, ch: y.pos +
                        1}, l), f = x(function () {
                        o.clear();
                        Mb && Mb.clear()
                    });
                    a ? setTimeout(f, 800) : na = f
                }
            }

            function sc(a) {
                for (var b, f, c = a, a = a - 40; c > a; --c) {
                    if (0 == c)return 0;
                    var d = i(c - 1);
                    if (d.stateAfter)return c;
                    d = d.indentation(q.tabSize);
                    if (null == f || b > d)f = c - 1, b = d
                }
                return f
            }

            function gb(a) {
                var b = sc(a), f = b && i(b - 1).stateAfter, f = f ? e(J, f) : h(J);
                s.iter(b, a, function (a) {
                    a.highlight(J, f, q.tabSize);
                    a.stateAfter = e(J, f)
                });
                b < a && X.push({from: b, to: a});
                a < s.size && !i(a).stateAfter && ba.push(a);
                return f
            }

            function Ec(a, b) {
                var f = gb(a);
                s.iter(a, b, function (a) {
                    a.highlight(J,
                        f, q.tabSize);
                    a.stateAfter = e(J, f)
                })
            }

            function Uc() {
                for (var a = +new Date + q.workTime, b = ba.length; ba.length;) {
                    var f = i(L).stateAfter ? ba.pop() : L;
                    if (!(f >= s.size)) {
                        var c = sc(f), d = c && i(c - 1).stateAfter, d = d ? e(J, d) : h(J), p = 0, g = J.compareStates, k = !1, A = c, l = !1;
                        s.iter(A, s.size, function (b) {
                            var i = b.stateAfter;
                            if (+new Date > a)return ba.push(A), tb(q.workDelay), k && X.push({from: f, to: A + 1}), l = !0;
                            var c = b.highlight(J, d, q.tabSize);
                            c && (k = !0);
                            b.stateAfter = e(J, d);
                            b = null;
                            if (g) {
                                var h = i && g(i, d);
                                h != Tb && (b = !!h)
                            }
                            if (null == b)if (!1 !== c || !i)p =
                                0; else if (3 < ++p && (!J.indent || J.indent(i, "") == J.indent(d, "")))b = !0;
                            if (b)return!0;
                            ++A
                        });
                        if (l)return;
                        k && X.push({from: f, to: A + 1})
                    }
                }
                if (b && q.onHighlightComplete)q.onHighlightComplete(E)
            }

            function tb(a) {
                ba.length && Vc.set(a, x(Uc))
            }

            function vb() {
                ka = cb = La = null;
                X = [];
                sa = !1;
                Ka = []
            }

            function wb() {
                var a = !1, b;
                sa && (a = !cc());
                X.length ? b = va(X, !0) : (sa && fc(), Z && yb());
                a && cc();
                sa && (Ra(), Xb());
                U && (!Ja && (!0 === ka || !1 !== ka && sa)) && Za(cb);
                sa && q.matchBrackets && setTimeout(x(function () {
                    if (na) {
                        na();
                        na = null
                    }
                    H(n.from, n.to) && rc(false)
                }),
                    20);
                var f = La, a = Ka;
                if (sa && q.onCursorActivity)q.onCursorActivity(E);
                if (f && q.onChange && E)q.onChange(E, f);
                for (f = 0; f < a.length; ++f)a[f](E);
                if (b && q.onUpdate)q.onUpdate(E)
            }

            function x(a) {
                return function () {
                    tc++ || vb();
                    try {
                        var b = a.apply(this, arguments)
                    } finally {
                        --tc || wb()
                    }
                    return b
                }
            }

            var q = {}, Hb = d.defaults, Pa;
            for (Pa in Hb)Hb.hasOwnProperty(Pa) && (q[Pa] = (b && b.hasOwnProperty(Pa) ? b : Hb)[Pa]);
            var D = document.createElement("div");
            D.className = "CodeMirror" + (q.lineWrapping ? " CodeMirror-wrap" : "");
            D.innerHTML = '<div style="overflow: hidden; position: relative; width: 3px; height: 0px;"><textarea style="position: absolute; padding: 0; width: 1px; height: 1em" wrap="off" autocorrect="off" autocapitalize="off"></textarea></div><div class="CodeMirror-scroll" tabindex="-1"><div style="position: relative"><div style="position: relative"><div class="CodeMirror-gutter"><div class="CodeMirror-gutter-text"></div></div><div class="CodeMirror-lines"><div style="position: relative; z-index: 0"><div style="position: absolute; width: 100%; height: 0; overflow: hidden; visibility: hidden;"></div><pre class="CodeMirror-cursor">&#160;</pre><div style="position: relative; z-index: -1"></div><div></div></div></div></div></div></div>';
            a.appendChild ? a.appendChild(D) : a(D);
            var xa = D.firstChild, C = xa.firstChild, u = D.lastChild, O = u.firstChild, Sa = O.firstChild, P = Sa.firstChild, Fa = P.firstChild, z = P.nextSibling.firstChild, ta = z.firstChild, Q = ta.nextSibling, bb = Q.nextSibling, S = bb.nextSibling;
            jc();
            Ib && (C.style.width = "0px");
            lb || (z.draggable = !0);
            z.style.outline = "none";
            null != q.tabindex && (C.tabIndex = q.tabindex);
            q.autofocus && ea();
            !q.gutter && !q.lineNumbers && (P.style.display = "none");
            pb && (xa.style.height = "1px", xa.style.position = "absolute");
            try {
                xb("x")
            } catch (Jb) {
                throw Jb.message.match(/runtime/i) &&
                    (Jb = Error("A CodeMirror inside a P-style element does not work in Internet Explorer. (innerHTML bug)")), Jb;
            }
            var ub = new Kb, Vc = new Kb, rb, J, s = new y([new w([new v("")])]), ba, U;
            hc();
            var n = {from: {line: 0, ch: 0}, to: {line: 0, ch: 0}, inverted: !1}, V, Ua, Ha, Lb = 0, mb, ab = !1, Wa = !1, ka, cb, X, La, sa, Ja, Z, Ka, Na = 0, L = 0, T = 0, ec = 0, na, oa = "", pa, ic = {};
            x(function () {
                A(q.value || "");
                ka = false
            })();
            var W = new G;
            B(u, "mousedown", x(t));
            B(u, "dblclick", x(yc));
            B(z, "selectstart", I);
            Ta || B(u, "contextmenu", Qb);
            B(u, "scroll", function () {
                Lb = u.scrollTop;
                va([]);
                if (q.fixedGutter)P.style.left = u.scrollLeft + "px";
                if (q.onScroll)q.onScroll(E)
            });
            B(window, "resize", function () {
                va(true)
            });
            B(C, "keyup", x(ha));
            B(C, "input", Ia);
            B(C, "keydown", x(Wb));
            B(C, "keypress", x(Ac));
            B(C, "focus", Ba);
            B(C, "blur", qb);
            q.dragDrop && (B(z, "dragstart", ib), B(u, "dragenter", Oa), B(u, "dragover", Oa), B(u, "drop", x(za)));
            B(u, "paste", function () {
                ea();
                Ia()
            });
            B(C, "paste", Ia);
            B(C, "cut", x(function () {
                q.readOnly || Ca("")
            }));
            pb && B(O, "mouseup", function () {
                document.activeElement == C && C.blur();
                ea()
            });
            var uc;
            try {
                uc =
                    document.activeElement == C
            } catch (Wc) {
            }
            uc || q.autofocus ? setTimeout(Ba, 20) : qb();
            var E = D.CodeMirror = {getValue: o, setValue: x(A), getSelection: ia, replaceSelection: x(Ca), focus: function () {
                window.focus();
                ea();
                Ba();
                Ia()
            }, setOption: function (a, b) {
                var f = q[a];
                q[a] = b;
                if (a == "mode" || a == "indentUnit")hc(); else if (a == "readOnly" && b == "nocursor") {
                    qb();
                    C.blur()
                } else a == "readOnly" && !b ? Za(true) : a == "theme" ? jc() : a == "lineWrapping" && f != b ? x(Nc)() : a == "tabSize" && va(true);
                if (a == "lineNumbers" || a == "gutter" || a == "firstLineNumber" || a == "theme") {
                    f =
                        q.gutter || q.lineNumbers;
                    P.style.display = f ? "" : "none";
                    f ? Z = true : S.parentNode.style.marginLeft = 0;
                    va(true)
                }
            }, getOption: function (a) {
                return q[a]
            }, undo: x(Cc), redo: x(Dc), indentLine: x(function (a, b) {
                typeof b != "string" && (b = b == null ? q.smartIndent ? "smart" : "prev" : b ? "add" : "subtract");
                f(a) && Ya(a, b)
            }), indentSelection: x(Mc), historySize: function () {
                return{undo: W.done.length, redo: W.undone.length}
            }, clearHistory: function () {
                W = new G
            }, matchBrackets: x(function () {
                rc(true)
            }), getTokenAt: x(function (a) {
                a = F(a);
                return i(a.line).getTokenAt(J,
                    gb(a.line), a.ch)
            }), getStateAfter: function (a) {
                a = fb(a == null ? s.size - 1 : a);
                return gb(a + 1)
            }, cursorCoords: function (a, b) {
                if (a == null)a = n.inverted;
                return this.charCoords(a ? n.from : n.to, b)
            }, charCoords: function (a, b) {
                a = F(a);
                if (b == "local")return ga(a, false);
                if (b == "div")return ga(a, true);
                var f;
                f = ga(a, true);
                var i = wa(z);
                return f = {x: i.left + f.x, y: i.top + f.y, yBot: i.top + f.yBot}
            }, coordsChar: function (a) {
                var b = wa(z);
                return Cb(a.x - b.left, a.y - b.top)
            }, markText: x(Eb), setBookmark: Oc, findMarksAt: Pc, setMarker: x(Qc), clearMarker: x(Rc),
                setLineClass: x(Sc), hideLine: x(function (a) {
                    return zb(a, true)
                }), showLine: x(function (a) {
                    return zb(a, false)
                }), onDeleteLine: function (a, b) {
                    if (typeof a == "number") {
                        if (!f(a))return null;
                        a = i(a)
                    }
                    (a.handlers || (a.handlers = [])).push(b);
                    return a
                }, lineInfo: Tc, addWidget: function (a, b, f, i, c) {
                    var a = ga(F(a)), d = a.yBot, p = a.x;
                    b.style.position = "absolute";
                    O.appendChild(b);
                    if (i == "over")d = a.y; else if (i == "near") {
                        var i = Math.max(u.offsetHeight, s.height * qa()), e = Math.max(O.clientWidth, z.clientWidth) - z.offsetLeft;
                        a.yBot + b.offsetHeight >
                            i && a.y > b.offsetHeight && (d = a.y - b.offsetHeight);
                        p + b.offsetWidth > e && (p = e - b.offsetWidth)
                    }
                    b.style.top = d + z.offsetTop + "px";
                    b.style.left = b.style.right = "";
                    if (c == "right") {
                        p = O.clientWidth - b.offsetWidth;
                        b.style.right = "0px"
                    } else {
                        c == "left" ? p = 0 : c == "middle" && (p = (O.clientWidth - b.offsetWidth) / 2);
                        b.style.left = p + z.offsetLeft + "px"
                    }
                    f && dc(p, d, p + b.offsetWidth, d + b.offsetHeight)
                }, lineCount: function () {
                    return s.size
                }, clipPos: F, getCursor: function (a) {
                    if (a == null)a = n.inverted;
                    return{line: (a ? n.from : n.to).line, ch: (a ? n.from : n.to).ch}
                },
                somethingSelected: function () {
                    return!H(n.from, n.to)
                }, setCursor: x(function (a, b, f) {
                    b == null && typeof a.line == "number" ? ma(a.line, a.ch, f) : ma(a, b, f)
                }), setSelection: x(function (a, b, f) {
                    (f ? la : Ma)(F(a), F(b || a))
                }), getLine: function (a) {
                    if (f(a))return i(a).text
                }, getLineHandle: function (a) {
                    if (f(a))return i(a)
                }, setLine: x(function (a, b) {
                    f(a) && aa(b, {line: a, ch: 0}, {line: a, ch: i(a).text.length})
                }), removeLine: x(function (a) {
                    f(a) && aa("", {line: a, ch: 0}, F({line: a + 1, ch: 0}))
                }), replaceRange: x(aa), getRange: function (a, b) {
                    return ac(F(a),
                        F(b))
                }, triggerOnKeyDown: x(Wb), execCommand: function (a) {
                    return Sb[a](E)
                }, moveH: x(Jc), deleteH: x(Kc), moveV: x(Lc), toggleOverwrite: function () {
                    if (ab) {
                        ab = false;
                        Q.className = Q.className.replace(" CodeMirror-overwrite", "")
                    } else {
                        ab = true;
                        Q.className = Q.className + " CodeMirror-overwrite"
                    }
                }, posFromIndex: function (a) {
                    var b = 0, f;
                    s.iter(0, s.size, function (i) {
                        i = i.text.length + 1;
                        if (i > a) {
                            f = a;
                            return true
                        }
                        a = a - i;
                        ++b
                    });
                    return F({line: b, ch: f})
                }, indexFromPos: function (a) {
                    if (a.line < 0 || a.ch < 0)return 0;
                    var b = a.ch;
                    s.iter(0, a.line, function (a) {
                        b =
                            b + (a.text.length + 1)
                    });
                    return b
                }, scrollTo: function (a, b) {
                    if (a != null)u.scrollLeft = a;
                    if (b != null)u.scrollTop = b;
                    va([])
                }, operation: function (a) {
                    return x(a)()
                }, refresh: function () {
                    va(true);
                    if (u.scrollHeight > Lb)u.scrollTop = Lb
                }, getInputField: function () {
                    return C
                }, getWrapperElement: function () {
                    return D
                }, getScrollerElement: function () {
                    return u
                }, getGutterElement: function () {
                    return P
                }}, ob = null, Vb, Da = !1, ra = "", db = null;
            Db.prototype.clear = x(function () {
                for (var a = Infinity, b = -Infinity, f = 0, i = this.set.length; f < i; ++f) {
                    var c = this.set[f],
                        d = c.marked;
                    if (d && c.parent) {
                        c = M(c);
                        a = Math.min(a, c);
                        b = Math.max(b, c);
                        for (c = 0; c < d.length; ++c)d[c].marker == this && d.splice(c--, 1)
                    }
                }
                a != Infinity && X.push({from: a, to: b + 1})
            });
            Db.prototype.find = function () {
                for (var a, b, f = 0, i = this.set.length; f < i; ++f)for (var c = this.set[f], d = c.marked, p = 0; p < d.length; ++p) {
                    var e = d[p];
                    if (e.marker == this && (e.from != null || e.to != null)) {
                        var g = M(c);
                        if (g != null) {
                            e.from != null && (a = {line: g, ch: e.from});
                            e.to != null && (b = {line: g, ch: e.to})
                        }
                    }
                }
                return{from: a, to: b}
            };
            var mc = Math.floor(16777215 * Math.random()).toString(16),
                Fb, nc, ya, pc, oc = 0, Gb = {"(": ")>", ")": "(<", "[": "]>", "]": "[<", "{": "}>", "}": "{<"}, tc = 0, Qa;
            for (Qa in hb)hb.propertyIsEnumerable(Qa) && !E.propertyIsEnumerable(Qa) && (E[Qa] = hb[Qa]);
            return E
        }

        function l(a) {
            return"string" == typeof a ? da[a] : a
        }

        function g(a, b, f, i) {
            function c(b) {
                var b = l(b), f = b[a];
                if (null != f && i(f))return!0;
                if (b.catchall)return i(b.catchall);
                b = b.fallthrough;
                if (null == b)return!1;
                if ("[object Array]" != Object.prototype.toString.call(b))return c(b);
                for (var f = 0, d = b.length; f < d; ++f)if (c(b[f]))return!0;
                return!1
            }

            return b && c(b) ? !0 : c(f)
        }

        function c(a) {
            a = ua[R(a, "keyCode")];
            return"Ctrl" == a || "Alt" == a || "Shift" == a || "Mod" == a
        }

        function e(a, b) {
            if (!0 === b)return b;
            if (a.copyState)return a.copyState(b);
            var f = {}, i;
            for (i in b) {
                var c = b[i];
                c instanceof Array && (c = c.concat([]));
                f[i] = c
            }
            return f
        }

        function h(a, b, f) {
            return a.startState ? a.startState(b, f) : !0
        }

        function o(a, b) {
            this.pos = this.start = 0;
            this.string = a;
            this.tabSize = b || 8
        }

        function k(a, b, f, i) {
            this.from = a;
            this.to = b;
            this.style = f;
            this.marker = i
        }

        function r(a) {
            this.to = this.from = a;
            this.line =
                null
        }

        function v(a, b) {
            this.styles = b || [a, null];
            this.text = a;
            this.height = 1;
            this.stateAfter = this.parent = this.hidden = this.marked = this.gutterMarker = this.className = this.bgClassName = this.handlers = null
        }

        function t(a, b, f, i) {
            for (var c = 0, d = 0, e = 0; d < b; c += 2) {
                var g = f[c], h = d + g.length;
                0 == e ? (h > a && i.push(g.slice(a - d, Math.min(g.length, b - d)), f[c + 1]), h >= a && (e = 1)) : 1 == e && (h > b ? i.push(g.slice(0, b - d), f[c + 1]) : i.push(g, f[c + 1]));
                d = h
            }
        }

        function w(a) {
            this.lines = a;
            this.parent = null;
            for (var b = 0, f = a.length, i = 0; b < f; ++b)a[b].parent = this,
                i += a[b].height;
            this.height = i
        }

        function y(a) {
            this.children = a;
            for (var b = 0, f = 0, i = 0, c = a.length; i < c; ++i) {
                var d = a[i], b = b + d.chunkSize(), f = f + d.height;
                d.parent = this
            }
            this.size = b;
            this.height = f;
            this.parent = null
        }

        function M(a) {
            if (null == a.parent)return null;
            for (var b = a.parent, a = Ga(b.lines, a), f = b.parent; f; b = f, f = f.parent)for (var i = 0; f.children[i] != b; ++i)a += f.children[i].chunkSize();
            return a
        }

        function K(a, b) {
            var f = 0;
            a:do {
                for (var i = 0, c = a.children.length; i < c; ++i) {
                    var d = a.children[i], e = d.height;
                    if (b < e) {
                        a = d;
                        continue a
                    }
                    b -=
                        e;
                    f += d.chunkSize()
                }
                return f
            } while (!a.lines);
            i = 0;
            for (c = a.lines.length; i < c; ++i) {
                d = a.lines[i];
                d = d.height;
                if (b < d)break;
                b -= d
            }
            return f + i
        }

        function Y(a, b) {
            var f = 0;
            a:do {
                for (var i = 0, c = a.children.length; i < c; ++i) {
                    var d = a.children[i], e = d.chunkSize();
                    if (b < e) {
                        a = d;
                        continue a
                    }
                    b -= e;
                    f += d.height
                }
                return f
            } while (!a.lines);
            for (i = 0; i < b; ++i)f += a.lines[i].height;
            return f
        }

        function G() {
            this.time = 0;
            this.done = [];
            this.undone = []
        }

        function za() {
            Oa(this)
        }

        function nb(a) {
            a.stop || (a.stop = za);
            return a
        }

        function I(a) {
            a.preventDefault ? a.preventDefault() :
                a.returnValue = !1
        }

        function ib(a) {
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
        }

        function Oa(a) {
            I(a);
            ib(a)
        }

        function Pb(a) {
            if (a.which)return a.which;
            if (a.button & 1)return 1;
            if (a.button & 2)return 3;
            if (a.button & 4)return 2
        }

        function R(a, b) {
            var f = a.override && a.override.hasOwnProperty(b);
            return f ? a.override[b] : a[b]
        }

        function B(a, b, f, i) {
            if ("function" == typeof a.addEventListener) {
                if (a.addEventListener(b, f, !1), i)return function () {
                    a.removeEventListener(b, f, !1)
                }
            } else {
                var c = function (a) {
                    f(a || window.event)
                };
                a.attachEvent("on" + b, c);
                if (i)return function () {
                    a.detachEvent("on" + b, c)
                }
            }
        }

        function Kb() {
            this.id = null
        }

        function Ra(a, b, f) {
            null == b && (b = a.search(/[^\s\u00a0]/), -1 == b && (b = a.length));
            for (var i = 0, c = 0; i < b; ++i)"\t" == a.charAt(i) ? c += f - c % f : ++c;
            return c
        }

        function wa(a, b) {
            for (var f = a.ownerDocument.body, c = 0, d = 0, e = !1, g = a; g; g = g.offsetParent) {
                var h = g.offsetLeft, k = g.offsetTop;
                g == f ? (c += Math.abs(h), d += Math.abs(k)) : (c += h, d += k);
                if (h = b)h = g.currentStyle ? g.currentStyle : window.getComputedStyle(g, null), h = "fixed" == h.position;
                h &&
                (e = !0)
            }
            f = b && !e ? null : f;
            for (g = a.parentNode; g != f; g = g.parentNode)null != g.scrollLeft && (c -= g.scrollLeft, d -= g.scrollTop);
            return{left: c, top: d}
        }

        function bc(a) {
            Ib ? (a.selectionStart = 0, a.selectionEnd = a.value.length) : a.select()
        }

        function H(a, b) {
            return a.line == b.line && a.ch == b.ch
        }

        function $(a, b) {
            return a.line < b.line || a.line == b.line && a.ch < b.ch
        }

        function ca(a) {
            ha.textContent = a;
            return ha.innerHTML
        }

        function Bc(a, b) {
            if (!b)return 0;
            if (!a)return b.length;
            for (var f = a.length, c = b.length; 0 <= f && 0 <= c && a.charAt(f) == b.charAt(c); --f,
                --c);
            return c + 1
        }

        function Ga(a, b) {
            if (a.indexOf)return a.indexOf(b);
            for (var f = 0, c = a.length; f < c; ++f)if (a[f] == b)return f;
            return-1
        }

        function Bb(a) {
            return/\w/.test(a) || a.toUpperCase() != a.toLowerCase()
        }

        d.defaults = {value: "", mode: null, theme: "default", indentUnit: 2, indentWithTabs: !1, smartIndent: !0, tabSize: 4, keyMap: "default", extraKeys: null, electricChars: !0, autoClearEmptyLines: !1, onKeyEvent: null, lineWrapping: !1, lineNumbers: !1, gutter: !1, fixedGutter: !1, firstLineNumber: 1, readOnly: !1, dragDrop: !0, onChange: null, onCursorActivity: null,
            onGutterClick: null, onHighlightComplete: null, onUpdate: null, onFocus: null, onBlur: null, onScroll: null, matchBrackets: !1, workTime: 100, workDelay: 200, pollInterval: 100, undoDepth: 40, tabindex: null, autofocus: null};
        var Ib = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent), kb = Ib || /Mac/.test(navigator.platform);
        /Win/.test(navigator.platform);
        var ia = d.modes = {}, ja = d.mimeModes = {};
        d.defineMode = function (a, b) {
            !d.defaults.mode && "null" != a && (d.defaults.mode = a);
            ia[a] = b
        };
        d.defineMIME = function (a, b) {
            ja[a] = b
        };
        d.resolveMode = function (a) {
            if ("string" == typeof a && ja.hasOwnProperty(a))a = ja[a]; else if ("string" == typeof a && /^[\w\-]+\/[\w\-]+\+xml$/.test(a))return d.resolveMode("application/xml");
            return"string" == typeof a ? {name: a} : a || {name: "null"}
        };
        d.getMode = function (a, b) {
            var b = d.resolveMode(b), f = ia[b.name];
            return!f ? (window.console && console.warn("No mode " + b.name + " found, falling back to plain text."), d.getMode(a, "text/plain")) : f(a, b)
        };
        d.listModes = function () {
            var a = [], b;
            for (b in ia)ia.propertyIsEnumerable(b) &&
            a.push(b);
            return a
        };
        d.listMIMEs = function () {
            var a = [], b;
            for (b in ja)ja.propertyIsEnumerable(b) && a.push({mime: b, mode: ja[b]});
            return a
        };
        var hb = d.extensions = {};
        d.defineExtension = function (a, b) {
            hb[a] = b
        };
        var Sb = d.commands = {selectAll: function (a) {
            a.setSelection({line: 0, ch: 0}, {line: a.lineCount() - 1})
        }, killLine: function (a) {
            var b = a.getCursor(!0), f = a.getCursor(!1), c = !H(b, f);
            !c && a.getLine(b.line).length == b.ch ? a.replaceRange("", b, {line: b.line + 1, ch: 0}) : a.replaceRange("", b, c ? f : {line: b.line})
        }, deleteLine: function (a) {
            var b =
                a.getCursor().line;
            a.replaceRange("", {line: b, ch: 0}, {line: b})
        }, undo: function (a) {
            a.undo()
        }, redo: function (a) {
            a.redo()
        }, goDocStart: function (a) {
            a.setCursor(0, 0, !0)
        }, goDocEnd: function (a) {
            a.setSelection({line: a.lineCount() - 1}, null, !0)
        }, goLineStart: function (a) {
            a.setCursor(a.getCursor().line, 0, !0)
        }, goLineStartSmart: function (a) {
            var b = a.getCursor(), f = a.getLine(b.line), f = Math.max(0, f.search(/\S/));
            a.setCursor(b.line, b.ch <= f && b.ch ? 0 : f, !0)
        }, goLineEnd: function (a) {
            a.setSelection({line: a.getCursor().line}, null, !0)
        },
            goLineUp: function (a) {
                a.moveV(-1, "line")
            }, goLineDown: function (a) {
                a.moveV(1, "line")
            }, goPageUp: function (a) {
                a.moveV(-1, "page")
            }, goPageDown: function (a) {
                a.moveV(1, "page")
            }, goCharLeft: function (a) {
                a.moveH(-1, "char")
            }, goCharRight: function (a) {
                a.moveH(1, "char")
            }, goColumnLeft: function (a) {
                a.moveH(-1, "column")
            }, goColumnRight: function (a) {
                a.moveH(1, "column")
            }, goWordLeft: function (a) {
                a.moveH(-1, "word")
            }, goWordRight: function (a) {
                a.moveH(1, "word")
            }, delCharLeft: function (a) {
                a.deleteH(-1, "char")
            }, delCharRight: function (a) {
                a.deleteH(1,
                    "char")
            }, delWordLeft: function (a) {
                a.deleteH(-1, "word")
            }, delWordRight: function (a) {
                a.deleteH(1, "word")
            }, indentAuto: function (a) {
                a.indentSelection("smart")
            }, indentMore: function (a) {
                a.indentSelection("add")
            }, indentLess: function (a) {
                a.indentSelection("subtract")
            }, insertTab: function (a) {
                a.replaceSelection("\t", "end")
            }, transposeChars: function (a) {
                var b = a.getCursor(), f = a.getLine(b.line);
                0 < b.ch && b.ch < f.length - 1 && a.replaceRange(f.charAt(b.ch) + f.charAt(b.ch - 1), {line: b.line, ch: b.ch - 1}, {line: b.line, ch: b.ch + 1})
            }, newlineAndIndent: function (a) {
                a.replaceSelection("\n",
                    "end");
                a.indentLine(a.getCursor().line)
            }, toggleOverwrite: function (a) {
                a.toggleOverwrite()
            }}, da = d.keyMap = {};
        da.basic = {Left: "goCharLeft", Right: "goCharRight", Up: "goLineUp", Down: "goLineDown", End: "goLineEnd", Home: "goLineStartSmart", PageUp: "goPageUp", PageDown: "goPageDown", Delete: "delCharRight", Backspace: "delCharLeft", Tab: "insertTab", "Shift-Tab": "indentAuto", Enter: "newlineAndIndent", Insert: "toggleOverwrite"};
        da.pcDefault = {"Ctrl-A": "selectAll", "Ctrl-D": "deleteLine", "Ctrl-Z": "undo", "Shift-Ctrl-Z": "redo", "Ctrl-Y": "redo",
            "Ctrl-Home": "goDocStart", "Alt-Up": "goDocStart", "Ctrl-End": "goDocEnd", "Ctrl-Down": "goDocEnd", "Ctrl-Left": "goWordLeft", "Ctrl-Right": "goWordRight", "Alt-Left": "goLineStart", "Alt-Right": "goLineEnd", "Ctrl-Backspace": "delWordLeft", "Ctrl-Delete": "delWordRight", "Ctrl-S": "save", "Ctrl-F": "find", "Ctrl-G": "findNext", "Shift-Ctrl-G": "findPrev", "Shift-Ctrl-F": "replace", "Shift-Ctrl-R": "replaceAll", "Ctrl-[": "indentLess", "Ctrl-]": "indentMore", fallthrough: "basic"};
        da.macDefault = {"Cmd-A": "selectAll", "Cmd-D": "deleteLine",
            "Cmd-Z": "undo", "Shift-Cmd-Z": "redo", "Cmd-Y": "redo", "Cmd-Up": "goDocStart", "Cmd-End": "goDocEnd", "Cmd-Down": "goDocEnd", "Alt-Left": "goWordLeft", "Alt-Right": "goWordRight", "Cmd-Left": "goLineStart", "Cmd-Right": "goLineEnd", "Alt-Backspace": "delWordLeft", "Ctrl-Alt-Backspace": "delWordRight", "Alt-Delete": "delWordRight", "Cmd-S": "save", "Cmd-F": "find", "Cmd-G": "findNext", "Shift-Cmd-G": "findPrev", "Cmd-Alt-F": "replace", "Shift-Cmd-Alt-F": "replaceAll", "Cmd-[": "indentLess", "Cmd-]": "indentMore", fallthrough: ["basic", "emacsy"]};
        da["default"] = kb ? da.macDefault : da.pcDefault;
        da.emacsy = {"Ctrl-F": "goCharRight", "Ctrl-B": "goCharLeft", "Ctrl-P": "goLineUp", "Ctrl-N": "goLineDown", "Alt-F": "goWordRight", "Alt-B": "goWordLeft", "Ctrl-A": "goLineStart", "Ctrl-E": "goLineEnd", "Ctrl-V": "goPageUp", "Shift-Ctrl-V": "goPageDown", "Ctrl-D": "delCharRight", "Ctrl-H": "delCharLeft", "Alt-D": "delWordRight", "Alt-Backspace": "delWordLeft", "Ctrl-K": "killLine", "Ctrl-T": "transposeChars"};
        d.fromTextArea = function (a, b) {
            function f() {
                a.value = h.getValue()
            }

            b || (b = {});
            b.value =
                a.value;
            !b.tabindex && a.tabindex && (b.tabindex = a.tabindex);
            null == b.autofocus && null != a.getAttribute("autofocus") && (b.autofocus = !0);
            if (a.form) {
                var c = B(a.form, "submit", f, !0);
                if ("function" == typeof a.form.submit) {
                    var e = a.form.submit, g = function () {
                        f();
                        a.form.submit = e;
                        a.form.submit();
                        a.form.submit = g
                    };
                    a.form.submit = g
                }
            }
            a.style.display = "none";
            var h = d(function (b) {
                a.parentNode.insertBefore(b, a.nextSibling)
            }, b);
            h.save = f;
            h.getTextArea = function () {
                return a
            };
            h.toTextArea = function () {
                f();
                a.parentNode.removeChild(h.getWrapperElement());
                a.style.display = "";
                if (a.form) {
                    c();
                    if (typeof a.form.submit == "function")a.form.submit = e
                }
            };
            return h
        };
        d.copyState = e;
        d.startState = h;
        o.prototype = {eol: function () {
            return this.pos >= this.string.length
        }, sol: function () {
            return 0 == this.pos
        }, peek: function () {
            return this.string.charAt(this.pos)
        }, next: function () {
            if (this.pos < this.string.length)return this.string.charAt(this.pos++)
        }, eat: function (a) {
            var b = this.string.charAt(this.pos);
            if (a = "string" == typeof a ? b == a : b && (a.test ? a.test(b) : a(b)))return++this.pos, b
        }, eatWhile: function (a) {
            for (var b =
                this.pos; this.eat(a););
            return this.pos > b
        }, eatSpace: function () {
            for (var a = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;
            return this.pos > a
        }, skipToEnd: function () {
            this.pos = this.string.length
        }, skipTo: function (a) {
            a = this.string.indexOf(a, this.pos);
            if (-1 < a)return this.pos = a, !0
        }, backUp: function (a) {
            this.pos -= a
        }, column: function () {
            return Ra(this.string, this.start, this.tabSize)
        }, indentation: function () {
            return Ra(this.string, null, this.tabSize)
        }, match: function (a, b, f) {
            if ("string" == typeof a) {
                if ((f ?
                    this.string.toLowerCase() : this.string).indexOf(f ? a.toLowerCase() : a, this.pos) == this.pos)return!1 !== b && (this.pos += a.length), !0
            } else {
                if ((a = this.string.slice(this.pos).match(a)) && !1 !== b)this.pos += a[0].length;
                return a
            }
        }, current: function () {
            return this.string.slice(this.start, this.pos)
        }};
        d.StringStream = o;
        k.prototype = {attach: function (a) {
            this.marker.set.push(a)
        }, detach: function (a) {
            a = Ga(this.marker.set, a);
            -1 < a && this.marker.set.splice(a, 1)
        }, split: function (a, b) {
            if (this.to <= a && null != this.to)return null;
            var f =
                this.from < a || null == this.from ? null : this.from - a + b, c = null == this.to ? null : this.to - a + b;
            return new k(f, c, this.style, this.marker)
        }, dup: function () {
            return new k(null, null, this.style, this.marker)
        }, clipTo: function (a, b, f, c, d) {
            a && c > this.from && (c < this.to || null == this.to) ? this.from = null : null != this.from && this.from >= b && (this.from = Math.max(c, this.from) + d);
            f && (b < this.to || null == this.to) && (b > this.from || null == this.from) ? this.to = null : null != this.to && this.to > b && (this.to = c < this.to ? this.to + d : b)
        }, isDead: function () {
            return null !=
                this.from && null != this.to && this.from >= this.to
        }, sameSet: function (a) {
            return this.marker == a.marker
        }};
        r.prototype = {attach: function (a) {
            this.line = a
        }, detach: function (a) {
            this.line == a && (this.line = null)
        }, split: function (a, b) {
            if (a < this.from)return this.from = this.to = this.from - a + b, this
        }, isDead: function () {
            return this.from > this.to
        }, clipTo: function (a, b, f, c, d) {
            (a || b < this.from) && (f || c > this.to) ? (this.from = 0, this.to = -1) : this.from > b && (this.from = this.to = Math.max(c, this.from) + d)
        }, sameSet: function () {
            return!1
        }, find: function () {
            return!this.line || !this.line.parent ? null : {line: M(this.line), ch: this.from}
        }, clear: function () {
            if (this.line) {
                var a = Ga(this.line.marked, this);
                -1 != a && this.line.marked.splice(a, 1);
                this.line = null
            }
        }};
        v.inheritMarks = function (a, b) {
            var f = new v(a), c = b && b.marked;
            if (c)for (var d = 0; d < c.length; ++d)if (null == c[d].to && c[d].style) {
                var e = f.marked || (f.marked = []), g = c[d], g = g.dup();
                e.push(g);
                g.attach(f)
            }
            return f
        };
        v.prototype = {replace: function (a, b, f) {
            var c = [], d = this.marked, e = null == b ? this.text.length : b;
            t(0, a, this.styles, c);
            f && c.push(f, null);
            t(e, this.text.length, this.styles, c);
            this.styles = c;
            this.text = this.text.slice(0, a) + f + this.text.slice(e);
            this.stateAfter = null;
            if (d) {
                f = f.length - (e - a);
                for (c = 0; c < d.length; ++c) {
                    var g = d[c];
                    g.clipTo(null == a, a || 0, null == b, e, f);
                    g.isDead() && (g.detach(this), d.splice(c--, 1))
                }
            }
        }, split: function (a, b) {
            var f = [b, null], c = this.marked;
            t(a, this.text.length, this.styles, f);
            f = new v(b + this.text.slice(a), f);
            if (c)for (var d = 0; d < c.length; ++d) {
                var e = c[d], g = e.split(a, b.length);
                g && (f.marked || (f.marked = []), f.marked.push(g), g.attach(f),
                    g == e && c.splice(d--, 1))
            }
            return f
        }, append: function (a) {
            var b = this.text.length, f = a.marked, c = this.marked;
            this.text += a.text;
            t(0, a.text.length, a.styles, this.styles);
            if (c)for (a = 0; a < c.length; ++a)null == c[a].to && (c[a].to = b);
            if (f && f.length) {
                c || (this.marked = c = []);
                a = 0;
                a:for (; a < f.length; ++a) {
                    var d = f[a];
                    if (!d.from)for (var e = 0; e < c.length; ++e) {
                        var g = c[e];
                        if (g.to == b && g.sameSet(d)) {
                            g.to = null == d.to ? null : d.to + b;
                            g.isDead() && (g.detach(this), f.splice(a--, 1));
                            continue a
                        }
                    }
                    c.push(d);
                    d.attach(this);
                    d.from += b;
                    null != d.to && (d.to +=
                        b)
                }
            }
        }, fixMarkEnds: function (a) {
            var b = this.marked, a = a.marked;
            if (b)for (var f = 0; f < b.length; ++f) {
                var c = b[f], d = null == c.to;
                if (d && a)for (var e = 0; e < a.length; ++e)if (a[e].sameSet(c)) {
                    d = !1;
                    break
                }
                d && (c.to = this.text.length)
            }
        }, fixMarkStarts: function () {
            var a = this.marked;
            if (a)for (var b = 0; b < a.length; ++b)null == a[b].from && (a[b].from = 0)
        }, addMark: function (a) {
            a.attach(this);
            null == this.marked && (this.marked = []);
            this.marked.push(a);
            this.marked.sort(function (a, f) {
                return(a.from || 0) - (f.from || 0)
            })
        }, highlight: function (a, b, f) {
            var f =
                new o(this.text, f), c = this.styles, d = 0, e = !1, g = c[0], h;
            for ("" == this.text && a.blankLine && a.blankLine(b); !f.eol();) {
                var k = a.token(f, b), l = this.text.slice(f.start, f.pos);
                f.start = f.pos;
                if (d && c[d - 1] == k)c[d - 2] += l; else if (l) {
                    if (!e && (c[d + 1] != k || d && c[d - 2] != h))e = !0;
                    c[d++] = l;
                    c[d++] = k;
                    h = g;
                    g = c[d]
                }
                if (5E3 < f.pos) {
                    c[d++] = this.text.slice(f.pos);
                    c[d++] = null;
                    break
                }
            }
            c.length != d && (c.length = d, e = !0);
            d && c[d - 2] != h && (e = !0);
            return e || (5 > c.length && 10 > this.text.length ? null : !1)
        }, getTokenAt: function (a, b, c) {
            for (var d = this.text, d = new o(d); d.pos <
                c && !d.eol();) {
                d.start = d.pos;
                var e = a.token(d, b)
            }
            return{start: d.start, end: d.pos, string: d.current(), className: e || null, state: b}
        }, indentation: function (a) {
            return Ra(this.text, null, a)
        }, getHTML: function (a, b) {
            function c(b, f) {
                if (b) {
                    g && (fa && " " == b.charAt(0)) && (b = "\u00a0" + b.slice(1));
                    g = !1;
                    if (-1 == b.indexOf("\t")) {
                        h += b.length;
                        var d = ca(b)
                    } else for (var d = "", i = 0; ;) {
                        var k = b.indexOf("\t", i);
                        if (-1 == k) {
                            d += ca(b.slice(i));
                            h += b.length - i;
                            break
                        } else {
                            h += k - i;
                            var l = a(h), d = d + (ca(b.slice(i, k)) + l.html);
                            h += l.width;
                            i = k + 1
                        }
                    }
                    f ? e.push('<span class="',
                        f, '">', d, "</span>") : e.push(d)
                }
            }

            function d(a) {
                return!a ? null : "cm-" + a.replace(/ +/g, " cm-")
            }

            var e = [], g = !0, h = 0, k = this.styles, l = this.text, r = this.marked, y = l.length;
            null != b && (y = Math.min(b, y));
            if (!l && null == b)c(" "); else if (!r || !r.length)for (var o = l = 0; o < y; l += 2) {
                var v = k[l], w = k[l + 1], t = v.length;
                o + t > y && (v = v.slice(0, y - o));
                o += t;
                c(v, d(w))
            } else for (var K = 0, l = 0, o = "", M = r[0].from || 0, G = [], Y = 0, v = function () {
                for (var a; Y < r.length && ((a = r[Y]).from == K || null == a.from);)null != a.style && G.push(a), ++Y;
                M = Y < r.length ? r[Y].from : Infinity;
                for (a = 0; a < G.length; ++a) {
                    var b = G[a].to || Infinity;
                    b == K ? G.splice(a--, 1) : M = Math.min(b, M)
                }
            }; K < y;) {
                M == K && v();
                for (t = Math.min(y, M); ;) {
                    if (o) {
                        for (var I = K + o.length, B = w, za = 0; za < G.length; ++za)B = (B ? B + " " : "") + G[za].style;
                        c(I > t ? o.slice(0, t - K) : o, B);
                        if (I >= t) {
                            o = o.slice(t - K);
                            K = t;
                            break
                        }
                        K = I
                    }
                    o = k[l++];
                    w = d(k[l++])
                }
            }
            return e.join("")
        }, cleanUp: function () {
            this.parent = null;
            if (this.marked)for (var a = 0, b = this.marked.length; a < b; ++a)this.marked[a].detach(this)
        }};
        w.prototype = {chunkSize: function () {
            return this.lines.length
        }, remove: function (a, b, c) {
            for (var d = a, e = a + b; d < e; ++d) {
                var g = this.lines[d];
                this.height -= g.height;
                g.cleanUp();
                if (g.handlers)for (var h = 0; h < g.handlers.length; ++h)c.push(g.handlers[h])
            }
            this.lines.splice(a, b)
        }, collapse: function (a) {
            a.splice.apply(a, [a.length, 0].concat(this.lines))
        }, insertHeight: function (a, b, c) {
            this.height += c;
            fa ? this.lines = this.lines.slice(0, a).concat(b).concat(this.lines.slice(a)) : this.lines.splice.apply(this.lines, [a, 0].concat(b));
            a = 0;
            for (c = b.length; a < c; ++a)b[a].parent = this
        }, iterN: function (a, b, c) {
            for (b = a + b; a <
                b; ++a)if (c(this.lines[a]))return!0
        }};
        y.prototype = {chunkSize: function () {
            return this.size
        }, remove: function (a, b, c) {
            this.size -= b;
            for (var d = 0; d < this.children.length; ++d) {
                var e = this.children[d], g = e.chunkSize();
                if (a < g) {
                    var h = Math.min(b, g - a), k = e.height;
                    e.remove(a, h, c);
                    this.height -= k - e.height;
                    g == h && (this.children.splice(d--, 1), e.parent = null);
                    if (0 == (b -= h))break;
                    a = 0
                } else a -= g
            }
            25 > this.size - b && (a = [], this.collapse(a), this.children = [new w(a)], this.children[0].parent = this)
        }, collapse: function (a) {
            for (var b = 0, c = this.children.length; b <
                c; ++b)this.children[b].collapse(a)
        }, insert: function (a, b) {
            for (var c = 0, d = 0, e = b.length; d < e; ++d)c += b[d].height;
            this.insertHeight(a, b, c)
        }, insertHeight: function (a, b, c) {
            this.size += b.length;
            this.height += c;
            for (var d = 0, e = this.children.length; d < e; ++d) {
                var g = this.children[d], h = g.chunkSize();
                if (a <= h) {
                    g.insertHeight(a, b, c);
                    if (g.lines && 50 < g.lines.length) {
                        for (; 50 < g.lines.length;)a = g.lines.splice(g.lines.length - 25, 25), a = new w(a), g.height -= a.height, this.children.splice(d + 1, 0, a), a.parent = this;
                        this.maybeSpill()
                    }
                    break
                }
                a -=
                    h
            }
        }, maybeSpill: function () {
            if (!(10 >= this.children.length)) {
                var a = this;
                do {
                    var b = a.children.splice(a.children.length - 5, 5), b = new y(b);
                    if (a.parent) {
                        a.size -= b.size;
                        a.height -= b.height;
                        var c = Ga(a.parent.children, a);
                        a.parent.children.splice(c + 1, 0, b)
                    } else c = new y(a.children), c.parent = a, a.children = [c, b], a = c;
                    b.parent = a.parent
                } while (10 < a.children.length);
                a.parent.maybeSpill()
            }
        }, iter: function (a, b, c) {
            this.iterN(a, b - a, c)
        }, iterN: function (a, b, c) {
            for (var d = 0, e = this.children.length; d < e; ++d) {
                var g = this.children[d], h =
                    g.chunkSize();
                if (a < h) {
                    h = Math.min(b, h - a);
                    if (g.iterN(a, h, c))return!0;
                    if (0 == (b -= h))break;
                    a = 0
                } else a -= h
            }
        }};
        G.prototype = {addChange: function (a, b, c) {
            this.undone.length = 0;
            var d = +new Date, e = this.done[this.done.length - 1], g = e && e[e.length - 1], h = d - this.time;
            if (400 < h || !g)this.done.push([
                {start: a, added: b, old: c}
            ]); else if (g.start > a + c.length || g.start + g.added < a - g.added + g.old.length)e.push({start: a, added: b, old: c}); else {
                e = 0;
                if (a < g.start) {
                    for (e = g.start - a - 1; 0 <= e; --e)g.old.unshift(c[e]);
                    e = Math.min(0, b - c.length);
                    g.added +=
                        g.start - a + e;
                    g.start = a
                } else g.start < a && (e = a - g.start, b += e);
                e = g.added - e;
                for (a = c.length; e < a; ++e)g.old.push(c[e]);
                g.added < b && (g.added = b)
            }
            this.time = d
        }};
        d.e_stop = Oa;
        d.e_preventDefault = I;
        d.e_stopPropagation = ib;
        d.connect = B;
        Kb.prototype = {set: function (a, b) {
            clearTimeout(this.id);
            this.id = setTimeout(b, a)
        }};
        var Tb = d.Pass = {toString: function () {
                return"CodeMirror.Pass"
            }}, Ta = /gecko\/\d{7}/i.test(navigator.userAgent), fa = /MSIE \d/.test(navigator.userAgent), qc = /MSIE [1-8]\b/.test(navigator.userAgent), Ic = fa && 5 == document.documentMode,
            lb = /WebKit\//.test(navigator.userAgent), zc = /Chrome\//.test(navigator.userAgent), pb = /KHTML\//.test(navigator.userAgent), xc = function () {
                if (qc)return!1;
                var a = document.createElement("div");
                return"draggable"in a || "dragDrop"in a
            }();
        (function () {
            var a = document.createElement("textarea");
            a.value = "foo\nbar";
            a.value.indexOf("\r")
        })();
        null != document.documentElement.getBoundingClientRect && (wa = function (a, b) {
            try {
                var c = a.getBoundingClientRect(), c = {top: c.top, left: c.left}
            } catch (d) {
                c = {top: 0, left: 0}
            }
            if (!b)if (null == window.pageYOffset) {
                var e =
                    document.documentElement || document.body.parentNode;
                null == e.scrollTop && (e = document.body);
                c.top += e.scrollTop;
                c.left += e.scrollLeft
            } else c.top += window.pageYOffset, c.left += window.pageXOffset;
            return c
        });
        var ha = document.createElement("pre");
        "\na" == ca("a") ? ca = function (a) {
            ha.textContent = a;
            return ha.innerHTML.slice(1)
        } : "\t" != ca("\t") && (ca = function (a) {
            ha.innerHTML = "";
            ha.appendChild(document.createTextNode(a));
            return ha.innerHTML
        });
        d.htmlEscape = ca;
        var Ea = 3 != "\n\nb".split(/\n/).length ? function (a) {
            for (var b = 0,
                     c, d = []; -1 < (c = a.indexOf("\n", b));)d.push(a.slice(b, "\r" == a.charAt(c - 1) ? c - 1 : c)), b = c + 1;
            d.push(a.slice(b));
            return d
        } : function (a) {
            return a.split(/\r?\n/)
        };
        d.splitLines = Ea;
        var Fc = window.getSelection ? function (a) {
            try {
                return a.selectionStart != a.selectionEnd
            } catch (b) {
                return!1
            }
        } : function (a) {
            try {
                var b = a.ownerDocument.selection.createRange()
            } catch (c) {
            }
            return!b || b.parentElement() != a ? !1 : 0 != b.compareEndPoints("StartToEnd", b)
        };
        d.defineMode("null", function () {
            return{token: function (a) {
                a.skipToEnd()
            }}
        });
        d.defineMIME("text/plain",
            "null");
        var ua = {3: "Enter", 8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Esc", 32: "Space", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "PrintScrn", 45: "Insert", 46: "Delete", 59: ";", 91: "Mod", 92: "Mod", 93: "Mod", 127: "Delete", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'", 63276: "PageUp", 63277: "PageDown", 63275: "End", 63273: "Home", 63234: "Left", 63232: "Up", 63235: "Right", 63233: "Down",
            63302: "Insert", 63272: "Delete"};
        d.keyNames = ua;
        (function () {
            for (var a = 0; 10 > a; a++)ua[a + 48] = "" + a;
            for (a = 65; 90 >= a; a++)ua[a] = String.fromCharCode(a);
            for (a = 1; 12 >= a; a++)ua[a + 111] = ua[a + 63235] = "F" + a
        })();
        return d
    }();
    /*

     Copyright (c) 2011 Marijn Haverbeke

     Licensed under the MIT license:
     http://opensource.org/licenses/mit-license
     */
    window.CodeMirror = CodeMirror;
    /*

     Copyright (c) 2012 Marijn Haverbeke

     Licensed under the MIT license:
     http://opensource.org/licenses/mit-license
     */
    (function () {
        function d(d, g) {
            var c = d.getWrapperElement(), c = c.insertBefore(document.createElement("div"), c.firstChild);
            c.className = "CodeMirror-dialog";
            c.innerHTML = "<div>" + g + "</div>";
            return c
        }

        CodeMirror.defineExtension("openDialog", function (l, g) {
            function c() {
                h || (h = !0, e.parentNode.removeChild(e))
            }

            var e = d(this, l), h = !1, o = this, k = e.getElementsByTagName("input")[0];
            k && (CodeMirror.connect(k, "keydown", function (d) {
                if (13 == d.keyCode || 27 == d.keyCode)CodeMirror.e_stop(d), c(), o.focus(), 13 == d.keyCode && g(k.value)
            }),
                k.focus(), CodeMirror.connect(k, "blur", c));
            return c
        });
        CodeMirror.defineExtension("openConfirm", function (l, g) {
            function c() {
                o || (o = !0, e.parentNode.removeChild(e), k.focus())
            }

            var e = d(this, l), h = e.getElementsByTagName("button"), o = !1, k = this, r = 1;
            h[0].focus();
            for (var v = 0; v < h.length; ++v) {
                var t = h[v];
                (function (d) {
                    CodeMirror.connect(t, "click", function (e) {
                        CodeMirror.e_preventDefault(e);
                        c();
                        d && d(k)
                    })
                })(g[v]);
                CodeMirror.connect(t, "blur", function () {
                    --r;
                    setTimeout(function () {
                        0 >= r && c()
                    }, 200)
                });
                CodeMirror.connect(t, "focus",
                    function () {
                        ++r
                    })
            }
        })
    })();
    /*

     Copyright (c) 2011 Marijn Haverbeke

     the "tagRangeFinder" function is
     Copyright (C) 2011 by Daniel Glazman <daniel@glazman.org>

     Licensed under the MIT license:
     http://opensource.org/licenses/mit-license
     */
    CodeMirror.tagRangeFinder = function (d, l) {
        for (var g = "A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", c = g + "-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", e = RegExp("^[" + g + "][" + c + "]*"), g = d.getLine(l), h = !1, c = null, o = 0; !h;) {
            o = g.indexOf("<", o);
            if (-1 == o)return;
            if (o + 1 < g.length && "/" == g[o + 1])o++; else if (g.substr(o + 1).match(e)) {
                var k = g.indexOf(">", o + 1);
                if (-1 == k) {
                    for (var h = l + 1, r = !1, k = d.lineCount(); h <
                        k && !r;) {
                        var v = d.getLine(h), t = v.indexOf(">");
                        if (-1 != t && (r = !0, v = v.lastIndexOf("/", t), -1 != v && v < t && (t = g.substr(v, t - v + 1), !t.match(/\/\s*\>/))))return h + 1;
                        h++
                    }
                    h = !0
                } else r = g.lastIndexOf("/", k), -1 == r ? h = !0 : (t = g.substr(r, k - r + 1), t.match(/\/\s*\>/) || (h = !0));
                h && (c = g.substr(o + 1), (c = c.match(e)) ? (c = c[0], -1 != g.indexOf("</" + c + ">", o) && (h = !1)) : h = !1);
                h || o++
            } else o++
        }
        if (h) {
            g = "(\\<\\/" + c + "\\>)|(\\<" + c + "\\>)|(\\<" + c + "\\s)|(\\<" + c + "$)";
            e = RegExp(g, "g");
            c = "</" + c + ">";
            o = 1;
            h = l + 1;
            for (k = d.lineCount(); h < k;) {
                g = d.getLine(h);
                if (g = g.match(e))for (r =
                                            0; r < g.length; r++)if (g[r] == c ? o-- : o++, !o)return h + 1;
                h++
            }
        }
    };
    CodeMirror.braceRangeFinder = function (d, l) {
        var g = d.getLine(l), c = g.lastIndexOf("{");
        if (!(0 > c || g.lastIndexOf("}") > c)) {
            var g = d.getTokenAt({line: l, ch: c}).className, c = 1, e = d.lineCount(), h, o = l + 1;
            a:for (; o < e; ++o)for (var k = d.getLine(o), r = 0; ;) {
                var v = k.indexOf("{", r), r = k.indexOf("}", r);
                0 > v && (v = k.length);
                0 > r && (r = k.length);
                r = Math.min(v, r);
                if (r == k.length)break;
                if (d.getTokenAt({line: o, ch: r + 1}).className == g)if (r == v)++c; else if (!--c) {
                    h = o;
                    break a
                }
                ++r
            }
            if (!(null == h || h == l + 1))return h
        }
    };
    CodeMirror.indentRangeFinder = function (d, l) {
        for (var g = d.getOption("tabSize"), c = d.getLineHandle(l).indentation(g), e, h = l + 1, o = d.lineCount(); h < o; ++h) {
            var k = d.getLineHandle(h);
            if (!/^\s*$/.test(k.text)) {
                if (k.indentation(g) <= c)break;
                e = h
            }
        }
        return!e ? null : e + 1
    };
    CodeMirror.newFoldFunction = function (d, l) {
        function g(c, d) {
            for (var g = 0; g < e.length; ++g) {
                var l = c.lineInfo(e[g].start);
                if (l) {
                    if (l.line == d)return{pos: g, region: e[g]}
                } else e.splice(g--, 1)
            }
        }

        function c(c, d) {
            c.clearMarker(d.start);
            for (var e = 0; e < d.hidden.length; ++e)c.showLine(d.hidden[e])
        }

        var e = [];
        null == l && (l = '<div style="position: absolute; left: 2px; color:#600">&#x25bc;</div>%N%');
        return function (h, o) {
            h.operation(function () {
                var k = g(h, o);
                if (k)e.splice(k.pos, 1), c(h, k.region); else {
                    var r = d(h, o);
                    if (null != r) {
                        for (var k =
                            [], v = o + 1; v < r; ++v) {
                            var t = h.hideLine(v);
                            t && k.push(t)
                        }
                        var r = h.setMarker(o, l), w = {start: r, hidden: k};
                        h.onDeleteLine(r, function () {
                            c(h, w)
                        });
                        e.push(w)
                    }
                }
            })
        }
    };
    /*

     Copyright (c) 2012 Marijn Haverbeke

     Licensed under the MIT license:
     http://opensource.org/licenses/mit-license
     */
    CodeMirror.modeExtensions || (CodeMirror.modeExtensions = {});
    CodeMirror.defineExtension("getModeExt", function () {
        var d = CodeMirror.resolveMode(this.getOption("mode")).name, l = CodeMirror.modeExtensions[d];
        if (!l)throw Error("No extensions found for mode " + d);
        return l
    });
    CodeMirror.defineExtension("getModeExtAtPos", function (d) {
        return(d = this.getTokenAt(d)) && d.state && d.state.mode ? CodeMirror.modeExtensions[d.state.mode == "html" ? "htmlmixed" : d.state.mode] : this.getModeExt()
    });
    CodeMirror.defineExtension("commentRange", function (d, l, g) {
        var c = this.getModeExtAtPos(this.getCursor());
        if (d) {
            this.getRange(l, g);
            this.replaceRange(c.commentStart + this.getRange(l, g) + c.commentEnd, l, g);
            l.line == g.line && l.ch == g.ch && this.setCursor(l.line, l.ch + c.commentStart.length)
        } else {
            var d = this.getRange(l, g), e = d.indexOf(c.commentStart), h = d.lastIndexOf(c.commentEnd);
            e > -1 && (h > -1 && h > e) && (d = d.substr(0, e) + d.substring(e + c.commentStart.length, h) + d.substr(h + c.commentEnd.length));
            this.replaceRange(d, l, g)
        }
    });
    CodeMirror.defineExtension("autoIndentRange", function (d, l) {
        var g = this;
        this.operation(function () {
            for (var c = d.line; c <= l.line; c++)g.indentLine(c, "smart")
        })
    });
    CodeMirror.defineExtension("autoFormatRange", function (d, l) {
        var g = this.indexFromPos(d), c = this.indexFromPos(l), e = this.getModeExt().autoFormatLineBreaks(this.getValue(), g, c), h = this;
        this.operation(function () {
            h.replaceRange(e, d, l);
            for (var c = h.posFromIndex(g).line, k = h.posFromIndex(g + e.length).line; c <= k; c++)h.indentLine(c, "smart")
        })
    });
    CodeMirror.modeExtensions.css = {commentStart: "/*", commentEnd: "*/", wordWrapChars: [";", "\\{", "\\}"], autoFormatLineBreaks: function (d) {
        return d.replace(RegExp("(;|\\{|\\})([^\r\n])", "g"), "$1\n$2")
    }};
    CodeMirror.modeExtensions.javascript = {commentStart: "/*", commentEnd: "*/", wordWrapChars: [";", "\\{", "\\}"], getNonBreakableBlocks: function (d) {
        for (var l = [/for\s*?\(([\s\S]*?)\)/, /'([\s\S]*?)('|$)/, /"([\s\S]*?)("|$)/, /\/\/.*([\r\n]|$)/], g = [], c = 0; c < l.length; c++)for (var e = 0; e < d.length;) {
            var h = d.substr(e).match(l[c]);
            if (h != null) {
                g.push({start: e + h.index, end: e + h.index + h[0].length});
                e = e + (h.index + Math.max(1, h[0].length))
            } else break
        }
        g.sort(function (c, d) {
            return c.start - d.start
        });
        return g
    }, autoFormatLineBreaks: function (d) {
        var l =
            0, g = RegExp("(;|\\{|\\})([^\r\n])", "g"), c = this.getNonBreakableBlocks(d);
        if (c != null) {
            for (var e = "", h = 0; h < c.length; h++) {
                if (c[h].start > l) {
                    e = e + d.substring(l, c[h].start).replace(g, "$1\n$2");
                    l = c[h].start
                }
                if (c[h].start <= l && c[h].end >= l) {
                    e = e + d.substring(l, c[h].end);
                    l = c[h].end
                }
            }
            l < d.length - 1 && (e = e + d.substr(l).replace(g, "$1\n$2"));
            return e
        }
        return d.replace(g, "$1\n$2")
    }};
    CodeMirror.modeExtensions.xml = {commentStart: "<\!--", commentEnd: "--\>", wordWrapChars: [">"], autoFormatLineBreaks: function (d) {
        for (var d = d.split("\n"), l = /(^\s*?<|^[^<]*?)(.+)(>\s*?$|[^>]*?$)/, g = RegExp("<", "g"), c = RegExp("(>)([^\r\n])", "g"), e = 0; e < d.length; e++) {
            var h = d[e].match(l);
            h != null && h.length > 3 && (d[e] = h[1] + h[2].replace(g, "\n$&").replace(c, "$1\n$2") + h[3])
        }
        return d.join("\n")
    }};
    CodeMirror.modeExtensions.htmlmixed = {commentStart: "<\!--", commentEnd: "--\>", wordWrapChars: [">", ";", "\\{", "\\}"], getModeInfos: function (d, l) {
        var g = [];
        g[0] = {pos: 0, modeExt: CodeMirror.modeExtensions.xml, modeName: "xml"};
        var c = [];
        c[0] = {regex: /<style[^>]*>([\s\S]*?)(<\/style[^>]*>|$)/i, modeExt: CodeMirror.modeExtensions.css, modeName: "css"};
        c[1] = {regex: /<script[^>]*>([\s\S]*?)(<\/script[^>]*>|$)/i, modeExt: CodeMirror.modeExtensions.javascript, modeName: "javascript"};
        for (var e = typeof l !== "undefined" ? l : d.length -
            1, h = 0; h < c.length; h++)for (var o = 0; o <= e;) {
            var k = d.substr(o).match(c[h].regex);
            if (k != null)if (k.length > 1 && k[1].length > 0) {
                var r = o + k.index + k[0].indexOf(k[1]);
                g.push({pos: r, modeExt: c[h].modeExt, modeName: c[h].modeName});
                g.push({pos: r + k[1].length, modeExt: g[0].modeExt, modeName: g[0].modeName});
                o = o + (k.index + k[0].length)
            } else o = o + (k.index + Math.max(k[0].length, 1)); else break
        }
        g.sort(function (c, d) {
            return c.pos - d.pos
        });
        return g
    }, autoFormatLineBreaks: function (d, l, g) {
        var c = this.getModeInfos(d), e = /^\s*?\n/, h = /\n\s*?$/,
            o = "";
        if (c.length > 1)for (var k = 1; k <= c.length; k++) {
            var r = c[k - 1].pos, v = k < c.length ? c[k].pos : g;
            if (r >= g)break;
            if (r < l) {
                if (v <= l)continue;
                r = l
            }
            v > g && (v = g);
            var t = d.substring(r, v);
            if (c[k - 1].modeName != "xml") {
                !e.test(t) && r > 0 && (t = "\n" + t);
                !h.test(t) && v < d.length - 1 && (t = t + "\n")
            }
            o = o + c[k - 1].modeExt.autoFormatLineBreaks(t)
        } else o = c[0].modeExt.autoFormatLineBreaks(d.substring(l, g));
        return o
    }};
    /*

     Copyright (c) 2011 Marijn Haverbeke

     Licensed under the MIT license:
     http://opensource.org/licenses/mit-license
     */
    (function () {
        function d(c, d) {
            for (var e = 0, g = c.length; e < g; ++e)d(c[e])
        }

        function l(d, e, g) {
            var h = d.getCursor(), k = g(d, h), l = k;
            for (/^[\w$_]*$/.test(k.string) || (k = l = {start: h.ch, end: h.ch, string: "", state: k.state, className: "." == k.string ? "property" : null}); "property" == l.className;) {
                l = g(d, {line: h.line, ch: l.start});
                if ("." != l.string)return;
                l = g(d, {line: h.line, ch: l.start});
                if (")" == l.string) {
                    var r = 1;
                    do switch (l = g(d, {line: h.line, ch: l.start}), l.string) {
                        case ")":
                            r++;
                            break;
                        case "(":
                            r--
                    } while (0 < r);
                    l = g(d, {line: h.line, ch: l.start});
                    if ("variable" == l.className)l.className = "function"; else return
                }
                if (!o)var o = [];
                o.push(l)
            }
            return{list: c(k, o, e), from: {line: h.line, ch: k.start}, to: {line: h.line, ch: k.end}}
        }

        function g(c, d) {
            var e = c.getTokenAt(d);
            d.ch == e.start + 1 && "." == e.string.charAt(0) ? (e.end = e.start, e.string = ".", e.className = "property") : /^\.[\w$_]*$/.test(e.string) && (e.className = "property", e.start++, e.string = e.string.replace(/\./, ""));
            return e
        }

        function c(c, g, k) {
            function l(c) {
                var d;
                if (d = 0 == c.indexOf(Y)) {
                    a:if (Array.prototype.indexOf)d = -1 != K.indexOf(c);
                    else {
                        for (d = K.length; d--;)if (K[d] === c) {
                            d = !0;
                            break a
                        }
                        d = !1
                    }
                    d = !d
                }
                d && K.push(c)
            }

            function r(c) {
                "string" == typeof c ? d(e, l) : c instanceof Array ? d(h, l) : c instanceof Function && d(o, l);
                for (var g in c)l(g)
            }

            var K = [], Y = c.string;
            if (g) {
                var k = g.pop(), G;
                for ("variable" == k.className ? G = window[k.string] : "string" == k.className ? G = "" : "atom" == k.className ? G = 1 : "function" == k.className && (null != window.jQuery && ("$" == k.string || "jQuery" == k.string) && "function" == typeof window.jQuery ? G = window.jQuery() : null != window._ && ("_" == k.string && "function" == typeof window._) && (G = window._())); null != G && g.length;)G = G[g.pop().string];
                null != G && r(G)
            } else {
                for (g = c.state.localVars; g; g = g.next)l(g.name);
                r(window);
                d(k, l)
            }
            return K
        }

        CodeMirror.javascriptHint = function (c) {
            return l(c, k, function (c, d) {
                return c.getTokenAt(d)
            })
        };
        CodeMirror.coffeescriptHint = function (c) {
            return l(c, r, g)
        };
        var e = "charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight toUpperCase toLowerCase split concat match replace search".split(" "), h = "length concat join splice push pop shift unshift slice reverse sort indexOf lastIndexOf every some filter forEach map reduce reduceRight".split(" "),
            o = ["prototype", "apply", "call", "bind"], k = "break case catch continue debugger default delete do else false finally for function if in instanceof new null return switch throw true try typeof var void while with".split(" "), r = "and break catch class continue delete do else extends false finally for if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes".split(" ")
    })();
    /*

     Copyright (c) 2012 Marijn Haverbeke

     Licensed under the MIT license:
     http://opensource.org/licenses/mit-license
     */
    (function () {
        function d() {
            this.marked = []
        }

        function l(c) {
            for (var c = c._matchHighlightState || (c._matchHighlightState = new d), e = 0; e < c.marked.length; ++e)c.marked[e].clear();
            c.marked = []
        }

        function g(c, e, g) {
            l(c);
            g = "undefined" !== typeof g ? g : 2;
            if (c.somethingSelected() && c.getSelection().length >= g) {
                var o = c._matchHighlightState || (c._matchHighlightState = new d), k = c.getSelection();
                c.operation(function () {
                    if (2E3 > c.lineCount())for (var d = c.getSearchCursor(k); d.findNext();)d.from().line === c.getCursor(!0).line && d.from().ch ===
                        c.getCursor(!0).ch || o.marked.push(c.markText(d.from(), d.to(), e))
                })
            }
        }

        CodeMirror.defineExtension("matchHighlight", function (c, d) {
            g(this, c, d)
        })
    })();
    /*

     Copyright (c) 2011 Marijn Haverbeke

     Licensed under the MIT license:
     http://opensource.org/licenses/mit-license
     */
    CodeMirror.overlayParser = function (d, l, g) {
        return{startState: function () {
            return{base: CodeMirror.startState(d), overlay: CodeMirror.startState(l), basePos: 0, baseCur: null, overlayPos: 0, overlayCur: null}
        }, copyState: function (c) {
            return{base: CodeMirror.copyState(d, c.base), overlay: CodeMirror.copyState(l, c.overlay), basePos: c.basePos, baseCur: null, overlayPos: c.overlayPos, overlayCur: null}
        }, token: function (c, e) {
            c.start == e.basePos && (e.baseCur = d.token(c, e.base), e.basePos = c.pos);
            c.start == e.overlayPos && (c.pos = c.start, e.overlayCur =
                l.token(c, e.overlay), e.overlayPos = c.pos);
            c.pos = Math.min(e.basePos, e.overlayPos);
            c.eol() && (e.basePos = e.overlayPos = 0);
            return null == e.overlayCur ? e.baseCur : null != e.baseCur && g ? e.baseCur + " " + e.overlayCur : e.overlayCur
        }, indent: function (c, e) {
            return d.indent(c.base, e)
        }, electricChars: d.electricChars}
    };
    /*

     Copyright (c) 2011 Marijn Haverbeke

     Licensed under the MIT license:
     http://opensource.org/licenses/mit-license
     */
    CodeMirror.runMode = function (d, l, g, c) {
        var l = CodeMirror.getMode(CodeMirror.defaults, l), e = 1 == g.nodeType, h = c && c.tabSize || CodeMirror.defaults.tabSize;
        if (e)var o = g, k = [], r = 0, g = function (c, d) {
            if ("\n" == c)k.push("<br>"), r = 0; else {
                for (var e = "", g = 0; ;) {
                    var l = c.indexOf("\t", g);
                    if (-1 == l) {
                        e += CodeMirror.htmlEscape(c.slice(g));
                        r += c.length - g;
                        break
                    } else {
                        r += l - g;
                        e += CodeMirror.htmlEscape(c.slice(g, l));
                        g = h - r % h;
                        r += g;
                        for (var o = 0; o < g; ++o)e += " ";
                        g = l + 1
                    }
                }
                d ? k.push('<span class="cm-' + CodeMirror.htmlEscape(d) + '">' + e + "</span>") : k.push(e)
            }
        };
        for (var d = CodeMirror.splitLines(d), c = CodeMirror.startState(l), v = 0, t = d.length; v < t; ++v) {
            v && g("\n");
            for (var w = new CodeMirror.StringStream(d[v]); !w.eol();) {
                var y = l.token(w, c);
                g(w.current(), y, v, w.start);
                w.start = w.pos
            }
        }
        e && (o.innerHTML = k.join(""))
    };
    /*

     Copyright (c) 2012 Marijn Haverbeke

     Licensed under the MIT license:
     http://opensource.org/licenses/mit-license
     */
    (function () {
        function d() {
            this.posFrom = this.posTo = this.query = null;
            this.marked = []
        }

        function l(c, d, e, g) {
            c.openDialog ? c.openDialog(d, g) : g(prompt(e, ""))
        }

        function g(c, d, e, g) {
            if (c.openConfirm)c.openConfirm(d, g); else if (confirm(e))g[0]()
        }

        function c(c) {
            var d = c.match(/^\/(.*)\/$/);
            return d ? RegExp(d[1]) : c
        }

        function e(e, g) {
            var k = e._searchState || (e._searchState = new d);
            if (k.query)return h(e, g);
            l(e, r, "Search for:", function (d) {
                e.operation(function () {
                    if (d && !k.query) {
                        k.query = c(d);
                        if (2E3 > e.lineCount())for (var l = e.getSearchCursor(d); l.findNext();)k.marked.push(e.markText(l.from(),
                            l.to(), "CodeMirror-searching"));
                        k.posFrom = k.posTo = e.getCursor();
                        h(e, g)
                    }
                })
            })
        }

        function h(c, e) {
            c.operation(function () {
                var g = c._searchState || (c._searchState = new d), h = c.getSearchCursor(g.query, e ? g.posFrom : g.posTo);
                if (!h.find(e) && (h = c.getSearchCursor(g.query, e ? {line: c.lineCount() - 1} : {line: 0, ch: 0}), !h.find(e)))return;
                c.setSelection(h.from(), h.to());
                g.posFrom = h.from();
                g.posTo = h.to()
            })
        }

        function o(c) {
            c.operation(function () {
                var e = c._searchState || (c._searchState = new d);
                if (e.query) {
                    e.query = null;
                    for (var g = 0; g <
                        e.marked.length; ++g)e.marked[g].clear();
                    e.marked.length = 0
                }
            })
        }

        function k(d, e) {
            l(d, v, "Replace:", function (h) {
                h && (h = c(h), l(d, t, "Replace with:", function (c) {
                    if (e)d.operation(function () {
                        for (var e = d.getSearchCursor(h); e.findNext();)if ("string" != typeof h) {
                            var g = d.getRange(e.from(), e.to()).match(h);
                            e.replace(c.replace(/\$(\d)/, function (c, d) {
                                return g[d]
                            }))
                        } else e.replace(c)
                    }); else {
                        o(d);
                        var k = d.getSearchCursor(h, d.getCursor()), l = function () {
                            var c = k.from(), e;
                            if (!(e = k.findNext()))if (k = d.getSearchCursor(h), !(e = k.findNext()) ||
                                k.from().line == c.line && k.from().ch == c.ch)return;
                            d.setSelection(k.from(), k.to());
                            g(d, w, "Replace?", [function () {
                                r(e)
                            }, l])
                        }, r = function (d) {
                            k.replace("string" == typeof h ? c : c.replace(/\$(\d)/, function (c, e) {
                                return d[e]
                            }));
                            l()
                        };
                        l()
                    }
                }))
            })
        }

        var r = 'Search: <input type="text" style="width: 10em"> <span style="color: #888">(Use /re/ syntax for regexp search)</span>', v = 'Replace: <input type="text" style="width: 10em"> <span style="color: #888">(Use /re/ syntax for regexp search)</span>', t = 'With: <input type="text" style="width: 10em">',
            w = "Replace? <button>Yes</button> <button>No</button> <button>Stop</button>";
        CodeMirror.commands.find = function (c) {
            o(c);
            e(c)
        };
        CodeMirror.commands.findNext = e;
        CodeMirror.commands.findPrev = function (c) {
            e(c, !0)
        };
        CodeMirror.commands.clearSearch = o;
        CodeMirror.commands.replace = k;
        CodeMirror.commands.replaceAll = function (c) {
            k(c, !0)
        }
    })();
    /*

     Copyright (c) 2012 Marijn Haverbeke

     Licensed under the MIT license:
     http://opensource.org/licenses/mit-license
     */
    (function () {
        function d(d, g, c, e) {
            this.atOccurrence = !1;
            this.cm = d;
            null == e && (e = "string" == typeof g && g == g.toLowerCase());
            c = c ? d.clipPos(c) : {line: 0, ch: 0};
            this.pos = {from: c, to: c};
            if ("string" != typeof g)this.matches = function (c, e) {
                if (c)for (var h = d.getLine(e.line).slice(0, e.ch), o = h.match(g), w = 0; o;) {
                    var y = h.indexOf(o[0]), w = w + y, h = h.slice(y + 1);
                    if (y = h.match(g))o = y; else break;
                    w++
                } else h = d.getLine(e.line).slice(e.ch), w = (o = h.match(g)) && e.ch + h.indexOf(o[0]);
                if (o)return{from: {line: e.line, ch: w}, to: {line: e.line, ch: w + o[0].length},
                    match: o}
            }; else {
                e && (g = g.toLowerCase());
                var h = e ? function (c) {
                    return c.toLowerCase()
                } : function (c) {
                    return c
                }, o = g.split("\n");
                this.matches = 1 == o.length ? function (c, e) {
                    var o = h(d.getLine(e.line)), t = g.length, w;
                    if (c ? e.ch >= t && -1 != (w = o.lastIndexOf(g, e.ch - t)) : -1 != (w = o.indexOf(g, e.ch)))return{from: {line: e.line, ch: w}, to: {line: e.line, ch: w + t}}
                } : function (c, e) {
                    var g = e.line, t = c ? o.length - 1 : 0, w = o[t], y = h(d.getLine(g)), M = c ? y.indexOf(w) + w.length : y.lastIndexOf(w);
                    if (!(c ? M >= e.ch || M != w.length : M <= e.ch || M != y.length - w.length))for (; !(c ?
                        !g : g == d.lineCount() - 1);) {
                        y = h(d.getLine(g += c ? -1 : 1));
                        w = o[c ? --t : ++t];
                        if (0 < t && t < o.length - 1)if (y != w)break; else continue;
                        t = c ? y.lastIndexOf(w) : y.indexOf(w) + w.length;
                        if (c ? t != y.length - w.length : t != w.length)break;
                        w = {line: e.line, ch: M};
                        g = {line: g, ch: t};
                        return{from: c ? g : w, to: c ? w : g}
                    }
                }
            }
        }

        d.prototype = {findNext: function () {
            return this.find(!1)
        }, findPrevious: function () {
            return this.find(!0)
        }, find: function (d) {
            function g(d) {
                d = {line: d, ch: 0};
                c.pos = {from: d, to: d};
                return c.atOccurrence = !1
            }

            for (var c = this, e = this.cm.clipPos(d ? this.pos.from :
                this.pos.to); ;) {
                if (this.pos = this.matches(d, e))return this.atOccurrence = !0, this.pos.match || !0;
                if (d) {
                    if (!e.line)return g(0);
                    e = {line: e.line - 1, ch: this.cm.getLine(e.line - 1).length}
                } else {
                    var h = this.cm.lineCount();
                    if (e.line == h - 1)return g(h);
                    e = {line: e.line + 1, ch: 0}
                }
            }
        }, from: function () {
            if (this.atOccurrence)return this.pos.from
        }, to: function () {
            if (this.atOccurrence)return this.pos.to
        }, replace: function (d) {
            var g = this;
            this.atOccurrence && (g.pos.to = this.cm.replaceRange(d, g.pos.from, g.pos.to))
        }};
        CodeMirror.defineExtension("getSearchCursor",
            function (l, g, c) {
                return new d(this, l, g, c)
            })
    })();
    /*

     Copyright (c) 2012 Marijn Haverbeke

     Licensed under the MIT license:
     http://opensource.org/licenses/mit-license
     */
    CodeMirror.simpleHint = function (d, l) {
        function g() {
            t || (t = !0, o.parentNode.removeChild(o))
        }

        function c() {
            d.replaceRange(h[k.selectedIndex], e.from, e.to);
            g();
            setTimeout(function () {
                d.focus()
            }, 50)
        }

        if (!d.somethingSelected()) {
            var e = l(d);
            if (e && e.list.length) {
                var h = e.list;
                if (1 == h.length)return d.replaceRange(h[0], e.from, e.to), !0;
                var o = document.createElement("div");
                o.className = "CodeMirror-completions";
                var k = o.appendChild(document.createElement("select"));
                window.opera || (k.multiple = !0);
                for (var r = 0; r < h.length; ++r) {
                    var v =
                        k.appendChild(document.createElement("option"));
                    v.appendChild(document.createTextNode(h[r]))
                }
                k.firstChild.selected = !0;
                k.size = Math.min(10, h.length);
                r = d.cursorCoords();
                o.style.left = r.x + "px";
                o.style.top = r.yBot + "px";
                document.body.appendChild(o);
                v = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth);
                v - r.x < k.clientWidth && (o.style.left = r.x - k.clientWidth + "px");
                10 >= h.length && (o.style.width = k.clientWidth - 1 + "px");
                var t = !1;
                CodeMirror.connect(k, "blur", g);
                CodeMirror.connect(k,
                    "keydown", function (e) {
                        var h = e.keyCode;
                        if (h == 13) {
                            CodeMirror.e_stop(e);
                            c()
                        } else if (h == 27) {
                            CodeMirror.e_stop(e);
                            g();
                            d.focus()
                        } else if (h != 38 && h != 40) {
                            g();
                            d.focus();
                            d.triggerOnKeyDown(e);
                            setTimeout(function () {
                                CodeMirror.simpleHint(d, l)
                            }, 50)
                        }
                    });
                CodeMirror.connect(k, "dblclick", c);
                k.focus();
                window.opera && setTimeout(function () {
                    t || k.focus()
                }, 100);
                return!0
            }
        }
    };
})();
