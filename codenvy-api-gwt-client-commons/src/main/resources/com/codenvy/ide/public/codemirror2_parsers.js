(function () { /*

 Copyright (c) 2011 Marijn Haverbeke

 Licensed under the MIT license:
 http://opensource.org/licenses/mit-license
 */
    CodeMirror.defineMode("xml", function (n, j) {
        function g(e, a) {
            function b(c) {
                a.tokenize = c;
                return c(e, a)
            }

            var c = e.next();
            if ("<" == c) {
                if (e.eat("!"))return e.eat("[") ? e.match("CDATA[") ? b(u("atom", "]]\>")) : null : e.match("--") ? b(u("comment", "--\>")) : e.match("DOCTYPE", !0, !0) ? (e.eatWhile(/[\w\._\-]/), b(r(1))) : null;
                if (e.eat("?"))return e.eatWhile(/[\w\._\-]/), a.tokenize = u("meta", "?>"), "meta";
                D = e.eat("/") ? "closeTag" : "openTag";
                e.eatSpace();
                for (v = ""; c = e.eat(/[^\s\u00a0=<>\"\'\/?]/);)v += c;
                a.tokenize = d;
                return"tag"
            }
            if ("&" ==
                c)return(c = e.eat("#") ? e.eat("x") ? e.eatWhile(/[a-fA-F\d]/) && e.eat(";") : e.eatWhile(/[\d]/) && e.eat(";") : e.eatWhile(/[\w\.\-:]/) && e.eat(";")) ? "atom" : "error";
            e.eatWhile(/[^&<]/);
            return null
        }

        function d(e, a) {
            var b = e.next();
            if (">" == b || "/" == b && e.eat(">"))return a.tokenize = g, D = ">" == b ? "endTag" : "selfcloseTag", "tag";
            if ("=" == b)return D = "equals", null;
            if (/[\'\"]/.test(b))return a.tokenize = t(b), a.tokenize(e, a);
            e.eatWhile(/[^\s\u00a0=<>\"\'\/?]/);
            return"word"
        }

        function t(e) {
            return function (a, b) {
                for (; !a.eol();)if (a.next() ==
                    e) {
                    b.tokenize = d;
                    break
                }
                return"string"
            }
        }

        function u(e, a) {
            return function (b, c) {
                for (; !b.eol();) {
                    if (b.match(a)) {
                        c.tokenize = g;
                        break
                    }
                    b.next()
                }
                return e
            }
        }

        function r(e) {
            return function (a, b) {
                for (var c; null != (c = a.next());) {
                    if ("<" == c)return b.tokenize = r(e + 1), b.tokenize(a, b);
                    if (">" == c)if (1 == e) {
                        b.tokenize = g;
                        break
                    } else return b.tokenize = r(e - 1), b.tokenize(a, b)
                }
                return"meta"
            }
        }

        function q() {
            for (var e = arguments.length - 1; 0 <= e; e--)A.cc.push(arguments[e])
        }

        function c() {
            q.apply(null, arguments);
            return!0
        }

        function a(e) {
            return"openTag" ==
                e ? (A.tagName = v, c(m, b(A.startOfLine))) : "closeTag" == e ? (e = !1, (e = A.context ? A.context.tagName != v : !0) && (B = "error"), c(w(e))) : c()
        }

        function b(e) {
            return function (b) {
                if ("selfcloseTag" == b || "endTag" == b && o.autoSelfClosers.hasOwnProperty(A.tagName.toLowerCase()))return c();
                if ("endTag" == b) {
                    var b = A.tagName, a = e, d = o.doNotIndent.hasOwnProperty(b) || A.context && A.context.noIndent;
                    A.context = {prev: A.context, tagName: b, indent: A.indented, startOfLine: a, noIndent: d}
                }
                return c()
            }
        }

        function w(e) {
            return function (b) {
                e && (B = "error");
                if ("endTag" ==
                    b)return A.context && (A.context = A.context.prev), c();
                B = "error";
                return c(arguments.callee)
            }
        }

        function m(e) {
            if ("word" == e)return B = "attribute", c(s, m);
            if ("endTag" == e || "selfcloseTag" == e)return q();
            B = "error";
            return c(m)
        }

        function s(e) {
            if ("equals" == e)return c(h, m);
            o.allowMissing || (B = "error");
            return"endTag" == e || "selfcloseTag" == e ? q() : c()
        }

        function h(e) {
            if ("string" == e)return c(k);
            if ("word" == e && o.allowUnquoted)return B = "string", c();
            B = "error";
            return"endTag" == e || "selfCloseTag" == e ? q() : c()
        }

        function k(e) {
            return"string" ==
                e ? c(k) : q()
        }

        var i = n.indentUnit, o = j.htmlMode ? {autoSelfClosers: {area: !0, base: !0, br: !0, col: !0, command: !0, embed: !0, frame: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0}, doNotIndent: {pre: !0}, allowUnquoted: !0, allowMissing: !1} : {autoSelfClosers: {}, doNotIndent: {}, allowUnquoted: !1, allowMissing: !1}, p = j.alignCDATA, v, D, A, B;
        return{startState: function () {
            return{tokenize: g, cc: [], indented: 0, startOfLine: !0, tagName: null, context: null}
        }, token: function (e, b) {
            e.sol() && (b.startOfLine = !0, b.indented = e.indentation());
            if (e.eatSpace())return null;
            B = D = v = null;
            var c = b.tokenize(e, b);
            b.type = D;
            if ((c || D) && "comment" != c)for (A = b; ;) {
                var d = b.cc.pop() || a;
                if (d(D || c))break
            }
            b.startOfLine = !1;
            return B || c
        }, indent: function (e, b, a) {
            var c = e.context;
            if (e.tokenize != d && e.tokenize != g || c && c.noIndent)return a ? a.match(/^(\s*)/)[0].length : 0;
            if (p && /<!\[CDATA\[/.test(b))return 0;
            c && /^<\//.test(b) && (c = c.prev);
            for (; c && !c.startOfLine;)c = c.prev;
            return c ? c.indent + i : 0
        }, compareStates: function (e, b) {
            if (e.indented != b.indented ||
                e.tokenize != b.tokenize)return!1;
            for (var a = e.context, c = b.context; ; a = a.prev, c = c.prev) {
                if (!a || !c)return a == c;
                if (a.tagName != c.tagName)return!1
            }
        }, electricChars: "/"}
    });
    CodeMirror.defineMIME("application/xml", "xml");

    /*

     Copyright (c) 2010 Timothy Farrell

     Licensed under the MIT license:
     http://opensource.org/licenses/mit-license
     */
    CodeMirror.defineMode("python", function (n, j) {
        function g(b) {
            return RegExp("^((" + b.join(")|(") + "))\\b")
        }

        function d(e, d) {
            if (e.sol()) {
                var i = d.scopes[0].offset;
                if (e.eatSpace()) {
                    var k = e.indentation();
                    k > i ? B = "indent" : k < i && (B = "dedent");
                    return null
                }
                0 < i && r(e, d)
            }
            if (e.eatSpace())return null;
            i = e.peek();
            if ("#" === i)return e.skipToEnd(), "comment";
            if (e.match(/^[0-9\.]/, !1)) {
                i = !1;
                e.match(/^\d*\.\d+(e[\+\-]?\d+)?/i) && (i = !0);
                e.match(/^\d+\.\d*/) && (i = !0);
                e.match(/^\.\d+/) && (i = !0);
                if (i)return e.eat(/J/i), "number";
                i = !1;
                e.match(/^0x[0-9a-f]+/i) && (i = !0);
                e.match(/^0b[01]+/i) && (i = !0);
                e.match(/^0o[0-7]+/i) && (i = !0);
                e.match(/^[1-9]\d*(e[\+\-]?\d+)?/) && (e.eat(/J/i), i = !0);
                e.match(/^0(?![\dx])/i) && (i = !0);
                if (i)return e.eat(/L/i), "number"
            }
            if (e.match(v))return d.tokenize = t(e.current()), d.tokenize(e, d);
            if (e.match(m) || e.match(w))return null;
            if (e.match(b) || e.match(c) || e.match(h))return"operator";
            if (e.match(a))return null;
            if (e.match(D))return"keyword";
            if (e.match(A))return"builtin";
            if (e.match(s))return"variable";
            e.next();
            return"error"
        }

        function t(b) {
            for (; 0 <= "rub".indexOf(b.charAt(0).toLowerCase());)b = b.substr(1);
            var a = 1 == b.length;
            return function (c, i) {
                for (; !c.eol();)if (c.eatWhile(/[^'"\\]/), c.eat("\\")) {
                    if (c.next(), a && c.eol())return"string"
                } else {
                    if (c.match(b))return i.tokenize = d, "string";
                    c.eat(/['"]/)
                }
                if (a) {
                    if (j.singleLineStringErrors)return"error";
                    i.tokenize = d
                }
                return"string"
            }
        }

        function u(b, a, c) {
            var c = c || "py", d = 0;
            if ("py" === c) {
                if ("py" !== a.scopes[0].type) {
                    a.scopes[0].offset = b.indentation();
                    return
                }
                for (b = 0; b < a.scopes.length; ++b)if ("py" ===
                    a.scopes[b].type) {
                    d = a.scopes[b].offset + n.indentUnit;
                    break
                }
            } else d = b.column() + b.current().length;
            a.scopes.unshift({offset: d, type: c})
        }

        function r(b, a, c) {
            c = c || "py";
            if (1 != a.scopes.length) {
                if ("py" === a.scopes[0].type) {
                    for (var d = b.indentation(), i = -1, b = 0; b < a.scopes.length; ++b)if (d === a.scopes[b].offset) {
                        i = b;
                        break
                    }
                    if (-1 === i)return!0;
                    for (; a.scopes[0].offset !== d;)a.scopes.shift()
                } else if ("py" === c)a.scopes[0].offset = b.indentation(); else {
                    if (a.scopes[0].type != c)return!0;
                    a.scopes.shift()
                }
                return!1
            }
        }

        function q(b, a) {
            B =
                null;
            var c = a.tokenize(b, a), d = b.current();
            if ("." === d)return c = a.tokenize(b, a), b.current(), "variable" === c || "builtin" === c ? "variable" : "error";
            if ("@" === d)return c = a.tokenize(b, a), d = b.current(), "variable" === c || "@staticmethod" === d || "@classmethod" === d ? "meta" : "error";
            if ("pass" === d || "return" === d)a.dedent += 1;
            (":" === d && !a.lambda && "py" == a.scopes[0].type || "indent" === B) && u(b, a);
            var i = "[({".indexOf(d);
            -1 !== i && u(b, a, "])}".slice(i, i + 1));
            if ("dedent" === B && r(b, a))return"error";
            i = "])}".indexOf(d);
            if (-1 !== i && r(b, a, d))return"error";
            0 < a.dedent && (b.eol() && "py" == a.scopes[0].type) && (1 < a.scopes.length && a.scopes.shift(), a.dedent -= 1);
            return c
        }

        var c = /^[\+\-\*/%&|\^~<>!]/, a = /^[\(\)\[\]\{\}@,:`=;\.]/, b = /^((==)|(!=)|(<=)|(>=)|(<>)|(<<)|(>>)|(\/\/)|(\*\*))/, w = /^((\+=)|(\-=)|(\*=)|(%=)|(\/=)|(&=)|(\|=)|(\^=))/, m = /^((\/\/=)|(>>=)|(<<=)|(\*\*=))/, s = /^[_A-Za-z][_A-Za-z0-9]*/, h = g(["and", "or", "not", "is", "in"]), k = "as assert break class continue def del elif else except finally for from global if import lambda pass raise return try while with yield".split(" "),
            i = "abs all any bin bool bytearray callable chr classmethod compile complex delattr dict dir divmod enumerate eval filter float format frozenset getattr globals hasattr hash help hex id input int isinstance issubclass iter len list locals map max memoryview min next object oct open ord pow property range repr reversed round set setattr slice sorted staticmethod str sum super tuple type vars zip __import__ NotImplemented Ellipsis __debug__".split(" "), o = {builtins: "apply basestring buffer cmp coerce execfile file intern long raw_input reduce reload unichr unicode xrange False True None".split(" "),
                keywords: ["exec", "print"]}, p = {builtins: ["ascii", "bytes", "exec", "print"], keywords: ["nonlocal", "False", "True", "None"]};
        if (j.version && 3 === parseInt(j.version, 10))var k = k.concat(p.keywords), i = i.concat(p.builtins), v = /^(([rb]|(br))?('{3}|"{3}|['"]))/i; else k = k.concat(o.keywords), i = i.concat(o.builtins), v = /^(([rub]|(ur)|(br))?('{3}|"{3}|['"]))/i;
        var D = g(k), A = g(i), B = null;
        return k = {startState: function (b) {
            return{tokenize: d, scopes: [
                {offset: b || 0, type: "py"}
            ], lastToken: null, lambda: !1, dedent: 0}
        }, token: function (b, a) {
            var c = q(b, a);
            a.lastToken = {style: c, content: b.current()};
            b.eol() && b.lambda && (a.lambda = !1);
            return c
        }, indent: function (b) {
            return b.tokenize != d ? 0 : b.scopes[0].offset
        }}
    });
    CodeMirror.defineMIME("text/x-python", "python");
    /*

     Copyright (c) 2011 Marijn Haverbeke

     Licensed under the MIT license:
     http://opensource.org/licenses/mit-license
     */
    /*

     Copyright (c) 2011 Marijn Haverbeke

     Licensed under the MIT license:
     http://opensource.org/licenses/mit-license
     */
    CodeMirror.defineMode("yaml", function () {
        var n = "true false on off yes no".split(" "), j = RegExp("\\b((" + n.join(")|(") + "))$", "i");
        return{token: function (g, d) {
            var t = g.peek(), u = d.escaped;
            d.escaped = !1;
            if ("#" == t)return g.skipToEnd(), "comment";
            if (d.literal && g.indentation() > d.keyCol)return g.skipToEnd(), "string";
            d.literal && (d.literal = !1);
            if (g.sol()) {
                d.keyCol = 0;
                d.pair = !1;
                d.pairStart = !1;
                if (g.match(/---/) || g.match(/\.\.\./))return"def";
                if (g.match(/\s*-\s+/))return"meta"
            }
            if (!d.pair && g.match(/^\s*([a-z0-9\._-])+(?=\s*:)/i))return d.pair = !0, d.keyCol = g.indentation(), "atom";
            if (d.pair && g.match(/^:\s*/))return d.pairStart = !0, "meta";
            if (g.match(/^(\{|\}|\[|\])/))return"{" == t ? d.inlinePairs++ : "}" == t ? d.inlinePairs-- : "[" == t ? d.inlineList++ : d.inlineList--, "meta";
            if (0 < d.inlineList && !u && "," == t)return g.next(), "meta";
            if (0 < d.inlinePairs && !u && "," == t)return d.keyCol = 0, d.pair = !1, d.pairStart = !1, g.next(), "meta";
            if (d.pairStart) {
                if (g.match(/^\s*(\||\>)\s*/))return d.literal = !0, "meta";
                if (g.match(/^\s*(\&|\*)[a-z0-9\._-]+\b/i))return"variable-2";
                if (0 == d.inlinePairs &&
                    g.match(/^\s*-?[0-9\.\,]+\s?$/) || 0 < d.inlinePairs && g.match(/^\s*-?[0-9\.\,]+\s?(?=(,|}))/))return"number";
                if (g.match(j))return"keyword"
            }
            d.pairStart = !1;
            d.escaped = "\\" == t;
            g.next();
            return null
        }, startState: function () {
            return{pair: !1, pairStart: !1, keyCol: 0, inlinePairs: 0, inlineList: 0, literal: !1, escaped: !1}
        }}
    });
    CodeMirror.defineMIME("text/x-yaml", "yaml");
    /*


     Branched from javascript.js, Copyright (c) 2011 Marijn Haverbeke
     Licensed under the MIT license:
     http://opensource.org/licenses/mit-license
     */
    CodeMirror.defineMode("dart", function (n) {
        function j(f, b, a) {
            b.tokenize = a;
            return a(f, b)
        }

        function g(f, b, a) {
            H = f;
            F = a;
            return b
        }

        function d(f, b) {
            return'"' == b ? f.match('""') ? '"""' : '"' : f.match("''") ? "'''" : "'"
        }

        function t(f, b) {
            var a = f.next();
            if ('"' == a || "'" == a)return b.quote = d(f, a), b.raw = !1, j(f, b, u);
            if ("@" == a)return a = f.peek(), '"' == a || "'" == a ? (b.quote = d(f, f.next()), b.raw = !0, j(f, b, u)) : g("string", "string");
            if (/[\[\]{}\(\),;\:\.]/.test(a))return g(a);
            if ("0" == a && f.eat(/x/i))return f.eatWhile(/[\da-fA-F]/i), g("number",
                "number");
            if (/\d/.test(a))return f.match(/^\d*(?:\.\d*)?(?:e[+\-]?\d+)?/), g("number", "number");
            if ("/" == a) {
                if (f.eat("*"))return j(f, b, q);
                if (f.eat("/"))return f.skipToEnd(), g("comment", "comment");
                f.eatWhile(J);
                return g("operator", null, f.current())
            }
            if (J.test(a))return f.eatWhile(J), g("operator", null, f.current());
            f.eatWhile(/[\w\$_]/);
            var a = f.current(), c = O.propertyIsEnumerable(a) && O[a];
            return c ? g(c.type, c.style, a) : g("variable", "variable", a)
        }

        function u(b, a) {
            for (var c; c = b.peek();) {
                if (b.match(a.quote)) {
                    a.tokenize =
                        t;
                    break
                } else if (!a.raw && "$" == c) {
                    a.tokenize = r;
                    break
                }
                b.next()
            }
            return g("string", "string")
        }

        function r(b, a) {
            var c = b.next();
            if (c = b.peek())if ("{" == c)for (; (c = b.next()) && "}" != c;); else b.eatWhile(/[\w_]/); else return g("variable", "variable");
            a.tokenize = u;
            return g("variable", "variable")
        }

        function q(b, a) {
            for (var c = !1, e; e = b.next();) {
                if ("/" == e && c) {
                    a.tokenize = t;
                    break
                }
                c = "*" == e
            }
            return g("comment", "comment")
        }

        function c(b, a, c, e, d, i) {
            this.indented = b;
            this.column = a;
            this.type = c;
            this.prev = d;
            this.info = i;
            null != e && (this.align =
                e)
        }

        function a() {
            for (var b = arguments.length - 1; 0 <= b; b--)x.cc.push(arguments[b])
        }

        function b() {
            a.apply(null, arguments);
            return!0
        }

        function w(b) {
            var a = x.state;
            if (a.context) {
                x.marked = "def";
                for (var c = a.localVars; c; c = c.next)if (c.name == b)return;
                a.localVars = {name: b, next: a.localVars}
            }
        }

        function m() {
            x.state.context || (x.state.localVars = y);
            x.state.context = {prev: x.state.context, vars: x.state.localVars}
        }

        function s() {
            x.state.localVars = x.state.context.vars;
            x.state.context = x.state.context.prev
        }

        function h(b, a) {
            var e = function () {
                var e =
                    x.state;
                e.lexical = new c(e.indented, x.stream.column(), b, null, e.lexical, a)
            };
            e.lex = !0;
            return e
        }

        function k() {
            var b = x.state;
            b.lexical.prev && (")" == b.lexical.type && (b.indented = b.lexical.indented), b.lexical = b.lexical.prev)
        }

        function i(f) {
            return function (c) {
                return c == f ? b() : ";" == f ? a() : b(arguments.callee)
            }
        }

        function o(f) {
            return"var" == f ? b(h("vardef"), C, i(";"), k) : "keyword a" == f ? b(h("form"), p, o, k) : "keyword b" == f ? b(h("form"), o, k) : "{" == f ? b(h("}"), z, k) : ";" == f ? b() : "function" == f ? b(I) : "for" == f ? b(h("form"), i("("), h(")"),
                P, i(")"), k, o, k) : "variable" == f ? b(h("stat"), D) : "switch" == f ? b(h("form"), p, h("}", "switch"), i("{"), z, k, k) : "case" == f ? b(p, i(":")) : "default" == f ? b(i(":")) : "catch" == f ? b(h("form"), m, i("("), L, i(")"), o, k, s) : a(h("stat"), p, i(";"), k)
        }

        function p(a) {
            return K.hasOwnProperty(a) ? b(v) : "function" == a ? b(I) : "keyword c" == a ? b(p) : "(" == a ? b(h(")"), p, i(")"), k, v) : "operator" == a ? b(p) : "[" == a ? b(h("]"), e(p, "]"), k, v) : "{" == a ? b(h("}"), e(B, "}"), k, v) : b()
        }

        function v(a, c) {
            if ("operator" == a && /\+\+|--/.test(c))return b(v);
            if ("operator" == a)return b(p);
            if (";" != a) {
                if ("(" == a)return b(h(")"), e(p, ")"), k, v);
                if ("." == a)return b(A, v);
                if ("[" == a)return b(h("]"), p, i("]"), k, v)
            }
        }

        function D(f) {
            return":" == f ? b(k, o) : a(v, i(";"), k)
        }

        function A(a) {
            if ("variable" == a)return x.marked = "property", b()
        }

        function B(a) {
            "variable" == a && (x.marked = "property");
            if (K.hasOwnProperty(a))return b(i(":"), p)
        }

        function e(f, c) {
            function e(a) {
                return"," == a ? b(f, e) : a == c ? b() : b(i(c))
            }

            return function (d) {
                return d == c ? b() : a(f, e)
            }
        }

        function z(f) {
            return"}" == f ? b() : a(o, z)
        }

        function C(a, c) {
            return"variable" ==
                a ? (w(c), b(M)) : b()
        }

        function M(a, c) {
            if ("=" == c)return b(p, M);
            if ("," == a)return b(C)
        }

        function P(c) {
            return"var" == c ? b(C, G) : ";" == c ? a(G) : "variable" == c ? b(Q) : a(G)
        }

        function Q(a, c) {
            return"in" == c ? b(p) : b(v, G)
        }

        function G(a, c) {
            return";" == a ? b(N) : "in" == c ? b(p) : b(p, i(";"), N)
        }

        function N(a) {
            ")" != a && b(p)
        }

        function I(a, c) {
            if ("variable" == a)return w(c), b(I);
            if ("(" == a)return b(h(")"), m, e(L, ")"), k, o, s)
        }

        function L(a, c) {
            if ("variable" == a)return w(c), b()
        }

        var E = n.indentUnit, O = function () {
            function a(b) {
                return{type: b, style: "keyword"}
            }

            var b = a("keyword a"), c = a("keyword b"), e = a("keyword c"), d = a("operator"), i = {type: "atom", style: "atom"}, h = i;
            return{"break": e, "case": a("case"), "catch": a("catch"), "const": a("const"), "continue": e, "default": a("default"), "do": c, "else": c, "false": i, "final": a("final"), "finally": c, "for": a("for"), "if": b, "in": d, "new": e, "null": i, "return": e, "super": a("super"), "switch": a("switch"), "this": a("this"), "throw": e, "true": i, "try": c, "var": a("var"), "void": a("void"), "while": b, "abstract": a("abstract"), assert: a("assert"), "class": a("class"),
                "extends": a("extends"), factory: a("factory"), get: a("get"), "implements": a("implements"), "#import": h, "interface": a("interface"), is: a("is"), "#library": h, "native": a("native"), "#native": h, negate: a("negate"), operator: a("operator"), set: a("set"), "#resource": h, "#source": h, "static": a("static"), typedef: a("typedef")}
        }(), J = /[+\-*&%=<>!?|^~]/, H, F, K = {atom: !0, number: !0, variable: !0, string: !0, regexp: !0}, x = {state: null, column: null, marked: null, cc: null}, y = {name: "this", next: {name: "arguments"}};
        k.lex = !0;
        return{startState: function (a) {
            return{tokenize: t,
                cc: [], lexical: new c((a || 0) - E, 0, "block", !1), localVars: null, context: null, indented: 0}
        }, token: function (a, b) {
            a.sol() && (b.lexical.hasOwnProperty("align") || (b.lexical.align = !1), b.indented = a.indentation());
            if (a.eatSpace())return null;
            var c = b.tokenize(a, b);
            if ("comment" == H)return c;
            var e;
            a:{
                var d = b, i = H, h = F, k = a, m = d.cc;
                x.state = d;
                x.stream = k;
                x.marked = null;
                x.cc = m;
                d.lexical.hasOwnProperty("align") || (d.lexical.align = !0);
                for (; ;)if (k = m.length ? m.pop() : o, k(i, h)) {
                    for (; m.length && m[m.length - 1].lex;)m.pop()();
                    if (x.marked) {
                        e =
                            x.marked;
                        break a
                    }
                    if (e = "variable" == i)b:{
                        for (d = d.localVars; d; d = d.next)if (d.name == h) {
                            e = !0;
                            break b
                        }
                        e = void 0
                    }
                    if (e) {
                        e = "variable-2";
                        break a
                    }
                    e = c;
                    break a
                }
            }
            return e
        }, indent: function (a, b) {
            if (a.tokenize != t)return 0;
            var c = b && b.charAt(0), e = a.lexical, d = e.type, i = c == d;
            return"vardef" == d ? e.indented + 4 : "form" == d && "{" == c ? e.indented : "stat" == d || "form" == d ? e.indented + E : "switch" == e.info && !i ? e.indented + (/^(?:case|default)\b/.test(b) ? E : 2 * E) : e.align ? e.column + (i ? 0 : 1) : e.indented + (i ? 0 : E)
        }, electricChars: ":{}"}
    });
    CodeMirror.defineMIME("text/dart", "dart");
    /*

     Copyright (c) 2011 Marijn Haverbeke

     Licensed under the MIT license:
     http://opensource.org/licenses/mit-license
     */
    CodeMirror.defineMode("clike", function (n, j) {
        function g(c, o) {
            var p = c.next();
            if (m[p]) {
                var s = m[p](c, o);
                if (!1 !== s)return s
            }
            if ('"' == p || "'" == p)return o.tokenize = d(p), o.tokenize(c, o);
            if (/[\[\]{}\(\),;\:\.]/.test(p))return k = p, null;
            if (/\d/.test(p))return c.eatWhile(/[\w\.]/), "number";
            if ("/" == p) {
                if (c.eat("*"))return o.tokenize = t, t(c, o);
                if (c.eat("/"))return c.skipToEnd(), "comment"
            }
            if (h.test(p))return c.eatWhile(h), "operator";
            c.eatWhile(/[\w\$_]/);
            p = c.current();
            return a.propertyIsEnumerable(p) ? (b.propertyIsEnumerable(p) &&
                (k = "newstatement"), "keyword") : w.propertyIsEnumerable(p) ? "atom" : "word"
        }

        function d(a) {
            return function (b, c) {
                for (var d = !1, h, m = !1; null != (h = b.next());) {
                    if (h == a && !d) {
                        m = !0;
                        break
                    }
                    d = !d && "\\" == h
                }
                if (m || !d && !s)c.tokenize = null;
                return"string"
            }
        }

        function t(a, b) {
            for (var c = !1, d; d = a.next();) {
                if ("/" == d && c) {
                    b.tokenize = null;
                    break
                }
                c = "*" == d
            }
            return"comment"
        }

        function u(a, b, c, d, h) {
            this.indented = a;
            this.column = b;
            this.type = c;
            this.align = d;
            this.prev = h
        }

        function r(a, b, c) {
            return a.context = new u(a.indented, b, c, null, a.context)
        }

        function q(a) {
            var b =
                a.context.type;
            if (")" == b || "]" == b || "}" == b)a.indented = a.context.indented;
            return a.context = a.context.prev
        }

        var c = n.indentUnit, a = j.keywords || {}, b = j.blockKeywords || {}, w = j.atoms || {}, m = j.hooks || {}, s = j.multiLineStrings, h = /[+\-*&%=<>!?|\/]/, k;
        return{startState: function (a) {
            return{tokenize: null, context: new u((a || 0) - c, 0, "top", !1), indented: 0, startOfLine: !0}
        }, token: function (a, b) {
            var c = b.context;
            a.sol() && (null == c.align && (c.align = !1), b.indented = a.indentation(), b.startOfLine = !0);
            if (a.eatSpace())return null;
            k = null;
            var d = (b.tokenize || g)(a, b);
            if ("comment" == d || "meta" == d)return d;
            null == c.align && (c.align = !0);
            if ((";" == k || ":" == k) && "statement" == c.type)q(b); else if ("{" == k)r(b, a.column(), "}"); else if ("[" == k)r(b, a.column(), "]"); else if ("(" == k)r(b, a.column(), ")"); else if ("}" == k) {
                for (; "statement" == c.type;)c = q(b);
                for ("}" == c.type && (c = q(b)); "statement" == c.type;)c = q(b)
            } else k == c.type ? q(b) : ("}" == c.type || "top" == c.type || "statement" == c.type && "newstatement" == k) && r(b, a.column(), "statement");
            b.startOfLine = !1;
            return d
        }, indent: function (a, b) {
            if (a.tokenize != g && null != a.tokenize)return 0;
            var d = a.context, h = b && b.charAt(0);
            "statement" == d.type && "}" == h && (d = d.prev);
            var m = h == d.type;
            return"statement" == d.type ? d.indented + ("{" == h ? 0 : c) : d.align ? d.column + (m ? 0 : 1) : d.indented + (m ? 0 : c)
        }, electricChars: "{}"}
    });
    (function () {
        function n(d) {
            for (var g = {}, d = d.split(" "), j = 0; j < d.length; ++j)g[d[j]] = !0;
            return g
        }

        function j(d, g) {
            if (!g.startOfLine)return!1;
            d.skipToEnd();
            return"meta"
        }

        function g(d, g) {
            for (var j; null != (j = d.next());)if ('"' == j && !d.eat('"')) {
                g.tokenize = null;
                break
            }
            return"string"
        }

        var d = "auto if break int case long char register continue return default short do sizeof double static else struct entry switch extern typedef float union for unsigned goto while enum void const signed volatile";
        CodeMirror.defineMIME("text/x-csrc",
            {name: "clike", keywords: n(d), blockKeywords: n("case do else for if switch while struct"), atoms: n("null"), hooks: {"#": j}});
        CodeMirror.defineMIME("text/x-c++src", {name: "clike", keywords: n(d + " asm dynamic_cast namespace reinterpret_cast try bool explicit new static_cast typeid catch operator template typename class friend private this using const_cast inline public throw virtual delete mutable protected wchar_t"), blockKeywords: n("catch class do else finally for if struct switch try while"), atoms: n("true false null"),
            hooks: {"#": j}});
        CodeMirror.defineMIME("text/x-java", {name: "clike", keywords: n("abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try void volatile while"), blockKeywords: n("catch class do else finally for if switch try while"), atoms: n("true false null"),
            hooks: {"@": function (d) {
                d.eatWhile(/[\w\$_]/);
                return"meta"
            }}});
        CodeMirror.defineMIME("text/x-csharp", {name: "clike", keywords: n("abstract as base bool break byte case catch char checked class const continue decimal default delegate do double else enum event explicit extern finally fixed float for foreach goto if implicit in int interface internal is lock long namespace new object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw try typeof uint ulong unchecked unsafe ushort using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),
            blockKeywords: n("catch class do else finally for foreach if struct switch try while"), atoms: n("true false null"), hooks: {"@": function (d, j) {
                if (d.eat('"'))return j.tokenize = g, g(d, j);
                d.eatWhile(/[\w\$_]/);
                return"meta"
            }}})
    })();
    /*

     Copyright (c) 2012 Marijn Haverbeke

     Licensed under the MIT license:
     http://opensource.org/licenses/mit-license
     */
    CodeMirror.defineMode("go", function (n) {
        function j(m, s) {
            var h = m.next();
            if ('"' == h || "'" == h || "`" == h)return s.tokenize = g(h), s.tokenize(m, s);
            if (/[\d\.]/.test(h))return"." == h ? m.match(/^[0-9]+([eE][\-+]?[0-9]+)?/) : "0" == h ? m.match(/^[xX][0-9a-fA-F]+/) || m.match(/^0[0-7]+/) : m.match(/^[0-9]*\.?[0-9]*([eE][\-+]?[0-9]+)?/), "number";
            if (/[\[\]{}\(\),;\:\.]/.test(h))return w = h, null;
            if ("/" == h) {
                if (m.eat("*"))return s.tokenize = d, d(m, s);
                if (m.eat("/"))return m.skipToEnd(), "comment"
            }
            if (b.test(h))return m.eatWhile(b), "operator";
            m.eatWhile(/[\w\$_]/);
            h = m.current();
            if (c.propertyIsEnumerable(h)) {
                if ("case" == h || "default" == h)w = "case";
                return"keyword"
            }
            return a.propertyIsEnumerable(h) ? "atom" : "word"
        }

        function g(a) {
            return function (b, c) {
                for (var d = !1, i, w = !1; null != (i = b.next());) {
                    if (i == a && !d) {
                        w = !0;
                        break
                    }
                    d = !d && "\\" == i
                }
                if (w || !(d || "`" == a))c.tokenize = j;
                return"string"
            }
        }

        function d(a, b) {
            for (var c = !1, d; d = a.next();) {
                if ("/" == d && c) {
                    b.tokenize = j;
                    break
                }
                c = "*" == d
            }
            return"comment"
        }

        function t(a, b, c, d, i) {
            this.indented = a;
            this.column = b;
            this.type = c;
            this.align =
                d;
            this.prev = i
        }

        function u(a, b, c) {
            return a.context = new t(a.indented, b, c, null, a.context)
        }

        function r(a) {
            var b = a.context.type;
            if (")" == b || "]" == b || "}" == b)a.indented = a.context.indented;
            return a.context = a.context.prev
        }

        var q = n.indentUnit, c = {"break": !0, "case": !0, chan: !0, "const": !0, "continue": !0, "default": !0, defer: !0, "else": !0, fallthrough: !0, "for": !0, func: !0, go: !0, "goto": !0, "if": !0, "import": !0, "interface": !0, map: !0, "package": !0, range: !0, "return": !0, select: !0, struct: !0, "switch": !0, type: !0, "var": !0, bool: !0, "byte": !0,
            complex64: !0, complex128: !0, float32: !0, float64: !0, int8: !0, int16: !0, int32: !0, int64: !0, string: !0, uint8: !0, uint16: !0, uint32: !0, uint64: !0, "int": !0, uint: !0, uintptr: !0}, a = {"true": !0, "false": !0, iota: !0, nil: !0, append: !0, cap: !0, close: !0, complex: !0, copy: !0, imag: !0, len: !0, make: !0, "new": !0, panic: !0, print: !0, println: !0, real: !0, recover: !0}, b = /[+\-*&^%:=<>!|\/]/, w;
        return{startState: function (a) {
            return{tokenize: null, context: new t((a || 0) - q, 0, "top", !1), indented: 0, startOfLine: !0}
        }, token: function (a, b) {
            var c = b.context;
            if (a.sol() && (null == c.align && (c.align = !1), b.indented = a.indentation(), b.startOfLine = !0, "case" == c.type))c.type = "}";
            if (a.eatSpace())return null;
            w = null;
            var d = (b.tokenize || j)(a, b);
            if ("comment" == d)return d;
            null == c.align && (c.align = !0);
            "{" == w ? u(b, a.column(), "}") : "[" == w ? u(b, a.column(), "]") : "(" == w ? u(b, a.column(), ")") : "case" == w ? c.type = "case" : "}" == w && "}" == c.type ? r(b) : w == c.type && r(b);
            b.startOfLine = !1;
            return d
        }, indent: function (a, b) {
            if (a.tokenize != j && null != a.tokenize)return 0;
            var c = a.context, d = b && b.charAt(0);
            if ("case" ==
                c.type && /^(?:case|default)\b/.test(b))return a.context.type = "}", c.indented;
            d = d == c.type;
            return c.align ? c.column + (d ? 0 : 1) : c.indented + (d ? 0 : q)
        }, electricChars: "{}:"}
    });
    CodeMirror.defineMIME("text/x-go", "go");
    /*

     Copyright (c) 2011 Marijn Haverbeke

     Licensed under the MIT license:
     http://opensource.org/licenses/mit-license
     */
    (function () {
        function n(d) {
            for (var g = {}, d = d.split(" "), j = 0; j < d.length; ++j)g[d[j]] = !0;
            return g
        }

        function j(d) {
            return function (g, j) {
                g.match(d) ? j.tokenize = null : g.skipToEnd();
                return"string"
            }
        }

        var g = {name: "clike", keywords: n("abstract and array as break case catch class clone const continue declare default do else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach function global goto if implements interface instanceof namespace new or private protected public static switch throw trait try use var while xor die echo empty exit eval include include_once isset list require require_once return print unset __halt_compiler self static parent"),
            blockKeywords: n("catch do else elseif for foreach if switch try while"), atoms: n("true false null TRUE FALSE NULL"), multiLineStrings: !0, hooks: {$: function (d) {
                d.eatWhile(/[\w\$_]/);
                return"variable-2"
            }, "<": function (d, g) {
                return d.match(/<</) ? (d.eatWhile(/[\w\.]/), g.tokenize = j(d.current().slice(3)), g.tokenize(d, g)) : !1
            }, "#": function (d) {
                for (; !d.eol() && !d.match("?>", !1);)d.next();
                return"comment"
            }, "/": function (d) {
                if (d.eat("/")) {
                    for (; !d.eol() && !d.match("?>", !1);)d.next();
                    return"comment"
                }
                return!1
            }}};
        CodeMirror.defineMode("php",
            function (d, j) {
                function n(b, d) {
                    var g = "php" == d.mode;
                    b.sol() && '"' != d.pending && (d.pending = null);
                    if (d.curMode == r) {
                        if (b.match(/^<\?\w*/))return d.curMode = a, d.curState = d.php, d.curClose = "?>", d.mode = "php", "meta";
                        if ('"' == d.pending) {
                            for (; !b.eol() && '"' != b.next(););
                            g = "string"
                        } else d.pending && b.pos < d.pending.end ? (b.pos = d.pending.end, g = d.pending.style) : g = r.token(b, d.curState);
                        d.pending = null;
                        var j = b.current(), h = j.search(/<\?/);
                        -1 != h ? (d.pending = "string" == g && /\"$/.test(j) && !/\?>/.test(j) ? '"' : {end: b.pos, style: g}, b.backUp(j.length -
                            h)) : "tag" == g && (">" == b.current() && d.curState.context) && (/^script$/i.test(d.curState.context.tagName) ? (d.curMode = q, d.curState = q.startState(r.indent(d.curState, "")), d.curClose = /^<\/\s*script\s*>/i, d.mode = "javascript") : /^style$/i.test(d.curState.context.tagName) && (d.curMode = c, d.curState = c.startState(r.indent(d.curState, "")), d.curClose = /^<\/\s*style\s*>/i, d.mode = "css"));
                        return g
                    }
                    return(!g || null == d.php.tokenize) && b.match(d.curClose, g) ? (d.curMode = r, d.curState = d.html, d.curClose = null, d.mode = "html", g ? "meta" :
                        n(b, d)) : d.curMode.token(b, d.curState)
                }

                var r = CodeMirror.getMode(d, {name: "xml", htmlMode: !0}), q = CodeMirror.getMode(d, "javascript"), c = CodeMirror.getMode(d, "css"), a = CodeMirror.getMode(d, g);
                return{startState: function () {
                    var b = r.startState();
                    return{html: b, php: a.startState(), curMode: j.startOpen ? a : r, curState: j.startOpen ? a.startState() : b, curClose: j.startOpen ? /^\?>/ : null, mode: j.startOpen ? "php" : "html", pending: null}
                }, copyState: function (b) {
                    var c = b.html, d = CodeMirror.copyState(r, c), g = b.php, h = CodeMirror.copyState(a,
                        g), c = b.curState == c ? d : b.curState == g ? h : CodeMirror.copyState(b.curMode, b.curState);
                    return{html: d, php: h, curMode: b.curMode, curState: c, curClose: b.curClose, mode: b.mode, pending: b.pending}
                }, token: n, indent: function (b, c) {
                    return b.curMode != a && /^\s*<\//.test(c) || b.curMode == a && /^\?>/.test(c) ? r.indent(b.html, c) : b.curMode.indent(b.curState, c)
                }, electricChars: "/{}:"}
            });
        CodeMirror.defineMIME("application/x-httpd-php", "php");
        CodeMirror.defineMIME("application/x-httpd-php-open", {name: "php", startOpen: !0});
        CodeMirror.defineMIME("text/x-php",
            g)
    })();
})();
