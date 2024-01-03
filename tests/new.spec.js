// @ts-check
// [ref reuse single page between tests](https://playwright.dev/docs/test-retries#reuse-single-page-between-tests)
const { test } = require('@playwright/test');
/*
 * {{{ 
//BING generator error ==
const { chromium } = require('playwright');
test.describe('測試套件', () => {
	let browser;

	test.before(async () => {
		browser = await chromium.launch();
	});

	test.after(async () => {
		await browser.close();
	});

	test.beforeEach(async () => {
		// 每個測試用例之前都會執行
	await page.goto('https://192.168.120.218/#login');
	await page.getByPlaceholder('Username').fill('admin');
	await page.getByPlaceholder('Password', { exact: true }).fill('11111111');
	await page.getByRole('button', { name: 'Sign me in' }).click();
	});

	test.afterEach(async () => {
		// 每個測試用例之後都會執行
	});

	test('sensor ', async () => {
		// 執行測試用例 1
	await page.goto('https://192.168.120.218/#sensors');
	});

	test('測試用例 2', async () => {
		// 執行測試用例 2
	});

	test('測試用例 3', async () => {
		// 執行測試用例 3
	});
});
 * }}}
*/


let ip="192.168.120.218";
//console.log(ip);
	//it will show 3 times that is in line with the number of features
let love_firemware_name="IS-5121_v1.1.14N.ima";


test.use({
	ignoreHTTPSErrors: true,
  });
test.describe.configure({mode:' serial' });
let page;
test.beforeAll(async({browser}) => {
	page = await browser.newPage();
	await page.goto('https://'+ip+'/#login');
	
	await page.getByPlaceholder('Username').fill('admin');
	await page.waitForTimeout(2000);
	await page.getByPlaceholder('Password', { exact: true }).fill('admin');
	await page.waitForTimeout(1000);
	await page.getByRole('button', { name: 'Sign me in' }).click();
	await page.waitForTimeout(3000);
	const look = await page.getByText('Password should be changed').isVisible();
	console.log(look);
	if(await page.getByText('Password should be changed').isVisible()){
		console.log(' change password ');
	await page.getByPlaceholder('New Password').fill('11111111');
	await page.getByPlaceholder('Confirm Password').fill('11111111');
	page.once('dialog', dialog => {
		console.log(`Dialog message: ${dialog.message()}`);
		dialog.dismiss().catch(() => {});
	});
	await page.getByRole('button', { name: 'Submit' }).click();
	await page.getByPlaceholder('Username').fill('admin');
	////await page.getByPlaceholder('Username').press('Tab');
	await page.waitForTimeout(1000);
	await page.getByPlaceholder('Password', { exact: true }).fill('11111111');
	await page.waitForTimeout(2000);
	}
	else
	{
	await page.getByPlaceholder('Username').fill('admin');
	await page.getByPlaceholder('Password', { exact: true }).fill('11111111');
	await page.getByRole('button', { name: 'Sign me in' }).click();
	}
});
test('run 1',async () => {
	await page.goto('https://'+ip+'/#sensors');
});
test('run 2',async () => {
	await page.goto('https://'+ip+'/#login');
});
test('run 3',async () => {
	//await page.goto('https://192.168.120.218/
	await page.goto('https://'+ip+'/#maintenance/firmware_update_wizard');
	await page.locator('#mainfirmware_image').setInputFiles(love_firemware_name);
	await page.getByRole('button', { name: 'Start firmware update' }).click();	
});
