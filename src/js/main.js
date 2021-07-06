const http = require('http')

// const port = process.env.PORT
const port = 3000;

const server = http.createServer((req, res) => {
  // console.log(req.headers)
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')

  let data = '';
  console.log(req.headers)

  req.on('error', (err) => {
    console.error(err.stack)
  })

  if (req.method == 'POST') {
      req.on('data', chunk => {
        // console.log(`Data chunk available: ${chunk}`)
        data += chunk;
      }).on('end', () => {
        res.write(data)
        res.end()
      })
      
  }

  req.on('end', () => {
    // console.log(JSON.parse(data).todo); // 'Buy the milk'
    console.log(data)
    res.end();
  })
 
  // res.end(data)
  
})

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
  console.log(port);
})