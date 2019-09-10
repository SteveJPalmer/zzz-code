export const environment = {
  production: true,
  env: 'dev',
  appVersion: "Beta 0.4.1-D",
  baseUrl: "https://ngcoreapis-dev-wa.azurewebsites.net/",
  B2CAuthority: "https://login.microsoftonline.com/tfp/hermesdevb2c.onmicrosoft.com/B2C_1_signup_in",
  B2CPwdResetPolicyURL: "https://login.microsoftonline.com/tfp/hermesdevb2c.onmicrosoft.com/b2c_1_pwd_reset",
  B2CPwdResetPolicyName: "b2c_1_pwd_reset",
  B2CForgotPwdErrorCode: "AADB2C90118",
  B2CClientID: "e07fec6c-fa7d-4c62-aef3-14be91dcf8e2",
  B2CPostLogoutRedirectUri: "https://ngcheckin-dev-wa.azurewebsites.net/",
  protectedResourceMap: [
    ['https://ngcoreapis-dev-wa.azurewebsites.net/api/orgsgraph', ['https://hermesdevb2c.onmicrosoft.com/ngdevapi/ngapi']],
    ['https://ngcoreapis-dev-wa.azurewebsites.net/api/airwaybills', ['https://hermesdevb2c.onmicrosoft.com/ngdevapi/ngapi']],
    ['https://ngcoreapis-dev-wa.azurewebsites.net/api/vct', ['https://hermesdevb2c.onmicrosoft.com/ngdevapi/ngapi']]
  ]
};
