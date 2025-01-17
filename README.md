# Solitario Despliegue

Para ejecutar la aplicación correctamente se debe descargar el archivo solitario.zip o clonar el repositorio con el comando git clone https://github.com/Felipesf76/solitario en la terminal. Una vez clonado el repositorio, se debe iniciar el proyecto con un IDE como Visual Studio Code y ejecutar la extensión Live Server desde el archivo solitario.html.


Cabe destacar, que si se ejecuta el html sin en live Server no será posible visualizar las imágenes de las cartas. Si no es posible ejecutar el código desde live server, es necesario modificar la  función createDeck() del archivo solitario.js insertando el siguiente fragmento de código. 

```
function createDeck(values, suits) { 
    for (i = 0; i < values.length; i++) { 
      for (j = 0; j < suits.length; j++) { 
        let card = document.createElement('img'); 
        card.src = `../solitario/img/baraja/${values[i]}-${suits[j]}.png`; 
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

```

La diferencia es la forma en la que se define la ruta de las imágenes en la variable card.src. Al ejecutarlo desde el live server, la ruta relativa “../img/baraja/${values[i]}-${suits[j]}.png” permite acceder a las imágenes sin problemas. Sin embargo, al hacer doble click en el html (si ejecución del live server), es necesario agregar la ruta absoluta “../solitario/img/baraja/${values[i]}-${suits[j]}.png” para visualziar todas las imágenes. 
