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
echo -e "\n\n";
}
another_file_setip="./setip.sh"
function_setip(){
	bash ${another_file_setip};
	echo -e "\n\n"
}

origin_ip="";
var_ip="";
# var_back_ip=""; ==> intead of ${con_tem_flag} --> I want use global variable to change it 
var_ip=$(grep ip javascript_ip.js | cut -d ' ' -f 3 | cut -d '"' -f 2);

var_tem_fl=1 ;
con_tem_flag="0";	# expected to accecpt y or n  
con_varify_ip=1;
con_tem_nu=0;

	## todo --> mkdir  "TEST RECORD/Ssensors/ "
#if [ -d ./TEST\ RECORD/Sensors/ ]
if [ ! -d ./TEST\ RECORD/Sensors/ ]
then
	echo -e " no TEST RECORD/Sensors/";
	mkdir TEST\ RECORD/;
	mkdir TEST\ RECORD/Sensors/;
#else
#	echo "???"
fi

function_setip;
	## TODO impitool ip is correct !
function_ipmitool(){
	var_tem_ipmitool=$(ipmitool -I lanplus -H ${var_ip} -U admin -P 11111111 raw 0x1e 0x01 0x00)
	if [[ "$?" == "0" ]]
	then
		echo -e " ok"
	else
		echo -e "break"
		exit 1314520 ;
	fi
	echo -e "${var_tem_ipmitool}";
}
function_ipmitool;
function_ipmi(){
						## dir => TEST RECORD/Sensors
	## todo  --> ipmitool sdr					--> SDR.txt
#$(ipmitool -I lanplus -H ${var_ip} -U admin -P 11111111 sdr) > TEST\ RECORD/Sensors/SDR.txt
buf_psu=$(ipmitool -I lanplus -H ${var_ip} -U admin -P 11111111 sdr) 
echo -e  "${buf_psu}\n"
echo -e  "${buf_psu}\n">TEST\ RECORD/Sensors/SDR.txt
	## todo  --> ipmitool sdr type fan			--> FAN.txt
buf_fan=$(ipmitool -I lanplus -H ${var_ip} -U admin -P 11111111 sdr type fan) 
echo -e  "${buf_fan}\n"
echo -e  "${buf_fan}\n">TEST\ RECORD/Sensors/FAN.txt
	## todo  --> ipmitool sdr | grep FAN		--> FAN1.txt
buf_FAN=$(ipmitool -I lanplus -H ${var_ip} -U admin -P 11111111 sdr|grep FAN) 
echo -e  "${buf_FAN}\n"
echo -e  "${buf_FAN}\n">TEST\ RECORD/Sensors/FAN1.txt
	## todo  --> ipmitool sdr type temperature	--> TEMPERATURE.txt
buf_tem=$(ipmitool -I lanplus -H ${var_ip} -U admin -P 11111111 sdr type temperature) 
echo -e  "${buf_tem}\n"
echo -e  "${buf_tem}\n">TEST\ RECORD/Sensors/TEMPERATURE.txt
	## todo  --> ipmitool sdr voltage			--> VOLTAGE.txt
buf_vol=$(ipmitool -I lanplus -H ${var_ip} -U admin -P 11111111 sdr type voltage) 
echo -e  "${buf_vol}\n"
echo -e  "${buf_vol}\n">TEST\ RECORD/Sensors/VOLTAGE.txt
	## todo  --> ipmitool sdr | grep PSU		--> dir/PSU.txt
buf_psu=$(ipmitool -I lanplus -H ${var_ip} -U admin -P 11111111 sdr|grep PSU) 
echo -e  "${buf_psu}\n"
echo -e  "${buf_psu}\n">TEST\ RECORD/Sensors/PSU.txt
####echo "${buf_psu}">TEST\ RECORD/Sensors/SDR.txt ###--> not complete  so need to in order to
##echo "${buf_fan}">TEST\ RECORD/Sensors/FAN.txt
##echo "${buf_FAN}">TEST\ RECORD/Sensors/FAN1.txt
##echo "${buf_tem}">TEST\ RECORD/Sensors/TEMPERATURE.txt
##echo "${buf_vol}">TEST\ RECORD/Sensors/VOLTAGE.txt
##echo "${buf_psu}">TEST\ RECORD/Sensors/PSU.txt

}
#function_ipmi(); #### ---> error 
#./sensors.sh: line 75: syntax error near unexpected token `;'
#./sensors.sh: line 75: `function_ipmi();'
#function_ipmi;
#buf_psu=$(ipmitool -I lanplus -H ${var_ip} -U admin -P 11111111 sdr|cat -n)
#buf_psu=$(ipmitool -I lanplus -H ${var_ip} -U admin -P 11111111 sdr)
#echo "${buf_psu}"
#echo -e "\n-----\n"
#echo -e "${buf_psu}"
#echo -e  ${psu} |tee TEST\ RECORD/Sensors/PSU.txt
#psu_count=$(ipmitool -I lanplus -H ${var_ip} -U admin -P 11111111 sdr|tr -cd '|' |wc -c)
#echo "${psu_count}"
#echo "${psu}">TEST\ RECORD/Sensors/SDR.txt

#function_ipmi;



