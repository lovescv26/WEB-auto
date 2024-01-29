---
date : Fri Jan 26 14:53:28 CST 2024

---
tag [[playwright]] [[api]]
connect file  (./error.txt) (./correct.txt)

## api  in webtool
```diff
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

