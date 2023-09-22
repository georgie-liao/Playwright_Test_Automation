const { test, expect } = require('@playwright/test');


class SignInPage {

    constructor(page)
    {
        this.page = page;
        this._signInBtn = page.locator("div[class='header hide-sm hide-xs ng-scope'] a:nth-child(2)");
        this._userName = page.locator("#username");
        this._password = page.locator("#password");
        this._submitBtn = page.locator("button[type='submit']");
        this._userNameTab = page.locator("button[aria-owns='menu_container_0']")
    }

    async goToBBHub()
    {
        await this.page.goto("https://bbhubstaging.internal.buddybid.com/");
    }

    async login(username, password)
    {
        await this._signInBtn.isVisible();
        await this._signInBtn.click();
        await this._userName.fill(username);
        await this._password.type(password);
        this._submitBtn.click();
        await this.page.waitForLoadState('networkidle'); //wait until all nextwork calls are being done
    }

    async verifyUserName()
    {
        await this._userNameTab.isVisible();
        expect(this._userNameTab).toContainText("George")
    }
}

module.exports = { SignInPage }