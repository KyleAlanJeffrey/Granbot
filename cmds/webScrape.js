const request = require('request-promise');
const cheerio = require('cheerio');

const randomWikiurl = 'https://en.wikipedia.org/wiki/special:random';
const url = 'https://en.wikipedia.org/wiki/apple';

let text = undefined;
async function randomWiki() {
    let title = undefined;
    const options = {
        uri: randomWikiurl,
        transform: function (body) {
            return cheerio.load(body);
        },
    };

    return request(options).then($ => {
        console.log(`-----Returning article on ${$('#firstHeading').text()}-----`);
        return $('p').text();
    });

    // text = $('#firstHeading').text();
    // console.log(`Returning webpage on: ${text}`);
    // text = $('p').text();
    // console.log(text);
    // title = $('#firstHeading').text();
    // return $('#firstHeading').text().then((res) => {
    //     return res;
    // }).catch(rej => { errorMsg(rej); });
}
function errorMsg(msg) {
    console.log(`Error ${(msg)}`);
}
const funcs = {
    randomWiki: randomWiki,
    text: text,
};
module.exports = funcs;