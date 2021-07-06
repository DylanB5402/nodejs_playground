import requests

request_header = {'taco' : 'cat'}
request_data = {'cheese' : 'cake', '687' : '254'}

req = requests.post("http://localhost:3000", headers= request_header, data = request_data)
print(req.content)

