import AxiosHelper from './axiosHelper';

export default class MoviesApiHelper {
  constructor() {
    this.axiosHelper = new AxiosHelper('https://peliculasangel.herokuapp.com');
  }

  async getToken() {
    let result = await this.axiosHelper.doPost('/api/authenticate', {
      name: 'user',
      password: 'Vf'
    });
    return result.token;
    // try {
    //   let result = await this.axiosInstance.post(
     
    //   // console.log(result.data);
    //   // console.log(result.status);
    //   // console.log(result.statusText);
    // } catch (error) {
    //     console.log(error.response.data);
    //     console.log(error.response.status);
    // }
   
    
  }
}
