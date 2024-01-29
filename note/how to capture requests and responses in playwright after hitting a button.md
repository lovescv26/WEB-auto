---
date : Fri Jan 26 15:01:03 CST 2024

---
tag [[playwright]] [[response]]

## how to capture requests and responses in playwright after hitting a button?
[ref](https://stackoverflow.com/questions/67434530/how-to-capture-requests-and-responses-in-playwright-after-hitting-a-button)
`const response = await page.waitForRequest(url => url.url().includes('templateFrom3rdRedirect'));`
`'templateFrom3rdRedirect'` : is the part of URL unique
