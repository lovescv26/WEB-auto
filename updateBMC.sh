#! /bin/bash
### {{{ 
### ----------------------
### created : Mon Jan 22 11:14:41 CST 2024
### Version : 4 
### author : lovelovequeen
### time   : Thu Jan 25 09:45:10 CST 2024
### [ref](https://linuxhandbook.com/bash-variables/)
### [ref](https://linuxhandbook.com/bash-arrays/)
### [ref](https://stackoverflow.com/questions/13280131/hexadecimal-to-decimal-in-shell-script)
### [ref](https://stackoverflow.com/questions/49110/how-do-i-write-a-for-loop-in-bash)
### ----
### readme : this is need to let user input ip 
### check firmware ima-file
### ---------------------
### }}}
ip="";
validate_ip="";
ip_flag=1;
origin_ip="";
#origin_ip=cat ./test.js|grep "let"|cut -d ' ' -f 2 ;
origin_ip=$(cat ./javascript_ip.js|grep "let"|cut -d ' ' -f 3) ;
catch_version="";
need_version="";
set_ip(){
echo -e "The initial IP  :  ${origin_ip} \n\n";
while [ ${ip_flag} == 1 ]
do
#echo -e " \nU need to input IP address ";
read -p  " U need to input IP address " ip;
echo -e " if U ip address is  :: \e[31m[${ip}] \e[0m ";
#echo -e " press \"Y\" \"y\"  or \"0\" is comfirm ip address  ";
read -p  " press \"Y\" \"y\"  or \"0\" is comfirm ip address  " validate_ip;
case "${validate_ip}" in
	yes|Yes|Y|y|0)
		echo " double check ======================>  ${ip} ";
		ip_flag=0;
		;;
	*)
		echo "plz redo " ;
		;;

esac
done
sed -i "s/${origin_ip}/ip=\"${ip}\"/g" ./javascript_ip.js
}
set_bmc(){ 
count_uploadfile=0;
limit_count=0; #int limit_count
limit_count=$(ls ./tests/uploadFiles/ |wc -l)
if [ ${limit_count} -gt 2 ]
then
	echo -e "\n\n you have  \e[41m${limit_count}\e[0m  files in the /tests/uploadFiles "
else
	echo -e "\n\n you have  \e[42m${limit_count}\e[0m  files in the /tests/uploadFiles "
fi
for file in $(ls ./tests/uploadFiles)
do
	Extension=${file##*.}
	case "${Extension}" in
		ima)
			echo "";;
		*)
			rm -v ./tests/uploadFiles/$file;;
	esac	
done
while [ ${limit_count} -gt 2 ]
do 
	#rm -v 
	echo -e "only 2 file u need to delete some file \n    y=>yes delete\n    n=>no  delete"
	for file_n in $(ls ./tests/uploadFiles)
	do
		rm -vi ./tests/uploadFiles/${file_n};
		limit_count=$(ls ./tests/uploadFiles/ |wc -l);
	done
done
for file in $(ls ./tests/uploadFiles)
do
	count_uploadfile=$((${count_uploadfile}+1));
	echo  "[${count_uploadfile}    ->    ${file}]";
	#case "${Extension}" in
	#	ima)
	#		echo "";;
	#	*)
	#		rm -v ./tests/uploadFiles/$file;;
	#esac	
done
}
catch_ver(){ 
catch_version=$(ipmitool -I lanplus -H ${ip} -U admin -P 11111111 raw 0x1e 0x01 0x00);
echo -e "-------------------------------";
echo -e "\nthis is version  \n${catch_version}";
#for i in $(seq 2 4);
#do
#	#need_version=${need_version} $(echo "${catch_version}"|cut -d ' ' -f ${i});
#done

need_version=$(echo "${catch_version}"|cut -c 1-13);
number_1=$(echo "${catch_version}"|cut -c 2-4);	#int number_1
number_2=$(echo "${catch_version}"|cut -c 5-7);	#int number_2
number_3=$(echo "${catch_version}"|cut -c 8-9); #int third_number (declare)
number_4=$(echo "${catch_version}"|cut -c 11-13); #int number_4
parse_1=$((16#${number_1}))
parse_2=$((16#${number_2}))
parse_3=$((16#${number_3}))
parse_4=$((16#${number_4}))
parse_name=${parse_1}.${parse_2}.$((${parse_4}*100+${parse_3})); #char *[] parse_name
#need_version=${need_version} $(echo "${catch_version}"|cut -d ' ' -f 3);
#echo " out : ";
#echo "${need_version}";
#echo "----";
#echo "${first_number}";
#echo "${second_number}";
#echo "${third_number}";
#echo "${forth_number}";
#echo "${parse_1}"
#echo "${parse_2}"
#echo "${parse_3}"
#echo "${parse_4}"
#echo "${parse_name}";
# exclude the same upload file
change_file=$(ls ./tests/uploadFiles/ | grep -v "${parse_name}");	
# grab the previous update file
orgin_update_bmc_file=$(cat ./bmc_update.js | grep "updateBMCfile"|cut -d ' ' -f 3); 
#echo "${change_file}";			#check bmc file
#sed -i "s/${orgin_update_bmc_file}/updateBMCfile=${change_file}/g" ./bmc_update.js
echo -e " will change version is  \e[41m${change_file}\e[0m"
sed -i "s/${orgin_update_bmc_file}/updateBMCfile=\"${change_file}\"/g" ./bmc_update.js
}

#set_ip();
#set_bmc();
#catch_ver();
set_ip;
set_bmc;
catch_ver;
execute=0;
#echo "exectue how many time ? ";
read -p  "exectue how many time ? " execute 
for i in $(seq 1 ${execute})
do
	echo " !!!====> ${i}" >> log.txt;
	$(date >> log.txt)
	$(npx playwright test tests/change.spec.js --headed|tee -a log.txt)
	sleep 10;
	set_bmc;
	catch_ver;
	$(ipmitool -I lanplus -H ${ip} -U admin -P 11111111 raw 0x1e 0x01 0x00 >> log.txt);
	$(date >> log.txt)
	$(npx playwright test tests/uploadfile.spec.js --headed |tee -a log.txt)
	sleep 2m;
done
