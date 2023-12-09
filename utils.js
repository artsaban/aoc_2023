import readline from "node:readline";
import fs from "node:fs";

class TrieNode {
  constructor() {
    this.final = false;
    this.children = new Map();
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let cur = this.root;
    for (const ch of word) {
      if (!cur.children.has(ch)) {
        cur.children.set(ch, new TrieNode());
      }
      cur = cur.children.get(ch);
    }
    cur.final = true;
  }

  search(word) {
    let cur = this.root;
    for (const ch of word) {
      if (!cur.children.has(ch)) {
        return false;
      }
      cur = cur.children.get(ch);
    }
    return cur.final;
  }

  startsWith(prefix) {
    let cur = this.root;
    for (const ch of prefix) {
      if (!cur.children.has(ch)) {
        return false;
      }
      cur = cur.children.get(ch);
    }
    return true;
  }

  getByPrefix(prefix) {
    let cur = this.root;
    for (const ch of prefix) {
      if (!cur.children.has(ch)) {
        return false;
      }
      cur = cur.children.get(ch);
    }
    return cur;
  }
}

export function createLinesReadStream() {
  const stream = readline.createInterface({
    input: process.stdin,
  });
  return stream;
}

export function readInputToMemory() {
  return fs.readFileSync("/dev/stdin", { encoding: "utf-8" });
}
