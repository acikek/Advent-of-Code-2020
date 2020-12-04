let numbers = require("fs").readFileSync("./src/1/puzzle.txt", ).toString().split("\r\n");
let solutions = [];

// Part 1
for (let i = 0; i < numbers.length; i++) {
  for (let j = 0; j < numbers.length; j++) {
    if (+numbers[i] + +numbers[j] == 2020 && solutions.length < 1) {
      solutions.push(+numbers[i] * +numbers[j]);
    }
  }
}

// Part 2
for (let i = 0; i < numbers.length; i++) {
  for (let j = 0; j < numbers.length; j++) {
    for (let k = 0; k < numbers.length; k++) {
      if (+numbers[i] + +numbers[j] + +numbers[k] == 2020 && solutions.length < 2) {
        solutions.push(+numbers[i] * +numbers[j] * +numbers[k]);
      }
    }
  }
}

console.log(`Part 1: ${solutions[0]}\nPart 2: ${solutions[1]}`);