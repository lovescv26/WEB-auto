---

date : Wed Jan 24 16:50:28 CST 2024

---

tag [[playwright]] [[catch select]]

---

##  error : User Manangement 
[basic-origin](https://www.youtube.com/watch?v=bgxQ3PXJdIM&list=PL6flErFppaj0iQG2_Dd72Jz0bfrzZwMZH&index=11)
這個是他有選擇的選單
![user from](../pic/User_managment.png)
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

