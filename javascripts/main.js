/*
  DO NOT STEAL THE CODE
  __________________________________________________________________________
  
  HEY YOU!
  Idk What I Will Say But You Can Hack This Game Very Easy
  If You Want To Hack The Game It's All Yours
  __________________________________________________________________________
  DO NOT STEAL THE CODE
*/

let game = null;
let items = [];
let up = [];
let forNum = [];
let scoreText = document.getElementById("score");
let perSecText = document.getElementById("persec");
const switchInput = document.getElementById('autosave');
let auto = true;
let idk = 0;
document.title = "Potato Clicker";

//To Read The Json File
fetch('jsons/game.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(json => {
      const savedStats = localStorage.getItem('fileStats');
      if (savedStats) {
        //hello
      }
      else{
        location.reload(true);
      }
      localStorage.setItem('fileStats', JSON.stringify(json));
    }
  )
  .catch(error => {
    location.reload(true);
    console.error('Error fetching game data:', error);
  });
  const savedStats = localStorage.getItem('fileStats');
  if (savedStats) {
    game = JSON.parse(savedStats);
  }
  const savedDif = localStorage.getItem('fileStat');
  if (savedDif) { 
    game.player = JSON.parse(savedDif);
  }
  const savedDiff = localStorage.getItem('fileSta');
  if (savedDif) { 
    game.owned = JSON.parse(savedDiff);
  }
switchInput.addEventListener('change', function() {
  if (this.checked) {
    auto = true;
  } else {
    auto = false;
  }
});

for (let i in game.items) {
  items.push(i);
}
for (let i in game.up) {
  up.push(i);
}
const keys = Object.keys(game.short);
for (let i = keys.length - 1; i >= 0; i--) {
  const key = keys[i];
  forNum.push(key);
}
document.title = formatNum(Math.floor(game.player.score)) + " Potato - Potato Clicker";

function showAlert(title,classs) {
  // Create the alert box
  let alertBox = document.createElement("a");
  alertBox.classList.add(classs);
  alertBox.innerHTML = title;

  // Add the alert box to the page
  document.body.appendChild(alertBox);

  alertBox.addEventListener('animationend', () => {
    alertBox.parentNode.removeChild(alertBox);
  });
}

function UpdateItems() {
  for (let item of items) {
    game.items[item].perSec = 0
    const newItem = document.createElement('h4');
    newItem.id = item;
    newItem.className = 'item';

    try {
      if (game && game.owned && game.owned[item] != null && game.items && game.items[item]) {
        if (game.owned[item] == 0) {
          newItem.textContent = item + " " + game.owned[item] + " { " + game.items[item].cost + " }";
        } else {
          let temp5 = game.items[item].cost + ((game.owned[item] * game.items[item].cost) * 0.15)
          game.items[item].cost = temp5;
          newItem.textContent = item + " " + game.owned[item] + " { " + temp5 + " }";
        }
      } else {
        // Handle the case where game or its properties are undefined
        // You can set default values or take appropriate actions here
      }
    } catch (error) {
      // Handle any exceptions here
      console.error('Error updating items:', error);
    }

    newItem.addEventListener('click', () => {
      buyItem(item);
    });

    const itemContainer = document.getElementById('item-container');
    itemContainer.appendChild(newItem);
  }
}

function UpdateUp() {
  for (let item of up) {
    const newItem = document.createElement('img');
    newItem.id = item;
    newItem.className = 'img';
    newItem.src = "imgs/" + item + ".png";
    const text = document.createElement('h4');
    text.id = item + "T";
    text.className = 'item';
    try {
      if (game && game.owned && game.owned[item] != null && game.up && game.up[item]) {
        if (game.owned[item] == 0) {
          text.textContent = item + " " + game.owned[item] + " { " + game.up[item].cost + " }";
        } else {
          let temp5 = game.up[item].cost + ((game.owned[item] * game.up[item].cost) * 0.60)
          game.up[item].cost = temp5;
          text.textContent = item + " " + game.owned[item] + " { " + temp5 + " }";
        }
      } else {
        // Handle the case where game or its properties are undefined
        // You can set default values or take appropriate actions here
      }
    } catch (error) {
      // Handle any exceptions here
      console.error('Error updating up:', error);
    }

    text.addEventListener('click', () => {
      buyUp(game.up[item].Effect,item);
    });


    const itemContainer = document.getElementById('up-container');


    itemContainer.appendChild(text);
    itemContainer.appendChild(newItem);
    
  }
}
  
