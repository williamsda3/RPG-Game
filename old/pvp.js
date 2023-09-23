/*   This is similar to the other one but 2-player (at the moment...) */

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

class Player {
  constructor() {
    this.baseHP = 100;
    this.hp = 100;
    this.block = false;
    this.baseAttackPower = 10;
    this.ATK = 10;
    this.choice = " ";
  }
  
  takeDamage(damage) {
    if (this.block) {
      console.log("Player blocked the attack!");
      return; // Exit the method without taking damage
    }
    
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;
      // Game over logic
    }
  }
  
  blockDamage() {
    this.block = true;
    console.log("Player is blocking");
  }
  
  stopBlocking() {
    this.block = false;
    console.log("Player stopped blocking");
  }
  chargeAttack() {
    this.attackPower += 20;
    console.log("Player charged attack! Attack Power level:", this.attackPower);
  }
  
  resetCharge() {
    this.attackPower = this.baseAttackPower;
    console.log("Player reset charge level");
  }
}

const player1 = new Player();
const player2 = new Player();

function drawHUD() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw player1 HP
  ctx.fillStyle = "green";
  ctx.fillRect(10, 10, player1.hp, 10);
  
  // Draw player2 HP
  ctx.fillStyle = "green";
  ctx.fillRect(canvas.width - player2.hp - 10, 10, player2.hp , 10);
}

function updateHUD() {
  drawHUD();
}

function playerTakeDamage(player,damage) {
  player.takeDamage(damage);
  console.log("Player HP:", player.hp);
  updateHUD();
}

function checkwinner(player1, player2) {}
updateHUD()

let player1_Move;
let player2_Move;
let player1_choice = false; 
let player2_choice = false;




// window.addEventListener('keyup', (e) => {   
  
//   if (e.defaultPrevented) {
//     return; // Do nothing if event already handled
//   }  
//   switch(e.code){
    
//     // Once the game starts it will listen and assign what key is pressed to the player_move variable. Later on the two choices will be compared (duel)
//     case "KeyW":
//     player1.choice = "attack";
//     player1.stopBlocking();
//     playerTakeDamage(player2, player1.attackPower);
//     if(player2.hp <= 0 ){
//       alert("Player 1 Wins!");
//       location.reload();
      
//     }
//     player1.resetCharge();
    
    
//     break;
//     case "KeyS":
//     player1.choice = "defend";
//     player1.blockDamage();
    
//     break;
//     case "KeyD":
//     player1.choice = "charge"
//     player1.stopBlocking();
//     player1.chargeAttack();
    
//     break;
    
//     case "ArrowUp":
//     player2.choice = "attack";
//     player2.stopBlocking();      
//     playerTakeDamage(player1, player2.attackPower);
//     if(player1.hp <= 0 ){
//       alert("Player 2 Wins!");
//       location.reload();
//     }
//     player2.resetCharge();
    
//     break;
//     case "ArrowLeft":
//     player2.choice = "charge";
//     player2.stopBlocking();
//     player2.chargeAttack();
    
//     break;
//     case "ArrowDown":
//     player2.choice = "defend";
//     player2.blockDamage();
    
//     break;
//   }
  
// })


window.addEventListener('keyup', (e) => {   
        
        
  if (e.defaultPrevented) {
      return; // Do nothing if event already handled
  }  
  
  
  
  switch(e.code){
      
      
      
      
      // Once the game starts it will listen and assign what key is pressed to the player_move variable. Later on the two choices will be compared (duel)
      case "KeyW":
      player1_Move = "a";
      player1_choice = true;
      p1Pic.src = "pics/attack.jpg";
      p1Wait.style.visibility = "hidden"; 
      p1Pic.style.visibility = "hidden";
      
      break;
      case "KeyA":
      player1_Move = "b";
      player1_choice = true;
      p1Pic.src = "pics/block.jpg";
      p1Wait.style.visibility = "hidden"; 
      p1Pic.style.visibility = "hidden";
      break;
      case "KeyD":
      player1_Move = "c";
      player1_choice = true;
      p1Pic.src = "pics/charge.jpg";
      p1Wait.style.visibility = "hidden"; 
      p1Pic.style.visibility = "hidden";
      break;
      
      case "ArrowUp":
      player2_Move = "a";
      player2_choice = true;
      p2Pic.src = "pics/attack.jpg";
      p2Wait.style.visibility = "hidden"; 
      p2Pic.style.visibility = "hidden";
      break;
      case "ArrowLeft":
      player2_Move = "b";
      player2_choice = true;
      p2Pic.src = "pics/block.jpg";
      p2Wait.style.visibility = "hidden"; 
      p2Pic.style.visibility = "hidden";
      break;
      case "ArrowRight":
      player2_Move = "c";
      player2_choice = true;
      p2Pic.src = "pics/charge.jpg";
      p2Wait.style.visibility = "hidden"; 
      p2Pic.style.visibility = "hidden";
      
      break;
  }
  
  round();  
})

