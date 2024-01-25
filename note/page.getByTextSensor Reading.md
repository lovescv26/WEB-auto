---
date : Wed Jan 24 14:39:38 CST 2024

---

# data
[[playwright]] [[locators]] [[getByText]]
[ref](https://playwright.dev/docs/api/class-locator)
[ref](https://playwright.dev/docs/release-notes#locators)

---

## locators
With these new APIs writing locators is a joy:
`page.getByText() to locate by text context.`


## error: locator.isVisible : 
出問題的code
`await page.getByText('Sensor Reading ').isVisible();`

```html
  Error: locator.isVisible: Error: strict mode violation: 
  getByText('Sensor Reading ') resolved to 3 elements:           
 1) <h1>…</h1> 
	 aka getByRole('heading', { name: 'Sensor Reading Live reading' })                                     
 2) <li class="active">↵             
 Sensor Reading 
 </li> 
	 aka getByText('Sensor Reading', { exact: true})
 3) <div role="alert" class="alert alert-info help-item h…>…</div> aka getByText('On this page, details for all') ">
```
因為在這個頁面有 用這個方式抓到一樣的 text 這個DOM裡面有著3處
所以 就會出錯 

解決辦法 (找到可以唯一指定 )
