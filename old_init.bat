:: echo // @ts-check > javascript_ip.js
:: echo //await page.locator('#mainfirmware_image').setInputFiles('./tests/uploadFiles/IS-5121_v1.1.18N.ima'); >> javascript_ip.js
:: echo export let ip="192.168.120.210"  >> javascript_ip.js
:: [ref](https://www.itread01.com/hkyfhk.html)
:: echo off

::if exist .\javascript_ip.js (
::	echo ' have javascript_ip.js '
::) else (
::	echo ' no java'
::)

:: if not exist .\javascript_ip.js (
:: 	echo '// @ts-check' > javascript_ip.js
:: 	echo "//await page.locator('#mainfirmware_image').setInputFiles('./tests/uploadFiles/IS-5121_v1.1.18N.ima');"
:: 	echo 'export let ip="192.168.120.210"'  >> javascript_ip.js
:: )
	

mkdir .\UPLOADFILES\

::echo "// @ts-check" > bmc_update.js
::echo 'export let updateBMCfile="S-5121_v1.1.18N.ima"' >> bmc_update.js
::
::
::	echo '// @ts-check' > javascript_ip.js
::	echo "//await page.locator('#mainfirmware_image').setInputFiles('./tests/uploadFiles/IS-5121_v1.1.18N.ima');" >> javascript_ip.js
::	echo 'export let ip="192.168.120.210"'  >> javascript_ip.js
::
::	echo 'public class Anchor{'> .\UPLOADFILES\ANCHOR.java
::	echo '	public static void main(String[] args){' >> .\UPLOADFILES\ANCHOR.java
::	echo '		System.out.println(" this is anchor ");' >> .\UPLOADFILES\ANCHOR.java
::	echo '	/*' >> .\UPLOADFILES\ANCHOR.java
::	echo '	dGhpcyBpcyBhbmNob3IKIE9SIOWPr+S7peiqquaYr+iomOmMhOm7niDpgoTkuI3mmK/ngrrkuoYg'>>.\UPLOADFILES\ANCHOR.java
::	echo '	Z2l0ID09Cuawo+atuwphbnl3YXkgOnJlY29yZAoyMDI0LzAyLzA2Cg=='>>.\UPLOADFILES\ANCHOR.java
::	echo '	*/'>>.\UPLOADFILES\ANCHOR.java
::	echo '	}'>>.\UPLOADFILES\ANCHOR.java
::	echo '}'>>.\UPLOADFILES\ANCHOR.java
