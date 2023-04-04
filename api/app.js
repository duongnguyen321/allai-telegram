const img = require("../src/handler/img");
const chat = require("../src/handler/chat");
const { bot } = require("../src/instance/instance");
bot.onText(/^\/img\s/, (msg) => {
  img(msg.text.replace("/img ", ""), msg.chat.id);
});
bot.on("text", (msg) => {
  if (!msg.text.startsWith("/img ", 0)) {
    chat(msg.text.replace("/img ", ""), msg.chat.id);
  }
});
