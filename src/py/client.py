import requests

request_header = {'taco' : 'cat'}
request_data = {'cheese' : 'cake', '687' : '254', 'ice cream' : '987', 'banana' : 'taco', 1678 : 'potato'}

# def send_post():
#     req = requests.post("http://localhost:3000", headers= str(request_header), data = request_data)
#     print(req.content)  

def send_post(req_data = request_data):
    req = requests.post("http://localhost:3000", headers= request_header, data = req_data)
    print(req.content)  

def send_get():
    req = requests.get("http://localhost:3000", headers= request_header)
    print(req.content)  

send_post()
# send_post()
# send_get()

# send_post({ 'option' : 'one'})
# send_post({ 'option' : 'two'})
# send_post({ 'option' : 'three'})
# print(str(request_header))
