
// Assigning variables to HTML elements // 
let inputField = document.getElementById("timer");
let playerMove = document.querySelector("p");
let p1Choice =document.getElementById("p1choice");
let buttATK = document.getElementById("ATK");
let game = document.getElementById("game");
let duel = document.getElementById("Duel");
let p1PWR =  document.getElementById("p1PWR");
let help = document.getElementById("tut");
let p1Wait =  document.getElementById("p1Wait");
let p2Wait =  document.getElementById("p2Wait");
let p1Pic =  document.getElementById("p1Pic");
let p2Pic =  document.getElementById("p2Pic");
let characterButtons = document.querySelectorAll('.character button');


// creating variables for New game button //
let startGame = document.getElementById("NewGame");

let winner = false;

// Hiding the cards //
p1Wait.style.visibility = "hidden";
p2Wait.style.visibility = "hidden";
//p1Pic.style.visibility = "hidden";
//p2Pic.style.visibility = "hidden";

// Creating an Array of sentences to hold the Tutorial messages //
let tut = ["Each Player starts with 5 Health (HP)","And 1 base Attack Power (PWR)", "Press'W' or 'Up-Arrow' to Attack your opponent", "Press 'A or 'Right-Arrow' to Defend", "Press 'D' or 'Right-Arrow to Charge", "Doing so will increase your Attack PWR by 1"];let i = 0;
let loser = ["fa-solid fa-face-sad-sweat", "fa-solid fa-face-pleading","fa-solid fa-face-head-bandage"]; 

// Using 'setTimeout' function to have the Tutorial messages and effects change automatically //
help.addEventListener("click", tutorial);
function tutorial() {
    i = 0;
    inputField.innerText = tut[i];
    document.getElementById("p1HP").innerHTML = " " ;
    document.getElementById("p2HP").innerHTML = " ";
    document.getElementById("p1PWR").innerHTML = " ";
    document.getElementById("p2PWR").innerHTML = " ";
    p1Wait.style.visibility = "hidden"; 
    p2Wait.style.visibility = "hidden"; 
    
    if(i == 0){
        document.getElementById("p1HP").innerHTML =` HP: ${player1.baseHP}`;
        document.getElementById("p2HP").innerHTML =`HP: ${player2.baseHP}`;
        setTimeout(function(){
            document.getElementById("p1HP").style.color = "#90ee90";
            document.getElementById("p2HP").style.color = "#90ee90";
            i++;
        }, 500);
        
        setTimeout(function(){ 
            inputField.innerText = tut[i];
            p1PWR.innerText = `PWR: ${player1.ATK}`;
            document.getElementById("p2PWR").innerHTML =` PWR: ${player2.ATK}`;
            document.getElementById("p1HP").style.color = "black";
            document.getElementById("p2HP").style.color = "black"; document.getElementById("p1PWR").style.color = "#D10000";
            document.getElementById("p2PWR").style.color = "#D10000"; 
            i++
        }, 3500);
        
        setTimeout(function(){
            inputField.innerText = tut[i];
            i++
        }, 6500);
        
        setTimeout(function(){
            
            inputField.innerText = tut[i];
            i++; 
        }, 9500);
        
        setTimeout(function(){
            
            inputField.innerText = tut[i-1];
            i++
        }, 11500); 
        
        setTimeout(function(){
            
            inputField.innerText = tut[i-1];
            i++
        }, 16500); 
        
        setTimeout(function(){
            inputField.innerText = tut[i-1];
            i++
        }, 20000); 
    }
    window.reload()
}       



//Creating variables for the player's move choices //
let player1_Move;
let player2_Move;
let player1_choice = false; 
let player2_choice = false;


// // Player 1 attributes
// const player1 = {
//     baseHP : 5,
//     ATK : 1,
//     CRG : 0,
//     hasCharge : false,
//     timesATK : 0,
//     removeCharge(){
//         if(player1.hasCharge){
//             player1.ATK = 1;
//             player1.hasCharge = false;
//         }
//     },
//     blockCount : 0

// }
//perks 
// special attacks that deal 'elemental' damage (elemental based rps)
// Define the Player class
class Player {
    constructor() {
        this.name = "Player";
        this.baseHP = 5;
        this.HP = 5
        this.baseATK = 1
        this.ATK = 1;
        this.CRG = 0;
        this.hasCharge = false;
        this.timesATK = 0;
        this.blockCount = 0;
        this.blocking = false;
        this.shield = 0;
        this.attacked = false
    }
    
