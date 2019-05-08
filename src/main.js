import MoviesApiHelper from './moviesApiHelper'
import EnvChecker from './envChecker'
import TelegramBotApi from 'node-telegram-bot-api';

class Main {
  static async do() {
    const apiHelper = new MoviesApiHelper('https://peliculasangel.herokuapp.com','user', 'Vcf');
    try {
      const result = await apiHelper.searchMovie('black');
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

const envChecker = new EnvChecker();

if (!envChecker.check()) {
  process.exit(1);
}
Main.do();
process.exit(0);
