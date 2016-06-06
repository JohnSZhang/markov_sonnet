const processSonnet = require('./parser');
const generator = require('./generator');
var distribution = {};
fs = require('fs');
// Sonnet Data From http://lib.ru/SHAKESPEARE/sonnets.txt
fs.readFile('./data/sonnets.txt', 'utf8', (error, data) => {
    if (error) {
        throw (error);
    }
    // each sonnet is separated by 2 blank lines
    const sonnets = data.split('\n\n');
    sonnets.forEach((sonnet) => {
        processSonnet(sonnet, distribution);
    });
    let line = generator.createLine(distribution);
    let rLine = generator.createRLine(line, distribution);
    console.log(line);
    console.log(rLine);
});
