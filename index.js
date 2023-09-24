const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000; // Choose the port you prefer

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define your email sending route
app.post('/send-email', (req, res) => {
  const { subject, toEmail, message } = req.body;

  // Create a transporter object using your SMTP settings
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use the appropriate email service (e.g., 'Gmail', 'Outlook', etc.)
    auth: {
      user: 'innovativebitsolutions@gmail.com', // Your Gmail email address
      pass: 'tvvk gzvj swqf xzsb', // Your Gmail password or an app-specific password
    },
  });

  // Email content
  const mailOptions = {
    from: 'innovativebitsolutions@gmail.com', // Sender's email address
    to: toEmail, // Recipient's email address (from the request body)
    subject: subject, // Email subject (from the request body)
    text: message, // Email body (from the request body)
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// API Address
console.log(`API is running at http://localhost:${port}/send-email`);
