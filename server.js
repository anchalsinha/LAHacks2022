const express = require('express')
const mysql = require('mysql')

const port = process.env.PORT || 3000;

const app = express()
app.use(express.json())

const db = mysql.createConnection({
	host: "localhost",
	user: "cs143",
	password: "",
	database: "class_db",
});

db.connect(function(err) {
	if (err) throw err;
	console.log("You're successfully connected to MySQL");
});

app.get('/latlong', (req, res) => {
  // request fields
  // - industry name
  
  // return list of lat and list of long

  industry_name = req.body.industry

  db.query(`SELECT name, lat, lon FROM companies WHERE industry = ${industry_name}`, function(err, result, fields) {
    if (err) throw err;
    console.log(result);
  })

  res.send({ lat: [], lon: [] });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

app.get('/app', (req, res) => {
  res.send({express: 'EXPRESS BACKEND CONNECTED TO REACT'})
});
