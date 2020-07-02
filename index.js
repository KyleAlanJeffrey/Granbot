const Discord = require('discord.js');
const uwuifying = require('./cmds/uwu.js');
const uwuifying_data = require('./cmds/uwu-data.js');
const spaceman = require('./cmds/spaceman');
const { prefix, token } = require('./bot-config.json');
const fs = require('fs');


/* -------------------------------------- */

/* -------------------------------------- */
const bot = new Discord.Client();
bot.login(token);
bot.on('ready', () => {
    console.log('Bot is online!');
});
bot.on('message', (msg) => {
    if (msg.content.startsWith(prefix)) {
        parseCommand(msg);
    }
});
bot.on('messageReactionAdd', (reaction, user) => {
    if (spaceman.vars.running && (reaction.message.id == spaceman.vars.stopMsgId)) {
        spaceman.stop(reaction, user);
    }
});
function parseCommand(msgObj) {
    let message = msgObj.content.slice(1);
    const messageArr = message.split(/ (.*)/);
    const command = messageArr[0];
    message = messageArr[1];

    if (command === 'spaceman') {
        spaceman.run(msgObj);
    }
    else if (command === 'uwu') {
        uwuifying.custom(message, msgObj, uwuifying_data, Discord);

    }
    else if (command === 'commands') {
        msgObj.channel.send(commandsEmbed);
    }
    else {
        msgObj.reply('Not a command!');
    }
}

let commandsEmbed = new Discord.MessageEmbed()
    .setColor('#7FFFBF')
    .setTitle('Granbot Commands')
    // .setURL('https://discord.js.org/')
    // .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
    // .setDescription('Some description here')
    .setThumbnail('https://i1.wp.com/metro.co.uk/wp-content/uploads/2019/02/sei_53672523-1e20.jpg?quality=90&strip=all&zoom=1&resize=540%2C699&ssl=1')
    .addFields(
        { name: '---------------------------------------', value: '\u200B' },
        { name: `${prefix}uwuify`, value: 'Translates following text from plain english into weaboo, or from weaboo to super weaboo' },
        { name: `${prefix}spaceman`, value: 'For use when starting a game of Unfortunate Spaceman' },
    );
    // .addField('Inline field title', 'Some value here', true)
    // .setImage('https://i1.wp.com/metro.co.uk/wp-content/uploads/2019/02/sei_53672523-1e20.jpg?quality=90&strip=all&zoom=1&resize=540%2C699&ssl=1');
	// .setTimestamp()
	// .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
