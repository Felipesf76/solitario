document.addEventListener('DOMContentLoaded', function() {

  const suits = ['cir', 'cua', 'hex', 'viu']
  const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  const initialDeck = []

  const boardElement = document.getElementById('board')
  const stockElement = document.getElementById('stock')
  const foundation1Element = document.getElementById('foundation1')
  const foundation2Element = document.getElementById('foundation2')
  const foundation3Element = document.getElementById('foundation3')
  const foundation4Element = document.getElementById('foundation4')

  const cardsFoundation1 = []
  const cardsFoundation2 = []
  const cardsFoundation3 = []
  const cardsFoundation4 = []
  const cardsStock = []


  function startGame() {
    // Creation of deck structure
    for (i = 0; i < values.length; i++) {
      for (j = 0; j < suits.length; j++) {
        let card = document.createElement('img');
        card.src = `../img/baraja/${values[i]}-${suits[j]}.png`;
        card.classList.add('board-card');
        initialDeck.push(card);
      }
    }

    boardElement.appendChild(initialDeck[0]);
    //TODO: shuffle deck

    //TODO: Put cards in board game

    //TODO: Logic for every foundation

    //TODO: Time counter

  }

  startGame();
})
