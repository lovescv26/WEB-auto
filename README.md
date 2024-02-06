---
created : Tue Feb  6 08:57:45 CST 2024
date : Tue Feb  6 10:27:04 CST 2024

---
# Consensus
This is an automatic test MBC written using playwright

The file `dev_record.md` is all my development process
1. development process
2. problems encountered and solve them

+ The folder `note/` put all my test code or development stuff etc.  📜📄📑📚🧾🗒️📝
+ The folder `pic/` put all mp4 mp3 gif etc. 🎬

[set playwright environment](http://sd20-server.aewin.com:3000/_67u42-XQvisBUMef1VGeQ)

---
# ❗necessary file ( developer  have to do ) ❗
❗❗❗❗❗❗❗🧬🧬🧬🧬🧬
### Linux
```bash
echo -e '// @ts-check\nexport let ip="192.168.120.218"'>javascript_ip.js
```
```bash
echo -e '// @ts-check\nexport let updateBMCfile="IS-5121_v1.1.18N.ima"'>bmc_update.js
```


### windows
file : `javascript_ip.js`
```js
// @ts-check
export let ip="192.168.120.210"
```
file : `bmc_update.js`
```js
// @ts-check
//await page.locator('#mainfirmware_image').setInputFiles('./tests/uploadFiles/IS-5121_v1.1.18N.ima');
export let updateBMCfile="IS-5121_v1.1.18N.ima"
```


---
## in progress
1. screenshot of setting page    -- chiangchiang 

---
## Objective
Description: A brief description of the work completed.
1. loop burn in bmc				-- chiangchiang  ❤️  (^◕.◕^)   2024/02/06

---
## Expeted completion
Description: Expected functionality


---
###  how to use burn BMC repeatedly
use command
```bash
./updateBMC.sh
```
[see more details](http://sd20-server.aewin.com:3000/7d_073JjTEiIFLKFqkMNsw)

---
