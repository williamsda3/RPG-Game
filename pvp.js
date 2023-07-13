/*   This is similar to the other one but 2-player (at the moment...) */

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

class Player {
  constructor() {
    this.baseHP = 100;
    this.hp = 100;
    this.block = false;
    this.baseAttackPower = 10;
    this.attackPower = 10;
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


window.addEventListener('keyup', (e) => {   
  
  if (e.defaultPrevented) {
    return; // Do nothing if event already handled
  }  
  switch(e.code){
    
    // Once the game starts it will listen and assign what key is pressed to the player_move variable. Later on the two choices will be compared (duel)
    case "KeyW":
    player1.choice = "attack";
    player1.stopBlocking();
    playerTakeDamage(player2, player1.attackPower);
    if(player2.hp <= 0 ){
      alert("Player 1 Wins!");
      location.reload();
      
    }
    player1.resetCharge();
    
    
    break;
    case "KeyS":
    player1.choice = "defend";
    player1.blockDamage();
    
    break;
    case "KeyD":
    player1.choice = "charge"
    player1.stopBlocking();
    player1.chargeAttack();
    
    break;
    
    case "ArrowUp":
    player2.choice = "attack";
    player2.stopBlocking();      
    playerTakeDamage(player1, player2.attackPower);
    if(player1.hp <= 0 ){
      alert("Player 2 Wins!");
      location.reload();
    }
    player2.resetCharge();
    
    break;
    case "ArrowLeft":
    player2.choice = "charge";
    player2.stopBlocking();
    player2.chargeAttack();
    
    break;
    case "ArrowDown":
    player2.choice = "defend";
    player2.blockDamage();
    
    break;
  }
  
})





