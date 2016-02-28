# SmartMeter
Work in progress.

Goal is to build a nodejs app that runs on a raspberry pi serving measurements of a smartmeter. 

Notes:

- pi expand filesystem
- mongodb or mysql
- dependencies
	- express
	- mysql (for nodejs) or mongoose (for mongodb)
	- serialport (for reading serialport to smartmeter)
		- install serialport with (https://github.com/voodootikigod/node-serialport#raspberry-pi-linux)
		not with apt-get, there is another package with the name 'node' this will conflict. 
		for less troubles dont install with apt-get