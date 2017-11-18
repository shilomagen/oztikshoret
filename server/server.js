const express = require('express');
const bodyParser = require('body-parser');
const pdfService = require('./services/pdfcreator/pdfCreator');
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const app = express();
const MailService = require('./services/mail/mailService');
const fs = require('fs');
const UziSocket = require('./services/socket/socket');
const {AppStatus: Status} = require('./../src/common/constants');

const mailService = new MailService();

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.post('/api/create-offer', async (req, res) => {
  try {
    res.status(200).end();
    uziSocket.emitChange(Status.CREATING_PDF);
    const {filename} = await pdfService.createPdf(req.body);
    uziSocket.emitChange(Status.SENDING_MAIL);
    await mailService.sendMail(req.body.email, filename);
    uziSocket.emitChange(Status.CLEANING);
    await fs.unlink(filename);
    uziSocket.emitChange(Status.DONE);
  } catch (e) {
    console.error(e);
  }
});
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`App is up and running on port ${PORT}`);
});
const uziSocket = new UziSocket(server);
