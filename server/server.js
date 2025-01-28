require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db");
const app = express();
const axios = require('axios');


app.use(cors())
app.use(express.json());

app.use(morgan("dev"));

const port = process.env.PORT || 3001;
app.listen(port,() => {
    console.log(`server is up and listening and up on port ${port}`);
});



app.get('/api/reviews', async (req, res) => {
  const apiKey = process.env.GOOGLE_API_KEY; // Store your API key in an environment variable

  try {
    const response = await axios.get(
      `https://places.googleapis.com/v1/places/ChIJ39mHPz-nFYcRxvfKtEg_XrU?fields=reviews&key=${apiKey}`,
    );
    res.json(response.data.reviews);
  } catch (error) {
    console.error('Error fetching Google Reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

