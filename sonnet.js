const processSonnet = require('./parser');
const generator = require('./generator');
var distribution = {};
fs = require('fs');
// Sonnet Data From http://lib.ru/SHAKESPEARE/sonnets.txt
const sonnetFormat = [null, null, 0, 1, null, null, 4, 5, null, null, 8, 9, null, 12];

var generateNewSonnet = (distribution) => {
    var sonnet = [];
    for (let i = 0; i < sonnetFormat.length; i++) {
        if (sonnetFormat[i] === null) {
            sonnet.push(generator.createLine(distribution));
        } else {
            sonnet.push(generator.createRLine(sonnet[sonnetFormat[i]], distribution));
        }
    }
    return sonnet;
};

fs.readFile('./data/sonnets.txt', 'utf8', (error, data) => {
    if (error) {
        throw (error);
    }
    // each sonnet is separated by 2 blank lines
    const sonnets = data.split('\n\n');
    sonnets.forEach((sonnet) => {
        processSonnet(sonnet, distribution);
    });
    /*console.log(distribution);
    /*console.log(generateNewSonnet(distribution));*/
    console.log(generateNewSonnet(distribution).join('\n'));
});
