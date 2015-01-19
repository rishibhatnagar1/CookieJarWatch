''' Written by Rishi Gaurav Bhatnagar, Ajith Helped a lot.
This code posts request on a link /webpage/server/cloud based on the kind of inputs you are receiving serially.
The code can be modified to post requests using various other ways '''

import serial
import requests
import json
ser = serial.Serial('/dev/tty.usbmodem1421')
link ="http://localhost:3000"

#Response Code checking Step #2
def checkResponse():
	r = requests.get(link)
	curValue = r.status_code
    	#print curValue
	if (curValue==200):
		print "Value Posted"
	else:
		print "Error Response Code",curValue

#Write A function to post requests Step#1
def postRequest(inp):
	headers = {'content-type': 'application/json'} #All provided in the documentation
	r = requests.post(link,data=json.dumps(inp),headers = headers) #All this code has been put on http://docs.python-requests.org/en/latest/user/quickstart/#make-a-request
	print (r.text)
	checkResponse()

#The below code is to post to a link, it has to be in the way written below. Format is very important. Step #3
def cloudPost(cmd): 
	if "s" in cmd:
		#postvalue This has to be in a particular format as shown below.
		postRequest({"value":"0"})
	if "o" in cmd:
                #postvalue This has to be in a particular format as shown below.
                postRequest({"value":"1"})	
#CALL ALL THE FUNCTIONS			
while True:
	#Read the serial monitor
	val = ser.read()
	#print val
	cloudPost(val)
	
	
	
