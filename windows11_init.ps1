# [ref](https://officeguide.cc/windows-powershell-file-folder-management/)
if (Test-Path -Path .\UPLOADFILES\) {
	#mkdir .\UPLOADFILES\
	echo " alread have UPLOADFILES/ "
} else {
	mkdir .\UPLOADFILES\
}
if (Test-Path -Path .\bmc_update.js) {
	echo " alread have bmc_update.js  "
} else {
	echo "// @ts-check" > bmc_update.js
	echo 'export let updateBMCfile="S-5121_v1.1.18N.ima"' >> bmc_update.js
}
if (Test-Path -Path .\javascript_ip.js) {
echo " alread have javascript_ip.js "
} else {
	echo '// @ts-check' > javascript_ip.js
	echo "//await page.locator('#mainfirmware_image').setInputFiles('./tests/uploadFiles/IS-5121_v1.1.18N.ima');" >> javascript_ip.js
	echo 'export let ip="192.168.120.210"'  >> javascript_ip.js
}
if (Test-Path -Path .\UPLOADFILES\ANCHOR.java) {
	echo " alread have UPLOADFILES/ANCHOR.java " ;
} else {
	echo 'public class Anchor{'> .\UPLOADFILES\ANCHOR.java
	echo '	public static void main(String[] args){' >> .\UPLOADFILES\ANCHOR.java
	echo '		System.out.println(" this is anchor ");' >> .\UPLOADFILES\ANCHOR.java
	echo '	/*' >> .\UPLOADFILES\ANCHOR.java
	echo '	dGhpcyBpcyBhbmNob3IKIE9SIOWPr+S7peiqquaYr+iomOmMhOm7niDpgoTkuI3mmK/ngrrkuoYg'>>.\UPLOADFILES\ANCHOR.java
	echo '	Z2l0ID09Cuawo+atuwphbnl3YXkgOnJlY29yZAoyMDI0LzAyLzA2Cg=='>>.\UPLOADFILES\ANCHOR.java
	echo '	*/'>>.\UPLOADFILES\ANCHOR.java
	echo '	}'>>.\UPLOADFILES\ANCHOR.java
	echo '}'>>.\UPLOADFILES\ANCHOR.java
}

