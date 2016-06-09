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
    }
    return line.join(' ');
};

var createRLine = (rLine, distribution) => {
    let line = [];
    const rhymeWord = rLine.split(' ').slice(-2)[0];
    const rhymeWords = distribution[rhymeWord].rhymes;
    let newRhyme = rhymeWords[Math.floor(Math.random(rhymeWords.length))];

    line.push(newRhyme);
    while(true) {
        let firstWord = line[0];
        let newWords = distribution[firstWord].backward;
        let word = Math.floor(Math.random(newWords.length));
        if (word === '\n') {
            break;
        } else {
            line.push(word);
        }
        return line.join(' ');
    }

};

module.exports = {
    createLine: createLine,
    createRLine: createRLine
};
