const Discord = require('discord.js');
exports.run = async (client, oldGuild, newGuild) => {
	const tableload = client.guildconfs.get(oldGuild.id);
	if (!tableload) return;

	if (tableload.language === '') {
		tableload.language = 'en';
		client.guildconfs.set(oldGuild.id, tableload);
	}

	const lang = require(`../languages/${tableload.language}.json`);

	if (!tableload.guildupdatelog) {
		tableload.guildupdatelog = 'false';
		tableload.guildupdatelogchannel = '';
		await client.guildconfs.set(oldGuild.id, tableload);
	}
	if (tableload.guildupdatelog === 'false') return;

	const messagechannel = client.channels.get(tableload.guildupdatelogchannel);

	if (oldGuild.name !== newGuild.name) {
		const embed = new Discord.RichEmbed()
			.setColor('#FE2E2E')
			.setTimestamp()
			.setAuthor(lang.guildupdateevent_namechanged)
			.addField(`📤 ${lang.guildupdateevent_oldname}`, oldGuild.name)
			.addField(`📥 ${lang.guildupdateevent_newname}`, newGuild.name);
		messagechannel.send({ embed: embed });
	}

	if (oldGuild.afkChannelID !== newGuild.afkChannelID) {
		const embed = new Discord.RichEmbed()
			.setColor('#FE2E2E')
			.setTimestamp()
			.setAuthor(lang.guildupdateevent_afkchanged)
			.addField(`📤 ${lang.guildupdateevent_oldafk}`, oldGuild.afkChannel == null ? lang.guildupdateevent_noafk : oldGuild.afkChannel.name)
			.addField(`📥 ${lang.guildupdateevent_newafk}`, newGuild.afkChannel == null ? lang.guildupdateevent_noafknow : newGuild.afkChannel.name);
		messagechannel.send({ embed: embed });
	}

	if (oldGuild.afkTimeout !== newGuild.afkTimeout) {
		const embed = new Discord.RichEmbed()
			.setColor('#FE2E2E')
			.setTimestamp()
			.setAuthor(lang.guildupdateevent_afktimeoutchanged)
			.addField(`📤${lang.guildupdateevent_oldafktimeout}`, `${oldGuild.afkTimeout} ${lang.guildupdateevent_seconds}`)
			.addField(`📥 ${lang.guildupdateevent_newafktimeout}`, `${newGuild.afkTimeout} ${lang.guildupdateevent_seconds}`);
		messagechannel.send({ embed: embed });
	}

	if (oldGuild.iconURL !== newGuild.iconURL) {
		const embed = new Discord.RichEmbed()
			.setColor('#FE2E2E')
			.setTimestamp()
			.setAuthor(lang.guildupdateevent_servericonchanged)
			.addField(`📤 ${lang.guildupdateevent_oldservericon}`, oldGuild.iconURL == null ? lang.guildupdateevent_noservericon : oldGuild.iconURL)
			.addField(`📥 ${lang.guildupdateevent_newservericon}`, newGuild.iconURL == null ? lang.guildupdateevent_noservericonnow : newGuild.iconURL);
		messagechannel.send({ embed: embed });
	}

	if (oldGuild.owner.id !== newGuild.owner.id) {
		const embed = new Discord.RichEmbed()
			.setColor('#FE2E2E')
			.setTimestamp()
			.setAuthor(lang.guildupdateevent_ownerchanged)
			.addField(`📤 ${lang.guildupdateevent_oldowner}`, oldGuild.owner.user.tag)
			.addField(`📥 ${lang.guildupdateevent_newowner}`, newGuild.owner.user.tag);
		messagechannel.send({ embed: embed });
	}
};
