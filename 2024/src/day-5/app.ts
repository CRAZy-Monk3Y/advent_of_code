import * as fs from "fs";
import path from "path";

const input_string = fs.readFileSync(
  //   path.join(__dirname, "input.txt"),
  path.join(__dirname, "test.txt"),
  "utf-8"
);

let correctPageUpdatesSum = 0;

// split the rules , and pages updates
let pageRules = input_string
  .split("\r\n\r\n")[0]
  .split("\r\n")
  .map((line) => {
    return line.split("|").map(Number);
  });
let pageUpdates = input_string
  .split("\r\n\r\n")[1]
  .split("\r\n")
  .map((line) => {
    return line.split(",").map(Number);
  });

// check rule for a pageUpdate
function checkRuleForPageUpdate(rule: number[], update: number[]): boolean {
  let smallerPos = undefined;
  let biggerPos = undefined;
  for (let i = 0; i < update.length; i++) {
    if (update[i] === rule[0]) {
      smallerPos = i + 1;
    }
    if (update[i] === rule[1]) {
      biggerPos = i + 1;
    }
  }
  if (!smallerPos || !biggerPos) return true;

  return smallerPos < biggerPos;
}

// get the middle page From updare
function getMidPageForUpdate(pageUpdate: number[]): number {
  return pageUpdate[Math.floor(pageUpdate.length / 2)];
}

function swap(update: number[], l: number, r: number): void {
  let tmp = update[l];
  update[l] = update[r];
  update[r] = tmp;
}
// check rule for a pageUpdate with index
function checkRuleForPageUpdateIndex(
  rule: number[],
  update: number[]
): number[] {
  let smallerPos = 0;
  let biggerPos = 0;
  for (let i = 0; i < update.length; i++) {
    if (update[i] === rule[0]) {
      smallerPos = i + 1;
    }
    if (update[i] === rule[1]) {
      biggerPos = i + 1;
    }
  }

  return [smallerPos, biggerPos];
}

let incorrectPagesUpdate = [];

// iterate over the pageUpdates and check
for (let update of pageUpdates) {
  //   console.log(update);
  let isValidPage = true;

  for (let rule of pageRules) {
    let check = checkRuleForPageUpdate(rule, update);

    if (!check) {
      //   console.log(update);
      isValidPage = false;
      break;
    }
  }
  //   console.log(isValidPage, update);

  if (isValidPage) {
    const mid = getMidPageForUpdate(update);
    // console.log(mid);
    correctPageUpdatesSum += mid;
  } else {
    incorrectPagesUpdate.push(update);
  }
}

// part 2

let incorrectPagesUpdateSum = 0;

for (let index = 0; index < incorrectPagesUpdate.length; index++) {
  let update = incorrectPagesUpdate[index];
  //   console.log(update);
  //   swap(update, 0, 2);
  //   console.log(update);
  for (let rule of pageRules) {
    let check = checkRuleForPageUpdate(rule, update);

    if (!check) {
      console.log(update);
      const [l, r] = checkRuleForPageUpdateIndex(rule, update);
      swap(update, l - 1, r - 1);
      console.log(update);

      index = 0;
      break;
    }
  }
}

for (let update of incorrectPagesUpdate) {
  incorrectPagesUpdateSum += getMidPageForUpdate(update);
}

console.log(incorrectPagesUpdateSum);

fs.writeFileSync(
  path.join(__dirname, "output.txt"),
  `Correct Page Update Sum is: ${correctPageUpdatesSum}\nIncorrect Page Update Sum is: ${incorrectPagesUpdateSum}\n`,
  {
    encoding: "utf-8",
  }
);
