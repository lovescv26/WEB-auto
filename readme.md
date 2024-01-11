## 	ERR_CONNECTION_TIMED_OUT
```
Error: page.goto: net::ERR_CONNECTION_TIMED_OUT at https://192.168.120.218/#login
Call log:
  - navigating to "https://192.168.120.218/#login", waiting until "load"
```
就代表 你的機器沒開

## error 1 beforeALL  (test error)
#  beforeAll   XD
Error: "context" and "page" fixtures are not supported in "beforeAll" since they are created on a per-test basis.
If you would like to reuse a single page between tests, create context manually with browser.newContext(). See https://aka.ms/playwright/reuse-page for details.
If you would like to configure your page before each test, do that in beforeEach hook instead.

----
[ref](https://github.com/microsoft/playwright/issues/12408)
Replace beforeAll with beforeEach then it will work.

Playwright Test has context isolation by default, this means you have a new page and context for each test. By this its not possible to give you a page instance in the beforeAll hook, since there are different pages for each test. See here for more information:


---
## error: locator.isVisible : 
出問題的code
``` js
	await page.getByText('Sensor Reading ').isVisible();
```
  Error: locator.isVisible: Error: strict mode violation: 
  getByText('Sensor Reading ') resolved to 3 elements:           
 1) <h1>…</h1> 
	 aka getByRole('heading', { name: 'Sensor Reading Live reading' })                                     
 2) <li class="active">↵             
 Sensor Reading 
 </li> 
	 aka getByText('Sensor Reading', { exact: true})
 3) <div role="alert" class="alert alert-info help-item h…>…</div> aka getByText('On this page, details for all') ">

## error  : 遇到 第一次改密碼後的問題 (beforALL)


