fs = require('fs');

var distribution = {};

var processSonnet = (sonnet) => {
    sonnet.split('\n').forEach((line) => {
        if (line.length) {
            let words = line.split(' ').map((word) => {
                return word.toLowerCase().replace('!', '').replace('?', '').replace(',', '');
            });
            words.forEach((word, idx, words) => {
                let wordDist = distribution[word] || { 'forward': [], 'backward': []};
                const pWord = idx === 0 ? '\n' : words[idx - 1];
                const nWord = idx === words.length - 1 ? '\n' : words[idx + 1];
                wordDist['backward'].push(pWord);
                wordDist['forward'].push(nWord);
                distribution[word] = wordDist;
            });
        }
    });
}

fs.readFile('./data/sonnets.txt', 'utf8', (error, data) => {
    if (error) {
        throw (error);
    }
    // each sonnet is separated by 2 blank lines
    const sonnets = data.split('\n\n');
    sonnets.forEach((sonnet) => {
        processSonnet(sonnet);
    });
    console.log(createLine(distribution));
});

var createLine = (distribution) => {
    let line = [];
    const firstWords = Object.keys(distribution).filter((word) => {
        return distribution[word]['backward'].indexOf('\n') !== -1;
    });
    line.push(firstWords[Math.floor(Math.random() * firstWords.length)]);
    while(line[line.length - 1] !== '\n') {
        const lastWord = line[line.length - 1];
        let nextWords = distribution[lastWord].forward;
        let nextWord = nextWords[Math.floor(Math.random(firstWords.length))];
        line.push(nextWord);
        console.log(line);
    }
    return line.join(' ');
}
