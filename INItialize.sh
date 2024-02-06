#! /bin/bash
### {{{ 
### ----------------------
### created : Tue Feb  6 16:18:47 CST 2024
### Version : 0.0
### author : loveloveempress
### time   : Tue Feb  6 16:50:35 CST 2024
### ----
### readme : this is the initial initialization
###			 It can be imagined as the concept of global variables
### rule: 
###
### IP part :
### 
### bmc upfile :
### 
### 
### ---------------------
### }}}

global_bmc_update_file="";
flag_file_exist_BMC_update="";
if [ -f ./bmc_update.js ];
then
	#echo "$(cat ./bmc_update.js)";
	grep update ./bmc_update.js
else
	echo -e '// @ts-check\nexport let updateBMCfile="ANCHOR.java"'>bmc_update.js
fi

if [ -f ./javascript_ip.js ];
then
	grep ip ./javascript_ip.js;
else
	echo -e '// @ts-check\nexport let ip="192.168.120.218"'>javascript_ip.js
fi

