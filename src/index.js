import Login from './login'

class Main {
  static async do() {
    const login = new Login();
    const token = await login.getToken();
    console.log(`FFFFFFF ${token}`);
  }
}


Main.do();
