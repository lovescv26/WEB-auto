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

//test.describe.configure({mode:' serial' });   // => in doc it's not 
//let page;
const InputUser="admin";
const InputPassword="11111111";
test.beforeEach('login', async({page,request })=>{
	let loginFlag;
	//let page = await browser.newPage();
	//console.log(page);
	await page.goto('https://'+ip+'/#login');
	//const responsePromise = page.waitForResponse('https://'+ip+'/#login');
	await page.getByPlaceholder('Username').fill(InputUser);
	////await page.getByPlaceholder('Username').press('Tab');
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
	//await page.waitForTimeout(4488);
	const response = await page.waitForRequest(url => url.url().includes('dashboard'));	
	//console.log(response);
	if(await page.getByText('Login Failed').isVisible()){
		console.log("========================================");
		console.log("    ERROR    :               ");
		console.log(" didn't login !!!        ");
	}

	/*
	const response = await request.post("https://"+ip+"/api/session",{
		data:{
			"username":"admin",
			"password":"11111111",
		}
	});
	*/
	//console.log(response);
	await page.waitForTimeout(1000);


});
//test('run 1 -- sensor',async ({page}) => { });
//test('run 2 -- syslog',async ({}) => { => TypeError: Cannot read properties of undefined (reading 'goto')
//test('run 2 -- syslog',async ({page}) => { });
//test('run 3',async ({page}) => {
//	//await page.goto('https://192.168.120.218/
//	//await page.waitForTimeout(10000);
//	await page.goto('https://'+ip+'/#login');
//	await page.goto('https://'+ip+'/#maintenance/firmware_update_wizard');
//	await page.locator('#mainfirmware_image').setInputFiles(love_firemware_name);
//	await page.getByRole('button', { name: 'Start firmware update' }).click();	
//});
//test('run 4',async ({page}) => { });

