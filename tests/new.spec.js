// @ts-check
// [ref reuse single page between tests](https://playwright.dev/docs/test-retries#reuse-single-page-between-tests)
const { test,expect } = require('@playwright/test');
const { request } = require('@playwright/test');

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

/*
test(' out run 1 ', async  ({page}) => {
	await page.goto('https://'+ip+'/#login');
	await page.getByPlaceholder('Username').fill('admin');
	await page.waitForTimeout(2000);
//	await page.getByPlaceholder('Password', { exact: true }).fill('admin');
	await page.getByPlaceholder('Password', { exact: true }).fill('11111111');
	await page.getByRole('button', { name: 'Sign me in' }).click();
	
});
*/

//test.describe.configure({mode:' serial' });   // => in doc it's not 
let page;
test.beforeAll(async({browser}) => {
/*
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
//	await page.getByRole('button', { name: 'Sign me in' }).click();
	await page.locator('text=Sign me in').click();	
	//await page.pause();
	}
	else
	{
	await page.getByPlaceholder('Username').fill('admin');
	await page.getByPlaceholder('Password', { exact: true }).fill('11111111');
	await page.getByRole('button', { name: 'Sign me in' }).click();
	}
	*/
});
//test('run 1 -- sensor',async function({page}) => {    // error
//test('run 1 -- sensor',async ({page}) => {	 // error didnt login...==WTF

