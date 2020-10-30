export default class EnvChecker {
   check() {
    const envVarsNames = [
      'PORT',
      'BOT_ID',
      'API_BASE_URL',
      'API_USER_NAME',
      'API_USER_PASSWORD'
    ];

    this.config = {};
    let allOk = true;

    envVarsNames.forEach(item => {
      const value = process.env[item];
      if (value === undefined) {
        console.error(`${item} environment variable does not exist`);
        allOk = false;
      } else {
        this.config[item] = value;
      }
    });

    return allOk;
  }
}