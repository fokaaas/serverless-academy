import TelegramBot from 'node-telegram-bot-api';
import { events } from './events.js';

const TOKEN = process.env.TOKEN;
export const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const event =  events[msg.text];
  if (event) await event(chatId);
  else await bot.sendMessage(chatId, 'I don\'t understand you :(\nPlease enter /start');
});
