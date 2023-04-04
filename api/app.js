const imageHandler = require("../src/handler/img"),
  chatHandler = require("../src/handler/chat"),
  { bot } = require("../src/instance/instance"),
  express = require("express"),
  cors = require("cors"),
  app = express(),
  port = process.env.PORT || 3001;

app.use(cors()),
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  }),
  bot.onText(/^\/img\s/, (msg) => {
    imageHandler(msg.text.replace("/img ", ""), msg.chat.id);
  }),
  bot.on("text", (msg) => {
    msg.text.startsWith("/img ", 0) ||
      chatHandler(msg.text.replace("/img ", ""), msg.chat.id);
  });
app.listen(port, () => console.log(`Server listening on port ${port}`));
