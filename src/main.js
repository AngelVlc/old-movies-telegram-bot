import MoviesApiHelper from './moviesApiHelper'
import TelegramBotApi from 'node-telegram-bot-api';

class Main {
  static checkEnvVars() {
    const envVarsNames = [
      'BOT_ID',
      'API_BASE_URL',
      'API_USER_NAME',
      'API_USER_PASSWORD'
    ];

    this.config = {};
    let allOk = true;

    envVarsNames.forEach(item => {
      const value = process.env[item];
      if (value === undefined) {
        console.error(`${item} environment variable does not exist`);
        allOk = false;
      } else {
        this.config[item] = value;
      }
    });

    return allOk;
  }

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

if (!Main.checkEnvVars()) {
  process.exit(1);
}

Main.do();
process.exit(0);
