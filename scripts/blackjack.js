import * as results from "./result.js"; //this contains the recorded results
import * as BankAccount from "./bankAccount.js"; //this contains the bank and allow betting

const PLAY_BTN = document.getElementById("playBtn");
const HIT_BTN = document.getElementById("hit");
const STAY_BTN = document.getElementById("stay");
const SPLIT_BTN = document.getElementById("split");
const DEALER_SUM_ID = document.getElementById("dealer-sum");
const PLAYER_SUM_ID = document.getElementById("your-sum");

var dealerSum = 0;
var yourSum = 0;
var start = false;

var dealerAceCount = 0;
var yourAceCount = 0;

var hiddenVal;
var yourHiddenCard = document.getElementById("your-hidden");
var deck;

var canHit = false; //allows the player (you) to draw while yourSum <= 21 only when game starts.
var canSplit = false; //only allow the player (you) to split when they have 2 of the same value
var canStay = false; //will allow the player to click when game starts.

//This is the nav menu
const menuBtn = document.querySelector(".menu-btn");
let menuOpen = false;
menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    menuBtn.classList.add("open");
    menuOpen = true;
  } else {
    menuBtn.classList.remove("open");
    menuOpen = false;
  }
});

window.onload = function () {
  buildDeck();
  shuffleDeck();
  console.log(`Current Result is ${results.currentResult}`);
  //restartGame();
  startGame();
  // debugger;
};

function buildDeck() {
  let values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  let types = ["C", "D", "H", "S"]; //C for Clubs, D for Diamonds, H for Hearts, S for Spades
  deck = [];

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + types[i]); //The deck is generated from Ace-Clubs to King-Spades
    }
  }
  console.log("Done building deck of cards.");
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  console.log("Done shuffling cards.");
  console.log(`Can I bet = ${BankAccount.canBet}`);
}

// playBtn.addEventListener("click", function () { //???
//   if (playBtn.style.display == "block") {
//     playBtn.classList.add("hidden"); //the Play button disappears and game starts.
//     //startGame = true;
//   } else {
//     playBtn.classList.remove("hidden"); //the Play button is shown knowing that game hasn't start.
//     //startGame = false;
//   }
// });

function startGame() {
  BankAccount.bankAccount();
  BankAccount.updateBetAmount(0);
  BankAccount.bet();

  // When the 'play' btn is hit
  PLAY_BTN.addEventListener("click", function () {
    if (BankAccount.betAmount == 0) {
      alert(
        "You have not bet. Click on the chip for how much you want to bet."
      );
      start = false;
    } else {
      alert(`You have bet ${BankAccount.betAmount} dollars! Let's play!`);
      this.classList.add("hidden"); //Hide the 'play' btn when start playing
      start = true;
      BankAccount.canBet = false;
      console.log(`Start = ${start}`);
      canHit = true;
      canStay = true;

      //Game starts
      hiddenVal = deck.pop(); //Assign value to dealer's hidden card without showing the card to the player
      dealerSum += getValue(hiddenVal);
      dealerAceCount += checkAce(hiddenVal);
      yourHiddenCard.parentNode.removeChild(yourHiddenCard);

      while (dealerSum < 17) {
        //<img src="./cards/4-C.png">
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
      }
      console.log(dealerSum);

      for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
      }

      console.log(yourSum);
    }
  });

  HIT_BTN.addEventListener("click", hit);
  STAY_BTN.addEventListener("click", stay);
  SPLIT_BTN.addEventListener("click", split);
}

function hit() {
  // if (!canHit) {
  //   alert("Sorry, the game has not start yet.");
  //   return;
  // }
  while (canHit) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if (
      reduceAce(yourSum, yourAceCount) == 19 ||
      reduceAce(yourSum, yourAceCount) == 20
    ) {
      //letting the player know that they have a better chance of winning if they don't hit.
      canHit = confirm("Are you sure you want to hit?");
    } else if (reduceAce(yourSum, yourAceCount) > 23) {
      //A, J, 8 -> 1 + 10 + 8
      canHit = false;
      stay(); //automatically end the game with the player losing
    }
  }
}

