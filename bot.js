const { Bot } = require('grammy');
const bot = new Bot('7578601395:AAHb_VTGSwL6TLqUxURGNfOIbsmkf7mZhAE');

// Хранилище игр: { chatId: загаданноеЧисло }
const activeGames = {};

// Команда /start
bot.command('start', (ctx) => {
    ctx.reply(`🎮 Привет! Я бот для игры "Угадай число".\n`
        + `Напиши /play чтобы начать!`);
});

// Команда /play
bot.command('play', (ctx) => {
    const chatId = ctx.chat.id;
    activeGames[chatId] = Math.floor(Math.random() * 100) + 1; // Число от 1 до 100
    ctx.reply('Я загадал число от 1 до 100! Попробуй угадать!');
});

// Обработка ответов
bot.on('message:text', async (ctx) => {
    const chatId = ctx.chat.id;
    const guess = Number(ctx.message.text);
    const secretNumber = activeGames[chatId];

    if (!secretNumber) return; // Если игра не начата

    if (isNaN(guess)) {
        await ctx.reply('Пожалуйста, введите число!');
        return;
    }

    if (guess === secretNumber) {
        await ctx.reply('🎉 Правильно! Ты угадал!');
        delete activeGames[chatId];
    } else if (guess < secretNumber) {
        await ctx.reply('⬆️ Больше!');
    } else {
        await ctx.reply('⬇️ Меньше!');
    }
});

// Запуск бота
bot.start();
console.log('Бот запущен и готов к игре!');