// Function will check if both players selection a choice, if so it will call a duel
function round(){
  
  if(player1_choice && player2_choice){
      //setTimeout(() => { duell();  }, 3000);
      p1Pic.style.visibility = "visible";
      p2Pic.style.visibility = "visible";
      
      
      duell();
      
  }
  if(player1_choice){
      
      p1Wait.style.visibility = "hidden"; 
      p1Pic.style.visibility = "hidden";
      
      
  }
  if(player2_choice){
      p2Wait.style.visibility = "hidden";
      p2Pic.style.visibility = "hidden";
      
      
  }
  
  
  
  
  if(player1.baseHP <= 0){
      inputField.innerText = "Player 2 wins!";
      document.getElementById("Name--1").style.color = "#90ee90";
      document.getElementById("p1HP").innerHTML = "You lost";
      document.getElementById("p1PWR").innerHTML = " Unlucky... "; 
      p2Wait.className = "fa-solid fa-face-grin-wink fa-4x";
      p1Wait.className = "fa-solid fa-face-frown-open fa-4x";
      
      winner = true;
  }
  
  else if(player2.baseHP <= 0){
      inputField.innerText = "Player 1 wins!";
      document.getElementById("Name--0").style.color = "#90ee90";
      document.getElementById("p2HP").innerHTML = "You lost";
      document.getElementById("p2PWR").innerHTML = " ''L ++'' ";
      p1Wait.className = "fa-solid fa-face-grin-wink fa-4x";
      p2Wait.className = "fa-solid fa-face-sad-tear fa-4x";
      
      winner = true;
  }
  if(winner){
      startGame.innerHTML = "Play Again";
      
  }
  
  
  
  
  
}








