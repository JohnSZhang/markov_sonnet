// rhyme scheme abab cdcd efef gg
var rhymeMap = {0:2, 1:3, 2:0, 3:1, 4:6, 5:7, 6:4, 7:5, 8:10, 9:11, 10:8, 11:9, 12:13, 13:12 }
var processSonnet = (sonnet, distribution) => {
    lines = sonnet.split('\n').filter((line) => {
        return line.length;
    });
    lines.forEach((line, idx, lines) => {
        if (line.length) {
            let words = line.split(' ').map((word) => {
                return word.toLowerCase().replace('!', '').replace('?', '').replace(',', '');
            });
            words.forEach((word, idx, words) => {
                let wordDist = distribution[word] || { 'forward': [], 'backward': [], 'rhymes': [] };
                const pWord = idx === 0 ? '\n' : words[idx - 1];
                const nWord = idx === words.length - 1 ? '\n' : words[idx + 1];
                const rWord= lines[rhymeMap[idx]].split(' ').slice(-1)[0];
                wordDist['backward'].push(pWord);
                wordDist['forward'].push(nWord);
                wordDist['rhymes'].push(rWord);
                distribution[word] = wordDist;
            });
        }
    });
};

module.exports = processSonnet;
