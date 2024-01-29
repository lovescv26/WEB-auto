---
date : Fri Jan 26 16:08:52 CST 2024

---
tag [[bash]]

---
##  bash while $va1 -ne $va2
[ref](https://stackoverflow.com/questions/27209605/comparing-two-variables-in-while-loop-bash)
```bash
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
```
用while and for neted code 
為了要 確保只有兩個檔案 才做這個動作


