---
date : Fri Jan 26 16:14:37 CST 2024

---
tag [[bash]] 

---
## bash because add feature : can use same IP address 
```bash
ip="";
validate_ip="";
ip_flag=1;
origin_ip="";
#origin_ip=cat ./test.js|grep "let"|cut -d ' ' -f 2 ;
origin_ip=$(cat ./javascript_ip.js|grep "let"|cut -d ' ' -f 3) ;
catch_version="";
need_version="";
set_ip(){
use_file_ip=2;	# 0=> continue  1=>change
use_file_ip_flag=1; #
echo -e "The initial IP  :  ${origin_ip} \n\n";
while [ ${use_file_ip_flag} == 1 ]
do
	read -p "Do you want to continue useing this IP?  press \"y\" or \"n\" " use_file_ip ;
	case "${use_file_ip}" in 
		y|yes|Y|YES)
			use_file_ip_flag=0;
			ip_flag=0;
			ip=${origin_ip};
			#ip=$(echo ${origin_ip}|cut -d " 1)
			#echo ${origin_ip}|cut -d \" 2
			;;
		n|no|N|No)
			use_file_ip_flag=0;
			;;
		*)
			;;
	esac
done
```
![ip-struct](../pic/ip-struct.png)
because  origin_ip

``` bash
#{{
===> error
The initial IP  :  ip="192.168.120.218"
Do you want to continue useing this IP?  press "y" or "n" y                                                         
cut: you must specify a list of bytes, characters, or fields
Try 'cut --help' for more
information.
double check ======================>  ip="192.168.120.218"
you have  2  files in the /tets/uploadFiles
[1    ->    IS-5121_v1.1.17N.ima]
[2    ->    IS-5121_v1.1.18N.ima]
ip =====> : ip="192.168.120.218"
Address lookup for ip="192.168.120.218" failed
Could not open socket!
Error: Unable to establish IPMI v2 / RMCP+ session
#}}}
```
first look at `The initial IP : ip="192.168.120.218"`
當然如果是我在 重寫IP的時候沒問題 所以問題出在 他的結構
包含了 非ip的部分
所以修改了
```bash
ip="";
validate_ip="";
ip_flag=1;
origin_ip="";
origin_ip=$(cat ./javascript_ip.js|grep "let"|cut -d ' ' -f 3|sed 's/"//g'|sed 's/ip=//g') ;
catch_version="";
need_version="";
set_ip(){
use_file_ip=2;	# 0=> continue  1=>change
use_file_ip_flag=1; #
echo -e "The initial IP  :  ${origin_ip} \n\n";
while [ ${use_file_ip_flag} == 1 ]
do
	read -p "Do you want to continue useing this IP?  press \"y\" or \"n\" " use_file_ip ;
	case "${use_file_ip}" in 
		y|yes|Y|YES)
			use_file_ip_flag=0;
			ip_flag=0;
			ip=${origin_ip};
			#ip=$(echo ${origin_ip}|cut -d " 1)
			#echo ${origin_ip}|cut -d \" 2
			;;
		n|no|N|No)
			use_file_ip_flag=0;
			;;
		*)
			;;
	esac
done
```
這是修正的version
就把結構變成單純的值
