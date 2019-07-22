
export const environment = {
  production: true,
  env: 'test',
  appVersion: "Beta 0.3.0-T",
  baseUrl: "https://ngcoreapis-test-wa.azurewebsites.net/",
  B2CAuthority: "https://login.microsoftonline.com/tfp/hermesdevb2c.onmicrosoft.com/B2C_1_signup_in_b2c",
  B2CPwdResetPolicyURL: "https://login.microsoftonline.com/tfp/hermesdevb2c.onmicrosoft.com/b2c_1_pwd_reset",
  B2CPwdResetPolicyName: "b2c_1_pwd_reset",
  B2CForgotPwdErrorCode: "AADB2C90118",
  B2CClientID: "5a19ee0e-c52c-4ede-afd5-95f4670ddc33",
  B2CPostLogoutRedirectUri: "https://ngcheckin-test-wa.azurewebsites.net/",
  protectedResourceMap: [
    ['https://ngcoreapis-test-wa.azurewebsites.net/api/orgsgraph', ['https://hermesdevb2c.onmicrosoft.com/ngtestapi/ngapi']],
    ['https://ngcoreapis-test-wa.azurewebsites.net/api/airwaybills', ['https://hermesdevb2c.onmicrosoft.com/ngtestapi/ngapi']],
    ['https://ngcoreapis-test-wa.azurewebsites.net/api/vct', ['https://hermesdevb2c.onmicrosoft.com/ngtestapi/ngapi']]
  ]
};
