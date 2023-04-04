const e = require("../src/handler/img"),
  t = require("../src/handler/chat"),
  { bot: r } = require("../src/instance/instance");
r.onText(/^\/img\s/, (t) => {
  e(t.text.replace("/img ", ""), t.chat.id);
}),
  r.on("text", (e) => {
    e.text.startsWith("/img ", 0) || t(e.text.replace("/img ", ""), e.chat.id);
  });
