// @ts-check
const { test, expect } = require('@playwright/test');
let flagChangePassword = 0;

test.use({
	ignoreHTTPSErrors: true,
  });
// this is very imortant didnt discord it 

test.skip(' just test in the amazing thing to test number connceting ', async({ page}) => {
	//await page.goto('https://185.199.111.153');
	await page.goto('http://192.168.120.241:3000/');
});
test('try password', async ({page}) => {
	
});

test.only('change password ', async ({ page }) => {

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

	await page.getByPlaceholder('New Password').fill('11111111');
	await page.getByPlaceholder('Confirm Password').fill('11111111');
	page.once('dialog', dialog => {
		console.log(`Dialog message: ${dialog.message()}`);
		dialog.dismiss().catch(() => {});
	});
	await page.getByRole('button', { name: 'Submit' }).click();
	//await page.getByPlaceholder('Username').fill('');
	//await page.getByRole('textbox', { name: 'Taiwan - 中文 (正體)' }).click();
	//await page.getByRole('option', { name: 'US - English' }).click();
	await page.getByPlaceholder('Username').fill('admin');
	//await page.getByPlaceholder('Username').press('Tab');
	await page.waitForTimeout(1000);
	await page.getByPlaceholder('Password', { exact: true }).fill('11111111');
	await page.waitForTimeout(4000);
	

	
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

