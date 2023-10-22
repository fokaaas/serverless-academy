import { bot } from './index.js';
import { getForecast } from './api.js';

export const events = {
  '/start': async (chatId) => {
    const menu = {
      reply_markup: {
        keyboard: [
          ['Forecast in Hadiach'],
        ],
        one_time_keyboard: true,
        resize_keyboard: true,
      },
    };
    await bot.sendMessage(chatId, 'Click the button to find out the forecast', menu);
  },

  'Forecast in Hadiach': async (chatId) => {
    const menu = {
      reply_markup: {
        keyboard: [
          ['at intervals of 3 hours', 'at intervals of 6 hours'],
        ],
        one_time_keyboard: true,
        resize_keyboard: true,
      },
    };
    await bot.sendMessage(chatId, 'Select a period for the weather forecast', menu);
  },

  'at intervals of 3 hours': async (chatId) => {
    const forecast = await getForecast(3);
    await bot.sendMessage(chatId, forecast, { parse_mode: 'HTML' });
  },

  'at intervals of 6 hours': async (chatId) => {
    const forecast = await getForecast(6);
    await bot.sendMessage(chatId, forecast, { parse_mode: 'HTML' });
  },
};