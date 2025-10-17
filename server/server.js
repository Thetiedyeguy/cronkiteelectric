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



const CACHE_TTL_HOURS = Number(process.env.REVIEWS_TTL_HOURS || 24);
const CACHE_TTL_MS = CACHE_TTL_HOURS * 60 * 60 * 1000;

let reviewsCache = {
  data: null,        // will hold the reviews array
  fetchedAt: 0,      // Date.now() when fetched
};
let reviewsFetchPromise = null; // reuse in-flight fetches

// --- config (put near other env usages) ---
const ADMIN_TOKEN = process.env.ADMIN_TOKEN; // set e.g. ADMIN_TOKEN=supersecret in your .env

function requireAdmin(req, res, next) {
  const token = req.get('x-admin-token') || req.query.token;
  if (ADMIN_TOKEN && token === ADMIN_TOKEN) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

// --- create (already matches your GiveawayBanner.jsx default) ---
app.post('/api/giveaway/entry', async (req, res) => {
  try {
    const { name, phone } = req.body || {};
    const cleanName = (name || '').trim();
    const cleanPhone = (phone || '').trim();

    if (!cleanName || !cleanPhone) {
      return res.status(400).json({ error: 'Name and phone are required.' });
    }

    // simple server-side length guards
    if (cleanName.length > 100 || cleanPhone.length > 30) {
      return res.status(400).json({ error: 'Input too long.' });
    }

    const result = await db.query(
      `INSERT INTO giveaway_entries (name, phone) VALUES ($1, $2)
       RETURNING id, name, phone, created_at`,
      [cleanName, cleanPhone]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST /api/giveaway-entry', err);
    res.status(500).json({ error: 'Failed to save entry.' });
  }
});

// --- list (admin) ---
app.get('/api/giveaway/entries', requireAdmin, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, name, phone, created_at
       FROM giveaway_entries
       ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('GET /api/giveaway-entries', err);
    res.status(500).json({ error: 'Failed to fetch entries.' });
  }
});

// --- csv export (admin; handy for drawings) ---
app.get('/api/giveaway/entries.csv', requireAdmin, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, name, phone, created_at
       FROM giveaway_entries
       ORDER BY created_at DESC`
    );
    const rows = result.rows;

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="giveaway_entries.csv"');

    // simple CSV builder
    res.write('id,name,phone,created_at\n');
    for (const r of rows) {
      const line = [
        r.id,
        JSON.stringify(r.name),  // quote if needed
        JSON.stringify(r.phone),
        r.created_at.toISOString()
      ].join(',');
      res.write(line + '\n');
    }
    res.end();
  } catch (err) {
    console.error('GET /api/giveaway-entries.csv', err);
    res.status(500).json({ error: 'Failed to export CSV.' });
  }
});


// ---- replace your /api/reviews route with this ----
app.get('/api/reviews', async (req, res) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Missing GOOGLE_API_KEY' });

  const forceRefresh = req.query.refresh === '1';
  const isFresh = reviewsCache.data && (Date.now() - reviewsCache.fetchedAt) < CACHE_TTL_MS;

  // Serve from cache if fresh and not forced to refresh
  if (!forceRefresh && isFresh) {
    return res.json(reviewsCache.data);
  }

  try {
    // If a fetch is already in-flight, await it instead of starting another
    if (!reviewsFetchPromise) {
      const placeId = 'ChIJ39mHPz-nFYcRxvfKtEg_XrU';
      const url = `https://places.googleapis.com/v1/places/${placeId}`;

      reviewsFetchPromise = axios.get(url, {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'reviews' // request only what you need
        },
        timeout: 10000
      })
      .then(resp => {
        const reviews = resp.data?.reviews || [];
        reviewsCache = { data: reviews, fetchedAt: Date.now() };
        return reviews;
      })
      .catch(err => {
        const status = err.response?.status;
        const data = err.response?.data;
        console.error('Places API error:', status, JSON.stringify(data));
        // If we have stale cache, return it as a fallback
        if (reviewsCache.data) return reviewsCache.data;
        // Otherwise surface the error
        throw new Error(data?.error?.message || 'Failed to fetch reviews');
      })
      .finally(() => {
        // small delay to ensure .finally runs after consumers read it
        setTimeout(() => { reviewsFetchPromise = null; }, 0);
      });
    }

    const result = await reviewsFetchPromise;
    return res.json(result);
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Failed to fetch reviews' });
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

// Target email address
const TARGET_EMAIL = process.env.TARGET_EMAIL;

// API endpoint
app.post('/api/send-message', express.json(), async (req, res) => {
  const { name, contact, message } = req.body;
  console.log("Submitted");

  try {
    // Validate input
    if (!name || !message || !contact) throw new Error('Missing required fields');
    if (message.length > 5000) throw new Error('Message too long'); // optional larger limit

    // Construct full message
    const fullMessage = `Name: ${name}\nContact: ${contact}\n\n${message}`;

    // Send email
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.GMAIL_USER}>`,
      to: TARGET_EMAIL,
      subject: `New Message from ${name}`,
      text: fullMessage
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});


