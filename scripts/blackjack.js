import * as results from "./result.js";

//This is the nav menu
const menuBtn = document.querySelector(".menu-btn");
const modal = document.querySelector(".modal");
let menuOpen = false;
menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    menuBtn.classList.add("open");
    modal.style.display = "block";
    menuOpen = true;
  } else {
    menuBtn.classList.remove("open");
    modal.style.display = "none";
    menuOpen = false;
  }
});

//This is the buttons in the modal
const homeBtn = document.getElementById("homeBtn");
homeBtn.addEventListener("click", function () {
  window.location.replace("../home.html");
});

//Chips that the player has
var bank;

var chips = [
  //Row [0] - tenChips
  [10, 10, 10, 10, 10],
  //Row [1] - twentyfiveChips
  [25, 25, 25, 25],
  //Row [2] - fiftyChips, etc.
  [50, 50, 50],
  //Row [3] - hundredChips
  [100, 100],
  //Row [4] - twohundredfiftyChips
  [250, 250],
  //Row [5] - fivehundredChips
  [500, 500],
];

var tenChip = document.getElementById("10");
var twentyfiveChip = document.getElementById("25");
var fiftyChip = document.getElementById("50");
var hundredChip = document.getElementById("100");
var twohundredfiftyChip = document.getElementById("250");
var fivehundredChip = document.getElementById("500");

var canBet = true;
var betAmount = 0;

function bankAccount() {
  bank = 0;
  for (var i = 0; i < chips.length; i++) {
    for (var l = 0; l < chips[i].length; l++) {
      bank += chips[i][l];
    }
    updateBankAccount();
  }
}

function bet() {
  if (betAmount == 0) {
    alert("Click on the chip for how much you want to bet.");
    updateBetAmount(0);
    console.log(chips);
  }

  tenChip.addEventListener("click", function () {
    if (canBet && betAmount == 0) {
      checkBalance();
      updateBetAmount(10);
      bank -= 10;
      chips[0].splice(0, 1);
      console.log(chips[0]);
      updateBankAccount();
    } else if (canBet && betAmount != 0) {
      if (
        confirm("You have chosen an amount. Do you want to change?") == true
      ) {
        alert("Click on the chip for how much you want to bet.");
        updateBetAmount(0);
        bankAccount();
      }
    } else {
      alert("Sorry, you cannot bet anymore.");
    }
  });
  twentyfiveChip.addEventListener("click", function () {
    if (canBet && betAmount == 0) {
      checkBalance();
      updateBetAmount(25);
      bank -= 25;
      console.log(chips[1]);
      updateBankAccount();
    } else if (canBet && betAmount != 0) {
      if (
        confirm("You have chosen an amount. Do you want to change?") == true
      ) {
        alert("Click on the chip for how much you want to bet.");
        updateBetAmount(0);
        bankAccount();
      }
    } else {
      alert("Sorry, you cannot bet anymore.");
    }
  });
  fiftyChip.addEventListener("click", function () {
    if (canBet && betAmount == 0) {
      checkBalance();
      updateBetAmount(50);
      bank -= 50;
      console.log(chips[2]);
      updateBankAccount();
    } else if (canBet && betAmount != 0) {
      if (
        confirm("You have chosen an amount. Do you want to change?") == true
      ) {
        alert("Click on the chip for how much you want to bet.");
        updateBetAmount(0);
        bankAccount();
      }
    } else {
      alert("Sorry, you cannot bet anymore.");
    }
  });
  hundredChip.addEventListener("click", function () {
    if (canBet && betAmount == 0) {
      checkBalance();
      updateBetAmount(100);
      bank -= 100;
      console.log(chips[3]);
      updateBankAccount();
    } else if (canBet && betAmount != 0) {
      if (
        confirm("You have chosen an amount. Do you want to change?") == true
      ) {
        alert("Click on the chip for how much you want to bet.");
        updateBetAmount(0);
        bankAccount();
      }
    } else {
      alert("Sorry, you cannot bet anymore.");
    }
  });
  twohundredfiftyChip.addEventListener("click", function () {
    if (canBet && betAmount == 0) {
      checkBalance();
      updateBetAmount(250);
      bank -= 250;
      console.log(chips[4]);
      updateBankAccount();
    } else if (canBet && betAmount != 0) {
      if (
        confirm("You have chosen an amount. Do you want to change?") == true
      ) {
        alert("Click on the chip for how much you want to bet.");
        updateBetAmount(0);
        bankAccount();
      }
    } else {
      alert("Sorry, you cannot bet anymore.");
    }
  });
  fivehundredChip.addEventListener("click", function () {
    if (canBet && betAmount == 0) {
      checkBalance();
      updateBetAmount(500);
      bank -= 500;
      console.log(chips[5]);
      updateBankAccount();
    } else if (canBet && betAmount != 0) {
      if (
        confirm("You have chosen an amount. Do you want to change?") == true
      ) {
        alert("Click on the chip for how much you want to bet.");
        updateBetAmount(0);
        bankAccount();
      }
    } else {
      alert("Sorry, you cannot bet anymore.");
    }
  });

  //When player committed their bet amount, the game starts.
  document.getElementById("doneBetting").addEventListener("click", function () {
    if (betAmount == 0) {
      console.log(
        "You have not bet. Click on the chip for how much you want to bet."
      );
    } else {
      start = true;
      canBet = false;
    }
  });
}

