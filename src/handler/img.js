const { bot: e, openai: a } = require("../instance/instance"),
  { uploadChatHistory: t } = require("./server");
module.exports = async (r, s) => {
  const n = r.replace(/<[^>]*>?/gm, "");
  if (n.length < 3)
    return void (await e.sendMessage(s, "Please enter a prompt"));
  const o = (
    await a.createImage({
      prompt: n,
      response_format: "url",
      size: "1024x1024",
    })
  ).data.data[0].url;
  await t({ user: n, bot: o }), await e.sendPhoto(s, o);
};
