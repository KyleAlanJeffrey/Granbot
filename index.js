const Discord = require('discord.js');
const uwu = require('./cmds/uwu.js');
const spaceman = require('./cmds/spaceman');
const webScrape = require('./cmds/webScrape');

const { prefix, token } = require('./bot-config.json');


/* -------------------------------------- */
/* -------------------------------------- */
const bot = new Discord.Client();
Discord.bot = bot;

bot.login(token);

bot.on('ready', () => {
    console.log('Granbot has sputtered to a start!');
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
    const message_contents = messageArr[1];

    if (command === 'spaceman') {
        spaceman.run(msgObj);
    }
    else if (command === 'kohai') {
        uwu.kohai(message_contents, msgObj)
            .then(res => {
                console.log(res);
            })
            .catch(rej => {
                errorMsg(rej);
            });
    }
    else if (command === 'uwuRandomWiki') {
        webScrape.randomWiki().then(res => {
            uwu.uwuify(res, msgObj);
        }).catch(rej => { errorMsg(rej); });
    }
    else if (command === 'uwuify') {
        uwu.uwuify(messageArr[1], msgObj);
    }
    else if (command === 'commands') {
        msgObj.channel.send(commandsEmbed);
    }
    else {
        console.log('Not a command');
    }
}

const commandsEmbed = new Discord.MessageEmbed()
    .setColor('#7FFFBF')
    .setTitle('The Monsters Commands')
    // .setURL('https://discord.js.org/')
    // .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
    // .setDescription('Some description here')
    .setThumbnail('https://banner2.cleanpng.com/20180921/tfq/kisspng-clip-art-image-monster-illustration-video-5ba486bed87bd6.7874982815375090548867.jpg')
    .addFields(
        { name: '---------------------------------------', value: '\u200B' },
        { name: `${prefix}uwuify`, value: 'Translates following text from plain english into weaboo, or from weaboo to super weaboo' },
        { name: `${prefix}uwuRandomWiki`, value: 'Translate Random Wikipedia article into uwu' },
        { name: `${prefix}spaceman`, value: 'For use when starting a game of Unfortunate Spaceman' },
    );
// .addField('Inline field title', 'Some value here', true)
// .setImage('https://i1.wp.com/metro.co.uk/wp-content/uploads/2019/02/sei_53672523-1e20.jpg?quality=90&strip=all&zoom=1&resize=540%2C699&ssl=1');
// .setTimestamp()
// .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

function errorMsg(msg) {
    console.log(`Error ${(msg)}`);
}