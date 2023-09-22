const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const { test, expect } = require('@playwright/test');
const playwright = require('@playwright/test');

// Given('Login to Ecommerce application with {string} and {string}', {timeout: 100*1000}, async function (username, password) {
//     const loginPage = this.poManager.getLoginPage();
//     await loginPage.goTo();
//     await loginPage.validLogin(username, password);
//   });

Given('sign in to BBHub with {string} and {string}', {timeout: 100*1000}, async function (username, password) {

  this.signInPage = this.poManager.getSignInPage();
  await this.signInPage.goToBBHub();
  await this.signInPage.login(username, password);
});

Then('user should sign in successfully', async function () {
  await this.signInPage.verifyUserName();
});