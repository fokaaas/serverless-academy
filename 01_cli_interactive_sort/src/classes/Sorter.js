import { log } from '../utils/log.js';
import { STRINGS } from '../utils/STRINGS.js';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export const rl = readline.createInterface({ input, output });

export class Sorter {
  sorters = {
    1: this.getSortedWordsByName,
    2: this.getNumbersFromLesser,
    3: this.getNumbersFromBigger,
    4: this.getSortedWordsByLetters,
    5: this.getUniqueWords,
    6: this.getUniqueValues,
  }

  async start() {
    const line = await this.question(STRINGS.enterString);
    const values = line.split(' ').map((value) => value.trim());
    const option = await this.question(STRINGS.sortOptions);
    const fun = this.sorters[option]
    if (!fun) throw new Error('Option must be in the range 1-5')
    await this.showResult(fun(values));
  }

  async question(text) {
    const answer = await rl.question(text);
    if (answer.trim() !== 'exit') return answer;
    log.info(STRINGS.exit);
    rl.close();
    process.exit();
  }

  async showResult(values) {
    let line = '';
    values.map((value) => line += `\n${value}`);
    log.info(line);
    this.start().catch((e) => log.err(e));
  }

  getSortedWordsByName(values) {
    const words = values.filter((value) => isNaN(value));
    return words.sort();
  }

  getNumbersFromLesser(values) {
    const numbers = values.filter((value) => !isNaN(value));
    return numbers.sort((a, b) => a - b);
  }

  getNumbersFromBigger(values) {
    const numbers = values.filter((value) => !isNaN(value));
    return numbers.sort((a, b) => b - a);
  }

  getSortedWordsByLetters(values) {
    const words = values.filter((value) => isNaN(value));
    return words.sort((a, b) => a.length - b.length);
  }

  getUniqueWords(values) {
    const words = values.filter((value) => isNaN(value));
    return [...new Set(words)];
  }

  getUniqueValues(values) {
    return [...new Set(values)];
  }
}