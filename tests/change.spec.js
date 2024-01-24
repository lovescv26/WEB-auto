// @ts-check
// [ref reuse single page between tests](https://playwright.dev/docs/test-retries#reuse-single-page-between-tests)
const { test,expect } = require('@playwright/test');
//let {ip} = require('../javascript_ip.js')
import {ip} from '../javascript_ip.js';

//console.log(ip);
//let ip="192.168.120.218";
//console.log(ip);
test.use({
	ignoreHTTPSErrors: true,
  });

let page;

test('change pass',async({page})=>{
	//page = await browser.newPage();
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
	await page.waitForTimeout(500);
	await page.getByPlaceholder('Password', { exact: true }).fill('11111111');
	await page.waitForTimeout(500);
//	await page.getByRole('button', { name: 'Sign me in' }).click();
	await page.locator('text=Sign me in').click();	
	//await page.pause();
	}
	else
	{
	console.log(' u didnt change password ');
	await page.getByPlaceholder('Username').fill('admin');
	await page.getByPlaceholder('Password', { exact: true }).fill('11111111');
	await page.getByRole('button', { name: 'Sign me in' }).click();
	}
});

test.beforeAll(async({browser}) => {

});
