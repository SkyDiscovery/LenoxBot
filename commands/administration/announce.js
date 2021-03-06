exports.run = (client, msg, args, lang) => {
	const tableload = client.guildconfs.get(msg.guild.id);
	const text = args.slice().join(' ');

	const announceactivated = lang.announce_announcedeactivated.replace('%prefix', tableload.prefix);
	if (tableload.announce === 'false') return msg.channel.send(announceactivated);

	if (!text) return msg.channel.send(lang.annnounce_noinput);

	const announcechannel = tableload.announcechannel;
	const announcement = lang.announce_announcement.replace('%authortag', msg.author.tag);
	client.channels.get(announcechannel).send(`${announcement} ${text}`);
	msg.channel.send(lang.announce_annoucementsent);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	shortDescription: 'Announcements',
	aliases: ['a'],
	userpermissions: ['ADMINISTRATOR'],
	dashboardsettings: true
};
exports.help = {
	name: 'announce',
	description: 'Write a new server announcement',
	usage: 'announce {announcement text}',
	example: ['announce Today we reached 5000 members. Thank you for that!'],
	category: 'administration',
	botpermissions: ['SEND_MESSAGES']
};
