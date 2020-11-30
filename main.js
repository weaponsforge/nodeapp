const http = require("http")
const PORT = 3000 | process.env.PORT

http.createServer((req, res) => {
  res.writeHead(200, 'text/plain')
  res.end('Hello, world!')
}).listen(PORT, 'localhost')