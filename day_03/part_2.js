import { readInputToMemory } from "../utils.js";

// prettier-ignore
var offsets = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], /* ... */ [0, 1],
  [1, -1], [1, 0], [1, 1],
];

function isDigit(char) {
  return !isNaN(parseInt(char));
}

function isGear(grid, r, c) {
  return grid[r][c] === "*";
}

function hash([row, left, num]) {
  return `${row},${left},${num}`;
}

function getNumber(grid, r, c) {
  let start = c;
  while (start > 0 && isDigit(grid[r][start - 1])) {
    start--;
  }
  let digits = "";
  for (let i = start; i < grid[r].length && isDigit(grid[r][i]); ++i) {
    digits += grid[r][i];
  }
  return [r, start, Number(digits)];
}

function adjacentNumbers(grid, r, c) {
  const hashes = new Set();

  for (const [dr, dc] of offsets) {
    const [nr, nc] = [r + dr, c + dc];
    const cell = grid[nr]?.[nc];

    if (cell !== undefined && isDigit(cell)) {
      hashes.add(hash(getNumber(grid, nr, nc)));
    }
  }

  return hashes;
}

function solve() {
  const grid = readInputToMemory()
    .split("\n")
    .filter((x) => x !== "")
    .map((x) => x.split(""));

  let ratioTotal = 0;

  for (let r = 0; r < grid.length; ++r) {
    for (let c = 0; c < grid[r].length; ++c) {
      if (isGear(grid, r, c)) {
        const numbers = adjacentNumbers(grid, r, c);
        if (numbers.size === 2) {
          ratioTotal += Array.from(numbers).reduce((acc, item) => {
            return acc * item.split(",")[2];
          }, 1);
        }
      }
    }
  }

  console.log(ratioTotal);
}

solve();
