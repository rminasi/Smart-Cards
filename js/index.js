const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
const cardsWrapper = document.querySelector('.cards-wrapper');
const cards = [];

function createCards() {
  // Create an array with objects containing the value and the suit of each card
  suits.forEach(suit => {
    for (let i = 1; i <= 13; i += 1) {
      const cardObject = {
        value: i,
        suit,
      };
      cards.push(cardObject);
    }
  });
  // For each dataObject, create a new card and append it to the DOM
}

function renderCards() {
  cards.forEach((card, i) => {
    const positionFromLeft = i * 30;
    const cardElement = document.createElement('div');
    cardElement.setAttribute('data-value', card.value);
    cardElement.classList.add('card', `${card.suit}-${card.value}`);
    cardElement.style.left = `${positionFromLeft}px`;
    cardsWrapper.append(cardElement);
  });
}

function shuffleCards() {
  let currentIndex = cards.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
  renderCards();
}

function showHideCards() {
  const cardsElement = document.getElementsByClassName('cards-wrapper');
  cardsElement[0].classList.toggle('hidden');
}

function magicCards() {
  cards.sort(function suitIndex(a, b) {
    const aSuitIndex = suits.indexOf(a.suit);
    const bSuitIndex = suits.indexOf(b.suit);
    if (aSuitIndex === bSuitIndex) {
      return a.value - b.value;
    }
    return aSuitIndex - bSuitIndex;
  });
  renderCards();
}

function createButtons() {
  // Removing the start button and adding 3 new ones
  document.getElementById('start-game').remove();

  const buttonsElement = document.getElementById('buttons');
  buttonsElement.innerHTML = `
    <button type="button" id="shuffle" class="btn btn-lg btn-secondary">Shuffle</button>
    <button type="button" id="show-hide" class="btn btn-lg btn-secondary ml-5">Show/Hide</button>
    <button type="button" id="magic" class="btn btn-lg btn-secondary ml-5">Magic</button>
  `;
  document.getElementById('shuffle').addEventListener('click', shuffleCards);
  document.getElementById('show-hide').addEventListener('click', showHideCards);
  document.getElementById('magic').addEventListener('click', magicCards);
}

// Function to start the game by clearing the wrapper, creating
// and appending the buttons and all the cards to the DOM
function startGame() {
  createButtons();
  createCards();
}

document.getElementById('start-game').addEventListener('click', startGame);
