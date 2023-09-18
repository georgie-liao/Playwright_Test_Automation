const { test, expect } = require('@playwright/test');

test('Browser Playwright test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator('#signInBtn');
    const errorMessage = page.locator("[style*='block']");
    const cardTitles = page.locator('.card-body a');


    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.type("rahulshettyacademy");
    await password.type("learning");
    await signIn.click();
    // console.log(await errorMessage).textContent();
    // await expect(errorMessage ).toContainText('Incorrect');

    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test('UI controls test', async ({page})=>
{
    const userName = page.locator('#username');
    const password = page.locator('#password');
    const dropdown = page.locator('select.form-control');
    const radioBtn_User = page.locator(".radiotextsty").last();
    const okayBtn = page.locator("#okayBtn");
    const checkbox_terms = page.locator("#terms");
    const signIn = page.locator('#signInBtn');
    const blinkingText = page.locator("a[class='blinkingText']");
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await expect(blinkingText).toHaveAttribute('class', 'blinkingText');

    await userName.type("rahulshettyacademy");
    await password.type("learning");
    
    await radioBtn_User.click();
    await okayBtn.click();
    expect(await radioBtn_User.isChecked()).toBeTruthy();

    await dropdown.selectOption("Consultant");

    await checkbox_terms.click();
    expect(await checkbox_terms.isChecked()).toBeTruthy();

    await signIn.click();

    //await page.pause();
});

test("Child window test", async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#username');

    const blinkingText = page.locator("a[class='blinkingText']");
    //const documentText = page.locator("p[class='im-para red']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        blinkingText.click(),
    ]);
    
   const text = await newPage.locator("p[class='im-para red']").textContent();
   const arrayText = text.split("@");
   const domain = arrayText[1].split(" ")[0];
    console.log(domain);

})