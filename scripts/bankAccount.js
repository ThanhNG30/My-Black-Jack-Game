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

export function buildChipsBank() {
  let chips = [
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

  //   for (let rowCount = 0; rowCount < chips.length; rowCount++) {
  //     for (
  //       let elementCount = 0;
  //       elementCount < chips[rowCount].length;
  //       elementCount++
  //     ) {
  //       let chipImg = document.createElement("img");
  //       switch (chips[rowCount][elementCount]) {
  //         case 10:
  //           chipImg.src = "./assets/red_chip.png";
  //           TEN_CHIP.appendChild(chipImg);
  //           break;
  //         case 25:
  //           chipImg.src = "./assets/blue_chip.png";
  //           TWENTY_FIVE_CHIP.appendChild(chipImg);
  //           break;
  //         case 50:
  //           chipImg.src = "./assets/green_chip.png";
  //           FIFTY_CHIP.appendChild(chipImg);
  //           break;
  //       }
  //     }
  //   }
}

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

function updateBankAccount() {
  if (playerBalance <= 0) {
    BANK_ID.innerHTML = 0;
  } else {
    BANK_ID.innerHTML = playerBalance;
  }
  console.log(`Bank account aka player balance updated: ${playerBalance}`);
}

// function checkBalance() {
//   if (playerBalance < parseInt(MONEY_BET_ID.innerHTML)) {
//     // Check if the bet amount is greater than the amount in player's bank account
//     canBet = false;
//     alert("You have no money left! Go sell your kidney!");
//   } else {
//     canBet = true;
//   }
// }

export function updateBetAmount(amount) {
  betAmount += amount;
  MONEY_BET_ID.innerHTML = betAmount; //display the bet amount
  console.log(`Bet amount updated: ${amount}`);
}

// export function bet() {
//   if (betAmount == 0) {
//     alert("Click on the chip for how much you want to bet.");
//     updateBetAmount(0);
//     //console.log(chips);
//   }

//   TEN_CHIP.addEventListener("click", function () {
//     if (canBet && betAmount > playerBalance) {
//       console.log(`Player balance is = ${playerBalance}`);

//       if (
//         confirm(
//           "You have reached your limit. Do you want to choose a different amount?"
//         ) == true
//       ) {
//         removeBetAmount(betAmount);
//         updateBetAmount(0);
//         bankAccount();
//         console.log(`Arr of chips = { ${chips} }`);
//       } else canBet = false;
//     } else {
//       chips[0].splice(0, 1); //Remove 1 chip from the 10th chips row
//       updateBetAmount(10);
//     }
//     bankAccount();
//   });
//   TWENTY_FIVE_CHIP.addEventListener("click", function () {
//     if (canBet && betAmount > playerBalance) {
//       console.log(`Player balance is = ${playerBalance}`);

//       if (
//         confirm(
//           "You have reached your limit. Do you want to choose a different amount?"
//         ) == true
//       ) {
//         removeBetAmount(betAmount);
//         updateBetAmount(0);
//         bankAccount();
//         console.log(`Arr of chips = { ${chips} }`);
//       } else canBet = false;
//     } else {
//       chips[1].splice(0, 1); //Remove 1 chip from the 25th chips row
//       updateBetAmount(25);
//     }
//     bankAccount();
//   });
//   FIFTY_CHIP.addEventListener("click", function () {
//     if (canBet && betAmount > playerBalance) {
//       console.log(`Player balance is = ${playerBalance}`);

//       if (
//         confirm(
//           "You have reached your limit. Do you want to choose a different amount?"
//         ) == true
//       ) {
//         removeBetAmount(betAmount);
//         updateBetAmount(0);
//         bankAccount();
//         console.log(`Arr of chips = { ${chips} }`);
//       } else canBet = false;
//     } else {
//       chips[2].splice(0, 1); //Remove 1 chip from the 50th chips row
//       updateBetAmount(50);
//     }
//     bankAccount();
//   });
//   A_HUNDRED_CHIP.addEventListener("click", function () {
//     if (canBet && betAmount > playerBalance) {
//       console.log(`Player balance is = ${playerBalance}`);

//       if (
//         confirm(
//           "You have reached your limit. Do you want to choose a different amount?"
//         ) == true
//       ) {
//         removeBetAmount(betAmount);
//         updateBetAmount(0);
//         bankAccount();
//         console.log(`Arr of chips = { ${chips} }`);
//       }
//     } else {
//       chips[3].splice(0, 1); //Remove 1 chip from the 100th chips row
//       updateBetAmount(100);
//     }
//     bankAccount();
//   });
//   TWO_HUNDRED_FIFTY_CHIP.addEventListener("click", function () {
//     if (canBet && betAmount > playerBalance) {
//       console.log(`Player balance is = ${playerBalance}`);

//       if (
//         confirm(
//           "You have reached your limit. Do you want to choose a different amount?"
//         ) == true
//       ) {
//         removeBetAmount(betAmount);
//         updateBetAmount(0);
//         bankAccount();
//         console.log(`Arr of chips = { ${chips} }`);
//       } else canBet = false;
//     } else {
//       chips[4].splice(0, 1); //Remove 1 chip from the 250th chips row
//       updateBetAmount(250);
//     }
//     bankAccount();
//   });
//   FIVE_HUNDRED_CHIP.addEventListener("click", function () {
//     if (canBet && betAmount > playerBalance) {
//       console.log(`Player balance is = ${playerBalance}`);

//       if (
//         confirm(
//           "You have reached your limit. Do you want to choose a different amount?"
//         ) == true
//       ) {
//         removeBetAmount(betAmount);
//         updateBetAmount(0);
//         bankAccount();
//         console.log(`Arr of chips = { ${chips} }`);
//       } else canBet = false;
//     } else {
//       chips[5].splice(0, 1); //Remove 1 chip from the 500th chips row
//       updateBetAmount(500);
//     }
//     bankAccount();
//   });
// }

// function removeBetAmount(anAmount) {
//   switch (anAmount) {
//     case 10:
//       chips[0].splice(0, 0, 10); //Add 1 chip back in the 10th chips row
//       break;
//     case 25:
//       chips[1].splice(0, 0, 25);
//       break;
//     case 50:
//       chips[2].splice(0, 0, 50);
//       break;
//     case 100:
//       chips[3].splice(0, 0, 100);
//       break;
//     case 250:
//       chips[4].splice(0, 0, 250);
//       break;
//     case 500:
//       chips[5].splice(0, 0, 500);
//       break;
//   }
// }

export { betAmount, playerBalance, canBet };
