import axios from 'axios';

export default class AxiosHelper {
  constructor(baseUrl) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl
    });
  }

  async doPost(endpoint, postBody) {
    try {
      let result = await this.axiosInstance.post(endpoint, postBody);
      return result.data;
    } catch (error) {
      throw this.parseError(error);
    }
  }

  parseError(error) {
    return `Error ${error.response.status} - ${error.response.statusText}`;
  }
}
