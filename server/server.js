const express = require('express');
const bodyParser = require('body-parser');
const pdfService = require('./services/pdfcreator/pdfCreator');
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const app = express();
const MailService = require('./services/mail/mailService');
const fs = require('fs');


const mailService = new MailService();

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.post('/api/create-offer', async (req, res) => {
  try {
    res.status(200).end();
    const {filename} = await pdfService.createPdf(req.body);
    await mailService.sendMail(req.body.email, filename);
    await fs.unlink(filename);
  } catch (e) {
    console.error(e);
  }
});
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`App is up and running on port ${PORT}`);
});