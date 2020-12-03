let lines = require("fs").readFileSync("./2/puzzle.txt").toString().split("\r\n");

let valid1 = [];
let valid2 = [];

for (const line of lines) {
  let min = line.split("-")[0];
  let max = line.split("-")[1].split(" ")[0];
  let char = line.split(" ")[1].split(":")[0];
  let password = line.split(" ")[2];

  // Part 1
  let charAmount = password.split("").filter(i => i == char).join("").length;
  if (charAmount >= min && charAmount <= max) {
    valid1.push(password);
  }

  // Part 2
  if ((password[+min - 1] == char && password[+max - 1] != char) || (password[+min - 1] != char && password[+max - 1] == char)) {
    valid2.push(password);
  }
}

console.log(`Part 1: ${valid1.length}\nPart 2: ${valid2.length}`);