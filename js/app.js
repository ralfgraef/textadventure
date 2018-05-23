// ButtonGame
buttonGame.addEventListener("click", clickHandler, false)

// ButtonStart
buttonStart.addEventListener("click", off, false)

// ButtonReStart
buttonReStart.addEventListener("click", offGameOverScreen, false)

// ButtonReStart
buttonClose.addEventListener("click", GameOver, false)

// Remove modal an start
// on()
// Display players location
render()

// Enter
document.getElementById("input")
  .addEventListener("keyup", function(event) {
  event.preventDefault();
    if (event.keyCode === 13) {
      clickHandler()
    }
});

// End Overlay and Start the game
// function on() {
//   document.getElementById("overlayStart").style.display = "block";
// }

function off() {
  document.getElementById("overlayStart").style.display = "none";
  document.querySelector('.container').style.display = "block";
}

function onGameOver() {
  document.getElementById("overlayGameOver").style.display = "block";
}

function offGameOverScreen() {
  document.getElementById("overlayGameOver").style.display = "none";
  location = window.location
}

function GameOver() {
  window.close();
}

function clickHandler () {
  playGame()
}

function playGame () {
  zug += 1
  // Get the players input and convert it to lowercase
  playersInput = input.value
  playersInput = playersInput.toLowerCase()

  // Figure out players action
  for (let i = 0; i < commands.length; i++) {
    if(playersInput.indexOf(commands[i]) !== -1) {
      action = commands[i]
      console.log("Players action", action)
      console.log("Zuganzahl", zug);
      gameMessage=""
      break
    } 
    
  }

  // Chosse correct action
  switch(action) {
    case "geh nach norden":
      if(mapLocation > 3 && mapLocation != 6) {
        mapLocation -= 3
        input.value=""
        action = ""
      }
      else {
        gameMessage = blockedPathMessages[0]
        input.value=""
      }
      break
    case "geh nach osten":
      mapLocation += 1
      input.value=""
      action = ""
      document.getElementById('input').disabled = true
      document.getElementById('buttonGame').disabled = true
      setTimeout(onGameOver, 10000)
      break 

    case "geh nach süden":
      if(mapLocation < 6 && zug <=1) {
        mapLocation += 3
        input.value=""
        action = ""
      }
      else if (mapLocation < 6 && zug > 1) {
        mapLocation += 3
        gameMessage = blockedPathMessages[5]
        input.value=""
        action = ""
      }
      else {
        gameMessage = blockedPathMessages[2]
        input.value=""
      }
      break
    
    case "geh nach westen":
      if (mapLocation==6 || mapLocation ==3 || mapLocation == 0) {
        gameMessage = blockedPathMessages[3]
        input.value=""
      }
      else {
        mapLocation -= 1
        input.value=""
        action = ""
      }  
      break 

    case "untersuch briefkasten":
      if(mapLocation = 6) {
        map[mapLocation].Beschreibung = map[mapLocation].Beschreibung.concat("<br /> Du hast die Handreichung entdeckt...");
        input.value=""
        action = ""
        render()
      }
      break

    case "nimm handreichung":
      if(mapLocation = 6) {
        handreichung = true
        map[mapLocation].Beschreibung = map[mapLocation].Beschreibung.concat("<br /> Du hast die Handreichung genommen und bist total begeistert ...")
        input.value=""
        action = ""
        render()
      }
      break
    
    default:
      gameMessage = "Watt???..."
      input.value=""
  }

  // Render the game
  render()
}

function render () {
  // Render location
  output.innerHTML = map[mapLocation].Beschreibung 
  
  image.src = "img/" + images[mapLocation]
  // Display message
  output.innerHTML += "<br><br><em>" + gameMessage + "</em>"

  if (handreichung){
    inventory.innerHTML = "Handreichung"
  } 
}