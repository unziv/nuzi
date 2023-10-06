// Get references to the HTML elements
let clickButton = document.getElementById("click");
let scoreText = document.getElementById("score");
let perSecText = document.getElementById("persec");
let moreC = document.getElementById("more");
let mouseC = document.getElementById("mouse");
let potatoPC = document.getElementById("potatop");
let farmerC = document.getElementById("farmer");
let farmC = document.getElementById("farm");

// Remove all div elements from the HTML
const divElements = document.querySelectorAll("div");
divElements.forEach(element => element.remove());

// Set the prices for different items in the game
let sells = {
  more: 15,         // price for "More Clicks" upgrade
  pp: 100,          // price for "Plant Seeds" upgrade
  potatoP : 1000,   // price for "Potato Peeler" upgrade
  farmer: 10000,    // price for "Potato Harvester" upgrade
  truck: 100000,    // price for "Potato Truck" upgrade
};

// Initialize the game stats 
let game = {
  score: 0,         // total score
  clicks: 1,        // score per click
  perSec: 0,        // score per second
};

// Initialize the number of items owned by the player
let owned ={
  more: 0,          // number of "More Clicks" upgrades owned
  pp: 0,            // number of "Plant Seeds" upgrades owned
  potatoP : 0,      // number of "Potato Peeler" upgrades owned
  farmer: 0,        // number of "Potato Harvester" upgrades owned
  truck: 0,         // number of "Potato Truck" upgrades owned
};

// Update the text on the HTML page to reflect the game state
function updateText() {
  moreC.innerText = "More Clicks: "+ owned.more + " {" + sells.more + "}";
  mouseC.innerText = "Plant Seeds: "+ owned.pp + " {" + sells.pp + "}";
  potatoPC.innerText ="Potato Peeler "+ owned.potatoP + " {" + sells.potatoP + "}"
  farmerC.innerText = "Potato Harvester: "+ owned.farmer + " {" + sells.farmer + "}";
  farmC.innerText = "Potato Truck: "+ owned.truck + " {" + sells.truck + "}";
  perSecText.innerText = game.perSec + ' per sec';
  scoreText.innerText = game.score;
}

// Buy an item and update the game state accordingly
function buyItem(itemName, add) {
  if (game.score >= sells[itemName]) {
    game.score -= sells[itemName];
    owned[itemName] += 1;
    game.perSec += add;
    sells[itemName] = Math.floor(sells[itemName] * 1.15);
    updateText();
  }
}

// Update the text on the HTML page to reflect the initial game state
updateText();

// Retrieve the game stats and item prices from localStorage, or initialize them if not present
const savedStats = localStorage.getItem('gameStats');
if (savedStats) {
  game = JSON.parse(savedStats);
  updateText();
}

const savedSells = localStorage.getItem('gameSells');
if (savedSells) {
  sells = JSON.parse(savedSells);
  updateText();
}
const savedOwn = localStorage.getItem('gameOwn');
if (savedOwn) {
  owned = JSON.parse(savedOwn);
  updateText();
}

// Update the game stats every second
setInterval(() => {
  game.score += game.perSec;
  // Save the game stats and item prices to localStorage every second
  localStorage.setItem('gameStats', JSON.stringify(game));
  localStorage.setItem('gameSells', JSON.stringify(sells));
  localStorage.setItem('gameOwn', JSON.stringify(owned));
  updateText()
}, 1000);

// Update the title of the HTML page every 4 seconds to reflect the total score
setInterval(()=> {
  document.title = game.score + " Potato - Potato Clicker";
},4000)

// Add event listeners for the different buttons and upgrades in the game
clickButton.addEventListener("click", click);
moreC.addEventListener("click", more);
mouseC.addEventListener("click", pp);
farmerC.addEventListener("click", farmer);
farmC.addEventListener("click", truck);
potatoPC.addEventListener("click", potatoPF)

// Increase the score when the player clicks the button
function click() {
  game.score += game.clicks;
  updateText()
}

// Buy the "Plant Seeds" upgrade
function pp(){
  buyItem("pp", 1);
}

// Buy the "Potato Truck" upgrade
function truck(){
  buyItem("truck", 1000);
}

// Buy the "Potato Harvester" upgrade
function farmer(){
  buyItem("farmer", 100);
}

// Buy the "Potato Peeler" upgrade
function potatoPF(){
  buyItem("potatoP",10)
}

// Buy the "More Clicks" upgrade
function more() {
  if (game.score >= sells.more) {
    game.score -= sells.more;
    sells.more += Math.floor(sells.more *1.35);
    game.clicks += 1;
    owned.more += 1;
    updateText()
  }
}

// Reset the game stats to the default values
function clearData() {
  if (confirm("Are you sure you want to clear your progress?")){
    // Clear the saved game stats and item prices from localStorage
    localStorage.removeItem('gameStats');
    localStorage.removeItem('gameSells');
    localStorage.removeItem('gameOwn');
    // Reset the game stats and item prices to the default values
    game = {
      score: 0,
      clicks: 1,
      perSec: 0
    };
    sells = {
      more: 15,
      pp: 100,
      potatoP : 1000,
      farmer: 10000,
      truck: 100000,
    };
    owned ={
      more: 0,
      pp: 0,
      potatoP : 0,
      farmer: 0,
      truck: 0,
    };
    updateText();
  }
}