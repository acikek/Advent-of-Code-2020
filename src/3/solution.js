let map = require("fs").readFileSync("./3/puzzle.txt").toString().split("\r\n");
let encounters = [];

let slopes = [ 
  { x: 1, y: 1 },
  { x: 3, y: 1 },
  { x: 5, y: 1 },
  { x: 7, y: 1 }, 
  { x: 1, y: 2 } 
]

let solutions = [];

for (const slope of slopes) {
  encounters.push([]);

  for (let i = 0; i < map.length / slope.y; i++) {
    if (!map[i * slope.y]) break;

    let line = map[i * slope.y];

    while (!line[i * slope.x]) {
      line = line + line;
    }

    encounters[slopes.indexOf(slope)].push(line[i * slope.x])
  }
}

encounters.forEach((list, i) => {
  encounters[i] = list.filter(char => char == "#").length;
});

// Part 1
solutions.push(encounters[1]);

// Part 2
solutions.push(encounters.reduce((a, b) => a * b));

console.log(`Part 1: ${solutions[0]}\nPart 2: ${solutions[1]}`);