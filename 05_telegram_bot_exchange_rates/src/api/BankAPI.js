import axios from 'axios';
import NodeCache from 'node-cache';

const PRIVATBANK = 'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11';
const MONOBANK ='https://api.monobank.ua/bank/currency';
const cache = new NodeCache();

const currencies = {
  'UAH': 980,
  'EUR': 978,
  'USD': 840,
}

const monobankAPI = async () => {
  const cachedData = cache.get('monobankData');
  if (cachedData) return cachedData;
  const { data } = await axios.get(MONOBANK);
  cache.set('monobankData', data, 100);
  return data;
}

const privatBankAPI = async () => {
  const cachedData = cache.get('privatBankData');
  if (cachedData) return cachedData;
  const { data } = await axios.get(PRIVATBANK);
  cache.set('privatBankData', data, 100);
  return data;
}

const getPrivatBankData = async (currency) => {
  const data = await privatBankAPI();
  return data.find(({ ccy, base_ccy }) => {
    return ccy === currency && base_ccy === 'UAH';
  });
}

const getMonobankData = async (currency) => {
  const data = await monobankAPI();
  return data.find(({ currencyCodeA, currencyCodeB }) => {
    return currencyCodeA === currencies[currency] && currencyCodeB === currencies.UAH;
  });
}

export const getExchangeRate = async (currency) => {
  const privatBankData = await getPrivatBankData(currency);
  const monobankData = await getMonobankData(currency);
  return `<em><b>Current ${currency} Exchange Rate</b></em>\n\n` +
    `<em>PrivatBank</em>\n` +
    `Buy: ${privatBankData.buy}\n` +
    `Sale: ${privatBankData.sale}\n\n` +
    `<em>Monobank</em>\n` +
    `Buy: ${monobankData.rateBuy.toFixed(2)}\n` +
    `Sale: ${monobankData.rateSell.toFixed(2)}`;
}