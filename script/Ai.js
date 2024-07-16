const axios = require('axios');
module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT-4",
  usage: "Ai [promot]",
  credits: '𝗮𝗲𝘀𝘁𝗵𝗲𝗿',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`Oui je suis là pour répondre à tes questions...👨🏻‍💻`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(``, event.threadID, event.messageID);
  try {
    const {
      data
    } = await axios.get(`https://metoushela-rest-api-koak.onrender.com/api/gpt4o?context=hi`);
    const response = data.response;
    api.sendMessage('════════════════\n['+ response +'] \n════════════════ \n https://www.facebook.com/sory.ronald.alexandre', event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
