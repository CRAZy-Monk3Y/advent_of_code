import * as fs from "fs";
import path from "path";

const input_string = fs.readFileSync(
  //   path.join(__dirname, "input.txt"),
  path.join(__dirname, "test.txt"),
  "utf-8"
);

let input_lines = input_string.split("\r\n");

interface Index {
  colIndx: number;
  rowIndx: number;
}

// "XMAS"
function isXmas(
  inputLines: string[],
  totalRows: number,
  totalCols: number,
  checkIndex: Index
): number {
  let current_char = inputLines[checkIndex.rowIndx].charAt(checkIndex.colIndx);
  // check valid char
  let xmasCount = 0;
  if (current_char === "X" || current_char === "S") {
    // check right
    if (totalCols - checkIndex.colIndx >= 4) {
      let subString = current_char;
      for (let i = checkIndex.colIndx + 1; i < checkIndex.colIndx + 4; i++) {
        subString += inputLines[checkIndex.rowIndx].charAt(i);
      }
      if (subString === "XMAS" || subString === "SAMX") {
        xmasCount++;
        // console.log(subString);
      }
    }
    // check bottom
    if (totalRows - checkIndex.rowIndx >= 4) {
      let subString = current_char;
      for (let i = checkIndex.rowIndx + 1; i < checkIndex.rowIndx + 4; i++) {
        subString += inputLines[i].charAt(checkIndex.colIndx);
      }
      if (subString === "XMAS" || subString === "SAMX") {
        xmasCount++;
        // console.log(subString);
      }
    }
    // check bottom left
    if (checkIndex.colIndx >= 4 && totalRows - checkIndex.rowIndx >= 4) {
      let subString = current_char;
      for (let i = 1; i < 4; i++) {
        subString += inputLines[checkIndex.rowIndx + i].charAt(
          checkIndex.colIndx - i
        );
      }
      if (subString === "XMAS" || subString === "SAMX") {
        xmasCount++;
        // console.log(subString);
      }
    }
    // check bottom right
    if (
      totalRows - checkIndex.rowIndx >= 4 &&
      totalCols - checkIndex.colIndx >= 4
    ) {
      let subString = current_char;
      for (let i = 1; i < 4; i++) {
        subString += inputLines[checkIndex.rowIndx + i].charAt(
          checkIndex.colIndx + i
        );
      }
      if (subString === "XMAS" || subString === "SAMX") {
        xmasCount++;
        console.log(subString);
      }
    }
  }
  return xmasCount;
}

function iterateAllChars(input_string: string[]): number {
  const totalRows = input_string.length;
  const totalCols = input_string[0].length;
  let xmasCount = 0;
  for (let rowIndx = 0; rowIndx < totalRows; rowIndx++) {
    for (let colIndx = 0; colIndx < totalCols; colIndx++) {
      try {
        xmasCount += isXmas(input_string, totalRows, totalCols, {
          rowIndx,
          colIndx,
        });
      } catch (error) {}
    }
  }
  return xmasCount;
}
const totalXMAS = iterateAllChars(input_lines);
console.log(totalXMAS);

fs.writeFileSync(
  path.join(__dirname, "output.txt"),
  `XMAS Sum is: ${totalXMAS}\n`,
  {
    encoding: "utf-8",
  }
);
