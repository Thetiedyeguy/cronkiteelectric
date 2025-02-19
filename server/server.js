const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '.env') });
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db");
const app = express();
const axios = require('axios');
const nodemailer = require('nodemailer');


app.use(cors())
app.use(express.json());

app.use(morgan("dev"));

const port = process.env.PORT || 3005;
app.listen(port,() => {
    console.log(`server is up and listening and up on port ${port}`);
});



app.get('/api/reviews', async (req, res) => {
  const apiKey = process.env.GOOGLE_API_KEY; // Store your API key in an environment variable
  // Add this right after loading dotenv
  console.log("Google API Key:", process.env.GOOGLE_API_KEY ? "Loaded" : "Missing");

  try {
    const response = await axios.get(
      `https://places.googleapis.com/v1/places/ChIJ39mHPz-nFYcRxvfKtEg_XrU?fields=reviews&key=${process.env.GOOGLE_API_KEY}`,
    );
    res.json(response.data.reviews);
  } catch (error) {
    console.error('Error fetching Google Reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});


// Configure transporter (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// SMS Gateway configuration
const CARRIER_GATEWAY = process.env.CARRIER_GATEWAY; // e.g., @vtext.com
const TARGET_PHONE = process.env.TARGET_PHONE; // Full number without formatting

// Split message into SMS-friendly chunks
function splitMessage(message) {
  const MAX_LENGTH = 160;
  const chunks = [];
  
  while (message.length > 0) {
    let chunk = message.substring(0, MAX_LENGTH);
    message = message.substring(MAX_LENGTH);
    chunks.push(chunk);
  }
  
  return chunks;
}

// API endpoint
app.post('/api/send-message', express.json(), async (req, res) => {
  const { name, contact, message } = req.body;
  console.log("Submitted")

  try {
    // Honeypot check
    
    // Validate input
    if (!name || !message || !contact) throw new Error('Missing required fields');
    if (message.length > 1000) throw new Error('Message too long');

    // Split message
    const chunks = splitMessage(`Contact ${contact}\n: ${message}`);
    
    // Send each chunk as separate email
    for (const [index, chunk] of chunks.entries()) {
      await transporter.sendMail({
        from: `"Website Contact" <${process.env.GMAIL_USER}>`,
        to: `${TARGET_PHONE}${CARRIER_GATEWAY}`,
        subject: index === 0 ? `New Message From ${name}` : `(Part ${index + 1})`,
        text: chunk
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

