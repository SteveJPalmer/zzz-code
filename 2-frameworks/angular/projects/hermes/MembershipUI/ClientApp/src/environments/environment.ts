
export const environment = {
  production: false,
  env: 'local',
  appVersion: "Beta 0.1.3-L",
  baseUrl: "https://localhost:44392/",
  B2CAuthority: "https://login.microsoftonline.com/tfp/hermesdevb2c.onmicrosoft.com/B2C_1_signup_in",
  B2CPwdResetPolicyURL: "https://login.microsoftonline.com/tfp/hermesdevb2c.onmicrosoft.com/b2c_1_pwd_reset",
  B2CPwdResetPolicyName: "b2c_1_pwd_reset",
  B2CForgotPwdErrorCode: "AADB2C90118",
  B2CClientID: "1b50c7d0-c9c2-4577-a64e-b8ecfb56b0b7",
  B2CPostLogoutRedirectUri: "https://localhost:44356/",
  protectedResourceMap: [
    ['https://localhost:44392/api/orgsgraph', ['https://hermesdevb2c.onmicrosoft.com/nglocalapi/nglocalapi']],
    ['https://localhost:44392/api/airwaybills', ['https://hermesdevb2c.onmicrosoft.com/nglocalapi/nglocalapi']],
    ['https://localhost:44392/api/vct', ['https://hermesdevb2c.onmicrosoft.com/nglocalapi/nglocalapi']]
  ]
};
