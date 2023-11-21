const express = require('express')
const app = express()
const port = process.env.PORT ?? 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.info(`Server started on 127.0.0.1:${port}`)
})