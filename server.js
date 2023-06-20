const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;
const JSON_FILE_PATH = 'geolocation_data.json';

// Middleware to parse JSON data
app.use(bodyParser.json());

// API endpoint to save geolocation data
app.post('/api/geolocation-data', (req, res) => {
  const { name, geolocationData } = req.body;

  // Append the geolocation data to JSON file
  fs.appendFile(JSON_FILE_PATH, JSON.stringify({ name, geolocationData }) + '\n', (err) => {
    if (err) {
      console.error('Error saving geolocation data:', err);
      res.status(500).json({ error: 'Failed to save geolocation data' });
    } else {
      console.log('Geolocation data saved successfully');
      res.json({ message: 'Geolocation data saved successfully' });
    }
  });
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
