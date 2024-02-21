#! /bin/bash
### {{{ 
### ----------------------
### created : Thu Feb  1 14:44:55 CST 2024
### Version : 2.3
### author : lovelovequeen	|| loveloveempress
### time   : Tue Feb 20 09:19:08 CST 2024
### [ref](https://linuxhandbook.com/bash-variables/)
### [ref](https://linuxhandbook.com/bash-arrays/)
### [ref](https://stackoverflow.com/questions/13280131/hexadecimal-to-decimal-in-shell-script)
### [ref](https://stackoverflow.com/questions/49110/how-do-i-write-a-for-loop-in-bash)
### ----
### readme : this is need to let user input ip 
### rule: 
###		1. bmc upfile only 2 file
###		2. One of your files needs to be consistent with your current BMC version
### IP part :
### 	+ +add feature :  if same ip can reuse 
### bmc upfile :
###		+ if the suffix is not ima delete it
###		+ if file more than 2 file just need to delete file (interactive)
###		+ grab all uploaded files && count it
### 
### ---------------------
### }}}
ip="";
validate_ip="";
ip_flag=1;
#origin_ip=$(grep ip javascript_ip.js|cut -d ' ' -f 3| cut -d '"' -f 2) ;
catch_version="";													#catch_version *[] use for ipmitool
need_version="";													#need_version  *[] specific area
set_ip(){
use_file_ip=2;														# 0=> continue  1=>change
use_file_ip_flag=1; #
another_file="./INItialize.sh"
flag_tem=1;
var_input=0;


function_set_initial(){
bash  ${another_file};
}

if [ ! -f ./javascript_ip.js ] || [ ! -f ./bmc_update.js ];
then
	echo " because you didn't devloper file it ";
	#sh ${another_file};
	function_set_initial;
fi

var_catch_bmc_default=$(grep ANCHOR bmc_update.js)
if [[ "$?" == 0 ]] ;then
	var_catch_bmc_default=$(grep ANCHOR bmc_update.js|cut -d ' ' -f 3|cut -d '"' -f 2);
	function_set_initial;
else
	
fi

while [[ ${flag_tem} == 1 ]]
do
	read -p "do u want to set bmc update file? ( press y or n) " var_input;
	if [[ ${var_input} == 'y' ]]
	then
		flag_tem=0;
		function_set_initial;
	elif [[ ${var_input} == 'n' ]]
	then
		flag_tem=0;
	else
		flag_tem=1;
	fi
done
flag_tem=1;
origin_ip=$(grep ip javascript_ip.js|cut -d ' ' -f 3| cut -d '"' -f 2) ;
echo -e "The initial IP  :  \e[31m${origin_ip}\e[0m \n\n";
###### use same IP 
while [ ${use_file_ip_flag} == 1 ]
do
	read -p "Do you want to continue useing this IP?  press \"y\" or \"n\" : " use_file_ip ;
	case "${use_file_ip}" in 
		y|yes|Y|YES)
			use_file_ip_flag=0;
			ip_flag=0;
			ip=${origin_ip};
			;;
		n|no|N|No)
			use_file_ip_flag=0;
			;;
		*)
			;;
	esac
done
###### input new ip
while [ ${ip_flag} == 1 ]
do
	while [[ ${ip} == ${ipmitool_null} ]]
	do
read -p  " U need to input IP address : " ip;
	done
echo -e " if U ip address is  :: \e[31m[${ip}] \e[0m ";
read -p  " press \"Y\" \"y\"  or \"0\" is comfirm ip address : " validate_ip;
case "${validate_ip}" in
	yes|Yes|Y|y|0)
		ip_flag=0;
		echo -e " // @ts-check\nexport let ip=\"${ip}\""
		echo -e " // @ts-check\nexport let ip=\"${ip}\"">javascript_ip.js
		;;
	*)
		echo "plz redo " ;
		;;
