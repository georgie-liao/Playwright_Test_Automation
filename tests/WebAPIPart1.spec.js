const { test, expect, request} = require('@playwright/test');
const loginPayLoad = { userEmail : "qa.test.no.2@gmail.com", userPassword : "Test@123"};
let token;

//Get login token and use it for all tests
test.beforeAll( async ()=>{

    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data : loginPayLoad
    })
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    console.log(token);
});

test('Client App login', async ({page})=>
{
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

   
   await page.goto("https://rahulshettyacademy.com/client");

   const productName = "iphone 13 pro";
   const products = page.locator(".card-body");
   const userEmail = "qa.test.no.2@gmail.com";

   //wait until all nextwork calls are being done
   //await page.waitForLoadState('networkidle');
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);

   const count = await products.count();
   for(let i = 0; i < count; ++i)
   {
      if(await products.nth(i).locator("b").textContent() === productName) //only loop/search for "b" within locator inside "products.nth(i)"
      {
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }

   await page.locator("[routerlink*='cart']").click();

   await page.locator("div li").first().waitFor(); //wait for first element in the cart is available
   const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible(); //find the locator "h3" that has text "iphone 13 pro"
   expect(bool).toBeTruthy();

   await page.locator("text='Checkout'").click();

   expect(await page.locator(".user__name [type='text']").first()).toHaveText(userEmail);
   
   await page.locator("[placeholder='Select Country']").type("chi", {delay:100}); //{delay:100} to delay typing that will bring up the matching result 

   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for(let i = 0; i < optionsCount; ++i)
   {
     const text = await dropdown.locator("button").nth(i).textContent();
      if(text === " China")
      {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }

   await page.locator(".action__submit").click();

   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

   await page.locator(".btn.btn-custom .fa.fa-handshake-o").click(); //Handshake/Orders button

   await page.locator("tbody").waitFor(); //wait for order table is available
   const rows = await page.locator("tbody tr");
   for(let i = 0; i < await rows.count(); ++i)
   {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if(orderId.includes(rowOrderId))
      {
         await rows.nth(i).locator("button").first().click();
         break;
      }

   }

   const orderIdDetails = await page.locator(".col-text.-main").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();


   await page.pause();
});