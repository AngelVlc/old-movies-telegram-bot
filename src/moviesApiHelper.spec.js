import MoviesApiHelper from './moviesApiHelper'
import AxiosHelper from './axiosHelper';

describe('MoviesApiHelper', () => {
  const baseUrl = 'baseUrl'

  describe('constructor', () => {
    it('should create an axios helper instance', () => {
      spyOn(AxiosHelper, 'constructor');
      const helper = new MoviesApiHelper();
      expect(helper.axiosHelper).toBeDefined();
    });
  });

  // describe('getToken()', () => {
  //   it('should return a token', async () => {

  //   });
  // });
});

