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

// Creating the enemy class
class Enemy {
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
      console.log("Enemy blocked the attack!");
      return; // Exit the method without taking damage
    }

    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;
      alert("Player Won!");
      location.reload();
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
        playerTakeDamage(this.attackPower);
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

// Initialization
const player = new Player();
const enemy = new Enemy();

function drawHUD() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player HP
  ctx.fillStyle = "green";
  ctx.fillRect(10, 10, player.hp, 10);

  // Draw enemy HP
  ctx.fillStyle = "red";
  ctx.fillRect(canvas.width - enemy.hp - 10, 10, enemy.hp, 10);
}

function updateHUD() {
  drawHUD();
}

function playerTakeDamage(damage) {
  player.takeDamage(damage);
  console.log("Player HP:", player.hp);
  updateHUD();
}

function enemyTakeDamage(damage) {
  enemy.takeDamage(damage);
  console.log("Enemy HP:", enemy.hp);
  updateHUD();
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
      enemyTakeDamage(player.attackPower);
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
