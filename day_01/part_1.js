import { readByLines } from "../utils.js";

let result = 0;

readByLines(
  (line) => {
    if (line == "") return;

    let first = -1;
    let last = -1;

    for (const ch of line) {
      const num = parseInt(ch);
      if (Number.isNaN(num)) continue;

      last = num;
      if (first == -1) {
        first = num;
      }
    }

    result += first * 10 + last;
  },
  () => {
    console.log(`Part 1: ${result}`);
  }
);
