// server.js

const express = require('express');
const cors = require('cors');
const pool = require('./connection'); // Adjust path as needed
const app = express();
const port = 5000;
//const cors = cors();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
// POST endpoint to handle form submission
app.post('/submitForm', async (req, res) => {
  const { map, agent, description, youtubeLink, greenMarker, redMarker } = req.body;

  try {
    // Insert data into MySQL table
    const [insertResult] = await pool.promise().execute(
      `INSERT INTO LineupData (map, agent, description, youtubeLink, greenMarker_lat, greenMarker_long, redMarker_lat, redMarker_long)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [map, agent, description, youtubeLink, greenMarker[0], greenMarker[1], redMarker[0], redMarker[1]]
    );

    console.log('Inserted ID:', insertResult.insertId);

    res.status(200).json({ message: 'Lineup data inserted successfully', insertId: insertResult.insertId });
  } catch (error) {
    console.error('Error inserting lineup data:', error);
    res.status(500).json({ error: 'Failed to insert lineup data' });
  }
});
app.get('/lineupdata', (req, res) => {
    const { map, agent } = req.query;
  
    // SQL query to fetch data based on parameters
    const sql = 'SELECT description,youtubeLink,greenMarker_lat ,greenMarker_long,redMarker_lat ,redMarker_long FROM LineupData WHERE map = ? AND agent = ?';
    //description,youtubeLink,greenMarker_lat ,greenMarker_long,redMarker_lat ,redMarker_long
    // Parameters for the SQL query
    const values = [map, agent];
  
    // Use the pool connection to execute the query
    pool.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error fetching lineup data express:', err);
        res.status(500).json({ error: 'Internal server error express server' });
        return;
      }
  
      res.json(results); // Send back the fetched data as JSON response
    });
  });
app.listen(port,'0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
//hi