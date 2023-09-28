
let playerChoice = document.getElementById("playerChoice");
let cpuChoice =document.getElementById("CpuChoice");
let buttATK = document.getElementById("ATK");
let game = document.getElementById("game");
let duel = document.getElementById("Duel");
let p1PWR =  document.getElementById("p1PWR");
let help = document.getElementById("tut");
let p1Wait =  document.getElementById("p1Wait");
let p2Wait =  document.getElementById("p2Wait");
let p1Pic =  document.getElementById("p1Pic");

// Initialize game variables
let playerMove;
let cpuMove;
let chosen = false;
let playerShield = 0;
let opponentShield = 0;
let shieldBreakCount = 0;
let playerAttackPower = 1;
let opponentAttackPower = 1;
let playerHealth = 5;
let opponentHealth = 5;
let playerAttackDamage = 0; 
let smart;
let startGame = document.getElementById("NewGame");
let winner = false;

// Connecting to the Firebase Database

function updateStats(){
  
  
  
  
  
  
  
  document.getElementById("p1HP").innerHTML =` HP: ${playerHealth}`;
  
  document.getElementById("p2HP").innerHTML =`HP: ${opponentHealth}`;
  p1PWR.innerText = `PWR: ${playerAttackPower}`;
  document.getElementById("p2PWR").innerHTML =` PWR: ${opponentAttackPower}`;
  
  if(playerHealth <= 0){
    
    document.getElementById("Name--1").style.color = "#90ee90";
    document.getElementById("p1HP").innerHTML = "You lost";
    document.getElementById("p1PWR").innerHTML = " Unlucky... "; 
    p2Wait.className = "fa-solid fa-face-grin-wink fa-4x";
    p1Wait.className = "fa-solid fa-face-frown-open fa-4x";
    
    winner = true;
  }
  
  else if(opponentHealth <= 0){
    
    document.getElementById("Name--0").style.color = "#90ee90";
    document.getElementById("p2HP").innerHTML = "You lost";
    document.getElementById("p2PWR").innerHTML = " ''L ++'' ";
    p1Wait.className = "fa-solid fa-face-grin-wink fa-4x";
    p2Wait.className = "fa-solid fa-face-sad-tear fa-4x";
    
    winner = true;
  }
  if(winner){
    startGame.innerHTML = "Play Again";
    //startGame.onclick = history.go(0);
  }
  
}
// Array of move choices
const moveChoices = ["attack", "defend", "charge"]; 


// Function to play attack round of the game

