'use strict';
// rhyme scheme abab cdcd efef gg
const rhymeMap = {0:2, 1:3, 2:0, 3:1, 4:6, 5:7, 6:4, 7:5, 8:10, 9:11, 10:8, 11:9, 12:13, 13:12 }
const processWord = (word) => {
    // inefficient, strip out everything to make the words match more easily
    return word.toLowerCase().replace(/[^a-z]/g,'');
};

const getRhymeWord = (line) => {
    return processWord(line.split(' ').splice(-1)[0]);
}

const processSonnet = (sonnet, distribution) => {
    let lines = sonnet.split('\n').filter((line) => {
        return line.length;
    });

    lines.forEach((line, lineIdx, lines) => {
        if (line.length) {
            let words = line.split(' ').map(processWord);

            words.forEach((word, idx, words) => {
                let wordDist = distribution[word] || { 'forward': [], 'backward': [], 'rhymes': [] };
                const pWord = idx === 0 ? '\n' : words[idx - 1];
                const nWord = idx === words.length - 1 ? '\n' : words[idx + 1];

                if (idx === words.length - 1) {
                    // if we are processing the last word in the line then it must rhyme
                    const rhymeLine = lines[rhymeMap[lineIdx]];
                    const rWord= getRhymeWord(rhymeLine);
                    wordDist['rhymes'].push(rWord);
                }

                wordDist['backward'].push(pWord);
                wordDist['forward'].push(nWord);
                distribution[word] = wordDist;
            });

        }

    });
};

module.exports = processSonnet;