    removeCharge() {
        this.ATK = this.baseATK;
        if(this.shield <= 0){
            this.blocking = false
            this.shield = 0;
        }
    }
    takeDamage(damage, currentHP){
        
        this.HP -= damage;
    }
    
    block() {
        this.shield ++;
        if(this.shield > 1){
            this.shield = 1;
        }
        if(this.shield <= 0){
            this.blocking = false
            this.shield = 0;
        }
        
    }
    special(){
        if(this.shield <= 0){
            this.blocking = false
            this.shield = 0;
        }
        
        this.ATK ++;
        this.blocking = false
    }
}

// Define the Tank class     -- !!Find a way to balance the shield!! --
class Tank {
    constructor() {
        this.name = "Tank";
        this.baseHP = 6;
        this.HP = 6;
        this.baseATK = 1;
        this.ATK = 1;
        this.CRG = 0;
        this.hasCharge = false;
        this.timesATK = 0;
        this.blockCount = 0;
        this.blocking = false;
        this.shield = 0;
        this.attacked = false;
        this.hardenBuff = 0;
        
    }
    
    removeCharge(){
        if(this.shield <= 0){
            this.blocking = false
            this.shield = 0;
        }
    }
    
    takeDamage(damage, currentHP){
        
        let remaining = this.shield - damage;
        this.HP += remaining;
        this.shield = this.HP - currentHP;
        if(this.shield <= 0){
            this.shield = 0;
        }
        this.HP -= this.shield;
    }
    
    block(){
        console.log(this.ATK);
        this.shield ++;
        if(this.shield > 2){
            this.shield = 0
            this.ATK ++;
        }
    }
    
    // maybe nerf: decrease max HP or increase cooldown for buff
    special() {  
        if(this.shield <= 0){
            this.blocking = false
            this.shield = 0;
        }
        this.hardenBuff ++;
        if(this.hardenBuff >= 2){
            this.HP ++;
            if(this.HP >= 10){
                this.HP = 10;
            }
            this.hardenBuff = 0;
        }
    }
}

class Flame {
    constructor() {
        this.name = "Flame";
        this.baseHP = 4;
        this.HP = 4
        this.baseATK = 2
        this.ATK = 2;
        this.CRG = 0;
        this.hasCharge = false;
        this.timesATK = 0;
        this.blockCount = 0;
        this.blocking = false;
        this.shield = 0;
        this.flameWall = false;
        this.burn = this.ATK * .50;
        
    }
    
    removeCharge() {
        this.ATK = this.baseATK;
        if(this.shield <= 0){
            this.blocking = false
            this.shield = 0;
        }
    }
    takeDamage(damage, currentHP){
        
        if(this.flameWall){
            this.HP -= damage * .50;
            this.flameWall = false;
        }
        else{
            this.HP -= damage;
        }
    }
    //     let remaining = this.shield - damage;
    //     this.HP += remaining;
    //     this.shield = this.HP - currentHP;
    //     if(this.shield <= 0){
    //         this.shield = 0;
    //     }
    //     this.HP -= this.shield;
    // }
    block() {
        this.flameWall = true;
        
        
    }
    special(){
        if(this.shield <= 0){
            this.blocking = false
            this.shield = 0;
        }
        this.ATK ++;
        this.blocking = false
    }
}

class Shadow {
    constructor() {
        this.name = "Shadow";
        this.baseHP = 5;
        this.HP = 5
        this.baseATK = 1
        this.ATK = 1;
        this.CRG = 0;
        this.hasCharge = false;
        this.timesATK = 0;
        this.blockCount = 0;
        this.blocking = false;
        this.shield = 0;
        this.attacked = false
        this.voidMark = 0;
        this.voidGrasp = 0;
        this.illusionSuccessful = false;
        
    }
    
    removeCharge() {
        this.ATK = this.baseATK;
        if(this.shield <= 0){
            this.blocking = false
            this.shield = 0;
        }
    }
    takeDamage(damage, currentHP){
        
        this.HP -= damage;
    }
    block() {
        console.log("Blocked!");
    }
    
