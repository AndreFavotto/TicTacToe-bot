//The Collatz Sequence - using synchronous input

const prompt = require("prompt-sync")();

function collatz(number) {
  if (!Number.isInteger(number)) throw new Error("Invalid input!");
  else if (number == 1) return;
  else if (number % 2 == 0) {
    answ = Math.floor(number / 2);
    console.log(answ);
    collatz(answ);
  } else {
    answ = 3 * number + 1;
    console.log(answ);
    collatz(answ);
  }
}

function run() {
  const input = prompt("Type an integer: ");
  try {
    collatz(Number(input));
  } catch (e) {
    console.error(e);
  }
}

run();