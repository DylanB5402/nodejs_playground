import requests

req = requests.post("http://localhost:3000", headers= {'taco' : 'cat'}, data= {'cheese' : 'cake'})
print(req.content)

