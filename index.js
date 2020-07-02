const Discord = require('discord.js');
const uwuifying = require('./cmds/uwu.js');
const uwuifying_data = require('./cmds/uwu-data.js');
const spaceman = require('./cmds/spaceman');
const { prefix, token } = require('./bot-config.json');
const fs = require('fs');

const bot = new Discord.Client();

bot.login(token);

//  bot.on() is where all commands are done thorugh  the bot. This instance is run when the bot turns on
bot.on('ready', () => {
    console.log('Bot is online!');
});

// This logs the bbot in with a token from the developer page
bot.on('message', (msg) => {
    if (msg.content.startsWith(prefix)) {
        parseCommand(msg);
    }
});

function parseCommand(msgObj) {
    let message = msgObj.content.slice(1);
    const messageArr = message.split(/ (.*)/);
    const command = messageArr[0];
    message = messageArr[1];

    if (command === 'spaceman') {
        spaceman.muteAll(msgObj, Discord);
    } else if (command === 'uwu') {
        uwuifying.custom(message, msgObj, uwuifying_data, Discord);

    } else {
        msgObj.reply('Not a command!');
    }
}

// async function eh() {
//     return await new Promise((acc, rej) => {
//         let work = 7;
//         if (work > 5) {
//             acc("successful promisee");
//         } else {
//             rej("rejected promise");
//         }
//     });
// }
// eh().then(res => console.log(res)).catch(err => console.log(err));