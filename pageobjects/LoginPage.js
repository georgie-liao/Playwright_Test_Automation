const { test, expect } = require('@playwright/test');


class LoginPage {

    constructor(page)
    {
        this.page = page;
        this.signInBtn = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }

    async validLogin(username, password)
    {
        await this.userName.fill(username);
        await this.password.type(password);
        await this.signInBtn.click();
        await this.page.waitForLoadState('networkidle'); //wait until all nextwork calls are being done
    }
}

module.exports = { LoginPage }