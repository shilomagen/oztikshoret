const MailService = require('./mailService');

describe('mailService Test', () => {
  it('should throw an error when creating mailService without credentials', () => {
    process.env.EMAIL_USER = '';
    const mailConstructor = () => new MailService();
    expect(mailConstructor).toThrow('Please provide credentials');
  });
  it('should create a mailService with credentials', () => {
    process.env.EMAIL_USER = 'shilo@mangam.com';
    process.env.EMAIL_PASS = '1234';
    const mailService = new MailService();
    expect(mailService.transporter).not.toBe(null);
  });
});