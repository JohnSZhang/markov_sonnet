var MIN_LINE_LENGTH = 4;
var createLine = (distribution) => {
    let line = [];

    const firstWords = Object.keys(distribution).filter((word) => {
        return distribution[word]['backward'].indexOf('\n') !== -1;
    });
    const randomWordIdx = Math.floor(Math.random() * firstWords.length);
    const randomWord = firstWords[randomWordIdx];
    line.push(randomWord);

    while(line[line.length - 1] !== '\n') {
        console.log(line);
        const lastWord = line[line.length - 1];
        let nextWords = distribution[lastWord].forward;
        console.log(distribution[lastWord]);
        if (line.length < MIN_LINE_LENGTH) {
            nextWords = nextWords.filter((word) => { return word !== '\n'; });
        }
        let nextWordsLength = nextWords.length;
        console.log('next words length', nextWordsLength);
        console.log(nextWords);
        let nextWord = nextWords[Math.floor(Math.random() * nextWordsLength)];
        line.push(nextWord);
    }
    return line.filter((char) => { return char !== '\n'; }).join(' ');
};

var createRLine = (rLine, distribution) => {
    let line = [];
    const rhymeWord = rLine.split(' ').slice(-1)[0];
    const rhymeWords = distribution[rhymeWord].rhymes;
    console.log('rhyme word', rhymeWord);
    console.log('rhyme words', rhymeWords);
    let newRhyme = rhymeWords[Math.floor(Math.random() * rhymeWords.length)];

    line.push(newRhyme);
    var lineCompleted = false;
    while(!lineCompleted) {
        let firstWord = line[0];
        let wordDist = Object.assign({}, distribution[firstWord]);
        console.log('first word', firstWord);
        console.log('previous words', wordDist.backward);
        let previousWords = wordDist.backward;
        if (line.length < MIN_LINE_LENGTH) {
            previousWords = previousWords.filter((word) => { return word !== '\n'; });
        }
        var previousWordsLength = previousWords.length;
        console.log(previousWords.length);
        let word = previousWords[ Math.floor(Math.random() * previousWordsLength)];
        if (word === '\n') {
            lineCompleted = true;
        } else {
            line.unshift(word);
        }
    }
    return line.join(' ');

};

module.exports = {
    createLine: createLine,
    createRLine: createRLine
};
