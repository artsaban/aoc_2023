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

function isSymbol(grid, r, c) {
  const val = grid[r][c];
  return val !== "." && !isDigit(val);
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

/**
 * @param {string[][]} grid
 * @param {number} c
 * @param {number} r
 */
function hasAdjacentSymbol(grid, r, c) {
  for (const [dr, dc] of offsets) {
    const [nr, nc] = [r + dr, c + dc];
    if (grid?.[nr]?.[nc] !== undefined && isSymbol(grid, nr, nc)) {
      return true;
    }
  }
  return false;
}

function solve() {
  const grid = readInputToMemory()
    .split("\n")
    .filter((x) => x !== "")
    .map((x) => x.split(""));

  const numbers = new Set();
  let sum = 0;

  for (let row = 0; row < grid.length; ++row) {
    for (let col = 0; col < grid[row].length; ++col) {
      const cell = grid[row][col];

      if (isDigit(cell) && hasAdjacentSymbol(grid, row, col)) {
        const [numRow, numCol, num] = getNumber(grid, row, col);
        const numHash = `${numRow},${numCol}`;

        if (!numbers.has(numHash)) {
          numbers.add(numHash);
          sum += num;
        }
      }
    }
  }

  console.log(sum);
}

solve();
