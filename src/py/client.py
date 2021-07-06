import requests

request_header = {'taco' : 'cat'}
request_data = {'cheese' : 'cake', '687' : '254'}

def send_post():
    req = requests.post("http://localhost:3000", headers= request_header, data = request_data)
    print(req.content)  

def send_get():
    req = requests.get("http://localhost:3000", headers= request_header)
    print(req.content)  

send_post()
# send_post()
send_get()

