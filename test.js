var FPROM = function() {
    "use strict";
    var c = {},
        r = "https://t.firstpromoter.com/tr",
        n = "https://t.firstpromoter.com/get_details",
        f = null,
        t = "_fprom_details",
        i = "_fprom_tid",
        o = "_fprom_ref",
        e = 86400,
        a = 1440,
        u = ["fp_ref", "fpr", "via", "ref", "a", "_from", "_by", "deal", "_go", "_get"],
        d = !1;

    function l() {
        return window.fprom_loaded
    }

    function s(n) {
        c = function(n, e) {
            if (!e) return n;
            var t, i = {};
            for (t in n) n.hasOwnProperty(t) && (i[t] = n[t]);
            for (t in e) e.hasOwnProperty(t) && (i[t] = e[t]);
            return i
        }(c, n)
    }

    function _(n, e) {
        return (new RegExp("^(?:.*?\\.)?([a-zA-Z0-9\\-_]{" + e + ",}\\.(?:\\w{2,8}|\\w{2,5}\\.\\w{2,4}))$").exec(n) || [])[1] || ""
    }

    function p() {
        var n, e;
        c.domain = (n = _(e = window.location.hostname, 3), e = _(e, 4), n.length > e.length ? n : e), c.test_mode = "1" === x("test_mode"), c.test_mode || (c.cookie_tid = v(i), c.cookie_ref_id = v(o), c.details = g(v(t), !0)), c.referrer = document.referrer, c.url_ref_id = function() {
                var e;
                c.custom_param && u.unshift(c.custom_param);
                return u.some(function(n) {
                    return e = x(n)
                }), e
            }(), c.ref_id = c.url_ref_id || c.cookie_ref_id, c.url = window.location.href, c.tid = c.cookie_tid,
            function() {
                {
                    var n, e;
                    c.cr_id = x("fpc"), c.cr_id && (e = c.cr_id.split("--"), n = e[0], e = atob(e[1]), k(n), R(e), h(["fpc"]))
                }
            }()
    }

    function w(n, e, t, i) {
        var o, r = (o = n, n = e, "withCredentials" in (e = new XMLHttpRequest) ? e.open(o, n) : "undefined" != typeof XDomainRequest ? (e = new XDomainRequest).open(o, n) : e = null, e);
        r ? (r.onload = function() {
            m(i) && i(r)
        }, r.onerror = function() {
            console.log("FirstPromoter: Error on CORS ajax request!"), m(i) && i(r)
        }, r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), r.send(function(n) {
            if ("object" != typeof n && "undefined" != typeof console) return console.log("not a JSON object"), null;
            for (var e = encodeURIComponent, t = "", i = Object.keys(n), o = 0; o < i.length; o++) t += e(i[o]) + "=" + e(n[i[o]]), o < i.length - 1 && (t += "&");
            return t
        }(t))) : console.log("CORS not supported")
    }

    function x(n) {
        return new URLSearchParams(window.location.search).get(n)
    }

    function h(n = u) {
        n.forEach(function(n) {
            var e = new URLSearchParams(window.location.search);
            e.get(n) && (e.delete(n), e = window.location.pathname + "?" + e.toString(), history.replaceState(null, null, e))
        })
    }

    function m(n) {
        return n && "function" == typeof n
    }

    function g(n, e = !1) {
        var t;
        try {
            t = JSON.parse(n)
        } catch (n) {}
        if (!e || t) return t || {}
    }

    function y(n, e, t) {
        var i, o = "",
            r = "";
        t && ((i = new Date).setTime(i.getTime() + 60 * t * 1e3), o = "; expires=" + i.toGMTString()), c.domain && (r = "; domain=." + c.domain), document.cookie = n + "=" + escape(e) + o + r + "; path=/"
    }

    function v(n) {
        for (var e, t = n + "=", i = document.cookie.split(";"), o = 0; o < i.length; o++) {
            for (e = i[o];
                " " === e.charAt(0);) e = e.substring(1, e.length);
            if (0 === e.indexOf(t)) return unescape(e.substring(t.length, e.length))
        }
        return null
    }

    function k(n) {
        n && (y(i, n, f || e), c.cookie_tid = n, c.tid = n)
    }

    function R(n) {
        n && (y(o, n, f || e), c.cookie_ref_id = n, c.ref_id = n)
    }

    function O(n) {
        n && (c.details = n, delete c.include_details, y(t, JSON.stringify(n), a))
    }

    function S(n) {
        var e, t = {};
        for (e in n) n.hasOwnProperty(e) && 0 != e.indexOf("on") && "details" != e && (t[e] = n[e]);
        return t
    }

    function F(n, e, t) {
        if (s(e), "click" == n) {
            if (!P()) return;
            c.tid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(n) {
                var e = 16 * Math.random() | 0;
                return ("x" == n ? e : 3 & e | 8).toString(16)
            })
        }
        var i, o, e = S(c);
        e.event = n, o = t, b(r, i = e, function(n) {
            n.cookie_life && (f = 1440 * n.cookie_life), "click" == i.event && (R(n.ref_id), k(n.tid), n.clean_url && h())
        }, function(n) {
            c.include_details && (n && n.details && O(n.details), q()), m(o) && o(n)
        })
    }

    function P() {
        return c.ref_id && c.ref_id != c.cookie_ref_id || !c.tid && c.url_tracking
    }

    function b(n, e, t, i) {
        d != n && e.tid && w("POST", d = n, e, function(n) {
            d = !1;
            var e = g(n.responseText);
            200 == n.status && t(e), m(i) && i(e)
        })
    }

    function D() {
        return c.details && c.details.ref_id == c.ref_id && !P()
    }

    function q() {
        m(c.onDetailsFunc) && (D() ? c.onDetailsFunc(c.details) : (c.include_details = !0, P() || b(n, S(c), function(n) {
            O(n.details), c.onDetailsFunc(n.details)
        })))
    }
    var T = {
        set: function(n) {
            s(n)
        },
        crossDomain: function(n) {
            ! function(n) {
                if (c.tid && c.ref_id)
                    for (var e = Array.isArray(n) ? n : [n], t = document.links, i = 0; i < e.length; i++)
                        for (var o, r = 0; r < t.length; r++) t[r].href && -1 < t[r].href.indexOf(e[i]) && ((o = new URL(t[r].href)).searchParams.set("fpc", c.tid + "--" + btoa(c.ref_id)), t[r].href = o)
            }(n)
        },
        details: function(n) {
            ! function(e) {
                if (!e || "function" != typeof e) throw "Callback function is required!";
                c.onDetailsFunc = function(n) {
                    e(n)
                }, q()
            }(n)
        },
        onReady: function(n) {
            n = n, l() ? n(c) : c.onReadyFunc = n
        },
        urlTracking: function() {
            F("click", {
                url_tracking: !0
            })
        },
        click: function(n, e) {
            F("click", n, e)
        },
        referral: function(n, e) {
            F("referral", n, e)
        },
        sale: function(n, e) {
            F("sale", n, e)
        },
        init: function(n, e) {
            n = n, e = e, l() || (p(), s(n), D() && delete c.include_details, window.fprom_loaded = !0, m(e) && e(data), m(c.onReadyFunc) && c.onReadyFunc(c))
        }
    };
    return T.getDetails = T.details, {
        methods: T,
        _fpr: function(e) {
            function n() {
                var n = Array.prototype.slice.call(arguments);
                n && n[0] && e[n[0]] && e[n.shift()].apply(e, n)
            }
            if (window.fpr)
                for (; 0 < window.fpr.q.length;) n.apply(e, window.fpr.q.shift());
            return n
        }(T),
        data: c
    }
}();
window.fpr = window.FPROM._fpr;