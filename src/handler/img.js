const { bot: telegramBot, openai } = require("../instance/instance");
const { uploadChatHistory } = require("./server");
module.exports = async (userInput, chatId) => {
  const cleanedInput = userInput.replace(/<[^>]*>?/gm, "");
  if (cleanedInput.length < 3) {
    await telegramBot.sendMessage(chatId, "Please enter a prompt");
    return;
  }
  const { data } = await openai.createImage({
    prompt: cleanedInput,
    response_format: "url",
    size: "1024x1024",
  });
  const imageUrl = data.data[0].url;
  await uploadChatHistory({ user: cleanedInput, bot: imageUrl });
  await telegramBot.sendPhoto(chatId, imageUrl);
};
