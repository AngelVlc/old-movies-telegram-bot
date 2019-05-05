import AxiosHelper from './axiosHelper';

export default class MoviesApiHelper {
  constructor(baseUrl, userName, password) {
    this.axiosHelper = new AxiosHelper(baseUrl);
    this.userName = userName;
    this.password = password;
  }

  async setToken() {
    let result = await this.axiosHelper.doPost('/api/authenticate', {
      name: this.userName,
      password: this.password
    });
    this.token = result.token;
  }

  async searchMovie(titleToSearch) {
    if (this.token === undefined) {
      await this.setToken();
    }
    try {
      const endpoint = this.getSearchEndpoint(titleToSearch);
      const result = await this.axiosHelper.doGetWithAuth(endpoint, this.token);
      return result;
    } catch (error) {
      if (error.response.status === 401) {
        this.token = undefined;
      }
      throw error;
    }
  }

  getSearchEndpoint(titleToSearch) {
    return '/api/films?title=' + encodeURIComponent(titleToSearch);
  }
}
