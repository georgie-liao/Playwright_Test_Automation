const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const { test, expect } = require('@playwright/test');
const playwright = require('@playwright/test');

Given('Login to Ecommerce application with {string} and {string}', {timeout: 100*1000}, async function (username, password) {
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
  });

  When('Add {string} to cart', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
  });

  Then('Verify {string} is displayed in the cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
  });

  When('Enter valid details and place the order', async function () {
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
  });

  Then('Verify order is present in the order history', async function () {
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  });


  //---
  Given('Login to Ecommerce2 application with {string} and {string}', async function (username, password) {
    const _userName = this.page.locator('#username');
    const _password = this.page.locator('#password');
    const _signIn = this.page.locator('#signInBtn');

    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await _userName.type(username);
    await _password.type(password);
    await _signIn.click();
  });

  Then('Verify Error message is displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    expect(await this.page.locator("[style*='block']")).toContainText('Incorrect');
  });