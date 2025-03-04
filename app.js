const express = require('express');
const db = require('./server/database/db');
const cors = require('cors');

const app = express();

app.use(cors())

// Set route (all sets)
app.get('/sets/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const result = await db.query(
      `SELECT * FROM set
      WHERE p1_tag = '${name}' OR p2_tag = '${name}'`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Set route (specific tournament)

app.get('/sets/:name/:slug', async (req, res) => {
  const { name, slug } = req.params;
  try {
    const result = await db.query(
      `SELECT * FROM set
      WHERE (p1_tag = '${name}' OR p2_tag = '${name}')
      AND tournament = '${slug}'
      ORDER BY phase_order, round`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Entrant route
app.get('/entrants/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const result = await db.query(
      `SELECT * FROM entrant
      WHERE tag = '${name}'
      LIMIT 5`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Tournament route
app.get('/tournaments/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await db.query(
      `SELECT * FROM tournament
      WHERE slug = '${slug}'`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(4000, () => {
  console.log('Server is running on port 4000')
});
