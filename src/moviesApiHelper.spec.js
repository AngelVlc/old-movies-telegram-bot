import MoviesApiHelper from './moviesApiHelper'
import AxiosHelper from './axiosHelper';

describe('MoviesApiHelper', () => {
  const baseUrl = 'baseUrl'

  describe('constructor', () => {
    it('should create an axios helper instance', () => {
      const helper = new MoviesApiHelper('url');
      expect(helper.axiosHelper).toBeDefined();
      expect(helper.axiosHelper.baseUrl()).toEqual('url');
    });
  });

  describe('getToken()', () => {
    let helper;

    beforeEach(() => {
      helper = new MoviesApiHelper('baseUrl');
    });

    it('should return a token if the user is valid', async () => {
      spyOn(helper.axiosHelper, 'doPost').and.returnValue({ token: 'theToken' });
      const result = await helper.getToken('wadus', 'wadus');
      expect(result).toEqual('theToken');
    });

    it('should throw an error if the user is invalid', async () => {
      spyOn(helper.axiosHelper, 'doPost').and.throwError('invalid user');
      try {
        await helper.getToken('wadus', 'wadus');
      } catch (error) {
        expect(error).toEqual(new Error('invalid user'));
      }
    });
  });
});