    placeIllusion(status) {
        this.illusionSuccessful = status;
        if(this.illusionSuccessful){
            this.voidMark ++;
            if(this.voidMark == 2){
                this.ATK ++;
            }
            if(this.voidMark > 2 && this.voidMark < 5){
                this.HP ++;
            }
            
        }
        else{
            this.ATK --;
            this.HP --;
            this.voidMark = 0;
            if(this.HP <= 0){
                this.HP = 0;
            }
            if(this.ATK <= 0){
                this.ATK = 0;
            }
        }
        
        
    }
    markEnemy(){
        this.voidMark ++;
        if(this.voidMark == 2){
            this.ATK ++;
        }
        if(this.voidMark > 2 && this.voidMark < 5){
            this.HP ++;
        }
    }
    special(enemy){
        if(this.shield <= 0){
            this.blocking = false
            this.shield = 0;
        }
        // ADD if there are 5 stacks of Void Marks removed
        this.HP += this.voidMark / 2;
        this.ATK += this.voidMark / 2;
        this.voidMark = 0
        
        
        this.blocking = false
    }
}
// Assuming you have already defined the Player, Tank, Flame, and Shadow classes

let player1
let player2


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Retrieve the character data from URL parameters
const player1CharacterData = JSON.parse(urlParams.get('player1Character'));
const player2CharacterData = JSON.parse(urlParams.get('player2Character'));

console.log(player1CharacterData)
console.log(player2CharacterData)

switch(player1CharacterData) {
    case 'Tank':
    console.log("Character 1 selected")
    player1 = new Tank();
    break
    case 'Flame':
    console.log("Character 2 selected")
    player1 = new Flame();
    break
    case 'Shadow':
    console.log("Character 3 selected")
    player1 = new Shadow();
    break
    case 'Default':
    console.log("Character 4 selected")
    player1 = new Player();
    break
    
}


switch(player2CharacterData) {
    case 'Tank':
    console.log("Character 1 selected")
    player2 = new Tank();
    break
    case 'Flame':
    console.log("Character 2 selected")
    player2 = new Flame();
    break
    case 'Shadow':
    console.log("Character 3 selected")
    player2 = new Shadow();
    break
    case 'Default':
    console.log("Character 4 selected")
    player2 = new Player();
    break
    
}






// // Player 2 attributes  
// const player2 = {
//     baseHP : 5,
//     ATK : 1,
//     CRG : 0,
//     hasCharge : false,
//     timesATK : 0,
//     removeCharge(){
//         if(player2.hasCharge){
//             player2.ATK = 1;
//             player2.hasCharge = false;
//         }
//     },
//     blockCount : 0
// }

//------------------------------------------------------------------------OLD VERSION----------------------------------------------------------------//
// addEventListener -- When the 'start game' button is clicked, the game should initialize
//startGame.addEventListener("click",function(){

//display health at beginning


/* Create a way for players to input their move choice------- old 'working' behavior (doesn't update stats properly)
let player1_Move =  prompt("Player 1, enter your move:");

let player2_Move = prompt("Player 2, enter your move:");  //----------old 'working' behavior ^^^
*/
//TODO Create a way for player prevent player's attacking 3 times in a row //
//----------------------------------------------------------------------------------------------------------------------------------------------------//


if(winner){
    startGame.innerHTML = "Play Again";
    
}
//---------------https://javascript.info/css-animations

function restartGame() {
    player1.HP = player1.baseHP;
    player2.HP = player2.baseHP;
    player1.ATK = player1.baseATK;
    player2.ATK = player2.baseATK;
    inputField.innerText = " ";
    document.getElementById("Name--1").style.color = "black";
    document.getElementById("Name--0").style.color = "black";
    document.getElementById("p1HP").style.color = "black";
    document.getElementById("p2HP").style.color = "black";
    document.getElementById("p1PWR").style.color = "black";
    document.getElementById("p2PWR").style.color = "black";
    //p1Pic.src = " "
    //p2Pic.src = " "
    
    
    player1_choice = false;
    player2_choice = false;  
    p1Wait.style.visibility = "hidden"; 
    p2Wait.style.visibility = "hidden";
    p1Pic.style.visibility = "hidden";
    p2Pic.style.visibility = "hidden"
    
    
    
    
    
    //p1Pic.style.visibility = "hidden"; p2Pic.style.visibility = "hidden";
    
    
}


