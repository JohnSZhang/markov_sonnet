var createLine = (distribution) => {
    let line = [];

    const firstWords = Object.keys(distribution).filter((word) => {
        return distribution[word]['backward'].indexOf('\n') !== -1;
    });
    console.log(firstWords);
    console.log(firstWords.length);
    const randomWordIdx = Math.floor(Math.random() * firstWords.length);
    console.log(randomWordIdx);
    const randomWord = firstWords[randomWordIdx];
    console.log(randomWord);
    line.push(randomWord);

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
    var lineCompleted = false;
    while(!lineCompleted) {
        let firstWord = line[0];
        let previousWords = distribution[firstWord].backward;
        let word = previousWords[ Math.floor(Math.random(previousWords.length))];
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