## only title name test
[title test](https://www.youtube.com/watch?v=LTwg0kqdK4I)
```bash
npx playwright test -g "{title name}"
```
如果 你要寫一個單獨的測試
可以用 `-g` 選項
因為如果你是 只放 `test`  他預設是 全部單元測試都跑
> 就是浪費你的時間

## Even if there is only a button screenshot, it is still semi-transparent
如果只有2個按鈕
如果你截圖 仍然會半透明
所以只能 給他等待
我測試過 用得到元素的方式
```js
	let ldapGeneral = "false" ;
	await page.goto('https://'+ip+'/#settings/ext_users');
	await page.getByRole('link', { name: 'General Settings' }).isVisible();
	await page.screenshot({path: 'screenshot/settings/external_user_services/external_user.png',fullPage:true });
	await page.waitForTimeout(2000);
```
但是 元素的渲染速度 快過 JS的速度....==
#### resolution
` await page.waitForTimeout(2000); `
time 可以適度調整


## api error
[api-post](https://stackoverflow.com/questions/71398892/how-to-access-response-body-correctly-when-using-playwright)
當你用API 是會一直出錯 ==
我原本看到  
![api](./pic/api.png)
![post](./pic/api_post.png)
```js
test('run 7 -- login and get response',async({page,request }) =>{
		//await page.waitForTimeout(7000);

		await page.goto('https://'+ip+'/#login');
		/*
		   let loginResponse = await request.post('/api/session',{
data:{
username: "admin",
password: "11111111",
}
});

		 */
		//const loginResponse0 = await loginResponse.ok();

});
```
`==> TypeError: apiRequestContext.post: Invalid URL`
![api-er](./pic/api-error.png)
(loveloveNTC)


---

### api correct all 200
很不合理的東西
```js
let ip="192.168.120.218";
	const url = "https://192.168.120.218/#dashboard"
	await page.goto('https://'+ip+'/#login');
	await page.getByPlaceholder('Username').fill('admin');
	////await page.getByPlaceholder('Username').press('Tab');
	await page.waitForTimeout(500);
	await page.getByPlaceholder('Password', { exact: true }).fill('11111110');
	await page.waitForTimeout(500);
	await page.getByRole('button', { name: 'Sign me in' }).click();
	const res = await page.request.get(url);
	console.log(res);
```
```
==>
APIResponse: 200 OK
Content-Encoding: gzip
X-Frame-Options: SAMEORIGIN
Cache-Control: no-store, no-cache, must-revalidate, private
Pragma: no-cache
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: no-referrer
Content-Security-Policy: default-src 'self';object-src 'none';connect-src 'self' ws: wss:;style-src 'self';script-src 'self'; img-src 'self' blob:;frame-ancestors 'self';font-src 'self'
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Content-Type: text/html
Accept-Ranges: bytes 
ETag: "2683747453" 
Last-Modified: Fri, 08 Dec 2023 04:04:30 GMT 
Content-Length: 1164
Connection: close
Date: Mon, 08 Jan 2024 05:42:46 GMT
Server: lighttpd
2 passed (15.4s)
```
我故意答錯 但是在API 卻顯示 `200`

---
## if screenshot no suffix png error
```js
 Error: path: unsupported mime type "null"
   302 |     await page.goto('https://'+ip+'/#settings/pam_order');
   303 |     await page.waitForTimeout(900);
 > 304 |     await page.screenshot({path: 'screenshot/settings/pam_order',fullPage:true});
       |                ^
```
#### solution add suffix
` await page.screenshot({path: 'screenshot/settings/pam_order.png',fullPage:true});`


---
##  error : User Manangement 
[basic-origin](https://www.youtube.com/watch?v=bgxQ3PXJdIM&list=PL6flErFppaj0iQG2_Dd72Jz0bfrzZwMZH&index=11)
首先 我為什麼會出現這個問題 
我先介紹一下 大環境 
這個是他有選擇的選單
![user from](./pic/User_managment.png)
有抓到重點嗎?
我擔心元素會有其他
所以我需要 把元素抓下來
可以看到 source code
```html
<form class="form-inline">
<div class="form-group" %%feature="" %%runtime-feature="">
<label for="group_by_channel">Channel </label>
	<select name="group_by_channel" id="idgroup_by_channel" class="form-control">
		<option value="1">1</option>
		<option value="2">2</option>
		<option value="7">7</option>
	</select>
</div> 
</form>
```

TypeError: Cannot read properties of null (reading '$$')
```js
test('run 18',async({page}) => {
	await page.goto('https://'+ip+'/#settings/users');
	await page.waitForTimeout(900);
	//await page.screenshot({path: 'screenshot/settings/video/video.png',fullPage:true});
	let LoveLayer = await page.$('#idgroup_by_channel');
	console.log("lovelayer : " + LoveLayer);
	console.log(typeof(LoveLayer));
	console.log("--------------------");
	let allElements = await LoveLayer.$$("option");
	console.log("allelements ====> " + allElements);
	console.log(typeof(allElements));
	let i=0;
	for(let i=0;i<allElements.length;i++){
		let element = allElements[i];
		let LoveValue = await element.textContent();
		console.log("Value from dropdown using for loop : " + LoveValue);
	}
});
```
if use `name=group_by_channel` is 	*error* => `Lovelayer : null`
if use `id="idgroup_by_channel` is	*correct* => `LoveLayer : JSHandle@node`
~~我還不太確定... `JSHandle@node`~~

> 記得  只有ID 對於網頁 是 唯一標示喔



### DF : `page.$`
`page.$ `
is a method in Playwright 
that selects the first element on the current page 
that matches the specified selector.

let LoveLayer = await page.$('#idgroup_by_channel');
selects the element with ID idgroup_by_channel 
and stores it in a variable named LoveLayer.

let allElements = await LoveLayer.$$("option");
will select all elements in the LoveLayer element 
that match the option selector and store them in a variable named allElements

---


#  omg request  api!!!!!
Wed Jan 10 11:05:28 CST 2024
[api -first](https://stackoverflow.com/questions/71398892/how-to-access-response-body-correctly-when-using-playwright)
這個我看了好幾遍 沒想到 最後還是逃不開...==
```
const { request } = require('@playwright/test');
const { test,expect } = require('@playwright/test');
let ip="192.168.120.218";
test.beforeEach('login', async({page,request})=>{
  //const loginResponse = await request.post('https://'+ip+'/api/session' , {	==> error 
	const loginResponse = await request.post('https://'+ip+'/api/session' , {
		data : {
		username:"admin",
		password:"1111111",
		}
	});	
	console.log(loginResponse);
});
```
對我來說終於有成功了
但是還不夠 只是一個開頭

## api  in webtool
```
--- login-error.txt	2024-01-10 14:43:17.516459800 +0800
+++ login-correct.txt	2024-01-10 14:43:14.481453000 +0800
@@ -3,7 +3,7 @@
 Accept-Encoding: gzip, deflate, br
 Accept-Language: zh-TW,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
 Connection: keep-alive
-Content-Length: 30
+Content-Length: 32
 Content-Type: application/x-www-form-urlencoded; charset=UTF-8
 Cookie: QSESSIONID=4f783e0f3a2236dc19dTYAlUQOxY4u; selected_lang=en-us; lang=en-us
 Host: 192.168.120.218
```
這是 request head
上面的差距 只有 密碼不同
所以我就在看 playwright 可以按完後 
如何得到他的 response!!
這就是為什麼我需要 
目的: 看是否登入!

### use  request.post (correct vs error password )
```
	const loginResponse0 = await request.post('https://'+ip+'/api/session' , {
		data : {
			username:"admin",
			password:"11111111",
		}
		});	
	const loginResponse1 = await request.post('https://'+ip+'/api/session' , {
		data : {
			username:"admin",
			password:"0111011",
		}
		});	
	console.log(loginResponse0);
	console.log("------");
	console.log(loginResponse1);
```
result:  same 


##   login error because delete beforeall ...(?
[莫名其妙的 虛假技術==](https://stackoverflow.com/questions/70262213/playwright-before-each-for-all-spec-files)
有出問題  因為 現在登入 直接出問題 (應該說前面 登入後 不能繼續使用)
可能是 我把 beforeAll (就算 沒有 code...) ==
我就在看 fixture.js 的方式 結果
```
Error: Cannot find module 'fixture.js'
Require stack:
- D:\tem\WEB-auto\tests\new.spec.js
- D:\tem\WEB-auto\node_modules\playwright\lib\transform\transform.js
- D:\tem\WEB-auto\node_modules\playwright\lib\common\config.js
- D:\tem\WEB-auto\node_modules\playwright\lib\reporters\json.js
- D:\tem\WEB-auto\node_modules\playwright\lib\reporters\html.js
- D:\tem\WEB-auto\node_modules\playwright\lib\runner\reporters.js
- D:\tem\WEB-auto\node_modules\playwright\lib\runner\runner.js
- D:\tem\WEB-auto\node_modules\playwright\lib\cli.js
- D:\tem\WEB-auto\node_modules\playwright\cli.js
- D:\tem\WEB-auto\node_modules\@playwright\test\cli.js

   at new.spec.js:6

     4 | const { request } = require('@playwright/test');
     5 | //const { response } = require('@playwright/test');
   > 6 | const {newTest} = require('fixture.js');
```
	
#### solution 
```
test.beforeEach('login', async({page,request })=>{
	const response = await request.post("https://"+ip+"/api/session",{
		data:{
			"username":"admin",
			"password":"11111111",
		}
	});
});
```
因為我再用 login api 所以他直接 無法再同個登入 資訊

---

## how to capture requests and responses in playwright after hitting a button?
[ref](https://stackoverflow.com/questions/67434530/how-to-capture-requests-and-responses-in-playwright-after-hitting-a-button)
`const response = await page.waitForRequest(url => url.url().includes('templateFrom3rdRedirect'));`
`'templateFrom3rdRedirect'` : is the part of URL unique






