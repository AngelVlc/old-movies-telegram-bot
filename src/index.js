import MoviesApiHelper from './moviesApiHelper'
import RequestResult from './requestResult';

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

Main.do();
