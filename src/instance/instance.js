const TelegramBot = require("node-telegram-bot-api");
const { Configuration: OpenAIConfig, OpenAIApi } = require("openai");
require("dotenv").config();

const bot = new TelegramBot(process.env.TOKEN, {
  polling: false,
});
// Create instance of OpenAI API
const openai = new OpenAIApi(
  new OpenAIConfig({ apiKey: process.env.OPENAI_API_KEY })
);

module.exports = { bot, openai };
