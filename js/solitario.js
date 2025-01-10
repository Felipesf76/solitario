document.addEventListener('DOMContentLoaded', function() {

  const suits = ['cir', 'cua', 'hex', 'viu']
  // const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  const values = ['1', '2', '3', '4']
  let initialDeck = []
  const lastCard = values.length

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
    initialDeck = createDeck(values, suits)

    initialDeck = shuffleDeck(initialDeck)

    initialGameBoard(initialDeck)
    // DROP CARD STROKE
    stockElement.ondragenter = function(e) { e.preventDefault(); }
    stockElement.ondragover = function(e) { e.preventDefault(); }
    stockElement.ondragleave = function(e) { e.preventDefault(); }
    stockElement.ondrop = dropCard

    // DROP CARD foundation 1
    foundation1Element.ondragenter = function(e) { e.preventDefault(); }
    foundation1Element.ondragover = function(e) { e.preventDefault(); }
    foundation1Element.ondragleave = function(e) { e.preventDefault(); }
    foundation1Element.ondrop = dropCardFoundation(foundation1Element, cardsFoundation1)

    // DROP CARD foundation 2
    foundation2Element.ondragenter = function(e) { e.preventDefault(); }
    foundation2Element.ondragover = function(e) { e.preventDefault(); }
    foundation2Element.ondragleave = function(e) { e.preventDefault(); }
    foundation2Element.ondrop = dropCardFoundation(foundation2Element, cardsFoundation2)
    // DROP CARD foundation 3
    foundation3Element.ondragenter = function(e) { e.preventDefault(); }
    foundation3Element.ondragover = function(e) { e.preventDefault(); }
    foundation3Element.ondragleave = function(e) { e.preventDefault(); }
    foundation3Element.ondrop = dropCardFoundation(foundation3Element, cardsFoundation3)
    // DROP CARD foundation 4
    foundation4Element.ondragenter = function(e) { e.preventDefault(); }
    foundation4Element.ondragover = function(e) { e.preventDefault(); }
    foundation4Element.ondragleave = function(e) { e.preventDefault(); }
    foundation4Element.ondrop = dropCardFoundation(foundation4Element, cardsFoundation4)

  }
  startGame()

  function createDeck(values, suits) {
    for (i = 0; i < values.length; i++) {
      for (j = 0; j < suits.length; j++) {
        let card = document.createElement('img');
        card.src = `../img/baraja/${values[i]}-${suits[j]}.png`;
        card.id = `${values[i]}-${suits[j]}`
        if (suits[j] === 'cua' || suits[j] === 'viu') {
          card.setAttribute('data-color', 'red')
        }else {
          card.setAttribute('data-color', 'black')
        }
        card.setAttribute('data-suit', suits[j]);
        card.setAttribute('data-value', values[i])
        card.classList.add('board-card');
        initialDeck.push(card);
      }
    }
    return initialDeck
  }

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
      initialDeck[i].ondragstart = in_movement
      boardElement.appendChild(initialDeck[i])
      count += 6
    }
    draggableCard(initialDeck)

    // stockElement.ondragenter = function(e) { e.preventDefault(); }
    // stockElement.ondragover = function(e) { e.preventDefault(); }
    // stockElement.ondragleave = function(e) { e.preventDefault(); }
    // stockElement.ondrop = dropCard

    // foundation1Element.ondragenter = function(e) { e.preventDefault(); }
    // foundation1Element.ondragover = function(e) { e.preventDefault(); }
    // foundation1Element.ondragleave = function(e) { e.preventDefault(); }
    // foundation1Element.ondrop = dropCardFoundation
  }

  function draggableCard(cardsArray) {
    for (i = 0; i < cardsArray.length; i++) {
      if (i === cardsArray.length - 1) {
        cardsArray[i].draggable = true
        cardsArray[i].ondragstart = in_movement
      }else {
        cardsArray[i].draggable = false
        cardsArray[i].ondragstart = null
      }
    }
  }

  function dropCard(event) {
    event.preventDefault();
    let cardId = event.dataTransfer.getData("text/plain/id")
    let suit = event.dataTransfer.getData("text/plain/suit")
    let value = event.dataTransfer.getData("text/plain/value")
    let card = document.getElementById(cardId)
    card.style.top = "30px"
    card.style.left = "30px"
    stockElement.appendChild(card)
    cardsStock.push(card)
    console.log(stockElement);

    setCounter(stockElement.firstElementChild ,cardsStock.length)
    initialDeck.pop()
    draggableCard(initialDeck)
  }

  function dropCardFoundation(element, cardsArray) {
    return function(event) {
      event.preventDefault();

      let cardId = event.dataTransfer.getData("text/plain/id")
      let suit = event.dataTransfer.getData("text/plain/suit")
      let value = event.dataTransfer.getData("text/plain/value")
      let color = event.dataTransfer.getData("text/plain/color")

      let card = document.getElementById(cardId)

      if (cardsArray.length == 0 && value == lastCard ) {
        card.style.top = "30px"
        card.style.left = "30px"
        element.appendChild(card)
        cardsArray.push(card)
        setCounter(element.firstElementChild, cardsArray.length)
        initialDeck.pop()
        draggableCard(initialDeck)
      }else if(cardsArray.length > 0 && value == lastCard - cardsArray.length && color ){
        card.style.top = "30px"
        card.style.left = "30px"
        element.appendChild(card)
        cardsArray.push(card)
        setCounter(element.firstElementChild, cardsArray.length)
        initialDeck.pop()
        decrementCounter(element.firstElementChild, cardsArray.length)
        draggableCard(initialDeck)
      }
    }
  }


  function in_movement(event) {
    event.dataTransfer.setData( "text/plain/suit", event.target.dataset["suit"] );
    event.dataTransfer.setData( "text/plain/id", event.target.id );
    event.dataTransfer.setData( "text/plain/value", event.target.dataset["value"] );
    event.dataTransfer.setData( "text/plain/color", event.target.dataset["color"] );
  }

  function setCounter(element, count) {
    element.textContent = count
  }
  function decrementCounter(counter) {

  }

})
