const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
require('dotenv').config();

// Connect to MongoDB database
mongoose
  .connect('mongodb://localhost:27017/BirthdayData', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Define schema for birthdays collection
const birthdaySchema = new mongoose.Schema({
  name: String,
  email: String,
  date: Date,
});

// Define Birthday model
const Birthday = mongoose.model('Birthday', birthdaySchema);

// Create transporter object for Gmail's SMTP server
const transporter = nodemailer.createTransport({
  service: 'gmail',
  PORT: 587,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

// Define function to send birthday wishes
async function sendBirthdayWishes(birthday) {
  const today = new Date();
  const birthdate = new Date(birthday.date);

  // Check if today is the person's birthday
  if (
    today.getMonth() === birthdate.getMonth() &&
    today.getDate() === birthdate.getDate()
  ) {
    const html = fs.readFileSync(
      path.join(__dirname, 'birthday_wish.html'),
      'utf8'
    );

    // Compose message
    const message = {
      from: process.env.USER_EMAIL,
      to: birthday.email,
      subject: 'Happy Birthday!',
      html: html.replace(/{{name}}/g, birthday.name),
    };

    // Send message
    const info = await transporter.sendMail(message);
    console.log(
      `Birthday wishes sent to ${birthday.name} (${birthday.email})`,
      info
    );
  }
}

// schedule the code inside 9am very morning
cron.schedule('0 9 * * *', () => {
  console.log('Running birthday wishes script...');
  // Query birthdays from database and send wishes
  Birthday.find()
    .then(birthdays => {
      birthdays.forEach(birthday => {
        sendBirthdayWishes(birthday);
      });
    })
    .catch(err => console.error('Error querying birthdays from MongoDB', err));
});
