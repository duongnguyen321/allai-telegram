const { bot, openai } = require("../instance/instance");
const { uploadChatHistory } = require("./server");
const img = async (msg, chatId) => {
  const message = msg.replace(/<[^>]*>?/gm, "");
  if (message.length < 3) {
    await bot.sendMessage(chatId, "Please enter a prompt");
    return;
  }
  const imageData = await openai.createImage({
    prompt: message,
    response_format: "url",
    size: "1024x1024",
  });
  const imgUrl = imageData.data.data[0].url;
  await uploadChatHistory({ user: message, bot: imgUrl });
  await bot.sendPhoto(chatId, imgUrl);
};
module.exports = img;
