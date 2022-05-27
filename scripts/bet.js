//Chips that the player has
var bank;
let chips = [
  [10, 10, 10],
  [20, 20, 20],
  [50, 50, 50],
  [100, 100, 100],
];

var tenChip = document.getElementById("10");
var twentyChip = document.getElementById("20");
var fiftyChip = document.getElementById("50");
var hundredChip = document.getElementById("100");

var canBet = true;
var betAmount = 0;

window.onload = function () {
  debugger;
  bankAccount();
  bet();
};

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
  alert("Click on the chip for how much you want to bet.");
  updateBetAmount();
  tenChip.addEventListener("click", function () {
    if (canBet && betAmount == 0) {
      checkBalance();
      betAmount = 10;
      updateBetAmount();
      bank -= 10;
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
  twentyChip.addEventListener("click", function () {
    if (canBet && betAmount == 0) {
      checkBalance();
      betAmount = 20;
      updateBetAmount();
      bank -= 20;
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
  alert(`You have bet ${betAmount} dollars! Let's play!`);
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

// document.getElementById("doneBetting").addEventListener("submit", function () {
//   alert(`You have bet ${betAmount} dollars! Let's play!`);
// });
