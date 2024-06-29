const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    to: 'alizwel008@gmail.com',
    subject: "Signify Review",
    text: options.review
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;