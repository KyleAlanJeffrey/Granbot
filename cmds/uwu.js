let uwuify = {
    custom: function (str, msg, data, Discord) {
        let datalet = Object.values(data);
        if (str.slice(-1) == " ") str = str.substring(0, str.length - 1);

        for (let loop = 0; loop < datalet[1].length; loop++) {
            for (let j = 0; j < datalet[1][loop][0].length; j++) {
                while (str.includes(datalet[1][loop][0][j])) {
                    str = str.replace(datalet[1][loop][0][j], datalet[1][loop][1]);
                }
            }
        }

        for (let loop = 0; loop < datalet[2].length; loop++) {
            for (let j = 0; j < datalet[2][loop][0].length; j++) {
                while (str.includes(datalet[2][loop][0][j])) {
                    str = str.replace(datalet[2][loop][0][j], datalet[2][loop][1][Math.floor(Math.random() * datalet[2][loop][1].length)]);
                }
            }
        }

        str = str.replace(/(?:r|l)/g, "w");
        str = str.replace(/(?:R|L)/g, "W");
        str = str.replace(/n([aeiou])/g, "ny$1");
        str = str.replace(/N([aeiou])/g, "Ny$1");
        str = str.replace(/N([AEIOU])/g, "NY$1");
        str = str.replace(/ove/g, "uv");

        if (str[0].match(/[a-z]/i))
            str = str[0] + "-" + str;

        if (str[str.length - 1].match(/[a-z]/i))
            str = str + "\~\~";

        let uwuembed = new Discord.MessageEmbed();
        uwuembed.setDescription(str);
        uwuembed.setColor(16761576);
        // uwuembed.setFooter("Requested by " + msg.author.tag + " | @mention me to uwu-ify msgs", msg.author.avatarURL());
        msg.channel.send(str, { tts: true })
            .then(res => console.log('UwUified a message'))
            .catch(err => console.log('Error: ' + err));
    },
};

module.exports = uwuify;