import * as fs from 'fs'
import path from 'path';

const FILES = 20;

console.time('program..')

const data = [];
const numbers = {};

const dataProcessing = () => {
  for (let i = 0; i < FILES; i++) {
    const text = fs.readFileSync(path.resolve(`../files/out${i}.txt`), 'utf-8')
    const words = text.split('\n');
    data.push(...new Set(words));
  }
  for (const username of data) {
    numbers[username] = (numbers[username] || 0) + 1;
  }
}

const uniqueValues = () => new Set(data).size;

const existInAllFiles = () => {
  let counter = 0;
  for (const username in numbers) {
    if (numbers[username] === FILES) counter++;
  }
  return counter;
}

const existInAtLeastTen = () => {
  let counter = 0;
  for (const username in numbers) {
    if (numbers[username] >= 10) counter++;
  }
  return counter;
}

console.time('data processing..')
dataProcessing()
console.timeEnd('data processing..')

console.time('unique values..')
console.log(uniqueValues());
console.timeEnd('unique values..')

console.time('exist in all files..')
console.log(existInAllFiles());
console.timeEnd('exist in all files..')

console.time('exist in at least ten..')
console.log(existInAtLeastTen());
console.timeEnd('exist in at least ten..')
console.timeEnd('program..')