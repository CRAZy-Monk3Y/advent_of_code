import * as fs from "fs";
import path from "path";

const input_string = fs.readFileSync(
  path.join(__dirname, "input.txt"),
  "utf-8"
);

const input_arr_lines = input_string.split("\r\n");

let input_arr_R: number[] = [];
let input_arr_L: number[] = input_arr_lines.map((line) => {
  const vals = line.split(" ");
  input_arr_R.push(Number(vals[vals.length - 1].trim()));
  return Number(vals[0].trim());
});

input_arr_L.sort();
input_arr_R.sort();

let total_diff = 0;

for (let i = 0; i < input_arr_L.length; i++) {
  let diff = Math.abs(input_arr_L[i] - input_arr_R[i]);
  total_diff += diff;
}

let similarity_score = 0;
let repeatCount = 0;

input_arr_L.forEach((valueL) => {
  input_arr_R.forEach((valueR) => {
    if (valueL === valueR) {
      repeatCount++;
    }
  });
  similarity_score += valueL * repeatCount;
  repeatCount = 0;
});

fs.writeFileSync(
  path.join(__dirname, "output.txt"),
  `Total Difference is: ${total_diff}\nTotal Similarity Score is : ${similarity_score} `,
  {
    encoding: "utf-8",
  }
);
