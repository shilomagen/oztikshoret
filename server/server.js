const express = require('express');
const bodyParser = require('body-parser');
const pdfService = require('./services/pdfcreator/pdfCreator');
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.post('/api/create-offer', async (req, res) => {
  try {
    const pdfFile = await pdfService.createPdf(req.body);
    res.end();
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`App is up and running on port ${PORT}`);
});