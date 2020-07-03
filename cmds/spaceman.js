const Discord = require('discord.js');
let variables = {
    running: false,
    stopMsgId: undefined,
    members: undefined,
    spacemanRole: undefined,
    dmChannel: undefined,
};

function stop(reaction, user) {
    console.log(`${user.username} stopped the game.`);
    variables.dmChannel.send('Welcome Back Spacemen!');
    // Remove Rolls and unmute everyone;
    variables.members.each((member) => {
        member.voice.setMute(false);
        member.roles.remove(variables.spacemanRole);
    });
    variables.running = false;
}
function run(msgObj) {
    console.log(`${msgObj.member.user.username} started a game of Spaceman`);
    const spacemanRole = makeSpacemanRole(msgObj);
    spacemanRole.then(role => {
        makeSpacemen(msgObj, role, variables);

        const message_embed = new Discord.MessageEmbed()
            .setColor('#C4C9BF')
            .setTitle('Now Playing a round of Unfortunate Spaceman')
            .setDescription('Who is the monster? Its Probably Mitchell.')
            .addFields(
                { name: '---------------------------------------', value: '\u200B' },
                { name: 'Thumbs up this stop sign to end the round', value: '\u200B' },
            )
            .setImage('https://upload.wikimedia.org/wikipedia/commons/8/81/Stop_sign.png');
        msgObj.channel.send(message_embed).then(msg => { variables.stopMsgId = msg.id; });
        variables.running = true;
        variables.spacemanRole = role;
    });
}

function makeSpacemen(msgObj, spacemanRole) {
    // Iterate through the members in the channel the message came from and give spaceman role
    variables.dmChannel = msgObj.channel;
    const voice_channel = msgObj.member.voice.channel;
    const members = voice_channel.members;
    variables.members = members;
    members.each(member => {
        console.log(`Editing ${member.user.username} attributes`);
        // member.voice.setMute(true).catch(rej => { console.log(`Muting Error: ${(rej)}`); }); // Have to mute before changing role
        member.roles.add(spacemanRole).catch(err => { console.log(`Setting Role Error: ${(err)}`); }); // give spaceman role
        // member.setNickname('Spaceman').catch(err => { console.log(`Setting Nickname Error: ${err}`); }); // change nickname
    });
    // members.each(member => {
    // });
}
function makeSpacemanRole(msgObj) {
    // Make the spaceman role which allows people to unumte themselves
    const guild = msgObj.guild;
    let spacemanRole = guild.roles.cache.find(role => role.name === 'Unfortunate Spaceman');
    if (!spacemanRole) {
        const permissions = new Discord.Permissions(Discord.Permissions.FLAGS.MUTE_MEMBERS);
        spacemanRole = guild.roles.create({
            data: {
                name: 'Unfortunate Spaceman',
                color: 'DARK_GREY',
                hoist: true,
                permissions: permissions,
            },
            reason: 'FOR THE SPACEMEN',
        })
            .then(acc => { console.log('Made Spaceman Role for the server...'); })
            .catch(rej => { console.log('Error creating Spaceman Role: ' + rej); });
    }
    else{
        return Promise.resolve(spacemanRole);
    }
    return spacemanRole;
}

const spaceman = {
    run: run,
    stop: stop,
    vars: variables,
};
module.exports = spaceman;
