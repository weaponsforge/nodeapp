const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000 || process.env.PORT

app.use(express.static('public'))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})