//const config: PlaywrightTestConfig = {
//	globalTimeout: 120000,
//	timeout: 5000;
//}
test('run 5 -- settings/',async ({page}) => {
	test.setTimeout(420000);
	
	/*
	 *	run 1
	 *	=====  sensor	====
	 */
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


	/*
	 *	run 2
	 *	log settings
	 */
	//await page.waitForTimeout(10000);
	await page.goto('https://'+ip+'/#login');
	await page.goto('https://'+ip+'/#settings/log/advanced_log');
	await page.waitForTimeout(1000);
	await page.screenshot({path:'screenshot/advanced_log.png',fullPage:true});

	/*
	 *	run 4  logs/audit-log
	 */

	//await page.waitForTimeout(10000);
	await page.goto('https://'+ip+'/#login');
	await page.waitForTimeout(2000);
	await page.goto('https://'+ip+'/#logs/audit-log');
	
	//await page.pause();
	await page.waitForTimeout(5000);
	await page.screenshot({path:'screenshot/audit-log.png',fullPage:true });

	await page.goto('https://'+ip+'/#settings/date_time');
	let timeFactor = "false" ;
	timeFactor = await page.locator('#iddate-picker').getByRole('textbox').isVisible();
	console.log('timeFacotr'+timeFactor);
	await page.waitForTimeout(500);
	await page.screenshot({path: 'screenshot/settings/date_time.png',fullPage:true });

	/*
	 *		& run 6 &
	/* ====    settings/ext_users   =====
	 *
	 */
	//let ldapGeneral = "false" ;
	await page.goto('https://'+ip+'/#settings/ext_users');
	await page.waitForTimeout(2000);
	await page.screenshot({path: 'screenshot/settings/external_user_services/external_user.png',fullPage:true });

	await page.goto('https://'+ip+'/#settings/ext_users/ldap');
	await page.waitForTimeout(1000);
	await page.screenshot({path: 'screenshot/settings/external_user_services/ldap/ldap.png',fullPage:true });

	await page.goto('https://'+ip+'/#settings/ext_users/ldap/general_ldap');
	let ldapGeneral = await page.getByText('Search Base', { exact: true }).isVisible();
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

	/*
	 *	& run 7 &
	 *	=============  ================== 
	 *
	 */

	await page.goto('https://'+ip+'/#settings/mouse');
	await page.waitForTimeout(1000);
	await page.screenshot({path: 'screenshot/settings/mouse.png',fullPage:true});

	/*
	 *	& run 8 &
	 *	====== log ======
	 *
	 */
	await page.goto('https://'+ip+'/#settings/log');
	await page.waitForTimeout(1000);
	await page.screenshot({path: 'screenshot/settings/log/log.png',fullPage:true});
	await page.waitForTimeout(2000);
	await page.goto('https://'+ip+'/#settings/log/SEL_log_settings_policy');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/log/SEL_log_settings_policy.png',fullPage:true});
	await page.goto('https://'+ip+'/#settings/log/advanced_log');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/log/advanced.png',fullPage:true});

	/*
	 *
	 *	& run 9 &
	 *	======== media  ========
	 *
	 */
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
	//await page.waitForTimeout(1000);

	await page.goto('https://'+ip+'/#settings/media/active_redirections');
	await page.waitForTimeout(1500);
	await page.screenshot({path: 'screenshot/settings/media/media-active_redirections.png',fullPage:true});

	/*
	 *	& run 10 &
	 *	====== network =====
	 *
	 */
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

	/*
	 *	& run 11 &
	 *	====== pam_order =====
	 *
	 */
	await page.goto('https://'+ip+'/#settings/pam_order');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/pam_order.png',fullPage:true});

	/*
	 *	& 12  &
	 *	======= PEF =======
	 */
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

	/*
	 * & 13 &
	 *	======= services ======
	 */
	await page.goto('https://'+ip+'/#settings/services');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/services.png',fullPage:true});

	/*
	 * & 14 &
	 *===== smtp ======
	 */
	await page.goto('https://'+ip+'/#settings/smtp');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/smtp.png',fullPage:true});

	/*
	 *	& 15 &
	 *==== dying_gasp ====
	 */
	await page.goto('https://'+ip+'/#settings/dying_gasp');
	await page.waitForTimeout(900);
	await page.screenshot({path: 'screenshot/settings/dying_gasp.png',fullPage:true});

	/*
	 * & 16 &
	 *=== ssl ====
	 */
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

	/*
	 * & 17 &
	 *==== system firewall ====
	 */
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

	/*
	 * & 18 &
	 *
	 */
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

	/*
	 * & 19 &
	 * =====video recording ===
	 */
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

	/*
	 * & 20 &
	 * ===ipmi interfaces ===
	 *
	 */
	await page.goto('https://'+ip+'/#settings/ipmi_interfaces');
	await page.waitForTimeout(1300);
	await page.screenshot({path: 'screenshot/settings/ipmi_interfaces/ipmi_interfaces.png',fullPage:true});
	await page.waitForTimeout(2000);

});
test('run' , async({page}) => { 

});
/* {{{
test('run 6 -- settings/ext_users ' , async({page}) => { 
test('run 7 -- ',async({page }) =>{ });
test('run 8 -- log' ,async({page}) => { });
test('run 9 -- media ' , async({page}) => { });
test('run 10 -- network ',async({page}) => { });
test('run 11 -- pam_order',async({page}) => { });
test('run 12 -- PEF',async({page}) => { });
test('run 13 -- services ',async({page}) => { });
test('run 14 -- smtp ',async({page}) => { });
test('run 15 -- dying_gasp ',async({page}) => { });
test('run 16 -- ssl ',async({page}) => { });
test('run 17 -- system firewall',async({page}) => { });
test('run 18',async({page}) => { });
test('run 19 -- video recording ',async({page}) => { });
test('run 20 -- ipmi interfaces ',async({page}) => { });
test('run 21',async({page}) => { });
}}}*/
