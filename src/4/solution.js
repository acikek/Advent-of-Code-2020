let sets = require("fs").readFileSync("./src/4/puzzle.txt").toString().split("\r\n\r\n");
let valid1 = [], valid2 = [];

sets.forEach(doc => {
  let keys = {};

  doc.match(/(byr|iyr|eyr|hgt|hcl|ecl|pid):(\S*)/gm).sort().map(line => {
    let l = line.split(":");
    keys[l[0]] = l[1];
  });

  // Part 1
  if (Object.keys(keys).length != 7) return; valid1.push(keys);

  // Part 2
  if (+keys.byr < 1920 || +keys.byr > 2002) return;
  if (+keys.iyr < 2010 || +keys.iyr > 2020) return;
  if (+keys.eyr < 2020 || +keys.eyr > 2030) return;

  let hgt = keys.hgt.match(/(\d*)(cm|in)/); if (!hgt) return; let hgtData = { value: +hgt[1], system: hgt[2] }
  if (hgtData.system == "cm" && (hgtData.value < 150 || hgtData.value > 193)) return;
  else if (hgtData.system == "in" && (hgtData.value < 59 || hgtData.value > 76)) return;

  let hcl = keys.hcl.match(/#[a-f0-9]*/); if (!hcl) return;
  if (hcl[0].length != 7) return;

  if (!["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(keys.ecl)) return;
  let pid = keys.pid.match(/^[0-9]{9}$/); if (!pid) return;

  valid2.push(keys);
});

console.log(`Part 1: ${valid1.length}\nPart 2: ${valid2.length}`);