---
date : Wed Jan 24 15:42:43 CST 2024

---
tag [[playwright]] [[api]] 

---
## api error
當時要解決 一直 login 的問題
(因為每一次TEST 都需要登陸 原本想要用API的方式)
[api-post](https://stackoverflow.com/questions/71398892/how-to-access-response-body-correctly-when-using-playwright)
當你用API 是會一直出錯 ==
我原本看到  
![api](../pic/api.png)
![post](../pic/api_post.png)
```js
test('run 7 -- login and get response',async({page,request }) =>{
		await page.goto('https://'+ip+'/#login');
		let loginResponse = await request.post('/api/session',{
			data:{
			username: "admin",
			password: "11111111",
			}
});

		//const loginResponse0 = await loginResponse.ok();

});
```
`==> TypeError: apiRequestContext.post: Invalid URL`
然後就出現這個東西 (他說明 我是錯誤的URL)

![api-er](../pic/api-error.png)
api-error.png