test.beforeEach('login', async({page,request})=>{
	//let page = await browser.newPage();
	//console.log(page);
	await page.goto('https://'+ip+'/#login');
	//const responsePromise = page.waitForResponse('https://'+ip+'/#login');
	
	await page.getByPlaceholder('Username').fill('admin');
	////await page.getByPlaceholder('Username').press('Tab');
	await page.waitForTimeout(50);
	await page.getByPlaceholder('Password', { exact: true }).fill('11111111');
	await page.waitForTimeout(50);
	await page.getByRole('button', { name: 'Sign me in' }).click();
	//await page.locator('text=Sign me in').click();	
	//let passwor = await response.allHeaders();
	//console.log(passwor);
//	let loveboey=await response.body();
//	console.log(loveboey);
	//const responsePromise = page.waitForResponse('https://'+ip+'/#dashboard');
	//await page.getByText('trigger response').click();
	//const response = await responsePromise;
	const loginResponse = await request.post('https://'+ip+'/api/session' , {
		data : {
			username:"admin",
			password:"1111111",
		}
		});	
	console.log(loginResponse);

	await page.waitForTimeout(1000);
	//console.log(request);
	
	//console.log(response);
});
test('run 1 -- sensor',async ({page}) => {
	//await page.waitForTimeout(10000);
	//await page.goto('https://'+ip+'/#login');
	await page.goto('https://'+ip+'/#sensors');
	await page.waitForTimeout(2000);
	//[screenshot](https://testersdock.com/playwright-screenshot-capture/#:~:text=Go%20to%20Playwright.config.ts%20file%20and%20under%20use%20add,in%20Playwright%20provides%20other%20options%20to%20capture%2Fmanipulate%20screenshots.)'
	//await page.getByRole('heading', { name: 'Sensor Reading Live reading' });
	//await page.getByText('Sensor Reading ').isVisible();
	 await page.getByRole('heading', { name: 'Sensor Reading Live reading' }) 
	//  Error: locator.isVisible: Error: strict mode violation: getByText('Sensor Reading ') resolved to 3 elements:            
	await page.screenshot({path:'screenshot/sensor.png',fullPage:true});

});
//test('run 2 -- syslog',async ({}) => { => TypeError: Cannot read properties of undefined (reading 'goto')
test('run 2 -- syslog',async ({page}) => {
	//await page.waitForTimeout(10000);
	await page.goto('https://'+ip+'/#login');
	await page.goto('https://'+ip+'/#settings/log/advanced_log');
	await page.waitForTimeout(1000);
	await page.screenshot({path:'screenshot/advanced_log.png',fullPage:true});

});
test('run 3',async ({page}) => {
	//await page.goto('https://192.168.120.218/
	//await page.waitForTimeout(10000);
	await page.goto('https://'+ip+'/#login');
	await page.goto('https://'+ip+'/#maintenance/firmware_update_wizard');
	await page.locator('#mainfirmware_image').setInputFiles(love_firemware_name);
	await page.getByRole('button', { name: 'Start firmware update' }).click();	
});
test('run 4',async ({page}) => {
	//await page.waitForTimeout(10000);
	await page.goto('https://'+ip+'/#login');
	await page.waitForTimeout(2000);
	await page.goto('https://'+ip+'/#logs/audit-log');
	
	//await page.pause();
	await page.waitForTimeout(5000);
	await page.screenshot({path:'screenshot/audit-log.png',fullPage:true });

});
test('run 5 -- settings/date_time ',async ({page}) => {
	await page.goto('https://'+ip+'/#settings/date_time');
	let timeFactor = "false" ;
	timeFactor = await page.locator('#iddate-picker').getByRole('textbox').isVisible();
	console.log('timeFacotr'+timeFactor);
	await page.screenshot({path: 'screenshot/settings/date_time.png',fullPage:true });
});
test('run 6 -- settings/ext_users ' , async({page}) => {
	let ldapGeneral = "false" ;
	await page.goto('https://'+ip+'/#settings/ext_users');
	await page.waitForTimeout(2000);
	await page.screenshot({path: 'screenshot/settings/external_user_services/external_user.png',fullPage:true });

	await page.goto('https://'+ip+'/#settings/ext_users/ldap');
	await page.waitForTimeout(1000);
	await page.screenshot({path: 'screenshot/settings/external_user_services/ldap/ldap.png',fullPage:true });

	await page.goto('https://'+ip+'/#settings/ext_users/ldap/general_ldap');
	ldapGeneral = await page.getByText('Search Base', { exact: true }).isVisible();
	await page.waitForTimeout(1000);	//
	await page.screenshot({path: 'screenshot/settings/external_user_services/ldap/general.png',fullPage:true});

	await page.goto('https://'+ip+'/#settings/ext_users/ldap/rolegroup_ldap');
	await page.waitForTimeout(500);
	await page.screenshot({path: 'screenshot/settings/external_user_services/ldap/rolegroup_ldap.png',fullPage:true});

	//--------------------------------------------------------
	await page.goto('https://'+ip+'/#settings/ext_users/active_directory');
	await page.waitForTimeout(1000);
	await page.screenshot({path: 'screenshot/settings/external_user_services/active/active_directory.png',fullPage:true});


	await page.goto('https://'+ip+'/#settings/ext_users/active_directory/general_active_directory');
	await page.waitForTimeout(1000);
	await page.screenshot({path: 'screenshot/settings/external_user_services/active/general_active_directory.png',fullPage:true});

	await page.goto('https://'+ip+'/#settings/ext_users/active_directory/rolegroup_active_directory');
	await page.waitForTimeout(1000);
	await page.screenshot({path: 'screenshot/settings/external_user_services/active/rolegroup_active_directory.png',fullPage:true});

	//--------------------------------------------------------------------------------
	await page.goto('https://'+ip+'/#settings/ext_users/radius');
	await page.waitForTimeout(1000);
	await page.screenshot({path: 'screenshot/settings/external_user_services/radius/radius.png',fullPage:true});
	
	await page.goto('https://'+ip+'/#settings/ext_users/radius/general_radius');
	await page.waitForTimeout(1000);
	await page.screenshot({path: 'screenshot/settings/external_user_services/radius/general_radius.png',fullPage:true});

	await page.goto('https://'+ip+'/#settings/ext_users/radius/advanced_radius');
	await page.waitForTimeout(1000);
	await page.screenshot({path: 'screenshot/settings/external_user_services/radius/advanced_radius.png',fullPage:true});


});
test('run 7 -- ',async({page }) =>{
	await page.goto('https://'+ip+'/#settings/mouse');
	await page.waitForTimeout(1000);
	await page.screenshot({path: 'screenshot/settings/mouse.png',fullPage:true});
});
test('run 8 -- log' ,async({page}) => {
	await page.goto('https://'+ip+'/#settings/log');
	await page.waitForTimeout(1000);
	await page.screenshot({path: 'screenshot/settings/log/log.png',fullPage:true});
	await page.goto('https://'+ip+'/#settings/log/SEL_log_settings_policy');
	await page.waitForTimeout(500);
	await page.screenshot({path: 'screenshot/settings/log/SEL_log_settings_policy.png',fullPage:true});
	await page.goto('https://'+ip+'/#settings/log/advanced_log');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/log/advanced.png',fullPage:true});
});
test('run 9 -- media ' , async({page}) => {
	await page.goto('https://'+ip+'/#settings/media');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/media/mdeia.png',fullPage:true});

	await page.goto('https://'+ip+'/#settings/media/general');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/media/media-general.png',fullPage:true});

	await page.goto('https://'+ip+'/#settings/media/instance');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/media/media-instance.png',fullPage:true});

	await page.goto('https://'+ip+'/#settings/media/remote_session');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/media/media-remote_session.png',fullPage:true});

	await page.goto('https://'+ip+'/#settings/media/active_redirections');
	await page.waitForTimeout(2900);
	await page.screenshot({path: 'screenshot/settings/media/media-active_redirections.png',fullPage:true});
});
test('run 10 -- network ',async({page}) => {
	let ipDns="false";
	await page.goto('https://'+ip+'/#settings/network');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/network/network.png',fullPage:true});

	await page.goto('https://'+ip+'/#settings/network/ip');
	await page.getByText('VLAN Priority').isVisible();
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/network/ip.png',fullPage:true});

	await page.goto('https://'+ip+'/#settings/network/link');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/network/link.png',fullPage:true});

	await page.goto('https://'+ip+'/#settings/network/dns');
	await page.getByText('DNS Interface', { exact: true }).isVisible();
	ipDns = await page.getByText('DNS Interface', { exact: true }).isVisible();
	console.log(ipDns);
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/network/dns.png',fullPage:true});
	
});
test('run 11 -- pam_order',async({page}) => {
	await page.goto('https://'+ip+'/#settings/pam_order');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/pam_order.png',fullPage:true});
});

