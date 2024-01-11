// @ts-check
// [ref reuse single page between tests](https://playwright.dev/docs/test-retries#reuse-single-page-between-tests)
const { test,expect } = require('@playwright/test');

/*
 * {{{ 
//小應 竟然給我出錯 可見 只有人多的地方AI才有用==BING generator error ==
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

test(' out run 1 ', async  ({page}) => {
	await page.goto('https://'+ip+'/#login');
	await page.getByPlaceholder('Username').fill('admin');
	await page.waitForTimeout(2000);
//	await page.getByPlaceholder('Password', { exact: true }).fill('admin');
	await page.getByPlaceholder('Password', { exact: true }).fill('11111111');
	await page.getByRole('button', { name: 'Sign me in' }).click();
	
});

test.describe.configure({mode:' serial' });
let page;
test('test ',async({browser}) => {

	page = await browser.newPage();
	await page.goto('https://'+ip+'/#login');
	await page.screenshot({path:'screenshot/login.png',fullPage:true});
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
	/* 
	 *sensor 
	 * */
	await page.goto('https://'+ip+'/#sensors');
	//await page.waitForTimeout(2000);
	//[screenshot](https://testersdock.com/playwright-screenshot-capture/#:~:text=Go%20to%20Playwright.config.ts%20file%20and%20under%20use%20add,in%20Playwright%20provides%20other%20options%20to%20capture%2Fmanipulate%20screenshots.)'
	//await page.getByRole('heading', { name: 'Sensor Reading Live reading' });
	await page.getByText('Sensor Reading ').isVisible();
	await page.screenshot({path:'screenshot/sensor.png',fullPage:true});

	/*
	 *
test('run 2 -- syslog',async () => {
	 *
	 * syslog */

	await page.goto('https://'+ip+'/#login');
	await page.goto('https://'+ip+'/#settings/log/advanced_log');
	await page.waitForTimeout(1000);
	await page.screenshot({path:'screenshot/advanced_log.png',fullPage:true});
	
	/*
	 *})
test('run 3',async () => {
	*
	*/
	//await page.goto('https://192.168.120.218/')
	//await page.waitForTimeout(10000);
	await page.goto('https://'+ip+'/#maintenance/firmware_update_wizard');
	await page.locator('#mainfirmware_image').setInputFiles(love_firemware_name);
	await page.getByRole('button', { name: 'Start firmware update' }).click();	
	//});
	//
	
/*
test('run 4',async () => {
*/
	//await page.waitForTimeout(10000);
	await page.goto('https://'+ip+'/#logs/audit-log');
	await page.waitForTimeout(5000);
	await page.screenshot({path:'screenshot/audit-log.png',fullPage:true });
/*
});
*/

});