function checkBalance() {
  if (bank < parseInt(document.getElementById("betMoney").innerHTML)) {
    canBet = false;
    alert("You have no money left! Go sell your kidney!");
  } else {
    canBet = true;
  }
}

function updateBankAccount() {
  if (bank <= 0) {
    document.getElementById("bank").innerHTML = 0;
  } else {
    document.getElementById("bank").innerHTML = bank;
  }
}

function updateBetAmount(amount) {
  betAmount = amount;
  document.getElementById("betMoney").innerHTML = betAmount;
}

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
var dealerSum = 0;
var yourSum = 0;
var start = false;

var dealerAceCount = 0;
var yourAceCount = 0;

var hidden; //Dealer's hidden card
var playerHiddenCard = document.getElementById("player-hidden");
var deck;

var canHit = false; //allows the player (you) to draw while yourSum <= 21 only when game starts.
var canSplit = false; //only allow the player (you) to split when they have 2 of the same value
var canStay = false; //will allow the player to click when game starts.

window.onload = function () {
  buildDeck();
  shuffleDeck();
  console.log(
    localStorage.getItem("chips") + "<br>" + localStorage.getItem("moneyInBank")
  );
  if (typeof Storage !== "undefined" || typeof Storage !== "") {
    chips = localStorage.getItem("chips");
    console.log("The betting chips have been updated.");
    //bank = localStorage.getItem("moneyInBank");
    bankAccount();
    console.log("The money in the bank has been updated.");
  } else {
    console.log("There is nothing stored in local storage.");
    bankAccount();
  }
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
  alert("Bet money to start game.");
  canBet = true;
  updateBetAmount(0);
  bet();
  document.getElementById("doneBetting").addEventListener("click", function () {
    if (betAmount == 0) {
      alert(
        "You have not bet. Click on the chip for how much you want to bet."
      );
      start = false;
    } else {
      alert(`You have bet ${betAmount} dollars! Let's play!`);
      start = true;
      document.getElementById("doneBetting").style.display = "none";
      canBet = false;
      console.log(`Start = ${start}`);
      canHit = true;
      canStay = true;

      //Game starts
      hidden = deck.pop();
      dealerSum += getValue(hidden);
      dealerAceCount += checkAce(hidden);
      playerHiddenCard.remove();

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
  document.getElementById("dealer-hidden").src = "./cards/" + hidden + ".png";

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
  document.getElementById("dealer-sum").innerText = dealerSum;
  document.getElementById("your-sum").innerText = yourSum;
  document.getElementById("results").innerText = message;

  results.giveResult();
  restartGame();
  console.log(results.currentResult);
  if (typeof Storage !== "undefined") {
    localStorage.setItem("moneyInBank", bank);
    console.log("The money in the bank has been updated.");
    localStorage.setItem("chips", chips);
    console.log("The betting chips have been updated.");
    localStorage.setItem("previousResult", results.currentResult);
    console.log("The previous result has been updated.");
  } else {
    console.log("Sorry! No Web Storage support..");
  }
  window.location.reload();
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
    `Bet amount is ${betAmount} and Current Result is ${results.currentResult}`
  );
  if (results.currentResult == "tie") {
    switch (betAmount) {
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
    switch (betAmount) {
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
    switch (betAmount) {
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
  console.log(chips);
  //if there was no last game, the computer will just run this:
  bankAccount();
  console.log(bank);
}
