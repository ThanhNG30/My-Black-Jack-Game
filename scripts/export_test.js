var start = false;

var input = prompt("Should we start the game?");

function change() {
  if (start.toString() != input) {
    start = true;
    console.log("Let's start!");
  }
}

// change();

export { start, input, change };
