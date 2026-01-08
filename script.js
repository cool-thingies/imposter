const setupScreen = document.getElementById('setup-screen');
const playerScreen = document.getElementById('player-screen');
const startButton = document.getElementById('start-game');
const playerPrompt = document.getElementById('player-prompt');
const revealButton = document.getElementById('reveal-button');
const revealText = document.getElementById('reveal-text');
const gotItButton = document.getElementById('got-it');
let words = [];
let playerCount = 0;
let imposterCount = 0;
let currentPlayer = 1;
let secretWord = '';
let imposters = new Set();

startButton.addEventListener('click', () => {
  playerCount = parseInt(document.getElementById('player-count').value);
  imposterCount = parseInt(document.getElementById('imposter-count').value);

  if (playerCount < 3 || imposterCount < 1 || imposterCount >= playerCount) {
    alert('Check player and imposter counts!');
    return;
  }

  const raw = document.getElementById('word-list').value.trim();
  words = raw.split('\n').map(w => w.trim()).filter(w => w.length > 0);

  if (words.length === 0) {
    alert('Enter at least one word/phrase!');
    return;
  }

  // Pick random secret word
  secretWord = words[Math.floor(Math.random() * words.length)];

  // Pick random imposters
  imposters = new Set();
  while (imposters.size < imposterCount) {
    imposters.add(Math.floor(Math.random() * playerCount) + 1);
  }

  currentPlayer = 1;
  setupScreen.classList.add('hidden');
  playerScreen.classList.remove('hidden');
  updatePlayerPrompt();
});

function updatePlayerPrompt() {
  playerPrompt.textContent = `Player ${currentPlayer}`;
  revealButton.classList.remove('invisible');
  revealText.classList.add('invisible');
  revealText.textContent = '';
  gotItButton.classList.add('invisible');
}

revealButton.addEventListener('click', () => {
  revealButton.classList.add('invisible');
  revealText.classList.remove('invisible');
  gotItButton.classList.remove('invisible');
  revealText.classList.remove('reveal-imposter', 'reveal-word');

  if (imposters.has(currentPlayer)) {
    revealText.textContent = 'IMPOSTER';
    revealText.classList.add('reveal-imposter');
  } else {
    revealText.textContent = secretWord;
    revealText.classList.add('reveal-word');
  }
});

gotItButton.addEventListener('click', () => {
  currentPlayer++;
  if (currentPlayer > playerCount) {
    // Game over - back to start
    setupScreen.classList.remove('hidden');
    playerScreen.classList.add('hidden');
    // Optional: clear textarea or not — your choice
  } else {
    updatePlayerPrompt();
  }
});
