const t = require("axios");
require("dotenv").config();
const r = process.env.API_URL,
  a = {
    async getChatHistory() {
      try {
        const a = await t.get(`${r}/chat-tranning`),
          o = [...(await t.get(`${r}/chat-history`)).data, ...a.data];
        return o.flatMap((t) => [
          { role: "user", content: t.user },
          { role: "assistant", content: t.bot },
        ]);
      } catch (t) {
        return console.error("Unable to get chat history: ", t), [];
      }
    },
    async uploadChatHistory(a) {
      try {
        return await t.post(`${r}/chat-history`, a), !0;
      } catch (t) {
        return console.error("Unable to upload chat history: ", t), !1;
      }
    },
  };
module.exports = a;
