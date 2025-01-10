document.addEventListener('DOMContentLoaded', function() {

  const suits = ['cir', 'cua', 'hex', 'viu']
  // const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  const values = [1, 2, 3, 4]

  // Convert strings to numbers and find the max
  function getGreatestNumber(values) {
    return Math.max(...values.map(Number));
  }
  const greatestNumber = getGreatestNumber(values)


  const boardElement = document.getElementById('board')
  const stockElement = document.getElementById('stock')
  const foundation1Element = document.getElementById('foundation1')
  const foundation2Element = document.getElementById('foundation2')
  const foundation3Element = document.getElementById('foundation3')
  const foundation4Element = document.getElementById('foundation4')
  const movementsElement = document.getElementById('movements')

  let initialDeck = []
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

    //TODO: Move cards from stock to board

    starttime()
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
    setCounter(boardElement.firstElementChild, initialDeck.length)
    draggableCard(initialDeck)
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
    let elementId = event.dataTransfer.getData("text/plain/elementId")
    let card = document.getElementById(cardId)
    card.style.top = "30px"
    card.style.left = "30px"
    stockElement.appendChild(card)
    cardsStock.push(card)

    setCounter(stockElement.firstElementChild ,cardsStock.length)
    setCounter(document.getElementById("movements") ,cardsStock.length)
    decrementCounter(elementId)
    draggableCard(initialDeck)
  }

  function dropCardFoundation(element, cardsArray) {
    return function(event) {
      event.preventDefault();

      let cardId = event.dataTransfer.getData("text/plain/id")
      let suit = event.dataTransfer.getData("text/plain/suit")
      let value = event.dataTransfer.getData("text/plain/value")
      let color = event.dataTransfer.getData("text/plain/color")
      let elementId = event.dataTransfer.getData("text/plain/elementId")
      let card = document.getElementById(cardId)

      if (cardsArray.length == 0 && value == greatestNumber ) {
        card.style.top = "30px"
        card.style.left = "30px"
        element.appendChild(card)
        cardsArray.push(card)
        card.draggable = false
        setCounter(element.firstElementChild, cardsArray.length)
        decrementCounter(elementId)
        draggableCard(initialDeck)
        incrementCounter(element.firstElementChild, cardsArray.length)
        cardsStock.push(card)
        setCounter(document.getElementById("movements") ,cardsStock.length)
      }else if(cardsArray.length > 0 && value == greatestNumber - cardsArray.length ){
        let colorCardsArray = cardsArray[cardsArray.length-1].getAttribute('data-color')

        if (colorCardsArray != color){
          card.style.top = "30px"
          card.style.left = "30px"
          element.appendChild(card)
          cardsArray.push(card)
          card.draggable = false
          setCounter(element.firstElementChild, cardsArray.length)
          decrementCounter(elementId)
          draggableCard(initialDeck)
          cardsStock.push(card)
          setCounter(document.getElementById("movements") ,cardsStock.length)
        }
      }
    }
  }


  function in_movement(event) {
    event.dataTransfer.setData( "text/plain/suit", event.target.dataset["suit"] );
    event.dataTransfer.setData( "text/plain/id", event.target.id );
    event.dataTransfer.setData( "text/plain/value", event.target.dataset["value"] );
    event.dataTransfer.setData( "text/plain/color", event.target.dataset["color"] );
    event.dataTransfer.setData( "text/plain/elementId", event.target.parentElement.id );
  }

  function setCounter(element, count) {
    element.textContent = count
  }
  function decrementCounter(element) {
    if (element == 'board') {
      initialDeck.pop()
      setCounter(document.getElementById("counter_board"), initialDeck.length)
    }else {
      cardsStock.pop()
      setCounter(document.getElementById("counter_stock"), cardsStock.length)
    }
  }

  function starttime(){

    seconds = 0;
    timer = '';
    if (timer) clearInterval(timer);
      let hms = function (){
        let sec = Math.trunc( seconds % 60 );
        let min = Math.trunc( (seconds % 3600) / 60 );
        let hou = Math.trunc( (seconds % 86400) / 3600 );
        let time = ( (hou<10)? "0"+hou : ""+hou )
              + ":" + ( (min<10)? "0"+min : ""+min )
              + ":" + ( (sec<10)? "0"+sec : ""+sec );
        setCounter(document.getElementById("time"), time)
              seconds++;
      }

      hms(); // Primera visualización 00:00:00
    timer = setInterval(hms, 1000);

  }

  function reboot() {
    location.reload();
  }

  window.onload = function() {
    document.getElementById('reboot').addEventListener('click', reboot);
  }


})
