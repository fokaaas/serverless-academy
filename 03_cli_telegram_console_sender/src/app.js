import { Command } from 'commander';
import TelegramBot from 'node-telegram-bot-api';

const TOKEN = process.env.TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const program = new Command();
const bot = new TelegramBot(TOKEN, { polling: true });

program
  .name('telegram-console-sender')
  .description('Utility for sending messages from console to telegram bot')
  .version('1.0.0');

program
  .command('send-message')
  .description('Send message to telegram bot')
  .argument('<string>', 'message to send')
  .action(async (text) => {
    await bot.sendMessage(CHAT_ID, text);
    process.exit(0)
  });

program
  .command('send-photo')
  .description('Send photo to telegram bot')
  .argument('<path>', 'path of photo to send')
  .action(async (path) => {
    await bot.sendPhoto(CHAT_ID, path);
    process.exit(0)
  });

program.parse();