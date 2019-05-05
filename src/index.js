import MoviesApiHelper from './moviesApiHelper'

class Main {
  static async do() {
    const apiHelper = new MoviesApiHelper('https://peliculasangel.herokuapp.com');
    try {
      const token = await apiHelper.getToken('user', 'Vcf');
      console.log(`FFFFFFF ${token}`);
    } catch (error) {
      console.log(error);
    }
  }
}

Main.do();
