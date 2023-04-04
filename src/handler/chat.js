const e = require("./server"),
  { bot: t, openai: a } = require("../instance/instance");
module.exports = async (s, o) => {
  const n = s.replace(/<[^>]*>?/gm, "");
  if (n.length < 2)
    return void (await t.sendMessage(o, "Please enter a prompt"));
  const r = await e.getChatHistory(),
    i = await a.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [...r, { role: "user", content: n }],
    }),
    c = i.data.choices[0]?.message?.content;
  try {
    const e = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g.exec(c);
    e
      ? await t.sendPhoto(o, e[1])
      : await t.sendMessage(o, c.replace(/<[^>]*>?/gm, ""), {
          parse_mode: "Markdown",
        });
  } catch (e) {
    console.error("Unable to send message: ", e);
  }
  await e.uploadChatHistory({ user: n, bot: c });
};
