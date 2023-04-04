const server = require("./server");
const { bot, openai } = require("../instance/instance");
const chat = async (msg, chatId) => {
  const message = msg.replace(/<[^>]*>?/gm, "");
  if (message.length < 2) {
    await bot.sendMessage(chatId, "Please enter a prompt");
    return;
  }
  const messageHistory = await server.getChatHistory();
  const chatData = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [...messageHistory, { role: "user", content: message }],
  });
  const result = chatData.data.choices[0]?.message?.content;
  try {
    const regex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
    const match = regex.exec(result);
    if (match) {
      await bot.sendPhoto(chatId, match[1]);
    } else {
      await bot.sendMessage(chatId, result.replace(/<[^>]*>?/gm, ""), {
        parse_mode: "Markdown",
      });
    }
  } catch (error) {
    console.error("Unable to send message: ", error);
  }
  await server.uploadChatHistory({
    user: message,
    bot: result,
  });
};
module.exports = chat;
