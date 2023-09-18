// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const config ={
  testDir: './tests',
  retries: 1, //retry test 1 time if failed 
  workers: 3, //runs 3 test files parallel *If not set, all test files run parellel
  /* Maximum time one test can run for. */
  timeout: 30*1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  projects: [
    {
      name: 'chrome',
      use:{
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        video: 'retain-on-failure',
        ignoreHttpsErrors: true, //Ignor https error warning
        permissions:['geolocation'], //automaticly click on allow button for allowing tracking of location
        //trace: 'on', //trace all tests
        trace: 'retain-on-failure', //only trace failed tests
       //viewport : {width:720, height:720} //open page in this size
      }
    },

    {
      name: 'safari',
      use:{
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        video: 'retain-on-failure',
        //trace: 'on',
        trace: 'retain-on-failure', //only trace failed tests
        //...devices['iPhone 11'] //ope page on this device size
      }
    }

  ]
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

};

module.exports = config;
