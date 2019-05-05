import MoviesApiHelper from './moviesApiHelper'

class Main {
  static async do() {
    const apiHelper = new MoviesApiHelper();
    try {
      const token = await apiHelper.getToken();
      console.log(`FFFFFFF ${token}`);
    } catch (error) {
      console.log(error);
    }
  }
}


Main.do();
