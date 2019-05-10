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
    let getResult;
    try {
      const endpoint = this.getSearchEndpoint(titleToSearch);
      getResult = await this.axiosHelper.doGetWithAuth(endpoint, this.token);
    } catch (error) {
      if (error.response.status === 401) {
        this.token = undefined;
      }
      throw error;
    }
    return this.processSearchResult(getResult);
  }

  getSearchEndpoint(titleToSearch) {
    return '/api/films?title=' + encodeURIComponent(titleToSearch);
  }

  processSearchResult(apiResult) {
    let result = [];
    result.push(`${apiResult.length} found:`);

    apiResult.forEach(element => {
      result.push(`- ${element.title} (${element.locationName})`);
    });

    return result.join('\n\n');
  }
}
