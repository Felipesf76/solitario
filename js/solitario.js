document.addEventListener('DOMContentLoaded', function() {

  const suits = ['cir', 'cua', 'hex', 'viu']
  const values = [1 ,2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]


  /**
   * Obtener el número mayor de los valores de las cartas
   * @param {Array} values número de cartas
   * @returns El número mayor en el arreglo de números
   */
  function getGreatestNumber(values) {
    return Math.max(...values.map(Number));
  }


  // Obtencion de los elementos del html, a trevés del ID
  const greatestNumber = getGreatestNumber(values)
  const boardElement = document.getElementById('board')
  const stockElement = document.getElementById('stock')
  const foundation1Element = document.getElementById('foundation1')
  const foundation2Element = document.getElementById('foundation2')
  const foundation3Element = document.getElementById('foundation3')
  const foundation4Element = document.getElementById('foundation4')
  const movementsElement = document.getElementById('movements')
  const timeElement = document.getElementById('time')
  const modalElement = document.getElementById('modal');
  const closeModalElement = document.getElementsByClassName('closeModal')[0];
<<<<<<< HEAD
=======

>>>>>>> b6fe56be78e2a0171d21dfc988bba783cdd159d3


  // Inicialización de los arreglos para el manejo de los contadores en cada tablero
  let movements = 0 // Contador en 0
  let initialDeck = []
  let cardsFoundation1 = []
  let cardsFoundation2 = []
  let cardsFoundation3 = []
  let cardsFoundation4 = []
  let cardsStock = []


  /**
   * Genera el inicio del juego, así como el tiempo
   */
  function startGame() {

    // Creación de la estructura del juego
    initialDeck = createDeck(values, suits)
    initialDeck = shuffleDeck(initialDeck)
    initialGameBoard(initialDeck)

    // Inicio del tiempo
    startTime()

<<<<<<< HEAD
    // Tableros escuchando el evento drop
    listenerDropCard(stockElement, cardsStock)
    listenerDropCard(foundation1Element, cardsFoundation1)
    listenerDropCard(foundation2Element, cardsFoundation2)
    listenerDropCard(foundation3Element, cardsFoundation3)
    listenerDropCard(foundation4Element, cardsFoundation4)
=======
    startTime()

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
>>>>>>> b6fe56be78e2a0171d21dfc988bba783cdd159d3

    // Escucha el evento click para reiniciar el juego
    document.getElementById('reboot').addEventListener('click', reboot)
<<<<<<< HEAD
    // Escucha el evento click para cerrar el modal y reiniciar la partida
    closeModalElement.addEventListener('click', closeModal);
    // Cerrar el modal si el usuario hace clic fuera del contenido del modal
    window.onclick = function(event) {
      if (event.target === modalElement) {
          closeModal();
      }
    }
=======
    
  }
  startGame()


  function moveStockToBoard(){
      initialDeck = cardsStock
      initialGameBoard(initialDeck)
      cardsStock = []
      setCounter(document.getElementById("counter_stock"), cardsStock.length)
>>>>>>> b6fe56be78e2a0171d21dfc988bba783cdd159d3
  }

  startGame()


  /**
   * Obtiene los valores de las cartas y los palos para generar la baraja completa
   * @param {Array} values Número de cartas
   * @param {Array} suits Cantidad de palos de la baraja
   * @returns Array de la baraja
   */
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


  /**
   * Obtiene la baraja completa y la ordena aleatoriamente
   * @param {Array} initialDeck Arreglo de cartas
   * @returns Array de cartas ordenada aleatoriamente
   */
  function shuffleDeck(initialDeck) {
    for (i = initialDeck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = initialDeck[i];
      initialDeck[i] = initialDeck[j];
      initialDeck[j] = temp;
    }
    return initialDeck
  }


  /**
   * Genera la estructura de la baraja y las inserta en el tablero
   * @param {Array} initialDeck Arreglo de cartas ordenadas aleatoriamente
   */
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

  /**
   * Genera las propiedades de las cartas dejando la última draggable
   * @param {Array} cardsArray Array de las cartas en la baraja
   */
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


  /**
   * Agrega los valores deseados al evento
   * @param {evento} event Evento de arrastrar de la carta
   */
  function in_movement(event) {
    event.dataTransfer.setData("text/plain/id", event.target.id)
    event.dataTransfer.setData("text/plain/value", event.target.dataset["value"] )
    event.dataTransfer.setData("text/plain/color", event.target.dataset["color"] )
    event.dataTransfer.setData("text/plain/elementId", event.target.parentElement.id )
  }

  /**
   * Prepara el elemento para escuchar los eventos referentes al drop
   * @param {elemento HTML} element elemento al que hace referencia
   * @param {Array} cardsArray Arreglo de los elementos hijos
   */
  function listenerDropCard(element, cardsArray) {
    element.ondragenter = function(e) { e.preventDefault(); }
    element.ondragover = function(e) { e.preventDefault(); }
    element.ondragleave = function(e) { e.preventDefault(); }
    element.ondrop = dropCardAction(element, cardsArray)
  }

  /**
   * 1. Evalua si el elemento HTML foundation o stock puede recibir la carta
   * 2. Se agrega la carta (elemento HTML) en el tablero correspondiente
   * 3. Modifica los contadores de los tableros de acuerdo a la cantidad de cartas
   * @param {elemento HTML} element elemento al que hace referencia
   * @param {Array} cardsArray Arreglo de los elementos hijos
   * @returns
   */
  function dropCardAction(element, cardsArray) {
    return function(event) {
      event.preventDefault();
      let cardId = event.dataTransfer.getData("text/plain/id")
      let value = event.dataTransfer.getData("text/plain/value")
      let color = event.dataTransfer.getData("text/plain/color")
      let elementId = event.dataTransfer.getData("text/plain/elementId")
      let card = document.getElementById(cardId)
      if (cardsArray.length == 0 && value == greatestNumber || element.id == "stock") {
        card.style.top = "30px"
        card.style.left = "30px"
        element.appendChild(card)
        cardsArray.push(card)
        element.id == "stock" ? card.draggable = true : card.draggable = false
        setCounter(element.firstElementChild, cardsArray.length)
        decrementCounter(elementId)
        draggableCard(initialDeck)
        setCounter(movementsElement , ++movements)
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
          setCounter(movementsElement , ++movements)
        }
      }
    }
  }


  /**
   * Asigna el valor count a la propiedad del elemento
   * @param {elemento HTML} element
   * @param {entero} count
   */
  function setCounter(element, count) {
    element.textContent = count
  }

  /**
   * Verifica el elemento HTML si hace parte del tablero o stock para eliminarlo
   * @param {elemento HTML} element
   */
  function decrementCounter(element) {
    if (element == 'board') {
      initialDeck.pop()
      setCounter(document.getElementById("counter_board"), initialDeck.length)
<<<<<<< HEAD
      validateGame(initialDeck.length)
=======
      
      if (
        (initialDeck.length == 0) 
        && (document.getElementById('counter_foundation1').textContent == greatestNumber)
        && (document.getElementById('counter_foundation2').textContent == greatestNumber)
        && (document.getElementById('counter_foundation3').textContent == greatestNumber)
        && (document.getElementById('counter_foundation4').textContent == greatestNumber)
        ){
        
          openModal();
        
      }else if (initialDeck.length == 0) {
        moveStockToBoard ()    
      }

>>>>>>> b6fe56be78e2a0171d21dfc988bba783cdd159d3
    }else {
      cardsStock.pop()
      setCounter(document.getElementById("counter_stock"), cardsStock.length)
    }
  }


<<<<<<< HEAD
  /**
   * Valida si el juego terminó o si se debe barajar las cartas del stock
   * @param {entero} boardLength
   */
  function validateGame(boardLength) {
    if (
      (initialDeck.length == 0)
      && (document.getElementById('counter_foundation1').textContent == greatestNumber)
      && (document.getElementById('counter_foundation2').textContent == greatestNumber)
      && (document.getElementById('counter_foundation3').textContent == greatestNumber)
      && (document.getElementById('counter_foundation4').textContent == greatestNumber)
      ){
      openModal();
    }else if (initialDeck.length == 0) {
      moveStockToBoard()
    }
  }
=======
  function startTime(){
>>>>>>> b6fe56be78e2a0171d21dfc988bba783cdd159d3

  /**
   * Mueve las cartas del stock al tablero
   */
  function moveStockToBoard(){
    initialDeck = initialDeck.concat(cardsStock)
    cardsStock.splice(0)
    setCounter(document.getElementById("counter_stock"), cardsStock.length)
    initialGameBoard(initialDeck)
  }

  /**
   * Abre el modal para mostrar el resultado del juego
   */
  function openModal() {
    modalElement.style.display = 'block';
    stopTimeAndMovements();
  }

  /**
   * Muestra los resultados de la partida
   */
  function stopTimeAndMovements() {
    clearInterval(timer);
    setCounter(document.getElementById('timeWinner'), timeElement.textContent)
    movementsWinner = movements;
    setCounter(document.getElementById('movementsWinner'), ++movementsWinner)
  }

  /**
   * Cierra el modal
   */
  function closeModal() {
    modalElement.style.display = 'none';
    reboot();
  }


  /**
   * Inicia el contador de tiempo
   */
  function startTime(){
    seconds = 0;
    timer = '';
    if (timer) clearInterval(timer);
      let hms = function (){
        let sec = Math.trunc( seconds % 60 );
        let min = Math.trunc( (seconds % 3600) / 60 )
        let hou = Math.trunc( (seconds % 86400) / 3600 )
        let time = ( (hou<10)? "0"+hou : ""+hou )
              + ":" + ( (min<10)? "0"+min : ""+min )
              + ":" + ( (sec<10)? "0"+sec : ""+sec )
        setCounter(document.getElementById("time"), time)
              seconds++
      }

      hms(); // Primera visualización 00:00:00
    timer = setInterval(hms, 1000);

  }

<<<<<<< HEAD
  /**
  * Reinicia el juego inicializando los valores
  */
=======
  function stopTimeAndMovements() {
    clearInterval(timer); 
    setCounter(document.getElementById('timeWinner'), timeElement.textContent)
    movementsWinner = movements;
    setCounter(document.getElementById('movementsWinner'), ++movementsWinner)
  }


>>>>>>> b6fe56be78e2a0171d21dfc988bba783cdd159d3
  function reboot() {
    images = boardElement.querySelectorAll('img');
    images.forEach(img => img.remove());

    images = stockElement.querySelectorAll('img')
    images.forEach(img => img.remove());

    images = foundation1Element.querySelectorAll('img')
    images.forEach(img => img.remove());

    images = foundation2Element.querySelectorAll('img')
    images.forEach(img => img.remove());

    images = foundation3Element.querySelectorAll('img')
    images.forEach(img => img.remove());

    images = foundation4Element.querySelectorAll('img')
    images.forEach(img => img.remove());

    // Reinicia las variables del juego
    initialDeck = [];
    cardsFoundation1 = [];
    cardsFoundation2 = [];
    cardsFoundation3 = [];
    cardsFoundation4 = [];
    cardsStock = [];
    movements = 0

    // Reinicia los contadores de cartas,
    setCounter(document.getElementById('counter_board'), greatestNumber)
    setCounter(document.getElementById('counter_stock'), 0)
    setCounter(document.getElementById('counter_foundation1'), 0)
    setCounter(document.getElementById('counter_foundation2'), 0)
    setCounter(document.getElementById('counter_foundation3'), 0)
    setCounter(document.getElementById('counter_foundation4'), 0)

    //reinicia contadores de movimientos
    movements = 0 
    setCounter(movementsElement, movements);

    //reinicia tiempo
    clearInterval(timer);
    setCounter(document.getElementById("time"), "00:00:00");

    // Reinicia el juego
    startGame();
  }

    
  function openModal() {
    modalElement.style.display = 'block';
    stopTimeAndMovements();
  }


  function closeModal() {
    modalElement.style.display = 'none';
    reboot();   
  }
  closeModalElement.addEventListener('click', closeModal);


  // Cerrar el modal si el usuario hace clic fuera del contenido del modal
  window.onclick = function(event) {
      if (event.target === modalElement) {
          closeModal();
      }
  }

})
