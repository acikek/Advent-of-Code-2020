// Trying a cleaner approach today. Thought I should mix things up a bit.

let passes = require("fs").readFileSync("./src/5/puzzle.txt").toString().split("\r\n");
let solutions = [];

// Part 1
let seatIDs = passes.map(x => getSeatID(x));
solutions.push(Math.max(...seatIDs));

// Part 2
solutions.push(findMissingElement(seatIDs));

function parsePass(pass) {
  return [ pass.slice(0, 7), pass.slice(7) ];
}

function binaryPartition(set, lower, upper) {
  let range = { min: 0, max: (2 ** set.length) - 1 };

  set.split("").forEach(i => {
    let outcome = ((range.max + 1) - range.min) / 2;

    if (i == lower) range.max -= outcome;
    else if (i == upper) range.min += outcome;
  });

  return range.min;
}

function getSeatID(pass) {
  let parsed = parsePass(pass);
  return (binaryPartition(parsed[0], "F", "B") * 8) + binaryPartition(parsed[1], "L", "R");
}

function findMissingElement(arr) {
  let [ min, max ] = [ Math.min(...arr), Math.max(...arr) ];
  return Array.from(Array(max - min), (v, i) => i + min).filter(i => !arr.includes(i));
}

console.log(`Part 1: ${solutions[0]}\nPart 2: ${solutions[1]}`);