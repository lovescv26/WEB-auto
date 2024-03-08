// @ts-check
// [ref reuse single page between tests](https://playwright.dev/docs/test-retries#reuse-single-page-between-tests)
const { test,expect } = require('@playwright/test');
const { request } = require('@playwright/test');
//const {newTest} = require('fixture.js'); 	==> error didint catvh
import {ip} from '../javascript_ip.js';
//console.log(ip);
	//it will show 3 times that is in line with the number of features
test.use({
	ignoreHTTPSErrors: true,
  });

const InputUser="admin";
const InputPassword="11111111";
test.beforeEach('login', async({page,request })=>{
	let loginFlag;
	await page.goto('https://'+ip+'/#login');
	await page.getByPlaceholder('Username').fill(InputUser);
	await page.waitForTimeout(50);
	await page.getByPlaceholder('Password', { exact: true }).fill(InputPassword);
	await page.waitForTimeout(50);
	await page.getByRole('button', { name: 'Sign me in' }).click();
	/*
	async function isFinished(response){
		return reponse.url().includes("#dash")&& response.status() ===200 ;
	}
	const response = await page.waitForResponse(async (response) => await isFinished(response));
	*/
	//loginFlag = await page.getByText('Login Failed').isVisible();
	loginFlag = await page.getByText('Login Failed').isVisible();
	//loginFlag = await page.getByRole('tooltip').isVisible();
	//loginFlag = await expect(page.locator("text=Login Failed")).not.toBeVisible();
	console.log(" username: " + InputUser + " | password : " + InputPassword );
	console.log(" validate : " + loginFlag );
	const response = await page.waitForRequest(url => url.url().includes('dashboard'));	
	if(await page.getByText('Login Failed').isVisible()){
		console.log("========================================");
		console.log("    ERROR    :               ");
		console.log(" didn't login !!!        ");
	}
	//console.log(response);
	await page.waitForTimeout(1000);

});
test('screen',async({page,request})=>{
	await page.goto('https://'+ip+'/#<.....>');
	//
	


});
