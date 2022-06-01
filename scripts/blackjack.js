import * as bet from "./bet.js";

var dealerSum = 0;
var yourSum = 0;
var start = bet.start;
var canBet = bet.canBet;
var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
var deck;

var canHit = false; //allows the player (you) to draw while yourSum <= 21 only when game starts.
var canSplit = false; //only allow the player (you) to split when they have 2 of the same value
var canStay = false; //will allow the player to click when game starts.

window.onload = function () {
  buildDeck();
  shuffleDeck();
  alert("Bet money to start game.");
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
  let types = ["C", "D", "H", "S"];
  deck = [];

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
    }
  }
  // console.log(deck);
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  console.log(deck);
}

function startGame() {
  bet.bankAccount();
  bet.bet();
  document.getElementById("doneBetting").addEventListener("click", function () {
    if (bet.betAmount == 0) {
      alert(
        "You have not bet. Click on the chip for how much you want to bet."
      );
      start = false;
    } else {
      alert(`You have bet ${bet.betAmount} dollars! Let's play!`);
      start = true;
      canBet = false;
      console.log(`Start = ${start}`);
      canHit = true;
      canStay = true;

      //Game starts
      hidden = deck.pop();
      dealerSum += getValue(hidden);
      dealerAceCount += checkAce(hidden);
      // console.log(hidden);
      // console.log(dealerSum);
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
      // document.getElementById("hit").addEventListener("click", function () {
      //   if (start == false) {
      //     alert("Sorry, the game has not start yet.");
      //   } else if (start == true) {
      //     hit;
      //   } else {
      //     console.log(`Start value: ${start} <br>There is something wrong.`);
      //   }
      // });
    }
  });
  // document.getElementById("hit").addEventListener("click", function () {
  //   if (canHit == true || start == true) {
  //     hit();
  //     console.log(`Start value: ${start} and canHit value: ${canHit}.`);
  //   } else {
  //     console.log(`Start value: ${start} and canHit value: ${canHit}.`);
  //     alert("Sorry, the game has not start yet.");
  //   }
  // });
  document.getElementById("hit").addEventListener("click", hit);
  document.getElementById("stay").addEventListener("click", stay);
  document.getElementById("split").addEventListener("click", split);
}

function hit() {
  if (!canHit) {
    alert("Sorry, the game has not start yet.");
    return;
  }

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
    confirm("Are you sure you want to hit?");
  } else if (reduceAce(yourSum, yourAceCount) > 23) {
    //A, J, 8 -> 1 + 10 + 8
    canHit = false;
    stay();
  }
}

function stay() {
  if (!canStay) {
    alert("Sorry, the game has not start yet.");
    return;
  }
  dealerSum = reduceAce(dealerSum, dealerAceCount);
  yourSum = reduceAce(yourSum, yourAceCount);

  canHit = false;
  document.getElementById("hidden").src = "./cards/" + hidden + ".png";

  let message = "";
  if (yourSum > 21) {
    message = "You Lose!";
  } else if (dealerSum > 21) {
    message = "You win!";
  }
  //both you and dealer <= 21
  else if (yourSum == dealerSum) {
    message = "Tie!";
  } else if (yourSum > dealerSum) {
    message = "You Win!";
  } else if (yourSum < dealerSum) {
    message = "You Lose!";
  }

  document.getElementById("dealer-sum").innerText = dealerSum;
  document.getElementById("your-sum").innerText = yourSum;
  document.getElementById("results").innerText = message;
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
