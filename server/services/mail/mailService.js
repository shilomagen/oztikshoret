const nodemailer = require('nodemailer');
const mjml2html = require('mjml').mjml2html;
const mailFormat = require('./mailFormat');

class MailService {
  constructor() {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      this.mailOptions = {
        from: process.env.EMAIL_USER,
        subject: 'הצעת המחיר שלך מעוז תקשורת',
        html: mjml2html(mailFormat).html
      }
    } else {
      throw new Error('Please provide credentials');
    }
  }

  sendMail(to, path) {
    return new Promise((resolve, reject) => {
      const attachment = {filename: 'הצעת מחיר - עוז תקשורת.pdf', path};
      const mailOptions = {...this.mailOptions, to, attachments: [attachment]};
      this.transporter.sendMail(mailOptions, (err, info) => err ? reject(err) : resolve(info));
    })
  }
}

module.exports = MailService;