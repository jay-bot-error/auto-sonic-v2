const fs = require("fs");

module.exports.config = {
		name: "prefix",
		version: "1.0.1",
		role: 0,
		credits: "cliff",
		description: "Display the prefix of your bot",
		hasPrefix: false,
		usages: "prefix",
		cooldown: 5,
		aliases: ["prefix", "Prefix", "PREFIX", "prefi"],
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
						body: `𝗵𝗲𝗹𝗹𝗼, 𝗺𝘆 𝗽𝗿𝗲𝗳𝗶𝘅 𝗶𝘀 [ ${prefix} ]\n━━━━━━━━━━━━━━━━━━━━━━━\n𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥: https://www.facebook.com/${admin}\n━━━━━━━━━━━━━━━━━━━━━━━`,
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
						api.setMessageReaction("🚀", messageInfo.messageID, (err) => {}, true);
				}
		);
};
