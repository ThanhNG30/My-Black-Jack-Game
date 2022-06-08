var currentResult = "";
var previousResults = [];

function giveResult() {
  let msgOnWeb = document.getElementById("results").innerText;
  switch (msgOnWeb) {
    case "You win! Let's play another round!":
      currentResult = "win";
      previousResults.push(currentResult);
      break;
    case "You Lose! Want to try again?":
      currentResult = "lose";
      previousResults.push(currentResult);
      break;
    case "Tie! Let's play another round!":
      currentResult = "tie";
      previousResults.push(currentResult);
      break;
    default:
      currentResult = "";
  }
}

export { currentResult, previousResults, giveResult };
