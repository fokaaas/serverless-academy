import axios from 'axios';

// replace these endpoints with jsonbase.com if it works
const endpoints = [
  'http://127.0.0.1:3000/data1',
  'http://127.0.0.1:3000/data2',
  'http://127.0.0.1:3000/data3',
  'http://127.0.0.1:3000/data4',
  'http://127.0.0.1:3000/data5',
];

const getData = async (url, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    const res = await axios.get(url).catch(() => null);
    if (res) return res.data;
  }
}

const isDone = (obj) => {
  for (const key in obj) {
    const value = obj[key];
    if (key === 'isDone') return value;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const res = isDone(value);
      if (res !== undefined) return res;
    }
  }
}

const processData = async (endpoints) => {
  let trueValues = 0;
  let falseValues = 0;
  for (const endpoint of endpoints) {
    const data = await getData(endpoint);
    if (data) {
      const result = isDone(data);
      console.log(`[Success] ${endpoint}: isDone - ${result}`);
      result ? trueValues++ : falseValues++;
    } else {
      console.log(`[Fail] ${endpoint}: The endpoint is unavailable`);
    }
  }
  console.log(`Found True values: ${trueValues}\nFound False values: ${falseValues}`);
}

await processData(endpoints);