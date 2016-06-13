'use strict';
const MIN_LINE_LENGTH = 5;
const MAX_LINE_LENGTH = 8;
const sonnetFormat = [null, null, 0, 1, null, null, 4, 5, null, null, 8, 9, null, 12];

const filterNewLines = (words) => {
    return words.filter((word) => { return word !== '\n'; });
}
const onlyNewLines = (words) => {
    return words.filter((word) => { return word === '\n'; });
}

const hasNewLine = (words) => {
    return words.find((word) => { return word === '\n'});
}

const createLine = (distribution) => {
    let line = [];
    const firstWords = Object.keys(distribution).filter((word) => {
        return distribution[word]['backward'].indexOf('\n') !== -1;
    });
    const randomWordIdx = Math.floor(Math.random() * firstWords.length);
    const randomWord = firstWords[randomWordIdx];
    line.push(randomWord);

    while(line[line.length - 1] !== '\n') {
        const lastWord = line[line.length - 1];
        let nextWords = distribution[lastWord].forward;

        if (line.length < MIN_LINE_LENGTH) {
            nextWords = filterNewLines(nextWords);
        }

        if (line.length > MAX_LINE_LENGTH) {
            if (hasNewLine(nextWords)) {
                nextWords = onlyNewLines(nextWords);
            }
        }

        let nextWordsLength = nextWords.length;
        const newWordIndex = Math.floor(Math.random() * nextWordsLength);
        // if we have no possible next word, we will end the line
        let nextWord = nextWordsLength === 0 ? '\n' : nextWords[newWordIndex];
        line.push(nextWord);
    }

    return line.filter((char) => { return char !== '\n'; }).join(' ');
};

const createRLine = (rLine, distribution) => {
    let line = [];
    let lineCompleted = false;
    const rhymeWord = rLine.split(' ').slice(-1)[0];
    const rhymeWords = distribution[rhymeWord].rhymes;
    let newRhyme = rhymeWords[Math.floor(Math.random() * rhymeWords.length)];

    line.push(newRhyme);

    while(!lineCompleted) {
        let firstWord = line[0];
        let wordDist = Object.assign({}, distribution[firstWord]);
        let previousWords = wordDist.backward;

        if (line.length < MIN_LINE_LENGTH) {
            previousWords = filterNewLines(previousWords);
        }

        if (line.length > MAX_LINE_LENGTH) {
            if (hasNewLine(previousWords)) {
                previousWords = onlyNewLines(previousWords);
            }
        }
        const previousWordsLength = previousWords.length;
        // it is possible that we have no chioce but to terminate the line
        let word = previousWordsLength === 0 ? '\n' : previousWords[ Math.floor(Math.random() * previousWordsLength)];

        if (word === '\n') {
            lineCompleted = true;
        } else {
            line.unshift(word);
        }
    }
    return line.join(' ');

};

const generateNewSonnet = (distribution) => {
    var sonnet = [];
    for (let i = 0; i < sonnetFormat.length; i++) {
        if (sonnetFormat[i] === null) {
            sonnet.push(createLine(distribution));
        } else {
            sonnet.push(createRLine(sonnet[sonnetFormat[i]], distribution));
        }
    }
    return sonnet;
};

module.exports = {
    generateNewSonnet: generateNewSonnet,
};