function playRound(playerMove, cpuMove,) { 
  // Get the player's move
  
  
  // Get the CPU's Move
  
  
  // Get the CPU's move
  
  
  // Player move logic...
  
  
  
  
  
  
  // Player move logic
  
  // If Player Attacks and CPU Charges
  if(playerMove == "attack" && cpuMove == "charge"){
    opponentHealth -= playerAttackPower;
    playerAttackPower = 1;
    opponentAttackPower++;
    playerShield = 0;
    opponentShield = 0;
  }
  
  // If both players Attack
  if(playerMove == "attack" && cpuMove == "attack"){
    if(playerAttackPower < opponentAttackPower){
      playerHealth -= (opponentAttackPower - playerAttackPower);
      opponentAttackPower = 1;
      playerAttackPower = 1;
      playerShield = 0;
      opponentShield = 0;
    }
    
    // If the player has more Attack Power than the CPU, CPU will receive the attack difference
    else if(playerAttackPower > opponentAttackPower){
      opponentHealth -= (playerAttackPower - opponentAttackPower);
      opponentAttackPower = 1;
      playerAttackPower = 1;
      playerShield = 0;
      opponentShield = 0;
    }
    else{
      playerAttackPower = 1;
      opponentAttackPower = 1;
      playerShield = 0;
      opponentShield = 0;
    }  
  }
  
  // If player Charges and CPU Attacks:
  if(playerMove == "charge" && cpuMove == "attack"){
    playerHealth -= opponentAttackPower;
    playerAttackPower++;
    opponentAttackPower = 1;
    playerShield = 0;
    opponentShield = 0;
  }
  
  // If player attacks and CPU Defends
  if(playerMove == "attack" && cpuMove == "defend"){
    if(opponentShield > 1){
      opponentHealth -= playerAttackPower;
      console.log("CPU shield Broken!");
      playerAttackPower = 1;
      opponentShield++;
      playerShield = 0;
    }
    if(opponentShield == 1){
      playerAttackPower = 1;
      opponentShield++;
      playerShield = 0;
    }
    if(opponentShield < 1){
      playerAttackPower = 1;
      opponentShield++;
      playerShield = 0;
    }
  }
  
  // if player Defends and CPU Attacks
  if(playerMove == "defend" && cpuMove == "attack"){
    if(playerShield > 1){
      playerHealth -= opponentAttackPower;
      console.log("player shield Broken!");
      opponentShield = 0;
    }
    if(playerShield == 1){
      opponentAttackPower = 1;
      playerShield++;
      opponentShield = 0;
    }
    if(playerShield < 1){
      opponentAttackPower = 1;
      playerShield++;
      opponentShield = 0;
    }
  }
  
  //if player Defends and CPU Charges
  if(playerMove == "defend" && cpuMove == "charge"){
    if(playerShield > 1){
      console.log("Player shield broken!");
    }
    playerShield++;
    opponentAttackPower++;
    opponentShield = 0;
  }
  
  //if player Charges and CPU Defends
  if(playerMove == "charge" && cpuMove == "defend"){
    opponentShield++;
    playerAttackPower++;
  }
  
  // if both players Charge
  if(playerMove == "charge" && cpuMove == "charge"){
    playerAttackPower++;
    opponentAttackPower++;
    playerShield = 0;
    opponentShield = 0;
    console.log("Both players charged!");
  }
  
  // if both players Defend
  if(playerMove == "defend" && cpuMove == "defend"){
    if(opponentShield > 1){
      console.log("CPU's shield broken!");
    }
    playerShield++;
    opponentShield++;
    console.log("Both players blocked! Nothing happened");
  }
  
  
  if(chosen)
  {console.log("Player chose " + playerMove);
  console.log("CPU chose " + cpuMove);
  console.log("Player health: " + playerHealth);
  console.log("CPU health: " + opponentHealth);
  
  
  console.log("Player health: " + playerHealth);
  console.log("CPU health: " + opponentHealth);
  console.log("-----------------------------------");
}
if (playerHealth <= 0) {
  console.log("CPU wins!");
  winner = true
} if (opponentHealth <= 0) {
  console.log("Player wins!");
  winner = true;
} updateStats();
}


startGame.addEventListener("click", function(){ 
  updateStats();
  if(winner){
    startGame.onclick = history.go(0);
    startGame.innerHTML = "Play Again";
  }
  
  document.addEventListener('keyup', function(event) {
    if (event.code === 'KeyW') {
      playerMove = "attack";
      p1Pic.src = "pics/attack.jpg";
      chosen = true;
      'https://serverr-ztub.onrender.com/players/players/<int:player_id>/post_move/<string:player_move>'
    }
    if (event.code === 'KeyA') {
      playerMove = "defend";
      p1Pic.src = "pics/block.jpg";
      
      chosen = true;
    }
    if (event.code === 'KeyD') {
      playerMove = "charge";
      p1Pic.src = "pics/charge.jpg";
      
      chosen = true;
    }
   
    fetch(`https://serverr-ztub.onrender.com/players/${otherPlayerID}/get_move/`, {
          }).then(response =>response.json()).then(data => {
            cpuMove = data['move']});
            console.log(cpuMove)
            

  if (cpuMove === 'attack') {
    
    
    p2Pic.src = "pics/attack.jpg";
    chosen = true;
  }
  if (cpuMove === 'defend') {
    
    
    
    p2Pic.src = "pics/block.jpg";
    
    chosen = true;
  }
  if (cpuMove === 'charge') {
    
    
    
    p2Pic.src = "pics/charge.jpg";
    
  }
});
});





// Define the model architecture