// Create a function to update screen the player stats //
function updateStats(){
    
    
    console.log("P1:" + player1.shield);
    console.log("P2: " +player2.shield);
    
    
    setTimeout(function(){ 
        
        p1Wait.style.visibility = "visible";  
        p2Wait.style.visibility = "visible";
        p1Pic.style.visibility = "hidden";
        p2Pic.style.visibility = "hidden";
        
    },1000);
    
    document.getElementById("p1HP").innerHTML =` HP: ${player1.HP}`;
    document.getElementById("p2HP").innerHTML =`HP: ${player2.HP}`;
    
    document.getElementById("p1BLK").innerHTML =`BLK: ${player1.shield}`;
    if(player1.name == "Shadow"){
        document.getElementById("p1BLK").innerHTML =`MRK: ${player1.voidMark}`;
    }
    document.getElementById("p2BLK").innerHTML =`DEF: ${player2.shield}`;
    if(player2.name == "Shadow"){
        document.getElementById("p2BLK").innerHTML =`MRK: ${player2.voidMark}`;
    }
    p1PWR.innerText = `PWR: ${player1.ATK}`;
    document.getElementById("p2PWR").innerHTML =` PWR: ${player2.ATK}`;// p1Pic.style.visibility = "visible";
    
    //p2Pic.style.visibility = "visible";
}

