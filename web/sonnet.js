const processSonnet = require('../lib/parser');
const generator = require('../lib/generator');
// Sonnet Data From http://lib.ru/SHAKESPEARE/sonnets.txt
const SONNETS = require('./sonnets');
var distribution = {};

const sonnets = SONNETS.split('\n\n');
sonnets.forEach((sonnet) => {
    processSonnet(sonnet, distribution);
});

window.generateSonnet = () => {
    return generator.generateNewSonnet(distribution).join('\n\n');
};
