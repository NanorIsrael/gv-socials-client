import puppeteer, { Browser, Page } from 'puppeteer';

class CustomPage {
    page: Page;
    browser: Browser;

    private constructor(page: Page, browser: Browser) {
        this.page = page;
        this.browser = browser;
    }

    // Factory method to create a new instance of CustomPage
    static async testPage(): Promise<CustomPage> {
        const browser = await puppeteer.launch({
            headless: false,
        });
        const page = await browser.newPage();
        const customPage = new CustomPage(page, browser);

        return customPage;
    }

    // Custom method that belongs to CustomPage
    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    // Optional: Add a method to close the browser
    async closeBrowser() {
        await this.browser.close();
    }

    async getContentsOf(selector: string) {
        return await this.page.$eval(selector, (el) => el.innerHTML);
    }

}

export default CustomPage;
