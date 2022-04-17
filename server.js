const express = require('express')
const sqlite3 = require('sqlite3')

const port = process.env.PORT || 3001;

const app = express()
app.use(express.json())

const db_path = 'data_full_v2.db';

db = new sqlite3.Database(db_path, (err) => {
  if (err) {
    console.log('Could not connect to database', err)
  } else {
    console.log('Connected to database')
  }
})

app.get('/latlong', (req, res) => {
  // request fields
  // - industry name
  
  // return list of lat and list of long

  industry_name = req.query.industry
  
  db.all(`SELECT name, lat, lon FROM data_full_v2 WHERE industry = \"${industry_name}\"`, function(err, rows) {
    if (err) throw err;
    res.send(rows);
  })
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

app.get('/app', (req, res) => {
  res.send({express: 'EXPRESS BACKEND CONNECTED TO REACT'})
});
