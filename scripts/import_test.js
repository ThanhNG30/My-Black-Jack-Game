import * as startGame from "./export_test.js";
//Just type in true or false
startGame.change();

var canStart = startGame.start;
console.log(canStart);

if (canStart) {
  alert("Game is now starting...");
}
//This works!!!
