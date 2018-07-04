// ButtonGame
buttonGame.addEventListener("click", clickHandler, false)

// ButtonStart
buttonStart.addEventListener("click", off, false)

// ButtonReStart
buttonReStart.addEventListener("click", offGameOverScreen, false)

// ButtonReStart
buttonClose.addEventListener("click", GameOver, false)


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


function off() {
  document.getElementById("overlayStart").style.display = "none";
  document.querySelector('.container').style.display = "block";
}

function initCountDown() {
  document.getElementById('input').disabled = true
  document.getElementById('buttonGame').disabled = true
  document.getElementById('countdown').style.display = 'block'
  var timeleft = 15;
  var downloadTimer = setInterval(function(){
  timeleft--;
  document.getElementById("countdowntimer").textContent = timeleft;
  if(timeleft <= 0)
      clearInterval(downloadTimer);
  },1000);
  setTimeout(showOverlayGameOver, 16000);
}

function initCountDownAusgabe(mapLocation) {
  document.getElementById('input').disabled = true
  document.getElementById('buttonGame').disabled = true
  document.getElementById('countdownAusgabe').style.display = 'block'
  var timeleft = 60;
  var downloadTimer = setInterval(function(){
  timeleft--;
  document.getElementById("countdowntimerAusgabe").textContent = timeleft;
  if(timeleft <= 0)
      clearInterval(downloadTimer);
  },1000);
  setTimeout(showafterAusgabe, 60000)
}

function showOverlayGameOver() {
  document.getElementById("overlayGameOver").style.display = "block";
}

function showafterAusgabe(mapLocation) {
  document.getElementById('input').disabled = false
  document.getElementById('buttonGame').disabled = false
  document.getElementById("countdownAusgabe").style.display = "none";
  
}

function offGameOverScreen() {
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
    if (mapLocation==5 || mapLocation ==2) {
      gameMessage = blockedPathMessages[1]
      input.value=""
      action=""
      } else if (mapLocation==7){
      mapLocation += 1
      input.value=""
      action = ""
      initCountDown();
      } else if(mapLocation==6 && handreichung){
        mapLocation += 1
        input.value=""
        action = ""
        console.log('Jetzt mit Handreichung');
        map[mapLocation].Beschreibung = map[mapLocation].Beschreibung1;
      }
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
      else if (mapLocation==4) {
        mapLocation -= 1
        input.value=""
        action = ""

        initCountDownAusgabe();
        
        setTimeout(function() {
          archivalien = true;
          map[mapLocation].Beschreibung = map[mapLocation].Beschreibung.concat("<br /><br/ >Du hast die Archivalien der Nutzlosigkeit, yeah!!");
          render();
        }, 60000);
        
      }
      else {
        mapLocation -= 1
        input.value=""
        action = ""
      }  
      break 

    case "untersuch briefkasten":
      if(mapLocation = 6) {
        untersuchBriefkasten = true;
        map[mapLocation].Beschreibung = map[mapLocation].Beschreibung.concat("<br /><br />Du hast im Briefkasten die <i>Handreichung des guten Willens</i> entdeckt, Du solltest sie mitnehmen...");
        input.value=""
        action = ""
        //render()
      }
      break

    case "nimm handreichung":
      if(untersuchBriefkasten) {
        handreichung = true
        map[mapLocation].Beschreibung = map[mapLocation].Beschreibung.concat("<br /><br/ >Du hast die Handreichung, jetzt kann auf dem Weg zur Arbeit nichts mehr schiefgehen!");
        input.value=""
        action = ""
        //render()
      }  else{
        gameMessage = blockedPathMessages[6]
        input.value=""
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

  if (handreichung && archivalien){
    inventory.innerHTML = `Handreichung des guten Willens <br> Archivalien der Nutzlosigkeit`
  } else if(archivalien) {
    inventory.innerHTML = "Archivalien der Nutzlosigkeit"
  } else if(handreichung) {
    inventory.innerHTML = "Handreichung des guten Willens"
  } else {
    inventory.innerHTML = "Noch nichts im Inventar..."
  }
}