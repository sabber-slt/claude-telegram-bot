import { Telegraf, session } from "telegraf";
import Claude from "claude-ai";
import dotenv from "dotenv";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());
bot.launch();
const claude = new Claude({
  sessionKey: process.env.SESSION,
});

const sessions = new Map();
const getSession = async (ctx) => {
  await claude.init();
  let sessionId = sessions.get(ctx.chat.id);
  if (!sessionId) {
    const conversation = await claude.startConversation("Hello Claude!");
    await conversation.sendMessage("How are you today?");
    sessionId = conversation.conversationId;
    sessions.set(ctx.chat.id, sessionId);
  }
  return sessionId;
};

bot.command("start", async (ctx) => {
  await ctx.reply("Claude 2 AI Bot\n\n developed by @sabber_dev");
});

bot.on("message", async (ctx) => {
  await ctx.sendChatAction("typing");
  const sessionId = await getSession(ctx);

  await claude.init();
  // get conversation with existing session
  const conversation = await claude.getConversation(sessionId);
  const reply = await conversation.sendMessage(ctx.message.text);
  await ctx.reply(reply.completion);
});

bot.command("delete", async (ctx) => {
  await ctx.sendChatAction("typing");
  const sessionId = await getSession(ctx);
  await claude.init();
  // delete conversation with existing session
  const conversation = await claude.getConversation(sessionId);
  await conversation.delete();
  await ctx.reply("گفت و گو پاک شد");
});

bot.catch((err) => {
  console.log("Ooops", err);
});
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
