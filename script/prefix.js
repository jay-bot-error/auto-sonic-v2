const fs = require("fs");

module.exports.config = {
		name: "prefix",
		version: "1.0.1",
		role: 0,
		credits: "Lord King",
		description: "Display the prefix of the bot",
		hasPrefix: false,
		usages: "prefix",
		cooldown: 5,
		aliases: ["bot", "jay", "what", "hello", "sup", "hi"],
};

module.exports.run = function ({ api, event, prefix, admin }) {
		const { threadID, messageID } = event;

		if (event.body.toLowerCase() === `${prefix}prefix`) {
				api.sendMessage(
						"This command cannot be executed manually.",
						threadID,
						messageID
				);
				return;
		}

		api.sendMessage(
				{
						body: `𝗯𝗿𝗼 𝗰𝗵𝗲𝗰𝗸 𝗺𝘆 𝗽𝗿𝗲𝗳𝗶𝘅; [ ${prefix} ]\n━━━━━━━━━━━━━━━━━━━━━━━\n𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥: https://www.facebook.com/${admin}\n━━━━━━━━━━━━━━━━━━━━━━━\n𝗦𝘆𝘀𝘁𝗵𝗲𝗺 𝗢𝘄𝗻𝗲𝗿: https://www.facebook.com/lordjaydenSmith.1\n━━━━━━━━━━━━━━━━━━━━━━━\n"𝙔𝙤𝙪 𝙨𝙩𝙤𝙡𝙚 𝙢𝙮 𝙝𝙚𝙖𝙧𝙩, 𝙗𝙪𝙩 𝙄'𝙡𝙡 𝙡𝙚𝙩 𝙮𝙤𝙪 𝙠𝙚𝙚𝙥 𝙞𝙩."\n━━━━━━━━━━━━━━━━━━━━━━━\n`,
						attachment: fs.createReadStream(__dirname + "/cache2/prefix.jpeg")
				},
				threadID,
				(err, messageInfo) => {
						if (err) return console.error(err);

						const voiceFile = fs.readFileSync(__dirname + "/cache2/prefix.jpeg");
						api.sendMessage(
								{
										attachment: voiceFile,
										type: "audio",
										body: "Hey, listen to my prefix information!",
								},
								threadID,
								() => {}
						);
						api.setMessageReaction("🍑", messageInfo.messageID, (err) => {}, true);
				}
		);
};
