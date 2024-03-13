const wordsUrl = 'utils/words.txt';

let availableWords = [];
fetch(wordsUrl)
  .then(response => response.text())
  .then(text => {
    availableWords = text.split(/\r?\n/);
    updateSuggestions();
});

function updateSuggestions() {
    const input = document.getElementById('inputLetters').value;
    const suggestions = findAnagrams(input, availableWords).filter(word => canSpellWord(input, word));
    displaySuggestions(suggestions);
}

function canSpellWord(letters, word) {
    const lettersCount = getLetterCount(letters);
    const wordCount = getLetterCount(word);
    for (let letter in wordCount) {
      if (!lettersCount[letter] || wordCount[letter] > lettersCount[letter]) {
        return false;
      }
    }
    return true;
}

function findAnagrams(letters, wordList) {
    const inputLetterCount = getLetterCount(letters);
    return wordList.filter(word => {
        const wordLetterCount = getLetterCount(word);
        for (let letter in wordLetterCount) {
            if (!inputLetterCount[letter] || wordLetterCount[letter] > inputLetterCount[letter]) {
                return false;
            }
        }
        return true;
    });
}

function isAnagram(str1, str2) {
  const cleanStr1 = str1.replace(/[^a-zA-Z]/g, '').toLowerCase();
  const cleanStr2 = str2.replace(/[^a-zA-Z]/g, '').toLowerCase();

  return cleanStr1.split('').sort().join('') === cleanStr2.split('').sort().join('');
}

function displaySuggestions(suggestions) {
  const suggestionsElement = document.getElementById('suggestions');
  suggestionsElement.innerHTML = '';
  suggestions.forEach(word => {
    const score = calculateScore(word);
    const listItem = document.createElement('li');
    listItem.className = 'word-item';
    listItem.textContent = `${word} (Score: ${score})`;
    suggestionsElement.appendChild(listItem);
  });
}

function getLetterCount(str) {
    const count = {};
    str.split('').forEach(letter => {
      count[letter] = (count[letter] || 0) + 1;
    });
    return count;
}

// Score function is placeholder until I figure out the real scoring system for now.
function calculateScore(word) {
    return word.length;
}