import * as fs from 'fs'
import path from 'path';

// jsonbase.com can’t be reached :(

const transform =  () => {
  const original = fs.readFileSync(path.resolve('../files/original.json'), 'utf-8');
  const records = JSON.parse(original);
  const temp = {};

  for (const record of records) {
    const userId = record.user._id;
    const user = temp[userId];
    if (!user) {
      temp[userId] = {
        userId,
        username: record.user.name,
        vacations: [{
          startDate: record.startDate,
          endDate: record.endDate,
        }],
      };
    } else {
      user.vacations.push({
        startDate: record.startDate,
        endDate: record.endDate,
      });
    }
  }

  const values = Object.values(temp);
  fs.writeFileSync(path.resolve('../files/result.json'), JSON.stringify(values));
}

console.time('transforming..')
transform();
console.timeEnd('transforming..')