// <i class="fa-solid fa-spinner fa-spin-pulse"></i> //
//   -------Maybe add checkmark once player selects move------ //
startGame.addEventListener("click", function(){
    // startGame.onclick = history.go(0);
    if(winner){
        startGame.onclick = history.go(0);
        startGame.innerHTML = "Play Again";
    }
    
    
    restartGame();
    updateStats();
    // On load, the window will be listening for keyboard input. 
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
        
        
        
        
        if(player1.HP <= 0){
            inputField.innerText = "Player 2 wins!";
            document.getElementById("Name--1").style.color = "#90ee90";
            document.getElementById("p1HP").innerHTML = "You lost";
            document.getElementById("p1PWR").innerHTML = " Unlucky... "; 
            p2Wait.className = "fa-solid fa-face-grin-wink fa-4x";
            p1Wait.className = "fa-solid fa-face-frown-open fa-4x";
            
            winner = true;
        }
        
        else if(player2.HP <= 0){
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
        
        
        
        
        
        updateStats();
        //if(player1.baseHP <= 0){
        // document.getElementById("p1HP").innerHTML = "Player 2 Wins!";
        // }
        
        //if(player2.baseHP <= 0){
        // document.getElementById("p1HP").innerHTML = "Player 1 Wins!";
        // }
        
        
        // If player 1 Attacks and player 2 Charges:
        if(player1_Move == "a" && player2_Move == "c"){
            
            
            
            //player1.shield --; 
            //player2.shield --; 
            
            // OR check if(!player.name == "Tank") - if so change the this.shield +=2 to this.shield++ in the tank class
            
            if(player1.name == "Flame" && player1.flameWall){
                player1.ATK += player1.burn;
                player1.flameWall = false;
            }
            
            if(player2.name == "Flame"){
                player1.takeDamage(player2.burn, player1.HP);  // Attacking player gets burned while Flame uses 'ignite'
                
            }
            if(player1.name == "Shadow"){
                player1.markEnemy();
            }
            
            if(player2.name == "Tank" && player2.shield > 0){
                player2.shield--;
            }
            else{
                player2.takeDamage(player1.ATK, player2.HP);
            }
            
            // if(player1.shield <= 0){
            //     if(player2.name == "Flame"){
            //         player1.HP -= 1;
            
            //     }
            
            // }
            // if(player2.shield <= 0){
            //     if(player1.name == "Flame" && player1.flameWall){
            //         player2.HP -= player1.burn;
            //         player1.flameWall = false;
            //     }
            //     if(player2.name == "Flame"){
            //         player2.HP -= player1.ATK * .50
            //     }
            //     else{ 
            //         player2.HP -= player1.ATK;
            //     }
            
            // }
            player2.special(player1);
            player1.removeCharge();
            
            player1.blockCount = 0;
            player2.blockCount = 0;
            console.log(`p1 HP : ${player1.HP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.HP}, p2 PWR : ${player2.ATK} `);
            inputField.innerText = "Player 1 Attacked while Player 2 was Charging!";
            
            // animate the HP stat when taking damage
            setTimeout(function(){document.getElementById("p2HP").style.color = "black"; }, 500);
            document.getElementById("p2HP").style.color = "#D10000";
            
            updateStats();
            
            round();
            
        }
        
        // If both players Attack
        if(player1_Move == "a" && player2_Move == "a"){
            if(player1.flameWall){
                player1.ATK += player1.burn;
            }
            if(player2.flameWall){
                player2.ATK += player2.burn;
            }
            if(player1.ATK < player2.ATK){
                
                // player1.shield --;
                // if(player1.shield <= 0){
                
                //     if(player2.name == "Flame" && player2.flameWall){
                //         player1.HP -= player2.burn;
                //         player2.flameWall = false
                //     }
                //     if(player1.name == "Flame"){
                //         if(player1.flameWall){
                //             player1.HP -= (player2.ATK - player1.ATK) * .50
                //             player1.flameWall = false;
                //         }
                //         else{
                //             player1.HP -= (player2.ATK - player1.ATK)
                //         }
                //     }
                //     else{
                //         player1.HP -= (player2.ATK - player1.ATK)
                //     }
                // }
                if(player1.name == "Shadow"){
                    player1.markEnemy();
                }
                if(player2.name == "Shadow"){
                    player2.markEnemy();
                }
                
                if(player1.name == "Tank" && player1.shield > 0){
                    player1.shield --;
                }
                else{
                    player1.takeDamage(player2.ATK - player1.ATK, player1.HP)
                }
                // else{
                //     if(player1.name == "Flame" && player1.flameWall){
                //         player1.takeDamage((player2.ATK - player1.ATK) * .50, player1.HP);
                //         player1.flameWall = false;
                //     }   else{
                //         player1.takeDamage((player2.ATK - player1.ATK), player1.HP);
                //     }
                
                // }
                
                
                player2.removeCharge();
                player1.removeCharge();
                player1.blockCount = 0;
                player2.blockCount = 0;
                
                console.log(`p1 HP : ${player1.HP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.HP}, p2 PWR : ${player2.ATK} `);
                updateStats();
                inputField.innerText = "Player 2 Overpowered Player 1's Attack!";
                round();
            }
            
            // If the player 1 has more Attack Power than the player 2, player 2 will receive the attack difference
            else if(player1.ATK > player2.ATK){
                
                // player2.shield --;
                
                // if(player2.shield <= 0){
                
                //     if(player1.name == "Flame" && player1.flameWall){
                //         player2.HP -= player1.burn;
                //         player1.flameWall = false;
                //     }
                //     if(player2.name == "Flame" && player2.flameWall){
                //         if(player2.flameWall){
                //             player2.HP -= (player1.ATK - player2.ATK) * .50
                //             player2.flameWall = false;
                //         }
                //         else{
                //             player2.HP -= (player1.ATK - player2.ATK)
                //         }
                //     }
                //     else{
                //         player2.HP -= (player1.ATK - player2.ATK)
                //     }
                
                // }
                if(player1.name == "Shadow"){
                    player1.markEnemy();
                }
                if(player2.name == "Shadow"){
                    player2.markEnemy();
                }
                
                if(player2.name == "Tank" && player2.shield > 0){
                    player2.shield --;
                }
                
                
                
                else{
                    player2.takeDamage((player1.ATK - player2.ATK), player2.HP);
                }
                
                
                
                player2.removeCharge();
                player1.removeCharge();
                player1.blockCount = 0;
                player2.blockCount = 0;
                
                console.log(`p1 HP : ${player1.HP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.HP}, p2 PWR : ${player2.ATK} `);
                // animate the HP stat when taking damage
                setTimeout(function(){document.getElementById("p2HP").style.color = "black"; }, 700);
                document.getElementById("p2HP").style.color = "#D10000";
                inputField.innerText = "Player 1 Overpowered Player 2's Attack!";
                updateStats();
                round();
            }
            else{
                if(player1.name == "Shadow"){
                    player1.markEnemy();
                }
                if(player2.name == "Shadow"){
                    player2.markEnemy();
                }
                player1.removeCharge();
                player2.removeCharge();
                player1.blockCount = 0;
                player2.blockCount = 0;
                console.log(`p1 HP : ${player1.HP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.HP}, p2 PWR : ${player2.ATK} `);
                inputField.innerText = "          Both players Attacked!";
                updateStats();
                round();
            }  
        }
        
        // If player 1 Charges and player 2 Attacks:
        if(player1_Move == "c" && player2_Move == "a"){
            
            if(player1.name == "Flame"){
                player2.takeDamage(player1.burn, player2.HP);  // Attacking player gets burned while Flame uses 'ignite'
                
            }
            
            if(player2.name == "Flame" && player2.flameWall){
                player2.ATK += player2.burn;
                player2.flameWall = false;
            }
            
            if(player2.name == "Shadow"){
                player2.markEnemy();
            }
            
            if(player1.name == "Tank" && player1.shield > 0){
                player1.shield--;
            }
            else{
                player1.takeDamage(player2.ATK, player1.HP);
            }
            
            
            
            
            
            
            
            // if(player1.name == "Flame"){
            //     player2.takeDamage(player1.burn, player2.HP);
            //     if(player1.flameWall){
            //         player2.takeDamage(player2.ATK * .50, player2.HP);
            //         player1.flameWall = false;
            //     }
            // }
            
            // if(player1.name == "Tank" && player1.shield > 0){
            //     player1.shield --;
            // }
            
            // else{
            
            
            //         player1.takeDamage(player2.ATK, player1.HP)
            
            // }
            
            
            // //player1.special();
            // if(player2.shield <= 0){
            //     if(player1.name == "Flame"){
            //         player2.HP -= 1; //or 50 of Flames
            
            //     }
            
            
            // }
            // if(player1.shield <= 0 ){
            //     if(player1.name == "Flame" && player1.flameWall){
            //         player1.HP -= player2.ATK * .50
            //     }
            //     else{
            //         player1.HP -= player2.ATK;
            //     } 
            //     if(player2.name == "Flame" && player2.flameWall){
            //         player1.HP -= player2.burn;
            //         player2.flameWall = false;
            //     }
            
            
            // }
            
            
            //player1.HP -= player2.ATK;
            player1.special(player2);
            player2.removeCharge();
            player1.blockCount = 0;
            player2.blockCount = 0;
            console.log(`p1 HP : ${player1.baseHP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.baseHP}, p2 PWR : ${player2.ATK} `);
            // animate the HP stat when taking damage
            setTimeout(function(){document.getElementById("p1HP").style.color = "black"; }, 700);
            document.getElementById("p1HP").style.color = "#D10000";
            
            inputField.innerText = "Player 2 Attacked while player 1 was Charging!";
            updateStats();
            round();
        }
        
        // If player 
        if(player1_Move == "a" && player2_Move == "b"){
            if(player2.blockCount > 1){
                if(player1.name == "Flame" && player1.flameWal){
                    player1.ATK += player1.burn;
                    player1.flameWall = false;
                }
                if(player1.name == "Shadow"){
                    player1.markEnemy();
                }
                
                player2.takeDamage(player1.ATK, player2.HP)
                
                console.log("player 2 shield Broken!");
                console.log(`p1 HP : ${player1.HP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.HP}, p2 PWR : ${player2.ATK} `);
                inputField.innerText = "           Player 2 shield Broken!";
                updateStats();
                round();
                player1.removeCharge();
                player2.blockCount++;
                player1.blockCount = 0;
                
            }
            if(player2.blockCount == 1){
                player1.removeCharge();
                player2.blockCount++;
                player1.blockCount = 0;
                player2.block();
                if(player2.name == "Flame"){
                    player2.takeDamage(player1.ATK, player1.HP)
                }
                if(player2.name == "Shadow"){
                    player2.placeIllusion(true)
                    
                }
                // if(player2.name == "Dusk"){
                //     player2.voidMark ++;
                
                // }
                
                console.log(`p1 HP : ${player1.HP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.HP}, p2 PWR : ${player2.ATK} `);
                
                
                updateStats();
                round();
                inputField.innerText = "     Player 2 has no block's remaining!";
            }
            if(player2.blockCount < 1){
                player1.removeCharge();
                player2.blockCount++;
                player1.blockCount = 0;
                player2.block();
                if(player2.name == "Flame"){
                    player2.takeDamage(player1.ATK, player1.HP)
                }
                if(player2.name == "Shadow"){
                    player2.placeIllusion(true)
                    
                }
                // if(player2.name == "Dusk"){
                //     player2.voidMark ++;
                
                // }
                
                console.log(`p1 HP : ${player1.HP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.HP}, p2 PWR : ${player2.ATK} `);
                inputField.innerText = "     Player 2 blocked Player 1's Attack!";
                updateStats();
                round();
            }
        }
        
        if(player1_Move == "b" && player2_Move == "a"){
            if(player1.blockCount > 1){
                
                if(player2.name == "Flame" && player2.flameWal){
                    player2.ATK += player2.burn;
                    player2.flameWall = false;
                }
                if(player2.name == "Shadow"){
                    player2.markEnemy();
                }
                player1.takeDamage(player2.ATK, player1.HP)
                console.log("player 1 shield Broken!");
                console.log(`p1 HP : ${player1.HP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.HP}, p2 PWR : ${player2.ATK} `);
                inputField.innerText = "          Player 1 shield Broken!"
                updateStats();
                round();
                player2.blockCount = 0;
            }
            if(player1.blockCount == 1){
                player2.removeCharge();
                player1.block();
                player1.blockCount++;
                player2.blockCount = 0;
                if(player1.name == "Flame"){
                    player1.takeDamage(player2.ATK, player1.HP)
                }
                if(player1.name == "Shadow"){
                    player1.placeIllusion(true)
                    
                }
                // if(player1.name == "Dusk"){
                //     player1.voidMark ++;
                
                // }
                
                console.log(`p1 HP : ${player1.HP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.HP}, p2 PWR : ${player2.ATK} `);
                updateStats();
                round();
                inputField.innerText = "     Player 1 has no block's remaining!";
            }
            if(player1.blockCount < 1){
                player2.removeCharge();
                player1.blockCount++;
                player2.blockCount = 0;
                player1.block()
                if(player1.name == "Flame"){
                    player1.takeDamage(player2.ATK, player1.HP)
                }
                if(player1.name == "Shadow"){
                    player1.placeIllusion(true)                  
                }
                // if(player1.name == "Dusk"){
                //     player1.voidMark ++;
                
                // }
                
                console.log(`p1 HP : ${player1.HP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.HP}, p2 PWR : ${player2.ATK} `);
                inputField.innerText = "     Player 1 blocked Player 2's Attack!";
                updateStats();
                round();
            }
        }
        if(player1_Move == "b" && player2_Move == "c"){
            player1.blockCount++;
            player1.block()
            player2.special();
            if(player1.name == "Shadow"){
                player1.placeIllusion(false)                  
            }
            player2.blockCount = 0;
            
            inputField.innerText = "  Player 1 Blocked while Player 2 Charged!";
            updateStats();
            round();
        }
        if(player1_Move == "c" && player2_Move == "b"){
            player2.block()
            player1.special();
            player2.blockCount++;
            if(player2.name == "Shadow"){
                player2.placeIllusion(false)                  
            }
            inputField.innerText = "    Player 1 Charged while Player 2 Blocked!";
            
            updateStats();
            round();
        }
        
        if(player1_Move == "c" && player2_Move == "c"){
            player1.special();
            player2.special();
            player1.blockCount = 0;
            player2.blockCount = 0;
            console.log("Both players charged!");
            console.log(`p1 HP : ${player1.HP} p1 PWR : ${player1.ATK} , p2 HP : ${player2.HP}, p2 PWR : ${player2.ATK} `);
            inputField.innerText = "          Both players charged!";
            updateStats();
            round();
            
        }
        if(player1_Move == "b" && player2_Move == "b"){
            player1.blockCount++;
            player2.blockCount++;
            player1.block();
            player2.block();
            if(player1.name == "Flame"){
                player1.flameWall = true;
            }
            if(player2.name == "Flame"){
                player2.flameWall = true;
            }
            if(player1.name == "Shadow"){
                player1.placeIllusion(0)                  
            }
            if(player2.name == "Shadow"){
                player2.placeIllusion(0)                  
            }
            inputField.innerText = "      Both players blocked! Nothing happened";
            updateStats();
            round();
        }
    }
});



