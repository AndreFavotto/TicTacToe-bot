//The Collatz Sequence - using asynchronous input

const readline = require("readline");

function getInput() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Type an integer: ", (number) => {
      resolve(number);
      rl.close();
    });
  });
}

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

async function run() {
  const input = await getInput();
  try {
    collatz(Number(input));
  } catch (e) {
    console.error(e);
  }
}

run();