test('run 12 -- PEF',async({page}) => {
	await page.goto('https://'+ip+'/#settings/pef');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/pef/pef.png',fullPage:true});
	
	await page.goto('https://'+ip+'/#settings/pef/event_filters');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/pef/event_filters.png',fullPage:true});
	await page.goto('https://'+ip+'/#settings/pef/alert_policies');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/pef/alert_policies.png',fullPage:true});
	await page.goto('https://'+ip+'/#settings/pef/lan_destinations');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/pef/lan_destinations.png',fullPage:true});
});
test('run 13 -- services ',async({page}) => {
	await page.goto('https://'+ip+'/#settings/services');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/services.png',fullPage:true});
});
test('run 14 -- smtp ',async({page}) => {
	await page.goto('https://'+ip+'/#settings/smtp');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/smtp.png',fullPage:true});
});
test('run 15 -- dying_gasp ',async({page}) => {
	await page.goto('https://'+ip+'/#settings/dying_gasp');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/dying_gasp.png',fullPage:true});

});
test('run 16 -- ssl ',async({page}) => {
	await page.goto('https://'+ip+'/#settings/ssl');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/ssl/ssl.png',fullPage:true});

	await page.goto('https://'+ip+'/#settings/ssl/view_ssl');
	await page.getByText('Issued to Email Address').isVisible();
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/ssl/view_ssl.png',fullPage:true});


	await page.goto('https://'+ip+'/#settings/ssl/generate_ssl');
	await page.getByText('Key Length', { exact: true }).isVisible();
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/ssl/generate_ssl.png',fullPage:true});

	await page.goto('https://'+ip+'/#settings/ssl/upload_ssl');
	await page.getByText('Trusted CA Certificates', { exact: true }).isVisible();
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/ssl/upload_ssl.png',fullPage:true});

});
test('run 17 -- system firewall',async({page}) => {
	await page.goto('https://'+ip+'/#settings/firewall');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/firewall/firewall.png',fullPage:true});

	await page.goto('https://'+ip+'/#settings/firewall/general_firewall_settings');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/firewall/general_firewall_settings/general_firewall_settings.png',fullPage:true});

	await page.goto('https://'+ip+'/#settings/firewall/general_firewall_settings/existing_firewall_settings');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/firewall/general_firewall_settings/existing_firewall_settings.png',fullPage:true});

	await page.goto('https://'+ip+'/#settings/firewall/general_firewall_settings/add_firewall_settings');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/firewall/general_firewall_settings/add_firewall_settings.png',fullPage:true});
	// --------------------------------
	
	await page.goto('https://'+ip+'/#settings/firewall/ip_firewall');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/firewall/ip_firewall/ip_firewall.png',fullPage:true});
	await page.goto('https://'+ip+'/#settings/firewall/ip_firewall/ip_rules');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/firewall/ip_firewall/ip_rules.png',fullPage:true});
	await page.goto('https://'+ip+'/#settings/firewall/ip_firewall/add_ip_rule');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/firewall/ip_firewall/add_ip_rule.png',fullPage:true});
	//---------------------------------------------------------------

	await page.goto('https://'+ip+'/#settings/firewall/port_firewall');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/firewall/port_firewall/port_firewall.png',fullPage:true});
	await page.goto('https://'+ip+'/#settings/firewall/port_firewall/port_rules');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/firewall/port_firewall/port_rules.png',fullPage:true});
	await page.goto('https://'+ip+'/#settings/firewall/port_firewall/add_port_rule');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/firewall/port_firewall/add_port_rule.png',fullPage:true});
});

