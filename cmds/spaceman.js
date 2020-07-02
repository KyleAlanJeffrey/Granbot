const Discord = require('discord.js');

let spaceman = {
    muteAll: muteAll,
};

function muteAll(msgObj) {
    const spacemanRole = makeSpacemanRole(msgObj);
    const guild = msgObj.guild;
    // Iterate through the members in the channel the message came from and give spaceman role
    // const spacemanRole = guild.roles.cache.find(role => role.name === 'Unfortunate Spaceman');
    const voice_channel = msgObj.member.voice.channel;
    const members = voice_channel.members;
    members.each(member => {
        member.setNickname('Spaceman').catch(err => { console.log(`Setting Nickname Error: ${err}`) });
        member.voice.setMute(true);
        member.roles.add(spacemanRole).catch(err => { console.log(`Setting Role Error: ${(err)}`) });
        console.log('Muted & added role to user: ' + member.displayName);
    });
    let message_embed = new Discord.MessageEmbed();

}
function makeSpacemanRole(msgObj) {
    // Make the spaceman role which allows people to unumte themselves
    const guild = msgObj.guild;
    let spaceman_role = guild.roles.cache.find(role => role.name === 'Unfortunate Spaceman');
    if (!spaceman_role) {
        const permissions = new Discord.Permissions(Discord.Permissions.FLAGS.MUTE_MEMBERS);
        spaceman_role = guild.roles.create({
            data: {
                name: 'Unfortunate Spaceman',
                color: 'BLUE',
                hoist: true,
                permissions: permissions,
            },
            reason: 'FOR THE SPACEMEN',
        })
            .then(acc => { console.log('Made Spaceman Role for the server...'); })
            .catch(rej => { console.log('Error creating Spaceman Role: ' + rej); });
    }
    return spaceman_role;
}
module.exports = spaceman;