/* 
if(p1ATKp2){ 
    player2.baseHP -= player1.ATK;
    player2.CRG++;
    console.log(`p1 hp : ${player1.baseHP} , p2 hp : ${player2.baseHP}, p2 CRG : ${player2.CRG} `);
}
*/

/*    function updateStats(){
    // player1.removeCharge();
    // player2.removeCharge();
    // updateStats();
    document.getElementById("p1HP").innerHTML =` HP: ${player1.baseHP}`;
    document.getElementById("p2HP").innerHTML =`HP: ${player2.baseHP}`;
    document.getElementById("p1PWR").innerHTML =` PWR: ${player1.ATK}`;
    document.getElementById("p2PWR").innerHTML =` PWR: ${player2.ATK}`;
    
}
*/
//     })


//-------------------------------------------------------------------- everything bellow this is liarfguhvrusfhcwufhmksaj,fhmckiutvkfuc----------------------------------------------------//




//})

// Creating 'base cases' for every player interaction outcome

/*


if (player1_Move == "b" && player2_Move == "a") {
    
    
    if(player1.blockCount == 2){
        playerMove.innerText = "Player 1 has no more block remaining!";
        
        player1.blockCount++;
        player2.CRG = 0;
        player2.ATK = 1;
    }
    
    
    // if player 1 tried to block after already blocking twice in a row, their next block will fail. //
    else if(player1.blockCount >= 2){
        player1.baseHP -= (player2.ATK + player2.CRG);
        playerMove.innerText = "Player 2's Attack went through!"; 
        player1.blockCount = 0;
        player2.CRG = 0;
        // player2.removeCharge();
    }
    
    else{
        playerMove.innerText = "Player 1 Defended Player 2's Attack!"
        player1.blockCount++;
        player2.CRG = 0;
    }
    //  player2.removeCharge();
}


if (player1_Move == "b" && player2_Move == "b") {
    playerMove.innerText = "Both players blocked! Nothing happened";
    player1.blockCount++;
}



if (player1_Move == "b" && player2_Move == "c") {
    player2.CRG++;
    player2.hasCharge = true;
    playerMove.innerText = "Player 1 Defended, Player 2 is charging up!";
    player1.blockCount++;
    prompt("Player 1 Defended, Player 2 is charging up!");
    updateStats();
}


// if player 2 tried to block after already blocking twice in a row, their next block will fail. //
if (player1_Move == "a" && player2_Move == "b") {
    
    if(player2.blockCount == 2){
        playerMove.innerText = "Player 2 has no more block remaining!";
        player2.blockCount++;
        player1.CRG = 0;
        //  player1.removeCharge();
    }
    
    if(player2.blockCount >= 2){
        player2.baseHP -= (player1.ATK - player1.CRG);
        playerMove.innerText = "Player 2's Attack went through!";
        player2.blockCount = 0;
        player1.CRG = 0;
        //  player1.removeCharge();
    }
    
    else{
        playerMove.innerText ="Player 2 Defended Player 1's Attack!";
        player2.blockCount++;
        player1.CRG = 0;
    }
    // player1.removeCharge();
}


if (player1_Move == "c" && player2_Move == "b") {
    player1.CRG++;
    player1.hasCharge = true;
    playerMove.innerText ="Player 1 is charging up! Player 2 Defended";
    player2.blockCount++;
    prompt("Player 2 has no more block remaining!");
}


if (player1_Move == "a" && player2_Move == "a") {
    if(player1.ATK > player2.ATK){
        player2.baseHP -= ((player1.ATK + player1.CRG) - (player2.ATK + player2.CRG));
        playerMove.innerText ="Player 1' Attack overpowered Player 2's Attack!";
        player1.CRG = 0;
        player2.CRG = 0;
        player2.removeCharge();
        updateStats();
        
        
    }
    if(player2.ATK > player1.ATK){
        player1.baseHP -= ((player2.ATK + player2.CRG) - (player1.ATK + player1.CRG));
        playerMove.innerText ="Player 2' Attack overpowered Player 1's Attack!";
        //player1.removeCharge();
        player1.CRG = 0;
        player2.CRG = 0;
    }
    
    else{
        player2.baseHP -= player1.ATK;
        player1.baseHP -= player2.ATK;
        playerMove.innerText = "Both Player's Attacked!";
    }
    player1.CRG = 0;
    player2.CRG = 0;
    // player1.removeCharge();
    // player2.removeCharge();
    
}


if (player1_Move == "a" && player2_Move == "c") {
    player2.baseHP -= player1.ATK;
    player2.CRG++;
    player2.hasCharge = true;
    player1.CRG = 0;
    //player1.removeCharge();
    playerMove.innerText ="Player 1 Attacked while player 2 was charging!";
}


if (player1_Move == "c" && player2_Move == "a") {
    player1.baseHP -= player2.ATK;
    player1.CRG++;
    player1.hasCharge = true;
    player2.CRG = 0;
    player2.removeCharge();
    playerMove.innerText ="Player 2 Attacked while player 1 was charging!";
}


if (player1_Move == "c" && player2_Move == "c") {
    player2.CRG++;
    player1.CRG++;
    player1.hasCharge = true;
    player2.hasCharge = true;
    playerMove.innerText ="Both players charged up!";
}


// Show the HP status of both players





// Find a way to display the game's winner
if (player1.baseHP <= 0 && player2.baseHP <= 0) {
    prompt("It's a tie!!");
}


else if (player1.baseHP <= 0) {
    prompt("Player 2 wins!");
}


else if (player2.baseHP <= 0) {
    prompt("Player 1 wins!");
}

//updateStats();



//------------------------------
//charge doesn't update correctly  :( // 

})
//threads to have syncr

function updateStats(){
    // player1.removeCharge();
    // player2.removeCharge();
    // updateStats();
    document.getElementById("p1HP").innerHTML =` HP: ${player1.baseHP}`;
    document.getElementById("p2HP").innerHTML =`HP: ${player2.baseHP}`;
    document.getElementById("p1PWR").innerHTML =` PWR: ${player1.CRG}`;
    document.getElementById("p2PWR").innerHTML =` PWRR: ${player2.CRG}`;
    
}



*/
