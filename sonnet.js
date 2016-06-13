'use strict';
const processSonnet = require('./lib/parser');
const generator = require('./lib/generator');
let distribution = {};
const fs = require('fs');
// Sonnet Data From http://lib.ru/SHAKESPEARE/sonnets.txt
const sonnetFormat = [null, null, 0, 1, null, null, 4, 5, null, null, 8, 9, null, 12];

fs.readFile('./data/sonnets.txt', 'utf8', (error, data) => {
    if (error) {
        throw (error);
    }
    const sonnets = data.split('\n\n');
    sonnets.forEach((sonnet) => {
        processSonnet(sonnet, distribution);
    });
    console.log(generator.generateNewSonnet(distribution).join('\n'));
});
