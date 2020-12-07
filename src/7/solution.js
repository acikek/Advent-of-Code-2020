let bags = require("fs").readFileSync("./src/7/puzzle.txt").toString().split("\r\n");
let solutions = [], bagData = getBagData(bags);

// Part 1
solutions.push(findParentCount(bagData, "shiny gold"));

// Part 2
solutions.push(findChildCount(bagData, "shiny gold"));

function findParentCount(bagData, bag) {
  let parentList = [];

  function cycle(bD, b) {
    let data = bD.source[b];

    if (data) {
      for (const parent in data) {
        parentList.push(parent);
        cycle(bD, parent);
      }
    }

    return new Set(parentList).size;
  }

  let data = cycle(bagData, bag);
  parentList = []; return data;
}

function findChildCount(bagData, bag) {
  let data = bagData.contains[bag], total = 0;

  if (data) {
    for (const child in data) {
      let count = data[child];
      total += count;
      total += findChildCount(bagData, child) * count;
    }
  }

  return total;
}

function getBagData(bags) {
  let contains = {}, source = {};

  bags.forEach(bag => {
    let parsed = parseBag(bag);
    contains[parsed.name] = parsed.data;
    
    if (parsed.data) {
      for (const bag in parsed.data) {
        if (!source[bag]) source[bag] = {};
        source[bag][parsed.name] = parsed.data[bag];
      }
    }
  });

  return { contains, source };
}

function parseBag(bag) {
  if (bag.includes("no other")) {
    return { 
      name: bag.split(" bags")[0],
      data: null
    }
  }

  let parsed = bag.match(/(.*) bags contain (\d .*)/), name = parsed[1], data = {};
  
  parsed[2].replace(/bags/g, "bag").replace(" bag.", "").split(" bag, ")
    .forEach(contents => {
      data[contents.slice(2)] = +contents.slice(0, 1);
    });

  return { name, data };
} 

console.log(`Part 1: ${solutions[0]}\nPart 2: ${solutions[1]}`);