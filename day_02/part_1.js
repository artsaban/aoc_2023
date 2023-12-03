import { createInterface } from "node:readline";

async function solve() {
  const limits = new Map([
    ["red", 12],
    ["green", 13],
    ["blue", 14],
  ]);

  let result = 0;

  outer: for await (const line of createInterface({ input: process.stdin })) {
    if (line == "") continue;
    const { gameId, subsets } = getPartsFromLine(line);

    for (const subset of subsets) {
      for (const [k, v] of subset) {
        if (v > limits.get(k)) continue outer;
      }
    }

    result += gameId;
  }

  console.log(result);
}

function getPartsFromLine(line) {
  const [gameSection, cubeSection] = line.split(": ");
  const gameId = Number(gameSection.split(" ")[1]);
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
  return { gameId, subsets: parsedSubsets };
}

solve();
