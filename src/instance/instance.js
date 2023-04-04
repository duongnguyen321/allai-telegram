const e = require("node-telegram-bot-api"),
  { Configuration: n, OpenAIApi: o } = require("openai");
require("dotenv").config();
const i = new e(process.env.TOKEN, { polling: !0 }),
  r = new o(new n({ apiKey: process.env.OPENAI_API_KEY }));
module.exports = { bot: i, openai: r };
