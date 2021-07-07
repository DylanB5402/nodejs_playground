const http = require('http')

const data = JSON.stringify( {
    "option" : "one"
})

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/todos',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

console.log("attempting request")
const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
    res.on('data', d => {
        // process.stdout.write(d)
        console.log(String(d))
    })
})

req.on('error', error => {
    console.error(error)
})
  
req.write(data)
req.end()