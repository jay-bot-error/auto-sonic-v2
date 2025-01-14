const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "━━━━━━━━━━━━━━━━\n╔╦══• •✠•🤍•✠ • •══╦╗\nミ★𝘓𝘖𝘙𝘋✄𝘒𝘐𝘕𝘎★彡\nミ★𝘑𝘈𝘠𝘋𝘌𝘕✄𝘚𝘔𝘐𝘛𝘏★彡\n╚╩══• •✠•🤍•✠ • •══╩╝"; // changing this wont change the goatbot V2 of list cmd it is just a decoyy

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "𝘓𝘰𝘳𝘥  𝘬𝘪𝘯𝘨", // original author leeza 
    countDown: 0,
    role: 0,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "utility",
    guide: {
      en: "{pn} / help cmdName ",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "";

      msg += `╔╦══• •✠•🤍•✠ • •══╦╗\nミ★𝘒𝘐𝘕𝘎✄𝘓𝘖𝘙𝘋★彡\nミ★𝘑𝘈𝘠𝘋𝘌𝘕✄𝘚𝘔𝘐𝘛𝘏★彡\n╚╩══• •✠•🤍•✠ • •══╩╝\n━━━━━━━━━━━━━━━━`; // replace with your name 

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += `\n 📱✨☞${category.toUpperCase()}☜✨📱\n`;


          const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 3).map((item) => `\n 🥀✨💦 🌪️${item}🌪️`);
            msg += `\n ${cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length)))}`;
          }

          msg += `\n━━━━━━━━━━━━━━━━`;
        }
      });

      const totalCommands = commands.size;
      msg += `\n𝐀𝐜𝐭𝐮𝐞𝐥𝐥𝐞𝐦𝐞𝐧𝐭 𝐥𝐞 𝐛𝐨𝐭 𝐝𝐢𝐬𝐩𝐨𝐬𝐞 𝐝𝐞 🏁${totalCommands}🏁𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞𝐬 !\n`;
      msg += `𝐒𝐚𝐢𝐬𝐢𝐬 ${prefix}𝐡𝐞𝐥𝐩 𝐬𝐮𝐢𝐯𝐢𝐯𝐝𝐮 𝐧𝐨𝐦 𝐝𝐞 𝐥𝐚 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐩𝐨𝐮𝐫 𝐜𝐨𝐧𝐧𝐚𝐢𝐭𝐫𝐞 𝐩𝐥𝐮𝐬 𝐝𝐞 𝐝𝐞𝐭𝐚𝐢𝐥𝐬 𝐬𝐮𝐫 𝐥𝐚 𝐜𝐦𝐝 !\n━━━━━━━━━━━━━━━`;
      msg += `\n╭──── • 🩶 • ─────╮\n༺𝘛𝘌𝘈𝘔ᬊ᭄𝑺𝑯𝑰𝑺𝑼𝑰༻\n╰──── • 🩶 • ─────╯`; // its not decoy so change it if you want 

      const helpListImages = [
        "https://i.ibb.co/zVGD257/image.jpg", // add image link here
        "https://i.ibb.co/TcGjWrp/image.gif",
        "https://i.ibb.co/KFwHHhW/image.jpg",
        "https://i.ibb.co/QKZT7T5/image.jpg",
        "https://i.ibb.co/XVdqV98/image.jpg",
        // Add more image links as needed
      ];

      const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];

      await message.reply({
        body: msg,
        attachment: await global.utils.getStreamFromURL(helpListImage),
      });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";

        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response = `𝘑𝘈𝘠𝘋𝘌𝘕 𝘚𝘔𝘐𝘛𝘏
  웃=➪  『${configCommand.name}』
  웃=➪ 𝙄𝙉𝙁𝙊
  웃=➪  𝘿𝙚𝙨𝙘𝙧𝙞𝙥𝙩𝙞𝙤𝙣: 『${longDescription}』
  웃=➪ 𝙊𝙩𝙝𝙚𝙧 𝙣𝙖𝙢𝙚𝙨: 『${configCommand.aliases ? configCommand.aliases.join(", ") : "Do not have"}』
  웃=➪  𝙊𝙩𝙝𝙚𝙧 𝙣𝙖𝙢𝙚𝙨 𝙞𝙣 𝙮𝙤𝙪𝙧 𝙜𝙧𝙤𝙪𝙥: 𝘿𝙤 𝙣𝙤𝙩 𝙝𝙖𝙫𝙚
  웃=➪ 𝙑𝙚𝙧𝙨𝙞𝙤𝙣: 『${configCommand.version || "1.0"}』
  웃=➪  𝙍𝙤𝙡𝙚: 『${roleText}』
  웃=➪  𝙏𝙞𝙢𝙚 𝙥𝙚𝙧 𝙘𝙤𝙢𝙢𝙖𝙣𝙙: 『${configCommand.countDown || 1}s』
  웃=➪   𝘼𝙪𝙩𝙝𝙤𝙧: 『${author}』
  웃=➪  𝙐𝙨𝙖𝙜𝙚
  웃=➪ 『${usage}』
  웃=➪  𝙉𝙤𝙩𝙚𝙨
  웃=➪   𝙏𝙝𝙚 𝙘𝙤𝙣𝙩𝙚𝙣𝙩 𝙞𝙣𝙨𝙞𝙙𝙚 <𝙓𝙓𝙓𝙓𝙓> 𝙘𝙖𝙣 𝙗𝙚 𝙘𝙝𝙖𝙣𝙜𝙚𝙙
  웃=➪  𝙏𝙝𝙚 𝙘𝙤𝙣𝙩𝙚𝙣𝙩 𝙞𝙣𝙨𝙞𝙙𝙚 [𝙖|𝙗|𝙘] 𝙞𝙨 𝙖 𝙤𝙧 𝙗 𝙤𝙧 𝙘 \n━━━━━━━━━━━━━━━━\n
  `;

        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (All users)";
    case 1:
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
  }
