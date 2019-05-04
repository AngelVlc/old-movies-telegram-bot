import axios from 'axios';

class AxiosHelper {
  constructor(baseUrl) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl
    });
  }

  async doPost(endpoint, postBody) {
    let result = await this.axiosInstance.post(endpoint, postBody);
    return result.data;
  }

}

export default AxiosHelper;