test('run 18',async({page}) => {
	//console.log(page);
	console.log("------------------");
	await page.goto('https://'+ip+'/#settings/users');
	//await page.screenshot({path: 'screenshot/settings/video/video.png',fullPage:true});
	let LoveLayer = await page.$('#idgroup_by_channel');
	let Loveflag=0;
	//let LoveLayer = await page.$('#group_by_channel');//===>error
	do{
	await page.goto('https://'+ip+'/#settings/users');
	console.log("Lovelayer : "+Loveflag+ "  " + LoveLayer);
	console.log(typeof(LoveLayer));
	console.log("--------------------");
	LoveLayer = await page.$('#idgroup_by_channel');
	await page.waitForTimeout(100);
	Loveflag++;
	}while(LoveLayer ===null);

	let allElements = await LoveLayer.$$("option");
	console.log("allelements ====> " + allElements);
	console.log(typeof(allElements));
	let i=0;
	for(let i=0;i<allElements.length;i++){
		let element = allElements[i];
		let LoveValue = await element.textContent();
		console.log("Value from dropdown using for loop : [" + i + " ] "  + LoveValue);
		await page.locator('#idgroup_by_channel').selectOption(LoveValue);
		await page.waitForTimeout(600);
		await page.screenshot({path:'screenshot/settings/users/channel'+LoveValue+'.png',fullPage:true});
	}

});
test('run 19 -- video recording ',async({page}) => {
	await page.goto('https://'+ip+'/#settings/video');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/video/video.png',fullPage:true});
	await page.goto('https://'+ip+'/#settings/video/auto');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/video/auto/auto_video_setting.png',fullPage:true});
	await page.goto('https://'+ip+'/#settings/video/auto/trigger_settings');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/video/auto/trigger_settings.png',fullPage:true});
	await page.goto('https://'+ip+'/#settings/video/auto/remote_storage');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/video/auto/remote_storage.png',fullPage:true});
	await page.goto('https://'+ip+'/#settings/video/auto/pre_event');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/video/auto/pre_event.png',fullPage:true});
	//----------------------------------------------------------------------
	await page.goto('https://'+ip+'/#settings/video/sol');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/video/sol/sol_setting.png',fullPage:true});
	await page.goto('https://'+ip+'/#settings/video/sol/sol_trigger_settings');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/video/sol/sol_trigger_settings.png',fullPage:true});
	await page.goto('https://'+ip+'/#settings/video/sol/sol_remote_storage');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/video/sol/sol_remote_storage.png',fullPage:true});
	await page.goto('https://'+ip+'/#settings/video/sol/sol_configurations');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/video/sol/sol_configurations.png',fullPage:true});
});
test('run 20 -- ipmi interfaces ',async({page}) => {
	await page.goto('https://'+ip+'/#settings/ipmi_interfaces');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/ipmi_interfaces/ipmi_interfaces.png',fullPage:true});
});
test('run 21',async({page}) => {

});
