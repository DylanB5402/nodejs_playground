const http = require('http')
const func = require("./func")

const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')

  console.log(req.headers)
  req.on('error', (err) => {
    console.error(err.stack)
  })

  if (req.method == 'POST') {
      let data = '';
      req.on('data', chunk => {
        data += chunk;
      }).on('end', () => {
        console.log(data)
        // json_data = JSON.parse(func.toJSONString(data))
        // console.log(JSON.stringify(json_data))
        // console.log(json_data["option"])
        json_data = JSON.parse(data)
        option = json_data["option"]
        resp = ""
        if (option == "one") {
          resp = "taco"
        } else if (option == "two") {
          resp = "potato"
        }
        res.write(resp)
        res.end()
      })
  }

  if (req.method == 'GET') {
    req.on('data', chunk => {}).on('end', () => {
      res.write('received GET request')
      res.end()
    })
  }
})

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
  console.log(port);
})


