const express = require('express')
const port = process.env.PORT || 3000;

const app = express()

// app.use(express.static("src"));



app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

app.get('/app', (req, res) => {
  res.send({express: 'EXPRESS BACKEND CONNECTED TO REACT'})
});
