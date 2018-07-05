window.onload = function(){ 
  document.getElementById("loading").style.display = "none";
  document.getElementById("overlayStart").style.display = "block";
  document.getElementById("countdown").style.display = "none";
  document.getElementById("countdownAusgabe").style.display = "none";
} 

// Create the map
let map = []

map[0] = "Kantine"
map[1] = "Bibliothek"
map[2] = "Großraumbüro"
map[3] = {Ort:"Archivtheke", Beschreibung:"Du stolperst die Stufen zur Archivausgabetheke herunter, auch hier ist niemand, Dein bestellter Archivwagen steht aber für Dich bereit. Du überprüfst die Richtigkeit der bestellten Archivalien und setzt für eine Minute aus...", Beschreibung1:"Nach Erhalt der <em>Archivalien der Nutzlosigkeit</em> fühlst Du Dich gestärkt"}
map[4] = {Ort:"FES-Eingang", Beschreibung:"Es ist ruhig hier in der FES, noch ruhiger als sonst üblich. Die Schlüsselausgabe ist nicht besetzt, auch sonst siehst Du niemanden in der Eingangshalle. Du erinnsert Dich an den Arbeitsauftrag der bösen Königin: Schriftgut scannen für KlausMausHausLaus Wettig, also auf zur Archivtheke im Westen. Im Osten hörst Du unheilvolle Scannergeräusche. Irgendwie hast Du das Gefühl, dass Dir etwas Wichtiges fehlt, ...", Beschreibung2:"Testbeschreibung nach Handreichung und Archivalien..."}
map[5] = "Scanner des Grauens"
map[6] = {Ort:"Ehemalige Botschaft", Beschreibung:"Du stehst vor einem seltsamen Turm. Das gesamte Gelände sieht verwildert und verlassen aus. Es ist vollends mit einer meterdicken Rosenhecke umschlossen, die auf den angrenzenden Mauern weitergewandert ist und fast den gesamten Komplex überwuchert hat. An der Tür hängt ein arg ramponierter Briefkasten ..."}
map[7] = {ORT:"Haltestelle Max-Löbner-Strasse", Beschreibung:"Ein neuer Arbeitstag steht Dir bevor. Genervt steigst Du an der Haltestelle Max-Löbner-Strasse aus der Bahn aus: Heute ausnahmsweise nur 20 Minuten Verspätung. Im Norden siehst Du die Friedrich-Ebert-Stiftung, im Westen steht eine seltsamer Turm, im Osten hörst Du Geschrei und Tumult.", Beschreibung1:"Nach Erhalt der <em>Handreichung des guten Willens</em> fühlst Du Dich gestärkt für Deinen Arbeitstag in der FES, die im Norden liegt, im Osten hörst Du immer noch Tumult und Geschrei."}
map[8] = {Ort: "Haltestelle Olof-Palme-Allee", Beschreibung:"Du bist an der Haltestelle Olof-Palme-Allee, es herrschen Tumult und Aufruhr: Eine Tür einer abfahrtbereiten Bahn schliesst nicht, da ein Fahrgast die Lichtschranke blockiert. Du nimmst an der lebhaften Diskussion zwischen Fahrpersonal und Fahrgästen teil. Du gehst heute bestimmt nicht mehr arbeiten ..."}

// Create the images
let images = []

images[0] = "fes-kantine.jpg"
images[1] = "fes-bibumbau.jpg"
images[2] = "fes-grossraumbuero.jpg"
images[3] = "fes-archivtheke.jpg"
images[4] = "fes-eingang.jpg"
images[5] = "fes-scanner.jpg"
images[6] = "bonn-botschaft.jpg"
images[7] = "bonn-haltestelle.jpg"
images[8] = "bonn-olof.jpg"

// Set blockedPathmessages
let blockedPathMessages = []
blockedPathMessages[0] = "Nein, es geht nicht weiter nach Norden..."
blockedPathMessages[1] = "Nein, es geht nicht weiter nach Osten..."
blockedPathMessages[2] = "Nein, es geht nicht weiter nach Süden..."
blockedPathMessages[3] = "Nein, es geht nicht weiter nach Westen..."
blockedPathMessages[4] = "Hier gibt es nichts zu untersuchen..."
blockedPathMessages[5] = "Du warst doch schonmal hier, oder..."
blockedPathMessages[6] = "Welche Handreichung???"



// Spielzüge
let zug = 0

// Briefkasten untersucht?
let untersuchBriefkasten = false

// Inventar
let handreichung = false
let archivalien = false

// Set players start location
let mapLocation = 7

// Initialize players input
let playersInput = ""

// Initialize game message
let gameMessage = ""

// create array of commands the game understands
// and a variable to store the action
let commands = ["geh nach norden", "geh nach osten", "geh nach süden", "geh nach westen", "untersuch briefkasten", "nimm handreichung"]
let action = ""

// output and input fields
let output = document.querySelector("#output")
let input = document.querySelector("#input")

// Images
let image = document.querySelector("#spielbild")

// ButtonGame
let buttonGame = document.querySelector("#buttonGame")

// ButtonStart
let buttonStart = document.querySelector("#buttonStart")

// ButtonReStart
let buttonReStart = document.querySelector("#buttonReStart")

// ButtonClose
let buttonClose = document.querySelector("#buttonClose")
