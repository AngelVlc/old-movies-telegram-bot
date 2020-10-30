import EnvChecker from './envChecker';

describe('EnvChecker', () => {
  describe('check()', () => {
    let checker;

    beforeEach(() => {
      process.env.PORT = '8080';
      process.env.BOT_ID = 'id';
      process.env.API_BASE_URL = 'url';
      process.env.API_USER_NAME = 'wadus';
      process.env.API_USER_PASSWORD = 'wadus';
      checker = new EnvChecker();
      spyOn(console, 'error');
    });

    it('should return true if env vars are set', () => {
      expect(checker.check()).toBe(true);
    });

    it('should return false if PORT env var is not set', () => {
      delete process.env.PORT;
      expect(checker.check()).toBe(false);
    });

    it('should return false if API_BASE_URL env var is not set', () => {
      delete process.env.API_BASE_URL;
      expect(checker.check()).toBe(false);
    });

    it('should return false if API_USER_NAME env var is not set', () => {
      delete process.env.API_USER_NAME;
      expect(checker.check()).toBe(false);
    });

    it('should return false if API_USER_PASSWORD env var is not set', () => {
      delete process.env.API_USER_PASSWORD;
      expect(checker.check()).toBe(false);
    });

    it('should return false if BOT_ID env var is not set', () => {
      delete process.env.BOT_ID;
      expect(checker.check()).toBe(false);
    });
  });
});