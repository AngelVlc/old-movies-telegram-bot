import AxiosHelper from './axiosHelper';
import axios from 'axios';

describe('AnxiosHelper', () => {
  const baseUrl = 'baseUrl'

  describe('constructor', () => {
    it('should create an axios instance', () => {
      spyOn(axios, 'create');
      new AxiosHelper('baseUrl');
      expect(axios.create).toHaveBeenCalledWith({ baseURL: baseUrl });
    });
  });

  describe('instance methods', () => {
    let axiosHelper;

    beforeEach(() => {
      axiosHelper = new AxiosHelper(baseUrl);
    });

    describe('doPost()', () => {
      const endPoint = 'endPoint';
      const body = { param1: 1 };

      it('should call axios post method', async () => {
        const spy = spyOn(axiosHelper.axiosInstance, 'post').and.returnValue(Promise.resolve({ data: 'wadus' }));
        await axiosHelper.doPost(endPoint, body);
        expect(spy).toHaveBeenCalledWith(endPoint, body);
      });

      it('should return the data if the request is valid', async () => {
        spyOn(axiosHelper.axiosInstance, 'post').and.returnValue(Promise.resolve({ data: 'wadus' }));
        const methodResult = await axiosHelper.doPost(endPoint, body);
        expect(methodResult).toEqual('wadus');
      });

      it('shoult throw an error if the request is invalid', async () => {
        spyOn(axiosHelper.axiosInstance, 'post').and.returnValue(Promise.reject({ response: { status: 400, statusText: 'wadus' } }));
        try {
          await axiosHelper.doPost(endPoint, body)
        } catch (error) {
          expect(error.response.status).toEqual(400);
          expect(error.response.statusText).toEqual('wadus');
        }
      });
    });

    describe('doGetWithAuth()', () => {
      const endPoint = 'endPoint';
      const token = 'theToken';

      it('should call axios get method', async () => {
        const spy = spyOn(axiosHelper.axiosInstance, 'get').and.returnValue(Promise.resolve({ data: 'wadus' }));
        await axiosHelper.doGetWithAuth(endPoint, token);
        const config = axiosHelper.getAuthConfig(token);
        expect(spy).toHaveBeenCalledWith(endPoint, config);
      });

      it('should return the data if the request is valid', async () => {
        spyOn(axiosHelper.axiosInstance, 'get').and.returnValue(Promise.resolve({ data: 'wadus' }));
        const methodResult = await axiosHelper.doGetWithAuth(endPoint, token);
        expect(methodResult).toEqual('wadus');
      });

      it('shoult throw an error if the request is invalid', async () => {
        spyOn(axiosHelper.axiosInstance, 'get').and.returnValue(Promise.reject({ response: { status: 400, statusText: 'wadus' } }));
        try {
          await axiosHelper.doGetWithAuth(endPoint, token)
        } catch (error) {
          expect(error.response.status).toEqual(400);
          expect(error.response.statusText).toEqual('wadus');
        }
      });
    });

    describe('getAuthConfig()', () => {
      it('should return a valid config', () => {
        const token = 'theToken';
        const validConfig = {
          headers: {
            'x-access-token': token,
            'cache-control': 'no-cache'
          }
        };
        expect(axiosHelper.getAuthConfig(token)).toEqual(validConfig);
      });
    });
  });

});