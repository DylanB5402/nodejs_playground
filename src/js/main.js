const http = require('http')

const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')

  let data = '';
  console.log(req.headers)
  console.log(req.method)

  req.on('error', (err) => {
    console.error(err.stack)
  })

  if (req.method == 'POST') {
      req.on('data', chunk => {
        data += chunk;
      }).on('end', () => {
        res.write(data)
        res.end()
      })
  }

  if (req.method == 'GET') {
    // console.log('received GET request')
    // req.on('end', () => {
    //   console.log(687)
    //   // data += chunk;
    //   data += 'GET request received'
    //   console.log('data: ' + data)
    //   res.write(data)
    //   res.end()
    // })
    req.on('data', chunk => {
        // data += 'received GET request';
    }).on('end', () => {
      data += 'received GET request';
      res.write(data)
      res.end()
    })
  }

  // req.on('end', () => {
  //   res.end();
  // })  
})

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
  console.log(port);
})