esac
done
#echo " double check ======================>  ${ip} ";	## because I think it not loot well
}
set_bmc(){ 
count_uploadfile=0;													#int count_uploadfile
limit_count=0; 														#int limit_count
#limit_count=$(ls ./tests/uploadFiles/ |wc -l)
limit_count=$(ls ./UPLOADFILES/ |wc -l)
if [[ ${limit_count} == 1 ]] ; then
	### if only one update bmc file
	echo -e "==============================\n| ERROR!!! need 2 files      |\n| you only put one file      |\n=============================="; exit 111;	
fi
OIFS="$IFS";
IFS=$'\n';
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
if [ ${limit_count} -gt 2 ]
then
	echo -e "\n\n you have  \e[41m${limit_count}\e[0m  files in the /UPLOADFILES "
else
	echo -e "\n\n you have  \e[42m${limit_count}\e[0m  files in the /tests/UPLOADFILES "
fi
IFS="$OIFS";
while [ ${limit_count} -gt 2 ]
do 
	#echo -e "only 2 file u need to delete some file \n    y=>yes delete\n    n=>no  delete"
	echo -e "|============================|\n| !!BREAK THE RULE           |\n| only 2 files               |\n| U need to delete some file |\n|.                          .|\n|<<interactive delete mode >>|\n| press y => yes delete      |\n|       n => no  delete      |\n|============================|\n\n";
	for file_n in $(ls ./UPLOADFILES)
	do
		rm -vi ./UPLOADFILES/${file_n};
		limit_count=$(ls ./UPLOADFILES/ |wc -l);
		echo " check update file -> ${limit_count}";
		if [[ ${limit_count} == 2 ]]
		then
			break;
		fi
	done
done
for file in $(ls ./UPLOADFILES)
do
	count_uploadfile=$((${count_uploadfile}+1));
	echo  "[${count_uploadfile}    ->    ${file}]";
done
}
catch_ver(){ 
	echo -e "\nip =====>  ${ip}\n";
catch_version=$(ipmitool -I lanplus -H "${ip}" -U admin -P 11111111 raw 0x1e 0x01 0x00);
ipmitool_null="";
#echo "ip check : ${catch_version}"
###### if bmc not working just pop error
if [  "${catch_version}" == "${ipmitool_null}" ]
then
	###### if ip error || BMC is off
	echo -e "=================================\n|You're got some big problems!  |\n|  1. It's BMC problem          |\n|    --check bmc is on          |\n|  2. It's an IP problem        |\n|    --check ip is correct      |\n================================="; exit 1314520;
fi
echo -e "-------------------------------";
#echo -e "\nthis is version  \n${catch_version}";					#dev verification
}

function_catch_version(){
need_version=$(echo "${catch_version}"|cut -c 1-13 );
ipmitool_count=5;
number_1=$(echo "${catch_version}"|cut -c 2-4);						#int number_1
number_2=$(echo "${catch_version}"|cut -c 5-7);						#int number_2
number_3=$(echo "${catch_version}"|cut -c 8-9); 					#int third_number (declare)
number_4=$(echo "${catch_version}"|cut -c 11-13); 					#int number_4
######int parse_1~4 hex => decimal
parse_1=$((16#${number_1})); parse_2=$((16#${number_2})); 
parse_3=$((16#${number_3})); parse_4=$((16#${number_4}));
parse_name=${parse_1}.${parse_2}.$((${parse_4}*100+${parse_3})); 	#char *[] parse_name
#need_version=${need_version} $(echo "${catch_version}"|cut -d ' ' -f 3);
#echo " out : ";
#echo "${need_version}";											#dev verification
#echo "${first_number}";											#dev verification
#echo "${second_number}";											#dev verification
#echo "${third_number}";											#dev verification
#echo "${forth_number}";											#dev verification
###### exclude the same upload file with current bmc version

#change_file_limit=$(ls ./UPLOADFILES/ | grep -v "${parse_name}"|wc -l)
####### fix bug if update file not only 1
#if [ ${change_file_limit} == 1 ]
#then
##change_file=$(ls ./tests/uploadFiles/ | grep -v "${parse_name}");	#char *change_file 
#change_file=$(ls ./UPLOADFILES/ | grep -v "${parse_name}");	#char *change_file 
#else
##echo -e "===================\n|!!!!!!ERROR!!!!! |\n| you file need   |\n|one is right now |\n|version!		   |";
#echo -e "==============================\n| One of your files needs to |\n| consisitent with your      |\n| current BMC version        |\n|                            |\n==============================\n| right now version is  :    |\n.      ${parse_name}         "; exit 520;
#fi

var_catch_origin="";
var_catch_origin=$(grep update bmc_update.js|cut -d ' ' -f 3|cut -d '"' -f 2);
change_file=$(ls ./UPLOADFILES/ |grep -v "${var_catch_origin}");
echo "the check ${change_file}"

#echo "change_file_bash : ${change_file}";
###### grab the previous update file
orgin_update_bmc_file=$( grep "updateBMCfile" bmc_update.js|cut -d ' ' -f 3|cut -d '"' -f 2); 
#echo "${change_file}";												#check bmc file
echo -e " will change version is  \e[41m${change_file}\e[0m"|tee -a log.txt
echo -e "// @ts-check\nexport let updateBMCfile=\"${change_file}\"">bmc_update.js
}
set_ip;
catch_ver;
set_bmc;
function_catch_version;
#execute=0;															#int execute
until [[ ${execute} == +([1-9]) ]];do
	read -p  "execute how many time ?(input number) : " execute 
done;
echo " execute : ${execute}";
for i in $(seq 1 ${execute})
do
	echo " !!!====> ${i}" >> log.txt;
	$(date >> log.txt)
	$(npx playwright test tests/change.spec.js --headed|tee -a log.txt)
	sleep 10;
	#set_bmc;
	catch_ver;
	function_catch_version;
	$(ipmitool -I lanplus -H ${ip} -U admin -P 11111111 raw 0x1e 0x01 0x00 >> log.txt);
	$(date >> log.txt)
	$(npx playwright test tests/uploadfile.spec.js --headed |tee -a log.txt)
	sleep 2m;
	if [ ${i} -eq ${execute} ];
	then
		#echo " this is last one ";
		$(npx playwright test tests/change.spec.js --headed|tee -a log.txt);
	fi
done
