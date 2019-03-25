
export const environment = {
  production: false,
  env: 'dev',
  baseUrl: "https://localhost:44392/",
  // baseUrl: "https://ngcoreapis-dev-wa.azurewebsites.net/",
  B2CAuthority: "https://login.microsoftonline.com/tfp/hermesdevb2c.onmicrosoft.com/B2C_1_signup_in",
  B2CPwdResetPolicyURL: "https://login.microsoftonline.com/tfp/hermesdevb2c.onmicrosoft.com/b2c_1_pwd_reset",
  B2CPwdResetPolicyName: "b2c_1_pwd_reset",
  B2CForgotPwdErrorCode: "AADB2C90118",
  B2CClientID: "bde5bded-25ba-4689-ac11-cb51d677fbd0",
  B2CPostLogoutRedirectUri: "https://localhost:44355/",
  protectedResourceMap: [
    ['https://localhost:44392/api/orgsgraph', ['https://hermesdevb2c.onmicrosoft.com/ngdevapi/ngapi']],
    ['https://localhost:44392/api/airwaybills', ['https://hermesdevb2c.onmicrosoft.com/ngdevapi/ngapi']],
    ['https://localhost:44392/api/vct', ['https://hermesdevb2c.onmicrosoft.com/ngdevapi/ngapi']]
  ]
  // protectedResourceMap: [
  //   ['https://ngcoreapis-dev-wa.azurewebsites.net/api/orgsgraph', ['https://hermesdevb2c.onmicrosoft.com/ngdevapi/ngapi']],
  //   ['https://ngcoreapis-dev-wa.azurewebsites.net/api/airwaybills', ['https://hermesdevb2c.onmicrosoft.com/ngdevapi/ngapi']],
  //   ['https://ngcoreapis-dev-wa.azurewebsites.net/api/vct', ['https://hermesdevb2c.onmicrosoft.com/ngdevapi/ngapi']]
  // ]
};
