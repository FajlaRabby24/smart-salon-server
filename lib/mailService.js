const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const sendEmail = async (to, subject, text, html) => {
  try {
    const options = {
      auth: {
        api_key: process.env.SENDGRID_API_KEY
      }
    };

    const transporter = nodemailer.createTransport(sgTransport(options));

    const info = await transporter.sendMail({
      from:  'Smart Saloon <zaheen@datascapeit.com>',
      to,
      subject,
      text,
      html
    });

    console.log('✅ Email sent:', info);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
  }
};

module.exports = sendEmail;