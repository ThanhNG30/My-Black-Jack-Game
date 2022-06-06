//The game won't start until the player bet
export var start = false;

//Chips that the player has
export var bank;

export var chips = [
  [10, 10, 10, 10, 10],
  [25, 25, 25, 25],
  [50, 50, 50],
  [100, 100],
  [250, 250],
  [500],
];

export var tenChip = document.getElementById("10");
export var twentyChip = document.getElementById("20");
export var fiftyChip = document.getElementById("50");
export var hundredChip = document.getElementById("100");

export var canBet = true;
export var betAmount = 0;

// window.onload = function () {
//   debugger;
//   alert("Put your money down for the game to start.");
//   bankAccount();
//   bet();
// };

export function bankAccount() {
  bank = 0;
  for (var i = 0; i < chips.length; i++) {
    for (var l = 0; l < chips[i].length; l++) {
      bank += chips[i][l];
    }
    updateBankAccount();
  }
}

export function bet() {
  if (betAmount == 0) {
    alert("Click on the chip for how much you want to bet.");
    updateBetAmount();
  }

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

export function checkBalance() {
  if (bank < parseInt(document.getElementById("betMoney").innerHTML)) {
    canBet = false;
    alert("You have no money left! Go sell your kidney!");
  } else {
    canBet = true;
  }
}

export function updateBankAccount() {
  if (bank <= 0) {
    document.getElementById("bank").innerHTML = 0;
  } else {
    document.getElementById("bank").innerHTML = bank;
  }
}

export function updateBetAmount() {
  document.getElementById("betMoney").innerHTML = betAmount;
}
