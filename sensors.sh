#! /bin/bash
###{{{
### --------------------------------
### created	:	Fri Mar  8 15:50:35 CST 2024
### date	:	Fri Mar  8 15:50:39 CST 2024
### README :
###			sensors use ipmitool  to catch 
###
###
###
###
###}}}

another_file="./INItialize.sh"
function_set_initial(){
bash  ${another_file};
echo "\n\n";
}

origin_ip="";
var_ip="";
# var_back_ip=""; ==> intead of ${con_tem_flag} --> I want use global variable to change it 

var_tem_fl=1 ;
con_tem_flag="0";	# expected to accecpt y or n  
con_varify_ip=1;
con_tem_nu=0;

	## todo --> mkdir  "TEST RECORD/Ssensors/ "
if [ -d ./TEST\ RECORD/Sensors/ ]
then
	mkdir TEST\ RECORD/Sensors/;
fi
function_setip(){
	## todo [1] -->  catch origin IP 
	if [[ ! -f javascript_ip.js ]]
	then
		function_set_initial;
	fi
	#origin_ip = $(grep ip javascript_ip.js | cut -d ' ' -f 3 | cut -d '"' -f 2);
	origin_ip=$(grep ip javascript_ip.js | cut -d ' ' -f 3 | cut -d '"' -f 2);
	# echo -e " origin IP : ${origin_ip} ";
	## TODO  -->  ask whether change IP
	while [[ ${var_tem_fl} == "1" ]]
	do
		read -p " now IP is ${origin_ip} do you want to change? (Y or N) " con_tem_flag;
		if [[ ${con_tem_flag} == "y" || ${con_tem_flag} == "Y"  ]]
		then
			var_tem_fl=25 ;
			#elif [[ ${con_tem_flag} == "n" ||  "N" ]]	#### ==> error : all will go this condition
		elif [[ ${con_tem_flag} == "n" || ${con_tem_flag} == "N" ]];then
			var_tem_fl=520 ;
			var_ip=${origin_ip};
			echo -e "======IP====>${var_ip} ";
		else
			var_tem_fl=1;
			#echo "  loop anain ";
		fi
	done
	# var_tem_fl =1;
	con_tem_flag=1;
	#echo " var_tem_fl ${var_tem_fl} ";	### dev_va
	## TODO  -->  if change IP or not change
	if [[ ${var_tem_fl} == 25 ]]
	then
		while [[ ${con_varify_ip} == 1 ]]
		do
			read -p " input your ip " var_ip;
			read -p " varify ip: ${var_ip} ( y to comfirm ) " con_tem_flag;
			if [[ ${con_tem_flag} == "y" || ${con_tem_flag} == "Y"  ]]   ###???
			then
				con_varify_ip=0;
				#var_ip=${origin_ip};
			else
				con_varify_ip=1;
			fi
		done
	fi
	#echo "=====IP====>${var_ip}";
	con_varify_ip=1;
}

	## TODO  --> ipmitool sdr

	## TODO  --> ipmitool sdr type fan

	## TODO  --> ipmitool sdr | grep FAN
	## TODO  --> ipmitool sdr type temperature
	## TODO  --> ipmitool sdr voltage
	## TODO  --> ipmitool sdr | grep PSU

	## TODO  --> ipmitool sel elist
function_setip;
