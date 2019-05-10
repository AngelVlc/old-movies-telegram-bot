import MoviesApiHelper from './moviesApiHelper'

describe('MoviesApiHelper', () => {
  const baseUrl = 'baseUrl'

  describe('constructor', () => {
    it('should create an axios helper instance', () => {
      const helper = new MoviesApiHelper(baseUrl);
      expect(helper.axiosHelper).toBeDefined();
      expect(helper.axiosHelper.baseUrl()).toEqual(baseUrl);
    });
  });

  describe('instance methods', () => {
    let helper;

    beforeEach(() => {
      helper = new MoviesApiHelper(baseUrl);
    });

    describe('setToken()', () => {
      it('should set the the token if the user is valid', async () => {
        spyOn(helper.axiosHelper, 'doPost').and.returnValue({ token: 'theToken' });
        await helper.setToken('wadus', 'wadus');
        expect(helper.token).toEqual('theToken');
      });

      it('should throw an error if the user is invalid', async () => {
        spyOn(helper.axiosHelper, 'doPost').and.throwError('invalid user');
        try {
          await helper.setToken('wadus', 'wadus');
        } catch (error) {
          expect(error).toEqual(new Error('invalid user'));
        }
      });
    });

    describe('getSearchEndpoint()', () => {
      it('should encode the title to search', () => {
        const titleToSearch = 'black mirror';
        expect(helper.getSearchEndpoint(titleToSearch)).toEqual('/api/films?title=black%20mirror');
      });
    });

    describe('searchMovie()', () => {
      it('should call setToken() if the token is undefined', async () => {
        spyOn(helper, 'processSearchResult');
        const spy = spyOn(helper, 'setToken')
        spyOn(helper.axiosHelper, 'doGetWithAuth');
        await helper.searchMovie('title');
        expect(spy).toHaveBeenCalled();
      });

      it('should not call setToken() if the token is undefined', async () => {
        spyOn(helper, 'processSearchResult');
        const spySetToken = spyOn(helper, 'setToken')
        helper.token = 'theToken';
        spyOn(helper.axiosHelper, 'doGetWithAuth');
        await helper.searchMovie('title');
        expect(spySetToken).not.toHaveBeenCalled();
      });

      it('should call getSearchEndpoint()', async () => {
        helper.token = 'theToken';
        spyOn(helper, 'processSearchResult');
        spyOn(helper.axiosHelper, 'doGetWithAuth');
        const spyGetSearchEndPoint = spyOn(helper, 'getSearchEndpoint');
        await helper.searchMovie('title');
        expect(spyGetSearchEndPoint).toHaveBeenCalledWith('title');
      });

      it('should set token to undefined when axiosHelper.doGetWithAuth() throws a 401', async () => {
        helper.token = 'theToken';
        spyOn(helper.axiosHelper, 'doGetWithAuth').and.returnValue(Promise.reject({ response: { status: 401, statusText: 'wadus' } }));
        try {
          await helper.searchMovie('title');
        } catch (error) {
        }
        expect(helper.token).toEqual(undefined);
      });

      it('should return the lsit when the token is valid', async () => {
        helper.token = 'theToken';
        const apiResult = [
          { title: 'title1', locationName: 'loc1'},
          { title: 'title2', locationName: 'loc2'}
        ];
        spyOn(helper.axiosHelper, 'doGetWithAuth').and.returnValue(Promise.resolve(apiResult));
        const result = await helper.searchMovie('title');
        expect(result).toContain('title1 (loc1)');
        expect(result).toContain('title2 (loc2)');
      });
    });

    describe('processSearchResult()', () => {
      it('should parse the result from the api', () => {
        const apiResult = [
          { title: 'title1', locationName: 'loc1'},
          { title: 'title2', locationName: 'loc2'},
          { title: 'title3', locationName: 'loc3'}
        ];

        const result = helper.processSearchResult(apiResult);
        expect(result).toContain('title1 (loc1)');
        expect(result).toContain('title2 (loc2)');
        expect(result).toContain('title3 (loc3)');
      });
    })
  });
});

