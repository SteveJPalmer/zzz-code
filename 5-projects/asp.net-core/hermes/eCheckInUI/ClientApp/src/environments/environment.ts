
export const environment = {
  production: false,
  env: 'dev',
  baseUrl: "https://localhost:44392/",
  B2CAuthority: "https://login.microsoftonline.com/tfp/hermesdevb2c.onmicrosoft.com/B2C_1_signup_in",
  B2CPwdResetPolicyURL: "https://login.microsoftonline.com/tfp/hermesdevb2c.onmicrosoft.com/b2c_1_pwd_reset",
  B2CPwdResetPolicyName: "b2c_1_pwd_reset",
  B2CForgotPwdErrorCode: "AADB2C90118",
  B2CClientID: "334b1bc2-4969-4052-b13a-d42da78470d1",
  B2CPostLogoutRedirectUri: "https://localhost:44355/",
  protectedResourceMap: [
    ['https://localhost:44392/api/orgsgraph', ['https://hermesdevb2c.onmicrosoft.com/ngdevapi/ngapi']],
    ['https://localhost:44392/api/airwaybills', ['https://hermesdevb2c.onmicrosoft.com/ngdevapi/ngapi']],
    ['https://localhost:44392/api/vct', ['https://hermesdevb2c.onmicrosoft.com/ngdevapi/ngapi']]
  ]
};
