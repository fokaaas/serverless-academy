import * as fs from 'fs/promises'
import path from 'path';

const FILES = 20;

const data = [];
for (let i = 0; i < FILES; i++) {
  const text = await fs.readFile(path.resolve(`../files/out${i}.txt`), 'utf-8');
  data.push(text.split('\n'));
}

const uniqueValues = () => new Set(data.flat()).size;

const existInAllFiles = () => {
  const unique = data.map((arr) => [...new Set(arr)]).flat();
  const obj = {};
  let counter = 0;
  for (const username of unique) {
    obj[username] = (obj[username] || 0) + 1;
    if (obj[username] === FILES) {
      counter++;
    }
  }
  return counter;
}

const existInAtLeastTen = () => {
  const unique = data.map((arr) => [...new Set(arr)]).flat();
  const obj = {};
  let counter = 0;
  for (const username of unique) {
    obj[username] = (obj[username] || 0) + 1;
  }
  for (const username in obj) {
    if (obj[username] >= 10) counter++;
  }
  return counter;
}

console.log(uniqueValues());
console.log(existInAllFiles());
console.log(existInAtLeastTen());