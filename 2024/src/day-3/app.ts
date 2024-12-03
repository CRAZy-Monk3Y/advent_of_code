import * as fs from "fs";
import path from "path";

const input_string = fs.readFileSync(
  path.join(__dirname, "input.txt"),
  "utf-8"
);
const len = input_string.length;

function doMultiplication(inputString: string): number {
  let commaIndex = inputString.indexOf(",");
  let num1 = Number(inputString.slice(4, commaIndex));
  let num2 = Number(inputString.slice(commaIndex + 1, inputString.length - 1));
  return num1 * num2;
}

let multiplicationSum = 0;

// Part 2
let startIndex = 0,
  endIndex = len,
  tempSubStr = "",
  conditionalMultiplicationSum = 0,
  isEnabled = true;

function checkMultiplicationSum(substring: string): number {
  const regex = /mul\((\d+),(\d+)\)/g;
  const matches: any = substring.match(regex);
  console.log(matches);

  let sum = 0;
  matches.forEach((match: string) => {
    sum += doMultiplication(match);
  });

  return sum;
}

multiplicationSum = checkMultiplicationSum(input_string);

for (let i = 0; i < len; i++) {
  if (input_string.substring(i, i + 7) === "don't()" && isEnabled) {
    isEnabled = false;
    endIndex = i;
    conditionalMultiplicationSum += checkMultiplicationSum(
      input_string.substring(startIndex, endIndex)
    );
  } else if (input_string.substring(i, i + 4) === "do()" && !isEnabled) {
    isEnabled = true;
    startIndex = i;
  }
}

if (isEnabled) {
  conditionalMultiplicationSum += checkMultiplicationSum(
    input_string.substring(startIndex, len)
  );
}

fs.writeFileSync(
  path.join(__dirname, "output.txt"),
  `Multiplication Sum is: ${multiplicationSum}\nConditional Multiplication Sum is: ${conditionalMultiplicationSum}`,
  {
    encoding: "utf-8",
  }
);
