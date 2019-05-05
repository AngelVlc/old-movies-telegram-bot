import axios from 'axios';

export default class AxiosHelper {
  constructor(baseUrl) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl
    });
  }

  baseUrl() {
    return this.axiosInstance.defaults.baseURL;
  }

  async doPost(endpoint, postBody) {
    const result = await this.axiosInstance.post(endpoint, postBody);
    return result.data;
  }

  async doGetWithAuth(endpoint, token) {
    let result = await this.axiosInstance.get(endpoint, this.getAuthConfig(token));
    return result.data;
  }

  getAuthConfig(token) {
    return {
      headers: {
        'x-access-token': token,
        'cache-control': 'no-cache'
      }
    };
  }
}
