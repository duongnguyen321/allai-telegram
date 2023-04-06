const server = require("./server"),
  { bot: telegramBot,openai } = require("../instance/instance");
module.exports = async (userInput, chatId) => {
  const cleanedInput = userInput.replace(/<[^>]*>?/gm, "");
  if (cleanedInput.length < 2) {
    return void (await telegramBot.sendMessage(
      chatId,
      "Please enter a prompt"
    ));
  }
  const chatHistory = await server.getChatHistory();
  const completionResult = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [...chatHistory, { role: "user", content: cleanedInput }],
  });
  const generatedOutput = completionResult.data.choices[0]?.message?.content;
  try {
    const imgRegex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g.exec(generatedOutput);
    if (imgRegex) {
      await telegramBot.sendPhoto(chatId, imgRegex[1]);
    } else {
      await telegramBot.sendMessage(
        chatId,
        generatedOutput.replace(/<[^>]*>?/gm, ""),
        { parse_mode: "Markdown" }
      );
    }
  } catch (error) {
    console.error("Unable to send message: ", error);
  }
  await server.uploadChatHistory({ user: cleanedInput, bot: generatedOutput });
};
