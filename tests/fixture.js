const base = require('@playwright/test')
test.use({
	ignoreHTTPSErrors: true,
  });
let ip="192.168.120.218";
let InputUser="admin";
const InputPassword="11111111";
const newTest = base.test.extend({
	login: async({page}, use) =>{
		await login();
		await use(page);
	await page.goto('https://'+ip+'/#login');
	//const responsePromise = page.waitForResponse('https://'+ip+'/#login');
	
	await page.getByPlaceholder('Username').fill(InputUser);
	////await page.getByPlaceholder('Username').press('Tab');
	await page.waitForTimeout(50);
	await page.getByPlaceholder('Password', { exact: true }).fill(InputPassword);
	await page.waitForTimeout(50);
	await page.getByRole('button', { name: 'Sign me in' }).click();
	}
});
exports.newTest = newTest;
exports.expect  = newTest.expect
