---
date : Thu Jan 25 09:40:34 CST 2024

---
[[playwright]] [[api]] [[post]]

---

##   login error because delete beforeall ...(?
[ error ](https://stackoverflow.com/questions/70262213/playwright-before-each-for-all-spec-files)
有出問題  因為 現在登入 直接出問題 (應該說前面 登入後 不能繼續使用)
可能是 我把 beforeAll (就算 沒有 code...) 
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
就算是正確的 username && password