function playSound(name) {
  // Create an audio element
  let soundEffect = new Audio(name);

  // Play the sound
  soundEffect.play();

  // Remove the sound element when it finishes playing
  soundEffect.addEventListener('ended', function() {
    soundEffect.remove();
  });
}

function buyItem(itemName) {
  if (game.player.score >= game.items[itemName].cost) {
    game.player.score -= game.items[itemName].cost;
    game.owned[itemName] += 1;
    if (game.items[itemName].perSec == null) {game.items[itemName].perSec = game.items[itemName].addsec;}
    else{game.items[itemName].perSec += game.items[itemName].addsec;}
    game.player.perSec += game.items[itemName].addsec;
    game.items[itemName].cost = Math.floor(game.items[itemName].cost * 1.15);
    Update();
  }
}
  
function buyUp(effect,name) {
  if (effect == "Mouse"){
    if (game.player.score >= game.up[name].cost) {
      game.player.score -= game.up.More.cost;
      game.owned[name] += 1;
      game.player.perSec += game.items[effect].perSec;
      game.items[effect].addsec += game.items[effect].addsec;
      game.items[effect].perSec += game.items[effect].perSec;
      game.player.clicks += game.player.clicks/2;
      game.up[name].cost = Math.floor(game.up[name].cost * 2.5);
  }}
  else{
    if (game.player.score >= game.up[name].cost) {
      game.player.score -= game.up[name].cost;
      game.owned[name] += 1;
      game.player.perSec += game.items[effect].perSec;
      game.items[effect].addsec += game.items[effect].addsec;
      game.items[effect].perSec += game.items[effect].perSec;
      game.up[name].cost = Math.floor(game.up[name].cost * 2.5);
    }}
    Update();
}
function Update() {
  for (let item of items) {
    let itemT = document.getElementById(item);
    try {
      game.owned[item] = game.owned[item] || 0; // Set to 0 if undefined or null
      game.items[item].cost = game.items[item].cost || 0; // Set to 0 if undefined or null
      game.items[item].cost = game.items[item].cost || 0; // Set to 0 if undefined or null
      
      let newText = item + " " + game.owned[item] + " { " + formatNum(game.items[item].cost) + " }";
      itemT.innerText = newText;
    } catch (error) {
      // Handle any exceptions here
      console.error('Error updating item:', error);
    }
  }
  for (let item of up) {
    let itemText = document.getElementById(item+ "T");
    try {
      game.owned[item] = game.owned[item] || 0; // Set to 0 if undefined or null
      game.up[item].cost = game.up[item].cost || 0; // Set to 0 if undefined or null
      game.up[item].cost = game.up[item].cost || 0; // Set to 0 if undefined or null
      
      let newText = item + " " + game.owned[item] + " { " + formatNum(game.up[item].cost) + " }";
      itemText.textContent = newText;
    } catch (error) {
      // Handle any exceptions here
      console.error('Error updating up:', error);
    }
  }
  
  scoreText.innerText = formatNum(Math.floor(game.player.score));
  perSecText.innerText = "Per Sec: " + formatNum(game.player.perSec);
}
function onClick(){
  game.player.score += game.player.clicks;
  playSound("Sounds/click.mp3")
  Update();
}

function clearData() {
  if (confirm("Are you sure you want to clear all saved data? This will reset the game to its initial state.")) {
    localStorage.clear();
    location.reload(true);
  }
}


setInterval(() => {
    idk = game.player.perSec / 250;
    game.player.score += idk;
    Update();
  });
setInterval(()=> {
  document.title = formatNum(Math.floor(game.player.score)) + " Potato - Potato Clicker";
},4000);
setInterval(autosave,60000);

//showAlert("Test","alert")
function save(){
    localStorage.setItem('fileStat', JSON.stringify(game.player));
    localStorage.setItem('fileSta', JSON.stringify(game.owned));
    showAlert("File Saved","save")
}
function autosave(){
  if (auto) {
    save();
  }
}
UpdateItems();
UpdateUp()
Update();


document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault();
    save();
  }
});




function formatNum(num){
  for (let i of forNum){
    if (num >= game.short[i].number) {
      return (num / game.short[i].number).toFixed(2) + " " + game.short[i].name;
    }
  }
  if(num >= 1e3){
    return num;
  }
  else{
    return num;
  }
}