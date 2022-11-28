var g3 = Object.create;
var ju = Object.defineProperty;
var y3 = Object.getOwnPropertyDescriptor;
var v3 = Object.getOwnPropertyNames;
var w3 = Object.getPrototypeOf,
  D3 = Object.prototype.hasOwnProperty;
var y = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  b3 = (e, t) => {
    for (var r in t) ju(e, r, { get: t[r], enumerable: !0 });
  },
  Ew = (e, t, r, i) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let n of v3(t))
        !D3.call(e, n) &&
          n !== r &&
          ju(e, n, {
            get: () => t[n],
            enumerable: !(i = y3(t, n)) || i.enumerable,
          });
    return e;
  };
var gt = (e, t, r) => (
    (r = e != null ? g3(w3(e)) : {}),
    Ew(
      t || !e || !e.__esModule
        ? ju(r, "default", { value: e, enumerable: !0 })
        : r,
      e,
    )
  ),
  E3 = (e) => Ew(ju({}, "__esModule", { value: !0 }), e);
var Qc = y((UX, _w) => {
  var Qn = 1e3,
    Jn = Qn * 60,
    es = Jn * 60,
    Ji = es * 24,
    _3 = Ji * 7,
    S3 = Ji * 365.25;
  _w.exports = function (e, t) {
    t = t || {};
    var r = typeof e;
    if (r === "string" && e.length > 0) return x3(e);
    if (r === "number" && isFinite(e)) return t.long ? O3(e) : C3(e);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" +
        JSON.stringify(e),
    );
  };
  function x3(e) {
    if (((e = String(e)), !(e.length > 100))) {
      var t =
        /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          e,
        );
      if (!!t) {
        var r = parseFloat(t[1]),
          i = (t[2] || "ms").toLowerCase();
        switch (i) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return r * S3;
          case "weeks":
          case "week":
          case "w":
            return r * _3;
          case "days":
          case "day":
          case "d":
            return r * Ji;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return r * es;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return r * Jn;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return r * Qn;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return r;
          default:
            return;
        }
      }
    }
  }
  function C3(e) {
    var t = Math.abs(e);
    return t >= Ji
      ? Math.round(e / Ji) + "d"
      : t >= es
      ? Math.round(e / es) + "h"
      : t >= Jn
      ? Math.round(e / Jn) + "m"
      : t >= Qn
      ? Math.round(e / Qn) + "s"
      : e + "ms";
  }
  function O3(e) {
    var t = Math.abs(e);
    return t >= Ji
      ? Uu(e, t, Ji, "day")
      : t >= es
      ? Uu(e, t, es, "hour")
      : t >= Jn
      ? Uu(e, t, Jn, "minute")
      : t >= Qn
      ? Uu(e, t, Qn, "second")
      : e + " ms";
  }
  function Uu(e, t, r, i) {
    var n = t >= r * 1.5;
    return Math.round(e / r) + " " + i + (n ? "s" : "");
  }
});
var Jc = y((zX, Sw) => {
  function T3(e) {
    (r.debug = r),
      (r.default = r),
      (r.coerce = u),
      (r.disable = s),
      (r.enable = n),
      (r.enabled = a),
      (r.humanize = Qc()),
      (r.destroy = l),
      Object.keys(e).forEach((f) => {
        r[f] = e[f];
      }),
      (r.names = []),
      (r.skips = []),
      (r.formatters = {});
    function t(f) {
      let h = 0;
      for (let c = 0; c < f.length; c++)
        (h = (h << 5) - h + f.charCodeAt(c)), (h |= 0);
      return r.colors[Math.abs(h) % r.colors.length];
    }
    r.selectColor = t;
    function r(f) {
      let h,
        c = null,
        d,
        m;
      function C(...E) {
        if (!C.enabled) return;
        let O = C,
          L = Number(new Date()),
          D = L - (h || L);
        (O.diff = D),
          (O.prev = h),
          (O.curr = L),
          (h = L),
          (E[0] = r.coerce(E[0])),
          typeof E[0] != "string" && E.unshift("%O");
        let w = 0;
        (E[0] = E[0].replace(/%([a-zA-Z%])/g, (g, x) => {
          if (g === "%%") return "%";
          w++;
          let A = r.formatters[x];
          if (typeof A == "function") {
            let p = E[w];
            (g = A.call(O, p)), E.splice(w, 1), w--;
          }
          return g;
        })),
          r.formatArgs.call(O, E),
          (O.log || r.log).apply(O, E);
      }
      return (
        (C.namespace = f),
        (C.useColors = r.useColors()),
        (C.color = r.selectColor(f)),
        (C.extend = i),
        (C.destroy = r.destroy),
        Object.defineProperty(C, "enabled", {
          enumerable: !0,
          configurable: !1,
          get: () =>
            c !== null
              ? c
              : (d !== r.namespaces && ((d = r.namespaces), (m = r.enabled(f))),
                m),
          set: (E) => {
            c = E;
          },
        }),
        typeof r.init == "function" && r.init(C),
        C
      );
    }
    function i(f, h) {
      let c = r(this.namespace + (typeof h > "u" ? ":" : h) + f);
      return (c.log = this.log), c;
    }
    function n(f) {
      r.save(f), (r.namespaces = f), (r.names = []), (r.skips = []);
      let h,
        c = (typeof f == "string" ? f : "").split(/[\s,]+/),
        d = c.length;
      for (h = 0; h < d; h++)
        !c[h] ||
          ((f = c[h].replace(/\*/g, ".*?")),
          f[0] === "-"
            ? r.skips.push(new RegExp("^" + f.slice(1) + "$"))
            : r.names.push(new RegExp("^" + f + "$")));
    }
    function s() {
      let f = [...r.names.map(o), ...r.skips.map(o).map((h) => "-" + h)].join(
        ",",
      );
      return r.enable(""), f;
    }
    function a(f) {
      if (f[f.length - 1] === "*") return !0;
      let h, c;
      for (h = 0, c = r.skips.length; h < c; h++)
        if (r.skips[h].test(f)) return !1;
      for (h = 0, c = r.names.length; h < c; h++)
        if (r.names[h].test(f)) return !0;
      return !1;
    }
    function o(f) {
      return f
        .toString()
        .substring(2, f.toString().length - 2)
        .replace(/\.\*\?$/, "*");
    }
    function u(f) {
      return f instanceof Error ? f.stack || f.message : f;
    }
    function l() {
      console.warn(
        "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.",
      );
    }
    return r.enable(r.load()), r;
  }
  Sw.exports = T3;
});
var xw = y((xt, zu) => {
  xt.formatArgs = R3;
  xt.save = A3;
  xt.load = N3;
  xt.useColors = F3;
  xt.storage = I3();
  xt.destroy = (() => {
    let e = !1;
    return () => {
      e ||
        ((e = !0),
        console.warn(
          "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.",
        ));
    };
  })();
  xt.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33",
  ];
  function F3() {
    return typeof window < "u" &&
      window.process &&
      (window.process.type === "renderer" || window.process.__nwjs)
      ? !0
      : typeof navigator < "u" &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
      ? !1
      : (typeof document < "u" &&
          document.documentElement &&
          document.documentElement.style &&
          document.documentElement.style.WebkitAppearance) ||
        (typeof window < "u" &&
          window.console &&
          (window.console.firebug ||
            (window.console.exception && window.console.table))) ||
        (typeof navigator < "u" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
          parseInt(RegExp.$1, 10) >= 31) ||
        (typeof navigator < "u" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }
  function R3(e) {
    if (
      ((e[0] =
        (this.useColors ? "%c" : "") +
        this.namespace +
        (this.useColors ? " %c" : " ") +
        e[0] +
        (this.useColors ? "%c " : " ") +
        "+" +
        zu.exports.humanize(this.diff)),
      !this.useColors)
    )
      return;
    let t = "color: " + this.color;
    e.splice(1, 0, t, "color: inherit");
    let r = 0,
      i = 0;
    e[0].replace(/%[a-zA-Z%]/g, (n) => {
      n !== "%%" && (r++, n === "%c" && (i = r));
    }),
      e.splice(i, 0, t);
  }
  xt.log = console.debug || console.log || (() => {});
  function A3(e) {
    try {
      e ? xt.storage.setItem("debug", e) : xt.storage.removeItem("debug");
    } catch {}
  }
  function N3() {
    let e;
    try {
      e = xt.storage.getItem("debug");
    } catch {}
    return (
      !e && typeof process < "u" && "env" in process && (e = process.env.DEBUG),
      e
    );
  }
  function I3() {
    try {
      return localStorage;
    } catch {}
  }
  zu.exports = Jc()(xt);
  var { formatters: M3 } = zu.exports;
  M3.j = function (e) {
    try {
      return JSON.stringify(e);
    } catch (t) {
      return "[UnexpectedJSONParseError]: " + t.message;
    }
  };
});
var Ow = y(($X, Cw) => {
  "use strict";
  Cw.exports = (e, t = process.argv) => {
    let r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--",
      i = t.indexOf(r + e),
      n = t.indexOf("--");
    return i !== -1 && (n === -1 || i < n);
  };
});
var Rw = y((WX, Fw) => {
  "use strict";
  var L3 = require("os"),
    Tw = require("tty"),
    zt = Ow(),
    { env: Ge } = process,
    ai;
  zt("no-color") || zt("no-colors") || zt("color=false") || zt("color=never")
    ? (ai = 0)
    : (zt("color") || zt("colors") || zt("color=true") || zt("color=always")) &&
      (ai = 1);
  "FORCE_COLOR" in Ge &&
    (Ge.FORCE_COLOR === "true"
      ? (ai = 1)
      : Ge.FORCE_COLOR === "false"
      ? (ai = 0)
      : (ai =
          Ge.FORCE_COLOR.length === 0
            ? 1
            : Math.min(parseInt(Ge.FORCE_COLOR, 10), 3)));
  function ed(e) {
    return e === 0
      ? !1
      : { level: e, hasBasic: !0, has256: e >= 2, has16m: e >= 3 };
  }
  function td(e, t) {
    if (ai === 0) return 0;
    if (zt("color=16m") || zt("color=full") || zt("color=truecolor")) return 3;
    if (zt("color=256")) return 2;
    if (e && !t && ai === void 0) return 0;
    let r = ai || 0;
    if (Ge.TERM === "dumb") return r;
    if (process.platform === "win32") {
      let i = L3.release().split(".");
      return Number(i[0]) >= 10 && Number(i[2]) >= 10586
        ? Number(i[2]) >= 14931
          ? 3
          : 2
        : 1;
    }
    if ("CI" in Ge)
      return [
        "TRAVIS",
        "CIRCLECI",
        "APPVEYOR",
        "GITLAB_CI",
        "GITHUB_ACTIONS",
        "BUILDKITE",
      ].some((i) => i in Ge) || Ge.CI_NAME === "codeship"
        ? 1
        : r;
    if ("TEAMCITY_VERSION" in Ge)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(Ge.TEAMCITY_VERSION) ? 1 : 0;
    if (Ge.COLORTERM === "truecolor") return 3;
    if ("TERM_PROGRAM" in Ge) {
      let i = parseInt((Ge.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (Ge.TERM_PROGRAM) {
        case "iTerm.app":
          return i >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(Ge.TERM)
      ? 2
      : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
          Ge.TERM,
        ) || "COLORTERM" in Ge
      ? 1
      : r;
  }
  function q3(e) {
    let t = td(e, e && e.isTTY);
    return ed(t);
  }
  Fw.exports = {
    supportsColor: q3,
    stdout: ed(td(!0, Tw.isatty(1))),
    stderr: ed(td(!0, Tw.isatty(2))),
  };
});
var Nw = y((Xe, Wu) => {
  var P3 = require("tty"),
    $u = require("util");
  Xe.init = W3;
  Xe.log = U3;
  Xe.formatArgs = k3;
  Xe.save = z3;
  Xe.load = $3;
  Xe.useColors = B3;
  Xe.destroy = $u.deprecate(() => {},
  "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  Xe.colors = [6, 2, 3, 4, 5, 1];
  try {
    let e = Rw();
    e &&
      (e.stderr || e).level >= 2 &&
      (Xe.colors = [
        20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63,
        68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128,
        129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168,
        169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200,
        201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221,
      ]);
  } catch {}
  Xe.inspectOpts = Object.keys(process.env)
    .filter((e) => /^debug_/i.test(e))
    .reduce((e, t) => {
      let r = t
          .substring(6)
          .toLowerCase()
          .replace(/_([a-z])/g, (n, s) => s.toUpperCase()),
        i = process.env[t];
      return (
        /^(yes|on|true|enabled)$/i.test(i)
          ? (i = !0)
          : /^(no|off|false|disabled)$/i.test(i)
          ? (i = !1)
          : i === "null"
          ? (i = null)
          : (i = Number(i)),
        (e[r] = i),
        e
      );
    }, {});
  function B3() {
    return "colors" in Xe.inspectOpts
      ? Boolean(Xe.inspectOpts.colors)
      : P3.isatty(process.stderr.fd);
  }
  function k3(e) {
    let { namespace: t, useColors: r } = this;
    if (r) {
      let i = this.color,
        n = "\x1B[3" + (i < 8 ? i : "8;5;" + i),
        s = `  ${n};1m${t} \x1B[0m`;
      (e[0] =
        s +
        e[0]
          .split(
            `
`,
          )
          .join(
            `
` + s,
          )),
        e.push(n + "m+" + Wu.exports.humanize(this.diff) + "\x1B[0m");
    } else e[0] = j3() + t + " " + e[0];
  }
  function j3() {
    return Xe.inspectOpts.hideDate ? "" : new Date().toISOString() + " ";
  }
  function U3(...e) {
    return process.stderr.write(
      $u.format(...e) +
        `
`,
    );
  }
  function z3(e) {
    e ? (process.env.DEBUG = e) : delete process.env.DEBUG;
  }
  function $3() {
    return process.env.DEBUG;
  }
  function W3(e) {
    e.inspectOpts = {};
    let t = Object.keys(Xe.inspectOpts);
    for (let r = 0; r < t.length; r++)
      e.inspectOpts[t[r]] = Xe.inspectOpts[t[r]];
  }
  Wu.exports = Jc()(Xe);
  var { formatters: Aw } = Wu.exports;
  Aw.o = function (e) {
    return (
      (this.inspectOpts.colors = this.useColors),
      $u
        .inspect(e, this.inspectOpts)
        .split(
          `
`,
        )
        .map((t) => t.trim())
        .join(" ")
    );
  };
  Aw.O = function (e) {
    return (
      (this.inspectOpts.colors = this.useColors),
      $u.inspect(e, this.inspectOpts)
    );
  };
});
var Iw = y((GX, rd) => {
  typeof process > "u" ||
  process.type === "renderer" ||
  process.browser === !0 ||
  process.__nwjs
    ? (rd.exports = xw())
    : (rd.exports = Nw());
});
var id = y((HX, Lw) => {
  Lw.exports = Mw;
  function Mw(e, t) {
    if (e && t) return Mw(e)(t);
    if (typeof e != "function") throw new TypeError("need wrapper function");
    return (
      Object.keys(e).forEach(function (i) {
        r[i] = e[i];
      }),
      r
    );
    function r() {
      for (var i = new Array(arguments.length), n = 0; n < i.length; n++)
        i[n] = arguments[n];
      var s = e.apply(this, i),
        a = i[i.length - 1];
      return (
        typeof s == "function" &&
          s !== a &&
          Object.keys(a).forEach(function (o) {
            s[o] = a[o];
          }),
        s
      );
    }
  }
});
var Ra = y((VX, nd) => {
  var qw = id();
  nd.exports = qw(Gu);
  nd.exports.strict = qw(Pw);
  Gu.proto = Gu(function () {
    Object.defineProperty(Function.prototype, "once", {
      value: function () {
        return Gu(this);
      },
      configurable: !0,
    }),
      Object.defineProperty(Function.prototype, "onceStrict", {
        value: function () {
          return Pw(this);
        },
        configurable: !0,
      });
  });
  function Gu(e) {
    var t = function () {
      return t.called
        ? t.value
        : ((t.called = !0), (t.value = e.apply(this, arguments)));
    };
    return (t.called = !1), t;
  }
  function Pw(e) {
    var t = function () {
        if (t.called) throw new Error(t.onceError);
        return (t.called = !0), (t.value = e.apply(this, arguments));
      },
      r = e.name || "Function wrapped with `once`";
    return (
      (t.onceError = r + " shouldn't be called more than once"),
      (t.called = !1),
      t
    );
  }
});
var sd = y((YX, kw) => {
  var G3 = Ra(),
    H3 = function () {},
    V3 = function (e) {
      return e.setHeader && typeof e.abort == "function";
    },
    Y3 = function (e) {
      return e.stdio && Array.isArray(e.stdio) && e.stdio.length === 3;
    },
    Bw = function (e, t, r) {
      if (typeof t == "function") return Bw(e, null, t);
      t || (t = {}), (r = G3(r || H3));
      var i = e._writableState,
        n = e._readableState,
        s = t.readable || (t.readable !== !1 && e.readable),
        a = t.writable || (t.writable !== !1 && e.writable),
        o = !1,
        u = function () {
          e.writable || l();
        },
        l = function () {
          (a = !1), s || r.call(e);
        },
        f = function () {
          (s = !1), a || r.call(e);
        },
        h = function (E) {
          r.call(e, E ? new Error("exited with error code: " + E) : null);
        },
        c = function (E) {
          r.call(e, E);
        },
        d = function () {
          process.nextTick(m);
        },
        m = function () {
          if (!o) {
            if (s && !(n && n.ended && !n.destroyed))
              return r.call(e, new Error("premature close"));
            if (a && !(i && i.ended && !i.destroyed))
              return r.call(e, new Error("premature close"));
          }
        },
        C = function () {
          e.req.on("finish", l);
        };
      return (
        V3(e)
          ? (e.on("complete", l),
            e.on("abort", d),
            e.req ? C() : e.on("request", C))
          : a && !i && (e.on("end", u), e.on("close", u)),
        Y3(e) && e.on("exit", h),
        e.on("end", f),
        e.on("finish", l),
        t.error !== !1 && e.on("error", c),
        e.on("close", d),
        function () {
          (o = !0),
            e.removeListener("complete", l),
            e.removeListener("abort", d),
            e.removeListener("request", C),
            e.req && e.req.removeListener("finish", l),
            e.removeListener("end", u),
            e.removeListener("close", u),
            e.removeListener("finish", l),
            e.removeListener("exit", h),
            e.removeListener("end", f),
            e.removeListener("error", c),
            e.removeListener("close", d);
        }
      );
    };
  kw.exports = Bw;
});
var zw = y((XX, Uw) => {
  var X3 = Ra(),
    Z3 = sd(),
    ad = require("fs"),
    Aa = function () {},
    K3 = /^v?\.0/.test(process.version),
    Hu = function (e) {
      return typeof e == "function";
    },
    Q3 = function (e) {
      return !K3 || !ad
        ? !1
        : (e instanceof (ad.ReadStream || Aa) ||
            e instanceof (ad.WriteStream || Aa)) &&
            Hu(e.close);
    },
    J3 = function (e) {
      return e.setHeader && Hu(e.abort);
    },
    e5 = function (e, t, r, i) {
      i = X3(i);
      var n = !1;
      e.on("close", function () {
        n = !0;
      }),
        Z3(e, { readable: t, writable: r }, function (a) {
          if (a) return i(a);
          (n = !0), i();
        });
      var s = !1;
      return function (a) {
        if (!n && !s) {
          if (((s = !0), Q3(e))) return e.close(Aa);
          if (J3(e)) return e.abort();
          if (Hu(e.destroy)) return e.destroy();
          i(a || new Error("stream was destroyed"));
        }
      };
    },
    jw = function (e) {
      e();
    },
    t5 = function (e, t) {
      return e.pipe(t);
    },
    r5 = function () {
      var e = Array.prototype.slice.call(arguments),
        t = (Hu(e[e.length - 1] || Aa) && e.pop()) || Aa;
      if ((Array.isArray(e[0]) && (e = e[0]), e.length < 2))
        throw new Error("pump requires two streams per minimum");
      var r,
        i = e.map(function (n, s) {
          var a = s < e.length - 1,
            o = s > 0;
          return e5(n, a, o, function (u) {
            r || (r = u), u && i.forEach(jw), !a && (i.forEach(jw), t(r));
          });
        });
      return e.reduce(t5);
    };
  Uw.exports = r5;
});
var Ww = y((ZX, $w) => {
  "use strict";
  var { PassThrough: i5 } = require("stream");
  $w.exports = (e) => {
    e = { ...e };
    let { array: t } = e,
      { encoding: r } = e,
      i = r === "buffer",
      n = !1;
    t ? (n = !(r || i)) : (r = r || "utf8"), i && (r = null);
    let s = new i5({ objectMode: n });
    r && s.setEncoding(r);
    let a = 0,
      o = [];
    return (
      s.on("data", (u) => {
        o.push(u), n ? (a = o.length) : (a += u.length);
      }),
      (s.getBufferedValue = () =>
        t ? o : i ? Buffer.concat(o, a) : o.join("")),
      (s.getBufferedLength = () => a),
      s
    );
  };
});
var Gw = y((KX, ts) => {
  "use strict";
  var { constants: n5 } = require("buffer"),
    s5 = zw(),
    a5 = Ww(),
    Vu = class extends Error {
      constructor() {
        super("maxBuffer exceeded"), (this.name = "MaxBufferError");
      }
    };
  async function Yu(e, t) {
    if (!e) return Promise.reject(new Error("Expected a stream"));
    t = { maxBuffer: 1 / 0, ...t };
    let { maxBuffer: r } = t,
      i;
    return (
      await new Promise((n, s) => {
        let a = (o) => {
          o &&
            i.getBufferedLength() <= n5.MAX_LENGTH &&
            (o.bufferedData = i.getBufferedValue()),
            s(o);
        };
        (i = s5(e, a5(t), (o) => {
          if (o) {
            a(o);
            return;
          }
          n();
        })),
          i.on("data", () => {
            i.getBufferedLength() > r && a(new Vu());
          });
      }),
      i.getBufferedValue()
    );
  }
  ts.exports = Yu;
  ts.exports.default = Yu;
  ts.exports.buffer = (e, t) => Yu(e, { ...t, encoding: "buffer" });
  ts.exports.array = (e, t) => Yu(e, { ...t, array: !0 });
  ts.exports.MaxBufferError = Vu;
});
var Xw = y((QX, Yw) => {
  Yw.exports = Xu;
  function Xu() {
    (this.pending = 0),
      (this.max = 1 / 0),
      (this.listeners = []),
      (this.waiting = []),
      (this.error = null);
  }
  Xu.prototype.go = function (e) {
    this.pending < this.max ? Vw(this, e) : this.waiting.push(e);
  };
  Xu.prototype.wait = function (e) {
    this.pending === 0 ? e(this.error) : this.listeners.push(e);
  };
  Xu.prototype.hold = function () {
    return Hw(this);
  };
  function Hw(e) {
    e.pending += 1;
    var t = !1;
    return r;
    function r(n) {
      if (t) throw new Error("callback called twice");
      if (
        ((t = !0),
        (e.error = e.error || n),
        (e.pending -= 1),
        e.waiting.length > 0 && e.pending < e.max)
      )
        Vw(e, e.waiting.shift());
      else if (e.pending === 0) {
        var s = e.listeners;
        (e.listeners = []), s.forEach(i);
      }
    }
    function i(n) {
      n(e.error);
    }
  }
  function Vw(e, t) {
    t(Hw(e));
  }
});
var Kw = y((Ia) => {
  var Na = require("fs"),
    Zu = require("util"),
    od = require("stream"),
    Zw = od.Readable,
    ud = od.Writable,
    o5 = od.PassThrough,
    u5 = Xw(),
    Ku = require("events").EventEmitter;
  Ia.createFromBuffer = l5;
  Ia.createFromFd = f5;
  Ia.BufferSlicer = Ar;
  Ia.FdSlicer = Rr;
  Zu.inherits(Rr, Ku);
  function Rr(e, t) {
    (t = t || {}),
      Ku.call(this),
      (this.fd = e),
      (this.pend = new u5()),
      (this.pend.max = 1),
      (this.refCount = 0),
      (this.autoClose = !!t.autoClose);
  }
  Rr.prototype.read = function (e, t, r, i, n) {
    var s = this;
    s.pend.go(function (a) {
      Na.read(s.fd, e, t, r, i, function (o, u, l) {
        a(), n(o, u, l);
      });
    });
  };
  Rr.prototype.write = function (e, t, r, i, n) {
    var s = this;
    s.pend.go(function (a) {
      Na.write(s.fd, e, t, r, i, function (o, u, l) {
        a(), n(o, u, l);
      });
    });
  };
  Rr.prototype.createReadStream = function (e) {
    return new Qu(this, e);
  };
  Rr.prototype.createWriteStream = function (e) {
    return new Ju(this, e);
  };
  Rr.prototype.ref = function () {
    this.refCount += 1;
  };
  Rr.prototype.unref = function () {
    var e = this;
    if (((e.refCount -= 1), e.refCount > 0)) return;
    if (e.refCount < 0) throw new Error("invalid unref");
    e.autoClose && Na.close(e.fd, t);
    function t(r) {
      r ? e.emit("error", r) : e.emit("close");
    }
  };
  Zu.inherits(Qu, Zw);
  function Qu(e, t) {
    (t = t || {}),
      Zw.call(this, t),
      (this.context = e),
      this.context.ref(),
      (this.start = t.start || 0),
      (this.endOffset = t.end),
      (this.pos = this.start),
      (this.destroyed = !1);
  }
  Qu.prototype._read = function (e) {
    var t = this;
    if (!t.destroyed) {
      var r = Math.min(t._readableState.highWaterMark, e);
      if (
        (t.endOffset != null && (r = Math.min(r, t.endOffset - t.pos)), r <= 0)
      ) {
        (t.destroyed = !0), t.push(null), t.context.unref();
        return;
      }
      t.context.pend.go(function (i) {
        if (t.destroyed) return i();
        var n = new Buffer(r);
        Na.read(t.context.fd, n, 0, r, t.pos, function (s, a) {
          s
            ? t.destroy(s)
            : a === 0
            ? ((t.destroyed = !0), t.push(null), t.context.unref())
            : ((t.pos += a), t.push(n.slice(0, a))),
            i();
        });
      });
    }
  };
  Qu.prototype.destroy = function (e) {
    this.destroyed ||
      ((e = e || new Error("stream destroyed")),
      (this.destroyed = !0),
      this.emit("error", e),
      this.context.unref());
  };
  Zu.inherits(Ju, ud);
  function Ju(e, t) {
    (t = t || {}),
      ud.call(this, t),
      (this.context = e),
      this.context.ref(),
      (this.start = t.start || 0),
      (this.endOffset = t.end == null ? 1 / 0 : +t.end),
      (this.bytesWritten = 0),
      (this.pos = this.start),
      (this.destroyed = !1),
      this.on("finish", this.destroy.bind(this));
  }
  Ju.prototype._write = function (e, t, r) {
    var i = this;
    if (!i.destroyed) {
      if (i.pos + e.length > i.endOffset) {
        var n = new Error("maximum file length exceeded");
        (n.code = "ETOOBIG"), i.destroy(), r(n);
        return;
      }
      i.context.pend.go(function (s) {
        if (i.destroyed) return s();
        Na.write(i.context.fd, e, 0, e.length, i.pos, function (a, o) {
          a
            ? (i.destroy(), s(), r(a))
            : ((i.bytesWritten += o),
              (i.pos += o),
              i.emit("progress"),
              s(),
              r());
        });
      });
    }
  };
  Ju.prototype.destroy = function () {
    this.destroyed || ((this.destroyed = !0), this.context.unref());
  };
  Zu.inherits(Ar, Ku);
  function Ar(e, t) {
    Ku.call(this),
      (t = t || {}),
      (this.refCount = 0),
      (this.buffer = e),
      (this.maxChunkSize = t.maxChunkSize || Number.MAX_SAFE_INTEGER);
  }
  Ar.prototype.read = function (e, t, r, i, n) {
    var s = i + r,
      a = s - this.buffer.length,
      o = a > 0 ? a : r;
    this.buffer.copy(e, t, i, s),
      setImmediate(function () {
        n(null, o);
      });
  };
  Ar.prototype.write = function (e, t, r, i, n) {
    e.copy(this.buffer, i, t, t + r),
      setImmediate(function () {
        n(null, r, e);
      });
  };
  Ar.prototype.createReadStream = function (e) {
    e = e || {};
    var t = new o5(e);
    (t.destroyed = !1),
      (t.start = e.start || 0),
      (t.endOffset = e.end),
      (t.pos = t.endOffset || this.buffer.length);
    for (var r = this.buffer.slice(t.start, t.pos), i = 0; ; ) {
      var n = i + this.maxChunkSize;
      if (n >= r.length) {
        i < r.length && t.write(r.slice(i, r.length));
        break;
      }
      t.write(r.slice(i, n)), (i = n);
    }
    return (
      t.end(),
      (t.destroy = function () {
        t.destroyed = !0;
      }),
      t
    );
  };
  Ar.prototype.createWriteStream = function (e) {
    var t = this;
    e = e || {};
    var r = new ud(e);
    return (
      (r.start = e.start || 0),
      (r.endOffset = e.end == null ? this.buffer.length : +e.end),
      (r.bytesWritten = 0),
      (r.pos = r.start),
      (r.destroyed = !1),
      (r._write = function (i, n, s) {
        if (!r.destroyed) {
          var a = r.pos + i.length;
          if (a > r.endOffset) {
            var o = new Error("maximum file length exceeded");
            (o.code = "ETOOBIG"), (r.destroyed = !0), s(o);
            return;
          }
          i.copy(t.buffer, r.pos, 0, i.length),
            (r.bytesWritten += i.length),
            (r.pos = a),
            r.emit("progress"),
            s();
        }
      }),
      (r.destroy = function () {
        r.destroyed = !0;
      }),
      r
    );
  };
  Ar.prototype.ref = function () {
    this.refCount += 1;
  };
  Ar.prototype.unref = function () {
    if (((this.refCount -= 1), this.refCount < 0))
      throw new Error("invalid unref");
  };
  function l5(e, t) {
    return new Ar(e, t);
  }
  function f5(e, t) {
    return new Rr(e, t);
  }
});
var el = y((eZ, Jw) => {
  var oi = require("buffer").Buffer,
    ld = [
      0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685,
      2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995,
      2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648,
      2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990,
      1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755,
      2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145,
      1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206,
      2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980,
      1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705,
      3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527,
      1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772,
      4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290,
      251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719,
      3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925,
      453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202,
      4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960,
      984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733,
      3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467,
      855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048,
      3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054,
      702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443,
      3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945,
      2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430,
      2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580,
      2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225,
      1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143,
      2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732,
      1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850,
      2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135,
      1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109,
      3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954,
      1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920,
      3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877,
      83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603,
      3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992,
      534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934,
      4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795,
      376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105,
      3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270,
      936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108,
      3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449,
      601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471,
      3272380065, 1510334235, 755167117,
    ];
  typeof Int32Array < "u" && (ld = new Int32Array(ld));
  function Qw(e) {
    if (oi.isBuffer(e)) return e;
    var t = typeof oi.alloc == "function" && typeof oi.from == "function";
    if (typeof e == "number") return t ? oi.alloc(e) : new oi(e);
    if (typeof e == "string") return t ? oi.from(e) : new oi(e);
    throw new Error(
      "input must be buffer, number, or string, received " + typeof e,
    );
  }
  function h5(e) {
    var t = Qw(4);
    return t.writeInt32BE(e, 0), t;
  }
  function fd(e, t) {
    (e = Qw(e)), oi.isBuffer(t) && (t = t.readUInt32BE(0));
    for (var r = ~~t ^ -1, i = 0; i < e.length; i++)
      r = ld[(r ^ e[i]) & 255] ^ (r >>> 8);
    return r ^ -1;
  }
  function hd() {
    return h5(fd.apply(null, arguments));
  }
  hd.signed = function () {
    return fd.apply(null, arguments);
  };
  hd.unsigned = function () {
    return fd.apply(null, arguments) >>> 0;
  };
  Jw.exports = hd;
});
var aD = y((fr) => {
  var cd = require("fs"),
    c5 = require("zlib"),
    eD = Kw(),
    d5 = el(),
    il = require("util"),
    nl = require("events").EventEmitter,
    tD = require("stream").Transform,
    dd = require("stream").PassThrough,
    p5 = require("stream").Writable;
  fr.open = m5;
  fr.fromFd = rD;
  fr.fromBuffer = g5;
  fr.fromRandomAccessReader = pd;
  fr.dosDateTimeToDate = nD;
  fr.validateFileName = sD;
  fr.ZipFile = ui;
  fr.Entry = Ma;
  fr.RandomAccessReader = li;
  function m5(e, t, r) {
    typeof t == "function" && ((r = t), (t = null)),
      t == null && (t = {}),
      t.autoClose == null && (t.autoClose = !0),
      t.lazyEntries == null && (t.lazyEntries = !1),
      t.decodeStrings == null && (t.decodeStrings = !0),
      t.validateEntrySizes == null && (t.validateEntrySizes = !0),
      t.strictFileNames == null && (t.strictFileNames = !1),
      r == null && (r = rl),
      cd.open(e, "r", function (i, n) {
        if (i) return r(i);
        rD(n, t, function (s, a) {
          s && cd.close(n, rl), r(s, a);
        });
      });
  }
  function rD(e, t, r) {
    typeof t == "function" && ((r = t), (t = null)),
      t == null && (t = {}),
      t.autoClose == null && (t.autoClose = !1),
      t.lazyEntries == null && (t.lazyEntries = !1),
      t.decodeStrings == null && (t.decodeStrings = !0),
      t.validateEntrySizes == null && (t.validateEntrySizes = !0),
      t.strictFileNames == null && (t.strictFileNames = !1),
      r == null && (r = rl),
      cd.fstat(e, function (i, n) {
        if (i) return r(i);
        var s = eD.createFromFd(e, { autoClose: !0 });
        pd(s, n.size, t, r);
      });
  }
  function g5(e, t, r) {
    typeof t == "function" && ((r = t), (t = null)),
      t == null && (t = {}),
      (t.autoClose = !1),
      t.lazyEntries == null && (t.lazyEntries = !1),
      t.decodeStrings == null && (t.decodeStrings = !0),
      t.validateEntrySizes == null && (t.validateEntrySizes = !0),
      t.strictFileNames == null && (t.strictFileNames = !1);
    var i = eD.createFromBuffer(e, { maxChunkSize: 65536 });
    pd(i, e.length, t, r);
  }
  function pd(e, t, r, i) {
    typeof r == "function" && ((i = r), (r = null)),
      r == null && (r = {}),
      r.autoClose == null && (r.autoClose = !0),
      r.lazyEntries == null && (r.lazyEntries = !1),
      r.decodeStrings == null && (r.decodeStrings = !0);
    var n = !!r.decodeStrings;
    if (
      (r.validateEntrySizes == null && (r.validateEntrySizes = !0),
      r.strictFileNames == null && (r.strictFileNames = !1),
      i == null && (i = rl),
      typeof t != "number")
    )
      throw new Error("expected totalSize parameter to be a number");
    if (t > Number.MAX_SAFE_INTEGER)
      throw new Error(
        "zip file too large. only file sizes up to 2^52 are supported due to JavaScript's Number type being an IEEE 754 double.",
      );
    e.ref();
    var s = 22,
      a = 65535,
      o = Math.min(s + a, t),
      u = lr(o),
      l = t - u.length;
    rs(e, u, 0, o, l, function (f) {
      if (f) return i(f);
      for (var h = o - s; h >= 0; h -= 1)
        if (u.readUInt32LE(h) === 101010256) {
          var c = u.slice(h),
            d = c.readUInt16LE(4);
          if (d !== 0)
            return i(
              new Error(
                "multi-disk zip files are not supported: found disk number: " +
                  d,
              ),
            );
          var m = c.readUInt16LE(10),
            C = c.readUInt32LE(16),
            E = c.readUInt16LE(20),
            O = c.length - s;
          if (E !== O)
            return i(
              new Error(
                "invalid comment length. expected: " + O + ". found: " + E,
              ),
            );
          var L = n ? tl(c, 22, c.length, !1) : c.slice(22);
          if (!(m === 65535 || C === 4294967295))
            return i(
              null,
              new ui(
                e,
                C,
                t,
                m,
                L,
                r.autoClose,
                r.lazyEntries,
                n,
                r.validateEntrySizes,
                r.strictFileNames,
              ),
            );
          var D = lr(20),
            w = l + h - D.length;
          rs(e, D, 0, D.length, w, function (F) {
            if (F) return i(F);
            if (D.readUInt32LE(0) !== 117853008)
              return i(
                new Error(
                  "invalid zip64 end of central directory locator signature",
                ),
              );
            var g = is(D, 8),
              x = lr(56);
            rs(e, x, 0, x.length, g, function (A) {
              return A
                ? i(A)
                : x.readUInt32LE(0) !== 101075792
                ? i(
                    new Error(
                      "invalid zip64 end of central directory record signature",
                    ),
                  )
                : ((m = is(x, 32)),
                  (C = is(x, 48)),
                  i(
                    null,
                    new ui(
                      e,
                      C,
                      t,
                      m,
                      L,
                      r.autoClose,
                      r.lazyEntries,
                      n,
                      r.validateEntrySizes,
                      r.strictFileNames,
                    ),
                  ));
            });
          });
          return;
        }
      i(new Error("end of central directory record signature not found"));
    });
  }
  il.inherits(ui, nl);
  function ui(e, t, r, i, n, s, a, o, u, l) {
    var f = this;
    nl.call(f),
      (f.reader = e),
      f.reader.on("error", function (h) {
        iD(f, h);
      }),
      f.reader.once("close", function () {
        f.emit("close");
      }),
      (f.readEntryCursor = t),
      (f.fileSize = r),
      (f.entryCount = i),
      (f.comment = n),
      (f.entriesRead = 0),
      (f.autoClose = !!s),
      (f.lazyEntries = !!a),
      (f.decodeStrings = !!o),
      (f.validateEntrySizes = !!u),
      (f.strictFileNames = !!l),
      (f.isOpen = !0),
      (f.emittedError = !1),
      f.lazyEntries || f._readEntry();
  }
  ui.prototype.close = function () {
    !this.isOpen || ((this.isOpen = !1), this.reader.unref());
  };
  function Qt(e, t) {
    e.autoClose && e.close(), iD(e, t);
  }
  function iD(e, t) {
    e.emittedError || ((e.emittedError = !0), e.emit("error", t));
  }
  ui.prototype.readEntry = function () {
    if (!this.lazyEntries)
      throw new Error("readEntry() called without lazyEntries:true");
    this._readEntry();
  };
  ui.prototype._readEntry = function () {
    var e = this;
    if (e.entryCount === e.entriesRead) {
      setImmediate(function () {
        e.autoClose && e.close(), !e.emittedError && e.emit("end");
      });
      return;
    }
    if (!e.emittedError) {
      var t = lr(46);
      rs(e.reader, t, 0, t.length, e.readEntryCursor, function (r) {
        if (r) return Qt(e, r);
        if (!e.emittedError) {
          var i = new Ma(),
            n = t.readUInt32LE(0);
          if (n !== 33639248)
            return Qt(
              e,
              new Error(
                "invalid central directory file header signature: 0x" +
                  n.toString(16),
              ),
            );
          if (
            ((i.versionMadeBy = t.readUInt16LE(4)),
            (i.versionNeededToExtract = t.readUInt16LE(6)),
            (i.generalPurposeBitFlag = t.readUInt16LE(8)),
            (i.compressionMethod = t.readUInt16LE(10)),
            (i.lastModFileTime = t.readUInt16LE(12)),
            (i.lastModFileDate = t.readUInt16LE(14)),
            (i.crc32 = t.readUInt32LE(16)),
            (i.compressedSize = t.readUInt32LE(20)),
            (i.uncompressedSize = t.readUInt32LE(24)),
            (i.fileNameLength = t.readUInt16LE(28)),
            (i.extraFieldLength = t.readUInt16LE(30)),
            (i.fileCommentLength = t.readUInt16LE(32)),
            (i.internalFileAttributes = t.readUInt16LE(36)),
            (i.externalFileAttributes = t.readUInt32LE(38)),
            (i.relativeOffsetOfLocalHeader = t.readUInt32LE(42)),
            i.generalPurposeBitFlag & 64)
          )
            return Qt(e, new Error("strong encryption is not supported"));
          (e.readEntryCursor += 46),
            (t = lr(
              i.fileNameLength + i.extraFieldLength + i.fileCommentLength,
            )),
            rs(e.reader, t, 0, t.length, e.readEntryCursor, function (s) {
              if (s) return Qt(e, s);
              if (!e.emittedError) {
                var a = (i.generalPurposeBitFlag & 2048) !== 0;
                i.fileName = e.decodeStrings
                  ? tl(t, 0, i.fileNameLength, a)
                  : t.slice(0, i.fileNameLength);
                var o = i.fileNameLength + i.extraFieldLength,
                  u = t.slice(i.fileNameLength, o);
                i.extraFields = [];
                for (var l = 0; l < u.length - 3; ) {
                  var f = u.readUInt16LE(l + 0),
                    h = u.readUInt16LE(l + 2),
                    c = l + 4,
                    d = c + h;
                  if (d > u.length)
                    return Qt(
                      e,
                      new Error(
                        "extra field length exceeds extra field buffer size",
                      ),
                    );
                  var m = lr(h);
                  u.copy(m, 0, c, d),
                    i.extraFields.push({ id: f, data: m }),
                    (l = d);
                }
                if (
                  ((i.fileComment = e.decodeStrings
                    ? tl(t, o, o + i.fileCommentLength, a)
                    : t.slice(o, o + i.fileCommentLength)),
                  (i.comment = i.fileComment),
                  (e.readEntryCursor += t.length),
                  (e.entriesRead += 1),
                  i.uncompressedSize === 4294967295 ||
                    i.compressedSize === 4294967295 ||
                    i.relativeOffsetOfLocalHeader === 4294967295)
                ) {
                  for (var C = null, l = 0; l < i.extraFields.length; l++) {
                    var E = i.extraFields[l];
                    if (E.id === 1) {
                      C = E.data;
                      break;
                    }
                  }
                  if (C == null)
                    return Qt(
                      e,
                      new Error(
                        "expected zip64 extended information extra field",
                      ),
                    );
                  var O = 0;
                  if (i.uncompressedSize === 4294967295) {
                    if (O + 8 > C.length)
                      return Qt(
                        e,
                        new Error(
                          "zip64 extended information extra field does not include uncompressed size",
                        ),
                      );
                    (i.uncompressedSize = is(C, O)), (O += 8);
                  }
                  if (i.compressedSize === 4294967295) {
                    if (O + 8 > C.length)
                      return Qt(
                        e,
                        new Error(
                          "zip64 extended information extra field does not include compressed size",
                        ),
                      );
                    (i.compressedSize = is(C, O)), (O += 8);
                  }
                  if (i.relativeOffsetOfLocalHeader === 4294967295) {
                    if (O + 8 > C.length)
                      return Qt(
                        e,
                        new Error(
                          "zip64 extended information extra field does not include relative header offset",
                        ),
                      );
                    (i.relativeOffsetOfLocalHeader = is(C, O)), (O += 8);
                  }
                }
                if (e.decodeStrings)
                  for (var l = 0; l < i.extraFields.length; l++) {
                    var E = i.extraFields[l];
                    if (E.id === 28789) {
                      if (E.data.length < 6 || E.data.readUInt8(0) !== 1)
                        continue;
                      var L = E.data.readUInt32LE(1);
                      if (d5.unsigned(t.slice(0, i.fileNameLength)) !== L)
                        continue;
                      i.fileName = tl(E.data, 5, E.data.length, !0);
                      break;
                    }
                  }
                if (e.validateEntrySizes && i.compressionMethod === 0) {
                  var D = i.uncompressedSize;
                  if ((i.isEncrypted() && (D += 12), i.compressedSize !== D)) {
                    var w =
                      "compressed/uncompressed size mismatch for stored file: " +
                      i.compressedSize +
                      " != " +
                      i.uncompressedSize;
                    return Qt(e, new Error(w));
                  }
                }
                if (e.decodeStrings) {
                  e.strictFileNames ||
                    (i.fileName = i.fileName.replace(/\\/g, "/"));
                  var F = sD(i.fileName, e.validateFileNameOptions);
                  if (F != null) return Qt(e, new Error(F));
                }
                e.emit("entry", i), e.lazyEntries || e._readEntry();
              }
            });
        }
      });
    }
  };
  ui.prototype.openReadStream = function (e, t, r) {
    var i = this,
      n = 0,
      s = e.compressedSize;
    if (r == null) (r = t), (t = {});
    else {
      if (t.decrypt != null) {
        if (!e.isEncrypted())
          throw new Error(
            "options.decrypt can only be specified for encrypted entries",
          );
        if (t.decrypt !== !1)
          throw new Error("invalid options.decrypt value: " + t.decrypt);
        if (e.isCompressed() && t.decompress !== !1)
          throw new Error(
            "entry is encrypted and compressed, and options.decompress !== false",
          );
      }
      if (t.decompress != null) {
        if (!e.isCompressed())
          throw new Error(
            "options.decompress can only be specified for compressed entries",
          );
        if (!(t.decompress === !1 || t.decompress === !0))
          throw new Error("invalid options.decompress value: " + t.decompress);
      }
      if (t.start != null || t.end != null) {
        if (e.isCompressed() && t.decompress !== !1)
          throw new Error(
            "start/end range not allowed for compressed entry without options.decompress === false",
          );
        if (e.isEncrypted() && t.decrypt !== !1)
          throw new Error(
            "start/end range not allowed for encrypted entry without options.decrypt === false",
          );
      }
      if (t.start != null) {
        if (((n = t.start), n < 0)) throw new Error("options.start < 0");
        if (n > e.compressedSize)
          throw new Error("options.start > entry.compressedSize");
      }
      if (t.end != null) {
        if (((s = t.end), s < 0)) throw new Error("options.end < 0");
        if (s > e.compressedSize)
          throw new Error("options.end > entry.compressedSize");
        if (s < n) throw new Error("options.end < options.start");
      }
    }
    if (!i.isOpen) return r(new Error("closed"));
    if (e.isEncrypted() && t.decrypt !== !1)
      return r(new Error("entry is encrypted, and options.decrypt !== false"));
    i.reader.ref();
    var a = lr(30);
    rs(i.reader, a, 0, a.length, e.relativeOffsetOfLocalHeader, function (o) {
      try {
        if (o) return r(o);
        var u = a.readUInt32LE(0);
        if (u !== 67324752)
          return r(
            new Error(
              "invalid local file header signature: 0x" + u.toString(16),
            ),
          );
        var l = a.readUInt16LE(26),
          f = a.readUInt16LE(28),
          h = e.relativeOffsetOfLocalHeader + a.length + l + f,
          c;
        if (e.compressionMethod === 0) c = !1;
        else if (e.compressionMethod === 8)
          c = t.decompress != null ? t.decompress : !0;
        else
          return r(
            new Error("unsupported compression method: " + e.compressionMethod),
          );
        var d = h,
          m = d + e.compressedSize;
        if (e.compressedSize !== 0 && m > i.fileSize)
          return r(
            new Error(
              "file data overflows file bounds: " +
                d +
                " + " +
                e.compressedSize +
                " > " +
                i.fileSize,
            ),
          );
        var C = i.reader.createReadStream({ start: d + n, end: d + s }),
          E = C;
        if (c) {
          var O = !1,
            L = c5.createInflateRaw();
          C.on("error", function (D) {
            setImmediate(function () {
              O || L.emit("error", D);
            });
          }),
            C.pipe(L),
            i.validateEntrySizes
              ? ((E = new La(e.uncompressedSize)),
                L.on("error", function (D) {
                  setImmediate(function () {
                    O || E.emit("error", D);
                  });
                }),
                L.pipe(E))
              : (E = L),
            (E.destroy = function () {
              (O = !0), L !== E && L.unpipe(E), C.unpipe(L), C.destroy();
            });
        }
        r(null, E);
      } finally {
        i.reader.unref();
      }
    });
  };
  function Ma() {}
  Ma.prototype.getLastModDate = function () {
    return nD(this.lastModFileDate, this.lastModFileTime);
  };
  Ma.prototype.isEncrypted = function () {
    return (this.generalPurposeBitFlag & 1) !== 0;
  };
  Ma.prototype.isCompressed = function () {
    return this.compressionMethod === 8;
  };
  function nD(e, t) {
    var r = e & 31,
      i = ((e >> 5) & 15) - 1,
      n = ((e >> 9) & 127) + 1980,
      s = 0,
      a = (t & 31) * 2,
      o = (t >> 5) & 63,
      u = (t >> 11) & 31;
    return new Date(n, i, r, u, o, a, s);
  }
  function sD(e) {
    return e.indexOf("\\") !== -1
      ? "invalid characters in fileName: " + e
      : /^[a-zA-Z]:/.test(e) || /^\//.test(e)
      ? "absolute path: " + e
      : e.split("/").indexOf("..") !== -1
      ? "invalid relative path: " + e
      : null;
  }
  function rs(e, t, r, i, n, s) {
    if (i === 0)
      return setImmediate(function () {
        s(null, lr(0));
      });
    e.read(t, r, i, n, function (a, o) {
      if (a) return s(a);
      if (o < i) return s(new Error("unexpected EOF"));
      s();
    });
  }
  il.inherits(La, tD);
  function La(e) {
    tD.call(this), (this.actualByteCount = 0), (this.expectedByteCount = e);
  }
  La.prototype._transform = function (e, t, r) {
    if (
      ((this.actualByteCount += e.length),
      this.actualByteCount > this.expectedByteCount)
    ) {
      var i =
        "too many bytes in the stream. expected " +
        this.expectedByteCount +
        ". got at least " +
        this.actualByteCount;
      return r(new Error(i));
    }
    r(null, e);
  };
  La.prototype._flush = function (e) {
    if (this.actualByteCount < this.expectedByteCount) {
      var t =
        "not enough bytes in the stream. expected " +
        this.expectedByteCount +
        ". got only " +
        this.actualByteCount;
      return e(new Error(t));
    }
    e();
  };
  il.inherits(li, nl);
  function li() {
    nl.call(this), (this.refCount = 0);
  }
  li.prototype.ref = function () {
    this.refCount += 1;
  };
  li.prototype.unref = function () {
    var e = this;
    if (((e.refCount -= 1), e.refCount > 0)) return;
    if (e.refCount < 0) throw new Error("invalid unref");
    e.close(t);
    function t(r) {
      if (r) return e.emit("error", r);
      e.emit("close");
    }
  };
  li.prototype.createReadStream = function (e) {
    var t = e.start,
      r = e.end;
    if (t === r) {
      var i = new dd();
      return (
        setImmediate(function () {
          i.end();
        }),
        i
      );
    }
    var n = this._readStreamForRange(t, r),
      s = !1,
      a = new sl(this);
    n.on("error", function (u) {
      setImmediate(function () {
        s || a.emit("error", u);
      });
    }),
      (a.destroy = function () {
        n.unpipe(a), a.unref(), n.destroy();
      });
    var o = new La(r - t);
    return (
      a.on("error", function (u) {
        setImmediate(function () {
          s || o.emit("error", u);
        });
      }),
      (o.destroy = function () {
        (s = !0), a.unpipe(o), a.destroy();
      }),
      n.pipe(a).pipe(o)
    );
  };
  li.prototype._readStreamForRange = function (e, t) {
    throw new Error("not implemented");
  };
  li.prototype.read = function (e, t, r, i, n) {
    var s = this.createReadStream({ start: i, end: i + r }),
      a = new p5(),
      o = 0;
    (a._write = function (u, l, f) {
      u.copy(e, t + o, 0, u.length), (o += u.length), f();
    }),
      a.on("finish", n),
      s.on("error", function (u) {
        n(u);
      }),
      s.pipe(a);
  };
  li.prototype.close = function (e) {
    setImmediate(e);
  };
  il.inherits(sl, dd);
  function sl(e) {
    dd.call(this),
      (this.context = e),
      this.context.ref(),
      (this.unreffedYet = !1);
  }
  sl.prototype._flush = function (e) {
    this.unref(), e();
  };
  sl.prototype.unref = function (e) {
    this.unreffedYet || ((this.unreffedYet = !0), this.context.unref());
  };
  var y5 =
    "\0\u263A\u263B\u2665\u2666\u2663\u2660\u2022\u25D8\u25CB\u25D9\u2642\u2640\u266A\u266B\u263C\u25BA\u25C4\u2195\u203C\xB6\xA7\u25AC\u21A8\u2191\u2193\u2192\u2190\u221F\u2194\u25B2\u25BC !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u2302\xC7\xFC\xE9\xE2\xE4\xE0\xE5\xE7\xEA\xEB\xE8\xEF\xEE\xEC\xC4\xC5\xC9\xE6\xC6\xF4\xF6\xF2\xFB\xF9\xFF\xD6\xDC\xA2\xA3\xA5\u20A7\u0192\xE1\xED\xF3\xFA\xF1\xD1\xAA\xBA\xBF\u2310\xAC\xBD\xBC\xA1\xAB\xBB\u2591\u2592\u2593\u2502\u2524\u2561\u2562\u2556\u2555\u2563\u2551\u2557\u255D\u255C\u255B\u2510\u2514\u2534\u252C\u251C\u2500\u253C\u255E\u255F\u255A\u2554\u2569\u2566\u2560\u2550\u256C\u2567\u2568\u2564\u2565\u2559\u2558\u2552\u2553\u256B\u256A\u2518\u250C\u2588\u2584\u258C\u2590\u2580\u03B1\xDF\u0393\u03C0\u03A3\u03C3\xB5\u03C4\u03A6\u0398\u03A9\u03B4\u221E\u03C6\u03B5\u2229\u2261\xB1\u2265\u2264\u2320\u2321\xF7\u2248\xB0\u2219\xB7\u221A\u207F\xB2\u25A0\xA0";
  function tl(e, t, r, i) {
    if (i) return e.toString("utf8", t, r);
    for (var n = "", s = t; s < r; s++) n += y5[e[s]];
    return n;
  }
  function is(e, t) {
    var r = e.readUInt32LE(t),
      i = e.readUInt32LE(t + 4);
    return i * 4294967296 + r;
  }
  var lr;
  typeof Buffer.allocUnsafe == "function"
    ? (lr = function (e) {
        return Buffer.allocUnsafe(e);
      })
    : (lr = function (e) {
        return new Buffer(e);
      });
  function rl(e) {
    if (e) throw e;
  }
});
var uD = y((rZ, oD) => {
  var Jt = Iw()("extract-zip"),
    { createWriteStream: v5, promises: ns } = require("fs"),
    w5 = Gw(),
    en = require("path"),
    { promisify: gd } = require("util"),
    D5 = require("stream"),
    b5 = aD(),
    E5 = gd(b5.open),
    _5 = gd(D5.pipeline),
    md = class {
      constructor(t, r) {
        (this.zipPath = t), (this.opts = r);
      }
      async extract() {
        return (
          Jt("opening", this.zipPath, "with opts", this.opts),
          (this.zipfile = await E5(this.zipPath, { lazyEntries: !0 })),
          (this.canceled = !1),
          new Promise((t, r) => {
            this.zipfile.on("error", (i) => {
              (this.canceled = !0), r(i);
            }),
              this.zipfile.readEntry(),
              this.zipfile.on("close", () => {
                this.canceled || (Jt("zip extraction complete"), t());
              }),
              this.zipfile.on("entry", async (i) => {
                if (this.canceled) {
                  Jt("skipping entry", i.fileName, {
                    cancelled: this.canceled,
                  });
                  return;
                }
                if (
                  (Jt("zipfile entry", i.fileName),
                  i.fileName.startsWith("__MACOSX/"))
                ) {
                  this.zipfile.readEntry();
                  return;
                }
                let n = en.dirname(en.join(this.opts.dir, i.fileName));
                try {
                  await ns.mkdir(n, { recursive: !0 });
                  let s = await ns.realpath(n);
                  if (
                    en.relative(this.opts.dir, s).split(en.sep).includes("..")
                  )
                    throw new Error(
                      `Out of bound path "${s}" found while processing file ${i.fileName}`,
                    );
                  await this.extractEntry(i),
                    Jt("finished processing", i.fileName),
                    this.zipfile.readEntry();
                } catch (s) {
                  (this.canceled = !0), this.zipfile.close(), r(s);
                }
              });
          })
        );
      }
      async extractEntry(t) {
        if (this.canceled) {
          Jt("skipping entry extraction", t.fileName, {
            cancelled: this.canceled,
          });
          return;
        }
        this.opts.onEntry && this.opts.onEntry(t, this.zipfile);
        let r = en.join(this.opts.dir, t.fileName),
          i = (t.externalFileAttributes >> 16) & 65535,
          n = 61440,
          s = 16384,
          a = 40960,
          o = (i & n) === a,
          u = (i & n) === s;
        !u && t.fileName.endsWith("/") && (u = !0);
        let l = t.versionMadeBy >> 8;
        u || (u = l === 0 && t.externalFileAttributes === 16),
          Jt("extracting entry", {
            filename: t.fileName,
            isDir: u,
            isSymlink: o,
          });
        let f = this.getExtractedMode(i, u) & 511,
          h = u ? r : en.dirname(r),
          c = { recursive: !0 };
        if (
          (u && (c.mode = f),
          Jt("mkdir", { dir: h, ...c }),
          await ns.mkdir(h, c),
          u)
        )
          return;
        Jt("opening read stream", r);
        let d = await gd(this.zipfile.openReadStream.bind(this.zipfile))(t);
        if (o) {
          let m = await w5(d);
          Jt("creating symlink", m, r), await ns.symlink(m, r);
        } else await _5(d, v5(r, { mode: f }));
      }
      getExtractedMode(t, r) {
        let i = t;
        return (
          i === 0 &&
            (r
              ? (this.opts.defaultDirMode &&
                  (i = parseInt(this.opts.defaultDirMode, 10)),
                i || (i = 493))
              : (this.opts.defaultFileMode &&
                  (i = parseInt(this.opts.defaultFileMode, 10)),
                i || (i = 420))),
          i
        );
      }
    };
  oD.exports = async function (e, t) {
    if ((Jt("creating target directory", t.dir), !en.isAbsolute(t.dir)))
      throw new Error("Target directory is expected to be absolute");
    return (
      await ns.mkdir(t.dir, { recursive: !0 }),
      (t.dir = await ns.realpath(t.dir)),
      new md(e, t).extract()
    );
  };
});
var ss = y((iZ, fD) => {
  "use strict";
  var lD = new Map([
    ["C", "cwd"],
    ["f", "file"],
    ["z", "gzip"],
    ["P", "preservePaths"],
    ["U", "unlink"],
    ["strip-components", "strip"],
    ["stripComponents", "strip"],
    ["keep-newer", "newer"],
    ["keepNewer", "newer"],
    ["keep-newer-files", "newer"],
    ["keepNewerFiles", "newer"],
    ["k", "keep"],
    ["keep-existing", "keep"],
    ["keepExisting", "keep"],
    ["m", "noMtime"],
    ["no-mtime", "noMtime"],
    ["p", "preserveOwner"],
    ["L", "follow"],
    ["h", "follow"],
  ]);
  fD.exports = (e) =>
    e
      ? Object.keys(e)
          .map((t) => [lD.has(t) ? lD.get(t) : t, e[t]])
          .reduce((t, r) => ((t[r[0]] = r[1]), t), Object.create(null))
      : {};
});
var os = y((nZ, wD) => {
  "use strict";
  var hD =
      typeof process == "object" && process
        ? process
        : { stdout: null, stderr: null },
    S5 = require("events"),
    cD = require("stream"),
    dD = require("string_decoder").StringDecoder,
    Nr = Symbol("EOF"),
    Ir = Symbol("maybeEmitEnd"),
    fi = Symbol("emittedEnd"),
    al = Symbol("emittingEnd"),
    qa = Symbol("emittedError"),
    ol = Symbol("closed"),
    pD = Symbol("read"),
    ul = Symbol("flush"),
    mD = Symbol("flushChunk"),
    yt = Symbol("encoding"),
    Mr = Symbol("decoder"),
    ll = Symbol("flowing"),
    Pa = Symbol("paused"),
    as = Symbol("resume"),
    He = Symbol("bufferLength"),
    yd = Symbol("bufferPush"),
    vd = Symbol("bufferShift"),
    it = Symbol("objectMode"),
    nt = Symbol("destroyed"),
    wd = Symbol("emitData"),
    gD = Symbol("emitEnd"),
    Dd = Symbol("emitEnd2"),
    Lr = Symbol("async"),
    Ba = (e) => Promise.resolve().then(e),
    yD = global._MP_NO_ITERATOR_SYMBOLS_ !== "1",
    x5 =
      (yD && Symbol.asyncIterator) || Symbol("asyncIterator not implemented"),
    C5 = (yD && Symbol.iterator) || Symbol("iterator not implemented"),
    O5 = (e) => e === "end" || e === "finish" || e === "prefinish",
    T5 = (e) =>
      e instanceof ArrayBuffer ||
      (typeof e == "object" &&
        e.constructor &&
        e.constructor.name === "ArrayBuffer" &&
        e.byteLength >= 0),
    F5 = (e) => !Buffer.isBuffer(e) && ArrayBuffer.isView(e),
    fl = class {
      constructor(t, r, i) {
        (this.src = t),
          (this.dest = r),
          (this.opts = i),
          (this.ondrain = () => t[as]()),
          r.on("drain", this.ondrain);
      }
      unpipe() {
        this.dest.removeListener("drain", this.ondrain);
      }
      proxyErrors() {}
      end() {
        this.unpipe(), this.opts.end && this.dest.end();
      }
    },
    bd = class extends fl {
      unpipe() {
        this.src.removeListener("error", this.proxyErrors), super.unpipe();
      }
      constructor(t, r, i) {
        super(t, r, i),
          (this.proxyErrors = (n) => r.emit("error", n)),
          t.on("error", this.proxyErrors);
      }
    };
  wD.exports = class vD extends cD {
    constructor(t) {
      super(),
        (this[ll] = !1),
        (this[Pa] = !1),
        (this.pipes = []),
        (this.buffer = []),
        (this[it] = (t && t.objectMode) || !1),
        this[it] ? (this[yt] = null) : (this[yt] = (t && t.encoding) || null),
        this[yt] === "buffer" && (this[yt] = null),
        (this[Lr] = (t && !!t.async) || !1),
        (this[Mr] = this[yt] ? new dD(this[yt]) : null),
        (this[Nr] = !1),
        (this[fi] = !1),
        (this[al] = !1),
        (this[ol] = !1),
        (this[qa] = null),
        (this.writable = !0),
        (this.readable = !0),
        (this[He] = 0),
        (this[nt] = !1);
    }
    get bufferLength() {
      return this[He];
    }
    get encoding() {
      return this[yt];
    }
    set encoding(t) {
      if (this[it]) throw new Error("cannot set encoding in objectMode");
      if (
        this[yt] &&
        t !== this[yt] &&
        ((this[Mr] && this[Mr].lastNeed) || this[He])
      )
        throw new Error("cannot change encoding");
      this[yt] !== t &&
        ((this[Mr] = t ? new dD(t) : null),
        this.buffer.length &&
          (this.buffer = this.buffer.map((r) => this[Mr].write(r)))),
        (this[yt] = t);
    }
    setEncoding(t) {
      this.encoding = t;
    }
    get objectMode() {
      return this[it];
    }
    set objectMode(t) {
      this[it] = this[it] || !!t;
    }
    get async() {
      return this[Lr];
    }
    set async(t) {
      this[Lr] = this[Lr] || !!t;
    }
    write(t, r, i) {
      if (this[Nr]) throw new Error("write after end");
      if (this[nt])
        return (
          this.emit(
            "error",
            Object.assign(
              new Error("Cannot call write after a stream was destroyed"),
              { code: "ERR_STREAM_DESTROYED" },
            ),
          ),
          !0
        );
      typeof r == "function" && ((i = r), (r = "utf8")), r || (r = "utf8");
      let n = this[Lr] ? Ba : (s) => s();
      return (
        !this[it] &&
          !Buffer.isBuffer(t) &&
          (F5(t)
            ? (t = Buffer.from(t.buffer, t.byteOffset, t.byteLength))
            : T5(t)
            ? (t = Buffer.from(t))
            : typeof t != "string" && (this.objectMode = !0)),
        this[it]
          ? (this.flowing && this[He] !== 0 && this[ul](!0),
            this.flowing ? this.emit("data", t) : this[yd](t),
            this[He] !== 0 && this.emit("readable"),
            i && n(i),
            this.flowing)
          : t.length
          ? (typeof t == "string" &&
              !(r === this[yt] && !this[Mr].lastNeed) &&
              (t = Buffer.from(t, r)),
            Buffer.isBuffer(t) && this[yt] && (t = this[Mr].write(t)),
            this.flowing && this[He] !== 0 && this[ul](!0),
            this.flowing ? this.emit("data", t) : this[yd](t),
            this[He] !== 0 && this.emit("readable"),
            i && n(i),
            this.flowing)
          : (this[He] !== 0 && this.emit("readable"), i && n(i), this.flowing)
      );
    }
    read(t) {
      if (this[nt]) return null;
      if (this[He] === 0 || t === 0 || t > this[He]) return this[Ir](), null;
      this[it] && (t = null),
        this.buffer.length > 1 &&
          !this[it] &&
          (this.encoding
            ? (this.buffer = [this.buffer.join("")])
            : (this.buffer = [Buffer.concat(this.buffer, this[He])]));
      let r = this[pD](t || null, this.buffer[0]);
      return this[Ir](), r;
    }
    [pD](t, r) {
      return (
        t === r.length || t === null
          ? this[vd]()
          : ((this.buffer[0] = r.slice(t)),
            (r = r.slice(0, t)),
            (this[He] -= t)),
        this.emit("data", r),
        !this.buffer.length && !this[Nr] && this.emit("drain"),
        r
      );
    }
    end(t, r, i) {
      return (
        typeof t == "function" && ((i = t), (t = null)),
        typeof r == "function" && ((i = r), (r = "utf8")),
        t && this.write(t, r),
        i && this.once("end", i),
        (this[Nr] = !0),
        (this.writable = !1),
        (this.flowing || !this[Pa]) && this[Ir](),
        this
      );
    }
    [as]() {
      this[nt] ||
        ((this[Pa] = !1),
        (this[ll] = !0),
        this.emit("resume"),
        this.buffer.length
          ? this[ul]()
          : this[Nr]
          ? this[Ir]()
          : this.emit("drain"));
    }
    resume() {
      return this[as]();
    }
    pause() {
      (this[ll] = !1), (this[Pa] = !0);
    }
    get destroyed() {
      return this[nt];
    }
    get flowing() {
      return this[ll];
    }
    get paused() {
      return this[Pa];
    }
    [yd](t) {
      this[it] ? (this[He] += 1) : (this[He] += t.length), this.buffer.push(t);
    }
    [vd]() {
      return (
        this.buffer.length &&
          (this[it] ? (this[He] -= 1) : (this[He] -= this.buffer[0].length)),
        this.buffer.shift()
      );
    }
    [ul](t) {
      do;
      while (this[mD](this[vd]()));
      !t && !this.buffer.length && !this[Nr] && this.emit("drain");
    }
    [mD](t) {
      return t ? (this.emit("data", t), this.flowing) : !1;
    }
    pipe(t, r) {
      if (this[nt]) return;
      let i = this[fi];
      return (
        (r = r || {}),
        t === hD.stdout || t === hD.stderr
          ? (r.end = !1)
          : (r.end = r.end !== !1),
        (r.proxyErrors = !!r.proxyErrors),
        i
          ? r.end && t.end()
          : (this.pipes.push(
              r.proxyErrors ? new bd(this, t, r) : new fl(this, t, r),
            ),
            this[Lr] ? Ba(() => this[as]()) : this[as]()),
        t
      );
    }
    unpipe(t) {
      let r = this.pipes.find((i) => i.dest === t);
      r && (this.pipes.splice(this.pipes.indexOf(r), 1), r.unpipe());
    }
    addListener(t, r) {
      return this.on(t, r);
    }
    on(t, r) {
      let i = super.on(t, r);
      return (
        t === "data" && !this.pipes.length && !this.flowing
          ? this[as]()
          : t === "readable" && this[He] !== 0
          ? super.emit("readable")
          : O5(t) && this[fi]
          ? (super.emit(t), this.removeAllListeners(t))
          : t === "error" &&
            this[qa] &&
            (this[Lr]
              ? Ba(() => r.call(this, this[qa]))
              : r.call(this, this[qa])),
        i
      );
    }
    get emittedEnd() {
      return this[fi];
    }
    [Ir]() {
      !this[al] &&
        !this[fi] &&
        !this[nt] &&
        this.buffer.length === 0 &&
        this[Nr] &&
        ((this[al] = !0),
        this.emit("end"),
        this.emit("prefinish"),
        this.emit("finish"),
        this[ol] && this.emit("close"),
        (this[al] = !1));
    }
    emit(t, r, ...i) {
      if (t !== "error" && t !== "close" && t !== nt && this[nt]) return;
      if (t === "data")
        return r ? (this[Lr] ? Ba(() => this[wd](r)) : this[wd](r)) : !1;
      if (t === "end") return this[gD]();
      if (t === "close") {
        if (((this[ol] = !0), !this[fi] && !this[nt])) return;
        let s = super.emit("close");
        return this.removeAllListeners("close"), s;
      } else if (t === "error") {
        this[qa] = r;
        let s = super.emit("error", r);
        return this[Ir](), s;
      } else if (t === "resume") {
        let s = super.emit("resume");
        return this[Ir](), s;
      } else if (t === "finish" || t === "prefinish") {
        let s = super.emit(t);
        return this.removeAllListeners(t), s;
      }
      let n = super.emit(t, r, ...i);
      return this[Ir](), n;
    }
    [wd](t) {
      for (let i of this.pipes) i.dest.write(t) === !1 && this.pause();
      let r = super.emit("data", t);
      return this[Ir](), r;
    }
    [gD]() {
      this[fi] ||
        ((this[fi] = !0),
        (this.readable = !1),
        this[Lr] ? Ba(() => this[Dd]()) : this[Dd]());
    }
    [Dd]() {
      if (this[Mr]) {
        let r = this[Mr].end();
        if (r) {
          for (let i of this.pipes) i.dest.write(r);
          super.emit("data", r);
        }
      }
      for (let r of this.pipes) r.end();
      let t = super.emit("end");
      return this.removeAllListeners("end"), t;
    }
    collect() {
      let t = [];
      this[it] || (t.dataLength = 0);
      let r = this.promise();
      return (
        this.on("data", (i) => {
          t.push(i), this[it] || (t.dataLength += i.length);
        }),
        r.then(() => t)
      );
    }
    concat() {
      return this[it]
        ? Promise.reject(new Error("cannot concat in objectMode"))
        : this.collect().then((t) =>
            this[it]
              ? Promise.reject(new Error("cannot concat in objectMode"))
              : this[yt]
              ? t.join("")
              : Buffer.concat(t, t.dataLength),
          );
    }
    promise() {
      return new Promise((t, r) => {
        this.on(nt, () => r(new Error("stream destroyed"))),
          this.on("error", (i) => r(i)),
          this.on("end", () => t());
      });
    }
    [x5]() {
      return {
        next: () => {
          let r = this.read();
          if (r !== null) return Promise.resolve({ done: !1, value: r });
          if (this[Nr]) return Promise.resolve({ done: !0 });
          let i = null,
            n = null,
            s = (l) => {
              this.removeListener("data", a),
                this.removeListener("end", o),
                n(l);
            },
            a = (l) => {
              this.removeListener("error", s),
                this.removeListener("end", o),
                this.pause(),
                i({ value: l, done: !!this[Nr] });
            },
            o = () => {
              this.removeListener("error", s),
                this.removeListener("data", a),
                i({ done: !0 });
            },
            u = () => s(new Error("stream destroyed"));
          return new Promise((l, f) => {
            (n = f),
              (i = l),
              this.once(nt, u),
              this.once("error", s),
              this.once("end", o),
              this.once("data", a);
          });
        },
      };
    }
    [C5]() {
      return {
        next: () => {
          let r = this.read();
          return { value: r, done: r === null };
        },
      };
    }
    destroy(t) {
      return this[nt]
        ? (t ? this.emit("error", t) : this.emit(nt), this)
        : ((this[nt] = !0),
          (this.buffer.length = 0),
          (this[He] = 0),
          typeof this.close == "function" && !this[ol] && this.close(),
          t ? this.emit("error", t) : this.emit(nt),
          this);
    }
    static isStream(t) {
      return (
        !!t &&
        (t instanceof vD ||
          t instanceof cD ||
          (t instanceof S5 &&
            (typeof t.pipe == "function" ||
              (typeof t.write == "function" && typeof t.end == "function"))))
      );
    }
  };
});
var bD = y((sZ, DD) => {
  var R5 = require("zlib").constants || { ZLIB_VERNUM: 4736 };
  DD.exports = Object.freeze(
    Object.assign(
      Object.create(null),
      {
        Z_NO_FLUSH: 0,
        Z_PARTIAL_FLUSH: 1,
        Z_SYNC_FLUSH: 2,
        Z_FULL_FLUSH: 3,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_ERRNO: -1,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        Z_MEM_ERROR: -4,
        Z_BUF_ERROR: -5,
        Z_VERSION_ERROR: -6,
        Z_NO_COMPRESSION: 0,
        Z_BEST_SPEED: 1,
        Z_BEST_COMPRESSION: 9,
        Z_DEFAULT_COMPRESSION: -1,
        Z_FILTERED: 1,
        Z_HUFFMAN_ONLY: 2,
        Z_RLE: 3,
        Z_FIXED: 4,
        Z_DEFAULT_STRATEGY: 0,
        DEFLATE: 1,
        INFLATE: 2,
        GZIP: 3,
        GUNZIP: 4,
        DEFLATERAW: 5,
        INFLATERAW: 6,
        UNZIP: 7,
        BROTLI_DECODE: 8,
        BROTLI_ENCODE: 9,
        Z_MIN_WINDOWBITS: 8,
        Z_MAX_WINDOWBITS: 15,
        Z_DEFAULT_WINDOWBITS: 15,
        Z_MIN_CHUNK: 64,
        Z_MAX_CHUNK: 1 / 0,
        Z_DEFAULT_CHUNK: 16384,
        Z_MIN_MEMLEVEL: 1,
        Z_MAX_MEMLEVEL: 9,
        Z_DEFAULT_MEMLEVEL: 8,
        Z_MIN_LEVEL: -1,
        Z_MAX_LEVEL: 9,
        Z_DEFAULT_LEVEL: -1,
        BROTLI_OPERATION_PROCESS: 0,
        BROTLI_OPERATION_FLUSH: 1,
        BROTLI_OPERATION_FINISH: 2,
        BROTLI_OPERATION_EMIT_METADATA: 3,
        BROTLI_MODE_GENERIC: 0,
        BROTLI_MODE_TEXT: 1,
        BROTLI_MODE_FONT: 2,
        BROTLI_DEFAULT_MODE: 0,
        BROTLI_MIN_QUALITY: 0,
        BROTLI_MAX_QUALITY: 11,
        BROTLI_DEFAULT_QUALITY: 11,
        BROTLI_MIN_WINDOW_BITS: 10,
        BROTLI_MAX_WINDOW_BITS: 24,
        BROTLI_LARGE_MAX_WINDOW_BITS: 30,
        BROTLI_DEFAULT_WINDOW: 22,
        BROTLI_MIN_INPUT_BLOCK_BITS: 16,
        BROTLI_MAX_INPUT_BLOCK_BITS: 24,
        BROTLI_PARAM_MODE: 0,
        BROTLI_PARAM_QUALITY: 1,
        BROTLI_PARAM_LGWIN: 2,
        BROTLI_PARAM_LGBLOCK: 3,
        BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING: 4,
        BROTLI_PARAM_SIZE_HINT: 5,
        BROTLI_PARAM_LARGE_WINDOW: 6,
        BROTLI_PARAM_NPOSTFIX: 7,
        BROTLI_PARAM_NDIRECT: 8,
        BROTLI_DECODER_RESULT_ERROR: 0,
        BROTLI_DECODER_RESULT_SUCCESS: 1,
        BROTLI_DECODER_RESULT_NEEDS_MORE_INPUT: 2,
        BROTLI_DECODER_RESULT_NEEDS_MORE_OUTPUT: 3,
        BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION: 0,
        BROTLI_DECODER_PARAM_LARGE_WINDOW: 1,
        BROTLI_DECODER_NO_ERROR: 0,
        BROTLI_DECODER_SUCCESS: 1,
        BROTLI_DECODER_NEEDS_MORE_INPUT: 2,
        BROTLI_DECODER_NEEDS_MORE_OUTPUT: 3,
        BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_NIBBLE: -1,
        BROTLI_DECODER_ERROR_FORMAT_RESERVED: -2,
        BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_META_NIBBLE: -3,
        BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_ALPHABET: -4,
        BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_SAME: -5,
        BROTLI_DECODER_ERROR_FORMAT_CL_SPACE: -6,
        BROTLI_DECODER_ERROR_FORMAT_HUFFMAN_SPACE: -7,
        BROTLI_DECODER_ERROR_FORMAT_CONTEXT_MAP_REPEAT: -8,
        BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_1: -9,
        BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_2: -10,
        BROTLI_DECODER_ERROR_FORMAT_TRANSFORM: -11,
        BROTLI_DECODER_ERROR_FORMAT_DICTIONARY: -12,
        BROTLI_DECODER_ERROR_FORMAT_WINDOW_BITS: -13,
        BROTLI_DECODER_ERROR_FORMAT_PADDING_1: -14,
        BROTLI_DECODER_ERROR_FORMAT_PADDING_2: -15,
        BROTLI_DECODER_ERROR_FORMAT_DISTANCE: -16,
        BROTLI_DECODER_ERROR_DICTIONARY_NOT_SET: -19,
        BROTLI_DECODER_ERROR_INVALID_ARGUMENTS: -20,
        BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MODES: -21,
        BROTLI_DECODER_ERROR_ALLOC_TREE_GROUPS: -22,
        BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MAP: -25,
        BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_1: -26,
        BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_2: -27,
        BROTLI_DECODER_ERROR_ALLOC_BLOCK_TYPE_TREES: -30,
        BROTLI_DECODER_ERROR_UNREACHABLE: -31,
      },
      R5,
    ),
  );
});
var Pd = y((Ct) => {
  "use strict";
  var Cd = require("assert"),
    hi = require("buffer").Buffer,
    SD = require("zlib"),
    tn = (Ct.constants = bD()),
    A5 = os(),
    ED = hi.concat,
    rn = Symbol("_superWrite"),
    ls = class extends Error {
      constructor(t) {
        super("zlib: " + t.message),
          (this.code = t.code),
          (this.errno = t.errno),
          this.code || (this.code = "ZLIB_ERROR"),
          (this.message = "zlib: " + t.message),
          Error.captureStackTrace(this, this.constructor);
      }
      get name() {
        return "ZlibError";
      }
    },
    N5 = Symbol("opts"),
    ka = Symbol("flushFlag"),
    _D = Symbol("finishFlushFlag"),
    qd = Symbol("fullFlushFlag"),
    ye = Symbol("handle"),
    hl = Symbol("onError"),
    us = Symbol("sawError"),
    Ed = Symbol("level"),
    _d = Symbol("strategy"),
    Sd = Symbol("ended"),
    aZ = Symbol("_defaultFullFlush"),
    cl = class extends A5 {
      constructor(t, r) {
        if (!t || typeof t != "object")
          throw new TypeError("invalid options for ZlibBase constructor");
        super(t),
          (this[us] = !1),
          (this[Sd] = !1),
          (this[N5] = t),
          (this[ka] = t.flush),
          (this[_D] = t.finishFlush);
        try {
          this[ye] = new SD[r](t);
        } catch (i) {
          throw new ls(i);
        }
        (this[hl] = (i) => {
          this[us] || ((this[us] = !0), this.close(), this.emit("error", i));
        }),
          this[ye].on("error", (i) => this[hl](new ls(i))),
          this.once("end", () => this.close);
      }
      close() {
        this[ye] && (this[ye].close(), (this[ye] = null), this.emit("close"));
      }
      reset() {
        if (!this[us])
          return Cd(this[ye], "zlib binding closed"), this[ye].reset();
      }
      flush(t) {
        this.ended ||
          (typeof t != "number" && (t = this[qd]),
          this.write(Object.assign(hi.alloc(0), { [ka]: t })));
      }
      end(t, r, i) {
        return (
          t && this.write(t, r),
          this.flush(this[_D]),
          (this[Sd] = !0),
          super.end(null, null, i)
        );
      }
      get ended() {
        return this[Sd];
      }
      write(t, r, i) {
        if (
          (typeof r == "function" && ((i = r), (r = "utf8")),
          typeof t == "string" && (t = hi.from(t, r)),
          this[us])
        )
          return;
        Cd(this[ye], "zlib binding closed");
        let n = this[ye]._handle,
          s = n.close;
        n.close = () => {};
        let a = this[ye].close;
        (this[ye].close = () => {}), (hi.concat = (l) => l);
        let o;
        try {
          let l = typeof t[ka] == "number" ? t[ka] : this[ka];
          (o = this[ye]._processChunk(t, l)), (hi.concat = ED);
        } catch (l) {
          (hi.concat = ED), this[hl](new ls(l));
        } finally {
          this[ye] &&
            ((this[ye]._handle = n),
            (n.close = s),
            (this[ye].close = a),
            this[ye].removeAllListeners("error"));
        }
        this[ye] && this[ye].on("error", (l) => this[hl](new ls(l)));
        let u;
        if (o)
          if (Array.isArray(o) && o.length > 0) {
            u = this[rn](hi.from(o[0]));
            for (let l = 1; l < o.length; l++) u = this[rn](o[l]);
          } else u = this[rn](hi.from(o));
        return i && i(), u;
      }
      [rn](t) {
        return super.write(t);
      }
    },
    qr = class extends cl {
      constructor(t, r) {
        (t = t || {}),
          (t.flush = t.flush || tn.Z_NO_FLUSH),
          (t.finishFlush = t.finishFlush || tn.Z_FINISH),
          super(t, r),
          (this[qd] = tn.Z_FULL_FLUSH),
          (this[Ed] = t.level),
          (this[_d] = t.strategy);
      }
      params(t, r) {
        if (!this[us]) {
          if (!this[ye])
            throw new Error("cannot switch params when binding is closed");
          if (!this[ye].params)
            throw new Error("not supported in this implementation");
          if (this[Ed] !== t || this[_d] !== r) {
            this.flush(tn.Z_SYNC_FLUSH), Cd(this[ye], "zlib binding closed");
            let i = this[ye].flush;
            this[ye].flush = (n, s) => {
              this.flush(n), s();
            };
            try {
              this[ye].params(t, r);
            } finally {
              this[ye].flush = i;
            }
            this[ye] && ((this[Ed] = t), (this[_d] = r));
          }
        }
      }
    },
    Od = class extends qr {
      constructor(t) {
        super(t, "Deflate");
      }
    },
    Td = class extends qr {
      constructor(t) {
        super(t, "Inflate");
      }
    },
    xd = Symbol("_portable"),
    Fd = class extends qr {
      constructor(t) {
        super(t, "Gzip"), (this[xd] = t && !!t.portable);
      }
      [rn](t) {
        return this[xd]
          ? ((this[xd] = !1), (t[9] = 255), super[rn](t))
          : super[rn](t);
      }
    },
    Rd = class extends qr {
      constructor(t) {
        super(t, "Gunzip");
      }
    },
    Ad = class extends qr {
      constructor(t) {
        super(t, "DeflateRaw");
      }
    },
    Nd = class extends qr {
      constructor(t) {
        super(t, "InflateRaw");
      }
    },
    Id = class extends qr {
      constructor(t) {
        super(t, "Unzip");
      }
    },
    dl = class extends cl {
      constructor(t, r) {
        (t = t || {}),
          (t.flush = t.flush || tn.BROTLI_OPERATION_PROCESS),
          (t.finishFlush = t.finishFlush || tn.BROTLI_OPERATION_FINISH),
          super(t, r),
          (this[qd] = tn.BROTLI_OPERATION_FLUSH);
      }
    },
    Md = class extends dl {
      constructor(t) {
        super(t, "BrotliCompress");
      }
    },
    Ld = class extends dl {
      constructor(t) {
        super(t, "BrotliDecompress");
      }
    };
  Ct.Deflate = Od;
  Ct.Inflate = Td;
  Ct.Gzip = Fd;
  Ct.Gunzip = Rd;
  Ct.DeflateRaw = Ad;
  Ct.InflateRaw = Nd;
  Ct.Unzip = Id;
  typeof SD.BrotliCompress == "function"
    ? ((Ct.BrotliCompress = Md), (Ct.BrotliDecompress = Ld))
    : (Ct.BrotliCompress = Ct.BrotliDecompress =
        class {
          constructor() {
            throw new Error(
              "Brotli is not supported in this version of Node.js",
            );
          }
        });
});
var fs = y((lZ, xD) => {
  var I5 = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform;
  xD.exports = I5 !== "win32" ? (e) => e : (e) => e && e.replace(/\\/g, "/");
});
var pl = y((hZ, CD) => {
  "use strict";
  var M5 = os(),
    Bd = fs(),
    kd = Symbol("slurp");
  CD.exports = class extends M5 {
    constructor(t, r, i) {
      switch (
        (super(),
        this.pause(),
        (this.extended = r),
        (this.globalExtended = i),
        (this.header = t),
        (this.startBlockSize = 512 * Math.ceil(t.size / 512)),
        (this.blockRemain = this.startBlockSize),
        (this.remain = t.size),
        (this.type = t.type),
        (this.meta = !1),
        (this.ignore = !1),
        this.type)
      ) {
        case "File":
        case "OldFile":
        case "Link":
        case "SymbolicLink":
        case "CharacterDevice":
        case "BlockDevice":
        case "Directory":
        case "FIFO":
        case "ContiguousFile":
        case "GNUDumpDir":
          break;
        case "NextFileHasLongLinkpath":
        case "NextFileHasLongPath":
        case "OldGnuLongPath":
        case "GlobalExtendedHeader":
        case "ExtendedHeader":
        case "OldExtendedHeader":
          this.meta = !0;
          break;
        default:
          this.ignore = !0;
      }
      (this.path = Bd(t.path)),
        (this.mode = t.mode),
        this.mode && (this.mode = this.mode & 4095),
        (this.uid = t.uid),
        (this.gid = t.gid),
        (this.uname = t.uname),
        (this.gname = t.gname),
        (this.size = t.size),
        (this.mtime = t.mtime),
        (this.atime = t.atime),
        (this.ctime = t.ctime),
        (this.linkpath = Bd(t.linkpath)),
        (this.uname = t.uname),
        (this.gname = t.gname),
        r && this[kd](r),
        i && this[kd](i, !0);
    }
    write(t) {
      let r = t.length;
      if (r > this.blockRemain)
        throw new Error("writing more to entry than is appropriate");
      let i = this.remain,
        n = this.blockRemain;
      return (
        (this.remain = Math.max(0, i - r)),
        (this.blockRemain = Math.max(0, n - r)),
        this.ignore ? !0 : i >= r ? super.write(t) : super.write(t.slice(0, i))
      );
    }
    [kd](t, r) {
      for (let i in t)
        t[i] !== null &&
          t[i] !== void 0 &&
          !(r && i === "path") &&
          (this[i] = i === "path" || i === "linkpath" ? Bd(t[i]) : t[i]);
    }
  };
});
var jd = y((ml) => {
  "use strict";
  ml.name = new Map([
    ["0", "File"],
    ["", "OldFile"],
    ["1", "Link"],
    ["2", "SymbolicLink"],
    ["3", "CharacterDevice"],
    ["4", "BlockDevice"],
    ["5", "Directory"],
    ["6", "FIFO"],
    ["7", "ContiguousFile"],
    ["g", "GlobalExtendedHeader"],
    ["x", "ExtendedHeader"],
    ["A", "SolarisACL"],
    ["D", "GNUDumpDir"],
    ["I", "Inode"],
    ["K", "NextFileHasLongLinkpath"],
    ["L", "NextFileHasLongPath"],
    ["M", "ContinuationFile"],
    ["N", "OldGnuLongPath"],
    ["S", "SparseFile"],
    ["V", "TapeVolumeHeader"],
    ["X", "OldExtendedHeader"],
  ]);
  ml.code = new Map(Array.from(ml.name).map((e) => [e[1], e[0]]));
});
var RD = y((dZ, FD) => {
  "use strict";
  var L5 = (e, t) => {
      if (Number.isSafeInteger(e)) e < 0 ? P5(e, t) : q5(e, t);
      else
        throw Error(
          "cannot encode number outside of javascript safe integer range",
        );
      return t;
    },
    q5 = (e, t) => {
      t[0] = 128;
      for (var r = t.length; r > 1; r--)
        (t[r - 1] = e & 255), (e = Math.floor(e / 256));
    },
    P5 = (e, t) => {
      t[0] = 255;
      var r = !1;
      e = e * -1;
      for (var i = t.length; i > 1; i--) {
        var n = e & 255;
        (e = Math.floor(e / 256)),
          r
            ? (t[i - 1] = OD(n))
            : n === 0
            ? (t[i - 1] = 0)
            : ((r = !0), (t[i - 1] = TD(n)));
      }
    },
    B5 = (e) => {
      let t = e[0],
        r = t === 128 ? j5(e.slice(1, e.length)) : t === 255 ? k5(e) : null;
      if (r === null) throw Error("invalid base256 encoding");
      if (!Number.isSafeInteger(r))
        throw Error("parsed number outside of javascript safe integer range");
      return r;
    },
    k5 = (e) => {
      for (var t = e.length, r = 0, i = !1, n = t - 1; n > -1; n--) {
        var s = e[n],
          a;
        i ? (a = OD(s)) : s === 0 ? (a = s) : ((i = !0), (a = TD(s))),
          a !== 0 && (r -= a * Math.pow(256, t - n - 1));
      }
      return r;
    },
    j5 = (e) => {
      for (var t = e.length, r = 0, i = t - 1; i > -1; i--) {
        var n = e[i];
        n !== 0 && (r += n * Math.pow(256, t - i - 1));
      }
      return r;
    },
    OD = (e) => (255 ^ e) & 255,
    TD = (e) => ((255 ^ e) + 1) & 255;
  FD.exports = { encode: L5, parse: B5 };
});
var cs = y((pZ, ND) => {
  "use strict";
  var Ud = jd(),
    hs = require("path").posix,
    AD = RD(),
    zd = Symbol("slurp"),
    Ot = Symbol("type"),
    Gd = class {
      constructor(t, r, i, n) {
        (this.cksumValid = !1),
          (this.needPax = !1),
          (this.nullBlock = !1),
          (this.block = null),
          (this.path = null),
          (this.mode = null),
          (this.uid = null),
          (this.gid = null),
          (this.size = null),
          (this.mtime = null),
          (this.cksum = null),
          (this[Ot] = "0"),
          (this.linkpath = null),
          (this.uname = null),
          (this.gname = null),
          (this.devmaj = 0),
          (this.devmin = 0),
          (this.atime = null),
          (this.ctime = null),
          Buffer.isBuffer(t) ? this.decode(t, r || 0, i, n) : t && this.set(t);
      }
      decode(t, r, i, n) {
        if ((r || (r = 0), !t || !(t.length >= r + 512)))
          throw new Error("need 512 bytes for header");
        if (
          ((this.path = nn(t, r, 100)),
          (this.mode = ci(t, r + 100, 8)),
          (this.uid = ci(t, r + 108, 8)),
          (this.gid = ci(t, r + 116, 8)),
          (this.size = ci(t, r + 124, 12)),
          (this.mtime = $d(t, r + 136, 12)),
          (this.cksum = ci(t, r + 148, 12)),
          this[zd](i),
          this[zd](n, !0),
          (this[Ot] = nn(t, r + 156, 1)),
          this[Ot] === "" && (this[Ot] = "0"),
          this[Ot] === "0" && this.path.slice(-1) === "/" && (this[Ot] = "5"),
          this[Ot] === "5" && (this.size = 0),
          (this.linkpath = nn(t, r + 157, 100)),
          t.slice(r + 257, r + 265).toString() === "ustar\x0000")
        )
          if (
            ((this.uname = nn(t, r + 265, 32)),
            (this.gname = nn(t, r + 297, 32)),
            (this.devmaj = ci(t, r + 329, 8)),
            (this.devmin = ci(t, r + 337, 8)),
            t[r + 475] !== 0)
          ) {
            let a = nn(t, r + 345, 155);
            this.path = a + "/" + this.path;
          } else {
            let a = nn(t, r + 345, 130);
            a && (this.path = a + "/" + this.path),
              (this.atime = $d(t, r + 476, 12)),
              (this.ctime = $d(t, r + 488, 12));
          }
        let s = 8 * 32;
        for (let a = r; a < r + 148; a++) s += t[a];
        for (let a = r + 156; a < r + 512; a++) s += t[a];
        (this.cksumValid = s === this.cksum),
          this.cksum === null && s === 8 * 32 && (this.nullBlock = !0);
      }
      [zd](t, r) {
        for (let i in t)
          t[i] !== null &&
            t[i] !== void 0 &&
            !(r && i === "path") &&
            (this[i] = t[i]);
      }
      encode(t, r) {
        if (
          (t || ((t = this.block = Buffer.alloc(512)), (r = 0)),
          r || (r = 0),
          !(t.length >= r + 512))
        )
          throw new Error("need 512 bytes for header");
        let i = this.ctime || this.atime ? 130 : 155,
          n = U5(this.path || "", i),
          s = n[0],
          a = n[1];
        (this.needPax = n[2]),
          (this.needPax = sn(t, r, 100, s) || this.needPax),
          (this.needPax = di(t, r + 100, 8, this.mode) || this.needPax),
          (this.needPax = di(t, r + 108, 8, this.uid) || this.needPax),
          (this.needPax = di(t, r + 116, 8, this.gid) || this.needPax),
          (this.needPax = di(t, r + 124, 12, this.size) || this.needPax),
          (this.needPax = Wd(t, r + 136, 12, this.mtime) || this.needPax),
          (t[r + 156] = this[Ot].charCodeAt(0)),
          (this.needPax = sn(t, r + 157, 100, this.linkpath) || this.needPax),
          t.write("ustar\x0000", r + 257, 8),
          (this.needPax = sn(t, r + 265, 32, this.uname) || this.needPax),
          (this.needPax = sn(t, r + 297, 32, this.gname) || this.needPax),
          (this.needPax = di(t, r + 329, 8, this.devmaj) || this.needPax),
          (this.needPax = di(t, r + 337, 8, this.devmin) || this.needPax),
          (this.needPax = sn(t, r + 345, i, a) || this.needPax),
          t[r + 475] !== 0
            ? (this.needPax = sn(t, r + 345, 155, a) || this.needPax)
            : ((this.needPax = sn(t, r + 345, 130, a) || this.needPax),
              (this.needPax = Wd(t, r + 476, 12, this.atime) || this.needPax),
              (this.needPax = Wd(t, r + 488, 12, this.ctime) || this.needPax));
        let o = 8 * 32;
        for (let u = r; u < r + 148; u++) o += t[u];
        for (let u = r + 156; u < r + 512; u++) o += t[u];
        return (
          (this.cksum = o),
          di(t, r + 148, 8, this.cksum),
          (this.cksumValid = !0),
          this.needPax
        );
      }
      set(t) {
        for (let r in t) t[r] !== null && t[r] !== void 0 && (this[r] = t[r]);
      }
      get type() {
        return Ud.name.get(this[Ot]) || this[Ot];
      }
      get typeKey() {
        return this[Ot];
      }
      set type(t) {
        Ud.code.has(t) ? (this[Ot] = Ud.code.get(t)) : (this[Ot] = t);
      }
    },
    U5 = (e, t) => {
      let i = e,
        n = "",
        s,
        a = hs.parse(e).root || ".";
      if (Buffer.byteLength(i) < 100) s = [i, n, !1];
      else {
        (n = hs.dirname(i)), (i = hs.basename(i));
        do
          Buffer.byteLength(i) <= 100 && Buffer.byteLength(n) <= t
            ? (s = [i, n, !1])
            : Buffer.byteLength(i) > 100 && Buffer.byteLength(n) <= t
            ? (s = [i.slice(0, 100 - 1), n, !0])
            : ((i = hs.join(hs.basename(n), i)), (n = hs.dirname(n)));
        while (n !== a && !s);
        s || (s = [e.slice(0, 100 - 1), "", !0]);
      }
      return s;
    },
    nn = (e, t, r) =>
      e
        .slice(t, t + r)
        .toString("utf8")
        .replace(/\0.*/, ""),
    $d = (e, t, r) => z5(ci(e, t, r)),
    z5 = (e) => (e === null ? null : new Date(e * 1e3)),
    ci = (e, t, r) => (e[t] & 128 ? AD.parse(e.slice(t, t + r)) : W5(e, t, r)),
    $5 = (e) => (isNaN(e) ? null : e),
    W5 = (e, t, r) =>
      $5(
        parseInt(
          e
            .slice(t, t + r)
            .toString("utf8")
            .replace(/\0.*$/, "")
            .trim(),
          8,
        ),
      ),
    G5 = { 12: 8589934591, 8: 2097151 },
    di = (e, t, r, i) =>
      i === null
        ? !1
        : i > G5[r] || i < 0
        ? (AD.encode(i, e.slice(t, t + r)), !0)
        : (H5(e, t, r, i), !1),
    H5 = (e, t, r, i) => e.write(V5(i, r), t, r, "ascii"),
    V5 = (e, t) => Y5(Math.floor(e).toString(8), t),
    Y5 = (e, t) =>
      (e.length === t - 1
        ? e
        : new Array(t - e.length - 1).join("0") + e + " ") + "\0",
    Wd = (e, t, r, i) => (i === null ? !1 : di(e, t, r, i.getTime() / 1e3)),
    X5 = new Array(156).join("\0"),
    sn = (e, t, r, i) =>
      i === null
        ? !1
        : (e.write(i + X5, t, r, "utf8"),
          i.length !== Buffer.byteLength(i) || i.length > r);
  ND.exports = Gd;
});
var gl = y((mZ, ID) => {
  "use strict";
  var Z5 = cs(),
    K5 = require("path"),
    ja = class {
      constructor(t, r) {
        (this.atime = t.atime || null),
          (this.charset = t.charset || null),
          (this.comment = t.comment || null),
          (this.ctime = t.ctime || null),
          (this.gid = t.gid || null),
          (this.gname = t.gname || null),
          (this.linkpath = t.linkpath || null),
          (this.mtime = t.mtime || null),
          (this.path = t.path || null),
          (this.size = t.size || null),
          (this.uid = t.uid || null),
          (this.uname = t.uname || null),
          (this.dev = t.dev || null),
          (this.ino = t.ino || null),
          (this.nlink = t.nlink || null),
          (this.global = r || !1);
      }
      encode() {
        let t = this.encodeBody();
        if (t === "") return null;
        let r = Buffer.byteLength(t),
          i = 512 * Math.ceil(1 + r / 512),
          n = Buffer.allocUnsafe(i);
        for (let s = 0; s < 512; s++) n[s] = 0;
        new Z5({
          path: ("PaxHeader/" + K5.basename(this.path)).slice(0, 99),
          mode: this.mode || 420,
          uid: this.uid || null,
          gid: this.gid || null,
          size: r,
          mtime: this.mtime || null,
          type: this.global ? "GlobalExtendedHeader" : "ExtendedHeader",
          linkpath: "",
          uname: this.uname || "",
          gname: this.gname || "",
          devmaj: 0,
          devmin: 0,
          atime: this.atime || null,
          ctime: this.ctime || null,
        }).encode(n),
          n.write(t, 512, r, "utf8");
        for (let s = r + 512; s < n.length; s++) n[s] = 0;
        return n;
      }
      encodeBody() {
        return (
          this.encodeField("path") +
          this.encodeField("ctime") +
          this.encodeField("atime") +
          this.encodeField("dev") +
          this.encodeField("ino") +
          this.encodeField("nlink") +
          this.encodeField("charset") +
          this.encodeField("comment") +
          this.encodeField("gid") +
          this.encodeField("gname") +
          this.encodeField("linkpath") +
          this.encodeField("mtime") +
          this.encodeField("size") +
          this.encodeField("uid") +
          this.encodeField("uname")
        );
      }
      encodeField(t) {
        if (this[t] === null || this[t] === void 0) return "";
        let r = this[t] instanceof Date ? this[t].getTime() / 1e3 : this[t],
          i =
            " " +
            (t === "dev" || t === "ino" || t === "nlink" ? "SCHILY." : "") +
            t +
            "=" +
            r +
            `
`,
          n = Buffer.byteLength(i),
          s = Math.floor(Math.log(n) / Math.log(10)) + 1;
        return n + s >= Math.pow(10, s) && (s += 1), s + n + i;
      }
    };
  ja.parse = (e, t, r) => new ja(Q5(J5(e), t), r);
  var Q5 = (e, t) =>
      t ? Object.keys(e).reduce((r, i) => ((r[i] = e[i]), r), t) : e,
    J5 = (e) =>
      e
        .replace(/\n$/, "")
        .split(
          `
`,
        )
        .reduce(e6, Object.create(null)),
    e6 = (e, t) => {
      let r = parseInt(t, 10);
      if (r !== Buffer.byteLength(t) + 1) return e;
      t = t.slice((r + " ").length);
      let i = t.split("="),
        n = i.shift().replace(/^SCHILY\.(dev|ino|nlink)/, "$1");
      if (!n) return e;
      let s = i.join("=");
      return (
        (e[n] = /^([A-Z]+\.)?([mac]|birth|creation)time$/.test(n)
          ? new Date(s * 1e3)
          : /^[0-9]+$/.test(s)
          ? +s
          : s),
        e
      );
    };
  ID.exports = ja;
});
var ds = y((gZ, MD) => {
  MD.exports = (e) => {
    let t = e.length - 1,
      r = -1;
    for (; t > -1 && e.charAt(t) === "/"; ) (r = t), t--;
    return r === -1 ? e : e.slice(0, r);
  };
});
var yl = y((yZ, LD) => {
  "use strict";
  LD.exports = (e) =>
    class extends e {
      warn(t, r, i = {}) {
        this.file && (i.file = this.file),
          this.cwd && (i.cwd = this.cwd),
          (i.code = (r instanceof Error && r.code) || t),
          (i.tarCode = t),
          !this.strict && i.recoverable !== !1
            ? (r instanceof Error &&
                ((i = Object.assign(r, i)), (r = r.message)),
              this.emit("warn", i.tarCode, r, i))
            : r instanceof Error
            ? this.emit("error", Object.assign(r, i))
            : this.emit("error", Object.assign(new Error(`${t}: ${r}`), i));
      }
    };
});
var Vd = y((wZ, qD) => {
  "use strict";
  var vl = ["|", "<", ">", "?", ":"],
    Hd = vl.map((e) => String.fromCharCode(61440 + e.charCodeAt(0))),
    t6 = new Map(vl.map((e, t) => [e, Hd[t]])),
    r6 = new Map(Hd.map((e, t) => [e, vl[t]]));
  qD.exports = {
    encode: (e) => vl.reduce((t, r) => t.split(r).join(t6.get(r)), e),
    decode: (e) => Hd.reduce((t, r) => t.split(r).join(r6.get(r)), e),
  };
});
var Yd = y((DZ, BD) => {
  var { isAbsolute: i6, parse: PD } = require("path").win32;
  BD.exports = (e) => {
    let t = "",
      r = PD(e);
    for (; i6(e) || r.root; ) {
      let i = e.charAt(0) === "/" && e.slice(0, 4) !== "//?/" ? "/" : r.root;
      (e = e.slice(i.length)), (t += i), (r = PD(e));
    }
    return [t, e];
  };
});
var jD = y((bZ, kD) => {
  "use strict";
  kD.exports = (e, t, r) => (
    (e &= 4095),
    r && (e = (e | 384) & -19),
    t && (e & 256 && (e |= 64), e & 32 && (e |= 8), e & 4 && (e |= 1)),
    e
  );
});
var np = y((SZ, eb) => {
  "use strict";
  var VD = os(),
    YD = gl(),
    XD = cs(),
    cr = require("fs"),
    UD = require("path"),
    hr = fs(),
    n6 = ds(),
    ZD = (e, t) =>
      t ? ((e = hr(e).replace(/^\.(\/|$)/, "")), n6(t) + "/" + e) : hr(e),
    s6 = 16 * 1024 * 1024,
    zD = Symbol("process"),
    $D = Symbol("file"),
    WD = Symbol("directory"),
    Zd = Symbol("symlink"),
    GD = Symbol("hardlink"),
    Ua = Symbol("header"),
    wl = Symbol("read"),
    Kd = Symbol("lstat"),
    Dl = Symbol("onlstat"),
    Qd = Symbol("onread"),
    Jd = Symbol("onreadlink"),
    ep = Symbol("openfile"),
    tp = Symbol("onopenfile"),
    pi = Symbol("close"),
    bl = Symbol("mode"),
    rp = Symbol("awaitDrain"),
    Xd = Symbol("ondrain"),
    dr = Symbol("prefix"),
    HD = Symbol("hadError"),
    KD = yl(),
    a6 = Vd(),
    QD = Yd(),
    JD = jD(),
    El = KD(
      class extends VD {
        constructor(t, r) {
          if (((r = r || {}), super(r), typeof t != "string"))
            throw new TypeError("path is required");
          (this.path = hr(t)),
            (this.portable = !!r.portable),
            (this.myuid = (process.getuid && process.getuid()) || 0),
            (this.myuser = process.env.USER || ""),
            (this.maxReadSize = r.maxReadSize || s6),
            (this.linkCache = r.linkCache || new Map()),
            (this.statCache = r.statCache || new Map()),
            (this.preservePaths = !!r.preservePaths),
            (this.cwd = hr(r.cwd || process.cwd())),
            (this.strict = !!r.strict),
            (this.noPax = !!r.noPax),
            (this.noMtime = !!r.noMtime),
            (this.mtime = r.mtime || null),
            (this.prefix = r.prefix ? hr(r.prefix) : null),
            (this.fd = null),
            (this.blockLen = null),
            (this.blockRemain = null),
            (this.buf = null),
            (this.offset = null),
            (this.length = null),
            (this.pos = null),
            (this.remain = null),
            typeof r.onwarn == "function" && this.on("warn", r.onwarn);
          let i = !1;
          if (!this.preservePaths) {
            let [n, s] = QD(this.path);
            n && ((this.path = s), (i = n));
          }
          (this.win32 = !!r.win32 || process.platform === "win32"),
            this.win32 &&
              ((this.path = a6.decode(this.path.replace(/\\/g, "/"))),
              (t = t.replace(/\\/g, "/"))),
            (this.absolute = hr(r.absolute || UD.resolve(this.cwd, t))),
            this.path === "" && (this.path = "./"),
            i &&
              this.warn("TAR_ENTRY_INFO", `stripping ${i} from absolute path`, {
                entry: this,
                path: i + this.path,
              }),
            this.statCache.has(this.absolute)
              ? this[Dl](this.statCache.get(this.absolute))
              : this[Kd]();
        }
        emit(t, ...r) {
          return t === "error" && (this[HD] = !0), super.emit(t, ...r);
        }
        [Kd]() {
          cr.lstat(this.absolute, (t, r) => {
            if (t) return this.emit("error", t);
            this[Dl](r);
          });
        }
        [Dl](t) {
          this.statCache.set(this.absolute, t),
            (this.stat = t),
            t.isFile() || (t.size = 0),
            (this.type = u6(t)),
            this.emit("stat", t),
            this[zD]();
        }
        [zD]() {
          switch (this.type) {
            case "File":
              return this[$D]();
            case "Directory":
              return this[WD]();
            case "SymbolicLink":
              return this[Zd]();
            default:
              return this.end();
          }
        }
        [bl](t) {
          return JD(t, this.type === "Directory", this.portable);
        }
        [dr](t) {
          return ZD(t, this.prefix);
        }
        [Ua]() {
          this.type === "Directory" && this.portable && (this.noMtime = !0),
            (this.header = new XD({
              path: this[dr](this.path),
              linkpath:
                this.type === "Link" ? this[dr](this.linkpath) : this.linkpath,
              mode: this[bl](this.stat.mode),
              uid: this.portable ? null : this.stat.uid,
              gid: this.portable ? null : this.stat.gid,
              size: this.stat.size,
              mtime: this.noMtime ? null : this.mtime || this.stat.mtime,
              type: this.type,
              uname: this.portable
                ? null
                : this.stat.uid === this.myuid
                ? this.myuser
                : "",
              atime: this.portable ? null : this.stat.atime,
              ctime: this.portable ? null : this.stat.ctime,
            })),
            this.header.encode() &&
              !this.noPax &&
              super.write(
                new YD({
                  atime: this.portable ? null : this.header.atime,
                  ctime: this.portable ? null : this.header.ctime,
                  gid: this.portable ? null : this.header.gid,
                  mtime: this.noMtime ? null : this.mtime || this.header.mtime,
                  path: this[dr](this.path),
                  linkpath:
                    this.type === "Link"
                      ? this[dr](this.linkpath)
                      : this.linkpath,
                  size: this.header.size,
                  uid: this.portable ? null : this.header.uid,
                  uname: this.portable ? null : this.header.uname,
                  dev: this.portable ? null : this.stat.dev,
                  ino: this.portable ? null : this.stat.ino,
                  nlink: this.portable ? null : this.stat.nlink,
                }).encode(),
              ),
            super.write(this.header.block);
        }
        [WD]() {
          this.path.slice(-1) !== "/" && (this.path += "/"),
            (this.stat.size = 0),
            this[Ua](),
            this.end();
        }
        [Zd]() {
          cr.readlink(this.absolute, (t, r) => {
            if (t) return this.emit("error", t);
            this[Jd](r);
          });
        }
        [Jd](t) {
          (this.linkpath = hr(t)), this[Ua](), this.end();
        }
        [GD](t) {
          (this.type = "Link"),
            (this.linkpath = hr(UD.relative(this.cwd, t))),
            (this.stat.size = 0),
            this[Ua](),
            this.end();
        }
        [$D]() {
          if (this.stat.nlink > 1) {
            let t = this.stat.dev + ":" + this.stat.ino;
            if (this.linkCache.has(t)) {
              let r = this.linkCache.get(t);
              if (r.indexOf(this.cwd) === 0) return this[GD](r);
            }
            this.linkCache.set(t, this.absolute);
          }
          if ((this[Ua](), this.stat.size === 0)) return this.end();
          this[ep]();
        }
        [ep]() {
          cr.open(this.absolute, "r", (t, r) => {
            if (t) return this.emit("error", t);
            this[tp](r);
          });
        }
        [tp](t) {
          if (((this.fd = t), this[HD])) return this[pi]();
          (this.blockLen = 512 * Math.ceil(this.stat.size / 512)),
            (this.blockRemain = this.blockLen);
          let r = Math.min(this.blockLen, this.maxReadSize);
          (this.buf = Buffer.allocUnsafe(r)),
            (this.offset = 0),
            (this.pos = 0),
            (this.remain = this.stat.size),
            (this.length = this.buf.length),
            this[wl]();
        }
        [wl]() {
          let { fd: t, buf: r, offset: i, length: n, pos: s } = this;
          cr.read(t, r, i, n, s, (a, o) => {
            if (a) return this[pi](() => this.emit("error", a));
            this[Qd](o);
          });
        }
        [pi](t) {
          cr.close(this.fd, t);
        }
        [Qd](t) {
          if (t <= 0 && this.remain > 0) {
            let n = new Error("encountered unexpected EOF");
            return (
              (n.path = this.absolute),
              (n.syscall = "read"),
              (n.code = "EOF"),
              this[pi](() => this.emit("error", n))
            );
          }
          if (t > this.remain) {
            let n = new Error("did not encounter expected EOF");
            return (
              (n.path = this.absolute),
              (n.syscall = "read"),
              (n.code = "EOF"),
              this[pi](() => this.emit("error", n))
            );
          }
          if (t === this.remain)
            for (let n = t; n < this.length && t < this.blockRemain; n++)
              (this.buf[n + this.offset] = 0), t++, this.remain++;
          let r =
            this.offset === 0 && t === this.buf.length
              ? this.buf
              : this.buf.slice(this.offset, this.offset + t);
          this.write(r) ? this[Xd]() : this[rp](() => this[Xd]());
        }
        [rp](t) {
          this.once("drain", t);
        }
        write(t) {
          if (this.blockRemain < t.length) {
            let r = new Error("writing more data than expected");
            return (r.path = this.absolute), this.emit("error", r);
          }
          return (
            (this.remain -= t.length),
            (this.blockRemain -= t.length),
            (this.pos += t.length),
            (this.offset += t.length),
            super.write(t)
          );
        }
        [Xd]() {
          if (!this.remain)
            return (
              this.blockRemain && super.write(Buffer.alloc(this.blockRemain)),
              this[pi]((t) => (t ? this.emit("error", t) : this.end()))
            );
          this.offset >= this.length &&
            ((this.buf = Buffer.allocUnsafe(
              Math.min(this.blockRemain, this.buf.length),
            )),
            (this.offset = 0)),
            (this.length = this.buf.length - this.offset),
            this[wl]();
        }
      },
    ),
    ip = class extends El {
      [Kd]() {
        this[Dl](cr.lstatSync(this.absolute));
      }
      [Zd]() {
        this[Jd](cr.readlinkSync(this.absolute));
      }
      [ep]() {
        this[tp](cr.openSync(this.absolute, "r"));
      }
      [wl]() {
        let t = !0;
        try {
          let { fd: r, buf: i, offset: n, length: s, pos: a } = this,
            o = cr.readSync(r, i, n, s, a);
          this[Qd](o), (t = !1);
        } finally {
          if (t)
            try {
              this[pi](() => {});
            } catch {}
        }
      }
      [rp](t) {
        t();
      }
      [pi](t) {
        cr.closeSync(this.fd), t();
      }
    },
    o6 = KD(
      class extends VD {
        constructor(t, r) {
          (r = r || {}),
            super(r),
            (this.preservePaths = !!r.preservePaths),
            (this.portable = !!r.portable),
            (this.strict = !!r.strict),
            (this.noPax = !!r.noPax),
            (this.noMtime = !!r.noMtime),
            (this.readEntry = t),
            (this.type = t.type),
            this.type === "Directory" && this.portable && (this.noMtime = !0),
            (this.prefix = r.prefix || null),
            (this.path = hr(t.path)),
            (this.mode = this[bl](t.mode)),
            (this.uid = this.portable ? null : t.uid),
            (this.gid = this.portable ? null : t.gid),
            (this.uname = this.portable ? null : t.uname),
            (this.gname = this.portable ? null : t.gname),
            (this.size = t.size),
            (this.mtime = this.noMtime ? null : r.mtime || t.mtime),
            (this.atime = this.portable ? null : t.atime),
            (this.ctime = this.portable ? null : t.ctime),
            (this.linkpath = hr(t.linkpath)),
            typeof r.onwarn == "function" && this.on("warn", r.onwarn);
          let i = !1;
          if (!this.preservePaths) {
            let [n, s] = QD(this.path);
            n && ((this.path = s), (i = n));
          }
          (this.remain = t.size),
            (this.blockRemain = t.startBlockSize),
            (this.header = new XD({
              path: this[dr](this.path),
              linkpath:
                this.type === "Link" ? this[dr](this.linkpath) : this.linkpath,
              mode: this.mode,
              uid: this.portable ? null : this.uid,
              gid: this.portable ? null : this.gid,
              size: this.size,
              mtime: this.noMtime ? null : this.mtime,
              type: this.type,
              uname: this.portable ? null : this.uname,
              atime: this.portable ? null : this.atime,
              ctime: this.portable ? null : this.ctime,
            })),
            i &&
              this.warn("TAR_ENTRY_INFO", `stripping ${i} from absolute path`, {
                entry: this,
                path: i + this.path,
              }),
            this.header.encode() &&
              !this.noPax &&
              super.write(
                new YD({
                  atime: this.portable ? null : this.atime,
                  ctime: this.portable ? null : this.ctime,
                  gid: this.portable ? null : this.gid,
                  mtime: this.noMtime ? null : this.mtime,
                  path: this[dr](this.path),
                  linkpath:
                    this.type === "Link"
                      ? this[dr](this.linkpath)
                      : this.linkpath,
                  size: this.size,
                  uid: this.portable ? null : this.uid,
                  uname: this.portable ? null : this.uname,
                  dev: this.portable ? null : this.readEntry.dev,
                  ino: this.portable ? null : this.readEntry.ino,
                  nlink: this.portable ? null : this.readEntry.nlink,
                }).encode(),
              ),
            super.write(this.header.block),
            t.pipe(this);
        }
        [dr](t) {
          return ZD(t, this.prefix);
        }
        [bl](t) {
          return JD(t, this.type === "Directory", this.portable);
        }
        write(t) {
          let r = t.length;
          if (r > this.blockRemain)
            throw new Error("writing more to entry than is appropriate");
          return (this.blockRemain -= r), super.write(t);
        }
        end() {
          return (
            this.blockRemain && super.write(Buffer.alloc(this.blockRemain)),
            super.end()
          );
        }
      },
    );
  El.Sync = ip;
  El.Tar = o6;
  var u6 = (e) =>
    e.isFile()
      ? "File"
      : e.isDirectory()
      ? "Directory"
      : e.isSymbolicLink()
      ? "SymbolicLink"
      : "Unsupported";
  eb.exports = El;
});
var rb = y((xZ, tb) => {
  "use strict";
  tb.exports = function (e) {
    e.prototype[Symbol.iterator] = function* () {
      for (let t = this.head; t; t = t.next) yield t.value;
    };
  };
});
var sp = y((CZ, ib) => {
  "use strict";
  ib.exports = fe;
  fe.Node = an;
  fe.create = fe;
  function fe(e) {
    var t = this;
    if (
      (t instanceof fe || (t = new fe()),
      (t.tail = null),
      (t.head = null),
      (t.length = 0),
      e && typeof e.forEach == "function")
    )
      e.forEach(function (n) {
        t.push(n);
      });
    else if (arguments.length > 0)
      for (var r = 0, i = arguments.length; r < i; r++) t.push(arguments[r]);
    return t;
  }
  fe.prototype.removeNode = function (e) {
    if (e.list !== this)
      throw new Error("removing node which does not belong to this list");
    var t = e.next,
      r = e.prev;
    return (
      t && (t.prev = r),
      r && (r.next = t),
      e === this.head && (this.head = t),
      e === this.tail && (this.tail = r),
      e.list.length--,
      (e.next = null),
      (e.prev = null),
      (e.list = null),
      t
    );
  };
  fe.prototype.unshiftNode = function (e) {
    if (e !== this.head) {
      e.list && e.list.removeNode(e);
      var t = this.head;
      (e.list = this),
        (e.next = t),
        t && (t.prev = e),
        (this.head = e),
        this.tail || (this.tail = e),
        this.length++;
    }
  };
  fe.prototype.pushNode = function (e) {
    if (e !== this.tail) {
      e.list && e.list.removeNode(e);
      var t = this.tail;
      (e.list = this),
        (e.prev = t),
        t && (t.next = e),
        (this.tail = e),
        this.head || (this.head = e),
        this.length++;
    }
  };
  fe.prototype.push = function () {
    for (var e = 0, t = arguments.length; e < t; e++) f6(this, arguments[e]);
    return this.length;
  };
  fe.prototype.unshift = function () {
    for (var e = 0, t = arguments.length; e < t; e++) h6(this, arguments[e]);
    return this.length;
  };
  fe.prototype.pop = function () {
    if (!!this.tail) {
      var e = this.tail.value;
      return (
        (this.tail = this.tail.prev),
        this.tail ? (this.tail.next = null) : (this.head = null),
        this.length--,
        e
      );
    }
  };
  fe.prototype.shift = function () {
    if (!!this.head) {
      var e = this.head.value;
      return (
        (this.head = this.head.next),
        this.head ? (this.head.prev = null) : (this.tail = null),
        this.length--,
        e
      );
    }
  };
  fe.prototype.forEach = function (e, t) {
    t = t || this;
    for (var r = this.head, i = 0; r !== null; i++)
      e.call(t, r.value, i, this), (r = r.next);
  };
  fe.prototype.forEachReverse = function (e, t) {
    t = t || this;
    for (var r = this.tail, i = this.length - 1; r !== null; i--)
      e.call(t, r.value, i, this), (r = r.prev);
  };
  fe.prototype.get = function (e) {
    for (var t = 0, r = this.head; r !== null && t < e; t++) r = r.next;
    if (t === e && r !== null) return r.value;
  };
  fe.prototype.getReverse = function (e) {
    for (var t = 0, r = this.tail; r !== null && t < e; t++) r = r.prev;
    if (t === e && r !== null) return r.value;
  };
  fe.prototype.map = function (e, t) {
    t = t || this;
    for (var r = new fe(), i = this.head; i !== null; )
      r.push(e.call(t, i.value, this)), (i = i.next);
    return r;
  };
  fe.prototype.mapReverse = function (e, t) {
    t = t || this;
    for (var r = new fe(), i = this.tail; i !== null; )
      r.push(e.call(t, i.value, this)), (i = i.prev);
    return r;
  };
  fe.prototype.reduce = function (e, t) {
    var r,
      i = this.head;
    if (arguments.length > 1) r = t;
    else if (this.head) (i = this.head.next), (r = this.head.value);
    else throw new TypeError("Reduce of empty list with no initial value");
    for (var n = 0; i !== null; n++) (r = e(r, i.value, n)), (i = i.next);
    return r;
  };
  fe.prototype.reduceReverse = function (e, t) {
    var r,
      i = this.tail;
    if (arguments.length > 1) r = t;
    else if (this.tail) (i = this.tail.prev), (r = this.tail.value);
    else throw new TypeError("Reduce of empty list with no initial value");
    for (var n = this.length - 1; i !== null; n--)
      (r = e(r, i.value, n)), (i = i.prev);
    return r;
  };
  fe.prototype.toArray = function () {
    for (var e = new Array(this.length), t = 0, r = this.head; r !== null; t++)
      (e[t] = r.value), (r = r.next);
    return e;
  };
  fe.prototype.toArrayReverse = function () {
    for (var e = new Array(this.length), t = 0, r = this.tail; r !== null; t++)
      (e[t] = r.value), (r = r.prev);
    return e;
  };
  fe.prototype.slice = function (e, t) {
    (t = t || this.length),
      t < 0 && (t += this.length),
      (e = e || 0),
      e < 0 && (e += this.length);
    var r = new fe();
    if (t < e || t < 0) return r;
    e < 0 && (e = 0), t > this.length && (t = this.length);
    for (var i = 0, n = this.head; n !== null && i < e; i++) n = n.next;
    for (; n !== null && i < t; i++, n = n.next) r.push(n.value);
    return r;
  };
  fe.prototype.sliceReverse = function (e, t) {
    (t = t || this.length),
      t < 0 && (t += this.length),
      (e = e || 0),
      e < 0 && (e += this.length);
    var r = new fe();
    if (t < e || t < 0) return r;
    e < 0 && (e = 0), t > this.length && (t = this.length);
    for (var i = this.length, n = this.tail; n !== null && i > t; i--)
      n = n.prev;
    for (; n !== null && i > e; i--, n = n.prev) r.push(n.value);
    return r;
  };
  fe.prototype.splice = function (e, t, ...r) {
    e > this.length && (e = this.length - 1), e < 0 && (e = this.length + e);
    for (var i = 0, n = this.head; n !== null && i < e; i++) n = n.next;
    for (var s = [], i = 0; n && i < t; i++)
      s.push(n.value), (n = this.removeNode(n));
    n === null && (n = this.tail),
      n !== this.head && n !== this.tail && (n = n.prev);
    for (var i = 0; i < r.length; i++) n = l6(this, n, r[i]);
    return s;
  };
  fe.prototype.reverse = function () {
    for (var e = this.head, t = this.tail, r = e; r !== null; r = r.prev) {
      var i = r.prev;
      (r.prev = r.next), (r.next = i);
    }
    return (this.head = t), (this.tail = e), this;
  };
  function l6(e, t, r) {
    var i = t === e.head ? new an(r, null, t, e) : new an(r, t, t.next, e);
    return (
      i.next === null && (e.tail = i),
      i.prev === null && (e.head = i),
      e.length++,
      i
    );
  }
  function f6(e, t) {
    (e.tail = new an(t, e.tail, null, e)),
      e.head || (e.head = e.tail),
      e.length++;
  }
  function h6(e, t) {
    (e.head = new an(t, null, e.head, e)),
      e.tail || (e.tail = e.head),
      e.length++;
  }
  function an(e, t, r, i) {
    if (!(this instanceof an)) return new an(e, t, r, i);
    (this.list = i),
      (this.value = e),
      t ? ((t.next = this), (this.prev = t)) : (this.prev = null),
      r ? ((r.prev = this), (this.next = r)) : (this.next = null);
  }
  try {
    rb()(fe);
  } catch {}
});
var Al = y((TZ, fb) => {
  "use strict";
  var Fl = class {
      constructor(t, r) {
        (this.path = t || "./"),
          (this.absolute = r),
          (this.entry = null),
          (this.stat = null),
          (this.readdir = null),
          (this.pending = !1),
          (this.ignore = !1),
          (this.piped = !1);
      }
    },
    c6 = os(),
    d6 = Pd(),
    p6 = pl(),
    pp = np(),
    m6 = pp.Sync,
    g6 = pp.Tar,
    y6 = sp(),
    nb = Buffer.alloc(1024),
    xl = Symbol("onStat"),
    _l = Symbol("ended"),
    pr = Symbol("queue"),
    ps = Symbol("current"),
    on = Symbol("process"),
    Sl = Symbol("processing"),
    sb = Symbol("processJob"),
    mr = Symbol("jobs"),
    ap = Symbol("jobDone"),
    Cl = Symbol("addFSEntry"),
    ab = Symbol("addTarEntry"),
    fp = Symbol("stat"),
    hp = Symbol("readdir"),
    Ol = Symbol("onreaddir"),
    Tl = Symbol("pipe"),
    ob = Symbol("entry"),
    op = Symbol("entryOpt"),
    cp = Symbol("writeEntryClass"),
    lb = Symbol("write"),
    up = Symbol("ondrain"),
    Rl = require("fs"),
    ub = require("path"),
    v6 = yl(),
    lp = fs(),
    mp = v6(
      class extends c6 {
        constructor(t) {
          super(t),
            (t = t || Object.create(null)),
            (this.opt = t),
            (this.file = t.file || ""),
            (this.cwd = t.cwd || process.cwd()),
            (this.maxReadSize = t.maxReadSize),
            (this.preservePaths = !!t.preservePaths),
            (this.strict = !!t.strict),
            (this.noPax = !!t.noPax),
            (this.prefix = lp(t.prefix || "")),
            (this.linkCache = t.linkCache || new Map()),
            (this.statCache = t.statCache || new Map()),
            (this.readdirCache = t.readdirCache || new Map()),
            (this[cp] = pp),
            typeof t.onwarn == "function" && this.on("warn", t.onwarn),
            (this.portable = !!t.portable),
            (this.zip = null),
            t.gzip
              ? (typeof t.gzip != "object" && (t.gzip = {}),
                this.portable && (t.gzip.portable = !0),
                (this.zip = new d6.Gzip(t.gzip)),
                this.zip.on("data", (r) => super.write(r)),
                this.zip.on("end", (r) => super.end()),
                this.zip.on("drain", (r) => this[up]()),
                this.on("resume", (r) => this.zip.resume()))
              : this.on("drain", this[up]),
            (this.noDirRecurse = !!t.noDirRecurse),
            (this.follow = !!t.follow),
            (this.noMtime = !!t.noMtime),
            (this.mtime = t.mtime || null),
            (this.filter =
              typeof t.filter == "function" ? t.filter : (r) => !0),
            (this[pr] = new y6()),
            (this[mr] = 0),
            (this.jobs = +t.jobs || 4),
            (this[Sl] = !1),
            (this[_l] = !1);
        }
        [lb](t) {
          return super.write(t);
        }
        add(t) {
          return this.write(t), this;
        }
        end(t) {
          return t && this.write(t), (this[_l] = !0), this[on](), this;
        }
        write(t) {
          if (this[_l]) throw new Error("write after end");
          return t instanceof p6 ? this[ab](t) : this[Cl](t), this.flowing;
        }
        [ab](t) {
          let r = lp(ub.resolve(this.cwd, t.path));
          if (!this.filter(t.path, t)) t.resume();
          else {
            let i = new Fl(t.path, r, !1);
            (i.entry = new g6(t, this[op](i))),
              i.entry.on("end", (n) => this[ap](i)),
              (this[mr] += 1),
              this[pr].push(i);
          }
          this[on]();
        }
        [Cl](t) {
          let r = lp(ub.resolve(this.cwd, t));
          this[pr].push(new Fl(t, r)), this[on]();
        }
        [fp](t) {
          (t.pending = !0), (this[mr] += 1);
          let r = this.follow ? "stat" : "lstat";
          Rl[r](t.absolute, (i, n) => {
            (t.pending = !1),
              (this[mr] -= 1),
              i ? this.emit("error", i) : this[xl](t, n);
          });
        }
        [xl](t, r) {
          this.statCache.set(t.absolute, r),
            (t.stat = r),
            this.filter(t.path, r) || (t.ignore = !0),
            this[on]();
        }
        [hp](t) {
          (t.pending = !0),
            (this[mr] += 1),
            Rl.readdir(t.absolute, (r, i) => {
              if (((t.pending = !1), (this[mr] -= 1), r))
                return this.emit("error", r);
              this[Ol](t, i);
            });
        }
        [Ol](t, r) {
          this.readdirCache.set(t.absolute, r), (t.readdir = r), this[on]();
        }
        [on]() {
          if (!this[Sl]) {
            this[Sl] = !0;
            for (
              let t = this[pr].head;
              t !== null && this[mr] < this.jobs;
              t = t.next
            )
              if ((this[sb](t.value), t.value.ignore)) {
                let r = t.next;
                this[pr].removeNode(t), (t.next = r);
              }
            (this[Sl] = !1),
              this[_l] &&
                !this[pr].length &&
                this[mr] === 0 &&
                (this.zip ? this.zip.end(nb) : (super.write(nb), super.end()));
          }
        }
        get [ps]() {
          return this[pr] && this[pr].head && this[pr].head.value;
        }
        [ap](t) {
          this[pr].shift(), (this[mr] -= 1), this[on]();
        }
        [sb](t) {
          if (!t.pending) {
            if (t.entry) {
              t === this[ps] && !t.piped && this[Tl](t);
              return;
            }
            if (
              (t.stat ||
                (this.statCache.has(t.absolute)
                  ? this[xl](t, this.statCache.get(t.absolute))
                  : this[fp](t)),
              !!t.stat &&
                !t.ignore &&
                !(
                  !this.noDirRecurse &&
                  t.stat.isDirectory() &&
                  !t.readdir &&
                  (this.readdirCache.has(t.absolute)
                    ? this[Ol](t, this.readdirCache.get(t.absolute))
                    : this[hp](t),
                  !t.readdir)
                ))
            ) {
              if (((t.entry = this[ob](t)), !t.entry)) {
                t.ignore = !0;
                return;
              }
              t === this[ps] && !t.piped && this[Tl](t);
            }
          }
        }
        [op](t) {
          return {
            onwarn: (r, i, n) => this.warn(r, i, n),
            noPax: this.noPax,
            cwd: this.cwd,
            absolute: t.absolute,
            preservePaths: this.preservePaths,
            maxReadSize: this.maxReadSize,
            strict: this.strict,
            portable: this.portable,
            linkCache: this.linkCache,
            statCache: this.statCache,
            noMtime: this.noMtime,
            mtime: this.mtime,
            prefix: this.prefix,
          };
        }
        [ob](t) {
          this[mr] += 1;
          try {
            return new this[cp](t.path, this[op](t))
              .on("end", () => this[ap](t))
              .on("error", (r) => this.emit("error", r));
          } catch (r) {
            this.emit("error", r);
          }
        }
        [up]() {
          this[ps] && this[ps].entry && this[ps].entry.resume();
        }
        [Tl](t) {
          (t.piped = !0),
            t.readdir &&
              t.readdir.forEach((n) => {
                let s = t.path,
                  a = s === "./" ? "" : s.replace(/\/*$/, "/");
                this[Cl](a + n);
              });
          let r = t.entry,
            i = this.zip;
          i
            ? r.on("data", (n) => {
                i.write(n) || r.pause();
              })
            : r.on("data", (n) => {
                super.write(n) || r.pause();
              });
        }
        pause() {
          return this.zip && this.zip.pause(), super.pause();
        }
      },
    ),
    dp = class extends mp {
      constructor(t) {
        super(t), (this[cp] = m6);
      }
      pause() {}
      resume() {}
      [fp](t) {
        let r = this.follow ? "statSync" : "lstatSync";
        this[xl](t, Rl[r](t.absolute));
      }
      [hp](t, r) {
        this[Ol](t, Rl.readdirSync(t.absolute));
      }
      [Tl](t) {
        let r = t.entry,
          i = this.zip;
        t.readdir &&
          t.readdir.forEach((n) => {
            let s = t.path,
              a = s === "./" ? "" : s.replace(/\/*$/, "/");
            this[Cl](a + n);
          }),
          i
            ? r.on("data", (n) => {
                i.write(n);
              })
            : r.on("data", (n) => {
                super[lb](n);
              });
      }
    };
  mp.Sync = dp;
  fb.exports = mp;
});
var Es = y(($a) => {
  "use strict";
  var w6 = os(),
    D6 = require("events").EventEmitter,
    vt = require("fs"),
    vp = vt.writev;
  if (!vp) {
    let e = process.binding("fs"),
      t = e.FSReqWrap || e.FSReqCallback;
    vp = (r, i, n, s) => {
      let a = (u, l) => s(u, l, i),
        o = new t();
      (o.oncomplete = a), e.writeBuffers(r, i, n, o);
    };
  }
  var Ds = Symbol("_autoClose"),
    er = Symbol("_close"),
    za = Symbol("_ended"),
    ge = Symbol("_fd"),
    hb = Symbol("_finished"),
    gi = Symbol("_flags"),
    gp = Symbol("_flush"),
    wp = Symbol("_handleChunk"),
    Dp = Symbol("_makeBuf"),
    ql = Symbol("_mode"),
    Nl = Symbol("_needDrain"),
    vs = Symbol("_onerror"),
    bs = Symbol("_onopen"),
    yp = Symbol("_onread"),
    gs = Symbol("_onwrite"),
    yi = Symbol("_open"),
    Pr = Symbol("_path"),
    un = Symbol("_pos"),
    gr = Symbol("_queue"),
    ys = Symbol("_read"),
    cb = Symbol("_readSize"),
    mi = Symbol("_reading"),
    Il = Symbol("_remain"),
    db = Symbol("_size"),
    Ml = Symbol("_write"),
    ms = Symbol("_writing"),
    Ll = Symbol("_defaultFlag"),
    ws = Symbol("_errored"),
    Pl = class extends w6 {
      constructor(t, r) {
        if (
          ((r = r || {}),
          super(r),
          (this.readable = !0),
          (this.writable = !1),
          typeof t != "string")
        )
          throw new TypeError("path must be a string");
        (this[ws] = !1),
          (this[ge] = typeof r.fd == "number" ? r.fd : null),
          (this[Pr] = t),
          (this[cb] = r.readSize || 16 * 1024 * 1024),
          (this[mi] = !1),
          (this[db] = typeof r.size == "number" ? r.size : 1 / 0),
          (this[Il] = this[db]),
          (this[Ds] = typeof r.autoClose == "boolean" ? r.autoClose : !0),
          typeof this[ge] == "number" ? this[ys]() : this[yi]();
      }
      get fd() {
        return this[ge];
      }
      get path() {
        return this[Pr];
      }
      write() {
        throw new TypeError("this is a readable stream");
      }
      end() {
        throw new TypeError("this is a readable stream");
      }
      [yi]() {
        vt.open(this[Pr], "r", (t, r) => this[bs](t, r));
      }
      [bs](t, r) {
        t ? this[vs](t) : ((this[ge] = r), this.emit("open", r), this[ys]());
      }
      [Dp]() {
        return Buffer.allocUnsafe(Math.min(this[cb], this[Il]));
      }
      [ys]() {
        if (!this[mi]) {
          this[mi] = !0;
          let t = this[Dp]();
          if (t.length === 0)
            return process.nextTick(() => this[yp](null, 0, t));
          vt.read(this[ge], t, 0, t.length, null, (r, i, n) =>
            this[yp](r, i, n),
          );
        }
      }
      [yp](t, r, i) {
        (this[mi] = !1), t ? this[vs](t) : this[wp](r, i) && this[ys]();
      }
      [er]() {
        if (this[Ds] && typeof this[ge] == "number") {
          let t = this[ge];
          (this[ge] = null),
            vt.close(t, (r) =>
              r ? this.emit("error", r) : this.emit("close"),
            );
        }
      }
      [vs](t) {
        (this[mi] = !0), this[er](), this.emit("error", t);
      }
      [wp](t, r) {
        let i = !1;
        return (
          (this[Il] -= t),
          t > 0 && (i = super.write(t < r.length ? r.slice(0, t) : r)),
          (t === 0 || this[Il] <= 0) && ((i = !1), this[er](), super.end()),
          i
        );
      }
      emit(t, r) {
        switch (t) {
          case "prefinish":
          case "finish":
            break;
          case "drain":
            typeof this[ge] == "number" && this[ys]();
            break;
          case "error":
            return this[ws] ? void 0 : ((this[ws] = !0), super.emit(t, r));
          default:
            return super.emit(t, r);
        }
      }
    },
    bp = class extends Pl {
      [yi]() {
        let t = !0;
        try {
          this[bs](null, vt.openSync(this[Pr], "r")), (t = !1);
        } finally {
          t && this[er]();
        }
      }
      [ys]() {
        let t = !0;
        try {
          if (!this[mi]) {
            this[mi] = !0;
            do {
              let r = this[Dp](),
                i =
                  r.length === 0
                    ? 0
                    : vt.readSync(this[ge], r, 0, r.length, null);
              if (!this[wp](i, r)) break;
            } while (!0);
            this[mi] = !1;
          }
          t = !1;
        } finally {
          t && this[er]();
        }
      }
      [er]() {
        if (this[Ds] && typeof this[ge] == "number") {
          let t = this[ge];
          (this[ge] = null), vt.closeSync(t), this.emit("close");
        }
      }
    },
    Bl = class extends D6 {
      constructor(t, r) {
        (r = r || {}),
          super(r),
          (this.readable = !1),
          (this.writable = !0),
          (this[ws] = !1),
          (this[ms] = !1),
          (this[za] = !1),
          (this[Nl] = !1),
          (this[gr] = []),
          (this[Pr] = t),
          (this[ge] = typeof r.fd == "number" ? r.fd : null),
          (this[ql] = r.mode === void 0 ? 438 : r.mode),
          (this[un] = typeof r.start == "number" ? r.start : null),
          (this[Ds] = typeof r.autoClose == "boolean" ? r.autoClose : !0);
        let i = this[un] !== null ? "r+" : "w";
        (this[Ll] = r.flags === void 0),
          (this[gi] = this[Ll] ? i : r.flags),
          this[ge] === null && this[yi]();
      }
      emit(t, r) {
        if (t === "error") {
          if (this[ws]) return;
          this[ws] = !0;
        }
        return super.emit(t, r);
      }
      get fd() {
        return this[ge];
      }
      get path() {
        return this[Pr];
      }
      [vs](t) {
        this[er](), (this[ms] = !0), this.emit("error", t);
      }
      [yi]() {
        vt.open(this[Pr], this[gi], this[ql], (t, r) => this[bs](t, r));
      }
      [bs](t, r) {
        this[Ll] && this[gi] === "r+" && t && t.code === "ENOENT"
          ? ((this[gi] = "w"), this[yi]())
          : t
          ? this[vs](t)
          : ((this[ge] = r), this.emit("open", r), this[gp]());
      }
      end(t, r) {
        return (
          t && this.write(t, r),
          (this[za] = !0),
          !this[ms] &&
            !this[gr].length &&
            typeof this[ge] == "number" &&
            this[gs](null, 0),
          this
        );
      }
      write(t, r) {
        return (
          typeof t == "string" && (t = Buffer.from(t, r)),
          this[za]
            ? (this.emit("error", new Error("write() after end()")), !1)
            : this[ge] === null || this[ms] || this[gr].length
            ? (this[gr].push(t), (this[Nl] = !0), !1)
            : ((this[ms] = !0), this[Ml](t), !0)
        );
      }
      [Ml](t) {
        vt.write(this[ge], t, 0, t.length, this[un], (r, i) => this[gs](r, i));
      }
      [gs](t, r) {
        t
          ? this[vs](t)
          : (this[un] !== null && (this[un] += r),
            this[gr].length
              ? this[gp]()
              : ((this[ms] = !1),
                this[za] && !this[hb]
                  ? ((this[hb] = !0), this[er](), this.emit("finish"))
                  : this[Nl] && ((this[Nl] = !1), this.emit("drain"))));
      }
      [gp]() {
        if (this[gr].length === 0) this[za] && this[gs](null, 0);
        else if (this[gr].length === 1) this[Ml](this[gr].pop());
        else {
          let t = this[gr];
          (this[gr] = []), vp(this[ge], t, this[un], (r, i) => this[gs](r, i));
        }
      }
      [er]() {
        if (this[Ds] && typeof this[ge] == "number") {
          let t = this[ge];
          (this[ge] = null),
            vt.close(t, (r) =>
              r ? this.emit("error", r) : this.emit("close"),
            );
        }
      }
    },
    Ep = class extends Bl {
      [yi]() {
        let t;
        if (this[Ll] && this[gi] === "r+")
          try {
            t = vt.openSync(this[Pr], this[gi], this[ql]);
          } catch (r) {
            if (r.code === "ENOENT") return (this[gi] = "w"), this[yi]();
            throw r;
          }
        else t = vt.openSync(this[Pr], this[gi], this[ql]);
        this[bs](null, t);
      }
      [er]() {
        if (this[Ds] && typeof this[ge] == "number") {
          let t = this[ge];
          (this[ge] = null), vt.closeSync(t), this.emit("close");
        }
      }
      [Ml](t) {
        let r = !0;
        try {
          this[gs](null, vt.writeSync(this[ge], t, 0, t.length, this[un])),
            (r = !1);
        } finally {
          if (r)
            try {
              this[er]();
            } catch {}
        }
      }
    };
  $a.ReadStream = Pl;
  $a.ReadStreamSync = bp;
  $a.WriteStream = Bl;
  $a.WriteStreamSync = Ep;
});
var Gl = y((AZ, bb) => {
  "use strict";
  var b6 = yl(),
    E6 = cs(),
    _6 = require("events"),
    S6 = sp(),
    x6 = 1024 * 1024,
    C6 = pl(),
    pb = gl(),
    O6 = Pd(),
    { nextTick: T6 } = require("process"),
    _p = Buffer.from([31, 139]),
    $t = Symbol("state"),
    ln = Symbol("writeEntry"),
    Br = Symbol("readEntry"),
    Sp = Symbol("nextEntry"),
    mb = Symbol("processEntry"),
    Wt = Symbol("extendedHeader"),
    Wa = Symbol("globalExtendedHeader"),
    vi = Symbol("meta"),
    gb = Symbol("emitMeta"),
    De = Symbol("buffer"),
    kr = Symbol("queue"),
    fn = Symbol("ended"),
    yb = Symbol("emittedEnd"),
    hn = Symbol("emit"),
    wt = Symbol("unzip"),
    kl = Symbol("consumeChunk"),
    jl = Symbol("consumeChunkSub"),
    xp = Symbol("consumeBody"),
    vb = Symbol("consumeMeta"),
    wb = Symbol("consumeHeader"),
    Ul = Symbol("consuming"),
    Cp = Symbol("bufferConcat"),
    Op = Symbol("maybeEnd"),
    Ga = Symbol("writing"),
    wi = Symbol("aborted"),
    zl = Symbol("onDone"),
    cn = Symbol("sawValidEntry"),
    $l = Symbol("sawNullBlock"),
    Wl = Symbol("sawEOF"),
    Db = Symbol("closeStream"),
    F6 = (e) => !0;
  bb.exports = b6(
    class extends _6 {
      constructor(t) {
        (t = t || {}),
          super(t),
          (this.file = t.file || ""),
          (this[cn] = null),
          this.on(zl, (r) => {
            (this[$t] === "begin" || this[cn] === !1) &&
              this.warn("TAR_BAD_ARCHIVE", "Unrecognized archive format");
          }),
          t.ondone
            ? this.on(zl, t.ondone)
            : this.on(zl, (r) => {
                this.emit("prefinish"), this.emit("finish"), this.emit("end");
              }),
          (this.strict = !!t.strict),
          (this.maxMetaEntrySize = t.maxMetaEntrySize || x6),
          (this.filter = typeof t.filter == "function" ? t.filter : F6),
          (this.writable = !0),
          (this.readable = !1),
          (this[kr] = new S6()),
          (this[De] = null),
          (this[Br] = null),
          (this[ln] = null),
          (this[$t] = "begin"),
          (this[vi] = ""),
          (this[Wt] = null),
          (this[Wa] = null),
          (this[fn] = !1),
          (this[wt] = null),
          (this[wi] = !1),
          (this[$l] = !1),
          (this[Wl] = !1),
          this.on("end", () => this[Db]()),
          typeof t.onwarn == "function" && this.on("warn", t.onwarn),
          typeof t.onentry == "function" && this.on("entry", t.onentry);
      }
      [wb](t, r) {
        this[cn] === null && (this[cn] = !1);
        let i;
        try {
          i = new E6(t, r, this[Wt], this[Wa]);
        } catch (n) {
          return this.warn("TAR_ENTRY_INVALID", n);
        }
        if (i.nullBlock)
          this[$l]
            ? ((this[Wl] = !0),
              this[$t] === "begin" && (this[$t] = "header"),
              this[hn]("eof"))
            : ((this[$l] = !0), this[hn]("nullBlock"));
        else if (((this[$l] = !1), !i.cksumValid))
          this.warn("TAR_ENTRY_INVALID", "checksum failure", { header: i });
        else if (!i.path)
          this.warn("TAR_ENTRY_INVALID", "path is required", { header: i });
        else {
          let n = i.type;
          if (/^(Symbolic)?Link$/.test(n) && !i.linkpath)
            this.warn("TAR_ENTRY_INVALID", "linkpath required", { header: i });
          else if (!/^(Symbolic)?Link$/.test(n) && i.linkpath)
            this.warn("TAR_ENTRY_INVALID", "linkpath forbidden", { header: i });
          else {
            let s = (this[ln] = new C6(i, this[Wt], this[Wa]));
            if (!this[cn])
              if (s.remain) {
                let a = () => {
                  s.invalid || (this[cn] = !0);
                };
                s.on("end", a);
              } else this[cn] = !0;
            s.meta
              ? s.size > this.maxMetaEntrySize
                ? ((s.ignore = !0),
                  this[hn]("ignoredEntry", s),
                  (this[$t] = "ignore"),
                  s.resume())
                : s.size > 0 &&
                  ((this[vi] = ""),
                  s.on("data", (a) => (this[vi] += a)),
                  (this[$t] = "meta"))
              : ((this[Wt] = null),
                (s.ignore = s.ignore || !this.filter(s.path, s)),
                s.ignore
                  ? (this[hn]("ignoredEntry", s),
                    (this[$t] = s.remain ? "ignore" : "header"),
                    s.resume())
                  : (s.remain
                      ? (this[$t] = "body")
                      : ((this[$t] = "header"), s.end()),
                    this[Br]
                      ? this[kr].push(s)
                      : (this[kr].push(s), this[Sp]())));
          }
        }
      }
      [Db]() {
        T6(() => this.emit("close"));
      }
      [mb](t) {
        let r = !0;
        return (
          t
            ? Array.isArray(t)
              ? this.emit.apply(this, t)
              : ((this[Br] = t),
                this.emit("entry", t),
                t.emittedEnd || (t.on("end", (i) => this[Sp]()), (r = !1)))
            : ((this[Br] = null), (r = !1)),
          r
        );
      }
      [Sp]() {
        do;
        while (this[mb](this[kr].shift()));
        if (!this[kr].length) {
          let t = this[Br];
          !t || t.flowing || t.size === t.remain
            ? this[Ga] || this.emit("drain")
            : t.once("drain", (i) => this.emit("drain"));
        }
      }
      [xp](t, r) {
        let i = this[ln],
          n = i.blockRemain,
          s = n >= t.length && r === 0 ? t : t.slice(r, r + n);
        return (
          i.write(s),
          i.blockRemain || ((this[$t] = "header"), (this[ln] = null), i.end()),
          s.length
        );
      }
      [vb](t, r) {
        let i = this[ln],
          n = this[xp](t, r);
        return this[ln] || this[gb](i), n;
      }
      [hn](t, r, i) {
        !this[kr].length && !this[Br]
          ? this.emit(t, r, i)
          : this[kr].push([t, r, i]);
      }
      [gb](t) {
        switch ((this[hn]("meta", this[vi]), t.type)) {
          case "ExtendedHeader":
          case "OldExtendedHeader":
            this[Wt] = pb.parse(this[vi], this[Wt], !1);
            break;
          case "GlobalExtendedHeader":
            this[Wa] = pb.parse(this[vi], this[Wa], !0);
            break;
          case "NextFileHasLongPath":
          case "OldGnuLongPath":
            (this[Wt] = this[Wt] || Object.create(null)),
              (this[Wt].path = this[vi].replace(/\0.*/, ""));
            break;
          case "NextFileHasLongLinkpath":
            (this[Wt] = this[Wt] || Object.create(null)),
              (this[Wt].linkpath = this[vi].replace(/\0.*/, ""));
            break;
          default:
            throw new Error("unknown meta: " + t.type);
        }
      }
      abort(t) {
        (this[wi] = !0),
          this.emit("abort", t),
          this.warn("TAR_ABORT", t, { recoverable: !1 });
      }
      write(t) {
        if (this[wi]) return;
        if (this[wt] === null && t) {
          if (
            (this[De] &&
              ((t = Buffer.concat([this[De], t])), (this[De] = null)),
            t.length < _p.length)
          )
            return (this[De] = t), !0;
          for (let i = 0; this[wt] === null && i < _p.length; i++)
            t[i] !== _p[i] && (this[wt] = !1);
          if (this[wt] === null) {
            let i = this[fn];
            (this[fn] = !1),
              (this[wt] = new O6.Unzip()),
              this[wt].on("data", (s) => this[kl](s)),
              this[wt].on("error", (s) => this.abort(s)),
              this[wt].on("end", (s) => {
                (this[fn] = !0), this[kl]();
              }),
              (this[Ga] = !0);
            let n = this[wt][i ? "end" : "write"](t);
            return (this[Ga] = !1), n;
          }
        }
        (this[Ga] = !0),
          this[wt] ? this[wt].write(t) : this[kl](t),
          (this[Ga] = !1);
        let r = this[kr].length ? !1 : this[Br] ? this[Br].flowing : !0;
        return (
          !r &&
            !this[kr].length &&
            this[Br].once("drain", (i) => this.emit("drain")),
          r
        );
      }
      [Cp](t) {
        t &&
          !this[wi] &&
          (this[De] = this[De] ? Buffer.concat([this[De], t]) : t);
      }
      [Op]() {
        if (this[fn] && !this[yb] && !this[wi] && !this[Ul]) {
          this[yb] = !0;
          let t = this[ln];
          if (t && t.blockRemain) {
            let r = this[De] ? this[De].length : 0;
            this.warn(
              "TAR_BAD_ARCHIVE",
              `Truncated input (needed ${t.blockRemain} more bytes, only ${r} available)`,
              { entry: t },
            ),
              this[De] && t.write(this[De]),
              t.end();
          }
          this[hn](zl);
        }
      }
      [kl](t) {
        if (this[Ul]) this[Cp](t);
        else if (!t && !this[De]) this[Op]();
        else {
          if (((this[Ul] = !0), this[De])) {
            this[Cp](t);
            let r = this[De];
            (this[De] = null), this[jl](r);
          } else this[jl](t);
          for (
            ;
            this[De] && this[De].length >= 512 && !this[wi] && !this[Wl];

          ) {
            let r = this[De];
            (this[De] = null), this[jl](r);
          }
          this[Ul] = !1;
        }
        (!this[De] || this[fn]) && this[Op]();
      }
      [jl](t) {
        let r = 0,
          i = t.length;
        for (; r + 512 <= i && !this[wi] && !this[Wl]; )
          switch (this[$t]) {
            case "begin":
            case "header":
              this[wb](t, r), (r += 512);
              break;
            case "ignore":
            case "body":
              r += this[xp](t, r);
              break;
            case "meta":
              r += this[vb](t, r);
              break;
            default:
              throw new Error("invalid state: " + this[$t]);
          }
        r < i &&
          (this[De]
            ? (this[De] = Buffer.concat([t.slice(r), this[De]]))
            : (this[De] = t.slice(r)));
      }
      end(t) {
        this[wi] ||
          (this[wt] ? this[wt].end(t) : ((this[fn] = !0), this.write(t)));
      }
    },
  );
});
var Hl = y((NZ, xb) => {
  "use strict";
  var R6 = ss(),
    _b = Gl(),
    _s = require("fs"),
    A6 = Es(),
    Eb = require("path"),
    Tp = ds();
  xb.exports = (e, t, r) => {
    typeof e == "function"
      ? ((r = e), (t = null), (e = {}))
      : Array.isArray(e) && ((t = e), (e = {})),
      typeof t == "function" && ((r = t), (t = null)),
      t ? (t = Array.from(t)) : (t = []);
    let i = R6(e);
    if (i.sync && typeof r == "function")
      throw new TypeError("callback not supported for sync tar functions");
    if (!i.file && typeof r == "function")
      throw new TypeError("callback only supported with file option");
    return (
      t.length && I6(i, t),
      i.noResume || N6(i),
      i.file && i.sync ? M6(i) : i.file ? L6(i, r) : Sb(i)
    );
  };
  var N6 = (e) => {
      let t = e.onentry;
      e.onentry = t
        ? (r) => {
            t(r), r.resume();
          }
        : (r) => r.resume();
    },
    I6 = (e, t) => {
      let r = new Map(t.map((s) => [Tp(s), !0])),
        i = e.filter,
        n = (s, a) => {
          let o = a || Eb.parse(s).root || ".",
            u = s === o ? !1 : r.has(s) ? r.get(s) : n(Eb.dirname(s), o);
          return r.set(s, u), u;
        };
      e.filter = i ? (s, a) => i(s, a) && n(Tp(s)) : (s) => n(Tp(s));
    },
    M6 = (e) => {
      let t = Sb(e),
        r = e.file,
        i = !0,
        n;
      try {
        let s = _s.statSync(r),
          a = e.maxReadSize || 16 * 1024 * 1024;
        if (s.size < a) t.end(_s.readFileSync(r));
        else {
          let o = 0,
            u = Buffer.allocUnsafe(a);
          for (n = _s.openSync(r, "r"); o < s.size; ) {
            let l = _s.readSync(n, u, 0, a, o);
            (o += l), t.write(u.slice(0, l));
          }
          t.end();
        }
        i = !1;
      } finally {
        if (i && n)
          try {
            _s.closeSync(n);
          } catch {}
      }
    },
    L6 = (e, t) => {
      let r = new _b(e),
        i = e.maxReadSize || 16 * 1024 * 1024,
        n = e.file,
        s = new Promise((a, o) => {
          r.on("error", o),
            r.on("end", a),
            _s.stat(n, (u, l) => {
              if (u) o(u);
              else {
                let f = new A6.ReadStream(n, { readSize: i, size: l.size });
                f.on("error", o), f.pipe(r);
              }
            });
        });
      return t ? s.then(t, t) : s;
    },
    Sb = (e) => new _b(e);
});
var Ab = y((IZ, Rb) => {
  "use strict";
  var q6 = ss(),
    Vl = Al(),
    Cb = Es(),
    Ob = Hl(),
    Tb = require("path");
  Rb.exports = (e, t, r) => {
    if (
      (typeof t == "function" && (r = t),
      Array.isArray(e) && ((t = e), (e = {})),
      !t || !Array.isArray(t) || !t.length)
    )
      throw new TypeError("no files or directories specified");
    t = Array.from(t);
    let i = q6(e);
    if (i.sync && typeof r == "function")
      throw new TypeError("callback not supported for sync tar functions");
    if (!i.file && typeof r == "function")
      throw new TypeError("callback only supported with file option");
    return i.file && i.sync
      ? P6(i, t)
      : i.file
      ? B6(i, t, r)
      : i.sync
      ? k6(i, t)
      : j6(i, t);
  };
  var P6 = (e, t) => {
      let r = new Vl.Sync(e),
        i = new Cb.WriteStreamSync(e.file, { mode: e.mode || 438 });
      r.pipe(i), Fb(r, t);
    },
    B6 = (e, t, r) => {
      let i = new Vl(e),
        n = new Cb.WriteStream(e.file, { mode: e.mode || 438 });
      i.pipe(n);
      let s = new Promise((a, o) => {
        n.on("error", o), n.on("close", a), i.on("error", o);
      });
      return Fp(i, t), r ? s.then(r, r) : s;
    },
    Fb = (e, t) => {
      t.forEach((r) => {
        r.charAt(0) === "@"
          ? Ob({
              file: Tb.resolve(e.cwd, r.slice(1)),
              sync: !0,
              noResume: !0,
              onentry: (i) => e.add(i),
            })
          : e.add(r);
      }),
        e.end();
    },
    Fp = (e, t) => {
      for (; t.length; ) {
        let r = t.shift();
        if (r.charAt(0) === "@")
          return Ob({
            file: Tb.resolve(e.cwd, r.slice(1)),
            noResume: !0,
            onentry: (i) => e.add(i),
          }).then((i) => Fp(e, t));
        e.add(r);
      }
      e.end();
    },
    k6 = (e, t) => {
      let r = new Vl.Sync(e);
      return Fb(r, t), r;
    },
    j6 = (e, t) => {
      let r = new Vl(e);
      return Fp(r, t), r;
    };
});
var Rp = y((MZ, Bb) => {
  "use strict";
  var U6 = ss(),
    Nb = Al(),
    Tt = require("fs"),
    Ib = Es(),
    Mb = Hl(),
    Lb = require("path"),
    qb = cs();
  Bb.exports = (e, t, r) => {
    let i = U6(e);
    if (!i.file) throw new TypeError("file is required");
    if (i.gzip) throw new TypeError("cannot append to compressed archives");
    if (!t || !Array.isArray(t) || !t.length)
      throw new TypeError("no files or directories specified");
    return (t = Array.from(t)), i.sync ? z6(i, t) : W6(i, t, r);
  };
  var z6 = (e, t) => {
      let r = new Nb.Sync(e),
        i = !0,
        n,
        s;
      try {
        try {
          n = Tt.openSync(e.file, "r+");
        } catch (u) {
          if (u.code === "ENOENT") n = Tt.openSync(e.file, "w+");
          else throw u;
        }
        let a = Tt.fstatSync(n),
          o = Buffer.alloc(512);
        e: for (s = 0; s < a.size; s += 512) {
          for (let f = 0, h = 0; f < 512; f += h) {
            if (
              ((h = Tt.readSync(n, o, f, o.length - f, s + f)),
              s === 0 && o[0] === 31 && o[1] === 139)
            )
              throw new Error("cannot append to compressed archives");
            if (!h) break e;
          }
          let u = new qb(o);
          if (!u.cksumValid) break;
          let l = 512 * Math.ceil(u.size / 512);
          if (s + l + 512 > a.size) break;
          (s += l), e.mtimeCache && e.mtimeCache.set(u.path, u.mtime);
        }
        (i = !1), $6(e, r, s, n, t);
      } finally {
        if (i)
          try {
            Tt.closeSync(n);
          } catch {}
      }
    },
    $6 = (e, t, r, i, n) => {
      let s = new Ib.WriteStreamSync(e.file, { fd: i, start: r });
      t.pipe(s), G6(t, n);
    },
    W6 = (e, t, r) => {
      t = Array.from(t);
      let i = new Nb(e),
        n = (a, o, u) => {
          let l = (m, C) => {
              m ? Tt.close(a, (E) => u(m)) : u(null, C);
            },
            f = 0;
          if (o === 0) return l(null, 0);
          let h = 0,
            c = Buffer.alloc(512),
            d = (m, C) => {
              if (m) return l(m);
              if (((h += C), h < 512 && C))
                return Tt.read(a, c, h, c.length - h, f + h, d);
              if (f === 0 && c[0] === 31 && c[1] === 139)
                return l(new Error("cannot append to compressed archives"));
              if (h < 512) return l(null, f);
              let E = new qb(c);
              if (!E.cksumValid) return l(null, f);
              let O = 512 * Math.ceil(E.size / 512);
              if (f + O + 512 > o || ((f += O + 512), f >= o))
                return l(null, f);
              e.mtimeCache && e.mtimeCache.set(E.path, E.mtime),
                (h = 0),
                Tt.read(a, c, 0, 512, f, d);
            };
          Tt.read(a, c, 0, 512, f, d);
        },
        s = new Promise((a, o) => {
          i.on("error", o);
          let u = "r+",
            l = (f, h) => {
              if (f && f.code === "ENOENT" && u === "r+")
                return (u = "w+"), Tt.open(e.file, u, l);
              if (f) return o(f);
              Tt.fstat(h, (c, d) => {
                if (c) return Tt.close(h, () => o(c));
                n(h, d.size, (m, C) => {
                  if (m) return o(m);
                  let E = new Ib.WriteStream(e.file, { fd: h, start: C });
                  i.pipe(E), E.on("error", o), E.on("close", a), Pb(i, t);
                });
              });
            };
          Tt.open(e.file, u, l);
        });
      return r ? s.then(r, r) : s;
    },
    G6 = (e, t) => {
      t.forEach((r) => {
        r.charAt(0) === "@"
          ? Mb({
              file: Lb.resolve(e.cwd, r.slice(1)),
              sync: !0,
              noResume: !0,
              onentry: (i) => e.add(i),
            })
          : e.add(r);
      }),
        e.end();
    },
    Pb = (e, t) => {
      for (; t.length; ) {
        let r = t.shift();
        if (r.charAt(0) === "@")
          return Mb({
            file: Lb.resolve(e.cwd, r.slice(1)),
            noResume: !0,
            onentry: (i) => e.add(i),
          }).then((i) => Pb(e, t));
        e.add(r);
      }
      e.end();
    };
});
var jb = y((LZ, kb) => {
  "use strict";
  var H6 = ss(),
    V6 = Rp();
  kb.exports = (e, t, r) => {
    let i = H6(e);
    if (!i.file) throw new TypeError("file is required");
    if (i.gzip) throw new TypeError("cannot append to compressed archives");
    if (!t || !Array.isArray(t) || !t.length)
      throw new TypeError("no files or directories specified");
    return (t = Array.from(t)), Y6(i), V6(i, t, r);
  };
  var Y6 = (e) => {
    let t = e.filter;
    e.mtimeCache || (e.mtimeCache = new Map()),
      (e.filter = t
        ? (r, i) => t(r, i) && !(e.mtimeCache.get(r) > i.mtime)
        : (r, i) => !(e.mtimeCache.get(r) > i.mtime));
  };
});
var $b = y((qZ, zb) => {
  var { promisify: Ub } = require("util"),
    Di = require("fs"),
    X6 = (e) => {
      if (!e) e = { mode: 511, fs: Di };
      else if (typeof e == "object") e = { mode: 511, fs: Di, ...e };
      else if (typeof e == "number") e = { mode: e, fs: Di };
      else if (typeof e == "string") e = { mode: parseInt(e, 8), fs: Di };
      else throw new TypeError("invalid options argument");
      return (
        (e.mkdir = e.mkdir || e.fs.mkdir || Di.mkdir),
        (e.mkdirAsync = Ub(e.mkdir)),
        (e.stat = e.stat || e.fs.stat || Di.stat),
        (e.statAsync = Ub(e.stat)),
        (e.statSync = e.statSync || e.fs.statSync || Di.statSync),
        (e.mkdirSync = e.mkdirSync || e.fs.mkdirSync || Di.mkdirSync),
        e
      );
    };
  zb.exports = X6;
});
var Gb = y((PZ, Wb) => {
  var Z6 = process.env.__TESTING_MKDIRP_PLATFORM__ || process.platform,
    { resolve: K6, parse: Q6 } = require("path"),
    J6 = (e) => {
      if (/\0/.test(e))
        throw Object.assign(
          new TypeError("path must be a string without null bytes"),
          { path: e, code: "ERR_INVALID_ARG_VALUE" },
        );
      if (((e = K6(e)), Z6 === "win32")) {
        let t = /[*|"<>?:]/,
          { root: r } = Q6(e);
        if (t.test(e.substr(r.length)))
          throw Object.assign(new Error("Illegal characters in path."), {
            path: e,
            code: "EINVAL",
          });
      }
      return e;
    };
  Wb.exports = J6;
});
var Zb = y((BZ, Xb) => {
  var { dirname: Hb } = require("path"),
    Vb = (e, t, r = void 0) =>
      r === t
        ? Promise.resolve()
        : e.statAsync(t).then(
            (i) => (i.isDirectory() ? r : void 0),
            (i) => (i.code === "ENOENT" ? Vb(e, Hb(t), t) : void 0),
          ),
    Yb = (e, t, r = void 0) => {
      if (r !== t)
        try {
          return e.statSync(t).isDirectory() ? r : void 0;
        } catch (i) {
          return i.code === "ENOENT" ? Yb(e, Hb(t), t) : void 0;
        }
    };
  Xb.exports = { findMade: Vb, findMadeSync: Yb };
});
var Ip = y((kZ, Qb) => {
  var { dirname: Kb } = require("path"),
    Ap = (e, t, r) => {
      t.recursive = !1;
      let i = Kb(e);
      return i === e
        ? t.mkdirAsync(e, t).catch((n) => {
            if (n.code !== "EISDIR") throw n;
          })
        : t.mkdirAsync(e, t).then(
            () => r || e,
            (n) => {
              if (n.code === "ENOENT") return Ap(i, t).then((s) => Ap(e, t, s));
              if (n.code !== "EEXIST" && n.code !== "EROFS") throw n;
              return t.statAsync(e).then(
                (s) => {
                  if (s.isDirectory()) return r;
                  throw n;
                },
                () => {
                  throw n;
                },
              );
            },
          );
    },
    Np = (e, t, r) => {
      let i = Kb(e);
      if (((t.recursive = !1), i === e))
        try {
          return t.mkdirSync(e, t);
        } catch (n) {
          if (n.code !== "EISDIR") throw n;
          return;
        }
      try {
        return t.mkdirSync(e, t), r || e;
      } catch (n) {
        if (n.code === "ENOENT") return Np(e, t, Np(i, t, r));
        if (n.code !== "EEXIST" && n.code !== "EROFS") throw n;
        try {
          if (!t.statSync(e).isDirectory()) throw n;
        } catch {
          throw n;
        }
      }
    };
  Qb.exports = { mkdirpManual: Ap, mkdirpManualSync: Np };
});
var tE = y((jZ, eE) => {
  var { dirname: Jb } = require("path"),
    { findMade: eq, findMadeSync: tq } = Zb(),
    { mkdirpManual: rq, mkdirpManualSync: iq } = Ip(),
    nq = (e, t) => (
      (t.recursive = !0),
      Jb(e) === e
        ? t.mkdirAsync(e, t)
        : eq(t, e).then((i) =>
            t
              .mkdirAsync(e, t)
              .then(() => i)
              .catch((n) => {
                if (n.code === "ENOENT") return rq(e, t);
                throw n;
              }),
          )
    ),
    sq = (e, t) => {
      if (((t.recursive = !0), Jb(e) === e)) return t.mkdirSync(e, t);
      let i = tq(t, e);
      try {
        return t.mkdirSync(e, t), i;
      } catch (n) {
        if (n.code === "ENOENT") return iq(e, t);
        throw n;
      }
    };
  eE.exports = { mkdirpNative: nq, mkdirpNativeSync: sq };
});
var sE = y((UZ, nE) => {
  var rE = require("fs"),
    aq = process.env.__TESTING_MKDIRP_NODE_VERSION__ || process.version,
    Mp = aq.replace(/^v/, "").split("."),
    iE = +Mp[0] > 10 || (+Mp[0] == 10 && +Mp[1] >= 12),
    oq = iE ? (e) => e.mkdir === rE.mkdir : () => !1,
    uq = iE ? (e) => e.mkdirSync === rE.mkdirSync : () => !1;
  nE.exports = { useNative: oq, useNativeSync: uq };
});
var hE = y((zZ, fE) => {
  var Ss = $b(),
    xs = Gb(),
    { mkdirpNative: aE, mkdirpNativeSync: oE } = tE(),
    { mkdirpManual: uE, mkdirpManualSync: lE } = Ip(),
    { useNative: lq, useNativeSync: fq } = sE(),
    Cs = (e, t) => ((e = xs(e)), (t = Ss(t)), lq(t) ? aE(e, t) : uE(e, t)),
    hq = (e, t) => ((e = xs(e)), (t = Ss(t)), fq(t) ? oE(e, t) : lE(e, t));
  Cs.sync = hq;
  Cs.native = (e, t) => aE(xs(e), Ss(t));
  Cs.manual = (e, t) => uE(xs(e), Ss(t));
  Cs.nativeSync = (e, t) => oE(xs(e), Ss(t));
  Cs.manualSync = (e, t) => lE(xs(e), Ss(t));
  fE.exports = Cs;
});
var vE = y(($Z, yE) => {
  "use strict";
  var Gt = require("fs"),
    dn = require("path"),
    cq = Gt.lchown ? "lchown" : "chown",
    dq = Gt.lchownSync ? "lchownSync" : "chownSync",
    dE =
      Gt.lchown &&
      !process.version.match(/v1[1-9]+\./) &&
      !process.version.match(/v10\.[6-9]/),
    cE = (e, t, r) => {
      try {
        return Gt[dq](e, t, r);
      } catch (i) {
        if (i.code !== "ENOENT") throw i;
      }
    },
    pq = (e, t, r) => {
      try {
        return Gt.chownSync(e, t, r);
      } catch (i) {
        if (i.code !== "ENOENT") throw i;
      }
    },
    mq = dE
      ? (e, t, r, i) => (n) => {
          !n || n.code !== "EISDIR" ? i(n) : Gt.chown(e, t, r, i);
        }
      : (e, t, r, i) => i,
    Lp = dE
      ? (e, t, r) => {
          try {
            return cE(e, t, r);
          } catch (i) {
            if (i.code !== "EISDIR") throw i;
            pq(e, t, r);
          }
        }
      : (e, t, r) => cE(e, t, r),
    gq = process.version,
    pE = (e, t, r) => Gt.readdir(e, t, r),
    yq = (e, t) => Gt.readdirSync(e, t);
  /^v4\./.test(gq) && (pE = (e, t, r) => Gt.readdir(e, r));
  var Yl = (e, t, r, i) => {
      Gt[cq](
        e,
        t,
        r,
        mq(e, t, r, (n) => {
          i(n && n.code !== "ENOENT" ? n : null);
        }),
      );
    },
    mE = (e, t, r, i, n) => {
      if (typeof t == "string")
        return Gt.lstat(dn.resolve(e, t), (s, a) => {
          if (s) return n(s.code !== "ENOENT" ? s : null);
          (a.name = t), mE(e, a, r, i, n);
        });
      if (t.isDirectory())
        qp(dn.resolve(e, t.name), r, i, (s) => {
          if (s) return n(s);
          let a = dn.resolve(e, t.name);
          Yl(a, r, i, n);
        });
      else {
        let s = dn.resolve(e, t.name);
        Yl(s, r, i, n);
      }
    },
    qp = (e, t, r, i) => {
      pE(e, { withFileTypes: !0 }, (n, s) => {
        if (n) {
          if (n.code === "ENOENT") return i();
          if (n.code !== "ENOTDIR" && n.code !== "ENOTSUP") return i(n);
        }
        if (n || !s.length) return Yl(e, t, r, i);
        let a = s.length,
          o = null,
          u = (l) => {
            if (!o) {
              if (l) return i((o = l));
              if (--a === 0) return Yl(e, t, r, i);
            }
          };
        s.forEach((l) => mE(e, l, t, r, u));
      });
    },
    vq = (e, t, r, i) => {
      if (typeof t == "string")
        try {
          let n = Gt.lstatSync(dn.resolve(e, t));
          (n.name = t), (t = n);
        } catch (n) {
          if (n.code === "ENOENT") return;
          throw n;
        }
      t.isDirectory() && gE(dn.resolve(e, t.name), r, i),
        Lp(dn.resolve(e, t.name), r, i);
    },
    gE = (e, t, r) => {
      let i;
      try {
        i = yq(e, { withFileTypes: !0 });
      } catch (n) {
        if (n.code === "ENOENT") return;
        if (n.code === "ENOTDIR" || n.code === "ENOTSUP") return Lp(e, t, r);
        throw n;
      }
      return i && i.length && i.forEach((n) => vq(e, n, t, r)), Lp(e, t, r);
    };
  yE.exports = qp;
  qp.sync = gE;
});
var EE = y((WZ, Pp) => {
  "use strict";
  var wE = hE(),
    Ht = require("fs"),
    Xl = require("path"),
    DE = vE(),
    tr = fs(),
    Zl = class extends Error {
      constructor(t, r) {
        super("Cannot extract through symbolic link"),
          (this.path = r),
          (this.symlink = t);
      }
      get name() {
        return "SylinkError";
      }
    },
    Kl = class extends Error {
      constructor(t, r) {
        super(r + ": Cannot cd into '" + t + "'"),
          (this.path = t),
          (this.code = r);
      }
      get name() {
        return "CwdError";
      }
    },
    Ql = (e, t) => e.get(tr(t)),
    Ha = (e, t, r) => e.set(tr(t), r),
    wq = (e, t) => {
      Ht.stat(e, (r, i) => {
        (r || !i.isDirectory()) && (r = new Kl(e, (r && r.code) || "ENOTDIR")),
          t(r);
      });
    };
  Pp.exports = (e, t, r) => {
    e = tr(e);
    let i = t.umask,
      n = t.mode | 448,
      s = (n & i) !== 0,
      a = t.uid,
      o = t.gid,
      u =
        typeof a == "number" &&
        typeof o == "number" &&
        (a !== t.processUid || o !== t.processGid),
      l = t.preserve,
      f = t.unlink,
      h = t.cache,
      c = tr(t.cwd),
      d = (E, O) => {
        E
          ? r(E)
          : (Ha(h, e, !0),
            O && u ? DE(O, a, o, (L) => d(L)) : s ? Ht.chmod(e, n, r) : r());
      };
    if (h && Ql(h, e) === !0) return d();
    if (e === c) return wq(e, d);
    if (l) return wE(e, { mode: n }).then((E) => d(null, E), d);
    let C = tr(Xl.relative(c, e)).split("/");
    Jl(c, C, n, h, f, c, null, d);
  };
  var Jl = (e, t, r, i, n, s, a, o) => {
      if (!t.length) return o(null, a);
      let u = t.shift(),
        l = tr(Xl.resolve(e + "/" + u));
      if (Ql(i, l)) return Jl(l, t, r, i, n, s, a, o);
      Ht.mkdir(l, r, bE(l, t, r, i, n, s, a, o));
    },
    bE = (e, t, r, i, n, s, a, o) => (u) => {
      u
        ? Ht.lstat(e, (l, f) => {
            if (l) (l.path = l.path && tr(l.path)), o(l);
            else if (f.isDirectory()) Jl(e, t, r, i, n, s, a, o);
            else if (n)
              Ht.unlink(e, (h) => {
                if (h) return o(h);
                Ht.mkdir(e, r, bE(e, t, r, i, n, s, a, o));
              });
            else {
              if (f.isSymbolicLink())
                return o(new Zl(e, e + "/" + t.join("/")));
              o(u);
            }
          })
        : ((a = a || e), Jl(e, t, r, i, n, s, a, o));
    },
    Dq = (e) => {
      let t = !1,
        r = "ENOTDIR";
      try {
        t = Ht.statSync(e).isDirectory();
      } catch (i) {
        r = i.code;
      } finally {
        if (!t) throw new Kl(e, r);
      }
    };
  Pp.exports.sync = (e, t) => {
    e = tr(e);
    let r = t.umask,
      i = t.mode | 448,
      n = (i & r) !== 0,
      s = t.uid,
      a = t.gid,
      o =
        typeof s == "number" &&
        typeof a == "number" &&
        (s !== t.processUid || a !== t.processGid),
      u = t.preserve,
      l = t.unlink,
      f = t.cache,
      h = tr(t.cwd),
      c = (E) => {
        Ha(f, e, !0), E && o && DE.sync(E, s, a), n && Ht.chmodSync(e, i);
      };
    if (f && Ql(f, e) === !0) return c();
    if (e === h) return Dq(h), c();
    if (u) return c(wE.sync(e, i));
    let m = tr(Xl.relative(h, e)).split("/"),
      C = null;
    for (let E = m.shift(), O = h; E && (O += "/" + E); E = m.shift())
      if (((O = tr(Xl.resolve(O))), !Ql(f, O)))
        try {
          Ht.mkdirSync(O, i), (C = C || O), Ha(f, O, !0);
        } catch {
          let D = Ht.lstatSync(O);
          if (D.isDirectory()) {
            Ha(f, O, !0);
            continue;
          } else if (l) {
            Ht.unlinkSync(O), Ht.mkdirSync(O, i), (C = C || O), Ha(f, O, !0);
            continue;
          } else if (D.isSymbolicLink())
            return new Zl(O, O + "/" + m.join("/"));
        }
    return c(C);
  };
});
var kp = y((GZ, _E) => {
  var Bp = Object.create(null),
    { hasOwnProperty: bq } = Object.prototype;
  _E.exports = (e) => (bq.call(Bp, e) || (Bp[e] = e.normalize("NFKD")), Bp[e]);
});
var OE = y((HZ, CE) => {
  var SE = require("assert"),
    Eq = kp(),
    _q = ds(),
    { join: xE } = require("path"),
    Sq = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform,
    xq = Sq === "win32";
  CE.exports = () => {
    let e = new Map(),
      t = new Map(),
      r = (l) =>
        l
          .split("/")
          .slice(0, -1)
          .reduce(
            (h, c) => (
              h.length && (c = xE(h[h.length - 1], c)), h.push(c || "/"), h
            ),
            [],
          ),
      i = new Set(),
      n = (l) => {
        let f = t.get(l);
        if (!f) throw new Error("function does not have any path reservations");
        return {
          paths: f.paths.map((h) => e.get(h)),
          dirs: [...f.dirs].map((h) => e.get(h)),
        };
      },
      s = (l) => {
        let { paths: f, dirs: h } = n(l);
        return (
          f.every((c) => c[0] === l) &&
          h.every((c) => c[0] instanceof Set && c[0].has(l))
        );
      },
      a = (l) => (i.has(l) || !s(l) ? !1 : (i.add(l), l(() => o(l)), !0)),
      o = (l) => {
        if (!i.has(l)) return !1;
        let { paths: f, dirs: h } = t.get(l),
          c = new Set();
        return (
          f.forEach((d) => {
            let m = e.get(d);
            SE.equal(m[0], l),
              m.length === 1
                ? e.delete(d)
                : (m.shift(),
                  typeof m[0] == "function"
                    ? c.add(m[0])
                    : m[0].forEach((C) => c.add(C)));
          }),
          h.forEach((d) => {
            let m = e.get(d);
            SE(m[0] instanceof Set),
              m[0].size === 1 && m.length === 1
                ? e.delete(d)
                : m[0].size === 1
                ? (m.shift(), c.add(m[0]))
                : m[0].delete(l);
          }),
          i.delete(l),
          c.forEach((d) => a(d)),
          !0
        );
      };
    return {
      check: s,
      reserve: (l, f) => {
        l = xq
          ? ["win32 parallelization disabled"]
          : l.map((c) => Eq(_q(xE(c))).toLowerCase());
        let h = new Set(l.map((c) => r(c)).reduce((c, d) => c.concat(d)));
        return (
          t.set(f, { dirs: h, paths: l }),
          l.forEach((c) => {
            let d = e.get(c);
            d ? d.push(f) : e.set(c, [f]);
          }),
          h.forEach((c) => {
            let d = e.get(c);
            d
              ? d[d.length - 1] instanceof Set
                ? d[d.length - 1].add(f)
                : d.push(new Set([f]))
              : e.set(c, [new Set([f])]);
          }),
          a(f)
        );
      },
    };
  };
});
var RE = y((VZ, FE) => {
  var Cq = process.env.__FAKE_PLATFORM__ || process.platform,
    Oq = Cq === "win32",
    Tq = global.__FAKE_TESTING_FS__ || require("fs"),
    {
      O_CREAT: Fq,
      O_TRUNC: Rq,
      O_WRONLY: Aq,
      UV_FS_O_FILEMAP: TE = 0,
    } = Tq.constants,
    Nq = Oq && !!TE,
    Iq = 512 * 1024,
    Mq = TE | Rq | Fq | Aq;
  FE.exports = Nq ? (e) => (e < Iq ? Mq : "w") : () => "w";
});
var Yp = y((YZ, WE) => {
  "use strict";
  var Lq = require("assert"),
    qq = Gl(),
    he = require("fs"),
    Pq = Es(),
    jr = require("path"),
    UE = EE(),
    AE = Vd(),
    Bq = OE(),
    kq = Yd(),
    Ft = fs(),
    jq = ds(),
    Uq = kp(),
    NE = Symbol("onEntry"),
    zp = Symbol("checkFs"),
    IE = Symbol("checkFs2"),
    rf = Symbol("pruneCache"),
    $p = Symbol("isReusable"),
    Vt = Symbol("makeFs"),
    Wp = Symbol("file"),
    Gp = Symbol("directory"),
    nf = Symbol("link"),
    ME = Symbol("symlink"),
    LE = Symbol("hardlink"),
    qE = Symbol("unsupported"),
    PE = Symbol("checkPath"),
    bi = Symbol("mkdir"),
    st = Symbol("onError"),
    ef = Symbol("pending"),
    BE = Symbol("pend"),
    Os = Symbol("unpend"),
    jp = Symbol("ended"),
    Up = Symbol("maybeClose"),
    Hp = Symbol("skip"),
    Va = Symbol("doChown"),
    Ya = Symbol("uid"),
    Xa = Symbol("gid"),
    Za = Symbol("checkedCwd"),
    zE = require("crypto"),
    $E = RE(),
    zq = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform,
    Ka = zq === "win32",
    $q = (e, t) => {
      if (!Ka) return he.unlink(e, t);
      let r = e + ".DELETE." + zE.randomBytes(16).toString("hex");
      he.rename(e, r, (i) => {
        if (i) return t(i);
        he.unlink(r, t);
      });
    },
    Wq = (e) => {
      if (!Ka) return he.unlinkSync(e);
      let t = e + ".DELETE." + zE.randomBytes(16).toString("hex");
      he.renameSync(e, t), he.unlinkSync(t);
    },
    kE = (e, t, r) => (e === e >>> 0 ? e : t === t >>> 0 ? t : r),
    jE = (e) => Uq(jq(Ft(e))).toLowerCase(),
    Gq = (e, t) => {
      t = jE(t);
      for (let r of e.keys()) {
        let i = jE(r);
        (i === t || i.indexOf(t + "/") === 0) && e.delete(r);
      }
    },
    Hq = (e) => {
      for (let t of e.keys()) e.delete(t);
    },
    Qa = class extends qq {
      constructor(t) {
        if (
          (t || (t = {}),
          (t.ondone = (r) => {
            (this[jp] = !0), this[Up]();
          }),
          super(t),
          (this[Za] = !1),
          (this.reservations = Bq()),
          (this.transform =
            typeof t.transform == "function" ? t.transform : null),
          (this.writable = !0),
          (this.readable = !1),
          (this[ef] = 0),
          (this[jp] = !1),
          (this.dirCache = t.dirCache || new Map()),
          typeof t.uid == "number" || typeof t.gid == "number")
        ) {
          if (typeof t.uid != "number" || typeof t.gid != "number")
            throw new TypeError("cannot set owner without number uid and gid");
          if (t.preserveOwner)
            throw new TypeError(
              "cannot preserve owner in archive and also set owner explicitly",
            );
          (this.uid = t.uid), (this.gid = t.gid), (this.setOwner = !0);
        } else (this.uid = null), (this.gid = null), (this.setOwner = !1);
        t.preserveOwner === void 0 && typeof t.uid != "number"
          ? (this.preserveOwner = process.getuid && process.getuid() === 0)
          : (this.preserveOwner = !!t.preserveOwner),
          (this.processUid =
            (this.preserveOwner || this.setOwner) && process.getuid
              ? process.getuid()
              : null),
          (this.processGid =
            (this.preserveOwner || this.setOwner) && process.getgid
              ? process.getgid()
              : null),
          (this.forceChown = t.forceChown === !0),
          (this.win32 = !!t.win32 || Ka),
          (this.newer = !!t.newer),
          (this.keep = !!t.keep),
          (this.noMtime = !!t.noMtime),
          (this.preservePaths = !!t.preservePaths),
          (this.unlink = !!t.unlink),
          (this.cwd = Ft(jr.resolve(t.cwd || process.cwd()))),
          (this.strip = +t.strip || 0),
          (this.processUmask = t.noChmod ? 0 : process.umask()),
          (this.umask =
            typeof t.umask == "number" ? t.umask : this.processUmask),
          (this.dmode = t.dmode || 511 & ~this.umask),
          (this.fmode = t.fmode || 438 & ~this.umask),
          this.on("entry", (r) => this[NE](r));
      }
      warn(t, r, i = {}) {
        return (
          (t === "TAR_BAD_ARCHIVE" || t === "TAR_ABORT") &&
            (i.recoverable = !1),
          super.warn(t, r, i)
        );
      }
      [Up]() {
        this[jp] &&
          this[ef] === 0 &&
          (this.emit("prefinish"), this.emit("finish"), this.emit("end"));
      }
      [PE](t) {
        if (this.strip) {
          let r = Ft(t.path).split("/");
          if (r.length < this.strip) return !1;
          if (((t.path = r.slice(this.strip).join("/")), t.type === "Link")) {
            let i = Ft(t.linkpath).split("/");
            if (i.length >= this.strip)
              t.linkpath = i.slice(this.strip).join("/");
            else return !1;
          }
        }
        if (!this.preservePaths) {
          let r = Ft(t.path),
            i = r.split("/");
          if (i.includes("..") || (Ka && /^[a-z]:\.\.$/i.test(i[0])))
            return (
              this.warn("TAR_ENTRY_ERROR", "path contains '..'", {
                entry: t,
                path: r,
              }),
              !1
            );
          let [n, s] = kq(r);
          n &&
            ((t.path = s),
            this.warn("TAR_ENTRY_INFO", `stripping ${n} from absolute path`, {
              entry: t,
              path: r,
            }));
        }
        if (
          (jr.isAbsolute(t.path)
            ? (t.absolute = Ft(jr.resolve(t.path)))
            : (t.absolute = Ft(jr.resolve(this.cwd, t.path))),
          !this.preservePaths &&
            t.absolute.indexOf(this.cwd + "/") !== 0 &&
            t.absolute !== this.cwd)
        )
          return (
            this.warn("TAR_ENTRY_ERROR", "path escaped extraction target", {
              entry: t,
              path: Ft(t.path),
              resolvedPath: t.absolute,
              cwd: this.cwd,
            }),
            !1
          );
        if (
          t.absolute === this.cwd &&
          t.type !== "Directory" &&
          t.type !== "GNUDumpDir"
        )
          return !1;
        if (this.win32) {
          let { root: r } = jr.win32.parse(t.absolute);
          t.absolute = r + AE.encode(t.absolute.slice(r.length));
          let { root: i } = jr.win32.parse(t.path);
          t.path = i + AE.encode(t.path.slice(i.length));
        }
        return !0;
      }
      [NE](t) {
        if (!this[PE](t)) return t.resume();
        switch ((Lq.equal(typeof t.absolute, "string"), t.type)) {
          case "Directory":
          case "GNUDumpDir":
            t.mode && (t.mode = t.mode | 448);
          case "File":
          case "OldFile":
          case "ContiguousFile":
          case "Link":
          case "SymbolicLink":
            return this[zp](t);
          case "CharacterDevice":
          case "BlockDevice":
          case "FIFO":
          default:
            return this[qE](t);
        }
      }
      [st](t, r) {
        t.name === "CwdError"
          ? this.emit("error", t)
          : (this.warn("TAR_ENTRY_ERROR", t, { entry: r }),
            this[Os](),
            r.resume());
      }
      [bi](t, r, i) {
        UE(
          Ft(t),
          {
            uid: this.uid,
            gid: this.gid,
            processUid: this.processUid,
            processGid: this.processGid,
            umask: this.processUmask,
            preserve: this.preservePaths,
            unlink: this.unlink,
            cache: this.dirCache,
            cwd: this.cwd,
            mode: r,
            noChmod: this.noChmod,
          },
          i,
        );
      }
      [Va](t) {
        return (
          this.forceChown ||
          (this.preserveOwner &&
            ((typeof t.uid == "number" && t.uid !== this.processUid) ||
              (typeof t.gid == "number" && t.gid !== this.processGid))) ||
          (typeof this.uid == "number" && this.uid !== this.processUid) ||
          (typeof this.gid == "number" && this.gid !== this.processGid)
        );
      }
      [Ya](t) {
        return kE(this.uid, t.uid, this.processUid);
      }
      [Xa](t) {
        return kE(this.gid, t.gid, this.processGid);
      }
      [Wp](t, r) {
        let i = t.mode & 4095 || this.fmode,
          n = new Pq.WriteStream(t.absolute, {
            flags: $E(t.size),
            mode: i,
            autoClose: !1,
          });
        n.on("error", (u) => {
          n.fd && he.close(n.fd, () => {}),
            (n.write = () => !0),
            this[st](u, t),
            r();
        });
        let s = 1,
          a = (u) => {
            if (u) {
              n.fd && he.close(n.fd, () => {}), this[st](u, t), r();
              return;
            }
            --s === 0 &&
              he.close(n.fd, (l) => {
                l ? this[st](l, t) : this[Os](), r();
              });
          };
        n.on("finish", (u) => {
          let l = t.absolute,
            f = n.fd;
          if (t.mtime && !this.noMtime) {
            s++;
            let h = t.atime || new Date(),
              c = t.mtime;
            he.futimes(f, h, c, (d) =>
              d ? he.utimes(l, h, c, (m) => a(m && d)) : a(),
            );
          }
          if (this[Va](t)) {
            s++;
            let h = this[Ya](t),
              c = this[Xa](t);
            he.fchown(f, h, c, (d) =>
              d ? he.chown(l, h, c, (m) => a(m && d)) : a(),
            );
          }
          a();
        });
        let o = (this.transform && this.transform(t)) || t;
        o !== t &&
          (o.on("error", (u) => {
            this[st](u, t), r();
          }),
          t.pipe(o)),
          o.pipe(n);
      }
      [Gp](t, r) {
        let i = t.mode & 4095 || this.dmode;
        this[bi](t.absolute, i, (n) => {
          if (n) {
            this[st](n, t), r();
            return;
          }
          let s = 1,
            a = (o) => {
              --s === 0 && (r(), this[Os](), t.resume());
            };
          t.mtime &&
            !this.noMtime &&
            (s++, he.utimes(t.absolute, t.atime || new Date(), t.mtime, a)),
            this[Va](t) &&
              (s++, he.chown(t.absolute, this[Ya](t), this[Xa](t), a)),
            a();
        });
      }
      [qE](t) {
        (t.unsupported = !0),
          this.warn(
            "TAR_ENTRY_UNSUPPORTED",
            `unsupported entry type: ${t.type}`,
            { entry: t },
          ),
          t.resume();
      }
      [ME](t, r) {
        this[nf](t, t.linkpath, "symlink", r);
      }
      [LE](t, r) {
        let i = Ft(jr.resolve(this.cwd, t.linkpath));
        this[nf](t, i, "link", r);
      }
      [BE]() {
        this[ef]++;
      }
      [Os]() {
        this[ef]--, this[Up]();
      }
      [Hp](t) {
        this[Os](), t.resume();
      }
      [$p](t, r) {
        return (
          t.type === "File" && !this.unlink && r.isFile() && r.nlink <= 1 && !Ka
        );
      }
      [zp](t) {
        this[BE]();
        let r = [t.path];
        t.linkpath && r.push(t.linkpath),
          this.reservations.reserve(r, (i) => this[IE](t, i));
      }
      [rf](t) {
        t.type === "SymbolicLink"
          ? Hq(this.dirCache)
          : t.type !== "Directory" && Gq(this.dirCache, t.absolute);
      }
      [IE](t, r) {
        this[rf](t);
        let i = (o) => {
            this[rf](t), r(o);
          },
          n = () => {
            this[bi](this.cwd, this.dmode, (o) => {
              if (o) {
                this[st](o, t), i();
                return;
              }
              (this[Za] = !0), s();
            });
          },
          s = () => {
            if (t.absolute !== this.cwd) {
              let o = Ft(jr.dirname(t.absolute));
              if (o !== this.cwd)
                return this[bi](o, this.dmode, (u) => {
                  if (u) {
                    this[st](u, t), i();
                    return;
                  }
                  a();
                });
            }
            a();
          },
          a = () => {
            he.lstat(t.absolute, (o, u) => {
              if (u && (this.keep || (this.newer && u.mtime > t.mtime))) {
                this[Hp](t), i();
                return;
              }
              if (o || this[$p](t, u)) return this[Vt](null, t, i);
              if (u.isDirectory()) {
                if (t.type === "Directory") {
                  let l = !this.noChmod && t.mode && (u.mode & 4095) !== t.mode,
                    f = (h) => this[Vt](h, t, i);
                  return l ? he.chmod(t.absolute, t.mode, f) : f();
                }
                if (t.absolute !== this.cwd)
                  return he.rmdir(t.absolute, (l) => this[Vt](l, t, i));
              }
              if (t.absolute === this.cwd) return this[Vt](null, t, i);
              $q(t.absolute, (l) => this[Vt](l, t, i));
            });
          };
        this[Za] ? s() : n();
      }
      [Vt](t, r, i) {
        if (t) {
          this[st](t, r), i();
          return;
        }
        switch (r.type) {
          case "File":
          case "OldFile":
          case "ContiguousFile":
            return this[Wp](r, i);
          case "Link":
            return this[LE](r, i);
          case "SymbolicLink":
            return this[ME](r, i);
          case "Directory":
          case "GNUDumpDir":
            return this[Gp](r, i);
        }
      }
      [nf](t, r, i, n) {
        he[i](r, t.absolute, (s) => {
          s ? this[st](s, t) : (this[Os](), t.resume()), n();
        });
      }
    },
    tf = (e) => {
      try {
        return [null, e()];
      } catch (t) {
        return [t, null];
      }
    },
    Vp = class extends Qa {
      [Vt](t, r) {
        return super[Vt](t, r, () => {});
      }
      [zp](t) {
        if ((this[rf](t), !this[Za])) {
          let s = this[bi](this.cwd, this.dmode);
          if (s) return this[st](s, t);
          this[Za] = !0;
        }
        if (t.absolute !== this.cwd) {
          let s = Ft(jr.dirname(t.absolute));
          if (s !== this.cwd) {
            let a = this[bi](s, this.dmode);
            if (a) return this[st](a, t);
          }
        }
        let [r, i] = tf(() => he.lstatSync(t.absolute));
        if (i && (this.keep || (this.newer && i.mtime > t.mtime)))
          return this[Hp](t);
        if (r || this[$p](t, i)) return this[Vt](null, t);
        if (i.isDirectory()) {
          if (t.type === "Directory") {
            let a = !this.noChmod && t.mode && (i.mode & 4095) !== t.mode,
              [o] = a
                ? tf(() => {
                    he.chmodSync(t.absolute, t.mode);
                  })
                : [];
            return this[Vt](o, t);
          }
          let [s] = tf(() => he.rmdirSync(t.absolute));
          this[Vt](s, t);
        }
        let [n] = t.absolute === this.cwd ? [] : tf(() => Wq(t.absolute));
        this[Vt](n, t);
      }
      [Wp](t, r) {
        let i = t.mode & 4095 || this.fmode,
          n = (o) => {
            let u;
            try {
              he.closeSync(s);
            } catch (l) {
              u = l;
            }
            (o || u) && this[st](o || u, t), r();
          },
          s;
        try {
          s = he.openSync(t.absolute, $E(t.size), i);
        } catch (o) {
          return n(o);
        }
        let a = (this.transform && this.transform(t)) || t;
        a !== t && (a.on("error", (o) => this[st](o, t)), t.pipe(a)),
          a.on("data", (o) => {
            try {
              he.writeSync(s, o, 0, o.length);
            } catch (u) {
              n(u);
            }
          }),
          a.on("end", (o) => {
            let u = null;
            if (t.mtime && !this.noMtime) {
              let l = t.atime || new Date(),
                f = t.mtime;
              try {
                he.futimesSync(s, l, f);
              } catch (h) {
                try {
                  he.utimesSync(t.absolute, l, f);
                } catch {
                  u = h;
                }
              }
            }
            if (this[Va](t)) {
              let l = this[Ya](t),
                f = this[Xa](t);
              try {
                he.fchownSync(s, l, f);
              } catch (h) {
                try {
                  he.chownSync(t.absolute, l, f);
                } catch {
                  u = u || h;
                }
              }
            }
            n(u);
          });
      }
      [Gp](t, r) {
        let i = t.mode & 4095 || this.dmode,
          n = this[bi](t.absolute, i);
        if (n) {
          this[st](n, t), r();
          return;
        }
        if (t.mtime && !this.noMtime)
          try {
            he.utimesSync(t.absolute, t.atime || new Date(), t.mtime);
          } catch {}
        if (this[Va](t))
          try {
            he.chownSync(t.absolute, this[Ya](t), this[Xa](t));
          } catch {}
        r(), t.resume();
      }
      [bi](t, r) {
        try {
          return UE.sync(Ft(t), {
            uid: this.uid,
            gid: this.gid,
            processUid: this.processUid,
            processGid: this.processGid,
            umask: this.processUmask,
            preserve: this.preservePaths,
            unlink: this.unlink,
            cache: this.dirCache,
            cwd: this.cwd,
            mode: r,
          });
        } catch (i) {
          return i;
        }
      }
      [nf](t, r, i, n) {
        try {
          he[i + "Sync"](r, t.absolute), n(), t.resume();
        } catch (s) {
          return this[st](s, t);
        }
      }
    };
  Qa.Sync = Vp;
  WE.exports = Qa;
});
var XE = y((XZ, YE) => {
  "use strict";
  var Vq = ss(),
    sf = Yp(),
    HE = require("fs"),
    VE = Es(),
    GE = require("path"),
    Xp = ds();
  YE.exports = (e, t, r) => {
    typeof e == "function"
      ? ((r = e), (t = null), (e = {}))
      : Array.isArray(e) && ((t = e), (e = {})),
      typeof t == "function" && ((r = t), (t = null)),
      t ? (t = Array.from(t)) : (t = []);
    let i = Vq(e);
    if (i.sync && typeof r == "function")
      throw new TypeError("callback not supported for sync tar functions");
    if (!i.file && typeof r == "function")
      throw new TypeError("callback only supported with file option");
    return (
      t.length && Yq(i, t),
      i.file && i.sync ? Xq(i) : i.file ? Zq(i, r) : i.sync ? Kq(i) : Qq(i)
    );
  };
  var Yq = (e, t) => {
      let r = new Map(t.map((s) => [Xp(s), !0])),
        i = e.filter,
        n = (s, a) => {
          let o = a || GE.parse(s).root || ".",
            u = s === o ? !1 : r.has(s) ? r.get(s) : n(GE.dirname(s), o);
          return r.set(s, u), u;
        };
      e.filter = i ? (s, a) => i(s, a) && n(Xp(s)) : (s) => n(Xp(s));
    },
    Xq = (e) => {
      let t = new sf.Sync(e),
        r = e.file,
        i = HE.statSync(r),
        n = e.maxReadSize || 16 * 1024 * 1024;
      new VE.ReadStreamSync(r, { readSize: n, size: i.size }).pipe(t);
    },
    Zq = (e, t) => {
      let r = new sf(e),
        i = e.maxReadSize || 16 * 1024 * 1024,
        n = e.file,
        s = new Promise((a, o) => {
          r.on("error", o),
            r.on("close", a),
            HE.stat(n, (u, l) => {
              if (u) o(u);
              else {
                let f = new VE.ReadStream(n, { readSize: i, size: l.size });
                f.on("error", o), f.pipe(r);
              }
            });
        });
      return t ? s.then(t, t) : s;
    },
    Kq = (e) => new sf.Sync(e),
    Qq = (e) => new sf(e);
});
var ZE = y((ke) => {
  "use strict";
  ke.c = ke.create = Ab();
  ke.r = ke.replace = Rp();
  ke.t = ke.list = Hl();
  ke.u = ke.update = jb();
  ke.x = ke.extract = XE();
  ke.Pack = Al();
  ke.Unpack = Yp();
  ke.Parse = Gl();
  ke.ReadEntry = pl();
  ke.WriteEntry = np();
  ke.Header = cs();
  ke.Pax = gl();
  ke.types = jd();
});
var n_ = y((iK, i_) => {
  var Qp = class {
    constructor(t, r, i) {
      (this.etaBufferLength = t || 100),
        (this.valueBuffer = [i]),
        (this.timeBuffer = [r]),
        (this.eta = "0");
    }
    update(t, r, i) {
      this.valueBuffer.push(r), this.timeBuffer.push(t), this.calculate(i - r);
    }
    getTime() {
      return this.eta;
    }
    calculate(t) {
      let r = this.valueBuffer.length,
        i = Math.min(this.etaBufferLength, r),
        n = this.valueBuffer[r - 1] - this.valueBuffer[r - i],
        s = this.timeBuffer[r - 1] - this.timeBuffer[r - i],
        a = n / s;
      (this.valueBuffer = this.valueBuffer.slice(-this.etaBufferLength)),
        (this.timeBuffer = this.timeBuffer.slice(-this.etaBufferLength));
      let o = Math.ceil(t / a / 1e3);
      isNaN(o)
        ? (this.eta = "NULL")
        : isFinite(o)
        ? o > 1e7
          ? (this.eta = "INF")
          : o < 0
          ? (this.eta = 0)
          : (this.eta = o)
        : (this.eta = "INF");
    }
  };
  i_.exports = Qp;
});
var em = y((nK, s_) => {
  var pn = require("readline"),
    Jp = class {
      constructor(t) {
        (this.stream = t), (this.linewrap = !0), (this.dy = 0);
      }
      cursorSave() {
        !this.stream.isTTY || this.stream.write("\x1B7");
      }
      cursorRestore() {
        !this.stream.isTTY || this.stream.write("\x1B8");
      }
      cursor(t) {
        !this.stream.isTTY ||
          (t ? this.stream.write("\x1B[?25h") : this.stream.write("\x1B[?25l"));
      }
      cursorTo(t = null, r = null) {
        !this.stream.isTTY || pn.cursorTo(this.stream, t, r);
      }
      cursorRelative(t = null, r = null) {
        !this.stream.isTTY ||
          ((this.dy = this.dy + r), pn.moveCursor(this.stream, t, r));
      }
      cursorRelativeReset() {
        !this.stream.isTTY ||
          (pn.moveCursor(this.stream, 0, -this.dy),
          pn.cursorTo(this.stream, 0, null),
          (this.dy = 0));
      }
      clearRight() {
        !this.stream.isTTY || pn.clearLine(this.stream, 1);
      }
      clearLine() {
        !this.stream.isTTY || pn.clearLine(this.stream, 0);
      }
      clearBottom() {
        !this.stream.isTTY || pn.clearScreenDown(this.stream);
      }
      newline() {
        this.stream.write(`
`),
          this.dy++;
      }
      write(t, r = !1) {
        this.linewrap === !0 && r === !1
          ? this.stream.write(t.substr(0, this.getWidth()))
          : this.stream.write(t);
      }
      lineWrapping(t) {
        !this.stream.isTTY ||
          ((this.linewrap = t),
          t ? this.stream.write("\x1B[?7h") : this.stream.write("\x1B[?7l"));
      }
      isTTY() {
        return this.stream.isTTY === !0;
      }
      getWidth() {
        return this.stream.columns || (this.stream.isTTY ? 80 : 200);
      }
    };
  s_.exports = Jp;
});
var o_ = y((sK, a_) => {
  "use strict";
  a_.exports = ({ onlyFirst: e = !1 } = {}) => {
    let t = [
      "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
      "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
    ].join("|");
    return new RegExp(t, e ? void 0 : "g");
  };
});
var l_ = y((aK, u_) => {
  "use strict";
  var Jq = o_();
  u_.exports = (e) => (typeof e == "string" ? e.replace(Jq(), "") : e);
});
var h_ = y((oK, tm) => {
  "use strict";
  var f_ = (e) =>
    Number.isNaN(e)
      ? !1
      : e >= 4352 &&
        (e <= 4447 ||
          e === 9001 ||
          e === 9002 ||
          (11904 <= e && e <= 12871 && e !== 12351) ||
          (12880 <= e && e <= 19903) ||
          (19968 <= e && e <= 42182) ||
          (43360 <= e && e <= 43388) ||
          (44032 <= e && e <= 55203) ||
          (63744 <= e && e <= 64255) ||
          (65040 <= e && e <= 65049) ||
          (65072 <= e && e <= 65131) ||
          (65281 <= e && e <= 65376) ||
          (65504 <= e && e <= 65510) ||
          (110592 <= e && e <= 110593) ||
          (127488 <= e && e <= 127569) ||
          (131072 <= e && e <= 262141));
  tm.exports = f_;
  tm.exports.default = f_;
});
var d_ = y((uK, c_) => {
  "use strict";
  c_.exports = function () {
    return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
  };
});
var m_ = y((lK, rm) => {
  "use strict";
  var e8 = l_(),
    t8 = h_(),
    r8 = d_(),
    p_ = (e) => {
      if (
        typeof e != "string" ||
        e.length === 0 ||
        ((e = e8(e)), e.length === 0)
      )
        return 0;
      e = e.replace(r8(), "  ");
      let t = 0;
      for (let r = 0; r < e.length; r++) {
        let i = e.codePointAt(r);
        i <= 31 ||
          (i >= 127 && i <= 159) ||
          (i >= 768 && i <= 879) ||
          (i > 65535 && r++, (t += t8(i) ? 2 : 1));
      }
      return t;
    };
  rm.exports = p_;
  rm.exports.default = p_;
});
var im = y((fK, g_) => {
  g_.exports = function (t, r, i) {
    if (r.autopadding !== !0) return t;
    function n(s, a) {
      return (r.autopaddingChar + s).slice(-a);
    }
    switch (i) {
      case "percentage":
        return n(t, 3);
      default:
        return t;
    }
  };
});
var nm = y((hK, y_) => {
  y_.exports = function (t, r) {
    let i = Math.round(t * r.barsize),
      n = r.barsize - i;
    return (
      r.barCompleteString.substr(0, i) +
      r.barGlue +
      r.barIncompleteString.substr(0, n)
    );
  };
});
var sm = y((cK, v_) => {
  v_.exports = function (t, r, i) {
    function n(a) {
      return i ? i * Math.round(a / i) : a;
    }
    function s(a) {
      return (r.autopaddingChar + a).slice(-2);
    }
    return t > 3600
      ? s(Math.floor(t / 3600)) + "h" + s(n((t % 3600) / 60)) + "m"
      : t > 60
      ? s(Math.floor(t / 60)) + "m" + s(n(t % 60)) + "s"
      : t > 10
      ? s(n(t)) + "s"
      : s(t) + "s";
  };
});
var am = y((dK, w_) => {
  var i8 = m_(),
    n8 = im(),
    s8 = nm(),
    a8 = sm();
  w_.exports = function (t, r, i) {
    let n = t.format,
      s = t.formatTime || a8,
      a = t.formatValue || n8,
      o = t.formatBar || s8,
      u = Math.floor(r.progress * 100) + "",
      l = r.stopTime || Date.now(),
      f = Math.round((l - r.startTime) / 1e3),
      h = Object.assign({}, i, {
        bar: o(r.progress, t),
        percentage: a(u, t, "percentage"),
        total: a(r.total, t, "total"),
        value: a(r.value, t, "value"),
        eta: a(r.eta, t, "eta"),
        eta_formatted: s(r.eta, t, 5),
        duration: a(f, t, "duration"),
        duration_formatted: s(f, t, 1),
      });
    n = n.replace(/\{(\w+)\}/g, function (m, C) {
      return typeof h[C] < "u" ? h[C] : m;
    });
    let c = Math.max(0, r.maxWidth - i8(n) - 2),
      d = Math.floor(c / 2);
    switch (t.align) {
      case "right":
        n = c > 0 ? " ".repeat(c) + n : n;
        break;
      case "center":
        n = d > 0 ? " ".repeat(d) + n : n;
        break;
      case "left":
      default:
        break;
    }
    return n;
  };
});
var om = y((mK, b_) => {
  var D_ = n_(),
    o8 = em(),
    u8 = am(),
    l8 = require("events");
  b_.exports = class extends l8 {
    constructor(t) {
      super(),
        (this.options = t),
        (this.terminal = this.options.terminal
          ? this.options.terminal
          : new o8(this.options.stream)),
        (this.value = 0),
        (this.startValue = 0),
        (this.total = 100),
        (this.lastDrawnString = null),
        (this.startTime = null),
        (this.stopTime = null),
        (this.lastRedraw = Date.now()),
        (this.eta = new D_(this.options.etaBufferLength, 0, 0)),
        (this.payload = {}),
        (this.isActive = !1),
        (this.formatter =
          typeof this.options.format == "function" ? this.options.format : u8);
    }
    render(t = !1) {
      let r = {
        progress: this.getProgress(),
        eta: this.eta.getTime(),
        startTime: this.startTime,
        stopTime: this.stopTime,
        total: this.total,
        value: this.value,
        maxWidth: this.terminal.getWidth(),
      };
      this.options.etaAsynchronousUpdate && this.updateETA();
      let i = this.formatter(this.options, r, this.payload);
      (t ||
        this.options.forceRedraw ||
        (this.options.noTTYOutput && !this.terminal.isTTY()) ||
        this.lastDrawnString != i) &&
        (this.emit("redraw-pre"),
        this.terminal.cursorTo(0, null),
        this.terminal.write(i),
        this.terminal.clearRight(),
        (this.lastDrawnString = i),
        (this.lastRedraw = Date.now()),
        this.emit("redraw-post"));
    }
    start(t, r, i) {
      (this.value = r || 0),
        (this.total = typeof t < "u" && t >= 0 ? t : 100),
        (this.startValue = r || 0),
        (this.payload = i || {}),
        (this.startTime = Date.now()),
        (this.stopTime = null),
        (this.lastDrawnString = ""),
        (this.eta = new D_(
          this.options.etaBufferLength,
          this.startTime,
          this.value,
        )),
        (this.isActive = !0),
        this.emit("start", t, r);
    }
    stop() {
      (this.isActive = !1),
        (this.stopTime = Date.now()),
        this.emit("stop", this.total, this.value);
    }
    update(t, r = {}) {
      typeof t == "number" &&
        ((this.value = t), this.eta.update(Date.now(), t, this.total));
      let i = (typeof t == "object" ? t : r) || {};
      this.emit("update", this.total, this.value);
      for (let n in i) this.payload[n] = i[n];
      this.value >= this.getTotal() &&
        this.options.stopOnComplete &&
        this.stop();
    }
    getProgress() {
      let t = this.value / this.total;
      return (
        this.options.progressCalculationRelative &&
          (t = (this.value - this.startValue) / (this.total - this.startValue)),
        isNaN(t) && (t = this.options && this.options.emptyOnZero ? 0 : 1),
        (t = Math.min(Math.max(t, 0), 1)),
        t
      );
    }
    increment(t = 1, r = {}) {
      typeof t == "object"
        ? this.update(this.value + 1, t)
        : this.update(this.value + t, r);
    }
    getTotal() {
      return this.total;
    }
    setTotal(t) {
      typeof t < "u" && t >= 0 && (this.total = t);
    }
    updateETA() {
      this.eta.update(Date.now(), this.value, this.total);
    }
  };
});
var um = y((gK, E_) => {
  function be(e, t) {
    return typeof e > "u" || e === null ? t : e;
  }
  E_.exports = {
    parse: function (t, r) {
      let i = {},
        n = Object.assign({}, r, t);
      return (
        (i.throttleTime = 1e3 / be(n.fps, 10)),
        (i.stream = be(n.stream, process.stderr)),
        (i.terminal = be(n.terminal, null)),
        (i.clearOnComplete = be(n.clearOnComplete, !1)),
        (i.stopOnComplete = be(n.stopOnComplete, !1)),
        (i.barsize = be(n.barsize, 40)),
        (i.align = be(n.align, "left")),
        (i.hideCursor = be(n.hideCursor, !1)),
        (i.linewrap = be(n.linewrap, !1)),
        (i.barCompleteString = new Array(i.barsize + 1).join(
          n.barCompleteChar || "=",
        )),
        (i.barIncompleteString = new Array(i.barsize + 1).join(
          n.barIncompleteChar || "-",
        )),
        (i.barGlue = be(n.barGlue, "")),
        (i.format = be(
          n.format,
          "progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}",
        )),
        (i.formatTime = be(n.formatTime, null)),
        (i.formatValue = be(n.formatValue, null)),
        (i.formatBar = be(n.formatBar, null)),
        (i.etaBufferLength = be(n.etaBuffer, 10)),
        (i.etaAsynchronousUpdate = be(n.etaAsynchronousUpdate, !1)),
        (i.progressCalculationRelative = be(n.progressCalculationRelative, !1)),
        (i.synchronousUpdate = be(n.synchronousUpdate, !0)),
        (i.noTTYOutput = be(n.noTTYOutput, !1)),
        (i.notTTYSchedule = be(n.notTTYSchedule, 2e3)),
        (i.emptyOnZero = be(n.emptyOnZero, !1)),
        (i.forceRedraw = be(n.forceRedraw, !1)),
        (i.autopadding = be(n.autopadding, !1)),
        (i.autopaddingChar = i.autopadding ? be(n.autopaddingChar, "   ") : ""),
        (i.gracefulExit = be(n.gracefulExit, !1)),
        i
      );
    },
  };
});
var S_ = y((vK, __) => {
  var f8 = om(),
    h8 = um();
  __.exports = class extends f8 {
    constructor(t, r) {
      super(h8.parse(t, r)),
        (this.timer = null),
        this.options.noTTYOutput &&
          this.terminal.isTTY() === !1 &&
          (this.options.synchronousUpdate = !1),
        (this.schedulingRate = this.terminal.isTTY()
          ? this.options.throttleTime
          : this.options.notTTYSchedule),
        (this.sigintCallback = null);
    }
    render() {
      this.timer && (clearTimeout(this.timer), (this.timer = null)),
        super.render(),
        this.options.noTTYOutput &&
          this.terminal.isTTY() === !1 &&
          this.terminal.newline(),
        (this.timer = setTimeout(this.render.bind(this), this.schedulingRate));
    }
    update(t, r) {
      !this.timer ||
        (super.update(t, r),
        this.options.synchronousUpdate &&
          this.lastRedraw + this.options.throttleTime * 2 < Date.now() &&
          this.render());
    }
    start(t, r, i) {
      (this.options.noTTYOutput === !1 && this.terminal.isTTY() === !1) ||
        (this.sigintCallback === null &&
          this.options.gracefulExit &&
          ((this.sigintCallback = this.stop.bind(this)),
          process.once("SIGINT", this.sigintCallback),
          process.once("SIGTERM", this.sigintCallback)),
        this.terminal.cursorSave(),
        this.options.hideCursor === !0 && this.terminal.cursor(!1),
        this.options.linewrap === !1 && this.terminal.lineWrapping(!1),
        super.start(t, r, i),
        this.render());
    }
    stop() {
      !this.timer ||
        (this.sigintCallback &&
          (process.removeListener("SIGINT", this.sigintCallback),
          process.removeListener("SIGTERM", this.sigintCallback),
          (this.sigintCallback = null)),
        this.render(),
        super.stop(),
        clearTimeout(this.timer),
        (this.timer = null),
        this.options.hideCursor === !0 && this.terminal.cursor(!0),
        this.options.linewrap === !1 && this.terminal.lineWrapping(!0),
        this.terminal.cursorRestore(),
        this.options.clearOnComplete
          ? (this.terminal.cursorTo(0, null), this.terminal.clearLine())
          : this.terminal.newline());
    }
  };
});
var C_ = y((DK, x_) => {
  var c8 = em(),
    d8 = om(),
    p8 = um(),
    m8 = require("events");
  x_.exports = class extends m8 {
    constructor(t, r) {
      super(),
        (this.bars = []),
        (this.options = p8.parse(t, r)),
        (this.options.synchronousUpdate = !1),
        (this.terminal = this.options.terminal
          ? this.options.terminal
          : new c8(this.options.stream)),
        (this.timer = null),
        (this.isActive = !1),
        (this.schedulingRate = this.terminal.isTTY()
          ? this.options.throttleTime
          : this.options.notTTYSchedule),
        (this.loggingBuffer = []),
        (this.sigintCallback = null);
    }
    create(t, r, i, n = {}) {
      let s = new d8(Object.assign({}, this.options, n));
      return (
        this.bars.push(s),
        (this.options.noTTYOutput === !1 && this.terminal.isTTY() === !1) ||
          (this.sigintCallback === null &&
            this.options.gracefulExit &&
            ((this.sigintCallback = this.stop.bind(this)),
            process.once("SIGINT", this.sigintCallback),
            process.once("SIGTERM", this.sigintCallback)),
          this.isActive ||
            (this.options.hideCursor === !0 && this.terminal.cursor(!1),
            this.options.linewrap === !1 && this.terminal.lineWrapping(!1),
            (this.timer = setTimeout(
              this.update.bind(this),
              this.schedulingRate,
            ))),
          (this.isActive = !0),
          s.start(t, r, i),
          this.emit("start")),
        s
      );
    }
    remove(t) {
      let r = this.bars.indexOf(t);
      return r < 0
        ? !1
        : (this.bars.splice(r, 1),
          this.update(),
          this.terminal.newline(),
          this.terminal.clearBottom(),
          !0);
    }
    update() {
      if (
        (this.timer && (clearTimeout(this.timer), (this.timer = null)),
        this.emit("update-pre"),
        this.terminal.cursorRelativeReset(),
        this.emit("redraw-pre"),
        this.loggingBuffer.length > 0)
      )
        for (this.terminal.clearLine(); this.loggingBuffer.length > 0; )
          this.terminal.write(this.loggingBuffer.shift(), !0);
      for (let t = 0; t < this.bars.length; t++)
        t > 0 && this.terminal.newline(), this.bars[t].render();
      this.emit("redraw-post"),
        this.options.noTTYOutput &&
          this.terminal.isTTY() === !1 &&
          (this.terminal.newline(), this.terminal.newline()),
        (this.timer = setTimeout(this.update.bind(this), this.schedulingRate)),
        this.emit("update-post"),
        this.options.stopOnComplete &&
          !this.bars.find((t) => t.isActive) &&
          this.stop();
    }
    stop() {
      if (
        (clearTimeout(this.timer),
        (this.timer = null),
        this.sigintCallback &&
          (process.removeListener("SIGINT", this.sigintCallback),
          process.removeListener("SIGTERM", this.sigintCallback),
          (this.sigintCallback = null)),
        (this.isActive = !1),
        this.options.hideCursor === !0 && this.terminal.cursor(!0),
        this.options.linewrap === !1 && this.terminal.lineWrapping(!0),
        this.terminal.cursorRelativeReset(),
        this.emit("stop-pre-clear"),
        this.options.clearOnComplete)
      )
        this.terminal.clearBottom();
      else {
        for (let t = 0; t < this.bars.length; t++)
          t > 0 && this.terminal.newline(),
            this.bars[t].render(),
            this.bars[t].stop();
        this.terminal.newline();
      }
      this.emit("stop");
    }
    log(t) {
      this.loggingBuffer.push(t);
    }
  };
});
var T_ = y((bK, O_) => {
  O_.exports = {
    format: "progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}",
    barCompleteChar: "=",
    barIncompleteChar: "-",
  };
});
var R_ = y((EK, F_) => {
  F_.exports = {
    format: " {bar} {percentage}% | ETA: {eta}s | {value}/{total}",
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
  };
});
var N_ = y((_K, A_) => {
  A_.exports = {
    format:
      " \x1B[90m{bar}\x1B[0m {percentage}% | ETA: {eta}s | {value}/{total}",
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
  };
});
var M_ = y((SK, I_) => {
  I_.exports = {
    format: " {bar}\u25A0 {percentage}% | ETA: {eta}s | {value}/{total}",
    barCompleteChar: "\u25A0",
    barIncompleteChar: " ",
  };
});
var q_ = y((xK, L_) => {
  var g8 = T_(),
    y8 = R_(),
    v8 = N_(),
    w8 = M_();
  L_.exports = { legacy: g8, shades_classic: y8, shades_grey: v8, rect: w8 };
});
var k_ = y((CK, B_) => {
  var P_ = S_(),
    D8 = C_(),
    b8 = q_(),
    E8 = am(),
    _8 = im(),
    S8 = nm(),
    x8 = sm();
  B_.exports = {
    Bar: P_,
    SingleBar: P_,
    MultiBar: D8,
    Presets: b8,
    Format: { Formatter: E8, BarFormat: S8, ValueFormat: _8, TimeFormat: x8 },
  };
});
var Dt = y((TK, z_) => {
  "use strict";
  var Ja = class extends Error {
    constructor(t) {
      super(`Format functions must be synchronous taking a two arguments: (info, opts)
Found: ${
        t.toString().split(`
`)[0]
      }
`),
        Error.captureStackTrace(this, Ja);
    }
  };
  z_.exports = (e) => {
    if (e.length > 2) throw new Ja(e);
    function t(i = {}) {
      this.options = i;
    }
    t.prototype.transform = e;
    function r(i) {
      return new t(i);
    }
    return (r.Format = t), r;
  };
});
var H_ = y((FK, G_) => {
  var W_ = {};
  G_.exports = W_;
  var $_ = {
    reset: [0, 0],
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    gray: [90, 39],
    grey: [90, 39],
    brightRed: [91, 39],
    brightGreen: [92, 39],
    brightYellow: [93, 39],
    brightBlue: [94, 39],
    brightMagenta: [95, 39],
    brightCyan: [96, 39],
    brightWhite: [97, 39],
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    bgGray: [100, 49],
    bgGrey: [100, 49],
    bgBrightRed: [101, 49],
    bgBrightGreen: [102, 49],
    bgBrightYellow: [103, 49],
    bgBrightBlue: [104, 49],
    bgBrightMagenta: [105, 49],
    bgBrightCyan: [106, 49],
    bgBrightWhite: [107, 49],
    blackBG: [40, 49],
    redBG: [41, 49],
    greenBG: [42, 49],
    yellowBG: [43, 49],
    blueBG: [44, 49],
    magentaBG: [45, 49],
    cyanBG: [46, 49],
    whiteBG: [47, 49],
  };
  Object.keys($_).forEach(function (e) {
    var t = $_[e],
      r = (W_[e] = []);
    (r.open = "\x1B[" + t[0] + "m"), (r.close = "\x1B[" + t[1] + "m");
  });
});
var Y_ = y((RK, V_) => {
  "use strict";
  V_.exports = function (e, t) {
    t = t || process.argv;
    var r = t.indexOf("--"),
      i = /^-{1,2}/.test(e) ? "" : "--",
      n = t.indexOf(i + e);
    return n !== -1 && (r === -1 ? !0 : n < r);
  };
});
var Z_ = y((AK, X_) => {
  "use strict";
  var C8 = require("os"),
    rr = Y_(),
    ct = process.env,
    Ts = void 0;
  rr("no-color") || rr("no-colors") || rr("color=false")
    ? (Ts = !1)
    : (rr("color") || rr("colors") || rr("color=true") || rr("color=always")) &&
      (Ts = !0);
  "FORCE_COLOR" in ct &&
    (Ts = ct.FORCE_COLOR.length === 0 || parseInt(ct.FORCE_COLOR, 10) !== 0);
  function O8(e) {
    return e === 0
      ? !1
      : { level: e, hasBasic: !0, has256: e >= 2, has16m: e >= 3 };
  }
  function T8(e) {
    if (Ts === !1) return 0;
    if (rr("color=16m") || rr("color=full") || rr("color=truecolor")) return 3;
    if (rr("color=256")) return 2;
    if (e && !e.isTTY && Ts !== !0) return 0;
    var t = Ts ? 1 : 0;
    if (process.platform === "win32") {
      var r = C8.release().split(".");
      return Number(process.versions.node.split(".")[0]) >= 8 &&
        Number(r[0]) >= 10 &&
        Number(r[2]) >= 10586
        ? Number(r[2]) >= 14931
          ? 3
          : 2
        : 1;
    }
    if ("CI" in ct)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(function (n) {
        return n in ct;
      }) || ct.CI_NAME === "codeship"
        ? 1
        : t;
    if ("TEAMCITY_VERSION" in ct)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(ct.TEAMCITY_VERSION) ? 1 : 0;
    if ("TERM_PROGRAM" in ct) {
      var i = parseInt((ct.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (ct.TERM_PROGRAM) {
        case "iTerm.app":
          return i >= 3 ? 3 : 2;
        case "Hyper":
          return 3;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(ct.TERM)
      ? 2
      : /^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(ct.TERM) ||
        "COLORTERM" in ct
      ? 1
      : (ct.TERM === "dumb", t);
  }
  function hm(e) {
    var t = T8(e);
    return O8(t);
  }
  X_.exports = {
    supportsColor: hm,
    stdout: hm(process.stdout),
    stderr: hm(process.stderr),
  };
});
var Q_ = y((NK, K_) => {
  K_.exports = function (t, r) {
    var i = "";
    (t = t || "Run the trap, drop the bass"), (t = t.split(""));
    var n = {
      a: ["@", "\u0104", "\u023A", "\u0245", "\u0394", "\u039B", "\u0414"],
      b: ["\xDF", "\u0181", "\u0243", "\u026E", "\u03B2", "\u0E3F"],
      c: ["\xA9", "\u023B", "\u03FE"],
      d: ["\xD0", "\u018A", "\u0500", "\u0501", "\u0502", "\u0503"],
      e: [
        "\xCB",
        "\u0115",
        "\u018E",
        "\u0258",
        "\u03A3",
        "\u03BE",
        "\u04BC",
        "\u0A6C",
      ],
      f: ["\u04FA"],
      g: ["\u0262"],
      h: ["\u0126", "\u0195", "\u04A2", "\u04BA", "\u04C7", "\u050A"],
      i: ["\u0F0F"],
      j: ["\u0134"],
      k: ["\u0138", "\u04A0", "\u04C3", "\u051E"],
      l: ["\u0139"],
      m: ["\u028D", "\u04CD", "\u04CE", "\u0520", "\u0521", "\u0D69"],
      n: ["\xD1", "\u014B", "\u019D", "\u0376", "\u03A0", "\u048A"],
      o: [
        "\xD8",
        "\xF5",
        "\xF8",
        "\u01FE",
        "\u0298",
        "\u047A",
        "\u05DD",
        "\u06DD",
        "\u0E4F",
      ],
      p: ["\u01F7", "\u048E"],
      q: ["\u09CD"],
      r: ["\xAE", "\u01A6", "\u0210", "\u024C", "\u0280", "\u042F"],
      s: ["\xA7", "\u03DE", "\u03DF", "\u03E8"],
      t: ["\u0141", "\u0166", "\u0373"],
      u: ["\u01B1", "\u054D"],
      v: ["\u05D8"],
      w: ["\u0428", "\u0460", "\u047C", "\u0D70"],
      x: ["\u04B2", "\u04FE", "\u04FC", "\u04FD"],
      y: ["\xA5", "\u04B0", "\u04CB"],
      z: ["\u01B5", "\u0240"],
    };
    return (
      t.forEach(function (s) {
        s = s.toLowerCase();
        var a = n[s] || [" "],
          o = Math.floor(Math.random() * a.length);
        typeof n[s] < "u" ? (i += n[s][o]) : (i += s);
      }),
      i
    );
  };
});
var e1 = y((IK, J_) => {
  J_.exports = function (t, r) {
    t = t || "   he is here   ";
    var i = {
        up: [
          "\u030D",
          "\u030E",
          "\u0304",
          "\u0305",
          "\u033F",
          "\u0311",
          "\u0306",
          "\u0310",
          "\u0352",
          "\u0357",
          "\u0351",
          "\u0307",
          "\u0308",
          "\u030A",
          "\u0342",
          "\u0313",
          "\u0308",
          "\u034A",
          "\u034B",
          "\u034C",
          "\u0303",
          "\u0302",
          "\u030C",
          "\u0350",
          "\u0300",
          "\u0301",
          "\u030B",
          "\u030F",
          "\u0312",
          "\u0313",
          "\u0314",
          "\u033D",
          "\u0309",
          "\u0363",
          "\u0364",
          "\u0365",
          "\u0366",
          "\u0367",
          "\u0368",
          "\u0369",
          "\u036A",
          "\u036B",
          "\u036C",
          "\u036D",
          "\u036E",
          "\u036F",
          "\u033E",
          "\u035B",
          "\u0346",
          "\u031A",
        ],
        down: [
          "\u0316",
          "\u0317",
          "\u0318",
          "\u0319",
          "\u031C",
          "\u031D",
          "\u031E",
          "\u031F",
          "\u0320",
          "\u0324",
          "\u0325",
          "\u0326",
          "\u0329",
          "\u032A",
          "\u032B",
          "\u032C",
          "\u032D",
          "\u032E",
          "\u032F",
          "\u0330",
          "\u0331",
          "\u0332",
          "\u0333",
          "\u0339",
          "\u033A",
          "\u033B",
          "\u033C",
          "\u0345",
          "\u0347",
          "\u0348",
          "\u0349",
          "\u034D",
          "\u034E",
          "\u0353",
          "\u0354",
          "\u0355",
          "\u0356",
          "\u0359",
          "\u035A",
          "\u0323",
        ],
        mid: [
          "\u0315",
          "\u031B",
          "\u0300",
          "\u0301",
          "\u0358",
          "\u0321",
          "\u0322",
          "\u0327",
          "\u0328",
          "\u0334",
          "\u0335",
          "\u0336",
          "\u035C",
          "\u035D",
          "\u035E",
          "\u035F",
          "\u0360",
          "\u0362",
          "\u0338",
          "\u0337",
          "\u0361",
          " \u0489",
        ],
      },
      n = [].concat(i.up, i.down, i.mid);
    function s(u) {
      var l = Math.floor(Math.random() * u);
      return l;
    }
    function a(u) {
      var l = !1;
      return (
        n.filter(function (f) {
          l = f === u;
        }),
        l
      );
    }
    function o(u, l) {
      var f = "",
        h,
        c;
      (l = l || {}),
        (l.up = typeof l.up < "u" ? l.up : !0),
        (l.mid = typeof l.mid < "u" ? l.mid : !0),
        (l.down = typeof l.down < "u" ? l.down : !0),
        (l.size = typeof l.size < "u" ? l.size : "maxi"),
        (u = u.split(""));
      for (c in u)
        if (!a(c)) {
          switch (((f = f + u[c]), (h = { up: 0, down: 0, mid: 0 }), l.size)) {
            case "mini":
              (h.up = s(8)), (h.mid = s(2)), (h.down = s(8));
              break;
            case "maxi":
              (h.up = s(16) + 3), (h.mid = s(4) + 1), (h.down = s(64) + 3);
              break;
            default:
              (h.up = s(8) + 1), (h.mid = s(6) / 2), (h.down = s(8) + 1);
              break;
          }
          var d = ["up", "mid", "down"];
          for (var m in d)
            for (var C = d[m], E = 0; E <= h[C]; E++)
              l[C] && (f = f + i[C][s(i[C].length)]);
        }
      return f;
    }
    return o(t, r);
  };
});
var r1 = y((MK, t1) => {
  t1.exports = function (e) {
    return function (t, r, i) {
      if (t === " ") return t;
      switch (r % 3) {
        case 0:
          return e.red(t);
        case 1:
          return e.white(t);
        case 2:
          return e.blue(t);
      }
    };
  };
});
var n1 = y((LK, i1) => {
  i1.exports = function (e) {
    return function (t, r, i) {
      return r % 2 === 0 ? t : e.inverse(t);
    };
  };
});
var a1 = y((qK, s1) => {
  s1.exports = function (e) {
    var t = ["red", "yellow", "green", "blue", "magenta"];
    return function (r, i, n) {
      return r === " " ? r : e[t[i++ % t.length]](r);
    };
  };
});
var u1 = y((PK, o1) => {
  o1.exports = function (e) {
    var t = [
      "underline",
      "inverse",
      "grey",
      "yellow",
      "red",
      "green",
      "blue",
      "white",
      "cyan",
      "magenta",
      "brightYellow",
      "brightRed",
      "brightGreen",
      "brightBlue",
      "brightWhite",
      "brightCyan",
      "brightMagenta",
    ];
    return function (r, i, n) {
      return r === " "
        ? r
        : e[t[Math.round(Math.random() * (t.length - 2))]](r);
    };
  };
});
var p1 = y((kK, d1) => {
  var ie = {};
  d1.exports = ie;
  ie.themes = {};
  var F8 = require("util"),
    mn = (ie.styles = H_()),
    f1 = Object.defineProperties,
    R8 = new RegExp(/[\r\n]+/g);
  ie.supportsColor = Z_().supportsColor;
  typeof ie.enabled > "u" && (ie.enabled = ie.supportsColor() !== !1);
  ie.enable = function () {
    ie.enabled = !0;
  };
  ie.disable = function () {
    ie.enabled = !1;
  };
  ie.stripColors = ie.strip = function (e) {
    return ("" + e).replace(/\x1B\[\d+m/g, "");
  };
  var BK = (ie.stylize = function (t, r) {
      if (!ie.enabled) return t + "";
      var i = mn[r];
      return !i && r in ie ? ie[r](t) : i.open + t + i.close;
    }),
    A8 = /[|\\{}()[\]^$+*?.]/g,
    N8 = function (e) {
      if (typeof e != "string") throw new TypeError("Expected a string");
      return e.replace(A8, "\\$&");
    };
  function h1(e) {
    var t = function r() {
      return M8.apply(r, arguments);
    };
    return (t._styles = e), (t.__proto__ = I8), t;
  }
  var c1 = (function () {
      var e = {};
      return (
        (mn.grey = mn.gray),
        Object.keys(mn).forEach(function (t) {
          (mn[t].closeRe = new RegExp(N8(mn[t].close), "g")),
            (e[t] = {
              get: function () {
                return h1(this._styles.concat(t));
              },
            });
        }),
        e
      );
    })(),
    I8 = f1(function () {}, c1);
  function M8() {
    var e = Array.prototype.slice.call(arguments),
      t = e
        .map(function (a) {
          return a != null && a.constructor === String ? a : F8.inspect(a);
        })
        .join(" ");
    if (!ie.enabled || !t) return t;
    for (
      var r =
          t.indexOf(`
`) != -1,
        i = this._styles,
        n = i.length;
      n--;

    ) {
      var s = mn[i[n]];
      (t = s.open + t.replace(s.closeRe, s.open) + s.close),
        r &&
          (t = t.replace(R8, function (a) {
            return s.close + a + s.open;
          }));
    }
    return t;
  }
  ie.setTheme = function (e) {
    if (typeof e == "string") {
      console.log(
        "colors.setTheme now only accepts an object, not a string.  If you are trying to set a theme from a file, it is now your (the caller's) responsibility to require the file.  The old syntax looked like colors.setTheme(__dirname + '/../themes/generic-logging.js'); The new syntax looks like colors.setTheme(require(__dirname + '/../themes/generic-logging.js'));",
      );
      return;
    }
    for (var t in e)
      (function (r) {
        ie[r] = function (i) {
          if (typeof e[r] == "object") {
            var n = i;
            for (var s in e[r]) n = ie[e[r][s]](n);
            return n;
          }
          return ie[e[r]](i);
        };
      })(t);
  };
  function L8() {
    var e = {};
    return (
      Object.keys(c1).forEach(function (t) {
        e[t] = {
          get: function () {
            return h1([t]);
          },
        };
      }),
      e
    );
  }
  var q8 = function (t, r) {
    var i = r.split("");
    return (i = i.map(t)), i.join("");
  };
  ie.trap = Q_();
  ie.zalgo = e1();
  ie.maps = {};
  ie.maps.america = r1()(ie);
  ie.maps.zebra = n1()(ie);
  ie.maps.rainbow = a1()(ie);
  ie.maps.random = u1()(ie);
  for (l1 in ie.maps)
    (function (e) {
      ie[e] = function (t) {
        return q8(ie.maps[e], t);
      };
    })(l1);
  var l1;
  f1(ie, L8());
});
var cm = y((jK, m1) => {
  var P8 = p1();
  m1.exports = P8;
});
var g1 = y((dm) => {
  "use strict";
  dm.levels = {
    error: 0,
    warn: 1,
    help: 2,
    data: 3,
    info: 4,
    debug: 5,
    prompt: 6,
    verbose: 7,
    input: 8,
    silly: 9,
  };
  dm.colors = {
    error: "red",
    warn: "yellow",
    help: "cyan",
    data: "grey",
    info: "green",
    debug: "blue",
    prompt: "grey",
    verbose: "cyan",
    input: "grey",
    silly: "magenta",
  };
});
var y1 = y((pm) => {
  "use strict";
  pm.levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  };
  pm.colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "green",
    verbose: "cyan",
    debug: "blue",
    silly: "magenta",
  };
});
var v1 = y((mm) => {
  "use strict";
  mm.levels = {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7,
  };
  mm.colors = {
    emerg: "red",
    alert: "yellow",
    crit: "red",
    error: "red",
    warning: "red",
    notice: "yellow",
    info: "green",
    debug: "blue",
  };
});
var w1 = y((of) => {
  "use strict";
  Object.defineProperty(of, "cli", { value: g1() });
  Object.defineProperty(of, "npm", { value: y1() });
  Object.defineProperty(of, "syslog", { value: v1() });
});
var Me = y((eo) => {
  "use strict";
  Object.defineProperty(eo, "LEVEL", { value: Symbol.for("level") });
  Object.defineProperty(eo, "MESSAGE", { value: Symbol.for("message") });
  Object.defineProperty(eo, "SPLAT", { value: Symbol.for("splat") });
  Object.defineProperty(eo, "configs", { value: w1() });
});
var lf = y((HK, uf) => {
  "use strict";
  var vm = cm(),
    { LEVEL: gm, MESSAGE: ym } = Me();
  vm.enabled = !0;
  var D1 = /\s+/,
    Rt = class {
      constructor(t = {}) {
        t.colors && this.addColors(t.colors), (this.options = t);
      }
      static addColors(t) {
        let r = Object.keys(t).reduce(
          (i, n) => ((i[n] = D1.test(t[n]) ? t[n].split(D1) : t[n]), i),
          {},
        );
        return (
          (Rt.allColors = Object.assign({}, Rt.allColors || {}, r)),
          Rt.allColors
        );
      }
      addColors(t) {
        return Rt.addColors(t);
      }
      colorize(t, r, i) {
        if ((typeof i > "u" && (i = r), !Array.isArray(Rt.allColors[t])))
          return vm[Rt.allColors[t]](i);
        for (let n = 0, s = Rt.allColors[t].length; n < s; n++)
          i = vm[Rt.allColors[t][n]](i);
        return i;
      }
      transform(t, r) {
        return (
          r.all &&
            typeof t[ym] == "string" &&
            (t[ym] = this.colorize(t[gm], t.level, t[ym])),
          (r.level || r.all || !r.message) &&
            (t.level = this.colorize(t[gm], t.level)),
          (r.all || r.message) &&
            (t.message = this.colorize(t[gm], t.level, t.message)),
          t
        );
      }
    };
  uf.exports = (e) => new Rt(e);
  uf.exports.Colorizer = uf.exports.Format = Rt;
});
var E1 = y((VK, b1) => {
  "use strict";
  var { Colorizer: B8 } = lf();
  b1.exports = (e) => (B8.addColors(e.colors || e), e);
});
var S1 = y((YK, _1) => {
  "use strict";
  var k8 = Dt();
  _1.exports = k8((e) => ((e.message = `	${e.message}`), e));
});
var O1 = y((XK, C1) => {
  "use strict";
  var j8 = Dt(),
    { LEVEL: x1, MESSAGE: wm } = Me();
  C1.exports = j8((e, { stack: t }) => {
    if (e instanceof Error) {
      let i = Object.assign({}, e, {
        level: e.level,
        [x1]: e[x1] || e.level,
        message: e.message,
        [wm]: e[wm] || e.message,
      });
      return t && (i.stack = e.stack), i;
    }
    if (!(e.message instanceof Error)) return e;
    let r = e.message;
    return (
      Object.assign(e, r),
      (e.message = r.message),
      (e[wm] = r.message),
      t && (e.stack = r.stack),
      e
    );
  });
});
var bm = y((ZK, ff) => {
  "use strict";
  var { configs: U8, LEVEL: T1, MESSAGE: Dm } = Me(),
    Ei = class {
      constructor(t = { levels: U8.npm.levels }) {
        (this.paddings = Ei.paddingForLevels(t.levels, t.filler)),
          (this.options = t);
      }
      static getLongestLevel(t) {
        let r = Object.keys(t).map((i) => i.length);
        return Math.max(...r);
      }
      static paddingForLevel(t, r, i) {
        let n = i + 1 - t.length,
          s = Math.floor(n / r.length);
        return `${r}${r.repeat(s)}`.slice(0, n);
      }
      static paddingForLevels(t, r = " ") {
        let i = Ei.getLongestLevel(t);
        return Object.keys(t).reduce(
          (n, s) => ((n[s] = Ei.paddingForLevel(s, r, i)), n),
          {},
        );
      }
      transform(t, r) {
        return (
          (t.message = `${this.paddings[t[T1]]}${t.message}`),
          t[Dm] && (t[Dm] = `${this.paddings[t[T1]]}${t[Dm]}`),
          t
        );
      }
    };
  ff.exports = (e) => new Ei(e);
  ff.exports.Padder = ff.exports.Format = Ei;
});
var F1 = y((KK, Em) => {
  "use strict";
  var { Colorizer: z8 } = lf(),
    { Padder: $8 } = bm(),
    { configs: W8, MESSAGE: G8 } = Me(),
    hf = class {
      constructor(t = {}) {
        t.levels || (t.levels = W8.cli.levels),
          (this.colorizer = new z8(t)),
          (this.padder = new $8(t)),
          (this.options = t);
      }
      transform(t, r) {
        return (
          this.colorizer.transform(this.padder.transform(t, r), r),
          (t[G8] = `${t.level}:${t.message}`),
          t
        );
      }
    };
  Em.exports = (e) => new hf(e);
  Em.exports.Format = hf;
});
var A1 = y((QK, _m) => {
  "use strict";
  var H8 = Dt();
  function R1(e) {
    if (!!e.every(V8))
      return (t) => {
        let r = t;
        for (let i = 0; i < e.length; i++)
          if (((r = e[i].transform(r, e[i].options)), !r)) return !1;
        return r;
      };
  }
  function V8(e) {
    if (typeof e.transform != "function")
      throw new Error(
        [
          "No transform function found on format. Did you create a format instance?",
          "const myFormat = format(formatFn);",
          "const instance = myFormat();",
        ].join(`
`),
      );
    return !0;
  }
  _m.exports = (...e) => {
    let t = H8(R1(e)),
      r = t();
    return (r.Format = t.Format), r;
  };
  _m.exports.cascade = R1;
});
var to = y((Fm, L1) => {
  "use strict";
  var { hasOwnProperty: cf } = Object.prototype,
    yn = Tm();
  yn.configure = Tm;
  yn.stringify = yn;
  yn.default = yn;
  Fm.stringify = yn;
  Fm.configure = Tm;
  L1.exports = yn;
  var M1 =
      /[\u0000-\u001f\u0022\u005c\ud800-\udfff]|[\ud800-\udbff](?![\udc00-\udfff])|(?:[^\ud800-\udbff]|^)[\udc00-\udfff]/,
    Y8 = new RegExp(M1, "g"),
    Om = [
      "\\u0000",
      "\\u0001",
      "\\u0002",
      "\\u0003",
      "\\u0004",
      "\\u0005",
      "\\u0006",
      "\\u0007",
      "\\b",
      "\\t",
      "\\n",
      "\\u000b",
      "\\f",
      "\\r",
      "\\u000e",
      "\\u000f",
      "\\u0010",
      "\\u0011",
      "\\u0012",
      "\\u0013",
      "\\u0014",
      "\\u0015",
      "\\u0016",
      "\\u0017",
      "\\u0018",
      "\\u0019",
      "\\u001a",
      "\\u001b",
      "\\u001c",
      "\\u001d",
      "\\u001e",
      "\\u001f",
      "",
      "",
      '\\"',
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "\\\\",
    ];
  function X8(e) {
    if (e.length === 2) {
      let r = e.charCodeAt(1);
      return `${e[0]}\\u${r.toString(16)}`;
    }
    let t = e.charCodeAt(0);
    return Om.length > t ? Om[t] : `\\u${t.toString(16)}`;
  }
  function _i(e) {
    if (e.length < 5e3 && !M1.test(e)) return e;
    if (e.length > 100) return e.replace(Y8, X8);
    let t = "",
      r = 0;
    for (let i = 0; i < e.length; i++) {
      let n = e.charCodeAt(i);
      if (n === 34 || n === 92 || n < 32)
        (t += `${e.slice(r, i)}${Om[n]}`), (r = i + 1);
      else if (n >= 55296 && n <= 57343) {
        if (n <= 56319 && i + 1 < e.length) {
          let s = e.charCodeAt(i + 1);
          if (s >= 56320 && s <= 57343) {
            i++;
            continue;
          }
        }
        (t += `${e.slice(r, i)}\\u${n.toString(16)}`), (r = i + 1);
      }
    }
    return (t += e.slice(r)), t;
  }
  function Sm(e) {
    if (e.length > 200) return e.sort();
    for (let t = 1; t < e.length; t++) {
      let r = e[t],
        i = t;
      for (; i !== 0 && e[i - 1] > r; ) (e[i] = e[i - 1]), i--;
      e[i] = r;
    }
    return e;
  }
  var Z8 = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(Object.getPrototypeOf(new Int8Array())),
    Symbol.toStringTag,
  ).get;
  function xm(e) {
    return Z8.call(e) !== void 0 && e.length !== 0;
  }
  function Cm(e, t, r) {
    e.length < r && (r = e.length);
    let i = t === "," ? "" : " ",
      n = `"0":${i}${e[0]}`;
    for (let s = 1; s < r; s++) n += `${t}"${s}":${i}${e[s]}`;
    return n;
  }
  function K8(e) {
    if (cf.call(e, "circularValue")) {
      let t = e.circularValue;
      if (typeof t == "string") return `"${t}"`;
      if (t == null) return t;
      if (t === Error || t === TypeError)
        return {
          toString() {
            throw new TypeError("Converting circular structure to JSON");
          },
        };
      throw new TypeError(
        'The "circularValue" argument must be of type string or the value null or undefined',
      );
    }
    return '"[Circular]"';
  }
  function N1(e, t) {
    let r;
    if (cf.call(e, t) && ((r = e[t]), typeof r != "boolean"))
      throw new TypeError(`The "${t}" argument must be of type boolean`);
    return r === void 0 ? !0 : r;
  }
  function I1(e, t) {
    let r;
    if (cf.call(e, t)) {
      if (((r = e[t]), typeof r != "number"))
        throw new TypeError(`The "${t}" argument must be of type number`);
      if (!Number.isInteger(r))
        throw new TypeError(`The "${t}" argument must be an integer`);
      if (r < 1) throw new RangeError(`The "${t}" argument must be >= 1`);
    }
    return r === void 0 ? 1 / 0 : r;
  }
  function gn(e) {
    return e === 1 ? "1 item" : `${e} items`;
  }
  function Q8(e) {
    let t = new Set();
    for (let r of e)
      (typeof r == "string" || typeof r == "number") && t.add(String(r));
    return t;
  }
  function J8(e) {
    if (cf.call(e, "strict")) {
      let t = e.strict;
      if (typeof t != "boolean")
        throw new TypeError('The "strict" argument must be of type boolean');
      if (t)
        return (r) => {
          let i = `Object can not safely be stringified. Received type ${typeof r}`;
          throw (
            (typeof r != "function" && (i += ` (${r.toString()})`),
            new Error(i))
          );
        };
    }
  }
  function Tm(e) {
    e = { ...e };
    let t = J8(e);
    t &&
      (e.bigint === void 0 && (e.bigint = !1),
      "circularValue" in e || (e.circularValue = Error));
    let r = K8(e),
      i = N1(e, "bigint"),
      n = N1(e, "deterministic"),
      s = I1(e, "maximumDepth"),
      a = I1(e, "maximumBreadth");
    function o(c, d, m, C, E, O) {
      let L = d[c];
      switch (
        (typeof L == "object" &&
          L !== null &&
          typeof L.toJSON == "function" &&
          (L = L.toJSON(c)),
        (L = C.call(d, c, L)),
        typeof L)
      ) {
        case "string":
          return `"${_i(L)}"`;
        case "object": {
          if (L === null) return "null";
          if (m.indexOf(L) !== -1) return r;
          let D = "",
            w = ",",
            F = O;
          if (Array.isArray(L)) {
            if (L.length === 0) return "[]";
            if (s < m.length + 1) return '"[Array]"';
            m.push(L),
              E !== "" &&
                ((O += E),
                (D += `
${O}`),
                (w = `,
${O}`));
            let R = Math.min(L.length, a),
              k = 0;
            for (; k < R - 1; k++) {
              let $ = o(k, L, m, C, E, O);
              (D += $ !== void 0 ? $ : "null"), (D += w);
            }
            let z = o(k, L, m, C, E, O);
            if (((D += z !== void 0 ? z : "null"), L.length - 1 > a)) {
              let $ = L.length - a - 1;
              D += `${w}"... ${gn($)} not stringified"`;
            }
            return (
              E !== "" &&
                (D += `
${F}`),
              m.pop(),
              `[${D}]`
            );
          }
          let g = Object.keys(L),
            x = g.length;
          if (x === 0) return "{}";
          if (s < m.length + 1) return '"[Object]"';
          let A = "",
            p = "";
          E !== "" &&
            ((O += E),
            (w = `,
${O}`),
            (A = " "));
          let T = Math.min(x, a);
          xm(L) &&
            ((D += Cm(L, w, a)),
            (g = g.slice(L.length)),
            (T -= L.length),
            (p = w)),
            n && (g = Sm(g)),
            m.push(L);
          for (let R = 0; R < T; R++) {
            let k = g[R],
              z = o(k, L, m, C, E, O);
            z !== void 0 && ((D += `${p}"${_i(k)}":${A}${z}`), (p = w));
          }
          if (x > a) {
            let R = x - a;
            (D += `${p}"...":${A}"${gn(R)} not stringified"`), (p = w);
          }
          return (
            E !== "" &&
              p.length > 1 &&
              (D = `
${O}${D}
${F}`),
            m.pop(),
            `{${D}}`
          );
        }
        case "number":
          return isFinite(L) ? String(L) : t ? t(L) : "null";
        case "boolean":
          return L === !0 ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (i) return String(L);
        default:
          return t ? t(L) : void 0;
      }
    }
    function u(c, d, m, C, E, O) {
      switch (
        (typeof d == "object" &&
          d !== null &&
          typeof d.toJSON == "function" &&
          (d = d.toJSON(c)),
        typeof d)
      ) {
        case "string":
          return `"${_i(d)}"`;
        case "object": {
          if (d === null) return "null";
          if (m.indexOf(d) !== -1) return r;
          let L = O,
            D = "",
            w = ",";
          if (Array.isArray(d)) {
            if (d.length === 0) return "[]";
            if (s < m.length + 1) return '"[Array]"';
            m.push(d),
              E !== "" &&
                ((O += E),
                (D += `
${O}`),
                (w = `,
${O}`));
            let x = Math.min(d.length, a),
              A = 0;
            for (; A < x - 1; A++) {
              let T = u(A, d[A], m, C, E, O);
              (D += T !== void 0 ? T : "null"), (D += w);
            }
            let p = u(A, d[A], m, C, E, O);
            if (((D += p !== void 0 ? p : "null"), d.length - 1 > a)) {
              let T = d.length - a - 1;
              D += `${w}"... ${gn(T)} not stringified"`;
            }
            return (
              E !== "" &&
                (D += `
${L}`),
              m.pop(),
              `[${D}]`
            );
          }
          if (C.size === 0) return "{}";
          m.push(d);
          let F = "";
          E !== "" &&
            ((O += E),
            (w = `,
${O}`),
            (F = " "));
          let g = "";
          for (let x of C) {
            let A = u(x, d[x], m, C, E, O);
            A !== void 0 && ((D += `${g}"${_i(x)}":${F}${A}`), (g = w));
          }
          return (
            E !== "" &&
              g.length > 1 &&
              (D = `
${O}${D}
${L}`),
            m.pop(),
            `{${D}}`
          );
        }
        case "number":
          return isFinite(d) ? String(d) : t ? t(d) : "null";
        case "boolean":
          return d === !0 ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (i) return String(d);
        default:
          return t ? t(d) : void 0;
      }
    }
    function l(c, d, m, C, E) {
      switch (typeof d) {
        case "string":
          return `"${_i(d)}"`;
        case "object": {
          if (d === null) return "null";
          if (typeof d.toJSON == "function") {
            if (((d = d.toJSON(c)), typeof d != "object"))
              return l(c, d, m, C, E);
            if (d === null) return "null";
          }
          if (m.indexOf(d) !== -1) return r;
          let O = E;
          if (Array.isArray(d)) {
            if (d.length === 0) return "[]";
            if (s < m.length + 1) return '"[Array]"';
            m.push(d), (E += C);
            let A = `
${E}`,
              p = `,
${E}`,
              T = Math.min(d.length, a),
              R = 0;
            for (; R < T - 1; R++) {
              let z = l(R, d[R], m, C, E);
              (A += z !== void 0 ? z : "null"), (A += p);
            }
            let k = l(R, d[R], m, C, E);
            if (((A += k !== void 0 ? k : "null"), d.length - 1 > a)) {
              let z = d.length - a - 1;
              A += `${p}"... ${gn(z)} not stringified"`;
            }
            return (
              (A += `
${O}`),
              m.pop(),
              `[${A}]`
            );
          }
          let L = Object.keys(d),
            D = L.length;
          if (D === 0) return "{}";
          if (s < m.length + 1) return '"[Object]"';
          E += C;
          let w = `,
${E}`,
            F = "",
            g = "",
            x = Math.min(D, a);
          xm(d) &&
            ((F += Cm(d, w, a)),
            (L = L.slice(d.length)),
            (x -= d.length),
            (g = w)),
            n && (L = Sm(L)),
            m.push(d);
          for (let A = 0; A < x; A++) {
            let p = L[A],
              T = l(p, d[p], m, C, E);
            T !== void 0 && ((F += `${g}"${_i(p)}": ${T}`), (g = w));
          }
          if (D > a) {
            let A = D - a;
            (F += `${g}"...": "${gn(A)} not stringified"`), (g = w);
          }
          return (
            g !== "" &&
              (F = `
${E}${F}
${O}`),
            m.pop(),
            `{${F}}`
          );
        }
        case "number":
          return isFinite(d) ? String(d) : t ? t(d) : "null";
        case "boolean":
          return d === !0 ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (i) return String(d);
        default:
          return t ? t(d) : void 0;
      }
    }
    function f(c, d, m) {
      switch (typeof d) {
        case "string":
          return `"${_i(d)}"`;
        case "object": {
          if (d === null) return "null";
          if (typeof d.toJSON == "function") {
            if (((d = d.toJSON(c)), typeof d != "object")) return f(c, d, m);
            if (d === null) return "null";
          }
          if (m.indexOf(d) !== -1) return r;
          let C = "";
          if (Array.isArray(d)) {
            if (d.length === 0) return "[]";
            if (s < m.length + 1) return '"[Array]"';
            m.push(d);
            let w = Math.min(d.length, a),
              F = 0;
            for (; F < w - 1; F++) {
              let x = f(F, d[F], m);
              (C += x !== void 0 ? x : "null"), (C += ",");
            }
            let g = f(F, d[F], m);
            if (((C += g !== void 0 ? g : "null"), d.length - 1 > a)) {
              let x = d.length - a - 1;
              C += `,"... ${gn(x)} not stringified"`;
            }
            return m.pop(), `[${C}]`;
          }
          let E = Object.keys(d),
            O = E.length;
          if (O === 0) return "{}";
          if (s < m.length + 1) return '"[Object]"';
          let L = "",
            D = Math.min(O, a);
          xm(d) &&
            ((C += Cm(d, ",", a)),
            (E = E.slice(d.length)),
            (D -= d.length),
            (L = ",")),
            n && (E = Sm(E)),
            m.push(d);
          for (let w = 0; w < D; w++) {
            let F = E[w],
              g = f(F, d[F], m);
            g !== void 0 && ((C += `${L}"${_i(F)}":${g}`), (L = ","));
          }
          if (O > a) {
            let w = O - a;
            C += `${L}"...":"${gn(w)} not stringified"`;
          }
          return m.pop(), `{${C}}`;
        }
        case "number":
          return isFinite(d) ? String(d) : t ? t(d) : "null";
        case "boolean":
          return d === !0 ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (i) return String(d);
        default:
          return t ? t(d) : void 0;
      }
    }
    function h(c, d, m) {
      if (arguments.length > 1) {
        let C = "";
        if (
          (typeof m == "number"
            ? (C = " ".repeat(Math.min(m, 10)))
            : typeof m == "string" && (C = m.slice(0, 10)),
          d != null)
        ) {
          if (typeof d == "function") return o("", { "": c }, [], d, C, "");
          if (Array.isArray(d)) return u("", c, [], Q8(d), C, "");
        }
        if (C.length !== 0) return l("", c, [], C, "");
      }
      return f("", c, []);
    }
    return h;
  }
});
var Rm = y((JK, q1) => {
  "use strict";
  var eP = Dt(),
    { MESSAGE: tP } = Me(),
    rP = to();
  function iP(e, t) {
    return typeof t == "bigint" ? t.toString() : t;
  }
  q1.exports = eP((e, t) => {
    let r = rP.configure(t);
    return (e[tP] = r(e, t.replacer || iP, t.space)), e;
  });
});
var B1 = y((eQ, P1) => {
  "use strict";
  var nP = Dt();
  P1.exports = nP((e, t) =>
    t.message
      ? ((e.message = `[${t.label}] ${e.message}`), e)
      : ((e.label = t.label), e),
  );
});
var j1 = y((tQ, k1) => {
  "use strict";
  var sP = Dt(),
    { MESSAGE: aP } = Me(),
    oP = to();
  k1.exports = sP((e) => {
    let t = {};
    return (
      e.message && ((t["@message"] = e.message), delete e.message),
      e.timestamp && ((t["@timestamp"] = e.timestamp), delete e.timestamp),
      (t["@fields"] = e),
      (e[aP] = oP(t)),
      e
    );
  });
});
var z1 = y((rQ, U1) => {
  "use strict";
  var uP = Dt();
  function lP(e, t, r) {
    let i = t.reduce((s, a) => ((s[a] = e[a]), delete e[a], s), {}),
      n = Object.keys(e).reduce((s, a) => ((s[a] = e[a]), delete e[a], s), {});
    return Object.assign(e, i, { [r]: n }), e;
  }
  function fP(e, t, r) {
    return (e[r] = t.reduce((i, n) => ((i[n] = e[n]), delete e[n], i), {})), e;
  }
  U1.exports = uP((e, t = {}) => {
    let r = "metadata";
    t.key && (r = t.key);
    let i = [];
    return (
      !t.fillExcept && !t.fillWith && (i.push("level"), i.push("message")),
      t.fillExcept && (i = t.fillExcept),
      i.length > 0 ? lP(e, i, r) : t.fillWith ? fP(e, t.fillWith, r) : e
    );
  });
});
var W1 = y((ro, $1) => {
  "use strict";
  var hP = Dt(),
    cP = Qc();
  $1.exports = hP((e) => {
    let t = +new Date();
    return (
      (ro.diff = t - (ro.prevTime || t)),
      (ro.prevTime = t),
      (e.ms = `+${cP(ro.diff)}`),
      e
    );
  });
});
var V1 = y((iQ, H1) => {
  "use strict";
  var dP = require("util").inspect,
    pP = Dt(),
    { LEVEL: mP, MESSAGE: G1, SPLAT: gP } = Me();
  H1.exports = pP((e, t = {}) => {
    let r = Object.assign({}, e);
    return (
      delete r[mP],
      delete r[G1],
      delete r[gP],
      (e[G1] = dP(r, !1, t.depth || null, t.colorize)),
      e
    );
  });
});
var Y1 = y((nQ, pf) => {
  "use strict";
  var { MESSAGE: yP } = Me(),
    df = class {
      constructor(t) {
        this.template = t;
      }
      transform(t) {
        return (t[yP] = this.template(t)), t;
      }
    };
  pf.exports = (e) => new df(e);
  pf.exports.Printf = pf.exports.Format = df;
});
var K1 = y((sQ, Z1) => {
  "use strict";
  var vP = Dt(),
    { MESSAGE: X1 } = Me(),
    wP = to();
  Z1.exports = vP((e) => {
    let t = wP(
        Object.assign({}, e, { level: void 0, message: void 0, splat: void 0 }),
      ),
      r = (e.padding && e.padding[e.level]) || "";
    return (
      t !== "{}"
        ? (e[X1] = `${e.level}:${r} ${e.message} ${t}`)
        : (e[X1] = `${e.level}:${r} ${e.message}`),
      e
    );
  });
});
var eS = y((aQ, J1) => {
  "use strict";
  var DP = require("util"),
    { SPLAT: Q1 } = Me(),
    bP = /%[scdjifoO%]/g,
    EP = /%%/g,
    Am = class {
      constructor(t) {
        this.options = t;
      }
      _splat(t, r) {
        let i = t.message,
          n = t[Q1] || t.splat || [],
          s = i.match(EP),
          a = (s && s.length) || 0,
          u = r.length - a - n.length,
          l = u < 0 ? n.splice(u, -1 * u) : [],
          f = l.length;
        if (f) for (let h = 0; h < f; h++) Object.assign(t, l[h]);
        return (t.message = DP.format(i, ...n)), t;
      }
      transform(t) {
        let r = t.message,
          i = t[Q1] || t.splat;
        if (!i || !i.length) return t;
        let n = r && r.match && r.match(bP);
        if (!n && (i || i.length)) {
          let s = i.length > 1 ? i.splice(0) : i,
            a = s.length;
          if (a) for (let o = 0; o < a; o++) Object.assign(t, s[o]);
          return t;
        }
        return n ? this._splat(t, n) : t;
      }
    };
  J1.exports = (e) => new Am(e);
});
var rS = y((mf, tS) => {
  (function (e, t) {
    typeof mf == "object" && typeof tS < "u"
      ? t(mf)
      : typeof define == "function" && define.amd
      ? define(["exports"], t)
      : t((e.fecha = {}));
  })(mf, function (e) {
    "use strict";
    var t =
        /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,
      r = "\\d\\d?",
      i = "\\d\\d",
      n = "\\d{3}",
      s = "\\d{4}",
      a = "[^\\s]+",
      o = /\[([^]*?)\]/gm;
    function u(I, P) {
      for (var G = [], J = 0, W = I.length; J < W; J++)
        G.push(I[J].substr(0, P));
      return G;
    }
    var l = function (I) {
      return function (P, G) {
        var J = G[I].map(function (Ne) {
            return Ne.toLowerCase();
          }),
          W = J.indexOf(P.toLowerCase());
        return W > -1 ? W : null;
      };
    };
    function f(I) {
      for (var P = [], G = 1; G < arguments.length; G++)
        P[G - 1] = arguments[G];
      for (var J = 0, W = P; J < W.length; J++) {
        var Ne = W[J];
        for (var Ie in Ne) I[Ie] = Ne[Ie];
      }
      return I;
    }
    var h = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      c = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      d = u(c, 3),
      m = u(h, 3),
      C = {
        dayNamesShort: m,
        dayNames: h,
        monthNamesShort: d,
        monthNames: c,
        amPm: ["am", "pm"],
        DoFn: function (I) {
          return (
            I +
            ["th", "st", "nd", "rd"][
              I % 10 > 3 ? 0 : ((I - (I % 10) !== 10 ? 1 : 0) * I) % 10
            ]
          );
        },
      },
      E = f({}, C),
      O = function (I) {
        return (E = f(E, I));
      },
      L = function (I) {
        return I.replace(/[|\\{()[^$+*?.-]/g, "\\$&");
      },
      D = function (I, P) {
        for (P === void 0 && (P = 2), I = String(I); I.length < P; )
          I = "0" + I;
        return I;
      },
      w = {
        D: function (I) {
          return String(I.getDate());
        },
        DD: function (I) {
          return D(I.getDate());
        },
        Do: function (I, P) {
          return P.DoFn(I.getDate());
        },
        d: function (I) {
          return String(I.getDay());
        },
        dd: function (I) {
          return D(I.getDay());
        },
        ddd: function (I, P) {
          return P.dayNamesShort[I.getDay()];
        },
        dddd: function (I, P) {
          return P.dayNames[I.getDay()];
        },
        M: function (I) {
          return String(I.getMonth() + 1);
        },
        MM: function (I) {
          return D(I.getMonth() + 1);
        },
        MMM: function (I, P) {
          return P.monthNamesShort[I.getMonth()];
        },
        MMMM: function (I, P) {
          return P.monthNames[I.getMonth()];
        },
        YY: function (I) {
          return D(String(I.getFullYear()), 4).substr(2);
        },
        YYYY: function (I) {
          return D(I.getFullYear(), 4);
        },
        h: function (I) {
          return String(I.getHours() % 12 || 12);
        },
        hh: function (I) {
          return D(I.getHours() % 12 || 12);
        },
        H: function (I) {
          return String(I.getHours());
        },
        HH: function (I) {
          return D(I.getHours());
        },
        m: function (I) {
          return String(I.getMinutes());
        },
        mm: function (I) {
          return D(I.getMinutes());
        },
        s: function (I) {
          return String(I.getSeconds());
        },
        ss: function (I) {
          return D(I.getSeconds());
        },
        S: function (I) {
          return String(Math.round(I.getMilliseconds() / 100));
        },
        SS: function (I) {
          return D(Math.round(I.getMilliseconds() / 10), 2);
        },
        SSS: function (I) {
          return D(I.getMilliseconds(), 3);
        },
        a: function (I, P) {
          return I.getHours() < 12 ? P.amPm[0] : P.amPm[1];
        },
        A: function (I, P) {
          return I.getHours() < 12
            ? P.amPm[0].toUpperCase()
            : P.amPm[1].toUpperCase();
        },
        ZZ: function (I) {
          var P = I.getTimezoneOffset();
          return (
            (P > 0 ? "-" : "+") +
            D(Math.floor(Math.abs(P) / 60) * 100 + (Math.abs(P) % 60), 4)
          );
        },
        Z: function (I) {
          var P = I.getTimezoneOffset();
          return (
            (P > 0 ? "-" : "+") +
            D(Math.floor(Math.abs(P) / 60), 2) +
            ":" +
            D(Math.abs(P) % 60, 2)
          );
        },
      },
      F = function (I) {
        return +I - 1;
      },
      g = [null, r],
      x = [null, a],
      A = [
        "isPm",
        a,
        function (I, P) {
          var G = I.toLowerCase();
          return G === P.amPm[0] ? 0 : G === P.amPm[1] ? 1 : null;
        },
      ],
      p = [
        "timezoneOffset",
        "[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",
        function (I) {
          var P = (I + "").match(/([+-]|\d\d)/gi);
          if (P) {
            var G = +P[1] * 60 + parseInt(P[2], 10);
            return P[0] === "+" ? G : -G;
          }
          return 0;
        },
      ],
      T = {
        D: ["day", r],
        DD: ["day", i],
        Do: [
          "day",
          r + a,
          function (I) {
            return parseInt(I, 10);
          },
        ],
        M: ["month", r, F],
        MM: ["month", i, F],
        YY: [
          "year",
          i,
          function (I) {
            var P = new Date(),
              G = +("" + P.getFullYear()).substr(0, 2);
            return +("" + (+I > 68 ? G - 1 : G) + I);
          },
        ],
        h: ["hour", r, void 0, "isPm"],
        hh: ["hour", i, void 0, "isPm"],
        H: ["hour", r],
        HH: ["hour", i],
        m: ["minute", r],
        mm: ["minute", i],
        s: ["second", r],
        ss: ["second", i],
        YYYY: ["year", s],
        S: [
          "millisecond",
          "\\d",
          function (I) {
            return +I * 100;
          },
        ],
        SS: [
          "millisecond",
          i,
          function (I) {
            return +I * 10;
          },
        ],
        SSS: ["millisecond", n],
        d: g,
        dd: g,
        ddd: x,
        dddd: x,
        MMM: ["month", a, l("monthNamesShort")],
        MMMM: ["month", a, l("monthNames")],
        a: A,
        A,
        ZZ: p,
        Z: p,
      },
      R = {
        default: "ddd MMM DD YYYY HH:mm:ss",
        shortDate: "M/D/YY",
        mediumDate: "MMM D, YYYY",
        longDate: "MMMM D, YYYY",
        fullDate: "dddd, MMMM D, YYYY",
        isoDate: "YYYY-MM-DD",
        isoDateTime: "YYYY-MM-DDTHH:mm:ssZ",
        shortTime: "HH:mm",
        mediumTime: "HH:mm:ss",
        longTime: "HH:mm:ss.SSS",
      },
      k = function (I) {
        return f(R, I);
      },
      z = function (I, P, G) {
        if (
          (P === void 0 && (P = R.default),
          G === void 0 && (G = {}),
          typeof I == "number" && (I = new Date(I)),
          Object.prototype.toString.call(I) !== "[object Date]" ||
            isNaN(I.getTime()))
        )
          throw new Error("Invalid Date pass to format");
        P = R[P] || P;
        var J = [];
        P = P.replace(o, function (Ne, Ie) {
          return J.push(Ie), "@@@";
        });
        var W = f(f({}, E), G);
        return (
          (P = P.replace(t, function (Ne) {
            return w[Ne](I, W);
          })),
          P.replace(/@@@/g, function () {
            return J.shift();
          })
        );
      };
    function $(I, P, G) {
      if ((G === void 0 && (G = {}), typeof P != "string"))
        throw new Error("Invalid format in fecha parse");
      if (((P = R[P] || P), I.length > 1e3)) return null;
      var J = new Date(),
        W = {
          year: J.getFullYear(),
          month: 0,
          day: 1,
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
          isPm: null,
          timezoneOffset: null,
        },
        Ne = [],
        Ie = [],
        kt = P.replace(o, function (Zi, ni) {
          return Ie.push(L(ni)), "@@@";
        }),
        St = {},
        Be = {};
      (kt = L(kt).replace(t, function (Zi) {
        var ni = T[Zi],
          Yn = ni[0],
          $c = ni[1],
          Ea = ni[3];
        if (St[Yn])
          throw new Error(
            "Invalid format. " + Yn + " specified twice in format",
          );
        return (St[Yn] = !0), Ea && (Be[Ea] = !0), Ne.push(ni), "(" + $c + ")";
      })),
        Object.keys(Be).forEach(function (Zi) {
          if (!St[Zi])
            throw new Error(
              "Invalid format. " + Zi + " is required in specified format",
            );
        }),
        (kt = kt.replace(/@@@/g, function () {
          return Ie.shift();
        }));
      var Wn = I.match(new RegExp(kt, "i"));
      if (!Wn) return null;
      for (var ba = f(f({}, E), G), mt = 1; mt < Wn.length; mt++) {
        var Tr = Ne[mt - 1],
          ii = Tr[0],
          Gn = Tr[2],
          gu = Gn ? Gn(Wn[mt], ba) : +Wn[mt];
        if (gu == null) return null;
        W[ii] = gu;
      }
      W.isPm === 1 && W.hour != null && +W.hour != 12
        ? (W.hour = +W.hour + 12)
        : W.isPm === 0 && +W.hour == 12 && (W.hour = 0);
      var Hn;
      if (W.timezoneOffset == null) {
        Hn = new Date(
          W.year,
          W.month,
          W.day,
          W.hour,
          W.minute,
          W.second,
          W.millisecond,
        );
        for (
          var Vn = [
              ["month", "getMonth"],
              ["day", "getDate"],
              ["hour", "getHours"],
              ["minute", "getMinutes"],
              ["second", "getSeconds"],
            ],
            mt = 0,
            zc = Vn.length;
          mt < zc;
          mt++
        )
          if (St[Vn[mt][0]] && W[Vn[mt][0]] !== Hn[Vn[mt][1]]()) return null;
      } else if (((Hn = new Date(Date.UTC(W.year, W.month, W.day, W.hour, W.minute - W.timezoneOffset, W.second, W.millisecond))), W.month > 11 || W.month < 0 || W.day > 31 || W.day < 1 || W.hour > 23 || W.hour < 0 || W.minute > 59 || W.minute < 0 || W.second > 59 || W.second < 0)) return null;
      return Hn;
    }
    var X = {
      format: z,
      parse: $,
      defaultI18n: C,
      setGlobalDateI18n: O,
      setGlobalDateMasks: k,
    };
    (e.assign = f),
      (e.default = X),
      (e.format = z),
      (e.parse = $),
      (e.defaultI18n = C),
      (e.setGlobalDateI18n = O),
      (e.setGlobalDateMasks = k),
      Object.defineProperty(e, "__esModule", { value: !0 });
  });
});
var nS = y((oQ, iS) => {
  "use strict";
  var _P = rS(),
    SP = Dt();
  iS.exports = SP(
    (e, t = {}) => (
      t.format &&
        (e.timestamp =
          typeof t.format == "function"
            ? t.format()
            : _P.format(new Date(), t.format)),
      e.timestamp || (e.timestamp = new Date().toISOString()),
      t.alias && (e[t.alias] = e.timestamp),
      e
    ),
  );
});
var aS = y((uQ, sS) => {
  "use strict";
  var Nm = cm(),
    xP = Dt(),
    { MESSAGE: Im } = Me();
  sS.exports = xP(
    (e, t) => (
      t.level !== !1 && (e.level = Nm.strip(e.level)),
      t.message !== !1 && (e.message = Nm.strip(String(e.message))),
      t.raw !== !1 && e[Im] && (e[Im] = Nm.strip(String(e[Im]))),
      e
    ),
  );
});
var Lm = y((Mm) => {
  "use strict";
  var CP = (Mm.format = Dt());
  Mm.levels = E1();
  function Ze(e, t) {
    Object.defineProperty(CP, e, {
      get() {
        return t();
      },
      configurable: !0,
    });
  }
  Ze("align", function () {
    return S1();
  });
  Ze("errors", function () {
    return O1();
  });
  Ze("cli", function () {
    return F1();
  });
  Ze("combine", function () {
    return A1();
  });
  Ze("colorize", function () {
    return lf();
  });
  Ze("json", function () {
    return Rm();
  });
  Ze("label", function () {
    return B1();
  });
  Ze("logstash", function () {
    return j1();
  });
  Ze("metadata", function () {
    return z1();
  });
  Ze("ms", function () {
    return W1();
  });
  Ze("padLevels", function () {
    return bm();
  });
  Ze("prettyPrint", function () {
    return V1();
  });
  Ze("printf", function () {
    return Y1();
  });
  Ze("simple", function () {
    return K1();
  });
  Ze("splat", function () {
    return eS();
  });
  Ze("timestamp", function () {
    return nS();
  });
  Ze("uncolorize", function () {
    return aS();
  });
});
var qm = y((yf) => {
  "use strict";
  var { format: gf } = require("util");
  yf.warn = {
    deprecated(e) {
      return () => {
        throw new Error(gf("{ %s } was removed in winston@3.0.0.", e));
      };
    },
    useFormat(e) {
      return () => {
        throw new Error(
          [
            gf("{ %s } was removed in winston@3.0.0.", e),
            "Use a custom winston.format = winston.format(function) instead.",
          ].join(`
`),
        );
      };
    },
    forFunctions(e, t, r) {
      r.forEach((i) => {
        e[i] = yf.warn[t](i);
      });
    },
    moved(e, t, r) {
      function i() {
        return () => {
          throw new Error(
            [
              gf("winston.%s was moved in winston@3.0.0.", r),
              gf("Use a winston.%s instead.", t),
            ].join(`
`),
          );
        };
      }
      Object.defineProperty(e, r, { get: i, set: i });
    },
    forProperties(e, t, r) {
      r.forEach((i) => {
        let n = yf.warn[t](i);
        Object.defineProperty(e, i, { get: n, set: n });
      });
    },
  };
});
var oS = y((hQ, OP) => {
  OP.exports = {
    name: "winston",
    description: "A logger for just about everything.",
    version: "3.8.2",
    author: "Charlie Robbins <charlie.robbins@gmail.com>",
    maintainers: ["David Hyde <dabh@alumni.stanford.edu>"],
    repository: {
      type: "git",
      url: "https://github.com/winstonjs/winston.git",
    },
    keywords: [
      "winston",
      "logger",
      "logging",
      "logs",
      "sysadmin",
      "bunyan",
      "pino",
      "loglevel",
      "tools",
      "json",
      "stream",
    ],
    dependencies: {
      "@dabh/diagnostics": "^2.0.2",
      "@colors/colors": "1.5.0",
      "async": "^3.2.3",
      "is-stream": "^2.0.0",
      "logform": "^2.4.0",
      "one-time": "^1.0.0",
      "readable-stream": "^3.4.0",
      "safe-stable-stringify": "^2.3.1",
      "stack-trace": "0.0.x",
      "triple-beam": "^1.3.0",
      "winston-transport": "^4.5.0",
    },
    devDependencies: {
      "@babel/cli": "^7.17.0",
      "@babel/core": "^7.17.2",
      "@babel/preset-env": "^7.16.7",
      "@dabh/eslint-config-populist": "^5.0.0",
      "@types/node": "^18.0.0",
      "abstract-winston-transport": "^0.5.1",
      "assume": "^2.2.0",
      "cross-spawn-async": "^2.2.5",
      "eslint": "^8.9.0",
      "hock": "^1.4.1",
      "mocha": "8.1.3",
      "nyc": "^15.1.0",
      "rimraf": "^3.0.2",
      "split2": "^4.1.0",
      "std-mocks": "^1.0.1",
      "through2": "^4.0.2",
      "winston-compat": "^0.1.5",
    },
    main: "./lib/winston.js",
    browser: "./dist/winston",
    types: "./index.d.ts",
    scripts: {
      "lint":
        "eslint lib/*.js lib/winston/*.js lib/winston/**/*.js --resolve-plugins-relative-to ./node_modules/@dabh/eslint-config-populist",
      "test": "mocha",
      "test:coverage": "nyc npm run test:unit",
      "test:unit": "mocha test/unit",
      "test:integration": "mocha test/integration",
      "build": "rimraf dist && babel lib -d dist",
      "prepublishOnly": "npm run build",
    },
    engines: { node: ">= 12.0.0" },
    license: "MIT",
  };
});
var vf = y((cQ, uS) => {
  uS.exports = require("util").deprecate;
});
var Pm = y((dQ, lS) => {
  lS.exports = require("stream");
});
var km = y((pQ, hS) => {
  "use strict";
  function TP(e, t) {
    var r = this,
      i = this._readableState && this._readableState.destroyed,
      n = this._writableState && this._writableState.destroyed;
    return i || n
      ? (t
          ? t(e)
          : e &&
            (this._writableState
              ? this._writableState.errorEmitted ||
                ((this._writableState.errorEmitted = !0),
                process.nextTick(Bm, this, e))
              : process.nextTick(Bm, this, e)),
        this)
      : (this._readableState && (this._readableState.destroyed = !0),
        this._writableState && (this._writableState.destroyed = !0),
        this._destroy(e || null, function (s) {
          !t && s
            ? r._writableState
              ? r._writableState.errorEmitted
                ? process.nextTick(wf, r)
                : ((r._writableState.errorEmitted = !0),
                  process.nextTick(fS, r, s))
              : process.nextTick(fS, r, s)
            : t
            ? (process.nextTick(wf, r), t(s))
            : process.nextTick(wf, r);
        }),
        this);
  }
  function fS(e, t) {
    Bm(e, t), wf(e);
  }
  function wf(e) {
    (e._writableState && !e._writableState.emitClose) ||
      (e._readableState && !e._readableState.emitClose) ||
      e.emit("close");
  }
  function FP() {
    this._readableState &&
      ((this._readableState.destroyed = !1),
      (this._readableState.reading = !1),
      (this._readableState.ended = !1),
      (this._readableState.endEmitted = !1)),
      this._writableState &&
        ((this._writableState.destroyed = !1),
        (this._writableState.ended = !1),
        (this._writableState.ending = !1),
        (this._writableState.finalCalled = !1),
        (this._writableState.prefinished = !1),
        (this._writableState.finished = !1),
        (this._writableState.errorEmitted = !1));
  }
  function Bm(e, t) {
    e.emit("error", t);
  }
  function RP(e, t) {
    var r = e._readableState,
      i = e._writableState;
    (r && r.autoDestroy) || (i && i.autoDestroy)
      ? e.destroy(t)
      : e.emit("error", t);
  }
  hS.exports = { destroy: TP, undestroy: FP, errorOrDestroy: RP };
});
var Si = y((mQ, pS) => {
  "use strict";
  var dS = {};
  function Yt(e, t, r) {
    r || (r = Error);
    function i(s, a, o) {
      return typeof t == "string" ? t : t(s, a, o);
    }
    class n extends r {
      constructor(a, o, u) {
        super(i(a, o, u));
      }
    }
    (n.prototype.name = r.name), (n.prototype.code = e), (dS[e] = n);
  }
  function cS(e, t) {
    if (Array.isArray(e)) {
      let r = e.length;
      return (
        (e = e.map((i) => String(i))),
        r > 2
          ? `one of ${t} ${e.slice(0, r - 1).join(", ")}, or ` + e[r - 1]
          : r === 2
          ? `one of ${t} ${e[0]} or ${e[1]}`
          : `of ${t} ${e[0]}`
      );
    } else return `of ${t} ${String(e)}`;
  }
  function AP(e, t, r) {
    return e.substr(!r || r < 0 ? 0 : +r, t.length) === t;
  }
  function NP(e, t, r) {
    return (
      (r === void 0 || r > e.length) && (r = e.length),
      e.substring(r - t.length, r) === t
    );
  }
  function IP(e, t, r) {
    return (
      typeof r != "number" && (r = 0),
      r + t.length > e.length ? !1 : e.indexOf(t, r) !== -1
    );
  }
  Yt(
    "ERR_INVALID_OPT_VALUE",
    function (e, t) {
      return 'The value "' + t + '" is invalid for option "' + e + '"';
    },
    TypeError,
  );
  Yt(
    "ERR_INVALID_ARG_TYPE",
    function (e, t, r) {
      let i;
      typeof t == "string" && AP(t, "not ")
        ? ((i = "must not be"), (t = t.replace(/^not /, "")))
        : (i = "must be");
      let n;
      if (NP(e, " argument")) n = `The ${e} ${i} ${cS(t, "type")}`;
      else {
        let s = IP(e, ".") ? "property" : "argument";
        n = `The "${e}" ${s} ${i} ${cS(t, "type")}`;
      }
      return (n += `. Received type ${typeof r}`), n;
    },
    TypeError,
  );
  Yt("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
  Yt("ERR_METHOD_NOT_IMPLEMENTED", function (e) {
    return "The " + e + " method is not implemented";
  });
  Yt("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
  Yt("ERR_STREAM_DESTROYED", function (e) {
    return "Cannot call " + e + " after a stream was destroyed";
  });
  Yt("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
  Yt("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
  Yt("ERR_STREAM_WRITE_AFTER_END", "write after end");
  Yt(
    "ERR_STREAM_NULL_VALUES",
    "May not write null values to stream",
    TypeError,
  );
  Yt(
    "ERR_UNKNOWN_ENCODING",
    function (e) {
      return "Unknown encoding: " + e;
    },
    TypeError,
  );
  Yt("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
  pS.exports.codes = dS;
});
var jm = y((gQ, mS) => {
  "use strict";
  var MP = Si().codes.ERR_INVALID_OPT_VALUE;
  function LP(e, t, r) {
    return e.highWaterMark != null ? e.highWaterMark : t ? e[r] : null;
  }
  function qP(e, t, r, i) {
    var n = LP(t, i, r);
    if (n != null) {
      if (!(isFinite(n) && Math.floor(n) === n) || n < 0) {
        var s = i ? r : "highWaterMark";
        throw new MP(s, n);
      }
      return Math.floor(n);
    }
    return e.objectMode ? 16 : 16 * 1024;
  }
  mS.exports = { getHighWaterMark: qP };
});
var gS = y((yQ, Um) => {
  typeof Object.create == "function"
    ? (Um.exports = function (t, r) {
        r &&
          ((t.super_ = r),
          (t.prototype = Object.create(r.prototype, {
            constructor: {
              value: t,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })));
      })
    : (Um.exports = function (t, r) {
        if (r) {
          t.super_ = r;
          var i = function () {};
          (i.prototype = r.prototype),
            (t.prototype = new i()),
            (t.prototype.constructor = t);
        }
      });
});
var je = y((vQ, $m) => {
  try {
    if (((zm = require("util")), typeof zm.inherits != "function")) throw "";
    $m.exports = zm.inherits;
  } catch {
    $m.exports = gS();
  }
  var zm;
});
var DS = y((wQ, wS) => {
  "use strict";
  function yS(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(e);
      t &&
        (i = i.filter(function (n) {
          return Object.getOwnPropertyDescriptor(e, n).enumerable;
        })),
        r.push.apply(r, i);
    }
    return r;
  }
  function PP(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t] != null ? arguments[t] : {};
      t % 2
        ? yS(Object(r), !0).forEach(function (i) {
            BP(e, i, r[i]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : yS(Object(r)).forEach(function (i) {
            Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(r, i));
          });
    }
    return e;
  }
  function BP(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r),
      e
    );
  }
  function kP(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  function vS(e, t) {
    for (var r = 0; r < t.length; r++) {
      var i = t[r];
      (i.enumerable = i.enumerable || !1),
        (i.configurable = !0),
        "value" in i && (i.writable = !0),
        Object.defineProperty(e, i.key, i);
    }
  }
  function jP(e, t, r) {
    return t && vS(e.prototype, t), r && vS(e, r), e;
  }
  var UP = require("buffer"),
    Df = UP.Buffer,
    zP = require("util"),
    Wm = zP.inspect,
    $P = (Wm && Wm.custom) || "inspect";
  function WP(e, t, r) {
    Df.prototype.copy.call(e, t, r);
  }
  wS.exports = (function () {
    function e() {
      kP(this, e), (this.head = null), (this.tail = null), (this.length = 0);
    }
    return (
      jP(e, [
        {
          key: "push",
          value: function (r) {
            var i = { data: r, next: null };
            this.length > 0 ? (this.tail.next = i) : (this.head = i),
              (this.tail = i),
              ++this.length;
          },
        },
        {
          key: "unshift",
          value: function (r) {
            var i = { data: r, next: this.head };
            this.length === 0 && (this.tail = i),
              (this.head = i),
              ++this.length;
          },
        },
        {
          key: "shift",
          value: function () {
            if (this.length !== 0) {
              var r = this.head.data;
              return (
                this.length === 1
                  ? (this.head = this.tail = null)
                  : (this.head = this.head.next),
                --this.length,
                r
              );
            }
          },
        },
        {
          key: "clear",
          value: function () {
            (this.head = this.tail = null), (this.length = 0);
          },
        },
        {
          key: "join",
          value: function (r) {
            if (this.length === 0) return "";
            for (var i = this.head, n = "" + i.data; (i = i.next); )
              n += r + i.data;
            return n;
          },
        },
        {
          key: "concat",
          value: function (r) {
            if (this.length === 0) return Df.alloc(0);
            for (var i = Df.allocUnsafe(r >>> 0), n = this.head, s = 0; n; )
              WP(n.data, i, s), (s += n.data.length), (n = n.next);
            return i;
          },
        },
        {
          key: "consume",
          value: function (r, i) {
            var n;
            return (
              r < this.head.data.length
                ? ((n = this.head.data.slice(0, r)),
                  (this.head.data = this.head.data.slice(r)))
                : r === this.head.data.length
                ? (n = this.shift())
                : (n = i ? this._getString(r) : this._getBuffer(r)),
              n
            );
          },
        },
        {
          key: "first",
          value: function () {
            return this.head.data;
          },
        },
        {
          key: "_getString",
          value: function (r) {
            var i = this.head,
              n = 1,
              s = i.data;
            for (r -= s.length; (i = i.next); ) {
              var a = i.data,
                o = r > a.length ? a.length : r;
              if (
                (o === a.length ? (s += a) : (s += a.slice(0, r)),
                (r -= o),
                r === 0)
              ) {
                o === a.length
                  ? (++n,
                    i.next
                      ? (this.head = i.next)
                      : (this.head = this.tail = null))
                  : ((this.head = i), (i.data = a.slice(o)));
                break;
              }
              ++n;
            }
            return (this.length -= n), s;
          },
        },
        {
          key: "_getBuffer",
          value: function (r) {
            var i = Df.allocUnsafe(r),
              n = this.head,
              s = 1;
            for (n.data.copy(i), r -= n.data.length; (n = n.next); ) {
              var a = n.data,
                o = r > a.length ? a.length : r;
              if ((a.copy(i, i.length - r, 0, o), (r -= o), r === 0)) {
                o === a.length
                  ? (++s,
                    n.next
                      ? (this.head = n.next)
                      : (this.head = this.tail = null))
                  : ((this.head = n), (n.data = a.slice(o)));
                break;
              }
              ++s;
            }
            return (this.length -= s), i;
          },
        },
        {
          key: $P,
          value: function (r, i) {
            return Wm(this, PP({}, i, { depth: 0, customInspect: !1 }));
          },
        },
      ]),
      e
    );
  })();
});
var _S = y((Gm, ES) => {
  /*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */ var bf = require("buffer"),
    yr = bf.Buffer;
  function bS(e, t) {
    for (var r in e) t[r] = e[r];
  }
  yr.from && yr.alloc && yr.allocUnsafe && yr.allocUnsafeSlow
    ? (ES.exports = bf)
    : (bS(bf, Gm), (Gm.Buffer = vn));
  function vn(e, t, r) {
    return yr(e, t, r);
  }
  vn.prototype = Object.create(yr.prototype);
  bS(yr, vn);
  vn.from = function (e, t, r) {
    if (typeof e == "number")
      throw new TypeError("Argument must not be a number");
    return yr(e, t, r);
  };
  vn.alloc = function (e, t, r) {
    if (typeof e != "number") throw new TypeError("Argument must be a number");
    var i = yr(e);
    return (
      t !== void 0
        ? typeof r == "string"
          ? i.fill(t, r)
          : i.fill(t)
        : i.fill(0),
      i
    );
  };
  vn.allocUnsafe = function (e) {
    if (typeof e != "number") throw new TypeError("Argument must be a number");
    return yr(e);
  };
  vn.allocUnsafeSlow = function (e) {
    if (typeof e != "number") throw new TypeError("Argument must be a number");
    return bf.SlowBuffer(e);
  };
});
var Ym = y((xS) => {
  "use strict";
  var Vm = _S().Buffer,
    SS =
      Vm.isEncoding ||
      function (e) {
        switch (((e = "" + e), e && e.toLowerCase())) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return !0;
          default:
            return !1;
        }
      };
  function GP(e) {
    if (!e) return "utf8";
    for (var t; ; )
      switch (e) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return e;
        default:
          if (t) return;
          (e = ("" + e).toLowerCase()), (t = !0);
      }
  }
  function HP(e) {
    var t = GP(e);
    if (typeof t != "string" && (Vm.isEncoding === SS || !SS(e)))
      throw new Error("Unknown encoding: " + e);
    return t || e;
  }
  xS.StringDecoder = io;
  function io(e) {
    this.encoding = HP(e);
    var t;
    switch (this.encoding) {
      case "utf16le":
        (this.text = QP), (this.end = JP), (t = 4);
        break;
      case "utf8":
        (this.fillLast = XP), (t = 4);
        break;
      case "base64":
        (this.text = eB), (this.end = tB), (t = 3);
        break;
      default:
        (this.write = rB), (this.end = iB);
        return;
    }
    (this.lastNeed = 0),
      (this.lastTotal = 0),
      (this.lastChar = Vm.allocUnsafe(t));
  }
  io.prototype.write = function (e) {
    if (e.length === 0) return "";
    var t, r;
    if (this.lastNeed) {
      if (((t = this.fillLast(e)), t === void 0)) return "";
      (r = this.lastNeed), (this.lastNeed = 0);
    } else r = 0;
    return r < e.length ? (t ? t + this.text(e, r) : this.text(e, r)) : t || "";
  };
  io.prototype.end = KP;
  io.prototype.text = ZP;
  io.prototype.fillLast = function (e) {
    if (this.lastNeed <= e.length)
      return (
        e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed),
        this.lastChar.toString(this.encoding, 0, this.lastTotal)
      );
    e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length),
      (this.lastNeed -= e.length);
  };
  function Hm(e) {
    return e <= 127
      ? 0
      : e >> 5 === 6
      ? 2
      : e >> 4 === 14
      ? 3
      : e >> 3 === 30
      ? 4
      : e >> 6 === 2
      ? -1
      : -2;
  }
  function VP(e, t, r) {
    var i = t.length - 1;
    if (i < r) return 0;
    var n = Hm(t[i]);
    return n >= 0
      ? (n > 0 && (e.lastNeed = n - 1), n)
      : --i < r || n === -2
      ? 0
      : ((n = Hm(t[i])),
        n >= 0
          ? (n > 0 && (e.lastNeed = n - 2), n)
          : --i < r || n === -2
          ? 0
          : ((n = Hm(t[i])),
            n >= 0
              ? (n > 0 && (n === 2 ? (n = 0) : (e.lastNeed = n - 3)), n)
              : 0));
  }
  function YP(e, t, r) {
    if ((t[0] & 192) !== 128) return (e.lastNeed = 0), "\uFFFD";
    if (e.lastNeed > 1 && t.length > 1) {
      if ((t[1] & 192) !== 128) return (e.lastNeed = 1), "\uFFFD";
      if (e.lastNeed > 2 && t.length > 2 && (t[2] & 192) !== 128)
        return (e.lastNeed = 2), "\uFFFD";
    }
  }
  function XP(e) {
    var t = this.lastTotal - this.lastNeed,
      r = YP(this, e, t);
    if (r !== void 0) return r;
    if (this.lastNeed <= e.length)
      return (
        e.copy(this.lastChar, t, 0, this.lastNeed),
        this.lastChar.toString(this.encoding, 0, this.lastTotal)
      );
    e.copy(this.lastChar, t, 0, e.length), (this.lastNeed -= e.length);
  }
  function ZP(e, t) {
    var r = VP(this, e, t);
    if (!this.lastNeed) return e.toString("utf8", t);
    this.lastTotal = r;
    var i = e.length - (r - this.lastNeed);
    return e.copy(this.lastChar, 0, i), e.toString("utf8", t, i);
  }
  function KP(e) {
    var t = e && e.length ? this.write(e) : "";
    return this.lastNeed ? t + "\uFFFD" : t;
  }
  function QP(e, t) {
    if ((e.length - t) % 2 === 0) {
      var r = e.toString("utf16le", t);
      if (r) {
        var i = r.charCodeAt(r.length - 1);
        if (i >= 55296 && i <= 56319)
          return (
            (this.lastNeed = 2),
            (this.lastTotal = 4),
            (this.lastChar[0] = e[e.length - 2]),
            (this.lastChar[1] = e[e.length - 1]),
            r.slice(0, -1)
          );
      }
      return r;
    }
    return (
      (this.lastNeed = 1),
      (this.lastTotal = 2),
      (this.lastChar[0] = e[e.length - 1]),
      e.toString("utf16le", t, e.length - 1)
    );
  }
  function JP(e) {
    var t = e && e.length ? this.write(e) : "";
    if (this.lastNeed) {
      var r = this.lastTotal - this.lastNeed;
      return t + this.lastChar.toString("utf16le", 0, r);
    }
    return t;
  }
  function eB(e, t) {
    var r = (e.length - t) % 3;
    return r === 0
      ? e.toString("base64", t)
      : ((this.lastNeed = 3 - r),
        (this.lastTotal = 3),
        r === 1
          ? (this.lastChar[0] = e[e.length - 1])
          : ((this.lastChar[0] = e[e.length - 2]),
            (this.lastChar[1] = e[e.length - 1])),
        e.toString("base64", t, e.length - r));
  }
  function tB(e) {
    var t = e && e.length ? this.write(e) : "";
    return this.lastNeed
      ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed)
      : t;
  }
  function rB(e) {
    return e.toString(this.encoding);
  }
  function iB(e) {
    return e && e.length ? this.write(e) : "";
  }
});
var Ef = y((bQ, TS) => {
  "use strict";
  var CS = Si().codes.ERR_STREAM_PREMATURE_CLOSE;
  function nB(e) {
    var t = !1;
    return function () {
      if (!t) {
        t = !0;
        for (var r = arguments.length, i = new Array(r), n = 0; n < r; n++)
          i[n] = arguments[n];
        e.apply(this, i);
      }
    };
  }
  function sB() {}
  function aB(e) {
    return e.setHeader && typeof e.abort == "function";
  }
  function OS(e, t, r) {
    if (typeof t == "function") return OS(e, null, t);
    t || (t = {}), (r = nB(r || sB));
    var i = t.readable || (t.readable !== !1 && e.readable),
      n = t.writable || (t.writable !== !1 && e.writable),
      s = function () {
        e.writable || o();
      },
      a = e._writableState && e._writableState.finished,
      o = function () {
        (n = !1), (a = !0), i || r.call(e);
      },
      u = e._readableState && e._readableState.endEmitted,
      l = function () {
        (i = !1), (u = !0), n || r.call(e);
      },
      f = function (m) {
        r.call(e, m);
      },
      h = function () {
        var m;
        if (i && !u)
          return (
            (!e._readableState || !e._readableState.ended) && (m = new CS()),
            r.call(e, m)
          );
        if (n && !a)
          return (
            (!e._writableState || !e._writableState.ended) && (m = new CS()),
            r.call(e, m)
          );
      },
      c = function () {
        e.req.on("finish", o);
      };
    return (
      aB(e)
        ? (e.on("complete", o),
          e.on("abort", h),
          e.req ? c() : e.on("request", c))
        : n && !e._writableState && (e.on("end", s), e.on("close", s)),
      e.on("end", l),
      e.on("finish", o),
      t.error !== !1 && e.on("error", f),
      e.on("close", h),
      function () {
        e.removeListener("complete", o),
          e.removeListener("abort", h),
          e.removeListener("request", c),
          e.req && e.req.removeListener("finish", o),
          e.removeListener("end", s),
          e.removeListener("close", s),
          e.removeListener("finish", o),
          e.removeListener("end", l),
          e.removeListener("error", f),
          e.removeListener("close", h);
      }
    );
  }
  TS.exports = OS;
});
var RS = y((EQ, FS) => {
  "use strict";
  var _f;
  function xi(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r),
      e
    );
  }
  var oB = Ef(),
    Ci = Symbol("lastResolve"),
    wn = Symbol("lastReject"),
    no = Symbol("error"),
    Sf = Symbol("ended"),
    Dn = Symbol("lastPromise"),
    Xm = Symbol("handlePromise"),
    bn = Symbol("stream");
  function Oi(e, t) {
    return { value: e, done: t };
  }
  function uB(e) {
    var t = e[Ci];
    if (t !== null) {
      var r = e[bn].read();
      r !== null &&
        ((e[Dn] = null), (e[Ci] = null), (e[wn] = null), t(Oi(r, !1)));
    }
  }
  function lB(e) {
    process.nextTick(uB, e);
  }
  function fB(e, t) {
    return function (r, i) {
      e.then(function () {
        if (t[Sf]) {
          r(Oi(void 0, !0));
          return;
        }
        t[Xm](r, i);
      }, i);
    };
  }
  var hB = Object.getPrototypeOf(function () {}),
    cB = Object.setPrototypeOf(
      ((_f = {
        get stream() {
          return this[bn];
        },
        next: function () {
          var t = this,
            r = this[no];
          if (r !== null) return Promise.reject(r);
          if (this[Sf]) return Promise.resolve(Oi(void 0, !0));
          if (this[bn].destroyed)
            return new Promise(function (a, o) {
              process.nextTick(function () {
                t[no] ? o(t[no]) : a(Oi(void 0, !0));
              });
            });
          var i = this[Dn],
            n;
          if (i) n = new Promise(fB(i, this));
          else {
            var s = this[bn].read();
            if (s !== null) return Promise.resolve(Oi(s, !1));
            n = new Promise(this[Xm]);
          }
          return (this[Dn] = n), n;
        },
      }),
      xi(_f, Symbol.asyncIterator, function () {
        return this;
      }),
      xi(_f, "return", function () {
        var t = this;
        return new Promise(function (r, i) {
          t[bn].destroy(null, function (n) {
            if (n) {
              i(n);
              return;
            }
            r(Oi(void 0, !0));
          });
        });
      }),
      _f),
      hB,
    ),
    dB = function (t) {
      var r,
        i = Object.create(
          cB,
          ((r = {}),
          xi(r, bn, { value: t, writable: !0 }),
          xi(r, Ci, { value: null, writable: !0 }),
          xi(r, wn, { value: null, writable: !0 }),
          xi(r, no, { value: null, writable: !0 }),
          xi(r, Sf, { value: t._readableState.endEmitted, writable: !0 }),
          xi(r, Xm, {
            value: function (s, a) {
              var o = i[bn].read();
              o
                ? ((i[Dn] = null), (i[Ci] = null), (i[wn] = null), s(Oi(o, !1)))
                : ((i[Ci] = s), (i[wn] = a));
            },
            writable: !0,
          }),
          r),
        );
      return (
        (i[Dn] = null),
        oB(t, function (n) {
          if (n && n.code !== "ERR_STREAM_PREMATURE_CLOSE") {
            var s = i[wn];
            s !== null &&
              ((i[Dn] = null), (i[Ci] = null), (i[wn] = null), s(n)),
              (i[no] = n);
            return;
          }
          var a = i[Ci];
          a !== null &&
            ((i[Dn] = null), (i[Ci] = null), (i[wn] = null), a(Oi(void 0, !0))),
            (i[Sf] = !0);
        }),
        t.on("readable", lB.bind(null, i)),
        i
      );
    };
  FS.exports = dB;
});
var MS = y((_Q, IS) => {
  "use strict";
  function AS(e, t, r, i, n, s, a) {
    try {
      var o = e[s](a),
        u = o.value;
    } catch (l) {
      r(l);
      return;
    }
    o.done ? t(u) : Promise.resolve(u).then(i, n);
  }
  function pB(e) {
    return function () {
      var t = this,
        r = arguments;
      return new Promise(function (i, n) {
        var s = e.apply(t, r);
        function a(u) {
          AS(s, i, n, a, o, "next", u);
        }
        function o(u) {
          AS(s, i, n, a, o, "throw", u);
        }
        a(void 0);
      });
    };
  }
  function NS(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(e);
      t &&
        (i = i.filter(function (n) {
          return Object.getOwnPropertyDescriptor(e, n).enumerable;
        })),
        r.push.apply(r, i);
    }
    return r;
  }
  function mB(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t] != null ? arguments[t] : {};
      t % 2
        ? NS(Object(r), !0).forEach(function (i) {
            gB(e, i, r[i]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : NS(Object(r)).forEach(function (i) {
            Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(r, i));
          });
    }
    return e;
  }
  function gB(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r),
      e
    );
  }
  var yB = Si().codes.ERR_INVALID_ARG_TYPE;
  function vB(e, t, r) {
    var i;
    if (t && typeof t.next == "function") i = t;
    else if (t && t[Symbol.asyncIterator]) i = t[Symbol.asyncIterator]();
    else if (t && t[Symbol.iterator]) i = t[Symbol.iterator]();
    else throw new yB("iterable", ["Iterable"], t);
    var n = new e(mB({ objectMode: !0 }, r)),
      s = !1;
    n._read = function () {
      s || ((s = !0), a());
    };
    function a() {
      return o.apply(this, arguments);
    }
    function o() {
      return (
        (o = pB(function* () {
          try {
            var u = yield i.next(),
              l = u.value,
              f = u.done;
            f ? n.push(null) : n.push(yield l) ? a() : (s = !1);
          } catch (h) {
            n.destroy(h);
          }
        })),
        o.apply(this, arguments)
      );
    }
    return n;
  }
  IS.exports = vB;
});
var sg = y((xQ, WS) => {
  "use strict";
  WS.exports = oe;
  var Fs;
  oe.ReadableState = BS;
  var SQ = require("events").EventEmitter,
    PS = function (t, r) {
      return t.listeners(r).length;
    },
    ao = Pm(),
    xf = require("buffer").Buffer,
    wB = global.Uint8Array || function () {};
  function DB(e) {
    return xf.from(e);
  }
  function bB(e) {
    return xf.isBuffer(e) || e instanceof wB;
  }
  var Zm = require("util"),
    te;
  Zm && Zm.debuglog ? (te = Zm.debuglog("stream")) : (te = function () {});
  var EB = DS(),
    ig = km(),
    _B = jm(),
    SB = _B.getHighWaterMark,
    Cf = Si().codes,
    xB = Cf.ERR_INVALID_ARG_TYPE,
    CB = Cf.ERR_STREAM_PUSH_AFTER_EOF,
    OB = Cf.ERR_METHOD_NOT_IMPLEMENTED,
    TB = Cf.ERR_STREAM_UNSHIFT_AFTER_END_EVENT,
    Rs,
    Km,
    Qm;
  je()(oe, ao);
  var so = ig.errorOrDestroy,
    Jm = ["error", "close", "destroy", "pause", "resume"];
  function FB(e, t, r) {
    if (typeof e.prependListener == "function") return e.prependListener(t, r);
    !e._events || !e._events[t]
      ? e.on(t, r)
      : Array.isArray(e._events[t])
      ? e._events[t].unshift(r)
      : (e._events[t] = [r, e._events[t]]);
  }
  function BS(e, t, r) {
    (Fs = Fs || En()),
      (e = e || {}),
      typeof r != "boolean" && (r = t instanceof Fs),
      (this.objectMode = !!e.objectMode),
      r && (this.objectMode = this.objectMode || !!e.readableObjectMode),
      (this.highWaterMark = SB(this, e, "readableHighWaterMark", r)),
      (this.buffer = new EB()),
      (this.length = 0),
      (this.pipes = null),
      (this.pipesCount = 0),
      (this.flowing = null),
      (this.ended = !1),
      (this.endEmitted = !1),
      (this.reading = !1),
      (this.sync = !0),
      (this.needReadable = !1),
      (this.emittedReadable = !1),
      (this.readableListening = !1),
      (this.resumeScheduled = !1),
      (this.paused = !0),
      (this.emitClose = e.emitClose !== !1),
      (this.autoDestroy = !!e.autoDestroy),
      (this.destroyed = !1),
      (this.defaultEncoding = e.defaultEncoding || "utf8"),
      (this.awaitDrain = 0),
      (this.readingMore = !1),
      (this.decoder = null),
      (this.encoding = null),
      e.encoding &&
        (Rs || (Rs = Ym().StringDecoder),
        (this.decoder = new Rs(e.encoding)),
        (this.encoding = e.encoding));
  }
  function oe(e) {
    if (((Fs = Fs || En()), !(this instanceof oe))) return new oe(e);
    var t = this instanceof Fs;
    (this._readableState = new BS(e, this, t)),
      (this.readable = !0),
      e &&
        (typeof e.read == "function" && (this._read = e.read),
        typeof e.destroy == "function" && (this._destroy = e.destroy)),
      ao.call(this);
  }
  Object.defineProperty(oe.prototype, "destroyed", {
    enumerable: !1,
    get: function () {
      return this._readableState === void 0
        ? !1
        : this._readableState.destroyed;
    },
    set: function (t) {
      !this._readableState || (this._readableState.destroyed = t);
    },
  });
  oe.prototype.destroy = ig.destroy;
  oe.prototype._undestroy = ig.undestroy;
  oe.prototype._destroy = function (e, t) {
    t(e);
  };
  oe.prototype.push = function (e, t) {
    var r = this._readableState,
      i;
    return (
      r.objectMode
        ? (i = !0)
        : typeof e == "string" &&
          ((t = t || r.defaultEncoding),
          t !== r.encoding && ((e = xf.from(e, t)), (t = "")),
          (i = !0)),
      kS(this, e, t, !1, i)
    );
  };
  oe.prototype.unshift = function (e) {
    return kS(this, e, null, !0, !1);
  };
  function kS(e, t, r, i, n) {
    te("readableAddChunk", t);
    var s = e._readableState;
    if (t === null) (s.reading = !1), NB(e, s);
    else {
      var a;
      if ((n || (a = RB(s, t)), a)) so(e, a);
      else if (s.objectMode || (t && t.length > 0))
        if (
          (typeof t != "string" &&
            !s.objectMode &&
            Object.getPrototypeOf(t) !== xf.prototype &&
            (t = DB(t)),
          i)
        )
          s.endEmitted ? so(e, new TB()) : eg(e, s, t, !0);
        else if (s.ended) so(e, new CB());
        else {
          if (s.destroyed) return !1;
          (s.reading = !1),
            s.decoder && !r
              ? ((t = s.decoder.write(t)),
                s.objectMode || t.length !== 0 ? eg(e, s, t, !1) : rg(e, s))
              : eg(e, s, t, !1);
        }
      else i || ((s.reading = !1), rg(e, s));
    }
    return !s.ended && (s.length < s.highWaterMark || s.length === 0);
  }
  function eg(e, t, r, i) {
    t.flowing && t.length === 0 && !t.sync
      ? ((t.awaitDrain = 0), e.emit("data", r))
      : ((t.length += t.objectMode ? 1 : r.length),
        i ? t.buffer.unshift(r) : t.buffer.push(r),
        t.needReadable && Of(e)),
      rg(e, t);
  }
  function RB(e, t) {
    var r;
    return (
      !bB(t) &&
        typeof t != "string" &&
        t !== void 0 &&
        !e.objectMode &&
        (r = new xB("chunk", ["string", "Buffer", "Uint8Array"], t)),
      r
    );
  }
  oe.prototype.isPaused = function () {
    return this._readableState.flowing === !1;
  };
  oe.prototype.setEncoding = function (e) {
    Rs || (Rs = Ym().StringDecoder);
    var t = new Rs(e);
    (this._readableState.decoder = t),
      (this._readableState.encoding = this._readableState.decoder.encoding);
    for (var r = this._readableState.buffer.head, i = ""; r !== null; )
      (i += t.write(r.data)), (r = r.next);
    return (
      this._readableState.buffer.clear(),
      i !== "" && this._readableState.buffer.push(i),
      (this._readableState.length = i.length),
      this
    );
  };
  var LS = 1073741824;
  function AB(e) {
    return (
      e >= LS
        ? (e = LS)
        : (e--,
          (e |= e >>> 1),
          (e |= e >>> 2),
          (e |= e >>> 4),
          (e |= e >>> 8),
          (e |= e >>> 16),
          e++),
      e
    );
  }
  function qS(e, t) {
    return e <= 0 || (t.length === 0 && t.ended)
      ? 0
      : t.objectMode
      ? 1
      : e !== e
      ? t.flowing && t.length
        ? t.buffer.head.data.length
        : t.length
      : (e > t.highWaterMark && (t.highWaterMark = AB(e)),
        e <= t.length ? e : t.ended ? t.length : ((t.needReadable = !0), 0));
  }
  oe.prototype.read = function (e) {
    te("read", e), (e = parseInt(e, 10));
    var t = this._readableState,
      r = e;
    if (
      (e !== 0 && (t.emittedReadable = !1),
      e === 0 &&
        t.needReadable &&
        ((t.highWaterMark !== 0 ? t.length >= t.highWaterMark : t.length > 0) ||
          t.ended))
    )
      return (
        te("read: emitReadable", t.length, t.ended),
        t.length === 0 && t.ended ? tg(this) : Of(this),
        null
      );
    if (((e = qS(e, t)), e === 0 && t.ended))
      return t.length === 0 && tg(this), null;
    var i = t.needReadable;
    te("need readable", i),
      (t.length === 0 || t.length - e < t.highWaterMark) &&
        ((i = !0), te("length less than watermark", i)),
      t.ended || t.reading
        ? ((i = !1), te("reading or ended", i))
        : i &&
          (te("do read"),
          (t.reading = !0),
          (t.sync = !0),
          t.length === 0 && (t.needReadable = !0),
          this._read(t.highWaterMark),
          (t.sync = !1),
          t.reading || (e = qS(r, t)));
    var n;
    return (
      e > 0 ? (n = zS(e, t)) : (n = null),
      n === null
        ? ((t.needReadable = t.length <= t.highWaterMark), (e = 0))
        : ((t.length -= e), (t.awaitDrain = 0)),
      t.length === 0 &&
        (t.ended || (t.needReadable = !0), r !== e && t.ended && tg(this)),
      n !== null && this.emit("data", n),
      n
    );
  };
  function NB(e, t) {
    if ((te("onEofChunk"), !t.ended)) {
      if (t.decoder) {
        var r = t.decoder.end();
        r &&
          r.length &&
          (t.buffer.push(r), (t.length += t.objectMode ? 1 : r.length));
      }
      (t.ended = !0),
        t.sync
          ? Of(e)
          : ((t.needReadable = !1),
            t.emittedReadable || ((t.emittedReadable = !0), jS(e)));
    }
  }
  function Of(e) {
    var t = e._readableState;
    te("emitReadable", t.needReadable, t.emittedReadable),
      (t.needReadable = !1),
      t.emittedReadable ||
        (te("emitReadable", t.flowing),
        (t.emittedReadable = !0),
        process.nextTick(jS, e));
  }
  function jS(e) {
    var t = e._readableState;
    te("emitReadable_", t.destroyed, t.length, t.ended),
      !t.destroyed &&
        (t.length || t.ended) &&
        (e.emit("readable"), (t.emittedReadable = !1)),
      (t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark),
      ng(e);
  }
  function rg(e, t) {
    t.readingMore || ((t.readingMore = !0), process.nextTick(IB, e, t));
  }
  function IB(e, t) {
    for (
      ;
      !t.reading &&
      !t.ended &&
      (t.length < t.highWaterMark || (t.flowing && t.length === 0));

    ) {
      var r = t.length;
      if ((te("maybeReadMore read 0"), e.read(0), r === t.length)) break;
    }
    t.readingMore = !1;
  }
  oe.prototype._read = function (e) {
    so(this, new OB("_read()"));
  };
  oe.prototype.pipe = function (e, t) {
    var r = this,
      i = this._readableState;
    switch (i.pipesCount) {
      case 0:
        i.pipes = e;
        break;
      case 1:
        i.pipes = [i.pipes, e];
        break;
      default:
        i.pipes.push(e);
        break;
    }
    (i.pipesCount += 1), te("pipe count=%d opts=%j", i.pipesCount, t);
    var n =
        (!t || t.end !== !1) && e !== process.stdout && e !== process.stderr,
      s = n ? o : C;
    i.endEmitted ? process.nextTick(s) : r.once("end", s), e.on("unpipe", a);
    function a(E, O) {
      te("onunpipe"),
        E === r && O && O.hasUnpiped === !1 && ((O.hasUnpiped = !0), f());
    }
    function o() {
      te("onend"), e.end();
    }
    var u = MB(r);
    e.on("drain", u);
    var l = !1;
    function f() {
      te("cleanup"),
        e.removeListener("close", d),
        e.removeListener("finish", m),
        e.removeListener("drain", u),
        e.removeListener("error", c),
        e.removeListener("unpipe", a),
        r.removeListener("end", o),
        r.removeListener("end", C),
        r.removeListener("data", h),
        (l = !0),
        i.awaitDrain &&
          (!e._writableState || e._writableState.needDrain) &&
          u();
    }
    r.on("data", h);
    function h(E) {
      te("ondata");
      var O = e.write(E);
      te("dest.write", O),
        O === !1 &&
          (((i.pipesCount === 1 && i.pipes === e) ||
            (i.pipesCount > 1 && $S(i.pipes, e) !== -1)) &&
            !l &&
            (te("false write response, pause", i.awaitDrain), i.awaitDrain++),
          r.pause());
    }
    function c(E) {
      te("onerror", E),
        C(),
        e.removeListener("error", c),
        PS(e, "error") === 0 && so(e, E);
    }
    FB(e, "error", c);
    function d() {
      e.removeListener("finish", m), C();
    }
    e.once("close", d);
    function m() {
      te("onfinish"), e.removeListener("close", d), C();
    }
    e.once("finish", m);
    function C() {
      te("unpipe"), r.unpipe(e);
    }
    return e.emit("pipe", r), i.flowing || (te("pipe resume"), r.resume()), e;
  };
  function MB(e) {
    return function () {
      var r = e._readableState;
      te("pipeOnDrain", r.awaitDrain),
        r.awaitDrain && r.awaitDrain--,
        r.awaitDrain === 0 && PS(e, "data") && ((r.flowing = !0), ng(e));
    };
  }
  oe.prototype.unpipe = function (e) {
    var t = this._readableState,
      r = { hasUnpiped: !1 };
    if (t.pipesCount === 0) return this;
    if (t.pipesCount === 1)
      return e && e !== t.pipes
        ? this
        : (e || (e = t.pipes),
          (t.pipes = null),
          (t.pipesCount = 0),
          (t.flowing = !1),
          e && e.emit("unpipe", this, r),
          this);
    if (!e) {
      var i = t.pipes,
        n = t.pipesCount;
      (t.pipes = null), (t.pipesCount = 0), (t.flowing = !1);
      for (var s = 0; s < n; s++) i[s].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var a = $S(t.pipes, e);
    return a === -1
      ? this
      : (t.pipes.splice(a, 1),
        (t.pipesCount -= 1),
        t.pipesCount === 1 && (t.pipes = t.pipes[0]),
        e.emit("unpipe", this, r),
        this);
  };
  oe.prototype.on = function (e, t) {
    var r = ao.prototype.on.call(this, e, t),
      i = this._readableState;
    return (
      e === "data"
        ? ((i.readableListening = this.listenerCount("readable") > 0),
          i.flowing !== !1 && this.resume())
        : e === "readable" &&
          !i.endEmitted &&
          !i.readableListening &&
          ((i.readableListening = i.needReadable = !0),
          (i.flowing = !1),
          (i.emittedReadable = !1),
          te("on readable", i.length, i.reading),
          i.length ? Of(this) : i.reading || process.nextTick(LB, this)),
      r
    );
  };
  oe.prototype.addListener = oe.prototype.on;
  oe.prototype.removeListener = function (e, t) {
    var r = ao.prototype.removeListener.call(this, e, t);
    return e === "readable" && process.nextTick(US, this), r;
  };
  oe.prototype.removeAllListeners = function (e) {
    var t = ao.prototype.removeAllListeners.apply(this, arguments);
    return (e === "readable" || e === void 0) && process.nextTick(US, this), t;
  };
  function US(e) {
    var t = e._readableState;
    (t.readableListening = e.listenerCount("readable") > 0),
      t.resumeScheduled && !t.paused
        ? (t.flowing = !0)
        : e.listenerCount("data") > 0 && e.resume();
  }
  function LB(e) {
    te("readable nexttick read 0"), e.read(0);
  }
  oe.prototype.resume = function () {
    var e = this._readableState;
    return (
      e.flowing ||
        (te("resume"), (e.flowing = !e.readableListening), qB(this, e)),
      (e.paused = !1),
      this
    );
  };
  function qB(e, t) {
    t.resumeScheduled || ((t.resumeScheduled = !0), process.nextTick(PB, e, t));
  }
  function PB(e, t) {
    te("resume", t.reading),
      t.reading || e.read(0),
      (t.resumeScheduled = !1),
      e.emit("resume"),
      ng(e),
      t.flowing && !t.reading && e.read(0);
  }
  oe.prototype.pause = function () {
    return (
      te("call pause flowing=%j", this._readableState.flowing),
      this._readableState.flowing !== !1 &&
        (te("pause"), (this._readableState.flowing = !1), this.emit("pause")),
      (this._readableState.paused = !0),
      this
    );
  };
  function ng(e) {
    var t = e._readableState;
    for (te("flow", t.flowing); t.flowing && e.read() !== null; );
  }
  oe.prototype.wrap = function (e) {
    var t = this,
      r = this._readableState,
      i = !1;
    e.on("end", function () {
      if ((te("wrapped end"), r.decoder && !r.ended)) {
        var a = r.decoder.end();
        a && a.length && t.push(a);
      }
      t.push(null);
    }),
      e.on("data", function (a) {
        if (
          (te("wrapped data"),
          r.decoder && (a = r.decoder.write(a)),
          !(r.objectMode && a == null) && !(!r.objectMode && (!a || !a.length)))
        ) {
          var o = t.push(a);
          o || ((i = !0), e.pause());
        }
      });
    for (var n in e)
      this[n] === void 0 &&
        typeof e[n] == "function" &&
        (this[n] = (function (o) {
          return function () {
            return e[o].apply(e, arguments);
          };
        })(n));
    for (var s = 0; s < Jm.length; s++)
      e.on(Jm[s], this.emit.bind(this, Jm[s]));
    return (
      (this._read = function (a) {
        te("wrapped _read", a), i && ((i = !1), e.resume());
      }),
      this
    );
  };
  typeof Symbol == "function" &&
    (oe.prototype[Symbol.asyncIterator] = function () {
      return Km === void 0 && (Km = RS()), Km(this);
    });
  Object.defineProperty(oe.prototype, "readableHighWaterMark", {
    enumerable: !1,
    get: function () {
      return this._readableState.highWaterMark;
    },
  });
  Object.defineProperty(oe.prototype, "readableBuffer", {
    enumerable: !1,
    get: function () {
      return this._readableState && this._readableState.buffer;
    },
  });
  Object.defineProperty(oe.prototype, "readableFlowing", {
    enumerable: !1,
    get: function () {
      return this._readableState.flowing;
    },
    set: function (t) {
      this._readableState && (this._readableState.flowing = t);
    },
  });
  oe._fromList = zS;
  Object.defineProperty(oe.prototype, "readableLength", {
    enumerable: !1,
    get: function () {
      return this._readableState.length;
    },
  });
  function zS(e, t) {
    if (t.length === 0) return null;
    var r;
    return (
      t.objectMode
        ? (r = t.buffer.shift())
        : !e || e >= t.length
        ? (t.decoder
            ? (r = t.buffer.join(""))
            : t.buffer.length === 1
            ? (r = t.buffer.first())
            : (r = t.buffer.concat(t.length)),
          t.buffer.clear())
        : (r = t.buffer.consume(e, t.decoder)),
      r
    );
  }
  function tg(e) {
    var t = e._readableState;
    te("endReadable", t.endEmitted),
      t.endEmitted || ((t.ended = !0), process.nextTick(BB, t, e));
  }
  function BB(e, t) {
    if (
      (te("endReadableNT", e.endEmitted, e.length),
      !e.endEmitted &&
        e.length === 0 &&
        ((e.endEmitted = !0), (t.readable = !1), t.emit("end"), e.autoDestroy))
    ) {
      var r = t._writableState;
      (!r || (r.autoDestroy && r.finished)) && t.destroy();
    }
  }
  typeof Symbol == "function" &&
    (oe.from = function (e, t) {
      return Qm === void 0 && (Qm = MS()), Qm(oe, e, t);
    });
  function $S(e, t) {
    for (var r = 0, i = e.length; r < i; r++) if (e[r] === t) return r;
    return -1;
  }
});
var En = y((CQ, HS) => {
  "use strict";
  var kB =
    Object.keys ||
    function (e) {
      var t = [];
      for (var r in e) t.push(r);
      return t;
    };
  HS.exports = vr;
  var GS = sg(),
    og = Rf();
  je()(vr, GS);
  for (ag = kB(og.prototype), Tf = 0; Tf < ag.length; Tf++)
    (Ff = ag[Tf]), vr.prototype[Ff] || (vr.prototype[Ff] = og.prototype[Ff]);
  var ag, Ff, Tf;
  function vr(e) {
    if (!(this instanceof vr)) return new vr(e);
    GS.call(this, e),
      og.call(this, e),
      (this.allowHalfOpen = !0),
      e &&
        (e.readable === !1 && (this.readable = !1),
        e.writable === !1 && (this.writable = !1),
        e.allowHalfOpen === !1 &&
          ((this.allowHalfOpen = !1), this.once("end", jB)));
  }
  Object.defineProperty(vr.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function () {
      return this._writableState.highWaterMark;
    },
  });
  Object.defineProperty(vr.prototype, "writableBuffer", {
    enumerable: !1,
    get: function () {
      return this._writableState && this._writableState.getBuffer();
    },
  });
  Object.defineProperty(vr.prototype, "writableLength", {
    enumerable: !1,
    get: function () {
      return this._writableState.length;
    },
  });
  function jB() {
    this._writableState.ended || process.nextTick(UB, this);
  }
  function UB(e) {
    e.end();
  }
  Object.defineProperty(vr.prototype, "destroyed", {
    enumerable: !1,
    get: function () {
      return this._readableState === void 0 || this._writableState === void 0
        ? !1
        : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function (t) {
      this._readableState === void 0 ||
        this._writableState === void 0 ||
        ((this._readableState.destroyed = t),
        (this._writableState.destroyed = t));
    },
  });
});
var Rf = y((OQ, QS) => {
  "use strict";
  QS.exports = Oe;
  function YS(e) {
    var t = this;
    (this.next = null),
      (this.entry = null),
      (this.finish = function () {
        p4(t, e);
      });
  }
  var As;
  Oe.WritableState = uo;
  var zB = { deprecate: vf() },
    XS = Pm(),
    Nf = require("buffer").Buffer,
    $B = global.Uint8Array || function () {};
  function WB(e) {
    return Nf.from(e);
  }
  function GB(e) {
    return Nf.isBuffer(e) || e instanceof $B;
  }
  var lg = km(),
    HB = jm(),
    VB = HB.getHighWaterMark,
    Ti = Si().codes,
    YB = Ti.ERR_INVALID_ARG_TYPE,
    XB = Ti.ERR_METHOD_NOT_IMPLEMENTED,
    ZB = Ti.ERR_MULTIPLE_CALLBACK,
    KB = Ti.ERR_STREAM_CANNOT_PIPE,
    QB = Ti.ERR_STREAM_DESTROYED,
    JB = Ti.ERR_STREAM_NULL_VALUES,
    e4 = Ti.ERR_STREAM_WRITE_AFTER_END,
    t4 = Ti.ERR_UNKNOWN_ENCODING,
    Ns = lg.errorOrDestroy;
  je()(Oe, XS);
  function r4() {}
  function uo(e, t, r) {
    (As = As || En()),
      (e = e || {}),
      typeof r != "boolean" && (r = t instanceof As),
      (this.objectMode = !!e.objectMode),
      r && (this.objectMode = this.objectMode || !!e.writableObjectMode),
      (this.highWaterMark = VB(this, e, "writableHighWaterMark", r)),
      (this.finalCalled = !1),
      (this.needDrain = !1),
      (this.ending = !1),
      (this.ended = !1),
      (this.finished = !1),
      (this.destroyed = !1);
    var i = e.decodeStrings === !1;
    (this.decodeStrings = !i),
      (this.defaultEncoding = e.defaultEncoding || "utf8"),
      (this.length = 0),
      (this.writing = !1),
      (this.corked = 0),
      (this.sync = !0),
      (this.bufferProcessing = !1),
      (this.onwrite = function (n) {
        l4(t, n);
      }),
      (this.writecb = null),
      (this.writelen = 0),
      (this.bufferedRequest = null),
      (this.lastBufferedRequest = null),
      (this.pendingcb = 0),
      (this.prefinished = !1),
      (this.errorEmitted = !1),
      (this.emitClose = e.emitClose !== !1),
      (this.autoDestroy = !!e.autoDestroy),
      (this.bufferedRequestCount = 0),
      (this.corkedRequestsFree = new YS(this));
  }
  uo.prototype.getBuffer = function () {
    for (var t = this.bufferedRequest, r = []; t; ) r.push(t), (t = t.next);
    return r;
  };
  (function () {
    try {
      Object.defineProperty(uo.prototype, "buffer", {
        get: zB.deprecate(
          function () {
            return this.getBuffer();
          },
          "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.",
          "DEP0003",
        ),
      });
    } catch {}
  })();
  var Af;
  typeof Symbol == "function" &&
  Symbol.hasInstance &&
  typeof Function.prototype[Symbol.hasInstance] == "function"
    ? ((Af = Function.prototype[Symbol.hasInstance]),
      Object.defineProperty(Oe, Symbol.hasInstance, {
        value: function (t) {
          return Af.call(this, t)
            ? !0
            : this !== Oe
            ? !1
            : t && t._writableState instanceof uo;
        },
      }))
    : (Af = function (t) {
        return t instanceof this;
      });
  function Oe(e) {
    As = As || En();
    var t = this instanceof As;
    if (!t && !Af.call(Oe, this)) return new Oe(e);
    (this._writableState = new uo(e, this, t)),
      (this.writable = !0),
      e &&
        (typeof e.write == "function" && (this._write = e.write),
        typeof e.writev == "function" && (this._writev = e.writev),
        typeof e.destroy == "function" && (this._destroy = e.destroy),
        typeof e.final == "function" && (this._final = e.final)),
      XS.call(this);
  }
  Oe.prototype.pipe = function () {
    Ns(this, new KB());
  };
  function i4(e, t) {
    var r = new e4();
    Ns(e, r), process.nextTick(t, r);
  }
  function n4(e, t, r, i) {
    var n;
    return (
      r === null
        ? (n = new JB())
        : typeof r != "string" &&
          !t.objectMode &&
          (n = new YB("chunk", ["string", "Buffer"], r)),
      n ? (Ns(e, n), process.nextTick(i, n), !1) : !0
    );
  }
  Oe.prototype.write = function (e, t, r) {
    var i = this._writableState,
      n = !1,
      s = !i.objectMode && GB(e);
    return (
      s && !Nf.isBuffer(e) && (e = WB(e)),
      typeof t == "function" && ((r = t), (t = null)),
      s ? (t = "buffer") : t || (t = i.defaultEncoding),
      typeof r != "function" && (r = r4),
      i.ending
        ? i4(this, r)
        : (s || n4(this, i, e, r)) &&
          (i.pendingcb++, (n = a4(this, i, s, e, t, r))),
      n
    );
  };
  Oe.prototype.cork = function () {
    this._writableState.corked++;
  };
  Oe.prototype.uncork = function () {
    var e = this._writableState;
    e.corked &&
      (e.corked--,
      !e.writing &&
        !e.corked &&
        !e.bufferProcessing &&
        e.bufferedRequest &&
        ZS(this, e));
  };
  Oe.prototype.setDefaultEncoding = function (t) {
    if (
      (typeof t == "string" && (t = t.toLowerCase()),
      !(
        [
          "hex",
          "utf8",
          "utf-8",
          "ascii",
          "binary",
          "base64",
          "ucs2",
          "ucs-2",
          "utf16le",
          "utf-16le",
          "raw",
        ].indexOf((t + "").toLowerCase()) > -1
      ))
    )
      throw new t4(t);
    return (this._writableState.defaultEncoding = t), this;
  };
  Object.defineProperty(Oe.prototype, "writableBuffer", {
    enumerable: !1,
    get: function () {
      return this._writableState && this._writableState.getBuffer();
    },
  });
  function s4(e, t, r) {
    return (
      !e.objectMode &&
        e.decodeStrings !== !1 &&
        typeof t == "string" &&
        (t = Nf.from(t, r)),
      t
    );
  }
  Object.defineProperty(Oe.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function () {
      return this._writableState.highWaterMark;
    },
  });
  function a4(e, t, r, i, n, s) {
    if (!r) {
      var a = s4(t, i, n);
      i !== a && ((r = !0), (n = "buffer"), (i = a));
    }
    var o = t.objectMode ? 1 : i.length;
    t.length += o;
    var u = t.length < t.highWaterMark;
    if ((u || (t.needDrain = !0), t.writing || t.corked)) {
      var l = t.lastBufferedRequest;
      (t.lastBufferedRequest = {
        chunk: i,
        encoding: n,
        isBuf: r,
        callback: s,
        next: null,
      }),
        l
          ? (l.next = t.lastBufferedRequest)
          : (t.bufferedRequest = t.lastBufferedRequest),
        (t.bufferedRequestCount += 1);
    } else ug(e, t, !1, o, i, n, s);
    return u;
  }
  function ug(e, t, r, i, n, s, a) {
    (t.writelen = i),
      (t.writecb = a),
      (t.writing = !0),
      (t.sync = !0),
      t.destroyed
        ? t.onwrite(new QB("write"))
        : r
        ? e._writev(n, t.onwrite)
        : e._write(n, s, t.onwrite),
      (t.sync = !1);
  }
  function o4(e, t, r, i, n) {
    --t.pendingcb,
      r
        ? (process.nextTick(n, i),
          process.nextTick(oo, e, t),
          (e._writableState.errorEmitted = !0),
          Ns(e, i))
        : (n(i), (e._writableState.errorEmitted = !0), Ns(e, i), oo(e, t));
  }
  function u4(e) {
    (e.writing = !1),
      (e.writecb = null),
      (e.length -= e.writelen),
      (e.writelen = 0);
  }
  function l4(e, t) {
    var r = e._writableState,
      i = r.sync,
      n = r.writecb;
    if (typeof n != "function") throw new ZB();
    if ((u4(r), t)) o4(e, r, i, t, n);
    else {
      var s = KS(r) || e.destroyed;
      !s && !r.corked && !r.bufferProcessing && r.bufferedRequest && ZS(e, r),
        i ? process.nextTick(VS, e, r, s, n) : VS(e, r, s, n);
    }
  }
  function VS(e, t, r, i) {
    r || f4(e, t), t.pendingcb--, i(), oo(e, t);
  }
  function f4(e, t) {
    t.length === 0 && t.needDrain && ((t.needDrain = !1), e.emit("drain"));
  }
  function ZS(e, t) {
    t.bufferProcessing = !0;
    var r = t.bufferedRequest;
    if (e._writev && r && r.next) {
      var i = t.bufferedRequestCount,
        n = new Array(i),
        s = t.corkedRequestsFree;
      s.entry = r;
      for (var a = 0, o = !0; r; )
        (n[a] = r), r.isBuf || (o = !1), (r = r.next), (a += 1);
      (n.allBuffers = o),
        ug(e, t, !0, t.length, n, "", s.finish),
        t.pendingcb++,
        (t.lastBufferedRequest = null),
        s.next
          ? ((t.corkedRequestsFree = s.next), (s.next = null))
          : (t.corkedRequestsFree = new YS(t)),
        (t.bufferedRequestCount = 0);
    } else {
      for (; r; ) {
        var u = r.chunk,
          l = r.encoding,
          f = r.callback,
          h = t.objectMode ? 1 : u.length;
        if (
          (ug(e, t, !1, h, u, l, f),
          (r = r.next),
          t.bufferedRequestCount--,
          t.writing)
        )
          break;
      }
      r === null && (t.lastBufferedRequest = null);
    }
    (t.bufferedRequest = r), (t.bufferProcessing = !1);
  }
  Oe.prototype._write = function (e, t, r) {
    r(new XB("_write()"));
  };
  Oe.prototype._writev = null;
  Oe.prototype.end = function (e, t, r) {
    var i = this._writableState;
    return (
      typeof e == "function"
        ? ((r = e), (e = null), (t = null))
        : typeof t == "function" && ((r = t), (t = null)),
      e != null && this.write(e, t),
      i.corked && ((i.corked = 1), this.uncork()),
      i.ending || d4(this, i, r),
      this
    );
  };
  Object.defineProperty(Oe.prototype, "writableLength", {
    enumerable: !1,
    get: function () {
      return this._writableState.length;
    },
  });
  function KS(e) {
    return (
      e.ending &&
      e.length === 0 &&
      e.bufferedRequest === null &&
      !e.finished &&
      !e.writing
    );
  }
  function h4(e, t) {
    e._final(function (r) {
      t.pendingcb--,
        r && Ns(e, r),
        (t.prefinished = !0),
        e.emit("prefinish"),
        oo(e, t);
    });
  }
  function c4(e, t) {
    !t.prefinished &&
      !t.finalCalled &&
      (typeof e._final == "function" && !t.destroyed
        ? (t.pendingcb++, (t.finalCalled = !0), process.nextTick(h4, e, t))
        : ((t.prefinished = !0), e.emit("prefinish")));
  }
  function oo(e, t) {
    var r = KS(t);
    if (
      r &&
      (c4(e, t),
      t.pendingcb === 0 && ((t.finished = !0), e.emit("finish"), t.autoDestroy))
    ) {
      var i = e._readableState;
      (!i || (i.autoDestroy && i.endEmitted)) && e.destroy();
    }
    return r;
  }
  function d4(e, t, r) {
    (t.ending = !0),
      oo(e, t),
      r && (t.finished ? process.nextTick(r) : e.once("finish", r)),
      (t.ended = !0),
      (e.writable = !1);
  }
  function p4(e, t, r) {
    var i = e.entry;
    for (e.entry = null; i; ) {
      var n = i.callback;
      t.pendingcb--, n(r), (i = i.next);
    }
    t.corkedRequestsFree.next = e;
  }
  Object.defineProperty(Oe.prototype, "destroyed", {
    enumerable: !1,
    get: function () {
      return this._writableState === void 0
        ? !1
        : this._writableState.destroyed;
    },
    set: function (t) {
      !this._writableState || (this._writableState.destroyed = t);
    },
  });
  Oe.prototype.destroy = lg.destroy;
  Oe.prototype._undestroy = lg.undestroy;
  Oe.prototype._destroy = function (e, t) {
    t(e);
  };
});
var hg = y((TQ, e2) => {
  "use strict";
  var m4 = require("util"),
    { LEVEL: fg } = Me(),
    JS = _n(),
    lo = (e2.exports = function (t = {}) {
      if (
        (JS.call(this, t), !t.transport || typeof t.transport.log != "function")
      )
        throw new Error(
          "Invalid transport, must be an object with a log method.",
        );
      (this.transport = t.transport),
        (this.level = this.level || t.transport.level),
        (this.handleExceptions =
          this.handleExceptions || t.transport.handleExceptions),
        this._deprecated();
      function r(i) {
        this.emit("error", i, this.transport);
      }
      this.transport.__winstonError ||
        ((this.transport.__winstonError = r.bind(this)),
        this.transport.on("error", this.transport.__winstonError));
    });
  m4.inherits(lo, JS);
  lo.prototype._write = function (t, r, i) {
    if (this.silent || (t.exception === !0 && !this.handleExceptions))
      return i(null);
    (!this.level || this.levels[this.level] >= this.levels[t[fg]]) &&
      this.transport.log(t[fg], t.message, t, this._nop),
      i(null);
  };
  lo.prototype._writev = function (t, r) {
    for (let i = 0; i < t.length; i++)
      this._accept(t[i]) &&
        (this.transport.log(
          t[i].chunk[fg],
          t[i].chunk.message,
          t[i].chunk,
          this._nop,
        ),
        t[i].callback());
    return r(null);
  };
  lo.prototype._deprecated = function () {
    console.error(
      [
        `${this.transport.name} is a legacy winston transport. Consider upgrading: `,
        "- Upgrade docs: https://github.com/winstonjs/winston/blob/master/UPGRADE-3.0.md",
      ].join(`
`),
    );
  };
  lo.prototype.close = function () {
    this.transport.close && this.transport.close(),
      this.transport.__winstonError &&
        (this.transport.removeListener("error", this.transport.__winstonError),
        (this.transport.__winstonError = null));
  };
});
var _n = y((FQ, cg) => {
  "use strict";
  var g4 = require("util"),
    t2 = Rf(),
    { LEVEL: r2 } = Me(),
    fo = (cg.exports = function (t = {}) {
      t2.call(this, { objectMode: !0, highWaterMark: t.highWaterMark }),
        (this.format = t.format),
        (this.level = t.level),
        (this.handleExceptions = t.handleExceptions),
        (this.handleRejections = t.handleRejections),
        (this.silent = t.silent),
        t.log && (this.log = t.log),
        t.logv && (this.logv = t.logv),
        t.close && (this.close = t.close),
        this.once("pipe", (r) => {
          (this.levels = r.levels), (this.parent = r);
        }),
        this.once("unpipe", (r) => {
          r === this.parent &&
            ((this.parent = null), this.close && this.close());
        });
    });
  g4.inherits(fo, t2);
  fo.prototype._write = function (t, r, i) {
    if (this.silent || (t.exception === !0 && !this.handleExceptions))
      return i(null);
    let n = this.level || (this.parent && this.parent.level);
    if (!n || this.levels[n] >= this.levels[t[r2]]) {
      if (t && !this.format) return this.log(t, i);
      let s, a;
      try {
        a = this.format.transform(Object.assign({}, t), this.format.options);
      } catch (o) {
        s = o;
      }
      if (s || !a) {
        if ((i(), s)) throw s;
        return;
      }
      return this.log(a, i);
    }
    return (this._writableState.sync = !1), i(null);
  };
  fo.prototype._writev = function (t, r) {
    if (this.logv) {
      let i = t.filter(this._accept, this);
      return i.length ? this.logv(i, r) : r(null);
    }
    for (let i = 0; i < t.length; i++) {
      if (!this._accept(t[i])) continue;
      if (t[i].chunk && !this.format) {
        this.log(t[i].chunk, t[i].callback);
        continue;
      }
      let n, s;
      try {
        s = this.format.transform(
          Object.assign({}, t[i].chunk),
          this.format.options,
        );
      } catch (a) {
        n = a;
      }
      if (n || !s) {
        if ((t[i].callback(), n)) throw (r(null), n);
      } else this.log(s, t[i].callback);
    }
    return r(null);
  };
  fo.prototype._accept = function (t) {
    let r = t.chunk;
    if (this.silent) return !1;
    let i = this.level || (this.parent && this.parent.level);
    return !!(
      (r.exception === !0 || !i || this.levels[i] >= this.levels[r[r2]]) &&
      (this.handleExceptions || r.exception !== !0)
    );
  };
  fo.prototype._nop = function () {};
  cg.exports.LegacyTransportStream = hg();
});
var s2 = y((AQ, n2) => {
  "use strict";
  var y4 = require("os"),
    { LEVEL: i2, MESSAGE: Is } = Me(),
    v4 = _n();
  n2.exports = class extends v4 {
    constructor(t = {}) {
      super(t),
        (this.name = t.name || "console"),
        (this.stderrLevels = this._stringArrayToSet(t.stderrLevels)),
        (this.consoleWarnLevels = this._stringArrayToSet(t.consoleWarnLevels)),
        (this.eol = typeof t.eol == "string" ? t.eol : y4.EOL),
        this.setMaxListeners(30);
    }
    log(t, r) {
      if (
        (setImmediate(() => this.emit("logged", t)), this.stderrLevels[t[i2]])
      ) {
        console._stderr
          ? console._stderr.write(`${t[Is]}${this.eol}`)
          : console.error(t[Is]),
          r && r();
        return;
      } else if (this.consoleWarnLevels[t[i2]]) {
        console._stderr
          ? console._stderr.write(`${t[Is]}${this.eol}`)
          : console.warn(t[Is]),
          r && r();
        return;
      }
      console._stdout
        ? console._stdout.write(`${t[Is]}${this.eol}`)
        : console.log(t[Is]),
        r && r();
    }
    _stringArrayToSet(t, r) {
      if (!t) return {};
      if (
        ((r =
          r || "Cannot make set from type other than Array of string elements"),
        !Array.isArray(t))
      )
        throw new Error(r);
      return t.reduce((i, n) => {
        if (typeof n != "string") throw new Error(r);
        return (i[n] = !0), i;
      }, {});
    }
  };
});
var Mf = y((If, a2) => {
  "use strict";
  Object.defineProperty(If, "__esModule", { value: !0 });
  If.default = w4;
  function w4(e) {
    return (
      e && typeof e.length == "number" && e.length >= 0 && e.length % 1 === 0
    );
  }
  a2.exports = If.default;
});
var u2 = y((Lf, o2) => {
  "use strict";
  Object.defineProperty(Lf, "__esModule", { value: !0 });
  Lf.default = function (e) {
    return function (...t) {
      var r = t.pop();
      return e.call(this, t, r);
    };
  };
  o2.exports = Lf.default;
});
var h2 = y((Fi) => {
  "use strict";
  Object.defineProperty(Fi, "__esModule", { value: !0 });
  Fi.fallback = l2;
  Fi.wrap = f2;
  var D4 = (Fi.hasQueueMicrotask =
      typeof queueMicrotask == "function" && queueMicrotask),
    b4 = (Fi.hasSetImmediate =
      typeof setImmediate == "function" && setImmediate),
    E4 = (Fi.hasNextTick =
      typeof process == "object" && typeof process.nextTick == "function");
  function l2(e) {
    setTimeout(e, 0);
  }
  function f2(e) {
    return (t, ...r) => e(() => t(...r));
  }
  var ho;
  D4
    ? (ho = queueMicrotask)
    : b4
    ? (ho = setImmediate)
    : E4
    ? (ho = process.nextTick)
    : (ho = l2);
  Fi.default = f2(ho);
});
var g2 = y((qf, m2) => {
  "use strict";
  Object.defineProperty(qf, "__esModule", { value: !0 });
  qf.default = T4;
  var _4 = u2(),
    S4 = p2(_4),
    x4 = h2(),
    C4 = p2(x4),
    O4 = Sn();
  function p2(e) {
    return e && e.__esModule ? e : { default: e };
  }
  function T4(e) {
    return (0, O4.isAsync)(e)
      ? function (...t) {
          let r = t.pop(),
            i = e.apply(this, t);
          return c2(i, r);
        }
      : (0, S4.default)(function (t, r) {
          var i;
          try {
            i = e.apply(this, t);
          } catch (n) {
            return r(n);
          }
          if (i && typeof i.then == "function") return c2(i, r);
          r(null, i);
        });
  }
  function c2(e, t) {
    return e.then(
      (r) => {
        d2(t, null, r);
      },
      (r) => {
        d2(t, r && r.message ? r : new Error(r));
      },
    );
  }
  function d2(e, t, r) {
    try {
      e(t, r);
    } catch (i) {
      (0, C4.default)((n) => {
        throw n;
      }, i);
    }
  }
  m2.exports = qf.default;
});
var Sn = y((Ur) => {
  "use strict";
  Object.defineProperty(Ur, "__esModule", { value: !0 });
  Ur.isAsyncIterable = Ur.isAsyncGenerator = Ur.isAsync = void 0;
  var F4 = g2(),
    R4 = A4(F4);
  function A4(e) {
    return e && e.__esModule ? e : { default: e };
  }
  function y2(e) {
    return e[Symbol.toStringTag] === "AsyncFunction";
  }
  function N4(e) {
    return e[Symbol.toStringTag] === "AsyncGenerator";
  }
  function I4(e) {
    return typeof e[Symbol.asyncIterator] == "function";
  }
  function M4(e) {
    if (typeof e != "function") throw new Error("expected a function");
    return y2(e) ? (0, R4.default)(e) : e;
  }
  Ur.default = M4;
  Ur.isAsync = y2;
  Ur.isAsyncGenerator = N4;
  Ur.isAsyncIterable = I4;
});
var Ms = y((Pf, v2) => {
  "use strict";
  Object.defineProperty(Pf, "__esModule", { value: !0 });
  Pf.default = L4;
  function L4(e, t = e.length) {
    if (!t) throw new Error("arity is undefined");
    function r(...i) {
      return typeof i[t - 1] == "function"
        ? e.apply(this, i)
        : new Promise((n, s) => {
            (i[t - 1] = (a, ...o) => {
              if (a) return s(a);
              n(o.length > 1 ? o : o[0]);
            }),
              e.apply(this, i);
          });
    }
    return r;
  }
  v2.exports = Pf.default;
});
var D2 = y((Bf, w2) => {
  "use strict";
  Object.defineProperty(Bf, "__esModule", { value: !0 });
  var q4 = Mf(),
    P4 = dg(q4),
    B4 = Sn(),
    k4 = dg(B4),
    j4 = Ms(),
    U4 = dg(j4);
  function dg(e) {
    return e && e.__esModule ? e : { default: e };
  }
  Bf.default = (0, U4.default)((e, t, r) => {
    var i = (0, P4.default)(t) ? [] : {};
    e(
      t,
      (n, s, a) => {
        (0, k4.default)(n)((o, ...u) => {
          u.length < 2 && ([u] = u), (i[s] = u), a(o);
        });
      },
      (n) => r(n, i),
    );
  }, 3);
  w2.exports = Bf.default;
});
var pg = y((kf, b2) => {
  "use strict";
  Object.defineProperty(kf, "__esModule", { value: !0 });
  kf.default = z4;
  function z4(e) {
    function t(...r) {
      if (e !== null) {
        var i = e;
        (e = null), i.apply(this, r);
      }
    }
    return Object.assign(t, e), t;
  }
  b2.exports = kf.default;
});
var _2 = y((jf, E2) => {
  "use strict";
  Object.defineProperty(jf, "__esModule", { value: !0 });
  jf.default = function (e) {
    return e[Symbol.iterator] && e[Symbol.iterator]();
  };
  E2.exports = jf.default;
});
var C2 = y((Uf, x2) => {
  "use strict";
  Object.defineProperty(Uf, "__esModule", { value: !0 });
  Uf.default = Z4;
  var $4 = Mf(),
    W4 = S2($4),
    G4 = _2(),
    H4 = S2(G4);
  function S2(e) {
    return e && e.__esModule ? e : { default: e };
  }
  function V4(e) {
    var t = -1,
      r = e.length;
    return function () {
      return ++t < r ? { value: e[t], key: t } : null;
    };
  }
  function Y4(e) {
    var t = -1;
    return function () {
      var i = e.next();
      return i.done ? null : (t++, { value: i.value, key: t });
    };
  }
  function X4(e) {
    var t = e ? Object.keys(e) : [],
      r = -1,
      i = t.length;
    return function n() {
      var s = t[++r];
      return s === "__proto__" ? n() : r < i ? { value: e[s], key: s } : null;
    };
  }
  function Z4(e) {
    if ((0, W4.default)(e)) return V4(e);
    var t = (0, H4.default)(e);
    return t ? Y4(t) : X4(e);
  }
  x2.exports = Uf.default;
});
var mg = y((zf, O2) => {
  "use strict";
  Object.defineProperty(zf, "__esModule", { value: !0 });
  zf.default = K4;
  function K4(e) {
    return function (...t) {
      if (e === null) throw new Error("Callback was already called.");
      var r = e;
      (e = null), r.apply(this, t);
    };
  }
  O2.exports = zf.default;
});
var Wf = y(($f, T2) => {
  "use strict";
  Object.defineProperty($f, "__esModule", { value: !0 });
  var Q4 = {};
  $f.default = Q4;
  T2.exports = $f.default;
});
var R2 = y((Gf, F2) => {
  "use strict";
  Object.defineProperty(Gf, "__esModule", { value: !0 });
  Gf.default = rk;
  var J4 = Wf(),
    ek = tk(J4);
  function tk(e) {
    return e && e.__esModule ? e : { default: e };
  }
  function rk(e, t, r, i) {
    let n = !1,
      s = !1,
      a = !1,
      o = 0,
      u = 0;
    function l() {
      o >= t ||
        a ||
        n ||
        ((a = !0),
        e
          .next()
          .then(({ value: c, done: d }) => {
            if (!(s || n)) {
              if (((a = !1), d)) {
                (n = !0), o <= 0 && i(null);
                return;
              }
              o++, r(c, u, f), u++, l();
            }
          })
          .catch(h));
    }
    function f(c, d) {
      if (((o -= 1), !s)) {
        if (c) return h(c);
        if (c === !1) {
          (n = !0), (s = !0);
          return;
        }
        if (d === ek.default || (n && o <= 0)) return (n = !0), i(null);
        l();
      }
    }
    function h(c) {
      s || ((a = !1), (n = !0), i(c));
    }
    l();
  }
  F2.exports = Gf.default;
});
var M2 = y((Hf, I2) => {
  "use strict";
  Object.defineProperty(Hf, "__esModule", { value: !0 });
  var ik = pg(),
    nk = co(ik),
    sk = C2(),
    ak = co(sk),
    ok = mg(),
    uk = co(ok),
    A2 = Sn(),
    lk = R2(),
    N2 = co(lk),
    fk = Wf(),
    hk = co(fk);
  function co(e) {
    return e && e.__esModule ? e : { default: e };
  }
  Hf.default = (e) => (t, r, i) => {
    if (((i = (0, nk.default)(i)), e <= 0))
      throw new RangeError("concurrency limit cannot be less than 1");
    if (!t) return i(null);
    if ((0, A2.isAsyncGenerator)(t)) return (0, N2.default)(t, e, r, i);
    if ((0, A2.isAsyncIterable)(t))
      return (0, N2.default)(t[Symbol.asyncIterator](), e, r, i);
    var n = (0, ak.default)(t),
      s = !1,
      a = !1,
      o = 0,
      u = !1;
    function l(h, c) {
      if (!a)
        if (((o -= 1), h)) (s = !0), i(h);
        else if (h === !1) (s = !0), (a = !0);
        else {
          if (c === hk.default || (s && o <= 0)) return (s = !0), i(null);
          u || f();
        }
    }
    function f() {
      for (u = !0; o < e && !s; ) {
        var h = n();
        if (h === null) {
          (s = !0), o <= 0 && i(null);
          return;
        }
        (o += 1), r(h.value, h.key, (0, uk.default)(l));
      }
      u = !1;
    }
    f();
  };
  I2.exports = Hf.default;
});
var yg = y((Vf, L2) => {
  "use strict";
  Object.defineProperty(Vf, "__esModule", { value: !0 });
  var ck = M2(),
    dk = gg(ck),
    pk = Sn(),
    mk = gg(pk),
    gk = Ms(),
    yk = gg(gk);
  function gg(e) {
    return e && e.__esModule ? e : { default: e };
  }
  function vk(e, t, r, i) {
    return (0, dk.default)(t)(e, (0, mk.default)(r), i);
  }
  Vf.default = (0, yk.default)(vk, 4);
  L2.exports = Vf.default;
});
var B2 = y((Yf, P2) => {
  "use strict";
  Object.defineProperty(Yf, "__esModule", { value: !0 });
  var wk = yg(),
    Dk = q2(wk),
    bk = Ms(),
    Ek = q2(bk);
  function q2(e) {
    return e && e.__esModule ? e : { default: e };
  }
  function _k(e, t, r) {
    return (0, Dk.default)(e, 1, t, r);
  }
  Yf.default = (0, Ek.default)(_k, 3);
  P2.exports = Yf.default;
});
var U2 = y((Xf, j2) => {
  "use strict";
  Object.defineProperty(Xf, "__esModule", { value: !0 });
  Xf.default = Tk;
  var Sk = D2(),
    xk = k2(Sk),
    Ck = B2(),
    Ok = k2(Ck);
  function k2(e) {
    return e && e.__esModule ? e : { default: e };
  }
  function Tk(e, t) {
    return (0, xk.default)(Ok.default, e, t);
  }
  j2.exports = Xf.default;
});
var vg = y((MQ, $2) => {
  "use strict";
  $2.exports = zr;
  var Zf = Si().codes,
    Fk = Zf.ERR_METHOD_NOT_IMPLEMENTED,
    Rk = Zf.ERR_MULTIPLE_CALLBACK,
    Ak = Zf.ERR_TRANSFORM_ALREADY_TRANSFORMING,
    Nk = Zf.ERR_TRANSFORM_WITH_LENGTH_0,
    Kf = En();
  je()(zr, Kf);
  function Ik(e, t) {
    var r = this._transformState;
    r.transforming = !1;
    var i = r.writecb;
    if (i === null) return this.emit("error", new Rk());
    (r.writechunk = null), (r.writecb = null), t != null && this.push(t), i(e);
    var n = this._readableState;
    (n.reading = !1),
      (n.needReadable || n.length < n.highWaterMark) &&
        this._read(n.highWaterMark);
  }
  function zr(e) {
    if (!(this instanceof zr)) return new zr(e);
    Kf.call(this, e),
      (this._transformState = {
        afterTransform: Ik.bind(this),
        needTransform: !1,
        transforming: !1,
        writecb: null,
        writechunk: null,
        writeencoding: null,
      }),
      (this._readableState.needReadable = !0),
      (this._readableState.sync = !1),
      e &&
        (typeof e.transform == "function" && (this._transform = e.transform),
        typeof e.flush == "function" && (this._flush = e.flush)),
      this.on("prefinish", Mk);
  }
  function Mk() {
    var e = this;
    typeof this._flush == "function" && !this._readableState.destroyed
      ? this._flush(function (t, r) {
          z2(e, t, r);
        })
      : z2(this, null, null);
  }
  zr.prototype.push = function (e, t) {
    return (
      (this._transformState.needTransform = !1),
      Kf.prototype.push.call(this, e, t)
    );
  };
  zr.prototype._transform = function (e, t, r) {
    r(new Fk("_transform()"));
  };
  zr.prototype._write = function (e, t, r) {
    var i = this._transformState;
    if (
      ((i.writecb = r),
      (i.writechunk = e),
      (i.writeencoding = t),
      !i.transforming)
    ) {
      var n = this._readableState;
      (i.needTransform || n.needReadable || n.length < n.highWaterMark) &&
        this._read(n.highWaterMark);
    }
  };
  zr.prototype._read = function (e) {
    var t = this._transformState;
    t.writechunk !== null && !t.transforming
      ? ((t.transforming = !0),
        this._transform(t.writechunk, t.writeencoding, t.afterTransform))
      : (t.needTransform = !0);
  };
  zr.prototype._destroy = function (e, t) {
    Kf.prototype._destroy.call(this, e, function (r) {
      t(r);
    });
  };
  function z2(e, t, r) {
    if (t) return e.emit("error", t);
    if ((r != null && e.push(r), e._writableState.length)) throw new Nk();
    if (e._transformState.transforming) throw new Ak();
    return e.push(null);
  }
});
var H2 = y((LQ, G2) => {
  "use strict";
  G2.exports = po;
  var W2 = vg();
  je()(po, W2);
  function po(e) {
    if (!(this instanceof po)) return new po(e);
    W2.call(this, e);
  }
  po.prototype._transform = function (e, t, r) {
    r(null, e);
  };
});
var K2 = y((qQ, Z2) => {
  "use strict";
  var wg;
  function Lk(e) {
    var t = !1;
    return function () {
      t || ((t = !0), e.apply(void 0, arguments));
    };
  }
  var X2 = Si().codes,
    qk = X2.ERR_MISSING_ARGS,
    Pk = X2.ERR_STREAM_DESTROYED;
  function V2(e) {
    if (e) throw e;
  }
  function Bk(e) {
    return e.setHeader && typeof e.abort == "function";
  }
  function kk(e, t, r, i) {
    i = Lk(i);
    var n = !1;
    e.on("close", function () {
      n = !0;
    }),
      wg === void 0 && (wg = Ef()),
      wg(e, { readable: t, writable: r }, function (a) {
        if (a) return i(a);
        (n = !0), i();
      });
    var s = !1;
    return function (a) {
      if (!n && !s) {
        if (((s = !0), Bk(e))) return e.abort();
        if (typeof e.destroy == "function") return e.destroy();
        i(a || new Pk("pipe"));
      }
    };
  }
  function Y2(e) {
    e();
  }
  function jk(e, t) {
    return e.pipe(t);
  }
  function Uk(e) {
    return !e.length || typeof e[e.length - 1] != "function" ? V2 : e.pop();
  }
  function zk() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    var i = Uk(t);
    if ((Array.isArray(t[0]) && (t = t[0]), t.length < 2))
      throw new qk("streams");
    var n,
      s = t.map(function (a, o) {
        var u = o < t.length - 1,
          l = o > 0;
        return kk(a, u, l, function (f) {
          n || (n = f), f && s.forEach(Y2), !u && (s.forEach(Y2), i(n));
        });
      });
    return t.reduce(jk);
  }
  Z2.exports = zk;
});
var at = y((Xt, go) => {
  var mo = require("stream");
  process.env.READABLE_STREAM === "disable" && mo
    ? ((go.exports = mo.Readable),
      Object.assign(go.exports, mo),
      (go.exports.Stream = mo))
    : ((Xt = go.exports = sg()),
      (Xt.Stream = mo || Xt),
      (Xt.Readable = Xt),
      (Xt.Writable = Rf()),
      (Xt.Duplex = En()),
      (Xt.Transform = vg()),
      (Xt.PassThrough = H2()),
      (Xt.finished = Ef()),
      (Xt.pipeline = K2()));
});
var Cg = y((PQ, J2) => {
  var Ls = [],
    yo = [],
    Dg = function () {};
  function Eg(e) {
    return ~Ls.indexOf(e) ? !1 : (Ls.push(e), !0);
  }
  function _g(e) {
    Dg = e;
  }
  function $k(e) {
    for (var t = [], r = 0; r < Ls.length; r++) {
      if (Ls[r].async) {
        t.push(Ls[r]);
        continue;
      }
      if (Ls[r](e)) return !0;
    }
    return t.length
      ? new Promise(function (n) {
          Promise.all(
            t.map(function (a) {
              return a(e);
            }),
          ).then(function (a) {
            n(a.some(Boolean));
          });
        })
      : !1;
  }
  function Sg(e) {
    return ~yo.indexOf(e) ? !1 : (yo.push(e), !0);
  }
  function bg() {
    Dg.apply(Dg, arguments);
  }
  function Q2(e) {
    for (var t = 0; t < yo.length; t++) e = yo[t].apply(yo[t], arguments);
    return e;
  }
  function xg(e, t) {
    var r = Object.prototype.hasOwnProperty;
    for (var i in t) r.call(t, i) && (e[i] = t[i]);
    return e;
  }
  function Wk(e) {
    return (
      (e.enabled = !1),
      (e.modify = Sg),
      (e.set = _g),
      (e.use = Eg),
      xg(function () {
        return !1;
      }, e)
    );
  }
  function Gk(e) {
    function t() {
      var r = Array.prototype.slice.call(arguments, 0);
      return bg.call(bg, e, Q2(r, e)), !0;
    }
    return (
      (e.enabled = !0), (e.modify = Sg), (e.set = _g), (e.use = Eg), xg(t, e)
    );
  }
  J2.exports = function (t) {
    return (
      (t.introduce = xg),
      (t.enabled = $k),
      (t.process = Q2),
      (t.modify = Sg),
      (t.write = bg),
      (t.nope = Wk),
      (t.yep = Gk),
      (t.set = _g),
      (t.use = Eg),
      t
    );
  };
});
var tx = y((BQ, ex) => {
  var Hk = Cg(),
    Vk = Hk(function e(t, r) {
      return (
        (r = r || {}),
        (r.namespace = t),
        (r.prod = !0),
        (r.dev = !1),
        r.force || e.force ? e.yep(r) : e.nope(r)
      );
    });
  ex.exports = Vk;
});
var ix = y((kQ, rx) => {
  "use strict";
  rx.exports = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50],
  };
});
var sx = y((jQ, nx) => {
  nx.exports = function (t) {
    return !t || typeof t == "string"
      ? !1
      : t instanceof Array ||
          Array.isArray(t) ||
          (t.length >= 0 &&
            (t.splice instanceof Function ||
              (Object.getOwnPropertyDescriptor(t, t.length - 1) &&
                t.constructor.name !== "String")));
  };
});
var ux = y((UQ, ox) => {
  "use strict";
  var Yk = sx(),
    Xk = Array.prototype.concat,
    Zk = Array.prototype.slice,
    ax = (ox.exports = function (t) {
      for (var r = [], i = 0, n = t.length; i < n; i++) {
        var s = t[i];
        Yk(s) ? (r = Xk.call(r, Zk.call(s))) : r.push(s);
      }
      return r;
    });
  ax.wrap = function (e) {
    return function () {
      return e(ax(arguments));
    };
  };
});
var cx = y((zQ, hx) => {
  var vo = ix(),
    wo = ux(),
    lx = Object.hasOwnProperty,
    fx = Object.create(null);
  for (Qf in vo) lx.call(vo, Qf) && (fx[vo[Qf]] = Qf);
  var Qf,
    At = (hx.exports = { to: {}, get: {} });
  At.get = function (e) {
    var t = e.substring(0, 3).toLowerCase(),
      r,
      i;
    switch (t) {
      case "hsl":
        (r = At.get.hsl(e)), (i = "hsl");
        break;
      case "hwb":
        (r = At.get.hwb(e)), (i = "hwb");
        break;
      default:
        (r = At.get.rgb(e)), (i = "rgb");
        break;
    }
    return r ? { model: i, value: r } : null;
  };
  At.get.rgb = function (e) {
    if (!e) return null;
    var t = /^#([a-f0-9]{3,4})$/i,
      r = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i,
      i =
        /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,
      n =
        /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,
      s = /^(\w+)$/,
      a = [0, 0, 0, 1],
      o,
      u,
      l;
    if ((o = e.match(r))) {
      for (l = o[2], o = o[1], u = 0; u < 3; u++) {
        var f = u * 2;
        a[u] = parseInt(o.slice(f, f + 2), 16);
      }
      l && (a[3] = parseInt(l, 16) / 255);
    } else if ((o = e.match(t))) {
      for (o = o[1], l = o[3], u = 0; u < 3; u++)
        a[u] = parseInt(o[u] + o[u], 16);
      l && (a[3] = parseInt(l + l, 16) / 255);
    } else if ((o = e.match(i))) {
      for (u = 0; u < 3; u++) a[u] = parseInt(o[u + 1], 0);
      o[4] &&
        (o[5] ? (a[3] = parseFloat(o[4]) * 0.01) : (a[3] = parseFloat(o[4])));
    } else if ((o = e.match(n))) {
      for (u = 0; u < 3; u++) a[u] = Math.round(parseFloat(o[u + 1]) * 2.55);
      o[4] &&
        (o[5] ? (a[3] = parseFloat(o[4]) * 0.01) : (a[3] = parseFloat(o[4])));
    } else
      return (o = e.match(s))
        ? o[1] === "transparent"
          ? [0, 0, 0, 0]
          : lx.call(vo, o[1])
          ? ((a = vo[o[1]]), (a[3] = 1), a)
          : null
        : null;
    for (u = 0; u < 3; u++) a[u] = Ri(a[u], 0, 255);
    return (a[3] = Ri(a[3], 0, 1)), a;
  };
  At.get.hsl = function (e) {
    if (!e) return null;
    var t =
        /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,
      r = e.match(t);
    if (r) {
      var i = parseFloat(r[4]),
        n = ((parseFloat(r[1]) % 360) + 360) % 360,
        s = Ri(parseFloat(r[2]), 0, 100),
        a = Ri(parseFloat(r[3]), 0, 100),
        o = Ri(isNaN(i) ? 1 : i, 0, 1);
      return [n, s, a, o];
    }
    return null;
  };
  At.get.hwb = function (e) {
    if (!e) return null;
    var t =
        /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,
      r = e.match(t);
    if (r) {
      var i = parseFloat(r[4]),
        n = ((parseFloat(r[1]) % 360) + 360) % 360,
        s = Ri(parseFloat(r[2]), 0, 100),
        a = Ri(parseFloat(r[3]), 0, 100),
        o = Ri(isNaN(i) ? 1 : i, 0, 1);
      return [n, s, a, o];
    }
    return null;
  };
  At.to.hex = function () {
    var e = wo(arguments);
    return (
      "#" +
      Jf(e[0]) +
      Jf(e[1]) +
      Jf(e[2]) +
      (e[3] < 1 ? Jf(Math.round(e[3] * 255)) : "")
    );
  };
  At.to.rgb = function () {
    var e = wo(arguments);
    return e.length < 4 || e[3] === 1
      ? "rgb(" +
          Math.round(e[0]) +
          ", " +
          Math.round(e[1]) +
          ", " +
          Math.round(e[2]) +
          ")"
      : "rgba(" +
          Math.round(e[0]) +
          ", " +
          Math.round(e[1]) +
          ", " +
          Math.round(e[2]) +
          ", " +
          e[3] +
          ")";
  };
  At.to.rgb.percent = function () {
    var e = wo(arguments),
      t = Math.round((e[0] / 255) * 100),
      r = Math.round((e[1] / 255) * 100),
      i = Math.round((e[2] / 255) * 100);
    return e.length < 4 || e[3] === 1
      ? "rgb(" + t + "%, " + r + "%, " + i + "%)"
      : "rgba(" + t + "%, " + r + "%, " + i + "%, " + e[3] + ")";
  };
  At.to.hsl = function () {
    var e = wo(arguments);
    return e.length < 4 || e[3] === 1
      ? "hsl(" + e[0] + ", " + e[1] + "%, " + e[2] + "%)"
      : "hsla(" + e[0] + ", " + e[1] + "%, " + e[2] + "%, " + e[3] + ")";
  };
  At.to.hwb = function () {
    var e = wo(arguments),
      t = "";
    return (
      e.length >= 4 && e[3] !== 1 && (t = ", " + e[3]),
      "hwb(" + e[0] + ", " + e[1] + "%, " + e[2] + "%" + t + ")"
    );
  };
  At.to.keyword = function (e) {
    return fx[e.slice(0, 3)];
  };
  function Ri(e, t, r) {
    return Math.min(Math.max(t, e), r);
  }
  function Jf(e) {
    var t = Math.round(e).toString(16).toUpperCase();
    return t.length < 2 ? "0" + t : t;
  }
});
var px = y(($Q, dx) => {
  "use strict";
  dx.exports = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50],
  };
});
var Og = y((WQ, vx) => {
  var xn = px(),
    yx = {};
  for (eh in xn) xn.hasOwnProperty(eh) && (yx[xn[eh]] = eh);
  var eh,
    V = (vx.exports = {
      rgb: { channels: 3, labels: "rgb" },
      hsl: { channels: 3, labels: "hsl" },
      hsv: { channels: 3, labels: "hsv" },
      hwb: { channels: 3, labels: "hwb" },
      cmyk: { channels: 4, labels: "cmyk" },
      xyz: { channels: 3, labels: "xyz" },
      lab: { channels: 3, labels: "lab" },
      lch: { channels: 3, labels: "lch" },
      hex: { channels: 1, labels: ["hex"] },
      keyword: { channels: 1, labels: ["keyword"] },
      ansi16: { channels: 1, labels: ["ansi16"] },
      ansi256: { channels: 1, labels: ["ansi256"] },
      hcg: { channels: 3, labels: ["h", "c", "g"] },
      apple: { channels: 3, labels: ["r16", "g16", "b16"] },
      gray: { channels: 1, labels: ["gray"] },
    });
  for (dt in V)
    if (V.hasOwnProperty(dt)) {
      if (!("channels" in V[dt]))
        throw new Error("missing channels property: " + dt);
      if (!("labels" in V[dt]))
        throw new Error("missing channel labels property: " + dt);
      if (V[dt].labels.length !== V[dt].channels)
        throw new Error("channel and label counts mismatch: " + dt);
      (mx = V[dt].channels),
        (gx = V[dt].labels),
        delete V[dt].channels,
        delete V[dt].labels,
        Object.defineProperty(V[dt], "channels", { value: mx }),
        Object.defineProperty(V[dt], "labels", { value: gx });
    }
  var mx, gx, dt;
  V.rgb.hsl = function (e) {
    var t = e[0] / 255,
      r = e[1] / 255,
      i = e[2] / 255,
      n = Math.min(t, r, i),
      s = Math.max(t, r, i),
      a = s - n,
      o,
      u,
      l;
    return (
      s === n
        ? (o = 0)
        : t === s
        ? (o = (r - i) / a)
        : r === s
        ? (o = 2 + (i - t) / a)
        : i === s && (o = 4 + (t - r) / a),
      (o = Math.min(o * 60, 360)),
      o < 0 && (o += 360),
      (l = (n + s) / 2),
      s === n ? (u = 0) : l <= 0.5 ? (u = a / (s + n)) : (u = a / (2 - s - n)),
      [o, u * 100, l * 100]
    );
  };
  V.rgb.hsv = function (e) {
    var t,
      r,
      i,
      n,
      s,
      a = e[0] / 255,
      o = e[1] / 255,
      u = e[2] / 255,
      l = Math.max(a, o, u),
      f = l - Math.min(a, o, u),
      h = function (c) {
        return (l - c) / 6 / f + 1 / 2;
      };
    return (
      f === 0
        ? (n = s = 0)
        : ((s = f / l),
          (t = h(a)),
          (r = h(o)),
          (i = h(u)),
          a === l
            ? (n = i - r)
            : o === l
            ? (n = 1 / 3 + t - i)
            : u === l && (n = 2 / 3 + r - t),
          n < 0 ? (n += 1) : n > 1 && (n -= 1)),
      [n * 360, s * 100, l * 100]
    );
  };
  V.rgb.hwb = function (e) {
    var t = e[0],
      r = e[1],
      i = e[2],
      n = V.rgb.hsl(e)[0],
      s = (1 / 255) * Math.min(t, Math.min(r, i));
    return (
      (i = 1 - (1 / 255) * Math.max(t, Math.max(r, i))), [n, s * 100, i * 100]
    );
  };
  V.rgb.cmyk = function (e) {
    var t = e[0] / 255,
      r = e[1] / 255,
      i = e[2] / 255,
      n,
      s,
      a,
      o;
    return (
      (o = Math.min(1 - t, 1 - r, 1 - i)),
      (n = (1 - t - o) / (1 - o) || 0),
      (s = (1 - r - o) / (1 - o) || 0),
      (a = (1 - i - o) / (1 - o) || 0),
      [n * 100, s * 100, a * 100, o * 100]
    );
  };
  function Kk(e, t) {
    return (
      Math.pow(e[0] - t[0], 2) +
      Math.pow(e[1] - t[1], 2) +
      Math.pow(e[2] - t[2], 2)
    );
  }
  V.rgb.keyword = function (e) {
    var t = yx[e];
    if (t) return t;
    var r = 1 / 0,
      i;
    for (var n in xn)
      if (xn.hasOwnProperty(n)) {
        var s = xn[n],
          a = Kk(e, s);
        a < r && ((r = a), (i = n));
      }
    return i;
  };
  V.keyword.rgb = function (e) {
    return xn[e];
  };
  V.rgb.xyz = function (e) {
    var t = e[0] / 255,
      r = e[1] / 255,
      i = e[2] / 255;
    (t = t > 0.04045 ? Math.pow((t + 0.055) / 1.055, 2.4) : t / 12.92),
      (r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92),
      (i = i > 0.04045 ? Math.pow((i + 0.055) / 1.055, 2.4) : i / 12.92);
    var n = t * 0.4124 + r * 0.3576 + i * 0.1805,
      s = t * 0.2126 + r * 0.7152 + i * 0.0722,
      a = t * 0.0193 + r * 0.1192 + i * 0.9505;
    return [n * 100, s * 100, a * 100];
  };
  V.rgb.lab = function (e) {
    var t = V.rgb.xyz(e),
      r = t[0],
      i = t[1],
      n = t[2],
      s,
      a,
      o;
    return (
      (r /= 95.047),
      (i /= 100),
      (n /= 108.883),
      (r = r > 0.008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116),
      (i = i > 0.008856 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116),
      (n = n > 0.008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116),
      (s = 116 * i - 16),
      (a = 500 * (r - i)),
      (o = 200 * (i - n)),
      [s, a, o]
    );
  };
  V.hsl.rgb = function (e) {
    var t = e[0] / 360,
      r = e[1] / 100,
      i = e[2] / 100,
      n,
      s,
      a,
      o,
      u;
    if (r === 0) return (u = i * 255), [u, u, u];
    i < 0.5 ? (s = i * (1 + r)) : (s = i + r - i * r),
      (n = 2 * i - s),
      (o = [0, 0, 0]);
    for (var l = 0; l < 3; l++)
      (a = t + (1 / 3) * -(l - 1)),
        a < 0 && a++,
        a > 1 && a--,
        6 * a < 1
          ? (u = n + (s - n) * 6 * a)
          : 2 * a < 1
          ? (u = s)
          : 3 * a < 2
          ? (u = n + (s - n) * (2 / 3 - a) * 6)
          : (u = n),
        (o[l] = u * 255);
    return o;
  };
  V.hsl.hsv = function (e) {
    var t = e[0],
      r = e[1] / 100,
      i = e[2] / 100,
      n = r,
      s = Math.max(i, 0.01),
      a,
      o;
    return (
      (i *= 2),
      (r *= i <= 1 ? i : 2 - i),
      (n *= s <= 1 ? s : 2 - s),
      (o = (i + r) / 2),
      (a = i === 0 ? (2 * n) / (s + n) : (2 * r) / (i + r)),
      [t, a * 100, o * 100]
    );
  };
  V.hsv.rgb = function (e) {
    var t = e[0] / 60,
      r = e[1] / 100,
      i = e[2] / 100,
      n = Math.floor(t) % 6,
      s = t - Math.floor(t),
      a = 255 * i * (1 - r),
      o = 255 * i * (1 - r * s),
      u = 255 * i * (1 - r * (1 - s));
    switch (((i *= 255), n)) {
      case 0:
        return [i, u, a];
      case 1:
        return [o, i, a];
      case 2:
        return [a, i, u];
      case 3:
        return [a, o, i];
      case 4:
        return [u, a, i];
      case 5:
        return [i, a, o];
    }
  };
  V.hsv.hsl = function (e) {
    var t = e[0],
      r = e[1] / 100,
      i = e[2] / 100,
      n = Math.max(i, 0.01),
      s,
      a,
      o;
    return (
      (o = (2 - r) * i),
      (s = (2 - r) * n),
      (a = r * n),
      (a /= s <= 1 ? s : 2 - s),
      (a = a || 0),
      (o /= 2),
      [t, a * 100, o * 100]
    );
  };
  V.hwb.rgb = function (e) {
    var t = e[0] / 360,
      r = e[1] / 100,
      i = e[2] / 100,
      n = r + i,
      s,
      a,
      o,
      u;
    n > 1 && ((r /= n), (i /= n)),
      (s = Math.floor(6 * t)),
      (a = 1 - i),
      (o = 6 * t - s),
      (s & 1) !== 0 && (o = 1 - o),
      (u = r + o * (a - r));
    var l, f, h;
    switch (s) {
      default:
      case 6:
      case 0:
        (l = a), (f = u), (h = r);
        break;
      case 1:
        (l = u), (f = a), (h = r);
        break;
      case 2:
        (l = r), (f = a), (h = u);
        break;
      case 3:
        (l = r), (f = u), (h = a);
        break;
      case 4:
        (l = u), (f = r), (h = a);
        break;
      case 5:
        (l = a), (f = r), (h = u);
        break;
    }
    return [l * 255, f * 255, h * 255];
  };
  V.cmyk.rgb = function (e) {
    var t = e[0] / 100,
      r = e[1] / 100,
      i = e[2] / 100,
      n = e[3] / 100,
      s,
      a,
      o;
    return (
      (s = 1 - Math.min(1, t * (1 - n) + n)),
      (a = 1 - Math.min(1, r * (1 - n) + n)),
      (o = 1 - Math.min(1, i * (1 - n) + n)),
      [s * 255, a * 255, o * 255]
    );
  };
  V.xyz.rgb = function (e) {
    var t = e[0] / 100,
      r = e[1] / 100,
      i = e[2] / 100,
      n,
      s,
      a;
    return (
      (n = t * 3.2406 + r * -1.5372 + i * -0.4986),
      (s = t * -0.9689 + r * 1.8758 + i * 0.0415),
      (a = t * 0.0557 + r * -0.204 + i * 1.057),
      (n = n > 0.0031308 ? 1.055 * Math.pow(n, 1 / 2.4) - 0.055 : n * 12.92),
      (s = s > 0.0031308 ? 1.055 * Math.pow(s, 1 / 2.4) - 0.055 : s * 12.92),
      (a = a > 0.0031308 ? 1.055 * Math.pow(a, 1 / 2.4) - 0.055 : a * 12.92),
      (n = Math.min(Math.max(0, n), 1)),
      (s = Math.min(Math.max(0, s), 1)),
      (a = Math.min(Math.max(0, a), 1)),
      [n * 255, s * 255, a * 255]
    );
  };
  V.xyz.lab = function (e) {
    var t = e[0],
      r = e[1],
      i = e[2],
      n,
      s,
      a;
    return (
      (t /= 95.047),
      (r /= 100),
      (i /= 108.883),
      (t = t > 0.008856 ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116),
      (r = r > 0.008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116),
      (i = i > 0.008856 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116),
      (n = 116 * r - 16),
      (s = 500 * (t - r)),
      (a = 200 * (r - i)),
      [n, s, a]
    );
  };
  V.lab.xyz = function (e) {
    var t = e[0],
      r = e[1],
      i = e[2],
      n,
      s,
      a;
    (s = (t + 16) / 116), (n = r / 500 + s), (a = s - i / 200);
    var o = Math.pow(s, 3),
      u = Math.pow(n, 3),
      l = Math.pow(a, 3);
    return (
      (s = o > 0.008856 ? o : (s - 16 / 116) / 7.787),
      (n = u > 0.008856 ? u : (n - 16 / 116) / 7.787),
      (a = l > 0.008856 ? l : (a - 16 / 116) / 7.787),
      (n *= 95.047),
      (s *= 100),
      (a *= 108.883),
      [n, s, a]
    );
  };
  V.lab.lch = function (e) {
    var t = e[0],
      r = e[1],
      i = e[2],
      n,
      s,
      a;
    return (
      (n = Math.atan2(i, r)),
      (s = (n * 360) / 2 / Math.PI),
      s < 0 && (s += 360),
      (a = Math.sqrt(r * r + i * i)),
      [t, a, s]
    );
  };
  V.lch.lab = function (e) {
    var t = e[0],
      r = e[1],
      i = e[2],
      n,
      s,
      a;
    return (
      (a = (i / 360) * 2 * Math.PI),
      (n = r * Math.cos(a)),
      (s = r * Math.sin(a)),
      [t, n, s]
    );
  };
  V.rgb.ansi16 = function (e) {
    var t = e[0],
      r = e[1],
      i = e[2],
      n = 1 in arguments ? arguments[1] : V.rgb.hsv(e)[2];
    if (((n = Math.round(n / 50)), n === 0)) return 30;
    var s =
      30 +
      ((Math.round(i / 255) << 2) |
        (Math.round(r / 255) << 1) |
        Math.round(t / 255));
    return n === 2 && (s += 60), s;
  };
  V.hsv.ansi16 = function (e) {
    return V.rgb.ansi16(V.hsv.rgb(e), e[2]);
  };
  V.rgb.ansi256 = function (e) {
    var t = e[0],
      r = e[1],
      i = e[2];
    if (t === r && r === i)
      return t < 8
        ? 16
        : t > 248
        ? 231
        : Math.round(((t - 8) / 247) * 24) + 232;
    var n =
      16 +
      36 * Math.round((t / 255) * 5) +
      6 * Math.round((r / 255) * 5) +
      Math.round((i / 255) * 5);
    return n;
  };
  V.ansi16.rgb = function (e) {
    var t = e % 10;
    if (t === 0 || t === 7)
      return e > 50 && (t += 3.5), (t = (t / 10.5) * 255), [t, t, t];
    var r = (~~(e > 50) + 1) * 0.5,
      i = (t & 1) * r * 255,
      n = ((t >> 1) & 1) * r * 255,
      s = ((t >> 2) & 1) * r * 255;
    return [i, n, s];
  };
  V.ansi256.rgb = function (e) {
    if (e >= 232) {
      var t = (e - 232) * 10 + 8;
      return [t, t, t];
    }
    e -= 16;
    var r,
      i = (Math.floor(e / 36) / 5) * 255,
      n = (Math.floor((r = e % 36) / 6) / 5) * 255,
      s = ((r % 6) / 5) * 255;
    return [i, n, s];
  };
  V.rgb.hex = function (e) {
    var t =
        ((Math.round(e[0]) & 255) << 16) +
        ((Math.round(e[1]) & 255) << 8) +
        (Math.round(e[2]) & 255),
      r = t.toString(16).toUpperCase();
    return "000000".substring(r.length) + r;
  };
  V.hex.rgb = function (e) {
    var t = e.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!t) return [0, 0, 0];
    var r = t[0];
    t[0].length === 3 &&
      (r = r
        .split("")
        .map(function (o) {
          return o + o;
        })
        .join(""));
    var i = parseInt(r, 16),
      n = (i >> 16) & 255,
      s = (i >> 8) & 255,
      a = i & 255;
    return [n, s, a];
  };
  V.rgb.hcg = function (e) {
    var t = e[0] / 255,
      r = e[1] / 255,
      i = e[2] / 255,
      n = Math.max(Math.max(t, r), i),
      s = Math.min(Math.min(t, r), i),
      a = n - s,
      o,
      u;
    return (
      a < 1 ? (o = s / (1 - a)) : (o = 0),
      a <= 0
        ? (u = 0)
        : n === t
        ? (u = ((r - i) / a) % 6)
        : n === r
        ? (u = 2 + (i - t) / a)
        : (u = 4 + (t - r) / a + 4),
      (u /= 6),
      (u %= 1),
      [u * 360, a * 100, o * 100]
    );
  };
  V.hsl.hcg = function (e) {
    var t = e[1] / 100,
      r = e[2] / 100,
      i = 1,
      n = 0;
    return (
      r < 0.5 ? (i = 2 * t * r) : (i = 2 * t * (1 - r)),
      i < 1 && (n = (r - 0.5 * i) / (1 - i)),
      [e[0], i * 100, n * 100]
    );
  };
  V.hsv.hcg = function (e) {
    var t = e[1] / 100,
      r = e[2] / 100,
      i = t * r,
      n = 0;
    return i < 1 && (n = (r - i) / (1 - i)), [e[0], i * 100, n * 100];
  };
  V.hcg.rgb = function (e) {
    var t = e[0] / 360,
      r = e[1] / 100,
      i = e[2] / 100;
    if (r === 0) return [i * 255, i * 255, i * 255];
    var n = [0, 0, 0],
      s = (t % 1) * 6,
      a = s % 1,
      o = 1 - a,
      u = 0;
    switch (Math.floor(s)) {
      case 0:
        (n[0] = 1), (n[1] = a), (n[2] = 0);
        break;
      case 1:
        (n[0] = o), (n[1] = 1), (n[2] = 0);
        break;
      case 2:
        (n[0] = 0), (n[1] = 1), (n[2] = a);
        break;
      case 3:
        (n[0] = 0), (n[1] = o), (n[2] = 1);
        break;
      case 4:
        (n[0] = a), (n[1] = 0), (n[2] = 1);
        break;
      default:
        (n[0] = 1), (n[1] = 0), (n[2] = o);
    }
    return (
      (u = (1 - r) * i),
      [(r * n[0] + u) * 255, (r * n[1] + u) * 255, (r * n[2] + u) * 255]
    );
  };
  V.hcg.hsv = function (e) {
    var t = e[1] / 100,
      r = e[2] / 100,
      i = t + r * (1 - t),
      n = 0;
    return i > 0 && (n = t / i), [e[0], n * 100, i * 100];
  };
  V.hcg.hsl = function (e) {
    var t = e[1] / 100,
      r = e[2] / 100,
      i = r * (1 - t) + 0.5 * t,
      n = 0;
    return (
      i > 0 && i < 0.5
        ? (n = t / (2 * i))
        : i >= 0.5 && i < 1 && (n = t / (2 * (1 - i))),
      [e[0], n * 100, i * 100]
    );
  };
  V.hcg.hwb = function (e) {
    var t = e[1] / 100,
      r = e[2] / 100,
      i = t + r * (1 - t);
    return [e[0], (i - t) * 100, (1 - i) * 100];
  };
  V.hwb.hcg = function (e) {
    var t = e[1] / 100,
      r = e[2] / 100,
      i = 1 - r,
      n = i - t,
      s = 0;
    return n < 1 && (s = (i - n) / (1 - n)), [e[0], n * 100, s * 100];
  };
  V.apple.rgb = function (e) {
    return [(e[0] / 65535) * 255, (e[1] / 65535) * 255, (e[2] / 65535) * 255];
  };
  V.rgb.apple = function (e) {
    return [(e[0] / 255) * 65535, (e[1] / 255) * 65535, (e[2] / 255) * 65535];
  };
  V.gray.rgb = function (e) {
    return [(e[0] / 100) * 255, (e[0] / 100) * 255, (e[0] / 100) * 255];
  };
  V.gray.hsl = V.gray.hsv = function (e) {
    return [0, 0, e[0]];
  };
  V.gray.hwb = function (e) {
    return [0, 100, e[0]];
  };
  V.gray.cmyk = function (e) {
    return [0, 0, 0, e[0]];
  };
  V.gray.lab = function (e) {
    return [e[0], 0, 0];
  };
  V.gray.hex = function (e) {
    var t = Math.round((e[0] / 100) * 255) & 255,
      r = (t << 16) + (t << 8) + t,
      i = r.toString(16).toUpperCase();
    return "000000".substring(i.length) + i;
  };
  V.rgb.gray = function (e) {
    var t = (e[0] + e[1] + e[2]) / 3;
    return [(t / 255) * 100];
  };
});
var Dx = y((GQ, wx) => {
  var th = Og();
  function Qk() {
    for (var e = {}, t = Object.keys(th), r = t.length, i = 0; i < r; i++)
      e[t[i]] = { distance: -1, parent: null };
    return e;
  }
  function Jk(e) {
    var t = Qk(),
      r = [e];
    for (t[e].distance = 0; r.length; )
      for (
        var i = r.pop(), n = Object.keys(th[i]), s = n.length, a = 0;
        a < s;
        a++
      ) {
        var o = n[a],
          u = t[o];
        u.distance === -1 &&
          ((u.distance = t[i].distance + 1), (u.parent = i), r.unshift(o));
      }
    return t;
  }
  function ej(e, t) {
    return function (r) {
      return t(e(r));
    };
  }
  function tj(e, t) {
    for (
      var r = [t[e].parent, e], i = th[t[e].parent][e], n = t[e].parent;
      t[n].parent;

    )
      r.unshift(t[n].parent),
        (i = ej(th[t[n].parent][n], i)),
        (n = t[n].parent);
    return (i.conversion = r), i;
  }
  wx.exports = function (e) {
    for (
      var t = Jk(e), r = {}, i = Object.keys(t), n = i.length, s = 0;
      s < n;
      s++
    ) {
      var a = i[s],
        o = t[a];
      o.parent !== null && (r[a] = tj(a, t));
    }
    return r;
  };
});
var Ex = y((HQ, bx) => {
  var Tg = Og(),
    rj = Dx(),
    qs = {},
    ij = Object.keys(Tg);
  function nj(e) {
    var t = function (r) {
      return r == null
        ? r
        : (arguments.length > 1 && (r = Array.prototype.slice.call(arguments)),
          e(r));
    };
    return "conversion" in e && (t.conversion = e.conversion), t;
  }
  function sj(e) {
    var t = function (r) {
      if (r == null) return r;
      arguments.length > 1 && (r = Array.prototype.slice.call(arguments));
      var i = e(r);
      if (typeof i == "object")
        for (var n = i.length, s = 0; s < n; s++) i[s] = Math.round(i[s]);
      return i;
    };
    return "conversion" in e && (t.conversion = e.conversion), t;
  }
  ij.forEach(function (e) {
    (qs[e] = {}),
      Object.defineProperty(qs[e], "channels", { value: Tg[e].channels }),
      Object.defineProperty(qs[e], "labels", { value: Tg[e].labels });
    var t = rj(e),
      r = Object.keys(t);
    r.forEach(function (i) {
      var n = t[i];
      (qs[e][i] = sj(n)), (qs[e][i].raw = nj(n));
    });
  });
  bx.exports = qs;
});
var xx = y((VQ, Sx) => {
  "use strict";
  var Do = cx(),
    Nt = Ex(),
    Ag = [].slice,
    _x = ["keyword", "gray", "hex"],
    Fg = {};
  Object.keys(Nt).forEach(function (e) {
    Fg[Ag.call(Nt[e].labels).sort().join("")] = e;
  });
  var rh = {};
  function Ke(e, t) {
    if (!(this instanceof Ke)) return new Ke(e, t);
    if ((t && t in _x && (t = null), t && !(t in Nt)))
      throw new Error("Unknown model: " + t);
    var r, i;
    if (e == null)
      (this.model = "rgb"), (this.color = [0, 0, 0]), (this.valpha = 1);
    else if (e instanceof Ke)
      (this.model = e.model),
        (this.color = e.color.slice()),
        (this.valpha = e.valpha);
    else if (typeof e == "string") {
      var n = Do.get(e);
      if (n === null)
        throw new Error("Unable to parse color from string: " + e);
      (this.model = n.model),
        (i = Nt[this.model].channels),
        (this.color = n.value.slice(0, i)),
        (this.valpha = typeof n.value[i] == "number" ? n.value[i] : 1);
    } else if (e.length) {
      (this.model = t || "rgb"), (i = Nt[this.model].channels);
      var s = Ag.call(e, 0, i);
      (this.color = Rg(s, i)),
        (this.valpha = typeof e[i] == "number" ? e[i] : 1);
    } else if (typeof e == "number")
      (e &= 16777215),
        (this.model = "rgb"),
        (this.color = [(e >> 16) & 255, (e >> 8) & 255, e & 255]),
        (this.valpha = 1);
    else {
      this.valpha = 1;
      var a = Object.keys(e);
      "alpha" in e &&
        (a.splice(a.indexOf("alpha"), 1),
        (this.valpha = typeof e.alpha == "number" ? e.alpha : 0));
      var o = a.sort().join("");
      if (!(o in Fg))
        throw new Error(
          "Unable to parse color from object: " + JSON.stringify(e),
        );
      this.model = Fg[o];
      var u = Nt[this.model].labels,
        l = [];
      for (r = 0; r < u.length; r++) l.push(e[u[r]]);
      this.color = Rg(l);
    }
    if (rh[this.model])
      for (i = Nt[this.model].channels, r = 0; r < i; r++) {
        var f = rh[this.model][r];
        f && (this.color[r] = f(this.color[r]));
      }
    (this.valpha = Math.max(0, Math.min(1, this.valpha))),
      Object.freeze && Object.freeze(this);
  }
  Ke.prototype = {
    toString: function () {
      return this.string();
    },
    toJSON: function () {
      return this[this.model]();
    },
    string: function (e) {
      var t = this.model in Do.to ? this : this.rgb();
      t = t.round(typeof e == "number" ? e : 1);
      var r = t.valpha === 1 ? t.color : t.color.concat(this.valpha);
      return Do.to[t.model](r);
    },
    percentString: function (e) {
      var t = this.rgb().round(typeof e == "number" ? e : 1),
        r = t.valpha === 1 ? t.color : t.color.concat(this.valpha);
      return Do.to.rgb.percent(r);
    },
    array: function () {
      return this.valpha === 1
        ? this.color.slice()
        : this.color.concat(this.valpha);
    },
    object: function () {
      for (
        var e = {},
          t = Nt[this.model].channels,
          r = Nt[this.model].labels,
          i = 0;
        i < t;
        i++
      )
        e[r[i]] = this.color[i];
      return this.valpha !== 1 && (e.alpha = this.valpha), e;
    },
    unitArray: function () {
      var e = this.rgb().color;
      return (
        (e[0] /= 255),
        (e[1] /= 255),
        (e[2] /= 255),
        this.valpha !== 1 && e.push(this.valpha),
        e
      );
    },
    unitObject: function () {
      var e = this.rgb().object();
      return (
        (e.r /= 255),
        (e.g /= 255),
        (e.b /= 255),
        this.valpha !== 1 && (e.alpha = this.valpha),
        e
      );
    },
    round: function (e) {
      return (
        (e = Math.max(e || 0, 0)),
        new Ke(this.color.map(oj(e)).concat(this.valpha), this.model)
      );
    },
    alpha: function (e) {
      return arguments.length
        ? new Ke(this.color.concat(Math.max(0, Math.min(1, e))), this.model)
        : this.valpha;
    },
    red: Te("rgb", 0, Ue(255)),
    green: Te("rgb", 1, Ue(255)),
    blue: Te("rgb", 2, Ue(255)),
    hue: Te(["hsl", "hsv", "hsl", "hwb", "hcg"], 0, function (e) {
      return ((e % 360) + 360) % 360;
    }),
    saturationl: Te("hsl", 1, Ue(100)),
    lightness: Te("hsl", 2, Ue(100)),
    saturationv: Te("hsv", 1, Ue(100)),
    value: Te("hsv", 2, Ue(100)),
    chroma: Te("hcg", 1, Ue(100)),
    gray: Te("hcg", 2, Ue(100)),
    white: Te("hwb", 1, Ue(100)),
    wblack: Te("hwb", 2, Ue(100)),
    cyan: Te("cmyk", 0, Ue(100)),
    magenta: Te("cmyk", 1, Ue(100)),
    yellow: Te("cmyk", 2, Ue(100)),
    black: Te("cmyk", 3, Ue(100)),
    x: Te("xyz", 0, Ue(100)),
    y: Te("xyz", 1, Ue(100)),
    z: Te("xyz", 2, Ue(100)),
    l: Te("lab", 0, Ue(100)),
    a: Te("lab", 1),
    b: Te("lab", 2),
    keyword: function (e) {
      return arguments.length ? new Ke(e) : Nt[this.model].keyword(this.color);
    },
    hex: function (e) {
      return arguments.length ? new Ke(e) : Do.to.hex(this.rgb().round().color);
    },
    rgbNumber: function () {
      var e = this.rgb().color;
      return ((e[0] & 255) << 16) | ((e[1] & 255) << 8) | (e[2] & 255);
    },
    luminosity: function () {
      for (var e = this.rgb().color, t = [], r = 0; r < e.length; r++) {
        var i = e[r] / 255;
        t[r] = i <= 0.03928 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
      }
      return 0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2];
    },
    contrast: function (e) {
      var t = this.luminosity(),
        r = e.luminosity();
      return t > r ? (t + 0.05) / (r + 0.05) : (r + 0.05) / (t + 0.05);
    },
    level: function (e) {
      var t = this.contrast(e);
      return t >= 7.1 ? "AAA" : t >= 4.5 ? "AA" : "";
    },
    isDark: function () {
      var e = this.rgb().color,
        t = (e[0] * 299 + e[1] * 587 + e[2] * 114) / 1e3;
      return t < 128;
    },
    isLight: function () {
      return !this.isDark();
    },
    negate: function () {
      for (var e = this.rgb(), t = 0; t < 3; t++) e.color[t] = 255 - e.color[t];
      return e;
    },
    lighten: function (e) {
      var t = this.hsl();
      return (t.color[2] += t.color[2] * e), t;
    },
    darken: function (e) {
      var t = this.hsl();
      return (t.color[2] -= t.color[2] * e), t;
    },
    saturate: function (e) {
      var t = this.hsl();
      return (t.color[1] += t.color[1] * e), t;
    },
    desaturate: function (e) {
      var t = this.hsl();
      return (t.color[1] -= t.color[1] * e), t;
    },
    whiten: function (e) {
      var t = this.hwb();
      return (t.color[1] += t.color[1] * e), t;
    },
    blacken: function (e) {
      var t = this.hwb();
      return (t.color[2] += t.color[2] * e), t;
    },
    grayscale: function () {
      var e = this.rgb().color,
        t = e[0] * 0.3 + e[1] * 0.59 + e[2] * 0.11;
      return Ke.rgb(t, t, t);
    },
    fade: function (e) {
      return this.alpha(this.valpha - this.valpha * e);
    },
    opaquer: function (e) {
      return this.alpha(this.valpha + this.valpha * e);
    },
    rotate: function (e) {
      var t = this.hsl(),
        r = t.color[0];
      return (
        (r = (r + e) % 360), (r = r < 0 ? 360 + r : r), (t.color[0] = r), t
      );
    },
    mix: function (e, t) {
      if (!e || !e.rgb)
        throw new Error(
          'Argument to "mix" was not a Color instance, but rather an instance of ' +
            typeof e,
        );
      var r = e.rgb(),
        i = this.rgb(),
        n = t === void 0 ? 0.5 : t,
        s = 2 * n - 1,
        a = r.alpha() - i.alpha(),
        o = ((s * a === -1 ? s : (s + a) / (1 + s * a)) + 1) / 2,
        u = 1 - o;
      return Ke.rgb(
        o * r.red() + u * i.red(),
        o * r.green() + u * i.green(),
        o * r.blue() + u * i.blue(),
        r.alpha() * n + i.alpha() * (1 - n),
      );
    },
  };
  Object.keys(Nt).forEach(function (e) {
    if (_x.indexOf(e) === -1) {
      var t = Nt[e].channels;
      (Ke.prototype[e] = function () {
        if (this.model === e) return new Ke(this);
        if (arguments.length) return new Ke(arguments, e);
        var r = typeof arguments[t] == "number" ? t : this.valpha;
        return new Ke(uj(Nt[this.model][e].raw(this.color)).concat(r), e);
      }),
        (Ke[e] = function (r) {
          return (
            typeof r == "number" && (r = Rg(Ag.call(arguments), t)),
            new Ke(r, e)
          );
        });
    }
  });
  function aj(e, t) {
    return Number(e.toFixed(t));
  }
  function oj(e) {
    return function (t) {
      return aj(t, e);
    };
  }
  function Te(e, t, r) {
    return (
      (e = Array.isArray(e) ? e : [e]),
      e.forEach(function (i) {
        (rh[i] || (rh[i] = []))[t] = r;
      }),
      (e = e[0]),
      function (i) {
        var n;
        return arguments.length
          ? (r && (i = r(i)), (n = this[e]()), (n.color[t] = i), n)
          : ((n = this[e]().color[t]), r && (n = r(n)), n);
      }
    );
  }
  function Ue(e) {
    return function (t) {
      return Math.max(0, Math.min(e, t));
    };
  }
  function uj(e) {
    return Array.isArray(e) ? e : [e];
  }
  function Rg(e, t) {
    for (var r = 0; r < t; r++) typeof e[r] != "number" && (e[r] = 0);
    return e;
  }
  Sx.exports = Ke;
});
var Ox = y((YQ, Cx) => {
  "use strict";
  Cx.exports = function (t) {
    for (
      var r = 0, i = 0;
      r < t.length;
      i = t.charCodeAt(r++) + ((i << 5) - i)
    );
    var n = Math.floor(Math.abs(((Math.sin(i) * 1e4) % 1) * 16777216)).toString(
      16,
    );
    return "#" + Array(6 - n.length + 1).join("0") + n;
  };
});
var Ax = y((XQ, Rx) => {
  "use strict";
  var Tx = xx(),
    Fx = Ox();
  Rx.exports = function (t, r) {
    var i = t.split(r || ":"),
      n = Fx(i[0]);
    if (!i.length) return n;
    for (var s = 0, a = i.length - 1; s < a; s++)
      n = Tx(n)
        .mix(Tx(Fx(i[s + 1])))
        .saturate(1)
        .hex();
    return n;
  };
});
var Ix = y((ZQ, Nx) => {
  "use strict";
  function ir(e, t) {
    if (t) return new ir(e).style(t);
    if (!(this instanceof ir)) return new ir(e);
    this.text = e;
  }
  ir.prototype.prefix = "\x1B[";
  ir.prototype.suffix = "m";
  ir.prototype.hex = function (t) {
    (t = t[0] === "#" ? t.substring(1) : t),
      t.length === 3 &&
        ((t = t.split("")),
        (t[5] = t[2]),
        (t[4] = t[2]),
        (t[3] = t[1]),
        (t[2] = t[1]),
        (t[1] = t[0]),
        (t = t.join("")));
    var r = t.substring(0, 2),
      i = t.substring(2, 4),
      n = t.substring(4, 6);
    return [parseInt(r, 16), parseInt(i, 16), parseInt(n, 16)];
  };
  ir.prototype.rgb = function (t, r, i) {
    var n = (t / 255) * 5,
      s = (r / 255) * 5,
      a = (i / 255) * 5;
    return this.ansi(n, s, a);
  };
  ir.prototype.ansi = function (t, r, i) {
    var n = Math.round(t),
      s = Math.round(r),
      a = Math.round(i);
    return 16 + n * 36 + s * 6 + a;
  };
  ir.prototype.reset = function () {
    return this.prefix + "39;49" + this.suffix;
  };
  ir.prototype.style = function (t) {
    return (
      this.prefix +
      "38;5;" +
      this.rgb.apply(this, this.hex(t)) +
      this.suffix +
      this.text +
      this.reset()
    );
  };
  Nx.exports = ir;
});
var Lx = y((KQ, Mx) => {
  var lj = Ax(),
    fj = Ix();
  Mx.exports = function (t, r) {
    var i = r.namespace,
      n = r.colors !== !1 ? fj(i + ":", lj(i)) : i + ":";
    return (t[0] = n + " " + t[0]), t;
  };
});
var Px = y((QQ, qx) => {
  "use strict";
  qx.exports = function (t, r) {
    if (!r) return !1;
    for (var i = r.split(/[\s,]+/), n = 0; n < i.length; n++) {
      if (((r = i[n].replace("*", ".*?")), r.charAt(0) === "-")) {
        if (new RegExp("^" + r.substr(1) + "$").test(t)) return !1;
        continue;
      }
      if (new RegExp("^" + r + "$").test(t)) return !0;
    }
    return !1;
  };
});
var kx = y((JQ, Bx) => {
  var hj = Px();
  Bx.exports = function (t) {
    return function (i) {
      try {
        return hj(i, t());
      } catch {}
      return !1;
    };
  };
});
var Ux = y((eJ, jx) => {
  var cj = kx();
  jx.exports = cj(function () {
    return process.env.DEBUG || process.env.DIAGNOSTICS;
  });
});
var $x = y((tJ, zx) => {
  zx.exports = function (e, t) {
    try {
      Function.prototype.apply.call(console.log, console, t);
    } catch {}
  };
});
var Gx = y((rJ, Wx) => {
  var dj = Cg(),
    pj = require("tty").isatty(1),
    ih = dj(function e(t, r) {
      return (
        (r = r || {}),
        (r.colors = "colors" in r ? r.colors : pj),
        (r.namespace = t),
        (r.prod = !1),
        (r.dev = !0),
        !e.enabled(t) && !(r.force || e.force) ? e.nope(r) : e.yep(r)
      );
    });
  ih.modify(Lx());
  ih.use(Ux());
  ih.set($x());
  Wx.exports = ih;
});
var bo = y((iJ, Ng) => {
  process.env.NODE_ENV === "production"
    ? (Ng.exports = tx())
    : (Ng.exports = Gx());
});
var Vx = y((nJ, Hx) => {
  "use strict";
  var Ig = require("fs"),
    { StringDecoder: mj } = require("string_decoder"),
    { Stream: gj } = at();
  function yj() {}
  Hx.exports = (e, t) => {
    let r = Buffer.alloc(65536),
      i = new mj("utf8"),
      n = new gj(),
      s = "",
      a = 0,
      o = 0;
    return (
      e.start === -1 && delete e.start,
      (n.readable = !0),
      (n.destroy = () => {
        (n.destroyed = !0), n.emit("end"), n.emit("close");
      }),
      Ig.open(e.file, "a+", "0644", (u, l) => {
        if (u) {
          t ? t(u) : n.emit("error", u), n.destroy();
          return;
        }
        (function f() {
          if (n.destroyed) {
            Ig.close(l, yj);
            return;
          }
          return Ig.read(l, r, 0, r.length, a, (h, c) => {
            if (h) {
              t ? t(h) : n.emit("error", h), n.destroy();
              return;
            }
            if (!c)
              return (
                s &&
                  ((e.start == null || o > e.start) &&
                    (t ? t(null, s) : n.emit("line", s)),
                  o++,
                  (s = "")),
                setTimeout(f, 1e3)
              );
            let d = i.write(r.slice(0, c));
            t || n.emit("data", d), (d = (s + d).split(/\n+/));
            let m = d.length - 1,
              C = 0;
            for (; C < m; C++)
              (e.start == null || o > e.start) &&
                (t ? t(null, d[C]) : n.emit("line", d[C])),
                o++;
            return (s = d[m]), (a += c), f();
          });
        })();
      }),
      t ? n.destroy : n
    );
  };
});
var Zx = y((aJ, Xx) => {
  "use strict";
  var $r = require("fs"),
    ot = require("path"),
    vj = U2(),
    wj = require("zlib"),
    { MESSAGE: Dj } = Me(),
    { Stream: bj, PassThrough: Yx } = at(),
    Ej = _n(),
    nr = bo()("winston:file"),
    _j = require("os"),
    Sj = Vx();
  Xx.exports = class extends Ej {
    constructor(t = {}) {
      super(t), (this.name = t.name || "file");
      function r(i, ...n) {
        n.slice(1).forEach((s) => {
          if (t[s]) throw new Error(`Cannot set ${s} and ${i} together`);
        });
      }
      if (
        ((this._stream = new Yx()),
        this._stream.setMaxListeners(30),
        (this._onError = this._onError.bind(this)),
        t.filename || t.dirname)
      )
        r("filename or dirname", "stream"),
          (this._basename = this.filename =
            t.filename ? ot.basename(t.filename) : "winston.log"),
          (this.dirname = t.dirname || ot.dirname(t.filename)),
          (this.options = t.options || { flags: "a" });
      else if (t.stream)
        console.warn(
          "options.stream will be removed in winston@4. Use winston.transports.Stream",
        ),
          r("stream", "filename", "maxsize"),
          (this._dest = this._stream.pipe(this._setupStream(t.stream))),
          (this.dirname = ot.dirname(this._dest.path));
      else throw new Error("Cannot log to file without filename or stream.");
      (this.maxsize = t.maxsize || null),
        (this.rotationFormat = t.rotationFormat || !1),
        (this.zippedArchive = t.zippedArchive || !1),
        (this.maxFiles = t.maxFiles || null),
        (this.eol = typeof t.eol == "string" ? t.eol : _j.EOL),
        (this.tailable = t.tailable || !1),
        (this._size = 0),
        (this._pendingSize = 0),
        (this._created = 0),
        (this._drain = !1),
        (this._opening = !1),
        (this._ending = !1),
        this.dirname && this._createLogDirIfNotExist(this.dirname),
        this.open();
    }
    finishIfEnding() {
      this._ending &&
        (this._opening
          ? this.once("open", () => {
              this._stream.once("finish", () => this.emit("finish")),
                setImmediate(() => this._stream.end());
            })
          : (this._stream.once("finish", () => this.emit("finish")),
            setImmediate(() => this._stream.end())));
    }
    log(t, r = () => {}) {
      if (this.silent) return r(), !0;
      if (this._drain) {
        this._stream.once("drain", () => {
          (this._drain = !1), this.log(t, r);
        });
        return;
      }
      if (this._rotate) {
        this._stream.once("rotate", () => {
          (this._rotate = !1), this.log(t, r);
        });
        return;
      }
      let i = `${t[Dj]}${this.eol}`,
        n = Buffer.byteLength(i);
      function s() {
        (this._size += n),
          (this._pendingSize -= n),
          nr("logged %s %s", this._size, i),
          this.emit("logged", t),
          !this._opening &&
            (!this._needsNewFile() ||
              ((this._rotate = !0), this._endStream(() => this._rotateFile())));
      }
      (this._pendingSize += n),
        this._opening &&
          !this.rotatedWhileOpening &&
          this._needsNewFile(this._size + this._pendingSize) &&
          (this.rotatedWhileOpening = !0);
      let a = this._stream.write(i, s.bind(this));
      return (
        a
          ? r()
          : ((this._drain = !0),
            this._stream.once("drain", () => {
              (this._drain = !1), r();
            })),
        nr("written", a, this._drain),
        this.finishIfEnding(),
        a
      );
    }
    query(t, r) {
      typeof t == "function" && ((r = t), (t = {})), (t = h(t));
      let i = ot.join(this.dirname, this.filename),
        n = "",
        s = [],
        a = 0,
        o = $r.createReadStream(i, { encoding: "utf8" });
      o.on("error", (c) => {
        if ((o.readable && o.destroy(), !!r))
          return c.code !== "ENOENT" ? r(c) : r(null, s);
      }),
        o.on("data", (c) => {
          c = (n + c).split(/\n+/);
          let d = c.length - 1,
            m = 0;
          for (; m < d; m++) (!t.start || a >= t.start) && u(c[m]), a++;
          n = c[d];
        }),
        o.on("close", () => {
          n && u(n, !0),
            t.order === "desc" && (s = s.reverse()),
            r && r(null, s);
        });
      function u(c, d) {
        try {
          let m = JSON.parse(c);
          f(m) && l(m);
        } catch (m) {
          d || o.emit("error", m);
        }
      }
      function l(c) {
        if (t.rows && s.length >= t.rows && t.order !== "desc") {
          o.readable && o.destroy();
          return;
        }
        t.fields && (c = t.fields.reduce((d, m) => ((d[m] = c[m]), d), {})),
          t.order === "desc" && s.length >= t.rows && s.shift(),
          s.push(c);
      }
      function f(c) {
        if (!c || typeof c != "object") return;
        let d = new Date(c.timestamp);
        if (
          !(
            (t.from && d < t.from) ||
            (t.until && d > t.until) ||
            (t.level && t.level !== c.level)
          )
        )
          return !0;
      }
      function h(c) {
        return (
          (c = c || {}),
          (c.rows = c.rows || c.limit || 10),
          (c.start = c.start || 0),
          (c.until = c.until || new Date()),
          typeof c.until != "object" && (c.until = new Date(c.until)),
          (c.from = c.from || c.until - 24 * 60 * 60 * 1e3),
          typeof c.from != "object" && (c.from = new Date(c.from)),
          (c.order = c.order || "desc"),
          c
        );
      }
    }
    stream(t = {}) {
      let r = ot.join(this.dirname, this.filename),
        i = new bj(),
        n = { file: r, start: t.start };
      return (
        (i.destroy = Sj(n, (s, a) => {
          if (s) return i.emit("error", s);
          try {
            i.emit("data", a), (a = JSON.parse(a)), i.emit("log", a);
          } catch (o) {
            i.emit("error", o);
          }
        })),
        i
      );
    }
    open() {
      !this.filename ||
        this._opening ||
        ((this._opening = !0),
        this.stat((t, r) => {
          if (t) return this.emit("error", t);
          nr("stat done: %s { size: %s }", this.filename, r),
            (this._size = r),
            (this._dest = this._createStream(this._stream)),
            (this._opening = !1),
            this.once("open", () => {
              this._stream.eventNames().includes("rotate")
                ? this._stream.emit("rotate")
                : (this._rotate = !1);
            });
        }));
    }
    stat(t) {
      let r = this._getFile(),
        i = ot.join(this.dirname, r);
      $r.stat(i, (n, s) => {
        if (n && n.code === "ENOENT")
          return nr("ENOENT\xA0ok", i), (this.filename = r), t(null, 0);
        if (n) return nr(`err ${n.code} ${i}`), t(n);
        if (!s || this._needsNewFile(s.size))
          return this._incFile(() => this.stat(t));
        (this.filename = r), t(null, s.size);
      });
    }
    close(t) {
      !this._stream ||
        this._stream.end(() => {
          t && t(), this.emit("flush"), this.emit("closed");
        });
    }
    _needsNewFile(t) {
      return (t = t || this._size), this.maxsize && t >= this.maxsize;
    }
    _onError(t) {
      this.emit("error", t);
    }
    _setupStream(t) {
      return t.on("error", this._onError), t;
    }
    _cleanupStream(t) {
      return t.removeListener("error", this._onError), t;
    }
    _rotateFile() {
      this._incFile(() => this.open());
    }
    _endStream(t = () => {}) {
      this._dest
        ? (this._stream.unpipe(this._dest),
          this._dest.end(() => {
            this._cleanupStream(this._dest), t();
          }))
        : t();
    }
    _createStream(t) {
      let r = ot.join(this.dirname, this.filename);
      nr("create stream start", r, this.options);
      let i = $r
        .createWriteStream(r, this.options)
        .on("error", (n) => nr(n))
        .on("close", () => nr("close", i.path, i.bytesWritten))
        .on("open", () => {
          nr("file open ok", r),
            this.emit("open", r),
            t.pipe(i),
            this.rotatedWhileOpening &&
              ((this._stream = new Yx()),
              this._stream.setMaxListeners(30),
              this._rotateFile(),
              (this.rotatedWhileOpening = !1),
              this._cleanupStream(i),
              t.end());
        });
      if ((nr("create stream ok", r), this.zippedArchive)) {
        let n = wj.createGzip();
        return n.pipe(i), n;
      }
      return i;
    }
    _incFile(t) {
      nr("_incFile", this.filename);
      let r = ot.extname(this._basename),
        i = ot.basename(this._basename, r);
      this.tailable
        ? this._checkMaxFilesTailable(r, i, t)
        : ((this._created += 1), this._checkMaxFilesIncrementing(r, i, t));
    }
    _getFile() {
      let t = ot.extname(this._basename),
        r = ot.basename(this._basename, t),
        i = this.rotationFormat ? this.rotationFormat() : this._created,
        n = !this.tailable && this._created ? `${r}${i}${t}` : `${r}${t}`;
      return this.zippedArchive && !this.tailable ? `${n}.gz` : n;
    }
    _checkMaxFilesIncrementing(t, r, i) {
      if (!this.maxFiles || this._created < this.maxFiles)
        return setImmediate(i);
      let n = this._created - this.maxFiles,
        s = n !== 0 ? n : "",
        a = this.zippedArchive ? ".gz" : "",
        o = `${r}${s}${t}${a}`,
        u = ot.join(this.dirname, o);
      $r.unlink(u, i);
    }
    _checkMaxFilesTailable(t, r, i) {
      let n = [];
      if (!this.maxFiles) return;
      let s = this.zippedArchive ? ".gz" : "";
      for (let a = this.maxFiles - 1; a > 1; a--)
        n.push(
          function (o, u) {
            let l = `${r}${o - 1}${t}${s}`,
              f = ot.join(this.dirname, l);
            $r.exists(f, (h) => {
              if (!h) return u(null);
              (l = `${r}${o}${t}${s}`),
                $r.rename(f, ot.join(this.dirname, l), u);
            });
          }.bind(this, a),
        );
      vj(n, () => {
        $r.rename(
          ot.join(this.dirname, `${r}${t}`),
          ot.join(this.dirname, `${r}1${t}${s}`),
          i,
        );
      });
    }
    _createLogDirIfNotExist(t) {
      $r.existsSync(t) || $r.mkdirSync(t, { recursive: !0 });
    }
  };
});
var Qx = y((uJ, Kx) => {
  "use strict";
  var xj = require("http"),
    Cj = require("https"),
    { Stream: Oj } = at(),
    Tj = _n(),
    Fj = to();
  Kx.exports = class extends Tj {
    constructor(t = {}) {
      super(t),
        (this.options = t),
        (this.name = t.name || "http"),
        (this.ssl = !!t.ssl),
        (this.host = t.host || "localhost"),
        (this.port = t.port),
        (this.auth = t.auth),
        (this.path = t.path || ""),
        (this.agent = t.agent),
        (this.headers = t.headers || {}),
        (this.headers["content-type"] = "application/json"),
        (this.batch = t.batch || !1),
        (this.batchInterval = t.batchInterval || 5e3),
        (this.batchCount = t.batchCount || 10),
        (this.batchOptions = []),
        (this.batchTimeoutID = -1),
        (this.batchCallback = {}),
        this.port || (this.port = this.ssl ? 443 : 80);
    }
    log(t, r) {
      this._request(t, (i, n) => {
        n &&
          n.statusCode !== 200 &&
          (i = new Error(`Invalid HTTP Status Code: ${n.statusCode}`)),
          i ? this.emit("warn", i) : this.emit("logged", t);
      }),
        r && setImmediate(r);
    }
    query(t, r) {
      typeof t == "function" && ((r = t), (t = {})),
        (t = { method: "query", params: this.normalizeQuery(t) }),
        t.params.path && ((t.path = t.params.path), delete t.params.path),
        t.params.auth && ((t.auth = t.params.auth), delete t.params.auth),
        this._request(t, (i, n, s) => {
          if (
            (n &&
              n.statusCode !== 200 &&
              (i = new Error(`Invalid HTTP Status Code: ${n.statusCode}`)),
            i)
          )
            return r(i);
          if (typeof s == "string")
            try {
              s = JSON.parse(s);
            } catch (a) {
              return r(a);
            }
          r(null, s);
        });
    }
    stream(t = {}) {
      let r = new Oj();
      (t = { method: "stream", params: t }),
        t.params.path && ((t.path = t.params.path), delete t.params.path),
        t.params.auth && ((t.auth = t.params.auth), delete t.params.auth);
      let i = "",
        n = this._request(t);
      return (
        (r.destroy = () => n.destroy()),
        n.on("data", (s) => {
          s = (i + s).split(/\n+/);
          let a = s.length - 1,
            o = 0;
          for (; o < a; o++)
            try {
              r.emit("log", JSON.parse(s[o]));
            } catch (u) {
              r.emit("error", u);
            }
          i = s[a];
        }),
        n.on("error", (s) => r.emit("error", s)),
        r
      );
    }
    _request(t, r) {
      t = t || {};
      let i = t.auth || this.auth,
        n = t.path || this.path || "";
      delete t.auth,
        delete t.path,
        this.batch ? this._doBatch(t, r, i, n) : this._doRequest(t, r, i, n);
    }
    _doBatch(t, r, i, n) {
      if ((this.batchOptions.push(t), this.batchOptions.length === 1)) {
        let s = this;
        (this.batchCallback = r),
          (this.batchTimeoutID = setTimeout(function () {
            (s.batchTimeoutID = -1), s._doBatchRequest(s.batchCallback, i, n);
          }, this.batchInterval));
      }
      this.batchOptions.length === this.batchCount &&
        this._doBatchRequest(this.batchCallback, i, n);
    }
    _doBatchRequest(t, r, i) {
      this.batchTimeoutID > 0 &&
        (clearTimeout(this.batchTimeoutID), (this.batchTimeoutID = -1));
      let n = this.batchOptions.slice();
      (this.batchOptions = []), this._doRequest(n, t, r, i);
    }
    _doRequest(t, r, i, n) {
      let s = Object.assign({}, this.headers);
      i && i.bearer && (s.Authorization = `Bearer ${i.bearer}`);
      let a = (this.ssl ? Cj : xj).request({
        ...this.options,
        method: "POST",
        host: this.host,
        port: this.port,
        path: `/${n.replace(/^\//, "")}`,
        headers: s,
        auth:
          i && i.username && i.password ? `${i.username}:${i.password}` : "",
        agent: this.agent,
      });
      a.on("error", r),
        a.on("response", (o) => o.on("end", () => r(null, o)).resume()),
        a.end(Buffer.from(Fj(t, this.options.replacer), "utf8"));
    }
  };
});
var Mg = y((lJ, Jx) => {
  "use strict";
  var wr = (e) =>
    e !== null && typeof e == "object" && typeof e.pipe == "function";
  wr.writable = (e) =>
    wr(e) &&
    e.writable !== !1 &&
    typeof e._write == "function" &&
    typeof e._writableState == "object";
  wr.readable = (e) =>
    wr(e) &&
    e.readable !== !1 &&
    typeof e._read == "function" &&
    typeof e._readableState == "object";
  wr.duplex = (e) => wr.writable(e) && wr.readable(e);
  wr.transform = (e) => wr.duplex(e) && typeof e._transform == "function";
  Jx.exports = wr;
});
var tC = y((hJ, eC) => {
  "use strict";
  var Rj = Mg(),
    { MESSAGE: Aj } = Me(),
    Nj = require("os"),
    Ij = _n();
  eC.exports = class extends Ij {
    constructor(t = {}) {
      if ((super(t), !t.stream || !Rj(t.stream)))
        throw new Error("options.stream is required.");
      (this._stream = t.stream),
        this._stream.setMaxListeners(1 / 0),
        (this.isObjectMode = t.stream._writableState.objectMode),
        (this.eol = typeof t.eol == "string" ? t.eol : Nj.EOL);
    }
    log(t, r) {
      if ((setImmediate(() => this.emit("logged", t)), this.isObjectMode)) {
        this._stream.write(t), r && r();
        return;
      }
      this._stream.write(`${t[Aj]}${this.eol}`), r && r();
    }
  };
});
var rC = y((Eo) => {
  "use strict";
  Object.defineProperty(Eo, "Console", {
    configurable: !0,
    enumerable: !0,
    get() {
      return s2();
    },
  });
  Object.defineProperty(Eo, "File", {
    configurable: !0,
    enumerable: !0,
    get() {
      return Zx();
    },
  });
  Object.defineProperty(Eo, "Http", {
    configurable: !0,
    enumerable: !0,
    get() {
      return Qx();
    },
  });
  Object.defineProperty(Eo, "Stream", {
    configurable: !0,
    enumerable: !0,
    get() {
      return tC();
    },
  });
});
var sh = y((_o) => {
  "use strict";
  var nh = Lm(),
    { configs: Lg } = Me();
  _o.cli = nh.levels(Lg.cli);
  _o.npm = nh.levels(Lg.npm);
  _o.syslog = nh.levels(Lg.syslog);
  _o.addColors = nh.levels;
});
var nC = y((ah, iC) => {
  "use strict";
  Object.defineProperty(ah, "__esModule", { value: !0 });
  var Mj = Mf(),
    Lj = Cn(Mj),
    qj = Wf(),
    Pj = Cn(qj),
    Bj = yg(),
    kj = Cn(Bj),
    jj = pg(),
    Uj = Cn(jj),
    zj = mg(),
    $j = Cn(zj),
    Wj = Sn(),
    Gj = Cn(Wj),
    Hj = Ms(),
    Vj = Cn(Hj);
  function Cn(e) {
    return e && e.__esModule ? e : { default: e };
  }
  function Yj(e, t, r) {
    r = (0, Uj.default)(r);
    var i = 0,
      n = 0,
      { length: s } = e,
      a = !1;
    s === 0 && r(null);
    function o(u, l) {
      u === !1 && (a = !0),
        a !== !0 && (u ? r(u) : (++n === s || l === Pj.default) && r(null));
    }
    for (; i < s; i++) t(e[i], i, (0, $j.default)(o));
  }
  function Xj(e, t, r) {
    return (0, kj.default)(e, 1 / 0, t, r);
  }
  function Zj(e, t, r) {
    var i = (0, Lj.default)(e) ? Yj : Xj;
    return i(e, (0, Gj.default)(t), r);
  }
  ah.default = (0, Vj.default)(Zj, 3);
  iC.exports = ah.default;
});
var aC = y((oh, sC) => {
  "use strict";
  Object.defineProperty(oh, "__esModule", { value: !0 });
  oh.default = Kj;
  function Kj(e) {
    return (t, r, i) => e(t, i);
  }
  sC.exports = oh.default;
});
var fh = y((lh, oC) => {
  "use strict";
  Object.defineProperty(lh, "__esModule", { value: !0 });
  var Qj = nC(),
    Jj = uh(Qj),
    e7 = aC(),
    t7 = uh(e7),
    r7 = Sn(),
    i7 = uh(r7),
    n7 = Ms(),
    s7 = uh(n7);
  function uh(e) {
    return e && e.__esModule ? e : { default: e };
  }
  function a7(e, t, r) {
    return (0, Jj.default)(e, (0, t7.default)((0, i7.default)(t)), r);
  }
  lh.default = (0, s7.default)(a7, 3);
  oC.exports = lh.default;
});
var lC = y((pJ, uC) => {
  "use strict";
  var o7 = Object.prototype.toString;
  uC.exports = function (t) {
    if (typeof t.displayName == "string" && t.constructor.name)
      return t.displayName;
    if (typeof t.name == "string" && t.name) return t.name;
    if (
      typeof t == "object" &&
      t.constructor &&
      typeof t.constructor.name == "string"
    )
      return t.constructor.name;
    var r = t.toString(),
      i = o7.call(t).slice(8, -1);
    return (
      i === "Function"
        ? (r = r.substring(r.indexOf("(") + 1, r.indexOf(")")))
        : (r = i),
      r || "anonymous"
    );
  };
});
var qg = y((mJ, fC) => {
  "use strict";
  var u7 = lC();
  fC.exports = function (t) {
    var r = 0,
      i;
    function n() {
      return r || ((r = 1), (i = t.apply(this, arguments)), (t = null)), i;
    }
    return (n.displayName = u7(t)), n;
  };
});
var Pg = y((xo) => {
  xo.get = function (e) {
    var t = Error.stackTraceLimit;
    Error.stackTraceLimit = 1 / 0;
    var r = {},
      i = Error.prepareStackTrace;
    (Error.prepareStackTrace = function (s, a) {
      return a;
    }),
      Error.captureStackTrace(r, e || xo.get);
    var n = r.stack;
    return (Error.prepareStackTrace = i), (Error.stackTraceLimit = t), n;
  };
  xo.parse = function (e) {
    if (!e.stack) return [];
    var t = this,
      r = e.stack
        .split(
          `
`,
        )
        .slice(1);
    return r
      .map(function (i) {
        if (i.match(/^\s*[-]{4,}$/))
          return t._createParsedCallSite({
            fileName: i,
            lineNumber: null,
            functionName: null,
            typeName: null,
            methodName: null,
            columnNumber: null,
            native: null,
          });
        var n = i.match(
          /at (?:(.+)\s+\()?(?:(.+?):(\d+)(?::(\d+))?|([^)]+))\)?/,
        );
        if (!!n) {
          var s = null,
            a = null,
            o = null,
            u = null,
            l = null,
            f = n[5] === "native";
          if (n[1]) {
            o = n[1];
            var h = o.lastIndexOf(".");
            if ((o[h - 1] == "." && h--, h > 0)) {
              (s = o.substr(0, h)), (a = o.substr(h + 1));
              var c = s.indexOf(".Module");
              c > 0 && ((o = o.substr(c + 1)), (s = s.substr(0, c)));
            }
            u = null;
          }
          a && ((u = s), (l = a)),
            a === "<anonymous>" && ((l = null), (o = null));
          var d = {
            fileName: n[2] || null,
            lineNumber: parseInt(n[3], 10) || null,
            functionName: o,
            typeName: u,
            methodName: l,
            columnNumber: parseInt(n[4], 10) || null,
            native: f,
          };
          return t._createParsedCallSite(d);
        }
      })
      .filter(function (i) {
        return !!i;
      });
  };
  function So(e) {
    for (var t in e) this[t] = e[t];
  }
  var l7 = [
      "this",
      "typeName",
      "functionName",
      "methodName",
      "fileName",
      "lineNumber",
      "columnNumber",
      "function",
      "evalOrigin",
    ],
    f7 = ["topLevel", "eval", "native", "constructor"];
  l7.forEach(function (e) {
    (So.prototype[e] = null),
      (So.prototype["get" + e[0].toUpperCase() + e.substr(1)] = function () {
        return this[e];
      });
  });
  f7.forEach(function (e) {
    (So.prototype[e] = !1),
      (So.prototype["is" + e[0].toUpperCase() + e.substr(1)] = function () {
        return this[e];
      });
  });
  xo._createParsedCallSite = function (e) {
    return new So(e);
  };
});
var Bg = y((vJ, hC) => {
  "use strict";
  var { Writable: h7 } = at();
  hC.exports = class extends h7 {
    constructor(t) {
      if ((super({ objectMode: !0 }), !t))
        throw new Error("ExceptionStream requires a TransportStream instance.");
      (this.handleExceptions = !0), (this.transport = t);
    }
    _write(t, r, i) {
      return t.exception ? this.transport.log(t, i) : (i(), !0);
    }
  };
});
var jg = y((DJ, pC) => {
  "use strict";
  var cC = require("os"),
    c7 = fh(),
    kg = bo()("winston:exception"),
    d7 = qg(),
    dC = Pg(),
    p7 = Bg();
  pC.exports = class {
    constructor(t) {
      if (!t) throw new Error("Logger is required to handle exceptions");
      (this.logger = t), (this.handlers = new Map());
    }
    handle(...t) {
      t.forEach((r) => {
        if (Array.isArray(r)) return r.forEach((i) => this._addHandler(i));
        this._addHandler(r);
      }),
        this.catcher ||
          ((this.catcher = this._uncaughtException.bind(this)),
          process.on("uncaughtException", this.catcher));
    }
    unhandle() {
      this.catcher &&
        (process.removeListener("uncaughtException", this.catcher),
        (this.catcher = !1),
        Array.from(this.handlers.values()).forEach((t) =>
          this.logger.unpipe(t),
        ));
    }
    getAllInfo(t) {
      let { message: r } = t;
      return (
        !r && typeof t == "string" && (r = t),
        {
          error: t,
          level: "error",
          message: [
            `uncaughtException: ${r || "(no error message)"}`,
            t.stack || "  No stack trace",
          ].join(`
`),
          stack: t.stack,
          exception: !0,
          date: new Date().toString(),
          process: this.getProcessInfo(),
          os: this.getOsInfo(),
          trace: this.getTrace(t),
        }
      );
    }
    getProcessInfo() {
      return {
        pid: process.pid,
        uid: process.getuid ? process.getuid() : null,
        gid: process.getgid ? process.getgid() : null,
        cwd: process.cwd(),
        execPath: process.execPath,
        version: process.version,
        argv: process.argv,
        memoryUsage: process.memoryUsage(),
      };
    }
    getOsInfo() {
      return { loadavg: cC.loadavg(), uptime: cC.uptime() };
    }
    getTrace(t) {
      return (t ? dC.parse(t) : dC.get()).map((i) => ({
        column: i.getColumnNumber(),
        file: i.getFileName(),
        function: i.getFunctionName(),
        line: i.getLineNumber(),
        method: i.getMethodName(),
        native: i.isNative(),
      }));
    }
    _addHandler(t) {
      if (!this.handlers.has(t)) {
        t.handleExceptions = !0;
        let r = new p7(t);
        this.handlers.set(t, r), this.logger.pipe(r);
      }
    }
    _uncaughtException(t) {
      let r = this.getAllInfo(t),
        i = this._getExceptionHandlers(),
        n =
          typeof this.logger.exitOnError == "function"
            ? this.logger.exitOnError(t)
            : this.logger.exitOnError,
        s;
      !i.length &&
        n &&
        (console.warn(
          "winston: exitOnError cannot be true with no exception handlers.",
        ),
        console.warn("winston: not exiting process."),
        (n = !1));
      function a() {
        kg("doExit", n),
          kg("process._exiting", process._exiting),
          n && !process._exiting && (s && clearTimeout(s), process.exit(1));
      }
      if (!i || i.length === 0) return process.nextTick(a);
      c7(
        i,
        (o, u) => {
          let l = d7(u),
            f = o.transport || o;
          function h(c) {
            return () => {
              kg(c), l();
            };
          }
          (f._ending = !0),
            f.once("finish", h("finished")),
            f.once("error", h("error"));
        },
        () => n && a(),
      ),
        this.logger.log(r),
        n && (s = setTimeout(a, 3e3));
    }
    _getExceptionHandlers() {
      return this.logger.transports.filter(
        (t) => (t.transport || t).handleExceptions,
      );
    }
  };
});
var zg = y((EJ, yC) => {
  "use strict";
  var mC = require("os"),
    m7 = fh(),
    Ug = bo()("winston:rejection"),
    g7 = qg(),
    gC = Pg(),
    y7 = Bg();
  yC.exports = class {
    constructor(t) {
      if (!t) throw new Error("Logger is required to handle rejections");
      (this.logger = t), (this.handlers = new Map());
    }
    handle(...t) {
      t.forEach((r) => {
        if (Array.isArray(r)) return r.forEach((i) => this._addHandler(i));
        this._addHandler(r);
      }),
        this.catcher ||
          ((this.catcher = this._unhandledRejection.bind(this)),
          process.on("unhandledRejection", this.catcher));
    }
    unhandle() {
      this.catcher &&
        (process.removeListener("unhandledRejection", this.catcher),
        (this.catcher = !1),
        Array.from(this.handlers.values()).forEach((t) =>
          this.logger.unpipe(t),
        ));
    }
    getAllInfo(t) {
      let r = null;
      return (
        t && (r = typeof t == "string" ? t : t.message),
        {
          error: t,
          level: "error",
          message: [
            `unhandledRejection: ${r || "(no error message)"}`,
            (t && t.stack) || "  No stack trace",
          ].join(`
`),
          stack: t && t.stack,
          exception: !0,
          date: new Date().toString(),
          process: this.getProcessInfo(),
          os: this.getOsInfo(),
          trace: this.getTrace(t),
        }
      );
    }
    getProcessInfo() {
      return {
        pid: process.pid,
        uid: process.getuid ? process.getuid() : null,
        gid: process.getgid ? process.getgid() : null,
        cwd: process.cwd(),
        execPath: process.execPath,
        version: process.version,
        argv: process.argv,
        memoryUsage: process.memoryUsage(),
      };
    }
    getOsInfo() {
      return { loadavg: mC.loadavg(), uptime: mC.uptime() };
    }
    getTrace(t) {
      return (t ? gC.parse(t) : gC.get()).map((i) => ({
        column: i.getColumnNumber(),
        file: i.getFileName(),
        function: i.getFunctionName(),
        line: i.getLineNumber(),
        method: i.getMethodName(),
        native: i.isNative(),
      }));
    }
    _addHandler(t) {
      if (!this.handlers.has(t)) {
        t.handleRejections = !0;
        let r = new y7(t);
        this.handlers.set(t, r), this.logger.pipe(r);
      }
    }
    _unhandledRejection(t) {
      let r = this.getAllInfo(t),
        i = this._getRejectionHandlers(),
        n =
          typeof this.logger.exitOnError == "function"
            ? this.logger.exitOnError(t)
            : this.logger.exitOnError,
        s;
      !i.length &&
        n &&
        (console.warn(
          "winston: exitOnError cannot be true with no rejection handlers.",
        ),
        console.warn("winston: not exiting process."),
        (n = !1));
      function a() {
        Ug("doExit", n),
          Ug("process._exiting", process._exiting),
          n && !process._exiting && (s && clearTimeout(s), process.exit(1));
      }
      if (!i || i.length === 0) return process.nextTick(a);
      m7(
        i,
        (o, u) => {
          let l = g7(u),
            f = o.transport || o;
          function h(c) {
            return () => {
              Ug(c), l();
            };
          }
          (f._ending = !0),
            f.once("finish", h("finished")),
            f.once("error", h("error"));
        },
        () => n && a(),
      ),
        this.logger.log(r),
        n && (s = setTimeout(a, 3e3));
    }
    _getRejectionHandlers() {
      return this.logger.transports.filter(
        (t) => (t.transport || t).handleRejections,
      );
    }
  };
});
var wC = y((SJ, vC) => {
  "use strict";
  vC.exports = class {
    constructor(t) {
      if (!t) throw new Error("Logger is required for profiling.");
      (this.logger = t), (this.start = Date.now());
    }
    done(...t) {
      typeof t[t.length - 1] == "function" &&
        (console.warn(
          "Callback function no longer supported as of winston@3.0.0",
        ),
        t.pop());
      let r = typeof t[t.length - 1] == "object" ? t.pop() : {};
      return (
        (r.level = r.level || "info"),
        (r.durationMs = Date.now() - this.start),
        this.logger.write(r)
      );
    }
  };
});
var SC = y((xJ, _C) => {
  "use strict";
  var { Stream: v7, Transform: w7 } = at(),
    DC = fh(),
    { LEVEL: Dr, SPLAT: bC } = Me(),
    EC = Mg(),
    D7 = jg(),
    b7 = zg(),
    E7 = hg(),
    _7 = wC(),
    { warn: S7 } = qm(),
    x7 = sh(),
    C7 = /%[scdjifoO%]/g,
    hh = class extends w7 {
      constructor(t) {
        super({ objectMode: !0 }), this.configure(t);
      }
      child(t) {
        let r = this;
        return Object.create(r, {
          write: {
            value: function (i) {
              let n = Object.assign({}, t, i);
              i instanceof Error &&
                ((n.stack = i.stack), (n.message = i.message)),
                r.write(n);
            },
          },
        });
      }
      configure({
        silent: t,
        format: r,
        defaultMeta: i,
        levels: n,
        level: s = "info",
        exitOnError: a = !0,
        transports: o,
        colors: u,
        emitErrs: l,
        formatters: f,
        padLevels: h,
        rewriters: c,
        stripColors: d,
        exceptionHandlers: m,
        rejectionHandlers: C,
      } = {}) {
        if (
          (this.transports.length && this.clear(),
          (this.silent = t),
          (this.format = r || this.format || Rm()()),
          (this.defaultMeta = i || null),
          (this.levels = n || this.levels || x7.npm.levels),
          (this.level = s),
          this.exceptions && this.exceptions.unhandle(),
          this.rejections && this.rejections.unhandle(),
          (this.exceptions = new D7(this)),
          (this.rejections = new b7(this)),
          (this.profilers = {}),
          (this.exitOnError = a),
          o &&
            ((o = Array.isArray(o) ? o : [o]), o.forEach((E) => this.add(E))),
          u || l || f || h || c || d)
        )
          throw new Error(
            [
              "{ colors, emitErrs, formatters, padLevels, rewriters, stripColors } were removed in winston@3.0.0.",
              "Use a custom winston.format(function) instead.",
              "See: https://github.com/winstonjs/winston/tree/master/UPGRADE-3.0.md",
            ].join(`
`),
          );
        m && this.exceptions.handle(m), C && this.rejections.handle(C);
      }
      isLevelEnabled(t) {
        let r = $g(this.levels, t);
        if (r === null) return !1;
        let i = $g(this.levels, this.level);
        return i === null
          ? !1
          : !this.transports || this.transports.length === 0
          ? i >= r
          : this.transports.findIndex((s) => {
              let a = $g(this.levels, s.level);
              return a === null && (a = i), a >= r;
            }) !== -1;
      }
      log(t, r, ...i) {
        if (arguments.length === 1)
          return (
            (t[Dr] = t.level), this._addDefaultMeta(t), this.write(t), this
          );
        if (arguments.length === 2)
          return r && typeof r == "object"
            ? ((r[Dr] = r.level = t),
              this._addDefaultMeta(r),
              this.write(r),
              this)
            : ((r = { [Dr]: t, level: t, message: r }),
              this._addDefaultMeta(r),
              this.write(r),
              this);
        let [n] = i;
        if (
          typeof n == "object" &&
          n !== null &&
          !(r && r.match && r.match(C7))
        ) {
          let a = Object.assign({}, this.defaultMeta, n, {
            [Dr]: t,
            [bC]: i,
            level: t,
            message: r,
          });
          return (
            n.message && (a.message = `${a.message} ${n.message}`),
            n.stack && (a.stack = n.stack),
            this.write(a),
            this
          );
        }
        return (
          this.write(
            Object.assign({}, this.defaultMeta, {
              [Dr]: t,
              [bC]: i,
              level: t,
              message: r,
            }),
          ),
          this
        );
      }
      _transform(t, r, i) {
        if (this.silent) return i();
        t[Dr] || (t[Dr] = t.level),
          !this.levels[t[Dr]] &&
            this.levels[t[Dr]] !== 0 &&
            console.error("[winston] Unknown logger level: %s", t[Dr]),
          this._readableState.pipes ||
            console.error(
              "[winston] Attempt to write logs with no transports, which can increase memory usage: %j",
              t,
            );
        try {
          this.push(this.format.transform(t, this.format.options));
        } finally {
          (this._writableState.sync = !1), i();
        }
      }
      _final(t) {
        let r = this.transports.slice();
        DC(
          r,
          (i, n) => {
            if (!i || i.finished) return setImmediate(n);
            i.once("finish", n), i.end();
          },
          t,
        );
      }
      add(t) {
        let r = !EC(t) || t.log.length > 2 ? new E7({ transport: t }) : t;
        if (!r._writableState || !r._writableState.objectMode)
          throw new Error(
            "Transports must WritableStreams in objectMode. Set { objectMode: true }.",
          );
        return (
          this._onEvent("error", r),
          this._onEvent("warn", r),
          this.pipe(r),
          t.handleExceptions && this.exceptions.handle(),
          t.handleRejections && this.rejections.handle(),
          this
        );
      }
      remove(t) {
        if (!t) return this;
        let r = t;
        return (
          (!EC(t) || t.log.length > 2) &&
            (r = this.transports.filter((i) => i.transport === t)[0]),
          r && this.unpipe(r),
          this
        );
      }
      clear() {
        return this.unpipe(), this;
      }
      close() {
        return (
          this.exceptions.unhandle(),
          this.rejections.unhandle(),
          this.clear(),
          this.emit("close"),
          this
        );
      }
      setLevels() {
        S7.deprecated("setLevels");
      }
      query(t, r) {
        typeof t == "function" && ((r = t), (t = {})), (t = t || {});
        let i = {},
          n = Object.assign({}, t.query || {});
        function s(o, u) {
          t.query &&
            typeof o.formatQuery == "function" &&
            (t.query = o.formatQuery(n)),
            o.query(t, (l, f) => {
              if (l) return u(l);
              typeof o.formatResults == "function" &&
                (f = o.formatResults(f, t.format)),
                u(null, f);
            });
        }
        function a(o, u) {
          s(o, (l, f) => {
            u && ((f = l || f), f && (i[o.name] = f), u()), (u = null);
          });
        }
        DC(
          this.transports.filter((o) => !!o.query),
          a,
          () => r(null, i),
        );
      }
      stream(t = {}) {
        let r = new v7(),
          i = [];
        return (
          (r._streams = i),
          (r.destroy = () => {
            let n = i.length;
            for (; n--; ) i[n].destroy();
          }),
          this.transports
            .filter((n) => !!n.stream)
            .forEach((n) => {
              let s = n.stream(t);
              !s ||
                (i.push(s),
                s.on("log", (a) => {
                  (a.transport = a.transport || []),
                    a.transport.push(n.name),
                    r.emit("log", a);
                }),
                s.on("error", (a) => {
                  (a.transport = a.transport || []),
                    a.transport.push(n.name),
                    r.emit("error", a);
                }));
            }),
          r
        );
      }
      startTimer() {
        return new _7(this);
      }
      profile(t, ...r) {
        let i = Date.now();
        if (this.profilers[t]) {
          let n = this.profilers[t];
          delete this.profilers[t],
            typeof r[r.length - 2] == "function" &&
              (console.warn(
                "Callback function no longer supported as of winston@3.0.0",
              ),
              r.pop());
          let s = typeof r[r.length - 1] == "object" ? r.pop() : {};
          return (
            (s.level = s.level || "info"),
            (s.durationMs = i - n),
            (s.message = s.message || t),
            this.write(s)
          );
        }
        return (this.profilers[t] = i), this;
      }
      handleExceptions(...t) {
        console.warn(
          "Deprecated: .handleExceptions() will be removed in winston@4. Use .exceptions.handle()",
        ),
          this.exceptions.handle(...t);
      }
      unhandleExceptions(...t) {
        console.warn(
          "Deprecated: .unhandleExceptions() will be removed in winston@4. Use .exceptions.unhandle()",
        ),
          this.exceptions.unhandle(...t);
      }
      cli() {
        throw new Error(
          [
            "Logger.cli() was removed in winston@3.0.0",
            "Use a custom winston.formats.cli() instead.",
            "See: https://github.com/winstonjs/winston/tree/master/UPGRADE-3.0.md",
          ].join(`
`),
        );
      }
      _onEvent(t, r) {
        function i(n) {
          t === "error" && !this.transports.includes(r) && this.add(r),
            this.emit(t, n, r);
        }
        r["__winston" + t] ||
          ((r["__winston" + t] = i.bind(this)), r.on(t, r["__winston" + t]));
      }
      _addDefaultMeta(t) {
        this.defaultMeta && Object.assign(t, this.defaultMeta);
      }
    };
  function $g(e, t) {
    let r = e[t];
    return !r && r !== 0 ? null : r;
  }
  Object.defineProperty(hh.prototype, "transports", {
    configurable: !1,
    enumerable: !0,
    get() {
      let { pipes: e } = this._readableState;
      return Array.isArray(e) ? e : [e].filter(Boolean);
    },
  });
  _C.exports = hh;
});
var Wg = y((CJ, xC) => {
  "use strict";
  var { LEVEL: O7 } = Me(),
    T7 = sh(),
    F7 = SC(),
    R7 = bo()("winston:create-logger");
  function A7(e) {
    return "is" + e.charAt(0).toUpperCase() + e.slice(1) + "Enabled";
  }
  xC.exports = function (e = {}) {
    e.levels = e.levels || T7.npm.levels;
    class t extends F7 {
      constructor(n) {
        super(n);
      }
    }
    let r = new t(e);
    return (
      Object.keys(e.levels).forEach(function (i) {
        if ((R7('Define prototype method for "%s"', i), i === "log")) {
          console.warn(
            'Level "log" not defined: conflicts with the method "log". Use a different level name.',
          );
          return;
        }
        (t.prototype[i] = function (...n) {
          let s = this || r;
          if (n.length === 1) {
            let [a] = n,
              o = (a && a.message && a) || { message: a };
            return (
              (o.level = o[O7] = i), s._addDefaultMeta(o), s.write(o), this || r
            );
          }
          return n.length === 0 ? (s.log(i, ""), s) : s.log(i, ...n);
        }),
          (t.prototype[A7(i)] = function () {
            return (this || r).isLevelEnabled(i);
          });
      }),
      r
    );
  };
});
var OC = y((TJ, CC) => {
  "use strict";
  var N7 = Wg();
  CC.exports = class {
    constructor(t = {}) {
      (this.loggers = new Map()), (this.options = t);
    }
    add(t, r) {
      if (!this.loggers.has(t)) {
        r = Object.assign({}, r || this.options);
        let i = r.transports || this.options.transports;
        r.transports = i ? i.slice() : [];
        let n = N7(r);
        n.on("close", () => this._delete(t)), this.loggers.set(t, n);
      }
      return this.loggers.get(t);
    }
    get(t, r) {
      return this.add(t, r);
    }
    has(t) {
      return !!this.loggers.has(t);
    }
    close(t) {
      if (t) return this._removeLogger(t);
      this.loggers.forEach((r, i) => this._removeLogger(i));
    }
    _removeLogger(t) {
      if (!this.loggers.has(t)) return;
      this.loggers.get(t).close(), this._delete(t);
    }
    _delete(t) {
      this.loggers.delete(t);
    }
  };
});
var FC = y((ve) => {
  "use strict";
  var TC = Lm(),
    { warn: Ps } = qm();
  ve.version = oS().version;
  ve.transports = rC();
  ve.config = sh();
  ve.addColors = TC.levels;
  ve.format = TC.format;
  ve.createLogger = Wg();
  ve.ExceptionHandler = jg();
  ve.RejectionHandler = zg();
  ve.Container = OC();
  ve.Transport = _n();
  ve.loggers = new ve.Container();
  var Wr = ve.createLogger();
  Object.keys(ve.config.npm.levels)
    .concat([
      "log",
      "query",
      "stream",
      "add",
      "remove",
      "clear",
      "profile",
      "startTimer",
      "handleExceptions",
      "unhandleExceptions",
      "handleRejections",
      "unhandleRejections",
      "configure",
      "child",
    ])
    .forEach((e) => (ve[e] = (...t) => Wr[e](...t)));
  Object.defineProperty(ve, "level", {
    get() {
      return Wr.level;
    },
    set(e) {
      Wr.level = e;
    },
  });
  Object.defineProperty(ve, "exceptions", {
    get() {
      return Wr.exceptions;
    },
  });
  ["exitOnError"].forEach((e) => {
    Object.defineProperty(ve, e, {
      get() {
        return Wr[e];
      },
      set(t) {
        Wr[e] = t;
      },
    });
  });
  Object.defineProperty(ve, "default", {
    get() {
      return {
        exceptionHandlers: Wr.exceptionHandlers,
        rejectionHandlers: Wr.rejectionHandlers,
        transports: Wr.transports,
      };
    },
  });
  Ps.deprecated(ve, "setLevels");
  Ps.forFunctions(ve, "useFormat", ["cli"]);
  Ps.forProperties(ve, "useFormat", ["padLevels", "stripColors"]);
  Ps.forFunctions(ve, "deprecated", [
    "addRewriter",
    "addFilter",
    "clone",
    "extend",
  ]);
  Ps.forProperties(ve, "deprecated", ["emitErrs", "levelLength"]);
  Ps.moved(ve, "createLogger", "Logger");
});
var qC = y((PJ, LC) => {
  var P7 =
    typeof process == "object" && process && process.platform === "win32";
  LC.exports = P7 ? { sep: "\\" } : { sep: "/" };
});
var Gg = y((BJ, jC) => {
  "use strict";
  jC.exports = BC;
  function BC(e, t, r) {
    e instanceof RegExp && (e = PC(e, r)),
      t instanceof RegExp && (t = PC(t, r));
    var i = kC(e, t, r);
    return (
      i && {
        start: i[0],
        end: i[1],
        pre: r.slice(0, i[0]),
        body: r.slice(i[0] + e.length, i[1]),
        post: r.slice(i[1] + t.length),
      }
    );
  }
  function PC(e, t) {
    var r = t.match(e);
    return r ? r[0] : null;
  }
  BC.range = kC;
  function kC(e, t, r) {
    var i,
      n,
      s,
      a,
      o,
      u = r.indexOf(e),
      l = r.indexOf(t, u + 1),
      f = u;
    if (u >= 0 && l > 0) {
      if (e === t) return [u, l];
      for (i = [], s = r.length; f >= 0 && !o; )
        f == u
          ? (i.push(f), (u = r.indexOf(e, f + 1)))
          : i.length == 1
          ? (o = [i.pop(), l])
          : ((n = i.pop()),
            n < s && ((s = n), (a = l)),
            (l = r.indexOf(t, f + 1))),
          (f = u < l && u >= 0 ? u : l);
      i.length && (o = [s, a]);
    }
    return o;
  }
});
var YC = y((kJ, VC) => {
  var UC = Gg();
  VC.exports = j7;
  var zC = "\0SLASH" + Math.random() + "\0",
    $C = "\0OPEN" + Math.random() + "\0",
    Vg = "\0CLOSE" + Math.random() + "\0",
    WC = "\0COMMA" + Math.random() + "\0",
    GC = "\0PERIOD" + Math.random() + "\0";
  function Hg(e) {
    return parseInt(e, 10) == e ? parseInt(e, 10) : e.charCodeAt(0);
  }
  function B7(e) {
    return e
      .split("\\\\")
      .join(zC)
      .split("\\{")
      .join($C)
      .split("\\}")
      .join(Vg)
      .split("\\,")
      .join(WC)
      .split("\\.")
      .join(GC);
  }
  function k7(e) {
    return e
      .split(zC)
      .join("\\")
      .split($C)
      .join("{")
      .split(Vg)
      .join("}")
      .split(WC)
      .join(",")
      .split(GC)
      .join(".");
  }
  function HC(e) {
    if (!e) return [""];
    var t = [],
      r = UC("{", "}", e);
    if (!r) return e.split(",");
    var i = r.pre,
      n = r.body,
      s = r.post,
      a = i.split(",");
    a[a.length - 1] += "{" + n + "}";
    var o = HC(s);
    return (
      s.length && ((a[a.length - 1] += o.shift()), a.push.apply(a, o)),
      t.push.apply(t, a),
      t
    );
  }
  function j7(e) {
    return e
      ? (e.substr(0, 2) === "{}" && (e = "\\{\\}" + e.substr(2)),
        Co(B7(e), !0).map(k7))
      : [];
  }
  function U7(e) {
    return "{" + e + "}";
  }
  function z7(e) {
    return /^-?0\d/.test(e);
  }
  function $7(e, t) {
    return e <= t;
  }
  function W7(e, t) {
    return e >= t;
  }
  function Co(e, t) {
    var r = [],
      i = UC("{", "}", e);
    if (!i) return [e];
    var n = i.pre,
      s = i.post.length ? Co(i.post, !1) : [""];
    if (/\$$/.test(i.pre))
      for (var a = 0; a < s.length; a++) {
        var o = n + "{" + i.body + "}" + s[a];
        r.push(o);
      }
    else {
      var u = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(i.body),
        l = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(i.body),
        f = u || l,
        h = i.body.indexOf(",") >= 0;
      if (!f && !h)
        return i.post.match(/,.*\}/)
          ? ((e = i.pre + "{" + i.body + Vg + i.post), Co(e))
          : [e];
      var c;
      if (f) c = i.body.split(/\.\./);
      else if (
        ((c = HC(i.body)),
        c.length === 1 && ((c = Co(c[0], !1).map(U7)), c.length === 1))
      )
        return s.map(function (T) {
          return i.pre + c[0] + T;
        });
      var d;
      if (f) {
        var m = Hg(c[0]),
          C = Hg(c[1]),
          E = Math.max(c[0].length, c[1].length),
          O = c.length == 3 ? Math.abs(Hg(c[2])) : 1,
          L = $7,
          D = C < m;
        D && ((O *= -1), (L = W7));
        var w = c.some(z7);
        d = [];
        for (var F = m; L(F, C); F += O) {
          var g;
          if (l) (g = String.fromCharCode(F)), g === "\\" && (g = "");
          else if (((g = String(F)), w)) {
            var x = E - g.length;
            if (x > 0) {
              var A = new Array(x + 1).join("0");
              F < 0 ? (g = "-" + A + g.slice(1)) : (g = A + g);
            }
          }
          d.push(g);
        }
      } else {
        d = [];
        for (var p = 0; p < c.length; p++) d.push.apply(d, Co(c[p], !1));
      }
      for (var p = 0; p < d.length; p++)
        for (var a = 0; a < s.length; a++) {
          var o = n + d[p] + s[a];
          (!t || f || o) && r.push(o);
        }
    }
    return r;
  }
});
var eO = y((UJ, Kg) => {
  var It = (Kg.exports = (e, t, r = {}) => (
    dh(t), !r.nocomment && t.charAt(0) === "#" ? !1 : new ks(t, r).match(e)
  ));
  Kg.exports = It;
  var Xg = qC();
  It.sep = Xg.sep;
  var sr = Symbol("globstar **");
  It.GLOBSTAR = sr;
  var G7 = YC(),
    XC = {
      "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
      "?": { open: "(?:", close: ")?" },
      "+": { open: "(?:", close: ")+" },
      "*": { open: "(?:", close: ")*" },
      "@": { open: "(?:", close: ")" },
    },
    Zg = "[^/]",
    Yg = Zg + "*?",
    H7 = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?",
    V7 = "(?:(?!(?:\\/|^)\\.).)*?",
    QC = (e) => e.split("").reduce((t, r) => ((t[r] = !0), t), {}),
    ZC = QC("().*{}+?[]^$\\!"),
    Y7 = QC("[.("),
    KC = /\/+/;
  It.filter =
    (e, t = {}) =>
    (r, i, n) =>
      It(r, e, t);
  var Ai = (e, t = {}) => {
    let r = {};
    return (
      Object.keys(e).forEach((i) => (r[i] = e[i])),
      Object.keys(t).forEach((i) => (r[i] = t[i])),
      r
    );
  };
  It.defaults = (e) => {
    if (!e || typeof e != "object" || !Object.keys(e).length) return It;
    let t = It,
      r = (i, n, s) => t(i, n, Ai(e, s));
    return (
      (r.Minimatch = class extends t.Minimatch {
        constructor(n, s) {
          super(n, Ai(e, s));
        }
      }),
      (r.Minimatch.defaults = (i) => t.defaults(Ai(e, i)).Minimatch),
      (r.filter = (i, n) => t.filter(i, Ai(e, n))),
      (r.defaults = (i) => t.defaults(Ai(e, i))),
      (r.makeRe = (i, n) => t.makeRe(i, Ai(e, n))),
      (r.braceExpand = (i, n) => t.braceExpand(i, Ai(e, n))),
      (r.match = (i, n, s) => t.match(i, n, Ai(e, s))),
      r
    );
  };
  It.braceExpand = (e, t) => JC(e, t);
  var JC = (e, t = {}) => (
      dh(e), t.nobrace || !/\{(?:(?!\{).)*\}/.test(e) ? [e] : G7(e)
    ),
    X7 = 1024 * 64,
    dh = (e) => {
      if (typeof e != "string") throw new TypeError("invalid pattern");
      if (e.length > X7) throw new TypeError("pattern is too long");
    },
    ch = Symbol("subparse");
  It.makeRe = (e, t) => new ks(e, t || {}).makeRe();
  It.match = (e, t, r = {}) => {
    let i = new ks(t, r);
    return (
      (e = e.filter((n) => i.match(n))),
      i.options.nonull && !e.length && e.push(t),
      e
    );
  };
  var Z7 = (e) => e.replace(/\\(.)/g, "$1"),
    K7 = (e) => e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
    ks = class {
      constructor(t, r) {
        dh(t),
          r || (r = {}),
          (this.options = r),
          (this.set = []),
          (this.pattern = t),
          (this.windowsPathsNoEscape =
            !!r.windowsPathsNoEscape || r.allowWindowsEscape === !1),
          this.windowsPathsNoEscape &&
            (this.pattern = this.pattern.replace(/\\/g, "/")),
          (this.regexp = null),
          (this.negate = !1),
          (this.comment = !1),
          (this.empty = !1),
          (this.partial = !!r.partial),
          this.make();
      }
      debug() {}
      make() {
        let t = this.pattern,
          r = this.options;
        if (!r.nocomment && t.charAt(0) === "#") {
          this.comment = !0;
          return;
        }
        if (!t) {
          this.empty = !0;
          return;
        }
        this.parseNegate();
        let i = (this.globSet = this.braceExpand());
        r.debug && (this.debug = (...n) => console.error(...n)),
          this.debug(this.pattern, i),
          (i = this.globParts = i.map((n) => n.split(KC))),
          this.debug(this.pattern, i),
          (i = i.map((n, s, a) => n.map(this.parse, this))),
          this.debug(this.pattern, i),
          (i = i.filter((n) => n.indexOf(!1) === -1)),
          this.debug(this.pattern, i),
          (this.set = i);
      }
      parseNegate() {
        if (this.options.nonegate) return;
        let t = this.pattern,
          r = !1,
          i = 0;
        for (let n = 0; n < t.length && t.charAt(n) === "!"; n++) (r = !r), i++;
        i && (this.pattern = t.substr(i)), (this.negate = r);
      }
      matchOne(t, r, i) {
        var n = this.options;
        this.debug("matchOne", { this: this, file: t, pattern: r }),
          this.debug("matchOne", t.length, r.length);
        for (
          var s = 0, a = 0, o = t.length, u = r.length;
          s < o && a < u;
          s++, a++
        ) {
          this.debug("matchOne loop");
          var l = r[a],
            f = t[s];
          if ((this.debug(r, l, f), l === !1)) return !1;
          if (l === sr) {
            this.debug("GLOBSTAR", [r, l, f]);
            var h = s,
              c = a + 1;
            if (c === u) {
              for (this.debug("** at the end"); s < o; s++)
                if (
                  t[s] === "." ||
                  t[s] === ".." ||
                  (!n.dot && t[s].charAt(0) === ".")
                )
                  return !1;
              return !0;
            }
            for (; h < o; ) {
              var d = t[h];
              if (
                (this.debug(
                  `
globstar while`,
                  t,
                  h,
                  r,
                  c,
                  d,
                ),
                this.matchOne(t.slice(h), r.slice(c), i))
              )
                return this.debug("globstar found match!", h, o, d), !0;
              if (d === "." || d === ".." || (!n.dot && d.charAt(0) === ".")) {
                this.debug("dot detected!", t, h, r, c);
                break;
              }
              this.debug("globstar swallow a segment, and continue"), h++;
            }
            return !!(
              i &&
              (this.debug(
                `
>>> no match, partial?`,
                t,
                h,
                r,
                c,
              ),
              h === o)
            );
          }
          var m;
          if (
            (typeof l == "string"
              ? ((m = f === l), this.debug("string match", l, f, m))
              : ((m = f.match(l)), this.debug("pattern match", l, f, m)),
            !m)
          )
            return !1;
        }
        if (s === o && a === u) return !0;
        if (s === o) return i;
        if (a === u) return s === o - 1 && t[s] === "";
        throw new Error("wtf?");
      }
      braceExpand() {
        return JC(this.pattern, this.options);
      }
      parse(t, r) {
        dh(t);
        let i = this.options;
        if (t === "**")
          if (i.noglobstar) t = "*";
          else return sr;
        if (t === "") return "";
        let n = "",
          s = !!i.nocase,
          a = !1,
          o = [],
          u = [],
          l,
          f = !1,
          h = -1,
          c = -1,
          d,
          m,
          C,
          E =
            t.charAt(0) === "."
              ? ""
              : i.dot
              ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))"
              : "(?!\\.)",
          O = () => {
            if (l) {
              switch (l) {
                case "*":
                  (n += Yg), (s = !0);
                  break;
                case "?":
                  (n += Zg), (s = !0);
                  break;
                default:
                  n += "\\" + l;
                  break;
              }
              this.debug("clearStateChar %j %j", l, n), (l = !1);
            }
          };
        for (let w = 0, F; w < t.length && (F = t.charAt(w)); w++) {
          if ((this.debug("%s	%s %s %j", t, w, n, F), a)) {
            if (F === "/") return !1;
            ZC[F] && (n += "\\"), (n += F), (a = !1);
            continue;
          }
          switch (F) {
            case "/":
              return !1;
            case "\\":
              O(), (a = !0);
              continue;
            case "?":
            case "*":
            case "+":
            case "@":
            case "!":
              if ((this.debug("%s	%s %s %j <-- stateChar", t, w, n, F), f)) {
                this.debug("  in class"),
                  F === "!" && w === c + 1 && (F = "^"),
                  (n += F);
                continue;
              }
              this.debug("call clearStateChar %j", l),
                O(),
                (l = F),
                i.noext && O();
              continue;
            case "(":
              if (f) {
                n += "(";
                continue;
              }
              if (!l) {
                n += "\\(";
                continue;
              }
              o.push({
                type: l,
                start: w - 1,
                reStart: n.length,
                open: XC[l].open,
                close: XC[l].close,
              }),
                (n += l === "!" ? "(?:(?!(?:" : "(?:"),
                this.debug("plType %j %j", l, n),
                (l = !1);
              continue;
            case ")":
              if (f || !o.length) {
                n += "\\)";
                continue;
              }
              O(),
                (s = !0),
                (m = o.pop()),
                (n += m.close),
                m.type === "!" && u.push(m),
                (m.reEnd = n.length);
              continue;
            case "|":
              if (f || !o.length) {
                n += "\\|";
                continue;
              }
              O(), (n += "|");
              continue;
            case "[":
              if ((O(), f)) {
                n += "\\" + F;
                continue;
              }
              (f = !0), (c = w), (h = n.length), (n += F);
              continue;
            case "]":
              if (w === c + 1 || !f) {
                n += "\\" + F;
                continue;
              }
              d = t.substring(c + 1, w);
              try {
                RegExp("[" + d + "]");
              } catch {
                (C = this.parse(d, ch)),
                  (n = n.substr(0, h) + "\\[" + C[0] + "\\]"),
                  (s = s || C[1]),
                  (f = !1);
                continue;
              }
              (s = !0), (f = !1), (n += F);
              continue;
            default:
              O(), ZC[F] && !(F === "^" && f) && (n += "\\"), (n += F);
              break;
          }
        }
        for (
          f &&
            ((d = t.substr(c + 1)),
            (C = this.parse(d, ch)),
            (n = n.substr(0, h) + "\\[" + C[0]),
            (s = s || C[1])),
            m = o.pop();
          m;
          m = o.pop()
        ) {
          let w;
          (w = n.slice(m.reStart + m.open.length)),
            this.debug("setting tail", n, m),
            (w = w.replace(
              /((?:\\{2}){0,64})(\\?)\|/g,
              (g, x, A) => (A || (A = "\\"), x + x + A + "|"),
            )),
            this.debug(
              `tail=%j
   %s`,
              w,
              w,
              m,
              n,
            );
          let F = m.type === "*" ? Yg : m.type === "?" ? Zg : "\\" + m.type;
          (s = !0), (n = n.slice(0, m.reStart) + F + "\\(" + w);
        }
        O(), a && (n += "\\\\");
        let L = Y7[n.charAt(0)];
        for (let w = u.length - 1; w > -1; w--) {
          let F = u[w],
            g = n.slice(0, F.reStart),
            x = n.slice(F.reStart, F.reEnd - 8),
            A = n.slice(F.reEnd),
            p = n.slice(F.reEnd - 8, F.reEnd) + A,
            T = g.split("(").length - 1,
            R = A;
          for (let z = 0; z < T; z++) R = R.replace(/\)[+*?]?/, "");
          A = R;
          let k = A === "" && r !== ch ? "$" : "";
          n = g + x + A + k + p;
        }
        if ((n !== "" && s && (n = "(?=.)" + n), L && (n = E + n), r === ch))
          return [n, s];
        if (!s) return Z7(t);
        let D = i.nocase ? "i" : "";
        try {
          return Object.assign(new RegExp("^" + n + "$", D), {
            _glob: t,
            _src: n,
          });
        } catch {
          return new RegExp("$.");
        }
      }
      makeRe() {
        if (this.regexp || this.regexp === !1) return this.regexp;
        let t = this.set;
        if (!t.length) return (this.regexp = !1), this.regexp;
        let r = this.options,
          i = r.noglobstar ? Yg : r.dot ? H7 : V7,
          n = r.nocase ? "i" : "",
          s = t
            .map(
              (a) => (
                (a = a
                  .map((o) =>
                    typeof o == "string" ? K7(o) : o === sr ? sr : o._src,
                  )
                  .reduce(
                    (o, u) => (
                      (o[o.length - 1] === sr && u === sr) || o.push(u), o
                    ),
                    [],
                  )),
                a.forEach((o, u) => {
                  o !== sr ||
                    a[u - 1] === sr ||
                    (u === 0
                      ? a.length > 1
                        ? (a[u + 1] = "(?:\\/|" + i + "\\/)?" + a[u + 1])
                        : (a[u] = i)
                      : u === a.length - 1
                      ? (a[u - 1] += "(?:\\/|" + i + ")?")
                      : ((a[u - 1] += "(?:\\/|\\/" + i + "\\/)" + a[u + 1]),
                        (a[u + 1] = sr)));
                }),
                a.filter((o) => o !== sr).join("/")
              ),
            )
            .join("|");
        (s = "^(?:" + s + ")$"), this.negate && (s = "^(?!" + s + ").*$");
        try {
          this.regexp = new RegExp(s, n);
        } catch {
          this.regexp = !1;
        }
        return this.regexp;
      }
      match(t, r = this.partial) {
        if ((this.debug("match", t, this.pattern), this.comment)) return !1;
        if (this.empty) return t === "";
        if (t === "/" && r) return !0;
        let i = this.options;
        Xg.sep !== "/" && (t = t.split(Xg.sep).join("/")),
          (t = t.split(KC)),
          this.debug(this.pattern, "split", t);
        let n = this.set;
        this.debug(this.pattern, "set", n);
        let s;
        for (let a = t.length - 1; a >= 0 && ((s = t[a]), !s); a--);
        for (let a = 0; a < n.length; a++) {
          let o = n[a],
            u = t;
          if (
            (i.matchBase && o.length === 1 && (u = [s]), this.matchOne(u, o, r))
          )
            return i.flipNegate ? !0 : !this.negate;
        }
        return i.flipNegate ? !1 : this.negate;
      }
      static defaults(t) {
        return It.defaults(t).Minimatch;
      }
    };
  It.Minimatch = ks;
});
var sO = y((zJ, nO) => {
  nO.exports = iO;
  var Jg = require("fs"),
    { EventEmitter: Q7 } = require("events"),
    { Minimatch: Qg } = eO(),
    { resolve: J7 } = require("path");
  function e9(e, t) {
    return new Promise((r, i) => {
      Jg.readdir(e, { withFileTypes: !0 }, (n, s) => {
        if (n)
          switch (n.code) {
            case "ENOTDIR":
              t ? i(n) : r([]);
              break;
            case "ENOTSUP":
            case "ENOENT":
            case "ENAMETOOLONG":
            case "UNKNOWN":
              r([]);
              break;
            case "ELOOP":
            default:
              i(n);
              break;
          }
        else r(s);
      });
    });
  }
  function tO(e, t) {
    return new Promise((r, i) => {
      (t ? Jg.stat : Jg.lstat)(e, (s, a) => {
        if (s)
          switch (s.code) {
            case "ENOENT":
              r(t ? tO(e, !1) : null);
              break;
            default:
              r(null);
              break;
          }
        else r(a);
      });
    });
  }
  async function* rO(e, t, r, i, n, s) {
    let a = await e9(t + e, s);
    for (let o of a) {
      let u = o.name;
      u === void 0 && ((u = o), (i = !0));
      let l = e + "/" + u,
        f = l.slice(1),
        h = t + "/" + f,
        c = null;
      (i || r) && (c = await tO(h, r)),
        !c && o.name !== void 0 && (c = o),
        c === null && (c = { isDirectory: () => !1 }),
        c.isDirectory()
          ? n(f) ||
            (yield { relative: f, absolute: h, stats: c },
            yield* rO(l, t, r, i, n, !1))
          : yield { relative: f, absolute: h, stats: c };
    }
  }
  async function* t9(e, t, r, i) {
    yield* rO("", e, t, r, i, !0);
  }
  function r9(e) {
    return {
      pattern: e.pattern,
      dot: !!e.dot,
      noglobstar: !!e.noglobstar,
      matchBase: !!e.matchBase,
      nocase: !!e.nocase,
      ignore: e.ignore,
      skip: e.skip,
      follow: !!e.follow,
      stat: !!e.stat,
      nodir: !!e.nodir,
      mark: !!e.mark,
      silent: !!e.silent,
      absolute: !!e.absolute,
    };
  }
  var ph = class extends Q7 {
    constructor(t, r, i) {
      if (
        (super(),
        typeof r == "function" && ((i = r), (r = null)),
        (this.options = r9(r || {})),
        (this.matchers = []),
        this.options.pattern)
      ) {
        let n = Array.isArray(this.options.pattern)
          ? this.options.pattern
          : [this.options.pattern];
        this.matchers = n.map(
          (s) =>
            new Qg(s, {
              dot: this.options.dot,
              noglobstar: this.options.noglobstar,
              matchBase: this.options.matchBase,
              nocase: this.options.nocase,
            }),
        );
      }
      if (((this.ignoreMatchers = []), this.options.ignore)) {
        let n = Array.isArray(this.options.ignore)
          ? this.options.ignore
          : [this.options.ignore];
        this.ignoreMatchers = n.map((s) => new Qg(s, { dot: !0 }));
      }
      if (((this.skipMatchers = []), this.options.skip)) {
        let n = Array.isArray(this.options.skip)
          ? this.options.skip
          : [this.options.skip];
        this.skipMatchers = n.map((s) => new Qg(s, { dot: !0 }));
      }
      (this.iterator = t9(
        J7(t || "."),
        this.options.follow,
        this.options.stat,
        this._shouldSkipDirectory.bind(this),
      )),
        (this.paused = !1),
        (this.inactive = !1),
        (this.aborted = !1),
        i &&
          ((this._matches = []),
          this.on("match", (n) =>
            this._matches.push(this.options.absolute ? n.absolute : n.relative),
          ),
          this.on("error", (n) => i(n)),
          this.on("end", () => i(null, this._matches))),
        setTimeout(() => this._next(), 0);
    }
    _shouldSkipDirectory(t) {
      return this.skipMatchers.some((r) => r.match(t));
    }
    _fileMatches(t, r) {
      let i = t + (r ? "/" : "");
      return (
        (this.matchers.length === 0 || this.matchers.some((n) => n.match(i))) &&
        !this.ignoreMatchers.some((n) => n.match(i)) &&
        (!this.options.nodir || !r)
      );
    }
    _next() {
      !this.paused && !this.aborted
        ? this.iterator
            .next()
            .then((t) => {
              if (t.done) this.emit("end");
              else {
                let r = t.value.stats.isDirectory();
                if (this._fileMatches(t.value.relative, r)) {
                  let i = t.value.relative,
                    n = t.value.absolute;
                  this.options.mark && r && ((i += "/"), (n += "/")),
                    this.options.stat
                      ? this.emit("match", {
                          relative: i,
                          absolute: n,
                          stat: t.value.stats,
                        })
                      : this.emit("match", { relative: i, absolute: n });
                }
                this._next(this.iterator);
              }
            })
            .catch((t) => {
              this.abort(),
                this.emit("error", t),
                !t.code && !this.options.silent && console.error(t);
            })
        : (this.inactive = !0);
    }
    abort() {
      this.aborted = !0;
    }
    pause() {
      this.paused = !0;
    }
    resume() {
      (this.paused = !1), this.inactive && ((this.inactive = !1), this._next());
    }
  };
  function iO(e, t, r) {
    return new ph(e, t, r);
  }
  iO.ReaddirGlob = ph;
});
var oO = y((mh, aO) => {
  (function (e, t) {
    typeof mh == "object" && typeof aO < "u"
      ? t(mh)
      : typeof define == "function" && define.amd
      ? define(["exports"], t)
      : t((e.async = {}));
  })(mh, function (e) {
    "use strict";
    function t(b, ...v) {
      return (...S) => b(...v, ...S);
    }
    function r(b) {
      return function (...v) {
        var S = v.pop();
        return b.call(this, v, S);
      };
    }
    var i = typeof queueMicrotask == "function" && queueMicrotask,
      n = typeof setImmediate == "function" && setImmediate,
      s = typeof process == "object" && typeof process.nextTick == "function";
    function a(b) {
      setTimeout(b, 0);
    }
    function o(b) {
      return (v, ...S) => b(() => v(...S));
    }
    var u;
    i
      ? (u = queueMicrotask)
      : n
      ? (u = setImmediate)
      : s
      ? (u = process.nextTick)
      : (u = a);
    var l = o(u);
    function f(b) {
      return d(b)
        ? function (...v) {
            let S = v.pop(),
              N = b.apply(this, v);
            return h(N, S);
          }
        : r(function (v, S) {
            var N;
            try {
              N = b.apply(this, v);
            } catch (M) {
              return S(M);
            }
            if (N && typeof N.then == "function") return h(N, S);
            S(null, N);
          });
    }
    function h(b, v) {
      return b.then(
        (S) => {
          c(v, null, S);
        },
        (S) => {
          c(v, S && S.message ? S : new Error(S));
        },
      );
    }
    function c(b, v, S) {
      try {
        b(v, S);
      } catch (N) {
        l((M) => {
          throw M;
        }, N);
      }
    }
    function d(b) {
      return b[Symbol.toStringTag] === "AsyncFunction";
    }
    function m(b) {
      return b[Symbol.toStringTag] === "AsyncGenerator";
    }
    function C(b) {
      return typeof b[Symbol.asyncIterator] == "function";
    }
    function E(b) {
      if (typeof b != "function") throw new Error("expected a function");
      return d(b) ? f(b) : b;
    }
    function O(b, v = b.length) {
      if (!v) throw new Error("arity is undefined");
      function S(...N) {
        return typeof N[v - 1] == "function"
          ? b.apply(this, N)
          : new Promise((M, q) => {
              (N[v - 1] = (B, ...j) => {
                if (B) return q(B);
                M(j.length > 1 ? j : j[0]);
              }),
                b.apply(this, N);
            });
      }
      return S;
    }
    function L(b) {
      return function (S, ...N) {
        return O(function (q) {
          var B = this;
          return b(
            S,
            (j, U) => {
              E(j).apply(B, N.concat(U));
            },
            q,
          );
        });
      };
    }
    function D(b, v, S, N) {
      v = v || [];
      var M = [],
        q = 0,
        B = E(S);
      return b(
        v,
        (j, U, Y) => {
          var ne = q++;
          B(j, (ue, se) => {
            (M[ne] = se), Y(ue);
          });
        },
        (j) => {
          N(j, M);
        },
      );
    }
    function w(b) {
      return (
        b && typeof b.length == "number" && b.length >= 0 && b.length % 1 === 0
      );
    }
    let F = {};
    function g(b) {
      function v(...S) {
        if (b !== null) {
          var N = b;
          (b = null), N.apply(this, S);
        }
      }
      return Object.assign(v, b), v;
    }
    function x(b) {
      return b[Symbol.iterator] && b[Symbol.iterator]();
    }
    function A(b) {
      var v = -1,
        S = b.length;
      return function () {
        return ++v < S ? { value: b[v], key: v } : null;
      };
    }
    function p(b) {
      var v = -1;
      return function () {
        var N = b.next();
        return N.done ? null : (v++, { value: N.value, key: v });
      };
    }
    function T(b) {
      var v = b ? Object.keys(b) : [],
        S = -1,
        N = v.length;
      return function M() {
        var q = v[++S];
        return q === "__proto__" ? M() : S < N ? { value: b[q], key: q } : null;
      };
    }
    function R(b) {
      if (w(b)) return A(b);
      var v = x(b);
      return v ? p(v) : T(b);
    }
    function k(b) {
      return function (...v) {
        if (b === null) throw new Error("Callback was already called.");
        var S = b;
        (b = null), S.apply(this, v);
      };
    }
    function z(b, v, S, N) {
      let M = !1,
        q = !1,
        B = !1,
        j = 0,
        U = 0;
      function Y() {
        j >= v ||
          B ||
          M ||
          ((B = !0),
          b
            .next()
            .then(({ value: se, done: jt }) => {
              if (!(q || M)) {
                if (((B = !1), jt)) {
                  (M = !0), j <= 0 && N(null);
                  return;
                }
                j++, S(se, U, ne), U++, Y();
              }
            })
            .catch(ue));
      }
      function ne(se, jt) {
        if (((j -= 1), !q)) {
          if (se) return ue(se);
          if (se === !1) {
            (M = !0), (q = !0);
            return;
          }
          if (jt === F || (M && j <= 0)) return (M = !0), N(null);
          Y();
        }
      }
      function ue(se) {
        q || ((B = !1), (M = !0), N(se));
      }
      Y();
    }
    var $ = (b) => (v, S, N) => {
      if (((N = g(N)), b <= 0))
        throw new RangeError("concurrency limit cannot be less than 1");
      if (!v) return N(null);
      if (m(v)) return z(v, b, S, N);
      if (C(v)) return z(v[Symbol.asyncIterator](), b, S, N);
      var M = R(v),
        q = !1,
        B = !1,
        j = 0,
        U = !1;
      function Y(ue, se) {
        if (!B)
          if (((j -= 1), ue)) (q = !0), N(ue);
          else if (ue === !1) (q = !0), (B = !0);
          else {
            if (se === F || (q && j <= 0)) return (q = !0), N(null);
            U || ne();
          }
      }
      function ne() {
        for (U = !0; j < b && !q; ) {
          var ue = M();
          if (ue === null) {
            (q = !0), j <= 0 && N(null);
            return;
          }
          (j += 1), S(ue.value, ue.key, k(Y));
        }
        U = !1;
      }
      ne();
    };
    function X(b, v, S, N) {
      return $(v)(b, E(S), N);
    }
    var I = O(X, 4);
    function P(b, v, S) {
      S = g(S);
      var N = 0,
        M = 0,
        { length: q } = b,
        B = !1;
      q === 0 && S(null);
      function j(U, Y) {
        U === !1 && (B = !0),
          B !== !0 && (U ? S(U) : (++M === q || Y === F) && S(null));
      }
      for (; N < q; N++) v(b[N], N, k(j));
    }
    function G(b, v, S) {
      return I(b, 1 / 0, v, S);
    }
    function J(b, v, S) {
      var N = w(b) ? P : G;
      return N(b, E(v), S);
    }
    var W = O(J, 3);
    function Ne(b, v, S) {
      return D(W, b, v, S);
    }
    var Ie = O(Ne, 3),
      kt = L(Ie);
    function St(b, v, S) {
      return I(b, 1, v, S);
    }
    var Be = O(St, 3);
    function Wn(b, v, S) {
      return D(Be, b, v, S);
    }
    var ba = O(Wn, 3),
      mt = L(ba);
    let Tr = Symbol("promiseCallback");
    function ii() {
      let b, v;
      function S(N, ...M) {
        if (N) return v(N);
        b(M.length > 1 ? M : M[0]);
      }
      return (
        (S[Tr] = new Promise((N, M) => {
          (b = N), (v = M);
        })),
        S
      );
    }
    function Gn(b, v, S) {
      typeof v != "number" && ((S = v), (v = null)), (S = g(S || ii()));
      var N = Object.keys(b).length;
      if (!N) return S(null);
      v || (v = N);
      var M = {},
        q = 0,
        B = !1,
        j = !1,
        U = Object.create(null),
        Y = [],
        ne = [],
        ue = {};
      Object.keys(b).forEach((H) => {
        var Q = b[H];
        if (!Array.isArray(Q)) {
          se(H, [Q]), ne.push(H);
          return;
        }
        var ae = Q.slice(0, Q.length - 1),
          Se = ae.length;
        if (Se === 0) {
          se(H, Q), ne.push(H);
          return;
        }
        (ue[H] = Se),
          ae.forEach((We) => {
            if (!b[We])
              throw new Error(
                "async.auto task `" +
                  H +
                  "` has a non-existent dependency `" +
                  We +
                  "` in " +
                  ae.join(", "),
              );
            Zn(We, () => {
              Se--, Se === 0 && se(H, Q);
            });
          });
      }),
        le(),
        jt();
      function se(H, Q) {
        Y.push(() => Ta(H, Q));
      }
      function jt() {
        if (!B) {
          if (Y.length === 0 && q === 0) return S(null, M);
          for (; Y.length && q < v; ) {
            var H = Y.shift();
            H();
          }
        }
      }
      function Zn(H, Q) {
        var ae = U[H];
        ae || (ae = U[H] = []), ae.push(Q);
      }
      function Ki(H) {
        var Q = U[H] || [];
        Q.forEach((ae) => ae()), jt();
      }
      function Ta(H, Q) {
        if (!j) {
          var ae = k((We, ...Ut) => {
            if ((q--, We === !1)) {
              B = !0;
              return;
            }
            if ((Ut.length < 2 && ([Ut] = Ut), We)) {
              var Kn = {};
              if (
                (Object.keys(M).forEach((Qi) => {
                  Kn[Qi] = M[Qi];
                }),
                (Kn[H] = Ut),
                (j = !0),
                (U = Object.create(null)),
                B)
              )
                return;
              S(We, Kn);
            } else (M[H] = Ut), Ki(H);
          });
          q++;
          var Se = E(Q[Q.length - 1]);
          Q.length > 1 ? Se(M, ae) : Se(ae);
        }
      }
      function le() {
        for (var H, Q = 0; ne.length; )
          (H = ne.pop()),
            Q++,
            K(H).forEach((ae) => {
              --ue[ae] === 0 && ne.push(ae);
            });
        if (Q !== N)
          throw new Error(
            "async.auto cannot execute tasks due to a recursive dependency",
          );
      }
      function K(H) {
        var Q = [];
        return (
          Object.keys(b).forEach((ae) => {
            let Se = b[ae];
            Array.isArray(Se) && Se.indexOf(H) >= 0 && Q.push(ae);
          }),
          Q
        );
      }
      return S[Tr];
    }
    var gu = /^(?:async\s+)?(?:function)?\s*\w*\s*\(\s*([^)]+)\s*\)(?:\s*{)/,
      Hn = /^(?:async\s+)?\(?\s*([^)=]+)\s*\)?(?:\s*=>)/,
      Vn = /,/,
      zc = /(=.+)?(\s*)$/;
    function Zi(b) {
      let v = "",
        S = 0,
        N = b.indexOf("*/");
      for (; S < b.length; )
        if (b[S] === "/" && b[S + 1] === "/") {
          let M = b.indexOf(
            `
`,
            S,
          );
          S = M === -1 ? b.length : M;
        } else if (N !== -1 && b[S] === "/" && b[S + 1] === "*") {
          let M = b.indexOf("*/", S);
          M !== -1
            ? ((S = M + 2), (N = b.indexOf("*/", S)))
            : ((v += b[S]), S++);
        } else (v += b[S]), S++;
      return v;
    }
    function ni(b) {
      let v = Zi(b.toString()),
        S = v.match(gu);
      if ((S || (S = v.match(Hn)), !S))
        throw new Error(
          `could not parse args in autoInject
Source:
` + v,
        );
      let [, N] = S;
      return N.replace(/\s/g, "")
        .split(Vn)
        .map((M) => M.replace(zc, "").trim());
    }
    function Yn(b, v) {
      var S = {};
      return (
        Object.keys(b).forEach((N) => {
          var M = b[N],
            q,
            B = d(M),
            j = (!B && M.length === 1) || (B && M.length === 0);
          if (Array.isArray(M))
            (q = [...M]),
              (M = q.pop()),
              (S[N] = q.concat(q.length > 0 ? U : M));
          else if (j) S[N] = M;
          else {
            if (((q = ni(M)), M.length === 0 && !B && q.length === 0))
              throw new Error(
                "autoInject task functions require explicit parameters.",
              );
            B || q.pop(), (S[N] = q.concat(U));
          }
          function U(Y, ne) {
            var ue = q.map((se) => Y[se]);
            ue.push(ne), E(M)(...ue);
          }
        }),
        Gn(S, v)
      );
    }
    class $c {
      constructor() {
        (this.head = this.tail = null), (this.length = 0);
      }
      removeLink(v) {
        return (
          v.prev ? (v.prev.next = v.next) : (this.head = v.next),
          v.next ? (v.next.prev = v.prev) : (this.tail = v.prev),
          (v.prev = v.next = null),
          (this.length -= 1),
          v
        );
      }
      empty() {
        for (; this.head; ) this.shift();
        return this;
      }
      insertAfter(v, S) {
        (S.prev = v),
          (S.next = v.next),
          v.next ? (v.next.prev = S) : (this.tail = S),
          (v.next = S),
          (this.length += 1);
      }
      insertBefore(v, S) {
        (S.prev = v.prev),
          (S.next = v),
          v.prev ? (v.prev.next = S) : (this.head = S),
          (v.prev = S),
          (this.length += 1);
      }
      unshift(v) {
        this.head ? this.insertBefore(this.head, v) : Ea(this, v);
      }
      push(v) {
        this.tail ? this.insertAfter(this.tail, v) : Ea(this, v);
      }
      shift() {
        return this.head && this.removeLink(this.head);
      }
      pop() {
        return this.tail && this.removeLink(this.tail);
      }
      toArray() {
        return [...this];
      }
      *[Symbol.iterator]() {
        for (var v = this.head; v; ) yield v.data, (v = v.next);
      }
      remove(v) {
        for (var S = this.head; S; ) {
          var { next: N } = S;
          v(S) && this.removeLink(S), (S = N);
        }
        return this;
      }
    }
    function Ea(b, v) {
      (b.length = 1), (b.head = b.tail = v);
    }
    function Wc(b, v, S) {
      if (v == null) v = 1;
      else if (v === 0) throw new RangeError("Concurrency must not be zero");
      var N = E(b),
        M = 0,
        q = [];
      let B = {
        error: [],
        drain: [],
        saturated: [],
        unsaturated: [],
        empty: [],
      };
      function j(K, H) {
        B[K].push(H);
      }
      function U(K, H) {
        let Q = (...ae) => {
          Y(K, Q), H(...ae);
        };
        B[K].push(Q);
      }
      function Y(K, H) {
        if (!K) return Object.keys(B).forEach((Q) => (B[Q] = []));
        if (!H) return (B[K] = []);
        B[K] = B[K].filter((Q) => Q !== H);
      }
      function ne(K, ...H) {
        B[K].forEach((Q) => Q(...H));
      }
      var ue = !1;
      function se(K, H, Q, ae) {
        if (ae != null && typeof ae != "function")
          throw new Error("task callback must be a function");
        le.started = !0;
        var Se, We;
        function Ut(Qi, ...Fa) {
          if (Qi) return Q ? We(Qi) : Se();
          if (Fa.length <= 1) return Se(Fa[0]);
          Se(Fa);
        }
        var Kn = le._createTaskItem(K, Q ? Ut : ae || Ut);
        if (
          (H ? le._tasks.unshift(Kn) : le._tasks.push(Kn),
          ue ||
            ((ue = !0),
            l(() => {
              (ue = !1), le.process();
            })),
          Q || !ae)
        )
          return new Promise((Qi, Fa) => {
            (Se = Qi), (We = Fa);
          });
      }
      function jt(K) {
        return function (H, ...Q) {
          M -= 1;
          for (var ae = 0, Se = K.length; ae < Se; ae++) {
            var We = K[ae],
              Ut = q.indexOf(We);
            Ut === 0 ? q.shift() : Ut > 0 && q.splice(Ut, 1),
              We.callback(H, ...Q),
              H != null && ne("error", H, We.data);
          }
          M <= le.concurrency - le.buffer && ne("unsaturated"),
            le.idle() && ne("drain"),
            le.process();
        };
      }
      function Zn(K) {
        return K.length === 0 && le.idle() ? (l(() => ne("drain")), !0) : !1;
      }
      let Ki = (K) => (H) => {
        if (!H)
          return new Promise((Q, ae) => {
            U(K, (Se, We) => {
              if (Se) return ae(Se);
              Q(We);
            });
          });
        Y(K), j(K, H);
      };
      var Ta = !1,
        le = {
          _tasks: new $c(),
          _createTaskItem(K, H) {
            return { data: K, callback: H };
          },
          *[Symbol.iterator]() {
            yield* le._tasks[Symbol.iterator]();
          },
          concurrency: v,
          payload: S,
          buffer: v / 4,
          started: !1,
          paused: !1,
          push(K, H) {
            return Array.isArray(K)
              ? Zn(K)
                ? void 0
                : K.map((Q) => se(Q, !1, !1, H))
              : se(K, !1, !1, H);
          },
          pushAsync(K, H) {
            return Array.isArray(K)
              ? Zn(K)
                ? void 0
                : K.map((Q) => se(Q, !1, !0, H))
              : se(K, !1, !0, H);
          },
          kill() {
            Y(), le._tasks.empty();
          },
          unshift(K, H) {
            return Array.isArray(K)
              ? Zn(K)
                ? void 0
                : K.map((Q) => se(Q, !0, !1, H))
              : se(K, !0, !1, H);
          },
          unshiftAsync(K, H) {
            return Array.isArray(K)
              ? Zn(K)
                ? void 0
                : K.map((Q) => se(Q, !0, !0, H))
              : se(K, !0, !0, H);
          },
          remove(K) {
            le._tasks.remove(K);
          },
          process() {
            if (!Ta) {
              for (
                Ta = !0;
                !le.paused && M < le.concurrency && le._tasks.length;

              ) {
                var K = [],
                  H = [],
                  Q = le._tasks.length;
                le.payload && (Q = Math.min(Q, le.payload));
                for (var ae = 0; ae < Q; ae++) {
                  var Se = le._tasks.shift();
                  K.push(Se), q.push(Se), H.push(Se.data);
                }
                (M += 1),
                  le._tasks.length === 0 && ne("empty"),
                  M === le.concurrency && ne("saturated");
                var We = k(jt(K));
                N(H, We);
              }
              Ta = !1;
            }
          },
          length() {
            return le._tasks.length;
          },
          running() {
            return M;
          },
          workersList() {
            return q;
          },
          idle() {
            return le._tasks.length + M === 0;
          },
          pause() {
            le.paused = !0;
          },
          resume() {
            le.paused !== !1 && ((le.paused = !1), l(le.process));
          },
        };
      return (
        Object.defineProperties(le, {
          saturated: { writable: !1, value: Ki("saturated") },
          unsaturated: { writable: !1, value: Ki("unsaturated") },
          empty: { writable: !1, value: Ki("empty") },
          drain: { writable: !1, value: Ki("drain") },
          error: { writable: !1, value: Ki("error") },
        }),
        le
      );
    }
    function Bv(b, v) {
      return Wc(b, 1, v);
    }
    function kv(b, v, S) {
      return Wc(b, v, S);
    }
    function AL(b, v, S, N) {
      N = g(N);
      var M = E(S);
      return Be(
        b,
        (q, B, j) => {
          M(v, q, (U, Y) => {
            (v = Y), j(U);
          });
        },
        (q) => N(q, v),
      );
    }
    var si = O(AL, 4);
    function Gc(...b) {
      var v = b.map(E);
      return function (...S) {
        var N = this,
          M = S[S.length - 1];
        return (
          typeof M == "function" ? S.pop() : (M = ii()),
          si(
            v,
            S,
            (q, B, j) => {
              B.apply(
                N,
                q.concat((U, ...Y) => {
                  j(U, Y);
                }),
              );
            },
            (q, B) => M(q, ...B),
          ),
          M[Tr]
        );
      };
    }
    function jv(...b) {
      return Gc(...b.reverse());
    }
    function NL(b, v, S, N) {
      return D($(v), b, S, N);
    }
    var _a = O(NL, 4);
    function IL(b, v, S, N) {
      var M = E(S);
      return _a(
        b,
        v,
        (q, B) => {
          M(q, (j, ...U) => (j ? B(j) : B(j, U)));
        },
        (q, B) => {
          for (var j = [], U = 0; U < B.length; U++)
            B[U] && (j = j.concat(...B[U]));
          return N(q, j);
        },
      );
    }
    var Xn = O(IL, 4);
    function ML(b, v, S) {
      return Xn(b, 1 / 0, v, S);
    }
    var yu = O(ML, 3);
    function LL(b, v, S) {
      return Xn(b, 1, v, S);
    }
    var vu = O(LL, 3);
    function Uv(...b) {
      return function (...v) {
        var S = v.pop();
        return S(null, ...b);
      };
    }
    function Fr(b, v) {
      return (S, N, M, q) => {
        var B = !1,
          j;
        let U = E(M);
        S(
          N,
          (Y, ne, ue) => {
            U(Y, (se, jt) => {
              if (se || se === !1) return ue(se);
              if (b(jt) && !j) return (B = !0), (j = v(!0, Y)), ue(null, F);
              ue();
            });
          },
          (Y) => {
            if (Y) return q(Y);
            q(null, B ? j : v(!1));
          },
        );
      };
    }
    function qL(b, v, S) {
      return Fr(
        (N) => N,
        (N, M) => M,
      )(W, b, v, S);
    }
    var wu = O(qL, 3);
    function PL(b, v, S, N) {
      return Fr(
        (M) => M,
        (M, q) => q,
      )($(v), b, S, N);
    }
    var Du = O(PL, 4);
    function BL(b, v, S) {
      return Fr(
        (N) => N,
        (N, M) => M,
      )($(1), b, v, S);
    }
    var bu = O(BL, 3);
    function zv(b) {
      return (v, ...S) =>
        E(v)(...S, (N, ...M) => {
          typeof console == "object" &&
            (N
              ? console.error && console.error(N)
              : console[b] && M.forEach((q) => console[b](q)));
        });
    }
    var $v = zv("dir");
    function kL(b, v, S) {
      S = k(S);
      var N = E(b),
        M = E(v),
        q;
      function B(U, ...Y) {
        if (U) return S(U);
        U !== !1 && ((q = Y), M(...Y, j));
      }
      function j(U, Y) {
        if (U) return S(U);
        if (U !== !1) {
          if (!Y) return S(null, ...q);
          N(B);
        }
      }
      return j(null, !0);
    }
    var Sa = O(kL, 3);
    function Wv(b, v, S) {
      let N = E(v);
      return Sa(
        b,
        (...M) => {
          let q = M.pop();
          N(...M, (B, j) => q(B, !j));
        },
        S,
      );
    }
    function Gv(b) {
      return (v, S, N) => b(v, N);
    }
    function jL(b, v, S) {
      return W(b, Gv(E(v)), S);
    }
    var Eu = O(jL, 3);
    function UL(b, v, S, N) {
      return $(v)(b, Gv(E(S)), N);
    }
    var xa = O(UL, 4);
    function zL(b, v, S) {
      return xa(b, 1, v, S);
    }
    var Ca = O(zL, 3);
    function Hc(b) {
      return d(b)
        ? b
        : function (...v) {
            var S = v.pop(),
              N = !0;
            v.push((...M) => {
              N ? l(() => S(...M)) : S(...M);
            }),
              b.apply(this, v),
              (N = !1);
          };
    }
    function $L(b, v, S) {
      return Fr(
        (N) => !N,
        (N) => !N,
      )(W, b, v, S);
    }
    var _u = O($L, 3);
    function WL(b, v, S, N) {
      return Fr(
        (M) => !M,
        (M) => !M,
      )($(v), b, S, N);
    }
    var Su = O(WL, 4);
    function GL(b, v, S) {
      return Fr(
        (N) => !N,
        (N) => !N,
      )(Be, b, v, S);
    }
    var xu = O(GL, 3);
    function HL(b, v, S, N) {
      var M = new Array(v.length);
      b(
        v,
        (q, B, j) => {
          S(q, (U, Y) => {
            (M[B] = !!Y), j(U);
          });
        },
        (q) => {
          if (q) return N(q);
          for (var B = [], j = 0; j < v.length; j++) M[j] && B.push(v[j]);
          N(null, B);
        },
      );
    }
    function VL(b, v, S, N) {
      var M = [];
      b(
        v,
        (q, B, j) => {
          S(q, (U, Y) => {
            if (U) return j(U);
            Y && M.push({ index: B, value: q }), j(U);
          });
        },
        (q) => {
          if (q) return N(q);
          N(
            null,
            M.sort((B, j) => B.index - j.index).map((B) => B.value),
          );
        },
      );
    }
    function Cu(b, v, S, N) {
      var M = w(v) ? HL : VL;
      return M(b, v, E(S), N);
    }
    function YL(b, v, S) {
      return Cu(W, b, v, S);
    }
    var Ou = O(YL, 3);
    function XL(b, v, S, N) {
      return Cu($(v), b, S, N);
    }
    var Tu = O(XL, 4);
    function ZL(b, v, S) {
      return Cu(Be, b, v, S);
    }
    var Fu = O(ZL, 3);
    function KL(b, v) {
      var S = k(v),
        N = E(Hc(b));
      function M(q) {
        if (q) return S(q);
        q !== !1 && N(M);
      }
      return M();
    }
    var Hv = O(KL, 2);
    function QL(b, v, S, N) {
      var M = E(S);
      return _a(
        b,
        v,
        (q, B) => {
          M(q, (j, U) => (j ? B(j) : B(j, { key: U, val: q })));
        },
        (q, B) => {
          for (
            var j = {}, { hasOwnProperty: U } = Object.prototype, Y = 0;
            Y < B.length;
            Y++
          )
            if (B[Y]) {
              var { key: ne } = B[Y],
                { val: ue } = B[Y];
              U.call(j, ne) ? j[ne].push(ue) : (j[ne] = [ue]);
            }
          return N(q, j);
        },
      );
    }
    var Ru = O(QL, 4);
    function Vv(b, v, S) {
      return Ru(b, 1 / 0, v, S);
    }
    function Yv(b, v, S) {
      return Ru(b, 1, v, S);
    }
    var Xv = zv("log");
    function JL(b, v, S, N) {
      N = g(N);
      var M = {},
        q = E(S);
      return $(v)(
        b,
        (B, j, U) => {
          q(B, j, (Y, ne) => {
            if (Y) return U(Y);
            (M[j] = ne), U(Y);
          });
        },
        (B) => N(B, M),
      );
    }
    var Au = O(JL, 4);
    function Zv(b, v, S) {
      return Au(b, 1 / 0, v, S);
    }
    function Kv(b, v, S) {
      return Au(b, 1, v, S);
    }
    function Qv(b, v = (S) => S) {
      var S = Object.create(null),
        N = Object.create(null),
        M = E(b),
        q = r((B, j) => {
          var U = v(...B);
          U in S
            ? l(() => j(null, ...S[U]))
            : U in N
            ? N[U].push(j)
            : ((N[U] = [j]),
              M(...B, (Y, ...ne) => {
                Y || (S[U] = ne);
                var ue = N[U];
                delete N[U];
                for (var se = 0, jt = ue.length; se < jt; se++)
                  ue[se](Y, ...ne);
              }));
        });
      return (q.memo = S), (q.unmemoized = b), q;
    }
    var Nu;
    s ? (Nu = process.nextTick) : n ? (Nu = setImmediate) : (Nu = a);
    var Jv = o(Nu),
      Vc = O((b, v, S) => {
        var N = w(v) ? [] : {};
        b(
          v,
          (M, q, B) => {
            E(M)((j, ...U) => {
              U.length < 2 && ([U] = U), (N[q] = U), B(j);
            });
          },
          (M) => S(M, N),
        );
      }, 3);
    function ew(b, v) {
      return Vc(W, b, v);
    }
    function tw(b, v, S) {
      return Vc($(v), b, S);
    }
    function Yc(b, v) {
      var S = E(b);
      return Wc(
        (N, M) => {
          S(N[0], M);
        },
        v,
        1,
      );
    }
    class e3 {
      constructor() {
        (this.heap = []), (this.pushCount = Number.MIN_SAFE_INTEGER);
      }
      get length() {
        return this.heap.length;
      }
      empty() {
        return (this.heap = []), this;
      }
      percUp(v) {
        let S;
        for (; v > 0 && Xc(this.heap[v], this.heap[(S = rw(v))]); ) {
          let N = this.heap[v];
          (this.heap[v] = this.heap[S]), (this.heap[S] = N), (v = S);
        }
      }
      percDown(v) {
        let S;
        for (
          ;
          (S = t3(v)) < this.heap.length &&
          (S + 1 < this.heap.length &&
            Xc(this.heap[S + 1], this.heap[S]) &&
            (S = S + 1),
          !Xc(this.heap[v], this.heap[S]));

        ) {
          let N = this.heap[v];
          (this.heap[v] = this.heap[S]), (this.heap[S] = N), (v = S);
        }
      }
      push(v) {
        (v.pushCount = ++this.pushCount),
          this.heap.push(v),
          this.percUp(this.heap.length - 1);
      }
      unshift(v) {
        return this.heap.push(v);
      }
      shift() {
        let [v] = this.heap;
        return (
          (this.heap[0] = this.heap[this.heap.length - 1]),
          this.heap.pop(),
          this.percDown(0),
          v
        );
      }
      toArray() {
        return [...this];
      }
      *[Symbol.iterator]() {
        for (let v = 0; v < this.heap.length; v++) yield this.heap[v].data;
      }
      remove(v) {
        let S = 0;
        for (let N = 0; N < this.heap.length; N++)
          v(this.heap[N]) || ((this.heap[S] = this.heap[N]), S++);
        this.heap.splice(S);
        for (let N = rw(this.heap.length - 1); N >= 0; N--) this.percDown(N);
        return this;
      }
    }
    function t3(b) {
      return (b << 1) + 1;
    }
    function rw(b) {
      return ((b + 1) >> 1) - 1;
    }
    function Xc(b, v) {
      return b.priority !== v.priority
        ? b.priority < v.priority
        : b.pushCount < v.pushCount;
    }
    function iw(b, v) {
      var S = Yc(b, v),
        { push: N, pushAsync: M } = S;
      (S._tasks = new e3()),
        (S._createTaskItem = ({ data: B, priority: j }, U) => ({
          data: B,
          priority: j,
          callback: U,
        }));
      function q(B, j) {
        return Array.isArray(B)
          ? B.map((U) => ({ data: U, priority: j }))
          : { data: B, priority: j };
      }
      return (
        (S.push = function (B, j = 0, U) {
          return N(q(B, j), U);
        }),
        (S.pushAsync = function (B, j = 0, U) {
          return M(q(B, j), U);
        }),
        delete S.unshift,
        delete S.unshiftAsync,
        S
      );
    }
    function r3(b, v) {
      if (((v = g(v)), !Array.isArray(b)))
        return v(
          new TypeError("First argument to race must be an array of functions"),
        );
      if (!b.length) return v();
      for (var S = 0, N = b.length; S < N; S++) E(b[S])(v);
    }
    var nw = O(r3, 2);
    function Iu(b, v, S, N) {
      var M = [...b].reverse();
      return si(M, v, S, N);
    }
    function Mu(b) {
      var v = E(b);
      return r(function (N, M) {
        return (
          N.push((q, ...B) => {
            let j = {};
            if ((q && (j.error = q), B.length > 0)) {
              var U = B;
              B.length <= 1 && ([U] = B), (j.value = U);
            }
            M(null, j);
          }),
          v.apply(this, N)
        );
      });
    }
    function sw(b) {
      var v;
      return (
        Array.isArray(b)
          ? (v = b.map(Mu))
          : ((v = {}),
            Object.keys(b).forEach((S) => {
              v[S] = Mu.call(this, b[S]);
            })),
        v
      );
    }
    function Zc(b, v, S, N) {
      let M = E(S);
      return Cu(
        b,
        v,
        (q, B) => {
          M(q, (j, U) => {
            B(j, !U);
          });
        },
        N,
      );
    }
    function i3(b, v, S) {
      return Zc(W, b, v, S);
    }
    var aw = O(i3, 3);
    function n3(b, v, S, N) {
      return Zc($(v), b, S, N);
    }
    var ow = O(n3, 4);
    function s3(b, v, S) {
      return Zc(Be, b, v, S);
    }
    var uw = O(s3, 3);
    function lw(b) {
      return function () {
        return b;
      };
    }
    let Kc = 5,
      fw = 0;
    function Lu(b, v, S) {
      var N = { times: Kc, intervalFunc: lw(fw) };
      if (
        (arguments.length < 3 && typeof b == "function"
          ? ((S = v || ii()), (v = b))
          : (a3(N, b), (S = S || ii())),
        typeof v != "function")
      )
        throw new Error("Invalid arguments for async.retry");
      var M = E(v),
        q = 1;
      function B() {
        M((j, ...U) => {
          j !== !1 &&
            (j &&
            q++ < N.times &&
            (typeof N.errorFilter != "function" || N.errorFilter(j))
              ? setTimeout(B, N.intervalFunc(q - 1))
              : S(j, ...U));
        });
      }
      return B(), S[Tr];
    }
    function a3(b, v) {
      if (typeof v == "object")
        (b.times = +v.times || Kc),
          (b.intervalFunc =
            typeof v.interval == "function"
              ? v.interval
              : lw(+v.interval || fw)),
          (b.errorFilter = v.errorFilter);
      else if (typeof v == "number" || typeof v == "string") b.times = +v || Kc;
      else throw new Error("Invalid arguments for async.retry");
    }
    function hw(b, v) {
      v || ((v = b), (b = null));
      let S = (b && b.arity) || v.length;
      d(v) && (S += 1);
      var N = E(v);
      return r((M, q) => {
        (M.length < S - 1 || q == null) && (M.push(q), (q = ii()));
        function B(j) {
          N(...M, j);
        }
        return b ? Lu(b, B, q) : Lu(B, q), q[Tr];
      });
    }
    function cw(b, v) {
      return Vc(Be, b, v);
    }
    function o3(b, v, S) {
      return Fr(Boolean, (N) => N)(W, b, v, S);
    }
    var qu = O(o3, 3);
    function u3(b, v, S, N) {
      return Fr(Boolean, (M) => M)($(v), b, S, N);
    }
    var Pu = O(u3, 4);
    function l3(b, v, S) {
      return Fr(Boolean, (N) => N)(Be, b, v, S);
    }
    var Bu = O(l3, 3);
    function f3(b, v, S) {
      var N = E(v);
      return Ie(
        b,
        (q, B) => {
          N(q, (j, U) => {
            if (j) return B(j);
            B(j, { value: q, criteria: U });
          });
        },
        (q, B) => {
          if (q) return S(q);
          S(
            null,
            B.sort(M).map((j) => j.value),
          );
        },
      );
      function M(q, B) {
        var j = q.criteria,
          U = B.criteria;
        return j < U ? -1 : j > U ? 1 : 0;
      }
    }
    var dw = O(f3, 3);
    function pw(b, v, S) {
      var N = E(b);
      return r((M, q) => {
        var B = !1,
          j;
        function U() {
          var Y = b.name || "anonymous",
            ne = new Error('Callback function "' + Y + '" timed out.');
          (ne.code = "ETIMEDOUT"), S && (ne.info = S), (B = !0), q(ne);
        }
        M.push((...Y) => {
          B || (q(...Y), clearTimeout(j));
        }),
          (j = setTimeout(U, v)),
          N(...M);
      });
    }
    function h3(b) {
      for (var v = Array(b); b--; ) v[b] = b;
      return v;
    }
    function ku(b, v, S, N) {
      var M = E(S);
      return _a(h3(b), v, M, N);
    }
    function mw(b, v, S) {
      return ku(b, 1 / 0, v, S);
    }
    function gw(b, v, S) {
      return ku(b, 1, v, S);
    }
    function yw(b, v, S, N) {
      arguments.length <= 3 &&
        typeof v == "function" &&
        ((N = S), (S = v), (v = Array.isArray(b) ? [] : {})),
        (N = g(N || ii()));
      var M = E(S);
      return (
        W(
          b,
          (q, B, j) => {
            M(v, q, B, j);
          },
          (q) => N(q, v),
        ),
        N[Tr]
      );
    }
    function c3(b, v) {
      var S = null,
        N;
      return Ca(
        b,
        (M, q) => {
          E(M)((B, ...j) => {
            if (B === !1) return q(B);
            j.length < 2 ? ([N] = j) : (N = j), (S = B), q(B ? null : {});
          });
        },
        () => v(S, N),
      );
    }
    var vw = O(c3);
    function ww(b) {
      return (...v) => (b.unmemoized || b)(...v);
    }
    function d3(b, v, S) {
      S = k(S);
      var N = E(v),
        M = E(b),
        q = [];
      function B(U, ...Y) {
        if (U) return S(U);
        (q = Y), U !== !1 && M(j);
      }
      function j(U, Y) {
        if (U) return S(U);
        if (U !== !1) {
          if (!Y) return S(null, ...q);
          N(B);
        }
      }
      return M(j);
    }
    var Oa = O(d3, 3);
    function Dw(b, v, S) {
      let N = E(b);
      return Oa((M) => N((q, B) => M(q, !B)), v, S);
    }
    function p3(b, v) {
      if (((v = g(v)), !Array.isArray(b)))
        return v(
          new Error(
            "First argument to waterfall must be an array of functions",
          ),
        );
      if (!b.length) return v();
      var S = 0;
      function N(q) {
        var B = E(b[S++]);
        B(...q, k(M));
      }
      function M(q, ...B) {
        if (q !== !1) {
          if (q || S === b.length) return v(q, ...B);
          N(B);
        }
      }
      N([]);
    }
    var bw = O(p3),
      m3 = {
        apply: t,
        applyEach: kt,
        applyEachSeries: mt,
        asyncify: f,
        auto: Gn,
        autoInject: Yn,
        cargo: Bv,
        cargoQueue: kv,
        compose: jv,
        concat: yu,
        concatLimit: Xn,
        concatSeries: vu,
        constant: Uv,
        detect: wu,
        detectLimit: Du,
        detectSeries: bu,
        dir: $v,
        doUntil: Wv,
        doWhilst: Sa,
        each: Eu,
        eachLimit: xa,
        eachOf: W,
        eachOfLimit: I,
        eachOfSeries: Be,
        eachSeries: Ca,
        ensureAsync: Hc,
        every: _u,
        everyLimit: Su,
        everySeries: xu,
        filter: Ou,
        filterLimit: Tu,
        filterSeries: Fu,
        forever: Hv,
        groupBy: Vv,
        groupByLimit: Ru,
        groupBySeries: Yv,
        log: Xv,
        map: Ie,
        mapLimit: _a,
        mapSeries: ba,
        mapValues: Zv,
        mapValuesLimit: Au,
        mapValuesSeries: Kv,
        memoize: Qv,
        nextTick: Jv,
        parallel: ew,
        parallelLimit: tw,
        priorityQueue: iw,
        queue: Yc,
        race: nw,
        reduce: si,
        reduceRight: Iu,
        reflect: Mu,
        reflectAll: sw,
        reject: aw,
        rejectLimit: ow,
        rejectSeries: uw,
        retry: Lu,
        retryable: hw,
        seq: Gc,
        series: cw,
        setImmediate: l,
        some: qu,
        someLimit: Pu,
        someSeries: Bu,
        sortBy: dw,
        timeout: pw,
        times: mw,
        timesLimit: ku,
        timesSeries: gw,
        transform: yw,
        tryEach: vw,
        unmemoize: ww,
        until: Dw,
        waterfall: bw,
        whilst: Oa,
        all: _u,
        allLimit: Su,
        allSeries: xu,
        any: qu,
        anyLimit: Pu,
        anySeries: Bu,
        find: wu,
        findLimit: Du,
        findSeries: bu,
        flatMap: yu,
        flatMapLimit: Xn,
        flatMapSeries: vu,
        forEach: Eu,
        forEachSeries: Ca,
        forEachLimit: xa,
        forEachOf: W,
        forEachOfSeries: Be,
        forEachOfLimit: I,
        inject: si,
        foldl: si,
        foldr: Iu,
        select: Ou,
        selectLimit: Tu,
        selectSeries: Fu,
        wrapSync: f,
        during: Oa,
        doDuring: Sa,
      };
    (e.default = m3),
      (e.apply = t),
      (e.applyEach = kt),
      (e.applyEachSeries = mt),
      (e.asyncify = f),
      (e.auto = Gn),
      (e.autoInject = Yn),
      (e.cargo = Bv),
      (e.cargoQueue = kv),
      (e.compose = jv),
      (e.concat = yu),
      (e.concatLimit = Xn),
      (e.concatSeries = vu),
      (e.constant = Uv),
      (e.detect = wu),
      (e.detectLimit = Du),
      (e.detectSeries = bu),
      (e.dir = $v),
      (e.doUntil = Wv),
      (e.doWhilst = Sa),
      (e.each = Eu),
      (e.eachLimit = xa),
      (e.eachOf = W),
      (e.eachOfLimit = I),
      (e.eachOfSeries = Be),
      (e.eachSeries = Ca),
      (e.ensureAsync = Hc),
      (e.every = _u),
      (e.everyLimit = Su),
      (e.everySeries = xu),
      (e.filter = Ou),
      (e.filterLimit = Tu),
      (e.filterSeries = Fu),
      (e.forever = Hv),
      (e.groupBy = Vv),
      (e.groupByLimit = Ru),
      (e.groupBySeries = Yv),
      (e.log = Xv),
      (e.map = Ie),
      (e.mapLimit = _a),
      (e.mapSeries = ba),
      (e.mapValues = Zv),
      (e.mapValuesLimit = Au),
      (e.mapValuesSeries = Kv),
      (e.memoize = Qv),
      (e.nextTick = Jv),
      (e.parallel = ew),
      (e.parallelLimit = tw),
      (e.priorityQueue = iw),
      (e.queue = Yc),
      (e.race = nw),
      (e.reduce = si),
      (e.reduceRight = Iu),
      (e.reflect = Mu),
      (e.reflectAll = sw),
      (e.reject = aw),
      (e.rejectLimit = ow),
      (e.rejectSeries = uw),
      (e.retry = Lu),
      (e.retryable = hw),
      (e.seq = Gc),
      (e.series = cw),
      (e.setImmediate = l),
      (e.some = qu),
      (e.someLimit = Pu),
      (e.someSeries = Bu),
      (e.sortBy = dw),
      (e.timeout = pw),
      (e.times = mw),
      (e.timesLimit = ku),
      (e.timesSeries = gw),
      (e.transform = yw),
      (e.tryEach = vw),
      (e.unmemoize = ww),
      (e.until = Dw),
      (e.waterfall = bw),
      (e.whilst = Oa),
      (e.all = _u),
      (e.allLimit = Su),
      (e.allSeries = xu),
      (e.any = qu),
      (e.anyLimit = Pu),
      (e.anySeries = Bu),
      (e.find = wu),
      (e.findLimit = Du),
      (e.findSeries = bu),
      (e.flatMap = yu),
      (e.flatMapLimit = Xn),
      (e.flatMapSeries = vu),
      (e.forEach = Eu),
      (e.forEachSeries = Ca),
      (e.forEachLimit = xa),
      (e.forEachOf = W),
      (e.forEachOfSeries = Be),
      (e.forEachOfLimit = I),
      (e.inject = si),
      (e.foldl = si),
      (e.foldr = Iu),
      (e.select = Ou),
      (e.selectLimit = Tu),
      (e.selectSeries = Fu),
      (e.wrapSync = f),
      (e.during = Oa),
      (e.doDuring = Sa),
      Object.defineProperty(e, "__esModule", { value: !0 });
  });
});
var lO = y(($J, uO) => {
  var Ni = require("constants"),
    i9 = process.cwd,
    gh = null,
    n9 = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function () {
    return gh || (gh = i9.call(process)), gh;
  };
  try {
    process.cwd();
  } catch {}
  typeof process.chdir == "function" &&
    ((e0 = process.chdir),
    (process.chdir = function (e) {
      (gh = null), e0.call(process, e);
    }),
    Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, e0));
  var e0;
  uO.exports = s9;
  function s9(e) {
    Ni.hasOwnProperty("O_SYMLINK") &&
      process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) &&
      t(e),
      e.lutimes || r(e),
      (e.chown = s(e.chown)),
      (e.fchown = s(e.fchown)),
      (e.lchown = s(e.lchown)),
      (e.chmod = i(e.chmod)),
      (e.fchmod = i(e.fchmod)),
      (e.lchmod = i(e.lchmod)),
      (e.chownSync = a(e.chownSync)),
      (e.fchownSync = a(e.fchownSync)),
      (e.lchownSync = a(e.lchownSync)),
      (e.chmodSync = n(e.chmodSync)),
      (e.fchmodSync = n(e.fchmodSync)),
      (e.lchmodSync = n(e.lchmodSync)),
      (e.stat = o(e.stat)),
      (e.fstat = o(e.fstat)),
      (e.lstat = o(e.lstat)),
      (e.statSync = u(e.statSync)),
      (e.fstatSync = u(e.fstatSync)),
      (e.lstatSync = u(e.lstatSync)),
      e.chmod &&
        !e.lchmod &&
        ((e.lchmod = function (f, h, c) {
          c && process.nextTick(c);
        }),
        (e.lchmodSync = function () {})),
      e.chown &&
        !e.lchown &&
        ((e.lchown = function (f, h, c, d) {
          d && process.nextTick(d);
        }),
        (e.lchownSync = function () {})),
      n9 === "win32" &&
        (e.rename =
          typeof e.rename != "function"
            ? e.rename
            : (function (f) {
                function h(c, d, m) {
                  var C = Date.now(),
                    E = 0;
                  f(c, d, function O(L) {
                    if (
                      L &&
                      (L.code === "EACCES" || L.code === "EPERM") &&
                      Date.now() - C < 6e4
                    ) {
                      setTimeout(function () {
                        e.stat(d, function (D, w) {
                          D && D.code === "ENOENT" ? f(c, d, O) : m(L);
                        });
                      }, E),
                        E < 100 && (E += 10);
                      return;
                    }
                    m && m(L);
                  });
                }
                return Object.setPrototypeOf && Object.setPrototypeOf(h, f), h;
              })(e.rename)),
      (e.read =
        typeof e.read != "function"
          ? e.read
          : (function (f) {
              function h(c, d, m, C, E, O) {
                var L;
                if (O && typeof O == "function") {
                  var D = 0;
                  L = function (w, F, g) {
                    if (w && w.code === "EAGAIN" && D < 10)
                      return D++, f.call(e, c, d, m, C, E, L);
                    O.apply(this, arguments);
                  };
                }
                return f.call(e, c, d, m, C, E, L);
              }
              return Object.setPrototypeOf && Object.setPrototypeOf(h, f), h;
            })(e.read)),
      (e.readSync =
        typeof e.readSync != "function"
          ? e.readSync
          : (function (f) {
              return function (h, c, d, m, C) {
                for (var E = 0; ; )
                  try {
                    return f.call(e, h, c, d, m, C);
                  } catch (O) {
                    if (O.code === "EAGAIN" && E < 10) {
                      E++;
                      continue;
                    }
                    throw O;
                  }
              };
            })(e.readSync));
    function t(f) {
      (f.lchmod = function (h, c, d) {
        f.open(h, Ni.O_WRONLY | Ni.O_SYMLINK, c, function (m, C) {
          if (m) {
            d && d(m);
            return;
          }
          f.fchmod(C, c, function (E) {
            f.close(C, function (O) {
              d && d(E || O);
            });
          });
        });
      }),
        (f.lchmodSync = function (h, c) {
          var d = f.openSync(h, Ni.O_WRONLY | Ni.O_SYMLINK, c),
            m = !0,
            C;
          try {
            (C = f.fchmodSync(d, c)), (m = !1);
          } finally {
            if (m)
              try {
                f.closeSync(d);
              } catch {}
            else f.closeSync(d);
          }
          return C;
        });
    }
    function r(f) {
      Ni.hasOwnProperty("O_SYMLINK") && f.futimes
        ? ((f.lutimes = function (h, c, d, m) {
            f.open(h, Ni.O_SYMLINK, function (C, E) {
              if (C) {
                m && m(C);
                return;
              }
              f.futimes(E, c, d, function (O) {
                f.close(E, function (L) {
                  m && m(O || L);
                });
              });
            });
          }),
          (f.lutimesSync = function (h, c, d) {
            var m = f.openSync(h, Ni.O_SYMLINK),
              C,
              E = !0;
            try {
              (C = f.futimesSync(m, c, d)), (E = !1);
            } finally {
              if (E)
                try {
                  f.closeSync(m);
                } catch {}
              else f.closeSync(m);
            }
            return C;
          }))
        : f.futimes &&
          ((f.lutimes = function (h, c, d, m) {
            m && process.nextTick(m);
          }),
          (f.lutimesSync = function () {}));
    }
    function i(f) {
      return (
        f &&
        function (h, c, d) {
          return f.call(e, h, c, function (m) {
            l(m) && (m = null), d && d.apply(this, arguments);
          });
        }
      );
    }
    function n(f) {
      return (
        f &&
        function (h, c) {
          try {
            return f.call(e, h, c);
          } catch (d) {
            if (!l(d)) throw d;
          }
        }
      );
    }
    function s(f) {
      return (
        f &&
        function (h, c, d, m) {
          return f.call(e, h, c, d, function (C) {
            l(C) && (C = null), m && m.apply(this, arguments);
          });
        }
      );
    }
    function a(f) {
      return (
        f &&
        function (h, c, d) {
          try {
            return f.call(e, h, c, d);
          } catch (m) {
            if (!l(m)) throw m;
          }
        }
      );
    }
    function o(f) {
      return (
        f &&
        function (h, c, d) {
          typeof c == "function" && ((d = c), (c = null));
          function m(C, E) {
            E &&
              (E.uid < 0 && (E.uid += 4294967296),
              E.gid < 0 && (E.gid += 4294967296)),
              d && d.apply(this, arguments);
          }
          return c ? f.call(e, h, c, m) : f.call(e, h, m);
        }
      );
    }
    function u(f) {
      return (
        f &&
        function (h, c) {
          var d = c ? f.call(e, h, c) : f.call(e, h);
          return (
            d &&
              (d.uid < 0 && (d.uid += 4294967296),
              d.gid < 0 && (d.gid += 4294967296)),
            d
          );
        }
      );
    }
    function l(f) {
      if (!f || f.code === "ENOSYS") return !0;
      var h = !process.getuid || process.getuid() !== 0;
      return !!(h && (f.code === "EINVAL" || f.code === "EPERM"));
    }
  }
});
var cO = y((WJ, hO) => {
  var fO = require("stream").Stream;
  hO.exports = a9;
  function a9(e) {
    return { ReadStream: t, WriteStream: r };
    function t(i, n) {
      if (!(this instanceof t)) return new t(i, n);
      fO.call(this);
      var s = this;
      (this.path = i),
        (this.fd = null),
        (this.readable = !0),
        (this.paused = !1),
        (this.flags = "r"),
        (this.mode = 438),
        (this.bufferSize = 64 * 1024),
        (n = n || {});
      for (var a = Object.keys(n), o = 0, u = a.length; o < u; o++) {
        var l = a[o];
        this[l] = n[l];
      }
      if (
        (this.encoding && this.setEncoding(this.encoding),
        this.start !== void 0)
      ) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.end === void 0) this.end = 1 / 0;
        else if (typeof this.end != "number")
          throw TypeError("end must be a Number");
        if (this.start > this.end) throw new Error("start must be <= end");
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function () {
          s._read();
        });
        return;
      }
      e.open(this.path, this.flags, this.mode, function (f, h) {
        if (f) {
          s.emit("error", f), (s.readable = !1);
          return;
        }
        (s.fd = h), s.emit("open", h), s._read();
      });
    }
    function r(i, n) {
      if (!(this instanceof r)) return new r(i, n);
      fO.call(this),
        (this.path = i),
        (this.fd = null),
        (this.writable = !0),
        (this.flags = "w"),
        (this.encoding = "binary"),
        (this.mode = 438),
        (this.bytesWritten = 0),
        (n = n || {});
      for (var s = Object.keys(n), a = 0, o = s.length; a < o; a++) {
        var u = s[a];
        this[u] = n[u];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0) throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      (this.busy = !1),
        (this._queue = []),
        this.fd === null &&
          ((this._open = e.open),
          this._queue.push([
            this._open,
            this.path,
            this.flags,
            this.mode,
            void 0,
          ]),
          this.flush());
    }
  }
});
var pO = y((GJ, dO) => {
  "use strict";
  dO.exports = u9;
  var o9 =
    Object.getPrototypeOf ||
    function (e) {
      return e.__proto__;
    };
  function u9(e) {
    if (e === null || typeof e != "object") return e;
    if (e instanceof Object) var t = { __proto__: o9(e) };
    else var t = Object.create(null);
    return (
      Object.getOwnPropertyNames(e).forEach(function (r) {
        Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
      }),
      t
    );
  }
});
var n0 = y((HJ, i0) => {
  var Ce = require("fs"),
    l9 = lO(),
    f9 = cO(),
    h9 = pO(),
    yh = require("util"),
    Qe,
    wh;
  typeof Symbol == "function" && typeof Symbol.for == "function"
    ? ((Qe = Symbol.for("graceful-fs.queue")),
      (wh = Symbol.for("graceful-fs.previous")))
    : ((Qe = "___graceful-fs.queue"), (wh = "___graceful-fs.previous"));
  function c9() {}
  function yO(e, t) {
    Object.defineProperty(e, Qe, {
      get: function () {
        return t;
      },
    });
  }
  var Tn = c9;
  yh.debuglog
    ? (Tn = yh.debuglog("gfs4"))
    : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
      (Tn = function () {
        var e = yh.format.apply(yh, arguments);
        (e =
          "GFS4: " +
          e.split(/\n/).join(`
GFS4: `)),
          console.error(e);
      });
  Ce[Qe] ||
    ((mO = global[Qe] || []),
    yO(Ce, mO),
    (Ce.close = (function (e) {
      function t(r, i) {
        return e.call(Ce, r, function (n) {
          n || gO(), typeof i == "function" && i.apply(this, arguments);
        });
      }
      return Object.defineProperty(t, wh, { value: e }), t;
    })(Ce.close)),
    (Ce.closeSync = (function (e) {
      function t(r) {
        e.apply(Ce, arguments), gO();
      }
      return Object.defineProperty(t, wh, { value: e }), t;
    })(Ce.closeSync)),
    /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
      process.on("exit", function () {
        Tn(Ce[Qe]), require("assert").equal(Ce[Qe].length, 0);
      }));
  var mO;
  global[Qe] || yO(global, Ce[Qe]);
  i0.exports = t0(h9(Ce));
  process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH &&
    !Ce.__patched &&
    ((i0.exports = t0(Ce)), (Ce.__patched = !0));
  function t0(e) {
    l9(e),
      (e.gracefulify = t0),
      (e.createReadStream = F),
      (e.createWriteStream = g);
    var t = e.readFile;
    e.readFile = r;
    function r(p, T, R) {
      return typeof T == "function" && ((R = T), (T = null)), k(p, T, R);
      function k(z, $, X, I) {
        return t(z, $, function (P) {
          P && (P.code === "EMFILE" || P.code === "ENFILE")
            ? js([k, [z, $, X], P, I || Date.now(), Date.now()])
            : typeof X == "function" && X.apply(this, arguments);
        });
      }
    }
    var i = e.writeFile;
    e.writeFile = n;
    function n(p, T, R, k) {
      return typeof R == "function" && ((k = R), (R = null)), z(p, T, R, k);
      function z($, X, I, P, G) {
        return i($, X, I, function (J) {
          J && (J.code === "EMFILE" || J.code === "ENFILE")
            ? js([z, [$, X, I, P], J, G || Date.now(), Date.now()])
            : typeof P == "function" && P.apply(this, arguments);
        });
      }
    }
    var s = e.appendFile;
    s && (e.appendFile = a);
    function a(p, T, R, k) {
      return typeof R == "function" && ((k = R), (R = null)), z(p, T, R, k);
      function z($, X, I, P, G) {
        return s($, X, I, function (J) {
          J && (J.code === "EMFILE" || J.code === "ENFILE")
            ? js([z, [$, X, I, P], J, G || Date.now(), Date.now()])
            : typeof P == "function" && P.apply(this, arguments);
        });
      }
    }
    var o = e.copyFile;
    o && (e.copyFile = u);
    function u(p, T, R, k) {
      return typeof R == "function" && ((k = R), (R = 0)), z(p, T, R, k);
      function z($, X, I, P, G) {
        return o($, X, I, function (J) {
          J && (J.code === "EMFILE" || J.code === "ENFILE")
            ? js([z, [$, X, I, P], J, G || Date.now(), Date.now()])
            : typeof P == "function" && P.apply(this, arguments);
        });
      }
    }
    var l = e.readdir;
    e.readdir = h;
    var f = /^v[0-5]\./;
    function h(p, T, R) {
      typeof T == "function" && ((R = T), (T = null));
      var k = f.test(process.version)
        ? function (X, I, P, G) {
            return l(X, z(X, I, P, G));
          }
        : function (X, I, P, G) {
            return l(X, I, z(X, I, P, G));
          };
      return k(p, T, R);
      function z($, X, I, P) {
        return function (G, J) {
          G && (G.code === "EMFILE" || G.code === "ENFILE")
            ? js([k, [$, X, I], G, P || Date.now(), Date.now()])
            : (J && J.sort && J.sort(),
              typeof I == "function" && I.call(this, G, J));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var c = f9(e);
      (O = c.ReadStream), (D = c.WriteStream);
    }
    var d = e.ReadStream;
    d && ((O.prototype = Object.create(d.prototype)), (O.prototype.open = L));
    var m = e.WriteStream;
    m && ((D.prototype = Object.create(m.prototype)), (D.prototype.open = w)),
      Object.defineProperty(e, "ReadStream", {
        get: function () {
          return O;
        },
        set: function (p) {
          O = p;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(e, "WriteStream", {
        get: function () {
          return D;
        },
        set: function (p) {
          D = p;
        },
        enumerable: !0,
        configurable: !0,
      });
    var C = O;
    Object.defineProperty(e, "FileReadStream", {
      get: function () {
        return C;
      },
      set: function (p) {
        C = p;
      },
      enumerable: !0,
      configurable: !0,
    });
    var E = D;
    Object.defineProperty(e, "FileWriteStream", {
      get: function () {
        return E;
      },
      set: function (p) {
        E = p;
      },
      enumerable: !0,
      configurable: !0,
    });
    function O(p, T) {
      return this instanceof O
        ? (d.apply(this, arguments), this)
        : O.apply(Object.create(O.prototype), arguments);
    }
    function L() {
      var p = this;
      A(p.path, p.flags, p.mode, function (T, R) {
        T
          ? (p.autoClose && p.destroy(), p.emit("error", T))
          : ((p.fd = R), p.emit("open", R), p.read());
      });
    }
    function D(p, T) {
      return this instanceof D
        ? (m.apply(this, arguments), this)
        : D.apply(Object.create(D.prototype), arguments);
    }
    function w() {
      var p = this;
      A(p.path, p.flags, p.mode, function (T, R) {
        T ? (p.destroy(), p.emit("error", T)) : ((p.fd = R), p.emit("open", R));
      });
    }
    function F(p, T) {
      return new e.ReadStream(p, T);
    }
    function g(p, T) {
      return new e.WriteStream(p, T);
    }
    var x = e.open;
    e.open = A;
    function A(p, T, R, k) {
      return typeof R == "function" && ((k = R), (R = null)), z(p, T, R, k);
      function z($, X, I, P, G) {
        return x($, X, I, function (J, W) {
          J && (J.code === "EMFILE" || J.code === "ENFILE")
            ? js([z, [$, X, I, P], J, G || Date.now(), Date.now()])
            : typeof P == "function" && P.apply(this, arguments);
        });
      }
    }
    return e;
  }
  function js(e) {
    Tn("ENQUEUE", e[0].name, e[1]), Ce[Qe].push(e), r0();
  }
  var vh;
  function gO() {
    for (var e = Date.now(), t = 0; t < Ce[Qe].length; ++t)
      Ce[Qe][t].length > 2 && ((Ce[Qe][t][3] = e), (Ce[Qe][t][4] = e));
    r0();
  }
  function r0() {
    if ((clearTimeout(vh), (vh = void 0), Ce[Qe].length !== 0)) {
      var e = Ce[Qe].shift(),
        t = e[0],
        r = e[1],
        i = e[2],
        n = e[3],
        s = e[4];
      if (n === void 0) Tn("RETRY", t.name, r), t.apply(null, r);
      else if (Date.now() - n >= 6e4) {
        Tn("TIMEOUT", t.name, r);
        var a = r.pop();
        typeof a == "function" && a.call(null, i);
      } else {
        var o = Date.now() - s,
          u = Math.max(s - n, 1),
          l = Math.min(u * 1.2, 100);
        o >= l
          ? (Tn("RETRY", t.name, r), t.apply(null, r.concat([n])))
          : Ce[Qe].push(e);
      }
      vh === void 0 && (vh = setTimeout(r0, 0));
    }
  }
});
var Gr = y((VJ, s0) => {
  "use strict";
  typeof process > "u" ||
  !process.version ||
  process.version.indexOf("v0.") === 0 ||
  (process.version.indexOf("v1.") === 0 &&
    process.version.indexOf("v1.8.") !== 0)
    ? (s0.exports = { nextTick: d9 })
    : (s0.exports = process);
  function d9(e, t, r, i) {
    if (typeof e != "function")
      throw new TypeError('"callback" argument must be a function');
    var n = arguments.length,
      s,
      a;
    switch (n) {
      case 0:
      case 1:
        return process.nextTick(e);
      case 2:
        return process.nextTick(function () {
          e.call(null, t);
        });
      case 3:
        return process.nextTick(function () {
          e.call(null, t, r);
        });
      case 4:
        return process.nextTick(function () {
          e.call(null, t, r, i);
        });
      default:
        for (s = new Array(n - 1), a = 0; a < s.length; ) s[a++] = arguments[a];
        return process.nextTick(function () {
          e.apply(null, s);
        });
    }
  }
});
var a0 = y((YJ, vO) => {
  var p9 = {}.toString;
  vO.exports =
    Array.isArray ||
    function (e) {
      return p9.call(e) == "[object Array]";
    };
});
var o0 = y((XJ, wO) => {
  wO.exports = require("stream");
});
var Oo = y((u0, bO) => {
  var Dh = require("buffer"),
    Hr = Dh.Buffer;
  function DO(e, t) {
    for (var r in e) t[r] = e[r];
  }
  Hr.from && Hr.alloc && Hr.allocUnsafe && Hr.allocUnsafeSlow
    ? (bO.exports = Dh)
    : (DO(Dh, u0), (u0.Buffer = Us));
  function Us(e, t, r) {
    return Hr(e, t, r);
  }
  DO(Hr, Us);
  Us.from = function (e, t, r) {
    if (typeof e == "number")
      throw new TypeError("Argument must not be a number");
    return Hr(e, t, r);
  };
  Us.alloc = function (e, t, r) {
    if (typeof e != "number") throw new TypeError("Argument must be a number");
    var i = Hr(e);
    return (
      t !== void 0
        ? typeof r == "string"
          ? i.fill(t, r)
          : i.fill(t)
        : i.fill(0),
      i
    );
  };
  Us.allocUnsafe = function (e) {
    if (typeof e != "number") throw new TypeError("Argument must be a number");
    return Hr(e);
  };
  Us.allocUnsafeSlow = function (e) {
    if (typeof e != "number") throw new TypeError("Argument must be a number");
    return Dh.SlowBuffer(e);
  };
});
var ar = y((ut) => {
  function m9(e) {
    return Array.isArray ? Array.isArray(e) : bh(e) === "[object Array]";
  }
  ut.isArray = m9;
  function g9(e) {
    return typeof e == "boolean";
  }
  ut.isBoolean = g9;
  function y9(e) {
    return e === null;
  }
  ut.isNull = y9;
  function v9(e) {
    return e == null;
  }
  ut.isNullOrUndefined = v9;
  function w9(e) {
    return typeof e == "number";
  }
  ut.isNumber = w9;
  function D9(e) {
    return typeof e == "string";
  }
  ut.isString = D9;
  function b9(e) {
    return typeof e == "symbol";
  }
  ut.isSymbol = b9;
  function E9(e) {
    return e === void 0;
  }
  ut.isUndefined = E9;
  function _9(e) {
    return bh(e) === "[object RegExp]";
  }
  ut.isRegExp = _9;
  function S9(e) {
    return typeof e == "object" && e !== null;
  }
  ut.isObject = S9;
  function x9(e) {
    return bh(e) === "[object Date]";
  }
  ut.isDate = x9;
  function C9(e) {
    return bh(e) === "[object Error]" || e instanceof Error;
  }
  ut.isError = C9;
  function O9(e) {
    return typeof e == "function";
  }
  ut.isFunction = O9;
  function T9(e) {
    return (
      e === null ||
      typeof e == "boolean" ||
      typeof e == "number" ||
      typeof e == "string" ||
      typeof e == "symbol" ||
      typeof e > "u"
    );
  }
  ut.isPrimitive = T9;
  ut.isBuffer = require("buffer").Buffer.isBuffer;
  function bh(e) {
    return Object.prototype.toString.call(e);
  }
});
var _O = y((KJ, l0) => {
  "use strict";
  function F9(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  var EO = Oo().Buffer,
    To = require("util");
  function R9(e, t, r) {
    e.copy(t, r);
  }
  l0.exports = (function () {
    function e() {
      F9(this, e), (this.head = null), (this.tail = null), (this.length = 0);
    }
    return (
      (e.prototype.push = function (r) {
        var i = { data: r, next: null };
        this.length > 0 ? (this.tail.next = i) : (this.head = i),
          (this.tail = i),
          ++this.length;
      }),
      (e.prototype.unshift = function (r) {
        var i = { data: r, next: this.head };
        this.length === 0 && (this.tail = i), (this.head = i), ++this.length;
      }),
      (e.prototype.shift = function () {
        if (this.length !== 0) {
          var r = this.head.data;
          return (
            this.length === 1
              ? (this.head = this.tail = null)
              : (this.head = this.head.next),
            --this.length,
            r
          );
        }
      }),
      (e.prototype.clear = function () {
        (this.head = this.tail = null), (this.length = 0);
      }),
      (e.prototype.join = function (r) {
        if (this.length === 0) return "";
        for (var i = this.head, n = "" + i.data; (i = i.next); )
          n += r + i.data;
        return n;
      }),
      (e.prototype.concat = function (r) {
        if (this.length === 0) return EO.alloc(0);
        if (this.length === 1) return this.head.data;
        for (var i = EO.allocUnsafe(r >>> 0), n = this.head, s = 0; n; )
          R9(n.data, i, s), (s += n.data.length), (n = n.next);
        return i;
      }),
      e
    );
  })();
  To &&
    To.inspect &&
    To.inspect.custom &&
    (l0.exports.prototype[To.inspect.custom] = function () {
      var e = To.inspect({ length: this.length });
      return this.constructor.name + " " + e;
    });
});
var f0 = y((QJ, CO) => {
  "use strict";
  var SO = Gr();
  function A9(e, t) {
    var r = this,
      i = this._readableState && this._readableState.destroyed,
      n = this._writableState && this._writableState.destroyed;
    return i || n
      ? (t
          ? t(e)
          : e &&
            (!this._writableState || !this._writableState.errorEmitted) &&
            SO.nextTick(xO, this, e),
        this)
      : (this._readableState && (this._readableState.destroyed = !0),
        this._writableState && (this._writableState.destroyed = !0),
        this._destroy(e || null, function (s) {
          !t && s
            ? (SO.nextTick(xO, r, s),
              r._writableState && (r._writableState.errorEmitted = !0))
            : t && t(s);
        }),
        this);
  }
  function N9() {
    this._readableState &&
      ((this._readableState.destroyed = !1),
      (this._readableState.reading = !1),
      (this._readableState.ended = !1),
      (this._readableState.endEmitted = !1)),
      this._writableState &&
        ((this._writableState.destroyed = !1),
        (this._writableState.ended = !1),
        (this._writableState.ending = !1),
        (this._writableState.finished = !1),
        (this._writableState.errorEmitted = !1));
  }
  function xO(e, t) {
    e.emit("error", t);
  }
  CO.exports = { destroy: A9, undestroy: N9 };
});
var c0 = y((JJ, MO) => {
  "use strict";
  var Fn = Gr();
  MO.exports = Le;
  function TO(e) {
    var t = this;
    (this.next = null),
      (this.entry = null),
      (this.finish = function () {
        Z9(t, e);
      });
  }
  var I9 =
      !process.browser &&
      ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1
        ? setImmediate
        : Fn.nextTick,
    zs;
  Le.WritableState = Ro;
  var FO = Object.create(ar());
  FO.inherits = je();
  var M9 = { deprecate: vf() },
    RO = o0(),
    _h = Oo().Buffer,
    L9 = global.Uint8Array || function () {};
  function q9(e) {
    return _h.from(e);
  }
  function P9(e) {
    return _h.isBuffer(e) || e instanceof L9;
  }
  var AO = f0();
  FO.inherits(Le, RO);
  function B9() {}
  function Ro(e, t) {
    (zs = zs || Rn()), (e = e || {});
    var r = t instanceof zs;
    (this.objectMode = !!e.objectMode),
      r && (this.objectMode = this.objectMode || !!e.writableObjectMode);
    var i = e.highWaterMark,
      n = e.writableHighWaterMark,
      s = this.objectMode ? 16 : 16 * 1024;
    i || i === 0
      ? (this.highWaterMark = i)
      : r && (n || n === 0)
      ? (this.highWaterMark = n)
      : (this.highWaterMark = s),
      (this.highWaterMark = Math.floor(this.highWaterMark)),
      (this.finalCalled = !1),
      (this.needDrain = !1),
      (this.ending = !1),
      (this.ended = !1),
      (this.finished = !1),
      (this.destroyed = !1);
    var a = e.decodeStrings === !1;
    (this.decodeStrings = !a),
      (this.defaultEncoding = e.defaultEncoding || "utf8"),
      (this.length = 0),
      (this.writing = !1),
      (this.corked = 0),
      (this.sync = !0),
      (this.bufferProcessing = !1),
      (this.onwrite = function (o) {
        G9(t, o);
      }),
      (this.writecb = null),
      (this.writelen = 0),
      (this.bufferedRequest = null),
      (this.lastBufferedRequest = null),
      (this.pendingcb = 0),
      (this.prefinished = !1),
      (this.errorEmitted = !1),
      (this.bufferedRequestCount = 0),
      (this.corkedRequestsFree = new TO(this));
  }
  Ro.prototype.getBuffer = function () {
    for (var t = this.bufferedRequest, r = []; t; ) r.push(t), (t = t.next);
    return r;
  };
  (function () {
    try {
      Object.defineProperty(Ro.prototype, "buffer", {
        get: M9.deprecate(
          function () {
            return this.getBuffer();
          },
          "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.",
          "DEP0003",
        ),
      });
    } catch {}
  })();
  var Eh;
  typeof Symbol == "function" &&
  Symbol.hasInstance &&
  typeof Function.prototype[Symbol.hasInstance] == "function"
    ? ((Eh = Function.prototype[Symbol.hasInstance]),
      Object.defineProperty(Le, Symbol.hasInstance, {
        value: function (e) {
          return Eh.call(this, e)
            ? !0
            : this !== Le
            ? !1
            : e && e._writableState instanceof Ro;
        },
      }))
    : (Eh = function (e) {
        return e instanceof this;
      });
  function Le(e) {
    if (((zs = zs || Rn()), !Eh.call(Le, this) && !(this instanceof zs)))
      return new Le(e);
    (this._writableState = new Ro(e, this)),
      (this.writable = !0),
      e &&
        (typeof e.write == "function" && (this._write = e.write),
        typeof e.writev == "function" && (this._writev = e.writev),
        typeof e.destroy == "function" && (this._destroy = e.destroy),
        typeof e.final == "function" && (this._final = e.final)),
      RO.call(this);
  }
  Le.prototype.pipe = function () {
    this.emit("error", new Error("Cannot pipe, not readable"));
  };
  function k9(e, t) {
    var r = new Error("write after end");
    e.emit("error", r), Fn.nextTick(t, r);
  }
  function j9(e, t, r, i) {
    var n = !0,
      s = !1;
    return (
      r === null
        ? (s = new TypeError("May not write null values to stream"))
        : typeof r != "string" &&
          r !== void 0 &&
          !t.objectMode &&
          (s = new TypeError("Invalid non-string/buffer chunk")),
      s && (e.emit("error", s), Fn.nextTick(i, s), (n = !1)),
      n
    );
  }
  Le.prototype.write = function (e, t, r) {
    var i = this._writableState,
      n = !1,
      s = !i.objectMode && P9(e);
    return (
      s && !_h.isBuffer(e) && (e = q9(e)),
      typeof t == "function" && ((r = t), (t = null)),
      s ? (t = "buffer") : t || (t = i.defaultEncoding),
      typeof r != "function" && (r = B9),
      i.ended
        ? k9(this, r)
        : (s || j9(this, i, e, r)) &&
          (i.pendingcb++, (n = z9(this, i, s, e, t, r))),
      n
    );
  };
  Le.prototype.cork = function () {
    var e = this._writableState;
    e.corked++;
  };
  Le.prototype.uncork = function () {
    var e = this._writableState;
    e.corked &&
      (e.corked--,
      !e.writing &&
        !e.corked &&
        !e.finished &&
        !e.bufferProcessing &&
        e.bufferedRequest &&
        NO(this, e));
  };
  Le.prototype.setDefaultEncoding = function (t) {
    if (
      (typeof t == "string" && (t = t.toLowerCase()),
      !(
        [
          "hex",
          "utf8",
          "utf-8",
          "ascii",
          "binary",
          "base64",
          "ucs2",
          "ucs-2",
          "utf16le",
          "utf-16le",
          "raw",
        ].indexOf((t + "").toLowerCase()) > -1
      ))
    )
      throw new TypeError("Unknown encoding: " + t);
    return (this._writableState.defaultEncoding = t), this;
  };
  function U9(e, t, r) {
    return (
      !e.objectMode &&
        e.decodeStrings !== !1 &&
        typeof t == "string" &&
        (t = _h.from(t, r)),
      t
    );
  }
  Object.defineProperty(Le.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function () {
      return this._writableState.highWaterMark;
    },
  });
  function z9(e, t, r, i, n, s) {
    if (!r) {
      var a = U9(t, i, n);
      i !== a && ((r = !0), (n = "buffer"), (i = a));
    }
    var o = t.objectMode ? 1 : i.length;
    t.length += o;
    var u = t.length < t.highWaterMark;
    if ((u || (t.needDrain = !0), t.writing || t.corked)) {
      var l = t.lastBufferedRequest;
      (t.lastBufferedRequest = {
        chunk: i,
        encoding: n,
        isBuf: r,
        callback: s,
        next: null,
      }),
        l
          ? (l.next = t.lastBufferedRequest)
          : (t.bufferedRequest = t.lastBufferedRequest),
        (t.bufferedRequestCount += 1);
    } else h0(e, t, !1, o, i, n, s);
    return u;
  }
  function h0(e, t, r, i, n, s, a) {
    (t.writelen = i),
      (t.writecb = a),
      (t.writing = !0),
      (t.sync = !0),
      r ? e._writev(n, t.onwrite) : e._write(n, s, t.onwrite),
      (t.sync = !1);
  }
  function $9(e, t, r, i, n) {
    --t.pendingcb,
      r
        ? (Fn.nextTick(n, i),
          Fn.nextTick(Fo, e, t),
          (e._writableState.errorEmitted = !0),
          e.emit("error", i))
        : (n(i),
          (e._writableState.errorEmitted = !0),
          e.emit("error", i),
          Fo(e, t));
  }
  function W9(e) {
    (e.writing = !1),
      (e.writecb = null),
      (e.length -= e.writelen),
      (e.writelen = 0);
  }
  function G9(e, t) {
    var r = e._writableState,
      i = r.sync,
      n = r.writecb;
    if ((W9(r), t)) $9(e, r, i, t, n);
    else {
      var s = IO(r);
      !s && !r.corked && !r.bufferProcessing && r.bufferedRequest && NO(e, r),
        i ? I9(OO, e, r, s, n) : OO(e, r, s, n);
    }
  }
  function OO(e, t, r, i) {
    r || H9(e, t), t.pendingcb--, i(), Fo(e, t);
  }
  function H9(e, t) {
    t.length === 0 && t.needDrain && ((t.needDrain = !1), e.emit("drain"));
  }
  function NO(e, t) {
    t.bufferProcessing = !0;
    var r = t.bufferedRequest;
    if (e._writev && r && r.next) {
      var i = t.bufferedRequestCount,
        n = new Array(i),
        s = t.corkedRequestsFree;
      s.entry = r;
      for (var a = 0, o = !0; r; )
        (n[a] = r), r.isBuf || (o = !1), (r = r.next), (a += 1);
      (n.allBuffers = o),
        h0(e, t, !0, t.length, n, "", s.finish),
        t.pendingcb++,
        (t.lastBufferedRequest = null),
        s.next
          ? ((t.corkedRequestsFree = s.next), (s.next = null))
          : (t.corkedRequestsFree = new TO(t)),
        (t.bufferedRequestCount = 0);
    } else {
      for (; r; ) {
        var u = r.chunk,
          l = r.encoding,
          f = r.callback,
          h = t.objectMode ? 1 : u.length;
        if (
          (h0(e, t, !1, h, u, l, f),
          (r = r.next),
          t.bufferedRequestCount--,
          t.writing)
        )
          break;
      }
      r === null && (t.lastBufferedRequest = null);
    }
    (t.bufferedRequest = r), (t.bufferProcessing = !1);
  }
  Le.prototype._write = function (e, t, r) {
    r(new Error("_write() is not implemented"));
  };
  Le.prototype._writev = null;
  Le.prototype.end = function (e, t, r) {
    var i = this._writableState;
    typeof e == "function"
      ? ((r = e), (e = null), (t = null))
      : typeof t == "function" && ((r = t), (t = null)),
      e != null && this.write(e, t),
      i.corked && ((i.corked = 1), this.uncork()),
      !i.ending && !i.finished && X9(this, i, r);
  };
  function IO(e) {
    return (
      e.ending &&
      e.length === 0 &&
      e.bufferedRequest === null &&
      !e.finished &&
      !e.writing
    );
  }
  function V9(e, t) {
    e._final(function (r) {
      t.pendingcb--,
        r && e.emit("error", r),
        (t.prefinished = !0),
        e.emit("prefinish"),
        Fo(e, t);
    });
  }
  function Y9(e, t) {
    !t.prefinished &&
      !t.finalCalled &&
      (typeof e._final == "function"
        ? (t.pendingcb++, (t.finalCalled = !0), Fn.nextTick(V9, e, t))
        : ((t.prefinished = !0), e.emit("prefinish")));
  }
  function Fo(e, t) {
    var r = IO(t);
    return (
      r &&
        (Y9(e, t), t.pendingcb === 0 && ((t.finished = !0), e.emit("finish"))),
      r
    );
  }
  function X9(e, t, r) {
    (t.ending = !0),
      Fo(e, t),
      r && (t.finished ? Fn.nextTick(r) : e.once("finish", r)),
      (t.ended = !0),
      (e.writable = !1);
  }
  function Z9(e, t, r) {
    var i = e.entry;
    for (e.entry = null; i; ) {
      var n = i.callback;
      t.pendingcb--, n(r), (i = i.next);
    }
    t.corkedRequestsFree
      ? (t.corkedRequestsFree.next = e)
      : (t.corkedRequestsFree = e);
  }
  Object.defineProperty(Le.prototype, "destroyed", {
    get: function () {
      return this._writableState === void 0
        ? !1
        : this._writableState.destroyed;
    },
    set: function (e) {
      !this._writableState || (this._writableState.destroyed = e);
    },
  });
  Le.prototype.destroy = AO.destroy;
  Le.prototype._undestroy = AO.undestroy;
  Le.prototype._destroy = function (e, t) {
    this.end(), t(e);
  };
});
var Rn = y((eee, BO) => {
  "use strict";
  var LO = Gr(),
    K9 =
      Object.keys ||
      function (e) {
        var t = [];
        for (var r in e) t.push(r);
        return t;
      };
  BO.exports = Vr;
  var qO = Object.create(ar());
  qO.inherits = je();
  var PO = m0(),
    p0 = c0();
  qO.inherits(Vr, PO);
  for (d0 = K9(p0.prototype), Sh = 0; Sh < d0.length; Sh++)
    (xh = d0[Sh]), Vr.prototype[xh] || (Vr.prototype[xh] = p0.prototype[xh]);
  var d0, xh, Sh;
  function Vr(e) {
    if (!(this instanceof Vr)) return new Vr(e);
    PO.call(this, e),
      p0.call(this, e),
      e && e.readable === !1 && (this.readable = !1),
      e && e.writable === !1 && (this.writable = !1),
      (this.allowHalfOpen = !0),
      e && e.allowHalfOpen === !1 && (this.allowHalfOpen = !1),
      this.once("end", Q9);
  }
  Object.defineProperty(Vr.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function () {
      return this._writableState.highWaterMark;
    },
  });
  function Q9() {
    this.allowHalfOpen || this._writableState.ended || LO.nextTick(J9, this);
  }
  function J9(e) {
    e.end();
  }
  Object.defineProperty(Vr.prototype, "destroyed", {
    get: function () {
      return this._readableState === void 0 || this._writableState === void 0
        ? !1
        : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function (e) {
      this._readableState === void 0 ||
        this._writableState === void 0 ||
        ((this._readableState.destroyed = e),
        (this._writableState.destroyed = e));
    },
  });
  Vr.prototype._destroy = function (e, t) {
    this.push(null), this.end(), LO.nextTick(t, e);
  };
});
var v0 = y((jO) => {
  "use strict";
  var y0 = Oo().Buffer,
    kO =
      y0.isEncoding ||
      function (e) {
        switch (((e = "" + e), e && e.toLowerCase())) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return !0;
          default:
            return !1;
        }
      };
  function eU(e) {
    if (!e) return "utf8";
    for (var t; ; )
      switch (e) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return e;
        default:
          if (t) return;
          (e = ("" + e).toLowerCase()), (t = !0);
      }
  }
  function tU(e) {
    var t = eU(e);
    if (typeof t != "string" && (y0.isEncoding === kO || !kO(e)))
      throw new Error("Unknown encoding: " + e);
    return t || e;
  }
  jO.StringDecoder = Ao;
  function Ao(e) {
    this.encoding = tU(e);
    var t;
    switch (this.encoding) {
      case "utf16le":
        (this.text = oU), (this.end = uU), (t = 4);
        break;
      case "utf8":
        (this.fillLast = nU), (t = 4);
        break;
      case "base64":
        (this.text = lU), (this.end = fU), (t = 3);
        break;
      default:
        (this.write = hU), (this.end = cU);
        return;
    }
    (this.lastNeed = 0),
      (this.lastTotal = 0),
      (this.lastChar = y0.allocUnsafe(t));
  }
  Ao.prototype.write = function (e) {
    if (e.length === 0) return "";
    var t, r;
    if (this.lastNeed) {
      if (((t = this.fillLast(e)), t === void 0)) return "";
      (r = this.lastNeed), (this.lastNeed = 0);
    } else r = 0;
    return r < e.length ? (t ? t + this.text(e, r) : this.text(e, r)) : t || "";
  };
  Ao.prototype.end = aU;
  Ao.prototype.text = sU;
  Ao.prototype.fillLast = function (e) {
    if (this.lastNeed <= e.length)
      return (
        e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed),
        this.lastChar.toString(this.encoding, 0, this.lastTotal)
      );
    e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length),
      (this.lastNeed -= e.length);
  };
  function g0(e) {
    return e <= 127
      ? 0
      : e >> 5 === 6
      ? 2
      : e >> 4 === 14
      ? 3
      : e >> 3 === 30
      ? 4
      : e >> 6 === 2
      ? -1
      : -2;
  }
  function rU(e, t, r) {
    var i = t.length - 1;
    if (i < r) return 0;
    var n = g0(t[i]);
    return n >= 0
      ? (n > 0 && (e.lastNeed = n - 1), n)
      : --i < r || n === -2
      ? 0
      : ((n = g0(t[i])),
        n >= 0
          ? (n > 0 && (e.lastNeed = n - 2), n)
          : --i < r || n === -2
          ? 0
          : ((n = g0(t[i])),
            n >= 0
              ? (n > 0 && (n === 2 ? (n = 0) : (e.lastNeed = n - 3)), n)
              : 0));
  }
  function iU(e, t, r) {
    if ((t[0] & 192) !== 128) return (e.lastNeed = 0), "\uFFFD";
    if (e.lastNeed > 1 && t.length > 1) {
      if ((t[1] & 192) !== 128) return (e.lastNeed = 1), "\uFFFD";
      if (e.lastNeed > 2 && t.length > 2 && (t[2] & 192) !== 128)
        return (e.lastNeed = 2), "\uFFFD";
    }
  }
  function nU(e) {
    var t = this.lastTotal - this.lastNeed,
      r = iU(this, e, t);
    if (r !== void 0) return r;
    if (this.lastNeed <= e.length)
      return (
        e.copy(this.lastChar, t, 0, this.lastNeed),
        this.lastChar.toString(this.encoding, 0, this.lastTotal)
      );
    e.copy(this.lastChar, t, 0, e.length), (this.lastNeed -= e.length);
  }
  function sU(e, t) {
    var r = rU(this, e, t);
    if (!this.lastNeed) return e.toString("utf8", t);
    this.lastTotal = r;
    var i = e.length - (r - this.lastNeed);
    return e.copy(this.lastChar, 0, i), e.toString("utf8", t, i);
  }
  function aU(e) {
    var t = e && e.length ? this.write(e) : "";
    return this.lastNeed ? t + "\uFFFD" : t;
  }
  function oU(e, t) {
    if ((e.length - t) % 2 === 0) {
      var r = e.toString("utf16le", t);
      if (r) {
        var i = r.charCodeAt(r.length - 1);
        if (i >= 55296 && i <= 56319)
          return (
            (this.lastNeed = 2),
            (this.lastTotal = 4),
            (this.lastChar[0] = e[e.length - 2]),
            (this.lastChar[1] = e[e.length - 1]),
            r.slice(0, -1)
          );
      }
      return r;
    }
    return (
      (this.lastNeed = 1),
      (this.lastTotal = 2),
      (this.lastChar[0] = e[e.length - 1]),
      e.toString("utf16le", t, e.length - 1)
    );
  }
  function uU(e) {
    var t = e && e.length ? this.write(e) : "";
    if (this.lastNeed) {
      var r = this.lastTotal - this.lastNeed;
      return t + this.lastChar.toString("utf16le", 0, r);
    }
    return t;
  }
  function lU(e, t) {
    var r = (e.length - t) % 3;
    return r === 0
      ? e.toString("base64", t)
      : ((this.lastNeed = 3 - r),
        (this.lastTotal = 3),
        r === 1
          ? (this.lastChar[0] = e[e.length - 1])
          : ((this.lastChar[0] = e[e.length - 2]),
            (this.lastChar[1] = e[e.length - 1])),
        e.toString("base64", t, e.length - r));
  }
  function fU(e) {
    var t = e && e.length ? this.write(e) : "";
    return this.lastNeed
      ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed)
      : t;
  }
  function hU(e) {
    return e.toString(this.encoding);
  }
  function cU(e) {
    return e && e.length ? this.write(e) : "";
  }
});
var m0 = y((iee, QO) => {
  "use strict";
  var Ws = Gr();
  QO.exports = Ee;
  var dU = a0(),
    No;
  Ee.ReadableState = VO;
  var ree = require("events").EventEmitter,
    WO = function (e, t) {
      return e.listeners(t).length;
    },
    _0 = o0(),
    Io = Oo().Buffer,
    pU = global.Uint8Array || function () {};
  function mU(e) {
    return Io.from(e);
  }
  function gU(e) {
    return Io.isBuffer(e) || e instanceof pU;
  }
  var GO = Object.create(ar());
  GO.inherits = je();
  var w0 = require("util"),
    de = void 0;
  w0 && w0.debuglog ? (de = w0.debuglog("stream")) : (de = function () {});
  var yU = _O(),
    HO = f0(),
    $s;
  GO.inherits(Ee, _0);
  var D0 = ["error", "close", "destroy", "pause", "resume"];
  function vU(e, t, r) {
    if (typeof e.prependListener == "function") return e.prependListener(t, r);
    !e._events || !e._events[t]
      ? e.on(t, r)
      : dU(e._events[t])
      ? e._events[t].unshift(r)
      : (e._events[t] = [r, e._events[t]]);
  }
  function VO(e, t) {
    (No = No || Rn()), (e = e || {});
    var r = t instanceof No;
    (this.objectMode = !!e.objectMode),
      r && (this.objectMode = this.objectMode || !!e.readableObjectMode);
    var i = e.highWaterMark,
      n = e.readableHighWaterMark,
      s = this.objectMode ? 16 : 16 * 1024;
    i || i === 0
      ? (this.highWaterMark = i)
      : r && (n || n === 0)
      ? (this.highWaterMark = n)
      : (this.highWaterMark = s),
      (this.highWaterMark = Math.floor(this.highWaterMark)),
      (this.buffer = new yU()),
      (this.length = 0),
      (this.pipes = null),
      (this.pipesCount = 0),
      (this.flowing = null),
      (this.ended = !1),
      (this.endEmitted = !1),
      (this.reading = !1),
      (this.sync = !0),
      (this.needReadable = !1),
      (this.emittedReadable = !1),
      (this.readableListening = !1),
      (this.resumeScheduled = !1),
      (this.destroyed = !1),
      (this.defaultEncoding = e.defaultEncoding || "utf8"),
      (this.awaitDrain = 0),
      (this.readingMore = !1),
      (this.decoder = null),
      (this.encoding = null),
      e.encoding &&
        ($s || ($s = v0().StringDecoder),
        (this.decoder = new $s(e.encoding)),
        (this.encoding = e.encoding));
  }
  function Ee(e) {
    if (((No = No || Rn()), !(this instanceof Ee))) return new Ee(e);
    (this._readableState = new VO(e, this)),
      (this.readable = !0),
      e &&
        (typeof e.read == "function" && (this._read = e.read),
        typeof e.destroy == "function" && (this._destroy = e.destroy)),
      _0.call(this);
  }
  Object.defineProperty(Ee.prototype, "destroyed", {
    get: function () {
      return this._readableState === void 0
        ? !1
        : this._readableState.destroyed;
    },
    set: function (e) {
      !this._readableState || (this._readableState.destroyed = e);
    },
  });
  Ee.prototype.destroy = HO.destroy;
  Ee.prototype._undestroy = HO.undestroy;
  Ee.prototype._destroy = function (e, t) {
    this.push(null), t(e);
  };
  Ee.prototype.push = function (e, t) {
    var r = this._readableState,
      i;
    return (
      r.objectMode
        ? (i = !0)
        : typeof e == "string" &&
          ((t = t || r.defaultEncoding),
          t !== r.encoding && ((e = Io.from(e, t)), (t = "")),
          (i = !0)),
      YO(this, e, t, !1, i)
    );
  };
  Ee.prototype.unshift = function (e) {
    return YO(this, e, null, !0, !1);
  };
  function YO(e, t, r, i, n) {
    var s = e._readableState;
    if (t === null) (s.reading = !1), EU(e, s);
    else {
      var a;
      n || (a = wU(s, t)),
        a
          ? e.emit("error", a)
          : s.objectMode || (t && t.length > 0)
          ? (typeof t != "string" &&
              !s.objectMode &&
              Object.getPrototypeOf(t) !== Io.prototype &&
              (t = mU(t)),
            i
              ? s.endEmitted
                ? e.emit("error", new Error("stream.unshift() after end event"))
                : b0(e, s, t, !0)
              : s.ended
              ? e.emit("error", new Error("stream.push() after EOF"))
              : ((s.reading = !1),
                s.decoder && !r
                  ? ((t = s.decoder.write(t)),
                    s.objectMode || t.length !== 0 ? b0(e, s, t, !1) : XO(e, s))
                  : b0(e, s, t, !1)))
          : i || (s.reading = !1);
    }
    return DU(s);
  }
  function b0(e, t, r, i) {
    t.flowing && t.length === 0 && !t.sync
      ? (e.emit("data", r), e.read(0))
      : ((t.length += t.objectMode ? 1 : r.length),
        i ? t.buffer.unshift(r) : t.buffer.push(r),
        t.needReadable && Ch(e)),
      XO(e, t);
  }
  function wU(e, t) {
    var r;
    return (
      !gU(t) &&
        typeof t != "string" &&
        t !== void 0 &&
        !e.objectMode &&
        (r = new TypeError("Invalid non-string/buffer chunk")),
      r
    );
  }
  function DU(e) {
    return (
      !e.ended &&
      (e.needReadable || e.length < e.highWaterMark || e.length === 0)
    );
  }
  Ee.prototype.isPaused = function () {
    return this._readableState.flowing === !1;
  };
  Ee.prototype.setEncoding = function (e) {
    return (
      $s || ($s = v0().StringDecoder),
      (this._readableState.decoder = new $s(e)),
      (this._readableState.encoding = e),
      this
    );
  };
  var UO = 8388608;
  function bU(e) {
    return (
      e >= UO
        ? (e = UO)
        : (e--,
          (e |= e >>> 1),
          (e |= e >>> 2),
          (e |= e >>> 4),
          (e |= e >>> 8),
          (e |= e >>> 16),
          e++),
      e
    );
  }
  function zO(e, t) {
    return e <= 0 || (t.length === 0 && t.ended)
      ? 0
      : t.objectMode
      ? 1
      : e !== e
      ? t.flowing && t.length
        ? t.buffer.head.data.length
        : t.length
      : (e > t.highWaterMark && (t.highWaterMark = bU(e)),
        e <= t.length ? e : t.ended ? t.length : ((t.needReadable = !0), 0));
  }
  Ee.prototype.read = function (e) {
    de("read", e), (e = parseInt(e, 10));
    var t = this._readableState,
      r = e;
    if (
      (e !== 0 && (t.emittedReadable = !1),
      e === 0 && t.needReadable && (t.length >= t.highWaterMark || t.ended))
    )
      return (
        de("read: emitReadable", t.length, t.ended),
        t.length === 0 && t.ended ? E0(this) : Ch(this),
        null
      );
    if (((e = zO(e, t)), e === 0 && t.ended))
      return t.length === 0 && E0(this), null;
    var i = t.needReadable;
    de("need readable", i),
      (t.length === 0 || t.length - e < t.highWaterMark) &&
        ((i = !0), de("length less than watermark", i)),
      t.ended || t.reading
        ? ((i = !1), de("reading or ended", i))
        : i &&
          (de("do read"),
          (t.reading = !0),
          (t.sync = !0),
          t.length === 0 && (t.needReadable = !0),
          this._read(t.highWaterMark),
          (t.sync = !1),
          t.reading || (e = zO(r, t)));
    var n;
    return (
      e > 0 ? (n = ZO(e, t)) : (n = null),
      n === null ? ((t.needReadable = !0), (e = 0)) : (t.length -= e),
      t.length === 0 &&
        (t.ended || (t.needReadable = !0), r !== e && t.ended && E0(this)),
      n !== null && this.emit("data", n),
      n
    );
  };
  function EU(e, t) {
    if (!t.ended) {
      if (t.decoder) {
        var r = t.decoder.end();
        r &&
          r.length &&
          (t.buffer.push(r), (t.length += t.objectMode ? 1 : r.length));
      }
      (t.ended = !0), Ch(e);
    }
  }
  function Ch(e) {
    var t = e._readableState;
    (t.needReadable = !1),
      t.emittedReadable ||
        (de("emitReadable", t.flowing),
        (t.emittedReadable = !0),
        t.sync ? Ws.nextTick($O, e) : $O(e));
  }
  function $O(e) {
    de("emit readable"), e.emit("readable"), S0(e);
  }
  function XO(e, t) {
    t.readingMore || ((t.readingMore = !0), Ws.nextTick(_U, e, t));
  }
  function _U(e, t) {
    for (
      var r = t.length;
      !t.reading &&
      !t.flowing &&
      !t.ended &&
      t.length < t.highWaterMark &&
      (de("maybeReadMore read 0"), e.read(0), r !== t.length);

    )
      r = t.length;
    t.readingMore = !1;
  }
  Ee.prototype._read = function (e) {
    this.emit("error", new Error("_read() is not implemented"));
  };
  Ee.prototype.pipe = function (e, t) {
    var r = this,
      i = this._readableState;
    switch (i.pipesCount) {
      case 0:
        i.pipes = e;
        break;
      case 1:
        i.pipes = [i.pipes, e];
        break;
      default:
        i.pipes.push(e);
        break;
    }
    (i.pipesCount += 1), de("pipe count=%d opts=%j", i.pipesCount, t);
    var n =
        (!t || t.end !== !1) && e !== process.stdout && e !== process.stderr,
      s = n ? o : E;
    i.endEmitted ? Ws.nextTick(s) : r.once("end", s), e.on("unpipe", a);
    function a(O, L) {
      de("onunpipe"),
        O === r && L && L.hasUnpiped === !1 && ((L.hasUnpiped = !0), f());
    }
    function o() {
      de("onend"), e.end();
    }
    var u = SU(r);
    e.on("drain", u);
    var l = !1;
    function f() {
      de("cleanup"),
        e.removeListener("close", m),
        e.removeListener("finish", C),
        e.removeListener("drain", u),
        e.removeListener("error", d),
        e.removeListener("unpipe", a),
        r.removeListener("end", o),
        r.removeListener("end", E),
        r.removeListener("data", c),
        (l = !0),
        i.awaitDrain &&
          (!e._writableState || e._writableState.needDrain) &&
          u();
    }
    var h = !1;
    r.on("data", c);
    function c(O) {
      de("ondata"), (h = !1);
      var L = e.write(O);
      L === !1 &&
        !h &&
        (((i.pipesCount === 1 && i.pipes === e) ||
          (i.pipesCount > 1 && KO(i.pipes, e) !== -1)) &&
          !l &&
          (de("false write response, pause", r._readableState.awaitDrain),
          r._readableState.awaitDrain++,
          (h = !0)),
        r.pause());
    }
    function d(O) {
      de("onerror", O),
        E(),
        e.removeListener("error", d),
        WO(e, "error") === 0 && e.emit("error", O);
    }
    vU(e, "error", d);
    function m() {
      e.removeListener("finish", C), E();
    }
    e.once("close", m);
    function C() {
      de("onfinish"), e.removeListener("close", m), E();
    }
    e.once("finish", C);
    function E() {
      de("unpipe"), r.unpipe(e);
    }
    return e.emit("pipe", r), i.flowing || (de("pipe resume"), r.resume()), e;
  };
  function SU(e) {
    return function () {
      var t = e._readableState;
      de("pipeOnDrain", t.awaitDrain),
        t.awaitDrain && t.awaitDrain--,
        t.awaitDrain === 0 && WO(e, "data") && ((t.flowing = !0), S0(e));
    };
  }
  Ee.prototype.unpipe = function (e) {
    var t = this._readableState,
      r = { hasUnpiped: !1 };
    if (t.pipesCount === 0) return this;
    if (t.pipesCount === 1)
      return e && e !== t.pipes
        ? this
        : (e || (e = t.pipes),
          (t.pipes = null),
          (t.pipesCount = 0),
          (t.flowing = !1),
          e && e.emit("unpipe", this, r),
          this);
    if (!e) {
      var i = t.pipes,
        n = t.pipesCount;
      (t.pipes = null), (t.pipesCount = 0), (t.flowing = !1);
      for (var s = 0; s < n; s++) i[s].emit("unpipe", this, r);
      return this;
    }
    var a = KO(t.pipes, e);
    return a === -1
      ? this
      : (t.pipes.splice(a, 1),
        (t.pipesCount -= 1),
        t.pipesCount === 1 && (t.pipes = t.pipes[0]),
        e.emit("unpipe", this, r),
        this);
  };
  Ee.prototype.on = function (e, t) {
    var r = _0.prototype.on.call(this, e, t);
    if (e === "data") this._readableState.flowing !== !1 && this.resume();
    else if (e === "readable") {
      var i = this._readableState;
      !i.endEmitted &&
        !i.readableListening &&
        ((i.readableListening = i.needReadable = !0),
        (i.emittedReadable = !1),
        i.reading ? i.length && Ch(this) : Ws.nextTick(xU, this));
    }
    return r;
  };
  Ee.prototype.addListener = Ee.prototype.on;
  function xU(e) {
    de("readable nexttick read 0"), e.read(0);
  }
  Ee.prototype.resume = function () {
    var e = this._readableState;
    return e.flowing || (de("resume"), (e.flowing = !0), CU(this, e)), this;
  };
  function CU(e, t) {
    t.resumeScheduled || ((t.resumeScheduled = !0), Ws.nextTick(OU, e, t));
  }
  function OU(e, t) {
    t.reading || (de("resume read 0"), e.read(0)),
      (t.resumeScheduled = !1),
      (t.awaitDrain = 0),
      e.emit("resume"),
      S0(e),
      t.flowing && !t.reading && e.read(0);
  }
  Ee.prototype.pause = function () {
    return (
      de("call pause flowing=%j", this._readableState.flowing),
      this._readableState.flowing !== !1 &&
        (de("pause"), (this._readableState.flowing = !1), this.emit("pause")),
      this
    );
  };
  function S0(e) {
    var t = e._readableState;
    for (de("flow", t.flowing); t.flowing && e.read() !== null; );
  }
  Ee.prototype.wrap = function (e) {
    var t = this,
      r = this._readableState,
      i = !1;
    e.on("end", function () {
      if ((de("wrapped end"), r.decoder && !r.ended)) {
        var a = r.decoder.end();
        a && a.length && t.push(a);
      }
      t.push(null);
    }),
      e.on("data", function (a) {
        if (
          (de("wrapped data"),
          r.decoder && (a = r.decoder.write(a)),
          !(r.objectMode && a == null) && !(!r.objectMode && (!a || !a.length)))
        ) {
          var o = t.push(a);
          o || ((i = !0), e.pause());
        }
      });
    for (var n in e)
      this[n] === void 0 &&
        typeof e[n] == "function" &&
        (this[n] = (function (a) {
          return function () {
            return e[a].apply(e, arguments);
          };
        })(n));
    for (var s = 0; s < D0.length; s++)
      e.on(D0[s], this.emit.bind(this, D0[s]));
    return (
      (this._read = function (a) {
        de("wrapped _read", a), i && ((i = !1), e.resume());
      }),
      this
    );
  };
  Object.defineProperty(Ee.prototype, "readableHighWaterMark", {
    enumerable: !1,
    get: function () {
      return this._readableState.highWaterMark;
    },
  });
  Ee._fromList = ZO;
  function ZO(e, t) {
    if (t.length === 0) return null;
    var r;
    return (
      t.objectMode
        ? (r = t.buffer.shift())
        : !e || e >= t.length
        ? (t.decoder
            ? (r = t.buffer.join(""))
            : t.buffer.length === 1
            ? (r = t.buffer.head.data)
            : (r = t.buffer.concat(t.length)),
          t.buffer.clear())
        : (r = TU(e, t.buffer, t.decoder)),
      r
    );
  }
  function TU(e, t, r) {
    var i;
    return (
      e < t.head.data.length
        ? ((i = t.head.data.slice(0, e)), (t.head.data = t.head.data.slice(e)))
        : e === t.head.data.length
        ? (i = t.shift())
        : (i = r ? FU(e, t) : RU(e, t)),
      i
    );
  }
  function FU(e, t) {
    var r = t.head,
      i = 1,
      n = r.data;
    for (e -= n.length; (r = r.next); ) {
      var s = r.data,
        a = e > s.length ? s.length : e;
      if (
        (a === s.length ? (n += s) : (n += s.slice(0, e)), (e -= a), e === 0)
      ) {
        a === s.length
          ? (++i, r.next ? (t.head = r.next) : (t.head = t.tail = null))
          : ((t.head = r), (r.data = s.slice(a)));
        break;
      }
      ++i;
    }
    return (t.length -= i), n;
  }
  function RU(e, t) {
    var r = Io.allocUnsafe(e),
      i = t.head,
      n = 1;
    for (i.data.copy(r), e -= i.data.length; (i = i.next); ) {
      var s = i.data,
        a = e > s.length ? s.length : e;
      if ((s.copy(r, r.length - e, 0, a), (e -= a), e === 0)) {
        a === s.length
          ? (++n, i.next ? (t.head = i.next) : (t.head = t.tail = null))
          : ((t.head = i), (i.data = s.slice(a)));
        break;
      }
      ++n;
    }
    return (t.length -= n), r;
  }
  function E0(e) {
    var t = e._readableState;
    if (t.length > 0)
      throw new Error('"endReadable()" called on non-empty stream');
    t.endEmitted || ((t.ended = !0), Ws.nextTick(AU, t, e));
  }
  function AU(e, t) {
    !e.endEmitted &&
      e.length === 0 &&
      ((e.endEmitted = !0), (t.readable = !1), t.emit("end"));
  }
  function KO(e, t) {
    for (var r = 0, i = e.length; r < i; r++) if (e[r] === t) return r;
    return -1;
  }
});
var x0 = y((nee, tT) => {
  "use strict";
  tT.exports = Yr;
  var Oh = Rn(),
    eT = Object.create(ar());
  eT.inherits = je();
  eT.inherits(Yr, Oh);
  function NU(e, t) {
    var r = this._transformState;
    r.transforming = !1;
    var i = r.writecb;
    if (!i)
      return this.emit(
        "error",
        new Error("write callback called multiple times"),
      );
    (r.writechunk = null), (r.writecb = null), t != null && this.push(t), i(e);
    var n = this._readableState;
    (n.reading = !1),
      (n.needReadable || n.length < n.highWaterMark) &&
        this._read(n.highWaterMark);
  }
  function Yr(e) {
    if (!(this instanceof Yr)) return new Yr(e);
    Oh.call(this, e),
      (this._transformState = {
        afterTransform: NU.bind(this),
        needTransform: !1,
        transforming: !1,
        writecb: null,
        writechunk: null,
        writeencoding: null,
      }),
      (this._readableState.needReadable = !0),
      (this._readableState.sync = !1),
      e &&
        (typeof e.transform == "function" && (this._transform = e.transform),
        typeof e.flush == "function" && (this._flush = e.flush)),
      this.on("prefinish", IU);
  }
  function IU() {
    var e = this;
    typeof this._flush == "function"
      ? this._flush(function (t, r) {
          JO(e, t, r);
        })
      : JO(this, null, null);
  }
  Yr.prototype.push = function (e, t) {
    return (
      (this._transformState.needTransform = !1),
      Oh.prototype.push.call(this, e, t)
    );
  };
  Yr.prototype._transform = function (e, t, r) {
    throw new Error("_transform() is not implemented");
  };
  Yr.prototype._write = function (e, t, r) {
    var i = this._transformState;
    if (
      ((i.writecb = r),
      (i.writechunk = e),
      (i.writeencoding = t),
      !i.transforming)
    ) {
      var n = this._readableState;
      (i.needTransform || n.needReadable || n.length < n.highWaterMark) &&
        this._read(n.highWaterMark);
    }
  };
  Yr.prototype._read = function (e) {
    var t = this._transformState;
    t.writechunk !== null && t.writecb && !t.transforming
      ? ((t.transforming = !0),
        this._transform(t.writechunk, t.writeencoding, t.afterTransform))
      : (t.needTransform = !0);
  };
  Yr.prototype._destroy = function (e, t) {
    var r = this;
    Oh.prototype._destroy.call(this, e, function (i) {
      t(i), r.emit("close");
    });
  };
  function JO(e, t, r) {
    if (t) return e.emit("error", t);
    if ((r != null && e.push(r), e._writableState.length))
      throw new Error("Calling transform done when ws.length != 0");
    if (e._transformState.transforming)
      throw new Error("Calling transform done when still transforming");
    return e.push(null);
  }
});
var sT = y((see, nT) => {
  "use strict";
  nT.exports = Mo;
  var rT = x0(),
    iT = Object.create(ar());
  iT.inherits = je();
  iT.inherits(Mo, rT);
  function Mo(e) {
    if (!(this instanceof Mo)) return new Mo(e);
    rT.call(this, e);
  }
  Mo.prototype._transform = function (e, t, r) {
    r(null, e);
  };
});
var aT = y((Je, Th) => {
  var br = require("stream");
  process.env.READABLE_STREAM === "disable" && br
    ? ((Th.exports = br),
      (Je = Th.exports = br.Readable),
      (Je.Readable = br.Readable),
      (Je.Writable = br.Writable),
      (Je.Duplex = br.Duplex),
      (Je.Transform = br.Transform),
      (Je.PassThrough = br.PassThrough),
      (Je.Stream = br))
    : ((Je = Th.exports = m0()),
      (Je.Stream = br || Je),
      (Je.Readable = Je),
      (Je.Writable = c0()),
      (Je.Duplex = Rn()),
      (Je.Transform = x0()),
      (Je.PassThrough = sT()));
});
var uT = y((aee, oT) => {
  oT.exports = aT().PassThrough;
});
var cT = y((oee, hT) => {
  var lT = require("util"),
    Ah = uT();
  hT.exports = { Readable: Fh, Writable: Rh };
  lT.inherits(Fh, Ah);
  lT.inherits(Rh, Ah);
  function fT(e, t, r) {
    e[t] = function () {
      return (
        delete e[t], r.apply(this, arguments), this[t].apply(this, arguments)
      );
    };
  }
  function Fh(e, t) {
    if (!(this instanceof Fh)) return new Fh(e, t);
    Ah.call(this, t),
      fT(this, "_read", function () {
        var r = e.call(this, t),
          i = this.emit.bind(this, "error");
        r.on("error", i), r.pipe(this);
      }),
      this.emit("readable");
  }
  function Rh(e, t) {
    if (!(this instanceof Rh)) return new Rh(e, t);
    Ah.call(this, t),
      fT(this, "_write", function () {
        var r = e.call(this, t),
          i = this.emit.bind(this, "error");
        r.on("error", i), this.pipe(r);
      }),
      this.emit("writable");
  }
});
var C0 = y((uee, dT) => {
  /*!
   * normalize-path <https://github.com/jonschlinkert/normalize-path>
   *
   * Copyright (c) 2014-2018, Jon Schlinkert.
   * Released under the MIT License.
   */ dT.exports = function (e, t) {
    if (typeof e != "string")
      throw new TypeError("expected path to be a string");
    if (e === "\\" || e === "/") return "/";
    var r = e.length;
    if (r <= 1) return e;
    var i = "";
    if (r > 4 && e[3] === "\\") {
      var n = e[2];
      (n === "?" || n === ".") &&
        e.slice(0, 2) === "\\\\" &&
        ((e = e.slice(2)), (i = "//"));
    }
    var s = e.split(/[/\\]+/);
    return t !== !1 && s[s.length - 1] === "" && s.pop(), i + s.join("/");
  };
});
var bT = y((lee, DT) => {
  var mT = 9007199254740991,
    MU = "[object Arguments]",
    LU = "[object Function]",
    qU = "[object GeneratorFunction]",
    PU = /^(?:0|[1-9]\d*)$/;
  function gT(e, t, r) {
    switch (r.length) {
      case 0:
        return e.call(t);
      case 1:
        return e.call(t, r[0]);
      case 2:
        return e.call(t, r[0], r[1]);
      case 3:
        return e.call(t, r[0], r[1], r[2]);
    }
    return e.apply(t, r);
  }
  function BU(e, t) {
    for (var r = -1, i = Array(e); ++r < e; ) i[r] = t(r);
    return i;
  }
  var Lo = Object.prototype,
    qo = Lo.hasOwnProperty,
    yT = Lo.toString,
    kU = Lo.propertyIsEnumerable,
    pT = Math.max;
  function jU(e, t) {
    var r = ZU(e) || XU(e) ? BU(e.length, String) : [],
      i = r.length,
      n = !!i;
    for (var s in e)
      (t || qo.call(e, s)) && !(n && (s == "length" || wT(s, i))) && r.push(s);
    return r;
  }
  function UU(e, t, r, i) {
    return e === void 0 || (O0(e, Lo[r]) && !qo.call(i, r)) ? t : e;
  }
  function zU(e, t, r) {
    var i = e[t];
    (!(qo.call(e, t) && O0(i, r)) || (r === void 0 && !(t in e))) && (e[t] = r);
  }
  function $U(e) {
    if (!F0(e)) return YU(e);
    var t = VU(e),
      r = [];
    for (var i in e) (i == "constructor" && (t || !qo.call(e, i))) || r.push(i);
    return r;
  }
  function vT(e, t) {
    return (
      (t = pT(t === void 0 ? e.length - 1 : t, 0)),
      function () {
        for (
          var r = arguments, i = -1, n = pT(r.length - t, 0), s = Array(n);
          ++i < n;

        )
          s[i] = r[t + i];
        i = -1;
        for (var a = Array(t + 1); ++i < t; ) a[i] = r[i];
        return (a[t] = s), gT(e, this, a);
      }
    );
  }
  function WU(e, t, r, i) {
    r || (r = {});
    for (var n = -1, s = t.length; ++n < s; ) {
      var a = t[n],
        o = i ? i(r[a], e[a], a, r, e) : void 0;
      zU(r, a, o === void 0 ? e[a] : o);
    }
    return r;
  }
  function GU(e) {
    return vT(function (t, r) {
      var i = -1,
        n = r.length,
        s = n > 1 ? r[n - 1] : void 0,
        a = n > 2 ? r[2] : void 0;
      for (
        s = e.length > 3 && typeof s == "function" ? (n--, s) : void 0,
          a && HU(r[0], r[1], a) && ((s = n < 3 ? void 0 : s), (n = 1)),
          t = Object(t);
        ++i < n;

      ) {
        var o = r[i];
        o && e(t, o, i, s);
      }
      return t;
    });
  }
  function wT(e, t) {
    return (
      (t = t ?? mT),
      !!t &&
        (typeof e == "number" || PU.test(e)) &&
        e > -1 &&
        e % 1 == 0 &&
        e < t
    );
  }
  function HU(e, t, r) {
    if (!F0(r)) return !1;
    var i = typeof t;
    return (i == "number" ? T0(r) && wT(t, r.length) : i == "string" && t in r)
      ? O0(r[t], e)
      : !1;
  }
  function VU(e) {
    var t = e && e.constructor,
      r = (typeof t == "function" && t.prototype) || Lo;
    return e === r;
  }
  function YU(e) {
    var t = [];
    if (e != null) for (var r in Object(e)) t.push(r);
    return t;
  }
  function O0(e, t) {
    return e === t || (e !== e && t !== t);
  }
  function XU(e) {
    return (
      KU(e) &&
      qo.call(e, "callee") &&
      (!kU.call(e, "callee") || yT.call(e) == MU)
    );
  }
  var ZU = Array.isArray;
  function T0(e) {
    return e != null && JU(e.length) && !QU(e);
  }
  function KU(e) {
    return ez(e) && T0(e);
  }
  function QU(e) {
    var t = F0(e) ? yT.call(e) : "";
    return t == LU || t == qU;
  }
  function JU(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= mT;
  }
  function F0(e) {
    var t = typeof e;
    return !!e && (t == "object" || t == "function");
  }
  function ez(e) {
    return !!e && typeof e == "object";
  }
  var tz = GU(function (e, t, r, i) {
      WU(t, iz(t), e, i);
    }),
    rz = vT(function (e) {
      return e.push(void 0, UU), gT(tz, void 0, e);
    });
  function iz(e) {
    return T0(e) ? jU(e, !0) : $U(e);
  }
  DT.exports = rz;
});
var R0 = y((fee, ET) => {
  ET.exports = require("stream");
});
var Po = y((A0, ST) => {
  var Nh = require("buffer"),
    Xr = Nh.Buffer;
  function _T(e, t) {
    for (var r in e) t[r] = e[r];
  }
  Xr.from && Xr.alloc && Xr.allocUnsafe && Xr.allocUnsafeSlow
    ? (ST.exports = Nh)
    : (_T(Nh, A0), (A0.Buffer = Gs));
  function Gs(e, t, r) {
    return Xr(e, t, r);
  }
  _T(Xr, Gs);
  Gs.from = function (e, t, r) {
    if (typeof e == "number")
      throw new TypeError("Argument must not be a number");
    return Xr(e, t, r);
  };
  Gs.alloc = function (e, t, r) {
    if (typeof e != "number") throw new TypeError("Argument must be a number");
    var i = Xr(e);
    return (
      t !== void 0
        ? typeof r == "string"
          ? i.fill(t, r)
          : i.fill(t)
        : i.fill(0),
      i
    );
  };
  Gs.allocUnsafe = function (e) {
    if (typeof e != "number") throw new TypeError("Argument must be a number");
    return Xr(e);
  };
  Gs.allocUnsafeSlow = function (e) {
    if (typeof e != "number") throw new TypeError("Argument must be a number");
    return Nh.SlowBuffer(e);
  };
});
var CT = y((hee, N0) => {
  "use strict";
  function nz(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  var xT = Po().Buffer,
    Bo = require("util");
  function sz(e, t, r) {
    e.copy(t, r);
  }
  N0.exports = (function () {
    function e() {
      nz(this, e), (this.head = null), (this.tail = null), (this.length = 0);
    }
    return (
      (e.prototype.push = function (r) {
        var i = { data: r, next: null };
        this.length > 0 ? (this.tail.next = i) : (this.head = i),
          (this.tail = i),
          ++this.length;
      }),
      (e.prototype.unshift = function (r) {
        var i = { data: r, next: this.head };
        this.length === 0 && (this.tail = i), (this.head = i), ++this.length;
      }),
      (e.prototype.shift = function () {
        if (this.length !== 0) {
          var r = this.head.data;
          return (
            this.length === 1
              ? (this.head = this.tail = null)
              : (this.head = this.head.next),
            --this.length,
            r
          );
        }
      }),
      (e.prototype.clear = function () {
        (this.head = this.tail = null), (this.length = 0);
      }),
      (e.prototype.join = function (r) {
        if (this.length === 0) return "";
        for (var i = this.head, n = "" + i.data; (i = i.next); )
          n += r + i.data;
        return n;
      }),
      (e.prototype.concat = function (r) {
        if (this.length === 0) return xT.alloc(0);
        if (this.length === 1) return this.head.data;
        for (var i = xT.allocUnsafe(r >>> 0), n = this.head, s = 0; n; )
          sz(n.data, i, s), (s += n.data.length), (n = n.next);
        return i;
      }),
      e
    );
  })();
  Bo &&
    Bo.inspect &&
    Bo.inspect.custom &&
    (N0.exports.prototype[Bo.inspect.custom] = function () {
      var e = Bo.inspect({ length: this.length });
      return this.constructor.name + " " + e;
    });
});
var I0 = y((cee, FT) => {
  "use strict";
  var OT = Gr();
  function az(e, t) {
    var r = this,
      i = this._readableState && this._readableState.destroyed,
      n = this._writableState && this._writableState.destroyed;
    return i || n
      ? (t
          ? t(e)
          : e &&
            (!this._writableState || !this._writableState.errorEmitted) &&
            OT.nextTick(TT, this, e),
        this)
      : (this._readableState && (this._readableState.destroyed = !0),
        this._writableState && (this._writableState.destroyed = !0),
        this._destroy(e || null, function (s) {
          !t && s
            ? (OT.nextTick(TT, r, s),
              r._writableState && (r._writableState.errorEmitted = !0))
            : t && t(s);
        }),
        this);
  }
  function oz() {
    this._readableState &&
      ((this._readableState.destroyed = !1),
      (this._readableState.reading = !1),
      (this._readableState.ended = !1),
      (this._readableState.endEmitted = !1)),
      this._writableState &&
        ((this._writableState.destroyed = !1),
        (this._writableState.ended = !1),
        (this._writableState.ending = !1),
        (this._writableState.finished = !1),
        (this._writableState.errorEmitted = !1));
  }
  function TT(e, t) {
    e.emit("error", t);
  }
  FT.exports = { destroy: az, undestroy: oz };
});
var L0 = y((dee, PT) => {
  "use strict";
  var An = Gr();
  PT.exports = qe;
  function AT(e) {
    var t = this;
    (this.next = null),
      (this.entry = null),
      (this.finish = function () {
        xz(t, e);
      });
  }
  var uz =
      !process.browser &&
      ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1
        ? setImmediate
        : An.nextTick,
    Hs;
  qe.WritableState = jo;
  var NT = Object.create(ar());
  NT.inherits = je();
  var lz = { deprecate: vf() },
    IT = R0(),
    Mh = Po().Buffer,
    fz = global.Uint8Array || function () {};
  function hz(e) {
    return Mh.from(e);
  }
  function cz(e) {
    return Mh.isBuffer(e) || e instanceof fz;
  }
  var MT = I0();
  NT.inherits(qe, IT);
  function dz() {}
  function jo(e, t) {
    (Hs = Hs || Nn()), (e = e || {});
    var r = t instanceof Hs;
    (this.objectMode = !!e.objectMode),
      r && (this.objectMode = this.objectMode || !!e.writableObjectMode);
    var i = e.highWaterMark,
      n = e.writableHighWaterMark,
      s = this.objectMode ? 16 : 16 * 1024;
    i || i === 0
      ? (this.highWaterMark = i)
      : r && (n || n === 0)
      ? (this.highWaterMark = n)
      : (this.highWaterMark = s),
      (this.highWaterMark = Math.floor(this.highWaterMark)),
      (this.finalCalled = !1),
      (this.needDrain = !1),
      (this.ending = !1),
      (this.ended = !1),
      (this.finished = !1),
      (this.destroyed = !1);
    var a = e.decodeStrings === !1;
    (this.decodeStrings = !a),
      (this.defaultEncoding = e.defaultEncoding || "utf8"),
      (this.length = 0),
      (this.writing = !1),
      (this.corked = 0),
      (this.sync = !0),
      (this.bufferProcessing = !1),
      (this.onwrite = function (o) {
        Dz(t, o);
      }),
      (this.writecb = null),
      (this.writelen = 0),
      (this.bufferedRequest = null),
      (this.lastBufferedRequest = null),
      (this.pendingcb = 0),
      (this.prefinished = !1),
      (this.errorEmitted = !1),
      (this.bufferedRequestCount = 0),
      (this.corkedRequestsFree = new AT(this));
  }
  jo.prototype.getBuffer = function () {
    for (var t = this.bufferedRequest, r = []; t; ) r.push(t), (t = t.next);
    return r;
  };
  (function () {
    try {
      Object.defineProperty(jo.prototype, "buffer", {
        get: lz.deprecate(
          function () {
            return this.getBuffer();
          },
          "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.",
          "DEP0003",
        ),
      });
    } catch {}
  })();
  var Ih;
  typeof Symbol == "function" &&
  Symbol.hasInstance &&
  typeof Function.prototype[Symbol.hasInstance] == "function"
    ? ((Ih = Function.prototype[Symbol.hasInstance]),
      Object.defineProperty(qe, Symbol.hasInstance, {
        value: function (e) {
          return Ih.call(this, e)
            ? !0
            : this !== qe
            ? !1
            : e && e._writableState instanceof jo;
        },
      }))
    : (Ih = function (e) {
        return e instanceof this;
      });
  function qe(e) {
    if (((Hs = Hs || Nn()), !Ih.call(qe, this) && !(this instanceof Hs)))
      return new qe(e);
    (this._writableState = new jo(e, this)),
      (this.writable = !0),
      e &&
        (typeof e.write == "function" && (this._write = e.write),
        typeof e.writev == "function" && (this._writev = e.writev),
        typeof e.destroy == "function" && (this._destroy = e.destroy),
        typeof e.final == "function" && (this._final = e.final)),
      IT.call(this);
  }
  qe.prototype.pipe = function () {
    this.emit("error", new Error("Cannot pipe, not readable"));
  };
  function pz(e, t) {
    var r = new Error("write after end");
    e.emit("error", r), An.nextTick(t, r);
  }
  function mz(e, t, r, i) {
    var n = !0,
      s = !1;
    return (
      r === null
        ? (s = new TypeError("May not write null values to stream"))
        : typeof r != "string" &&
          r !== void 0 &&
          !t.objectMode &&
          (s = new TypeError("Invalid non-string/buffer chunk")),
      s && (e.emit("error", s), An.nextTick(i, s), (n = !1)),
      n
    );
  }
  qe.prototype.write = function (e, t, r) {
    var i = this._writableState,
      n = !1,
      s = !i.objectMode && cz(e);
    return (
      s && !Mh.isBuffer(e) && (e = hz(e)),
      typeof t == "function" && ((r = t), (t = null)),
      s ? (t = "buffer") : t || (t = i.defaultEncoding),
      typeof r != "function" && (r = dz),
      i.ended
        ? pz(this, r)
        : (s || mz(this, i, e, r)) &&
          (i.pendingcb++, (n = yz(this, i, s, e, t, r))),
      n
    );
  };
  qe.prototype.cork = function () {
    var e = this._writableState;
    e.corked++;
  };
  qe.prototype.uncork = function () {
    var e = this._writableState;
    e.corked &&
      (e.corked--,
      !e.writing &&
        !e.corked &&
        !e.finished &&
        !e.bufferProcessing &&
        e.bufferedRequest &&
        LT(this, e));
  };
  qe.prototype.setDefaultEncoding = function (t) {
    if (
      (typeof t == "string" && (t = t.toLowerCase()),
      !(
        [
          "hex",
          "utf8",
          "utf-8",
          "ascii",
          "binary",
          "base64",
          "ucs2",
          "ucs-2",
          "utf16le",
          "utf-16le",
          "raw",
        ].indexOf((t + "").toLowerCase()) > -1
      ))
    )
      throw new TypeError("Unknown encoding: " + t);
    return (this._writableState.defaultEncoding = t), this;
  };
  function gz(e, t, r) {
    return (
      !e.objectMode &&
        e.decodeStrings !== !1 &&
        typeof t == "string" &&
        (t = Mh.from(t, r)),
      t
    );
  }
  Object.defineProperty(qe.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function () {
      return this._writableState.highWaterMark;
    },
  });
  function yz(e, t, r, i, n, s) {
    if (!r) {
      var a = gz(t, i, n);
      i !== a && ((r = !0), (n = "buffer"), (i = a));
    }
    var o = t.objectMode ? 1 : i.length;
    t.length += o;
    var u = t.length < t.highWaterMark;
    if ((u || (t.needDrain = !0), t.writing || t.corked)) {
      var l = t.lastBufferedRequest;
      (t.lastBufferedRequest = {
        chunk: i,
        encoding: n,
        isBuf: r,
        callback: s,
        next: null,
      }),
        l
          ? (l.next = t.lastBufferedRequest)
          : (t.bufferedRequest = t.lastBufferedRequest),
        (t.bufferedRequestCount += 1);
    } else M0(e, t, !1, o, i, n, s);
    return u;
  }
  function M0(e, t, r, i, n, s, a) {
    (t.writelen = i),
      (t.writecb = a),
      (t.writing = !0),
      (t.sync = !0),
      r ? e._writev(n, t.onwrite) : e._write(n, s, t.onwrite),
      (t.sync = !1);
  }
  function vz(e, t, r, i, n) {
    --t.pendingcb,
      r
        ? (An.nextTick(n, i),
          An.nextTick(ko, e, t),
          (e._writableState.errorEmitted = !0),
          e.emit("error", i))
        : (n(i),
          (e._writableState.errorEmitted = !0),
          e.emit("error", i),
          ko(e, t));
  }
  function wz(e) {
    (e.writing = !1),
      (e.writecb = null),
      (e.length -= e.writelen),
      (e.writelen = 0);
  }
  function Dz(e, t) {
    var r = e._writableState,
      i = r.sync,
      n = r.writecb;
    if ((wz(r), t)) vz(e, r, i, t, n);
    else {
      var s = qT(r);
      !s && !r.corked && !r.bufferProcessing && r.bufferedRequest && LT(e, r),
        i ? uz(RT, e, r, s, n) : RT(e, r, s, n);
    }
  }
  function RT(e, t, r, i) {
    r || bz(e, t), t.pendingcb--, i(), ko(e, t);
  }
  function bz(e, t) {
    t.length === 0 && t.needDrain && ((t.needDrain = !1), e.emit("drain"));
  }
  function LT(e, t) {
    t.bufferProcessing = !0;
    var r = t.bufferedRequest;
    if (e._writev && r && r.next) {
      var i = t.bufferedRequestCount,
        n = new Array(i),
        s = t.corkedRequestsFree;
      s.entry = r;
      for (var a = 0, o = !0; r; )
        (n[a] = r), r.isBuf || (o = !1), (r = r.next), (a += 1);
      (n.allBuffers = o),
        M0(e, t, !0, t.length, n, "", s.finish),
        t.pendingcb++,
        (t.lastBufferedRequest = null),
        s.next
          ? ((t.corkedRequestsFree = s.next), (s.next = null))
          : (t.corkedRequestsFree = new AT(t)),
        (t.bufferedRequestCount = 0);
    } else {
      for (; r; ) {
        var u = r.chunk,
          l = r.encoding,
          f = r.callback,
          h = t.objectMode ? 1 : u.length;
        if (
          (M0(e, t, !1, h, u, l, f),
          (r = r.next),
          t.bufferedRequestCount--,
          t.writing)
        )
          break;
      }
      r === null && (t.lastBufferedRequest = null);
    }
    (t.bufferedRequest = r), (t.bufferProcessing = !1);
  }
  qe.prototype._write = function (e, t, r) {
    r(new Error("_write() is not implemented"));
  };
  qe.prototype._writev = null;
  qe.prototype.end = function (e, t, r) {
    var i = this._writableState;
    typeof e == "function"
      ? ((r = e), (e = null), (t = null))
      : typeof t == "function" && ((r = t), (t = null)),
      e != null && this.write(e, t),
      i.corked && ((i.corked = 1), this.uncork()),
      !i.ending && !i.finished && Sz(this, i, r);
  };
  function qT(e) {
    return (
      e.ending &&
      e.length === 0 &&
      e.bufferedRequest === null &&
      !e.finished &&
      !e.writing
    );
  }
  function Ez(e, t) {
    e._final(function (r) {
      t.pendingcb--,
        r && e.emit("error", r),
        (t.prefinished = !0),
        e.emit("prefinish"),
        ko(e, t);
    });
  }
  function _z(e, t) {
    !t.prefinished &&
      !t.finalCalled &&
      (typeof e._final == "function"
        ? (t.pendingcb++, (t.finalCalled = !0), An.nextTick(Ez, e, t))
        : ((t.prefinished = !0), e.emit("prefinish")));
  }
  function ko(e, t) {
    var r = qT(t);
    return (
      r &&
        (_z(e, t), t.pendingcb === 0 && ((t.finished = !0), e.emit("finish"))),
      r
    );
  }
  function Sz(e, t, r) {
    (t.ending = !0),
      ko(e, t),
      r && (t.finished ? An.nextTick(r) : e.once("finish", r)),
      (t.ended = !0),
      (e.writable = !1);
  }
  function xz(e, t, r) {
    var i = e.entry;
    for (e.entry = null; i; ) {
      var n = i.callback;
      t.pendingcb--, n(r), (i = i.next);
    }
    t.corkedRequestsFree
      ? (t.corkedRequestsFree.next = e)
      : (t.corkedRequestsFree = e);
  }
  Object.defineProperty(qe.prototype, "destroyed", {
    get: function () {
      return this._writableState === void 0
        ? !1
        : this._writableState.destroyed;
    },
    set: function (e) {
      !this._writableState || (this._writableState.destroyed = e);
    },
  });
  qe.prototype.destroy = MT.destroy;
  qe.prototype._undestroy = MT.undestroy;
  qe.prototype._destroy = function (e, t) {
    this.end(), t(e);
  };
});
var Nn = y((pee, UT) => {
  "use strict";
  var BT = Gr(),
    Cz =
      Object.keys ||
      function (e) {
        var t = [];
        for (var r in e) t.push(r);
        return t;
      };
  UT.exports = Zr;
  var kT = Object.create(ar());
  kT.inherits = je();
  var jT = B0(),
    P0 = L0();
  kT.inherits(Zr, jT);
  for (q0 = Cz(P0.prototype), Lh = 0; Lh < q0.length; Lh++)
    (qh = q0[Lh]), Zr.prototype[qh] || (Zr.prototype[qh] = P0.prototype[qh]);
  var q0, qh, Lh;
  function Zr(e) {
    if (!(this instanceof Zr)) return new Zr(e);
    jT.call(this, e),
      P0.call(this, e),
      e && e.readable === !1 && (this.readable = !1),
      e && e.writable === !1 && (this.writable = !1),
      (this.allowHalfOpen = !0),
      e && e.allowHalfOpen === !1 && (this.allowHalfOpen = !1),
      this.once("end", Oz);
  }
  Object.defineProperty(Zr.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function () {
      return this._writableState.highWaterMark;
    },
  });
  function Oz() {
    this.allowHalfOpen || this._writableState.ended || BT.nextTick(Tz, this);
  }
  function Tz(e) {
    e.end();
  }
  Object.defineProperty(Zr.prototype, "destroyed", {
    get: function () {
      return this._readableState === void 0 || this._writableState === void 0
        ? !1
        : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function (e) {
      this._readableState === void 0 ||
        this._writableState === void 0 ||
        ((this._readableState.destroyed = e),
        (this._writableState.destroyed = e));
    },
  });
  Zr.prototype._destroy = function (e, t) {
    this.push(null), this.end(), BT.nextTick(t, e);
  };
});
var U0 = y(($T) => {
  "use strict";
  var j0 = Po().Buffer,
    zT =
      j0.isEncoding ||
      function (e) {
        switch (((e = "" + e), e && e.toLowerCase())) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return !0;
          default:
            return !1;
        }
      };
  function Fz(e) {
    if (!e) return "utf8";
    for (var t; ; )
      switch (e) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return e;
        default:
          if (t) return;
          (e = ("" + e).toLowerCase()), (t = !0);
      }
  }
  function Rz(e) {
    var t = Fz(e);
    if (typeof t != "string" && (j0.isEncoding === zT || !zT(e)))
      throw new Error("Unknown encoding: " + e);
    return t || e;
  }
  $T.StringDecoder = Uo;
  function Uo(e) {
    this.encoding = Rz(e);
    var t;
    switch (this.encoding) {
      case "utf16le":
        (this.text = qz), (this.end = Pz), (t = 4);
        break;
      case "utf8":
        (this.fillLast = Iz), (t = 4);
        break;
      case "base64":
        (this.text = Bz), (this.end = kz), (t = 3);
        break;
      default:
        (this.write = jz), (this.end = Uz);
        return;
    }
    (this.lastNeed = 0),
      (this.lastTotal = 0),
      (this.lastChar = j0.allocUnsafe(t));
  }
  Uo.prototype.write = function (e) {
    if (e.length === 0) return "";
    var t, r;
    if (this.lastNeed) {
      if (((t = this.fillLast(e)), t === void 0)) return "";
      (r = this.lastNeed), (this.lastNeed = 0);
    } else r = 0;
    return r < e.length ? (t ? t + this.text(e, r) : this.text(e, r)) : t || "";
  };
  Uo.prototype.end = Lz;
  Uo.prototype.text = Mz;
  Uo.prototype.fillLast = function (e) {
    if (this.lastNeed <= e.length)
      return (
        e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed),
        this.lastChar.toString(this.encoding, 0, this.lastTotal)
      );
    e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length),
      (this.lastNeed -= e.length);
  };
  function k0(e) {
    return e <= 127
      ? 0
      : e >> 5 === 6
      ? 2
      : e >> 4 === 14
      ? 3
      : e >> 3 === 30
      ? 4
      : e >> 6 === 2
      ? -1
      : -2;
  }
  function Az(e, t, r) {
    var i = t.length - 1;
    if (i < r) return 0;
    var n = k0(t[i]);
    return n >= 0
      ? (n > 0 && (e.lastNeed = n - 1), n)
      : --i < r || n === -2
      ? 0
      : ((n = k0(t[i])),
        n >= 0
          ? (n > 0 && (e.lastNeed = n - 2), n)
          : --i < r || n === -2
          ? 0
          : ((n = k0(t[i])),
            n >= 0
              ? (n > 0 && (n === 2 ? (n = 0) : (e.lastNeed = n - 3)), n)
              : 0));
  }
  function Nz(e, t, r) {
    if ((t[0] & 192) !== 128) return (e.lastNeed = 0), "\uFFFD";
    if (e.lastNeed > 1 && t.length > 1) {
      if ((t[1] & 192) !== 128) return (e.lastNeed = 1), "\uFFFD";
      if (e.lastNeed > 2 && t.length > 2 && (t[2] & 192) !== 128)
        return (e.lastNeed = 2), "\uFFFD";
    }
  }
  function Iz(e) {
    var t = this.lastTotal - this.lastNeed,
      r = Nz(this, e, t);
    if (r !== void 0) return r;
    if (this.lastNeed <= e.length)
      return (
        e.copy(this.lastChar, t, 0, this.lastNeed),
        this.lastChar.toString(this.encoding, 0, this.lastTotal)
      );
    e.copy(this.lastChar, t, 0, e.length), (this.lastNeed -= e.length);
  }
  function Mz(e, t) {
    var r = Az(this, e, t);
    if (!this.lastNeed) return e.toString("utf8", t);
    this.lastTotal = r;
    var i = e.length - (r - this.lastNeed);
    return e.copy(this.lastChar, 0, i), e.toString("utf8", t, i);
  }
  function Lz(e) {
    var t = e && e.length ? this.write(e) : "";
    return this.lastNeed ? t + "\uFFFD" : t;
  }
  function qz(e, t) {
    if ((e.length - t) % 2 === 0) {
      var r = e.toString("utf16le", t);
      if (r) {
        var i = r.charCodeAt(r.length - 1);
        if (i >= 55296 && i <= 56319)
          return (
            (this.lastNeed = 2),
            (this.lastTotal = 4),
            (this.lastChar[0] = e[e.length - 2]),
            (this.lastChar[1] = e[e.length - 1]),
            r.slice(0, -1)
          );
      }
      return r;
    }
    return (
      (this.lastNeed = 1),
      (this.lastTotal = 2),
      (this.lastChar[0] = e[e.length - 1]),
      e.toString("utf16le", t, e.length - 1)
    );
  }
  function Pz(e) {
    var t = e && e.length ? this.write(e) : "";
    if (this.lastNeed) {
      var r = this.lastTotal - this.lastNeed;
      return t + this.lastChar.toString("utf16le", 0, r);
    }
    return t;
  }
  function Bz(e, t) {
    var r = (e.length - t) % 3;
    return r === 0
      ? e.toString("base64", t)
      : ((this.lastNeed = 3 - r),
        (this.lastTotal = 3),
        r === 1
          ? (this.lastChar[0] = e[e.length - 1])
          : ((this.lastChar[0] = e[e.length - 2]),
            (this.lastChar[1] = e[e.length - 1])),
        e.toString("base64", t, e.length - r));
  }
  function kz(e) {
    var t = e && e.length ? this.write(e) : "";
    return this.lastNeed
      ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed)
      : t;
  }
  function jz(e) {
    return e.toString(this.encoding);
  }
  function Uz(e) {
    return e && e.length ? this.write(e) : "";
  }
});
var B0 = y((yee, tF) => {
  "use strict";
  var Ys = Gr();
  tF.exports = _e;
  var zz = a0(),
    zo;
  _e.ReadableState = ZT;
  var gee = require("events").EventEmitter,
    VT = function (e, t) {
      return e.listeners(t).length;
    },
    H0 = R0(),
    $o = Po().Buffer,
    $z = global.Uint8Array || function () {};
  function Wz(e) {
    return $o.from(e);
  }
  function Gz(e) {
    return $o.isBuffer(e) || e instanceof $z;
  }
  var YT = Object.create(ar());
  YT.inherits = je();
  var z0 = require("util"),
    pe = void 0;
  z0 && z0.debuglog ? (pe = z0.debuglog("stream")) : (pe = function () {});
  var Hz = CT(),
    XT = I0(),
    Vs;
  YT.inherits(_e, H0);
  var $0 = ["error", "close", "destroy", "pause", "resume"];
  function Vz(e, t, r) {
    if (typeof e.prependListener == "function") return e.prependListener(t, r);
    !e._events || !e._events[t]
      ? e.on(t, r)
      : zz(e._events[t])
      ? e._events[t].unshift(r)
      : (e._events[t] = [r, e._events[t]]);
  }
  function ZT(e, t) {
    (zo = zo || Nn()), (e = e || {});
    var r = t instanceof zo;
    (this.objectMode = !!e.objectMode),
      r && (this.objectMode = this.objectMode || !!e.readableObjectMode);
    var i = e.highWaterMark,
      n = e.readableHighWaterMark,
      s = this.objectMode ? 16 : 16 * 1024;
    i || i === 0
      ? (this.highWaterMark = i)
      : r && (n || n === 0)
      ? (this.highWaterMark = n)
      : (this.highWaterMark = s),
      (this.highWaterMark = Math.floor(this.highWaterMark)),
      (this.buffer = new Hz()),
      (this.length = 0),
      (this.pipes = null),
      (this.pipesCount = 0),
      (this.flowing = null),
      (this.ended = !1),
      (this.endEmitted = !1),
      (this.reading = !1),
      (this.sync = !0),
      (this.needReadable = !1),
      (this.emittedReadable = !1),
      (this.readableListening = !1),
      (this.resumeScheduled = !1),
      (this.destroyed = !1),
      (this.defaultEncoding = e.defaultEncoding || "utf8"),
      (this.awaitDrain = 0),
      (this.readingMore = !1),
      (this.decoder = null),
      (this.encoding = null),
      e.encoding &&
        (Vs || (Vs = U0().StringDecoder),
        (this.decoder = new Vs(e.encoding)),
        (this.encoding = e.encoding));
  }
  function _e(e) {
    if (((zo = zo || Nn()), !(this instanceof _e))) return new _e(e);
    (this._readableState = new ZT(e, this)),
      (this.readable = !0),
      e &&
        (typeof e.read == "function" && (this._read = e.read),
        typeof e.destroy == "function" && (this._destroy = e.destroy)),
      H0.call(this);
  }
  Object.defineProperty(_e.prototype, "destroyed", {
    get: function () {
      return this._readableState === void 0
        ? !1
        : this._readableState.destroyed;
    },
    set: function (e) {
      !this._readableState || (this._readableState.destroyed = e);
    },
  });
  _e.prototype.destroy = XT.destroy;
  _e.prototype._undestroy = XT.undestroy;
  _e.prototype._destroy = function (e, t) {
    this.push(null), t(e);
  };
  _e.prototype.push = function (e, t) {
    var r = this._readableState,
      i;
    return (
      r.objectMode
        ? (i = !0)
        : typeof e == "string" &&
          ((t = t || r.defaultEncoding),
          t !== r.encoding && ((e = $o.from(e, t)), (t = "")),
          (i = !0)),
      KT(this, e, t, !1, i)
    );
  };
  _e.prototype.unshift = function (e) {
    return KT(this, e, null, !0, !1);
  };
  function KT(e, t, r, i, n) {
    var s = e._readableState;
    if (t === null) (s.reading = !1), Kz(e, s);
    else {
      var a;
      n || (a = Yz(s, t)),
        a
          ? e.emit("error", a)
          : s.objectMode || (t && t.length > 0)
          ? (typeof t != "string" &&
              !s.objectMode &&
              Object.getPrototypeOf(t) !== $o.prototype &&
              (t = Wz(t)),
            i
              ? s.endEmitted
                ? e.emit("error", new Error("stream.unshift() after end event"))
                : W0(e, s, t, !0)
              : s.ended
              ? e.emit("error", new Error("stream.push() after EOF"))
              : ((s.reading = !1),
                s.decoder && !r
                  ? ((t = s.decoder.write(t)),
                    s.objectMode || t.length !== 0 ? W0(e, s, t, !1) : QT(e, s))
                  : W0(e, s, t, !1)))
          : i || (s.reading = !1);
    }
    return Xz(s);
  }
  function W0(e, t, r, i) {
    t.flowing && t.length === 0 && !t.sync
      ? (e.emit("data", r), e.read(0))
      : ((t.length += t.objectMode ? 1 : r.length),
        i ? t.buffer.unshift(r) : t.buffer.push(r),
        t.needReadable && Ph(e)),
      QT(e, t);
  }
  function Yz(e, t) {
    var r;
    return (
      !Gz(t) &&
        typeof t != "string" &&
        t !== void 0 &&
        !e.objectMode &&
        (r = new TypeError("Invalid non-string/buffer chunk")),
      r
    );
  }
  function Xz(e) {
    return (
      !e.ended &&
      (e.needReadable || e.length < e.highWaterMark || e.length === 0)
    );
  }
  _e.prototype.isPaused = function () {
    return this._readableState.flowing === !1;
  };
  _e.prototype.setEncoding = function (e) {
    return (
      Vs || (Vs = U0().StringDecoder),
      (this._readableState.decoder = new Vs(e)),
      (this._readableState.encoding = e),
      this
    );
  };
  var WT = 8388608;
  function Zz(e) {
    return (
      e >= WT
        ? (e = WT)
        : (e--,
          (e |= e >>> 1),
          (e |= e >>> 2),
          (e |= e >>> 4),
          (e |= e >>> 8),
          (e |= e >>> 16),
          e++),
      e
    );
  }
  function GT(e, t) {
    return e <= 0 || (t.length === 0 && t.ended)
      ? 0
      : t.objectMode
      ? 1
      : e !== e
      ? t.flowing && t.length
        ? t.buffer.head.data.length
        : t.length
      : (e > t.highWaterMark && (t.highWaterMark = Zz(e)),
        e <= t.length ? e : t.ended ? t.length : ((t.needReadable = !0), 0));
  }
  _e.prototype.read = function (e) {
    pe("read", e), (e = parseInt(e, 10));
    var t = this._readableState,
      r = e;
    if (
      (e !== 0 && (t.emittedReadable = !1),
      e === 0 && t.needReadable && (t.length >= t.highWaterMark || t.ended))
    )
      return (
        pe("read: emitReadable", t.length, t.ended),
        t.length === 0 && t.ended ? G0(this) : Ph(this),
        null
      );
    if (((e = GT(e, t)), e === 0 && t.ended))
      return t.length === 0 && G0(this), null;
    var i = t.needReadable;
    pe("need readable", i),
      (t.length === 0 || t.length - e < t.highWaterMark) &&
        ((i = !0), pe("length less than watermark", i)),
      t.ended || t.reading
        ? ((i = !1), pe("reading or ended", i))
        : i &&
          (pe("do read"),
          (t.reading = !0),
          (t.sync = !0),
          t.length === 0 && (t.needReadable = !0),
          this._read(t.highWaterMark),
          (t.sync = !1),
          t.reading || (e = GT(r, t)));
    var n;
    return (
      e > 0 ? (n = JT(e, t)) : (n = null),
      n === null ? ((t.needReadable = !0), (e = 0)) : (t.length -= e),
      t.length === 0 &&
        (t.ended || (t.needReadable = !0), r !== e && t.ended && G0(this)),
      n !== null && this.emit("data", n),
      n
    );
  };
  function Kz(e, t) {
    if (!t.ended) {
      if (t.decoder) {
        var r = t.decoder.end();
        r &&
          r.length &&
          (t.buffer.push(r), (t.length += t.objectMode ? 1 : r.length));
      }
      (t.ended = !0), Ph(e);
    }
  }
  function Ph(e) {
    var t = e._readableState;
    (t.needReadable = !1),
      t.emittedReadable ||
        (pe("emitReadable", t.flowing),
        (t.emittedReadable = !0),
        t.sync ? Ys.nextTick(HT, e) : HT(e));
  }
  function HT(e) {
    pe("emit readable"), e.emit("readable"), V0(e);
  }
  function QT(e, t) {
    t.readingMore || ((t.readingMore = !0), Ys.nextTick(Qz, e, t));
  }
  function Qz(e, t) {
    for (
      var r = t.length;
      !t.reading &&
      !t.flowing &&
      !t.ended &&
      t.length < t.highWaterMark &&
      (pe("maybeReadMore read 0"), e.read(0), r !== t.length);

    )
      r = t.length;
    t.readingMore = !1;
  }
  _e.prototype._read = function (e) {
    this.emit("error", new Error("_read() is not implemented"));
  };
  _e.prototype.pipe = function (e, t) {
    var r = this,
      i = this._readableState;
    switch (i.pipesCount) {
      case 0:
        i.pipes = e;
        break;
      case 1:
        i.pipes = [i.pipes, e];
        break;
      default:
        i.pipes.push(e);
        break;
    }
    (i.pipesCount += 1), pe("pipe count=%d opts=%j", i.pipesCount, t);
    var n =
        (!t || t.end !== !1) && e !== process.stdout && e !== process.stderr,
      s = n ? o : E;
    i.endEmitted ? Ys.nextTick(s) : r.once("end", s), e.on("unpipe", a);
    function a(O, L) {
      pe("onunpipe"),
        O === r && L && L.hasUnpiped === !1 && ((L.hasUnpiped = !0), f());
    }
    function o() {
      pe("onend"), e.end();
    }
    var u = Jz(r);
    e.on("drain", u);
    var l = !1;
    function f() {
      pe("cleanup"),
        e.removeListener("close", m),
        e.removeListener("finish", C),
        e.removeListener("drain", u),
        e.removeListener("error", d),
        e.removeListener("unpipe", a),
        r.removeListener("end", o),
        r.removeListener("end", E),
        r.removeListener("data", c),
        (l = !0),
        i.awaitDrain &&
          (!e._writableState || e._writableState.needDrain) &&
          u();
    }
    var h = !1;
    r.on("data", c);
    function c(O) {
      pe("ondata"), (h = !1);
      var L = e.write(O);
      L === !1 &&
        !h &&
        (((i.pipesCount === 1 && i.pipes === e) ||
          (i.pipesCount > 1 && eF(i.pipes, e) !== -1)) &&
          !l &&
          (pe("false write response, pause", r._readableState.awaitDrain),
          r._readableState.awaitDrain++,
          (h = !0)),
        r.pause());
    }
    function d(O) {
      pe("onerror", O),
        E(),
        e.removeListener("error", d),
        VT(e, "error") === 0 && e.emit("error", O);
    }
    Vz(e, "error", d);
    function m() {
      e.removeListener("finish", C), E();
    }
    e.once("close", m);
    function C() {
      pe("onfinish"), e.removeListener("close", m), E();
    }
    e.once("finish", C);
    function E() {
      pe("unpipe"), r.unpipe(e);
    }
    return e.emit("pipe", r), i.flowing || (pe("pipe resume"), r.resume()), e;
  };
  function Jz(e) {
    return function () {
      var t = e._readableState;
      pe("pipeOnDrain", t.awaitDrain),
        t.awaitDrain && t.awaitDrain--,
        t.awaitDrain === 0 && VT(e, "data") && ((t.flowing = !0), V0(e));
    };
  }
  _e.prototype.unpipe = function (e) {
    var t = this._readableState,
      r = { hasUnpiped: !1 };
    if (t.pipesCount === 0) return this;
    if (t.pipesCount === 1)
      return e && e !== t.pipes
        ? this
        : (e || (e = t.pipes),
          (t.pipes = null),
          (t.pipesCount = 0),
          (t.flowing = !1),
          e && e.emit("unpipe", this, r),
          this);
    if (!e) {
      var i = t.pipes,
        n = t.pipesCount;
      (t.pipes = null), (t.pipesCount = 0), (t.flowing = !1);
      for (var s = 0; s < n; s++) i[s].emit("unpipe", this, r);
      return this;
    }
    var a = eF(t.pipes, e);
    return a === -1
      ? this
      : (t.pipes.splice(a, 1),
        (t.pipesCount -= 1),
        t.pipesCount === 1 && (t.pipes = t.pipes[0]),
        e.emit("unpipe", this, r),
        this);
  };
  _e.prototype.on = function (e, t) {
    var r = H0.prototype.on.call(this, e, t);
    if (e === "data") this._readableState.flowing !== !1 && this.resume();
    else if (e === "readable") {
      var i = this._readableState;
      !i.endEmitted &&
        !i.readableListening &&
        ((i.readableListening = i.needReadable = !0),
        (i.emittedReadable = !1),
        i.reading ? i.length && Ph(this) : Ys.nextTick(e$, this));
    }
    return r;
  };
  _e.prototype.addListener = _e.prototype.on;
  function e$(e) {
    pe("readable nexttick read 0"), e.read(0);
  }
  _e.prototype.resume = function () {
    var e = this._readableState;
    return e.flowing || (pe("resume"), (e.flowing = !0), t$(this, e)), this;
  };
  function t$(e, t) {
    t.resumeScheduled || ((t.resumeScheduled = !0), Ys.nextTick(r$, e, t));
  }
  function r$(e, t) {
    t.reading || (pe("resume read 0"), e.read(0)),
      (t.resumeScheduled = !1),
      (t.awaitDrain = 0),
      e.emit("resume"),
      V0(e),
      t.flowing && !t.reading && e.read(0);
  }
  _e.prototype.pause = function () {
    return (
      pe("call pause flowing=%j", this._readableState.flowing),
      this._readableState.flowing !== !1 &&
        (pe("pause"), (this._readableState.flowing = !1), this.emit("pause")),
      this
    );
  };
  function V0(e) {
    var t = e._readableState;
    for (pe("flow", t.flowing); t.flowing && e.read() !== null; );
  }
  _e.prototype.wrap = function (e) {
    var t = this,
      r = this._readableState,
      i = !1;
    e.on("end", function () {
      if ((pe("wrapped end"), r.decoder && !r.ended)) {
        var a = r.decoder.end();
        a && a.length && t.push(a);
      }
      t.push(null);
    }),
      e.on("data", function (a) {
        if (
          (pe("wrapped data"),
          r.decoder && (a = r.decoder.write(a)),
          !(r.objectMode && a == null) && !(!r.objectMode && (!a || !a.length)))
        ) {
          var o = t.push(a);
          o || ((i = !0), e.pause());
        }
      });
    for (var n in e)
      this[n] === void 0 &&
        typeof e[n] == "function" &&
        (this[n] = (function (a) {
          return function () {
            return e[a].apply(e, arguments);
          };
        })(n));
    for (var s = 0; s < $0.length; s++)
      e.on($0[s], this.emit.bind(this, $0[s]));
    return (
      (this._read = function (a) {
        pe("wrapped _read", a), i && ((i = !1), e.resume());
      }),
      this
    );
  };
  Object.defineProperty(_e.prototype, "readableHighWaterMark", {
    enumerable: !1,
    get: function () {
      return this._readableState.highWaterMark;
    },
  });
  _e._fromList = JT;
  function JT(e, t) {
    if (t.length === 0) return null;
    var r;
    return (
      t.objectMode
        ? (r = t.buffer.shift())
        : !e || e >= t.length
        ? (t.decoder
            ? (r = t.buffer.join(""))
            : t.buffer.length === 1
            ? (r = t.buffer.head.data)
            : (r = t.buffer.concat(t.length)),
          t.buffer.clear())
        : (r = i$(e, t.buffer, t.decoder)),
      r
    );
  }
  function i$(e, t, r) {
    var i;
    return (
      e < t.head.data.length
        ? ((i = t.head.data.slice(0, e)), (t.head.data = t.head.data.slice(e)))
        : e === t.head.data.length
        ? (i = t.shift())
        : (i = r ? n$(e, t) : s$(e, t)),
      i
    );
  }
  function n$(e, t) {
    var r = t.head,
      i = 1,
      n = r.data;
    for (e -= n.length; (r = r.next); ) {
      var s = r.data,
        a = e > s.length ? s.length : e;
      if (
        (a === s.length ? (n += s) : (n += s.slice(0, e)), (e -= a), e === 0)
      ) {
        a === s.length
          ? (++i, r.next ? (t.head = r.next) : (t.head = t.tail = null))
          : ((t.head = r), (r.data = s.slice(a)));
        break;
      }
      ++i;
    }
    return (t.length -= i), n;
  }
  function s$(e, t) {
    var r = $o.allocUnsafe(e),
      i = t.head,
      n = 1;
    for (i.data.copy(r), e -= i.data.length; (i = i.next); ) {
      var s = i.data,
        a = e > s.length ? s.length : e;
      if ((s.copy(r, r.length - e, 0, a), (e -= a), e === 0)) {
        a === s.length
          ? (++n, i.next ? (t.head = i.next) : (t.head = t.tail = null))
          : ((t.head = i), (i.data = s.slice(a)));
        break;
      }
      ++n;
    }
    return (t.length -= n), r;
  }
  function G0(e) {
    var t = e._readableState;
    if (t.length > 0)
      throw new Error('"endReadable()" called on non-empty stream');
    t.endEmitted || ((t.ended = !0), Ys.nextTick(a$, t, e));
  }
  function a$(e, t) {
    !e.endEmitted &&
      e.length === 0 &&
      ((e.endEmitted = !0), (t.readable = !1), t.emit("end"));
  }
  function eF(e, t) {
    for (var r = 0, i = e.length; r < i; r++) if (e[r] === t) return r;
    return -1;
  }
});
var Y0 = y((vee, nF) => {
  "use strict";
  nF.exports = Kr;
  var Bh = Nn(),
    iF = Object.create(ar());
  iF.inherits = je();
  iF.inherits(Kr, Bh);
  function o$(e, t) {
    var r = this._transformState;
    r.transforming = !1;
    var i = r.writecb;
    if (!i)
      return this.emit(
        "error",
        new Error("write callback called multiple times"),
      );
    (r.writechunk = null), (r.writecb = null), t != null && this.push(t), i(e);
    var n = this._readableState;
    (n.reading = !1),
      (n.needReadable || n.length < n.highWaterMark) &&
        this._read(n.highWaterMark);
  }
  function Kr(e) {
    if (!(this instanceof Kr)) return new Kr(e);
    Bh.call(this, e),
      (this._transformState = {
        afterTransform: o$.bind(this),
        needTransform: !1,
        transforming: !1,
        writecb: null,
        writechunk: null,
        writeencoding: null,
      }),
      (this._readableState.needReadable = !0),
      (this._readableState.sync = !1),
      e &&
        (typeof e.transform == "function" && (this._transform = e.transform),
        typeof e.flush == "function" && (this._flush = e.flush)),
      this.on("prefinish", u$);
  }
  function u$() {
    var e = this;
    typeof this._flush == "function"
      ? this._flush(function (t, r) {
          rF(e, t, r);
        })
      : rF(this, null, null);
  }
  Kr.prototype.push = function (e, t) {
    return (
      (this._transformState.needTransform = !1),
      Bh.prototype.push.call(this, e, t)
    );
  };
  Kr.prototype._transform = function (e, t, r) {
    throw new Error("_transform() is not implemented");
  };
  Kr.prototype._write = function (e, t, r) {
    var i = this._transformState;
    if (
      ((i.writecb = r),
      (i.writechunk = e),
      (i.writeencoding = t),
      !i.transforming)
    ) {
      var n = this._readableState;
      (i.needTransform || n.needReadable || n.length < n.highWaterMark) &&
        this._read(n.highWaterMark);
    }
  };
  Kr.prototype._read = function (e) {
    var t = this._transformState;
    t.writechunk !== null && t.writecb && !t.transforming
      ? ((t.transforming = !0),
        this._transform(t.writechunk, t.writeencoding, t.afterTransform))
      : (t.needTransform = !0);
  };
  Kr.prototype._destroy = function (e, t) {
    var r = this;
    Bh.prototype._destroy.call(this, e, function (i) {
      t(i), r.emit("close");
    });
  };
  function rF(e, t, r) {
    if (t) return e.emit("error", t);
    if ((r != null && e.push(r), e._writableState.length))
      throw new Error("Calling transform done when ws.length != 0");
    if (e._transformState.transforming)
      throw new Error("Calling transform done when still transforming");
    return e.push(null);
  }
});
var uF = y((wee, oF) => {
  "use strict";
  oF.exports = Wo;
  var sF = Y0(),
    aF = Object.create(ar());
  aF.inherits = je();
  aF.inherits(Wo, sF);
  function Wo(e) {
    if (!(this instanceof Wo)) return new Wo(e);
    sF.call(this, e);
  }
  Wo.prototype._transform = function (e, t, r) {
    r(null, e);
  };
});
var lF = y((et, kh) => {
  var Er = require("stream");
  process.env.READABLE_STREAM === "disable" && Er
    ? ((kh.exports = Er),
      (et = kh.exports = Er.Readable),
      (et.Readable = Er.Readable),
      (et.Writable = Er.Writable),
      (et.Duplex = Er.Duplex),
      (et.Transform = Er.Transform),
      (et.PassThrough = Er.PassThrough),
      (et.Stream = Er))
    : ((et = kh.exports = B0()),
      (et.Stream = Er || et),
      (et.Readable = et),
      (et.Writable = L0()),
      (et.Duplex = Nn()),
      (et.Transform = Y0()),
      (et.PassThrough = uF()));
});
var mF = y((Dee, pF) => {
  var l$ = 9007199254740991,
    f$ = "[object Arguments]",
    h$ = "[object Function]",
    c$ = "[object GeneratorFunction]",
    d$ =
      typeof global == "object" && global && global.Object === Object && global,
    p$ = typeof self == "object" && self && self.Object === Object && self,
    m$ = d$ || p$ || Function("return this")();
  function g$(e, t) {
    for (var r = -1, i = t.length, n = e.length; ++r < i; ) e[n + r] = t[r];
    return e;
  }
  var X0 = Object.prototype,
    y$ = X0.hasOwnProperty,
    cF = X0.toString,
    fF = m$.Symbol,
    v$ = X0.propertyIsEnumerable,
    hF = fF ? fF.isConcatSpreadable : void 0;
  function dF(e, t, r, i, n) {
    var s = -1,
      a = e.length;
    for (r || (r = w$), n || (n = []); ++s < a; ) {
      var o = e[s];
      t > 0 && r(o)
        ? t > 1
          ? dF(o, t - 1, r, i, n)
          : g$(n, o)
        : i || (n[n.length] = o);
    }
    return n;
  }
  function w$(e) {
    return E$(e) || b$(e) || !!(hF && e && e[hF]);
  }
  function D$(e) {
    var t = e ? e.length : 0;
    return t ? dF(e, 1) : [];
  }
  function b$(e) {
    return (
      S$(e) &&
      y$.call(e, "callee") &&
      (!v$.call(e, "callee") || cF.call(e) == f$)
    );
  }
  var E$ = Array.isArray;
  function _$(e) {
    return e != null && C$(e.length) && !x$(e);
  }
  function S$(e) {
    return T$(e) && _$(e);
  }
  function x$(e) {
    var t = O$(e) ? cF.call(e) : "";
    return t == h$ || t == c$;
  }
  function C$(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= l$;
  }
  function O$(e) {
    var t = typeof e;
    return !!e && (t == "object" || t == "function");
  }
  function T$(e) {
    return !!e && typeof e == "object";
  }
  pF.exports = D$;
});
var OF = y((bee, CF) => {
  var F$ = 200,
    Q0 = "__lodash_hash_undefined__",
    R$ = 9007199254740991,
    A$ = "[object Arguments]",
    N$ = "[object Function]",
    I$ = "[object GeneratorFunction]",
    M$ = /[\\^$.*+?()[\]{}|]/g,
    L$ = /^\[object .+?Constructor\]$/,
    q$ =
      typeof global == "object" && global && global.Object === Object && global,
    P$ = typeof self == "object" && self && self.Object === Object && self,
    J0 = q$ || P$ || Function("return this")();
  function B$(e, t, r) {
    switch (r.length) {
      case 0:
        return e.call(t);
      case 1:
        return e.call(t, r[0]);
      case 2:
        return e.call(t, r[0], r[1]);
      case 3:
        return e.call(t, r[0], r[1], r[2]);
    }
    return e.apply(t, r);
  }
  function k$(e, t) {
    var r = e ? e.length : 0;
    return !!r && W$(e, t, 0) > -1;
  }
  function j$(e, t, r) {
    for (var i = -1, n = e ? e.length : 0; ++i < n; ) if (r(t, e[i])) return !0;
    return !1;
  }
  function U$(e, t) {
    for (var r = -1, i = e ? e.length : 0, n = Array(i); ++r < i; )
      n[r] = t(e[r], r, e);
    return n;
  }
  function z$(e, t) {
    for (var r = -1, i = t.length, n = e.length; ++r < i; ) e[n + r] = t[r];
    return e;
  }
  function $$(e, t, r, i) {
    for (var n = e.length, s = r + (i ? 1 : -1); i ? s-- : ++s < n; )
      if (t(e[s], s, e)) return s;
    return -1;
  }
  function W$(e, t, r) {
    if (t !== t) return $$(e, G$, r);
    for (var i = r - 1, n = e.length; ++i < n; ) if (e[i] === t) return i;
    return -1;
  }
  function G$(e) {
    return e !== e;
  }
  function H$(e) {
    return function (t) {
      return e(t);
    };
  }
  function V$(e, t) {
    return e.has(t);
  }
  function Y$(e, t) {
    return e?.[t];
  }
  function X$(e) {
    var t = !1;
    if (e != null && typeof e.toString != "function")
      try {
        t = !!(e + "");
      } catch {}
    return t;
  }
  var Z$ = Array.prototype,
    K$ = Function.prototype,
    ey = Object.prototype,
    Z0 = J0["__core-js_shared__"],
    gF = (function () {
      var e = /[^.]+$/.exec((Z0 && Z0.keys && Z0.keys.IE_PROTO) || "");
      return e ? "Symbol(src)_1." + e : "";
    })(),
    DF = K$.toString,
    Uh = ey.hasOwnProperty,
    bF = ey.toString,
    Q$ = RegExp(
      "^" +
        DF.call(Uh)
          .replace(M$, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?",
          ) +
        "$",
    ),
    yF = J0.Symbol,
    J$ = ey.propertyIsEnumerable,
    eW = Z$.splice,
    vF = yF ? yF.isConcatSpreadable : void 0,
    wF = Math.max,
    tW = _F(J0, "Map"),
    Go = _F(Object, "create");
  function In(e) {
    var t = -1,
      r = e ? e.length : 0;
    for (this.clear(); ++t < r; ) {
      var i = e[t];
      this.set(i[0], i[1]);
    }
  }
  function rW() {
    this.__data__ = Go ? Go(null) : {};
  }
  function iW(e) {
    return this.has(e) && delete this.__data__[e];
  }
  function nW(e) {
    var t = this.__data__;
    if (Go) {
      var r = t[e];
      return r === Q0 ? void 0 : r;
    }
    return Uh.call(t, e) ? t[e] : void 0;
  }
  function sW(e) {
    var t = this.__data__;
    return Go ? t[e] !== void 0 : Uh.call(t, e);
  }
  function aW(e, t) {
    var r = this.__data__;
    return (r[e] = Go && t === void 0 ? Q0 : t), this;
  }
  In.prototype.clear = rW;
  In.prototype.delete = iW;
  In.prototype.get = nW;
  In.prototype.has = sW;
  In.prototype.set = aW;
  function Xs(e) {
    var t = -1,
      r = e ? e.length : 0;
    for (this.clear(); ++t < r; ) {
      var i = e[t];
      this.set(i[0], i[1]);
    }
  }
  function oW() {
    this.__data__ = [];
  }
  function uW(e) {
    var t = this.__data__,
      r = zh(t, e);
    if (r < 0) return !1;
    var i = t.length - 1;
    return r == i ? t.pop() : eW.call(t, r, 1), !0;
  }
  function lW(e) {
    var t = this.__data__,
      r = zh(t, e);
    return r < 0 ? void 0 : t[r][1];
  }
  function fW(e) {
    return zh(this.__data__, e) > -1;
  }
  function hW(e, t) {
    var r = this.__data__,
      i = zh(r, e);
    return i < 0 ? r.push([e, t]) : (r[i][1] = t), this;
  }
  Xs.prototype.clear = oW;
  Xs.prototype.delete = uW;
  Xs.prototype.get = lW;
  Xs.prototype.has = fW;
  Xs.prototype.set = hW;
  function Zs(e) {
    var t = -1,
      r = e ? e.length : 0;
    for (this.clear(); ++t < r; ) {
      var i = e[t];
      this.set(i[0], i[1]);
    }
  }
  function cW() {
    this.__data__ = { hash: new In(), map: new (tW || Xs)(), string: new In() };
  }
  function dW(e) {
    return $h(this, e).delete(e);
  }
  function pW(e) {
    return $h(this, e).get(e);
  }
  function mW(e) {
    return $h(this, e).has(e);
  }
  function gW(e, t) {
    return $h(this, e).set(e, t), this;
  }
  Zs.prototype.clear = cW;
  Zs.prototype.delete = dW;
  Zs.prototype.get = pW;
  Zs.prototype.has = mW;
  Zs.prototype.set = gW;
  function jh(e) {
    var t = -1,
      r = e ? e.length : 0;
    for (this.__data__ = new Zs(); ++t < r; ) this.add(e[t]);
  }
  function yW(e) {
    return this.__data__.set(e, Q0), this;
  }
  function vW(e) {
    return this.__data__.has(e);
  }
  jh.prototype.add = jh.prototype.push = yW;
  jh.prototype.has = vW;
  function zh(e, t) {
    for (var r = e.length; r--; ) if (OW(e[r][0], t)) return r;
    return -1;
  }
  function wW(e, t, r, i) {
    var n = -1,
      s = k$,
      a = !0,
      o = e.length,
      u = [],
      l = t.length;
    if (!o) return u;
    r && (t = U$(t, H$(r))),
      i
        ? ((s = j$), (a = !1))
        : t.length >= F$ && ((s = V$), (a = !1), (t = new jh(t)));
    e: for (; ++n < o; ) {
      var f = e[n],
        h = r ? r(f) : f;
      if (((f = i || f !== 0 ? f : 0), a && h === h)) {
        for (var c = l; c--; ) if (t[c] === h) continue e;
        u.push(f);
      } else s(t, h, i) || u.push(f);
    }
    return u;
  }
  function EF(e, t, r, i, n) {
    var s = -1,
      a = e.length;
    for (r || (r = EW), n || (n = []); ++s < a; ) {
      var o = e[s];
      t > 0 && r(o)
        ? t > 1
          ? EF(o, t - 1, r, i, n)
          : z$(n, o)
        : i || (n[n.length] = o);
    }
    return n;
  }
  function DW(e) {
    if (!xF(e) || SW(e)) return !1;
    var t = SF(e) || X$(e) ? Q$ : L$;
    return t.test(xW(e));
  }
  function bW(e, t) {
    return (
      (t = wF(t === void 0 ? e.length - 1 : t, 0)),
      function () {
        for (
          var r = arguments, i = -1, n = wF(r.length - t, 0), s = Array(n);
          ++i < n;

        )
          s[i] = r[t + i];
        i = -1;
        for (var a = Array(t + 1); ++i < t; ) a[i] = r[i];
        return (a[t] = s), B$(e, this, a);
      }
    );
  }
  function $h(e, t) {
    var r = e.__data__;
    return _W(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
  }
  function _F(e, t) {
    var r = Y$(e, t);
    return DW(r) ? r : void 0;
  }
  function EW(e) {
    return FW(e) || TW(e) || !!(vF && e && e[vF]);
  }
  function _W(e) {
    var t = typeof e;
    return t == "string" || t == "number" || t == "symbol" || t == "boolean"
      ? e !== "__proto__"
      : e === null;
  }
  function SW(e) {
    return !!gF && gF in e;
  }
  function xW(e) {
    if (e != null) {
      try {
        return DF.call(e);
      } catch {}
      try {
        return e + "";
      } catch {}
    }
    return "";
  }
  var CW = bW(function (e, t) {
    return K0(e) ? wW(e, EF(t, 1, K0, !0)) : [];
  });
  function OW(e, t) {
    return e === t || (e !== e && t !== t);
  }
  function TW(e) {
    return (
      K0(e) &&
      Uh.call(e, "callee") &&
      (!J$.call(e, "callee") || bF.call(e) == A$)
    );
  }
  var FW = Array.isArray;
  function RW(e) {
    return e != null && AW(e.length) && !SF(e);
  }
  function K0(e) {
    return NW(e) && RW(e);
  }
  function SF(e) {
    var t = xF(e) ? bF.call(e) : "";
    return t == N$ || t == I$;
  }
  function AW(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= R$;
  }
  function xF(e) {
    var t = typeof e;
    return !!e && (t == "object" || t == "function");
  }
  function NW(e) {
    return !!e && typeof e == "object";
  }
  CF.exports = CW;
});
var jF = y((Eee, kF) => {
  var IW = 200,
    iy = "__lodash_hash_undefined__",
    MW = 1 / 0,
    LW = 9007199254740991,
    qW = "[object Arguments]",
    PW = "[object Function]",
    BW = "[object GeneratorFunction]",
    kW = /[\\^$.*+?()[\]{}|]/g,
    jW = /^\[object .+?Constructor\]$/,
    UW =
      typeof global == "object" && global && global.Object === Object && global,
    zW = typeof self == "object" && self && self.Object === Object && self,
    Gh = UW || zW || Function("return this")();
  function $W(e, t, r) {
    switch (r.length) {
      case 0:
        return e.call(t);
      case 1:
        return e.call(t, r[0]);
      case 2:
        return e.call(t, r[0], r[1]);
      case 3:
        return e.call(t, r[0], r[1], r[2]);
    }
    return e.apply(t, r);
  }
  function WW(e, t) {
    var r = e ? e.length : 0;
    return !!r && YW(e, t, 0) > -1;
  }
  function GW(e, t, r) {
    for (var i = -1, n = e ? e.length : 0; ++i < n; ) if (r(t, e[i])) return !0;
    return !1;
  }
  function HW(e, t) {
    for (var r = -1, i = t.length, n = e.length; ++r < i; ) e[n + r] = t[r];
    return e;
  }
  function VW(e, t, r, i) {
    for (var n = e.length, s = r + (i ? 1 : -1); i ? s-- : ++s < n; )
      if (t(e[s], s, e)) return s;
    return -1;
  }
  function YW(e, t, r) {
    if (t !== t) return VW(e, XW, r);
    for (var i = r - 1, n = e.length; ++i < n; ) if (e[i] === t) return i;
    return -1;
  }
  function XW(e) {
    return e !== e;
  }
  function ZW(e, t) {
    return e.has(t);
  }
  function KW(e, t) {
    return e?.[t];
  }
  function QW(e) {
    var t = !1;
    if (e != null && typeof e.toString != "function")
      try {
        t = !!(e + "");
      } catch {}
    return t;
  }
  function NF(e) {
    var t = -1,
      r = Array(e.size);
    return (
      e.forEach(function (i) {
        r[++t] = i;
      }),
      r
    );
  }
  var JW = Array.prototype,
    eG = Function.prototype,
    ny = Object.prototype,
    ty = Gh["__core-js_shared__"],
    TF = (function () {
      var e = /[^.]+$/.exec((ty && ty.keys && ty.keys.IE_PROTO) || "");
      return e ? "Symbol(src)_1." + e : "";
    })(),
    IF = eG.toString,
    Hh = ny.hasOwnProperty,
    MF = ny.toString,
    tG = RegExp(
      "^" +
        IF.call(Hh)
          .replace(kW, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?",
          ) +
        "$",
    ),
    FF = Gh.Symbol,
    rG = ny.propertyIsEnumerable,
    iG = JW.splice,
    RF = FF ? FF.isConcatSpreadable : void 0,
    AF = Math.max,
    nG = sy(Gh, "Map"),
    ry = sy(Gh, "Set"),
    Ho = sy(Object, "create");
  function Mn(e) {
    var t = -1,
      r = e ? e.length : 0;
    for (this.clear(); ++t < r; ) {
      var i = e[t];
      this.set(i[0], i[1]);
    }
  }
  function sG() {
    this.__data__ = Ho ? Ho(null) : {};
  }
  function aG(e) {
    return this.has(e) && delete this.__data__[e];
  }
  function oG(e) {
    var t = this.__data__;
    if (Ho) {
      var r = t[e];
      return r === iy ? void 0 : r;
    }
    return Hh.call(t, e) ? t[e] : void 0;
  }
  function uG(e) {
    var t = this.__data__;
    return Ho ? t[e] !== void 0 : Hh.call(t, e);
  }
  function lG(e, t) {
    var r = this.__data__;
    return (r[e] = Ho && t === void 0 ? iy : t), this;
  }
  Mn.prototype.clear = sG;
  Mn.prototype.delete = aG;
  Mn.prototype.get = oG;
  Mn.prototype.has = uG;
  Mn.prototype.set = lG;
  function Ks(e) {
    var t = -1,
      r = e ? e.length : 0;
    for (this.clear(); ++t < r; ) {
      var i = e[t];
      this.set(i[0], i[1]);
    }
  }
  function fG() {
    this.__data__ = [];
  }
  function hG(e) {
    var t = this.__data__,
      r = Vh(t, e);
    if (r < 0) return !1;
    var i = t.length - 1;
    return r == i ? t.pop() : iG.call(t, r, 1), !0;
  }
  function cG(e) {
    var t = this.__data__,
      r = Vh(t, e);
    return r < 0 ? void 0 : t[r][1];
  }
  function dG(e) {
    return Vh(this.__data__, e) > -1;
  }
  function pG(e, t) {
    var r = this.__data__,
      i = Vh(r, e);
    return i < 0 ? r.push([e, t]) : (r[i][1] = t), this;
  }
  Ks.prototype.clear = fG;
  Ks.prototype.delete = hG;
  Ks.prototype.get = cG;
  Ks.prototype.has = dG;
  Ks.prototype.set = pG;
  function Qs(e) {
    var t = -1,
      r = e ? e.length : 0;
    for (this.clear(); ++t < r; ) {
      var i = e[t];
      this.set(i[0], i[1]);
    }
  }
  function mG() {
    this.__data__ = { hash: new Mn(), map: new (nG || Ks)(), string: new Mn() };
  }
  function gG(e) {
    return Yh(this, e).delete(e);
  }
  function yG(e) {
    return Yh(this, e).get(e);
  }
  function vG(e) {
    return Yh(this, e).has(e);
  }
  function wG(e, t) {
    return Yh(this, e).set(e, t), this;
  }
  Qs.prototype.clear = mG;
  Qs.prototype.delete = gG;
  Qs.prototype.get = yG;
  Qs.prototype.has = vG;
  Qs.prototype.set = wG;
  function Wh(e) {
    var t = -1,
      r = e ? e.length : 0;
    for (this.__data__ = new Qs(); ++t < r; ) this.add(e[t]);
  }
  function DG(e) {
    return this.__data__.set(e, iy), this;
  }
  function bG(e) {
    return this.__data__.has(e);
  }
  Wh.prototype.add = Wh.prototype.push = DG;
  Wh.prototype.has = bG;
  function Vh(e, t) {
    for (var r = e.length; r--; ) if (AG(e[r][0], t)) return r;
    return -1;
  }
  function LF(e, t, r, i, n) {
    var s = -1,
      a = e.length;
    for (r || (r = CG), n || (n = []); ++s < a; ) {
      var o = e[s];
      t > 0 && r(o)
        ? t > 1
          ? LF(o, t - 1, r, i, n)
          : HW(n, o)
        : i || (n[n.length] = o);
    }
    return n;
  }
  function EG(e) {
    if (!BF(e) || TG(e)) return !1;
    var t = PF(e) || QW(e) ? tG : jW;
    return t.test(FG(e));
  }
  function _G(e, t) {
    return (
      (t = AF(t === void 0 ? e.length - 1 : t, 0)),
      function () {
        for (
          var r = arguments, i = -1, n = AF(r.length - t, 0), s = Array(n);
          ++i < n;

        )
          s[i] = r[t + i];
        i = -1;
        for (var a = Array(t + 1); ++i < t; ) a[i] = r[i];
        return (a[t] = s), $W(e, this, a);
      }
    );
  }
  function SG(e, t, r) {
    var i = -1,
      n = WW,
      s = e.length,
      a = !0,
      o = [],
      u = o;
    if (r) (a = !1), (n = GW);
    else if (s >= IW) {
      var l = t ? null : xG(e);
      if (l) return NF(l);
      (a = !1), (n = ZW), (u = new Wh());
    } else u = t ? [] : o;
    e: for (; ++i < s; ) {
      var f = e[i],
        h = t ? t(f) : f;
      if (((f = r || f !== 0 ? f : 0), a && h === h)) {
        for (var c = u.length; c--; ) if (u[c] === h) continue e;
        t && u.push(h), o.push(f);
      } else n(u, h, r) || (u !== o && u.push(h), o.push(f));
    }
    return o;
  }
  var xG =
    ry && 1 / NF(new ry([, -0]))[1] == MW
      ? function (e) {
          return new ry(e);
        }
      : PG;
  function Yh(e, t) {
    var r = e.__data__;
    return OG(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
  }
  function sy(e, t) {
    var r = KW(e, t);
    return EG(r) ? r : void 0;
  }
  function CG(e) {
    return IG(e) || NG(e) || !!(RF && e && e[RF]);
  }
  function OG(e) {
    var t = typeof e;
    return t == "string" || t == "number" || t == "symbol" || t == "boolean"
      ? e !== "__proto__"
      : e === null;
  }
  function TG(e) {
    return !!TF && TF in e;
  }
  function FG(e) {
    if (e != null) {
      try {
        return IF.call(e);
      } catch {}
      try {
        return e + "";
      } catch {}
    }
    return "";
  }
  var RG = _G(function (e) {
    return SG(LF(e, 1, qF, !0));
  });
  function AG(e, t) {
    return e === t || (e !== e && t !== t);
  }
  function NG(e) {
    return (
      qF(e) &&
      Hh.call(e, "callee") &&
      (!rG.call(e, "callee") || MF.call(e) == qW)
    );
  }
  var IG = Array.isArray;
  function MG(e) {
    return e != null && LG(e.length) && !PF(e);
  }
  function qF(e) {
    return qG(e) && MG(e);
  }
  function PF(e) {
    var t = BF(e) ? MF.call(e) : "";
    return t == PW || t == BW;
  }
  function LG(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= LW;
  }
  function BF(e) {
    var t = typeof e;
    return !!e && (t == "object" || t == "function");
  }
  function qG(e) {
    return !!e && typeof e == "object";
  }
  function PG() {}
  kF.exports = RG;
});
var WF = y((_ee, $F) => {
  var BG = "[object Object]";
  function kG(e) {
    var t = !1;
    if (e != null && typeof e.toString != "function")
      try {
        t = !!(e + "");
      } catch {}
    return t;
  }
  function jG(e, t) {
    return function (r) {
      return e(t(r));
    };
  }
  var UG = Function.prototype,
    UF = Object.prototype,
    zF = UG.toString,
    zG = UF.hasOwnProperty,
    $G = zF.call(Object),
    WG = UF.toString,
    GG = jG(Object.getPrototypeOf, Object);
  function HG(e) {
    return !!e && typeof e == "object";
  }
  function VG(e) {
    if (!HG(e) || WG.call(e) != BG || kG(e)) return !1;
    var t = GG(e);
    if (t === null) return !0;
    var r = zG.call(t, "constructor") && t.constructor;
    return typeof r == "function" && r instanceof r && zF.call(r) == $G;
  }
  $F.exports = VG;
});
var GF = y((ay) => {
  var Ln = require("path"),
    Mi = process.platform === "win32",
    Ii = require("fs"),
    YG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
  function XG() {
    var e;
    if (YG) {
      var t = new Error();
      e = r;
    } else e = i;
    return e;
    function r(n) {
      n && ((t.message = n.message), (n = t), i(n));
    }
    function i(n) {
      if (n) {
        if (process.throwDeprecation) throw n;
        if (!process.noDeprecation) {
          var s = "fs: missing callback " + (n.stack || n.message);
          process.traceDeprecation ? console.trace(s) : console.error(s);
        }
      }
    }
  }
  function ZG(e) {
    return typeof e == "function" ? e : XG();
  }
  var See = Ln.normalize;
  Mi ? (Qr = /(.*?)(?:[\/\\]+|$)/g) : (Qr = /(.*?)(?:[\/]+|$)/g);
  var Qr;
  Mi
    ? (Vo = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/)
    : (Vo = /^[\/]*/);
  var Vo;
  ay.realpathSync = function (t, r) {
    if (((t = Ln.resolve(t)), r && Object.prototype.hasOwnProperty.call(r, t)))
      return r[t];
    var i = t,
      n = {},
      s = {},
      a,
      o,
      u,
      l;
    f();
    function f() {
      var E = Vo.exec(t);
      (a = E[0].length),
        (o = E[0]),
        (u = E[0]),
        (l = ""),
        Mi && !s[u] && (Ii.lstatSync(u), (s[u] = !0));
    }
    for (; a < t.length; ) {
      Qr.lastIndex = a;
      var h = Qr.exec(t);
      if (
        ((l = o),
        (o += h[0]),
        (u = l + h[1]),
        (a = Qr.lastIndex),
        !(s[u] || (r && r[u] === u)))
      ) {
        var c;
        if (r && Object.prototype.hasOwnProperty.call(r, u)) c = r[u];
        else {
          var d = Ii.lstatSync(u);
          if (!d.isSymbolicLink()) {
            (s[u] = !0), r && (r[u] = u);
            continue;
          }
          var m = null;
          if (!Mi) {
            var C = d.dev.toString(32) + ":" + d.ino.toString(32);
            n.hasOwnProperty(C) && (m = n[C]);
          }
          m === null && (Ii.statSync(u), (m = Ii.readlinkSync(u))),
            (c = Ln.resolve(l, m)),
            r && (r[u] = c),
            Mi || (n[C] = m);
        }
        (t = Ln.resolve(c, t.slice(a))), f();
      }
    }
    return r && (r[i] = t), t;
  };
  ay.realpath = function (t, r, i) {
    if (
      (typeof i != "function" && ((i = ZG(r)), (r = null)),
      (t = Ln.resolve(t)),
      r && Object.prototype.hasOwnProperty.call(r, t))
    )
      return process.nextTick(i.bind(null, null, r[t]));
    var n = t,
      s = {},
      a = {},
      o,
      u,
      l,
      f;
    h();
    function h() {
      var E = Vo.exec(t);
      (o = E[0].length),
        (u = E[0]),
        (l = E[0]),
        (f = ""),
        Mi && !a[l]
          ? Ii.lstat(l, function (O) {
              if (O) return i(O);
              (a[l] = !0), c();
            })
          : process.nextTick(c);
    }
    function c() {
      if (o >= t.length) return r && (r[n] = t), i(null, t);
      Qr.lastIndex = o;
      var E = Qr.exec(t);
      return (
        (f = u),
        (u += E[0]),
        (l = f + E[1]),
        (o = Qr.lastIndex),
        a[l] || (r && r[l] === l)
          ? process.nextTick(c)
          : r && Object.prototype.hasOwnProperty.call(r, l)
          ? C(r[l])
          : Ii.lstat(l, d)
      );
    }
    function d(E, O) {
      if (E) return i(E);
      if (!O.isSymbolicLink())
        return (a[l] = !0), r && (r[l] = l), process.nextTick(c);
      if (!Mi) {
        var L = O.dev.toString(32) + ":" + O.ino.toString(32);
        if (s.hasOwnProperty(L)) return m(null, s[L], l);
      }
      Ii.stat(l, function (D) {
        if (D) return i(D);
        Ii.readlink(l, function (w, F) {
          Mi || (s[L] = F), m(w, F);
        });
      });
    }
    function m(E, O, L) {
      if (E) return i(E);
      var D = Ln.resolve(f, O);
      r && (r[L] = D), C(D);
    }
    function C(E) {
      (t = Ln.resolve(E, t.slice(o))), h();
    }
  };
});
var fy = y((Cee, XF) => {
  XF.exports = Li;
  Li.realpath = Li;
  Li.sync = ly;
  Li.realpathSync = ly;
  Li.monkeypatch = QG;
  Li.unmonkeypatch = JG;
  var Js = require("fs"),
    oy = Js.realpath,
    uy = Js.realpathSync,
    KG = process.version,
    HF = /^v[0-5]\./.test(KG),
    VF = GF();
  function YF(e) {
    return (
      e &&
      e.syscall === "realpath" &&
      (e.code === "ELOOP" || e.code === "ENOMEM" || e.code === "ENAMETOOLONG")
    );
  }
  function Li(e, t, r) {
    if (HF) return oy(e, t, r);
    typeof t == "function" && ((r = t), (t = null)),
      oy(e, t, function (i, n) {
        YF(i) ? VF.realpath(e, t, r) : r(i, n);
      });
  }
  function ly(e, t) {
    if (HF) return uy(e, t);
    try {
      return uy(e, t);
    } catch (r) {
      if (YF(r)) return VF.realpathSync(e, t);
      throw r;
    }
  }
  function QG() {
    (Js.realpath = Li), (Js.realpathSync = ly);
  }
  function JG() {
    (Js.realpath = oy), (Js.realpathSync = uy);
  }
});
var KF = y((Oee, ZF) => {
  ZF.exports = function (e, t) {
    for (var r = [], i = 0; i < e.length; i++) {
      var n = t(e[i], i);
      eH(n) ? r.push.apply(r, n) : r.push(n);
    }
    return r;
  };
  var eH =
    Array.isArray ||
    function (e) {
      return Object.prototype.toString.call(e) === "[object Array]";
    };
});
var sR = y((Tee, nR) => {
  var tH = KF(),
    QF = Gg();
  nR.exports = nH;
  var JF = "\0SLASH" + Math.random() + "\0",
    eR = "\0OPEN" + Math.random() + "\0",
    cy = "\0CLOSE" + Math.random() + "\0",
    tR = "\0COMMA" + Math.random() + "\0",
    rR = "\0PERIOD" + Math.random() + "\0";
  function hy(e) {
    return parseInt(e, 10) == e ? parseInt(e, 10) : e.charCodeAt(0);
  }
  function rH(e) {
    return e
      .split("\\\\")
      .join(JF)
      .split("\\{")
      .join(eR)
      .split("\\}")
      .join(cy)
      .split("\\,")
      .join(tR)
      .split("\\.")
      .join(rR);
  }
  function iH(e) {
    return e
      .split(JF)
      .join("\\")
      .split(eR)
      .join("{")
      .split(cy)
      .join("}")
      .split(tR)
      .join(",")
      .split(rR)
      .join(".");
  }
  function iR(e) {
    if (!e) return [""];
    var t = [],
      r = QF("{", "}", e);
    if (!r) return e.split(",");
    var i = r.pre,
      n = r.body,
      s = r.post,
      a = i.split(",");
    a[a.length - 1] += "{" + n + "}";
    var o = iR(s);
    return (
      s.length && ((a[a.length - 1] += o.shift()), a.push.apply(a, o)),
      t.push.apply(t, a),
      t
    );
  }
  function nH(e) {
    return e
      ? (e.substr(0, 2) === "{}" && (e = "\\{\\}" + e.substr(2)),
        ea(rH(e), !0).map(iH))
      : [];
  }
  function sH(e) {
    return "{" + e + "}";
  }
  function aH(e) {
    return /^-?0\d/.test(e);
  }
  function oH(e, t) {
    return e <= t;
  }
  function uH(e, t) {
    return e >= t;
  }
  function ea(e, t) {
    var r = [],
      i = QF("{", "}", e);
    if (!i || /\$$/.test(i.pre)) return [e];
    var n = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(i.body),
      s = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(i.body),
      a = n || s,
      o = i.body.indexOf(",") >= 0;
    if (!a && !o)
      return i.post.match(/,.*\}/)
        ? ((e = i.pre + "{" + i.body + cy + i.post), ea(e))
        : [e];
    var u;
    if (a) u = i.body.split(/\.\./);
    else if (
      ((u = iR(i.body)),
      u.length === 1 && ((u = ea(u[0], !1).map(sH)), u.length === 1))
    ) {
      var f = i.post.length ? ea(i.post, !1) : [""];
      return f.map(function (R) {
        return i.pre + u[0] + R;
      });
    }
    var l = i.pre,
      f = i.post.length ? ea(i.post, !1) : [""],
      h;
    if (a) {
      var c = hy(u[0]),
        d = hy(u[1]),
        m = Math.max(u[0].length, u[1].length),
        C = u.length == 3 ? Math.abs(hy(u[2])) : 1,
        E = oH,
        O = d < c;
      O && ((C *= -1), (E = uH));
      var L = u.some(aH);
      h = [];
      for (var D = c; E(D, d); D += C) {
        var w;
        if (s) (w = String.fromCharCode(D)), w === "\\" && (w = "");
        else if (((w = String(D)), L)) {
          var F = m - w.length;
          if (F > 0) {
            var g = new Array(F + 1).join("0");
            D < 0 ? (w = "-" + g + w.slice(1)) : (w = g + w);
          }
        }
        h.push(w);
      }
    } else
      h = tH(u, function (T) {
        return ea(T, !1);
      });
    for (var x = 0; x < h.length; x++)
      for (var A = 0; A < f.length; A++) {
        var p = l + h[x] + f[A];
        (!t || a || p) && r.push(p);
      }
    return r;
  }
});
var Kh = y((Fee, fR) => {
  fR.exports = Mt;
  Mt.Minimatch = tt;
  var Yo = (function () {
    try {
      return require("path");
    } catch {}
  })() || { sep: "/" };
  Mt.sep = Yo.sep;
  var my = (Mt.GLOBSTAR = tt.GLOBSTAR = {}),
    lH = sR(),
    aR = {
      "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
      "?": { open: "(?:", close: ")?" },
      "+": { open: "(?:", close: ")+" },
      "*": { open: "(?:", close: ")*" },
      "@": { open: "(?:", close: ")" },
    },
    dy = "[^/]",
    py = dy + "*?",
    fH = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?",
    hH = "(?:(?!(?:\\/|^)\\.).)*?",
    oR = cH("().*{}+?[]^$\\!");
  function cH(e) {
    return e.split("").reduce(function (t, r) {
      return (t[r] = !0), t;
    }, {});
  }
  var uR = /\/+/;
  Mt.filter = dH;
  function dH(e, t) {
    return (
      (t = t || {}),
      function (r, i, n) {
        return Mt(r, e, t);
      }
    );
  }
  function qi(e, t) {
    t = t || {};
    var r = {};
    return (
      Object.keys(e).forEach(function (i) {
        r[i] = e[i];
      }),
      Object.keys(t).forEach(function (i) {
        r[i] = t[i];
      }),
      r
    );
  }
  Mt.defaults = function (e) {
    if (!e || typeof e != "object" || !Object.keys(e).length) return Mt;
    var t = Mt,
      r = function (n, s, a) {
        return t(n, s, qi(e, a));
      };
    return (
      (r.Minimatch = function (n, s) {
        return new t.Minimatch(n, qi(e, s));
      }),
      (r.Minimatch.defaults = function (n) {
        return t.defaults(qi(e, n)).Minimatch;
      }),
      (r.filter = function (n, s) {
        return t.filter(n, qi(e, s));
      }),
      (r.defaults = function (n) {
        return t.defaults(qi(e, n));
      }),
      (r.makeRe = function (n, s) {
        return t.makeRe(n, qi(e, s));
      }),
      (r.braceExpand = function (n, s) {
        return t.braceExpand(n, qi(e, s));
      }),
      (r.match = function (i, n, s) {
        return t.match(i, n, qi(e, s));
      }),
      r
    );
  };
  tt.defaults = function (e) {
    return Mt.defaults(e).Minimatch;
  };
  function Mt(e, t, r) {
    return (
      Zh(t),
      r || (r = {}),
      !r.nocomment && t.charAt(0) === "#" ? !1 : new tt(t, r).match(e)
    );
  }
  function tt(e, t) {
    if (!(this instanceof tt)) return new tt(e, t);
    Zh(e),
      t || (t = {}),
      (e = e.trim()),
      !t.allowWindowsEscape &&
        Yo.sep !== "/" &&
        (e = e.split(Yo.sep).join("/")),
      (this.options = t),
      (this.set = []),
      (this.pattern = e),
      (this.regexp = null),
      (this.negate = !1),
      (this.comment = !1),
      (this.empty = !1),
      (this.partial = !!t.partial),
      this.make();
  }
  tt.prototype.debug = function () {};
  tt.prototype.make = pH;
  function pH() {
    var e = this.pattern,
      t = this.options;
    if (!t.nocomment && e.charAt(0) === "#") {
      this.comment = !0;
      return;
    }
    if (!e) {
      this.empty = !0;
      return;
    }
    this.parseNegate();
    var r = (this.globSet = this.braceExpand());
    t.debug &&
      (this.debug = function () {
        console.error.apply(console, arguments);
      }),
      this.debug(this.pattern, r),
      (r = this.globParts =
        r.map(function (i) {
          return i.split(uR);
        })),
      this.debug(this.pattern, r),
      (r = r.map(function (i, n, s) {
        return i.map(this.parse, this);
      }, this)),
      this.debug(this.pattern, r),
      (r = r.filter(function (i) {
        return i.indexOf(!1) === -1;
      })),
      this.debug(this.pattern, r),
      (this.set = r);
  }
  tt.prototype.parseNegate = mH;
  function mH() {
    var e = this.pattern,
      t = !1,
      r = this.options,
      i = 0;
    if (!r.nonegate) {
      for (var n = 0, s = e.length; n < s && e.charAt(n) === "!"; n++)
        (t = !t), i++;
      i && (this.pattern = e.substr(i)), (this.negate = t);
    }
  }
  Mt.braceExpand = function (e, t) {
    return lR(e, t);
  };
  tt.prototype.braceExpand = lR;
  function lR(e, t) {
    return (
      t || (this instanceof tt ? (t = this.options) : (t = {})),
      (e = typeof e > "u" ? this.pattern : e),
      Zh(e),
      t.nobrace || !/\{(?:(?!\{).)*\}/.test(e) ? [e] : lH(e)
    );
  }
  var gH = 1024 * 64,
    Zh = function (e) {
      if (typeof e != "string") throw new TypeError("invalid pattern");
      if (e.length > gH) throw new TypeError("pattern is too long");
    };
  tt.prototype.parse = yH;
  var Xh = {};
  function yH(e, t) {
    Zh(e);
    var r = this.options;
    if (e === "**")
      if (r.noglobstar) e = "*";
      else return my;
    if (e === "") return "";
    var i = "",
      n = !!r.nocase,
      s = !1,
      a = [],
      o = [],
      u,
      l = !1,
      f = -1,
      h = -1,
      c =
        e.charAt(0) === "."
          ? ""
          : r.dot
          ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))"
          : "(?!\\.)",
      d = this;
    function m() {
      if (u) {
        switch (u) {
          case "*":
            (i += py), (n = !0);
            break;
          case "?":
            (i += dy), (n = !0);
            break;
          default:
            i += "\\" + u;
            break;
        }
        d.debug("clearStateChar %j %j", u, i), (u = !1);
      }
    }
    for (var C = 0, E = e.length, O; C < E && (O = e.charAt(C)); C++) {
      if ((this.debug("%s	%s %s %j", e, C, i, O), s && oR[O])) {
        (i += "\\" + O), (s = !1);
        continue;
      }
      switch (O) {
        case "/":
          return !1;
        case "\\":
          m(), (s = !0);
          continue;
        case "?":
        case "*":
        case "+":
        case "@":
        case "!":
          if ((this.debug("%s	%s %s %j <-- stateChar", e, C, i, O), l)) {
            this.debug("  in class"),
              O === "!" && C === h + 1 && (O = "^"),
              (i += O);
            continue;
          }
          d.debug("call clearStateChar %j", u), m(), (u = O), r.noext && m();
          continue;
        case "(":
          if (l) {
            i += "(";
            continue;
          }
          if (!u) {
            i += "\\(";
            continue;
          }
          a.push({
            type: u,
            start: C - 1,
            reStart: i.length,
            open: aR[u].open,
            close: aR[u].close,
          }),
            (i += u === "!" ? "(?:(?!(?:" : "(?:"),
            this.debug("plType %j %j", u, i),
            (u = !1);
          continue;
        case ")":
          if (l || !a.length) {
            i += "\\)";
            continue;
          }
          m(), (n = !0);
          var L = a.pop();
          (i += L.close), L.type === "!" && o.push(L), (L.reEnd = i.length);
          continue;
        case "|":
          if (l || !a.length || s) {
            (i += "\\|"), (s = !1);
            continue;
          }
          m(), (i += "|");
          continue;
        case "[":
          if ((m(), l)) {
            i += "\\" + O;
            continue;
          }
          (l = !0), (h = C), (f = i.length), (i += O);
          continue;
        case "]":
          if (C === h + 1 || !l) {
            (i += "\\" + O), (s = !1);
            continue;
          }
          var D = e.substring(h + 1, C);
          try {
            RegExp("[" + D + "]");
          } catch {
            var w = this.parse(D, Xh);
            (i = i.substr(0, f) + "\\[" + w[0] + "\\]"),
              (n = n || w[1]),
              (l = !1);
            continue;
          }
          (n = !0), (l = !1), (i += O);
          continue;
        default:
          m(),
            s ? (s = !1) : oR[O] && !(O === "^" && l) && (i += "\\"),
            (i += O);
      }
    }
    for (
      l &&
        ((D = e.substr(h + 1)),
        (w = this.parse(D, Xh)),
        (i = i.substr(0, f) + "\\[" + w[0]),
        (n = n || w[1])),
        L = a.pop();
      L;
      L = a.pop()
    ) {
      var F = i.slice(L.reStart + L.open.length);
      this.debug("setting tail", i, L),
        (F = F.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (W, Ne, Ie) {
          return Ie || (Ie = "\\"), Ne + Ne + Ie + "|";
        })),
        this.debug(
          `tail=%j
   %s`,
          F,
          F,
          L,
          i,
        );
      var g = L.type === "*" ? py : L.type === "?" ? dy : "\\" + L.type;
      (n = !0), (i = i.slice(0, L.reStart) + g + "\\(" + F);
    }
    m(), s && (i += "\\\\");
    var x = !1;
    switch (i.charAt(0)) {
      case "[":
      case ".":
      case "(":
        x = !0;
    }
    for (var A = o.length - 1; A > -1; A--) {
      var p = o[A],
        T = i.slice(0, p.reStart),
        R = i.slice(p.reStart, p.reEnd - 8),
        k = i.slice(p.reEnd - 8, p.reEnd),
        z = i.slice(p.reEnd);
      k += z;
      var $ = T.split("(").length - 1,
        X = z;
      for (C = 0; C < $; C++) X = X.replace(/\)[+*?]?/, "");
      z = X;
      var I = "";
      z === "" && t !== Xh && (I = "$");
      var P = T + R + z + I + k;
      i = P;
    }
    if ((i !== "" && n && (i = "(?=.)" + i), x && (i = c + i), t === Xh))
      return [i, n];
    if (!n) return wH(e);
    var G = r.nocase ? "i" : "";
    try {
      var J = new RegExp("^" + i + "$", G);
    } catch {
      return new RegExp("$.");
    }
    return (J._glob = e), (J._src = i), J;
  }
  Mt.makeRe = function (e, t) {
    return new tt(e, t || {}).makeRe();
  };
  tt.prototype.makeRe = vH;
  function vH() {
    if (this.regexp || this.regexp === !1) return this.regexp;
    var e = this.set;
    if (!e.length) return (this.regexp = !1), this.regexp;
    var t = this.options,
      r = t.noglobstar ? py : t.dot ? fH : hH,
      i = t.nocase ? "i" : "",
      n = e
        .map(function (s) {
          return s
            .map(function (a) {
              return a === my ? r : typeof a == "string" ? DH(a) : a._src;
            })
            .join("\\/");
        })
        .join("|");
    (n = "^(?:" + n + ")$"), this.negate && (n = "^(?!" + n + ").*$");
    try {
      this.regexp = new RegExp(n, i);
    } catch {
      this.regexp = !1;
    }
    return this.regexp;
  }
  Mt.match = function (e, t, r) {
    r = r || {};
    var i = new tt(t, r);
    return (
      (e = e.filter(function (n) {
        return i.match(n);
      })),
      i.options.nonull && !e.length && e.push(t),
      e
    );
  };
  tt.prototype.match = function (t, r) {
    if (
      (typeof r > "u" && (r = this.partial),
      this.debug("match", t, this.pattern),
      this.comment)
    )
      return !1;
    if (this.empty) return t === "";
    if (t === "/" && r) return !0;
    var i = this.options;
    Yo.sep !== "/" && (t = t.split(Yo.sep).join("/")),
      (t = t.split(uR)),
      this.debug(this.pattern, "split", t);
    var n = this.set;
    this.debug(this.pattern, "set", n);
    var s, a;
    for (a = t.length - 1; a >= 0 && ((s = t[a]), !s); a--);
    for (a = 0; a < n.length; a++) {
      var o = n[a],
        u = t;
      i.matchBase && o.length === 1 && (u = [s]);
      var l = this.matchOne(u, o, r);
      if (l) return i.flipNegate ? !0 : !this.negate;
    }
    return i.flipNegate ? !1 : this.negate;
  };
  tt.prototype.matchOne = function (e, t, r) {
    var i = this.options;
    this.debug("matchOne", { this: this, file: e, pattern: t }),
      this.debug("matchOne", e.length, t.length);
    for (
      var n = 0, s = 0, a = e.length, o = t.length;
      n < a && s < o;
      n++, s++
    ) {
      this.debug("matchOne loop");
      var u = t[s],
        l = e[n];
      if ((this.debug(t, u, l), u === !1)) return !1;
      if (u === my) {
        this.debug("GLOBSTAR", [t, u, l]);
        var f = n,
          h = s + 1;
        if (h === o) {
          for (this.debug("** at the end"); n < a; n++)
            if (
              e[n] === "." ||
              e[n] === ".." ||
              (!i.dot && e[n].charAt(0) === ".")
            )
              return !1;
          return !0;
        }
        for (; f < a; ) {
          var c = e[f];
          if (
            (this.debug(
              `
globstar while`,
              e,
              f,
              t,
              h,
              c,
            ),
            this.matchOne(e.slice(f), t.slice(h), r))
          )
            return this.debug("globstar found match!", f, a, c), !0;
          if (c === "." || c === ".." || (!i.dot && c.charAt(0) === ".")) {
            this.debug("dot detected!", e, f, t, h);
            break;
          }
          this.debug("globstar swallow a segment, and continue"), f++;
        }
        return !!(
          r &&
          (this.debug(
            `
>>> no match, partial?`,
            e,
            f,
            t,
            h,
          ),
          f === a)
        );
      }
      var d;
      if (
        (typeof u == "string"
          ? ((d = l === u), this.debug("string match", u, l, d))
          : ((d = l.match(u)), this.debug("pattern match", u, l, d)),
        !d)
      )
        return !1;
    }
    if (n === a && s === o) return !0;
    if (n === a) return r;
    if (s === o) return n === a - 1 && e[n] === "";
    throw new Error("wtf?");
  };
  function wH(e) {
    return e.replace(/\\(.)/g, "$1");
  }
  function DH(e) {
    return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
});
var Jh = y((Ree, Qh) => {
  "use strict";
  function hR(e) {
    return e.charAt(0) === "/";
  }
  function cR(e) {
    var t =
        /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/,
      r = t.exec(e),
      i = r[1] || "",
      n = Boolean(i && i.charAt(1) !== ":");
    return Boolean(r[2] || n);
  }
  Qh.exports = process.platform === "win32" ? cR : hR;
  Qh.exports.posix = hR;
  Qh.exports.win32 = cR;
});
var yy = y((Pi) => {
  Pi.setopts = CH;
  Pi.ownProp = dR;
  Pi.makeAbs = Xo;
  Pi.finish = OH;
  Pi.mark = TH;
  Pi.isIgnored = mR;
  Pi.childrenIgnored = FH;
  function dR(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
  var bH = require("fs"),
    ta = require("path"),
    EH = Kh(),
    pR = Jh(),
    gy = EH.Minimatch;
  function _H(e, t) {
    return e.localeCompare(t, "en");
  }
  function SH(e, t) {
    (e.ignore = t.ignore || []),
      Array.isArray(e.ignore) || (e.ignore = [e.ignore]),
      e.ignore.length && (e.ignore = e.ignore.map(xH));
  }
  function xH(e) {
    var t = null;
    if (e.slice(-3) === "/**") {
      var r = e.replace(/(\/\*\*)+$/, "");
      t = new gy(r, { dot: !0 });
    }
    return { matcher: new gy(e, { dot: !0 }), gmatcher: t };
  }
  function CH(e, t, r) {
    if ((r || (r = {}), r.matchBase && t.indexOf("/") === -1)) {
      if (r.noglobstar) throw new Error("base matching requires globstar");
      t = "**/" + t;
    }
    (e.silent = !!r.silent),
      (e.pattern = t),
      (e.strict = r.strict !== !1),
      (e.realpath = !!r.realpath),
      (e.realpathCache = r.realpathCache || Object.create(null)),
      (e.follow = !!r.follow),
      (e.dot = !!r.dot),
      (e.mark = !!r.mark),
      (e.nodir = !!r.nodir),
      e.nodir && (e.mark = !0),
      (e.sync = !!r.sync),
      (e.nounique = !!r.nounique),
      (e.nonull = !!r.nonull),
      (e.nosort = !!r.nosort),
      (e.nocase = !!r.nocase),
      (e.stat = !!r.stat),
      (e.noprocess = !!r.noprocess),
      (e.absolute = !!r.absolute),
      (e.fs = r.fs || bH),
      (e.maxLength = r.maxLength || 1 / 0),
      (e.cache = r.cache || Object.create(null)),
      (e.statCache = r.statCache || Object.create(null)),
      (e.symlinks = r.symlinks || Object.create(null)),
      SH(e, r),
      (e.changedCwd = !1);
    var i = process.cwd();
    dR(r, "cwd")
      ? ((e.cwd = ta.resolve(r.cwd)), (e.changedCwd = e.cwd !== i))
      : (e.cwd = i),
      (e.root = r.root || ta.resolve(e.cwd, "/")),
      (e.root = ta.resolve(e.root)),
      process.platform === "win32" && (e.root = e.root.replace(/\\/g, "/")),
      (e.cwdAbs = pR(e.cwd) ? e.cwd : Xo(e, e.cwd)),
      process.platform === "win32" && (e.cwdAbs = e.cwdAbs.replace(/\\/g, "/")),
      (e.nomount = !!r.nomount),
      (r.nonegate = !0),
      (r.nocomment = !0),
      (r.allowWindowsEscape = !1),
      (e.minimatch = new gy(t, r)),
      (e.options = e.minimatch.options);
  }
  function OH(e) {
    for (
      var t = e.nounique,
        r = t ? [] : Object.create(null),
        i = 0,
        n = e.matches.length;
      i < n;
      i++
    ) {
      var s = e.matches[i];
      if (!s || Object.keys(s).length === 0) {
        if (e.nonull) {
          var a = e.minimatch.globSet[i];
          t ? r.push(a) : (r[a] = !0);
        }
      } else {
        var o = Object.keys(s);
        t
          ? r.push.apply(r, o)
          : o.forEach(function (u) {
              r[u] = !0;
            });
      }
    }
    if ((t || (r = Object.keys(r)), e.nosort || (r = r.sort(_H)), e.mark)) {
      for (var i = 0; i < r.length; i++) r[i] = e._mark(r[i]);
      e.nodir &&
        (r = r.filter(function (u) {
          var l = !/\/$/.test(u),
            f = e.cache[u] || e.cache[Xo(e, u)];
          return l && f && (l = f !== "DIR" && !Array.isArray(f)), l;
        }));
    }
    e.ignore.length &&
      (r = r.filter(function (u) {
        return !mR(e, u);
      })),
      (e.found = r);
  }
  function TH(e, t) {
    var r = Xo(e, t),
      i = e.cache[r],
      n = t;
    if (i) {
      var s = i === "DIR" || Array.isArray(i),
        a = t.slice(-1) === "/";
      if ((s && !a ? (n += "/") : !s && a && (n = n.slice(0, -1)), n !== t)) {
        var o = Xo(e, n);
        (e.statCache[o] = e.statCache[r]), (e.cache[o] = e.cache[r]);
      }
    }
    return n;
  }
  function Xo(e, t) {
    var r = t;
    return (
      t.charAt(0) === "/"
        ? (r = ta.join(e.root, t))
        : pR(t) || t === ""
        ? (r = t)
        : e.changedCwd
        ? (r = ta.resolve(e.cwd, t))
        : (r = ta.resolve(t)),
      process.platform === "win32" && (r = r.replace(/\\/g, "/")),
      r
    );
  }
  function mR(e, t) {
    return e.ignore.length
      ? e.ignore.some(function (r) {
          return r.matcher.match(t) || !!(r.gmatcher && r.gmatcher.match(t));
        })
      : !1;
  }
  function FH(e, t) {
    return e.ignore.length
      ? e.ignore.some(function (r) {
          return !!(r.gmatcher && r.gmatcher.match(t));
        })
      : !1;
  }
});
var DR = y((Lee, wR) => {
  wR.exports = vR;
  vR.GlobSync = ze;
  var RH = fy(),
    gR = Kh(),
    Nee = gR.Minimatch,
    Iee = Dy().Glob,
    Mee = require("util"),
    vy = require("path"),
    yR = require("assert"),
    ec = Jh(),
    qn = yy(),
    AH = qn.setopts,
    wy = qn.ownProp,
    NH = qn.childrenIgnored,
    IH = qn.isIgnored;
  function vR(e, t) {
    if (typeof t == "function" || arguments.length === 3)
      throw new TypeError(`callback provided to sync glob
See: https://github.com/isaacs/node-glob/issues/167`);
    return new ze(e, t).found;
  }
  function ze(e, t) {
    if (!e) throw new Error("must provide pattern");
    if (typeof t == "function" || arguments.length === 3)
      throw new TypeError(`callback provided to sync glob
See: https://github.com/isaacs/node-glob/issues/167`);
    if (!(this instanceof ze)) return new ze(e, t);
    if ((AH(this, e, t), this.noprocess)) return this;
    var r = this.minimatch.set.length;
    this.matches = new Array(r);
    for (var i = 0; i < r; i++) this._process(this.minimatch.set[i], i, !1);
    this._finish();
  }
  ze.prototype._finish = function () {
    if ((yR.ok(this instanceof ze), this.realpath)) {
      var e = this;
      this.matches.forEach(function (t, r) {
        var i = (e.matches[r] = Object.create(null));
        for (var n in t)
          try {
            n = e._makeAbs(n);
            var s = RH.realpathSync(n, e.realpathCache);
            i[s] = !0;
          } catch (a) {
            if (a.syscall === "stat") i[e._makeAbs(n)] = !0;
            else throw a;
          }
      });
    }
    qn.finish(this);
  };
  ze.prototype._process = function (e, t, r) {
    yR.ok(this instanceof ze);
    for (var i = 0; typeof e[i] == "string"; ) i++;
    var n;
    switch (i) {
      case e.length:
        this._processSimple(e.join("/"), t);
        return;
      case 0:
        n = null;
        break;
      default:
        n = e.slice(0, i).join("/");
        break;
    }
    var s = e.slice(i),
      a;
    n === null
      ? (a = ".")
      : ((ec(n) ||
          ec(
            e
              .map(function (l) {
                return typeof l == "string" ? l : "[*]";
              })
              .join("/"),
          )) &&
          (!n || !ec(n)) &&
          (n = "/" + n),
        (a = n));
    var o = this._makeAbs(a);
    if (!NH(this, a)) {
      var u = s[0] === gR.GLOBSTAR;
      u
        ? this._processGlobStar(n, a, o, s, t, r)
        : this._processReaddir(n, a, o, s, t, r);
    }
  };
  ze.prototype._processReaddir = function (e, t, r, i, n, s) {
    var a = this._readdir(r, s);
    if (!!a) {
      for (
        var o = i[0],
          u = !!this.minimatch.negate,
          l = o._glob,
          f = this.dot || l.charAt(0) === ".",
          h = [],
          c = 0;
        c < a.length;
        c++
      ) {
        var d = a[c];
        if (d.charAt(0) !== "." || f) {
          var m;
          u && !e ? (m = !d.match(o)) : (m = d.match(o)), m && h.push(d);
        }
      }
      var C = h.length;
      if (C !== 0) {
        if (i.length === 1 && !this.mark && !this.stat) {
          this.matches[n] || (this.matches[n] = Object.create(null));
          for (var c = 0; c < C; c++) {
            var d = h[c];
            e && (e.slice(-1) !== "/" ? (d = e + "/" + d) : (d = e + d)),
              d.charAt(0) === "/" &&
                !this.nomount &&
                (d = vy.join(this.root, d)),
              this._emitMatch(n, d);
          }
          return;
        }
        i.shift();
        for (var c = 0; c < C; c++) {
          var d = h[c],
            E;
          e ? (E = [e, d]) : (E = [d]), this._process(E.concat(i), n, s);
        }
      }
    }
  };
  ze.prototype._emitMatch = function (e, t) {
    if (!IH(this, t)) {
      var r = this._makeAbs(t);
      if (
        (this.mark && (t = this._mark(t)),
        this.absolute && (t = r),
        !this.matches[e][t])
      ) {
        if (this.nodir) {
          var i = this.cache[r];
          if (i === "DIR" || Array.isArray(i)) return;
        }
        (this.matches[e][t] = !0), this.stat && this._stat(t);
      }
    }
  };
  ze.prototype._readdirInGlobStar = function (e) {
    if (this.follow) return this._readdir(e, !1);
    var t, r, i;
    try {
      r = this.fs.lstatSync(e);
    } catch (s) {
      if (s.code === "ENOENT") return null;
    }
    var n = r && r.isSymbolicLink();
    return (
      (this.symlinks[e] = n),
      !n && r && !r.isDirectory()
        ? (this.cache[e] = "FILE")
        : (t = this._readdir(e, !1)),
      t
    );
  };
  ze.prototype._readdir = function (e, t) {
    var r;
    if (t && !wy(this.symlinks, e)) return this._readdirInGlobStar(e);
    if (wy(this.cache, e)) {
      var i = this.cache[e];
      if (!i || i === "FILE") return null;
      if (Array.isArray(i)) return i;
    }
    try {
      return this._readdirEntries(e, this.fs.readdirSync(e));
    } catch (n) {
      return this._readdirError(e, n), null;
    }
  };
  ze.prototype._readdirEntries = function (e, t) {
    if (!this.mark && !this.stat)
      for (var r = 0; r < t.length; r++) {
        var i = t[r];
        e === "/" ? (i = e + i) : (i = e + "/" + i), (this.cache[i] = !0);
      }
    return (this.cache[e] = t), t;
  };
  ze.prototype._readdirError = function (e, t) {
    switch (t.code) {
      case "ENOTSUP":
      case "ENOTDIR":
        var r = this._makeAbs(e);
        if (((this.cache[r] = "FILE"), r === this.cwdAbs)) {
          var i = new Error(t.code + " invalid cwd " + this.cwd);
          throw ((i.path = this.cwd), (i.code = t.code), i);
        }
        break;
      case "ENOENT":
      case "ELOOP":
      case "ENAMETOOLONG":
      case "UNKNOWN":
        this.cache[this._makeAbs(e)] = !1;
        break;
      default:
        if (((this.cache[this._makeAbs(e)] = !1), this.strict)) throw t;
        this.silent || console.error("glob error", t);
        break;
    }
  };
  ze.prototype._processGlobStar = function (e, t, r, i, n, s) {
    var a = this._readdir(r, s);
    if (!!a) {
      var o = i.slice(1),
        u = e ? [e] : [],
        l = u.concat(o);
      this._process(l, n, !1);
      var f = a.length,
        h = this.symlinks[r];
      if (!(h && s))
        for (var c = 0; c < f; c++) {
          var d = a[c];
          if (!(d.charAt(0) === "." && !this.dot)) {
            var m = u.concat(a[c], o);
            this._process(m, n, !0);
            var C = u.concat(a[c], i);
            this._process(C, n, !0);
          }
        }
    }
  };
  ze.prototype._processSimple = function (e, t) {
    var r = this._stat(e);
    if ((this.matches[t] || (this.matches[t] = Object.create(null)), !!r)) {
      if (e && ec(e) && !this.nomount) {
        var i = /[\/\\]$/.test(e);
        e.charAt(0) === "/"
          ? (e = vy.join(this.root, e))
          : ((e = vy.resolve(this.root, e)), i && (e += "/"));
      }
      process.platform === "win32" && (e = e.replace(/\\/g, "/")),
        this._emitMatch(t, e);
    }
  };
  ze.prototype._stat = function (e) {
    var t = this._makeAbs(e),
      r = e.slice(-1) === "/";
    if (e.length > this.maxLength) return !1;
    if (!this.stat && wy(this.cache, t)) {
      var a = this.cache[t];
      if ((Array.isArray(a) && (a = "DIR"), !r || a === "DIR")) return a;
      if (r && a === "FILE") return !1;
    }
    var i,
      n = this.statCache[t];
    if (!n) {
      var s;
      try {
        s = this.fs.lstatSync(t);
      } catch (o) {
        if (o && (o.code === "ENOENT" || o.code === "ENOTDIR"))
          return (this.statCache[t] = !1), !1;
      }
      if (s && s.isSymbolicLink())
        try {
          n = this.fs.statSync(t);
        } catch {
          n = s;
        }
      else n = s;
    }
    this.statCache[t] = n;
    var a = !0;
    return (
      n && (a = n.isDirectory() ? "DIR" : "FILE"),
      (this.cache[t] = this.cache[t] || a),
      r && a === "FILE" ? !1 : a
    );
  };
  ze.prototype._mark = function (e) {
    return qn.mark(this, e);
  };
  ze.prototype._makeAbs = function (e) {
    return qn.makeAbs(this, e);
  };
});
var ER = y((qee, bR) => {
  var MH = id(),
    Zo = Object.create(null),
    LH = Ra();
  bR.exports = MH(qH);
  function qH(e, t) {
    return Zo[e] ? (Zo[e].push(t), null) : ((Zo[e] = [t]), PH(e));
  }
  function PH(e) {
    return LH(function t() {
      var r = Zo[e],
        i = r.length,
        n = BH(arguments);
      try {
        for (var s = 0; s < i; s++) r[s].apply(null, n);
      } finally {
        r.length > i
          ? (r.splice(0, i),
            process.nextTick(function () {
              t.apply(null, n);
            }))
          : delete Zo[e];
      }
    });
  }
  function BH(e) {
    for (var t = e.length, r = [], i = 0; i < t; i++) r[i] = e[i];
    return r;
  }
});
var Dy = y((kee, SR) => {
  SR.exports = Pn;
  var kH = fy(),
    _R = Kh(),
    Pee = _R.Minimatch,
    jH = je(),
    UH = require("events").EventEmitter,
    by = require("path"),
    Ey = require("assert"),
    Ko = Jh(),
    Sy = DR(),
    Bn = yy(),
    zH = Bn.setopts,
    _y = Bn.ownProp,
    xy = ER(),
    Bee = require("util"),
    $H = Bn.childrenIgnored,
    WH = Bn.isIgnored,
    GH = Ra();
  function Pn(e, t, r) {
    if (
      (typeof t == "function" && ((r = t), (t = {})), t || (t = {}), t.sync)
    ) {
      if (r) throw new TypeError("callback provided to sync glob");
      return Sy(e, t);
    }
    return new me(e, t, r);
  }
  Pn.sync = Sy;
  var HH = (Pn.GlobSync = Sy.GlobSync);
  Pn.glob = Pn;
  function VH(e, t) {
    if (t === null || typeof t != "object") return e;
    for (var r = Object.keys(t), i = r.length; i--; ) e[r[i]] = t[r[i]];
    return e;
  }
  Pn.hasMagic = function (e, t) {
    var r = VH({}, t);
    r.noprocess = !0;
    var i = new me(e, r),
      n = i.minimatch.set;
    if (!e) return !1;
    if (n.length > 1) return !0;
    for (var s = 0; s < n[0].length; s++)
      if (typeof n[0][s] != "string") return !0;
    return !1;
  };
  Pn.Glob = me;
  jH(me, UH);
  function me(e, t, r) {
    if ((typeof t == "function" && ((r = t), (t = null)), t && t.sync)) {
      if (r) throw new TypeError("callback provided to sync glob");
      return new HH(e, t);
    }
    if (!(this instanceof me)) return new me(e, t, r);
    zH(this, e, t), (this._didRealPath = !1);
    var i = this.minimatch.set.length;
    (this.matches = new Array(i)),
      typeof r == "function" &&
        ((r = GH(r)),
        this.on("error", r),
        this.on("end", function (u) {
          r(null, u);
        }));
    var n = this;
    if (
      ((this._processing = 0),
      (this._emitQueue = []),
      (this._processQueue = []),
      (this.paused = !1),
      this.noprocess)
    )
      return this;
    if (i === 0) return o();
    for (var s = !0, a = 0; a < i; a++)
      this._process(this.minimatch.set[a], a, !1, o);
    s = !1;
    function o() {
      --n._processing,
        n._processing <= 0 &&
          (s
            ? process.nextTick(function () {
                n._finish();
              })
            : n._finish());
    }
  }
  me.prototype._finish = function () {
    if ((Ey(this instanceof me), !this.aborted)) {
      if (this.realpath && !this._didRealpath) return this._realpath();
      Bn.finish(this), this.emit("end", this.found);
    }
  };
  me.prototype._realpath = function () {
    if (this._didRealpath) return;
    this._didRealpath = !0;
    var e = this.matches.length;
    if (e === 0) return this._finish();
    for (var t = this, r = 0; r < this.matches.length; r++)
      this._realpathSet(r, i);
    function i() {
      --e === 0 && t._finish();
    }
  };
  me.prototype._realpathSet = function (e, t) {
    var r = this.matches[e];
    if (!r) return t();
    var i = Object.keys(r),
      n = this,
      s = i.length;
    if (s === 0) return t();
    var a = (this.matches[e] = Object.create(null));
    i.forEach(function (o, u) {
      (o = n._makeAbs(o)),
        kH.realpath(o, n.realpathCache, function (l, f) {
          l
            ? l.syscall === "stat"
              ? (a[o] = !0)
              : n.emit("error", l)
            : (a[f] = !0),
            --s === 0 && ((n.matches[e] = a), t());
        });
    });
  };
  me.prototype._mark = function (e) {
    return Bn.mark(this, e);
  };
  me.prototype._makeAbs = function (e) {
    return Bn.makeAbs(this, e);
  };
  me.prototype.abort = function () {
    (this.aborted = !0), this.emit("abort");
  };
  me.prototype.pause = function () {
    this.paused || ((this.paused = !0), this.emit("pause"));
  };
  me.prototype.resume = function () {
    if (this.paused) {
      if ((this.emit("resume"), (this.paused = !1), this._emitQueue.length)) {
        var e = this._emitQueue.slice(0);
        this._emitQueue.length = 0;
        for (var t = 0; t < e.length; t++) {
          var r = e[t];
          this._emitMatch(r[0], r[1]);
        }
      }
      if (this._processQueue.length) {
        var i = this._processQueue.slice(0);
        this._processQueue.length = 0;
        for (var t = 0; t < i.length; t++) {
          var n = i[t];
          this._processing--, this._process(n[0], n[1], n[2], n[3]);
        }
      }
    }
  };
  me.prototype._process = function (e, t, r, i) {
    if ((Ey(this instanceof me), Ey(typeof i == "function"), !this.aborted)) {
      if ((this._processing++, this.paused)) {
        this._processQueue.push([e, t, r, i]);
        return;
      }
      for (var n = 0; typeof e[n] == "string"; ) n++;
      var s;
      switch (n) {
        case e.length:
          this._processSimple(e.join("/"), t, i);
          return;
        case 0:
          s = null;
          break;
        default:
          s = e.slice(0, n).join("/");
          break;
      }
      var a = e.slice(n),
        o;
      s === null
        ? (o = ".")
        : ((Ko(s) ||
            Ko(
              e
                .map(function (f) {
                  return typeof f == "string" ? f : "[*]";
                })
                .join("/"),
            )) &&
            (!s || !Ko(s)) &&
            (s = "/" + s),
          (o = s));
      var u = this._makeAbs(o);
      if ($H(this, o)) return i();
      var l = a[0] === _R.GLOBSTAR;
      l
        ? this._processGlobStar(s, o, u, a, t, r, i)
        : this._processReaddir(s, o, u, a, t, r, i);
    }
  };
  me.prototype._processReaddir = function (e, t, r, i, n, s, a) {
    var o = this;
    this._readdir(r, s, function (u, l) {
      return o._processReaddir2(e, t, r, i, n, s, l, a);
    });
  };
  me.prototype._processReaddir2 = function (e, t, r, i, n, s, a, o) {
    if (!a) return o();
    for (
      var u = i[0],
        l = !!this.minimatch.negate,
        f = u._glob,
        h = this.dot || f.charAt(0) === ".",
        c = [],
        d = 0;
      d < a.length;
      d++
    ) {
      var m = a[d];
      if (m.charAt(0) !== "." || h) {
        var C;
        l && !e ? (C = !m.match(u)) : (C = m.match(u)), C && c.push(m);
      }
    }
    var E = c.length;
    if (E === 0) return o();
    if (i.length === 1 && !this.mark && !this.stat) {
      this.matches[n] || (this.matches[n] = Object.create(null));
      for (var d = 0; d < E; d++) {
        var m = c[d];
        e && (e !== "/" ? (m = e + "/" + m) : (m = e + m)),
          m.charAt(0) === "/" && !this.nomount && (m = by.join(this.root, m)),
          this._emitMatch(n, m);
      }
      return o();
    }
    i.shift();
    for (var d = 0; d < E; d++) {
      var m = c[d],
        O;
      e && (e !== "/" ? (m = e + "/" + m) : (m = e + m)),
        this._process([m].concat(i), n, s, o);
    }
    o();
  };
  me.prototype._emitMatch = function (e, t) {
    if (!this.aborted && !WH(this, t)) {
      if (this.paused) {
        this._emitQueue.push([e, t]);
        return;
      }
      var r = Ko(t) ? t : this._makeAbs(t);
      if (
        (this.mark && (t = this._mark(t)),
        this.absolute && (t = r),
        !this.matches[e][t])
      ) {
        if (this.nodir) {
          var i = this.cache[r];
          if (i === "DIR" || Array.isArray(i)) return;
        }
        this.matches[e][t] = !0;
        var n = this.statCache[r];
        n && this.emit("stat", t, n), this.emit("match", t);
      }
    }
  };
  me.prototype._readdirInGlobStar = function (e, t) {
    if (this.aborted) return;
    if (this.follow) return this._readdir(e, !1, t);
    var r = "lstat\0" + e,
      i = this,
      n = xy(r, s);
    n && i.fs.lstat(e, n);
    function s(a, o) {
      if (a && a.code === "ENOENT") return t();
      var u = o && o.isSymbolicLink();
      (i.symlinks[e] = u),
        !u && o && !o.isDirectory()
          ? ((i.cache[e] = "FILE"), t())
          : i._readdir(e, !1, t);
    }
  };
  me.prototype._readdir = function (e, t, r) {
    if (!this.aborted && ((r = xy("readdir\0" + e + "\0" + t, r)), !!r)) {
      if (t && !_y(this.symlinks, e)) return this._readdirInGlobStar(e, r);
      if (_y(this.cache, e)) {
        var i = this.cache[e];
        if (!i || i === "FILE") return r();
        if (Array.isArray(i)) return r(null, i);
      }
      var n = this;
      n.fs.readdir(e, YH(this, e, r));
    }
  };
  function YH(e, t, r) {
    return function (i, n) {
      i ? e._readdirError(t, i, r) : e._readdirEntries(t, n, r);
    };
  }
  me.prototype._readdirEntries = function (e, t, r) {
    if (!this.aborted) {
      if (!this.mark && !this.stat)
        for (var i = 0; i < t.length; i++) {
          var n = t[i];
          e === "/" ? (n = e + n) : (n = e + "/" + n), (this.cache[n] = !0);
        }
      return (this.cache[e] = t), r(null, t);
    }
  };
  me.prototype._readdirError = function (e, t, r) {
    if (!this.aborted) {
      switch (t.code) {
        case "ENOTSUP":
        case "ENOTDIR":
          var i = this._makeAbs(e);
          if (((this.cache[i] = "FILE"), i === this.cwdAbs)) {
            var n = new Error(t.code + " invalid cwd " + this.cwd);
            (n.path = this.cwd),
              (n.code = t.code),
              this.emit("error", n),
              this.abort();
          }
          break;
        case "ENOENT":
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(e)] = !1;
          break;
        default:
          (this.cache[this._makeAbs(e)] = !1),
            this.strict && (this.emit("error", t), this.abort()),
            this.silent || console.error("glob error", t);
          break;
      }
      return r();
    }
  };
  me.prototype._processGlobStar = function (e, t, r, i, n, s, a) {
    var o = this;
    this._readdir(r, s, function (u, l) {
      o._processGlobStar2(e, t, r, i, n, s, l, a);
    });
  };
  me.prototype._processGlobStar2 = function (e, t, r, i, n, s, a, o) {
    if (!a) return o();
    var u = i.slice(1),
      l = e ? [e] : [],
      f = l.concat(u);
    this._process(f, n, !1, o);
    var h = this.symlinks[r],
      c = a.length;
    if (h && s) return o();
    for (var d = 0; d < c; d++) {
      var m = a[d];
      if (!(m.charAt(0) === "." && !this.dot)) {
        var C = l.concat(a[d], u);
        this._process(C, n, !0, o);
        var E = l.concat(a[d], i);
        this._process(E, n, !0, o);
      }
    }
    o();
  };
  me.prototype._processSimple = function (e, t, r) {
    var i = this;
    this._stat(e, function (n, s) {
      i._processSimple2(e, t, n, s, r);
    });
  };
  me.prototype._processSimple2 = function (e, t, r, i, n) {
    if ((this.matches[t] || (this.matches[t] = Object.create(null)), !i))
      return n();
    if (e && Ko(e) && !this.nomount) {
      var s = /[\/\\]$/.test(e);
      e.charAt(0) === "/"
        ? (e = by.join(this.root, e))
        : ((e = by.resolve(this.root, e)), s && (e += "/"));
    }
    process.platform === "win32" && (e = e.replace(/\\/g, "/")),
      this._emitMatch(t, e),
      n();
  };
  me.prototype._stat = function (e, t) {
    var r = this._makeAbs(e),
      i = e.slice(-1) === "/";
    if (e.length > this.maxLength) return t();
    if (!this.stat && _y(this.cache, r)) {
      var n = this.cache[r];
      if ((Array.isArray(n) && (n = "DIR"), !i || n === "DIR"))
        return t(null, n);
      if (i && n === "FILE") return t();
    }
    var s,
      a = this.statCache[r];
    if (a !== void 0) {
      if (a === !1) return t(null, a);
      var o = a.isDirectory() ? "DIR" : "FILE";
      return i && o === "FILE" ? t() : t(null, o, a);
    }
    var u = this,
      l = xy("stat\0" + r, f);
    l && u.fs.lstat(r, l);
    function f(h, c) {
      if (c && c.isSymbolicLink())
        return u.fs.stat(r, function (d, m) {
          d ? u._stat2(e, r, null, c, t) : u._stat2(e, r, d, m, t);
        });
      u._stat2(e, r, h, c, t);
    }
  };
  me.prototype._stat2 = function (e, t, r, i, n) {
    if (r && (r.code === "ENOENT" || r.code === "ENOTDIR"))
      return (this.statCache[t] = !1), n();
    var s = e.slice(-1) === "/";
    if (((this.statCache[t] = i), t.slice(-1) === "/" && i && !i.isDirectory()))
      return n(null, !1, i);
    var a = !0;
    return (
      i && (a = i.isDirectory() ? "DIR" : "FILE"),
      (this.cache[t] = this.cache[t] || a),
      s && a === "FILE" ? n() : n(null, a, i)
    );
  };
});
var TR = y((jee, OR) => {
  var CR = n0(),
    ra = require("path"),
    Cy = mF(),
    XH = OF(),
    ZH = jF(),
    KH = WF(),
    QH = Dy(),
    kn = (OR.exports = {}),
    xR = /[\/\\]/g,
    JH = function (e, t) {
      var r = [];
      return (
        Cy(e).forEach(function (i) {
          var n = i.indexOf("!") === 0;
          n && (i = i.slice(1));
          var s = t(i);
          n ? (r = XH(r, s)) : (r = ZH(r, s));
        }),
        r
      );
    };
  kn.exists = function () {
    var e = ra.join.apply(ra, arguments);
    return CR.existsSync(e);
  };
  kn.expand = function (...e) {
    var t = KH(e[0]) ? e.shift() : {},
      r = Array.isArray(e[0]) ? e[0] : e;
    if (r.length === 0) return [];
    var i = JH(r, function (n) {
      return QH.sync(n, t);
    });
    return (
      t.filter &&
        (i = i.filter(function (n) {
          n = ra.join(t.cwd || "", n);
          try {
            return typeof t.filter == "function"
              ? t.filter(n)
              : CR.statSync(n)[t.filter]();
          } catch {
            return !1;
          }
        })),
      i
    );
  };
  kn.expandMapping = function (e, t, r) {
    r = Object.assign(
      {
        rename: function (s, a) {
          return ra.join(s || "", a);
        },
      },
      r,
    );
    var i = [],
      n = {};
    return (
      kn.expand(r, e).forEach(function (s) {
        var a = s;
        r.flatten && (a = ra.basename(a)),
          r.ext && (a = a.replace(/(\.[^\/]*)?$/, r.ext));
        var o = r.rename(t, a, r);
        r.cwd && (s = ra.join(r.cwd, s)),
          (o = o.replace(xR, "/")),
          (s = s.replace(xR, "/")),
          n[o]
            ? n[o].src.push(s)
            : (i.push({ src: [s], dest: o }), (n[o] = i[i.length - 1]));
      }),
      i
    );
  };
  kn.normalizeFilesArray = function (e) {
    var t = [];
    return (
      e.forEach(function (r) {
        var i;
        ("src" in r || "dest" in r) && t.push(r);
      }),
      t.length === 0
        ? []
        : ((t = _(t)
            .chain()
            .forEach(function (r) {
              !("src" in r) ||
                !r.src ||
                (Array.isArray(r.src)
                  ? (r.src = Cy(r.src))
                  : (r.src = [r.src]));
            })
            .map(function (r) {
              var i = Object.assign({}, r);
              if ((delete i.src, delete i.dest, r.expand))
                return kn.expandMapping(r.src, r.dest, i).map(function (s) {
                  var a = Object.assign({}, r);
                  return (
                    (a.orig = Object.assign({}, r)),
                    (a.src = s.src),
                    (a.dest = s.dest),
                    ["expand", "cwd", "flatten", "rename", "ext"].forEach(
                      function (o) {
                        delete a[o];
                      },
                    ),
                    a
                  );
                });
              var n = Object.assign({}, r);
              return (
                (n.orig = Object.assign({}, r)),
                "src" in n &&
                  Object.defineProperty(n, "src", {
                    enumerable: !0,
                    get: function s() {
                      var a;
                      return (
                        "result" in s ||
                          ((a = r.src),
                          (a = Array.isArray(a) ? Cy(a) : [a]),
                          (s.result = kn.expand(i, a))),
                        s.result
                      );
                    },
                  }),
                "dest" in n && (n.dest = r.dest),
                n
              );
            })
            .flatten()
            .value()),
          t)
    );
  };
});
var ia = y((zee, AR) => {
  var Oy = n0(),
    FR = require("path"),
    Uee = require("util"),
    eV = cT(),
    RR = C0(),
    tV = bT(),
    rV = require("stream").Stream,
    iV = lF().PassThrough,
    Lt = (AR.exports = {});
  Lt.file = TR();
  Lt.collectStream = function (e, t) {
    var r = [],
      i = 0;
    e.on("error", t),
      e.on("data", function (n) {
        r.push(n), (i += n.length);
      }),
      e.on("end", function () {
        var n = new Buffer(i),
          s = 0;
        r.forEach(function (a) {
          a.copy(n, s), (s += a.length);
        }),
          t(null, n);
      });
  };
  Lt.dateify = function (e) {
    return (
      (e = e || new Date()),
      e instanceof Date
        ? (e = e)
        : typeof e == "string"
        ? (e = new Date(e))
        : (e = new Date()),
      e
    );
  };
  Lt.defaults = function (e, t, r) {
    var i = arguments;
    return (i[0] = i[0] || {}), tV(...i);
  };
  Lt.isStream = function (e) {
    return e instanceof rV;
  };
  Lt.lazyReadStream = function (e) {
    return new eV.Readable(function () {
      return Oy.createReadStream(e);
    });
  };
  Lt.normalizeInputSource = function (e) {
    if (e === null) return new Buffer(0);
    if (typeof e == "string") return new Buffer(e);
    if (Lt.isStream(e) && !e._readableState) {
      var t = new iV();
      return e.pipe(t), t;
    }
    return e;
  };
  Lt.sanitizePath = function (e) {
    return RR(e, !1)
      .replace(/^\w+:/, "")
      .replace(/^(\.\.\/|\/)+/, "");
  };
  Lt.trailingSlashIt = function (e) {
    return e.slice(-1) !== "/" ? e + "/" : e;
  };
  Lt.unixifyPath = function (e) {
    return RR(e, !1).replace(/^\w+:/, "");
  };
  Lt.walkdir = function (e, t, r) {
    var i = [];
    typeof t == "function" && ((r = t), (t = e)),
      Oy.readdir(e, function (n, s) {
        var a = 0,
          o,
          u;
        if (n) return r(n);
        (function l() {
          if (((o = s[a++]), !o)) return r(null, i);
          (u = FR.join(e, o)),
            Oy.stat(u, function (f, h) {
              i.push({
                path: u,
                relative: FR.relative(t, u).replace(/\\/g, "/"),
                stats: h,
              }),
                h && h.isDirectory()
                  ? Lt.walkdir(u, t, function (c, d) {
                      d.forEach(function (m) {
                        i.push(m);
                      }),
                        l();
                    })
                  : l();
            });
        })();
      });
  };
});
var LR = y((IR, MR) => {
  /**
   * Archiver Core
   *
   * @ignore
   * @license [MIT]{@link https://github.com/archiverjs/node-archiver/blob/master/LICENSE}
   * @copyright (c) 2012-2014 Chris Talkington, contributors.
   */ var nV = require("util"),
    sV = {
      ABORTED: "archive was aborted",
      DIRECTORYDIRPATHREQUIRED:
        "diretory dirpath argument must be a non-empty string value",
      DIRECTORYFUNCTIONINVALIDDATA:
        "invalid data returned by directory custom data function",
      ENTRYNAMEREQUIRED: "entry name must be a non-empty string value",
      FILEFILEPATHREQUIRED:
        "file filepath argument must be a non-empty string value",
      FINALIZING: "archive already finalizing",
      QUEUECLOSED: "queue closed",
      NOENDMETHOD: "no suitable finalize/end method defined by module",
      DIRECTORYNOTSUPPORTED:
        "support for directory entries not defined by module",
      FORMATSET: "archive format already set",
      INPUTSTEAMBUFFERREQUIRED:
        "input source must be valid Stream or Buffer instance",
      MODULESET: "module already set",
      SYMLINKNOTSUPPORTED: "support for symlink entries not defined by module",
      SYMLINKFILEPATHREQUIRED:
        "symlink filepath argument must be a non-empty string value",
      SYMLINKTARGETREQUIRED:
        "symlink target argument must be a non-empty string value",
      ENTRYNOTSUPPORTED: "entry not supported",
    };
  function NR(e, t) {
    Error.captureStackTrace(this, this.constructor),
      (this.message = sV[e] || e),
      (this.code = e),
      (this.data = t);
  }
  nV.inherits(NR, Error);
  IR = MR.exports = NR;
});
var jR = y(($ee, kR) => {
  /**
   * Archiver Core
   *
   * @ignore
   * @license [MIT]{@link https://github.com/archiverjs/node-archiver/blob/master/LICENSE}
   * @copyright (c) 2012-2014 Chris Talkington, contributors.
   */ var Ry = require("fs"),
    PR = sO(),
    qR = oO(),
    Ty = require("path"),
    _r = ia(),
    aV = require("util").inherits,
    Fe = LR(),
    BR = at().Transform,
    Fy = process.platform === "win32",
    ce = function (e, t) {
      if (!(this instanceof ce)) return new ce(e, t);
      typeof e != "string" && ((t = e), (e = "zip")),
        (t = this.options =
          _r.defaults(t, { highWaterMark: 1024 * 1024, statConcurrency: 4 })),
        BR.call(this, t),
        (this._format = !1),
        (this._module = !1),
        (this._pending = 0),
        (this._pointer = 0),
        (this._entriesCount = 0),
        (this._entriesProcessedCount = 0),
        (this._fsEntriesTotalBytes = 0),
        (this._fsEntriesProcessedBytes = 0),
        (this._queue = qR.queue(this._onQueueTask.bind(this), 1)),
        this._queue.drain(this._onQueueDrain.bind(this)),
        (this._statQueue = qR.queue(
          this._onStatQueueTask.bind(this),
          t.statConcurrency,
        )),
        this._statQueue.drain(this._onQueueDrain.bind(this)),
        (this._state = {
          aborted: !1,
          finalize: !1,
          finalizing: !1,
          finalized: !1,
          modulePiped: !1,
        }),
        (this._streams = []);
    };
  aV(ce, BR);
  ce.prototype._abort = function () {
    (this._state.aborted = !0),
      this._queue.kill(),
      this._statQueue.kill(),
      this._queue.idle() && this._shutdown();
  };
  ce.prototype._append = function (e, t) {
    t = t || {};
    var r = { source: null, filepath: e };
    t.name || (t.name = e),
      (t.sourcePath = e),
      (r.data = t),
      this._entriesCount++,
      t.stats && t.stats instanceof Ry.Stats
        ? ((r = this._updateQueueTaskWithStats(r, t.stats)),
          r &&
            (t.stats.size && (this._fsEntriesTotalBytes += t.stats.size),
            this._queue.push(r)))
        : this._statQueue.push(r);
  };
  ce.prototype._finalize = function () {
    this._state.finalizing ||
      this._state.finalized ||
      this._state.aborted ||
      ((this._state.finalizing = !0),
      this._moduleFinalize(),
      (this._state.finalizing = !1),
      (this._state.finalized = !0));
  };
  ce.prototype._maybeFinalize = function () {
    return this._state.finalizing ||
      this._state.finalized ||
      this._state.aborted
      ? !1
      : this._state.finalize &&
        this._pending === 0 &&
        this._queue.idle() &&
        this._statQueue.idle()
      ? (this._finalize(), !0)
      : !1;
  };
  ce.prototype._moduleAppend = function (e, t, r) {
    if (this._state.aborted) {
      r();
      return;
    }
    this._module.append(
      e,
      t,
      function (i) {
        if (((this._task = null), this._state.aborted)) {
          this._shutdown();
          return;
        }
        if (i) {
          this.emit("error", i), setImmediate(r);
          return;
        }
        this.emit("entry", t),
          this._entriesProcessedCount++,
          t.stats &&
            t.stats.size &&
            (this._fsEntriesProcessedBytes += t.stats.size),
          this.emit("progress", {
            entries: {
              total: this._entriesCount,
              processed: this._entriesProcessedCount,
            },
            fs: {
              totalBytes: this._fsEntriesTotalBytes,
              processedBytes: this._fsEntriesProcessedBytes,
            },
          }),
          setImmediate(r);
      }.bind(this),
    );
  };
  ce.prototype._moduleFinalize = function () {
    typeof this._module.finalize == "function"
      ? this._module.finalize()
      : typeof this._module.end == "function"
      ? this._module.end()
      : this.emit("error", new Fe("NOENDMETHOD"));
  };
  ce.prototype._modulePipe = function () {
    this._module.on("error", this._onModuleError.bind(this)),
      this._module.pipe(this),
      (this._state.modulePiped = !0);
  };
  ce.prototype._moduleSupports = function (e) {
    return !this._module.supports || !this._module.supports[e]
      ? !1
      : this._module.supports[e];
  };
  ce.prototype._moduleUnpipe = function () {
    this._module.unpipe(this), (this._state.modulePiped = !1);
  };
  ce.prototype._normalizeEntryData = function (e, t) {
    (e = _r.defaults(e, {
      type: "file",
      name: null,
      date: null,
      mode: null,
      prefix: null,
      sourcePath: null,
      stats: !1,
    })),
      t && e.stats === !1 && (e.stats = t);
    var r = e.type === "directory";
    return (
      e.name &&
        (typeof e.prefix == "string" &&
          e.prefix !== "" &&
          ((e.name = e.prefix + "/" + e.name), (e.prefix = null)),
        (e.name = _r.sanitizePath(e.name)),
        e.type !== "symlink" && e.name.slice(-1) === "/"
          ? ((r = !0), (e.type = "directory"))
          : r && (e.name += "/")),
      typeof e.mode == "number"
        ? Fy
          ? (e.mode &= 511)
          : (e.mode &= 4095)
        : e.stats && e.mode === null
        ? (Fy ? (e.mode = e.stats.mode & 511) : (e.mode = e.stats.mode & 4095),
          Fy && r && (e.mode = 493))
        : e.mode === null && (e.mode = r ? 493 : 420),
      e.stats && e.date === null
        ? (e.date = e.stats.mtime)
        : (e.date = _r.dateify(e.date)),
      e
    );
  };
  ce.prototype._onModuleError = function (e) {
    this.emit("error", e);
  };
  ce.prototype._onQueueDrain = function () {
    this._state.finalizing ||
      this._state.finalized ||
      this._state.aborted ||
      (this._state.finalize &&
        this._pending === 0 &&
        this._queue.idle() &&
        this._statQueue.idle() &&
        this._finalize());
  };
  ce.prototype._onQueueTask = function (e, t) {
    var r = () => {
      e.data.callback && e.data.callback(), t();
    };
    if (
      this._state.finalizing ||
      this._state.finalized ||
      this._state.aborted
    ) {
      r();
      return;
    }
    (this._task = e), this._moduleAppend(e.source, e.data, r);
  };
  ce.prototype._onStatQueueTask = function (e, t) {
    if (
      this._state.finalizing ||
      this._state.finalized ||
      this._state.aborted
    ) {
      t();
      return;
    }
    Ry.lstat(
      e.filepath,
      function (r, i) {
        if (this._state.aborted) {
          setImmediate(t);
          return;
        }
        if (r) {
          this._entriesCount--, this.emit("warning", r), setImmediate(t);
          return;
        }
        (e = this._updateQueueTaskWithStats(e, i)),
          e &&
            (i.size && (this._fsEntriesTotalBytes += i.size),
            this._queue.push(e)),
          setImmediate(t);
      }.bind(this),
    );
  };
  ce.prototype._shutdown = function () {
    this._moduleUnpipe(), this.end();
  };
  ce.prototype._transform = function (e, t, r) {
    e && (this._pointer += e.length), r(null, e);
  };
  ce.prototype._updateQueueTaskWithStats = function (e, t) {
    if (t.isFile())
      (e.data.type = "file"),
        (e.data.sourceType = "stream"),
        (e.source = _r.lazyReadStream(e.filepath));
    else if (t.isDirectory() && this._moduleSupports("directory"))
      (e.data.name = _r.trailingSlashIt(e.data.name)),
        (e.data.type = "directory"),
        (e.data.sourcePath = _r.trailingSlashIt(e.filepath)),
        (e.data.sourceType = "buffer"),
        (e.source = Buffer.concat([]));
    else if (t.isSymbolicLink() && this._moduleSupports("symlink")) {
      var r = Ry.readlinkSync(e.filepath),
        i = Ty.dirname(e.filepath);
      (e.data.type = "symlink"),
        (e.data.linkname = Ty.relative(i, Ty.resolve(i, r))),
        (e.data.sourceType = "buffer"),
        (e.source = Buffer.concat([]));
    } else
      return (
        t.isDirectory()
          ? this.emit("warning", new Fe("DIRECTORYNOTSUPPORTED", e.data))
          : t.isSymbolicLink()
          ? this.emit("warning", new Fe("SYMLINKNOTSUPPORTED", e.data))
          : this.emit("warning", new Fe("ENTRYNOTSUPPORTED", e.data)),
        null
      );
    return (e.data = this._normalizeEntryData(e.data, t)), e;
  };
  ce.prototype.abort = function () {
    return this._state.aborted || this._state.finalized
      ? this
      : (this._abort(), this);
  };
  ce.prototype.append = function (e, t) {
    if (this._state.finalize || this._state.aborted)
      return this.emit("error", new Fe("QUEUECLOSED")), this;
    if (
      ((t = this._normalizeEntryData(t)),
      typeof t.name != "string" || t.name.length === 0)
    )
      return this.emit("error", new Fe("ENTRYNAMEREQUIRED")), this;
    if (t.type === "directory" && !this._moduleSupports("directory"))
      return (
        this.emit("error", new Fe("DIRECTORYNOTSUPPORTED", { name: t.name })),
        this
      );
    if (((e = _r.normalizeInputSource(e)), Buffer.isBuffer(e)))
      t.sourceType = "buffer";
    else if (_r.isStream(e)) t.sourceType = "stream";
    else
      return (
        this.emit(
          "error",
          new Fe("INPUTSTEAMBUFFERREQUIRED", { name: t.name }),
        ),
        this
      );
    return this._entriesCount++, this._queue.push({ data: t, source: e }), this;
  };
  ce.prototype.directory = function (e, t, r) {
    if (this._state.finalize || this._state.aborted)
      return this.emit("error", new Fe("QUEUECLOSED")), this;
    if (typeof e != "string" || e.length === 0)
      return this.emit("error", new Fe("DIRECTORYDIRPATHREQUIRED")), this;
    this._pending++, t === !1 ? (t = "") : typeof t != "string" && (t = e);
    var i = !1;
    typeof r == "function"
      ? ((i = r), (r = {}))
      : typeof r != "object" && (r = {});
    var n = { stat: !0, dot: !0 };
    function s() {
      this._pending--, this._maybeFinalize();
    }
    function a(l) {
      this.emit("error", l);
    }
    function o(l) {
      u.pause();
      var f = !1,
        h = Object.assign({}, r);
      (h.name = l.relative),
        (h.prefix = t),
        (h.stats = l.stat),
        (h.callback = u.resume.bind(u));
      try {
        if (i) {
          if (((h = i(h)), h === !1)) f = !0;
          else if (typeof h != "object")
            throw new Fe("DIRECTORYFUNCTIONINVALIDDATA", { dirpath: e });
        }
      } catch (c) {
        this.emit("error", c);
        return;
      }
      if (f) {
        u.resume();
        return;
      }
      this._append(l.absolute, h);
    }
    var u = PR(e, n);
    return (
      u.on("error", a.bind(this)),
      u.on("match", o.bind(this)),
      u.on("end", s.bind(this)),
      this
    );
  };
  ce.prototype.file = function (e, t) {
    return this._state.finalize || this._state.aborted
      ? (this.emit("error", new Fe("QUEUECLOSED")), this)
      : typeof e != "string" || e.length === 0
      ? (this.emit("error", new Fe("FILEFILEPATHREQUIRED")), this)
      : (this._append(e, t), this);
  };
  ce.prototype.glob = function (e, t, r) {
    this._pending++, (t = _r.defaults(t, { stat: !0, pattern: e }));
    function i() {
      this._pending--, this._maybeFinalize();
    }
    function n(o) {
      this.emit("error", o);
    }
    function s(o) {
      a.pause();
      var u = Object.assign({}, r);
      (u.callback = a.resume.bind(a)),
        (u.stats = o.stat),
        (u.name = o.relative),
        this._append(o.absolute, u);
    }
    var a = PR(t.cwd || ".", t);
    return (
      a.on("error", n.bind(this)),
      a.on("match", s.bind(this)),
      a.on("end", i.bind(this)),
      this
    );
  };
  ce.prototype.finalize = function () {
    if (this._state.aborted) {
      var e = new Fe("ABORTED");
      return this.emit("error", e), Promise.reject(e);
    }
    if (this._state.finalize) {
      var t = new Fe("FINALIZING");
      return this.emit("error", t), Promise.reject(t);
    }
    (this._state.finalize = !0),
      this._pending === 0 &&
        this._queue.idle() &&
        this._statQueue.idle() &&
        this._finalize();
    var r = this;
    return new Promise(function (i, n) {
      var s;
      r._module.on("end", function () {
        s || i();
      }),
        r._module.on("error", function (a) {
          (s = !0), n(a);
        });
    });
  };
  ce.prototype.setFormat = function (e) {
    return this._format
      ? (this.emit("error", new Fe("FORMATSET")), this)
      : ((this._format = e), this);
  };
  ce.prototype.setModule = function (e) {
    return this._state.aborted
      ? (this.emit("error", new Fe("ABORTED")), this)
      : this._state.module
      ? (this.emit("error", new Fe("MODULESET")), this)
      : ((this._module = e), this._modulePipe(), this);
  };
  ce.prototype.symlink = function (e, t, r) {
    if (this._state.finalize || this._state.aborted)
      return this.emit("error", new Fe("QUEUECLOSED")), this;
    if (typeof e != "string" || e.length === 0)
      return this.emit("error", new Fe("SYMLINKFILEPATHREQUIRED")), this;
    if (typeof t != "string" || t.length === 0)
      return (
        this.emit("error", new Fe("SYMLINKTARGETREQUIRED", { filepath: e })),
        this
      );
    if (!this._moduleSupports("symlink"))
      return (
        this.emit("error", new Fe("SYMLINKNOTSUPPORTED", { filepath: e })), this
      );
    var i = {};
    return (
      (i.type = "symlink"),
      (i.name = e.replace(/\\/g, "/")),
      (i.linkname = t.replace(/\\/g, "/")),
      (i.sourceType = "buffer"),
      typeof r == "number" && (i.mode = r),
      this._entriesCount++,
      this._queue.push({ data: i, source: Buffer.concat([]) }),
      this
    );
  };
  ce.prototype.pointer = function () {
    return this._pointer;
  };
  ce.prototype.use = function (e) {
    return this._streams.push(e), this;
  };
  kR.exports = ce;
});
var rc = y((Wee, UR) => {
  var tc = (UR.exports = function () {});
  tc.prototype.getName = function () {};
  tc.prototype.getSize = function () {};
  tc.prototype.getLastModifiedDate = function () {};
  tc.prototype.isDirectory = function () {};
});
var ic = y((Gee, zR) => {
  var Zt = (zR.exports = {});
  Zt.dateToDos = function (e, t) {
    t = t || !1;
    var r = t ? e.getFullYear() : e.getUTCFullYear();
    if (r < 1980) return 2162688;
    if (r >= 2044) return 2141175677;
    var i = {
      year: r,
      month: t ? e.getMonth() : e.getUTCMonth(),
      date: t ? e.getDate() : e.getUTCDate(),
      hours: t ? e.getHours() : e.getUTCHours(),
      minutes: t ? e.getMinutes() : e.getUTCMinutes(),
      seconds: t ? e.getSeconds() : e.getUTCSeconds(),
    };
    return (
      ((i.year - 1980) << 25) |
      ((i.month + 1) << 21) |
      (i.date << 16) |
      (i.hours << 11) |
      (i.minutes << 5) |
      (i.seconds / 2)
    );
  };
  Zt.dosToDate = function (e) {
    return new Date(
      ((e >> 25) & 127) + 1980,
      ((e >> 21) & 15) - 1,
      (e >> 16) & 31,
      (e >> 11) & 31,
      (e >> 5) & 63,
      (e & 31) << 1,
    );
  };
  Zt.fromDosTime = function (e) {
    return Zt.dosToDate(e.readUInt32LE(0));
  };
  Zt.getEightBytes = function (e) {
    var t = Buffer.alloc(8);
    return (
      t.writeUInt32LE(e % 4294967296, 0),
      t.writeUInt32LE((e / 4294967296) | 0, 4),
      t
    );
  };
  Zt.getShortBytes = function (e) {
    var t = Buffer.alloc(2);
    return t.writeUInt16LE((e & 65535) >>> 0, 0), t;
  };
  Zt.getShortBytesValue = function (e, t) {
    return e.readUInt16LE(t);
  };
  Zt.getLongBytes = function (e) {
    var t = Buffer.alloc(4);
    return t.writeUInt32LE((e & 4294967295) >>> 0, 0), t;
  };
  Zt.getLongBytesValue = function (e, t) {
    return e.readUInt32LE(t);
  };
  Zt.toDosTime = function (e) {
    return Zt.getLongBytes(Zt.dateToDos(e));
  };
});
var Ay = y((Hee, YR) => {
  var $R = ic(),
    WR = 1 << 3,
    GR = 1 << 0,
    oV = 1 << 2,
    uV = 1 << 1,
    HR = 1 << 6,
    VR = 1 << 11,
    rt = (YR.exports = function () {
      return this instanceof rt
        ? ((this.descriptor = !1),
          (this.encryption = !1),
          (this.utf8 = !1),
          (this.numberOfShannonFanoTrees = 0),
          (this.strongEncryption = !1),
          (this.slidingDictionarySize = 0),
          this)
        : new rt();
    });
  rt.prototype.encode = function () {
    return $R.getShortBytes(
      (this.descriptor ? WR : 0) |
        (this.utf8 ? VR : 0) |
        (this.encryption ? GR : 0) |
        (this.strongEncryption ? HR : 0),
    );
  };
  rt.prototype.parse = function (e, t) {
    var r = $R.getShortBytesValue(e, t),
      i = new rt();
    return (
      i.useDataDescriptor((r & WR) !== 0),
      i.useUTF8ForNames((r & VR) !== 0),
      i.useStrongEncryption((r & HR) !== 0),
      i.useEncryption((r & GR) !== 0),
      i.setSlidingDictionarySize((r & uV) !== 0 ? 8192 : 4096),
      i.setNumberOfShannonFanoTrees((r & oV) !== 0 ? 3 : 2),
      i
    );
  };
  rt.prototype.setNumberOfShannonFanoTrees = function (e) {
    this.numberOfShannonFanoTrees = e;
  };
  rt.prototype.getNumberOfShannonFanoTrees = function () {
    return this.numberOfShannonFanoTrees;
  };
  rt.prototype.setSlidingDictionarySize = function (e) {
    this.slidingDictionarySize = e;
  };
  rt.prototype.getSlidingDictionarySize = function () {
    return this.slidingDictionarySize;
  };
  rt.prototype.useDataDescriptor = function (e) {
    this.descriptor = e;
  };
  rt.prototype.usesDataDescriptor = function () {
    return this.descriptor;
  };
  rt.prototype.useEncryption = function (e) {
    this.encryption = e;
  };
  rt.prototype.usesEncryption = function () {
    return this.encryption;
  };
  rt.prototype.useStrongEncryption = function (e) {
    this.strongEncryption = e;
  };
  rt.prototype.usesStrongEncryption = function () {
    return this.strongEncryption;
  };
  rt.prototype.useUTF8ForNames = function (e) {
    this.utf8 = e;
  };
  rt.prototype.usesUTF8ForNames = function () {
    return this.utf8;
  };
});
var ZR = y((Vee, XR) => {
  XR.exports = {
    PERM_MASK: 4095,
    FILE_TYPE_FLAG: 61440,
    LINK_FLAG: 40960,
    FILE_FLAG: 32768,
    DIR_FLAG: 16384,
    DEFAULT_LINK_PERM: 511,
    DEFAULT_DIR_PERM: 493,
    DEFAULT_FILE_PERM: 420,
  };
});
var Ny = y((Yee, KR) => {
  KR.exports = {
    WORD: 4,
    DWORD: 8,
    EMPTY: Buffer.alloc(0),
    SHORT: 2,
    SHORT_MASK: 65535,
    SHORT_SHIFT: 16,
    SHORT_ZERO: Buffer.from(Array(2)),
    LONG: 4,
    LONG_ZERO: Buffer.from(Array(4)),
    MIN_VERSION_INITIAL: 10,
    MIN_VERSION_DATA_DESCRIPTOR: 20,
    MIN_VERSION_ZIP64: 45,
    VERSION_MADEBY: 45,
    METHOD_STORED: 0,
    METHOD_DEFLATED: 8,
    PLATFORM_UNIX: 3,
    PLATFORM_FAT: 0,
    SIG_LFH: 67324752,
    SIG_DD: 134695760,
    SIG_CFH: 33639248,
    SIG_EOCD: 101010256,
    SIG_ZIP64_EOCD: 101075792,
    SIG_ZIP64_EOCD_LOC: 117853008,
    ZIP64_MAGIC_SHORT: 65535,
    ZIP64_MAGIC: 4294967295,
    ZIP64_EXTRA_ID: 1,
    ZLIB_NO_COMPRESSION: 0,
    ZLIB_BEST_SPEED: 1,
    ZLIB_BEST_COMPRESSION: 9,
    ZLIB_DEFAULT_COMPRESSION: -1,
    MODE_MASK: 4095,
    DEFAULT_FILE_MODE: 33188,
    DEFAULT_DIR_MODE: 16877,
    EXT_FILE_ATTR_DIR: 1106051088,
    EXT_FILE_ATTR_FILE: 2175008800,
    S_IFMT: 61440,
    S_IFIFO: 4096,
    S_IFCHR: 8192,
    S_IFDIR: 16384,
    S_IFBLK: 24576,
    S_IFREG: 32768,
    S_IFLNK: 40960,
    S_IFSOCK: 49152,
    S_DOS_A: 32,
    S_DOS_D: 16,
    S_DOS_V: 8,
    S_DOS_S: 4,
    S_DOS_H: 2,
    S_DOS_R: 1,
  };
});
var Iy = y((Xee, rA) => {
  var lV = require("util").inherits,
    fV = C0(),
    JR = rc(),
    eA = Ay(),
    QR = ZR(),
    pt = Ny(),
    tA = ic(),
    re = (rA.exports = function (e) {
      if (!(this instanceof re)) return new re(e);
      JR.call(this),
        (this.platform = pt.PLATFORM_FAT),
        (this.method = -1),
        (this.name = null),
        (this.size = 0),
        (this.csize = 0),
        (this.gpb = new eA()),
        (this.crc = 0),
        (this.time = -1),
        (this.minver = pt.MIN_VERSION_INITIAL),
        (this.mode = -1),
        (this.extra = null),
        (this.exattr = 0),
        (this.inattr = 0),
        (this.comment = null),
        e && this.setName(e);
    });
  lV(re, JR);
  re.prototype.getCentralDirectoryExtra = function () {
    return this.getExtra();
  };
  re.prototype.getComment = function () {
    return this.comment !== null ? this.comment : "";
  };
  re.prototype.getCompressedSize = function () {
    return this.csize;
  };
  re.prototype.getCrc = function () {
    return this.crc;
  };
  re.prototype.getExternalAttributes = function () {
    return this.exattr;
  };
  re.prototype.getExtra = function () {
    return this.extra !== null ? this.extra : pt.EMPTY;
  };
  re.prototype.getGeneralPurposeBit = function () {
    return this.gpb;
  };
  re.prototype.getInternalAttributes = function () {
    return this.inattr;
  };
  re.prototype.getLastModifiedDate = function () {
    return this.getTime();
  };
  re.prototype.getLocalFileDataExtra = function () {
    return this.getExtra();
  };
  re.prototype.getMethod = function () {
    return this.method;
  };
  re.prototype.getName = function () {
    return this.name;
  };
  re.prototype.getPlatform = function () {
    return this.platform;
  };
  re.prototype.getSize = function () {
    return this.size;
  };
  re.prototype.getTime = function () {
    return this.time !== -1 ? tA.dosToDate(this.time) : -1;
  };
  re.prototype.getTimeDos = function () {
    return this.time !== -1 ? this.time : 0;
  };
  re.prototype.getUnixMode = function () {
    return this.platform !== pt.PLATFORM_UNIX
      ? 0
      : (this.getExternalAttributes() >> pt.SHORT_SHIFT) & pt.SHORT_MASK;
  };
  re.prototype.getVersionNeededToExtract = function () {
    return this.minver;
  };
  re.prototype.setComment = function (e) {
    Buffer.byteLength(e) !== e.length &&
      this.getGeneralPurposeBit().useUTF8ForNames(!0),
      (this.comment = e);
  };
  re.prototype.setCompressedSize = function (e) {
    if (e < 0) throw new Error("invalid entry compressed size");
    this.csize = e;
  };
  re.prototype.setCrc = function (e) {
    if (e < 0) throw new Error("invalid entry crc32");
    this.crc = e;
  };
  re.prototype.setExternalAttributes = function (e) {
    this.exattr = e >>> 0;
  };
  re.prototype.setExtra = function (e) {
    this.extra = e;
  };
  re.prototype.setGeneralPurposeBit = function (e) {
    if (!(e instanceof eA)) throw new Error("invalid entry GeneralPurposeBit");
    this.gpb = e;
  };
  re.prototype.setInternalAttributes = function (e) {
    this.inattr = e;
  };
  re.prototype.setMethod = function (e) {
    if (e < 0) throw new Error("invalid entry compression method");
    this.method = e;
  };
  re.prototype.setName = function (e, t = !1) {
    (e = fV(e, !1)
      .replace(/^\w+:/, "")
      .replace(/^(\.\.\/|\/)+/, "")),
      t && (e = `/${e}`),
      Buffer.byteLength(e) !== e.length &&
        this.getGeneralPurposeBit().useUTF8ForNames(!0),
      (this.name = e);
  };
  re.prototype.setPlatform = function (e) {
    this.platform = e;
  };
  re.prototype.setSize = function (e) {
    if (e < 0) throw new Error("invalid entry size");
    this.size = e;
  };
  re.prototype.setTime = function (e, t) {
    if (!(e instanceof Date)) throw new Error("invalid entry time");
    this.time = tA.dateToDos(e, t);
  };
  re.prototype.setUnixMode = function (e) {
    e |= this.isDirectory() ? pt.S_IFDIR : pt.S_IFREG;
    var t = 0;
    (t |=
      (e << pt.SHORT_SHIFT) | (this.isDirectory() ? pt.S_DOS_D : pt.S_DOS_A)),
      this.setExternalAttributes(t),
      (this.mode = e & pt.MODE_MASK),
      (this.platform = pt.PLATFORM_UNIX);
  };
  re.prototype.setVersionNeededToExtract = function (e) {
    this.minver = e;
  };
  re.prototype.isDirectory = function () {
    return this.getName().slice(-1) === "/";
  };
  re.prototype.isUnixSymlink = function () {
    return (this.getUnixMode() & QR.FILE_TYPE_FLAG) === QR.LINK_FLAG;
  };
  re.prototype.isZip64 = function () {
    return this.csize > pt.ZIP64_MAGIC || this.size > pt.ZIP64_MAGIC;
  };
});
var Ly = y((Zee, iA) => {
  var hV = require("stream").Stream,
    cV = at().PassThrough,
    My = (iA.exports = {});
  My.isStream = function (e) {
    return e instanceof hV;
  };
  My.normalizeInputSource = function (e) {
    if (e === null) return Buffer.alloc(0);
    if (typeof e == "string") return Buffer.from(e);
    if (My.isStream(e) && !e._readableState) {
      var t = new cV();
      return e.pipe(t), t;
    }
    return e;
  };
});
var Py = y((Kee, sA) => {
  var dV = require("util").inherits,
    qy = at().Transform,
    pV = rc(),
    nA = Ly(),
    qt = (sA.exports = function (e) {
      if (!(this instanceof qt)) return new qt(e);
      qy.call(this, e),
        (this.offset = 0),
        (this._archive = { finish: !1, finished: !1, processing: !1 });
    });
  dV(qt, qy);
  qt.prototype._appendBuffer = function (e, t, r) {};
  qt.prototype._appendStream = function (e, t, r) {};
  qt.prototype._emitErrorCallback = function (e) {
    e && this.emit("error", e);
  };
  qt.prototype._finish = function (e) {};
  qt.prototype._normalizeEntry = function (e) {};
  qt.prototype._transform = function (e, t, r) {
    r(null, e);
  };
  qt.prototype.entry = function (e, t, r) {
    if (
      ((t = t || null),
      typeof r != "function" && (r = this._emitErrorCallback.bind(this)),
      !(e instanceof pV))
    ) {
      r(new Error("not a valid instance of ArchiveEntry"));
      return;
    }
    if (this._archive.finish || this._archive.finished) {
      r(new Error("unacceptable entry after finish"));
      return;
    }
    if (this._archive.processing) {
      r(new Error("already processing an entry"));
      return;
    }
    if (
      ((this._archive.processing = !0),
      this._normalizeEntry(e),
      (this._entry = e),
      (t = nA.normalizeInputSource(t)),
      Buffer.isBuffer(t))
    )
      this._appendBuffer(e, t, r);
    else if (nA.isStream(t)) this._appendStream(e, t, r);
    else {
      (this._archive.processing = !1),
        r(new Error("input source must be valid Stream or Buffer instance"));
      return;
    }
    return this;
  };
  qt.prototype.finish = function () {
    if (this._archive.processing) {
      this._archive.finish = !0;
      return;
    }
    this._finish();
  };
  qt.prototype.getBytesWritten = function () {
    return this.offset;
  };
  qt.prototype.write = function (e, t) {
    return e && (this.offset += e.length), qy.prototype.write.call(this, e, t);
  };
});
var ky = y((By) => {
  /*! crc32.js (C) 2014-present SheetJS -- http://sheetjs.com */ var aA;
  (function (e) {
    typeof DO_NOT_EXPORT_CRC > "u"
      ? typeof By == "object"
        ? e(By)
        : typeof define == "function" && define.amd
        ? define(function () {
            var t = {};
            return e(t), t;
          })
        : e((aA = {}))
      : e((aA = {}));
  })(function (e) {
    e.version = "1.2.2";
    function t() {
      for (var x = 0, A = new Array(256), p = 0; p != 256; ++p)
        (x = p),
          (x = x & 1 ? -306674912 ^ (x >>> 1) : x >>> 1),
          (x = x & 1 ? -306674912 ^ (x >>> 1) : x >>> 1),
          (x = x & 1 ? -306674912 ^ (x >>> 1) : x >>> 1),
          (x = x & 1 ? -306674912 ^ (x >>> 1) : x >>> 1),
          (x = x & 1 ? -306674912 ^ (x >>> 1) : x >>> 1),
          (x = x & 1 ? -306674912 ^ (x >>> 1) : x >>> 1),
          (x = x & 1 ? -306674912 ^ (x >>> 1) : x >>> 1),
          (x = x & 1 ? -306674912 ^ (x >>> 1) : x >>> 1),
          (A[p] = x);
      return typeof Int32Array < "u" ? new Int32Array(A) : A;
    }
    var r = t();
    function i(x) {
      var A = 0,
        p = 0,
        T = 0,
        R = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
      for (T = 0; T != 256; ++T) R[T] = x[T];
      for (T = 0; T != 256; ++T)
        for (p = x[T], A = 256 + T; A < 4096; A += 256)
          p = R[A] = (p >>> 8) ^ x[p & 255];
      var k = [];
      for (T = 1; T != 16; ++T)
        k[T - 1] =
          typeof Int32Array < "u"
            ? R.subarray(T * 256, T * 256 + 256)
            : R.slice(T * 256, T * 256 + 256);
      return k;
    }
    var n = i(r),
      s = n[0],
      a = n[1],
      o = n[2],
      u = n[3],
      l = n[4],
      f = n[5],
      h = n[6],
      c = n[7],
      d = n[8],
      m = n[9],
      C = n[10],
      E = n[11],
      O = n[12],
      L = n[13],
      D = n[14];
    function w(x, A) {
      for (var p = A ^ -1, T = 0, R = x.length; T < R; )
        p = (p >>> 8) ^ r[(p ^ x.charCodeAt(T++)) & 255];
      return ~p;
    }
    function F(x, A) {
      for (var p = A ^ -1, T = x.length - 15, R = 0; R < T; )
        p =
          D[x[R++] ^ (p & 255)] ^
          L[x[R++] ^ ((p >> 8) & 255)] ^
          O[x[R++] ^ ((p >> 16) & 255)] ^
          E[x[R++] ^ (p >>> 24)] ^
          C[x[R++]] ^
          m[x[R++]] ^
          d[x[R++]] ^
          c[x[R++]] ^
          h[x[R++]] ^
          f[x[R++]] ^
          l[x[R++]] ^
          u[x[R++]] ^
          o[x[R++]] ^
          a[x[R++]] ^
          s[x[R++]] ^
          r[x[R++]];
      for (T += 15; R < T; ) p = (p >>> 8) ^ r[(p ^ x[R++]) & 255];
      return ~p;
    }
    function g(x, A) {
      for (var p = A ^ -1, T = 0, R = x.length, k = 0, z = 0; T < R; )
        (k = x.charCodeAt(T++)),
          k < 128
            ? (p = (p >>> 8) ^ r[(p ^ k) & 255])
            : k < 2048
            ? ((p = (p >>> 8) ^ r[(p ^ (192 | ((k >> 6) & 31))) & 255]),
              (p = (p >>> 8) ^ r[(p ^ (128 | (k & 63))) & 255]))
            : k >= 55296 && k < 57344
            ? ((k = (k & 1023) + 64),
              (z = x.charCodeAt(T++) & 1023),
              (p = (p >>> 8) ^ r[(p ^ (240 | ((k >> 8) & 7))) & 255]),
              (p = (p >>> 8) ^ r[(p ^ (128 | ((k >> 2) & 63))) & 255]),
              (p =
                (p >>> 8) ^
                r[(p ^ (128 | ((z >> 6) & 15) | ((k & 3) << 4))) & 255]),
              (p = (p >>> 8) ^ r[(p ^ (128 | (z & 63))) & 255]))
            : ((p = (p >>> 8) ^ r[(p ^ (224 | ((k >> 12) & 15))) & 255]),
              (p = (p >>> 8) ^ r[(p ^ (128 | ((k >> 6) & 63))) & 255]),
              (p = (p >>> 8) ^ r[(p ^ (128 | (k & 63))) & 255]));
      return ~p;
    }
    (e.table = r), (e.bstr = w), (e.buf = F), (e.str = g);
  });
});
var uA = y((Jee, oA) => {
  "use strict";
  var { Transform: mV } = at(),
    gV = ky(),
    jy = class extends mV {
      constructor(t) {
        super(t),
          (this.checksum = Buffer.allocUnsafe(4)),
          this.checksum.writeInt32BE(0, 0),
          (this.rawSize = 0);
      }
      _transform(t, r, i) {
        t &&
          ((this.checksum = gV.buf(t, this.checksum) >>> 0),
          (this.rawSize += t.length)),
          i(null, t);
      }
      digest(t) {
        let r = Buffer.allocUnsafe(4);
        return r.writeUInt32BE(this.checksum >>> 0, 0), t ? r.toString(t) : r;
      }
      hex() {
        return this.digest("hex").toUpperCase();
      }
      size() {
        return this.rawSize;
      }
    };
  oA.exports = jy;
});
var fA = y((ete, lA) => {
  "use strict";
  var { DeflateRaw: yV } = require("zlib"),
    vV = ky(),
    Uy = class extends yV {
      constructor(t) {
        super(t),
          (this.checksum = Buffer.allocUnsafe(4)),
          this.checksum.writeInt32BE(0, 0),
          (this.rawSize = 0),
          (this.compressedSize = 0);
      }
      push(t, r) {
        return t && (this.compressedSize += t.length), super.push(t, r);
      }
      _transform(t, r, i) {
        t &&
          ((this.checksum = vV.buf(t, this.checksum) >>> 0),
          (this.rawSize += t.length)),
          super._transform(t, r, i);
      }
      digest(t) {
        let r = Buffer.allocUnsafe(4);
        return r.writeUInt32BE(this.checksum >>> 0, 0), t ? r.toString(t) : r;
      }
      hex() {
        return this.digest("hex").toUpperCase();
      }
      size(t = !1) {
        return t ? this.compressedSize : this.rawSize;
      }
    };
  lA.exports = Uy;
});
var zy = y((tte, hA) => {
  "use strict";
  hA.exports = { CRC32Stream: uA(), DeflateCRC32Stream: fA() };
});
var pA = y((ste, dA) => {
  var wV = require("util").inherits,
    DV = el(),
    { CRC32Stream: bV } = zy(),
    { DeflateCRC32Stream: EV } = zy(),
    cA = Py(),
    rte = Iy(),
    ite = Ay(),
    ee = Ny(),
    nte = Ly(),
    Z = ic(),
    Ve = (dA.exports = function (e) {
      if (!(this instanceof Ve)) return new Ve(e);
      (e = this.options = this._defaults(e)),
        cA.call(this, e),
        (this._entry = null),
        (this._entries = []),
        (this._archive = {
          centralLength: 0,
          centralOffset: 0,
          comment: "",
          finish: !1,
          finished: !1,
          processing: !1,
          forceZip64: e.forceZip64,
          forceLocalTime: e.forceLocalTime,
        });
    });
  wV(Ve, cA);
  Ve.prototype._afterAppend = function (e) {
    this._entries.push(e),
      e.getGeneralPurposeBit().usesDataDescriptor() &&
        this._writeDataDescriptor(e),
      (this._archive.processing = !1),
      (this._entry = null),
      this._archive.finish && !this._archive.finished && this._finish();
  };
  Ve.prototype._appendBuffer = function (e, t, r) {
    t.length === 0 && e.setMethod(ee.METHOD_STORED);
    var i = e.getMethod();
    if (
      (i === ee.METHOD_STORED &&
        (e.setSize(t.length),
        e.setCompressedSize(t.length),
        e.setCrc(DV.unsigned(t))),
      this._writeLocalFileHeader(e),
      i === ee.METHOD_STORED)
    ) {
      this.write(t), this._afterAppend(e), r(null, e);
      return;
    } else if (i === ee.METHOD_DEFLATED) {
      this._smartStream(e, r).end(t);
      return;
    } else {
      r(new Error("compression method " + i + " not implemented"));
      return;
    }
  };
  Ve.prototype._appendStream = function (e, t, r) {
    e.getGeneralPurposeBit().useDataDescriptor(!0),
      e.setVersionNeededToExtract(ee.MIN_VERSION_DATA_DESCRIPTOR),
      this._writeLocalFileHeader(e);
    var i = this._smartStream(e, r);
    t.once("error", function (n) {
      i.emit("error", n), i.end();
    }),
      t.pipe(i);
  };
  Ve.prototype._defaults = function (e) {
    return (
      typeof e != "object" && (e = {}),
      typeof e.zlib != "object" && (e.zlib = {}),
      typeof e.zlib.level != "number" && (e.zlib.level = ee.ZLIB_BEST_SPEED),
      (e.forceZip64 = !!e.forceZip64),
      (e.forceLocalTime = !!e.forceLocalTime),
      e
    );
  };
  Ve.prototype._finish = function () {
    (this._archive.centralOffset = this.offset),
      this._entries.forEach(
        function (e) {
          this._writeCentralFileHeader(e);
        }.bind(this),
      ),
      (this._archive.centralLength = this.offset - this._archive.centralOffset),
      this.isZip64() && this._writeCentralDirectoryZip64(),
      this._writeCentralDirectoryEnd(),
      (this._archive.processing = !1),
      (this._archive.finish = !0),
      (this._archive.finished = !0),
      this.end();
  };
  Ve.prototype._normalizeEntry = function (e) {
    e.getMethod() === -1 && e.setMethod(ee.METHOD_DEFLATED),
      e.getMethod() === ee.METHOD_DEFLATED &&
        (e.getGeneralPurposeBit().useDataDescriptor(!0),
        e.setVersionNeededToExtract(ee.MIN_VERSION_DATA_DESCRIPTOR)),
      e.getTime() === -1 && e.setTime(new Date(), this._archive.forceLocalTime),
      (e._offsets = { file: 0, data: 0, contents: 0 });
  };
  Ve.prototype._smartStream = function (e, t) {
    var r = e.getMethod() === ee.METHOD_DEFLATED,
      i = r ? new EV(this.options.zlib) : new bV(),
      n = null;
    function s() {
      var a = i.digest().readUInt32BE(0);
      e.setCrc(a),
        e.setSize(i.size()),
        e.setCompressedSize(i.size(!0)),
        this._afterAppend(e),
        t(n, e);
    }
    return (
      i.once("end", s.bind(this)),
      i.once("error", function (a) {
        n = a;
      }),
      i.pipe(this, { end: !1 }),
      i
    );
  };
  Ve.prototype._writeCentralDirectoryEnd = function () {
    var e = this._entries.length,
      t = this._archive.centralLength,
      r = this._archive.centralOffset;
    this.isZip64() &&
      ((e = ee.ZIP64_MAGIC_SHORT), (t = ee.ZIP64_MAGIC), (r = ee.ZIP64_MAGIC)),
      this.write(Z.getLongBytes(ee.SIG_EOCD)),
      this.write(ee.SHORT_ZERO),
      this.write(ee.SHORT_ZERO),
      this.write(Z.getShortBytes(e)),
      this.write(Z.getShortBytes(e)),
      this.write(Z.getLongBytes(t)),
      this.write(Z.getLongBytes(r));
    var i = this.getComment(),
      n = Buffer.byteLength(i);
    this.write(Z.getShortBytes(n)), this.write(i);
  };
  Ve.prototype._writeCentralDirectoryZip64 = function () {
    this.write(Z.getLongBytes(ee.SIG_ZIP64_EOCD)),
      this.write(Z.getEightBytes(44)),
      this.write(Z.getShortBytes(ee.MIN_VERSION_ZIP64)),
      this.write(Z.getShortBytes(ee.MIN_VERSION_ZIP64)),
      this.write(ee.LONG_ZERO),
      this.write(ee.LONG_ZERO),
      this.write(Z.getEightBytes(this._entries.length)),
      this.write(Z.getEightBytes(this._entries.length)),
      this.write(Z.getEightBytes(this._archive.centralLength)),
      this.write(Z.getEightBytes(this._archive.centralOffset)),
      this.write(Z.getLongBytes(ee.SIG_ZIP64_EOCD_LOC)),
      this.write(ee.LONG_ZERO),
      this.write(
        Z.getEightBytes(
          this._archive.centralOffset + this._archive.centralLength,
        ),
      ),
      this.write(Z.getLongBytes(1));
  };
  Ve.prototype._writeCentralFileHeader = function (e) {
    var t = e.getGeneralPurposeBit(),
      r = e.getMethod(),
      i = e._offsets,
      n = e.getSize(),
      s = e.getCompressedSize();
    if (e.isZip64() || i.file > ee.ZIP64_MAGIC) {
      (n = ee.ZIP64_MAGIC),
        (s = ee.ZIP64_MAGIC),
        e.setVersionNeededToExtract(ee.MIN_VERSION_ZIP64);
      var a = Buffer.concat(
        [
          Z.getShortBytes(ee.ZIP64_EXTRA_ID),
          Z.getShortBytes(24),
          Z.getEightBytes(e.getSize()),
          Z.getEightBytes(e.getCompressedSize()),
          Z.getEightBytes(i.file),
        ],
        28,
      );
      e.setExtra(a);
    }
    this.write(Z.getLongBytes(ee.SIG_CFH)),
      this.write(Z.getShortBytes((e.getPlatform() << 8) | ee.VERSION_MADEBY)),
      this.write(Z.getShortBytes(e.getVersionNeededToExtract())),
      this.write(t.encode()),
      this.write(Z.getShortBytes(r)),
      this.write(Z.getLongBytes(e.getTimeDos())),
      this.write(Z.getLongBytes(e.getCrc())),
      this.write(Z.getLongBytes(s)),
      this.write(Z.getLongBytes(n));
    var o = e.getName(),
      u = e.getComment(),
      l = e.getCentralDirectoryExtra();
    t.usesUTF8ForNames() && ((o = Buffer.from(o)), (u = Buffer.from(u))),
      this.write(Z.getShortBytes(o.length)),
      this.write(Z.getShortBytes(l.length)),
      this.write(Z.getShortBytes(u.length)),
      this.write(ee.SHORT_ZERO),
      this.write(Z.getShortBytes(e.getInternalAttributes())),
      this.write(Z.getLongBytes(e.getExternalAttributes())),
      i.file > ee.ZIP64_MAGIC
        ? this.write(Z.getLongBytes(ee.ZIP64_MAGIC))
        : this.write(Z.getLongBytes(i.file)),
      this.write(o),
      this.write(l),
      this.write(u);
  };
  Ve.prototype._writeDataDescriptor = function (e) {
    this.write(Z.getLongBytes(ee.SIG_DD)),
      this.write(Z.getLongBytes(e.getCrc())),
      e.isZip64()
        ? (this.write(Z.getEightBytes(e.getCompressedSize())),
          this.write(Z.getEightBytes(e.getSize())))
        : (this.write(Z.getLongBytes(e.getCompressedSize())),
          this.write(Z.getLongBytes(e.getSize())));
  };
  Ve.prototype._writeLocalFileHeader = function (e) {
    var t = e.getGeneralPurposeBit(),
      r = e.getMethod(),
      i = e.getName(),
      n = e.getLocalFileDataExtra();
    e.isZip64() &&
      (t.useDataDescriptor(!0),
      e.setVersionNeededToExtract(ee.MIN_VERSION_ZIP64)),
      t.usesUTF8ForNames() && (i = Buffer.from(i)),
      (e._offsets.file = this.offset),
      this.write(Z.getLongBytes(ee.SIG_LFH)),
      this.write(Z.getShortBytes(e.getVersionNeededToExtract())),
      this.write(t.encode()),
      this.write(Z.getShortBytes(r)),
      this.write(Z.getLongBytes(e.getTimeDos())),
      (e._offsets.data = this.offset),
      t.usesDataDescriptor()
        ? (this.write(ee.LONG_ZERO),
          this.write(ee.LONG_ZERO),
          this.write(ee.LONG_ZERO))
        : (this.write(Z.getLongBytes(e.getCrc())),
          this.write(Z.getLongBytes(e.getCompressedSize())),
          this.write(Z.getLongBytes(e.getSize()))),
      this.write(Z.getShortBytes(i.length)),
      this.write(Z.getShortBytes(n.length)),
      this.write(i),
      this.write(n),
      (e._offsets.contents = this.offset);
  };
  Ve.prototype.getComment = function (e) {
    return this._archive.comment !== null ? this._archive.comment : "";
  };
  Ve.prototype.isZip64 = function () {
    return (
      this._archive.forceZip64 ||
      this._entries.length > ee.ZIP64_MAGIC_SHORT ||
      this._archive.centralLength > ee.ZIP64_MAGIC ||
      this._archive.centralOffset > ee.ZIP64_MAGIC
    );
  };
  Ve.prototype.setComment = function (e) {
    this._archive.comment = e;
  };
});
var $y = y((ate, mA) => {
  mA.exports = {
    ArchiveEntry: rc(),
    ZipArchiveEntry: Iy(),
    ArchiveOutputStream: Py(),
    ZipArchiveOutputStream: pA(),
  };
});
var yA = y((ote, gA) => {
  /**
   * ZipStream
   *
   * @ignore
   * @license [MIT]{@link https://github.com/archiverjs/node-zip-stream/blob/master/LICENSE}
   * @copyright (c) 2014 Chris Talkington, contributors.
   */ var _V = require("util").inherits,
    Gy = $y().ZipArchiveOutputStream,
    SV = $y().ZipArchiveEntry,
    Wy = ia(),
    na = (gA.exports = function (e) {
      if (!(this instanceof na)) return new na(e);
      (e = this.options = e || {}),
        (e.zlib = e.zlib || {}),
        Gy.call(this, e),
        typeof e.level == "number" &&
          e.level >= 0 &&
          ((e.zlib.level = e.level), delete e.level),
        !e.forceZip64 &&
          typeof e.zlib.level == "number" &&
          e.zlib.level === 0 &&
          (e.store = !0),
        (e.namePrependSlash = e.namePrependSlash || !1),
        e.comment && e.comment.length > 0 && this.setComment(e.comment);
    });
  _V(na, Gy);
  na.prototype._normalizeFileData = function (e) {
    e = Wy.defaults(e, {
      type: "file",
      name: null,
      namePrependSlash: this.options.namePrependSlash,
      linkname: null,
      date: null,
      mode: null,
      store: this.options.store,
      comment: "",
    });
    var t = e.type === "directory",
      r = e.type === "symlink";
    return (
      e.name &&
        ((e.name = Wy.sanitizePath(e.name)),
        !r && e.name.slice(-1) === "/"
          ? ((t = !0), (e.type = "directory"))
          : t && (e.name += "/")),
      (t || r) && (e.store = !0),
      (e.date = Wy.dateify(e.date)),
      e
    );
  };
  na.prototype.entry = function (e, t, r) {
    if (
      (typeof r != "function" && (r = this._emitErrorCallback.bind(this)),
      (t = this._normalizeFileData(t)),
      t.type !== "file" && t.type !== "directory" && t.type !== "symlink")
    ) {
      r(new Error(t.type + " entries not currently supported"));
      return;
    }
    if (typeof t.name != "string" || t.name.length === 0) {
      r(new Error("entry name must be a non-empty string value"));
      return;
    }
    if (t.type === "symlink" && typeof t.linkname != "string") {
      r(
        new Error(
          "entry linkname must be a non-empty string value when type equals symlink",
        ),
      );
      return;
    }
    var i = new SV(t.name);
    return (
      i.setTime(t.date, this.options.forceLocalTime),
      t.namePrependSlash && i.setName(t.name, !0),
      t.store && i.setMethod(0),
      t.comment.length > 0 && i.setComment(t.comment),
      t.type === "symlink" && typeof t.mode != "number" && (t.mode = 40960),
      typeof t.mode == "number" &&
        (t.type === "symlink" && (t.mode |= 40960), i.setUnixMode(t.mode)),
      t.type === "symlink" &&
        typeof t.linkname == "string" &&
        (e = Buffer.from(t.linkname)),
      Gy.prototype.entry.call(this, i, e, r)
    );
  };
  na.prototype.finalize = function () {
    this.finish();
  };
});
var wA = y((ute, vA) => {
  /**
   * ZIP Format Plugin
   *
   * @module plugins/zip
   * @license [MIT]{@link https://github.com/archiverjs/node-archiver/blob/master/LICENSE}
   * @copyright (c) 2012-2014 Chris Talkington, contributors.
   */ var xV = yA(),
    CV = ia(),
    Bi = function (e) {
      if (!(this instanceof Bi)) return new Bi(e);
      (e = this.options =
        CV.defaults(e, {
          comment: "",
          forceUTC: !1,
          namePrependSlash: !1,
          store: !1,
        })),
        (this.supports = { directory: !0, symlink: !0 }),
        (this.engine = new xV(e));
    };
  Bi.prototype.append = function (e, t, r) {
    this.engine.entry(e, t, r);
  };
  Bi.prototype.finalize = function () {
    this.engine.finalize();
  };
  Bi.prototype.on = function () {
    return this.engine.on.apply(this.engine, arguments);
  };
  Bi.prototype.pipe = function () {
    return this.engine.pipe.apply(this.engine, arguments);
  };
  Bi.prototype.unpipe = function () {
    return this.engine.unpipe.apply(this.engine, arguments);
  };
  vA.exports = Bi;
});
var EA = y((lte, bA) => {
  "use strict";
  var { Buffer: or } = require("buffer"),
    DA = Symbol.for("BufferList");
  function we(e) {
    if (!(this instanceof we)) return new we(e);
    we._init.call(this, e);
  }
  we._init = function (t) {
    Object.defineProperty(this, DA, { value: !0 }),
      (this._bufs = []),
      (this.length = 0),
      t && this.append(t);
  };
  we.prototype._new = function (t) {
    return new we(t);
  };
  we.prototype._offset = function (t) {
    if (t === 0) return [0, 0];
    let r = 0;
    for (let i = 0; i < this._bufs.length; i++) {
      let n = r + this._bufs[i].length;
      if (t < n || i === this._bufs.length - 1) return [i, t - r];
      r = n;
    }
  };
  we.prototype._reverseOffset = function (e) {
    let t = e[0],
      r = e[1];
    for (let i = 0; i < t; i++) r += this._bufs[i].length;
    return r;
  };
  we.prototype.get = function (t) {
    if (t > this.length || t < 0) return;
    let r = this._offset(t);
    return this._bufs[r[0]][r[1]];
  };
  we.prototype.slice = function (t, r) {
    return (
      typeof t == "number" && t < 0 && (t += this.length),
      typeof r == "number" && r < 0 && (r += this.length),
      this.copy(null, 0, t, r)
    );
  };
  we.prototype.copy = function (t, r, i, n) {
    if (
      ((typeof i != "number" || i < 0) && (i = 0),
      (typeof n != "number" || n > this.length) && (n = this.length),
      i >= this.length || n <= 0)
    )
      return t || or.alloc(0);
    let s = !!t,
      a = this._offset(i),
      o = n - i,
      u = o,
      l = (s && r) || 0,
      f = a[1];
    if (i === 0 && n === this.length) {
      if (!s)
        return this._bufs.length === 1
          ? this._bufs[0]
          : or.concat(this._bufs, this.length);
      for (let h = 0; h < this._bufs.length; h++)
        this._bufs[h].copy(t, l), (l += this._bufs[h].length);
      return t;
    }
    if (u <= this._bufs[a[0]].length - f)
      return s
        ? this._bufs[a[0]].copy(t, r, f, f + u)
        : this._bufs[a[0]].slice(f, f + u);
    s || (t = or.allocUnsafe(o));
    for (let h = a[0]; h < this._bufs.length; h++) {
      let c = this._bufs[h].length - f;
      if (u > c) this._bufs[h].copy(t, l, f), (l += c);
      else {
        this._bufs[h].copy(t, l, f, f + u), (l += c);
        break;
      }
      (u -= c), f && (f = 0);
    }
    return t.length > l ? t.slice(0, l) : t;
  };
  we.prototype.shallowSlice = function (t, r) {
    if (
      ((t = t || 0),
      (r = typeof r != "number" ? this.length : r),
      t < 0 && (t += this.length),
      r < 0 && (r += this.length),
      t === r)
    )
      return this._new();
    let i = this._offset(t),
      n = this._offset(r),
      s = this._bufs.slice(i[0], n[0] + 1);
    return (
      n[1] === 0 ? s.pop() : (s[s.length - 1] = s[s.length - 1].slice(0, n[1])),
      i[1] !== 0 && (s[0] = s[0].slice(i[1])),
      this._new(s)
    );
  };
  we.prototype.toString = function (t, r, i) {
    return this.slice(r, i).toString(t);
  };
  we.prototype.consume = function (t) {
    if (((t = Math.trunc(t)), Number.isNaN(t) || t <= 0)) return this;
    for (; this._bufs.length; )
      if (t >= this._bufs[0].length)
        (t -= this._bufs[0].length),
          (this.length -= this._bufs[0].length),
          this._bufs.shift();
      else {
        (this._bufs[0] = this._bufs[0].slice(t)), (this.length -= t);
        break;
      }
    return this;
  };
  we.prototype.duplicate = function () {
    let t = this._new();
    for (let r = 0; r < this._bufs.length; r++) t.append(this._bufs[r]);
    return t;
  };
  we.prototype.append = function (t) {
    if (t == null) return this;
    if (t.buffer)
      this._appendBuffer(or.from(t.buffer, t.byteOffset, t.byteLength));
    else if (Array.isArray(t))
      for (let r = 0; r < t.length; r++) this.append(t[r]);
    else if (this._isBufferList(t))
      for (let r = 0; r < t._bufs.length; r++) this.append(t._bufs[r]);
    else
      typeof t == "number" && (t = t.toString()),
        this._appendBuffer(or.from(t));
    return this;
  };
  we.prototype._appendBuffer = function (t) {
    this._bufs.push(t), (this.length += t.length);
  };
  we.prototype.indexOf = function (e, t, r) {
    if (
      (r === void 0 && typeof t == "string" && ((r = t), (t = void 0)),
      typeof e == "function" || Array.isArray(e))
    )
      throw new TypeError(
        'The "value" argument must be one of type string, Buffer, BufferList, or Uint8Array.',
      );
    if (
      (typeof e == "number"
        ? (e = or.from([e]))
        : typeof e == "string"
        ? (e = or.from(e, r))
        : this._isBufferList(e)
        ? (e = e.slice())
        : Array.isArray(e.buffer)
        ? (e = or.from(e.buffer, e.byteOffset, e.byteLength))
        : or.isBuffer(e) || (e = or.from(e)),
      (t = Number(t || 0)),
      isNaN(t) && (t = 0),
      t < 0 && (t = this.length + t),
      t < 0 && (t = 0),
      e.length === 0)
    )
      return t > this.length ? this.length : t;
    let i = this._offset(t),
      n = i[0],
      s = i[1];
    for (; n < this._bufs.length; n++) {
      let a = this._bufs[n];
      for (; s < a.length; )
        if (a.length - s >= e.length) {
          let u = a.indexOf(e, s);
          if (u !== -1) return this._reverseOffset([n, u]);
          s = a.length - e.length + 1;
        } else {
          let u = this._reverseOffset([n, s]);
          if (this._match(u, e)) return u;
          s++;
        }
      s = 0;
    }
    return -1;
  };
  we.prototype._match = function (e, t) {
    if (this.length - e < t.length) return !1;
    for (let r = 0; r < t.length; r++) if (this.get(e + r) !== t[r]) return !1;
    return !0;
  };
  (function () {
    let e = {
      readDoubleBE: 8,
      readDoubleLE: 8,
      readFloatBE: 4,
      readFloatLE: 4,
      readInt32BE: 4,
      readInt32LE: 4,
      readUInt32BE: 4,
      readUInt32LE: 4,
      readInt16BE: 2,
      readInt16LE: 2,
      readUInt16BE: 2,
      readUInt16LE: 2,
      readInt8: 1,
      readUInt8: 1,
      readIntBE: null,
      readIntLE: null,
      readUIntBE: null,
      readUIntLE: null,
    };
    for (let t in e)
      (function (r) {
        e[r] === null
          ? (we.prototype[r] = function (i, n) {
              return this.slice(i, i + n)[r](0, n);
            })
          : (we.prototype[r] = function (i = 0) {
              return this.slice(i, i + e[r])[r](0);
            });
      })(t);
  })();
  we.prototype._isBufferList = function (t) {
    return t instanceof we || we.isBufferList(t);
  };
  we.isBufferList = function (t) {
    return t != null && t[DA];
  };
  bA.exports = we;
});
var _A = y((fte, nc) => {
  "use strict";
  var Hy = at().Duplex,
    OV = je(),
    Qo = EA();
  function lt(e) {
    if (!(this instanceof lt)) return new lt(e);
    if (typeof e == "function") {
      this._callback = e;
      let t = function (i) {
        this._callback && (this._callback(i), (this._callback = null));
      }.bind(this);
      this.on("pipe", function (i) {
        i.on("error", t);
      }),
        this.on("unpipe", function (i) {
          i.removeListener("error", t);
        }),
        (e = null);
    }
    Qo._init.call(this, e), Hy.call(this);
  }
  OV(lt, Hy);
  Object.assign(lt.prototype, Qo.prototype);
  lt.prototype._new = function (t) {
    return new lt(t);
  };
  lt.prototype._write = function (t, r, i) {
    this._appendBuffer(t), typeof i == "function" && i();
  };
  lt.prototype._read = function (t) {
    if (!this.length) return this.push(null);
    (t = Math.min(t, this.length)),
      this.push(this.slice(0, t)),
      this.consume(t);
  };
  lt.prototype.end = function (t) {
    Hy.prototype.end.call(this, t),
      this._callback &&
        (this._callback(null, this.slice()), (this._callback = null));
  };
  lt.prototype._destroy = function (t, r) {
    (this._bufs.length = 0), (this.length = 0), r(t);
  };
  lt.prototype._isBufferList = function (t) {
    return t instanceof lt || t instanceof Qo || lt.isBufferList(t);
  };
  lt.isBufferList = Qo.isBufferList;
  nc.exports = lt;
  nc.exports.BufferListStream = lt;
  nc.exports.BufferList = Qo;
});
var Xy = y((aa) => {
  var TV = Buffer.alloc,
    FV = "0000000000000000000",
    RV = "7777777777777777777",
    SA = "0".charCodeAt(0),
    xA = Buffer.from("ustar\0", "binary"),
    AV = Buffer.from("00", "binary"),
    NV = Buffer.from("ustar ", "binary"),
    IV = Buffer.from(" \0", "binary"),
    MV = parseInt("7777", 8),
    Jo = 257,
    Yy = 263,
    LV = function (e, t, r) {
      return typeof e != "number"
        ? r
        : ((e = ~~e), e >= t ? t : e >= 0 || ((e += t), e >= 0) ? e : 0);
    },
    qV = function (e) {
      switch (e) {
        case 0:
          return "file";
        case 1:
          return "link";
        case 2:
          return "symlink";
        case 3:
          return "character-device";
        case 4:
          return "block-device";
        case 5:
          return "directory";
        case 6:
          return "fifo";
        case 7:
          return "contiguous-file";
        case 72:
          return "pax-header";
        case 55:
          return "pax-global-header";
        case 27:
          return "gnu-long-link-path";
        case 28:
        case 30:
          return "gnu-long-path";
      }
      return null;
    },
    PV = function (e) {
      switch (e) {
        case "file":
          return 0;
        case "link":
          return 1;
        case "symlink":
          return 2;
        case "character-device":
          return 3;
        case "block-device":
          return 4;
        case "directory":
          return 5;
        case "fifo":
          return 6;
        case "contiguous-file":
          return 7;
        case "pax-header":
          return 72;
      }
      return 0;
    },
    CA = function (e, t, r, i) {
      for (; r < i; r++) if (e[r] === t) return r;
      return i;
    },
    OA = function (e) {
      for (var t = 256, r = 0; r < 148; r++) t += e[r];
      for (var i = 156; i < 512; i++) t += e[i];
      return t;
    },
    ki = function (e, t) {
      return (
        (e = e.toString(8)),
        e.length > t
          ? RV.slice(0, t) + " "
          : FV.slice(0, t - e.length) + e + " "
      );
    };
  function BV(e) {
    var t;
    if (e[0] === 128) t = !0;
    else if (e[0] === 255) t = !1;
    else return null;
    for (var r = [], i = e.length - 1; i > 0; i--) {
      var n = e[i];
      t ? r.push(n) : r.push(255 - n);
    }
    var s = 0,
      a = r.length;
    for (i = 0; i < a; i++) s += r[i] * Math.pow(256, i);
    return t ? s : -1 * s;
  }
  var ji = function (e, t, r) {
      if (((e = e.slice(t, t + r)), (t = 0), e[t] & 128)) return BV(e);
      for (; t < e.length && e[t] === 32; ) t++;
      for (
        var i = LV(CA(e, 32, t, e.length), e.length, e.length);
        t < i && e[t] === 0;

      )
        t++;
      return i === t ? 0 : parseInt(e.slice(t, i).toString(), 8);
    },
    sa = function (e, t, r, i) {
      return e.slice(t, CA(e, 0, t, t + r)).toString(i);
    },
    Vy = function (e) {
      var t = Buffer.byteLength(e),
        r = Math.floor(Math.log(t) / Math.log(10)) + 1;
      return t + r >= Math.pow(10, r) && r++, t + r + e;
    };
  aa.decodeLongPath = function (e, t) {
    return sa(e, 0, e.length, t);
  };
  aa.encodePax = function (e) {
    var t = "";
    e.name &&
      (t += Vy(
        " path=" +
          e.name +
          `
`,
      )),
      e.linkname &&
        (t += Vy(
          " linkpath=" +
            e.linkname +
            `
`,
        ));
    var r = e.pax;
    if (r)
      for (var i in r)
        t += Vy(
          " " +
            i +
            "=" +
            r[i] +
            `
`,
        );
    return Buffer.from(t);
  };
  aa.decodePax = function (e) {
    for (var t = {}; e.length; ) {
      for (var r = 0; r < e.length && e[r] !== 32; ) r++;
      var i = parseInt(e.slice(0, r).toString(), 10);
      if (!i) return t;
      var n = e.slice(r + 1, i - 1).toString(),
        s = n.indexOf("=");
      if (s === -1) return t;
      (t[n.slice(0, s)] = n.slice(s + 1)), (e = e.slice(i));
    }
    return t;
  };
  aa.encode = function (e) {
    var t = TV(512),
      r = e.name,
      i = "";
    if (
      (e.typeflag === 5 && r[r.length - 1] !== "/" && (r += "/"),
      Buffer.byteLength(r) !== r.length)
    )
      return null;
    for (; Buffer.byteLength(r) > 100; ) {
      var n = r.indexOf("/");
      if (n === -1) return null;
      (i += i ? "/" + r.slice(0, n) : r.slice(0, n)), (r = r.slice(n + 1));
    }
    return Buffer.byteLength(r) > 100 ||
      Buffer.byteLength(i) > 155 ||
      (e.linkname && Buffer.byteLength(e.linkname) > 100)
      ? null
      : (t.write(r),
        t.write(ki(e.mode & MV, 6), 100),
        t.write(ki(e.uid, 6), 108),
        t.write(ki(e.gid, 6), 116),
        t.write(ki(e.size, 11), 124),
        t.write(ki((e.mtime.getTime() / 1e3) | 0, 11), 136),
        (t[156] = SA + PV(e.type)),
        e.linkname && t.write(e.linkname, 157),
        xA.copy(t, Jo),
        AV.copy(t, Yy),
        e.uname && t.write(e.uname, 265),
        e.gname && t.write(e.gname, 297),
        t.write(ki(e.devmajor || 0, 6), 329),
        t.write(ki(e.devminor || 0, 6), 337),
        i && t.write(i, 345),
        t.write(ki(OA(t), 6), 148),
        t);
  };
  aa.decode = function (e, t, r) {
    var i = e[156] === 0 ? 0 : e[156] - SA,
      n = sa(e, 0, 100, t),
      s = ji(e, 100, 8),
      a = ji(e, 108, 8),
      o = ji(e, 116, 8),
      u = ji(e, 124, 12),
      l = ji(e, 136, 12),
      f = qV(i),
      h = e[157] === 0 ? null : sa(e, 157, 100, t),
      c = sa(e, 265, 32),
      d = sa(e, 297, 32),
      m = ji(e, 329, 8),
      C = ji(e, 337, 8),
      E = OA(e);
    if (E === 8 * 32) return null;
    if (E !== ji(e, 148, 8))
      throw new Error(
        "Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?",
      );
    if (xA.compare(e, Jo, Jo + 6) === 0)
      e[345] && (n = sa(e, 345, 155, t) + "/" + n);
    else if (
      !(NV.compare(e, Jo, Jo + 6) === 0 && IV.compare(e, Yy, Yy + 2) === 0)
    ) {
      if (!r) throw new Error("Invalid tar header: unknown format.");
    }
    return (
      i === 0 && n && n[n.length - 1] === "/" && (i = 5),
      {
        name: n,
        mode: s,
        uid: a,
        gid: o,
        size: u,
        mtime: new Date(1e3 * l),
        type: f,
        linkname: h,
        uname: c,
        gname: d,
        devmajor: m,
        devminor: C,
      }
    );
  };
});
var MA = y((cte, IA) => {
  var FA = require("util"),
    kV = _A(),
    eu = Xy(),
    RA = at().Writable,
    AA = at().PassThrough,
    NA = function () {},
    TA = function (e) {
      return (e &= 511), e && 512 - e;
    },
    jV = function (e, t) {
      var r = new sc(e, t);
      return r.end(), r;
    },
    UV = function (e, t) {
      return (
        t.path && (e.name = t.path),
        t.linkpath && (e.linkname = t.linkpath),
        t.size && (e.size = parseInt(t.size, 10)),
        (e.pax = t),
        e
      );
    },
    sc = function (e, t) {
      (this._parent = e), (this.offset = t), AA.call(this, { autoDestroy: !1 });
    };
  FA.inherits(sc, AA);
  sc.prototype.destroy = function (e) {
    this._parent.destroy(e);
  };
  var Jr = function (e) {
    if (!(this instanceof Jr)) return new Jr(e);
    RA.call(this, e),
      (e = e || {}),
      (this._offset = 0),
      (this._buffer = kV()),
      (this._missing = 0),
      (this._partial = !1),
      (this._onparse = NA),
      (this._header = null),
      (this._stream = null),
      (this._overflow = null),
      (this._cb = null),
      (this._locked = !1),
      (this._destroyed = !1),
      (this._pax = null),
      (this._paxGlobal = null),
      (this._gnuLongPath = null),
      (this._gnuLongLinkPath = null);
    var t = this,
      r = t._buffer,
      i = function () {
        t._continue();
      },
      n = function (c) {
        if (((t._locked = !1), c)) return t.destroy(c);
        t._stream || i();
      },
      s = function () {
        t._stream = null;
        var c = TA(t._header.size);
        c ? t._parse(c, a) : t._parse(512, h), t._locked || i();
      },
      a = function () {
        t._buffer.consume(TA(t._header.size)), t._parse(512, h), i();
      },
      o = function () {
        var c = t._header.size;
        (t._paxGlobal = eu.decodePax(r.slice(0, c))), r.consume(c), s();
      },
      u = function () {
        var c = t._header.size;
        (t._pax = eu.decodePax(r.slice(0, c))),
          t._paxGlobal && (t._pax = Object.assign({}, t._paxGlobal, t._pax)),
          r.consume(c),
          s();
      },
      l = function () {
        var c = t._header.size;
        (this._gnuLongPath = eu.decodeLongPath(
          r.slice(0, c),
          e.filenameEncoding,
        )),
          r.consume(c),
          s();
      },
      f = function () {
        var c = t._header.size;
        (this._gnuLongLinkPath = eu.decodeLongPath(
          r.slice(0, c),
          e.filenameEncoding,
        )),
          r.consume(c),
          s();
      },
      h = function () {
        var c = t._offset,
          d;
        try {
          d = t._header = eu.decode(
            r.slice(0, 512),
            e.filenameEncoding,
            e.allowUnknownFormat,
          );
        } catch (m) {
          t.emit("error", m);
        }
        if ((r.consume(512), !d)) {
          t._parse(512, h), i();
          return;
        }
        if (d.type === "gnu-long-path") {
          t._parse(d.size, l), i();
          return;
        }
        if (d.type === "gnu-long-link-path") {
          t._parse(d.size, f), i();
          return;
        }
        if (d.type === "pax-global-header") {
          t._parse(d.size, o), i();
          return;
        }
        if (d.type === "pax-header") {
          t._parse(d.size, u), i();
          return;
        }
        if (
          (t._gnuLongPath &&
            ((d.name = t._gnuLongPath), (t._gnuLongPath = null)),
          t._gnuLongLinkPath &&
            ((d.linkname = t._gnuLongLinkPath), (t._gnuLongLinkPath = null)),
          t._pax && ((t._header = d = UV(d, t._pax)), (t._pax = null)),
          (t._locked = !0),
          !d.size || d.type === "directory")
        ) {
          t._parse(512, h), t.emit("entry", d, jV(t, c), n);
          return;
        }
        (t._stream = new sc(t, c)),
          t.emit("entry", d, t._stream, n),
          t._parse(d.size, s),
          i();
      };
    (this._onheader = h), this._parse(512, h);
  };
  FA.inherits(Jr, RA);
  Jr.prototype.destroy = function (e) {
    this._destroyed ||
      ((this._destroyed = !0),
      e && this.emit("error", e),
      this.emit("close"),
      this._stream && this._stream.emit("close"));
  };
  Jr.prototype._parse = function (e, t) {
    this._destroyed ||
      ((this._offset += e),
      (this._missing = e),
      t === this._onheader && (this._partial = !1),
      (this._onparse = t));
  };
  Jr.prototype._continue = function () {
    if (!this._destroyed) {
      var e = this._cb;
      (this._cb = NA),
        this._overflow ? this._write(this._overflow, void 0, e) : e();
    }
  };
  Jr.prototype._write = function (e, t, r) {
    if (!this._destroyed) {
      var i = this._stream,
        n = this._buffer,
        s = this._missing;
      if ((e.length && (this._partial = !0), e.length < s))
        return (
          (this._missing -= e.length),
          (this._overflow = null),
          i ? i.write(e, r) : (n.append(e), r())
        );
      (this._cb = r), (this._missing = 0);
      var a = null;
      e.length > s && ((a = e.slice(s)), (e = e.slice(0, s))),
        i ? i.end(e) : n.append(e),
        (this._overflow = a),
        this._onparse();
    }
  };
  Jr.prototype._final = function (e) {
    if (this._partial) return this.destroy(new Error("Unexpected end of data"));
    e();
  };
  IA.exports = Jr;
});
var qA = y((dte, LA) => {
  LA.exports = require("fs").constants || require("constants");
});
var UA = y((pte, jA) => {
  var oa = qA(),
    PA = sd(),
    oc = je(),
    zV = Buffer.alloc,
    BA = at().Readable,
    ua = at().Writable,
    $V = require("string_decoder").StringDecoder,
    ac = Xy(),
    WV = parseInt("755", 8),
    GV = parseInt("644", 8),
    kA = zV(1024),
    Ky = function () {},
    Zy = function (e, t) {
      (t &= 511), t && e.push(kA.slice(0, 512 - t));
    };
  function HV(e) {
    switch (e & oa.S_IFMT) {
      case oa.S_IFBLK:
        return "block-device";
      case oa.S_IFCHR:
        return "character-device";
      case oa.S_IFDIR:
        return "directory";
      case oa.S_IFIFO:
        return "fifo";
      case oa.S_IFLNK:
        return "symlink";
    }
    return "file";
  }
  var uc = function (e) {
    ua.call(this), (this.written = 0), (this._to = e), (this._destroyed = !1);
  };
  oc(uc, ua);
  uc.prototype._write = function (e, t, r) {
    if (((this.written += e.length), this._to.push(e))) return r();
    this._to._drain = r;
  };
  uc.prototype.destroy = function () {
    this._destroyed || ((this._destroyed = !0), this.emit("close"));
  };
  var lc = function () {
    ua.call(this),
      (this.linkname = ""),
      (this._decoder = new $V("utf-8")),
      (this._destroyed = !1);
  };
  oc(lc, ua);
  lc.prototype._write = function (e, t, r) {
    (this.linkname += this._decoder.write(e)), r();
  };
  lc.prototype.destroy = function () {
    this._destroyed || ((this._destroyed = !0), this.emit("close"));
  };
  var tu = function () {
    ua.call(this), (this._destroyed = !1);
  };
  oc(tu, ua);
  tu.prototype._write = function (e, t, r) {
    r(new Error("No body allowed for this entry"));
  };
  tu.prototype.destroy = function () {
    this._destroyed || ((this._destroyed = !0), this.emit("close"));
  };
  var Sr = function (e) {
    if (!(this instanceof Sr)) return new Sr(e);
    BA.call(this, e),
      (this._drain = Ky),
      (this._finalized = !1),
      (this._finalizing = !1),
      (this._destroyed = !1),
      (this._stream = null);
  };
  oc(Sr, BA);
  Sr.prototype.entry = function (e, t, r) {
    if (this._stream) throw new Error("already piping an entry");
    if (!(this._finalized || this._destroyed)) {
      typeof t == "function" && ((r = t), (t = null)), r || (r = Ky);
      var i = this;
      if (
        ((!e.size || e.type === "symlink") && (e.size = 0),
        e.type || (e.type = HV(e.mode)),
        e.mode || (e.mode = e.type === "directory" ? WV : GV),
        e.uid || (e.uid = 0),
        e.gid || (e.gid = 0),
        e.mtime || (e.mtime = new Date()),
        typeof t == "string" && (t = Buffer.from(t)),
        Buffer.isBuffer(t))
      ) {
        (e.size = t.length), this._encode(e);
        var n = this.push(t);
        return (
          Zy(i, e.size), n ? process.nextTick(r) : (this._drain = r), new tu()
        );
      }
      if (e.type === "symlink" && !e.linkname) {
        var s = new lc();
        return (
          PA(s, function (o) {
            if (o) return i.destroy(), r(o);
            (e.linkname = s.linkname), i._encode(e), r();
          }),
          s
        );
      }
      if ((this._encode(e), e.type !== "file" && e.type !== "contiguous-file"))
        return process.nextTick(r), new tu();
      var a = new uc(this);
      return (
        (this._stream = a),
        PA(a, function (o) {
          if (((i._stream = null), o)) return i.destroy(), r(o);
          if (a.written !== e.size)
            return i.destroy(), r(new Error("size mismatch"));
          Zy(i, e.size), i._finalizing && i.finalize(), r();
        }),
        a
      );
    }
  };
  Sr.prototype.finalize = function () {
    if (this._stream) {
      this._finalizing = !0;
      return;
    }
    this._finalized || ((this._finalized = !0), this.push(kA), this.push(null));
  };
  Sr.prototype.destroy = function (e) {
    this._destroyed ||
      ((this._destroyed = !0),
      e && this.emit("error", e),
      this.emit("close"),
      this._stream && this._stream.destroy && this._stream.destroy());
  };
  Sr.prototype._encode = function (e) {
    if (!e.pax) {
      var t = ac.encode(e);
      if (t) {
        this.push(t);
        return;
      }
    }
    this._encodePax(e);
  };
  Sr.prototype._encodePax = function (e) {
    var t = ac.encodePax({ name: e.name, linkname: e.linkname, pax: e.pax }),
      r = {
        name: "PaxHeader",
        mode: e.mode,
        uid: e.uid,
        gid: e.gid,
        size: t.length,
        mtime: e.mtime,
        type: "pax-header",
        linkname: e.linkname && "PaxHeader",
        uname: e.uname,
        gname: e.gname,
        devmajor: e.devmajor,
        devminor: e.devminor,
      };
    this.push(ac.encode(r)),
      this.push(t),
      Zy(this, t.length),
      (r.size = e.size),
      (r.type = e.type),
      this.push(ac.encode(r));
  };
  Sr.prototype._read = function (e) {
    var t = this._drain;
    (this._drain = Ky), t();
  };
  jA.exports = Sr;
});
var zA = y((Qy) => {
  Qy.extract = MA();
  Qy.pack = UA();
});
var GA = y((gte, WA) => {
  /**
   * TAR Format Plugin
   *
   * @module plugins/tar
   * @license [MIT]{@link https://github.com/archiverjs/node-archiver/blob/master/LICENSE}
   * @copyright (c) 2012-2014 Chris Talkington, contributors.
   */ var VV = require("zlib"),
    YV = zA(),
    $A = ia(),
    ei = function (e) {
      if (!(this instanceof ei)) return new ei(e);
      (e = this.options = $A.defaults(e, { gzip: !1 })),
        typeof e.gzipOptions != "object" && (e.gzipOptions = {}),
        (this.supports = { directory: !0, symlink: !0 }),
        (this.engine = YV.pack(e)),
        (this.compressor = !1),
        e.gzip &&
          ((this.compressor = VV.createGzip(e.gzipOptions)),
          this.compressor.on("error", this._onCompressorError.bind(this)));
    };
  ei.prototype._onCompressorError = function (e) {
    this.engine.emit("error", e);
  };
  ei.prototype.append = function (e, t, r) {
    var i = this;
    t.mtime = t.date;
    function n(a, o) {
      if (a) {
        r(a);
        return;
      }
      i.engine.entry(t, o, function (u) {
        r(u, t);
      });
    }
    if (t.sourceType === "buffer") n(null, e);
    else if (t.sourceType === "stream" && t.stats) {
      t.size = t.stats.size;
      var s = i.engine.entry(t, function (a) {
        r(a, t);
      });
      e.pipe(s);
    } else t.sourceType === "stream" && $A.collectStream(e, n);
  };
  ei.prototype.finalize = function () {
    this.engine.finalize();
  };
  ei.prototype.on = function () {
    return this.engine.on.apply(this.engine, arguments);
  };
  ei.prototype.pipe = function (e, t) {
    return this.compressor
      ? this.engine.pipe.apply(this.engine, [this.compressor]).pipe(e, t)
      : this.engine.pipe.apply(this.engine, arguments);
  };
  ei.prototype.unpipe = function () {
    return this.compressor
      ? this.compressor.unpipe.apply(this.compressor, arguments)
      : this.engine.unpipe.apply(this.engine, arguments);
  };
  WA.exports = ei;
});
var XA = y((yte, YA) => {
  /**
   * JSON Format Plugin
   *
   * @module plugins/json
   * @license [MIT]{@link https://github.com/archiverjs/node-archiver/blob/master/LICENSE}
   * @copyright (c) 2012-2014 Chris Talkington, contributors.
   */ var XV = require("util").inherits,
    HA = at().Transform,
    ZV = el(),
    VA = ia(),
    Ui = function (e) {
      if (!(this instanceof Ui)) return new Ui(e);
      (e = this.options = VA.defaults(e, {})),
        HA.call(this, e),
        (this.supports = { directory: !0, symlink: !0 }),
        (this.files = []);
    };
  XV(Ui, HA);
  Ui.prototype._transform = function (e, t, r) {
    r(null, e);
  };
  Ui.prototype._writeStringified = function () {
    var e = JSON.stringify(this.files);
    this.write(e);
  };
  Ui.prototype.append = function (e, t, r) {
    var i = this;
    t.crc32 = 0;
    function n(s, a) {
      if (s) {
        r(s);
        return;
      }
      (t.size = a.length || 0),
        (t.crc32 = ZV.unsigned(a)),
        i.files.push(t),
        r(null, t);
    }
    t.sourceType === "buffer"
      ? n(null, e)
      : t.sourceType === "stream" && VA.collectStream(e, n);
  };
  Ui.prototype.finalize = function () {
    this._writeStringified(), this.end();
  };
  YA.exports = Ui;
});
var KA = y((vte, ZA) => {
  /**
   * Archiver Vending
   *
   * @ignore
   * @license [MIT]{@link https://github.com/archiverjs/node-archiver/blob/master/LICENSE}
   * @copyright (c) 2012-2014 Chris Talkington, contributors.
   */ var KV = jR(),
    ru = {},
    zi = function (e, t) {
      return zi.create(e, t);
    };
  zi.create = function (e, t) {
    if (ru[e]) {
      var r = new KV(e, t);
      return r.setFormat(e), r.setModule(new ru[e](t)), r;
    } else throw new Error("create(" + e + "): format not registered");
  };
  zi.registerFormat = function (e, t) {
    if (ru[e])
      throw new Error("register(" + e + "): format already registered");
    if (typeof t != "function")
      throw new Error("register(" + e + "): format module invalid");
    if (
      typeof t.prototype.append != "function" ||
      typeof t.prototype.finalize != "function"
    )
      throw new Error("register(" + e + "): format module missing methods");
    ru[e] = t;
  };
  zi.isRegisteredFormat = function (e) {
    return !!ru[e];
  };
  zi.registerFormat("zip", wA());
  zi.registerFormat("tar", GA());
  zi.registerFormat("json", XA());
  ZA.exports = zi;
});
var rN = y((tN) => {
  tN.entityMap = {
    lt: "<",
    gt: ">",
    amp: "&",
    quot: '"',
    apos: "'",
    Agrave: "\xC0",
    Aacute: "\xC1",
    Acirc: "\xC2",
    Atilde: "\xC3",
    Auml: "\xC4",
    Aring: "\xC5",
    AElig: "\xC6",
    Ccedil: "\xC7",
    Egrave: "\xC8",
    Eacute: "\xC9",
    Ecirc: "\xCA",
    Euml: "\xCB",
    Igrave: "\xCC",
    Iacute: "\xCD",
    Icirc: "\xCE",
    Iuml: "\xCF",
    ETH: "\xD0",
    Ntilde: "\xD1",
    Ograve: "\xD2",
    Oacute: "\xD3",
    Ocirc: "\xD4",
    Otilde: "\xD5",
    Ouml: "\xD6",
    Oslash: "\xD8",
    Ugrave: "\xD9",
    Uacute: "\xDA",
    Ucirc: "\xDB",
    Uuml: "\xDC",
    Yacute: "\xDD",
    THORN: "\xDE",
    szlig: "\xDF",
    agrave: "\xE0",
    aacute: "\xE1",
    acirc: "\xE2",
    atilde: "\xE3",
    auml: "\xE4",
    aring: "\xE5",
    aelig: "\xE6",
    ccedil: "\xE7",
    egrave: "\xE8",
    eacute: "\xE9",
    ecirc: "\xEA",
    euml: "\xEB",
    igrave: "\xEC",
    iacute: "\xED",
    icirc: "\xEE",
    iuml: "\xEF",
    eth: "\xF0",
    ntilde: "\xF1",
    ograve: "\xF2",
    oacute: "\xF3",
    ocirc: "\xF4",
    otilde: "\xF5",
    ouml: "\xF6",
    oslash: "\xF8",
    ugrave: "\xF9",
    uacute: "\xFA",
    ucirc: "\xFB",
    uuml: "\xFC",
    yacute: "\xFD",
    thorn: "\xFE",
    yuml: "\xFF",
    nbsp: "\xA0",
    iexcl: "\xA1",
    cent: "\xA2",
    pound: "\xA3",
    curren: "\xA4",
    yen: "\xA5",
    brvbar: "\xA6",
    sect: "\xA7",
    uml: "\xA8",
    copy: "\xA9",
    ordf: "\xAA",
    laquo: "\xAB",
    not: "\xAC",
    shy: "\xAD\xAD",
    reg: "\xAE",
    macr: "\xAF",
    deg: "\xB0",
    plusmn: "\xB1",
    sup2: "\xB2",
    sup3: "\xB3",
    acute: "\xB4",
    micro: "\xB5",
    para: "\xB6",
    middot: "\xB7",
    cedil: "\xB8",
    sup1: "\xB9",
    ordm: "\xBA",
    raquo: "\xBB",
    frac14: "\xBC",
    frac12: "\xBD",
    frac34: "\xBE",
    iquest: "\xBF",
    times: "\xD7",
    divide: "\xF7",
    forall: "\u2200",
    part: "\u2202",
    exist: "\u2203",
    empty: "\u2205",
    nabla: "\u2207",
    isin: "\u2208",
    notin: "\u2209",
    ni: "\u220B",
    prod: "\u220F",
    sum: "\u2211",
    minus: "\u2212",
    lowast: "\u2217",
    radic: "\u221A",
    prop: "\u221D",
    infin: "\u221E",
    ang: "\u2220",
    and: "\u2227",
    or: "\u2228",
    cap: "\u2229",
    cup: "\u222A",
    int: "\u222B",
    there4: "\u2234",
    sim: "\u223C",
    cong: "\u2245",
    asymp: "\u2248",
    ne: "\u2260",
    equiv: "\u2261",
    le: "\u2264",
    ge: "\u2265",
    sub: "\u2282",
    sup: "\u2283",
    nsub: "\u2284",
    sube: "\u2286",
    supe: "\u2287",
    oplus: "\u2295",
    otimes: "\u2297",
    perp: "\u22A5",
    sdot: "\u22C5",
    Alpha: "\u0391",
    Beta: "\u0392",
    Gamma: "\u0393",
    Delta: "\u0394",
    Epsilon: "\u0395",
    Zeta: "\u0396",
    Eta: "\u0397",
    Theta: "\u0398",
    Iota: "\u0399",
    Kappa: "\u039A",
    Lambda: "\u039B",
    Mu: "\u039C",
    Nu: "\u039D",
    Xi: "\u039E",
    Omicron: "\u039F",
    Pi: "\u03A0",
    Rho: "\u03A1",
    Sigma: "\u03A3",
    Tau: "\u03A4",
    Upsilon: "\u03A5",
    Phi: "\u03A6",
    Chi: "\u03A7",
    Psi: "\u03A8",
    Omega: "\u03A9",
    alpha: "\u03B1",
    beta: "\u03B2",
    gamma: "\u03B3",
    delta: "\u03B4",
    epsilon: "\u03B5",
    zeta: "\u03B6",
    eta: "\u03B7",
    theta: "\u03B8",
    iota: "\u03B9",
    kappa: "\u03BA",
    lambda: "\u03BB",
    mu: "\u03BC",
    nu: "\u03BD",
    xi: "\u03BE",
    omicron: "\u03BF",
    pi: "\u03C0",
    rho: "\u03C1",
    sigmaf: "\u03C2",
    sigma: "\u03C3",
    tau: "\u03C4",
    upsilon: "\u03C5",
    phi: "\u03C6",
    chi: "\u03C7",
    psi: "\u03C8",
    omega: "\u03C9",
    thetasym: "\u03D1",
    upsih: "\u03D2",
    piv: "\u03D6",
    OElig: "\u0152",
    oelig: "\u0153",
    Scaron: "\u0160",
    scaron: "\u0161",
    Yuml: "\u0178",
    fnof: "\u0192",
    circ: "\u02C6",
    tilde: "\u02DC",
    ensp: "\u2002",
    emsp: "\u2003",
    thinsp: "\u2009",
    zwnj: "\u200C",
    zwj: "\u200D",
    lrm: "\u200E",
    rlm: "\u200F",
    ndash: "\u2013",
    mdash: "\u2014",
    lsquo: "\u2018",
    rsquo: "\u2019",
    sbquo: "\u201A",
    ldquo: "\u201C",
    rdquo: "\u201D",
    bdquo: "\u201E",
    dagger: "\u2020",
    Dagger: "\u2021",
    bull: "\u2022",
    hellip: "\u2026",
    permil: "\u2030",
    prime: "\u2032",
    Prime: "\u2033",
    lsaquo: "\u2039",
    rsaquo: "\u203A",
    oline: "\u203E",
    euro: "\u20AC",
    trade: "\u2122",
    larr: "\u2190",
    uarr: "\u2191",
    rarr: "\u2192",
    darr: "\u2193",
    harr: "\u2194",
    crarr: "\u21B5",
    lceil: "\u2308",
    rceil: "\u2309",
    lfloor: "\u230A",
    rfloor: "\u230B",
    loz: "\u25CA",
    spades: "\u2660",
    clubs: "\u2663",
    hearts: "\u2665",
    diams: "\u2666",
  };
});
var fN = y((tv) => {
  var ev =
      /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
    iN = new RegExp(
      "[\\-\\.0-9" +
        ev.source.slice(1, -1) +
        "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]",
    ),
    nN = new RegExp(
      "^" + ev.source + iN.source + "*(?::" + ev.source + iN.source + "*)?$",
    ),
    iu = 0,
    $i = 1,
    la = 2,
    nu = 3,
    fa = 4,
    ha = 5,
    su = 6,
    hc = 7;
  function ca(e, t) {
    (this.message = e),
      (this.locator = t),
      Error.captureStackTrace && Error.captureStackTrace(this, ca);
  }
  ca.prototype = new Error();
  ca.prototype.name = ca.name;
  function oN() {}
  oN.prototype = {
    parse: function (e, t, r) {
      var i = this.domBuilder;
      i.startDocument(),
        uN(t, (t = {})),
        QV(e, t, r, i, this.errorHandler),
        i.endDocument();
    },
  };
  function QV(e, t, r, i, n) {
    function s(I) {
      if (I > 65535) {
        I -= 65536;
        var P = 55296 + (I >> 10),
          G = 56320 + (I & 1023);
        return String.fromCharCode(P, G);
      } else return String.fromCharCode(I);
    }
    function a(I) {
      var P = I.slice(1, -1);
      return P in r
        ? r[P]
        : P.charAt(0) === "#"
        ? s(parseInt(P.substr(1).replace("x", "0x")))
        : (n.error("entity not found:" + I), I);
    }
    function o(I) {
      if (I > C) {
        var P = e.substring(C, I).replace(/&#?\w+;/g, a);
        c && u(C), i.characters(P, 0, I - C), (C = I);
      }
    }
    function u(I, P) {
      for (; I >= f && (P = h.exec(e)); )
        (l = P.index), (f = l + P[0].length), c.lineNumber++;
      c.columnNumber = I - l + 1;
    }
    for (
      var l = 0,
        f = 0,
        h = /.*(?:\r\n?|\n)|.*$/g,
        c = i.locator,
        d = [{ currentNSMap: t }],
        m = {},
        C = 0;
      ;

    ) {
      try {
        var E = e.indexOf("<", C);
        if (E < 0) {
          if (!e.substr(C).match(/^\s*$/)) {
            var O = i.doc,
              L = O.createTextNode(e.substr(C));
            O.appendChild(L), (i.currentElement = L);
          }
          return;
        }
        switch ((E > C && o(E), e.charAt(E + 1))) {
          case "/":
            var R = e.indexOf(">", E + 3),
              D = e.substring(E + 2, R),
              w = d.pop();
            R < 0
              ? ((D = e.substring(E + 2).replace(/[\s<].*/, "")),
                n.error("end tag name: " + D + " is not complete:" + w.tagName),
                (R = E + 1 + D.length))
              : D.match(/\s</) &&
                ((D = D.replace(/[\s<].*/, "")),
                n.error("end tag name: " + D + " maybe not complete"),
                (R = E + 1 + D.length));
            var F = w.localNSMap,
              g = w.tagName == D,
              x =
                g || (w.tagName && w.tagName.toLowerCase() == D.toLowerCase());
            if (x) {
              if ((i.endElement(w.uri, w.localName, D), F))
                for (var A in F) i.endPrefixMapping(A);
              g ||
                n.fatalError(
                  "end tag name: " +
                    D +
                    " is not match the current start tagName:" +
                    w.tagName,
                );
            } else d.push(w);
            R++;
            break;
          case "?":
            c && u(E), (R = iY(e, E, i));
            break;
          case "!":
            c && u(E), (R = rY(e, E, i, n));
            break;
          default:
            c && u(E);
            var p = new lN(),
              T = d[d.length - 1].currentNSMap,
              R = JV(e, E, p, T, a, n),
              k = p.length;
            if (
              (!p.closed &&
                tY(e, R, p.tagName, m) &&
                ((p.closed = !0),
                r.nbsp || n.warning("unclosed xml attribute")),
              c && k)
            ) {
              for (var z = sN(c, {}), $ = 0; $ < k; $++) {
                var X = p[$];
                u(X.offset), (X.locator = sN(c, {}));
              }
              (i.locator = z), aN(p, i, T) && d.push(p), (i.locator = c);
            } else aN(p, i, T) && d.push(p);
            p.uri === "http://www.w3.org/1999/xhtml" && !p.closed
              ? (R = eY(e, R, p.tagName, a, i))
              : R++;
        }
      } catch (I) {
        if (I instanceof ca) throw I;
        n.error("element parse error: " + I), (R = -1);
      }
      R > C ? (C = R) : o(Math.max(E, C) + 1);
    }
  }
  function sN(e, t) {
    return (t.lineNumber = e.lineNumber), (t.columnNumber = e.columnNumber), t;
  }
  function JV(e, t, r, i, n, s) {
    function a(d, m, C) {
      d in r.attributeNames && s.fatalError("Attribute " + d + " redefined"),
        r.addValue(d, m, C);
    }
    for (var o, u, l = ++t, f = iu; ; ) {
      var h = e.charAt(l);
      switch (h) {
        case "=":
          if (f === $i) (o = e.slice(t, l)), (f = nu);
          else if (f === la) f = nu;
          else throw new Error("attribute equal must after attrName");
          break;
        case "'":
        case '"':
          if (f === nu || f === $i)
            if (
              (f === $i &&
                (s.warning('attribute value must after "="'),
                (o = e.slice(t, l))),
              (t = l + 1),
              (l = e.indexOf(h, t)),
              l > 0)
            )
              (u = e.slice(t, l).replace(/&#?\w+;/g, n)),
                a(o, u, t - 1),
                (f = ha);
            else throw new Error("attribute value no end '" + h + "' match");
          else if (f == fa)
            (u = e.slice(t, l).replace(/&#?\w+;/g, n)),
              a(o, u, t),
              s.warning('attribute "' + o + '" missed start quot(' + h + ")!!"),
              (t = l + 1),
              (f = ha);
          else throw new Error('attribute value must after "="');
          break;
        case "/":
          switch (f) {
            case iu:
              r.setTagName(e.slice(t, l));
            case ha:
            case su:
            case hc:
              (f = hc), (r.closed = !0);
            case fa:
            case $i:
            case la:
              break;
            default:
              throw new Error("attribute invalid close char('/')");
          }
          break;
        case "":
          return (
            s.error("unexpected end of input"),
            f == iu && r.setTagName(e.slice(t, l)),
            l
          );
        case ">":
          switch (f) {
            case iu:
              r.setTagName(e.slice(t, l));
            case ha:
            case su:
            case hc:
              break;
            case fa:
            case $i:
              (u = e.slice(t, l)),
                u.slice(-1) === "/" && ((r.closed = !0), (u = u.slice(0, -1)));
            case la:
              f === la && (u = o),
                f == fa
                  ? (s.warning('attribute "' + u + '" missed quot(")!'),
                    a(o, u.replace(/&#?\w+;/g, n), t))
                  : ((i[""] !== "http://www.w3.org/1999/xhtml" ||
                      !u.match(/^(?:disabled|checked|selected)$/i)) &&
                      s.warning(
                        'attribute "' +
                          u +
                          '" missed value!! "' +
                          u +
                          '" instead!!',
                      ),
                    a(u, u, t));
              break;
            case nu:
              throw new Error("attribute value missed!!");
          }
          return l;
        case "\x80":
          h = " ";
        default:
          if (h <= " ")
            switch (f) {
              case iu:
                r.setTagName(e.slice(t, l)), (f = su);
                break;
              case $i:
                (o = e.slice(t, l)), (f = la);
                break;
              case fa:
                var u = e.slice(t, l).replace(/&#?\w+;/g, n);
                s.warning('attribute "' + u + '" missed quot(")!!'), a(o, u, t);
              case ha:
                f = su;
                break;
            }
          else
            switch (f) {
              case la:
                var c = r.tagName;
                (i[""] !== "http://www.w3.org/1999/xhtml" ||
                  !o.match(/^(?:disabled|checked|selected)$/i)) &&
                  s.warning(
                    'attribute "' +
                      o +
                      '" missed value!! "' +
                      o +
                      '" instead2!!',
                  ),
                  a(o, o, t),
                  (t = l),
                  (f = $i);
                break;
              case ha:
                s.warning('attribute space is required"' + o + '"!!');
              case su:
                (f = $i), (t = l);
                break;
              case nu:
                (f = fa), (t = l);
                break;
              case hc:
                throw new Error(
                  "elements closed character '/' and '>' must be connected to",
                );
            }
      }
      l++;
    }
  }
  function aN(e, t, r) {
    for (var i = e.tagName, n = null, h = e.length; h--; ) {
      var s = e[h],
        a = s.qName,
        o = s.value,
        c = a.indexOf(":");
      if (c > 0)
        var u = (s.prefix = a.slice(0, c)),
          l = a.slice(c + 1),
          f = u === "xmlns" && l;
      else (l = a), (u = null), (f = a === "xmlns" && "");
      (s.localName = l),
        f !== !1 &&
          (n == null && ((n = {}), uN(r, (r = {}))),
          (r[f] = n[f] = o),
          (s.uri = "http://www.w3.org/2000/xmlns/"),
          t.startPrefixMapping(f, o));
    }
    for (var h = e.length; h--; ) {
      s = e[h];
      var u = s.prefix;
      u &&
        (u === "xml" && (s.uri = "http://www.w3.org/XML/1998/namespace"),
        u !== "xmlns" && (s.uri = r[u || ""]));
    }
    var c = i.indexOf(":");
    c > 0
      ? ((u = e.prefix = i.slice(0, c)), (l = e.localName = i.slice(c + 1)))
      : ((u = null), (l = e.localName = i));
    var d = (e.uri = r[u || ""]);
    if ((t.startElement(d, l, i, e), e.closed)) {
      if ((t.endElement(d, l, i), n)) for (u in n) t.endPrefixMapping(u);
    } else return (e.currentNSMap = r), (e.localNSMap = n), !0;
  }
  function eY(e, t, r, i, n) {
    if (/^(?:script|textarea)$/i.test(r)) {
      var s = e.indexOf("</" + r + ">", t),
        a = e.substring(t + 1, s);
      if (/[&<]/.test(a))
        return /^script$/i.test(r)
          ? (n.characters(a, 0, a.length), s)
          : ((a = a.replace(/&#?\w+;/g, i)), n.characters(a, 0, a.length), s);
    }
    return t + 1;
  }
  function tY(e, t, r, i) {
    var n = i[r];
    return (
      n == null &&
        ((n = e.lastIndexOf("</" + r + ">")),
        n < t && (n = e.lastIndexOf("</" + r)),
        (i[r] = n)),
      n < t
    );
  }
  function uN(e, t) {
    for (var r in e) t[r] = e[r];
  }
  function rY(e, t, r, i) {
    var n = e.charAt(t + 2);
    switch (n) {
      case "-":
        if (e.charAt(t + 3) === "-") {
          var s = e.indexOf("-->", t + 4);
          return s > t
            ? (r.comment(e, t + 4, s - t - 4), s + 3)
            : (i.error("Unclosed comment"), -1);
        } else return -1;
      default:
        if (e.substr(t + 3, 6) == "CDATA[") {
          var s = e.indexOf("]]>", t + 9);
          return (
            r.startCDATA(),
            r.characters(e, t + 9, s - t - 9),
            r.endCDATA(),
            s + 3
          );
        }
        var a = nY(e, t),
          o = a.length;
        if (o > 1 && /!doctype/i.test(a[0][0])) {
          var u = a[1][0],
            l = !1,
            f = !1;
          o > 3 &&
            (/^public$/i.test(a[2][0])
              ? ((l = a[3][0]), (f = o > 4 && a[4][0]))
              : /^system$/i.test(a[2][0]) && (f = a[3][0]));
          var h = a[o - 1];
          return r.startDTD(u, l, f), r.endDTD(), h.index + h[0].length;
        }
    }
    return -1;
  }
  function iY(e, t, r) {
    var i = e.indexOf("?>", t);
    if (i) {
      var n = e.substring(t, i).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
      if (n) {
        var s = n[0].length;
        return r.processingInstruction(n[1], n[2]), i + 2;
      } else return -1;
    }
    return -1;
  }
  function lN() {
    this.attributeNames = {};
  }
  lN.prototype = {
    setTagName: function (e) {
      if (!nN.test(e)) throw new Error("invalid tagName:" + e);
      this.tagName = e;
    },
    addValue: function (e, t, r) {
      if (!nN.test(e)) throw new Error("invalid attribute:" + e);
      (this.attributeNames[e] = this.length),
        (this[this.length++] = { qName: e, value: t, offset: r });
    },
    length: 0,
    getLocalName: function (e) {
      return this[e].localName;
    },
    getLocator: function (e) {
      return this[e].locator;
    },
    getQName: function (e) {
      return this[e].qName;
    },
    getURI: function (e) {
      return this[e].uri;
    },
    getValue: function (e) {
      return this[e].value;
    },
  };
  function nY(e, t) {
    var r,
      i = [],
      n = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
    for (n.lastIndex = t, n.exec(e); (r = n.exec(e)); )
      if ((i.push(r), r[1])) return i;
  }
  tv.XMLReader = oN;
  tv.ParseError = ca;
});
var hv = y((fu) => {
  function ou(e, t) {
    for (var r in e) t[r] = e[r];
  }
  function bt(e, t) {
    var r = e.prototype;
    if (!(r instanceof t)) {
      let n = function () {};
      var i = n;
      (n.prototype = t.prototype),
        (n = new n()),
        ou(r, n),
        (e.prototype = r = n);
    }
    r.constructor != e &&
      (typeof e != "function" && console.error("unknow Class:" + e),
      (r.constructor = e));
  }
  var sY = "http://www.w3.org/1999/xhtml",
    Et = {},
    ur = (Et.ELEMENT_NODE = 1),
    pa = (Et.ATTRIBUTE_NODE = 2),
    cc = (Et.TEXT_NODE = 3),
    gN = (Et.CDATA_SECTION_NODE = 4),
    yN = (Et.ENTITY_REFERENCE_NODE = 5),
    aY = (Et.ENTITY_NODE = 6),
    vN = (Et.PROCESSING_INSTRUCTION_NODE = 7),
    wN = (Et.COMMENT_NODE = 8),
    DN = (Et.DOCUMENT_NODE = 9),
    bN = (Et.DOCUMENT_TYPE_NODE = 10),
    ti = (Et.DOCUMENT_FRAGMENT_NODE = 11),
    oY = (Et.NOTATION_NODE = 12),
    ft = {},
    Ye = {},
    xte = (ft.INDEX_SIZE_ERR = ((Ye[1] = "Index size error"), 1)),
    Cte = (ft.DOMSTRING_SIZE_ERR = ((Ye[2] = "DOMString size error"), 2)),
    uY = (ft.HIERARCHY_REQUEST_ERR = ((Ye[3] = "Hierarchy request error"), 3)),
    Ote = (ft.WRONG_DOCUMENT_ERR = ((Ye[4] = "Wrong document"), 4)),
    Tte = (ft.INVALID_CHARACTER_ERR = ((Ye[5] = "Invalid character"), 5)),
    Fte = (ft.NO_DATA_ALLOWED_ERR = ((Ye[6] = "No data allowed"), 6)),
    Rte = (ft.NO_MODIFICATION_ALLOWED_ERR =
      ((Ye[7] = "No modification allowed"), 7)),
    lY = (ft.NOT_FOUND_ERR = ((Ye[8] = "Not found"), 8)),
    Ate = (ft.NOT_SUPPORTED_ERR = ((Ye[9] = "Not supported"), 9)),
    hN = (ft.INUSE_ATTRIBUTE_ERR = ((Ye[10] = "Attribute in use"), 10)),
    Nte = (ft.INVALID_STATE_ERR = ((Ye[11] = "Invalid state"), 11)),
    Ite = (ft.SYNTAX_ERR = ((Ye[12] = "Syntax error"), 12)),
    Mte = (ft.INVALID_MODIFICATION_ERR =
      ((Ye[13] = "Invalid modification"), 13)),
    Lte = (ft.NAMESPACE_ERR = ((Ye[14] = "Invalid namespace"), 14)),
    qte = (ft.INVALID_ACCESS_ERR = ((Ye[15] = "Invalid access"), 15));
  function jn(e, t) {
    if (t instanceof Error) var r = t;
    else
      (r = this),
        Error.call(this, Ye[e]),
        (this.message = Ye[e]),
        Error.captureStackTrace && Error.captureStackTrace(this, jn);
    return (r.code = e), t && (this.message = this.message + ": " + t), r;
  }
  jn.prototype = Error.prototype;
  ou(ft, jn);
  function Wi() {}
  Wi.prototype = {
    length: 0,
    item: function (e) {
      return this[e] || null;
    },
    toString: function (e, t) {
      for (var r = [], i = 0; i < this.length; i++) da(this[i], r, e, t);
      return r.join("");
    },
  };
  function ma(e, t) {
    (this._node = e), (this._refresh = t), iv(this);
  }
  function iv(e) {
    var t = e._node._inc || e._node.ownerDocument._inc;
    if (e._inc != t) {
      var r = e._refresh(e._node);
      NN(e, "length", r.length), ou(r, e), (e._inc = t);
    }
  }
  ma.prototype.item = function (e) {
    return iv(this), this[e];
  };
  bt(ma, Wi);
  function dc() {}
  function EN(e, t) {
    for (var r = e.length; r--; ) if (e[r] === t) return r;
  }
  function cN(e, t, r, i) {
    if ((i ? (t[EN(t, i)] = r) : (t[t.length++] = r), e)) {
      r.ownerElement = e;
      var n = e.ownerDocument;
      n && (i && SN(n, e, i), fY(n, e, r));
    }
  }
  function dN(e, t, r) {
    var i = EN(t, r);
    if (i >= 0) {
      for (var n = t.length - 1; i < n; ) t[i] = t[++i];
      if (((t.length = n), e)) {
        var s = e.ownerDocument;
        s && (SN(s, e, r), (r.ownerElement = null));
      }
    } else throw jn(lY, new Error(e.tagName + "@" + r));
  }
  dc.prototype = {
    length: 0,
    item: Wi.prototype.item,
    getNamedItem: function (e) {
      for (var t = this.length; t--; ) {
        var r = this[t];
        if (r.nodeName == e) return r;
      }
    },
    setNamedItem: function (e) {
      var t = e.ownerElement;
      if (t && t != this._ownerElement) throw new jn(hN);
      var r = this.getNamedItem(e.nodeName);
      return cN(this._ownerElement, this, e, r), r;
    },
    setNamedItemNS: function (e) {
      var t = e.ownerElement,
        r;
      if (t && t != this._ownerElement) throw new jn(hN);
      return (
        (r = this.getNamedItemNS(e.namespaceURI, e.localName)),
        cN(this._ownerElement, this, e, r),
        r
      );
    },
    removeNamedItem: function (e) {
      var t = this.getNamedItem(e);
      return dN(this._ownerElement, this, t), t;
    },
    removeNamedItemNS: function (e, t) {
      var r = this.getNamedItemNS(e, t);
      return dN(this._ownerElement, this, r), r;
    },
    getNamedItemNS: function (e, t) {
      for (var r = this.length; r--; ) {
        var i = this[r];
        if (i.localName == t && i.namespaceURI == e) return i;
      }
      return null;
    },
  };
  function _N(e) {
    if (((this._features = {}), e)) for (var t in e) this._features = e[t];
  }
  _N.prototype = {
    hasFeature: function (e, t) {
      var r = this._features[e.toLowerCase()];
      return !!(r && (!t || t in r));
    },
    createDocument: function (e, t, r) {
      var i = new uu();
      if (
        ((i.implementation = this),
        (i.childNodes = new Wi()),
        (i.doctype = r),
        r && i.appendChild(r),
        t)
      ) {
        var n = i.createElementNS(e, t);
        i.appendChild(n);
      }
      return i;
    },
    createDocumentType: function (e, t, r) {
      var i = new uv();
      return (
        (i.name = e), (i.nodeName = e), (i.publicId = t), (i.systemId = r), i
      );
    },
  };
  function ht() {}
  ht.prototype = {
    firstChild: null,
    lastChild: null,
    previousSibling: null,
    nextSibling: null,
    attributes: null,
    parentNode: null,
    childNodes: null,
    ownerDocument: null,
    nodeValue: null,
    namespaceURI: null,
    prefix: null,
    localName: null,
    insertBefore: function (e, t) {
      return CN(this, e, t);
    },
    replaceChild: function (e, t) {
      this.insertBefore(e, t), t && this.removeChild(t);
    },
    removeChild: function (e) {
      return xN(this, e);
    },
    appendChild: function (e) {
      return this.insertBefore(e, null);
    },
    hasChildNodes: function () {
      return this.firstChild != null;
    },
    cloneNode: function (e) {
      return rv(this.ownerDocument || this, this, e);
    },
    normalize: function () {
      for (var e = this.firstChild; e; ) {
        var t = e.nextSibling;
        t && t.nodeType == cc && e.nodeType == cc
          ? (this.removeChild(t), e.appendData(t.data))
          : (e.normalize(), (e = t));
      }
    },
    isSupported: function (e, t) {
      return this.ownerDocument.implementation.hasFeature(e, t);
    },
    hasAttributes: function () {
      return this.attributes.length > 0;
    },
    lookupPrefix: function (e) {
      for (var t = this; t; ) {
        var r = t._nsMap;
        if (r) {
          for (var i in r) if (r[i] == e) return i;
        }
        t = t.nodeType == pa ? t.ownerDocument : t.parentNode;
      }
      return null;
    },
    lookupNamespaceURI: function (e) {
      for (var t = this; t; ) {
        var r = t._nsMap;
        if (r && e in r) return r[e];
        t = t.nodeType == pa ? t.ownerDocument : t.parentNode;
      }
      return null;
    },
    isDefaultNamespace: function (e) {
      var t = this.lookupPrefix(e);
      return t == null;
    },
  };
  function pN(e) {
    return (
      (e == "<" && "&lt;") ||
      (e == ">" && "&gt;") ||
      (e == "&" && "&amp;") ||
      (e == '"' && "&quot;") ||
      "&#" + e.charCodeAt() + ";"
    );
  }
  ou(Et, ht);
  ou(Et, ht.prototype);
  function au(e, t) {
    if (t(e)) return !0;
    if ((e = e.firstChild))
      do if (au(e, t)) return !0;
      while ((e = e.nextSibling));
  }
  function uu() {}
  function fY(e, t, r) {
    e && e._inc++;
    var i = r.namespaceURI;
    i == "http://www.w3.org/2000/xmlns/" &&
      (t._nsMap[r.prefix ? r.localName : ""] = r.value);
  }
  function SN(e, t, r, i) {
    e && e._inc++;
    var n = r.namespaceURI;
    n == "http://www.w3.org/2000/xmlns/" &&
      delete t._nsMap[r.prefix ? r.localName : ""];
  }
  function nv(e, t, r) {
    if (e && e._inc) {
      e._inc++;
      var i = t.childNodes;
      if (r) i[i.length++] = r;
      else {
        for (var n = t.firstChild, s = 0; n; )
          (i[s++] = n), (n = n.nextSibling);
        i.length = s;
      }
    }
  }
  function xN(e, t) {
    var r = t.previousSibling,
      i = t.nextSibling;
    return (
      r ? (r.nextSibling = i) : (e.firstChild = i),
      i ? (i.previousSibling = r) : (e.lastChild = r),
      nv(e.ownerDocument, e),
      t
    );
  }
  function CN(e, t, r) {
    var i = t.parentNode;
    if ((i && i.removeChild(t), t.nodeType === ti)) {
      var n = t.firstChild;
      if (n == null) return t;
      var s = t.lastChild;
    } else n = s = t;
    var a = r ? r.previousSibling : e.lastChild;
    (n.previousSibling = a),
      (s.nextSibling = r),
      a ? (a.nextSibling = n) : (e.firstChild = n),
      r == null ? (e.lastChild = s) : (r.previousSibling = s);
    do n.parentNode = e;
    while (n !== s && (n = n.nextSibling));
    return (
      nv(e.ownerDocument || e, e),
      t.nodeType == ti && (t.firstChild = t.lastChild = null),
      t
    );
  }
  function hY(e, t) {
    var r = t.parentNode;
    if (r) {
      var i = e.lastChild;
      r.removeChild(t);
      var i = e.lastChild;
    }
    var i = e.lastChild;
    return (
      (t.parentNode = e),
      (t.previousSibling = i),
      (t.nextSibling = null),
      i ? (i.nextSibling = t) : (e.firstChild = t),
      (e.lastChild = t),
      nv(e.ownerDocument, e, t),
      t
    );
  }
  uu.prototype = {
    nodeName: "#document",
    nodeType: DN,
    doctype: null,
    documentElement: null,
    _inc: 1,
    insertBefore: function (e, t) {
      if (e.nodeType == ti) {
        for (var r = e.firstChild; r; ) {
          var i = r.nextSibling;
          this.insertBefore(r, t), (r = i);
        }
        return e;
      }
      return (
        this.documentElement == null &&
          e.nodeType == ur &&
          (this.documentElement = e),
        CN(this, e, t),
        (e.ownerDocument = this),
        e
      );
    },
    removeChild: function (e) {
      return (
        this.documentElement == e && (this.documentElement = null), xN(this, e)
      );
    },
    importNode: function (e, t) {
      return AN(this, e, t);
    },
    getElementById: function (e) {
      var t = null;
      return (
        au(this.documentElement, function (r) {
          if (r.nodeType == ur && r.getAttribute("id") == e) return (t = r), !0;
        }),
        t
      );
    },
    getElementsByClassName: function (e) {
      var t = new RegExp("(^|\\s)" + e + "(\\s|$)");
      return new ma(this, function (r) {
        var i = [];
        return (
          au(r.documentElement, function (n) {
            n !== r &&
              n.nodeType == ur &&
              t.test(n.getAttribute("class")) &&
              i.push(n);
          }),
          i
        );
      });
    },
    createElement: function (e) {
      var t = new ga();
      (t.ownerDocument = this),
        (t.nodeName = e),
        (t.tagName = e),
        (t.childNodes = new Wi());
      var r = (t.attributes = new dc());
      return (r._ownerElement = t), t;
    },
    createDocumentFragment: function () {
      var e = new mc();
      return (e.ownerDocument = this), (e.childNodes = new Wi()), e;
    },
    createTextNode: function (e) {
      var t = new sv();
      return (t.ownerDocument = this), t.appendData(e), t;
    },
    createComment: function (e) {
      var t = new av();
      return (t.ownerDocument = this), t.appendData(e), t;
    },
    createCDATASection: function (e) {
      var t = new ov();
      return (t.ownerDocument = this), t.appendData(e), t;
    },
    createProcessingInstruction: function (e, t) {
      var r = new fv();
      return (
        (r.ownerDocument = this),
        (r.tagName = r.target = e),
        (r.nodeValue = r.data = t),
        r
      );
    },
    createAttribute: function (e) {
      var t = new pc();
      return (
        (t.ownerDocument = this),
        (t.name = e),
        (t.nodeName = e),
        (t.localName = e),
        (t.specified = !0),
        t
      );
    },
    createEntityReference: function (e) {
      var t = new lv();
      return (t.ownerDocument = this), (t.nodeName = e), t;
    },
    createElementNS: function (e, t) {
      var r = new ga(),
        i = t.split(":"),
        n = (r.attributes = new dc());
      return (
        (r.childNodes = new Wi()),
        (r.ownerDocument = this),
        (r.nodeName = t),
        (r.tagName = t),
        (r.namespaceURI = e),
        i.length == 2
          ? ((r.prefix = i[0]), (r.localName = i[1]))
          : (r.localName = t),
        (n._ownerElement = r),
        r
      );
    },
    createAttributeNS: function (e, t) {
      var r = new pc(),
        i = t.split(":");
      return (
        (r.ownerDocument = this),
        (r.nodeName = t),
        (r.name = t),
        (r.namespaceURI = e),
        (r.specified = !0),
        i.length == 2
          ? ((r.prefix = i[0]), (r.localName = i[1]))
          : (r.localName = t),
        r
      );
    },
  };
  bt(uu, ht);
  function ga() {
    this._nsMap = {};
  }
  ga.prototype = {
    nodeType: ur,
    hasAttribute: function (e) {
      return this.getAttributeNode(e) != null;
    },
    getAttribute: function (e) {
      var t = this.getAttributeNode(e);
      return (t && t.value) || "";
    },
    getAttributeNode: function (e) {
      return this.attributes.getNamedItem(e);
    },
    setAttribute: function (e, t) {
      var r = this.ownerDocument.createAttribute(e);
      (r.value = r.nodeValue = "" + t), this.setAttributeNode(r);
    },
    removeAttribute: function (e) {
      var t = this.getAttributeNode(e);
      t && this.removeAttributeNode(t);
    },
    appendChild: function (e) {
      return e.nodeType === ti ? this.insertBefore(e, null) : hY(this, e);
    },
    setAttributeNode: function (e) {
      return this.attributes.setNamedItem(e);
    },
    setAttributeNodeNS: function (e) {
      return this.attributes.setNamedItemNS(e);
    },
    removeAttributeNode: function (e) {
      return this.attributes.removeNamedItem(e.nodeName);
    },
    removeAttributeNS: function (e, t) {
      var r = this.getAttributeNodeNS(e, t);
      r && this.removeAttributeNode(r);
    },
    hasAttributeNS: function (e, t) {
      return this.getAttributeNodeNS(e, t) != null;
    },
    getAttributeNS: function (e, t) {
      var r = this.getAttributeNodeNS(e, t);
      return (r && r.value) || "";
    },
    setAttributeNS: function (e, t, r) {
      var i = this.ownerDocument.createAttributeNS(e, t);
      (i.value = i.nodeValue = "" + r), this.setAttributeNode(i);
    },
    getAttributeNodeNS: function (e, t) {
      return this.attributes.getNamedItemNS(e, t);
    },
    getElementsByTagName: function (e) {
      return new ma(this, function (t) {
        var r = [];
        return (
          au(t, function (i) {
            i !== t &&
              i.nodeType == ur &&
              (e === "*" || i.tagName == e) &&
              r.push(i);
          }),
          r
        );
      });
    },
    getElementsByTagNameNS: function (e, t) {
      return new ma(this, function (r) {
        var i = [];
        return (
          au(r, function (n) {
            n !== r &&
              n.nodeType === ur &&
              (e === "*" || n.namespaceURI === e) &&
              (t === "*" || n.localName == t) &&
              i.push(n);
          }),
          i
        );
      });
    },
  };
  uu.prototype.getElementsByTagName = ga.prototype.getElementsByTagName;
  uu.prototype.getElementsByTagNameNS = ga.prototype.getElementsByTagNameNS;
  bt(ga, ht);
  function pc() {}
  pc.prototype.nodeType = pa;
  bt(pc, ht);
  function lu() {}
  lu.prototype = {
    data: "",
    substringData: function (e, t) {
      return this.data.substring(e, e + t);
    },
    appendData: function (e) {
      (e = this.data + e),
        (this.nodeValue = this.data = e),
        (this.length = e.length);
    },
    insertData: function (e, t) {
      this.replaceData(e, 0, t);
    },
    appendChild: function (e) {
      throw new Error(Ye[uY]);
    },
    deleteData: function (e, t) {
      this.replaceData(e, t, "");
    },
    replaceData: function (e, t, r) {
      var i = this.data.substring(0, e),
        n = this.data.substring(e + t);
      (r = i + r + n),
        (this.nodeValue = this.data = r),
        (this.length = r.length);
    },
  };
  bt(lu, ht);
  function sv() {}
  sv.prototype = {
    nodeName: "#text",
    nodeType: cc,
    splitText: function (e) {
      var t = this.data,
        r = t.substring(e);
      (t = t.substring(0, e)),
        (this.data = this.nodeValue = t),
        (this.length = t.length);
      var i = this.ownerDocument.createTextNode(r);
      return (
        this.parentNode && this.parentNode.insertBefore(i, this.nextSibling), i
      );
    },
  };
  bt(sv, lu);
  function av() {}
  av.prototype = { nodeName: "#comment", nodeType: wN };
  bt(av, lu);
  function ov() {}
  ov.prototype = { nodeName: "#cdata-section", nodeType: gN };
  bt(ov, lu);
  function uv() {}
  uv.prototype.nodeType = bN;
  bt(uv, ht);
  function ON() {}
  ON.prototype.nodeType = oY;
  bt(ON, ht);
  function TN() {}
  TN.prototype.nodeType = aY;
  bt(TN, ht);
  function lv() {}
  lv.prototype.nodeType = yN;
  bt(lv, ht);
  function mc() {}
  mc.prototype.nodeName = "#document-fragment";
  mc.prototype.nodeType = ti;
  bt(mc, ht);
  function fv() {}
  fv.prototype.nodeType = vN;
  bt(fv, ht);
  function FN() {}
  FN.prototype.serializeToString = function (e, t, r) {
    return RN.call(e, t, r);
  };
  ht.prototype.toString = RN;
  function RN(e, t) {
    var r = [],
      i = (this.nodeType == 9 && this.documentElement) || this,
      n = i.prefix,
      s = i.namespaceURI;
    if (s && n == null) {
      var n = i.lookupPrefix(s);
      if (n == null) var a = [{ namespace: s, prefix: null }];
    }
    return da(this, r, e, t, a), r.join("");
  }
  function mN(e, t, r) {
    var i = e.prefix || "",
      n = e.namespaceURI;
    if (
      (!i && !n) ||
      (i === "xml" && n === "http://www.w3.org/XML/1998/namespace") ||
      n == "http://www.w3.org/2000/xmlns/"
    )
      return !1;
    for (var s = r.length; s--; ) {
      var a = r[s];
      if (a.prefix == i) return a.namespace != n;
    }
    return !0;
  }
  function da(e, t, r, i, n) {
    if (i)
      if (((e = i(e)), e)) {
        if (typeof e == "string") {
          t.push(e);
          return;
        }
      } else return;
    switch (e.nodeType) {
      case ur:
        n || (n = []);
        var s = n.length,
          a = e.attributes,
          o = a.length,
          m = e.firstChild,
          u = e.tagName;
        (r = sY === e.namespaceURI || r), t.push("<", u);
        for (var l = 0; l < o; l++) {
          var f = a.item(l);
          f.prefix == "xmlns"
            ? n.push({ prefix: f.localName, namespace: f.value })
            : f.nodeName == "xmlns" &&
              n.push({ prefix: "", namespace: f.value });
        }
        for (var l = 0; l < o; l++) {
          var f = a.item(l);
          if (mN(f, r, n)) {
            var h = f.prefix || "",
              c = f.namespaceURI,
              d = h ? " xmlns:" + h : " xmlns";
            t.push(d, '="', c, '"'), n.push({ prefix: h, namespace: c });
          }
          da(f, t, r, i, n);
        }
        if (mN(e, r, n)) {
          var h = e.prefix || "",
            c = e.namespaceURI;
          if (c) {
            var d = h ? " xmlns:" + h : " xmlns";
            t.push(d, '="', c, '"'), n.push({ prefix: h, namespace: c });
          }
        }
        if (m || (r && !/^(?:meta|link|img|br|hr|input)$/i.test(u))) {
          if ((t.push(">"), r && /^script$/i.test(u)))
            for (; m; )
              m.data ? t.push(m.data) : da(m, t, r, i, n), (m = m.nextSibling);
          else for (; m; ) da(m, t, r, i, n), (m = m.nextSibling);
          t.push("</", u, ">");
        } else t.push("/>");
        return;
      case DN:
      case ti:
        for (var m = e.firstChild; m; ) da(m, t, r, i, n), (m = m.nextSibling);
        return;
      case pa:
        return t.push(" ", e.name, '="', e.value.replace(/[<&"]/g, pN), '"');
      case cc:
        return t.push(e.data.replace(/[<&]/g, pN).replace(/]]>/g, "]]&gt;"));
      case gN:
        return t.push("<![CDATA[", e.data, "]]>");
      case wN:
        return t.push("<!--", e.data, "-->");
      case bN:
        var C = e.publicId,
          E = e.systemId;
        if ((t.push("<!DOCTYPE ", e.name), C))
          t.push(" PUBLIC ", C), E && E != "." && t.push(" ", E), t.push(">");
        else if (E && E != ".") t.push(" SYSTEM ", E, ">");
        else {
          var O = e.internalSubset;
          O && t.push(" [", O, "]"), t.push(">");
        }
        return;
      case vN:
        return t.push("<?", e.target, " ", e.data, "?>");
      case yN:
        return t.push("&", e.nodeName, ";");
      default:
        t.push("??", e.nodeName);
    }
  }
  function AN(e, t, r) {
    var i;
    switch (t.nodeType) {
      case ur:
        (i = t.cloneNode(!1)), (i.ownerDocument = e);
      case ti:
        break;
      case pa:
        r = !0;
        break;
    }
    if (
      (i || (i = t.cloneNode(!1)),
      (i.ownerDocument = e),
      (i.parentNode = null),
      r)
    )
      for (var n = t.firstChild; n; )
        i.appendChild(AN(e, n, r)), (n = n.nextSibling);
    return i;
  }
  function rv(e, t, r) {
    var i = new t.constructor();
    for (var n in t) {
      var s = t[n];
      typeof s != "object" && s != i[n] && (i[n] = s);
    }
    switch (
      (t.childNodes && (i.childNodes = new Wi()),
      (i.ownerDocument = e),
      i.nodeType)
    ) {
      case ur:
        var a = t.attributes,
          o = (i.attributes = new dc()),
          u = a.length;
        o._ownerElement = i;
        for (var l = 0; l < u; l++) i.setAttributeNode(rv(e, a.item(l), !0));
        break;
      case pa:
        r = !0;
    }
    if (r)
      for (var f = t.firstChild; f; )
        i.appendChild(rv(e, f, r)), (f = f.nextSibling);
    return i;
  }
  function NN(e, t, r) {
    e[t] = r;
  }
  try {
    if (Object.defineProperty) {
      let e = function (t) {
        switch (t.nodeType) {
          case ur:
          case ti:
            var r = [];
            for (t = t.firstChild; t; )
              t.nodeType !== 7 && t.nodeType !== 8 && r.push(e(t)),
                (t = t.nextSibling);
            return r.join("");
          default:
            return t.nodeValue;
        }
      };
      (Pte = e),
        Object.defineProperty(ma.prototype, "length", {
          get: function () {
            return iv(this), this.$$length;
          },
        }),
        Object.defineProperty(ht.prototype, "textContent", {
          get: function () {
            return e(this);
          },
          set: function (t) {
            switch (this.nodeType) {
              case ur:
              case ti:
                for (; this.firstChild; ) this.removeChild(this.firstChild);
                (t || String(t)) &&
                  this.appendChild(this.ownerDocument.createTextNode(t));
                break;
              default:
                (this.data = t), (this.value = t), (this.nodeValue = t);
            }
          },
        }),
        (NN = function (t, r, i) {
          t["$$" + r] = i;
        });
    }
  } catch {}
  var Pte;
  fu.Node = ht;
  fu.DOMException = jn;
  fu.DOMImplementation = _N;
  fu.XMLSerializer = FN;
});
var qN = y((cu) => {
  function MN(e) {
    this.options = e || { locator: {} };
  }
  MN.prototype.parseFromString = function (e, t) {
    var r = this.options,
      i = new pY(),
      n = r.domBuilder || new hu(),
      s = r.errorHandler,
      a = r.locator,
      o = r.xmlns || {},
      u = /\/x?html?$/.test(t),
      l = u
        ? dY.entityMap
        : { lt: "<", gt: ">", amp: "&", quot: '"', apos: "'" };
    return (
      a && n.setDocumentLocator(a),
      (i.errorHandler = cY(s, n, a)),
      (i.domBuilder = r.domBuilder || n),
      u && (o[""] = "http://www.w3.org/1999/xhtml"),
      (o.xml = o.xml || "http://www.w3.org/XML/1998/namespace"),
      e && typeof e == "string"
        ? i.parse(e, o, l)
        : i.errorHandler.error("invalid doc source"),
      n.doc
    );
  };
  function cY(e, t, r) {
    if (!e) {
      if (t instanceof hu) return t;
      e = t;
    }
    var i = {},
      n = e instanceof Function;
    r = r || {};
    function s(a) {
      var o = e[a];
      !o &&
        n &&
        (o =
          e.length == 2
            ? function (u) {
                e(a, u);
              }
            : e),
        (i[a] =
          (o &&
            function (u) {
              o("[xmldom " + a + "]	" + u + cv(r));
            }) ||
          function () {});
    }
    return s("warning"), s("error"), s("fatalError"), i;
  }
  function hu() {
    this.cdata = !1;
  }
  function ya(e, t) {
    (t.lineNumber = e.lineNumber), (t.columnNumber = e.columnNumber);
  }
  hu.prototype = {
    startDocument: function () {
      (this.doc = new gY().createDocument(null, null, null)),
        this.locator && (this.doc.documentURI = this.locator.systemId);
    },
    startElement: function (e, t, r, i) {
      var n = this.doc,
        s = n.createElementNS(e, r || t),
        a = i.length;
      gc(this, s),
        (this.currentElement = s),
        this.locator && ya(this.locator, s);
      for (var o = 0; o < a; o++) {
        var e = i.getURI(o),
          u = i.getValue(o),
          r = i.getQName(o),
          l = n.createAttributeNS(e, r);
        this.locator && ya(i.getLocator(o), l),
          (l.value = l.nodeValue = u),
          s.setAttributeNode(l);
      }
    },
    endElement: function (e, t, r) {
      var i = this.currentElement,
        n = i.tagName;
      this.currentElement = i.parentNode;
    },
    startPrefixMapping: function (e, t) {},
    endPrefixMapping: function (e) {},
    processingInstruction: function (e, t) {
      var r = this.doc.createProcessingInstruction(e, t);
      this.locator && ya(this.locator, r), gc(this, r);
    },
    ignorableWhitespace: function (e, t, r) {},
    characters: function (e, t, r) {
      if (((e = IN.apply(this, arguments)), e)) {
        if (this.cdata) var i = this.doc.createCDATASection(e);
        else var i = this.doc.createTextNode(e);
        this.currentElement
          ? this.currentElement.appendChild(i)
          : /^\s*$/.test(e) && this.doc.appendChild(i),
          this.locator && ya(this.locator, i);
      }
    },
    skippedEntity: function (e) {},
    endDocument: function () {
      this.doc.normalize();
    },
    setDocumentLocator: function (e) {
      (this.locator = e) && (e.lineNumber = 0);
    },
    comment: function (e, t, r) {
      e = IN.apply(this, arguments);
      var i = this.doc.createComment(e);
      this.locator && ya(this.locator, i), gc(this, i);
    },
    startCDATA: function () {
      this.cdata = !0;
    },
    endCDATA: function () {
      this.cdata = !1;
    },
    startDTD: function (e, t, r) {
      var i = this.doc.implementation;
      if (i && i.createDocumentType) {
        var n = i.createDocumentType(e, t, r);
        this.locator && ya(this.locator, n), gc(this, n);
      }
    },
    warning: function (e) {
      console.warn("[xmldom warning]	" + e, cv(this.locator));
    },
    error: function (e) {
      console.error("[xmldom error]	" + e, cv(this.locator));
    },
    fatalError: function (e) {
      throw new mY(e, this.locator);
    },
  };
  function cv(e) {
    if (e)
      return (
        `
@` +
        (e.systemId || "") +
        "#[line:" +
        e.lineNumber +
        ",col:" +
        e.columnNumber +
        "]"
      );
  }
  function IN(e, t, r) {
    return typeof e == "string"
      ? e.substr(t, r)
      : e.length >= t + r || t
      ? new java.lang.String(e, t, r) + ""
      : e;
  }
  "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(
    /\w+/g,
    function (e) {
      hu.prototype[e] = function () {
        return null;
      };
    },
  );
  function gc(e, t) {
    e.currentElement ? e.currentElement.appendChild(t) : e.doc.appendChild(t);
  }
  var dY = rN(),
    LN = fN(),
    pY = LN.XMLReader,
    mY = LN.ParseError,
    gY = (cu.DOMImplementation = hv().DOMImplementation);
  cu.XMLSerializer = hv().XMLSerializer;
  cu.DOMParser = MN;
  cu.__DOMHandler = hu;
});
var kN = y((BN) => {
  var yY = qN().DOMParser;
  BN.parse = wY;
  var yc = 3,
    PN = 4,
    vY = 8;
  function dv(e) {
    return e.nodeType === yc || e.nodeType === vY || e.nodeType === PN;
  }
  function ri(e) {
    return !e.childNodes || e.childNodes.length === 0;
  }
  function Un(e, t) {
    if (!e) throw new Error(t);
  }
  function wY(e) {
    var t = new yY().parseFromString(e);
    Un(
      t.documentElement.nodeName === "plist",
      "malformed document. First element should be <plist>",
    );
    var r = va(t.documentElement);
    return r.length == 1 && (r = r[0]), r;
  }
  function va(e) {
    var t, r, i, n, s, a, o, u;
    if (!e) return null;
    if (e.nodeName === "plist") {
      if (((s = []), ri(e))) return s;
      for (t = 0; t < e.childNodes.length; t++)
        dv(e.childNodes[t]) || s.push(va(e.childNodes[t]));
      return s;
    } else if (e.nodeName === "dict") {
      if (((r = {}), (i = null), (o = 0), ri(e))) return r;
      for (t = 0; t < e.childNodes.length; t++)
        dv(e.childNodes[t]) ||
          (o % 2 === 0
            ? (Un(
                e.childNodes[t].nodeName === "key",
                "Missing key while parsing <dict/>.",
              ),
              (i = va(e.childNodes[t])))
            : (Un(
                e.childNodes[t].nodeName !== "key",
                'Unexpected key "' +
                  va(e.childNodes[t]) +
                  '" while parsing <dict/>.',
              ),
              (r[i] = va(e.childNodes[t]))),
          (o += 1));
      return o % 2 === 1 && (r[i] = ""), r;
    } else if (e.nodeName === "array") {
      if (((s = []), ri(e))) return s;
      for (t = 0; t < e.childNodes.length; t++)
        dv(e.childNodes[t]) ||
          ((a = va(e.childNodes[t])), a != null && s.push(a));
      return s;
    } else if (e.nodeName !== "#text") {
      if (e.nodeName === "key")
        return ri(e)
          ? ""
          : (Un(
              e.childNodes[0].nodeValue !== "__proto__",
              "__proto__ keys can lead to prototype pollution. More details on CVE-2022-22912",
            ),
            e.childNodes[0].nodeValue);
      if (e.nodeName === "string") {
        if (((a = ""), ri(e))) return a;
        for (t = 0; t < e.childNodes.length; t++) {
          var u = e.childNodes[t].nodeType;
          (u === yc || u === PN) && (a += e.childNodes[t].nodeValue);
        }
        return a;
      } else {
        if (e.nodeName === "integer")
          return (
            Un(!ri(e), 'Cannot parse "" as integer.'),
            parseInt(e.childNodes[0].nodeValue, 10)
          );
        if (e.nodeName === "real") {
          for (
            Un(!ri(e), 'Cannot parse "" as real.'), a = "", t = 0;
            t < e.childNodes.length;
            t++
          )
            e.childNodes[t].nodeType === yc && (a += e.childNodes[t].nodeValue);
          return parseFloat(a);
        } else if (e.nodeName === "data") {
          if (((a = ""), ri(e))) return Buffer.from(a, "base64");
          for (t = 0; t < e.childNodes.length; t++)
            e.childNodes[t].nodeType === yc &&
              (a += e.childNodes[t].nodeValue.replace(/\s+/g, ""));
          return Buffer.from(a, "base64");
        } else {
          if (e.nodeName === "date")
            return (
              Un(!ri(e), 'Cannot parse "" as Date.'),
              new Date(e.childNodes[0].nodeValue)
            );
          if (e.nodeName === "null") return null;
          if (e.nodeName === "true") return !0;
          if (e.nodeName === "false") return !1;
          throw new Error("Invalid PLIST tag " + e.nodeName);
        }
      }
    }
  }
});
var zN = y((vc) => {
  "use strict";
  vc.byteLength = bY;
  vc.toByteArray = _Y;
  vc.fromByteArray = CY;
  var xr = [],
    Kt = [],
    DY = typeof Uint8Array < "u" ? Uint8Array : Array,
    pv = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (zn = 0, jN = pv.length; zn < jN; ++zn)
    (xr[zn] = pv[zn]), (Kt[pv.charCodeAt(zn)] = zn);
  var zn, jN;
  Kt["-".charCodeAt(0)] = 62;
  Kt["_".charCodeAt(0)] = 63;
  function UN(e) {
    var t = e.length;
    if (t % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var r = e.indexOf("=");
    r === -1 && (r = t);
    var i = r === t ? 0 : 4 - (r % 4);
    return [r, i];
  }
  function bY(e) {
    var t = UN(e),
      r = t[0],
      i = t[1];
    return ((r + i) * 3) / 4 - i;
  }
  function EY(e, t, r) {
    return ((t + r) * 3) / 4 - r;
  }
  function _Y(e) {
    var t,
      r = UN(e),
      i = r[0],
      n = r[1],
      s = new DY(EY(e, i, n)),
      a = 0,
      o = n > 0 ? i - 4 : i,
      u;
    for (u = 0; u < o; u += 4)
      (t =
        (Kt[e.charCodeAt(u)] << 18) |
        (Kt[e.charCodeAt(u + 1)] << 12) |
        (Kt[e.charCodeAt(u + 2)] << 6) |
        Kt[e.charCodeAt(u + 3)]),
        (s[a++] = (t >> 16) & 255),
        (s[a++] = (t >> 8) & 255),
        (s[a++] = t & 255);
    return (
      n === 2 &&
        ((t = (Kt[e.charCodeAt(u)] << 2) | (Kt[e.charCodeAt(u + 1)] >> 4)),
        (s[a++] = t & 255)),
      n === 1 &&
        ((t =
          (Kt[e.charCodeAt(u)] << 10) |
          (Kt[e.charCodeAt(u + 1)] << 4) |
          (Kt[e.charCodeAt(u + 2)] >> 2)),
        (s[a++] = (t >> 8) & 255),
        (s[a++] = t & 255)),
      s
    );
  }
  function SY(e) {
    return (
      xr[(e >> 18) & 63] + xr[(e >> 12) & 63] + xr[(e >> 6) & 63] + xr[e & 63]
    );
  }
  function xY(e, t, r) {
    for (var i, n = [], s = t; s < r; s += 3)
      (i =
        ((e[s] << 16) & 16711680) +
        ((e[s + 1] << 8) & 65280) +
        (e[s + 2] & 255)),
        n.push(SY(i));
    return n.join("");
  }
  function CY(e) {
    for (
      var t, r = e.length, i = r % 3, n = [], s = 16383, a = 0, o = r - i;
      a < o;
      a += s
    )
      n.push(xY(e, a, a + s > o ? o : a + s));
    return (
      i === 1
        ? ((t = e[r - 1]), n.push(xr[t >> 2] + xr[(t << 4) & 63] + "=="))
        : i === 2 &&
          ((t = (e[r - 2] << 8) + e[r - 1]),
          n.push(xr[t >> 10] + xr[(t >> 4) & 63] + xr[(t << 2) & 63] + "=")),
      n.join("")
    );
  }
});
var Cr = y(($N, Gi) => {
  (function () {
    var e,
      t,
      r,
      i,
      n,
      s,
      a,
      o = {}.hasOwnProperty;
    (e = function (u, ...l) {
      var f, h, c, d;
      if (n(Object.assign)) Object.assign.apply(null, arguments);
      else
        for (f = 0, c = l.length; f < c; f++)
          if (((d = l[f]), d != null))
            for (h in d) !o.call(d, h) || (u[h] = d[h]);
      return u;
    }),
      (n = function (u) {
        return !!u && Object.prototype.toString.call(u) === "[object Function]";
      }),
      (s = function (u) {
        var l;
        return !!u && ((l = typeof u) == "function" || l === "object");
      }),
      (r = function (u) {
        return n(Array.isArray)
          ? Array.isArray(u)
          : Object.prototype.toString.call(u) === "[object Array]";
      }),
      (i = function (u) {
        var l;
        if (r(u)) return !u.length;
        for (l in u) if (!!o.call(u, l)) return !1;
        return !0;
      }),
      (a = function (u) {
        var l, f;
        return (
          s(u) &&
          (f = Object.getPrototypeOf(u)) &&
          (l = f.constructor) &&
          typeof l == "function" &&
          l instanceof l &&
          Function.prototype.toString.call(l) ===
            Function.prototype.toString.call(Object)
        );
      }),
      (t = function (u) {
        return n(u.valueOf) ? u.valueOf() : u;
      }),
      (Gi.exports.assign = e),
      (Gi.exports.isFunction = n),
      (Gi.exports.isObject = s),
      (Gi.exports.isArray = r),
      (Gi.exports.isEmpty = i),
      (Gi.exports.isPlainObject = a),
      (Gi.exports.getValue = t);
  }.call($N));
});
var mv = y((WN, GN) => {
  (function () {
    var e;
    GN.exports = e = class {
      hasFeature(r, i) {
        return !0;
      }
      createDocumentType(r, i, n) {
        throw new Error("This DOM method is not implemented.");
      }
      createDocument(r, i, n) {
        throw new Error("This DOM method is not implemented.");
      }
      createHTMLDocument(r) {
        throw new Error("This DOM method is not implemented.");
      }
      getFeature(r, i) {
        throw new Error("This DOM method is not implemented.");
      }
    };
  }.call(WN));
});
var YN = y((HN, VN) => {
  (function () {
    var e;
    VN.exports = e = class {
      constructor() {}
      handleError(r) {
        throw new Error(r);
      }
    };
  }.call(HN));
});
var KN = y((XN, ZN) => {
  (function () {
    var e;
    ZN.exports = e = function () {
      class t {
        constructor(i) {
          this.arr = i || [];
        }
        item(i) {
          return this.arr[i] || null;
        }
        contains(i) {
          return this.arr.indexOf(i) !== -1;
        }
      }
      return (
        Object.defineProperty(t.prototype, "length", {
          get: function () {
            return this.arr.length;
          },
        }),
        t
      );
    }.call(this);
  }.call(XN));
});
var eI = y((QN, JN) => {
  (function () {
    var e, t, r;
    (t = YN()),
      (r = KN()),
      (JN.exports = e =
        function () {
          class i {
            constructor() {
              var s;
              (this.defaultParams = {
                "canonical-form": !1,
                "cdata-sections": !1,
                "comments": !1,
                "datatype-normalization": !1,
                "element-content-whitespace": !0,
                "entities": !0,
                "error-handler": new t(),
                "infoset": !0,
                "validate-if-schema": !1,
                "namespaces": !0,
                "namespace-declarations": !0,
                "normalize-characters": !1,
                "schema-location": "",
                "schema-type": "",
                "split-cdata-sections": !0,
                "validate": !1,
                "well-formed": !0,
              }),
                (this.params = s = Object.create(this.defaultParams));
            }
            getParameter(s) {
              return this.params.hasOwnProperty(s) ? this.params[s] : null;
            }
            canSetParameter(s, a) {
              return !0;
            }
            setParameter(s, a) {
              return a != null ? (this.params[s] = a) : delete this.params[s];
            }
          }
          return (
            Object.defineProperty(i.prototype, "parameterNames", {
              get: function () {
                return new r(Object.keys(this.defaultParams));
              },
            }),
            i
          );
        }.call(this));
  }.call(QN));
});
var Ae = y((tI, rI) => {
  (function () {
    rI.exports = {
      Element: 1,
      Attribute: 2,
      Text: 3,
      CData: 4,
      EntityReference: 5,
      EntityDeclaration: 6,
      ProcessingInstruction: 7,
      Comment: 8,
      Document: 9,
      DocType: 10,
      DocumentFragment: 11,
      NotationDeclaration: 12,
      Declaration: 201,
      Raw: 202,
      AttributeDeclaration: 203,
      ElementDeclaration: 204,
      Dummy: 205,
    };
  }.call(tI));
});
var gv = y((iI, nI) => {
  (function () {
    var e, t, r;
    (e = Ae()),
      (r = Pt()),
      (nI.exports = t =
        function () {
          class i {
            constructor(s, a, o) {
              if (
                ((this.parent = s),
                this.parent &&
                  ((this.options = this.parent.options),
                  (this.stringify = this.parent.stringify)),
                a == null)
              )
                throw new Error("Missing attribute name. " + this.debugInfo(a));
              (this.name = this.stringify.name(a)),
                (this.value = this.stringify.attValue(o)),
                (this.type = e.Attribute),
                (this.isId = !1),
                (this.schemaTypeInfo = null);
            }
            clone() {
              return Object.create(this);
            }
            toString(s) {
              return this.options.writer.attribute(
                this,
                this.options.writer.filterOptions(s),
              );
            }
            debugInfo(s) {
              return (
                (s = s || this.name),
                s == null
                  ? "parent: <" + this.parent.name + ">"
                  : "attribute: {" + s + "}, parent: <" + this.parent.name + ">"
              );
            }
            isEqualNode(s) {
              return !(
                s.namespaceURI !== this.namespaceURI ||
                s.prefix !== this.prefix ||
                s.localName !== this.localName ||
                s.value !== this.value
              );
            }
          }
          return (
            Object.defineProperty(i.prototype, "nodeType", {
              get: function () {
                return this.type;
              },
            }),
            Object.defineProperty(i.prototype, "ownerElement", {
              get: function () {
                return this.parent;
              },
            }),
            Object.defineProperty(i.prototype, "textContent", {
              get: function () {
                return this.value;
              },
              set: function (n) {
                return (this.value = n || "");
              },
            }),
            Object.defineProperty(i.prototype, "namespaceURI", {
              get: function () {
                return "";
              },
            }),
            Object.defineProperty(i.prototype, "prefix", {
              get: function () {
                return "";
              },
            }),
            Object.defineProperty(i.prototype, "localName", {
              get: function () {
                return this.name;
              },
            }),
            Object.defineProperty(i.prototype, "specified", {
              get: function () {
                return !0;
              },
            }),
            i
          );
        }.call(this));
  }.call(iI));
});
var wc = y((sI, aI) => {
  (function () {
    var e;
    aI.exports = e = function () {
      class t {
        constructor(i) {
          this.nodes = i;
        }
        clone() {
          return (this.nodes = null);
        }
        getNamedItem(i) {
          return this.nodes[i];
        }
        setNamedItem(i) {
          var n;
          return (
            (n = this.nodes[i.nodeName]),
            (this.nodes[i.nodeName] = i),
            n || null
          );
        }
        removeNamedItem(i) {
          var n;
          return (n = this.nodes[i]), delete this.nodes[i], n || null;
        }
        item(i) {
          return this.nodes[Object.keys(this.nodes)[i]] || null;
        }
        getNamedItemNS(i, n) {
          throw new Error("This DOM method is not implemented.");
        }
        setNamedItemNS(i) {
          throw new Error("This DOM method is not implemented.");
        }
        removeNamedItemNS(i, n) {
          throw new Error("This DOM method is not implemented.");
        }
      }
      return (
        Object.defineProperty(t.prototype, "length", {
          get: function () {
            return Object.keys(this.nodes).length || 0;
          },
        }),
        t
      );
    }.call(this);
  }.call(sI));
});
var Dc = y((oI, uI) => {
  (function () {
    var e,
      t,
      r,
      i,
      n,
      s,
      a,
      o,
      u = {}.hasOwnProperty;
    ({ isObject: o, isFunction: a, getValue: s } = Cr()),
      (n = Pt()),
      (e = Ae()),
      (t = gv()),
      (i = wc()),
      (uI.exports = r =
        function () {
          class l extends n {
            constructor(h, c, d) {
              var m, C, E, O;
              if ((super(h), c == null))
                throw new Error("Missing element name. " + this.debugInfo());
              if (
                ((this.name = this.stringify.name(c)),
                (this.type = e.Element),
                (this.attribs = {}),
                (this.schemaTypeInfo = null),
                d != null && this.attribute(d),
                h.type === e.Document &&
                  ((this.isRoot = !0),
                  (this.documentObject = h),
                  (h.rootObject = this),
                  h.children))
              ) {
                for (O = h.children, C = 0, E = O.length; C < E; C++)
                  if (((m = O[C]), m.type === e.DocType)) {
                    m.name = this.name;
                    break;
                  }
              }
            }
            clone() {
              var h, c, d, m;
              (d = Object.create(this)),
                d.isRoot && (d.documentObject = null),
                (d.attribs = {}),
                (m = this.attribs);
              for (c in m)
                !u.call(m, c) || ((h = m[c]), (d.attribs[c] = h.clone()));
              return (
                (d.children = []),
                this.children.forEach(function (C) {
                  var E;
                  return (E = C.clone()), (E.parent = d), d.children.push(E);
                }),
                d
              );
            }
            attribute(h, c) {
              var d, m;
              if ((h != null && (h = s(h)), o(h)))
                for (d in h)
                  !u.call(h, d) || ((m = h[d]), this.attribute(d, m));
              else
                a(c) && (c = c.apply()),
                  this.options.keepNullAttributes && c == null
                    ? (this.attribs[h] = new t(this, h, ""))
                    : c != null && (this.attribs[h] = new t(this, h, c));
              return this;
            }
            removeAttribute(h) {
              var c, d, m;
              if (h == null)
                throw new Error("Missing attribute name. " + this.debugInfo());
              if (((h = s(h)), Array.isArray(h)))
                for (d = 0, m = h.length; d < m; d++)
                  (c = h[d]), delete this.attribs[c];
              else delete this.attribs[h];
              return this;
            }
            toString(h) {
              return this.options.writer.element(
                this,
                this.options.writer.filterOptions(h),
              );
            }
            att(h, c) {
              return this.attribute(h, c);
            }
            a(h, c) {
              return this.attribute(h, c);
            }
            getAttribute(h) {
              return this.attribs.hasOwnProperty(h)
                ? this.attribs[h].value
                : null;
            }
            setAttribute(h, c) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            getAttributeNode(h) {
              return this.attribs.hasOwnProperty(h) ? this.attribs[h] : null;
            }
            setAttributeNode(h) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            removeAttributeNode(h) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            getElementsByTagName(h) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            getAttributeNS(h, c) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            setAttributeNS(h, c, d) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            removeAttributeNS(h, c) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            getAttributeNodeNS(h, c) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            setAttributeNodeNS(h) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            getElementsByTagNameNS(h, c) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            hasAttribute(h) {
              return this.attribs.hasOwnProperty(h);
            }
            hasAttributeNS(h, c) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            setIdAttribute(h, c) {
              return this.attribs.hasOwnProperty(h) ? this.attribs[h].isId : c;
            }
            setIdAttributeNS(h, c, d) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            setIdAttributeNode(h, c) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            getElementsByTagName(h) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            getElementsByTagNameNS(h, c) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            getElementsByClassName(h) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            isEqualNode(h) {
              var c, d, m;
              if (
                !super.isEqualNode(h) ||
                h.namespaceURI !== this.namespaceURI ||
                h.prefix !== this.prefix ||
                h.localName !== this.localName ||
                h.attribs.length !== this.attribs.length
              )
                return !1;
              for (
                c = d = 0, m = this.attribs.length - 1;
                0 <= m ? d <= m : d >= m;
                c = 0 <= m ? ++d : --d
              )
                if (!this.attribs[c].isEqualNode(h.attribs[c])) return !1;
              return !0;
            }
          }
          return (
            Object.defineProperty(l.prototype, "tagName", {
              get: function () {
                return this.name;
              },
            }),
            Object.defineProperty(l.prototype, "namespaceURI", {
              get: function () {
                return "";
              },
            }),
            Object.defineProperty(l.prototype, "prefix", {
              get: function () {
                return "";
              },
            }),
            Object.defineProperty(l.prototype, "localName", {
              get: function () {
                return this.name;
              },
            }),
            Object.defineProperty(l.prototype, "id", {
              get: function () {
                throw new Error(
                  "This DOM method is not implemented." + this.debugInfo(),
                );
              },
            }),
            Object.defineProperty(l.prototype, "className", {
              get: function () {
                throw new Error(
                  "This DOM method is not implemented." + this.debugInfo(),
                );
              },
            }),
            Object.defineProperty(l.prototype, "classList", {
              get: function () {
                throw new Error(
                  "This DOM method is not implemented." + this.debugInfo(),
                );
              },
            }),
            Object.defineProperty(l.prototype, "attributes", {
              get: function () {
                return (
                  (!this.attributeMap || !this.attributeMap.nodes) &&
                    (this.attributeMap = new i(this.attribs)),
                  this.attributeMap
                );
              },
            }),
            l
          );
        }.call(this));
  }.call(oI));
});
var du = y((lI, fI) => {
  (function () {
    var e, t;
    (t = Pt()),
      (fI.exports = e =
        function () {
          class r extends t {
            constructor(n) {
              super(n), (this.value = "");
            }
            clone() {
              return Object.create(this);
            }
            substringData(n, s) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            appendData(n) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            insertData(n, s) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            deleteData(n, s) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            replaceData(n, s, a) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            isEqualNode(n) {
              return !(!super.isEqualNode(n) || n.data !== this.data);
            }
          }
          return (
            Object.defineProperty(r.prototype, "data", {
              get: function () {
                return this.value;
              },
              set: function (i) {
                return (this.value = i || "");
              },
            }),
            Object.defineProperty(r.prototype, "length", {
              get: function () {
                return this.value.length;
              },
            }),
            Object.defineProperty(r.prototype, "textContent", {
              get: function () {
                return this.value;
              },
              set: function (i) {
                return (this.value = i || "");
              },
            }),
            r
          );
        }.call(this));
  }.call(lI));
});
var bc = y((hI, cI) => {
  (function () {
    var e, t, r;
    (e = Ae()),
      (r = du()),
      (cI.exports = t =
        class extends r {
          constructor(n, s) {
            if ((super(n), s == null))
              throw new Error("Missing CDATA text. " + this.debugInfo());
            (this.name = "#cdata-section"),
              (this.type = e.CData),
              (this.value = this.stringify.cdata(s));
          }
          clone() {
            return Object.create(this);
          }
          toString(n) {
            return this.options.writer.cdata(
              this,
              this.options.writer.filterOptions(n),
            );
          }
        });
  }.call(hI));
});
var Ec = y((dI, pI) => {
  (function () {
    var e, t, r;
    (e = Ae()),
      (t = du()),
      (pI.exports = r =
        class extends t {
          constructor(n, s) {
            if ((super(n), s == null))
              throw new Error("Missing comment text. " + this.debugInfo());
            (this.name = "#comment"),
              (this.type = e.Comment),
              (this.value = this.stringify.comment(s));
          }
          clone() {
            return Object.create(this);
          }
          toString(n) {
            return this.options.writer.comment(
              this,
              this.options.writer.filterOptions(n),
            );
          }
        });
  }.call(dI));
});
var _c = y((mI, gI) => {
  (function () {
    var e, t, r, i;
    ({ isObject: i } = Cr()),
      (r = Pt()),
      (e = Ae()),
      (gI.exports = t =
        class extends r {
          constructor(s, a, o, u) {
            super(s),
              i(a) && ({ version: a, encoding: o, standalone: u } = a),
              a || (a = "1.0"),
              (this.type = e.Declaration),
              (this.version = this.stringify.xmlVersion(a)),
              o != null && (this.encoding = this.stringify.xmlEncoding(o)),
              u != null && (this.standalone = this.stringify.xmlStandalone(u));
          }
          toString(s) {
            return this.options.writer.declaration(
              this,
              this.options.writer.filterOptions(s),
            );
          }
        });
  }.call(mI));
});
var Sc = y((yI, vI) => {
  (function () {
    var e, t, r;
    (r = Pt()),
      (e = Ae()),
      (vI.exports = t =
        class extends r {
          constructor(n, s, a, o, u, l) {
            if ((super(n), s == null))
              throw new Error("Missing DTD element name. " + this.debugInfo());
            if (a == null)
              throw new Error(
                "Missing DTD attribute name. " + this.debugInfo(s),
              );
            if (!o)
              throw new Error(
                "Missing DTD attribute type. " + this.debugInfo(s),
              );
            if (!u)
              throw new Error(
                "Missing DTD attribute default. " + this.debugInfo(s),
              );
            if (
              (u.indexOf("#") !== 0 && (u = "#" + u),
              !u.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/))
            )
              throw new Error(
                "Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT. " +
                  this.debugInfo(s),
              );
            if (l && !u.match(/^(#FIXED|#DEFAULT)$/))
              throw new Error(
                "Default value only applies to #FIXED or #DEFAULT. " +
                  this.debugInfo(s),
              );
            (this.elementName = this.stringify.name(s)),
              (this.type = e.AttributeDeclaration),
              (this.attributeName = this.stringify.name(a)),
              (this.attributeType = this.stringify.dtdAttType(o)),
              l && (this.defaultValue = this.stringify.dtdAttDefault(l)),
              (this.defaultValueType = u);
          }
          toString(n) {
            return this.options.writer.dtdAttList(
              this,
              this.options.writer.filterOptions(n),
            );
          }
        });
  }.call(yI));
});
var xc = y((wI, DI) => {
  (function () {
    var e, t, r, i;
    ({ isObject: i } = Cr()),
      (r = Pt()),
      (e = Ae()),
      (DI.exports = t =
        function () {
          class n extends r {
            constructor(a, o, u, l) {
              if ((super(a), u == null))
                throw new Error(
                  "Missing DTD entity name. " + this.debugInfo(u),
                );
              if (l == null)
                throw new Error(
                  "Missing DTD entity value. " + this.debugInfo(u),
                );
              if (
                ((this.pe = !!o),
                (this.name = this.stringify.name(u)),
                (this.type = e.EntityDeclaration),
                !i(l))
              )
                (this.value = this.stringify.dtdEntityValue(l)),
                  (this.internal = !0);
              else {
                if (!l.pubID && !l.sysID)
                  throw new Error(
                    "Public and/or system identifiers are required for an external entity. " +
                      this.debugInfo(u),
                  );
                if (l.pubID && !l.sysID)
                  throw new Error(
                    "System identifier is required for a public external entity. " +
                      this.debugInfo(u),
                  );
                if (
                  ((this.internal = !1),
                  l.pubID != null &&
                    (this.pubID = this.stringify.dtdPubID(l.pubID)),
                  l.sysID != null &&
                    (this.sysID = this.stringify.dtdSysID(l.sysID)),
                  l.nData != null &&
                    (this.nData = this.stringify.dtdNData(l.nData)),
                  this.pe && this.nData)
                )
                  throw new Error(
                    "Notation declaration is not allowed in a parameter entity. " +
                      this.debugInfo(u),
                  );
              }
            }
            toString(a) {
              return this.options.writer.dtdEntity(
                this,
                this.options.writer.filterOptions(a),
              );
            }
          }
          return (
            Object.defineProperty(n.prototype, "publicId", {
              get: function () {
                return this.pubID;
              },
            }),
            Object.defineProperty(n.prototype, "systemId", {
              get: function () {
                return this.sysID;
              },
            }),
            Object.defineProperty(n.prototype, "notationName", {
              get: function () {
                return this.nData || null;
              },
            }),
            Object.defineProperty(n.prototype, "inputEncoding", {
              get: function () {
                return null;
              },
            }),
            Object.defineProperty(n.prototype, "xmlEncoding", {
              get: function () {
                return null;
              },
            }),
            Object.defineProperty(n.prototype, "xmlVersion", {
              get: function () {
                return null;
              },
            }),
            n
          );
        }.call(this));
  }.call(wI));
});
var Cc = y((bI, EI) => {
  (function () {
    var e, t, r;
    (r = Pt()),
      (e = Ae()),
      (EI.exports = t =
        class extends r {
          constructor(n, s, a) {
            if ((super(n), s == null))
              throw new Error("Missing DTD element name. " + this.debugInfo());
            a || (a = "(#PCDATA)"),
              Array.isArray(a) && (a = "(" + a.join(",") + ")"),
              (this.name = this.stringify.name(s)),
              (this.type = e.ElementDeclaration),
              (this.value = this.stringify.dtdElementValue(a));
          }
          toString(n) {
            return this.options.writer.dtdElement(
              this,
              this.options.writer.filterOptions(n),
            );
          }
        });
  }.call(bI));
});
var Oc = y((_I, SI) => {
  (function () {
    var e, t, r;
    (r = Pt()),
      (e = Ae()),
      (SI.exports = t =
        function () {
          class i extends r {
            constructor(s, a, o) {
              if ((super(s), a == null))
                throw new Error(
                  "Missing DTD notation name. " + this.debugInfo(a),
                );
              if (!o.pubID && !o.sysID)
                throw new Error(
                  "Public or system identifiers are required for an external entity. " +
                    this.debugInfo(a),
                );
              (this.name = this.stringify.name(a)),
                (this.type = e.NotationDeclaration),
                o.pubID != null &&
                  (this.pubID = this.stringify.dtdPubID(o.pubID)),
                o.sysID != null &&
                  (this.sysID = this.stringify.dtdSysID(o.sysID));
            }
            toString(s) {
              return this.options.writer.dtdNotation(
                this,
                this.options.writer.filterOptions(s),
              );
            }
          }
          return (
            Object.defineProperty(i.prototype, "publicId", {
              get: function () {
                return this.pubID;
              },
            }),
            Object.defineProperty(i.prototype, "systemId", {
              get: function () {
                return this.sysID;
              },
            }),
            i
          );
        }.call(this));
  }.call(_I));
});
var Tc = y((xI, CI) => {
  (function () {
    var e, t, r, i, n, s, a, o, u;
    ({ isObject: u } = Cr()),
      (o = Pt()),
      (e = Ae()),
      (t = Sc()),
      (i = xc()),
      (r = Cc()),
      (n = Oc()),
      (a = wc()),
      (CI.exports = s =
        function () {
          class l extends o {
            constructor(h, c, d) {
              var m, C, E, O;
              if ((super(h), (this.type = e.DocType), h.children)) {
                for (O = h.children, C = 0, E = O.length; C < E; C++)
                  if (((m = O[C]), m.type === e.Element)) {
                    this.name = m.name;
                    break;
                  }
              }
              (this.documentObject = h),
                u(c) && ({ pubID: c, sysID: d } = c),
                d == null && ([d, c] = [c, d]),
                c != null && (this.pubID = this.stringify.dtdPubID(c)),
                d != null && (this.sysID = this.stringify.dtdSysID(d));
            }
            element(h, c) {
              var d;
              return (d = new r(this, h, c)), this.children.push(d), this;
            }
            attList(h, c, d, m, C) {
              var E;
              return (
                (E = new t(this, h, c, d, m, C)), this.children.push(E), this
              );
            }
            entity(h, c) {
              var d;
              return (d = new i(this, !1, h, c)), this.children.push(d), this;
            }
            pEntity(h, c) {
              var d;
              return (d = new i(this, !0, h, c)), this.children.push(d), this;
            }
            notation(h, c) {
              var d;
              return (d = new n(this, h, c)), this.children.push(d), this;
            }
            toString(h) {
              return this.options.writer.docType(
                this,
                this.options.writer.filterOptions(h),
              );
            }
            ele(h, c) {
              return this.element(h, c);
            }
            att(h, c, d, m, C) {
              return this.attList(h, c, d, m, C);
            }
            ent(h, c) {
              return this.entity(h, c);
            }
            pent(h, c) {
              return this.pEntity(h, c);
            }
            not(h, c) {
              return this.notation(h, c);
            }
            up() {
              return this.root() || this.documentObject;
            }
            isEqualNode(h) {
              return !(
                !super.isEqualNode(h) ||
                h.name !== this.name ||
                h.publicId !== this.publicId ||
                h.systemId !== this.systemId
              );
            }
          }
          return (
            Object.defineProperty(l.prototype, "entities", {
              get: function () {
                var f, h, c, d, m;
                for (d = {}, m = this.children, h = 0, c = m.length; h < c; h++)
                  (f = m[h]),
                    f.type === e.EntityDeclaration && !f.pe && (d[f.name] = f);
                return new a(d);
              },
            }),
            Object.defineProperty(l.prototype, "notations", {
              get: function () {
                var f, h, c, d, m;
                for (d = {}, m = this.children, h = 0, c = m.length; h < c; h++)
                  (f = m[h]),
                    f.type === e.NotationDeclaration && (d[f.name] = f);
                return new a(d);
              },
            }),
            Object.defineProperty(l.prototype, "publicId", {
              get: function () {
                return this.pubID;
              },
            }),
            Object.defineProperty(l.prototype, "systemId", {
              get: function () {
                return this.sysID;
              },
            }),
            Object.defineProperty(l.prototype, "internalSubset", {
              get: function () {
                throw new Error(
                  "This DOM method is not implemented." + this.debugInfo(),
                );
              },
            }),
            l
          );
        }.call(this));
  }.call(xI));
});
var Fc = y((OI, TI) => {
  (function () {
    var e, t, r;
    (e = Ae()),
      (t = Pt()),
      (TI.exports = r =
        class extends t {
          constructor(n, s) {
            if ((super(n), s == null))
              throw new Error("Missing raw text. " + this.debugInfo());
            (this.type = e.Raw), (this.value = this.stringify.raw(s));
          }
          clone() {
            return Object.create(this);
          }
          toString(n) {
            return this.options.writer.raw(
              this,
              this.options.writer.filterOptions(n),
            );
          }
        });
  }.call(OI));
});
var Rc = y((FI, RI) => {
  (function () {
    var e, t, r;
    (e = Ae()),
      (t = du()),
      (RI.exports = r =
        function () {
          class i extends t {
            constructor(s, a) {
              if ((super(s), a == null))
                throw new Error("Missing element text. " + this.debugInfo());
              (this.name = "#text"),
                (this.type = e.Text),
                (this.value = this.stringify.text(a));
            }
            clone() {
              return Object.create(this);
            }
            toString(s) {
              return this.options.writer.text(
                this,
                this.options.writer.filterOptions(s),
              );
            }
            splitText(s) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            replaceWholeText(s) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
          }
          return (
            Object.defineProperty(i.prototype, "isElementContentWhitespace", {
              get: function () {
                throw new Error(
                  "This DOM method is not implemented." + this.debugInfo(),
                );
              },
            }),
            Object.defineProperty(i.prototype, "wholeText", {
              get: function () {
                var n, s, a;
                for (a = "", s = this.previousSibling; s; )
                  (a = s.data + a), (s = s.previousSibling);
                for (a += this.data, n = this.nextSibling; n; )
                  (a = a + n.data), (n = n.nextSibling);
                return a;
              },
            }),
            i
          );
        }.call(this));
  }.call(FI));
});
var Ac = y((AI, NI) => {
  (function () {
    var e, t, r;
    (e = Ae()),
      (t = du()),
      (NI.exports = r =
        class extends t {
          constructor(n, s, a) {
            if ((super(n), s == null))
              throw new Error(
                "Missing instruction target. " + this.debugInfo(),
              );
            (this.type = e.ProcessingInstruction),
              (this.target = this.stringify.insTarget(s)),
              (this.name = this.target),
              a && (this.value = this.stringify.insValue(a));
          }
          clone() {
            return Object.create(this);
          }
          toString(n) {
            return this.options.writer.processingInstruction(
              this,
              this.options.writer.filterOptions(n),
            );
          }
          isEqualNode(n) {
            return !(!super.isEqualNode(n) || n.target !== this.target);
          }
        });
  }.call(AI));
});
var yv = y((II, MI) => {
  (function () {
    var e, t, r;
    (r = Pt()),
      (e = Ae()),
      (MI.exports = t =
        class extends r {
          constructor(n) {
            super(n), (this.type = e.Dummy);
          }
          clone() {
            return Object.create(this);
          }
          toString(n) {
            return "";
          }
        });
  }.call(II));
});
var PI = y((LI, qI) => {
  (function () {
    var e;
    qI.exports = e = function () {
      class t {
        constructor(i) {
          this.nodes = i;
        }
        clone() {
          return (this.nodes = null);
        }
        item(i) {
          return this.nodes[i] || null;
        }
      }
      return (
        Object.defineProperty(t.prototype, "length", {
          get: function () {
            return this.nodes.length || 0;
          },
        }),
        t
      );
    }.call(this);
  }.call(LI));
});
var jI = y((BI, kI) => {
  (function () {
    kI.exports = {
      Disconnected: 1,
      Preceding: 2,
      Following: 4,
      Contains: 8,
      ContainedBy: 16,
      ImplementationSpecific: 32,
    };
  }.call(BI));
});
var Pt = y((UI, zI) => {
  (function () {
    var e,
      t,
      r,
      i,
      n,
      s,
      a,
      o,
      u,
      l,
      f,
      h,
      c,
      d,
      m,
      C,
      E,
      O,
      L = {}.hasOwnProperty,
      D = [].splice;
    ({ isObject: O, isFunction: E, isEmpty: C, getValue: m } = Cr()),
      (o = null),
      (r = null),
      (i = null),
      (n = null),
      (s = null),
      (c = null),
      (d = null),
      (h = null),
      (a = null),
      (t = null),
      (f = null),
      (u = null),
      (e = null),
      (zI.exports = l =
        function () {
          class w {
            constructor(g) {
              (this.parent = g),
                this.parent &&
                  ((this.options = this.parent.options),
                  (this.stringify = this.parent.stringify)),
                (this.value = null),
                (this.children = []),
                (this.baseURI = null),
                o ||
                  ((o = Dc()),
                  (r = bc()),
                  (i = Ec()),
                  (n = _c()),
                  (s = Tc()),
                  (c = Fc()),
                  (d = Rc()),
                  (h = Ac()),
                  (a = yv()),
                  (t = Ae()),
                  (f = PI()),
                  (u = wc()),
                  (e = jI()));
            }
            setParent(g) {
              var x, A, p, T, R;
              for (
                this.parent = g,
                  g &&
                    ((this.options = g.options),
                    (this.stringify = g.stringify)),
                  T = this.children,
                  R = [],
                  A = 0,
                  p = T.length;
                A < p;
                A++
              )
                (x = T[A]), R.push(x.setParent(this));
              return R;
            }
            element(g, x, A) {
              var p, T, R, k, z, $, X, I, P;
              if (
                (($ = null),
                x === null && A == null && ([x, A] = [{}, null]),
                x == null && (x = {}),
                (x = m(x)),
                O(x) || ([A, x] = [x, A]),
                g != null && (g = m(g)),
                Array.isArray(g))
              )
                for (R = 0, X = g.length; R < X; R++)
                  (T = g[R]), ($ = this.element(T));
              else if (E(g)) $ = this.element(g.apply());
              else if (O(g)) {
                for (z in g)
                  if (!!L.call(g, z))
                    if (
                      ((P = g[z]),
                      E(P) && (P = P.apply()),
                      !this.options.ignoreDecorators &&
                        this.stringify.convertAttKey &&
                        z.indexOf(this.stringify.convertAttKey) === 0)
                    )
                      $ = this.attribute(
                        z.substr(this.stringify.convertAttKey.length),
                        P,
                      );
                    else if (
                      !this.options.separateArrayItems &&
                      Array.isArray(P) &&
                      C(P)
                    )
                      $ = this.dummy();
                    else if (O(P) && C(P)) $ = this.element(z);
                    else if (!this.options.keepNullNodes && P == null)
                      $ = this.dummy();
                    else if (
                      !this.options.separateArrayItems &&
                      Array.isArray(P)
                    )
                      for (k = 0, I = P.length; k < I; k++)
                        (T = P[k]), (p = {}), (p[z] = T), ($ = this.element(p));
                    else
                      O(P)
                        ? !this.options.ignoreDecorators &&
                          this.stringify.convertTextKey &&
                          z.indexOf(this.stringify.convertTextKey) === 0
                          ? ($ = this.element(P))
                          : (($ = this.element(z)), $.element(P))
                        : ($ = this.element(z, P));
              } else
                !this.options.keepNullNodes && A === null
                  ? ($ = this.dummy())
                  : !this.options.ignoreDecorators &&
                    this.stringify.convertTextKey &&
                    g.indexOf(this.stringify.convertTextKey) === 0
                  ? ($ = this.text(A))
                  : !this.options.ignoreDecorators &&
                    this.stringify.convertCDataKey &&
                    g.indexOf(this.stringify.convertCDataKey) === 0
                  ? ($ = this.cdata(A))
                  : !this.options.ignoreDecorators &&
                    this.stringify.convertCommentKey &&
                    g.indexOf(this.stringify.convertCommentKey) === 0
                  ? ($ = this.comment(A))
                  : !this.options.ignoreDecorators &&
                    this.stringify.convertRawKey &&
                    g.indexOf(this.stringify.convertRawKey) === 0
                  ? ($ = this.raw(A))
                  : !this.options.ignoreDecorators &&
                    this.stringify.convertPIKey &&
                    g.indexOf(this.stringify.convertPIKey) === 0
                  ? ($ = this.instruction(
                      g.substr(this.stringify.convertPIKey.length),
                      A,
                    ))
                  : ($ = this.node(g, x, A));
              if ($ == null)
                throw new Error(
                  "Could not create any elements with: " +
                    g +
                    ". " +
                    this.debugInfo(),
                );
              return $;
            }
            insertBefore(g, x, A) {
              var p, T, R, k, z;
              if (g?.type)
                return (
                  (R = g),
                  (k = x),
                  R.setParent(this),
                  k
                    ? ((T = children.indexOf(k)),
                      (z = children.splice(T)),
                      children.push(R),
                      Array.prototype.push.apply(children, z))
                    : children.push(R),
                  R
                );
              if (this.isRoot)
                throw new Error(
                  "Cannot insert elements at root level. " + this.debugInfo(g),
                );
              return (
                (T = this.parent.children.indexOf(this)),
                (z = this.parent.children.splice(T)),
                (p = this.parent.element(g, x, A)),
                Array.prototype.push.apply(this.parent.children, z),
                p
              );
            }
            insertAfter(g, x, A) {
              var p, T, R;
              if (this.isRoot)
                throw new Error(
                  "Cannot insert elements at root level. " + this.debugInfo(g),
                );
              return (
                (T = this.parent.children.indexOf(this)),
                (R = this.parent.children.splice(T + 1)),
                (p = this.parent.element(g, x, A)),
                Array.prototype.push.apply(this.parent.children, R),
                p
              );
            }
            remove() {
              var g, x;
              if (this.isRoot)
                throw new Error(
                  "Cannot remove the root element. " + this.debugInfo(),
                );
              return (
                (g = this.parent.children.indexOf(this)),
                D.apply(this.parent.children, [g, g - g + 1].concat((x = []))),
                this.parent
              );
            }
            node(g, x, A) {
              var p;
              return (
                g != null && (g = m(g)),
                x || (x = {}),
                (x = m(x)),
                O(x) || ([A, x] = [x, A]),
                (p = new o(this, g, x)),
                A != null && p.text(A),
                this.children.push(p),
                p
              );
            }
            text(g) {
              var x;
              return (
                O(g) && this.element(g),
                (x = new d(this, g)),
                this.children.push(x),
                this
              );
            }
            cdata(g) {
              var x;
              return (x = new r(this, g)), this.children.push(x), this;
            }
            comment(g) {
              var x;
              return (x = new i(this, g)), this.children.push(x), this;
            }
            commentBefore(g) {
              var x, A, p;
              return (
                (A = this.parent.children.indexOf(this)),
                (p = this.parent.children.splice(A)),
                (x = this.parent.comment(g)),
                Array.prototype.push.apply(this.parent.children, p),
                this
              );
            }
            commentAfter(g) {
              var x, A, p;
              return (
                (A = this.parent.children.indexOf(this)),
                (p = this.parent.children.splice(A + 1)),
                (x = this.parent.comment(g)),
                Array.prototype.push.apply(this.parent.children, p),
                this
              );
            }
            raw(g) {
              var x;
              return (x = new c(this, g)), this.children.push(x), this;
            }
            dummy() {
              var g;
              return (g = new a(this)), g;
            }
            instruction(g, x) {
              var A, p, T, R, k;
              if (
                (g != null && (g = m(g)),
                x != null && (x = m(x)),
                Array.isArray(g))
              )
                for (R = 0, k = g.length; R < k; R++)
                  (A = g[R]), this.instruction(A);
              else if (O(g))
                for (A in g)
                  !L.call(g, A) || ((p = g[A]), this.instruction(A, p));
              else
                E(x) && (x = x.apply()),
                  (T = new h(this, g, x)),
                  this.children.push(T);
              return this;
            }
            instructionBefore(g, x) {
              var A, p, T;
              return (
                (p = this.parent.children.indexOf(this)),
                (T = this.parent.children.splice(p)),
                (A = this.parent.instruction(g, x)),
                Array.prototype.push.apply(this.parent.children, T),
                this
              );
            }
            instructionAfter(g, x) {
              var A, p, T;
              return (
                (p = this.parent.children.indexOf(this)),
                (T = this.parent.children.splice(p + 1)),
                (A = this.parent.instruction(g, x)),
                Array.prototype.push.apply(this.parent.children, T),
                this
              );
            }
            declaration(g, x, A) {
              var p, T;
              return (
                (p = this.document()),
                (T = new n(p, g, x, A)),
                p.children.length === 0
                  ? p.children.unshift(T)
                  : p.children[0].type === t.Declaration
                  ? (p.children[0] = T)
                  : p.children.unshift(T),
                p.root() || p
              );
            }
            dtd(g, x) {
              var A, p, T, R, k, z, $, X, I, P;
              for (
                p = this.document(),
                  T = new s(p, g, x),
                  I = p.children,
                  R = k = 0,
                  $ = I.length;
                k < $;
                R = ++k
              )
                if (((A = I[R]), A.type === t.DocType))
                  return (p.children[R] = T), T;
              for (P = p.children, R = z = 0, X = P.length; z < X; R = ++z)
                if (((A = P[R]), A.isRoot))
                  return p.children.splice(R, 0, T), T;
              return p.children.push(T), T;
            }
            up() {
              if (this.isRoot)
                throw new Error(
                  "The root node has no parent. Use doc() if you need to get the document object.",
                );
              return this.parent;
            }
            root() {
              var g;
              for (g = this; g; ) {
                if (g.type === t.Document) return g.rootObject;
                if (g.isRoot) return g;
                g = g.parent;
              }
            }
            document() {
              var g;
              for (g = this; g; ) {
                if (g.type === t.Document) return g;
                g = g.parent;
              }
            }
            end(g) {
              return this.document().end(g);
            }
            prev() {
              var g;
              if (((g = this.parent.children.indexOf(this)), g < 1))
                throw new Error(
                  "Already at the first node. " + this.debugInfo(),
                );
              return this.parent.children[g - 1];
            }
            next() {
              var g;
              if (
                ((g = this.parent.children.indexOf(this)),
                g === -1 || g === this.parent.children.length - 1)
              )
                throw new Error(
                  "Already at the last node. " + this.debugInfo(),
                );
              return this.parent.children[g + 1];
            }
            importDocument(g) {
              var x, A, p, T, R;
              if (
                ((A = g.root().clone()),
                (A.parent = this),
                (A.isRoot = !1),
                this.children.push(A),
                this.type === t.Document &&
                  ((A.isRoot = !0),
                  (A.documentObject = this),
                  (this.rootObject = A),
                  this.children))
              ) {
                for (R = this.children, p = 0, T = R.length; p < T; p++)
                  if (((x = R[p]), x.type === t.DocType)) {
                    x.name = A.name;
                    break;
                  }
              }
              return this;
            }
            debugInfo(g) {
              var x, A;
              return (
                (g = g || this.name),
                g == null && !((x = this.parent) != null && x.name)
                  ? ""
                  : g == null
                  ? "parent: <" + this.parent.name + ">"
                  : (A = this.parent) != null && A.name
                  ? "node: <" + g + ">, parent: <" + this.parent.name + ">"
                  : "node: <" + g + ">"
              );
            }
            ele(g, x, A) {
              return this.element(g, x, A);
            }
            nod(g, x, A) {
              return this.node(g, x, A);
            }
            txt(g) {
              return this.text(g);
            }
            dat(g) {
              return this.cdata(g);
            }
            com(g) {
              return this.comment(g);
            }
            ins(g, x) {
              return this.instruction(g, x);
            }
            doc() {
              return this.document();
            }
            dec(g, x, A) {
              return this.declaration(g, x, A);
            }
            e(g, x, A) {
              return this.element(g, x, A);
            }
            n(g, x, A) {
              return this.node(g, x, A);
            }
            t(g) {
              return this.text(g);
            }
            d(g) {
              return this.cdata(g);
            }
            c(g) {
              return this.comment(g);
            }
            r(g) {
              return this.raw(g);
            }
            i(g, x) {
              return this.instruction(g, x);
            }
            u() {
              return this.up();
            }
            importXMLBuilder(g) {
              return this.importDocument(g);
            }
            attribute(g, x) {
              throw new Error("attribute() applies to element nodes only.");
            }
            att(g, x) {
              return this.attribute(g, x);
            }
            a(g, x) {
              return this.attribute(g, x);
            }
            removeAttribute(g) {
              throw new Error("attribute() applies to element nodes only.");
            }
            replaceChild(g, x) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            removeChild(g) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            appendChild(g) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            hasChildNodes() {
              return this.children.length !== 0;
            }
            cloneNode(g) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            normalize() {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            isSupported(g, x) {
              return !0;
            }
            hasAttributes() {
              return this.attribs.length !== 0;
            }
            compareDocumentPosition(g) {
              var x, A;
              return (
                (x = this),
                x === g
                  ? 0
                  : this.document() !== g.document()
                  ? ((A = e.Disconnected | e.ImplementationSpecific),
                    Math.random() < 0.5
                      ? (A |= e.Preceding)
                      : (A |= e.Following),
                    A)
                  : x.isAncestor(g)
                  ? e.Contains | e.Preceding
                  : x.isDescendant(g)
                  ? e.Contains | e.Following
                  : x.isPreceding(g)
                  ? e.Preceding
                  : e.Following
              );
            }
            isSameNode(g) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            lookupPrefix(g) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            isDefaultNamespace(g) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            lookupNamespaceURI(g) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            isEqualNode(g) {
              var x, A, p;
              if (
                g.nodeType !== this.nodeType ||
                g.children.length !== this.children.length
              )
                return !1;
              for (
                x = A = 0, p = this.children.length - 1;
                0 <= p ? A <= p : A >= p;
                x = 0 <= p ? ++A : --A
              )
                if (!this.children[x].isEqualNode(g.children[x])) return !1;
              return !0;
            }
            getFeature(g, x) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            setUserData(g, x, A) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            getUserData(g) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            contains(g) {
              return g ? g === this || this.isDescendant(g) : !1;
            }
            isDescendant(g) {
              var x, A, p, T, R;
              for (R = this.children, p = 0, T = R.length; p < T; p++)
                if (((x = R[p]), g === x || ((A = x.isDescendant(g)), A)))
                  return !0;
              return !1;
            }
            isAncestor(g) {
              return g.isDescendant(this);
            }
            isPreceding(g) {
              var x, A;
              return (
                (x = this.treePosition(g)),
                (A = this.treePosition(this)),
                x === -1 || A === -1 ? !1 : x < A
              );
            }
            isFollowing(g) {
              var x, A;
              return (
                (x = this.treePosition(g)),
                (A = this.treePosition(this)),
                x === -1 || A === -1 ? !1 : x > A
              );
            }
            treePosition(g) {
              var x, A;
              return (
                (A = 0),
                (x = !1),
                this.foreachTreeNode(this.document(), function (p) {
                  if ((A++, !x && p === g)) return (x = !0);
                }),
                x ? A : -1
              );
            }
            foreachTreeNode(g, x) {
              var A, p, T, R, k;
              for (
                g || (g = this.document()), R = g.children, p = 0, T = R.length;
                p < T;
                p++
              ) {
                if (((A = R[p]), (k = x(A)))) return k;
                if (((k = this.foreachTreeNode(A, x)), k)) return k;
              }
            }
          }
          return (
            Object.defineProperty(w.prototype, "nodeName", {
              get: function () {
                return this.name;
              },
            }),
            Object.defineProperty(w.prototype, "nodeType", {
              get: function () {
                return this.type;
              },
            }),
            Object.defineProperty(w.prototype, "nodeValue", {
              get: function () {
                return this.value;
              },
            }),
            Object.defineProperty(w.prototype, "parentNode", {
              get: function () {
                return this.parent;
              },
            }),
            Object.defineProperty(w.prototype, "childNodes", {
              get: function () {
                return (
                  (!this.childNodeList || !this.childNodeList.nodes) &&
                    (this.childNodeList = new f(this.children)),
                  this.childNodeList
                );
              },
            }),
            Object.defineProperty(w.prototype, "firstChild", {
              get: function () {
                return this.children[0] || null;
              },
            }),
            Object.defineProperty(w.prototype, "lastChild", {
              get: function () {
                return this.children[this.children.length - 1] || null;
              },
            }),
            Object.defineProperty(w.prototype, "previousSibling", {
              get: function () {
                var F;
                return (
                  (F = this.parent.children.indexOf(this)),
                  this.parent.children[F - 1] || null
                );
              },
            }),
            Object.defineProperty(w.prototype, "nextSibling", {
              get: function () {
                var F;
                return (
                  (F = this.parent.children.indexOf(this)),
                  this.parent.children[F + 1] || null
                );
              },
            }),
            Object.defineProperty(w.prototype, "ownerDocument", {
              get: function () {
                return this.document() || null;
              },
            }),
            Object.defineProperty(w.prototype, "textContent", {
              get: function () {
                var F, g, x, A, p;
                if (
                  this.nodeType === t.Element ||
                  this.nodeType === t.DocumentFragment
                ) {
                  for (
                    p = "", A = this.children, g = 0, x = A.length;
                    g < x;
                    g++
                  )
                    (F = A[g]), F.textContent && (p += F.textContent);
                  return p;
                } else return null;
              },
              set: function (F) {
                throw new Error(
                  "This DOM method is not implemented." + this.debugInfo(),
                );
              },
            }),
            w
          );
        }.call(this));
  }.call(UI));
});
var vv = y(($I, WI) => {
  (function () {
    var e,
      t = {}.hasOwnProperty;
    WI.exports = e = function () {
      class r {
        constructor(n) {
          var s, a, o;
          (this.assertLegalChar = this.assertLegalChar.bind(this)),
            (this.assertLegalName = this.assertLegalName.bind(this)),
            n || (n = {}),
            (this.options = n),
            this.options.version || (this.options.version = "1.0"),
            (a = n.stringify || {});
          for (s in a) !t.call(a, s) || ((o = a[s]), (this[s] = o));
        }
        name(n) {
          return this.options.noValidation
            ? n
            : this.assertLegalName("" + n || "");
        }
        text(n) {
          return this.options.noValidation
            ? n
            : this.assertLegalChar(this.textEscape("" + n || ""));
        }
        cdata(n) {
          return this.options.noValidation
            ? n
            : ((n = "" + n || ""),
              (n = n.replace("]]>", "]]]]><![CDATA[>")),
              this.assertLegalChar(n));
        }
        comment(n) {
          if (this.options.noValidation) return n;
          if (((n = "" + n || ""), n.match(/--/)))
            throw new Error("Comment text cannot contain double-hypen: " + n);
          return this.assertLegalChar(n);
        }
        raw(n) {
          return this.options.noValidation ? n : "" + n || "";
        }
        attValue(n) {
          return this.options.noValidation
            ? n
            : this.assertLegalChar(this.attEscape((n = "" + n || "")));
        }
        insTarget(n) {
          return this.options.noValidation
            ? n
            : this.assertLegalChar("" + n || "");
        }
        insValue(n) {
          if (this.options.noValidation) return n;
          if (((n = "" + n || ""), n.match(/\?>/)))
            throw new Error("Invalid processing instruction value: " + n);
          return this.assertLegalChar(n);
        }
        xmlVersion(n) {
          if (this.options.noValidation) return n;
          if (((n = "" + n || ""), !n.match(/1\.[0-9]+/)))
            throw new Error("Invalid version number: " + n);
          return n;
        }
        xmlEncoding(n) {
          if (this.options.noValidation) return n;
          if (((n = "" + n || ""), !n.match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/)))
            throw new Error("Invalid encoding: " + n);
          return this.assertLegalChar(n);
        }
        xmlStandalone(n) {
          return this.options.noValidation ? n : n ? "yes" : "no";
        }
        dtdPubID(n) {
          return this.options.noValidation
            ? n
            : this.assertLegalChar("" + n || "");
        }
        dtdSysID(n) {
          return this.options.noValidation
            ? n
            : this.assertLegalChar("" + n || "");
        }
        dtdElementValue(n) {
          return this.options.noValidation
            ? n
            : this.assertLegalChar("" + n || "");
        }
        dtdAttType(n) {
          return this.options.noValidation
            ? n
            : this.assertLegalChar("" + n || "");
        }
        dtdAttDefault(n) {
          return this.options.noValidation
            ? n
            : this.assertLegalChar("" + n || "");
        }
        dtdEntityValue(n) {
          return this.options.noValidation
            ? n
            : this.assertLegalChar("" + n || "");
        }
        dtdNData(n) {
          return this.options.noValidation
            ? n
            : this.assertLegalChar("" + n || "");
        }
        assertLegalChar(n) {
          var s, a;
          if (this.options.noValidation) return n;
          if (this.options.version === "1.0") {
            if (
              ((s =
                /[\0-\x08\x0B\f\x0E-\x1F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g),
              this.options.invalidCharReplacement !== void 0)
            )
              n = n.replace(s, this.options.invalidCharReplacement);
            else if ((a = n.match(s)))
              throw new Error(
                `Invalid character in string: ${n} at index ${a.index}`,
              );
          } else if (this.options.version === "1.1") {
            if (
              ((s =
                /[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g),
              this.options.invalidCharReplacement !== void 0)
            )
              n = n.replace(s, this.options.invalidCharReplacement);
            else if ((a = n.match(s)))
              throw new Error(
                `Invalid character in string: ${n} at index ${a.index}`,
              );
          }
          return n;
        }
        assertLegalName(n) {
          var s;
          if (this.options.noValidation) return n;
          if (
            ((n = this.assertLegalChar(n)),
            (s =
              /^([:A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])([\x2D\.0-:A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/),
            !n.match(s))
          )
            throw new Error(`Invalid character in name: ${n}`);
          return n;
        }
        textEscape(n) {
          var s;
          return this.options.noValidation
            ? n
            : ((s = this.options.noDoubleEncoding
                ? /(?!&(lt|gt|amp|apos|quot);)&/g
                : /&/g),
              n
                .replace(s, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/\r/g, "&#xD;"));
        }
        attEscape(n) {
          var s;
          return this.options.noValidation
            ? n
            : ((s = this.options.noDoubleEncoding
                ? /(?!&(lt|gt|amp|apos|quot);)&/g
                : /&/g),
              n
                .replace(s, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/"/g, "&quot;")
                .replace(/\t/g, "&#x9;")
                .replace(/\n/g, "&#xA;")
                .replace(/\r/g, "&#xD;"));
        }
      }
      return (
        (r.prototype.convertAttKey = "@"),
        (r.prototype.convertPIKey = "?"),
        (r.prototype.convertTextKey = "#text"),
        (r.prototype.convertCDataKey = "#cdata"),
        (r.prototype.convertCommentKey = "#comment"),
        (r.prototype.convertRawKey = "#raw"),
        r
      );
    }.call(this);
  }.call($I));
});
var pu = y((GI, HI) => {
  (function () {
    HI.exports = { None: 0, OpenTag: 1, InsideTag: 2, CloseTag: 3 };
  }.call(GI));
});
var wv = y((VI, YI) => {
  (function () {
    var e,
      t,
      r,
      i,
      n,
      s,
      a,
      o,
      u,
      l,
      f,
      h,
      c,
      d,
      m,
      C,
      E,
      O = {}.hasOwnProperty;
    ({ assign: E } = Cr()),
      (e = Ae()),
      (u = _c()),
      (l = Tc()),
      (r = bc()),
      (i = Ec()),
      (h = Dc()),
      (d = Fc()),
      (m = Rc()),
      (c = Ac()),
      (f = yv()),
      (n = Sc()),
      (s = Cc()),
      (a = xc()),
      (o = Oc()),
      (t = pu()),
      (YI.exports = C =
        class {
          constructor(D) {
            var w, F, g;
            D || (D = {}), (this.options = D), (F = D.writer || {});
            for (w in F)
              !O.call(F, w) ||
                ((g = F[w]), (this["_" + w] = this[w]), (this[w] = g));
          }
          filterOptions(D) {
            var w, F, g, x, A, p, T, R, k;
            return (
              D || (D = {}),
              (D = E({}, this.options, D)),
              (w = { writer: this }),
              (w.pretty = D.pretty || !1),
              (w.allowEmpty = D.allowEmpty || !1),
              (w.indent = (F = D.indent) != null ? F : "  "),
              (w.newline =
                (g = D.newline) != null
                  ? g
                  : `
`),
              (w.offset = (x = D.offset) != null ? x : 0),
              (w.width = (A = D.width) != null ? A : 0),
              (w.dontPrettyTextNodes =
                (p =
                  (T = D.dontPrettyTextNodes) != null
                    ? T
                    : D.dontprettytextnodes) != null
                  ? p
                  : 0),
              (w.spaceBeforeSlash =
                (R =
                  (k = D.spaceBeforeSlash) != null ? k : D.spacebeforeslash) !=
                null
                  ? R
                  : ""),
              w.spaceBeforeSlash === !0 && (w.spaceBeforeSlash = " "),
              (w.suppressPrettyCount = 0),
              (w.user = {}),
              (w.state = t.None),
              w
            );
          }
          indent(D, w, F) {
            var g;
            return !w.pretty || w.suppressPrettyCount
              ? ""
              : w.pretty && ((g = (F || 0) + w.offset + 1), g > 0)
              ? new Array(g).join(w.indent)
              : "";
          }
          endline(D, w, F) {
            return !w.pretty || w.suppressPrettyCount ? "" : w.newline;
          }
          attribute(D, w, F) {
            var g;
            return (
              this.openAttribute(D, w, F),
              w.pretty && w.width > 0
                ? (g = D.name + '="' + D.value + '"')
                : (g = " " + D.name + '="' + D.value + '"'),
              this.closeAttribute(D, w, F),
              g
            );
          }
          cdata(D, w, F) {
            var g;
            return (
              this.openNode(D, w, F),
              (w.state = t.OpenTag),
              (g = this.indent(D, w, F) + "<![CDATA["),
              (w.state = t.InsideTag),
              (g += D.value),
              (w.state = t.CloseTag),
              (g += "]]>" + this.endline(D, w, F)),
              (w.state = t.None),
              this.closeNode(D, w, F),
              g
            );
          }
          comment(D, w, F) {
            var g;
            return (
              this.openNode(D, w, F),
              (w.state = t.OpenTag),
              (g = this.indent(D, w, F) + "<!-- "),
              (w.state = t.InsideTag),
              (g += D.value),
              (w.state = t.CloseTag),
              (g += " -->" + this.endline(D, w, F)),
              (w.state = t.None),
              this.closeNode(D, w, F),
              g
            );
          }
          declaration(D, w, F) {
            var g;
            return (
              this.openNode(D, w, F),
              (w.state = t.OpenTag),
              (g = this.indent(D, w, F) + "<?xml"),
              (w.state = t.InsideTag),
              (g += ' version="' + D.version + '"'),
              D.encoding != null && (g += ' encoding="' + D.encoding + '"'),
              D.standalone != null &&
                (g += ' standalone="' + D.standalone + '"'),
              (w.state = t.CloseTag),
              (g += w.spaceBeforeSlash + "?>"),
              (g += this.endline(D, w, F)),
              (w.state = t.None),
              this.closeNode(D, w, F),
              g
            );
          }
          docType(D, w, F) {
            var g, x, A, p, T;
            if (
              (F || (F = 0),
              this.openNode(D, w, F),
              (w.state = t.OpenTag),
              (p = this.indent(D, w, F)),
              (p += "<!DOCTYPE " + D.root().name),
              D.pubID && D.sysID
                ? (p += ' PUBLIC "' + D.pubID + '" "' + D.sysID + '"')
                : D.sysID && (p += ' SYSTEM "' + D.sysID + '"'),
              D.children.length > 0)
            ) {
              for (
                p += " [",
                  p += this.endline(D, w, F),
                  w.state = t.InsideTag,
                  T = D.children,
                  x = 0,
                  A = T.length;
                x < A;
                x++
              )
                (g = T[x]), (p += this.writeChildNode(g, w, F + 1));
              (w.state = t.CloseTag), (p += "]");
            }
            return (
              (w.state = t.CloseTag),
              (p += w.spaceBeforeSlash + ">"),
              (p += this.endline(D, w, F)),
              (w.state = t.None),
              this.closeNode(D, w, F),
              p
            );
          }
          element(D, w, F) {
            var g, x, A, p, T, R, k, z, $, X, I, P, G, J, W, Ne, Ie, kt, St;
            if (
              (F || (F = 0),
              (P = !1),
              this.openNode(D, w, F),
              (w.state = t.OpenTag),
              (G = this.indent(D, w, F) + "<" + D.name),
              w.pretty && w.width > 0)
            ) {
              (z = G.length), (W = D.attribs);
              for (I in W)
                !O.call(W, I) ||
                  ((g = W[I]),
                  (J = this.attribute(g, w, F)),
                  (x = J.length),
                  z + x > w.width
                    ? ((St = this.indent(D, w, F + 1) + J),
                      (G += this.endline(D, w, F) + St),
                      (z = St.length))
                    : ((St = " " + J), (G += St), (z += St.length)));
            } else {
              Ne = D.attribs;
              for (I in Ne)
                !O.call(Ne, I) || ((g = Ne[I]), (G += this.attribute(g, w, F)));
            }
            if (
              ((p = D.children.length),
              (T = p === 0 ? null : D.children[0]),
              p === 0 ||
                D.children.every(function (Be) {
                  return (
                    (Be.type === e.Text ||
                      Be.type === e.Raw ||
                      Be.type === e.CData) &&
                    Be.value === ""
                  );
                }))
            )
              w.allowEmpty
                ? ((G += ">"),
                  (w.state = t.CloseTag),
                  (G += "</" + D.name + ">" + this.endline(D, w, F)))
                : ((w.state = t.CloseTag),
                  (G += w.spaceBeforeSlash + "/>" + this.endline(D, w, F)));
            else if (
              w.pretty &&
              p === 1 &&
              (T.type === e.Text || T.type === e.Raw || T.type === e.CData) &&
              T.value != null
            )
              (G += ">"),
                (w.state = t.InsideTag),
                w.suppressPrettyCount++,
                (P = !0),
                (G += this.writeChildNode(T, w, F + 1)),
                w.suppressPrettyCount--,
                (P = !1),
                (w.state = t.CloseTag),
                (G += "</" + D.name + ">" + this.endline(D, w, F));
            else {
              if (w.dontPrettyTextNodes) {
                for (Ie = D.children, R = 0, $ = Ie.length; R < $; R++)
                  if (
                    ((A = Ie[R]),
                    (A.type === e.Text ||
                      A.type === e.Raw ||
                      A.type === e.CData) &&
                      A.value != null)
                  ) {
                    w.suppressPrettyCount++, (P = !0);
                    break;
                  }
              }
              for (
                G += ">" + this.endline(D, w, F),
                  w.state = t.InsideTag,
                  kt = D.children,
                  k = 0,
                  X = kt.length;
                k < X;
                k++
              )
                (A = kt[k]), (G += this.writeChildNode(A, w, F + 1));
              (w.state = t.CloseTag),
                (G += this.indent(D, w, F) + "</" + D.name + ">"),
                P && w.suppressPrettyCount--,
                (G += this.endline(D, w, F)),
                (w.state = t.None);
            }
            return this.closeNode(D, w, F), G;
          }
          writeChildNode(D, w, F) {
            switch (D.type) {
              case e.CData:
                return this.cdata(D, w, F);
              case e.Comment:
                return this.comment(D, w, F);
              case e.Element:
                return this.element(D, w, F);
              case e.Raw:
                return this.raw(D, w, F);
              case e.Text:
                return this.text(D, w, F);
              case e.ProcessingInstruction:
                return this.processingInstruction(D, w, F);
              case e.Dummy:
                return "";
              case e.Declaration:
                return this.declaration(D, w, F);
              case e.DocType:
                return this.docType(D, w, F);
              case e.AttributeDeclaration:
                return this.dtdAttList(D, w, F);
              case e.ElementDeclaration:
                return this.dtdElement(D, w, F);
              case e.EntityDeclaration:
                return this.dtdEntity(D, w, F);
              case e.NotationDeclaration:
                return this.dtdNotation(D, w, F);
              default:
                throw new Error("Unknown XML node type: " + D.constructor.name);
            }
          }
          processingInstruction(D, w, F) {
            var g;
            return (
              this.openNode(D, w, F),
              (w.state = t.OpenTag),
              (g = this.indent(D, w, F) + "<?"),
              (w.state = t.InsideTag),
              (g += D.target),
              D.value && (g += " " + D.value),
              (w.state = t.CloseTag),
              (g += w.spaceBeforeSlash + "?>"),
              (g += this.endline(D, w, F)),
              (w.state = t.None),
              this.closeNode(D, w, F),
              g
            );
          }
          raw(D, w, F) {
            var g;
            return (
              this.openNode(D, w, F),
              (w.state = t.OpenTag),
              (g = this.indent(D, w, F)),
              (w.state = t.InsideTag),
              (g += D.value),
              (w.state = t.CloseTag),
              (g += this.endline(D, w, F)),
              (w.state = t.None),
              this.closeNode(D, w, F),
              g
            );
          }
          text(D, w, F) {
            var g;
            return (
              this.openNode(D, w, F),
              (w.state = t.OpenTag),
              (g = this.indent(D, w, F)),
              (w.state = t.InsideTag),
              (g += D.value),
              (w.state = t.CloseTag),
              (g += this.endline(D, w, F)),
              (w.state = t.None),
              this.closeNode(D, w, F),
              g
            );
          }
          dtdAttList(D, w, F) {
            var g;
            return (
              this.openNode(D, w, F),
              (w.state = t.OpenTag),
              (g = this.indent(D, w, F) + "<!ATTLIST"),
              (w.state = t.InsideTag),
              (g +=
                " " +
                D.elementName +
                " " +
                D.attributeName +
                " " +
                D.attributeType),
              D.defaultValueType !== "#DEFAULT" &&
                (g += " " + D.defaultValueType),
              D.defaultValue && (g += ' "' + D.defaultValue + '"'),
              (w.state = t.CloseTag),
              (g += w.spaceBeforeSlash + ">" + this.endline(D, w, F)),
              (w.state = t.None),
              this.closeNode(D, w, F),
              g
            );
          }
          dtdElement(D, w, F) {
            var g;
            return (
              this.openNode(D, w, F),
              (w.state = t.OpenTag),
              (g = this.indent(D, w, F) + "<!ELEMENT"),
              (w.state = t.InsideTag),
              (g += " " + D.name + " " + D.value),
              (w.state = t.CloseTag),
              (g += w.spaceBeforeSlash + ">" + this.endline(D, w, F)),
              (w.state = t.None),
              this.closeNode(D, w, F),
              g
            );
          }
          dtdEntity(D, w, F) {
            var g;
            return (
              this.openNode(D, w, F),
              (w.state = t.OpenTag),
              (g = this.indent(D, w, F) + "<!ENTITY"),
              (w.state = t.InsideTag),
              D.pe && (g += " %"),
              (g += " " + D.name),
              D.value
                ? (g += ' "' + D.value + '"')
                : (D.pubID && D.sysID
                    ? (g += ' PUBLIC "' + D.pubID + '" "' + D.sysID + '"')
                    : D.sysID && (g += ' SYSTEM "' + D.sysID + '"'),
                  D.nData && (g += " NDATA " + D.nData)),
              (w.state = t.CloseTag),
              (g += w.spaceBeforeSlash + ">" + this.endline(D, w, F)),
              (w.state = t.None),
              this.closeNode(D, w, F),
              g
            );
          }
          dtdNotation(D, w, F) {
            var g;
            return (
              this.openNode(D, w, F),
              (w.state = t.OpenTag),
              (g = this.indent(D, w, F) + "<!NOTATION"),
              (w.state = t.InsideTag),
              (g += " " + D.name),
              D.pubID && D.sysID
                ? (g += ' PUBLIC "' + D.pubID + '" "' + D.sysID + '"')
                : D.pubID
                ? (g += ' PUBLIC "' + D.pubID + '"')
                : D.sysID && (g += ' SYSTEM "' + D.sysID + '"'),
              (w.state = t.CloseTag),
              (g += w.spaceBeforeSlash + ">" + this.endline(D, w, F)),
              (w.state = t.None),
              this.closeNode(D, w, F),
              g
            );
          }
          openNode(D, w, F) {}
          closeNode(D, w, F) {}
          openAttribute(D, w, F) {}
          closeAttribute(D, w, F) {}
        });
  }.call(VI));
});
var Nc = y((XI, ZI) => {
  (function () {
    var e, t;
    (t = wv()),
      (ZI.exports = e =
        class extends t {
          constructor(i) {
            super(i);
          }
          document(i, n) {
            var s, a, o, u, l;
            for (
              n = this.filterOptions(n),
                u = "",
                l = i.children,
                a = 0,
                o = l.length;
              a < o;
              a++
            )
              (s = l[a]), (u += this.writeChildNode(s, n, 0));
            return (
              n.pretty &&
                u.slice(-n.newline.length) === n.newline &&
                (u = u.slice(0, -n.newline.length)),
              u
            );
          }
        });
  }.call(XI));
});
var Dv = y((KI, QI) => {
  (function () {
    var e, t, r, i, n, s, a, o;
    ({ isPlainObject: o } = Cr()),
      (r = mv()),
      (t = eI()),
      (n = Pt()),
      (e = Ae()),
      (a = vv()),
      (s = Nc()),
      (QI.exports = i =
        function () {
          class u extends n {
            constructor(f) {
              super(null),
                (this.name = "#document"),
                (this.type = e.Document),
                (this.documentURI = null),
                (this.domConfig = new t()),
                f || (f = {}),
                f.writer || (f.writer = new s()),
                (this.options = f),
                (this.stringify = new a(f));
            }
            end(f) {
              var h;
              return (
                (h = {}),
                f
                  ? o(f) && ((h = f), (f = this.options.writer))
                  : (f = this.options.writer),
                f.document(this, f.filterOptions(h))
              );
            }
            toString(f) {
              return this.options.writer.document(
                this,
                this.options.writer.filterOptions(f),
              );
            }
            createElement(f) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            createDocumentFragment() {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            createTextNode(f) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            createComment(f) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            createCDATASection(f) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            createProcessingInstruction(f, h) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            createAttribute(f) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            createEntityReference(f) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            getElementsByTagName(f) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            importNode(f, h) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            createElementNS(f, h) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            createAttributeNS(f, h) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            getElementsByTagNameNS(f, h) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            getElementById(f) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            adoptNode(f) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            normalizeDocument() {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            renameNode(f, h, c) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            getElementsByClassName(f) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            createEvent(f) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            createRange() {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            createNodeIterator(f, h, c) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
            createTreeWalker(f, h, c) {
              throw new Error(
                "This DOM method is not implemented." + this.debugInfo(),
              );
            }
          }
          return (
            Object.defineProperty(u.prototype, "implementation", {
              value: new r(),
            }),
            Object.defineProperty(u.prototype, "doctype", {
              get: function () {
                var l, f, h, c;
                for (c = this.children, f = 0, h = c.length; f < h; f++)
                  if (((l = c[f]), l.type === e.DocType)) return l;
                return null;
              },
            }),
            Object.defineProperty(u.prototype, "documentElement", {
              get: function () {
                return this.rootObject || null;
              },
            }),
            Object.defineProperty(u.prototype, "inputEncoding", {
              get: function () {
                return null;
              },
            }),
            Object.defineProperty(u.prototype, "strictErrorChecking", {
              get: function () {
                return !1;
              },
            }),
            Object.defineProperty(u.prototype, "xmlEncoding", {
              get: function () {
                return this.children.length !== 0 &&
                  this.children[0].type === e.Declaration
                  ? this.children[0].encoding
                  : null;
              },
            }),
            Object.defineProperty(u.prototype, "xmlStandalone", {
              get: function () {
                return this.children.length !== 0 &&
                  this.children[0].type === e.Declaration
                  ? this.children[0].standalone === "yes"
                  : !1;
              },
            }),
            Object.defineProperty(u.prototype, "xmlVersion", {
              get: function () {
                return this.children.length !== 0 &&
                  this.children[0].type === e.Declaration
                  ? this.children[0].version
                  : "1.0";
              },
            }),
            Object.defineProperty(u.prototype, "URL", {
              get: function () {
                return this.documentURI;
              },
            }),
            Object.defineProperty(u.prototype, "origin", {
              get: function () {
                return null;
              },
            }),
            Object.defineProperty(u.prototype, "compatMode", {
              get: function () {
                return null;
              },
            }),
            Object.defineProperty(u.prototype, "characterSet", {
              get: function () {
                return null;
              },
            }),
            Object.defineProperty(u.prototype, "contentType", {
              get: function () {
                return null;
              },
            }),
            u
          );
        }.call(this));
  }.call(KI));
});
var tM = y((JI, eM) => {
  (function () {
    var e,
      t,
      r,
      i,
      n,
      s,
      a,
      o,
      u,
      l,
      f,
      h,
      c,
      d,
      m,
      C,
      E,
      O,
      L,
      D,
      w,
      F,
      g,
      x = {}.hasOwnProperty;
    ({ isObject: F, isFunction: w, isPlainObject: g, getValue: D } = Cr()),
      (e = Ae()),
      (h = Dv()),
      (d = Dc()),
      (i = bc()),
      (n = Ec()),
      (C = Fc()),
      (L = Rc()),
      (m = Ac()),
      (l = _c()),
      (f = Tc()),
      (s = Sc()),
      (o = xc()),
      (a = Cc()),
      (u = Oc()),
      (r = gv()),
      (O = vv()),
      (E = Nc()),
      (t = pu()),
      (eM.exports = c =
        class {
          constructor(p, T, R) {
            var k;
            (this.name = "?xml"),
              (this.type = e.Document),
              p || (p = {}),
              (k = {}),
              p.writer
                ? g(p.writer) && ((k = p.writer), (p.writer = new E()))
                : (p.writer = new E()),
              (this.options = p),
              (this.writer = p.writer),
              (this.writerOptions = this.writer.filterOptions(k)),
              (this.stringify = new O(p)),
              (this.onDataCallback = T || function () {}),
              (this.onEndCallback = R || function () {}),
              (this.currentNode = null),
              (this.currentLevel = -1),
              (this.openTags = {}),
              (this.documentStarted = !1),
              (this.documentCompleted = !1),
              (this.root = null);
          }
          createChildNode(p) {
            var T, R, k, z, $, X, I, P;
            switch (p.type) {
              case e.CData:
                this.cdata(p.value);
                break;
              case e.Comment:
                this.comment(p.value);
                break;
              case e.Element:
                (k = {}), (I = p.attribs);
                for (R in I) !x.call(I, R) || ((T = I[R]), (k[R] = T.value));
                this.node(p.name, k);
                break;
              case e.Dummy:
                this.dummy();
                break;
              case e.Raw:
                this.raw(p.value);
                break;
              case e.Text:
                this.text(p.value);
                break;
              case e.ProcessingInstruction:
                this.instruction(p.target, p.value);
                break;
              default:
                throw new Error(
                  "This XML node type is not supported in a JS object: " +
                    p.constructor.name,
                );
            }
            for (P = p.children, $ = 0, X = P.length; $ < X; $++)
              (z = P[$]),
                this.createChildNode(z),
                z.type === e.Element && this.up();
            return this;
          }
          dummy() {
            return this;
          }
          node(p, T, R) {
            if (p == null) throw new Error("Missing node name.");
            if (this.root && this.currentLevel === -1)
              throw new Error(
                "Document can only have one root node. " + this.debugInfo(p),
              );
            return (
              this.openCurrent(),
              (p = D(p)),
              T == null && (T = {}),
              (T = D(T)),
              F(T) || ([R, T] = [T, R]),
              (this.currentNode = new d(this, p, T)),
              (this.currentNode.children = !1),
              this.currentLevel++,
              (this.openTags[this.currentLevel] = this.currentNode),
              R != null && this.text(R),
              this
            );
          }
          element(p, T, R) {
            var k, z, $, X, I, P;
            if (this.currentNode && this.currentNode.type === e.DocType)
              this.dtdElement(...arguments);
            else if (Array.isArray(p) || F(p) || w(p))
              for (
                X = this.options.noValidation,
                  this.options.noValidation = !0,
                  P = new h(this.options).element("TEMP_ROOT"),
                  P.element(p),
                  this.options.noValidation = X,
                  I = P.children,
                  z = 0,
                  $ = I.length;
                z < $;
                z++
              )
                (k = I[z]),
                  this.createChildNode(k),
                  k.type === e.Element && this.up();
            else this.node(p, T, R);
            return this;
          }
          attribute(p, T) {
            var R, k;
            if (!this.currentNode || this.currentNode.children)
              throw new Error(
                "att() can only be used immediately after an ele() call in callback mode. " +
                  this.debugInfo(p),
              );
            if ((p != null && (p = D(p)), F(p)))
              for (R in p) !x.call(p, R) || ((k = p[R]), this.attribute(R, k));
            else
              w(T) && (T = T.apply()),
                this.options.keepNullAttributes && T == null
                  ? (this.currentNode.attribs[p] = new r(this, p, ""))
                  : T != null &&
                    (this.currentNode.attribs[p] = new r(this, p, T));
            return this;
          }
          text(p) {
            var T;
            return (
              this.openCurrent(),
              (T = new L(this, p)),
              this.onData(
                this.writer.text(T, this.writerOptions, this.currentLevel + 1),
                this.currentLevel + 1,
              ),
              this
            );
          }
          cdata(p) {
            var T;
            return (
              this.openCurrent(),
              (T = new i(this, p)),
              this.onData(
                this.writer.cdata(T, this.writerOptions, this.currentLevel + 1),
                this.currentLevel + 1,
              ),
              this
            );
          }
          comment(p) {
            var T;
            return (
              this.openCurrent(),
              (T = new n(this, p)),
              this.onData(
                this.writer.comment(
                  T,
                  this.writerOptions,
                  this.currentLevel + 1,
                ),
                this.currentLevel + 1,
              ),
              this
            );
          }
          raw(p) {
            var T;
            return (
              this.openCurrent(),
              (T = new C(this, p)),
              this.onData(
                this.writer.raw(T, this.writerOptions, this.currentLevel + 1),
                this.currentLevel + 1,
              ),
              this
            );
          }
          instruction(p, T) {
            var R, k, z, $, X;
            if (
              (this.openCurrent(),
              p != null && (p = D(p)),
              T != null && (T = D(T)),
              Array.isArray(p))
            )
              for (R = 0, $ = p.length; R < $; R++)
                (k = p[R]), this.instruction(k);
            else if (F(p))
              for (k in p)
                !x.call(p, k) || ((z = p[k]), this.instruction(k, z));
            else
              w(T) && (T = T.apply()),
                (X = new m(this, p, T)),
                this.onData(
                  this.writer.processingInstruction(
                    X,
                    this.writerOptions,
                    this.currentLevel + 1,
                  ),
                  this.currentLevel + 1,
                );
            return this;
          }
          declaration(p, T, R) {
            var k;
            if ((this.openCurrent(), this.documentStarted))
              throw new Error("declaration() must be the first node.");
            return (
              (k = new l(this, p, T, R)),
              this.onData(
                this.writer.declaration(
                  k,
                  this.writerOptions,
                  this.currentLevel + 1,
                ),
                this.currentLevel + 1,
              ),
              this
            );
          }
          doctype(p, T, R) {
            if ((this.openCurrent(), p == null))
              throw new Error("Missing root node name.");
            if (this.root)
              throw new Error("dtd() must come before the root node.");
            return (
              (this.currentNode = new f(this, T, R)),
              (this.currentNode.rootNodeName = p),
              (this.currentNode.children = !1),
              this.currentLevel++,
              (this.openTags[this.currentLevel] = this.currentNode),
              this
            );
          }
          dtdElement(p, T) {
            var R;
            return (
              this.openCurrent(),
              (R = new a(this, p, T)),
              this.onData(
                this.writer.dtdElement(
                  R,
                  this.writerOptions,
                  this.currentLevel + 1,
                ),
                this.currentLevel + 1,
              ),
              this
            );
          }
          attList(p, T, R, k, z) {
            var $;
            return (
              this.openCurrent(),
              ($ = new s(this, p, T, R, k, z)),
              this.onData(
                this.writer.dtdAttList(
                  $,
                  this.writerOptions,
                  this.currentLevel + 1,
                ),
                this.currentLevel + 1,
              ),
              this
            );
          }
          entity(p, T) {
            var R;
            return (
              this.openCurrent(),
              (R = new o(this, !1, p, T)),
              this.onData(
                this.writer.dtdEntity(
                  R,
                  this.writerOptions,
                  this.currentLevel + 1,
                ),
                this.currentLevel + 1,
              ),
              this
            );
          }
          pEntity(p, T) {
            var R;
            return (
              this.openCurrent(),
              (R = new o(this, !0, p, T)),
              this.onData(
                this.writer.dtdEntity(
                  R,
                  this.writerOptions,
                  this.currentLevel + 1,
                ),
                this.currentLevel + 1,
              ),
              this
            );
          }
          notation(p, T) {
            var R;
            return (
              this.openCurrent(),
              (R = new u(this, p, T)),
              this.onData(
                this.writer.dtdNotation(
                  R,
                  this.writerOptions,
                  this.currentLevel + 1,
                ),
                this.currentLevel + 1,
              ),
              this
            );
          }
          up() {
            if (this.currentLevel < 0)
              throw new Error("The document node has no parent.");
            return (
              this.currentNode
                ? (this.currentNode.children
                    ? this.closeNode(this.currentNode)
                    : this.openNode(this.currentNode),
                  (this.currentNode = null))
                : this.closeNode(this.openTags[this.currentLevel]),
              delete this.openTags[this.currentLevel],
              this.currentLevel--,
              this
            );
          }
          end() {
            for (; this.currentLevel >= 0; ) this.up();
            return this.onEnd();
          }
          openCurrent() {
            if (this.currentNode)
              return (
                (this.currentNode.children = !0),
                this.openNode(this.currentNode)
              );
          }
          openNode(p) {
            var T, R, k, z;
            if (!p.isOpen) {
              if (
                (!this.root &&
                  this.currentLevel === 0 &&
                  p.type === e.Element &&
                  (this.root = p),
                (R = ""),
                p.type === e.Element)
              ) {
                (this.writerOptions.state = t.OpenTag),
                  (R =
                    this.writer.indent(
                      p,
                      this.writerOptions,
                      this.currentLevel,
                    ) +
                    "<" +
                    p.name),
                  (z = p.attribs);
                for (k in z)
                  !x.call(z, k) ||
                    ((T = z[k]),
                    (R += this.writer.attribute(
                      T,
                      this.writerOptions,
                      this.currentLevel,
                    )));
                (R +=
                  (p.children ? ">" : "/>") +
                  this.writer.endline(
                    p,
                    this.writerOptions,
                    this.currentLevel,
                  )),
                  (this.writerOptions.state = t.InsideTag);
              } else
                (this.writerOptions.state = t.OpenTag),
                  (R =
                    this.writer.indent(
                      p,
                      this.writerOptions,
                      this.currentLevel,
                    ) +
                    "<!DOCTYPE " +
                    p.rootNodeName),
                  p.pubID && p.sysID
                    ? (R += ' PUBLIC "' + p.pubID + '" "' + p.sysID + '"')
                    : p.sysID && (R += ' SYSTEM "' + p.sysID + '"'),
                  p.children
                    ? ((R += " ["), (this.writerOptions.state = t.InsideTag))
                    : ((this.writerOptions.state = t.CloseTag), (R += ">")),
                  (R += this.writer.endline(
                    p,
                    this.writerOptions,
                    this.currentLevel,
                  ));
              return this.onData(R, this.currentLevel), (p.isOpen = !0);
            }
          }
          closeNode(p) {
            var T;
            if (!p.isClosed)
              return (
                (T = ""),
                (this.writerOptions.state = t.CloseTag),
                p.type === e.Element
                  ? (T =
                      this.writer.indent(
                        p,
                        this.writerOptions,
                        this.currentLevel,
                      ) +
                      "</" +
                      p.name +
                      ">" +
                      this.writer.endline(
                        p,
                        this.writerOptions,
                        this.currentLevel,
                      ))
                  : (T =
                      this.writer.indent(
                        p,
                        this.writerOptions,
                        this.currentLevel,
                      ) +
                      "]>" +
                      this.writer.endline(
                        p,
                        this.writerOptions,
                        this.currentLevel,
                      )),
                (this.writerOptions.state = t.None),
                this.onData(T, this.currentLevel),
                (p.isClosed = !0)
              );
          }
          onData(p, T) {
            return (this.documentStarted = !0), this.onDataCallback(p, T + 1);
          }
          onEnd() {
            return (this.documentCompleted = !0), this.onEndCallback();
          }
          debugInfo(p) {
            return p == null ? "" : "node: <" + p + ">";
          }
          ele() {
            return this.element(...arguments);
          }
          nod(p, T, R) {
            return this.node(p, T, R);
          }
          txt(p) {
            return this.text(p);
          }
          dat(p) {
            return this.cdata(p);
          }
          com(p) {
            return this.comment(p);
          }
          ins(p, T) {
            return this.instruction(p, T);
          }
          dec(p, T, R) {
            return this.declaration(p, T, R);
          }
          dtd(p, T, R) {
            return this.doctype(p, T, R);
          }
          e(p, T, R) {
            return this.element(p, T, R);
          }
          n(p, T, R) {
            return this.node(p, T, R);
          }
          t(p) {
            return this.text(p);
          }
          d(p) {
            return this.cdata(p);
          }
          c(p) {
            return this.comment(p);
          }
          r(p) {
            return this.raw(p);
          }
          i(p, T) {
            return this.instruction(p, T);
          }
          att() {
            return this.currentNode && this.currentNode.type === e.DocType
              ? this.attList(...arguments)
              : this.attribute(...arguments);
          }
          a() {
            return this.currentNode && this.currentNode.type === e.DocType
              ? this.attList(...arguments)
              : this.attribute(...arguments);
          }
          ent(p, T) {
            return this.entity(p, T);
          }
          pent(p, T) {
            return this.pEntity(p, T);
          }
          not(p, T) {
            return this.notation(p, T);
          }
        });
  }.call(JI));
});
var nM = y((rM, iM) => {
  (function () {
    var e,
      t,
      r,
      i,
      n = {}.hasOwnProperty;
    (e = Ae()),
      (i = wv()),
      (t = pu()),
      (iM.exports = r =
        class extends i {
          constructor(a, o) {
            super(o), (this.stream = a);
          }
          endline(a, o, u) {
            return a.isLastRootNode && o.state === t.CloseTag
              ? ""
              : super.endline(a, o, u);
          }
          document(a, o) {
            var u, l, f, h, c, d, m, C, E;
            for (m = a.children, l = f = 0, c = m.length; f < c; l = ++f)
              (u = m[l]), (u.isLastRootNode = l === a.children.length - 1);
            for (
              o = this.filterOptions(o),
                C = a.children,
                E = [],
                h = 0,
                d = C.length;
              h < d;
              h++
            )
              (u = C[h]), E.push(this.writeChildNode(u, o, 0));
            return E;
          }
          cdata(a, o, u) {
            return this.stream.write(super.cdata(a, o, u));
          }
          comment(a, o, u) {
            return this.stream.write(super.comment(a, o, u));
          }
          declaration(a, o, u) {
            return this.stream.write(super.declaration(a, o, u));
          }
          docType(a, o, u) {
            var l, f, h, c;
            if (
              (u || (u = 0),
              this.openNode(a, o, u),
              (o.state = t.OpenTag),
              this.stream.write(this.indent(a, o, u)),
              this.stream.write("<!DOCTYPE " + a.root().name),
              a.pubID && a.sysID
                ? this.stream.write(
                    ' PUBLIC "' + a.pubID + '" "' + a.sysID + '"',
                  )
                : a.sysID && this.stream.write(' SYSTEM "' + a.sysID + '"'),
              a.children.length > 0)
            ) {
              for (
                this.stream.write(" ["),
                  this.stream.write(this.endline(a, o, u)),
                  o.state = t.InsideTag,
                  c = a.children,
                  f = 0,
                  h = c.length;
                f < h;
                f++
              )
                (l = c[f]), this.writeChildNode(l, o, u + 1);
              (o.state = t.CloseTag), this.stream.write("]");
            }
            return (
              (o.state = t.CloseTag),
              this.stream.write(o.spaceBeforeSlash + ">"),
              this.stream.write(this.endline(a, o, u)),
              (o.state = t.None),
              this.closeNode(a, o, u)
            );
          }
          element(a, o, u) {
            var l, f, h, c, d, m, C, E, O, L, D, w, F, g, x, A;
            if (
              (u || (u = 0),
              this.openNode(a, o, u),
              (o.state = t.OpenTag),
              (D = this.indent(a, o, u) + "<" + a.name),
              o.pretty && o.width > 0)
            ) {
              (C = D.length), (F = a.attribs);
              for (O in F)
                !n.call(F, O) ||
                  ((l = F[O]),
                  (w = this.attribute(l, o, u)),
                  (f = w.length),
                  C + f > o.width
                    ? ((A = this.indent(a, o, u + 1) + w),
                      (D += this.endline(a, o, u) + A),
                      (C = A.length))
                    : ((A = " " + w), (D += A), (C += A.length)));
            } else {
              g = a.attribs;
              for (O in g)
                !n.call(g, O) || ((l = g[O]), (D += this.attribute(l, o, u)));
            }
            if (
              (this.stream.write(D),
              (c = a.children.length),
              (d = c === 0 ? null : a.children[0]),
              c === 0 ||
                a.children.every(function (p) {
                  return (
                    (p.type === e.Text ||
                      p.type === e.Raw ||
                      p.type === e.CData) &&
                    p.value === ""
                  );
                }))
            )
              o.allowEmpty
                ? (this.stream.write(">"),
                  (o.state = t.CloseTag),
                  this.stream.write("</" + a.name + ">"))
                : ((o.state = t.CloseTag),
                  this.stream.write(o.spaceBeforeSlash + "/>"));
            else if (
              o.pretty &&
              c === 1 &&
              (d.type === e.Text || d.type === e.Raw || d.type === e.CData) &&
              d.value != null
            )
              this.stream.write(">"),
                (o.state = t.InsideTag),
                o.suppressPrettyCount++,
                (L = !0),
                this.writeChildNode(d, o, u + 1),
                o.suppressPrettyCount--,
                (L = !1),
                (o.state = t.CloseTag),
                this.stream.write("</" + a.name + ">");
            else {
              for (
                this.stream.write(">" + this.endline(a, o, u)),
                  o.state = t.InsideTag,
                  x = a.children,
                  m = 0,
                  E = x.length;
                m < E;
                m++
              )
                (h = x[m]), this.writeChildNode(h, o, u + 1);
              (o.state = t.CloseTag),
                this.stream.write(this.indent(a, o, u) + "</" + a.name + ">");
            }
            return (
              this.stream.write(this.endline(a, o, u)),
              (o.state = t.None),
              this.closeNode(a, o, u)
            );
          }
          processingInstruction(a, o, u) {
            return this.stream.write(super.processingInstruction(a, o, u));
          }
          raw(a, o, u) {
            return this.stream.write(super.raw(a, o, u));
          }
          text(a, o, u) {
            return this.stream.write(super.text(a, o, u));
          }
          dtdAttList(a, o, u) {
            return this.stream.write(super.dtdAttList(a, o, u));
          }
          dtdElement(a, o, u) {
            return this.stream.write(super.dtdElement(a, o, u));
          }
          dtdEntity(a, o, u) {
            return this.stream.write(super.dtdEntity(a, o, u));
          }
          dtdNotation(a, o, u) {
            return this.stream.write(super.dtdNotation(a, o, u));
          }
        });
  }.call(rM));
});
var aM = y((sM, Hi) => {
  (function () {
    var e, t, r, i, n, s, a, o, u;
    ({ assign: o, isFunction: u } = Cr()),
      (r = mv()),
      (i = Dv()),
      (n = tM()),
      (a = Nc()),
      (s = nM()),
      (e = Ae()),
      (t = pu()),
      (Hi.exports.create = function (l, f, h, c) {
        var d, m;
        if (l == null) throw new Error("Root element needs a name.");
        return (
          (c = o({}, f, h, c)),
          (d = new i(c)),
          (m = d.element(l)),
          c.headless ||
            (d.declaration(c),
            (c.pubID != null || c.sysID != null) && d.dtd(c)),
          m
        );
      }),
      (Hi.exports.begin = function (l, f, h) {
        return (
          u(l) && (([f, h] = [l, f]), (l = {})), f ? new n(l, f, h) : new i(l)
        );
      }),
      (Hi.exports.stringWriter = function (l) {
        return new a(l);
      }),
      (Hi.exports.streamWriter = function (l, f) {
        return new s(l, f);
      }),
      (Hi.exports.implementation = new r()),
      (Hi.exports.nodeType = e),
      (Hi.exports.writerState = t);
  }.call(sM));
});
var fM = y((lM) => {
  var oM = zN(),
    OY = aM();
  lM.build = RY;
  function TY(e) {
    function t(r) {
      return r < 10 ? "0" + r : r;
    }
    return (
      e.getUTCFullYear() +
      "-" +
      t(e.getUTCMonth() + 1) +
      "-" +
      t(e.getUTCDate()) +
      "T" +
      t(e.getUTCHours()) +
      ":" +
      t(e.getUTCMinutes()) +
      ":" +
      t(e.getUTCSeconds()) +
      "Z"
    );
  }
  var FY = Object.prototype.toString;
  function uM(e) {
    var t = FY.call(e).match(/\[object (.*)\]/);
    return t && t[1];
  }
  function RY(e, t) {
    var r = { version: "1.0", encoding: "UTF-8" },
      i = {
        pubid: "-//Apple//DTD PLIST 1.0//EN",
        sysid: "http://www.apple.com/DTDs/PropertyList-1.0.dtd",
      },
      n = OY.create("plist");
    return (
      n.dec(r.version, r.encoding, r.standalone),
      n.dtd(i.pubid, i.sysid),
      n.att("version", "1.0"),
      bv(e, n),
      t || (t = {}),
      (t.pretty = t.pretty !== !1),
      n.end(t)
    );
  }
  function bv(e, t) {
    var r,
      i,
      n,
      s = uM(e);
    if (s != "Undefined")
      if (Array.isArray(e))
        for (t = t.ele("array"), i = 0; i < e.length; i++) bv(e[i], t);
      else if (Buffer.isBuffer(e)) t.ele("data").raw(e.toString("base64"));
      else if (s == "Object") {
        t = t.ele("dict");
        for (n in e) e.hasOwnProperty(n) && (t.ele("key").txt(n), bv(e[n], t));
      } else
        s == "Number"
          ? ((r = e % 1 === 0 ? "integer" : "real"), t.ele(r).txt(e.toString()))
          : s == "Date"
          ? t.ele("date").txt(TY(new Date(e)))
          : s == "Boolean"
          ? t.ele(e ? "true" : "false")
          : s == "String"
          ? t.ele("string").txt(e)
          : s == "ArrayBuffer"
          ? t.ele("data").raw(oM.fromByteArray(e))
          : e && e.buffer && uM(e.buffer) == "ArrayBuffer"
          ? t.ele("data").raw(oM.fromByteArray(new Uint8Array(e.buffer), t))
          : s === "Null" && t.ele("null").txt("");
  }
});
var dM = y((Ev) => {
  var hM = kN();
  Object.keys(hM).forEach(function (e) {
    Ev[e] = hM[e];
  });
  var cM = fM();
  Object.keys(cM).forEach(function (e) {
    Ev[e] = cM[e];
  });
});
var wM = y((sre, vM) => {
  vM.exports = yM;
  yM.sync = NY;
  var mM = require("fs");
  function AY(e, t) {
    var r = t.pathExt !== void 0 ? t.pathExt : process.env.PATHEXT;
    if (!r || ((r = r.split(";")), r.indexOf("") !== -1)) return !0;
    for (var i = 0; i < r.length; i++) {
      var n = r[i].toLowerCase();
      if (n && e.substr(-n.length).toLowerCase() === n) return !0;
    }
    return !1;
  }
  function gM(e, t, r) {
    return !e.isSymbolicLink() && !e.isFile() ? !1 : AY(t, r);
  }
  function yM(e, t, r) {
    mM.stat(e, function (i, n) {
      r(i, i ? !1 : gM(n, e, t));
    });
  }
  function NY(e, t) {
    return gM(mM.statSync(e), e, t);
  }
});
var SM = y((are, _M) => {
  _M.exports = bM;
  bM.sync = IY;
  var DM = require("fs");
  function bM(e, t, r) {
    DM.stat(e, function (i, n) {
      r(i, i ? !1 : EM(n, t));
    });
  }
  function IY(e, t) {
    return EM(DM.statSync(e), t);
  }
  function EM(e, t) {
    return e.isFile() && MY(e, t);
  }
  function MY(e, t) {
    var r = e.mode,
      i = e.uid,
      n = e.gid,
      s = t.uid !== void 0 ? t.uid : process.getuid && process.getuid(),
      a = t.gid !== void 0 ? t.gid : process.getgid && process.getgid(),
      o = parseInt("100", 8),
      u = parseInt("010", 8),
      l = parseInt("001", 8),
      f = o | u,
      h =
        r & l || (r & u && n === a) || (r & o && i === s) || (r & f && s === 0);
    return h;
  }
});
var CM = y((ure, xM) => {
  var ore = require("fs"),
    Ic;
  process.platform === "win32" || global.TESTING_WINDOWS
    ? (Ic = wM())
    : (Ic = SM());
  xM.exports = _v;
  _v.sync = LY;
  function _v(e, t, r) {
    if ((typeof t == "function" && ((r = t), (t = {})), !r)) {
      if (typeof Promise != "function")
        throw new TypeError("callback not provided");
      return new Promise(function (i, n) {
        _v(e, t || {}, function (s, a) {
          s ? n(s) : i(a);
        });
      });
    }
    Ic(e, t || {}, function (i, n) {
      i &&
        (i.code === "EACCES" || (t && t.ignoreErrors)) &&
        ((i = null), (n = !1)),
        r(i, n);
    });
  }
  function LY(e, t) {
    try {
      return Ic.sync(e, t || {});
    } catch (r) {
      if ((t && t.ignoreErrors) || r.code === "EACCES") return !1;
      throw r;
    }
  }
});
var Sv = y((lre, NM) => {
  var wa =
      process.platform === "win32" ||
      process.env.OSTYPE === "cygwin" ||
      process.env.OSTYPE === "msys",
    OM = require("path"),
    qY = wa ? ";" : ":",
    TM = CM(),
    FM = (e) => Object.assign(new Error(`not found: ${e}`), { code: "ENOENT" }),
    RM = (e, t) => {
      let r = t.colon || qY,
        i =
          e.match(/\//) || (wa && e.match(/\\/))
            ? [""]
            : [
                ...(wa ? [process.cwd()] : []),
                ...(t.path || process.env.PATH || "").split(r),
              ],
        n = wa ? t.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "",
        s = wa ? n.split(r) : [""];
      return (
        wa && e.indexOf(".") !== -1 && s[0] !== "" && s.unshift(""),
        { pathEnv: i, pathExt: s, pathExtExe: n }
      );
    },
    AM = (e, t, r) => {
      typeof t == "function" && ((r = t), (t = {})), t || (t = {});
      let { pathEnv: i, pathExt: n, pathExtExe: s } = RM(e, t),
        a = [],
        o = (l) =>
          new Promise((f, h) => {
            if (l === i.length) return t.all && a.length ? f(a) : h(FM(e));
            let c = i[l],
              d = /^".*"$/.test(c) ? c.slice(1, -1) : c,
              m = OM.join(d, e),
              C = !d && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + m : m;
            f(u(C, l, 0));
          }),
        u = (l, f, h) =>
          new Promise((c, d) => {
            if (h === n.length) return c(o(f + 1));
            let m = n[h];
            TM(l + m, { pathExt: s }, (C, E) => {
              if (!C && E)
                if (t.all) a.push(l + m);
                else return c(l + m);
              return c(u(l, f, h + 1));
            });
          });
      return r ? o(0).then((l) => r(null, l), r) : o(0);
    },
    PY = (e, t) => {
      t = t || {};
      let { pathEnv: r, pathExt: i, pathExtExe: n } = RM(e, t),
        s = [];
      for (let a = 0; a < r.length; a++) {
        let o = r[a],
          u = /^".*"$/.test(o) ? o.slice(1, -1) : o,
          l = OM.join(u, e),
          f = !u && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + l : l;
        for (let h = 0; h < i.length; h++) {
          let c = f + i[h];
          try {
            if (TM.sync(c, { pathExt: n }))
              if (t.all) s.push(c);
              else return c;
          } catch {}
        }
      }
      if (t.all && s.length) return s;
      if (t.nothrow) return null;
      throw FM(e);
    };
  NM.exports = AM;
  AM.sync = PY;
});
var MM = y((fre, xv) => {
  "use strict";
  var IM = (e = {}) => {
    let t = e.env || process.env;
    return (e.platform || process.platform) !== "win32"
      ? "PATH"
      : Object.keys(t)
          .reverse()
          .find((i) => i.toUpperCase() === "PATH") || "Path";
  };
  xv.exports = IM;
  xv.exports.default = IM;
});
var BM = y((hre, PM) => {
  "use strict";
  var LM = require("path"),
    BY = Sv(),
    kY = MM();
  function qM(e, t) {
    let r = e.options.env || process.env,
      i = process.cwd(),
      n = e.options.cwd != null,
      s = n && process.chdir !== void 0 && !process.chdir.disabled;
    if (s)
      try {
        process.chdir(e.options.cwd);
      } catch {}
    let a;
    try {
      a = BY.sync(e.command, {
        path: r[kY({ env: r })],
        pathExt: t ? LM.delimiter : void 0,
      });
    } catch {
    } finally {
      s && process.chdir(i);
    }
    return a && (a = LM.resolve(n ? e.options.cwd : "", a)), a;
  }
  function jY(e) {
    return qM(e) || qM(e, !0);
  }
  PM.exports = jY;
});
var kM = y((cre, Ov) => {
  "use strict";
  var Cv = /([()\][%!^"`<>&|;, *?])/g;
  function UY(e) {
    return (e = e.replace(Cv, "^$1")), e;
  }
  function zY(e, t) {
    return (
      (e = `${e}`),
      (e = e.replace(/(\\*)"/g, '$1$1\\"')),
      (e = e.replace(/(\\*)$/, "$1$1")),
      (e = `"${e}"`),
      (e = e.replace(Cv, "^$1")),
      t && (e = e.replace(Cv, "^$1")),
      e
    );
  }
  Ov.exports.command = UY;
  Ov.exports.argument = zY;
});
var UM = y((dre, jM) => {
  "use strict";
  jM.exports = /^#!(.*)/;
});
var $M = y((pre, zM) => {
  "use strict";
  var $Y = UM();
  zM.exports = (e = "") => {
    let t = e.match($Y);
    if (!t) return null;
    let [r, i] = t[0].replace(/#! ?/, "").split(" "),
      n = r.split("/").pop();
    return n === "env" ? i : i ? `${n} ${i}` : n;
  };
});
var GM = y((mre, WM) => {
  "use strict";
  var Tv = require("fs"),
    WY = $M();
  function GY(e) {
    let r = Buffer.alloc(150),
      i;
    try {
      (i = Tv.openSync(e, "r")), Tv.readSync(i, r, 0, 150, 0), Tv.closeSync(i);
    } catch {}
    return WY(r.toString());
  }
  WM.exports = GY;
});
var XM = y((gre, YM) => {
  "use strict";
  var HY = require("path"),
    HM = BM(),
    VM = kM(),
    VY = GM(),
    YY = process.platform === "win32",
    XY = /\.(?:com|exe)$/i,
    ZY = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function KY(e) {
    e.file = HM(e);
    let t = e.file && VY(e.file);
    return t ? (e.args.unshift(e.file), (e.command = t), HM(e)) : e.file;
  }
  function QY(e) {
    if (!YY) return e;
    let t = KY(e),
      r = !XY.test(t);
    if (e.options.forceShell || r) {
      let i = ZY.test(t);
      (e.command = HY.normalize(e.command)),
        (e.command = VM.command(e.command)),
        (e.args = e.args.map((s) => VM.argument(s, i)));
      let n = [e.command].concat(e.args).join(" ");
      (e.args = ["/d", "/s", "/c", `"${n}"`]),
        (e.command = process.env.comspec || "cmd.exe"),
        (e.options.windowsVerbatimArguments = !0);
    }
    return e;
  }
  function JY(e, t, r) {
    t && !Array.isArray(t) && ((r = t), (t = null)),
      (t = t ? t.slice(0) : []),
      (r = Object.assign({}, r));
    let i = {
      command: e,
      args: t,
      options: r,
      file: void 0,
      original: { command: e, args: t },
    };
    return r.shell ? i : QY(i);
  }
  YM.exports = JY;
});
var QM = y((yre, KM) => {
  "use strict";
  var Fv = process.platform === "win32";
  function Rv(e, t) {
    return Object.assign(new Error(`${t} ${e.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${t} ${e.command}`,
      path: e.command,
      spawnargs: e.args,
    });
  }
  function eX(e, t) {
    if (!Fv) return;
    let r = e.emit;
    e.emit = function (i, n) {
      if (i === "exit") {
        let s = ZM(n, t, "spawn");
        if (s) return r.call(e, "error", s);
      }
      return r.apply(e, arguments);
    };
  }
  function ZM(e, t) {
    return Fv && e === 1 && !t.file ? Rv(t.original, "spawn") : null;
  }
  function tX(e, t) {
    return Fv && e === 1 && !t.file ? Rv(t.original, "spawnSync") : null;
  }
  KM.exports = {
    hookChildProcess: eX,
    verifyENOENT: ZM,
    verifyENOENTSync: tX,
    notFoundError: Rv,
  };
});
var tL = y((vre, Da) => {
  "use strict";
  var JM = require("child_process"),
    Av = XM(),
    Nv = QM();
  function eL(e, t, r) {
    let i = Av(e, t, r),
      n = JM.spawn(i.command, i.args, i.options);
    return Nv.hookChildProcess(n, i), n;
  }
  function rX(e, t, r) {
    let i = Av(e, t, r),
      n = JM.spawnSync(i.command, i.args, i.options);
    return (n.error = n.error || Nv.verifyENOENTSync(n.status, i)), n;
  }
  Da.exports = eL;
  Da.exports.spawn = eL;
  Da.exports.sync = rX;
  Da.exports._parse = Av;
  Da.exports._enoent = Nv;
});
var Iv = y((_t) => {
  "use strict";
  var iX =
    (_t && _t.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(_t, "__esModule", { value: !0 });
  _t.spawn =
    _t.ExitSignalError =
    _t.ExitCodeError =
    _t.ExitError =
    _t.CrossSpawnError =
      void 0;
  var nX = iX(tL());
  function Pc(e, t) {
    return t && Array.isArray(t) && t.length > 0 ? `${e} ${t.join(" ")}` : e;
  }
  var Mc = class extends Error {
    constructor(t, r, i, n) {
      let s = Pc(t, r),
        a = i.message || i;
      super(
        `Error executing command (${s}):
${a}
${n}`.trim(),
      ),
        (this.originalError = i);
    }
  };
  _t.CrossSpawnError = Mc;
  var mu = class extends Error {
    constructor(t, r, i, n, s) {
      super(i),
        (this.cmd = t),
        (this.args = r),
        (this.stdout = n),
        (this.stderr = s);
    }
  };
  _t.ExitError = mu;
  var Lc = class extends mu {
    constructor(t, r, i, n, s) {
      let a = Pc(t, r);
      super(
        t,
        r,
        `Command failed with a non-zero return code (${i}):
${a}
${n}
${s}`.trim(),
        n,
        s,
      ),
        (this.code = i);
    }
  };
  _t.ExitCodeError = Lc;
  var qc = class extends mu {
    constructor(t, r, i, n, s) {
      let a = Pc(t, r);
      super(
        t,
        r,
        `Command terminated via a signal (${i}):
${a}
${n}
${s}`.trim(),
        n,
        s,
      ),
        (this.signal = i);
    }
  };
  _t.ExitSignalError = qc;
  async function sX(e, t, r) {
    r || (r = {});
    let { logger: i, updateErrorCallback: n, ...s } = r;
    return (
      i && i(`Executing command ${Pc(e, t)}`),
      new Promise((a, o) => {
        let u = "",
          l = "",
          f = nX.default(e, t, s);
        f.stdout &&
          f.stdout.on("data", (h) => {
            u += h.toString();
          }),
          f.stderr &&
            f.stderr.on("data", (h) => {
              l += h.toString();
            }),
          f.on("close", (h, c) => {
            h === 0
              ? a(u)
              : o(h === null ? new qc(e, t, c, u, l) : new Lc(e, t, h, u, l));
          }),
          f.on("error", (h) => {
            n && n(h, !!i), o(new Mc(e, t, h, l));
          });
      })
    );
  }
  _t.spawn = sX;
});
var nL = y((Dre, iL) => {
  "use strict";
  var rL = require("fs"),
    Mv;
  function aX() {
    try {
      return rL.statSync("/.dockerenv"), !0;
    } catch {
      return !1;
    }
  }
  function oX() {
    try {
      return rL.readFileSync("/proc/self/cgroup", "utf8").includes("docker");
    } catch {
      return !1;
    }
  }
  iL.exports = () => (Mv === void 0 && (Mv = aX() || oX()), Mv);
});
var qv = y((bre, Lv) => {
  "use strict";
  var uX = require("os"),
    lX = require("fs"),
    sL = nL(),
    aL = () => {
      if (process.platform !== "linux") return !1;
      if (uX.release().toLowerCase().includes("microsoft")) return !sL();
      try {
        return lX
          .readFileSync("/proc/version", "utf8")
          .toLowerCase()
          .includes("microsoft")
          ? !sL()
          : !1;
      } catch {
        return !1;
      }
    };
  process.env.__IS_WSL_TEST__ ? (Lv.exports = aL) : (Lv.exports = aL());
});
var kc = y((Pe) => {
  "use strict";
  var fX =
      (Pe && Pe.__createBinding) ||
      (Object.create
        ? function (e, t, r, i) {
            i === void 0 && (i = r),
              Object.defineProperty(e, i, {
                enumerable: !0,
                get: function () {
                  return t[r];
                },
              });
          }
        : function (e, t, r, i) {
            i === void 0 && (i = r), (e[i] = t[r]);
          }),
    hX =
      (Pe && Pe.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    uL =
      (Pe && Pe.__importStar) ||
      function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (e != null)
          for (var r in e)
            r !== "default" &&
              Object.prototype.hasOwnProperty.call(e, r) &&
              fX(t, e, r);
        return hX(t, e), t;
      },
    lL =
      (Pe && Pe.__importDefault) ||
      function (e) {
        return e && e.__esModule ? e : { default: e };
      };
  Object.defineProperty(Pe, "__esModule", { value: !0 });
  Pe.spawnWrapperFromFunction =
    Pe.spawnWrapper =
    Pe.wrapperCommandExists =
    Pe.WrapperError =
    Pe.canRunWindowsExeNatively =
      void 0;
  var oL = Iv(),
    cX = uL(require("fs")),
    dX = lL(qv()),
    pX = uL(require("path")),
    mX = lL(Sv());
  function fL() {
    return process.platform === "win32" || dX.default;
  }
  Pe.canRunWindowsExeNatively = fL;
  var Bc = class extends Error {
    constructor(t, r) {
      let i = `Wrapper command '${t}' not found on the system.${
        r ? " " + r : ""
      }`;
      super(i);
    }
  };
  Pe.WrapperError = Bc;
  async function hL(e) {
    if (pX.isAbsolute(e)) return cX.existsSync(e);
    try {
      return await mX.default(e), !0;
    } catch {
      return !1;
    }
  }
  Pe.wrapperCommandExists = hL;
  async function cL(e, t, r) {
    r ?? (r = {});
    let { wrapperCommand: i, wrapperInstructions: n, ...s } = r;
    if (i) {
      if (!(await hL(i))) throw new Bc(i, n);
      let a = t ? [e, ...t] : [e];
      return oL.spawn(i, a, s);
    }
    return oL.spawn(e, t, s);
  }
  Pe.spawnWrapper = cL;
  async function gX(e, t, r, i) {
    let n = i;
    if (!fL()) {
      let s = e(i?.wrapperCommand);
      n = i ? { ...i, wrapperCommand: s } : { wrapperCommand: s };
    }
    return cL(t, r, n);
  }
  Pe.spawnWrapperFromFunction = gX;
});
var Pv = y((jc) => {
  "use strict";
  Object.defineProperty(jc, "__esModule", { value: !0 });
  jc.is64BitArch = void 0;
  var yX = ["arm64", "x64"];
  function vX(e) {
    return yX.includes(e);
  }
  jc.is64BitArch = vX;
});
var pL = y((Vi) => {
  "use strict";
  var wX =
    (Vi && Vi.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(Vi, "__esModule", { value: !0 });
  Vi.normalizePath = Vi.convertUNIXPathToWindows = void 0;
  var DX = wX(qv()),
    bX = Iv();
  function EX(e) {
    e.code === "ENOENT" &&
      e.syscall === "spawn wslpath" &&
      (e.message =
        "Could not find 'wslpath' in any of the directories listed in the PATH environment variable, which is needed to convert WSL paths to Windows-style paths.");
  }
  async function dL(e) {
    return (
      await bX.spawn("wslpath", ["-w", e], { updateErrorCallback: EX })
    ).trim();
  }
  Vi.convertUNIXPathToWindows = dL;
  async function _X(e) {
    return DX.default ? dL(e) : e;
  }
  Vi.normalizePath = _X;
});
var yL = y((Yi) => {
  "use strict";
  Object.defineProperty(Yi, "__esModule", { value: !0 });
  Yi.spawnDotNet =
    Yi.determineDotNetWrapper =
    Yi.dotNetDependencyInstallInstructions =
      void 0;
  var SX = kc();
  function mL() {
    switch (process.platform) {
      case "win32":
        return "No wrapper necessary";
      case "darwin":
        return "Run `brew install mono` to install Mono on macOS via Homebrew.";
      case "linux":
        return "Consult your Linux distribution's package manager to determine how to install Mono.";
      default:
        return "Consult your operating system's package manager to determine how to install Mono.";
    }
  }
  Yi.dotNetDependencyInstallInstructions = mL;
  function gL(e) {
    return e || (process.env.MONO_BINARY ? process.env.MONO_BINARY : "mono");
  }
  Yi.determineDotNetWrapper = gL;
  async function xX(e, t, r) {
    var i;
    return (
      r ?? (r = {}),
      ((i = r.wrapperInstructions) !== null && i !== void 0) ||
        (r.wrapperInstructions = mL()),
      SX.spawnWrapperFromFunction(gL, e, t, r)
    );
  }
  Yi.spawnDotNet = xX;
});
var DL = y((Xi) => {
  "use strict";
  Object.defineProperty(Xi, "__esModule", { value: !0 });
  Xi.spawnExe =
    Xi.determineWineWrapper =
    Xi.exeDependencyInstallInstructions =
      void 0;
  var CX = kc(),
    OX = Pv();
  function vL() {
    switch (process.platform) {
      case "win32":
        return "No wrapper necessary";
      case "darwin":
        return "Run `brew install --cask wine-stable` to install 64-bit wine on macOS via Homebrew.";
      case "linux":
        return "Consult your Linux distribution's package manager to determine how to install Wine.";
      default:
        return "Consult your operating system's package manager to determine how to install Wine.";
    }
  }
  Xi.exeDependencyInstallInstructions = vL;
  function wL(e) {
    return (
      e ||
      (process.env.WINE_BINARY
        ? process.env.WINE_BINARY
        : OX.is64BitArch(process.arch)
        ? "wine64"
        : "wine")
    );
  }
  Xi.determineWineWrapper = wL;
  async function TX(e, t, r) {
    var i;
    return (
      r ?? (r = {}),
      ((i = r.wrapperInstructions) !== null && i !== void 0) ||
        (r.wrapperInstructions = vL()),
      CX.spawnWrapperFromFunction(wL, e, t, r)
    );
  }
  Xi.spawnExe = TX;
});
var _L = y((Re) => {
  "use strict";
  Object.defineProperty(Re, "__esModule", { value: !0 });
  Re.spawnExe =
    Re.exeDependencyInstallInstructions =
    Re.spawnDotNet =
    Re.dotNetDependencyInstallInstructions =
    Re.normalizePath =
    Re.is64BitArch =
    Re.WrapperError =
    Re.spawnWrapperFromFunction =
    Re.spawn =
    Re.canRunWindowsExeNatively =
      void 0;
  var Uc = kc();
  Object.defineProperty(Re, "canRunWindowsExeNatively", {
    enumerable: !0,
    get: function () {
      return Uc.canRunWindowsExeNatively;
    },
  });
  Object.defineProperty(Re, "spawn", {
    enumerable: !0,
    get: function () {
      return Uc.spawnWrapper;
    },
  });
  Object.defineProperty(Re, "spawnWrapperFromFunction", {
    enumerable: !0,
    get: function () {
      return Uc.spawnWrapperFromFunction;
    },
  });
  Object.defineProperty(Re, "WrapperError", {
    enumerable: !0,
    get: function () {
      return Uc.WrapperError;
    },
  });
  var FX = Pv();
  Object.defineProperty(Re, "is64BitArch", {
    enumerable: !0,
    get: function () {
      return FX.is64BitArch;
    },
  });
  var RX = pL();
  Object.defineProperty(Re, "normalizePath", {
    enumerable: !0,
    get: function () {
      return RX.normalizePath;
    },
  });
  var bL = yL();
  Object.defineProperty(Re, "dotNetDependencyInstallInstructions", {
    enumerable: !0,
    get: function () {
      return bL.dotNetDependencyInstallInstructions;
    },
  });
  Object.defineProperty(Re, "spawnDotNet", {
    enumerable: !0,
    get: function () {
      return bL.spawnDotNet;
    },
  });
  var EL = DL();
  Object.defineProperty(Re, "exeDependencyInstallInstructions", {
    enumerable: !0,
    get: function () {
      return EL.exeDependencyInstallInstructions;
    },
  });
  Object.defineProperty(Re, "spawnExe", {
    enumerable: !0,
    get: function () {
      return EL.spawnExe;
    },
  });
});
var xL = y((Tre, SL) => {
  var { canRunWindowsExeNatively: AX, is64BitArch: NX, spawnExe: IX } = _L(),
    MX = require("path"),
    LX = ["version-string"],
    qX = [
      "file-version",
      "product-version",
      "icon",
      "requested-execution-level",
    ],
    PX = ["application-manifest"];
  SL.exports = async (e, t) => {
    let r = NX(process.arch) ? "rcedit-x64.exe" : "rcedit.exe",
      i = MX.resolve(__dirname, "..", "bin", r),
      n = [e];
    for (let a of LX)
      if (t[a])
        for (let [o, u] of Object.entries(t[a])) n.push(`--set-${a}`, o, u);
    for (let a of qX) t[a] && n.push(`--set-${a}`, t[a]);
    for (let a of PX) t[a] && n.push(`--${a}`, t[a]);
    let s = { env: { ...process.env } };
    AX() || (s.env.WINEDEBUG = "-all"), await IX(i, n, s);
  };
});
var kX = {};
b3(kX, { nwbuild: () => BX });
module.exports = E3(kX);
var Or = require("node:fs/promises"),
  RL = require("node:process");
var Zp = gt(require("node:path"), 1),
  KE = gt(uD(), 1),
  QE = gt(ZE(), 1),
  JE = (e, t) =>
    new Promise((r, i) => {
      e === "linux"
        ? QE.default
            .x({ file: `${t}/nw.tar.gz`, C: `${t}` })
            .then(() => {
              r(0);
            })
            .catch(() => {
              i(1);
            })
        : (0, KE.default)(Zp.default.resolve(`${t}/nw.zip`), {
            dir: Zp.default.resolve(`${t}`),
          })
            .then(() => {
              r(0);
            })
            .catch(() => {
              i(1);
            });
    });
var e_ = gt(require("node:child_process"), 1),
  t_ = (e, t) =>
    new Promise((r, i) => {
      let n = e_.default.spawn(t, [e]);
      n.on("close", () => {
        r(0);
      }),
        n.on("error", (s) => {
          console.log(s), i(1);
        });
    });
var Kp = (e) => {
  switch (e) {
    case "linux":
      return "nw";
    case "osx":
      return "nwjs.app/Contents/MacOS/nwjs";
    case "win":
      return "nw.exe";
    default:
      return null;
  }
};
var r_ = async (e, t, r) =>
  Kp(r) === null
    ? (console.log("Unsupported platform."), 1)
    : (await t_(e, `${t}/${Kp(r)}`), 0);
var lm = gt(require("node:fs"), 1),
  j_ = gt(require("node:https"), 1),
  fm = gt(k_(), 1),
  af = new fm.default.SingleBar({}, fm.default.Presets.rect),
  U_ = (e, t, r, i, n, s) =>
    new Promise((a, o) => {
      n !== "https://dl.nwjs.io" &&
        (console.log("Invalid download url. Please try again."), o(1));
      let u = `${n}/v${e}/nwjs${t === "sdk" ? "-sdk" : ""}-v${e}-${r}-${i}.${
        r === "linux" ? "tar.gz" : "zip"
      }`;
      j_.default.get(u, (l) => {
        let f = 0;
        af.start(Number(l.headers["content-length"]), 0),
          l.on("data", (c) => {
            (f += c.length), af.increment(), af.update(f);
          }),
          l.on("error", (c) => {
            console.log(c), o(1);
          }),
          l.on("end", () => {
            af.stop(), a(0);
          }),
          lm.default.mkdirSync(s, { recursive: !0 });
        let h = lm.default.createWriteStream(
          `${s}/nw.${r === "linux" ? "tar.gz" : "zip"}`,
        );
        l.pipe(h);
      });
    });
var Bs = require("node:fs/promises");
var On = gt(FC(), 1),
  { combine: I7, timestamp: M7, printf: L7 } = On.format,
  q7 = L7(
    ({ level: e, message: t, timestamp: r }) =>
      `[ ${e.toUpperCase()} ] ${r} ${t}`,
  ),
  xe = (0, On.createLogger)({
    format: I7(M7(), q7),
    transports: [new On.transports.Console({ level: "info" })],
  });
process.env.NODE_ENV !== "production" &&
  xe.add(new On.transports.Console({ level: "debug" }));
var RC = require("node:https");
var AC = (e) => {
  let t;
  return new Promise((r, i) => {
    (0, RC.get)(e, (n) => {
      n.on("data", (s) => {
        t += s;
      }),
        n.on("error", (s) => {
          xe.error(s), i(void 0);
        }),
        n.on("end", () => {
          xe.debug("Succesfully cached manifest metadata"), r(t);
        });
    });
  });
};
var NC = async (e, t, r) => {
  let i;
  try {
    await (0, Bs.access)(`${t}/manifest.json`),
      xe.debug(`Manifest file already exists locally under ${t}`);
  } catch {
    xe.debug("Manifest file does not exist locally"),
      xe.debug(`Downloading latest manifest file under ${t}`);
    let s = await AC(r);
    await (0, Bs.writeFile)(`${t}/manifest.json`, s.slice(9));
  } finally {
    xe.debug("Store manifest metadata in memory");
    let n = await (0, Bs.readFile)(`${t}/manifest.json`);
    xe.debug("Convert manifest data into JSON");
    let s = JSON.parse(n);
    xe.debug(`Search for ${e} specific release data`),
      (i = s.versions.find((a) => a.version === `v${e}`));
  }
  return i;
};
var IC = gt(require("node:fs"), 1),
  MC = (e, t) =>
    new Promise((r, i) => {
      IC.default.rm(`${t}/nw.${e === "linux" ? "tar.gz" : "zip"}`, (n) => {
        n && i(1);
      }),
        r(0);
    });
var $n = require("node:fs/promises");
var QA = gt(require("node:fs"), 1),
  JA = gt(KA(), 1);
var Jy = (e, t = "zip") => {
  let r = QA.default.createWriteStream(`${e}.${t}`),
    i = (0, JA.default)("zip");
  return new Promise((n, s) => {
    r.on("close", () => {
      n(0);
    }),
      i.on("warning", (a) => {
        a.code === "ENOENT" ? xe.debug(a) : s(a);
      }),
      i.on("error", (a) => {
        s(a);
      }),
      i.pipe(r),
      i.directory(e, !1),
      i.finalize();
  });
};
var fc = require("node:fs/promises");
var eN = async (e, t) => {
  let r = { Type: "Application", Name: e.name, Exec: e.name };
  await (0, fc.rename)(`${t}/nw`, `${t}/${e.name}`),
    typeof e.nwbuild?.linuxCfg == "object" &&
      Object.keys(e.nwbuild.linuxCfg).forEach((s) => {
        s !== "Type" && (r[s] = e.nwbuild.linuxCfg[s]);
      });
  let i = `[Desktop Entry]
`;
  Object.keys(r).forEach((s) => {
    (i += `${s}=${r[s]}
`),
      xe.debug(`Add ${s}=${r[s]} to Desktop Entry File`);
  });
  let n = `${t}/${e.name}.desktop`;
  await (0, fc.writeFile)(n, i), xe.debug("Desktop Entry file generated");
};
var $e = gt(require("node:fs/promises"), 1),
  Bt = gt(dM(), 1),
  pM = async (e, t, r) => {
    await $e.default.rename(`${t}/nwjs.app`, `${t}/${e.name}.app`);
    let i = `${t}/${e.name}.app/Contents/Info.plist`,
      n = Bt.default.parse(await $e.default.readFile(i, "utf-8"));
    n.CFBundleDisplayName = e.name;
    let s = Bt.default.build(n);
    await $e.default.writeFile(i, s);
    let a = (T = "nwjs") =>
        `${t}/${e.name}.app/Contents/Frameworks/nwjs Framework.framework/Versions/${r.components.chromium}/Helpers/${T} Helper (Alerts).app`,
      o = (T = "nwjs") =>
        `${t}/${e.name}.app/Contents/Frameworks/nwjs Framework.framework/Versions/${r.components.chromium}/Helpers/${T} Helper (GPU).app`,
      u = (T = "nwjs") =>
        `${t}/${e.name}.app/Contents/Frameworks/nwjs Framework.framework/Versions/${r.components.chromium}/Helpers/${T} Helper (Plugin).app`,
      l = (T = "nwjs") =>
        `${t}/${e.name}.app/Contents/Frameworks/nwjs Framework.framework/Versions/${r.components.chromium}/Helpers/${T} Helper (Renderer).app`,
      f = (T = "nwjs") =>
        `${t}/${e.name}.app/Contents/Frameworks/nwjs Framework.framework/Versions/${r.components.chromium}/Helpers/${T} Helper.app`;
    await $e.default.rename(a(), a(e.name)),
      await $e.default.rename(o(), o(e.name)),
      await $e.default.rename(u(), u(e.name)),
      await $e.default.rename(l(), l(e.name)),
      await $e.default.rename(f(), f(e.name));
    let h = `${a(e.name)}/Contents/Info.plist`,
      c = `${o(e.name)}/Contents/Info.plist`,
      d = `${u(e.name)}/Contents/Info.plist`,
      m = `${l(e.name)}/Contents/Info.plist`,
      C = `${f(e.name)}/Contents/Info.plist`,
      E = Bt.default.parse(await $e.default.readFile(h, "utf-8")),
      O = Bt.default.parse(await $e.default.readFile(c, "utf-8")),
      L = Bt.default.parse(await $e.default.readFile(d, "utf-8")),
      D = Bt.default.parse(await $e.default.readFile(m, "utf-8")),
      w = Bt.default.parse(await $e.default.readFile(C, "utf-8"));
    (E.CFBundleDisplayName = e.name),
      (O.CFBundleDisplayName = e.name),
      (D.CFBundleDisplayName = e.name),
      (L.CFBundleDisplayName = e.name),
      (w.CFBundleDisplayName = e.name);
    let F = Bt.default.build(E),
      g = Bt.default.build(O),
      x = Bt.default.build(D),
      A = Bt.default.build(L),
      p = Bt.default.build(w);
    await $e.default.writeFile(h, F),
      await $e.default.writeFile(c, g),
      await $e.default.writeFile(d, A),
      await $e.default.writeFile(m, x),
      await $e.default.writeFile(C, p);
  };
var CL = require("node:fs/promises"),
  OL = gt(xL(), 1),
  TL = async (e, t) => {
    await (0, CL.rename)(`${t}/nw.exe`, `${t}/${e.name}.exe`),
      await (0, OL.default)(`${t}/${e.name}.exe`, {
        "file-version": e.version,
        "product-version": e.version,
        "icon": e.icon,
        "version-string": {
          FileDescription: e.description,
          LegalCopyright: e.copyright,
          ProductName: e.name,
          OriginalFilename: e.name,
        },
      });
  };
var FL = async (e, t, r, i, n, s) => {
  xe.debug(`Remove any files at ${r} directory`),
    await (0, $n.rm)(r, { force: !0, recursive: !0 }),
    xe.debug(`Copy ${t} files to ${r} directory`),
    await (0, $n.cp)(t, r, { recursive: !0 }),
    xe.debug(`Copy ${e} files to ${r} directory`),
    await (0, $n.cp)(
      e,
      `${r}/${
        i !== "osx" ? "package.nw" : "nwjs.app/Contents/Resources/nw.app"
      }`,
      { recursive: !0 },
    ),
    xe.debug("Get NW's package.json as a buffer");
  let a = await (0, $n.readFile)(
    `${r}/${
      i !== "osx" ? "package.nw" : "nwjs.app/Contents/Resources/nw.app"
    }/package.json`,
  );
  xe.debug("Convert package.json buffer into JSON");
  let o = JSON.parse(a);
  switch ((xe.debug(`Starting platform specific config steps for ${i}`), i)) {
    case "linux":
      eN(o, r);
      break;
    case "win":
      TL(o, r);
      break;
    case "osx":
      pM(o, r, s);
      break;
    default:
      break;
  }
  n === !0 ? await Jy(r) : n === "zip" && (await Jy(r, n));
};
var BX = async ({
  srcDir: e,
  cacheDir: t = `${(0, RL.cwd)()}/cache`,
  version: r,
  flavour: i,
  platform: n,
  arch: s,
  outDir: a,
  downloadUrl: o = "https://dl.nwjs.io",
  manifestUrl: u = "https://nwjs.io/versions",
  noCache: l = !1,
  zip: f = !1,
  run: h = !1,
}) => {
  let c = `${e}/package.json`,
    d = !0,
    m = null;
  try {
    await (0, Or.access)(c, Or.constants.F_OK);
  } catch {
    d = !1;
  }
  d === !0 &&
    ((m = await (0, Or.readFile)(c, "utf8")),
    (m = JSON.parse(m)),
    m.nwbuild !== void 0 &&
      ((e = m.nwbuild.srcDir ?? e),
      (t = m.nwbuild.cacheDir ?? t),
      (r = m.nwbuild.version ?? r),
      (i = m.nwbuild.flavour ?? i),
      (n = m.nwbuild.platform ?? n),
      (s = m.nwbuild.arch ?? s),
      (a = m.nwbuild.outDir ?? a)));
  let C = `${t}/nwjs${i === "sdk" ? "-sdk" : ""}-v${r}-${n}-${s}`,
    E = !0;
  try {
    await (0, Or.access)(C, Or.constants.F_OK);
  } catch {
    E = !1;
  }
  (l === !0 || E === !1) &&
    (await (0, Or.rm)(C, { force: !0, recursive: !0 }),
    await U_(r, i, n, s, o, t),
    await JE(n, t),
    await MC(n, t));
  let O = await NC(r, t, u);
  h === !0 ? await r_(e, C, n) : await FL(e, C, a, n, f, O);
};
0 && (module.exports = { nwbuild });
