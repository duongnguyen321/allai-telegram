const e = require("../src/handler/img"),
  t = require("../src/handler/chat"),
  { bot: r } = require("../src/instance/instance"),
  i = require("express"),
  n = require("cors"),
  s = i(),
  port = process.env.PORT || 3001;
s.use(n()),
  s.get("/", (e, t) => {
    t.sendFile(__dirname + "/index.html");
  }),
  r.onText(/^\/img\s/, (t) => {
    e(t.text.replace("/img ", ""), t.chat.id);
  }),
  r.on("text", (e) => {
    e.text.startsWith("/img ", 0) || t(e.text.replace("/img ", ""), e.chat.id);
  });
s.listen(port, () => console.log(`Listening on port ${port}`));
