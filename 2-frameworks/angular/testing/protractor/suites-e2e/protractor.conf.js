// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  // specs: [
  //   './src/**/*.e2e-spec.ts'
  // ],
  suites: {
    home: './src/home/**/*.e2e-spec.ts',
    steve: ['./src/steve/**/*.e2e-spec.ts',
      './src/steve/**/*others.e2e-spec.ts']
  },
  Capabilities: {
    'browserName': 'chrome'
  },
  // multiCapabilities: [{
  //   'browserName': 'firefox'
  // }, {
  //   'browserName': 'chrome'
  // }],
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  SELENIUM_PROMISE_MANAGER: false,
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 300000000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};