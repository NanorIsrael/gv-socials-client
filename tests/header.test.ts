import CustomPage from './helpers/custom-page';

describe('gv socials test suite ', () => {
	let page: CustomPage;

	beforeEach(async () => {
		page = await CustomPage.testPage()
		await page.navigateTo('http://localhost:5173')
	})

	afterEach(async () => {
		await page.closeBrowser()
	})

	test('we can lunch a browser', async () => {
		const text = await page.getContentsOf('p.MuiTypography-root.MuiTypography-body1.header.css-1s9dlqc-MuiTypography-root');
	
		expect(text.toLowerCase()).toEqual('gv socials')
	})
})

