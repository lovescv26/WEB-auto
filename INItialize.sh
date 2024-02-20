#! /bin/bash
### {{{ 
### ----------------------
### created : Tue Feb  6 16:18:47 CST 2024
### Version : 1.0
### author : loveloveempress
### time  	: Mon Feb 19 14:52:26 CST 2024
### ----
### readme : this is the initial initialization
###			 It can be imagined as the concept of global variables
### rule: 
###
### IP part :
### 
### bmc upfile :
### 
### ---------------------
### }}}

if [ -f ./bmc_update.js ]
then
rm ./bmc_update.js
fi
if [ -f ./javascript_ip.js ]
then
rm ./javascript_ip.js
fi
shopt -s expand_aliases
global_bmc_update_file="";
flag_file_exist_BMC_update="";
function_catch_file_exist(){
OIFS="$IFS";
if [ ! -f ./bmc_update.js ];
then
	#echo "$(cat ./bmc_update.js)";
	#grep update ./bmc_update.js
#else
	echo -e '// @ts-check\nexport let updateBMCfile="ANCHOR.java"'>bmc_update.js
fi

if [ ! -f ./javascript_ip.js ];
then
#	grep ip ./javascript_ip.js;
#else
	echo -e '// @ts-check\nexport let ip="192.168.120.218"'>javascript_ip.js
fi
}
function_catch_file_exist;
#alias edit_file="issoxo -idrvst";
IFS=$'\n';
var_string_ip=$(grep ip javascript_ip.js|cut -d ' ' -f 3|cut -d '"' -f 2);
#var_string_bmc=$(grep ANCHOR bmc_update.js|cut -d ' ' -f 3 | cut -d '"' -f 2);
grep ANCHOR bmc_update.js;
if [ "$?" == "0" ]
then
	var_string_bmc=$(grep ANCHOR bmc_update.js|cut -d ' ' -f 3 | cut -d '"' -f 2);
else
	var_string_bmc=$(grep update bmc_update.js|cut -d ' ' -f 3 | cut -d '"' -f 2);
fi
#echo ${var_string_ip};
echo "now use $(grep ip javascript_ip.js|cut -d ' ' -f 3)";
IFS=${OIFS};
#$(cat javascript_ip.js|grep ip)
grep ip javascript_ip.js;
if [ "$?" == "0" ];
then
	echo " ";
else
	echo -e '// @ts-check\nexport let ip="192.168.120.218"'>javascript_ip.js
fi
if [ ${var_string_ip}="" ]
then
	echo -e '// @ts-check\nexport let ip="192.168.120.218"'>javascript_ip.js
fi
for file in $(ls ./UPLOADFILES)
do
	Extension=${file##*.}
	case "${Extension}" in
		ima)
			echo "";;
		*)
			rm  ./UPLOADFILES/$file;;
	esac	
done
echo "the origin bmc file : ${var_string_bmc}";
var_catch_bmc="";
flag_select_bmc=1;
flag_select_tem='n';
var_local_num=0;
var_locat_get_remainder=0;
var_string_optbmc="";
if [ ${var_string_bmc} == 'ANCHOR.java' ]
then
	#echo -e "Select the file you want to change (press y=> check)\n";
	echo -e "Set the initial bmc updat file 'It is recommended to keep it consistent with the current BMC version'  (press y=> check)\n(press y=> check)\n";
	# Determine whether the user has changed bm_update_file
	while [ ${flag_select_bmc} == 1 ]
	do
		var_local_num=$((var_local_num+1));
		var_locat_get_remainder=$((${var_local_num}%2))
		# flex If you use `head` it will be a bit static
		var_string_optbmc=$(ls UPLOADFILES/|cut -d $'\n' -f $((${var_locat_get_remainder}+1)));
		echo ${var_string_optbmc};
		read -p " Do you want to choose this?" flag_select_tem;
		if [[ ${flag_select_tem} == 'y' ]] || [[ ${flag_select_tem} == 'yes' ]]
		then
			#echo "flag_select_tem";
			flag_select_bmc=0;
#	edit_file "as_to/${var_string_bmc}/${var_string_optbmc}/g" bmc_update.js
			#echo -e "// @ts-check\nexport let updateBMCfile=\"${var_string_optbmc}\"";
			echo -e "// @ts-check\nexport let updateBMCfile=\"${var_string_optbmc}\"">bmc_update.js
		fi
	done
fi