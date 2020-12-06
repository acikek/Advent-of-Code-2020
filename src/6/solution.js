let forms = require("fs").readFileSync("./src/6/puzzle.txt").toString().split("\r\n\r\n");
let solutions = [];

// Part 1
solutions.push(forms.map(form => getAnswers(form)).reduce((a, b) => a + b, 0));

// Part 2
solutions.push(forms.map(form => getCommonAnswers(form)).reduce((a, b) => a + b, 0));

function getAnswers(form) {
  return new Set(form.replace(/[\r|\n]/g, "").split("")).size;
}

function getCommonAnswers(form) {
  let common = [], separate = form.split("\r\n"), answers = [...new Set(separate.join(""))];

  answers.forEach(answer => {
    if (separate.join("").split("").filter(char => char == answer).length == separate.length) {
      common.push(answer);
    }
  }); return common.length;
}

console.log(`Part 1: ${solutions[0]}\nPart 2: ${solutions[1]}`);