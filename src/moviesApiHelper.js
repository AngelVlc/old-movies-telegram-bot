import AxiosHelper from './axiosHelper';

export default class MoviesApiHelper {
  constructor(baseUrl) {
    this.axiosHelper = new AxiosHelper(baseUrl);
  }

  async getToken(user, password) {
    let result = await this.axiosHelper.doPost('/api/authenticate', {
      name: user,
      password: password
    });
    return result.token;
  }
}