function stay() {
  // if (!canStay) {
  //   alert("Sorry, the game has not start yet.");
  //   return;
  // }
  dealerSum = reduceAce(dealerSum, dealerAceCount);
  yourSum = reduceAce(yourSum, yourAceCount);
  if (yourSum >= 16) canStay = true; //you can only stay when you have at least 16

  while (canStay) {
    canHit = false;
    document.getElementById("dealer-hidden").src =
      "./cards/" + hiddenVal + ".png";

    let message = "";
    //When you or dealer sum is over 21.
    if (yourSum > 21) {
      message = "You Lose! Want to try again?";
    } else if (dealerSum > 21) {
      message = "You win! Let's play another round!";
    }
    //When you and dealer both <=21
    else if (yourSum > dealerSum) {
      message = "You win! Let's play another round!";
    } else if (yourSum < dealerSum) {
      message = "You Lose! Want to try again?";
    } else if (yourSum == dealerSum) {
      message = "Tie! Let's play another round!";
    }
    DEALER_SUM_ID.innerText = dealerSum;
    PLAYER_SUM_ID.innerText = yourSum;
    document.getElementById("results").innerText = message;

    var playAgainBtn = document.createElement("button");
    playAgainBtn.id = "play-again";

    const btnBox = document.getElementById("btn-box");
    playAgainBtn.innerText = "Play again";

    playAgainBtn.addEventListener("click", () => {
      results.giveResult(); //from file result.js
      //restartGame();
      console.log(results.currentResult);
      //window.location.reload();
    });
    btnBox.appendChild(playAgainBtn);
  }
}

function getValue(card) {
  let data = card.split("-"); // "4-C" -> ["4", "C"]
  let value = data[0];

  if (isNaN(value)) {
    //A J Q K
    if (value == "A") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

function checkAce(card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
}

function reduceAce(playerSum, playerAceCount) {
  while (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10;
    playerAceCount -= 1;
  }
  return playerSum;
}

function split() {
  if (!canSplit) {
    alert("Sorry, the game has not start yet.");
    return;
  }
  console.log(`Player's cards: ${yourCards}`);
  //Get the values of the cards the player currently has.
  for (var i = 0; i < yourCards.length; i++) {
    var oneCard = yourCards[i].split("-");
    yourValues.push(oneCard[0]);
  }
  console.log(`Values that you currently have are: ${yourValues}`);

  //Check if the player has 2 of the same value, then he/she can split.
  const toFindDuplicates = (yourValues) =>
    yourValues.filter((value, index) => yourValues.indexOf(value) !== index); //Return the duplicated value in your cards
  const duplicateElements = toFindDuplicates(yourValues);
  console.log(duplicateElements);

  if (duplicateElements != "") {
    canSplit = true;
    alert("You can split!");
  } else {
    alert("You are not able to split!");
  }
}

function restartGame() {
  //Check for last game's result
  console.log(
    `Bet amount is ${BankAccount.betAmount} and Current Result is ${results.currentResult}`
  );
  if (results.currentResult == "tie") {
    switch (BankAccount.betAmount) {
      case 10:
        chips[0].splice(0, 1, 10);
        break;
      case 25:
        chips[1].splice(0, 1, 25);
        break;
      case 50:
        chips[2].splice(0, 1, 50);
        break;
      case 100:
        chips[3].splice(0, 1, 100);
        break;
      case 250:
        chips[4].splice(0, 1, 250);
        break;
      case 500:
        chips[5].splice(0, 1, 500);
        break;
      default:
        console.log(chips);
    }
  } else if (results.currentResult == "lose") {
    switch (BankAccount.betAmount) {
      case 10:
        chips[0].splice(0, 1);
        break;
      case 25:
        chips[1].splice(0, 1);
        break;
      case 50:
        chips[2].splice(0, 1);
        break;
      case 100:
        chips[3].splice(0, 1);
        break;
      case 250:
        chips[4].splice(0, 1);
        break;
      case 500:
        chips[5].splice(0, 1);
        break;
      default:
    }
  } else if (results.currentResult == "win") {
    switch (BankAccount.betAmount) {
      case 10:
        chips[0].splice(0, 0, 10);
        break;
      case 25:
        chips[1].splice(0, 0, 25);
        break;
      case 50:
        chips[2].splice(0, 0, 50);
        break;
      case 100:
        chips[3].splice(0, 0, 100);
        break;
      case 250:
        chips[4].splice(0, 0, 250);
        break;
      case 500:
        chips[5].splice(0, 0, 500);
        break;
      default:
    }
  }
  //console.log(BankAccount.chips);
  //if there was no last game, the computer will just run this:
  //bankAccount();
  //console.log(bank);
}
