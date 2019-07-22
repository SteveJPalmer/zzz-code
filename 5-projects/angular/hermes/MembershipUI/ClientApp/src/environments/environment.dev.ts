export const environment = {
  production: true,
  env: 'dev',
  appVersion: "Beta 0.1.3-D",
  baseUrl: "https://ngcoreapis-dev-wa.azurewebsites.net/",
  B2CAuthority: "https://login.microsoftonline.com/tfp/hermesdevb2c.onmicrosoft.com/B2C_1_signup_in",
  B2CPwdResetPolicyURL: "https://login.microsoftonline.com/tfp/hermesdevb2c.onmicrosoft.com/b2c_1_pwd_reset",
  B2CPwdResetPolicyName: "b2c_1_pwd_reset",
  B2CForgotPwdErrorCode: "AADB2C90118",
  B2CClientID: "290a65db-0c17-46c3-9ad3-803797153597",
  B2CPostLogoutRedirectUri: "https://ngmp-dev-wa.azurewebsites.net/",
  protectedResourceMap: [
    ['https://ngcoreapis-dev-wa.azurewebsites.net/api/orgsgraph', ['https://hermesdevb2c.onmicrosoft.com/ngdevapi/ngapi']],
    ['https://ngcoreapis-dev-wa.azurewebsites.net/api/airwaybills', ['https://hermesdevb2c.onmicrosoft.com/ngdevapi/ngapi']],
    ['https://ngcoreapis-dev-wa.azurewebsites.net/api/vct', ['https://hermesdevb2c.onmicrosoft.com/ngdevapi/ngapi']]
  ]
};
