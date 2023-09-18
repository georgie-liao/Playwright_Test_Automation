const { test, expect } = require('@playwright/test');

test('Playwright special locators', async ({page}) => {
    
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    //await page.locator("input[class='form-control ng-touched ng-dirty ng-invalid']").fill("abc2345");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByRole("button", {name: 'Submit'}).click();

    //await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await page.getByRole("link", {name : "Shop"}).click();

    await page.locator(".card-body").filter({hasText : "Nokia Edge"}).getByRole("button");

    page.pause();
})