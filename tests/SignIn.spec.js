const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base');
const { POManager } = require('../pageobjects/POManager');
//Json->string->js object
//parse - coverts JSON to JavaScript. stringnify - make it to be a string
const dataset = JSON.parse(JSON.stringify(require("../utils/signInData.json"))); 

for(const data of dataset)
{
   test(`Client App login for ${data.productName}`, async ({ page }) => 
   {
      const poManager = new POManager(page);
   
      const signInPage = poManager.getSignInPage();
      await signInPage.goToBBHub();
      await signInPage.login(data.username, data.password);

      await signInPage.verifyUserName();
      
   });
 
}
