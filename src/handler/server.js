const axios = require("axios");
require("dotenv").config();

const API_URL = process.env.API_URL;
const server = {
  async getChatHistory() {
    try {
      const responseTraining = await axios.get(`${API_URL}/chat-tranning`);
      const responseChatHistory = await axios.get(`${API_URL}/chat-history`);
      const chatHistory = [
        ...responseChatHistory.data,
        ...responseTraining.data,
      ];
      const message = chatHistory.flatMap((chatItem) => [
        { role: "user", content: chatItem.user },
        { role: "assistant", content: chatItem.bot },
      ]);
      return message;
    } catch (error) {
      console.error("Unable to get chat history: ", error);
      return [];
    }
  },
  async uploadChatHistory(body) {
    try {
      await axios.post(`${API_URL}/chat-history`, body);
      return true;
    } catch (error) {
      console.error("Unable to upload chat history: ", error);
      return false;
    }
  },
};
module.exports = server;
