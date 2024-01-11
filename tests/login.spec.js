// @ts-check

const { page,test,expect } = require('@playwright/test');
let ip="192.168.120.218";

test.use({
	ignoreHTTPSErrors: true,
	
  });

 // [ref](https://stackoverflow.com/questions/71398892/how-to-access-response-body-correctly-when-using-playwright)]
/*
test('test 00',async({page }) =>{
	//await page.waitForTimeout(7000);
	const url ="https://192.168.120.218/#login";
	//const url = "https://192.168.120.218/api/session"
	//const url = "https://192.168.120.218/#dashboard"
	const response = await request.get(url);

	
	await page.goto('https://'+ip+'/#login');
	let loginResponse = await request.post('/api/session',{
		data:{
			username: "admin",
			password: "11111111",
		}
		});
	//const loginResponse0 = await loginResponse.ok();
	await page.getByPlaceholder('Username').fill('admin');
	////await page.getByPlaceholder('Username').press('Tab');
	await page.waitForTimeout(500);
	await page.getByPlaceholder('Password', { exact: true }).fill('11111110');
	await page.waitForTimeout(500);
	await page.getByRole('button', { name: 'Sign me in' }).click();
	//const res = await page.request.get(url);
	//let rrrr = await response.statusText();
	const body = await response.json();
	console.log(body);
	//console.log(res);
});
*/

test('run 8',async({page}) => {
	//[ref](https://stackoverflow.com/questions/77198232/any-api-request-i-try-to-make-gives-apirequestcontext-fetch-invalid-url)
	//const page= await broswer.newPage();
	const url ="https://192.168.120.218/#login";
	const res = await page.request.get(url);
	//console.log(await res.json());
	//console.log('run8'+res);
});
