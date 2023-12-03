import { createLinesReadStream, Trie } from "../utils.js";

async function solve() {
  let map = new Map([
    ["one", 1],
    ["two", 2],
    ["three", 3],
    ["four", 4],
    ["five", 5],
    ["six", 6],
    ["seven", 7],
    ["eight", 8],
    ["nine", 9],
  ]);

  let trie = new Trie();
  for (const number of map.keys()) {
    trie.insert(number);
  }

  let result = 0;

  for await (const line of createLinesReadStream()) {
    if (line == "") return;

    let first = -1;
    let last = -1;
    let i = 0;

    const symbols = Array.from(line);
    while (i < symbols.length) {
      const ch = symbols[i];
      let num = parseInt(ch);

      if (Number.isNaN(num)) {
        let prefix = ch;
        let j = i;

        while (j < symbols.length) {
          const node = trie.getByPrefix(prefix);
          if (!node) break;

          if (!node.final) {
            j += 1;
            prefix += symbols[j];
            continue;
          } else {
            num = map.get(prefix);
            last = num;
            if (first == -1) {
              first = num;
            }
            i = j - 1;
            break;
          }
        }
      } else {
        last = num;
        if (first == -1) {
          first = num;
        }
      }

      i += 1;
    }

    result += first * 10 + last;
  }

  console.log(result);
}

solve();
