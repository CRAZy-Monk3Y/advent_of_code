import * as fs from "fs";
import path from "path";

const input_string = fs.readFileSync(
  path.join(__dirname, "input.txt"),
  "utf-8"
);

const input_arr_lines = input_string.split("\r\n");

let reports = [];
let safeReportsCount = 0;

input_arr_lines.forEach((line) => {
  let values = line.split(" ").map((value) => Number(value));
  const isIncremental = values[0] < values[1];
  let breaking = false;
  for (let i = 1; i < values.length && !breaking; i++) {
    if (
      isIncremental &&
      (values[i] - values[i - 1] < 1 || values[i] - values[i - 1] > 3)
    ) {
      breaking = true;
      break;
    } else if (
      !isIncremental &&
      (values[i - 1] - values[i] < 1 || values[i - 1] - values[i] > 3)
    ) {
      breaking = true;
      break;
    }
  }
  if (!breaking) {
    safeReportsCount++;
  }
  reports.push(values);
});

fs.writeFileSync(
  path.join(__dirname, "output.txt"),
  `Total Safe report count is: ${safeReportsCount}`,
  {
    encoding: "utf-8",
  }
);
