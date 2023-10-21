import { Sorter } from './classes/Sorter.js';
import { log } from './utils/log.js';
import { STRINGS } from './utils/STRINGS.js';

const sorter = new Sorter();

console.clear();
log.info(STRINGS.intro);
sorter.start().catch((e) => log.err(e));