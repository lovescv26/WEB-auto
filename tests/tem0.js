// @ts-check
const { test,expect } = require('@playwright/test');
let page;


let ip="192.168.120.218";
//console.log(ip);
	//it will show 3 times that is in line with the number of features
let love_firemware_name="IS-5121_v1.1.14N.ima";
test.use({
	ignoreHTTPSErrors: true,
  });
test('run 0 -- sensor',async ({browser}) => {
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
	//console.log(look);
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
