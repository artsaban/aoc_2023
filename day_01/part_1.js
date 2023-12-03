import { createLinesReadStream } from "../utils.js"

async function solve() {
  let result = 0;

  for await (const line of createLinesReadStream()) {
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
  }

  console.log(result);
}

solve();
