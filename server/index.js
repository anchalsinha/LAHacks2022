const express = require('express')
const port = process.env.PORT || 3001;

const app = express()

// app.use(express.static("src"));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, "src", "index.html"))
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
