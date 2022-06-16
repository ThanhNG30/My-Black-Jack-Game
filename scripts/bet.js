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
    updateBetAmount();
    console.log(chips);
  }

  tenChip.addEventListener("click", function () {
    if (canBet && betAmount == 0) {
      checkBalance();
      betAmount = 10;
      updateBetAmount();
      bank -= 10;
      chips[0].splice(0, 1);
      console.log(chips[0]);
      updateBankAccount();
    } else if (canBet && betAmount != 0) {
      if (
        confirm("You have chosen an amount. Do you want to change?") == true
      ) {
        betAmount = 0;
        alert("Click on the chip for how much you want to bet.");
        updateBetAmount();
        bankAccount();
      }
    } else {
      alert("Sorry, you cannot bet anymore.");
    }
  });
  twentyfiveChip.addEventListener("click", function () {
    if (canBet && betAmount == 0) {
      checkBalance();
      betAmount = 25;
      updateBetAmount();
      bank -= 25;
      chips[1].splice(0, 1);
      console.log(chips[1]);
      updateBankAccount();
    } else if (canBet && betAmount != 0) {
      if (
        confirm("You have chosen an amount. Do you want to change?") == true
      ) {
        betAmount = 0;
        alert("Click on the chip for how much you want to bet.");
        updateBetAmount();
        bankAccount();
      }
    } else {
      alert("Sorry, you cannot bet anymore.");
    }
  });
  fiftyChip.addEventListener("click", function () {
    if (canBet && betAmount == 0) {
      checkBalance();
      betAmount = 50;
      updateBetAmount();
      bank -= 50;
      chips[2].splice(0, 1);
      console.log(chips[2]);
      updateBankAccount();
    } else if (canBet && betAmount != 0) {
      if (
        confirm("You have chosen an amount. Do you want to change?") == true
      ) {
        betAmount = 0;
        alert("Click on the chip for how much you want to bet.");
        updateBetAmount();
        bankAccount();
      }
    } else {
      alert("Sorry, you cannot bet anymore.");
    }
  });
  hundredChip.addEventListener("click", function () {
    if (canBet && betAmount == 0) {
      checkBalance();
      betAmount = 100;
      updateBetAmount();
      bank -= 100;
      chips[3].splice(0, 1);
      console.log(chips[3]);
      updateBankAccount();
    } else if (canBet && betAmount != 0) {
      if (
        confirm("You have chosen an amount. Do you want to change?") == true
      ) {
        betAmount = 0;
        alert("Click on the chip for how much you want to bet.");
        updateBetAmount();
        bankAccount();
      }
    } else {
      alert("Sorry, you cannot bet anymore.");
    }
  });
  twohundredfiftyChip.addEventListener("click", function () {
    if (canBet && betAmount == 0) {
      checkBalance();
      betAmount = 250;
      updateBetAmount();
      bank -= 250;
      chips[4].splice(0, 1);
      console.log(chips[4]);
      updateBankAccount();
    } else if (canBet && betAmount != 0) {
      if (
        confirm("You have chosen an amount. Do you want to change?") == true
      ) {
        betAmount = 0;
        alert("Click on the chip for how much you want to bet.");
        updateBetAmount();
        bankAccount();
      }
    } else {
      alert("Sorry, you cannot bet anymore.");
    }
  });
  fivehundredChip.addEventListener("click", function () {
    if (canBet && betAmount == 0) {
      checkBalance();
      betAmount = 500;
      updateBetAmount();
      bank -= 500;
      chips[5].splice(0, 1);
      console.log(chips[5]);
      updateBankAccount();
    } else if (canBet && betAmount != 0) {
      if (
        confirm("You have chosen an amount. Do you want to change?") == true
      ) {
        betAmount = 0;
        alert("Click on the chip for how much you want to bet.");
        updateBetAmount();
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

function updateBetAmount() {
  document.getElementById("betMoney").innerHTML = betAmount;
}
