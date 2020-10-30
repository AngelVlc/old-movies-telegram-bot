import MoviesApiHelper from './moviesApiHelper'
import EnvChecker from './envChecker'
import TelegramBotApi from 'node-telegram-bot-api';
import Express from 'express';

const envChecker = new EnvChecker();
if (!envChecker.check()) {
  process.exit(1);
}

const apiHelper = new MoviesApiHelper('https://peliculasangel.herokuapp.com', 'user', 'Vcf');

const bot = new TelegramBotApi(envChecker.config.BOT_ID, { polling: true });

let lastCommand = '';

bot.on('message', async (msg) => {
  try {
    const chatId = msg.chat.id;

    if (msg.text.toLowerCase() === '/search') {
      lastCommand = 'search';
    }

    const options = {
      parse_mode: 'HTML'
    };

    switch (lastCommand) {
      case 'search':
        bot.sendMessage(chatId, 'Title to search:', options);
        lastCommand = 'title';
        break;

      case 'title':
        const title = msg.text;
        lastCommand = '';
        console.log(`search: '${title}' - chatId: '${chatId}`);
        try {
          let searchResult = await apiHelper.searchMovie(title);
          bot.sendMessage(chatId, searchResult, options);
        } catch (searchError) {
          console.error(searchError);
          bot.sendMessage(chatId, `ERROR: ${searchError}`, options);
        }
        break;

      default:
        const text = 'Valid commands:\n' +
          '<b>/search</b>';
        bot.sendMessage(chatId, text, options);
        break;
    }

  } catch (error) {
    console.error(error);
  }
});

const app = new Express()

app.get('/', (req, res) => {
  console.log('GET /')
  res.send('Hello')
})

const port = envChecker.config.PORT
app.listen(port, () => {
  console.log(`Express listening at http://localhost:${port}`)
})