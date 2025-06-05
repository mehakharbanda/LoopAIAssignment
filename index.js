const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const startWorker = require('./utils/worker');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use('/',routes);
app.get('/', (req, res) => {
  res.send('Data Ingestion API is running.');
});

startWorker();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
