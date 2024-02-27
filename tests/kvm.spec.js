// @ts-check
const { test,expect } = require('@playwright/test');
import {ip} from '../javascript_ip.js';
test.use({
	ignoreHTTPSErrors: true,
  });
	//var page2=page;
let InputUser="admin";
const InputPassword="11111111";

const playwright = require("playwright");

//test('kvm',async({page})=>{
//
//});

test('kvm',async () => {
	const browser = await playwright.chromium.launch();
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto('https://www.msn.com/zh-tw/news/living/%E8%8B%97%E6%A0%97%E4%B8%89%E7%81%A39-2%E5%BA%A6-%E5%90%B3%E5%BE%B7%E6%A6%AE-%E5%86%B7%E7%A9%BA%E6%B0%A327%E6%97%A5%E7%B7%A9%E6%85%A2%E6%B8%9B%E5%BC%B1/ar-BB1iSwML?ocid=entnewsntp&pc=U531&cvid=7a9fa0386821496d8ef17397bcb84441&ei=26');

	// Important to "start" this promise before the window.open() could happen
	const newPagePromise = new Promise(resolve => context.once("page", resolve))

	// Imagine some internal window.open() logic
	await page.evaluate(() => {
		setTimeout(() => {
			window.open("https://github.com/microsoft/playwright", "_blank")
		}, 3 * 1000)
	})

	// Here we are waiting until the page has been opened
	const newPage = await newPagePromise

	// Since its a normal Page instance, we can now assert the URL of it
	console.log(newPage.url(), await newPage.title())

	await browser.close();
});


test.only('kvm1', async ({ page }) => {
	await page.goto('https://'+ip+'/#login');
	await page.getByPlaceholder('Username').fill(InputUser);
	//await page.getByPlaceholder('Username').fill('admin');
	await page.getByPlaceholder('Password', { exact: true }).fill('11111111');
	await page.getByRole('button', { name: 'Sign me in' }).click();
	const response = await expect(page).toHaveURL('https://'+ip+'/#dashboard');
	await page.goto('https://'+ip+'/#remote_control');
	const page1Promise = page.waitForEvent('popup');
	await page.getByRole('button', { name: ' Launch H5Viewer' }).click();
	const page1 = await page1Promise;
	await page.waitForTimeout(2000);
	await page1.locator('#cursor_canvas').click({
		position: {
			x: 39,
			y: 548
		}
	});
	await page.waitForTimeout(2000);
});
