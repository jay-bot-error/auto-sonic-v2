const axios = require('axios');

module.exports.config = {
  name: "ai2",
  version: "69",
  role: 0,
  credits: "OtinXSandip", // converted by kira
  description: "ask AI",
  usages: "ask <question>",
  hasPrefix: false,
  commandCategory: "ai",
  cooldowns: 0
};
  
module.exports.run = async function ({ api, event, args, message }) {
  try {
    const prompt = event.body.trim();
    if (!prompt) {
      await api.sendMessage({ body: "salut qu'es ce que je peux faire pour toi 👨🏻‍💻" }, event.threadID);
      return;
    }
    api.setMessageReaction("🔎", event.messageID, (err) => {}, true);
    const response = await axios.get(`https://sandipapi.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
    api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    const answer = response.data.answer;

    await api.sendMessage({
      body: `𝗕𝗢𝗧 𝗥𝗘𝗦𝗣𝗢𝗡𝗦𝗘 | 🟢
━━━━━━━━━━━━━━━━━━        
${answer}
━━━━━━━━━━━━━━━━━━\n\n- 𝚃𝚑𝚒𝚜 𝚋𝚘𝚝 𝚞𝚗𝚍𝚎𝚛 𝙳𝚎𝚟𝚎𝚕𝚘𝚙𝚎𝚍 𝚋𝚢 𝚁𝚘𝚗𝚊𝚕𝚍-it\n• 𝗙𝗕𝗟𝗶𝗡𝗞: https://www.facebook.com/sory.ronald.alexandre`,
    }, event.threadID);

  } catch (error) {
    console.error("🔴 An error occurred while processing your request.\nPlease contact churchill abing for an error", error.message);
    api.setMessageReaction("🔴", event.messageID, (err) => {}, true);
  }
};
