const sql = require("sqlite");
const Discord = require('discord.js');
sql.open("../lenoxbotscore.sqlite");
exports.run = (client, msg, args) => {
	const user1 = msg.mentions.users.first() || msg.author;
		sql.get(`SELECT * FROM scores WHERE guildId ="${msg.guild.id}" AND userId = "${user1.id}"`).then(row => {
			const embed = new Discord.RichEmbed()
			.setColor('#A4F2DF')
			.setThumbnail(user1.avatarURL)
			.setAuthor(user1.tag, user1.avatarURL)
			.addField('Points', row.points, true)
			.addField('Level', row.level, true);
			return msg.channel.send({ embed });
		});
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: []
};
exports.help = {
	name: 'rank',
	description: 'Displays the points of you or a user',
	usage: 'rank [@USER]',
	example: 'rank @Monkeyyy11',
	category: 'utility'
};