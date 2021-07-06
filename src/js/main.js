const http = require('http')
const func = require("./func")

const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  console.log(req.headers)
  console.log(req.method)

  req.on('error', (err) => {
    console.error(err.stack)
  })

  if (req.method == 'POST') {
      let data = '';
      req.on('data', chunk => {
        // console.log(687)
        // console.log(JSON.stringify(String(chunk)))
        console.log("chunk = " + chunk)
        data += chunk;
      }).on('end', () => {
        res.write(data)
        res.end()
      })
  }

  if (req.method == 'GET') {
    req.on('data', chunk => {}).on('end', () => {
      res.write('received GET   request')
      // res.write(String(func.foo(1, 2, 3)))
      // taco = new func.Taco(1, 2, 4)
      // res.write(String(taco.d))
      res.end()
    })
  }
})

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
  console.log(port);
})


