const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base');
const { POManager } = require('../pageobjects/POManager');
//Json->string->js object
//parse - coverts JSON to JavaScript. stringnify - make it to be a string
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json"))); 

for(const data of dataset)
{
   test(`Client App login for ${data.productName}`, async ({ page }) => 
   {
      const poManager = new POManager(page);
   
      const loginPage = poManager.getLoginPage();
      await loginPage.goTo();
      await loginPage.validLogin(data.username, data.password);
      
      const dashboardPage = poManager.getDashboardPage();
      await dashboardPage.searchProductAddCart(data.productName);
      await dashboardPage.navigateToCart();
   
      const cartPage = poManager.getCartPage();
      await cartPage.VerifyProductIsDisplayed(data.productName);
      await cartPage.Checkout();
   
      const ordersReviewPage = poManager.getOrdersReviewPage();
      await ordersReviewPage.searchCountryAndSelect("ind", "India");
      const orderId = await ordersReviewPage.SubmitAndGetOrderId();
      console.log(orderId);
      
      await dashboardPage.navigateToOrders();
      const ordersHistoryPage = poManager.getOrdersHistoryPage();
      await ordersHistoryPage.searchOrderAndSelect(orderId);
      expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
   });
   
   // customtest(`Client App login with custom test`, async ({ page, testDataForOrder }) => 
   // {
   //    const poManager = new POManager(page);
   
   //    const loginPage = poManager.getLoginPage();
   //    await loginPage.goTo();
   //    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
      
   //    const dashboardPage = poManager.getDashboardPage();
   //    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
   //    await dashboardPage.navigateToCart();
   
   //    const cartPage = poManager.getCartPage();
   //    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
   //    await cartPage.Checkout();
   
   //    // const ordersReviewPage = poManager.getOrdersReviewPage();
   //    // await ordersReviewPage.searchCountryAndSelect("ind", "India");
   //    // const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   //    // console.log(orderId);
   //    // await dashboardPage.navigateToOrders();
   //    // const ordersHistoryPage = poManager.getOrdersHistoryPage();
   //    // await ordersHistoryPage.searchOrderAndSelect(orderId);
   //    // expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
   // });
}
