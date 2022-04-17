const express = require('express')
const sqlite3 = require('sqlite3')

const port = process.env.PORT || 3001;

const app = express()
app.use(express.json())

const db_path = 'data_full.db';

db = new sqlite3.Database(db_path, (err) => {
  if (err) {
    console.log('Could not connect to database', err)
  } else {
    console.log('Connected to database')
  }
})

app.get('/latlong', (req, res) => {

  industry_name = req.query.industry

  db.all(`SELECT name, lat, lon, overall_score, score_competition, score_saturation, score_growth_rate FROM data_full WHERE industry = \"${industry_name}\"`, function(err, rows) {
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
