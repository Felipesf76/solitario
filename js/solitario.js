document.addEventListener('DOMContentLoaded', function() {

  const suits = ['cir', 'cua', 'hex', 'viu']
  const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  let initialDeck = []

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
        card.id = `${values[i]}-${suits[j]}`
        card.setAttribute('data-suit', suits[j]);
        card.setAttribute('data-value', values[i])
        card.classList.add('board-card');
        initialDeck.push(card);
      }
    }

    //TODO: shuffle deck
    initialDeck = shuffleDeck(initialDeck)

    //TODO: Put cards in board game
    initialGameBoard(initialDeck)

    //TODO: Logic for every foundation

    //TODO: Time counter

    // INPROGRESS

  }
  startGame()

  function shuffleDeck(initialDeck) {
    for (i = initialDeck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = initialDeck[i];
      initialDeck[i] = initialDeck[j];
      initialDeck[j] = temp;
    }
    return initialDeck
  }

  function initialGameBoard(initialDeck) {
    let count = 0
    for (i = 0; i < initialDeck.length; i++) {
      initialDeck[i].style.top = `${count}px`
      initialDeck[i].style.left = `${count}px`
      initialDeck[i].draggable = true
      initialDeck[i].ondragstart = in_movement
      boardElement.appendChild(initialDeck[i])
      count += 6
    }

    stockElement.ondragenter = function(e) { e.preventDefault(); }
    stockElement.ondragover = function(e) { e.preventDefault(); }
    stockElement.ondragleave = function(e) { e.preventDefault(); }
    stockElement.ondrop = dropCard

    foundation1Element.ondragenter = function(e) { e.preventDefault(); }
    foundation1Element.ondragover = function(e) { e.preventDefault(); }
    foundation1Element.ondragleave = function(e) { e.preventDefault(); }
    foundation1Element.ondrop = dropCardFoundation

  }

  function dropCard(event) {
    event.preventDefault();
    let cardId = event.dataTransfer.getData("text/plain/id")
    let suit = event.dataTransfer.getData("text/plain/suit")
    let value = event.dataTransfer.getData("text/plain/value")
    let card = document.getElementById(cardId)
    card.style.top = "30px"
    card.style.left = "30px"
    stockElement.appendChild(document.getElementById(cardId))
    cardsStock.push(card)
    initialDeck.pop()
  }

  function dropCardFoundation(event) {
    event.preventDefault();
    console.log(event.target)
    let cardId = event.dataTransfer.getData("text/plain/id")
    let suit = event.dataTransfer.getData("text/plain/suit")
    let value = event.dataTransfer.getData("text/plain/value")
    let card = document.getElementById(cardId)
    if (12 == value) {
      card.style.top = "30px"
      card.style.left = "30px"
      foundation1Element.appendChild(document.getElementById(cardId))
      foundation1Element.push(card)
      initialDeck.pop()
    }
  }


  function in_movement(event) {
    event.dataTransfer.setData( "text/plain/suit", event.target.dataset["suit"] );
    event.dataTransfer.setData( "text/plain/id", event.target.id );
    event.dataTransfer.setData( "text/plain/value", event.target.dataset["value"] );

  }

})
