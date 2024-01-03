// @ts-check
const { test, expect } = require('@playwright/test');
let context;
let page;
//import{ LoginPage } from '../pages/login-page.js';
let flagChangePassword = 0;

test.use({
	ignoreHTTPSErrors: true,
  });
// this is very imortant didnt discord it 
// [ref](https://stackoverflow.com/questions/67048422/ignore-ssl-errors-with-playwright-code-generation)
// [ref-origin](https://github.com/microsoft/playwright/issues/2814)

test.skip(' just test in the amazing thing to test number connceting ', async({ page}) => {
	//await page.goto('https://185.199.111.153');
	await page.goto('http://192.168.120.241:3000/');
});
//test('goto google', async ({page}) => {
//	await page.goto('https://google.com/');
//	//
//});
test('change password ', async ({page }) => {
	await page.goto('https://192.168.120.218/');
	await page.goto('https://192.168.120.218/#dashboard');
	await page.goto('https://192.168.120.218/#login');
	//await page.waitForTimeout(2000);
	await page.getByPlaceholder('Username').fill('admin');
	await page.waitForTimeout(2000);
	await page.getByPlaceholder('Password', { exact: true }).fill('admin');
	await page.waitForTimeout(1000);
	//await page.getByPlaceholder('Password').fill('11111111');
	//await page.getByRole('button', { name: '登入' }).click();
	await page.getByRole('button', { name: 'Sign me in' }).click();
	await page.waitForTimeout(3000);
	const look = await page.getByText('Password should be changed').isVisible();
	//const look1 = await page.getByText('Password should be changed').toBeVisible();
	//OMG  the official documentation is written poorly ==
	//const look2 = await expect(page.getByText('Password should be changed')).toBeVisible();
	console.log(look);
	//console.log(look2);
	//const text1 = await Response.statusText();
	//console.log(text1);
	//const text2 = await apiResponse.text();
	//console.log(text2);
	
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

	//await context.tracing.stop({path: 'test4_trace.zip'});
	
});
/*
 * {{{ 
 * 
function loveLogin({page}){
	await page.goto('https://192.168.120.218/#login');
	await page.getByPlaceholder('Username').fill('admin');
	await page.getByPlaceholder('Password', { exact: true }).fill('11111111');
	await page.getByRole('button', { name: 'Sign me in' }).click();
};
 * }}}
*/
/*
test.beforeAll(async({browser}) =>{
	context = await browser.newContext();
	await context.tracing.start({screenshorts:true, snapshots:true});
	page = (await context).newPage();
});
*/
test('login ', async({page}) => {
//	context = await browser.newContext();
	//await context.tracing.start({screenshorts: true , snapshots:true });
	await page.waitForTimeout(10000);
	await page.goto('https://192.168.120.218/#login');
	await page.getByPlaceholder('Username').fill('admin');
	await page.getByPlaceholder('Password', { exact: true }).fill('11111111');
	await page.getByRole('button', { name: 'Sign me in' }).click();
	//await context.tracing.stop({path: 'test3_trace.zip'});
});
test('sensor ' , async({page}) => {
	//loveLogin();
	/*
	await page.goto('https://192.168.120.218/#login');
	await page.getByPlaceholder('Username').fill('admin');
	await page.getByPlaceholder('Password', { exact: true }).fill('11111111');
	await page.getByRole('button', { name: 'Sign me in' }).click();
	const look = await page.getByText('Password should be changed').isVisible();
	await page.goto('https://192.168.120.218/#sensors');
	await page.waitForTimeout(2000);
	await page.screenshot({path: 'screenshot/sensor.png',fullPage: true });
	if(await page.getByText('Password should be changed').isVisible()){
		console.log(' change password ');
	await page.getByPlaceholder('New Password').fill('11111111');
	await page.getByPlaceholder('Confirm Password').fill('11111111');
	page.once('dialog', dialog => {
		console.log(`Dialog message: ${dialog.message()}`);
		dialog.dismiss().catch(() => {});
	});
	await page.getByRole('button', { name: 'Submit' }).click();
	//await page.getByPlaceholder('Username').fill('admin');
	////await page.getByPlaceholder('Username').press('Tab');
	//await page.waitForTimeout(1000);
	//await page.getByPlaceholder('Password', { exact: true }).fill('11111111');
	//await page.waitForTimeout(4000);
	}
	*/
	await page.goto('https://192.168.120.218/#sensors');
});

test.skip('login eng', async ({ page }) => {
	await page.goto('about:blank');
	await page.goto('chrome-error://chromewebdata/');
	await page.getByRole('button', { name: '進階' }).click();
	await page.getByRole('link', { name: '繼續前往 192.168.120.218 網站 (不安全)' }).click();
	await page.getByRole('textbox', { name: 'Taiwan - 中文 (正體)' }).click();
	await page.getByRole('option', { name: 'US - English' }).click();
	await page.getByPlaceholder('Username').click();
	await page.getByPlaceholder('Username').fill('admin');
	await page.getByPlaceholder('Username').press('Tab');
	await page.getByPlaceholder('Password', { exact: true }).fill('admin');
	await page.getByRole('button', { name: 'Sign me in' }).click();
	//await page.getByText('Password should be changed').click();
	await expect(page.getByText('Password should be changed')).toBeVisible();	
	await page.getByPlaceholder('New Password').click();
	await page.getByPlaceholder('New Password').fill('11111111');
	await page.getByPlaceholder('New Password').press('Tab');
	await page.getByPlaceholder('Confirm Password').fill('11111111');
	page.once('dialog', dialog => {
		console.log(`Dialog message: ${dialog.message()}`);
		dialog.dismiss().catch(() => {});
	});
	await page.getByRole('button', { name: 'Submit' }).click();
	await page.getByPlaceholder('使用者名稱').click();
	await page.getByPlaceholder('使用者名稱').fill('');
	await page.getByRole('textbox', { name: 'Taiwan - 中文 (正體)' }).click();
	await page.getByRole('option', { name: 'US - English' }).click();
	await page.getByPlaceholder('Username').click();
	await page.getByPlaceholder('Username').fill('admin');
	await page.getByPlaceholder('Username').press('Tab');
	await page.getByPlaceholder('Password', { exact: true }).fill('11111111');
	await page.getByRole('button', { name: 'Sign me in' }).click();
});


