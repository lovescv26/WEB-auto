---

date : Wed Jan 24 17:26:53 CST 2024

---

tag  [[playwright]] [[api]]

---

#  omg request  api!!!!!
Wed Jan 10 11:05:28 CST 2024
[api -first](https://stackoverflow.com/questions/71398892/how-to-access-response-body-correctly-when-using-playwright)
```js
const { request } = require('@playwright/test');
const { test,expect } = require('@playwright/test');
let ip="192.168.120.218";
test.beforeEach('login', async({page,request})=>{
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
可以用POST 的方式 

