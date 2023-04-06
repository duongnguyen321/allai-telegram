const axios = require("axios");
require("dotenv").config();
const API_URL = process.env.API_URL;
const server = {
  async getChatHistory() {
    try {
      const data = await axios.get(`${API_URL}/all`);
      return data.data.flatMap((data) => [
        { role: "user", content: data.user },
        { role: "assistant", content: data.bot },
      ]);
    } catch (error) {
      console.error("Unable to get chat history: ", error);
      return [];
    }
  },
  async uploadChatHistory(data) {
    try {
      await axios.post(`${API_URL}/chat-history`, data);
      return true;
    } catch (error) {
      console.error("Unable to upload chat history: ", error);
      return false;
    }
  },
};
module.exports = server;
