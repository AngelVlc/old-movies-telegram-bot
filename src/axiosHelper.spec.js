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

  describe('doPost()', () => {
    let axiosHelper;
    const endPoint = 'endPoint';
    const body = { param1: 1 };

    beforeEach(() => {
      axiosHelper = new AxiosHelper('baseUrl');
    });

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
      spyOn(axiosHelper.axiosInstance, 'post').and.returnValue(Promise.reject({ response: { status: 400, statusText: 'wadus' }}));
      try {
        await axiosHelper.doPost(endPoint, body)
      } catch (error) {
        expect(error).toEqual('Error 400 - wadus');
      }
    });
  });

});