// Function will compare the players move selection and produce the corresponding outcome 
function duell(){ 
  
  player1_choice = false;
  player2_choice = false;
  
  
  
  
  
  updateHUD();
  //if(player1.baseHP <= 0){
  // document.getElementById("p1HP").innerHTML = "Player 2 Wins!";
  // }
  
  //if(player2.baseHP <= 0){
  // document.getElementById("p1HP").innerHTML = "Player 1 Wins!";
  // }
  
  
  // If player 1 Attacks and player 2 Charges:
  if(player1_Move == "a" && player2_Move == "c"){
      player2.baseHP -= player1.ATK;
      player1.ATK = 1;
      player2.ATK++;
      player1.blockCount = 0;
      player2.blockCount = 0;
      console.log(`p1 HP : ${player1.baseHP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.baseHP}, p2 PWR : ${player2.ATK} `);
      inputField.innerText = "Player 1 Attacked while Player 2 was Charging!";
      
      // animate the HP stat when taking damage
      setTimeout(function(){document.getElementById("p2HP").style.color = "black"; }, 500);
      document.getElementById("p2HP").style.color = "#D10000";
      updateHUD();
      
      round();
      
  }
  
  // If both players Attack
  if(player1_Move == "a" && player2_Move == "a"){
      if(player1.ATK < player2.ATK){
          player1.baseHP -= (player2.ATK - player1.ATK);
          player2.ATK = 1;
          player1.ATK = 1;
          player1.blockCount = 0;
          player2.blockCount = 0;
          console.log(`p1 HP : ${player1.baseHP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.baseHP}, p2 PWR : ${player2.ATK} `);
          updateHUD();
          inputField.innerText = "Player 2 Overpowered Player 1's Attack!";
          round();
      }
      
      // If the player 1 has more Attack Power than the player 2, player 2 will receive the attack difference
      else if(player1.ATK > player2.ATK){
          player2.baseHP -= (player1.ATK - player2.ATK);
          player2.ATK = 1;
          player1.ATK = 1;
          player1.blockCount = 0;
          player2.blockCount = 0;
          console.log(`p1 HP : ${player1.baseHP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.baseHP}, p2 PWR : ${player2.ATK} `);
          // animate the HP stat when taking damage
          setTimeout(function(){document.getElementById("p2HP").style.color = "black"; }, 700);
          document.getElementById("p2HP").style.color = "#D10000";
          inputField.innerText = "Player 1 Overpowered Player 2's Attack!";
          updateHUD();
          round();
      }
      else{
          player1.ATK = 1;
          player2.ATK = 1;
          player1.blockCount = 0;
          player2.blockCount = 0;
          console.log(`p1 HP : ${player1.baseHP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.baseHP}, p2 PWR : ${player2.ATK} `);
          inputField.innerText = "          Both players Attacked!";
          updateHUD();
          round();
      }  
  }
  
  // If player 1 Charges and player 2 Attacks:
  if(player1_Move == "c" && player2_Move == "a"){
      player1.baseHP -= player2.ATK;
      player1.ATK++;
      player2.ATK = 1;
      player1.blockCount = 0;
      player2.blockCount = 0;
      console.log(`p1 HP : ${player1.baseHP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.baseHP}, p2 PWR : ${player2.ATK} `);
      // animate the HP stat when taking damage
      setTimeout(function(){document.getElementById("p1HP").style.color = "black"; }, 700);
      document.getElementById("p1HP").style.color = "#D10000";
      
      inputField.innerText = "Player 2 Attacked while player 1 was Charging!";
      updateHUD();
      round();
  }
  
  // If player 
  if(player1_Move == "a" && player2_Move == "b"){
      if(player2.blockCount > 1){
          player2.baseHP -= player1.ATK;
          console.log("player 2 shield Broken!");
          console.log(`p1 HP : ${player1.baseHP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.baseHP}, p2 PWR : ${player2.ATK} `);
          inputField.innerText = "           Player 2 shield Broken!";
          updateHUD();
          round();
          player1.ATK = 1;
          player2.blockCount++;
          player1.blockCount = 0;
          
      }
      if(player2.blockCount == 1){
          player1.ATK = 1;
          player2.blockCount++;
          player1.blockCount = 0;
          
          console.log(`p1 HP : ${player1.baseHP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.baseHP}, p2 PWR : ${player2.ATK} `);
          updateHUD();
          round();
          inputField.innerText = "     Player 2 has one block remaining!";
      }
      if(player2.blockCount < 1){
          player1.ATK = 1;
          player2.blockCount++;
          player1.blockCount = 0;
          
          
          console.log(`p1 HP : ${player1.baseHP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.baseHP}, p2 PWR : ${player2.ATK} `);
          inputField.innerText = "     Player 2 blocked Player 1's Attack!";
          updateHUD();
          round();
      }
  }
  
  if(player1_Move == "b" && player2_Move == "a"){
      if(player1.blockCount > 1){
          player1.baseHP -= player2.ATK;
          console.log("player 1 shield Broken!");
          console.log(`p1 HP : ${player1.baseHP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.baseHP}, p2 PWR : ${player2.ATK} `);
          inputField.innerText = "          Player 1 shield Broken!"
          updateHUD();
          round();
          player2.blockCount = 0;
      }
      if(player1.blockCount == 1){
          player2.ATK = 1;
          player1.blockCount++;
          player2.blockCount = 0;
          
          console.log(`p1 HP : ${player1.baseHP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.baseHP}, p2 PWR : ${player2.ATK} `);
          updateHUD();
          round();
          inputField.innerText = "     Player 1 has one block remaining!";
      }
      if(player1.blockCount < 1){
          player2.ATK = 1;
          player1.blockCount++;
          player2.blockCount = 0;
          
          console.log(`p1 HP : ${player1.baseHP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.baseHP}, p2 PWR : ${player2.ATK} `);
          inputField.innerText = "     Player 1 blocked Player 2's Attack!";
          updateHUD();
          round();
      }
  }
  if(player1_Move == "b" && player2_Move == "c"){
      player1.blockCount++;
      player2.ATK++;
      player2.blockCount = 0;
      inputField.innerText = "  Player 1 Blocked while Player 2 Charged!";
      updateHUD();
      round();
  }
  if(player1_Move == "c" && player2_Move == "b"){
      player2.blockCount++;
      player1.ATK++;
      inputField.innerText = "    Player 1 Charged while Player 2 Blocked!";
      
      updateHUD();
      round();
  }
  
  if(player1_Move == "c" && player2_Move == "c"){
      player1.ATK++;
      player2.ATK++;
      player1.blockCount = 0;
      player2.blockCount = 0;
      console.log("Both players charged!");
      console.log(`p1 HP : ${player1.baseHP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.baseHP}, p2 PWR : ${player2.ATK} `);
      inputField.innerText = "          Both players charged!";
      updateHUD();
      round();
      
  }
  if(player1_Move == "b" && player2_Move == "b"){
      player1.blockCount++;
      player2.blockCount++;
      
      inputField.innerText = "      Both players blocked! Nothing happened";
  }
}


