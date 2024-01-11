
// @ts-check
const { test,expect } = require('@playwright/test');
let ip="192.168.120.218";
test.use({
	ignoreHTTPSErrors: true,
  });
let page;
test.beforeEach('login', async({page})=>{
	await page.goto('https://'+ip+'/#login');
	await page.getByPlaceholder('Username').fill('admin');
	await page.getByPlaceholder('Password', { exact: true }).fill('11111111');
	await page.getByRole('button', { name: 'Sign me in' }).click();
	await page.waitForTimeout(50);
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

test('run 18 -- User Management ',async({page}) => {
	await page.goto('https://'+ip+'/#settings/users');
	await page.waitForTimeout(900);
	//await page.screenshot({path: 'screenshot/settings/video/video.png',fullPage:true});
	let LoveLayer = await page.$('#idgroup_by_channel');
	//let LoveLayer = await page.$('#group_by_channel');//===>error
	console.log("Lovelayer : " + LoveLayer);
	console.log(typeof(LoveLayer));
	console.log("--------------------");
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
