const base = require('@playwright/test')
const newTest = base.test.extend({
	login: async({page}, use) => {
	//	await login();
	//	await use(page); //runs test here
		//logic after test
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
	}
})
exports.newTest = newTest
exports.expect = newTest.expect
console.log(newTest);
