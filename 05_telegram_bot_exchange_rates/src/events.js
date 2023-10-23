import { bot } from './index.js';
import { getForecast, getWindSpeed } from './api/WeatherAPI.js';
import {getExchangeRate} from './api/BankAPI.js';

const mainMenu = async (chatId) => {
  const menu = {
    reply_markup: {
      keyboard: [
        ['Forecast'],
        ['Exchange Rate'],
      ],
      resize_keyboard: true,
    },
  };
  await bot.sendMessage(chatId, 'Choose weather forecast or exchange rate.', menu);
}

export const events = {
  '/start': mainMenu,

  'Back': mainMenu,

  'Forecast': async (chatId) => {
    const menu = {
      reply_markup: {
        keyboard: [
          ['At intervals of 3 hours', 'At intervals of 6 hours'],
          ['Wind Speed'],
          ['Back'],
        ],
        resize_keyboard: true,
      },
    };
    await bot.sendMessage(chatId, 'Select a period for the weather forecast.', menu);
  },

  'Exchange Rate': async (chatId) => {
    const menu = {
      reply_markup: {
        keyboard: [
          ['USD', 'EUR'],
          ['Back'],
        ],
        resize_keyboard: true,
      },
    };
    await bot.sendMessage(chatId, 'Select the currency.', menu);
  },

  'At intervals of 3 hours': async (chatId) => {
    const forecast = await getForecast(3);
    await bot.sendMessage(chatId, forecast, { parse_mode: 'HTML' });
  },

  'At intervals of 6 hours': async (chatId) => {
    const forecast = await getForecast(6);
    await bot.sendMessage(chatId, forecast, { parse_mode: 'HTML' });
  },

  'Wind Speed': async (chatId) => {
    const windSpeed = await getWindSpeed();
    await bot.sendMessage(chatId, windSpeed, { parse_mode: 'HTML' });
  },

  'USD': async (chatId) => {
    const data = await getExchangeRate('USD');
    await bot.sendMessage(chatId, data, { parse_mode: 'HTML' });
  },

  'EUR': async (chatId) => {
    const data = await getExchangeRate('EUR');
    await bot.sendMessage(chatId, data, { parse_mode: 'HTML' });
  },
};