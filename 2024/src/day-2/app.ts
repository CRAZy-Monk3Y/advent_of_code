import * as fs from "fs";
import path from "path";

const input_string = fs.readFileSync(
  path.join(__dirname, "input.txt"),
  "utf-8"
);

const reports = input_string
  .split("\r\n")
  .map((line) => line.split(" ").map(Number));

function isSafe(levels: number[]) {
  const differences: number[] = [];

  for (let i = 1; i < levels.length; i++) {
    differences.push(levels[i] - levels[i - 1]);
  }

  const increasing = differences.every((d) => d >= 1 && d <= 3);
  const decreasing = differences.every((d) => d <= -1 && d >= -3);

  return increasing || decreasing;
}

function day02() {
  let safe = 0;
  let madeSafe = 0;

  for (const report of reports) {
    let tolerable = false;

    for (let i = 0; i < report.length; i++) {
      const removed = [...report.slice(0, i), ...report.slice(i + 1)];

      if (isSafe(removed)) {
        tolerable = true;
        break;
      }
    }

    if (isSafe(report)) safe++;
    if (isSafe(report) || tolerable) madeSafe++;
  }

  return [safe, madeSafe];
}

const [safeReportsCount, safeWithDampnerCount] = day02();

fs.writeFileSync(
  path.join(__dirname, "output.txt"),
  `Total Safe report count is: ${safeReportsCount}\nTotal Safe report after using Dampner is: ${safeWithDampnerCount}`,
  {
    encoding: "utf-8",
  }
);
