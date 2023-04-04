const TelegramBot = require("node-telegram-bot-api");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
// Initialize Telegram bot with token
const telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});
// Initialize OpenAI API with API key
const openaiApi = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);
module.exports = { telegramBot, openaiApi };
