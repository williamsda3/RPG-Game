/* Instead of the player class version of the dungeon game, I am thinking of making a version in which there is one player class
and the player gets to choose the abilities/character traits that they will have. I think that this will make the experience more unique and re-
playable
---The TODO is in the README of this games folder---
*/
// Creating the Canvas for the game
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");


// Creating the Player class (basic at the moment, see TODO for more information)
class Player {
  constructor() {
    this.baseHP = 200;
    this.hp = 200;
    this.block = false;
    this.baseAttackPower = 100;
    this.attackPower =100;
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
      alert("Player Lost!");
      location.reload();
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
    this.attackPower += 10;
    console.log("Player charged attack! Attack Power level:", this.attackPower);
  }
  
  resetCharge() {
    this.attackPower = this.baseAttackPower;
    console.log("Player reset charge level");
  }
}

// Creating the base enemy class
class Enemy {
  constructor(baseHP, hp, block, baseAttackPower, attackPower, choice) {
    this.baseHP = baseHP;
    this.hp = hp;
    this.block = block;
    this.baseAttackPower = baseAttackPower;
    this.attackPower = attackPower;
    this.choice = choice;
  }
  
  takeDamage(damage) {
    if (this.block) {
      console.log("Enemy blocked the attack!");
      return; // Exit the method without taking damage
    }
    
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;
      // Victory logic
    }
  }
  
  blockDamage() {
    this.block = true;
    console.log("Enemy is blocking");
  }
  
  stopBlocking() {
    this.block = false;
    console.log("Enemy stopped blocking");
  }
  
  chargeAttack() {
    this.attackPower += 10;
    console.log("Enemy charged attack! Attack Power level:", this.attackPower);
  }
  
  resetCharge() {
    this.attackPower = this.baseAttackPower;
    console.log("Enemy reset charge level");
  }
  
  makeDecision() {
    const randomChoice = Math.floor(Math.random() * 3); // Generate a random number between 0 and 2
    
    switch (randomChoice) {
      case 0:
      this.choice = "attack";
      this.stopBlocking();
      playerTakeDamage(player, this.attackPower);
      this.resetCharge();
      break;
      
      case 1:
      this.choice = "defend";
      this.blockDamage();
      break;
      
      case 2:
      this.choice = "charge";
      this.stopBlocking();
      this.chargeAttack();
      break;
    }
  }
}

// Creating functions for Player-Enemy interactions
function playerTakeDamage(player, damage) {
  player.takeDamage(damage);
  console.log("Player HP:", player.hp);
  updateHUD();
}

function enemyTakeDamage(enemy, damage) {
  enemy.takeDamage(damage);
  console.log("Enemy HP:", enemy.hp);
  updateHUD();
}

// Populating Enemies for the Player to face
let dungeon = [];
const enemies_1 = [];
const enemies_2 = [];
let numberOfEnemies = 5;

for (let i = 0; i < numberOfEnemies; i++) {
  const hp = Math.floor(Math.random() * 100) + 100; // Random HP between 100 and 199
  const attackPower = Math.floor(Math.random() * 10) + 10; // Random attack power between 10 and 19
  
  const enemy = new Enemy(hp, hp, false, attackPower, attackPower, " ");
  enemies_1.push(enemy);
}
dungeon.push(enemies_1);

for (let i = 0; i < numberOfEnemies; i++) {
  const hp = Math.floor(Math.random() * 100) + 100; // Random HP between 100 and 199
  const attackPower = Math.floor(Math.random() * 10) + 10; // Random attack power between 10 and 19
  
  const enemy = new Enemy(hp, hp, false, attackPower, attackPower, " ");
  enemies_2.push(enemy);
}
dungeon.push(enemies_2);

console.log(dungeon);

// Initialization of player and enemy
const player = new Player();
let currentSetIndex = 0;
let currentEnemyIndex = 0;
let currentSet = dungeon[currentSetIndex];
let enemy = currentSet[currentEnemyIndex];


// Check to see if one or all enemies are defeated
function checkWin(enemies) {
  if (enemy.hp <= 0) {
    if (currentEnemyIndex === currentSet.length - 1) {
      if (currentSetIndex === dungeon.length - 1) {
        alert("You Win! You defeated all enemies!");
        return;
      } else {
        alert("You defeated all enemies in the set!");
        currentSetIndex++;
        currentSet = dungeon[currentSetIndex];
        currentEnemyIndex = 0;
      }
    } else {
      currentEnemyIndex++;
    }
    
    enemy = currentSet[currentEnemyIndex];
    updateHUD();
  }
}


// Creating functions to display the game contents and state
function drawHUD() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player HP
  ctx.fillStyle = "green";
  ctx.fillRect(10, 30, (player.hp/player.baseHP)* 300, 10);

   // Draw player HP text
  ctx.fillStyle = "black";
  ctx.font = "12px Arial";
  ctx.fillText(`Player HP: ${player.hp}`, 10, 20);
  
  // Draw player attack power text
  ctx.fillStyle = "black";
  ctx.font = "12px Arial";
  ctx.fillText(`Attack Power: ${player.attackPower}`, 200, 20);

  // Draw player attack power text
  ctx.fillStyle = "black";
  ctx.font = "13px Arial";
  ctx.fillText(`Wave: ${currentSetIndex + 1}`, 400, 20);
  ctx.fillText(`Enemies Remaining: ${currentSet.length -currentEnemyIndex}`, 360, 40);
  
 // Draw enemy HP bar
 ctx.fillStyle = "red";
 ctx.fillRect(canvas.width - enemy.hp - 10, 30, enemy.hp , 10);
  // Draw enemy HP text
ctx.fillStyle = "black";
ctx.font = "12px Arial";
ctx.fillText(`Enemy HP: ${enemy.hp}`, canvas.width - 250, 20);

// Draw enemy attack power text
ctx.fillStyle = "black";
ctx.font = "12px Arial";
ctx.fillText(`Attack Power: ${enemy.attackPower}`, canvas.width- 110, 20);
}

function updateHUD() {
  drawHUD();
  checkWin();
}
updateHUD();

// Allowing for the move choices to be updated in real time based on user input. (See TODO for more information)
window.addEventListener("keyup", (e) => {
  if (e.defaultPrevented) {
    return; // Do nothing if event already handled
  }
  
  switch (e.code) {
    case "KeyW":
    player.choice = "attack";
    player.stopBlocking();
    enemyTakeDamage(enemy, player.attackPower);
    player.resetCharge();
    enemy.makeDecision();
    break;
    
    case "KeyS":
    player.choice = "defend";
    player.blockDamage();
    enemy.makeDecision();
    break;
    
    case "KeyD":
    player.choice = "charge";
    player.stopBlocking();
    player.chargeAttack();
    enemy.makeDecision();
    break;
  }
});



// Enemy AI logic - to have more variable attacks - be sure to tie attack rate with damage (maybe based on enemy type)
// const randomNumber = Math.floor(Math.random() * (2000 - 300 + 1)) + 300;


// setInterval(() => {
//   enemy.makeDecision();
// }, randomNumber);


