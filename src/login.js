import AxiosHelper from './axiosHelper';

class Login {
  constructor() {
    this.axiosHelper = new AxiosHelper('https://peliculasangel.herokuapp.com');
  }

  async getToken() {
    let result = await this.axiosHelper.doPost('/api/authenticate', {
      name: 'user',
      password: 'Vcf'
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

export default Login;