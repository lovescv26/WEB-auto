#! /bin/bash
### {{{ 
### ----------------------
### created : Mon Jan 22 11:14:41 CST 2024
### Version : 0 
### author : lovelovequeen
### time   : Mon Jan 22 11:19:22 CST 2024
### [ref](https://linuxhandbook.com/bash-variables/)
### ----
### readme : this is need to let user input ip 
### ---------------------
### }}}
ip="";
validate_ip="";
ip_flag=0;
while [ ${ip_flag} == 0 ]
do
echo " U need to input IP address ";
read ip;
echo " double check Ur IP address ";
read validate_ip;
if [[ ${ip} == ${validate_ip} ]]
then
	ip_flag=1;
	echo " U input IP address is ${ip} ";
else
	echo " U ip address != validate ip address ";
	echo -e "\n\n";
fi
done
