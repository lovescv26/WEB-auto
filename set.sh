#! /bin/bash
### {{{ 
### ----------------------
### created : Mon Jan 22 11:14:41 CST 2024
### Version : 2 
### author : lovelovequeen
### time   : Mon Jan 22 11:31:11 CST 2024
### [ref](https://linuxhandbook.com/bash-variables/)
### ----
### readme : this is need to let user input ip 
### check firmware ima-file
### ---------------------
### }}}
ip="";
validate_ip="";
ip_flag=1;
while [ ${ip_flag} == 1 ]
do
echo -e " \nU need to input IP address ";
read ip;
echo -e " if U ip address is  :: \e[31m[${ip}] \e[0m ";
echo -e " press \"Y\" \"y\"  or \"0\" is comfirm ip address  ";
read validate_ip;
case "${validate_ip}" in
	Y) 
		echo " double check ======================>  ${ip} ";
		ip_flag=0;;
	y)
		echo " double check ======================>  ${ip} ";
		ip_flag=0;;
	0)
		echo " double check ======================>  ${ip} ";
		ip_flag=0;;
	*)
		echo "plz redo " ;;
esac
done
count_uploadfile=0;
echo -e "\n\n you file in the /tests/uploadFiles "
for file in $(ls ./tests/uploadFiles)
do
	Extension=${file##*.}
	count_uploadfile=$((${count_uploadfile}+1));
	echo  "[${count_uploadfile}    ->    ${file}]";
	case "${Extension}" in
		ima)
			echo "";;
		*)
			rm -v ./tests/uploadFiles/$file;;
	esac	
done
