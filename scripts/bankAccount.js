//<div class="bank-account">
const BANK_ID = document.getElementById("bank");
const MONEY_BET_ID = document.getElementById("betMoney");

//<div class="chips">
const TEN_CHIP = document.getElementById("10");
const TWENTY_FIVE_CHIP = document.getElementById("25");
const FIFTY_CHIP = document.getElementById("50");
const A_HUNDRED_CHIP = document.getElementById("100");
const TWO_HUNDRED_FIFTY_CHIP = document.getElementById("250");
const FIVE_HUNDRED_CHIP = document.getElementById("500");

var playerBalance;
var canBet = true; //allow the player to bet at the beginning
var betAmount = 0;

var chips = [
  //array of all the chips
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

export function bankAccount() {
  //player balance is the total of all chips they have
  playerBalance = 0;
  for (var i = 0; i < chips.length; i++) {
    for (var l = 0; l < chips[i].length; l++) {
      playerBalance += chips[i][l];
    }
  }
  updateBankAccount();
}

function checkBalance() {
  if (playerBalance < parseInt(MONEY_BET_ID.innerHTML)) {
    canBet = false;
    alert("You have no money left! Go sell your kidney!");
  } else {
    canBet = true;
  }
}

function updateBankAccount() {
  if (playerBalance <= 0) {
    BANK_ID.innerHTML = 0;
  } else {
    BANK_ID.innerHTML = playerBalance;
  }
  console.log(`Bank account aka player balance updated: ${playerBalance}`);
}

export function updateBetAmount(amount) {
  betAmount = amount;
  MONEY_BET_ID.innerHTML = betAmount; //display the bet amount
  console.log(`Bet amount updated: ${amount}`);
}

export function bet() {
  if (betAmount == 0) {
    alert("Click on the chip for how much you want to bet.");
    updateBetAmount(0);
    //console.log(chips);
  }

  TEN_CHIP.addEventListener("click", function () {
    if (canBet && betAmount == 0) {
      checkBalance();
      updateBetAmount(10);
      chips[0].splice(0, 1); //Remove first 10 chip
      bankAccount();
    } else if (canBet && betAmount != 0) {
      if (
        confirm("You have chosen an amount. Do you want to change?") == true
      ) {
        //alert("Click on the chip for how much you want to bet.");
        updateBetAmount(0);
        chips[0].splice(0, 0, 10); //Add 10 back to row 0 of the chips arr
        bankAccount();
      }
    } else {
      alert("Sorry, you cannot bet anymore.");
    }
  });
  TWENTY_FIVE_CHIP.addEventListener("click", function () {
    if (canBet && betAmount == 0) {
      checkBalance();
      updateBetAmount(25);
      bankAccount();
    } else if (canBet && betAmount != 0) {
      if (
        confirm("You have chosen an amount. Do you want to change?") == true
      ) {
        alert("Click on the chip for how much you want to bet.");
        updateBetAmount(0);
        chips[0].splice(0, 0, 25); //Add 25 back to row 0 of the chips arr
        bankAccount();
      }
    } else {
      alert("Sorry, you cannot bet anymore.");
    }
  });
  FIFTY_CHIP.addEventListener("click", function () {
    if (canBet && betAmount == 0) {
      checkBalance();
      updateBetAmount(50);
      bankAccount();
    } else if (canBet && betAmount != 0) {
      if (
        confirm("You have chosen an amount. Do you want to change?") == true
      ) {
        alert("Click on the chip for how much you want to bet.");
        updateBetAmount(0);
        chips[0].splice(0, 0, 50); //Add 50 back to row 0 of the chips arr
        bankAccount();
      }
    } else {
      alert("Sorry, you cannot bet anymore.");
    }
  });
  A_HUNDRED_CHIP.addEventListener("click", function () {
    if (canBet && betAmount == 0) {
      checkBalance();
      updateBetAmount(100);
      bankAccount();
    } else if (canBet && betAmount != 0) {
      if (
        confirm("You have chosen an amount. Do you want to change?") == true
      ) {
        alert("Click on the chip for how much you want to bet.");
        updateBetAmount(0);
        chips[0].splice(0, 0, 100); //Add 100 back to row 0 of the chips arr
        bankAccount();
      }
    } else {
      alert("Sorry, you cannot bet anymore.");
    }
  });
  TWO_HUNDRED_FIFTY_CHIP.addEventListener("click", function () {
    if (canBet && betAmount == 0) {
      checkBalance();
      updateBetAmount(250);
      bankAccount();
    } else if (canBet && betAmount != 0) {
      if (
        confirm("You have chosen an amount. Do you want to change?") == true
      ) {
        alert("Click on the chip for how much you want to bet.");
        updateBetAmount(0);
        chips[0].splice(0, 0, 250); //Add 250 back to row 0 of the chips arr
        bankAccount();
      }
    } else {
      alert("Sorry, you cannot bet anymore.");
    }
  });
  FIVE_HUNDRED_CHIP.addEventListener("click", function () {
    if (canBet && betAmount == 0) {
      checkBalance();
      updateBetAmount(500);
      bankAccount();
    } else if (canBet && betAmount != 0) {
      if (
        confirm("You have chosen an amount. Do you want to change?") == true
      ) {
        alert("Click on the chip for how much you want to bet.");
        updateBetAmount(0);
        chips[0].splice(0, 0, 500); //Add 500 back to row 0 of the chips arr
        bankAccount();
      }
    } else {
      alert("Sorry, you cannot bet anymore.");
    }
  });

  //When player committed their bet amount, the game starts.
  document.getElementById("playBtn").addEventListener("click", function () {
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

export { betAmount, playerBalance, canBet };
