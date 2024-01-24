// @ts-check
const { test,expect } = require('@playwright/test');
const { request } = require('@playwright/test');
import {ip} from '../javascript_ip.js';
import {updateBMCfile} from '../bmc_update.js';
//const { ip } = require('./new.spec.js');
//export let ip="192.168.120.218";
let InputUser="admin";
const InputPassword="11111111";
test.use({
	ignoreHTTPSErrors: true,
  });
test('show export?',async ({page}) => {
	test.setTimeout(300000);
	await page.goto('https://'+ip+'/#login');
	await page.getByPlaceholder('Username').fill(InputUser);
	await page.waitForTimeout(50);
	await page.getByPlaceholder('Password', { exact: true }).fill(InputPassword);
	await page.waitForTimeout(50);
	await page.getByRole('button', { name: 'Sign me in' }).click();
	//const response = await page.waitForRequest(url => url.url().includes('dashboard'));	
	const response = await expect(page).toHaveURL('https://'+ip+'/#dashboard');
	await page.goto('https://'+ip+'/#maintenance/firmware_update_wizard');
//	await page.locator('#mainfirmware_image').click();
//	await page.locator('#mainfirmware_image').setInputFiles('tests/uploadFiles/IS-5121_v1.1.18N.ima');
	//await page.locator('#textmainfirmware_image').setInputFiles('./tests/uploadFiles/IS-5121_v1.1.18N.ima');
	await page.locator('#mainfirmware_image').setInputFiles('./tests/uploadFiles/'+updateBMCfile);
	await page.waitForTimeout(1600);
	await page.getByRole('button', { name: 'Start firmware update' }).click();
	//expect(await page.locator('#textmainfirmware_image')).toHaveText('IS-5121_v1.1.1.18N.ima');
	//await page.getByRole('button', { name: 'Start firmware update' }).click();	 => didn't catch
	await page.waitForTimeout(2000);
	//--------
	//await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
	//await page.getByRole('button',{name: 'Proceed to Flash' }).click(); => didn't work
	page.once('dialog', dialog => {
		console.log(`Dialog message: ${dialog.message()}`);
		//dialog.dismiss().catch(() => {});
		dialog.accept().catch(() => {});
	});
	await page.waitForTimeout(2000);
	await page.locator('#start').click();
	//await page.getByRole('button',{name: 'Proceed to Flash' }).click();
	//[page.on](https://www.youtube.com/watch?v=V_NdrUUoz7U)
	let loveUploading;
	do{
	loveUploading = await page.locator("//span[contains(@class,'progress-info')]").textContent();
	//console.log("Uploading  ===>  "+loveUploading);		// dev debugger
	await page.waitForTimeout(1024);
	}while(loveUploading !== "Uploading 100%");
	//page.on('response', res => console.log(`<< : ${res.status()} ${res.url()}`));		 	//dev can debugger (just only api response)
	

	await page.locator('div').filter({ hasText: /^Full Flash$/ }).getByRole('insertion').click();
	//await page.locator('div').filter({ hasText: Full Flash }).getByRole('insertion').click();
	page.once('dialog', dialog => {
		console.log(`Dialog message: ${dialog.message()}`);
		//dialog.dismiss().catch(() => {});
		dialog.accept().catch(() => {});
	});
	await page.getByRole('button', { name: 'Flash to Proceed' }).click();
	/*
	await page.waitForResponse((resp) => {
		resp.url().include('api/maintenance/reset')
		expect(resp.status()).toBe(200)
	});	
	*/
	
	const [requestflag] = await Promise.all([
		page.waitForResponse( response => response.url().includes("api/maintenance/reset") && response.status()===200,{timeout:240000}),

	]);

//	page.on('dialog',async dialog=> {
//		expect(dialog.message()).toContain("We will start the firmware upgrade now. You will not be able to access BMC until it flashes and restarts. Do you want to continue?");
//		await dialog.accept();
//	})
	

	await page.goto('https://192.168.120.218/#login');
	


});
