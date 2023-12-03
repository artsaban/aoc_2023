import { createInterface } from "node:readline";

async function solve() {
  let result = 0;

  for await (const line of createInterface({ input: process.stdin })) {
    if (line == "") continue;
    const subsets = getPartsFromLine(line);

    const max = new Map([
      ["red", 0],
      ["green", 0],
      ["blue", 0],
    ]);

    for (const subset of subsets) {
      for (const [color, count] of subset) {
        if (count > max.get(color)) {
          max.set(color, count);
        }
      }
    }

    let power = 1;
    for (const x of max.values()) {
      power *= x;
    }

    result += power;
  }

  console.log(result);
}

function getPartsFromLine(line) {
  const [, cubeSection] = line.split(": ");
  const subsets = cubeSection.split("; ");
  const parsedSubsets = [];

  for (const subset of subsets) {
    const map = new Map([
      ["blue", 0],
      ["red", 0],
      ["green", 0],
    ]);
    const tmp = subset.split(", ");
    for (const x of tmp) {
      const [count, color] = x.split(" ");
      map.set(color, Number(count));
    }
    parsedSubsets.push(map);
  }
  return parsedSubsets;
}

solve();
